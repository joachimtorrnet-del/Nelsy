import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import Stripe from 'npm:stripe@13.11.0'

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
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { userId, priceId, email, plan } = await req.json() as {
      userId: string
      priceId: string
      email: string
      plan: string
    }

    if (!userId || !priceId || !email) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    const origin = req.headers.get('origin') ?? 'https://nelsy.app'

    // Create customer first (required for Accounts V2)
    const customer = await stripe.customers.create({
      email,
      metadata: { userId, plan: plan ?? 'pro' },
    })

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer: customer.id,
      client_reference_id: userId,
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: {
        trial_period_days: 14,
        metadata: { plan: plan ?? 'pro' },
      },
      metadata: {
        userId,
        plan: plan ?? 'pro',
      },
      success_url: `${origin}/onboarding/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/onboarding`,
    })

    return new Response(
      JSON.stringify({ url: session.url }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } },
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    console.error('create-subscription-checkout error:', message)
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } },
    )
  }
})
