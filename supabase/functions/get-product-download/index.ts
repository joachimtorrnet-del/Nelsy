// Returns a short-lived signed URL for a paid product order (deploy with --no-verify-jwt).
//
// The buyer proves ownership with (order_id OR payment_intent_id) + the checkout email.
// Each successful call counts as one download, capped at MAX_DOWNLOADS.
// If the webhook has not marked the order paid yet (buyer clicked Download right after
// paying), the PaymentIntent is re-read from the connected account and, when it really
// succeeded, the order is marked paid through the same idempotent path as the webhook.
import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'npm:stripe@13.11.0'
import {
  MAX_DOWNLOADS, SIGNED_URL_TTL_SECONDS, isValidEmail, markProductOrderPaid,
} from '../_shared/product-orders.ts'

const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
if (!stripeSecretKey) throw new Error('STRIPE_SECRET_KEY is not set')

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

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
const PI_RE = /^pi_[A-Za-z0-9]{8,64}$/
// Same answer for "no such order" and "wrong email": never confirm an order exists.
const NOT_FOUND = { error: 'not_found', message: 'We could not find a purchase with these details.' }

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  try {
    const body = await req.json().catch(() => ({})) as Record<string, unknown>
    const orderId = typeof body.order_id === 'string' ? body.order_id : ''
    const paymentIntentId = typeof body.payment_intent_id === 'string' ? body.payment_intent_id : ''
    const email = String(body.email ?? '').trim().toLowerCase()

    if (!isValidEmail(email)) return json({ error: 'Invalid email address' }, 400)
    if (!UUID_RE.test(orderId) && !PI_RE.test(paymentIntentId)) return json(NOT_FOUND, 404)

    let query = supabase
      .from('product_orders')
      .select('id, product_id, status, buyer_email, download_count, stripe_payment_intent_id, stripe_account_id')
    query = UUID_RE.test(orderId) ? query.eq('id', orderId) : query.eq('stripe_payment_intent_id', paymentIntentId)
    const { data: order } = await query.maybeSingle()

    if (!order || order.buyer_email.toLowerCase() !== email) return json(NOT_FOUND, 404)
    if (paymentIntentId && order.stripe_payment_intent_id && order.stripe_payment_intent_id !== paymentIntentId) {
      return json(NOT_FOUND, 404)
    }

    // ── Webhook may lag a few seconds behind the buyer: verify with Stripe ───
    let status = order.status as string
    if (status === 'pending' && order.stripe_payment_intent_id && order.stripe_account_id) {
      try {
        const pi = await stripe.paymentIntents.retrieve(
          order.stripe_payment_intent_id,
          {},
          { stripeAccount: order.stripe_account_id },
        )
        if (pi.status === 'succeeded') {
          const res = await markProductOrderPaid(supabase, pi, order.stripe_account_id)
          if (res.result === 'paid' || res.result === 'already') status = 'paid'
        } else if (pi.status === 'processing') {
          return json({ error: 'processing', message: 'Your payment is still processing. Try again in a minute.' }, 409)
        }
      } catch (err) {
        console.warn('[get-product-download] PI re-check failed:', err instanceof Error ? err.message : err)
      }
    }

    if (status === 'refunded') {
      return json({ error: 'refunded', message: 'This purchase was refunded, so the download is no longer available.' }, 410)
    }
    if (status !== 'paid') {
      return json({ error: 'unpaid', message: 'We have not received the payment for this purchase yet.' }, 402)
    }
    if (order.download_count >= MAX_DOWNLOADS) {
      return json({ error: 'limit_reached', message: `This file was already downloaded ${MAX_DOWNLOADS} times. Contact the seller for a new link.` }, 429)
    }

    const { data: product } = await supabase
      .from('products')
      .select('title, file_path, file_name')
      .eq('id', order.product_id)
      .single()
    if (!product?.file_path) {
      return json({ error: 'file_missing', message: 'The seller has not attached a file to this product. Contact them directly.' }, 410)
    }

    // Count the download atomically (also re-checks status and cap in SQL).
    const { data: newCount, error: claimErr } = await supabase.rpc('claim_product_download', {
      p_order_id: order.id,
      p_max: MAX_DOWNLOADS,
    })
    if (claimErr) throw claimErr
    if (newCount === null || newCount === undefined) {
      return json({ error: 'limit_reached', message: `This file was already downloaded ${MAX_DOWNLOADS} times. Contact the seller for a new link.` }, 429)
    }

    const { data: signed, error: signErr } = await supabase.storage
      .from('product-files')
      .createSignedUrl(product.file_path, SIGNED_URL_TTL_SECONDS, {
        download: product.file_name || true,
      })
    if (signErr || !signed?.signedUrl) throw signErr ?? new Error('signed url failed')

    return json({
      url: signed.signedUrl,
      expires_in: SIGNED_URL_TTL_SECONDS,
      order_id: order.id,
      product_title: product.title,
      file_name: product.file_name,
      downloads_used: newCount,
      downloads_left: Math.max(0, MAX_DOWNLOADS - Number(newCount)),
    })
  } catch (err: unknown) {
    console.error('get-product-download error:', err instanceof Error ? err.message : String(err))
    return json({ error: 'An error occurred. Please try again.' }, 500)
  }
})
