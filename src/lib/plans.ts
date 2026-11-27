// Single source of truth for Nelsy plans (pricing page, landing, onboarding, feature gating).
// Server-side price resolution lives in supabase/functions/_shared/plans.ts and must stay in sync.

export type PlanTier = 'independent' | 'creator' | 'salon';
export type BillingInterval = 'monthly' | 'yearly';

export type Feature =
  | 'booking_page'
  | 'online_payments'
  | 'deposits'
  | 'reminders'
  | 'digital_products'
  | 'courses'
  | 'coaching'
  | 'memberships'
  | 'email_marketing'
  | 'auto_dm'
  /** Shop my kit: the pro recommends the products she uses, with her own affiliate links. */
  | 'affiliates'
  | 'team'
  | 'custom_domain';

export interface Plan {
  tier: PlanTier;
  name: string;
  tagline: string;
  monthly: number; // USD per month, billed monthly
  yearly: number; // USD per month, billed yearly
  yearlyTotal: number; // USD per year
  includedStaff?: number;
  extraStaffMonthly?: number;
  /** Plan can be bought today. Only flip to true once every feature listed in `highlights` is live. */
  available: boolean;
  features: Feature[];
  highlights: string[];
}

// All-in-one plan: digital products (incl. free resources and the contacts list), online video
// sessions ('coaching') and Shop my kit ('affiliates') are part of the single plan.
const INDEPENDENT_FEATURES: Feature[] = ['booking_page', 'online_payments', 'deposits', 'reminders', 'digital_products', 'coaching', 'affiliates'];
const CREATOR_FEATURES: Feature[] = [
  ...INDEPENDENT_FEATURES,
  'digital_products',
  'courses',
  'coaching',
  'memberships',
  'email_marketing',
  'auto_dm',
  'affiliates',
];
const SALON_FEATURES: Feature[] = [...CREATOR_FEATURES, 'team', 'custom_domain'];

export const PLANS: Record<PlanTier, Plan> = {
  independent: {
    tier: 'independent',
    name: 'Independent',
    tagline: 'Get booked and paid from your link in bio.',
    monthly: 29,
    yearly: 25,
    yearlyTotal: 300,
    available: true,
    features: INDEPENDENT_FEATURES,
    highlights: [
      'Your booking page in your link in bio',
      'Online payments and deposits',
      'Email reminder 24 hours before each appointment',
      'Digital products and free guides',
      'Shop my kit with your affiliate links',
      'Online video sessions',
      '0% Nelsy commission',
    ],
  },
  creator: {
    tier: 'creator',
    name: 'Creator',
    tagline: 'Sell what you know, not only your time.',
    monthly: 59,
    yearly: 49,
    yearlyTotal: 588,
    available: false,
    features: CREATOR_FEATURES,
    highlights: [
      'Everything in Independent',
      'Digital products, courses and coaching',
      'Memberships',
      'Email marketing and Instagram AutoDM',
      'Shop my kit with your affiliate links',
    ],
  },
  salon: {
    tier: 'salon',
    name: 'Salon',
    tagline: 'One page for your whole team.',
    monthly: 149,
    yearly: 129,
    yearlyTotal: 1548,
    includedStaff: 5,
    extraStaffMonthly: 15,
    available: false,
    features: SALON_FEATURES,
    highlights: [
      'Everything in Creator',
      '5 team members included, $15 per extra member',
      'Custom domain',
    ],
  },
};

export const PLAN_ORDER: PlanTier[] = ['independent', 'creator', 'salon'];
export const AVAILABLE_PLANS: Plan[] = PLAN_ORDER.map((t) => PLANS[t]).filter((p) => p.available);
export const TRIAL_DAYS = 14;

/** Plan key sent to the server, e.g. "creator_yearly". Legacy "monthly" / "yearly" mean Independent. */
export function planKey(tier: PlanTier, interval: BillingInterval): string {
  return `${tier}_${interval}`;
}

/**
 * Reads the tier stored on a profile. Legacy values ("pro", "monthly", "yearly") are Independent,
 * since that was the only paid plan before the 3-plan launch.
 */
export function tierFromProfilePlan(plan: string | null | undefined): PlanTier | null {
  if (!plan || plan === 'free') return null;
  const tier = plan.split('_')[0];
  if (tier === 'creator' || tier === 'salon' || tier === 'independent') return tier;
  return 'independent';
}

export function hasFeature(plan: string | null | undefined, feature: Feature): boolean {
  // Everything in the single plan can be set up from the dashboard at any time, trial included.
  // What clients can see and buy is decided server side by the studio's subscription status.
  if (INDEPENDENT_FEATURES.includes(feature)) return true;
  const tier = tierFromProfilePlan(plan);
  return tier ? PLANS[tier].features.includes(feature) : false;
}

/** Parses ?plan= from the URL: "creator_yearly", "creator", "yearly" all work. Falls back to an available plan. */
export function parsePlanParam(raw: string | null): { tier: PlanTier; interval: BillingInterval } {
  const value = (raw ?? '').toLowerCase();
  const interval: BillingInterval = value.includes('yearly') ? 'yearly' : 'monthly';
  const candidate = value.split('_')[0] as PlanTier;
  const tier = PLANS[candidate]?.available ? candidate : 'independent';
  return { tier, interval };
}
