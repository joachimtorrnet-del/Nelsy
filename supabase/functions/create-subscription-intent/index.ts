import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import Stripe from 'npm:stripe@13.11.0'
import { createClient } from 'npm:@supabase/supabase-js@2'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
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

    const { priceId, plan } = await req.json() as { priceId: string; plan?: string }
    if (!priceId) {
      return new Response(JSON.stringify({ error: 'priceId is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    // Load existing Stripe IDs so we never duplicate customers or subscriptions
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, stripe_subscription_id')
      .eq('id', user.id)
      .single()

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
        metadata: { supabase_user_id: user.id, plan: plan ?? 'pro' },
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
      metadata: { supabase_user_id: user.id, plan: plan ?? 'pro' },
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

    // Write 'incomplete' — the user has NOT entered a card yet.
    // The webhook will upgrade this to 'trialing' only once the SetupIntent succeeds
    // (i.e. pending_setup_intent becomes null on customer.subscription.updated).
    await supabase.from('profiles').update({
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
      subscription_status: 'incomplete',
    }).eq('id', user.id)

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
