// Digital product orders: shared by create-product-checkout, get-product-download
// and stripe-webhooks. Everything here runs with the service_role client.
import type Stripe from 'npm:stripe@13.11.0'
import { sendEmail, esc, row, layout } from './email.ts'

// Callers use different supabase-js versions (webhook pins 2.39.3), so keep this structural.
// deno-lint-ignore no-explicit-any
type SupabaseClient = any

export const MAX_DOWNLOADS = 10
export const SIGNED_URL_TTL_SECONDS = 300

const ZERO_DECIMAL = ['jpy', 'krw']

/** Stripe minimum charge per currency, in major units (same table as create-payment-intent). */
const MINIMUMS: Record<string, number> = {
  aud: 0.50, bgn: 1.00, cad: 0.50, chf: 0.50, czk: 15.00, dkk: 2.50,
  eur: 0.50, gbp: 0.30, hkd: 4.00, huf: 175,  idr: 10000, inr: 0.50,
  isk: 100,  jpy: 50,   krw: 50,   mxn: 10.00, myr: 2.00,  nok: 3.00,
  nzd: 0.50, pln: 2.00, ron: 2.00, sek: 3.00,  sgd: 0.50,  thb: 10.00,
  usd: 0.50, aed: 2.00,
}

export function toMajor(amountSmallest: number, currency: string): number {
  return ZERO_DECIMAL.includes(currency.toLowerCase()) ? amountSmallest : amountSmallest / 100
}

export function minimumSmallest(currency: string): number {
  const c = currency.toLowerCase()
  const major = MINIMUMS[c] ?? 0.50
  return ZERO_DECIMAL.includes(c) ? Math.round(major) : Math.round(major * 100)
}

export function formatAmount(amountSmallest: number, currency: string): string {
  const c = currency.toUpperCase()
  const zero = ZERO_DECIMAL.includes(currency.toLowerCase())
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: c, minimumFractionDigits: zero ? 0 : 2, maximumFractionDigits: zero ? 0 : 2,
  }).format(toMajor(amountSmallest, currency))
}

export function appUrl(): string {
  return (Deno.env.get('APP_URL') ?? 'https://getnelsy.com').replace(/\/+$/, '')
}

export function isValidEmail(email: string): boolean {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export interface PaidResult {
  /** 'paid' when this call flipped the order, 'already' when it was paid before, 'ignored' otherwise. */
  result: 'paid' | 'already' | 'ignored'
  orderId?: string
}

/**
 * Marks a product order paid from a succeeded PaymentIntent and sends the buyer + pro
 * emails exactly once. Idempotent: safe to call from webhook retries and from the
 * download endpoint fallback at the same time.
 *
 * Trust: the order is matched by metadata.order_id AND product_id, and the PI amount and
 * currency must equal what the server stored when it created the order.
 */
export async function markProductOrderPaid(
  supabase: SupabaseClient,
  paymentIntent: Stripe.PaymentIntent,
  connectedAccountId: string | null,
): Promise<PaidResult> {
  const meta = paymentIntent.metadata ?? {}
  if (meta.kind !== 'product_order' || !meta.order_id || !meta.product_id) return { result: 'ignored' }
  if (paymentIntent.status !== 'succeeded') return { result: 'ignored' }

  const { data: order } = await supabase
    .from('product_orders')
    .select('id, product_id, profile_id, status, amount_cents, currency, stripe_payment_intent_id, stripe_account_id, buyer_email, buyer_name, notified_at')
    .eq('id', meta.order_id)
    .maybeSingle()

  if (!order || order.product_id !== meta.product_id) {
    console.error(`[product_order] order ${meta.order_id} not found or product mismatch`)
    return { result: 'ignored' }
  }
  if (order.stripe_payment_intent_id && order.stripe_payment_intent_id !== paymentIntent.id) {
    console.error(`[product_order] PI mismatch for order ${order.id}`)
    return { result: 'ignored' }
  }
  if (connectedAccountId && order.stripe_account_id && connectedAccountId !== order.stripe_account_id) {
    console.error(`[product_order] account mismatch for order ${order.id}`)
    return { result: 'ignored' }
  }
  if (paymentIntent.amount !== order.amount_cents || paymentIntent.currency.toLowerCase() !== order.currency) {
    console.error(`[product_order] amount/currency mismatch for order ${order.id}`)
    return { result: 'ignored' }
  }

  let result: PaidResult['result'] = 'already'
  if (order.status === 'pending') {
    const { data: flipped, error } = await supabase
      .from('product_orders')
      .update({ status: 'paid', paid_at: new Date().toISOString(), stripe_payment_intent_id: paymentIntent.id })
      .eq('id', order.id)
      .eq('status', 'pending')
      .select('id')
    if (error) throw new Error(`product_orders update: ${error.message}`)
    if (flipped && flipped.length > 0) result = 'paid'
  } else if (order.status !== 'paid') {
    // refunded: never resurrect
    return { result: 'ignored', orderId: order.id }
  }

  // Emails go out once, whoever flipped the order. Claim the notification first.
  const { data: claim } = await supabase
    .from('product_orders')
    .update({ notified_at: new Date().toISOString() })
    .eq('id', order.id)
    .is('notified_at', null)
    .select('id')

  if (claim && claim.length > 0) {
    try {
      await sendProductOrderEmails(supabase, order)
    } catch (err) {
      console.error('[product_order] emails failed (non-blocking):', err)
    }
  }

  return { result, orderId: order.id }
}

interface OrderForEmail {
  id: string
  product_id: string
  profile_id: string
  amount_cents: number
  currency: string
  buyer_email: string
  buyer_name: string | null
}

async function sendProductOrderEmails(supabase: SupabaseClient, order: OrderForEmail) {
  const [{ data: product }, { data: pro }] = await Promise.all([
    supabase.from('products').select('title').eq('id', order.product_id).single(),
    supabase.from('profiles').select('email, full_name, salon_name, slug').eq('id', order.profile_id).single(),
  ])
  const title = esc(product?.title ?? 'Your product')
  const proName = esc(pro?.salon_name || pro?.full_name || 'your beauty pro')
  const amount = esc(formatAmount(order.amount_cents, order.currency))
  const downloadUrl = `${appUrl()}/d/${encodeURIComponent(order.id)}`
  const button = (href: string, label: string) =>
    `<div style="text-align:center"><a href="${href}" style="display:inline-block;background:#F52B8C;color:#ffffff;font-weight:700;padding:14px 28px;border-radius:12px;text-decoration:none">${label}</a></div>`

  await Promise.all([
    sendEmail(
      order.buyer_email,
      `Your download: ${String(product?.title ?? 'your product').slice(0, 80)}`,
      layout(
        'Thank you for your purchase',
        `From ${proName}. Your file is ready to download.`,
        row('Product', title) + row('Amount paid', amount, true),
        button(downloadUrl, 'Download my file') +
          `<p style="color:#6b7280;font-size:13px;text-align:center;margin:16px 0 0">Keep this email: the link works up to ${MAX_DOWNLOADS} times. You will be asked for the email address you used at checkout.</p>`,
      ),
    ),
    pro?.email
      ? sendEmail(
          pro.email,
          `You just earned ${formatAmount(order.amount_cents, order.currency)}`,
          layout(
            `You just earned ${amount}`,
            'Someone bought one of your products.',
            row('Product', title) +
              row('Buyer', esc(order.buyer_name || 'Not given')) +
              row('Buyer email', esc(order.buyer_email)) +
              row('Amount', amount, true),
            button(`${appUrl()}/dashboard/products`, 'View orders'),
          ),
        )
      : Promise.resolve(),
  ])
}
