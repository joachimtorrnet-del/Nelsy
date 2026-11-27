import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOMeta from '@/components/SEOMeta';
import SiteNav from '@/components/layout/SiteNav';
import SiteFooter from '@/components/layout/SiteFooter';
import PlanPicker from '@/components/landing/PlanPicker';
import { TRIAL_DAYS, planKey } from '@/lib/plans';
import { track, trackSeoCTAClicked } from '@/lib/analytics';

const PINK = '#F52B8C';

// Live feature pages, linked from the pricing page for internal linking.
const PLAN_FEATURES = {
  book: [
    { label: 'Online bookings', route: '/features/bookings' },
    { label: 'Deposits', route: '/features/deposits' },
    { label: 'Online payments', route: '/features/payments' },
    { label: 'Booking policies & cancellation', route: null },
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
    a: 'When you sign up for Independent, you get 14 days of full access at no cost. Your card is saved during signup (so you can go live immediately), but you are not charged until the trial ends.',
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
}

function FeatureRow({ label, route }: FeatureRowProps) {
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
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Nelsy pricing',
      description:
        'Three Nelsy plans for beauty pros. Independent (bookings, deposits and online payments) is available today, free for 14 days. Creator and Salon are open for waitlist.',
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
        title="Pricing: $29/month, 0% Booking Commission"
        description="Nelsy pricing: Independent is $29/month ($25 billed yearly), free for 14 days, 0% Nelsy commission. Creator and Salon plans are open for waitlist."
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
              Three plans that grow with your beauty business. Independent is available today, Creator and Salon are open for waitlist.
            </p>
            <Link
              to={`/onboarding?plan=${planKey('independent', 'monthly')}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-[15px] transition hover:opacity-90"
              style={{ background: PINK }}
            >
              Start your {TRIAL_DAYS}-day free trial
            </Link>
            <p className="mt-3 text-[13px] text-gray-400">
              $0 today · Cancel anytime · 0% Nelsy booking commission
            </p>
          </div>
        </header>

        {/* 2. Plans (same picker as the landing page) */}
        <section className="bg-white border-b border-[#F4C2C2]/30 py-[72px] lg:py-28">
          <div className="max-w-[1180px] mx-auto px-6 sm:px-8 lg:px-12">
          <PlanPicker
            title="Pick the plan that fits your business"
            defaultInterval="monthly"
            onStartTrial={(key) => {
              track('pricing_cta_clicked', { plan: key, action: 'start_trial' });
              trackSeoCTAClicked('/pricing', 'inline', 'Start my free trial');
            }}
            onWaitlist={(tier, interval) => {
              track('pricing_cta_clicked', { plan: planKey(tier, interval), action: 'waitlist' });
            }}
          />
          </div>
        </section>

        {/* 3. Feature pages (internal links) */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-2 text-center">
            Explore the features
          </h2>
          <p className="text-gray-400 text-center text-sm mb-10">See how each part of Nelsy works.</p>
          <div className="bg-white rounded-2xl border border-[#F4C2C2]/50 shadow-sm p-8">
            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Book &amp; Get Paid</p>
                <ul className="space-y-2.5">
                  {PLAN_FEATURES.book.map(f => (
                    <FeatureRow key={f.label} label={f.label} route={f.route} />
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
