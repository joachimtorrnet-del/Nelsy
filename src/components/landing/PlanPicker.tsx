import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BellRing, BookOpen, Check, CreditCard, Globe, Handshake, Mail, Percent, Repeat, Smartphone, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AVAILABLE_PLANS, PLANS, PLAN_ORDER, TRIAL_DAYS, planKey } from '@/lib/plans';
import type { BillingInterval, Plan, PlanTier } from '@/lib/plans';

const PINK = '#F52B8C';
const INK = '#1A1A1A';
const PINK_TINT = '#FDE8F3';

/**
 * Show Creator and Salon (not on sale yet) next to Independent.
 * false: only the plans on sale are shown, as one clear card.
 * true: all three plans, with "Join the waitlist" on the ones not on sale.
 * Used by the landing page and the pricing page.
 */
export const SHOW_UNAVAILABLE_PLANS = false;

/** Icon and one-line detail for each highlight in src/lib/plans.ts (matched on the start of the text). */
const HIGHLIGHT_DETAILS: { match: string; icon: LucideIcon; detail: string }[] = [
  { match: 'your booking page', icon: Smartphone, detail: 'Mobile first, with your photos, services and colors' },
  { match: 'online payments', icon: CreditCard, detail: 'Take a deposit or the full price when clients book' },
  { match: 'automatic reminders', icon: BellRing, detail: 'Clients get a reminder before every appointment' },
  { match: '0% nelsy', icon: Percent, detail: 'Keep what you earn. Standard processing fees apply' },
  { match: 'digital products', icon: BookOpen, detail: 'Sell guides, courses and 1:1 calls from the same page' },
  { match: 'memberships', icon: Repeat, detail: 'Monthly clubs and subscriptions for your community' },
  { match: 'email marketing', icon: Mail, detail: 'Grow your list and send your link automatically' },
  { match: 'shop my kit', icon: Handshake, detail: 'Recommend the products you use with your affiliate links' },
  { match: 'team member', icon: Users, detail: 'Every stylist with their own calendar and services' },
  { match: '5 team members', icon: Users, detail: 'Every stylist with their own calendar and services' },
  { match: 'custom domain', icon: Globe, detail: 'Your page on your own web address' },
];

function detailFor(h: string) {
  const lower = h.toLowerCase();
  return HIGHLIGHT_DETAILS.find((d) => lower.startsWith(d.match) || lower.includes(d.match));
}

/** Highlights shown on a card. The team line is built from the plan numbers so it never drifts. */
function cardHighlights(plan: Plan): string[] {
  if (!plan.includedStaff) return plan.highlights;
  const team = `${plan.includedStaff} team members included, +$${plan.extraStaffMonthly}/month per extra member`;
  return plan.highlights.map((h) => (h.toLowerCase().includes('team member') ? team : h));
}

function waitlistHref(plan: Plan) {
  return `mailto:hello@getnelsy.com?subject=${encodeURIComponent(`${plan.name} waitlist`)}`;
}

function FeatureRows({ plan, compact = false }: { plan: Plan; compact?: boolean }) {
  const items = cardHighlights(plan);
  const inherited = items.filter((h) => h.startsWith('Everything in'));
  const own = items.filter((h) => !h.startsWith('Everything in'));
  return (
    <div>
      {inherited.map((h) => (
        <div key={h} className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-200 text-[15px] font-semibold text-gray-500">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100" aria-hidden="true">
            <Check className="h-4 w-4 text-gray-400" strokeWidth={2.5} />
          </span>
          {h}
        </div>
      ))}
      <ul className={compact ? 'space-y-4' : 'grid gap-x-8 gap-y-5 sm:grid-cols-2'}>
        {own.map((h) => {
          const d = detailFor(h);
          const Icon = d?.icon ?? Check;
          return (
            <li key={h} className="flex gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: PINK_TINT }} aria-hidden="true">
                <Icon className="h-[18px] w-[18px]" style={{ color: PINK }} strokeWidth={2} />
              </span>
              <span className="min-w-0 pt-0.5">
                <span className="block text-[15px] font-bold leading-5" style={{ color: INK }}>{h}</span>
                {d && <span className="mt-1 block text-sm leading-5 text-gray-500">{d.detail}</span>}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function PriceBlock({ plan, interval }: { plan: Plan; interval: BillingInterval }) {
  const price = interval === 'yearly' ? plan.yearly : plan.monthly;
  const saving = (plan.monthly - plan.yearly) * 12;
  return (
    <>
      <p className="mt-4 leading-none" style={{ color: INK }}>
        <span className="text-[44px] font-bold tracking-tight">${price}</span>
        <span className="text-xl font-medium text-gray-500">/mo</span>
      </p>
      <p className="mt-3 text-sm font-medium leading-5 text-gray-500">After {TRIAL_DAYS}-day free trial</p>
      <p className="text-sm font-medium leading-5 text-gray-500">
        {interval === 'yearly' ? `$${plan.yearlyTotal.toLocaleString('en-US')} billed yearly` : 'Billed monthly'}
      </p>
      {interval === 'yearly' && saving > 0 && (
        <span className="mt-3 inline-block rounded-md px-2 py-1 text-xs font-bold" style={{ background: PINK_TINT, color: PINK }}>
          You save ${saving} a year
        </span>
      )}
    </>
  );
}

interface PlanPickerProps {
  /** Heading text, rendered as an h2. */
  title?: string;
  defaultInterval?: BillingInterval;
  /** Defaults to SHOW_UNAVAILABLE_PLANS. */
  showUnavailable?: boolean;
  /** Called before navigating to onboarding (analytics). */
  onStartTrial?: (key: string, tier: PlanTier, interval: BillingInterval) => void;
  /** Called when a visitor clicks a waitlist link (analytics). */
  onWaitlist?: (tier: PlanTier, interval: BillingInterval) => void;
}

/**
 * Plans with a monthly / yearly toggle and one main CTA below, Stan style.
 * Only plans on sale: one wide card. All plans: three selectable cards (radio group), the CTA
 * follows the selected plan (free trial when on sale, waitlist email otherwise).
 */
export default function PlanPicker({
  title = 'Choose your plan',
  defaultInterval = 'yearly',
  showUnavailable = SHOW_UNAVAILABLE_PLANS,
  onStartTrial,
  onWaitlist,
}: PlanPickerProps) {
  const navigate = useNavigate();
  const [interval, setBilling] = useState<BillingInterval>(defaultInterval);
  const tiers = showUnavailable ? PLAN_ORDER : AVAILABLE_PLANS.map((p) => p.tier);
  const firstAvailable = tiers.find((t) => PLANS[t].available) ?? tiers[0];
  const [selected, setSelected] = useState<PlanTier>(firstAvailable);
  const plan = PLANS[selected];
  const single = tiers.length === 1;
  const singleSaving = single ? (plan.monthly - plan.yearly) * 12 : 0;

  const start = () => {
    const key = planKey(plan.tier, interval);
    onStartTrial?.(key, plan.tier, interval);
    navigate(`/onboarding?plan=${key}`);
  };

  return (
    <div>
      <div className="text-center">
        <h2 className="text-[28px] lg:text-[32px] font-bold leading-[1.15] tracking-tight" style={{ color: INK, letterSpacing: '-0.02em' }}>{title}</h2>
        <p className="mt-3 text-[15px] text-gray-500">
          {single ? `One plan, everything you need to get booked. Free for ${TRIAL_DAYS} days.` : `Try Independent free for ${TRIAL_DAYS} days.`}
        </p>

        <div className="mt-8 mb-10 inline-flex gap-1 rounded-full bg-gray-100 p-[5px]" role="radiogroup" aria-label="Billing period">
          {(['monthly', 'yearly'] as const).map((b) => (
            <button
              key={b}
              type="button"
              role="radio"
              aria-checked={interval === b}
              onClick={() => setBilling(b)}
              className={`inline-flex h-11 min-w-[100px] items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition ${interval === b ? 'bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)]' : 'text-gray-500 hover:text-gray-800'}`}
              style={interval === b ? { color: INK } : undefined}
            >
              {b === 'monthly' ? 'Monthly' : 'Yearly'}
              {b === 'yearly' && singleSaving > 0 && (
                <span className="rounded-full px-2 py-0.5 text-[11px] font-bold text-white" style={{ background: PINK }}>Save ${singleSaving}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {single ? (
        <article
          className="relative mx-auto max-w-[880px] rounded-2xl border-2 bg-white shadow-[0_24px_60px_-28px_rgba(245,43,140,0.45)]"
          style={{ borderColor: PINK }}
        >
          <span className="absolute -top-4 left-6 lg:left-8 rounded-full px-3.5 py-1 text-sm font-bold text-white shadow-sm" style={{ background: PINK }}>
            {TRIAL_DAYS} days free
          </span>
          <div className="grid lg:grid-cols-[300px_1fr]">
            <div className="px-6 pt-9 pb-7 lg:px-8 lg:py-10 rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl" style={{ background: '#FFF6FA' }}>
              <p className="text-[32px] font-bold leading-[1.1] tracking-tight" style={{ color: INK }}>{plan.name}</p>
              <p className="mt-2 text-[15px] leading-6 text-gray-600">{plan.tagline}</p>
              <PriceBlock plan={plan} interval={interval} />
            </div>
            <div className="px-6 py-7 lg:px-10 lg:py-10">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.12em] text-gray-400">What you get</p>
              <FeatureRows plan={plan} />
            </div>
          </div>
        </article>
      ) : (
        <div className="grid gap-7 lg:grid-cols-3 lg:gap-3 lg:items-start" role="radiogroup" aria-label="Plans">
          {tiers.map((tier) => {
            const p = PLANS[tier];
            const isSelected = tier === selected;
            return (
              <article
                key={tier}
                className={`relative rounded-2xl border-2 transition ${isSelected ? 'shadow-[0_24px_60px_-28px_rgba(245,43,140,0.45)]' : 'hover:border-[#F7A8CC]'}`}
                style={{ borderColor: isSelected ? PINK : '#F3D6E4', background: isSelected ? '#FFF6FA' : '#FFFFFF' }}
              >
                {p.available && (
                  <span className="absolute -top-4 right-4 rounded-full px-3.5 py-1 text-sm font-bold text-white shadow-sm" style={{ background: PINK }}>
                    Available today
                  </span>
                )}
                <button
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setSelected(tier)}
                  className="flex w-full items-start justify-between gap-3 px-5 pt-[30px] pb-4 text-left"
                >
                  <span className="min-w-0">
                    <span className="block text-[32px] font-bold leading-[1.1] tracking-tight" style={{ color: INK }}>{p.name}</span>
                    <span className="mt-2 block text-[15px] leading-6 text-gray-600">{p.tagline}</span>
                    <PriceBlock plan={p} interval={interval} />
                  </span>
                  <span
                    className="mt-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 bg-white"
                    style={{ borderColor: isSelected ? PINK : '#C7CBD6' }}
                    aria-hidden="true"
                  >
                    {isSelected && <span className="h-3 w-3 rounded-full" style={{ background: PINK }} />}
                  </span>
                </button>

                <div className="px-5 pb-6 pt-2">
                  <div className="mb-5 border-t border-gray-200" />
                  <FeatureRows plan={p} compact />
                  {!p.available && (
                    <a
                      href={waitlistHref(p)}
                      onClick={() => onWaitlist?.(p.tier, interval)}
                      className="mt-6 flex h-12 w-full items-center justify-center rounded-full border-2 bg-white text-sm font-bold transition hover:bg-gray-50"
                      style={{ borderColor: INK, color: INK }}
                    >
                      Join the waitlist
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      <div className="mx-auto mt-10 max-w-[650px] text-center">
        {plan.available ? (
          <>
            <p className="mb-3 text-[15px] text-gray-700">Due today: <strong style={{ color: INK }}>$0</strong></p>
            <button
              type="button"
              onClick={start}
              className="inline-flex h-[62px] w-full items-center justify-center gap-2 rounded-full px-7 text-base font-bold text-white transition hover:opacity-90 hover:shadow-[0_14px_34px_-10px_rgba(245,43,140,0.7)] active:scale-[0.99]"
              style={{ background: PINK, boxShadow: '0 10px 30px -10px rgba(245,43,140,0.55)' }}
            >
              <span>Start my free trial<span className="hidden sm:inline"> with {plan.name}</span></span> <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <p className="mt-3 text-sm text-gray-500">Cancel anytime before day {TRIAL_DAYS} and pay nothing.</p>
          </>
        ) : (
          <>
            <a
              href={waitlistHref(plan)}
              onClick={() => onWaitlist?.(plan.tier, interval)}
              className="inline-flex h-[62px] w-full items-center justify-center gap-2 rounded-full border-2 bg-white px-7 text-base font-bold transition hover:bg-gray-50"
              style={{ borderColor: INK, color: INK }}
            >
              Join the {plan.name} waitlist
            </a>
            <p className="mt-3 text-sm text-gray-500">We will email you as soon as {plan.name} opens. Independent is available today.</p>
          </>
        )}
        <p className="mt-4 text-xs text-gray-400">Prices shown in USD. Standard payment processing fees apply. 0% Nelsy commission.</p>
      </div>
    </div>
  );
}
