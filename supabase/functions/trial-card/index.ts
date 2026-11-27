// Card collection during a no-card trial. Deploy with JWT verification on.
//
// Body: { action: 'status' } → { status, trialStart, trialEnd, hasCard, cancelAtPeriodEnd, price, trialEnded }   (read only)
//       After the subscription was deleted (profile has no subscription id), status describes the customer's
//       latest subscription, with trialEnded true when it was a no-card trial that ended without a card.
//       { action: 'checkout' } → { url }   Stripe Checkout in setup mode (card, Apple Pay, Google Pay).
//
// Checkout setup mode saves the card without charging. The webhook (checkout.session.completed,
// metadata.purpose 'trial_card') then sets it as the subscription's and the customer's default payment
// method, so Stripe charges it when the trial ends instead of canceling.
import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import Stripe from 'npm:stripe@13.11.0'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { isTrialEndCancellation } from '../_shared/trial.ts'
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

    const body = await req.json().catch(() => ({})) as { action?: string }

    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, stripe_subscription_id')
      .eq('id', user.id)
      .single()
    if (!profile?.stripe_customer_id) {
      return json({ error: 'No subscription found. Start your free trial first.' }, 400)
    }

    let subId = profile.stripe_subscription_id as string | null
    if (!subId && body.action === 'status') {
      // Ended plan: the webhook cleared the id. Describe the latest subscription (paused page copy).
      const latest = await stripe.subscriptions.list({ customer: profile.stripe_customer_id, status: 'all', limit: 1 })
      subId = latest.data[0]?.id ?? null
    }
    if (!subId) return json({ error: 'No subscription found. Start your free trial first.' }, 400)

    const [sub, customer] = await Promise.all([
      stripe.subscriptions.retrieve(subId),
      stripe.customers.retrieve(profile.stripe_customer_id),
    ])
    const c = customer as Stripe.Customer
    const hasCard = !!sub.default_payment_method ||
      (!c.deleted && (!!c.invoice_settings?.default_payment_method || !!c.default_source))

    if (body.action === 'status') {
      const price = sub.items.data[0]?.price
      return json({
        status: sub.status,
        trialStart: sub.trial_start ? new Date(sub.trial_start * 1000).toISOString() : null,
        trialEnd: sub.trial_end ? new Date(sub.trial_end * 1000).toISOString() : null,
        hasCard,
        cancelAtPeriodEnd: sub.cancel_at_period_end,
        price: price?.unit_amount != null
          ? { amount: price.unit_amount / 100, currency: price.currency, interval: price.recurring?.interval ?? 'month' }
          : null,
        trialEnded: isTrialEndCancellation(sub as unknown as SubscriptionLike),
      })
    }

    if (body.action === 'checkout') {
      if (sub.status !== 'trialing' && sub.status !== 'active' && sub.status !== 'past_due') {
        return json({ error: 'This subscription has ended. Reactivate your plan instead.' }, 409)
      }
      const origin = req.headers.get('origin') ?? Deno.env.get('APP_URL') ?? 'https://getnelsy.com'
      const meta = { purpose: 'trial_card', supabase_user_id: user.id, subscription_id: sub.id }
      const session = await stripe.checkout.sessions.create({
        mode: 'setup',
        payment_method_types: ['card'],
        customer: profile.stripe_customer_id,
        client_reference_id: user.id,
        metadata: meta,
        setup_intent_data: { metadata: meta },
        success_url: `${origin}/dashboard?card_added=1`,
        cancel_url: `${origin}/dashboard`,
      })
      return json({ url: session.url })
    }

    return json({ error: 'Unknown action' }, 400)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    console.error('trial-card error:', message)
    return json({ error: message }, 500)
  }
})
