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

    const body = await req.json() as {
      type?: 'charge' | 'payout' | 'refund' | 'transfer' | 'all'
      limit?: number
      starting_after?: string
    }
    const { type = 'all', limit = 25, starting_after } = body

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('stripe_account_id, stripe_onboarding_complete')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) return jsonErr('Profile not found', 404)
    if (!profile.stripe_account_id) {
      return new Response(
        JSON.stringify({ transactions: [], has_more: false }),
        { headers: { 'Content-Type': 'application/json', ...corsHeaders } },
      )
    }

    const accountId = profile.stripe_account_id

    // Map our types to Stripe balance transaction types
    const typeMap: Record<string, string[]> = {
      charge: ['payment', 'charge'],
      payout: ['payout'],
      refund: ['refund', 'payment_refund'],
      transfer: ['transfer'],
      all: [],
    }
    const stripeTypes = typeMap[type] ?? []

    const listParams: Stripe.BalanceTransactionListParams = {
      limit: Math.min(limit, 100),
      ...(starting_after ? { starting_after } : {}),
      ...(stripeTypes.length === 1 ? { type: stripeTypes[0] as Stripe.BalanceTransactionListParams['type'] } : {}),
    }

    const txList = await stripe.balanceTransactions.list(
      listParams,
      { stripeAccount: accountId },
    )

    // Filter in-app if multiple types requested (Stripe API only accepts one type at a time)
    let txs = txList.data
    if (stripeTypes.length > 1) {
      txs = txs.filter((tx) => stripeTypes.includes(tx.type))
    }

    return new Response(
      JSON.stringify({
        transactions: txs.map((tx) => ({
          id: tx.id,
          type: tx.type,
          amount: tx.amount,            // smallest unit
          fee: tx.fee,                  // Stripe fee in smallest unit
          net: tx.net,                  // net = amount - fee
          currency: tx.currency,
          status: tx.status,
          description: tx.description,
          created: tx.created,          // unix timestamp
          available_on: tx.available_on,
          source: tx.source,            // Stripe object ID (pi_, po_, re_…)
        })),
        has_more: txList.has_more,
        last_id: txs.length > 0 ? txs[txs.length - 1].id : null,
      }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } },
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    console.error('get-stripe-transactions error:', message)
    return jsonErr(message, 500)
  }
})
