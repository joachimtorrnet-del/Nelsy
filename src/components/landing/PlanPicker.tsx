import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { PLANS, PLAN_ORDER, TRIAL_DAYS, planKey } from '@/lib/plans';
import type { BillingInterval, Plan, PlanTier } from '@/lib/plans';

const PINK = '#F52B8C';
const INK = '#1A1A1A';

/** Highlights shown on a card. The team line is built from the plan numbers so it never drifts. */
function cardHighlights(plan: Plan): string[] {
  if (!plan.includedStaff) return plan.highlights;
  const team = `${plan.includedStaff} team members included, +$${plan.extraStaffMonthly}/month per extra member`;
  return plan.highlights.map((h) => (h.toLowerCase().includes('team member') ? team : h));
}

function waitlistHref(plan: Plan) {
  return `mailto:hello@getnelsy.com?subject=${encodeURIComponent(`${plan.name} waitlist`)}`;
}

interface PlanPickerProps {
  /** Heading level text, rendered as an h2. */
  title?: string;
  defaultInterval?: BillingInterval;
  /** Called before navigating to onboarding (analytics). */
  onStartTrial?: (key: string, tier: PlanTier, interval: BillingInterval) => void;
  /** Called when a visitor clicks a waitlist link (analytics). */
  onWaitlist?: (tier: PlanTier, interval: BillingInterval) => void;
}

/**
 * Three plan cards with a monthly / yearly toggle. Cards are selectable (radio group) and a single
 * CTA below follows the selected plan: free trial for plans on sale, waitlist email otherwise.
 * Cards sit side by side from lg, stacked below.
 */
export default function PlanPicker({ title = 'Choose your plan', defaultInterval = 'yearly', onStartTrial, onWaitlist }: PlanPickerProps) {
  const navigate = useNavigate();
  const [interval, setBilling] = useState<BillingInterval>(defaultInterval);
  const firstAvailable = PLAN_ORDER.find((t) => PLANS[t].available) ?? PLAN_ORDER[0];
  const [selected, setSelected] = useState<PlanTier>(firstAvailable);
  const plan = PLANS[selected];

  const start = () => {
    const key = planKey(plan.tier, interval);
    onStartTrial?.(key, plan.tier, interval);
    navigate(`/onboarding?plan=${key}`);
  };

  return (
    <div>
      <div className="text-center">
        <h2 className="text-2xl font-bold leading-[1.2] tracking-tight" style={{ color: INK }}>{title}</h2>
        <p className="mt-3 text-sm text-gray-500">Try Independent free for {TRIAL_DAYS} days.</p>

        <div className="mt-8 mb-10 inline-flex gap-1 rounded-full bg-gray-100 p-[5px]" role="radiogroup" aria-label="Billing period">
          {(['monthly', 'yearly'] as const).map((b) => (
            <button
              key={b}
              type="button"
              role="radio"
              aria-checked={interval === b}
              onClick={() => setBilling(b)}
              className={`h-11 min-w-[100px] rounded-full px-6 text-sm font-bold transition ${interval === b ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
              style={interval === b ? { color: INK } : undefined}
            >
              {b === 'monthly' ? 'Monthly' : 'Yearly'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-7 lg:grid-cols-3 lg:gap-3 lg:items-start" role="radiogroup" aria-label="Plans">
        {PLAN_ORDER.map((tier) => {
          const p = PLANS[tier];
          const isSelected = tier === selected;
          const price = interval === 'yearly' ? p.yearly : p.monthly;
          const saving = (p.monthly - p.yearly) * 12;
          return (
            <article
              key={tier}
              className="relative rounded-xl border-2 transition"
              style={{ borderColor: isSelected ? PINK : 'rgba(245,43,140,0.18)', background: isSelected ? '#FFF8FB' : '#FFFFFF' }}
            >
              {p.available && (
                <span className="absolute -top-4 right-4 rounded-full px-3.5 py-1 text-sm font-bold text-white" style={{ background: PINK }}>
                  Available today
                </span>
              )}
              <button
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelected(tier)}
                className="flex w-full items-start justify-between gap-3 px-5 pt-[30px] pb-3 text-left"
              >
                <span className="min-w-0">
                  <span className="block text-[32px] font-bold leading-[1.1] tracking-tight" style={{ color: INK }}>{p.name}</span>
                  <span className="mt-4 block text-[32px] leading-none" style={{ color: INK }}>
                    <span className="font-bold">${price}</span><span className="text-gray-500">/mo</span>
                  </span>
                  <span className="mt-2 block text-sm font-medium leading-5 text-gray-500">After {TRIAL_DAYS}-day free trial</span>
                  <span className="block text-sm font-medium leading-5 text-gray-500">
                    {interval === 'yearly' ? `$${p.yearlyTotal.toLocaleString('en-US')} billed yearly` : 'Billed monthly'}
                  </span>
                  {interval === 'yearly' && saving > 0 && (
                    <span className="mt-2 inline-block rounded-md px-2 py-0.5 text-xs font-bold" style={{ background: '#FDE8F3', color: PINK }}>
                      Save ${saving} per year
                    </span>
                  )}
                </span>
                <span
                  className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2"
                  style={{ borderColor: isSelected ? PINK : '#A5ADC0' }}
                  aria-hidden="true"
                >
                  {isSelected && <span className="h-2.5 w-2.5 rounded-full" style={{ background: PINK }} />}
                </span>
              </button>

              <div className="px-5 pb-5">
                <p className="text-[15px] leading-6 text-gray-600">{p.tagline}</p>
                <ul className="mt-3 space-y-1">
                  {cardHighlights(p).map((h) => {
                    const inherited = h.startsWith('Everything in');
                    return (
                      <li key={h} className="flex gap-3 py-1.5 text-[15px] leading-6">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: inherited ? '#F3F4F6' : '#FDE8F3' }}>
                          <Check className="h-3 w-3" style={{ color: inherited ? '#9CA3AF' : PINK }} strokeWidth={3} aria-hidden="true" />
                        </span>
                        <span className={inherited ? 'font-semibold text-gray-500' : 'font-semibold'} style={inherited ? undefined : { color: INK }}>{h}</span>
                      </li>
                    );
                  })}
                </ul>
                {!p.available && (
                  <a
                    href={waitlistHref(p)}
                    onClick={() => onWaitlist?.(p.tier, interval)}
                    className="mt-5 flex h-11 w-full items-center justify-center rounded-full border-2 text-sm font-bold transition hover:bg-gray-50"
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

      <div className="mx-auto mt-10 max-w-[650px] text-center">
        <p className="mb-3 text-gray-700">Due today: <strong style={{ color: INK }}>$0</strong></p>
        {plan.available ? (
          <button
            type="button"
            onClick={start}
            className="inline-flex h-[62px] w-full items-center justify-center gap-2 rounded-full px-7 text-base font-bold text-white transition hover:opacity-90 active:scale-[0.99]"
            style={{ background: PINK }}
          >
            <span>Start my free trial<span className="hidden sm:inline"> with {plan.name}</span></span> <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        ) : (
          <>
            <a
              href={waitlistHref(plan)}
              onClick={() => onWaitlist?.(plan.tier, interval)}
              className="inline-flex h-[62px] w-full items-center justify-center gap-2 rounded-full border-2 bg-white px-7 text-base font-bold transition hover:bg-gray-50"
              style={{ borderColor: INK, color: INK }}
            >
              Join the waitlist
            </a>
            <p className="mt-3 text-sm text-gray-500">We will email you as soon as {plan.name} opens. Independent is available today.</p>
          </>
        )}
        <p className="mt-4 text-xs text-gray-400">Prices shown in USD. Standard payment processing fees apply. 0% Nelsy commission on every plan.</p>
      </div>
    </div>
  );
}
