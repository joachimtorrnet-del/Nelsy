// Server-side plan → Stripe Price resolution. Mirrors src/lib/plans.ts (keep tiers and availability in sync).
// Price IDs come from env vars so the client can never pick an arbitrary price.

export type PlanTier = 'independent' | 'creator' | 'salon'
export type BillingInterval = 'monthly' | 'yearly'

/** Tiers that can be bought today. Flip only when the tier's features are live (same as `available` in src/lib/plans.ts). */
const PURCHASABLE: Record<PlanTier, boolean> = {
  independent: true,
  creator: false,
  salon: false,
}

export interface ResolvedPlan {
  tier: PlanTier
  interval: BillingInterval
  /** Stored in Stripe metadata and profiles.plan, e.g. "creator_yearly" */
  key: string
  envVar: string
  priceId: string | undefined
}

/**
 * Accepts "creator_yearly", "independent_monthly", and the legacy "monthly" / "yearly"
 * (which mean Independent, the only plan before the 3-plan launch).
 * Returns null for anything else or for a tier that is not purchasable yet.
 */
export function resolvePlan(raw: unknown): ResolvedPlan | null {
  if (typeof raw !== 'string') return null
  const value = raw.toLowerCase().trim()

  let tier: PlanTier
  let interval: BillingInterval
  if (value === 'monthly' || value === 'yearly') {
    tier = 'independent'
    interval = value
  } else {
    const match = /^(independent|creator|salon)_(monthly|yearly)$/.exec(value)
    if (!match) return null
    tier = match[1] as PlanTier
    interval = match[2] as BillingInterval
  }
  if (!PURCHASABLE[tier]) return null

  // Independent keeps the existing env vars so nothing changes for current prices.
  const envVar = tier === 'independent'
    ? `STRIPE_PRICE_${interval.toUpperCase()}`
    : `STRIPE_PRICE_${tier.toUpperCase()}_${interval.toUpperCase()}`

  return { tier, interval, key: `${tier}_${interval}`, envVar, priceId: Deno.env.get(envVar) }
}
