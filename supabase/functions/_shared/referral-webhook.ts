// Referral program side of stripe-webhooks. Runs AFTER the existing switch, inside its own
// try/catch (see the call site): it never changes subscription, booking or ledger handling, and a
// failure here never makes Stripe retry the event.
//
// It only reads from Stripe (one charge, the referrer's cards) and only writes referral tables.
// Rules and numbers come from ./referrals.ts.
import {
  REFERRAL_TERMS,
  applyRefund,
  commissionCents,
  commissionableCents,
  holdEndsAt,
  nextReferralStatus,
  selfReferralReason,
} from './referrals.ts'
import type { CommissionStatus, ReferralStatus } from './referrals.ts'

// Minimal shapes: this file must not depend on the Stripe or Supabase SDK versions of its callers.
// deno-lint-ignore no-explicit-any
type Db = any
// deno-lint-ignore no-explicit-any
type StripeClient = any
interface StripeEventLike {
  type: string
  // deno-lint-ignore no-explicit-any
  data: { object: any }
}

const idOf = (v: unknown): string | null =>
  typeof v === 'string' ? v : (v && typeof v === 'object' && typeof (v as { id?: unknown }).id === 'string' ? (v as { id: string }).id : null)

const log = (...args: unknown[]) => console.log('[referrals]', ...args)

interface ReferralRow { id: string; status: ReferralStatus; referrer_id: string; first_paid_at: string | null }

/** Referral row of a referred pro, created if the profile says she was referred but the row is missing. */
async function referralFor(db: Db, referredId: string, referrerId: string) {
  const { data: existing } = await db.from('referrals').select('id, status, referrer_id, first_paid_at').eq('referred_id', referredId).maybeSingle()
  if (existing) return existing as ReferralRow
  const { data: created } = await db
    .from('referrals')
    .upsert({ referrer_id: referrerId, referred_id: referredId, source: 'manual' }, { onConflict: 'referred_id', ignoreDuplicates: true })
    .select('id, status, referrer_id, first_paid_at')
    .maybeSingle()
  return (created ?? null) as ReferralRow | null
}

async function cardFingerprints(stripe: StripeClient, customerId: string | null | undefined): Promise<string[]> {
  if (!customerId) return []
  try {
    const list = await stripe.paymentMethods.list({ customer: customerId, type: 'card', limit: 10 })
    return (list.data ?? []).map((pm: { card?: { fingerprint?: string } }) => pm.card?.fingerprint).filter(Boolean)
  } catch {
    return []
  }
}

// ─── invoice.payment_succeeded → one commission per paid invoice ─────────────

// deno-lint-ignore no-explicit-any
async function onInvoicePaid(invoice: any, db: Db, stripe: StripeClient) {
  const basis = commissionableCents(invoice)
  if (basis <= 0) return // trial invoice ($0), credit-covered invoice, or not a subscription

  const customerId = idOf(invoice.customer)
  if (!customerId) return
  const { data: referred } = await db
    .from('profiles')
    .select('id, referred_by, stripe_customer_id')
    .eq('stripe_customer_id', customerId)
    .maybeSingle()
  if (!referred?.referred_by) return

  // Idempotent on the invoice id (also enforced by the unique constraint).
  const { data: already } = await db.from('referral_commissions').select('id').eq('stripe_invoice_id', invoice.id).maybeSingle()
  if (already) return

  const referrerId: string = referred.referred_by
  const referral = await referralFor(db, referred.id, referrerId)

  // Self-referral: same account, same Stripe customer, same email, same card.
  const chargeId = idOf(invoice.charge)
  let referredCard: string | null = null
  if (chargeId) {
    try {
      const charge = await stripe.charges.retrieve(chargeId)
      referredCard = charge?.payment_method_details?.card?.fingerprint ?? null
    } catch { /* fingerprint is a best-effort check */ }
  }
  const { data: referrerProfile } = await db.from('profiles').select('id, stripe_customer_id').eq('id', referrerId).maybeSingle()
  const [referrerAuth, referredAuth] = await Promise.all([
    db.auth.admin.getUserById(referrerId).catch(() => null),
    db.auth.admin.getUserById(referred.id).catch(() => null),
  ])
  const blocked = selfReferralReason(
    {
      userId: referrerId,
      stripeCustomerId: referrerProfile?.stripe_customer_id,
      emails: [referrerAuth?.data?.user?.email],
      cardFingerprints: referredCard ? await cardFingerprints(stripe, referrerProfile?.stripe_customer_id) : [],
    },
    {
      userId: referred.id,
      stripeCustomerId: customerId,
      emails: [referredAuth?.data?.user?.email, invoice.customer_email],
      cardFingerprints: [referredCard],
    },
  )

  const paidAt = invoice.status_transitions?.paid_at ? invoice.status_transitions.paid_at * 1000 : Date.now()
  const now = new Date().toISOString()
  const { error } = await db.from('referral_commissions').upsert(
    {
      referral_id: referral?.id ?? null,
      referrer_id: referrerId,
      referred_id: referred.id,
      stripe_invoice_id: invoice.id,
      stripe_charge_id: chargeId,
      amount_cents: basis,
      currency: (invoice.currency ?? REFERRAL_TERMS.currency).toLowerCase(),
      commission_rate_bps: REFERRAL_TERMS.commissionRateBps,
      commission_cents: commissionCents(basis),
      // A blocked payment is still recorded (reversed) so the decision can be audited and retries stay no-ops.
      status: blocked ? 'reversed' : 'pending',
      available_at: holdEndsAt(paidAt).toISOString(),
      reversed_at: blocked ? now : null,
      reversal_reason: blocked ? `self_referral:${blocked}` : null,
    },
    { onConflict: 'stripe_invoice_id', ignoreDuplicates: true },
  )
  if (error) throw new Error(`commission insert: ${error.message}`)

  if (referral) {
    if (blocked) {
      await db.from('referrals').update({ flagged_reason: `self_referral:${blocked}` }).eq('id', referral.id)
      log(`invoice ${invoice.id}: no commission, self-referral (${blocked})`)
    } else {
      const patch: Record<string, unknown> = { status: nextReferralStatus(referral.status, { type: 'invoice_paid' }) }
      if (!referral.first_paid_at) patch.first_paid_at = new Date(paidAt).toISOString()
      await db.from('referrals').update(patch).eq('id', referral.id)
      log(`invoice ${invoice.id}: commission ${commissionCents(basis)} on ${basis} ${invoice.currency}`)
    }
  }
}

// ─── customer.subscription.* → referral status ───────────────────────────────

// deno-lint-ignore no-explicit-any
async function onSubscriptionEvent(subscription: any, deleted: boolean, db: Db) {
  const customerId = idOf(subscription.customer)
  if (!customerId) return
  const { data: profile } = await db
    .from('profiles')
    .select('id, referred_by, stripe_subscription_id')
    .eq('stripe_customer_id', customerId)
    .maybeSingle()
  if (!profile?.referred_by) return
  // Same guard as the main handler: ignore an old or abandoned subscription the profile replaced.
  if (profile.stripe_subscription_id && profile.stripe_subscription_id !== subscription.id) return

  const referral = await referralFor(db, profile.id, profile.referred_by)
  if (!referral) return
  const next = nextReferralStatus(referral.status, { type: 'subscription', subscriptionStatus: subscription.status, deleted })
  if (next !== referral.status) await db.from('referrals').update({ status: next }).eq('id', referral.id)
}

// ─── charge.refunded / charge.dispute.created → reversal ─────────────────────

interface CommissionRow {
  id: string
  status: CommissionStatus
  amount_cents: number
  commission_cents: number
  commission_rate_bps: number
  payout_id: string | null
}

async function commissionForCharge(db: Db, chargeId: string | null, invoiceId: string | null): Promise<CommissionRow | null> {
  const cols = 'id, status, amount_cents, commission_cents, commission_rate_bps, payout_id'
  if (invoiceId) {
    const { data } = await db.from('referral_commissions').select(cols).eq('stripe_invoice_id', invoiceId).maybeSingle()
    if (data) return data as CommissionRow
  }
  if (chargeId) {
    const { data } = await db.from('referral_commissions').select(cols).eq('stripe_charge_id', chargeId).maybeSingle()
    if (data) return data as CommissionRow
  }
  return null
}

// deno-lint-ignore no-explicit-any
async function onChargeRefunded(charge: any, db: Db) {
  const commission = await commissionForCharge(db, charge.id, idOf(charge.invoice))
  if (!commission) return // booking or product charge, or a pro nobody referred
  const outcome = applyRefund(commission, commission.amount_cents, charge.amount_refunded ?? 0, commission.commission_rate_bps)
  if (outcome.needsReview) console.warn(`[referrals] commission ${commission.id}: refund after payout, review the next payout`)
  if (!outcome.changed) return
  if (outcome.status === 'reversed') {
    const { error } = await db.rpc('referral_reverse_commission', { p_commission: commission.id, p_reason: 'refund' })
    if (error) throw new Error(`reverse commission: ${error.message}`)
  } else {
    // Partial refund before any payout: commission on what the pro still paid.
    await db.from('referral_commissions').update({ commission_cents: outcome.commission_cents }).eq('id', commission.id)
  }
  log(`charge ${charge.id} refunded: commission ${commission.id} → ${outcome.status} (${outcome.commission_cents})`)
}

// deno-lint-ignore no-explicit-any
async function onDispute(dispute: any, db: Db) {
  const commission = await commissionForCharge(db, idOf(dispute.charge), null)
  if (!commission) return
  const { error } = await db.rpc('referral_reverse_commission', { p_commission: commission.id, p_reason: 'dispute' })
  if (error) throw new Error(`reverse commission: ${error.message}`)
  log(`dispute ${dispute.id}: commission ${commission.id} reversed`)
}

/** Entry point. The caller wraps it in try/catch. */
export async function handleReferralEvent(event: StripeEventLike, db: Db, stripe: StripeClient): Promise<void> {
  const object = event.data.object
  switch (event.type) {
    case 'invoice.payment_succeeded':
      return onInvoicePaid(object, db, stripe)
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      return onSubscriptionEvent(object, false, db)
    case 'customer.subscription.deleted':
      return onSubscriptionEvent(object, true, db)
    case 'charge.refunded':
      return onChargeRefunded(object, db)
    case 'charge.dispute.created':
      return onDispute(object, db)
    default:
      return
  }
}
