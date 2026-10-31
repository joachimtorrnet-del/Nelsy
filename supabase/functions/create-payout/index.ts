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

const ZERO_DECIMAL = new Set(['jpy', 'krw', 'bif', 'clp', 'gnf', 'mga', 'pyg', 'rwf', 'ugx', 'vnd'])

// Stripe minimum payout amounts in smallest unit
const PAYOUT_MINIMUMS_SMALLEST: Record<string, number> = {
  usd: 100, eur: 100, gbp: 100, aud: 100, cad: 100, nzd: 100,
  sgd: 100, hkd: 400, chf: 100, dkk: 250, nok: 300, sek: 300,
  pln: 200, czk: 1500, huf: 17500, mxn: 2000, jpy: 50, krw: 50,
  thb: 1000, inr: 100, myr: 200, aed: 200, ron: 200, bgn: 100, idr: 10000,
  isk: 10000,
}

function jsonErr(msg: string, status = 400) {
  return new Response(JSON.stringify({ error: msg }), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  })
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

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

    const body = await req.json() as { currency: string; request_id?: string }
    const { currency: reqCurrency, request_id: clientRequestId } = body

    if (!reqCurrency || typeof reqCurrency !== 'string') return jsonErr('currency is required')
    const currency = reqCurrency.toLowerCase()

    // ── Idempotency: check if request_id was already processed ───────────────
    // If the existing row still has a `pending_*` placeholder ID, the previous
    // Stripe call timed out or hit a network error. Fall through to retry with
    // the same idempotency key — Stripe returns the existing payout if it was
    // created, or creates it fresh if not. Either way the result is correct.
    let reconcilingPlaceholderId: string | null = null

    if (clientRequestId) {
      const { data: existingByReqId } = await supabase
        .from('payouts')
        .select('id, stripe_payout_id, status, amount')
        .eq('request_id', clientRequestId)
        .maybeSingle()

      if (existingByReqId) {
        if (!existingByReqId.stripe_payout_id?.startsWith('pending_')) {
          // Fully resolved — idempotent replay
          return new Response(
            JSON.stringify({
              payout_id: existingByReqId.stripe_payout_id,
              status: existingByReqId.status,
              amount: existingByReqId.amount,
              currency,
              idempotent_replay: true,
            }),
            { headers: { 'Content-Type': 'application/json', ...corsHeaders } },
          )
        }
        // Placeholder still present — previous Stripe call may have timed out.
        // Reuse this row; skip the active payout check and skip re-insert.
        reconcilingPlaceholderId = existingByReqId.id
        console.log(`[create-payout] Reconciling timed-out request ${clientRequestId}`)
      }
    }

    // ── Check for already-active payout (concurrent request guard) ───────────
    // Skip if we are reconciling a timed-out request: the existing placeholder
    // is the active payout we are about to reconcile.
    if (!reconcilingPlaceholderId) {
      const { data: activePayout } = await supabase
        .from('payouts')
        .select('id, stripe_payout_id, status, amount, created_at')
        .eq('profile_id', user.id)
        .eq('currency', currency)
        .in('status', ['pending', 'in_transit'])
        .maybeSingle()

      if (activePayout) {
        return jsonErr(
          `A payout for ${currency.toUpperCase()} is already in progress (${activePayout.status}). ` +
          `Wait for it to complete before requesting another.`,
          409,
        )
      }
    }

    // ── Fetch profile — never trust browser-provided account IDs ─────────────
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('stripe_account_id, stripe_onboarding_complete')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) return jsonErr('Profile not found', 404)
    if (!profile.stripe_account_id) return jsonErr('No Stripe account connected', 400)
    if (!profile.stripe_onboarding_complete) return jsonErr('Stripe onboarding not complete', 400)

    const accountId = profile.stripe_account_id

    // ── Verify payouts_enabled ────────────────────────────────────────────────
    const account = await stripe.accounts.retrieve(accountId)
    if (!account.payouts_enabled) {
      const due = account.requirements?.currently_due ?? []
      const msg = due.length > 0
        ? `Payouts disabled — Stripe requires action: ${due.slice(0, 3).join(', ')}`
        : 'Payouts are not enabled on this account yet — complete Stripe verification'
      return jsonErr(msg, 403)
    }

    // ── Fetch live available balance ──────────────────────────────────────────
    const balance = await stripe.balance.retrieve({ stripeAccount: accountId })
    const availableEntry = balance.available.find((b) => b.currency === currency)
    const availableAmount = availableEntry?.amount ?? 0

    if (availableAmount <= 0) {
      return jsonErr(`No available balance in ${currency.toUpperCase()}`, 400)
    }

    const minimum = PAYOUT_MINIMUMS_SMALLEST[currency] ?? 100
    if (availableAmount < minimum) {
      const minMajor = ZERO_DECIMAL.has(currency) ? minimum : minimum / 100
      return jsonErr(
        `Available balance (${availableAmount} in smallest unit) is below Stripe's minimum payout amount ` +
        `of ${minMajor} ${currency.toUpperCase()}`,
        400,
      )
    }

    // ── Generate stable request_id for this operation ─────────────────────────
    const requestId = clientRequestId ?? crypto.randomUUID()

    // ── Insert placeholder row BEFORE calling Stripe (or reuse existing one) ──
    // On reconciliation (previous Stripe call timed out), reuse the existing
    // placeholder row — the idempotency key on the Stripe call ensures we get
    // back the same payout if it was already created.
    let placeholderRowId: string

    if (reconcilingPlaceholderId) {
      placeholderRowId = reconcilingPlaceholderId
    } else {
      const { data: placeholderRow, error: insertError } = await supabase
        .from('payouts')
        .insert({
          profile_id: user.id,
          stripe_payout_id: `pending_${requestId}`,  // temporary; replaced after Stripe call
          amount: ZERO_DECIMAL.has(currency) ? availableAmount : availableAmount / 100,
          currency,
          status: 'pending',
          request_id: requestId,
          stripe_created_at: new Date().toISOString(),
        })
        .select('id')
        .single()

      if (insertError) {
        // Unique constraint violation = concurrent request already in progress
        if (insertError.code === '23505') {
          return jsonErr(
            `A payout for ${currency.toUpperCase()} is already being processed. Please wait.`,
            409,
          )
        }
        throw new Error(`DB insert failed: ${insertError.message}`)
      }

      placeholderRowId = placeholderRow.id
    }

    // ── Create payout on connected account ────────────────────────────────────
    let payout: Stripe.Payout
    try {
      payout = await stripe.payouts.create(
        { amount: availableAmount, currency },
        {
          stripeAccount: accountId,
          idempotencyKey: `nelsy-payout-${requestId}`,
        },
      )
    } catch (stripeErr: unknown) {
      const isNetworkError =
        stripeErr instanceof Stripe.errors.StripeConnectionError ||
        stripeErr instanceof Stripe.errors.StripeAPIError

      if (isNetworkError) {
        // Payout MAY have been created on Stripe's side before the connection dropped.
        // Keep the placeholder so the unique index blocks any new concurrent attempt.
        // On retry with the same request_id, we reconcile via the same idempotency key.
        await supabase.from('payouts')
          .update({ failure_message: 'timeout_reconcile_on_retry' })
          .eq('id', placeholderRowId)
        console.warn(`[create-payout] Network error — placeholder kept for reconciliation: ${requestId}`)
      } else {
        // Clean Stripe rejection (invalid request, auth, etc.) — Stripe never created
        // the payout. Mark as failed so the unique index releases for a fresh attempt.
        await supabase.from('payouts')
          .update({ status: 'failed', failure_message: (stripeErr as Error).message ?? 'stripe_error' })
          .eq('id', placeholderRowId)
      }
      throw stripeErr
    }

    // ── Update placeholder with real Stripe payout ID ─────────────────────────
    await supabase
      .from('payouts')
      .update({
        stripe_payout_id: payout.id,
        status: payout.status,
        failure_message: null,
        estimated_arrival: payout.arrival_date
          ? new Date(payout.arrival_date * 1000).toISOString()
          : null,
        stripe_created_at: new Date(payout.created * 1000).toISOString(),
      })
      .eq('id', placeholderRowId)

    return new Response(
      JSON.stringify({
        payout_id: payout.id,
        status: payout.status,
        amount: payout.amount,
        currency: payout.currency,
        estimated_arrival: payout.arrival_date,
        request_id: requestId,
        reconciled: reconcilingPlaceholderId !== null,
      }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } },
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    console.error('create-payout error:', message)
    return jsonErr(message, 500)
  }
})
