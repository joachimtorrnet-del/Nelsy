// Public checkout for a digital product (deploy with --no-verify-jwt: buyers are anonymous).
//
// Creates a pending product_orders row, then a PaymentIntent as a DIRECT CHARGE on the
// pro's connected account. Price and currency always come from the DB, never the client.
// The order is marked paid only by stripe-webhooks (payment_intent.succeeded with
// metadata.kind === 'product_order'), or by get-product-download after it re-reads the
// PaymentIntent from Stripe.
import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'npm:stripe@13.11.0'
import { planHasFeature } from '../_shared/plans.ts'
import { isValidEmail, minimumSmallest } from '../_shared/product-orders.ts'

const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
if (!stripeSecretKey) throw new Error('STRIPE_SECRET_KEY is not set')

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

// service_role: orders are not writable by anon/authenticated (RLS + revoked grants)
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  })
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const PUBLIC_STATUSES_BLOCKED = ['inactive', 'incomplete', 'canceled', 'cancelled']

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  try {
    const body = await req.json().catch(() => ({})) as Record<string, unknown>

    // ── 1. Input ─────────────────────────────────────────────────────────────
    const productId = typeof body.product_id === 'string' ? body.product_id : ''
    if (!UUID_RE.test(productId)) return json({ error: 'Missing product_id' }, 400)

    const buyerEmail = String(body.buyer_email ?? '').trim().toLowerCase()
    if (!isValidEmail(buyerEmail)) return json({ error: 'Invalid email address' }, 400)

    const buyerName = String(body.buyer_name ?? '').trim().slice(0, 100)

    // ── 2. Product: active, sellable type, has a file, has a price ───────────
    const { data: product } = await supabase
      .from('products')
      .select('id, profile_id, type, title, price_cents, currency, file_path, is_active, archived_at')
      .eq('id', productId)
      .maybeSingle()

    if (!product || !product.is_active || product.archived_at) {
      return json({ error: 'This product is not available' }, 404)
    }
    if (product.type !== 'digital' || !product.file_path) {
      return json({ error: 'This product is not available' }, 404)
    }
    const amount = Number(product.price_cents)
    const currency = String(product.currency ?? 'eur').toLowerCase()
    if (!Number.isInteger(amount) || amount <= 0) return json({ error: 'This product is not available' }, 400)
    if (amount < minimumSmallest(currency)) {
      return json({ error: 'This price is below the minimum card payment for this currency' }, 400)
    }

    // ── 3. Pro: published studio, plan includes digital products, Stripe ready ─
    const { data: profile } = await supabase
      .from('profiles')
      .select('id, plan, subscription_status, stripe_account_id, stripe_onboarding_complete')
      .eq('id', product.profile_id)
      .single()

    if (!profile || !profile.subscription_status || PUBLIC_STATUSES_BLOCKED.includes(profile.subscription_status)) {
      return json({ error: 'This product is not available' }, 404)
    }
    if (!planHasFeature(profile.plan, 'digital_products')) {
      return json({ error: 'This product is not available' }, 403)
    }
    if (!profile.stripe_account_id || !profile.stripe_onboarding_complete) {
      return json({ error: 'payment_unavailable', message: 'This professional has not finished setting up payments yet.' }, 400)
    }
    const stripeAccountId = profile.stripe_account_id as string

    const account = await stripe.accounts.retrieve(stripeAccountId)
    if (!account.charges_enabled) {
      return json({ error: 'payment_unavailable', message: 'This professional cannot accept card payments right now.' }, 400)
    }

    // ── 4. Pending order (amount/currency frozen from the DB) ────────────────
    const { data: order, error: orderErr } = await supabase
      .from('product_orders')
      .insert({
        product_id: product.id,
        profile_id: product.profile_id,
        buyer_email: buyerEmail,
        buyer_name: buyerName || null,
        amount_cents: amount,
        currency,
        stripe_account_id: stripeAccountId,
        status: 'pending',
      })
      .select('id')
      .single()
    if (orderErr || !order) throw orderErr ?? new Error('order insert failed')

    // ── 5. PaymentIntent: direct charge on the connected account ─────────────
    // 0% Nelsy commission: no application_fee_amount, no transfer_data (same as bookings).
    let paymentIntent: Stripe.PaymentIntent
    try {
      paymentIntent = await stripe.paymentIntents.create(
        {
          amount,
          currency,
          description: String(product.title).slice(0, 200),
          receipt_email: buyerEmail,
          automatic_payment_methods: { enabled: true },
          metadata: {
            kind: 'product_order',
            product_id: product.id,
            order_id: order.id,
            profile_id: product.profile_id,
          },
        },
        { idempotencyKey: `product-order-pi-${order.id}`, stripeAccount: stripeAccountId },
      )
    } catch (stripeErr) {
      await supabase.from('product_orders').delete().eq('id', order.id).eq('status', 'pending')
      throw stripeErr
    }

    await supabase
      .from('product_orders')
      .update({ stripe_payment_intent_id: paymentIntent.id })
      .eq('id', order.id)

    return json({
      client_secret: paymentIntent.client_secret,
      payment_intent_id: paymentIntent.id,
      order_id: order.id,
      amount_cents: amount,
      currency,
      // Stripe.js must be initialised with this account to confirm a direct charge.
      stripe_account_id: stripeAccountId,
    })
  } catch (err: unknown) {
    console.error('create-product-checkout error:', err instanceof Error ? err.message : String(err))
    return json({ error: 'An error occurred. Please try again.' }, 500)
  }
})
