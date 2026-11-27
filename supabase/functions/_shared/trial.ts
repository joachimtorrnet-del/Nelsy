// Pure trial / subscription decision logic shared by start-trial, trial-card, create-subscription-checkout
// and stripe-webhooks. No Deno or Stripe SDK imports so vitest can test it (src/lib/__tests__/trial.test.ts).

export const TRIAL_DAYS = 14
/** Subscription metadata flag set by start-trial: the trial started without a payment method. */
export const NO_CARD_TRIAL_KEY = 'no_card_trial'

/** The subset of a Stripe.Subscription this module reads. */
export interface SubscriptionLike {
  id: string
  status: string
  trial_start?: number | null
  trial_end?: number | null
  ended_at?: number | null
  canceled_at?: number | null
  default_payment_method?: string | { id: string } | null
  pending_setup_intent?: string | { id: string } | null
  metadata?: Record<string, string> | null
}

const LIVE_STATUSES = ['trialing', 'active', 'past_due']

export function isNoCardTrial(sub: SubscriptionLike): boolean {
  return sub.metadata?.[NO_CARD_TRIAL_KEY] === '1'
}

/**
 * Old card-first signup (create-subscription-intent): the subscription is created in trial with a
 * pending SetupIntent and only goes live once the card is saved. If the pro left at the card step,
 * the subscription sits there without a card and the page never went live: not a used trial.
 */
export function isAbandonedCardSetup(sub: SubscriptionLike): boolean {
  return sub.status === 'trialing' && !!sub.pending_setup_intent && !sub.default_payment_method && !isNoCardTrial(sub)
}

export function isLiveSubscription(sub: SubscriptionLike): boolean {
  return LIVE_STATUSES.includes(sub.status) && !isAbandonedCardSetup(sub)
}

/**
 * True once the account already had a free trial that put its page live, or ever paid.
 * Abandoned card-step subscriptions do not count: those pros never got a live page.
 */
export function trialAlreadyUsed(subs: SubscriptionLike[]): boolean {
  return subs.some((s) =>
    isNoCardTrial(s) ||
    !!s.default_payment_method ||
    ['active', 'past_due', 'unpaid', 'paused'].includes(s.status),
  )
}

export type TrialDecision =
  /** A live subscription exists: return it, create nothing. */
  | { action: 'reuse'; subscription: SubscriptionLike }
  /** Start a no-card trial. cancelIds: abandoned card-step subscriptions to cancel once the new one is saved. */
  | { action: 'start_trial'; cancelIds: string[] }
  /** Trial already used: send to Checkout for an immediate payment (no second trial). */
  | { action: 'checkout'; cancelIds: string[] }

export function decideTrial(subs: SubscriptionLike[]): TrialDecision {
  const live = subs.find(isLiveSubscription)
  if (live) return { action: 'reuse', subscription: live }
  const cancelIds = subs.filter(isAbandonedCardSetup).map((s) => s.id)
  if (trialAlreadyUsed(subs)) return { action: 'checkout', cancelIds }
  return { action: 'start_trial', cancelIds }
}

/** profiles.subscription_status for a Stripe subscription (values allowed by the DB check constraint). */
export function profileStatusFor(sub: SubscriptionLike): 'active' | 'trialing' | 'past_due' | 'cancelled' | 'inactive' {
  switch (sub.status) {
    case 'active': return 'active'
    // Card-first flow: stays a draft until the card is saved (pending_setup_intent cleared).
    // A no-card trial is live from day one, whatever Stripe puts in pending_setup_intent.
    case 'trialing': return isNoCardTrial(sub) || !sub.pending_setup_intent ? 'trialing' : 'inactive'
    case 'past_due': return 'past_due'
    case 'canceled':
    case 'incomplete_expired': return 'cancelled'
    default: return 'inactive'
  }
}

/**
 * Webhook guard against stale events: a profile points at one subscription. Events about another
 * subscription only apply when that one is live (it replaces the current one); events about dead
 * or abandoned subscriptions we already replaced are ignored, so they cannot unpublish a live page.
 */
export function shouldApplySubscriptionEvent(profileSubscriptionId: string | null | undefined, sub: SubscriptionLike): boolean {
  if (!profileSubscriptionId || profileSubscriptionId === sub.id) return true
  return isLiveSubscription(sub)
}

/** The no-card trial ended without a card and Stripe canceled it (trial_settings missing_payment_method 'cancel'). */
export function isTrialEndCancellation(sub: SubscriptionLike): boolean {
  if (sub.status !== 'canceled' || !isNoCardTrial(sub) || sub.default_payment_method || !sub.trial_end) return false
  const endedAt = sub.ended_at ?? sub.canceled_at
  return endedAt != null && Math.abs(endedAt - sub.trial_end) <= 6 * 3600
}

/** Whole days left until trialEnd (ISO string or unix seconds), rounded up, never below 0. */
export function trialDaysLeft(trialEnd: string | number | null | undefined, now: number = Date.now()): number | null {
  if (trialEnd == null) return null
  const endMs = typeof trialEnd === 'number' ? trialEnd * 1000 : Date.parse(trialEnd)
  if (Number.isNaN(endMs)) return null
  return Math.max(0, Math.ceil((endMs - now) / 86_400_000))
}
