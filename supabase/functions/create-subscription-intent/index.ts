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

    // Create Stripe customer
    const customer = await stripe.customers.create({
      email: user.email ?? '',
      metadata: { supabase_user_id: user.id, plan: plan ?? 'pro' },
    })

    // Create subscription with 14-day trial.
    // payment_behavior: 'default_incomplete' + pending_setup_intent lets us collect
    // the card upfront without charging — Stripe returns a SetupIntent client_secret.
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      trial_period_days: 14,
      payment_behavior: 'default_incomplete',
      payment_settings: {
        save_default_payment_method: 'on_subscription',
        payment_method_types: ['card'],
      },
      expand: ['latest_invoice.payment_intent', 'pending_setup_intent'],
      metadata: { supabase_user_id: user.id, plan: plan ?? 'pro' },
    })

    // For free-trial subscriptions Stripe uses pending_setup_intent.
    // Fall back to latest_invoice.payment_intent for non-zero first invoices.
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

    // Persist Stripe IDs on the profile so the webhook can cross-reference
    await supabase.from('profiles').update({
      stripe_customer_id: customer.id,
      subscription_id: subscription.id,
      subscription_status: subscription.status,
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
