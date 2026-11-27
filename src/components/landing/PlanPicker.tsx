import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BellRing, BookOpen, Check, CreditCard, Globe, Handshake, Mail, Percent, Repeat, Smartphone, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PLANS, PLAN_ORDER, TRIAL_DAYS, planKey } from '@/lib/plans';
import type { BillingInterval, Plan, PlanTier } from '@/lib/plans';

const PINK = '#F52B8C';
const INK = '#1A1A1A';
const PINK_TINT = '#FDE8F3';
const SELECTED_BG = '#FFF5FA';
const BORDER = '#EFE3E9';
const MUTED = '#6B6470';

/**
 * Short card title, icon and one-line detail for each highlight in src/lib/plans.ts (matched on the text),
 * so the cards read like Stan's: a short bold title and one line under it.
 */
const HIGHLIGHT_DETAILS: { match: string; icon: LucideIcon; title: string; detail: string }[] = [
  { match: 'your booking page', icon: Smartphone, title: 'Your booking page', detail: 'In your link in bio, with your photos, services and colors' },
  { match: 'online payments', icon: CreditCard, title: 'Payments and deposits', detail: 'Take a deposit or the full price when clients book' },
  { match: 'email reminder', icon: BellRing, title: 'Email reminders', detail: 'Clients get an email reminder 24 hours before each appointment' },
  { match: '0% nelsy', icon: Percent, title: '0% Nelsy commission', detail: 'Keep what you earn. Standard processing fees apply' },
  { match: 'digital products', icon: BookOpen, title: 'Digital products and courses', detail: 'Sell guides, courses and 1:1 coaching calls' },
  { match: 'memberships', icon: Repeat, title: 'Memberships', detail: 'Monthly clubs and subscriptions for your community' },
  { match: 'email marketing', icon: Mail, title: 'Email and Instagram AutoDM', detail: 'Grow your list and send your link automatically' },
  { match: 'shop my kit', icon: Handshake, title: 'Shop my kit', detail: 'Recommend the products you use with your affiliate links' },
  { match: 'team member', icon: Users, title: 'Your whole team', detail: '' },
  { match: 'custom domain', icon: Globe, title: 'Custom domain', detail: 'Your page on your own web address' },
];

/** The features a plan adds on top of the previous one. */
function ownFeatures(plan: Plan): { key: string; icon: LucideIcon; title: string; detail: string }[] {
  return plan.highlights
    .filter((h) => !h.startsWith('Everything in'))
    .map((h) => {
      const d = HIGHLIGHT_DETAILS.find((x) => h.toLowerCase().includes(x.match));
      // The team line is built from the plan numbers so it never drifts.
      const detail =
        plan.includedStaff && h.toLowerCase().includes('team member')
          ? `${plan.includedStaff} team members included, +$${plan.extraStaffMonthly}/month per extra member`
          : d?.detail ?? '';
      return { key: h, icon: d?.icon ?? Check, title: d?.title ?? h, detail };
    });
}

/** Features of every cheaper plan, shown compact and greyed on the bigger plans (Stan style). */
function inheritedFeatures(tier: PlanTier) {
  const idx = PLAN_ORDER.indexOf(tier);
  return PLAN_ORDER.slice(0, idx).flatMap((t) => ownFeatures(PLANS[t]));
}

type FeatureItem = ReturnType<typeof ownFeatures>[number];

function waitlistHref(plan: Plan) {
  return `mailto:hello@getnelsy.com?subject=${encodeURIComponent(`${plan.name} waitlist`)}`;
}

function InheritedRow({ f }: { f: FeatureItem }) {
  const Icon = f.icon;
  return (
    <li className="flex items-center gap-3.5 text-[14px] font-semibold leading-5" style={{ color: MUTED }}>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100" aria-hidden="true">
        <Icon className="h-4 w-4 text-gray-400" strokeWidth={1.75} />
      </span>
      {f.title}
    </li>
  );
}

function FeatureRow({ f }: { f: FeatureItem }) {
  const Icon = f.icon;
  return (
    <li className="flex gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: PINK_TINT }} aria-hidden="true">
        <Icon className="h-5 w-5" style={{ color: PINK }} strokeWidth={1.75} />
      </span>
      <span className="min-w-0">
        <span className="block text-base font-bold leading-6" style={{ color: INK }}>{f.title}</span>
        {f.detail && <span className="block text-sm leading-[18px]" style={{ color: MUTED }}>{f.detail}</span>}
      </span>
    </li>
  );
}

interface PlanCardProps {
  plan: Plan;
  interval: BillingInterval;
  selected: boolean;
  /** Only one plan on the page: a plain card, not a radio option. */
  single?: boolean;
  onSelect: () => void;
}

function PlanCard({ plan, interval, selected, single, onSelect }: PlanCardProps) {
  const price = interval === 'yearly' ? plan.yearly : plan.monthly;
  const inherited = inheritedFeatures(plan.tier);
  const own = ownFeatures(plan);
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onSelect();
    }
  };
  return (
    <div
      role={single ? undefined : 'radio'}
      aria-checked={single ? undefined : selected}
      aria-label={single ? undefined : `${plan.name}, $${price} per month${plan.available ? '' : ', waitlist'}`}
      tabIndex={single ? undefined : 0}
      onClick={single ? undefined : onSelect}
      onKeyDown={single ? undefined : onKey}
      className={`relative ${single ? '' : 'cursor-pointer'} rounded-xl border-2 px-5 pt-[22px] pb-7 text-left outline-none transition focus-visible:ring-4 focus-visible:ring-pink-200 ${
        selected ? 'shadow-[0_16px_40px_-24px_rgba(245,43,140,0.6)]' : 'hover:border-[#F7B9D6]'
      }`}
      style={{ borderColor: selected ? PINK : BORDER, background: selected ? SELECTED_BG : '#FFFFFF' }}
    >
      {plan.available ? (
        <span className="absolute -top-[15px] right-[18px] rounded-full px-3 py-1 text-sm font-bold leading-5 text-white" style={{ background: PINK }}>
          {single ? `${TRIAL_DAYS} days free` : 'Available today'}
        </span>
      ) : (
        <span className="absolute -top-[13px] right-[18px] rounded-full border bg-white px-2.5 py-0.5 text-xs font-bold leading-5" style={{ borderColor: BORDER, color: MUTED }}>
          Waitlist
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <p className="text-[34px] font-bold leading-[1.15] tracking-tight" style={{ color: plan.available ? INK : PINK, letterSpacing: '-0.02em' }}>
          {plan.name}
        </p>
        {!single && <span
          className="mt-2.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 bg-white"
          style={{ borderColor: selected ? PINK : '#B9B3BD' }}
          aria-hidden="true"
        >
          {selected && <span className="h-2.5 w-2.5 rounded-full" style={{ background: PINK }} />}
        </span>}
      </div>

      <p className="mt-2 leading-none" style={{ color: INK }}>
        <span className="text-[34px] font-bold tracking-tight">${price}</span>
        <span className="text-[34px] font-normal tracking-tight">/mo</span>
      </p>
      <p className="mt-2 text-sm leading-[23px]" style={{ color: MUTED }}>After {TRIAL_DAYS}-day free trial</p>
      <p className="text-sm leading-[23px]" style={{ color: MUTED }}>
        {interval === 'yearly' ? `Billed yearly ($${plan.yearlyTotal.toLocaleString('en-US')})` : 'Billed monthly'}
      </p>

      {inherited.length > 0 && (
        <>
          <ul className="mt-6 space-y-4">
            {inherited.map((f) => <InheritedRow key={f.key} f={f} />)}
          </ul>
          <div className="mt-6 border-t border-gray-200" />
        </>
      )}
      <ul className={`${inherited.length > 0 ? 'mt-6' : 'mt-5'} space-y-6`}>
        {own.map((f) => <FeatureRow key={f.key} f={f} />)}
      </ul>
    </div>
  );
}

interface PlanPickerProps {
  /** Heading text, rendered as an h2. */
  title?: string;
  defaultInterval?: BillingInterval;
  /** Called before navigating to onboarding (analytics). */
  onStartTrial?: (key: string, tier: PlanTier, interval: BillingInterval) => void;
  /** Called when a visitor clicks the waitlist CTA (analytics). */
  onWaitlist?: (tier: PlanTier, interval: BillingInterval) => void;
}

/**
 * Plans section, same structure as stan.store's plans: monthly / yearly toggle, three selectable cards
 * (radio group), then "Due today" and one CTA that follows the selected plan. Independent is on sale
 * (free trial); Creator and Salon lead to a waitlist email. Used by the landing page and /pricing.
 */
export default function PlanPicker({
  title = 'Choose your plan',
  defaultInterval = 'monthly',
  onStartTrial,
  onWaitlist,
}: PlanPickerProps) {
  const navigate = useNavigate();
  const [interval, setBilling] = useState<BillingInterval>(defaultInterval);
  // Only plans that can be bought today are shown. Plans in preparation stay off the page
  // until they open: one clear offer converts better than a waitlist nobody understands.
  const visible = PLAN_ORDER.filter((t) => PLANS[t].available);
  const single = visible.length === 1;
  const [selected, setSelected] = useState<PlanTier>(visible[0] ?? 'independent');
  const plan = PLANS[selected];

  const start = () => {
    const key = planKey(plan.tier, interval);
    onStartTrial?.(key, plan.tier, interval);
    navigate(`/onboarding?plan=${key}`);
  };

  const ctaClass =
    'inline-flex h-[62px] w-full items-center justify-center gap-3 rounded-full px-7 text-base font-bold text-white transition hover:opacity-90 active:scale-[0.99]';

  return (
    <div>
      <div className="text-center">
        <h2 className="text-[26px] lg:text-[28px] font-bold leading-[1.2] tracking-tight" style={{ color: INK, letterSpacing: '-0.02em' }}>{title}</h2>
        <p className="mt-4 text-[15px]" style={{ color: MUTED }}>{single ? `One plan, everything included. Free for ${TRIAL_DAYS} days, no card needed.` : `Try Independent free for ${TRIAL_DAYS} days.`}</p>

        <div className="mt-11 mb-12 inline-flex rounded-full bg-gray-100 p-[5px]" role="radiogroup" aria-label="Billing period">
          {(['monthly', 'yearly'] as const).map((b) => (
            <button
              key={b}
              type="button"
              role="radio"
              aria-checked={interval === b}
              onClick={() => setBilling(b)}
              className={`h-11 min-w-[100px] rounded-full px-6 text-[15px] transition ${interval === b ? 'bg-white font-bold shadow-[0_1px_3px_rgba(0,0,0,0.12)]' : 'font-medium hover:text-gray-900'}`}
              style={{ color: interval === b ? INK : '#4B4550' }}
            >
              {b === 'monthly' ? 'Monthly' : 'Yearly'}
            </button>
          ))}
        </div>
      </div>

      <div
        className={single ? 'mx-auto max-w-[440px]' : `mx-auto grid max-w-[1084px] gap-6 lg:gap-[14px] lg:items-start ${visible.length === 2 ? 'lg:grid-cols-2 lg:max-w-[730px]' : 'lg:grid-cols-3'}`}
        role={single ? undefined : 'radiogroup'}
        aria-label={single ? undefined : 'Plans'}
      >
        {visible.map((tier) => (
          <PlanCard key={tier} plan={PLANS[tier]} interval={interval} selected={tier === selected} single={single} onSelect={() => setSelected(tier)} />
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-[650px] text-center">
        <p className="mb-3 text-[15px]" style={{ color: INK }}>Due today: <strong>$0</strong></p>
        {plan.available ? (
          <button type="button" onClick={start} className={ctaClass} style={{ background: PINK }}>
            {single ? 'Start my free trial' : `Continue with ${plan.name}`} <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        ) : (
          <a href={waitlistHref(plan)} onClick={() => onWaitlist?.(plan.tier, interval)} className={ctaClass} style={{ background: PINK }}>
            Join the {plan.name} waitlist <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
        )}
        <p className="mt-8 text-xs" style={{ color: MUTED }}>Prices shown in USD. Standard payment processing fees apply. 0% Nelsy commission.</p>
      </div>
    </div>
  );
}
