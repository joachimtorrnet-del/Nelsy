import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronDown, ChevronRight, Copy, Link2, Mail, MessageCircle, Send, ShieldCheck, UserPlus, Wallet } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import SEOMeta from '@/components/SEOMeta';
import SiteNav from '@/components/layout/SiteNav';
import SiteFooter from '@/components/layout/SiteFooter';
import { supabase } from '@/lib/supabase';
import { PLANS, TRIAL_DAYS, planKey } from '@/lib/plans';
import { track, trackSeoCTAClicked } from '@/lib/analytics';
import { COMMISSION_PERCENT, REFERRAL_TERMS, formatUsd, simulateEarnings } from '@/lib/referrals';

// Same design language as the landing page (src/pages/LandingPremium.tsx).
const PINK = '#F52B8C';
const INK = '#1A1A1A';
const WRAP = 'max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12';
const H2 = 'font-bold tracking-tight leading-[1.08] text-[32px] sm:text-[40px] lg:text-[52px]';
const H2_STYLE = { color: INK, letterSpacing: '-0.03em' } as const;
const BTN = 'inline-flex items-center justify-center gap-3 rounded-full font-bold transition hover:opacity-90 active:scale-[0.98]';

// Every number on this page comes from REFERRAL_TERMS and PLANS: change them there, not here.
const PRICE = PLANS.independent.monthly;
const YEARLY_TOTAL = PLANS.independent.yearlyTotal;
const MIN_PAYOUT = formatUsd(REFERRAL_TERMS.minPayoutCents);
const HOLD = REFERRAL_TERMS.holdDays;
const COOKIE = REFERRAL_TERMS.cookieDays;
const PER_PRO_MONTH = formatUsd(simulateEarnings(1, PRICE).monthly * 100);
const PER_PRO_YEARLY_PLAN = formatUsd(simulateEarnings(1, YEARLY_TOTAL).monthly * 100);
const TERMS_UPDATED = 'November 28, 2026';

const SIGNUP_URL = `/onboarding?plan=${planKey('independent', 'monthly')}&next=affiliates`;
const LOGIN_URL = `/login?next=${encodeURIComponent('/dashboard/referrals')}`;
const DASHBOARD_URL = '/dashboard/referrals';

function useSignedIn(): boolean {
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    if (!supabase) return;
    let alive = true;
    supabase.auth.getSession().then(({ data }) => { if (alive) setSignedIn(!!data.session); }).catch(() => {});
    return () => { alive = false; };
  }, []);
  return signedIn;
}

const PAGE_BG = 'radial-gradient(ellipse 110% 85% at 70% 55%, #FFCBD9 0%, #FFD8E4 18%, #FFE5EE 36%, #FFF0F6 55%, #FFF7FA 74%, #FFFBFD 100%)';
const usd = (dollars: number) => formatUsd(Math.round(dollars * 100));
const PER_PRO = simulateEarnings(1, PRICE).monthly;

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.14em]" style={{ color: INK }}>
      <span aria-hidden="true" style={{ color: PINK }}>[</span>
      {children}
      <span aria-hidden="true" style={{ color: PINK }}>]</span>
    </p>
  );
}

function JoinButton({ signedIn, position, className = '' }: { signedIn: boolean; position: string; className?: string }) {
  const label = signedIn ? 'Get my referral link' : 'Become an affiliate';
  return (
    <Link
      to={signedIn ? DASHBOARD_URL : SIGNUP_URL}
      onClick={() => {
        track('affiliates_cta_clicked', { position, signed_in: signedIn });
        trackSeoCTAClicked('/affiliates', position === 'hero' ? 'hero' : 'footer_cta', label);
      }}
      className={`${BTN} h-14 pl-6 pr-2 text-[17px] ${className}`}
      style={{ background: PINK, color: '#FFFFFF', boxShadow: '0 12px 32px -8px rgba(245,43,140,0.6)' }}
    >
      {label}
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/25" aria-hidden="true">
        <ChevronRight className="w-5 h-5" />
      </span>
    </Link>
  );
}

// Earnings simulator: the centre of the hero.

const SLIDER_MIN = 1;
const SLIDER_MAX = 200;
const THUMB = 28;

function Simulator() {
  const [pros, setPros] = useState(20);
  const { monthly, yearly } = simulateEarnings(pros, PRICE);
  const ratio = (pros - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN);
  const fill = ratio * 100;
  // Centre of the thumb: it travels the track width minus its own width.
  const thumbCenter = `calc(${fill}% + ${THUMB / 2 - ratio * THUMB}px)`;
  const prosLabel = `${pros} ${pros === 1 ? 'pro' : 'pros'}`;

  return (
    <div
      className="relative w-full max-w-[590px] rounded-[32px] border border-white bg-white/90 p-6 sm:p-8 text-left backdrop-blur"
      style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 30px 70px -24px rgba(245,43,140,0.45)' }}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[17px] font-bold" style={{ color: INK }}>Earnings simulator</h2>
        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-gray-500">Example</span>
      </div>
      <label htmlFor="sim-pros" className="mt-1 block text-sm text-gray-500">Pros you refer who stay subscribed</label>

      <div className="relative mt-5 h-9" aria-hidden="true">
        <output
          htmlFor="sim-pros"
          className="absolute top-0 -translate-x-1/2 rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-[15px] font-bold leading-none tabular-nums shadow-sm"
          style={{ left: thumbCenter, color: INK }}
        >
          {pros}
        </output>
      </div>
      <input
        id="sim-pros"
        type="range"
        min={SLIDER_MIN}
        max={SLIDER_MAX}
        step={1}
        value={pros}
        onChange={(e) => setPros(Number(e.target.value))}
        onPointerUp={() => track('affiliates_simulator_used', { pros })}
        aria-valuetext={`${prosLabel}, ${usd(monthly)} per month`}
        className="block w-full h-11 cursor-pointer appearance-none bg-transparent focus-visible:outline-none
          [&::-webkit-slider-runnable-track]:h-2.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[image:var(--track)]
          [&::-moz-range-track]:h-2.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-[image:var(--track)]
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:-mt-[9px] [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[#F52B8C] [&::-webkit-slider-thumb]:shadow-md
          [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[#F52B8C] [&::-moz-range-thumb]:shadow-md
          focus-visible:[&::-webkit-slider-thumb]:ring-4 focus-visible:[&::-webkit-slider-thumb]:ring-[#F52B8C]/30"
        style={{ '--track': `linear-gradient(to right, ${PINK} ${fill}%, #F1E4EA ${fill}%)` } as CSSProperties}
      />
      <div className="flex justify-between text-sm text-gray-400 tabular-nums" aria-hidden="true">
        <span>{SLIDER_MIN}</span>
        <span>{SLIDER_MAX}</span>
      </div>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-x-4 gap-y-3" aria-live="polite">
        <p className="flex flex-wrap items-baseline gap-x-2 text-sm text-gray-500">
          You earn
          <strong className="text-[34px] sm:text-[40px] font-bold leading-none tracking-tight tabular-nums" style={{ color: INK, letterSpacing: '-0.03em' }}>{usd(monthly)}</strong>
          /month
        </p>
        <span className="rounded-lg px-2.5 py-1.5 text-sm font-bold tabular-nums" style={{ background: '#FFE5F1', color: '#C2186F' }}>{prosLabel}</span>
      </div>

      <dl className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 border-t border-gray-100 pt-5 text-sm">
        <div>
          <dt className="text-gray-500">Per year</dt>
          <dd className="mt-0.5 text-[20px] font-bold tabular-nums" style={{ color: PINK }}>{usd(yearly)}</dd>
        </div>
        <div>
          <dt className="text-gray-500">How it is calculated</dt>
          <dd className="mt-0.5 font-semibold tabular-nums leading-7" style={{ color: INK }}>
            {prosLabel} × ${PRICE} × {COMMISSION_PERCENT}% = {usd(monthly)}
          </dd>
        </div>
      </dl>
      <p className="mt-4 text-[13px] leading-relaxed text-gray-500">
        Example, not a promise of income. It assumes every pro stays subscribed to the Independent monthly plan (${PRICE} a month). Yearly figure: 12 months at that rate.
      </p>
    </div>
  );
}

// Steps: each card carries a small product illustration, like the real Referrals tab.

function StepLinkArt() {
  return (
    <div className="text-center">
      <p className="mb-3 text-sm text-gray-500">Your referral link</p>
      <p className="inline-flex max-w-full items-center rounded-xl border border-gray-100 bg-white p-1.5 pl-3 text-[15px] sm:text-[17px] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)]" style={{ color: INK }}>
        <span className="truncate">getnelsy.com/</span>
        <span className="ml-1 rounded-lg px-2 py-1 font-bold text-white" style={{ background: PINK }}>?ref=you</span>
      </p>
    </div>
  );
}

function StepShareArt() {
  const channels = [
    { icon: Link2, label: 'Bio link' },
    { icon: MessageCircle, label: 'Messages' },
    { icon: Mail, label: 'Email' },
  ];
  return (
    <div className="flex flex-col items-center">
      <ul className="flex items-end justify-center gap-7 sm:gap-9">
        {channels.map((c, i) => (
          <li key={c.label} className={`flex flex-col items-center gap-1.5 ${i === 1 ? 'pb-6' : ''}`}>
            <span className="text-xs text-gray-500">{c.label}</span>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm" style={{ color: INK }}>
              <c.icon className="w-5 h-5" />
            </span>
          </li>
        ))}
      </ul>
      <span className="-mt-px block h-6 w-[150px] sm:w-[170px] rounded-b-2xl border-x border-b border-gray-200" />
      <span className="-mt-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-black text-white shadow-[0_8px_20px_-8px_rgba(245,43,140,0.7)]" style={{ background: PINK }}>
        N
      </span>
    </div>
  );
}

function StepPayoutArt() {
  return (
    <div className="w-full max-w-[300px]">
      <div className="flex items-end gap-2 rounded-2xl border border-gray-100 bg-white p-3 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)]">
        <div className="min-w-0 flex-1">
          <p className="mb-1.5 text-[13px] text-gray-500">Pending</p>
          <p className="rounded-lg bg-gray-100 px-2.5 py-2 text-sm font-semibold tabular-nums" style={{ color: INK }}>{usd(PER_PRO * 2)}</p>
        </div>
        <div className="min-w-0 flex-1">
          <p className="mb-1.5 text-[13px] text-gray-500">Available</p>
          <p className="rounded-lg bg-gray-100 px-2.5 py-2 text-sm font-semibold tabular-nums" style={{ color: INK }}>{usd(PER_PRO * 6)}</p>
        </div>
        <span className="rounded-lg px-3 py-2 text-sm font-bold text-white" style={{ background: PINK }}>Payout</span>
      </div>
      <p className="mt-2 text-center text-xs text-gray-400">Example amounts</p>
    </div>
  );
}

const STEPS: { icon: typeof Link2; title: string; text: string; art: () => ReactNode }[] = [
  {
    icon: UserPlus,
    title: 'Get your link',
    text: 'Create your Nelsy account, then open Referrals in your dashboard. Your personal link is ready, no application needed.',
    art: StepLinkArt,
  },
  {
    icon: Send,
    title: 'Share it',
    text: 'Send it to the nail techs you know, put it in your bio or add it to your tutorials. The "Made with Nelsy" badge on your booking page counts too.',
    art: StepShareArt,
  },
  {
    icon: Wallet,
    title: 'Get paid every month',
    text: `You earn ${COMMISSION_PERCENT}% of each payment your referrals make, for as long as they stay subscribed. Ask for a payout once you reach ${MIN_PAYOUT}.`,
    art: StepPayoutArt,
  },
];

const AT_A_GLANCE = [
  { value: `${COMMISSION_PERCENT}%`, label: 'of every subscription payment, recurring' },
  { value: `${COOKIE} days`, label: 'to sign up after clicking your link' },
  { value: `${HOLD} days`, label: 'hold before a commission is approved' },
  { value: MIN_PAYOUT, label: 'minimum payout' },
  { value: 'Monthly', label: 'payouts, reviewed by our team' },
];

const RULES: { title: string; text: string }[] = [
  {
    title: 'Who can join',
    text: 'Anyone with a Nelsy account. You do not need a paid plan to earn commissions.',
  },
  {
    title: 'Commission',
    text: `You earn ${COMMISSION_PERCENT}% of every subscription payment Nelsy actually collects from a pro you referred, taxes excluded, for as long as she stays subscribed. Monthly and yearly plans both count.`,
  },
  {
    title: 'Free trials',
    text: `There is no commission during a free trial. Commissions start with the first payment a referred pro makes after her ${TRIAL_DAYS}-day trial.`,
  },
  {
    title: 'How a referral is attributed',
    text: `A pro is your referral when she creates her Nelsy account within ${COOKIE} days of clicking your link or the "Made with Nelsy" badge on your booking page, or when she enters your Nelsy handle while signing up in the app. If she clicked several links, the last one wins. A pro has one referrer and it does not change afterwards. If she refuses cookies, the referral counts only when she signs up during the same visit.`,
  },
  {
    title: `${HOLD}-day hold`,
    text: `Each commission stays pending for ${HOLD} days after the payment it comes from, then becomes approved.`,
  },
  {
    title: 'Refunds and chargebacks',
    text: 'If a payment is refunded or disputed, its commission is reversed. If that commission was already paid to you, the amount is deducted from your next payout.',
  },
  {
    title: 'Payouts',
    text: `You can request a payout from your dashboard once your approved balance reaches ${MIN_PAYOUT}. Payouts are reviewed and approved by our team, then sent once a month in US dollars, by transfer to your Stripe account or your bank account. You are responsible for declaring this income and paying any tax due on it.`,
  },
  {
    title: 'No self-referral',
    text: 'You cannot refer yourself, another account you own, or an account paid with your own card or email address. Commissions from self-referrals are cancelled.',
  },
  {
    title: 'No ads on the Nelsy brand',
    text: 'Do not buy search or social ads that target the name Nelsy or its misspellings, and do not run ads or pages that look like they come from Nelsy. Spam, misleading claims and fake reviews are not allowed either.',
  },
  {
    title: 'Tell people it is an affiliate link',
    text: 'Each time you share your link, say clearly that you earn a commission if someone subscribes, for example "affiliate link" or "#ad", placed next to the link and not hidden in a list of hashtags. In the United States this is required by the FTC Endorsement Guides, and similar rules apply in most other countries.',
  },
  {
    title: 'Changes to the program',
    text: 'Nelsy may update or end the program. Changes are published on this page, and commissions already approved remain due. Nelsy may withhold commissions and close affiliate access for accounts that break these rules.',
  },
];

const FAQ = [
  {
    q: 'How much can I earn with the Nelsy affiliate program?',
    a: `You earn ${COMMISSION_PERCENT}% of every subscription payment made by a pro you referred. On the Independent plan that is ${PER_PRO_MONTH} a month for each pro billed monthly ($${PRICE}), or ${PER_PRO_YEARLY_PLAN} for each yearly payment ($${YEARLY_TOTAL}). There is no limit on the number of pros you can refer. What you actually earn depends on how many of them subscribe and stay.`,
  },
  {
    q: 'Do I need a paid Nelsy plan to be an affiliate?',
    a: 'No. You need a Nelsy account to get your link and follow your referrals, but you do not need a paid plan to earn commissions.',
  },
  {
    q: 'How long do I keep earning on a referral?',
    a: `For as long as the pro you referred stays subscribed. Every payment she makes, monthly or yearly, gives you ${COMMISSION_PERCENT}%.`,
  },
  {
    q: 'When do I get paid?',
    a: `Each commission is approved ${HOLD} days after the payment it comes from. Once your approved balance reaches ${MIN_PAYOUT}, you can request a payout from your dashboard. Payouts are reviewed by our team and sent once a month.`,
  },
  {
    q: 'Do I earn anything while my referral is on her free trial?',
    a: `No. The ${TRIAL_DAYS}-day free trial is free for her, so there is nothing to share yet. Your commission starts with her first payment.`,
  },
  {
    q: 'What happens if my referral cancels or gets a refund?',
    a: 'When she cancels, commissions stop with her last payment. If a payment is refunded or disputed, the commission on that payment is reversed.',
  },
  {
    q: 'How does Nelsy know a pro came from me?',
    a: `Your link carries your code. When someone clicks it, we remember it for ${COOKIE} days, and the account she creates in that time is attached to you. Signups from the "Made with Nelsy" badge on your booking page and pros who enter your handle in the app are attached to you as well.`,
  },
  {
    q: 'Can I run ads with my affiliate link?',
    a: 'Yes, as long as you do not bid on the Nelsy brand name or make your ad look like it comes from Nelsy, and you say that the link is an affiliate link.',
  },
];


// Final CTA visual: the Referrals tab of the dashboard, redrawn with example data.
// Three referred pros on the monthly plan; every amount derives from PRICE and the program terms.

const PREVIEW_ROWS = [
  { name: 'Lina', slug: 'lina-nails', status: 'Paying', cls: 'bg-green-50 text-green-700', payments: 3 },
  { name: 'Sofia', slug: 'sofia-studio', status: 'Paying', cls: 'bg-green-50 text-green-700', payments: 2 },
  { name: 'Jade', slug: 'jade-beauty', status: 'Paying', cls: 'bg-green-50 text-green-700', payments: 1 },
  { name: 'Amel', slug: 'amel-nailbar', status: 'Free trial', cls: 'bg-amber-50 text-amber-700', payments: 0 },
];
const PREVIEW_EARNED = PREVIEW_ROWS.reduce((sum, r) => sum + r.payments * PER_PRO, 0);
// Each paying pro has one payment still inside the hold.
const PREVIEW_PENDING = PREVIEW_ROWS.filter((r) => r.payments > 0).length * PER_PRO;
const PREVIEW_AVAILABLE = PREVIEW_EARNED - PREVIEW_PENDING;
const PREVIEW_MISSING = Math.max(0, REFERRAL_TERMS.minPayoutCents / 100 - PREVIEW_AVAILABLE);

function PreviewStat({ label, value, hint, accent = false }: { label: string; value: string; hint?: string; accent?: boolean }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-3 sm:p-4">
      <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-gray-400 leading-tight">{label}</p>
      <p className={`mt-1 text-xl sm:text-2xl font-bold tabular-nums ${accent ? 'text-[#C2186F]' : 'text-[#1A1A1A]'}`}>{value}</p>
      {hint && <p className="mt-0.5 text-[11px] text-gray-400">{hint}</p>}
    </div>
  );
}

function DashboardPreview() {
  return (
    <figure className="relative mx-auto mt-12 lg:mt-16 w-full max-w-[880px]">
      <div
        className="relative max-h-[560px] lg:max-h-[600px] overflow-hidden rounded-t-[24px] border border-b-0 border-white bg-white text-left"
        style={{ boxShadow: '0 40px 90px -30px rgba(245,43,140,0.5)' }}
      >
        <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <i className="h-2.5 w-2.5 rounded-full bg-gray-300" />
            <i className="h-2.5 w-2.5 rounded-full bg-gray-300" />
            <i className="h-2.5 w-2.5 rounded-full bg-gray-300" />
          </span>
          <span className="mx-auto truncate rounded-md bg-white px-3 py-1 text-xs text-gray-500">getnelsy.com/dashboard/referrals</span>
          <span className="rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white" style={{ background: INK }}>Example</span>
        </div>

        <div className="pointer-events-none select-none bg-[#FAFAFA] p-4 sm:p-7" aria-hidden="true">
          <p className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: INK }}>Referrals</p>
          <p className="mt-1 mb-5 text-[13px] sm:text-sm text-gray-500">
            Earn {COMMISSION_PERCENT}% of every subscription payment from the pros you bring to Nelsy.
          </p>

          <div className="mb-4 rounded-2xl border border-gray-100 bg-white p-4 sm:p-5">
            <p className="mb-3 text-sm font-bold" style={{ color: INK }}>Your referral link</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <span className="flex h-11 w-full min-w-0 flex-shrink-0 sm:flex-1 items-center truncate rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-sm" style={{ color: INK }}>
                https://getnelsy.com/?ref=you
              </span>
              <span className="inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold text-white" style={{ background: PINK }}>
                <Copy className="w-4 h-4" /> Copy link
              </span>
            </div>
          </div>

          <div className="mb-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <PreviewStat label="Link clicks" value="46" />
            <PreviewStat label="Signups" value={String(PREVIEW_ROWS.length)} />
            <PreviewStat label="On free trial" value="1" />
            <PreviewStat label="Paying" value="3" accent />
          </div>
          <div className="mb-4 grid grid-cols-3 gap-3">
            <PreviewStat label="Earned" value={usd(PREVIEW_EARNED)} />
            <PreviewStat label="Pending" hint={`${HOLD}-day hold`} value={usd(PREVIEW_PENDING)} />
            <PreviewStat label="Paid" value={usd(0)} />
          </div>

          <div className="mb-4 rounded-2xl border border-gray-100 bg-white p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm font-bold" style={{ color: INK }}>Available for payout</p>
                <p className="mt-1 text-3xl font-bold tabular-nums" style={{ color: INK }}>{usd(PREVIEW_AVAILABLE)}</p>
              </div>
              <span className="inline-flex h-11 items-center justify-center self-start sm:self-auto rounded-xl px-5 text-sm font-bold text-white opacity-30" style={{ background: INK }}>
                Request payout
              </span>
            </div>
            <p className="mt-3 text-[13px] text-gray-500">
              {usd(PREVIEW_MISSING)} more in approved commissions to reach the {MIN_PAYOUT} minimum.
            </p>
            <p className="mt-4 flex items-start gap-2 border-t border-gray-100 pt-4 text-[13px] text-gray-500">
              <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
              Payouts are reviewed and sent monthly.
            </p>
          </div>

          <p className="mb-3 text-sm font-bold" style={{ color: INK }}>Your referrals</p>
          <ul className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white">
            {PREVIEW_ROWS.map((r) => (
              <li key={r.slug} className="flex items-center gap-3 px-4 py-3 text-sm">
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium" style={{ color: INK }}>{r.name}</span>
                  <span className="block truncate text-xs text-gray-500">getnelsy.com/{r.slug}</span>
                </span>
                <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap ${r.cls}`}>{r.status}</span>
                <span className="w-16 text-right font-semibold tabular-nums" style={{ color: INK }}>{usd(r.payments * PER_PRO)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
      </div>
      <figcaption className="sr-only">
        Example of the Referrals tab in the Nelsy dashboard: your referral link, clicks, signups, earnings and payout request. The names and amounts shown are illustrative.
      </figcaption>
    </figure>
  );
}

const COL_HEAD = 'lg:sticky lg:top-28 lg:self-start';
const ACCORDION_ROW = 'flex min-h-[64px] items-center justify-between gap-4 py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden text-[16px] lg:text-[17px] font-semibold';

export default function Affiliates() {
  const signedIn = useSignedIn();

  useEffect(() => {
    document.dispatchEvent(new Event('render-complete'));
  }, []);

  return (
    <div className="font-sans min-h-screen antialiased" style={{ background: '#FFF0F6' }}>
      <SEOMeta
        title={`Nelsy Affiliate Program: Earn ${COMMISSION_PERCENT}% Recurring Commission`}
        description={`Earn ${COMMISSION_PERCENT}% of every subscription payment from the nail techs and beauty pros you refer to Nelsy, for as long as they stay subscribed. ${MIN_PAYOUT} minimum payout.`}
        canonical="/affiliates"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Nelsy affiliate program',
            description: `Refer nail techs and beauty pros to Nelsy and earn ${COMMISSION_PERCENT}% of every subscription payment they make.`,
            url: 'https://getnelsy.com/affiliates',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
          },
        ]}
      />
      <SiteNav />
      <main>
        {/* 1. Hero: centered headline and CTA, then the simulator as the centrepiece */}
        <section className="relative overflow-hidden" style={{ background: PAGE_BG }}>
          <div className={`relative ${WRAP} pt-28 lg:pt-32 pb-14 lg:pb-20 text-center`}>
            <Eyebrow>Affiliate</Eyebrow>
            <h1
              className="mx-auto mt-5 max-w-[760px] font-bold leading-[1.05] text-[38px] sm:text-[52px] lg:text-[64px]"
              style={{ color: INK, letterSpacing: '-0.035em' }}
            >
              Earn {COMMISSION_PERCENT}% on every nail tech you bring to Nelsy
            </h1>
            <p className="mx-auto mt-5 max-w-[560px] text-[16px] lg:text-lg leading-relaxed text-gray-600">
              One link. {COMMISSION_PERCENT}% of every payment she makes, every month, for as long as she stays subscribed.
            </p>
            <div className="mt-7 flex flex-col items-center gap-1">
              <JoinButton signedIn={signedIn} position="hero" className="w-full sm:w-auto" />
              {!signedIn && (
                <Link
                  to={LOGIN_URL}
                  className="inline-flex min-h-[44px] items-center px-3 text-[15px] font-semibold underline underline-offset-4 decoration-gray-400 hover:decoration-gray-900"
                  style={{ color: INK }}
                >
                  I already have an account
                </Link>
              )}
            </div>

            <div className="relative mt-8 lg:mt-9 flex items-stretch justify-center gap-5">
              <div className="hidden lg:block flex-1 self-end h-[230px] rounded-[32px] border border-white bg-white/55" style={{ maskImage: 'linear-gradient(to left, #000, transparent 85%)', WebkitMaskImage: 'linear-gradient(to left, #000, transparent 85%)' }} aria-hidden="true" />
              <Simulator />
              <div className="hidden lg:block flex-1 self-end h-[230px] rounded-[32px] border border-white bg-white/55" style={{ maskImage: 'linear-gradient(to right, #000, transparent 85%)', WebkitMaskImage: 'linear-gradient(to right, #000, transparent 85%)' }} aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* White sheet laid over the pink page: steps, FAQ, terms */}
        <div className="relative -mt-6 mx-1.5 sm:mx-2 rounded-[32px] lg:rounded-[40px] bg-white">
          {/* 2. How it works */}
          <section className="pt-16 lg:pt-24 pb-14 lg:pb-24">
            <div className={`${WRAP} text-center`}>
              <Eyebrow>How it works</Eyebrow>
              <h2 className={`${H2} mt-4`} style={H2_STYLE}>Become an affiliate in 3 steps</h2>
              <p className="mx-auto mt-4 max-w-[440px] text-[16px] lg:text-[17px] leading-relaxed text-gray-600">
                Get your link, share it, and earn {COMMISSION_PERCENT}% on every payment your referrals make.
              </p>
              <ol className="mt-10 lg:mt-14 grid gap-5 lg:grid-cols-3 text-left">
                {STEPS.map((s, i) => (
                  <li key={s.title} className="flex flex-col rounded-[32px] border border-gray-100 bg-white p-5 shadow-[0_18px_40px_-28px_rgba(26,26,26,0.35)]">
                    <p className="flex items-center gap-3 rounded-full p-2" style={{ background: '#F7F3F5' }}>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[15px] font-semibold shadow-sm" style={{ color: INK }}>{i + 1}</span>
                      <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-gray-600">Step {i + 1}</span>
                    </p>
                    <div className="flex min-h-[190px] lg:min-h-[220px] items-center justify-center py-6" aria-hidden="true">
                      <s.art />
                    </div>
                    <h3 className="flex items-center gap-2 px-2 text-[17px] font-bold" style={{ color: INK }}>
                      <s.icon className="w-5 h-5 flex-shrink-0" style={{ color: PINK }} aria-hidden="true" />
                      {s.title}
                    </h3>
                    <p className="mt-2 px-2 pb-2 text-[15px] leading-relaxed text-gray-600">{s.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* 3. FAQ */}
          <section className="py-14 lg:py-20">
            <div className={`${WRAP} grid lg:grid-cols-[minmax(0,1fr)_minmax(0,582px)] gap-8 lg:gap-24`}>
              <div className={COL_HEAD}>
                <Eyebrow>F.A.Q</Eyebrow>
                <h2 className={`${H2} mt-4 max-w-[480px]`} style={H2_STYLE}>Frequently asked questions</h2>
                <p className="mt-4 text-[16px] leading-relaxed text-gray-600">
                  Can't find your answer? Write to us at{' '}
                  <a href="mailto:hello@getnelsy.com" className="inline-block py-3 underline underline-offset-4 hover:text-gray-900">hello@getnelsy.com</a>
                </p>
              </div>
              <div className="divide-y divide-gray-200 border-y border-gray-200">
                {FAQ.map((f) => (
                  <details key={f.q} className="group">
                    <summary className={ACCORDION_ROW} style={{ color: INK }}>
                      {f.q}
                      <ChevronDown className="w-5 h-5 flex-shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <p className="pb-5 pr-8 text-[15px] leading-relaxed text-gray-600">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* 4. Program terms: same two-column pattern as the FAQ, every rule visible */}
          <section id="terms" className="scroll-mt-24 pt-14 lg:pt-20 pb-16 lg:pb-24">
            <div className={`${WRAP} grid lg:grid-cols-[minmax(0,1fr)_minmax(0,582px)] gap-8 lg:gap-24`}>
              <div className={COL_HEAD}>
                <Eyebrow>Terms</Eyebrow>
                <h2 className={`${H2} mt-4 max-w-[480px]`} style={H2_STYLE}>Program terms</h2>
                <p className="mt-4 text-[16px] leading-relaxed text-gray-600">
                  The short version first, then every rule in plain words.
                </p>
                <dl className="mt-6 max-w-[440px] divide-y divide-gray-200 border-y border-gray-200">
                  {AT_A_GLANCE.map((f) => (
                    <div key={f.label} className="flex items-baseline gap-4 py-3">
                      <dd className="w-[92px] flex-shrink-0 text-[20px] font-bold tracking-tight tabular-nums" style={{ color: INK }}>{f.value}</dd>
                      <dt className="text-[15px] leading-snug text-gray-600">{f.label}</dt>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-sm text-gray-500">Last updated {TERMS_UPDATED}</p>
              </div>
              <div>
                <ol className="divide-y divide-gray-200 border-y border-gray-200">
                  {RULES.map((r, i) => (
                    <li key={r.title} className="grid grid-cols-[32px_minmax(0,1fr)] gap-x-2 py-5">
                      <span className="text-[16px] font-bold tabular-nums" style={{ color: PINK }}>{i + 1}.</span>
                      <div>
                        <h3 className="flex items-center gap-2 text-[16px] lg:text-[17px] font-semibold" style={{ color: INK }}>{r.title}</h3>
                        <p className="mt-1 text-[15px] leading-relaxed text-gray-600">{r.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className="mt-6 text-sm leading-relaxed text-gray-500">
                  These rules add to the Nelsy{' '}
                  <Link to="/terms" className="inline-block py-3 underline underline-offset-2 hover:text-gray-900">Terms of Service</Link>. Questions:{' '}
                  <a href="mailto:hello@getnelsy.com" className="inline-block py-3 underline underline-offset-2 hover:text-gray-900">hello@getnelsy.com</a>
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* 5. Final CTA with a product preview */}
        <section className="relative overflow-hidden text-center" style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 75%, #FFCBD9 0%, #FFD8E4 22%, #FFE5EE 45%, #FFF0F6 100%)' }}>
          <div className={`${WRAP} pt-16 lg:pt-24`}>
            <h2 className="mx-auto max-w-[680px] font-bold leading-[1.05] text-[36px] sm:text-[48px] lg:text-[60px]" style={{ color: INK, letterSpacing: '-0.035em' }}>
              Ready to get your referral link?
            </h2>
            <div className="mt-7 flex flex-col items-center gap-1">
              <JoinButton signedIn={signedIn} position="final" className="w-full sm:w-auto" />
              {!signedIn && (
                <Link
                  to={LOGIN_URL}
                  className="inline-flex min-h-[44px] items-center px-3 text-[15px] font-semibold underline underline-offset-4 decoration-gray-400 hover:decoration-gray-900"
                  style={{ color: INK }}
                >
                  I already have an account
                </Link>
              )}
            </div>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-gray-600">
              <Check className="w-4 h-4" style={{ color: PINK }} aria-hidden="true" /> Free to join, no paid plan required
            </p>
            <DashboardPreview />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
