import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOMeta from '@/components/SEOMeta';
import SiteNav from '@/components/layout/SiteNav';
import SiteFooter from '@/components/layout/SiteFooter';

const PINK = '#F52B8C';

// Confirmed from Stripe config / OnboardingV2 — both price IDs exist
const MONTHLY_PRICE = 29;
const YEARLY_PRICE_PER_MONTH = 25;
const YEARLY_TOTAL = 300;
const YEARLY_SAVINGS = (MONTHLY_PRICE - YEARLY_PRICE_PER_MONTH) * 12; // 48

// Features with coming-soon flags from navData.ts
const PLAN_FEATURES = {
  book: [
    { label: 'Online bookings', route: '/features/bookings' },
    { label: 'Deposits', route: '/features/deposits' },
    { label: 'Online payments', route: '/features/payments' },
    { label: 'Booking policies & cancellation', route: null },
    { label: 'Gift cards', route: null, soon: true },
    { label: 'Packages', route: null, soon: true },
  ],
  grow: [
    { label: 'Link in bio', route: '/features/link-in-bio' },
    { label: 'Instagram AutoDM', route: '/features/instagram-autodm' },
    { label: 'Audience capture', route: '/features/audience-capture' },
    { label: 'Email & newsletters', route: '/features/email-newsletters' },
  ],
  run: [
    { label: 'Client CRM', route: '/features/crm' },
    { label: 'Analytics dashboard', route: '/features/analytics' },
  ],
};

const VALUE_PROPS = [
  {
    icon: '📲',
    heading: 'Turn followers into booked clients',
    desc: 'One link, one booking page, zero friction.',
  },
  {
    icon: '🛡️',
    heading: 'Reduce no-shows',
    desc: 'Deposits and booking policies protect your time.',
  },
  {
    icon: '💬',
    heading: 'Spend less time in DMs',
    desc: 'Clients book, pay, and manage appointments themselves.',
  },
  {
    icon: '✨',
    heading: 'Build a business that looks like you',
    desc: 'Your booking page, your brand.',
  },
];

const COMPARISON_ROWS = [
  { without: 'Bookings through DMs', with: 'Clients book themselves, 24/7' },
  { without: 'Manually chasing deposits', with: 'Deposits collected at booking' },
  { without: 'Sending prices in every DM', with: 'Services and pricing on your page' },
  { without: 'Scattered tools', with: 'One page for your whole business' },
];

const FAQ_ITEMS = [
  {
    q: 'How does the 14-day free trial work?',
    a: 'When you sign up, you get 14 days of full access to Nelsy Pro at no cost. Your card is saved during signup (so you can go live immediately), but you are not charged until the trial ends.',
  },
  {
    q: 'Do I need a credit card to start?',
    a: 'Yes. A card is saved when you start your trial so your booking page is live from day one. You will not be charged until after your 14-day trial ends.',
  },
  {
    q: 'Does Nelsy charge booking commission?',
    a: 'No. Nelsy does not take a percentage of bookings made through your page. You keep what you earn. Standard payment processing fees apply to online payments.',
  },
  {
    q: 'Are there payment processing fees?',
    a: 'Nelsy charges 0% commission. Standard payment processing fees (e.g. Stripe) apply when clients pay online. These are charged by the payment processor, not Nelsy.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. You can cancel your subscription at any time from your dashboard. Your page stays active until the end of your billing period.',
  },
  {
    q: 'What happens when my trial ends?',
    a: 'At the end of your 14-day trial, your subscription starts and your saved card is charged. If you cancel before the trial ends, you will not be charged.',
  },
  {
    q: 'Is Nelsy only for nail techs?',
    a: 'No. Nelsy is built for all beauty professionals, including nail techs, lash techs, brow artists, hair stylists, makeup artists, estheticians, and more.',
  },
  {
    q: 'Can I change my services and booking page?',
    a: 'Yes. You can update your services, pricing, photos, and booking page settings at any time from your dashboard.',
  },
];

interface FeatureRowProps {
  label: string;
  route: string | null;
  soon?: boolean;
}

function FeatureRow({ label, route, soon }: FeatureRowProps) {
  const inner = (
    <span className={route ? 'underline underline-offset-2 decoration-[#F4C2C2]' : ''}>
      {label}
    </span>
  );
  return (
    <li className="flex items-center gap-2 text-[15px] text-gray-700">
      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="8" fill={`${PINK}18`} />
        <path d="M5 8.5l2 2 4-4" stroke={PINK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {route ? <Link to={route} className="hover:text-[#F52B8C] transition-colors">{inner}</Link> : inner}
      {soon && (
        <span
          className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wide"
          style={{ background: `${PINK}12`, color: PINK }}
        >
          Soon
        </span>
      )}
    </li>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#F4C2C2]/40 last:border-0">
      <button
        className="w-full flex items-center justify-between gap-4 py-4 text-left text-[15px] font-semibold text-[#1A1A1A] hover:text-[#F52B8C] transition-colors"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <svg
          className="w-5 h-5 flex-shrink-0 transition-transform"
          style={{ transform: open ? 'rotate(45deg)' : 'none' }}
          viewBox="0 0 20 20" fill="none"
        >
          <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <p className="pb-4 text-[15px] text-gray-500 leading-relaxed">
          {a}
        </p>
      )}
    </div>
  );
}

export default function Pricing() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  const displayPrice = billing === 'monthly' ? MONTHLY_PRICE : YEARLY_PRICE_PER_MONTH;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Pricing — Nelsy',
      description: 'One plan. Everything you need to take bookings, collect deposits, and grow your beauty business. Start free for 14 days.',
      url: 'https://getnelsy.com/pricing',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  return (
    <>
      <SEOMeta
        title="Pricing — Nelsy | Simple beauty business platform"
        description="One plan. Everything you need to take bookings, collect deposits, and grow your beauty business. Start free for 14 days."
        canonical="/pricing"
        jsonLd={jsonLd}
      />
      <SiteNav />

      <div className="bg-[#FFFBFB] min-h-screen pt-14">

        {/* 1. Hero */}
        <header className="bg-white border-b border-[#F4C2C2]/30">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-snug mb-5">
              Simple pricing for beauty professionals.
            </h1>
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-8">
              One plan. Everything you need to run and grow your beauty business.
            </p>
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-[15px] transition hover:opacity-90"
              style={{ background: PINK }}
            >
              Start your 14-day free trial
            </Link>
            <p className="mt-3 text-[13px] text-gray-400">
              $0 today · Cancel anytime · 0% Nelsy booking commission
            </p>
          </div>
        </header>

        {/* 2. Pricing card */}
        <section className="max-w-lg mx-auto px-4 sm:px-6 py-14">
          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition ${billing === 'monthly' ? 'text-white' : 'text-gray-500 hover:text-[#1A1A1A]'}`}
              style={billing === 'monthly' ? { background: PINK } : {}}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition ${billing === 'yearly' ? 'text-white' : 'text-gray-500 hover:text-[#1A1A1A]'}`}
              style={billing === 'yearly' ? { background: PINK } : {}}
            >
              Yearly
              <span
                className="ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                style={{ background: billing === 'yearly' ? 'rgba(255,255,255,0.25)' : `${PINK}15`, color: billing === 'yearly' ? 'white' : PINK }}
              >
                Save ${YEARLY_SAVINGS}
              </span>
            </button>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl border border-[#F4C2C2]/50 shadow-sm p-8">
            <div className="flex items-start justify-between mb-1">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">Nelsy Pro</h2>
                <p className="text-[13px] text-gray-400 mt-0.5">Everything included</p>
              </div>
              <span
                className="text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide"
                style={{ background: `${PINK}12`, color: PINK }}
              >
                14-day free trial
              </span>
            </div>

            <div className="mt-6 mb-1">
              <span className="font-serif text-5xl font-bold text-[#1A1A1A]">${displayPrice}</span>
              <span className="text-gray-400 text-[15px] ml-1">/month</span>
            </div>
            <p className="text-[12px] text-gray-400 mb-1">
              {billing === 'yearly' ? `Billed as $${YEARLY_TOTAL}/year` : 'Billed monthly'}
            </p>
            <p className="text-[12px] text-gray-400 mb-6">after 14-day free trial</p>

            <Link
              to="/onboarding"
              className="block w-full text-center px-6 py-3 rounded-xl text-white font-bold text-[15px] transition hover:opacity-90 mb-8"
              style={{ background: PINK }}
            >
              Start free trial
            </Link>

            {/* Feature groups */}
            <div className="space-y-7">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Book &amp; Get Paid</p>
                <ul className="space-y-2.5">
                  {PLAN_FEATURES.book.map(f => (
                    <FeatureRow key={f.label} label={f.label} route={f.route} soon={f.soon} />
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Grow</p>
                <ul className="space-y-2.5">
                  {PLAN_FEATURES.grow.map(f => (
                    <FeatureRow key={f.label} label={f.label} route={f.route} />
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Run Your Business</p>
                <ul className="space-y-2.5">
                  {PLAN_FEATURES.run.map(f => (
                    <FeatureRow key={f.label} label={f.label} route={f.route} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Value props */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-2 text-center">
            Why beauty professionals use Nelsy
          </h2>
          <p className="text-gray-400 text-center text-sm mb-10">Built for the way you actually work.</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {VALUE_PROPS.map(vp => (
              <div key={vp.heading} className="bg-white rounded-xl border border-[#F4C2C2]/40 p-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4"
                  style={{ background: `${PINK}10` }}
                >
                  {vp.icon}
                </div>
                <h3 className="font-semibold text-[#1A1A1A] mb-1">{vp.heading}</h3>
                <p className="text-[14px] text-gray-500">{vp.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Commission callout */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-4 mb-10">
          <div
            className="rounded-2xl p-8 text-center"
            style={{ background: `${PINK}08`, border: `1.5px solid ${PINK}30` }}
          >
            <p className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-3">
              0% Nelsy booking commission
            </p>
            <p className="text-gray-500 text-[15px] max-w-xl mx-auto">
              Nelsy does not take a percentage of the{' '}
              <Link to="/features/bookings" className="underline decoration-[#F4C2C2] hover:text-[#F52B8C]">bookings</Link>{' '}
              your clients make through your page. Standard payment processing fees apply to{' '}
              <Link to="/features/payments" className="underline decoration-[#F4C2C2] hover:text-[#F52B8C]">online payments</Link>.
            </p>
          </div>
        </section>

        {/* 5. Comparison */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 mb-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-10 text-center">
            Without Nelsy vs. With Nelsy
          </h2>
          <div className="bg-white rounded-2xl border border-[#F4C2C2]/40 overflow-hidden">
            <div className="grid grid-cols-2 border-b border-[#F4C2C2]/40">
              <div className="px-6 py-4 bg-gray-50 border-r border-[#F4C2C2]/40">
                <span className="text-[12px] font-bold uppercase tracking-widest text-gray-400">Without Nelsy</span>
              </div>
              <div className="px-6 py-4" style={{ background: `${PINK}06` }}>
                <span className="text-[12px] font-bold uppercase tracking-widest" style={{ color: PINK }}>With Nelsy</span>
              </div>
            </div>
            {COMPARISON_ROWS.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-2 border-b border-[#F4C2C2]/30 last:border-0"
              >
                <div className="px-6 py-4 border-r border-[#F4C2C2]/30 bg-gray-50/50">
                  <p className="text-[14px] text-gray-500 flex items-center gap-2">
                    <span className="text-gray-300">✗</span>
                    {row.without}
                  </p>
                </div>
                <div className="px-6 py-4">
                  <p className="text-[14px] text-[#1A1A1A] flex items-center gap-2">
                    <span style={{ color: PINK }}>✓</span>
                    {row.with}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. FAQ */}
        <section className="max-w-2xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-2 text-center">
            Frequently asked questions
          </h2>
          <p className="text-gray-400 text-sm text-center mb-10">Everything you need to know.</p>
          <div className="bg-white rounded-2xl border border-[#F4C2C2]/40 px-6 divide-y-0">
            {FAQ_ITEMS.map(item => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </section>

        {/* 7. Final CTA */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">
            Your next client could already be following you.
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            Turn your bio into your{' '}
            <Link to="/features/link-in-bio" className="underline decoration-[#F4C2C2] hover:text-[#F52B8C]">
              link in bio
            </Link>{' '}
            booking page.
          </p>
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-[15px] transition hover:opacity-90"
            style={{ background: PINK }}
          >
            Start your 14-day free trial →
          </Link>
          <p className="mt-3 text-[13px] text-gray-400">
            $0 today · Cancel anytime · 0% Nelsy booking commission
          </p>
          <p className="mt-4 text-[13px] text-gray-400">
            Used by{' '}
            <Link to="/use-cases/nail-techs" className="underline decoration-[#F4C2C2] hover:text-[#F52B8C]">nail techs</Link>,{' '}
            <Link to="/use-cases/lash-techs" className="underline decoration-[#F4C2C2] hover:text-[#F52B8C]">lash techs</Link>,
            and beauty professionals of all kinds.
          </p>
        </section>

      </div>

      <SiteFooter />
    </>
  );
}
