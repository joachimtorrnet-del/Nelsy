import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Link2, Send, Wallet } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
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
const H2 = 'font-bold tracking-tight leading-[1.15] text-[34px] lg:text-[48px]';
const H2_STYLE = { color: INK, letterSpacing: '-0.02em' } as const;
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

function JoinButton({ signedIn, position, light = false, className = '' }: { signedIn: boolean; position: string; light?: boolean; className?: string }) {
  const label = signedIn ? 'Get my referral link' : 'Become an affiliate';
  return (
    <Link
      to={signedIn ? DASHBOARD_URL : SIGNUP_URL}
      onClick={() => {
        track('affiliates_cta_clicked', { position, signed_in: signedIn });
        trackSeoCTAClicked('/affiliates', position === 'hero' ? 'hero' : 'footer_cta', label);
      }}
      className={`${BTN} h-[60px] lg:h-[69px] px-[30px] text-base lg:text-[19px] ${className}`}
      style={light ? { background: '#FFFFFF', color: INK } : { background: PINK, color: '#FFFFFF', boxShadow: '0 10px 30px -8px rgba(245,43,140,0.55)' }}
    >
      {label} <ArrowRight className="w-5 h-5" aria-hidden="true" />
    </Link>
  );
}

// ─── Earnings simulator ──────────────────────────────────────────────────────

const SLIDER_MIN = 1;
const SLIDER_MAX = 200;

function Simulator() {
  const [pros, setPros] = useState(10);
  const { monthly, yearly } = simulateEarnings(pros, PRICE);
  const fill = ((pros - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100;
  const usd = (n: number) => formatUsd(Math.round(n * 100));

  return (
    <div
      className="w-full max-w-[520px] rounded-[28px] bg-white p-6 sm:p-8"
      style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 24px 60px -20px rgba(245,43,140,0.35)' }}
    >
      <h2 className="text-lg font-bold" style={{ color: INK }}>Earnings simulator</h2>

      <div className="mt-5 flex items-end justify-between gap-4">
        <label htmlFor="sim-pros" className="text-[15px] text-gray-600">Pros you refer</label>
        <output htmlFor="sim-pros" className="text-[28px] font-bold leading-none tabular-nums" style={{ color: INK }}>{pros}</output>
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
        aria-valuetext={`${pros} pros, ${usd(monthly)} per month`}
        className="mt-4 block w-full h-11 cursor-pointer appearance-none bg-transparent focus-visible:outline-none
          [&::-webkit-slider-runnable-track]:h-2.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[image:var(--track)]
          [&::-moz-range-track]:h-2.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-[image:var(--track)]
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:-mt-[9px] [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[#F52B8C] [&::-webkit-slider-thumb]:shadow-md
          [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[#F52B8C] [&::-moz-range-thumb]:shadow-md
          focus-visible:[&::-webkit-slider-thumb]:ring-4 focus-visible:[&::-webkit-slider-thumb]:ring-[#F52B8C]/30"
        style={{ '--track': `linear-gradient(to right, ${PINK} ${fill}%, #F1E4EA ${fill}%)` } as React.CSSProperties}
      />
      <div className="flex justify-between text-xs text-gray-400" aria-hidden="true">
        <span>{SLIDER_MIN}</span>
        <span>{SLIDER_MAX}</span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3" aria-live="polite">
        <div className="rounded-2xl p-4" style={{ background: '#FFF0F6' }}>
          <p className="text-[13px] font-semibold text-gray-600">Per month</p>
          <p className="mt-1 text-[30px] sm:text-[36px] font-bold leading-none tracking-tight tabular-nums" style={{ color: PINK }}>{usd(monthly)}</p>
        </div>
        <div className="rounded-2xl p-4" style={{ background: '#F7F3F5' }}>
          <p className="text-[13px] font-semibold text-gray-600">Per year</p>
          <p className="mt-1 text-[30px] sm:text-[36px] font-bold leading-none tracking-tight tabular-nums" style={{ color: INK }}>{usd(yearly)}</p>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-700 tabular-nums">
        {pros} {pros === 1 ? 'pro' : 'pros'} × ${PRICE} × {COMMISSION_PERCENT}% = <strong>{usd(monthly)} per month</strong>
      </p>
      <p className="mt-1 text-[13px] text-gray-500">
        Example, based on pros who stay subscribed. Plan used: Independent monthly, ${PRICE} a month.
      </p>
    </div>
  );
}

// ─── Content ─────────────────────────────────────────────────────────────────

const STEPS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Link2,
    title: 'Get your link',
    text: 'Create your Nelsy account, then open Referrals in your dashboard. Your personal link is ready, no application needed.',
  },
  {
    icon: Send,
    title: 'Share it',
    text: 'Send it to the nail techs you know, put it in your bio or add it to your tutorials. The "Made with Nelsy" badge on your booking page counts too.',
  },
  {
    icon: Wallet,
    title: 'Get paid every month',
    text: `You earn ${COMMISSION_PERCENT}% of each payment your referrals make, for as long as they stay subscribed. Ask for a payout once you reach ${MIN_PAYOUT}.`,
  },
];

const AT_A_GLANCE = [
  { value: `${COMMISSION_PERCENT}%`, label: 'of every subscription payment, recurring' },
  { value: `${COOKIE} days`, label: 'to sign up after clicking your link' },
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

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Affiliates() {
  const signedIn = useSignedIn();

  useEffect(() => {
    document.dispatchEvent(new Event('render-complete'));
  }, []);

  return (
    <div className="font-sans min-h-screen bg-white antialiased">
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
        {/* 1. Hero + simulator */}
        <section
          className="relative overflow-hidden"
          style={{ background: 'radial-gradient(ellipse 110% 85% at 70% 55%, #FFCBD9 0%, #FFD8E4 18%, #FFE5EE 36%, #FFF0F6 55%, #FFF7FA 74%, #FFFBFD 100%)' }}
        >
          <div className={`relative ${WRAP} pt-24 lg:pt-36 pb-14 lg:pb-24 grid lg:grid-cols-[minmax(0,1fr)_520px] gap-10 lg:gap-16 items-center`}>
            <div>
              <p className="text-sm lg:text-base font-bold mb-4" style={{ color: PINK }}>Nelsy Affiliates</p>
              <h1 className="font-bold tracking-tight leading-[1.1] mb-5 text-[36px] sm:text-[48px] lg:text-[56px]" style={{ color: INK, letterSpacing: '-0.03em' }}>
                Earn {COMMISSION_PERCENT}% every month for every nail tech you bring to Nelsy
              </h1>
              <p className="text-[15px] lg:text-lg text-gray-600 leading-relaxed mb-7 max-w-[500px]">
                Share your link. Each time a pro you referred pays for her Nelsy plan, {COMMISSION_PERCENT}% of that payment is yours, for as long as she stays subscribed.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <JoinButton signedIn={signedIn} position="hero" className="w-full sm:w-auto" />
                {!signedIn && (
                  <Link to={LOGIN_URL} className="text-center text-[15px] font-semibold underline underline-offset-4 decoration-gray-300 hover:decoration-gray-900" style={{ color: INK }}>
                    I already have an account
                  </Link>
                )}
              </div>
              <p className="mt-4 text-sm text-gray-500 text-center sm:text-left">Free to join · No paid plan required · {MIN_PAYOUT} minimum payout</p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Simulator />
            </div>
          </div>
        </section>

        {/* 2. How it works */}
        <section className="py-[60px] lg:py-[100px] bg-white">
          <div className={WRAP}>
            <h2 className={`${H2} mb-10 lg:mb-14 max-w-[640px]`} style={H2_STYLE}>How it works</h2>
            <ol className="grid gap-5 lg:grid-cols-3">
              {STEPS.map((s, i) => (
                <li key={s.title} className="rounded-[28px] p-7 lg:p-8" style={{ background: '#F7F3F5' }}>
                  <div className="flex items-center justify-between mb-8">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white" style={{ color: PINK }}>
                      <s.icon className="w-6 h-6" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-bold text-gray-400">Step {i + 1}</span>
                  </div>
                  <h3 className="text-[22px] font-bold mb-2" style={{ color: INK }}>{s.title}</h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 3. Terms: summary, then the full rules */}
        <section id="terms" className="py-[60px] lg:py-[86px] scroll-mt-20" style={{ background: '#F7F3F5' }}>
          <div className={WRAP}>
            <h2 className={`${H2} mb-4`} style={H2_STYLE}>Program terms</h2>
            <p className="text-[15px] lg:text-lg text-gray-600 leading-relaxed max-w-[620px] mb-10">
              The short version first, then every rule in plain words.
            </p>

            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 mb-12 lg:mb-16">
              {AT_A_GLANCE.map((f) => (
                <div key={f.label} className="flex flex-col-reverse justify-end rounded-3xl bg-white p-5 lg:p-7">
                  <dt className="mt-2 text-[13px] lg:text-[15px] text-gray-600 leading-snug">{f.label}</dt>
                  <dd className="text-[28px] lg:text-[40px] font-bold tracking-tight leading-none" style={{ color: INK }}>{f.value}</dd>
                </div>
              ))}
            </dl>

            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,720px)] gap-6 lg:gap-24">
              <div>
                <h3 className="text-[24px] lg:text-[28px] font-bold tracking-tight" style={{ color: INK }}>The rules</h3>
                <p className="mt-2 text-sm text-gray-500">Last updated {TERMS_UPDATED}</p>
              </div>
              <ol className="divide-y divide-gray-300 border-y border-gray-300">
                {RULES.map((r, i) => (
                  <li key={r.title} className="grid grid-cols-[32px_minmax(0,1fr)] gap-x-2 py-5">
                    <span className="text-[15px] font-bold tabular-nums" style={{ color: PINK }}>{i + 1}.</span>
                    <div>
                      <h4 className="text-[15px] font-bold" style={{ color: INK }}>{r.title}</h4>
                      <p className="mt-1 text-[15px] text-gray-600 leading-relaxed">{r.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <p className="mt-8 text-sm text-gray-500 lg:text-right">
              These rules add to the Nelsy <Link to="/terms" className="underline underline-offset-2 hover:text-gray-900">Terms of Service</Link>. Questions:{' '}
              <a href="mailto:hello@getnelsy.com" className="underline underline-offset-2 hover:text-gray-900">hello@getnelsy.com</a>
            </p>
          </div>
        </section>

        {/* 4. FAQ */}
        <section className="py-[60px] lg:py-[86px] bg-white">
          <div className={`${WRAP} grid lg:grid-cols-[minmax(0,1fr)_570px] gap-8 lg:gap-24`}>
            <h2 className="font-bold tracking-tight leading-[1.2] text-[32px] lg:text-[38px]" style={H2_STYLE}>
              Your questions, answered
            </h2>
            <div className="divide-y divide-gray-300 border-b border-gray-300">
              {FAQ.map((f) => (
                <details key={f.q} className="group">
                  <summary className="flex min-h-[71px] lg:min-h-[75px] items-center justify-between gap-4 py-3 cursor-pointer list-none text-[15px] font-bold" style={{ color: INK }}>
                    {f.q}
                    <span className="text-2xl font-light transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="pb-5 text-[15px] text-gray-600 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Final CTA */}
        <section className="py-[65px] lg:py-[85px] text-center text-white" style={{ background: PINK }}>
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-bold tracking-tight leading-[1.15] mb-4 text-[39px] lg:text-[64px]" style={{ letterSpacing: '-0.03em' }}>Get your referral link</h2>
            <p className="text-sm lg:text-base text-white/90 mb-8">
              {COMMISSION_PERCENT}% of every payment, for as long as your referrals stay on Nelsy.
            </p>
            <JoinButton signedIn={signedIn} position="final" light />
            {!signedIn && (
              <p className="mt-4 text-sm text-white/80">
                Already on Nelsy? <Link to={LOGIN_URL} className="font-semibold underline underline-offset-2">Log in</Link> to find your link.
              </p>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
