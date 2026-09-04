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

    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, stripe_subscription_id, subscription_id')
      .eq('id', user.id)
      .single()

    const existingSubId = existingProfile?.stripe_subscription_id ?? existingProfile?.subscription_id

    // If user already has a live subscription WITH a payment method, no need to collect card again
    if (existingSubId) {
      try {
        const existingSub = await stripe.subscriptions.retrieve(existingSubId)
        const hasCard = !!existingSub.default_payment_method
        const isLive = existingSub.status === 'trialing' || existingSub.status === 'active'
        if (isLive && hasCard) {
          return new Response(
            JSON.stringify({ alreadySubscribed: true }),
            { headers: { 'Content-Type': 'application/json', ...corsHeaders } },
          )
        }
        // Subscription exists but no card yet — fall through and create a new SetupIntent
      } catch {
        // Subscription not found or expired — fall through
      }
    }

    let customerId = existingProfile?.stripe_customer_id ?? null

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email ?? '',
        metadata: { supabase_user_id: user.id, plan: plan ?? 'pro' },
      })
      customerId = customer.id
    }

    // Create a SetupIntent only — NO subscription created here.
    // The subscription is created in the stripe-webhooks handler after setup_intent.succeeded.
    // This guarantees no subscription ever appears in Stripe until the card is confirmed.
    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      usage: 'off_session',
      metadata: {
        supabase_user_id: user.id,
        price_id: priceId,
        plan: plan ?? 'pro',
      },
    })

    if (!setupIntent.client_secret) throw new Error('No client_secret returned by Stripe')

    // Only write customer ID and incomplete status — no subscription yet
    await supabase.from('profiles').update({
      stripe_customer_id: customerId,
      subscription_status: 'incomplete',
    }).eq('id', user.id)

    return new Response(
      JSON.stringify({ clientSecret: setupIntent.client_secret, type: 'setup' }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } },
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    console.error('create-setup-intent error:', message)
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } },
    )
  }
})
