// Nelsy referral ("Affiliates") program: the terms and the pure money / attribution rules.
//
// THE ONE PLACE TO CHANGE THE TERMS. Used by the public page (/affiliates), the dashboard Referrals
// tab, the stripe-webhooks commission hook and request-referral-payout. No Deno, Stripe or Supabase
// imports, so vitest can test it (src/lib/__tests__/referrals.test.ts).
//
// The SQL side (supabase/migrations/20261201_01_referrals.sql) mirrors two numbers: the minimum
// payout (referral_min_payout_cents()) and the signup claim window (referral_claim_window()). Change
// them there too when you change them here.

export const REFERRAL_TERMS = {
  /** Share of each collected subscription payment, in basis points (2000 = 20%). */
  commissionRateBps: 2000,
  /** Recurring: paid on every collected payment for as long as the referred pro stays subscribed. */
  recurring: true,
  /** Days a commission stays pending before it becomes approved (covers refunds and disputes). */
  holdDays: 30,
  /** Minimum approved balance to request a payout, in cents. */
  minPayoutCents: 5000,
  /** A click on a referral link is remembered this long. The last link clicked wins. */
  cookieDays: 60,
  /** A new account can be attached to a referrer for this many days after it was created. */
  claimWindowDays: 7,
  payoutSchedule: 'monthly',
  currency: 'usd',
} as const

export const COMMISSION_PERCENT = REFERRAL_TERMS.commissionRateBps / 100

// ─── Statuses ────────────────────────────────────────────────────────────────

export type ReferralStatus = 'signed_up' | 'trialing' | 'paying' | 'churned'
export type CommissionStatus = 'pending' | 'approved' | 'paid' | 'reversed'
export type PayoutStatus = 'requested' | 'approved' | 'paid'

// ─── Commission math ─────────────────────────────────────────────────────────

/** Commission on an amount actually collected, in cents. Rounded down: never pays a fraction of a cent. */
export function commissionCents(collectedCents: number, rateBps: number = REFERRAL_TERMS.commissionRateBps): number {
  if (!Number.isFinite(collectedCents) || collectedCents <= 0) return 0
  return Math.floor((Math.round(collectedCents) * rateBps) / 10000)
}

/** The subset of a Stripe.Invoice the commission rules read. */
export interface InvoiceLike {
  amount_paid?: number | null
  tax?: number | null
  subscription?: unknown
}

/**
 * Amount a commission is computed on: what the pro actually paid, without sales tax.
 * 0 for trial invoices ($0), invoices fully covered by credit, and non-subscription invoices.
 */
export function commissionableCents(invoice: InvoiceLike): number {
  if (!invoice.subscription) return 0
  const paid = invoice.amount_paid ?? 0
  if (paid <= 0) return 0
  return Math.max(0, paid - Math.max(0, invoice.tax ?? 0))
}

/** Simulator on /affiliates: n referred pros on one plan price, all still subscribed. */
export function simulateEarnings(referredPros: number, monthlyPriceUsd: number, rateBps: number = REFERRAL_TERMS.commissionRateBps) {
  const n = Math.max(0, Math.floor(referredPros))
  const monthlyCents = n * commissionCents(Math.round(monthlyPriceUsd * 100), rateBps)
  return { monthly: monthlyCents / 100, yearly: (monthlyCents * 12) / 100 }
}

// ─── Hold ────────────────────────────────────────────────────────────────────

const DAY_MS = 86_400_000

/** When a commission created at `paidAt` leaves the hold. */
export function holdEndsAt(paidAt: Date | string | number, holdDays: number = REFERRAL_TERMS.holdDays): Date {
  return new Date(new Date(paidAt).getTime() + holdDays * DAY_MS)
}

export interface CommissionLike {
  status: CommissionStatus
  commission_cents: number
  /** End of the hold (ISO). */
  available_at: string
  /** Payout this commission was included in. */
  payout_id?: string | null
  /** Payout that took this amount back, for a commission reversed after it was paid. */
  clawback_payout_id?: string | null
}

/**
 * Status shown to the referrer. A pending commission whose hold is over counts as approved even
 * before the database row is flipped (the flip happens in referral_request_payout / the monthly run).
 */
export function effectiveStatus(c: Pick<CommissionLike, 'status' | 'available_at'>, now: Date = new Date()): CommissionStatus {
  if (c.status === 'pending' && new Date(c.available_at).getTime() <= now.getTime()) return 'approved'
  return c.status
}

// ─── Reversal (refund, dispute) ──────────────────────────────────────────────

export interface RefundOutcome {
  status: CommissionStatus
  commission_cents: number
  /** True when the row must be updated. */
  changed: boolean
  /** True when money already left (or is about to leave) and a person has to look at it. */
  needsReview: boolean
}

/**
 * What a refund does to a commission.
 *  - full refund or dispute: reversed, whatever the status (a paid one becomes a deduction on the next payout)
 *  - partial refund before payout: commission recomputed on what is left
 *  - partial refund after it was attached to a payout: left as is, flagged for manual review
 */
export function applyRefund(
  c: Pick<CommissionLike, 'status' | 'commission_cents' | 'payout_id'>,
  collectedCents: number,
  refundedCents: number,
  rateBps: number = REFERRAL_TERMS.commissionRateBps,
): RefundOutcome {
  if (c.status === 'reversed') return { status: 'reversed', commission_cents: c.commission_cents, changed: false, needsReview: false }
  const remaining = Math.max(0, collectedCents - Math.max(0, refundedCents))
  if (remaining === 0) {
    return { status: 'reversed', commission_cents: c.commission_cents, changed: true, needsReview: c.status === 'paid' || !!c.payout_id }
  }
  if (refundedCents <= 0) return { status: c.status, commission_cents: c.commission_cents, changed: false, needsReview: false }
  if (c.status === 'paid' || c.payout_id) {
    return { status: c.status, commission_cents: c.commission_cents, changed: false, needsReview: true }
  }
  const next = Math.min(c.commission_cents, commissionCents(remaining, rateBps))
  return { status: c.status, commission_cents: next, changed: next !== c.commission_cents, needsReview: false }
}

// ─── Balance ─────────────────────────────────────────────────────────────────

export interface ReferralBalance {
  /** Every commission that was not reversed. */
  earnedCents: number
  /** Still inside the hold. */
  pendingCents: number
  /** Out of the hold and not in a payout yet, before deductions. */
  approvedCents: number
  /** Paid commissions that were reversed afterwards and not taken back yet. */
  deductionCents: number
  /** approved - deductions: what a payout request would send. */
  availableCents: number
  /** In a payout the founder has not sent yet. */
  inPayoutCents: number
  paidCents: number
}

export function summarizeCommissions(commissions: CommissionLike[], now: Date = new Date()): ReferralBalance {
  const b: ReferralBalance = { earnedCents: 0, pendingCents: 0, approvedCents: 0, deductionCents: 0, availableCents: 0, inPayoutCents: 0, paidCents: 0 }
  for (const c of commissions) {
    const status = effectiveStatus(c, now)
    if (status === 'reversed') {
      // Reversed after the money was sent: taken back from the next payout.
      if (c.payout_id && !c.clawback_payout_id) b.deductionCents += c.commission_cents
      continue
    }
    b.earnedCents += c.commission_cents
    if (status === 'pending') b.pendingCents += c.commission_cents
    else if (status === 'paid') b.paidCents += c.commission_cents
    else if (c.payout_id) b.inPayoutCents += c.commission_cents
    else b.approvedCents += c.commission_cents
  }
  b.availableCents = b.approvedCents - b.deductionCents
  return b
}

export function canRequestPayout(balance: Pick<ReferralBalance, 'availableCents'>, hasOpenPayout: boolean, minCents: number = REFERRAL_TERMS.minPayoutCents): boolean {
  return !hasOpenPayout && balance.availableCents >= minCents
}

// ─── Referral status ─────────────────────────────────────────────────────────

/**
 * Status of a referral after a Stripe event about the referred pro.
 * `subscriptionStatus` is the Stripe subscription status ('trialing', 'active', 'canceled'...).
 */
export function nextReferralStatus(
  current: ReferralStatus,
  event: { type: 'invoice_paid' } | { type: 'subscription'; subscriptionStatus: string; deleted?: boolean },
): ReferralStatus {
  if (event.type === 'invoice_paid') return 'paying'
  if (event.deleted || ['canceled', 'incomplete_expired', 'unpaid'].includes(event.subscriptionStatus)) {
    return current === 'signed_up' ? 'signed_up' : 'churned'
  }
  if (event.subscriptionStatus === 'trialing') return current === 'paying' ? 'paying' : 'trialing'
  // 'active' alone is not proof of a payment: 'paying' is only set by a paid invoice.
  return current
}

// ─── Attribution and self-referral ───────────────────────────────────────────

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export type ParsedRef = { kind: 'id'; value: string } | { kind: 'code'; value: string }

/**
 * A `ref` value from a link (?ref=<code> or the studio badge's ?ref=<profileId>) or a handle typed
 * in the app ("@maya", "getnelsy.com/maya"). Null when it cannot be a profile id or a code.
 */
export function parseRef(raw: string | null | undefined): ParsedRef | null {
  if (!raw) return null
  let v = raw.trim()
  if (!v || v.length > 200) return null
  if (UUID_RE.test(v)) return { kind: 'id', value: v.toLowerCase() }
  v = v
    .replace(/^https?:\/\/(www\.)?getnelsy\.com\//i, '')
    .replace(/^(www\.)?getnelsy\.com\//i, '')
    .replace(/^@/, '')
    .replace(/[/?#].*$/, '')
    .toLowerCase()
  if (!/^[a-z0-9][a-z0-9_.-]{1,59}$/.test(v)) return null
  return { kind: 'code', value: v }
}

/** Same mailbox whatever the spelling: case, Gmail dots and +tags. */
export function normalizeEmail(email: string | null | undefined): string {
  const e = (email ?? '').trim().toLowerCase()
  const at = e.lastIndexOf('@')
  if (at < 1) return e
  let local = e.slice(0, at).replace(/\+.*$/, '')
  let domain = e.slice(at + 1)
  if (domain === 'googlemail.com') domain = 'gmail.com'
  if (domain === 'gmail.com') local = local.replace(/\./g, '')
  return `${local}@${domain}`
}

export interface PartyLike {
  userId: string
  /** Account and Stripe customer emails. */
  emails?: (string | null | undefined)[]
  stripeCustomerId?: string | null
  /** Stripe card fingerprints (same card number = same fingerprint across customers). */
  cardFingerprints?: (string | null | undefined)[]
}

export type SelfReferralReason = 'same_user' | 'same_customer' | 'same_email' | 'same_card'

/** Why this pair is a self-referral, or null when it is not. */
export function selfReferralReason(referrer: PartyLike, referred: PartyLike): SelfReferralReason | null {
  if (referrer.userId === referred.userId) return 'same_user'
  if (referrer.stripeCustomerId && referrer.stripeCustomerId === referred.stripeCustomerId) return 'same_customer'
  const emails = new Set((referrer.emails ?? []).map(normalizeEmail).filter(Boolean))
  if ((referred.emails ?? []).map(normalizeEmail).some((e) => e && emails.has(e))) return 'same_email'
  const cards = new Set((referrer.cardFingerprints ?? []).filter(Boolean))
  if ((referred.cardFingerprints ?? []).some((f) => f && cards.has(f))) return 'same_card'
  return null
}

// ─── Click storage (first-party, 60 days, last click wins) ───────────────────

export interface StoredRef {
  ref: string
  /** ms since epoch of the click. */
  at: number
}

export function isRefFresh(stored: StoredRef | null | undefined, now: number = Date.now(), days: number = REFERRAL_TERMS.cookieDays): stored is StoredRef {
  return !!stored && !!stored.ref && Number.isFinite(stored.at) && now - stored.at >= 0 && now - stored.at <= days * DAY_MS
}

/** What to keep after a page load: a valid new ref replaces the old one, otherwise the old one stays while fresh. */
export function pickStoredRef(incoming: string | null | undefined, stored: StoredRef | null, now: number = Date.now()): StoredRef | null {
  const parsed = parseRef(incoming)
  if (parsed) return { ref: parsed.value, at: now }
  return isRefFresh(stored, now) ? stored : null
}

export const formatUsd = (cents: number): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: cents % 100 === 0 ? 0 : 2 }).format(cents / 100)
