import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import Stripe from 'npm:stripe@13.11.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { PostHog } from 'npm:posthog-node'

function createPostHogClient() {
  return new PostHog(Deno.env.get('POSTHOG_API_KEY') ?? '', {
    host: Deno.env.get('POSTHOG_HOST') ?? 'https://eu.i.posthog.com',
    flushAt: 1,
    flushInterval: 0,
  })
}

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const FROM_EMAIL = 'Nelsy <hello@getnelsy.com>'

async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) return
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  })
}

const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')

if (!stripeSecretKey) throw new Error('STRIPE_SECRET_KEY is not set')
if (!webhookSecret) throw new Error('STRIPE_WEBHOOK_SECRET is not set')

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
)

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return new Response('No signature', { status: 400 })
  }

  try {
    const body = await req.text()

    // Verify webhook signature — must use async form in Deno (SubtleCrypto is async-only)
    const event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret)

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const meta = session.metadata ?? {}

        // ── Booking payment (full price) ──────────────────────────
        if (meta.booking_id) {
          const sessionPaymentIntentId = session.payment_intent as string | null

          // Idempotency: skip if this payment was already credited
          if (sessionPaymentIntentId) {
            const { data: existingCreditCO } = await supabase
              .from('balance_transactions')
              .select('id')
              .eq('stripe_payment_id', sessionPaymentIntentId)
              .maybeSingle()

            if (existingCreditCO) {
              console.log(`[idempotent] checkout.session.completed already credited: ${sessionPaymentIntentId}`)
              break
            }
          }

          const { error: bookingError } = await supabase
            .from('bookings')
            .update({
              status: 'confirmed',
              stripe_payment_intent_id: sessionPaymentIntentId ?? undefined,
              paid_at: new Date().toISOString(),
            })
            .eq('id', meta.booking_id)

          if (bookingError) {
            console.error('Error updating booking:', bookingError.message)
          }

          // Balance credit is handled exclusively in payment_intent.succeeded.
          // That event has access to application_fee_amount (the real estimated Stripe fee)
          // which is required to correctly compute net_to_pro.
          // Doing it here would require an extra Stripe API call or a hardcoded formula.
          // The two events share the same idempotency key (stripe_payment_id) so only
          // one will credit — whichever arrives first. Deferring to PI succeeded is safer.

          // Currency from the Checkout Session — authoritative, set at session creation.
          // Profile fetch is only for salon timezone (email formatting) and pro email.
          const checkoutCurrency = (session.currency ?? 'eur').toLowerCase()
          const checkoutIsZeroDecimal = ['jpy', 'krw'].includes(checkoutCurrency)

          const { data: checkoutSalonProfile } = await supabase
            .from('profiles')
            .select('email, full_name, salon_name, timezone')
            .eq('id', meta.profile_id)
            .single()
          const checkoutTimezone = checkoutSalonProfile?.timezone ?? 'Europe/Paris'
          const checkoutAmountNum = parseFloat(meta.amount_total ?? '0')
          const checkoutAmountDisplay = new Intl.NumberFormat('en-US', { style: 'currency', currency: checkoutCurrency.toUpperCase(), minimumFractionDigits: checkoutIsZeroDecimal ? 0 : 2 }).format(checkoutAmountNum)

          const grossAmount = parseFloat(meta.amount_total ?? '0')
          console.log(`Booking ${meta.booking_id} checkout completed: ${checkoutCurrency} ${grossAmount}`)

          const posthogBooking = createPostHogClient()
          posthogBooking.capture({
            distinctId: meta.client_email ?? meta.booking_id,
            event: 'booking checkout completed',
            properties: {
              booking_id: meta.booking_id,
              profile_id: meta.profile_id,
              service_name: meta.service_name,
              booking_datetime: meta.booking_datetime,
              gross_amount: grossAmount,
              currency: checkoutCurrency,
              payment_method: 'checkout_session',
            },
          })
          await posthogBooking.shutdown()

          // ── Emails ────────────────────────────────────────────────
          try {
            const bookingDate = new Date(meta.booking_datetime ?? '')
            const dateStr = bookingDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: checkoutTimezone })
            const timeStr = bookingDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: checkoutTimezone })

            // Email to client
            if (meta.client_email) {
              await sendEmail(
                meta.client_email,
                `Booking confirmed ✅ — ${meta.service_name ?? 'Your service'}`,
                `
                <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#ffffff">
                  <div style="text-align:center;margin-bottom:32px">
                    <h1 style="font-size:28px;font-weight:700;color:#111827;margin:0 0 8px">Booking confirmed! 🎉</h1>
                    <p style="color:#6b7280;margin:0">Your payment has been received.</p>
                  </div>
                  <div style="background:#f9fafb;border-radius:16px;padding:24px;margin-bottom:24px">
                    <table style="width:100%;border-collapse:collapse">
                      <tr><td style="color:#6b7280;padding:8px 0;border-bottom:1px solid #e5e7eb">Service</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;border-bottom:1px solid #e5e7eb">${meta.service_name ?? 'Service'}</td></tr>
                      <tr><td style="color:#6b7280;padding:8px 0;border-bottom:1px solid #e5e7eb">Date</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;border-bottom:1px solid #e5e7eb">${dateStr}</td></tr>
                      <tr><td style="color:#6b7280;padding:8px 0;border-bottom:1px solid #e5e7eb">Time</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;border-bottom:1px solid #e5e7eb">${timeStr}</td></tr>
                      <tr><td style="color:#6b7280;padding:8px 0">Amount paid</td><td style="text-align:right;font-weight:700;color:#F52B8C;font-size:18px;padding:8px 0">${checkoutAmountDisplay}</td></tr>
                    </table>
                  </div>
                  <div style="background:#eff6ff;border-radius:12px;padding:16px;margin-bottom:24px">
                    <p style="color:#1d4ed8;font-size:14px;margin:0">📋 <strong>Free cancellation</strong> up to 24h before your appointment.</p>
                  </div>
                  <p style="color:#9ca3af;font-size:12px;text-align:center;margin:0">Nelsy — Beauty booking platform</p>
                </div>
                `
              )
            }

            // Notification to pro
            if (checkoutSalonProfile?.email) {
              await sendEmail(
                checkoutSalonProfile.email,
                `New booking 💅 — ${meta.client_name ?? 'Client'}`,
                `
                <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#ffffff">
                  <div style="text-align:center;margin-bottom:32px">
                    <h1 style="font-size:24px;font-weight:700;color:#111827;margin:0 0 8px">New booking! 💅</h1>
                    <p style="color:#6b7280;margin:0">A client just booked and paid.</p>
                  </div>
                  <div style="background:#f9fafb;border-radius:16px;padding:24px;margin-bottom:24px">
                    <table style="width:100%;border-collapse:collapse">
                      <tr><td style="color:#6b7280;padding:8px 0;border-bottom:1px solid #e5e7eb">Client</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;border-bottom:1px solid #e5e7eb">${meta.client_name ?? '—'}</td></tr>
                      <tr><td style="color:#6b7280;padding:8px 0;border-bottom:1px solid #e5e7eb">Service</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;border-bottom:1px solid #e5e7eb">${meta.service_name ?? '—'}</td></tr>
                      <tr><td style="color:#6b7280;padding:8px 0;border-bottom:1px solid #e5e7eb">Date</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;border-bottom:1px solid #e5e7eb">${dateStr}</td></tr>
                      <tr><td style="color:#6b7280;padding:8px 0;border-bottom:1px solid #e5e7eb">Time</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;border-bottom:1px solid #e5e7eb">${timeStr}</td></tr>
                      <tr><td style="color:#6b7280;padding:8px 0">Amount received</td><td style="text-align:right;font-weight:700;color:#F52B8C;font-size:18px;padding:8px 0">${checkoutAmountDisplay}</td></tr>
                    </table>
                  </div>
                  <div style="text-align:center">
                    <a href="https://getnelsy.com/dashboard" style="display:inline-block;background:#F52B8C;color:#ffffff;font-weight:700;padding:14px 28px;border-radius:12px;text-decoration:none">View in dashboard →</a>
                  </div>
                </div>
                `
              )
            }
          } catch (emailErr) {
            console.error('Email error (non-blocking):', emailErr)
          }

          break
        }

        // ── Subscription checkout (pro onboarding) ────────────────
        const userId = meta.userId || session.client_reference_id
        if (!userId) break

        const { error } = await supabase
          .from('profiles')
          .update({
            stripe_customer_id: session.customer,
            subscription_status: 'trialing',
            trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
            onboarding_completed: true,
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId)

        if (error) console.error('Error updating profile on checkout:', error.message)

        const posthogTrial = createPostHogClient()
        posthogTrial.capture({
          distinctId: userId,
          event: 'subscription trial started',
          properties: {
            plan: meta.plan ?? 'pro',
            trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          },
        })
        await posthogTrial.shutdown()
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (!profile) break

        let status = 'inactive'
        if (subscription.status === 'active') status = 'active'
        if (subscription.status === 'trialing') {
          // pending_setup_intent is non-null while the user still hasn't entered a card.
          // Keep 'inactive' until the intent clears (card saved); then promote to 'trialing'.
          // 'incomplete' is not in the DB check constraint — use 'inactive' as the intermediate.
          status = subscription.pending_setup_intent ? 'inactive' : 'trialing'
        }
        if (subscription.status === 'past_due') status = 'past_due'
        if (subscription.status === 'canceled') status = 'cancelled'
        if (subscription.status === 'incomplete') status = 'inactive'
        if (subscription.status === 'incomplete_expired') status = 'cancelled'

        const { error } = await supabase
          .from('profiles')
          .update({
            stripe_subscription_id: subscription.id,
            subscription_status: status,
            trial_ends_at: subscription.trial_end
              ? new Date(subscription.trial_end * 1000).toISOString()
              : null,
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            plan: subscription.metadata?.plan ?? null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', profile.id)

        if (error) console.error('Error updating subscription:', error.message)

        if (status === 'active') {
          const posthogSub = createPostHogClient()
          posthogSub.capture({
            distinctId: profile.id,
            event: 'subscription activated',
            properties: {
              subscription_id: subscription.id,
              plan: subscription.metadata?.plan ?? null,
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            },
          })
          await posthogSub.shutdown()
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (!profile) break

        const { error } = await supabase
          .from('profiles')
          .update({
            subscription_status: 'cancelled',
            stripe_subscription_id: null,
            current_period_end: null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', profile.id)

        if (error) console.error('Error cancelling subscription:', error.message)

        const posthogCancel = createPostHogClient()
        posthogCancel.capture({
          distinctId: profile.id,
          event: 'subscription cancelled',
          properties: {
            subscription_id: subscription.id,
            plan: subscription.metadata?.plan ?? null,
          },
        })
        await posthogCancel.shutdown()
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string

        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (!profile) break

        // Idempotency: skip if this invoice was already recorded
        const { data: existing } = await supabase
          .from('transactions')
          .select('id')
          .eq('stripe_invoice_id', invoice.id)
          .maybeSingle()

        if (existing) break

        // Record the transaction
        const { error } = await supabase.from('transactions').insert({
          profile_id: profile.id,
          stripe_invoice_id: invoice.id,
          amount: (invoice.amount_paid ?? 0) / 100,
          currency: invoice.currency,
          status: 'paid',
          description: invoice.description ?? 'Subscription payment',
          created_at: new Date().toISOString(),
        })

        if (error) console.error('Error inserting transaction:', error.message)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string

        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (!profile) break

        // Update subscription status to past_due
        const { error } = await supabase
          .from('profiles')
          .update({
            subscription_status: 'past_due',
            updated_at: new Date().toISOString(),
          })
          .eq('id', profile.id)

        if (error) console.error('Error updating past_due status:', error.message)

        const posthogFailed = createPostHogClient()
        posthogFailed.capture({
          distinctId: profile.id,
          event: 'subscription payment failed',
          properties: {
            invoice_id: invoice.id,
            amount_due: (invoice.amount_due ?? 0) / 100,
            currency: invoice.currency,
          },
        })
        await posthogFailed.shutdown()
        break
      }

      // ── Setup intent succeeded (onboarding card collection) ────────
      // Fires after the user confirms their card in Step 4.
      // This is where we create the Stripe subscription — guaranteeing
      // that no subscription exists in Stripe until a real card is saved.
      case 'setup_intent.succeeded': {
        const setupIntent = event.data.object as Stripe.SetupIntent
        const customerId = setupIntent.customer as string | null
        const priceId = setupIntent.metadata?.price_id
        const userId = setupIntent.metadata?.supabase_user_id
        const plan = setupIntent.metadata?.plan ?? 'pro'

        // Only handle our onboarding SetupIntents (they have price_id in metadata)
        if (!customerId || !priceId || !userId) break

        const { data: profile } = await supabase
          .from('profiles')
          .select('id, stripe_subscription_id, subscription_id')
          .eq('id', userId)
          .single()

        if (!profile) break

        const existingSubId = (profile as { stripe_subscription_id?: string; subscription_id?: string }).stripe_subscription_id
          ?? (profile as { stripe_subscription_id?: string; subscription_id?: string }).subscription_id

        if (existingSubId) {
          try {
            const existingSub = await stripe.subscriptions.retrieve(existingSubId)
            const isLive = existingSub.status === 'trialing' || existingSub.status === 'active'

            if (isLive && existingSub.default_payment_method) {
              // Already fully set up — nothing to do
              console.log(`User ${userId} already has subscription with payment method`)
              break
            }

            if (isLive && !existingSub.default_payment_method) {
              // Old-flow subscription exists but has no card — attach payment method to it
              await stripe.subscriptions.update(existingSubId, {
                default_payment_method: setupIntent.payment_method as string,
              })
              const trialEnd = existingSub.trial_end
                ? new Date(existingSub.trial_end * 1000).toISOString()
                : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
              await supabase.from('profiles').update({
                subscription_status: 'trialing',
                trial_ends_at: trialEnd,
                onboarding_completed: true,
                updated_at: new Date().toISOString(),
              }).eq('id', userId)
              break
            }
          } catch {
            // Subscription not found or expired — create a new one below
          }
        }

        // Create the subscription now that the card is confirmed
        const subscription = await stripe.subscriptions.create({
          customer: customerId,
          items: [{ price: priceId }],
          trial_period_days: 14,
          trial_settings: { end_behavior: { missing_payment_method: 'cancel' } },
          default_payment_method: setupIntent.payment_method as string,
          metadata: { supabase_user_id: userId, plan },
        })

        const trialEnd = subscription.trial_end
          ? new Date(subscription.trial_end * 1000).toISOString()
          : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()

        const { error: subError } = await supabase
          .from('profiles')
          .update({
            stripe_subscription_id: subscription.id,
            subscription_status: 'trialing',
            trial_ends_at: trialEnd,
            onboarding_completed: true,
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId)

        if (subError) console.error('Error saving subscription after setup:', subError.message)

        const posthogSetup = createPostHogClient()
        posthogSetup.capture({
          distinctId: userId,
          event: 'subscription trial started',
          properties: { plan, subscription_id: subscription.id, trial_ends_at: trialEnd },
        })
        await posthogSetup.shutdown()
        break
      }

      // account.updated fires when Stripe finishes Connect onboarding (Express and Custom)
      case 'account.updated': {
        const account = event.data.object as Stripe.Account

        if (account.details_submitted && account.charges_enabled && account.payouts_enabled) {
          const { error } = await supabase
            .from('profiles')
            .update({
              stripe_onboarding_complete: true,
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_account_id', account.id)

          if (error) console.error('Error updating stripe_onboarding_complete:', error.message)

          const posthogConnect = createPostHogClient()
          posthogConnect.capture({
            distinctId: account.id,
            event: 'stripe connect onboarding completed',
            properties: {
              stripe_account_id: account.id,
              charges_enabled: account.charges_enabled,
              details_submitted: account.details_submitted,
            },
          })
          await posthogConnect.shutdown()
        }
        break
      }

      // ── Studio booking flow (PaymentIntent, not Checkout Session) ──
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        const meta = paymentIntent.metadata ?? {}
        if (!meta.booking_id) break

        // Fetch booking for email/analytics (we need this regardless of credit outcome)
        const { data: booking } = await supabase
          .from('bookings')
          .select('id, profile_id, price_total, status, client_email, client_name, booking_datetime, service_id, services(name)')
          .eq('id', meta.booking_id)
          .single()

        if (!booking) break

        // Currency comes from the PaymentIntent itself — authoritative, immutable after creation.
        // Profile is fetched only for salon timezone (email formatting) and pro email address.
        const currency = paymentIntent.currency.toLowerCase()
        const isZeroDecimal = ['jpy', 'krw'].includes(currency)

        // event.account is set for direct charges (connected account fires the event).
        // It is absent for destination charges (platform fires the event).
        const connectedAccountId = (event as unknown as { account?: string }).account ?? null

        const { data: salonProfile } = await supabase
          .from('profiles')
          .select('email, full_name, salon_name, timezone')
          .eq('id', booking.profile_id)
          .single()
        const salonTimezone = salonProfile?.timezone ?? 'Europe/Paris'

        // ── Financial operation: atomic via process_booking_payment ───────────
        const gross = isZeroDecimal ? paymentIntent.amount : paymentIntent.amount / 100

        let stripeFee = 0
        if (connectedAccountId) {
          // Direct charge circuit: Stripe deducts processing fees from the connected
          // account directly. Fetch the actual fee from the connected account's
          // balance transaction for accurate DB records.
          try {
            const latestChargeId = paymentIntent.latest_charge as string | null
            if (latestChargeId) {
              const charge = await stripe.charges.retrieve(
                latestChargeId,
                {},
                { stripeAccount: connectedAccountId },
              )
              if (charge.balance_transaction && typeof charge.balance_transaction === 'string') {
                const bt = await stripe.balanceTransactions.retrieve(
                  charge.balance_transaction,
                  {},
                  { stripeAccount: connectedAccountId },
                )
                stripeFee = isZeroDecimal ? bt.fee : bt.fee / 100
              }
            }
          } catch (feeErr) {
            // Non-blocking: record 0 fee if balance transaction is unavailable
            console.warn('[payment_intent.succeeded] Could not fetch Stripe fee from balance transaction:', feeErr)
          }
        } else {
          // Destination charge circuit (legacy/Express accounts): application_fee_amount
          // is the estimated Stripe fee set at charge creation.
          const feeSmallest = paymentIntent.application_fee_amount ?? 0
          stripeFee = isZeroDecimal ? feeSmallest : feeSmallest / 100
        }

        const { data: creditResult, error: creditError } = await supabase.rpc('process_booking_payment', {
          p_payment_intent_id: paymentIntent.id,
          p_booking_id: meta.booking_id,
          p_profile_id: booking.profile_id,
          p_gross_amount_eur: gross,
          p_stripe_fee_eur: stripeFee,
        })

        if (creditError) {
          // Re-throw so Stripe retries the webhook
          console.error('process_booking_payment failed:', creditError.message)
          throw new Error(`process_booking_payment: ${creditError.message}`)
        }

        const net = parseFloat((gross - stripeFee).toFixed(2))
        console.log(`PaymentIntent booking ${meta.booking_id}: result=${creditResult}, gross ${currency} ${gross}, Stripe fee ${stripeFee}, net to pro ${net}`)

        // ── Analytics (non-blocking — never throws) ───────────────────────────
        try {
          const posthogPI = createPostHogClient()
          const serviceName = (booking.services as { name: string } | null)?.name ?? 'Service'
          posthogPI.capture({
            distinctId: booking.client_email ?? booking.id,
            event: 'booking payment intent completed',
            properties: {
              booking_id: booking.id,
              profile_id: booking.profile_id,
              service_name: serviceName,
              booking_datetime: booking.booking_datetime,
              gross_amount: gross,
              net_amount: net,
              currency,
              payment_intent_id: paymentIntent.id,
              credit_result: creditResult,
            },
          })
          await posthogPI.shutdown()
        } catch (analyticsErr) {
          console.error('Analytics error (non-blocking):', analyticsErr)
        }

        // ── Emails (non-blocking — never throws) ─────────────────────────────
        // Only send emails when the financial operation actually credited (not retries)
        if (creditResult === 'credited') {
          try {
            const serviceName = (booking.services as { name: string } | null)?.name ?? 'Service'
            const bookingDate = new Date(booking.booking_datetime ?? '')
            const dateStr = bookingDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: salonTimezone })
            const timeStr = bookingDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: salonTimezone })
            const rawAmount = isZeroDecimal ? paymentIntent.amount : paymentIntent.amount / 100
            const amountDisplay = new Intl.NumberFormat('en-US', { style: 'currency', currency: currency.toUpperCase(), minimumFractionDigits: isZeroDecimal ? 0 : 2 }).format(rawAmount)

            if (booking.client_email) {
              await sendEmail(
                booking.client_email,
                `Booking confirmed ✅ — ${serviceName}`,
                `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#ffffff">
                  <div style="text-align:center;margin-bottom:32px">
                    <h1 style="font-size:28px;font-weight:700;color:#111827;margin:0 0 8px">Booking confirmed! 🎉</h1>
                    <p style="color:#6b7280;margin:0">Your payment has been received.</p>
                  </div>
                  <div style="background:#f9fafb;border-radius:16px;padding:24px;margin-bottom:24px">
                    <table style="width:100%;border-collapse:collapse">
                      <tr><td style="color:#6b7280;padding:8px 0;border-bottom:1px solid #e5e7eb">Service</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;border-bottom:1px solid #e5e7eb">${serviceName}</td></tr>
                      <tr><td style="color:#6b7280;padding:8px 0;border-bottom:1px solid #e5e7eb">Date</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;border-bottom:1px solid #e5e7eb">${dateStr}</td></tr>
                      <tr><td style="color:#6b7280;padding:8px 0;border-bottom:1px solid #e5e7eb">Time</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;border-bottom:1px solid #e5e7eb">${timeStr}</td></tr>
                      <tr><td style="color:#6b7280;padding:8px 0">Amount paid</td><td style="text-align:right;font-weight:700;color:#F52B8C;font-size:18px;padding:8px 0">${amountDisplay}</td></tr>
                    </table>
                  </div>
                  <div style="background:#eff6ff;border-radius:12px;padding:16px;margin-bottom:24px">
                    <p style="color:#1d4ed8;font-size:14px;margin:0">📋 <strong>Free cancellation</strong> up to 24h before your appointment.</p>
                  </div>
                  <p style="color:#9ca3af;font-size:12px;text-align:center;margin:0">Nelsy — Beauty booking platform</p>
                </div>`
              )
            }

            if (salonProfile?.email) {
              await sendEmail(
                salonProfile.email,
                `New booking 💅 — ${booking.client_name ?? 'Client'}`,
                `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#ffffff">
                  <div style="text-align:center;margin-bottom:32px">
                    <h1 style="font-size:24px;font-weight:700;color:#111827;margin:0 0 8px">New booking! 💅</h1>
                    <p style="color:#6b7280;margin:0">A client just booked and paid.</p>
                  </div>
                  <div style="background:#f9fafb;border-radius:16px;padding:24px;margin-bottom:24px">
                    <table style="width:100%;border-collapse:collapse">
                      <tr><td style="color:#6b7280;padding:8px 0;border-bottom:1px solid #e5e7eb">Client</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;border-bottom:1px solid #e5e7eb">${booking.client_name ?? '—'}</td></tr>
                      <tr><td style="color:#6b7280;padding:8px 0;border-bottom:1px solid #e5e7eb">Service</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;border-bottom:1px solid #e5e7eb">${serviceName}</td></tr>
                      <tr><td style="color:#6b7280;padding:8px 0;border-bottom:1px solid #e5e7eb">Date</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;border-bottom:1px solid #e5e7eb">${dateStr}</td></tr>
                      <tr><td style="color:#6b7280;padding:8px 0;border-bottom:1px solid #e5e7eb">Time</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;border-bottom:1px solid #e5e7eb">${timeStr}</td></tr>
                      <tr><td style="color:#6b7280;padding:8px 0">Amount received</td><td style="text-align:right;font-weight:700;color:#F52B8C;font-size:18px;padding:8px 0">${amountDisplay}</td></tr>
                    </table>
                  </div>
                  <div style="text-align:center">
                    <a href="https://getnelsy.com/dashboard" style="display:inline-block;background:#F52B8C;color:#ffffff;font-weight:700;padding:14px 28px;border-radius:12px;text-decoration:none">View in dashboard →</a>
                  </div>
                </div>`
              )
            }
          } catch (emailErr) {
            console.error('Email error (non-blocking):', emailErr)
          }
        }

        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        const refund = charge.refunds?.data[0]

        // Guard: without a specific refund object we cannot identify the amount or
        // guarantee idempotency — skip to avoid incorrect balance deductions.
        if (!refund?.id || !refund.amount) {
          console.error('[charge.refunded] No refund data — skipping balance deduction')
          break
        }

        // Idempotency: skip if this refund was already deducted
        const { data: existingRefund } = await supabase
          .from('balance_transactions')
          .select('id')
          .eq('stripe_refund_id', refund.id)
          .maybeSingle()

        if (existingRefund) {
          console.log(`[idempotent] charge.refunded already processed: ${refund.id}`)
          break
        }

        const { data: booking } = await supabase
          .from('bookings')
          .select('id, profile_id, price_total, status')
          .eq('stripe_payment_intent_id', charge.payment_intent as string)
          .single()

        if (!booking) break

        // Only cancel if not already cancelled (idempotent status update)
        if (booking.status !== 'cancelled') {
          const { error: bookingError } = await supabase
            .from('bookings')
            .update({ status: 'cancelled' })
            .eq('id', booking.id)
          if (bookingError) console.error('Error updating refunded booking:', bookingError.message)
        }

        // Use the actual Stripe refund amount (in cents → major unit), not booking.price_total.
        // This is correct for partial refunds and deposit-only refunds.
        // charge.currency tells us whether this is zero-decimal (jpy/krw).
        const refundCurrency = ((charge.currency ?? 'eur') as string).toLowerCase()
        const refundIsZeroDecimal = ['jpy', 'krw'].includes(refundCurrency)
        const refundAmount = refundIsZeroDecimal ? refund.amount : refund.amount / 100

        const { error: balanceError } = await supabase.rpc('deduct_from_balance', {
          p_profile_id: booking.profile_id,
          p_amount: refundAmount,
          p_booking_id: booking.id,
          p_type: 'refund',
          p_stripe_refund_id: refund.id,
        })
        if (balanceError && !balanceError.message?.includes('unique')) {
          console.error('Error deducting from balance:', balanceError.message)
        }

        // ── Reverse the destination-charge transfer (non-blocking) ──────────
        // Only applies to destination charges (Express account / legacy circuit).
        // Direct charges (Custom accounts) have no transfer field — skip.
        //
        // Partial refund correctness:
        //   Each partial refund fires a separate charge.refunded event with a unique
        //   refund.id (idempotency key on createReversal) and its own refund.amount.
        //   We retrieve the live transfer to cap the reversal at the remaining
        //   reversible amount, preventing over-reversal errors on successive partials.
        const transferId = typeof charge.transfer === 'string'
          ? charge.transfer
          : (charge.transfer as { id?: string } | null)?.id

        if (transferId) {
          try {
            // Retrieve the transfer to know how much has already been reversed.
            const transfer = await stripe.transfers.retrieve(transferId)
            const alreadyReversed = transfer.amount_reversed ?? 0
            const maxReversible = transfer.amount - alreadyReversed

            if (maxReversible <= 0) {
              console.log(`[charge.refunded] Transfer ${transferId} fully reversed already — skipping`)
            } else {
              // Cap to remaining reversible amount in case of successive partial refunds
              const reversalAmount = Math.min(refund.amount, maxReversible)
              await stripe.transfers.createReversal(
                transferId,
                {
                  amount: reversalAmount,
                  description: `Reversal for refund ${refund.id}`,
                  metadata: { refund_id: refund.id, booking_id: booking.id },
                },
                // Idempotency key scoped to refund ID — safe for webhook retries
                { idempotencyKey: `reversal-${refund.id}` },
              )
              console.log(`[charge.refunded] Transfer reversal ${transferId}: requested=${refund.amount} capped=${reversalAmount} already_reversed=${alreadyReversed}`)
            }
          } catch (reversalErr: unknown) {
            const msg = (reversalErr as Error).message ?? ''
            // Idempotent replay: same key, same amount — Stripe returns the original reversal
            // "Transfer already fully reversed" or Stripe idempotency match → skip
            if (msg.includes('already') || msg.includes('idempotent')) {
              console.log(`[charge.refunded] Transfer reversal idempotent/already done: ${msg}`)
            } else {
              // Log but don't fail the webhook — the platform refund already went through
              console.error('[charge.refunded] Transfer reversal error (non-fatal):', msg)
            }
          }
        } else {
          // Direct charge (no transfer field) — no reversal needed.
          // The refund was issued directly on the connected account.
          console.log(`[charge.refunded] No transfer on charge ${charge.id} — direct charge, no reversal needed`)
        }

        console.log(`Refund processed for booking ${booking.id}: ${refundCurrency} ${refundAmount}`)

        const posthogRefund = createPostHogClient()
        posthogRefund.capture({
          distinctId: booking.profile_id,
          event: 'booking refunded',
          properties: {
            booking_id: booking.id,
            profile_id: booking.profile_id,
            amount: refundAmount,
            currency: refundCurrency,
            refund_id: refund.id,
          },
        })
        await posthogRefund.shutdown()
        break
      }

      // ── Payout lifecycle (Connect events — arrive with event.account set) ────
      //
      // Connect events are sent to the webhook when Stripe forwards events from
      // a connected account. The webhook endpoint must be configured with
      // "Listen to events on Connected accounts" enabled in Stripe Dashboard.
      //
      // Guard against:
      // - Missing account field (non-Connect delivery) → skip
      // - Unknown connected account → skip
      // - Out-of-order events: status transitions only advance (paid/failed > in_transit > pending)
      // - Duplicate events: same terminal state → idempotent no-op
      //
      // State machine: pending → in_transit → paid
      //                                     → failed
      //                pending/in_transit   → canceled

      case 'payout.created': {
        const payout = event.data.object as Stripe.Payout
        const accountId = (event as unknown as { account?: string }).account
        if (!accountId) {
          console.warn('[payout.created] missing event.account — not a Connect event, skipping')
          break
        }

        const { data: profile } = await supabase
          .from('profiles').select('id').eq('stripe_account_id', accountId).single()
        if (!profile) {
          console.warn(`[payout.created] no profile for account ${accountId}`)
          break
        }

        const payoutCurrency = payout.currency.toLowerCase()
        const isZeroDecimal = ['jpy', 'krw'].includes(payoutCurrency)
        const payoutAmount = isZeroDecimal ? payout.amount : payout.amount / 100

        // Upsert: if create-payout already wrote a placeholder row, update it;
        // otherwise create the row from webhook (e.g. automatic payout).
        // Use stripe_payout_id as conflict key — the placeholder had a temp id.
        const { data: existingRow } = await supabase
          .from('payouts')
          .select('id, stripe_payout_id')
          .eq('stripe_payout_id', payout.id)
          .maybeSingle()

        if (existingRow) {
          // Already recorded by create-payout endpoint — just ensure status is in sync
          await supabase.from('payouts')
            .update({ status: payout.status, stripe_created_at: new Date(payout.created * 1000).toISOString() })
            .eq('stripe_payout_id', payout.id)
        } else {
          await supabase.from('payouts').insert({
            profile_id: profile.id,
            stripe_payout_id: payout.id,
            amount: payoutAmount,
            currency: payoutCurrency,
            status: payout.status,
            estimated_arrival: payout.arrival_date
              ? new Date(payout.arrival_date * 1000).toISOString() : null,
            stripe_created_at: new Date(payout.created * 1000).toISOString(),
          })
        }

        console.log(`[payout.created] ${payout.id} ${payoutCurrency} ${payoutAmount}`)
        break
      }

      case 'payout.updated': {
        const payout = event.data.object as Stripe.Payout
        const accountId = (event as unknown as { account?: string }).account
        if (!accountId) break

        // Update estimated_arrival and status if still in a non-terminal state
        const { data: existing } = await supabase
          .from('payouts').select('status').eq('stripe_payout_id', payout.id).maybeSingle()
        if (existing && !['paid', 'failed', 'canceled'].includes(existing.status)) {
          await supabase.from('payouts')
            .update({
              status: payout.status,
              estimated_arrival: payout.arrival_date
                ? new Date(payout.arrival_date * 1000).toISOString() : null,
            })
            .eq('stripe_payout_id', payout.id)
        }
        break
      }

      case 'payout.paid': {
        const payout = event.data.object as Stripe.Payout
        const accountId = (event as unknown as { account?: string }).account
        if (!accountId) break

        // Idempotent: if already paid, skip
        const { data: existing } = await supabase
          .from('payouts').select('status').eq('stripe_payout_id', payout.id).maybeSingle()
        if (existing?.status === 'paid') {
          console.log(`[idempotent] payout.paid already recorded: ${payout.id}`)
          break
        }

        await supabase.from('payouts')
          .update({ status: 'paid', paid_at: new Date().toISOString() })
          .eq('stripe_payout_id', payout.id)
          // Guard: only advance from non-terminal states (handles out-of-order delivery)
          .in('status', ['pending', 'in_transit'])

        console.log(`[payout.paid] ${payout.id}`)
        break
      }

      case 'payout.failed': {
        const payout = event.data.object as Stripe.Payout
        const accountId = (event as unknown as { account?: string }).account
        if (!accountId) break

        const { data: existing } = await supabase
          .from('payouts').select('status').eq('stripe_payout_id', payout.id).maybeSingle()
        if (existing?.status === 'failed') {
          console.log(`[idempotent] payout.failed already recorded: ${payout.id}`)
          break
        }

        // No status guard here — Stripe legitimately fires payout.failed after
        // payout.paid for ACH reversals (bank returns the funds). Allow the
        // transition paid → failed in addition to pending/in_transit → failed.
        await supabase.from('payouts')
          .update({
            status: 'failed',
            failure_code: payout.failure_code ?? null,
            failure_message: payout.failure_message ?? null,
          })
          .eq('stripe_payout_id', payout.id)

        console.log(`[payout.failed] ${payout.id} reason=${payout.failure_code}`)
        break
      }

      case 'payout.canceled': {
        const payout = event.data.object as Stripe.Payout
        const accountId = (event as unknown as { account?: string }).account
        if (!accountId) break

        const { data: existing } = await supabase
          .from('payouts').select('status').eq('stripe_payout_id', payout.id).maybeSingle()
        if (existing?.status === 'canceled') {
          console.log(`[idempotent] payout.canceled already recorded: ${payout.id}`)
          break
        }

        await supabase.from('payouts')
          .update({ status: 'canceled' })
          .eq('stripe_payout_id', payout.id)
          .in('status', ['pending', 'in_transit'])

        console.log(`[payout.canceled] ${payout.id}`)
        break
      }

      default:
        break
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    return new Response(
      JSON.stringify({ error: message }),
      { headers: { 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
