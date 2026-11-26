import { useState } from 'react';
import { Link } from 'react-router-dom';
import ToolPage, { NumberField, Prose, PINK } from '@/components/tools/ToolPage';

const fmt = (n: number, cur: '$' | '€') =>
  `${cur}${(Number.isFinite(n) ? n : 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const link = 'underline text-[#F52B8C]';

/** Verified on the official pricing pages on 2026-11-23. */
const CHECKED = 'November 23, 2026';
const SOURCES = [
  { name: 'Fresha pricing', href: 'https://www.fresha.com/pricing' },
  { name: 'Booksy US pricing', href: 'https://biz.booksy.com/en-us/pricing' },
  { name: 'GlossGenius pricing', href: 'https://glossgenius.com/pricing' },
];

type Row = {
  name: string;
  plan: string;
  cur: '$' | '€';
  subscription: number;
  online: number;
  inPerson: number;
  marketplace: number | null; // null = not published
  rates: string;
  marketplaceNote: string;
};

export default function BookingAppFeeCalculator() {
  const [appointments, setAppointments] = useState(80);
  const [price, setPrice] = useState(60);
  const [onlineShare, setOnlineShare] = useState(50);
  const [marketShare, setMarketShare] = useState(10);
  const [stripePct, setStripePct] = useState(2.9);
  const [stripeFixed, setStripeFixed] = useState(0.3);
  const [yearly, setYearly] = useState(false);

  const online = appointments * (Math.min(onlineShare, 100) / 100);
  const inPerson = appointments - online;
  const marketplaceVisits = appointments * (Math.min(marketShare, 100) / 100);
  const fee = (count: number, pct: number, fixed: number) => count * (price * (pct / 100) + fixed);

  const rows: Row[] = [
    {
      name: 'Fresha', plan: 'Subscription', cur: '€', subscription: 14.95,
      online: fee(online, 1.29, 0.15), inPerson: fee(inPerson, 0.59, 0.15), marketplace: null,
      rates: '€14.95/month · online 1.29% + €0.15 · in person 0.59% + €0.15',
      marketplaceNote: 'Not published: Fresha charges a fee on new marketplace clients, but the rate is not shown on its pricing page, so it is left out of the total.',
    },
    {
      name: 'Booksy US', plan: 'Subscription', cur: '$', subscription: 29.99,
      online: fee(online, 2.69, 0.3), inPerson: fee(inPerson, 2.49, 0.1), marketplace: marketplaceVisits * Math.min(price * 0.3, 100),
      rates: '$29.99/month · mobile payments 2.69% + $0.30 · card reader 2.49% + $0.10',
      marketplaceNote: 'Boost: 30% of a new marketplace client’s first visit, capped at $100.',
    },
    {
      name: 'GlossGenius', plan: 'Standard, billed annually', cur: '$', subscription: 24,
      online: fee(online, 3.4, 0.15), inPerson: fee(inPerson, 2.4, 0.15), marketplace: 0,
      rates: '$24/month billed annually · online 3.4% + $0.15 · in person 2.4% + $0.15',
      marketplaceNote: 'No marketplace fee mentioned on the pricing page.',
    },
    {
      name: 'Nelsy', plan: yearly ? 'Billed yearly' : 'Billed monthly', cur: '$', subscription: yearly ? 25 : 29,
      online: fee(online, stripePct, stripeFixed), inPerson: fee(inPerson, stripePct, stripeFixed), marketplace: 0,
      rates: `${yearly ? '$25/month billed yearly' : '$29/month'} · 0% Nelsy commission · your Stripe rate ${stripePct}% + $${stripeFixed.toFixed(2)}`,
      marketplaceNote: 'No marketplace fee: clients book from your own page.',
    },
  ];

  const calculator = (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-sm">
          <h2 className="text-base font-bold text-gray-900">Your month</h2>
          <div className="grid grid-cols-2 gap-4">
            <NumberField label="Appointments per month" value={appointments} onChange={setAppointments} />
            <NumberField label="Average price" value={price} onChange={setPrice} step={0.01} hint="Per appointment" />
            <NumberField label="Paid online" value={onlineShare} onChange={setOnlineShare} max={100} suffix="%" hint="The rest is paid in person by card" />
            <NumberField label="New marketplace clients" value={marketShare} onChange={setMarketShare} max={100} suffix="%" hint="First visits found via the app" />
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-sm">
          <h2 className="text-base font-bold text-gray-900">Nelsy settings</h2>
          <div className="grid grid-cols-2 gap-4">
            <NumberField label="Stripe rate" value={stripePct} onChange={setStripePct} step={0.01} suffix="%" hint="Example, check your Stripe pricing" />
            <NumberField label="Stripe fixed fee" value={stripeFixed} onChange={setStripeFixed} step={0.01} prefix="$" hint="Example, check your Stripe pricing" />
          </div>
          <div>
            <p className="block text-sm font-semibold text-gray-700 mb-2">Nelsy billing</p>
            <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Nelsy billing">
              {([[false, 'Monthly ($29)'], [true, 'Yearly ($25/mo)']] as const).map(([key, label]) => (
                <button
                  key={label}
                  type="button"
                  role="radio"
                  aria-checked={yearly === key}
                  onClick={() => setYearly(key)}
                  className={`rounded-xl border-2 px-3 py-2.5 text-sm font-semibold transition-colors ${yearly === key ? 'text-white' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                  style={yearly === key ? { background: PINK, borderColor: PINK } : undefined}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            For Nelsy, your Stripe rate is applied to every appointment, online and in person, to keep the estimate conservative. Payments you take in cash would cost less.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {rows.map((r) => {
          const total = r.subscription + r.online + r.inPerson + (r.marketplace ?? 0);
          return (
            <div key={r.name} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-baseline justify-between gap-3 mb-1">
                <h3 className="text-base font-bold text-gray-900">{r.name}</h3>
                <span className="text-xs text-gray-400">{r.plan}</span>
              </div>
              <p className="text-xs text-gray-400 mb-3 leading-relaxed">{r.rates}</p>
              <dl className="text-sm divide-y divide-gray-100">
                <div className="flex justify-between py-1.5"><dt className="text-gray-500">Subscription</dt><dd className="font-medium text-gray-700">{fmt(r.subscription, r.cur)}</dd></div>
                <div className="flex justify-between py-1.5"><dt className="text-gray-500">Online payment fees</dt><dd className="font-medium text-gray-700">{fmt(r.online, r.cur)}</dd></div>
                <div className="flex justify-between py-1.5"><dt className="text-gray-500">In-person payment fees</dt><dd className="font-medium text-gray-700">{fmt(r.inPerson, r.cur)}</dd></div>
                <div className="flex justify-between py-1.5"><dt className="text-gray-500">Marketplace fees</dt><dd className="font-medium text-gray-700">{r.marketplace === null ? 'Not published' : fmt(r.marketplace, r.cur)}</dd></div>
                <div className="flex justify-between pt-2.5">
                  <dt className="font-bold text-gray-900">Estimated monthly cost</dt>
                  <dd className="font-bold text-lg" style={{ color: PINK }}>{fmt(total, r.cur)}{r.marketplace === null ? '*' : ''}</dd>
                </div>
              </dl>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">{r.marketplace === null ? `* ${r.marketplaceNote}` : r.marketplaceNote}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-900 space-y-2">
        <p><strong>Currencies differ.</strong> Fresha&apos;s published prices are in euros (€), Booksy US, GlossGenius and Nelsy are in US dollars ($). The calculator does not convert between them: the average price you enter is used as-is for each app, and each total is shown in that app&apos;s own currency.</p>
        <p>
          <strong>Sources.</strong> Figures taken from the official pricing pages, checked on {CHECKED}:{' '}
          {SOURCES.map((s, i) => (
            <span key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline">{s.name}</a>{i < SOURCES.length - 1 ? ', ' : '.'}
            </span>
          ))}{' '}
          Prices change: check each page before you decide. Taxes, add-ons and optional features are not included.
        </p>
      </div>
    </div>
  );

  return (
    <ToolPage
      slug="booking-app-fee-calculator"
      name="Booking App Fee Calculator"
      seoTitle="Booking App Fee Calculator: Fresha, Booksy & More"
      seoDescription="Free booking app fee calculator for beauty pros: compare the monthly cost of Fresha, Booksy, GlossGenius and Nelsy from your appointments and prices."
      h1="Booking App Fee Calculator"
      intro="Compare what Fresha, Booksy, GlossGenius and Nelsy would cost you each month: subscription, online and in-person payment fees, and marketplace fees on new clients, using the rates on their official pricing pages."
      calculator={calculator}
      toc={[
        { id: 'formula', label: 'How the cost is calculated' },
        { id: 'examples', label: 'Two worked examples' },
        { id: 'marketplace', label: 'Marketplace fees on new clients' },
        { id: 'limits', label: 'What the calculator leaves out' },
        { id: 'choose', label: 'How to choose' },
      ]}
      faq={[
        { q: 'How much does a booking app cost per month for a beauty pro?', a: 'It is the subscription plus the payment processing fees on every card payment, plus any marketplace fee on new clients found through the app. Payment fees grow with your appointments, so the total depends on your volume and prices, which is what this calculator works out.' },
        { q: 'Does Fresha charge a fee on new clients?', a: 'Fresha charges a fee on new clients who book through its marketplace, but the rate is not published on its pricing page, so this calculator shows it as not published and leaves it out of the Fresha total.' },
        { q: 'What is Booksy Boost?', a: 'Boost is Booksy’s marketplace promotion. According to Booksy’s US pricing page, it costs 30% of a new marketplace client’s first visit, capped at $100. The calculator applies it to the share of appointments you mark as first visits from new marketplace clients.' },
        { q: 'What does Nelsy charge?', a: 'Nelsy costs $29 a month, or $25 a month billed yearly, with 0% Nelsy commission on bookings and sales. Payments go through Stripe at Stripe’s standard processing rates, which you can enter in the calculator.' },
      ]}
      cta={{ title: 'One flat price, 0% commission', text: 'Nelsy is $29 a month, or $25 a month billed yearly, with bookings, deposits and your link-in-bio store on one page. Try it free for 14 days.' }}
      related={[
        { label: 'Fresha vs Booksy for nail techs', href: '/blog/fresha-vs-booksy-for-nail-techs' },
        { label: 'GlossGenius vs Booksy', href: '/blog/glossgenius-vs-booksy-nail-techs' },
        { label: 'GlossGenius vs Fresha', href: '/blog/glossgenius-vs-fresha-for-nail-techs' },
        { label: 'Best booking app for nail techs', href: '/best-booking-app-for-nail-techs' },
        { label: 'Nelsy pricing', href: '/pricing' },
      ]}
    >
      <Prose id="formula" title="How the cost is calculated">
        <p><strong>Online fees = online appointments × (average price × online rate + fixed fee).</strong> <strong>In-person fees = in-person appointments × (average price × in-person rate + fixed fee).</strong></p>
        <p><strong>Marketplace fees</strong> apply to first visits from new marketplace clients, where a rate is published. <strong>Monthly cost = subscription + online fees + in-person fees + marketplace fees.</strong> For Nelsy, the Stripe rate you enter is applied to every appointment.</p>
      </Prose>

      <Prose id="examples" title="Two worked examples">
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-2">
          <p className="font-bold text-gray-900">Example 1: 80 appointments at 60, half paid online, 10% new marketplace clients</p>
          <p>That is 40 online payments, 40 in-person payments and 8 marketplace first visits.</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Fresha:</strong> €14.95 subscription + online 40 × (€60 × 1.29% + €0.15) = €36.96 + in person 40 × (€60 × 0.59% + €0.15) = €20.16. Total <strong>€72.07</strong>, plus marketplace fees (rate not published).</li>
            <li><strong>Booksy US:</strong> $29.99 subscription + online 40 × ($60 × 2.69% + $0.30) = $76.56 + in person 40 × ($60 × 2.49% + $0.10) = $63.76 + Boost 8 × ($60 × 30%) = $144.00. Total <strong>$314.31</strong>.</li>
            <li><strong>GlossGenius Standard:</strong> $24 subscription + online 40 × ($60 × 3.4% + $0.15) = $87.60 + in person 40 × ($60 × 2.4% + $0.15) = $63.60. Total <strong>$175.20</strong>.</li>
            <li><strong>Nelsy (monthly):</strong> $29 subscription + Stripe 80 × ($60 × 2.9% + $0.30) = $163.20. Total <strong>$192.20</strong>, or $188.20 billed yearly.</li>
          </ul>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-2">
          <p className="font-bold text-gray-900">Example 2: 40 appointments at 90, all paid online, no marketplace clients</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Fresha:</strong> €14.95 subscription + online 40 × (€90 × 1.29% + €0.15) = €52.44. Total <strong>€67.39</strong>.</li>
            <li><strong>Booksy US:</strong> $29.99 subscription + online 40 × ($90 × 2.69% + $0.30) = $108.84. Total <strong>$138.83</strong>.</li>
            <li><strong>GlossGenius Standard:</strong> $24 subscription + online 40 × ($90 × 3.4% + $0.15) = $128.40. Total <strong>$152.40</strong>.</li>
            <li><strong>Nelsy (monthly):</strong> $29 subscription + Stripe 40 × ($90 × 2.9% + $0.30) = $116.40. Total <strong>$145.40</strong>, or $141.40 billed yearly.</li>
          </ul>
        </div>
        <p>Both examples use the example Stripe rate of 2.9% + $0.30. Fresha totals are in euros and are not converted. The cheapest option depends on your own mix of online, in-person and marketplace bookings, so run your own numbers above.</p>
      </Prose>

      <Prose id="marketplace" title="Marketplace fees on new clients">
        <p>Some booking apps list you in a consumer marketplace and charge a fee when a new client finds you there. On Booksy US, Boost costs 30% of that client&apos;s first visit, capped at $100. Fresha also charges a fee on new marketplace clients, but its rate is not published on the pricing page, so it is not included above.</p>
        <p>If most of your clients come from Instagram, referrals or your own link in bio, marketplace fees matter less. If you rely on the app to find new clients, they can become a large part of your bill.</p>
      </Prose>

      <Prose id="limits" title="What the calculator leaves out">
        <ul className="list-disc list-inside space-y-2">
          <li>Taxes, card reader hardware, add-ons, SMS packs and extra team members.</li>
          <li>Different rates for some card types, international cards or refunds.</li>
          <li>Currency conversion: Fresha is shown in euros, the others in US dollars.</li>
          <li>Promotions and price changes after {CHECKED}.</li>
        </ul>
      </Prose>

      <Prose id="choose" title="How to choose">
        <p>Price is one factor. Also compare who owns the client relationship, how deposits and no-show protection work, and whether you can sell products, courses or gift cards from the same page. The comparisons of <Link to="/blog/fresha-vs-booksy-for-nail-techs" className={link}>Fresha vs Booksy</Link> and <Link to="/blog/glossgenius-vs-booksy-nail-techs" className={link}>GlossGenius vs Booksy</Link> go into the details, and the guide on <Link to="/blog/how-to-choose-booking-app-nail-business" className={link}>how to choose a booking app</Link> gives a checklist.</p>
      </Prose>
    </ToolPage>
  );
}
