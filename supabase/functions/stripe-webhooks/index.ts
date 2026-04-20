import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import Stripe from 'npm:stripe@13.11.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const FROM_EMAIL = 'Nelsy <onboarding@resend.dev>'

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

    // Verify webhook signature — throws if invalid
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const meta = session.metadata ?? {}

        // ── Booking payment (full price) ──────────────────────────
        if (meta.booking_id) {
          const { error: bookingError } = await supabase
            .from('bookings')
            .update({
              status: 'confirmed',
              stripe_payment_intent_id: session.payment_intent as string,
              paid_at: new Date().toISOString(),
            })
            .eq('id', meta.booking_id)

          if (bookingError) {
            console.error('Error updating booking:', bookingError.message)
          }

          // Pro receives 100% minus Stripe fees only (no Nelsy commission)
          const grossAmount = parseFloat(meta.amount_total ?? '0')
          const stripeFee = parseFloat(((grossAmount * 0.029) + 0.25).toFixed(2))
          const netAmount = parseFloat((grossAmount - stripeFee).toFixed(2))

          const { error: balanceError } = await supabase.rpc('add_to_balance', {
            p_profile_id: meta.profile_id,
            p_amount: netAmount,
            p_booking_id: meta.booking_id,
            p_type: 'booking_payment',
            p_stripe_payment_id: session.payment_intent as string,
          })

          if (balanceError) {
            console.error('Error adding to balance:', balanceError.message)
          }

          console.log(`Booking ${meta.booking_id} paid: gross €${grossAmount}, Stripe fee €${stripeFee}, net to pro €${netAmount}`)

          // ── Emails ────────────────────────────────────────────────
          try {
            const bookingDate = new Date(meta.booking_datetime ?? '')
            const dateStr = bookingDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
            const timeStr = bookingDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
            const amount = parseFloat(meta.amount_total ?? '0').toFixed(2)

            // Email to client
            if (meta.client_email) {
              await sendEmail(
                meta.client_email,
                `Réservation confirmée ✅ — ${meta.service_name ?? 'Votre service'}`,
                `
                <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#ffffff">
                  <div style="text-align:center;margin-bottom:32px">
                    <h1 style="font-size:28px;font-weight:700;color:#111827;margin:0 0 8px">Réservation confirmée ! 🎉</h1>
                    <p style="color:#6b7280;margin:0">Votre paiement a bien été reçu.</p>
                  </div>
                  <div style="background:#f9fafb;border-radius:16px;padding:24px;margin-bottom:24px">
                    <table style="width:100%;border-collapse:collapse">
                      <tr><td style="color:#6b7280;padding:8px 0;border-bottom:1px solid #e5e7eb">Service</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;border-bottom:1px solid #e5e7eb">${meta.service_name ?? 'Service'}</td></tr>
                      <tr><td style="color:#6b7280;padding:8px 0;border-bottom:1px solid #e5e7eb">Date</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;border-bottom:1px solid #e5e7eb">${dateStr}</td></tr>
                      <tr><td style="color:#6b7280;padding:8px 0;border-bottom:1px solid #e5e7eb">Heure</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;border-bottom:1px solid #e5e7eb">${timeStr}</td></tr>
                      <tr><td style="color:#6b7280;padding:8px 0">Montant payé</td><td style="text-align:right;font-weight:700;color:#F52B8C;font-size:18px;padding:8px 0">€${amount}</td></tr>
                    </table>
                  </div>
                  <div style="background:#eff6ff;border-radius:12px;padding:16px;margin-bottom:24px">
                    <p style="color:#1d4ed8;font-size:14px;margin:0">📋 <strong>Annulation gratuite</strong> jusqu'à 24h avant le rendez-vous.</p>
                  </div>
                  <p style="color:#9ca3af;font-size:12px;text-align:center;margin:0">Nelsy — La plateforme des pros de la beauté</p>
                </div>
                `
              )
            }

            // Notification to pro
            const { data: proProfile } = await supabase
              .from('profiles')
              .select('email, full_name, salon_name')
              .eq('id', meta.profile_id)
              .single()

            if (proProfile?.email) {
              await sendEmail(
                proProfile.email,
                `Nouvelle réservation 💅 — ${meta.client_name ?? 'Client'}`,
                `
                <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#ffffff">
                  <div style="text-align:center;margin-bottom:32px">
                    <h1 style="font-size:24px;font-weight:700;color:#111827;margin:0 0 8px">Nouvelle réservation ! 💅</h1>
                    <p style="color:#6b7280;margin:0">Un client vient de réserver et payer.</p>
                  </div>
                  <div style="background:#f9fafb;border-radius:16px;padding:24px;margin-bottom:24px">
                    <table style="width:100%;border-collapse:collapse">
                      <tr><td style="color:#6b7280;padding:8px 0;border-bottom:1px solid #e5e7eb">Client</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;border-bottom:1px solid #e5e7eb">${meta.client_name ?? '—'}</td></tr>
                      <tr><td style="color:#6b7280;padding:8px 0;border-bottom:1px solid #e5e7eb">Service</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;border-bottom:1px solid #e5e7eb">${meta.service_name ?? '—'}</td></tr>
                      <tr><td style="color:#6b7280;padding:8px 0;border-bottom:1px solid #e5e7eb">Date</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;border-bottom:1px solid #e5e7eb">${dateStr}</td></tr>
                      <tr><td style="color:#6b7280;padding:8px 0;border-bottom:1px solid #e5e7eb">Heure</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;border-bottom:1px solid #e5e7eb">${timeStr}</td></tr>
                      <tr><td style="color:#6b7280;padding:8px 0">Montant encaissé</td><td style="text-align:right;font-weight:700;color:#F52B8C;font-size:18px;padding:8px 0">€${amount}</td></tr>
                    </table>
                  </div>
                  <div style="text-align:center">
                    <a href="https://nelsy.app/dashboard" style="display:inline-block;background:#F52B8C;color:#ffffff;font-weight:700;padding:14px 28px;border-radius:12px;text-decoration:none">Voir dans mon dashboard →</a>
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
        if (subscription.status === 'trialing') status = 'trialing'
        if (subscription.status === 'past_due') status = 'past_due'
        if (subscription.status === 'canceled') status = 'cancelled'

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
        break
      }

      // account.updated fires when Stripe finishes Connect onboarding
      case 'account.updated': {
        const account = event.data.object as Stripe.Account

        if (account.details_submitted && account.charges_enabled) {
          const { error } = await supabase
            .from('profiles')
            .update({
              stripe_onboarding_complete: true,
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_account_id', account.id)

          if (error) console.error('Error updating stripe_onboarding_complete:', error.message)
        }
        break
      }

      // ── Studio booking flow (PaymentIntent, not Checkout Session) ──
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        const meta = paymentIntent.metadata ?? {}
        if (!meta.booking_id) break

        // Fetch full booking details from DB
        const { data: booking } = await supabase
          .from('bookings')
          .select('id, profile_id, price_total, status, client_email, client_name, booking_datetime, service_id, services(name)')
          .eq('id', meta.booking_id)
          .single()

        if (!booking) break

        // Mark as paid if client-side update hasn't done it yet
        if (booking.status === 'pending') {
          await supabase
            .from('bookings')
            .update({ status: 'paid', stripe_payment_intent_id: paymentIntent.id, paid_at: new Date().toISOString() })
            .eq('id', booking.id)
        }

        // Pro receives 100% minus Stripe fees only (no Nelsy commission)
        const gross = parseFloat(String(booking.price_total ?? 0))
        const stripeFee = parseFloat(((gross * 0.029) + 0.25).toFixed(2))
        const net = parseFloat((gross - stripeFee).toFixed(2))

        const { error: balanceError } = await supabase.rpc('add_to_balance', {
          p_profile_id: booking.profile_id,
          p_amount: net,
          p_booking_id: booking.id,
          p_type: 'booking_payment',
          p_stripe_payment_id: paymentIntent.id,
        })
        if (balanceError) console.error('Error adding to balance:', balanceError.message)
        console.log(`PaymentIntent booking: gross €${gross}, Stripe fee €${stripeFee}, net to pro €${net}`)

        // Emails
        try {
          const bookingDate = new Date(booking.booking_datetime ?? '')
          const dateStr = bookingDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
          const timeStr = bookingDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
          const serviceName = (booking.services as { name: string } | null)?.name ?? 'Service'
          const amount = parseFloat(String(booking.price_total)).toFixed(2)

          if (booking.client_email) {
            await sendEmail(
              booking.client_email,
              `Réservation confirmée ✅ — ${serviceName}`,
              `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#ffffff">
                <div style="text-align:center;margin-bottom:32px">
                  <h1 style="font-size:28px;font-weight:700;color:#111827;margin:0 0 8px">Réservation confirmée ! 🎉</h1>
                  <p style="color:#6b7280;margin:0">Votre paiement a bien été reçu.</p>
                </div>
                <div style="background:#f9fafb;border-radius:16px;padding:24px;margin-bottom:24px">
                  <table style="width:100%;border-collapse:collapse">
                    <tr><td style="color:#6b7280;padding:8px 0;border-bottom:1px solid #e5e7eb">Service</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;border-bottom:1px solid #e5e7eb">${serviceName}</td></tr>
                    <tr><td style="color:#6b7280;padding:8px 0;border-bottom:1px solid #e5e7eb">Date</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;border-bottom:1px solid #e5e7eb">${dateStr}</td></tr>
                    <tr><td style="color:#6b7280;padding:8px 0;border-bottom:1px solid #e5e7eb">Heure</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;border-bottom:1px solid #e5e7eb">${timeStr}</td></tr>
                    <tr><td style="color:#6b7280;padding:8px 0">Montant payé</td><td style="text-align:right;font-weight:700;color:#F52B8C;font-size:18px;padding:8px 0">€${amount}</td></tr>
                  </table>
                </div>
                <div style="background:#eff6ff;border-radius:12px;padding:16px;margin-bottom:24px">
                  <p style="color:#1d4ed8;font-size:14px;margin:0">📋 <strong>Annulation gratuite</strong> jusqu'à 24h avant le rendez-vous.</p>
                </div>
                <p style="color:#9ca3af;font-size:12px;text-align:center;margin:0">Nelsy — La plateforme des pros de la beauté</p>
              </div>`
            )
          }

          const { data: proProfile } = await supabase
            .from('profiles')
            .select('email, full_name, salon_name')
            .eq('id', booking.profile_id)
            .single()

          if (proProfile?.email) {
            await sendEmail(
              proProfile.email,
              `Nouvelle réservation 💅 — ${booking.client_name ?? 'Client'}`,
              `<div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#ffffff">
                <div style="text-align:center;margin-bottom:32px">
                  <h1 style="font-size:24px;font-weight:700;color:#111827;margin:0 0 8px">Nouvelle réservation ! 💅</h1>
                  <p style="color:#6b7280;margin:0">Un client vient de réserver et payer.</p>
                </div>
                <div style="background:#f9fafb;border-radius:16px;padding:24px;margin-bottom:24px">
                  <table style="width:100%;border-collapse:collapse">
                    <tr><td style="color:#6b7280;padding:8px 0;border-bottom:1px solid #e5e7eb">Client</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;border-bottom:1px solid #e5e7eb">${booking.client_name ?? '—'}</td></tr>
                    <tr><td style="color:#6b7280;padding:8px 0;border-bottom:1px solid #e5e7eb">Service</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;border-bottom:1px solid #e5e7eb">${serviceName}</td></tr>
                    <tr><td style="color:#6b7280;padding:8px 0;border-bottom:1px solid #e5e7eb">Date</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;border-bottom:1px solid #e5e7eb">${dateStr}</td></tr>
                    <tr><td style="color:#6b7280;padding:8px 0;border-bottom:1px solid #e5e7eb">Heure</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;border-bottom:1px solid #e5e7eb">${timeStr}</td></tr>
                    <tr><td style="color:#6b7280;padding:8px 0">Montant encaissé</td><td style="text-align:right;font-weight:700;color:#F52B8C;font-size:18px;padding:8px 0">€${amount}</td></tr>
                  </table>
                </div>
                <div style="text-align:center">
                  <a href="https://nelsy.app/dashboard" style="display:inline-block;background:#F52B8C;color:#ffffff;font-weight:700;padding:14px 28px;border-radius:12px;text-decoration:none">Voir dans mon dashboard →</a>
                </div>
              </div>`
            )
          }
        } catch (emailErr) {
          console.error('Email error (non-blocking):', emailErr)
        }

        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        const refund = charge.refunds?.data[0]

        const { data: booking } = await supabase
          .from('bookings')
          .select('id, profile_id, price_total')
          .eq('stripe_payment_intent_id', charge.payment_intent as string)
          .single()

        if (!booking) break

        const { error: bookingError } = await supabase
          .from('bookings')
          .update({ status: 'cancelled' })
          .eq('id', booking.id)

        if (bookingError) console.error('Error updating refunded booking:', bookingError.message)

        const { error: balanceError } = await supabase.rpc('deduct_from_balance', {
          p_profile_id: booking.profile_id,
          p_amount: booking.price_total,
          p_booking_id: booking.id,
          p_type: 'refund',
          p_stripe_refund_id: refund?.id ?? null,
        })

        if (balanceError) console.error('Error deducting from balance:', balanceError.message)

        console.log(`Refund processed for booking ${booking.id}`)
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
