// Starts the 14-day free trial WITHOUT a card (web signup, last screen). Deploy with JWT verification on.
//
// Body: { plan?: string, check?: boolean }
//   check: true  → { eligible, alreadySubscribed } and no writes (used to pick the screen copy)
//   otherwise    → one of
//     { alreadySubscribed: true, status, subscriptionId, trialEnd }   live subscription reused
//     { status: 'trialing', subscriptionId, trialEnd }               trial started, page live now
//     { checkoutRequired: true, url }                                trial already used: pay now on Stripe Checkout
//
// Idempotent: reuses the profile's Stripe customer (or finds it by metadata), never creates a second live
// subscription, and uses Stripe idempotency keys so a double click creates one subscription.
// The card-first path (create-subscription-intent) is untouched for old clients.
import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import Stripe from 'npm:stripe@13.11.0'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { resolvePlan } from '../_shared/plans.ts'
import { decideTrial, NO_CARD_TRIAL_KEY, profileStatusFor, TRIAL_DAYS } from '../_shared/trial.ts'
import type { SubscriptionLike } from '../_shared/trial.ts'

const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
if (!stripeSecretKey) throw new Error('STRIPE_SECRET_KEY is not set')

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...corsHeaders } })

const iso = (unix: number | null | undefined) => (unix ? new Date(unix * 1000).toISOString() : null)

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  try {
    const token = (req.headers.get('Authorization') ?? '').replace('Bearer ', '')
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) return json({ error: 'Unauthorized' }, 401)

    const body = await req.json().catch(() => ({})) as { plan?: string; check?: boolean }
    const resolved = resolvePlan(body.plan ?? 'monthly')
    if (!resolved) return json({ error: 'Unknown or unavailable plan' }, 400)
    if (!resolved.priceId) return json({ error: `${resolved.envVar} env var is not set` }, 500)

    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, stripe_subscription_id, subscription_status')
      .eq('id', user.id)
      .single()

    // Customer: the profile's, else one created earlier for this user whose id never reached the DB.
    let customerId: string | null = profile?.stripe_customer_id ?? null
    if (!customerId) {
      try {
        const found = await stripe.customers.search({ query: `metadata['supabase_user_id']:'${user.id}'`, limit: 1 })
        customerId = found.data[0]?.id ?? null
      } catch { /* search unavailable: create below */ }
    }

    const subs: Stripe.Subscription[] = customerId
      ? (await stripe.subscriptions.list({ customer: customerId, status: 'all', limit: 100 })).data
      : []
    const decision = decideTrial(subs as unknown as SubscriptionLike[])

    if (body.check) {
      return json({ eligible: decision.action === 'start_trial', alreadySubscribed: decision.action === 'reuse' })
    }

    if (decision.action === 'reuse') {
      const sub = subs.find((s) => s.id === decision.subscription.id)!
      // Repair a profile that missed the earlier write (e.g. tab closed mid-request).
      const status = profileStatusFor(sub as unknown as SubscriptionLike)
      if (profile?.stripe_subscription_id !== sub.id || profile?.subscription_status !== status) {
        await supabase.from('profiles').update({
          stripe_customer_id: customerId,
          stripe_subscription_id: sub.id,
          subscription_status: status,
          trial_ends_at: iso(sub.trial_end),
          current_period_end: iso(sub.current_period_end),
          updated_at: new Date().toISOString(),
        }).eq('id', user.id)
      }
      return json({ alreadySubscribed: true, status: sub.status, subscriptionId: sub.id, trialEnd: iso(sub.trial_end) })
    }

    if (!customerId) {
      const customer = await stripe.customers.create(
        { email: user.email ?? '', metadata: { supabase_user_id: user.id, plan: resolved.key } },
        { idempotencyKey: `start-trial-customer:${user.id}` },
      )
      customerId = customer.id
      await supabase.from('profiles').update({ stripe_customer_id: customerId }).eq('id', user.id)
    }

    const cancelAbandoned = async () => {
      for (const id of decision.cancelIds) {
        try { await stripe.subscriptions.cancel(id) } catch (e) { console.error('[start-trial] cancel abandoned', id, e) }
      }
    }

    if (decision.action === 'checkout') {
      // Trial already used on this account: reactivate with an immediate first payment, no trial.
      await cancelAbandoned()
      const origin = req.headers.get('origin') ?? Deno.env.get('APP_URL') ?? 'https://getnelsy.com'
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        customer: customerId,
        client_reference_id: user.id,
        line_items: [{ price: resolved.priceId, quantity: 1 }],
        subscription_data: { metadata: { supabase_user_id: user.id, plan: resolved.key } },
        metadata: { userId: user.id, plan: resolved.key },
        success_url: `${origin}/dashboard?subscribed=1`,
        cancel_url: `${origin}/dashboard`,
      })
      return json({ checkoutRequired: true, url: session.url })
    }

    // No card: Stripe keeps the subscription in trial, then cancels it at trial end if no
    // payment method was added (customer.subscription.deleted → profile back to draft).
    const subscription = await stripe.subscriptions.create(
      {
        customer: customerId,
        items: [{ price: resolved.priceId }],
        trial_period_days: TRIAL_DAYS,
        trial_settings: { end_behavior: { missing_payment_method: 'cancel' } },
        payment_settings: { save_default_payment_method: 'on_subscription' },
        metadata: { supabase_user_id: user.id, plan: resolved.key, [NO_CARD_TRIAL_KEY]: '1' },
      },
      // Same key for a double click / retry: Stripe returns the first subscription instead of a second one.
      { idempotencyKey: `start-trial-sub:${user.id}:${customerId}:${subs.length}:${resolved.key}` },
    )

    // Live immediately: no webhook round trip needed (the webhook writes the same values later).
    const { error: dbError } = await supabase.from('profiles').update({
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
      subscription_status: 'trialing',
      trial_ends_at: iso(subscription.trial_end),
      current_period_end: iso(subscription.current_period_end),
      plan: resolved.key,
      onboarding_completed: true,
      updated_at: new Date().toISOString(),
    }).eq('id', user.id)
    if (dbError) console.error('[start-trial] profile update error:', dbError.message)

    // After the profile points at the new subscription, so the old one's cancel events are ignored.
    await cancelAbandoned()

    return json({ status: 'trialing', subscriptionId: subscription.id, trialEnd: iso(subscription.trial_end) })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    console.error('start-trial error:', message)
    return json({ error: message }, 500)
  }
})
