import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
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
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  const jsonErr = (msg: string, status = 400) =>
    new Response(JSON.stringify({ error: msg }), {
      status,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })

  try {
    const authHeader = req.headers.get('Authorization') ?? ''
    const token = authHeader.replace('Bearer ', '')
    if (!token) return jsonErr('Unauthorized', 401)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) return jsonErr('Unauthorized', 401)

    // Fetch the pro's Stripe account ID — must match the authenticated user
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('stripe_account_id, stripe_onboarding_complete, business_currency')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) return jsonErr('Profile not found', 404)

    if (!profile.stripe_account_id) {
      return new Response(
        JSON.stringify({ connected: false, balance: null }),
        { headers: { 'Content-Type': 'application/json', ...corsHeaders } },
      )
    }

    if (!profile.stripe_onboarding_complete) {
      return new Response(
        JSON.stringify({ connected: false, onboarding_incomplete: true, balance: null }),
        { headers: { 'Content-Type': 'application/json', ...corsHeaders } },
      )
    }

    // Fetch live balance from the connected account
    const balance = await stripe.balance.retrieve({
      stripeAccount: profile.stripe_account_id,
    })

    // Also fetch account details for payout eligibility
    const account = await stripe.accounts.retrieve(profile.stripe_account_id)

    return new Response(
      JSON.stringify({
        connected: true,
        charges_enabled: account.charges_enabled,
        payouts_enabled: account.payouts_enabled,
        // Pending: funds received but not yet available (standard payout schedule)
        pending: balance.pending.map((b) => ({
          amount: b.amount,          // Stripe smallest unit (cents or major for zero-decimal)
          currency: b.currency,
          source_types: b.source_types,
        })),
        // Available: funds that can be paid out right now
        available: balance.available.map((b) => ({
          amount: b.amount,
          currency: b.currency,
          source_types: b.source_types,
        })),
        // Default payout currency for this account
        default_currency: account.default_currency ?? profile.business_currency ?? 'eur',
        // Payout schedule configured on the account
        payout_schedule: account.settings?.payouts?.schedule,
      }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } },
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    console.error('get-stripe-balance error:', message)
    return jsonErr(message, 500)
  }
})
