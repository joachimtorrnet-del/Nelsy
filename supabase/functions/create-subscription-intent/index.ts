import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import Stripe from 'npm:stripe@13.11.0'
import { createClient } from 'npm:@supabase/supabase-js@2'

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

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  try {
    const authHeader = req.headers.get('Authorization') ?? ''
    const token = authHeader.replace('Bearer ', '')

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    const { plan } = await req.json() as { plan?: string }

    // Map plan to an authorized server-side Price ID — never accept arbitrary priceId from client
    const PLAN_PRICE_MAP: Record<string, string | undefined> = {
      monthly: Deno.env.get('STRIPE_PRICE_MONTHLY'),
      yearly: Deno.env.get('STRIPE_PRICE_YEARLY'),
    }
    if (!plan || !Object.prototype.hasOwnProperty.call(PLAN_PRICE_MAP, plan)) {
      return new Response(JSON.stringify({ error: "plan must be 'monthly' or 'yearly'" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }
    const priceId = PLAN_PRICE_MAP[plan]
    if (!priceId) {
      return new Response(JSON.stringify({ error: `STRIPE_PRICE_${plan.toUpperCase()} env var is not set` }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    // Load existing Stripe IDs and subscription status to prevent duplicate subscriptions
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, stripe_subscription_id, subscription_status')
      .eq('id', user.id)
      .single()

    // Guard: if user already has a live subscription, return it rather than creating another
    if (
      existingProfile?.stripe_subscription_id &&
      (existingProfile.subscription_status === 'trialing' || existingProfile.subscription_status === 'active')
    ) {
      return new Response(
        JSON.stringify({
          alreadySubscribed: true,
          subscriptionId: existingProfile.stripe_subscription_id,
          subscription_status: existingProfile.subscription_status,
        }),
        { headers: { 'Content-Type': 'application/json', ...corsHeaders } },
      )
    }

    let customerId = existingProfile?.stripe_customer_id ?? null

    // If there's already a pending subscription with a live setup intent, reuse it.
    // This handles the case where the user abandoned the payment step and came back.
    if (existingProfile?.stripe_subscription_id) {
      try {
        const existingSub = await stripe.subscriptions.retrieve(existingProfile.stripe_subscription_id, {
          expand: ['pending_setup_intent'],
        })
        const psi = existingSub.pending_setup_intent as Stripe.SetupIntent | null

        if (psi?.client_secret && existingSub.status === 'trialing') {
          // Still a valid pending setup — return the existing intent, no new subscription
          return new Response(
            JSON.stringify({ clientSecret: psi.client_secret, type: 'setup', subscriptionId: existingSub.id }),
            { headers: { 'Content-Type': 'application/json', ...corsHeaders } },
          )
        }
      } catch {
        // Subscription not found or already expired — fall through to create a new one
      }
    }

    // Reuse existing Stripe customer or create a new one
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email ?? '',
        metadata: { supabase_user_id: user.id, plan: plan },
      })
      customerId = customer.id
    }

    // Create subscription with 14-day trial.
    // payment_behavior: 'default_incomplete' + pending_setup_intent collects the card
    // upfront without charging. trial_settings ensures Stripe auto-cancels at trial end
    // if no payment method was ever saved.
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      trial_period_days: 14,
      trial_settings: {
        end_behavior: { missing_payment_method: 'cancel' },
      },
      payment_behavior: 'default_incomplete',
      payment_settings: {
        save_default_payment_method: 'on_subscription',
        payment_method_types: ['card'],
      },
      expand: ['latest_invoice.payment_intent', 'pending_setup_intent'],
      metadata: { supabase_user_id: user.id, plan },
    })

    const psi = subscription.pending_setup_intent as Stripe.SetupIntent | null
    const latestInvoice = subscription.latest_invoice as Stripe.Invoice | null
    const pi = latestInvoice?.payment_intent as Stripe.PaymentIntent | null

    let clientSecret: string | null = null
    let type: 'setup' | 'payment' = 'setup'

    if (psi?.client_secret) {
      clientSecret = psi.client_secret
      type = 'setup'
    } else if (pi?.client_secret) {
      clientSecret = pi.client_secret
      type = 'payment'
    }

    if (!clientSecret) throw new Error('No client_secret returned by Stripe subscription')

    // Save Stripe IDs so the webhook can look up the profile by stripe_customer_id.
    // Do NOT write subscription_status: the DB check constraint does not allow 'incomplete',
    // and the webhook will write 'inactive' → 'trialing' as the SetupIntent progresses.
    const { error: dbError } = await supabase.from('profiles').update({
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
    }).eq('id', user.id)
    if (dbError) console.error('create-subscription-intent DB write error:', dbError.message)

    return new Response(
      JSON.stringify({ clientSecret, type, subscriptionId: subscription.id }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } },
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    console.error('create-subscription-intent error:', message)
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } },
    )
  }
})
