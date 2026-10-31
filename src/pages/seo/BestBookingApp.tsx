import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOMeta from '@/components/SEOMeta';
import Breadcrumb from '@/components/Breadcrumb';
import TableOfContents from '@/components/TableOfContents';
import SeoCTA from '@/components/SeoCTA';
import SiteNav from '@/components/layout/SiteNav';
import SiteFooter from '@/components/layout/SiteFooter';

const PINK = '#F52B8C';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay },
} as const);

const JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best Booking Apps for Nail Techs in 2026: Compared',
    description: 'A detailed comparison of the best booking apps for nail techs in 2026. Compare Nelsy, Fresha, Booksy and GlossGenius on deposits, branding, Instagram workflow and pricing model.',
    url: 'https://getnelsy.com/best-booking-app-for-nail-techs',
    datePublished: '2026-10-20',
    author: { '@type': 'Organization', name: 'Nelsy', url: 'https://getnelsy.com' },
    publisher: { '@type': 'Organization', name: 'Nelsy', url: 'https://getnelsy.com' },
    isPartOf: { '@type': 'WebSite', url: 'https://getnelsy.com' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://getnelsy.com/' },
      { '@type': 'ListItem', position: 2, name: 'Best Booking App for Nail Techs', item: 'https://getnelsy.com/best-booking-app-for-nail-techs' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the best booking app for nail techs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The best booking app depends on your situation. Nelsy is designed specifically for independent nail techs who build their client base on social media. Fresha and Booksy offer marketplace discovery. GlossGenius focuses on independent beauty professionals with strong branding tools.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do nail tech booking apps charge commission?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Commission structures vary by platform. Nelsy charges 0% booking commission with a flat monthly subscription. Other platforms may charge per-booking fees, take a percentage, or offer tiered plans with different commission structures. Always verify current pricing directly with each provider.',
        },
      },
    ],
  },
];

const TOC_ITEMS = [
  { id: 'what-to-look-for', label: 'What nail techs should look for in a booking app' },
  { id: 'comparison-table', label: 'Quick comparison table' },
  { id: 'nelsy', label: 'Nelsy' },
  { id: 'fresha', label: 'Fresha' },
  { id: 'booksy', label: 'Booksy' },
  { id: 'glossgenius', label: 'GlossGenius' },
  { id: 'best-fit', label: 'Best fit by nail tech type' },
  { id: 'faq', label: 'FAQ' },
];

type CellValue = boolean | string;

const COMPARISON_ROWS: {
  feature: string;
  nelsy: CellValue;
  fresha: CellValue;
  booksy: CellValue;
  glossgenius: CellValue;
  note?: string;
}[] = [
  {
    feature: 'Built for independent nail techs',
    nelsy: true, fresha: false, booksy: false, glossgenius: 'Partial',
    note: 'GlossGenius serves independent beauty pros broadly — not nail-tech-specific',
  },
  {
    feature: 'Own branded booking page',
    nelsy: true, fresha: false, booksy: 'Partial', glossgenius: true,
    note: 'Fresha bookings happen within the Fresha platform. Booksy offers a shareable profile link.',
  },
  {
    feature: 'Marketplace / client discovery',
    nelsy: false, fresha: true, booksy: true, glossgenius: 'Partial',
    note: 'Nelsy does not operate a marketplace — your clients come through your own links.',
  },
  {
    feature: 'Instagram / social media workflow',
    nelsy: true, fresha: 'Partial', booksy: 'Partial', glossgenius: true,
    note: 'Nelsy and GlossGenius are designed to work from a bio link. Fresha and Booksy have their own profile URLs.',
  },
  {
    feature: 'Deposit collection',
    nelsy: true, fresha: true, booksy: true, glossgenius: true,
    note: 'All four platforms support deposit collection. Verify current feature details on each provider\'s site.',
  },
  {
    feature: 'Online payments',
    nelsy: true, fresha: true, booksy: true, glossgenius: true,
  },
  {
    feature: 'Nelsy booking commission',
    nelsy: '0%', fresha: 'Verify', booksy: 'Verify', glossgenius: 'Verify',
    note: 'Nelsy charges 0% booking commission with a flat subscription. Verify current pricing directly with Fresha, Booksy and GlossGenius — pricing models change.',
  },
];

function CompCell({ value }: { value: CellValue }) {
  if (value === true) return <span style={{ color: PINK }} className="font-bold text-base">✓</span>;
  if (value === false) return <span className="text-gray-300 text-base">✕</span>;
  return <span className="text-xs text-gray-600 font-medium leading-tight">{value}</span>;
}

function PlatformSection({ id, name, forWho, strengths, considerations, children }: {
  id: string; name: string; forWho: string;
  strengths: string[]; considerations: string[];
  children?: React.ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-20">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{name}</h2>
      <p className="text-sm font-semibold text-gray-500 mb-4">Best for: {forWho}</p>
      {children}
      <div className="grid sm:grid-cols-2 gap-4 mt-5">
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Strengths</p>
          <ul className="space-y-2">
            {strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="flex-shrink-0 w-4 h-4 rounded-full text-white text-xs font-bold flex items-center justify-center mt-0.5" style={{ backgroundColor: PINK }}>✓</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Considerations</p>
          <ul className="space-y-2">
            {considerations.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="flex-shrink-0 text-gray-400 mt-0.5">→</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function BestBookingApp() {
  useEffect(() => {
    document.dispatchEvent(new Event('render-complete'));
  }, []);

  return (
    <div className="font-sans min-h-screen bg-white antialiased">
      <SEOMeta
        title="Best Booking Apps for Nail Techs in 2026: Compared | Nelsy"
        description="A fair comparison of the best booking apps for nail techs — Nelsy, Fresha, Booksy and GlossGenius. Covers deposits, branding, Instagram workflow, pricing and best fit."
        canonical="/best-booking-app-for-nail-techs"
        jsonLd={JSON_LD}
      />
      <SiteNav />
      <div style={{ paddingTop: 56 }}>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Best Booking App for Nail Techs' }]} />

        {/* ── Disclosure ── */}
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
          <p className="max-w-6xl mx-auto text-xs text-amber-800 text-center">
            <strong>Transparency:</strong> This comparison is published by Nelsy. We've done our best to represent each platform fairly based on publicly available information as of October 2026. Features and pricing change — always verify with each provider before making a decision.
          </p>
        </div>

        {/* ── Hero ── */}
        <section style={{ background: 'linear-gradient(135deg, #FFF7FA 0%, #FFFFFF 60%)' }} className="px-4 pt-10 pb-12">
          <div className="max-w-3xl mx-auto">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: PINK, marginBottom: 12, textTransform: 'uppercase' }}>
              2026 COMPARISON
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
              style={{ fontSize: 'clamp(1.9rem, 5.5vw, 3rem)', fontWeight: 900, color: '#0D0D0D', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: 16 }}>
              Best Booking Apps for Nail Techs in 2026
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
              className="text-base sm:text-lg text-gray-500 leading-relaxed">
              Choosing the right booking software changes how your business runs. This guide covers what to look for, how the main platforms compare, and which is the best fit depending on how you work and where you find your clients.
            </motion.p>
          </div>
        </section>

        {/* ── Main content ── */}
        <section className="py-10 px-4">
          <div className="max-w-3xl mx-auto space-y-14">

            <TableOfContents items={TOC_ITEMS} />

            {/* What to look for */}
            <div id="what-to-look-for" className="scroll-mt-20">
              <motion.div {...fadeUp()}>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  What nail techs should look for in a booking app
                </h2>
                <p className="text-gray-600 leading-relaxed mb-5">
                  Most booking software is built for general service businesses — salons, spas, fitness studios. Independent nail techs have a different workflow, and the right tool should fit it. Here are the factors that matter most:
                </p>
                <div className="space-y-4">
                  {[
                    { title: 'Where your clients come from', detail: 'If you build your audience on Instagram or TikTok, you need a booking page you can link from your bio — not a marketplace profile that keeps clients within another platform\'s ecosystem.' },
                    { title: 'Deposit collection', detail: 'No-shows are one of the most common problems for independent nail techs. A booking app that lets you require a deposit before confirming an appointment effectively eliminates most no-shows.' },
                    { title: 'Branded experience', detail: 'Your booking page should feel like your business — your name, your photos, your services. Not a generic form with another company\'s logo on it.' },
                    { title: 'Service and pricing clarity', detail: 'Clients should be able to see exactly what you offer, how long each service takes and what it costs, before they pick a time. Reduces DMs and sets expectations.' },
                    { title: 'Pricing model', detail: 'Booking apps charge in different ways — flat subscriptions, per-booking fees, marketplace commission. Understand what you\'re paying before you\'re fully set up.' },
                    { title: 'Ease of setup', detail: 'You shouldn\'t need a developer. Setting up your services, availability and booking page should take an afternoon at most.' },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4 items-start">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2.5" style={{ backgroundColor: PINK }} />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                        <p className="text-sm text-gray-500 leading-relaxed mt-0.5">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Comparison table */}
            <div id="comparison-table" className="scroll-mt-20">
              <motion.div {...fadeUp()}>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Quick comparison table</h2>
                <p className="text-gray-500 text-sm mb-5">
                  Based on publicly available product information. Pricing and features change — verify with each provider.
                </p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <div className="min-w-[560px] sm:min-w-0 px-4 sm:px-0">
                    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                      {/* Header */}
                      <div className="grid grid-cols-5 bg-gray-50 border-b border-gray-200">
                        <div className="col-span-2 px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Feature</div>
                        {['Nelsy', 'Fresha', 'Booksy', 'GlossGenius'].map((n, i) => (
                          <div key={n} className="px-2 py-3 text-center text-xs font-bold uppercase tracking-wide"
                            style={i === 0 ? { backgroundColor: '#FFF0F8', color: PINK } : { color: '#6B7280' }}>
                            {n}
                          </div>
                        ))}
                      </div>
                      {COMPARISON_ROWS.map((row, i) => (
                        <div key={row.feature}>
                          <div className={`grid grid-cols-5 items-center border-b border-gray-50 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                            <div className="col-span-2 px-4 py-3.5 text-xs sm:text-sm text-gray-700 font-medium leading-snug">{row.feature}</div>
                            {[row.nelsy, row.fresha, row.booksy, row.glossgenius].map((val, j) => (
                              <div key={j} className="px-2 py-3.5 text-center flex items-center justify-center"
                                style={j === 0 ? { backgroundColor: 'rgba(245,43,140,0.03)' } : {}}>
                                <CompCell value={val} />
                              </div>
                            ))}
                          </div>
                          {row.note && (
                            <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                              <p className="text-xs text-gray-400 italic">{row.note}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Platform sections */}
            <motion.div {...fadeUp()}>
              <PlatformSection
                id="nelsy"
                name="Nelsy"
                forWho="Independent nail techs with a social media audience"
                strengths={[
                  'Built specifically for independent nail techs — not adapted from a generic salon tool',
                  'Own branded booking page you link from Instagram bio, TikTok, anywhere',
                  'Deposit collection built into the booking flow — confirmed bookings only',
                  'Flat-rate monthly subscription with 0% booking commission',
                  'Clients book and pay on your page, not within a third-party marketplace',
                ]}
                considerations={[
                  'No marketplace for new client discovery — you drive your own traffic',
                  'Focused on independent nail techs; not designed for multi-staff studios',
                ]}
              >
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Nelsy is designed around a specific workflow: you build an audience on Instagram, you add your booking link to your bio, clients click through and book with a deposit. There's no marketplace discovery — your growth depends on your own audience. That's a tradeoff worth understanding before you sign up.
                </p>
              </PlatformSection>
            </motion.div>

            <motion.div {...fadeUp()}>
              <PlatformSection
                id="fresha"
                name="Fresha"
                forWho="Salons, studios and businesses that want marketplace discovery"
                strengths={[
                  'Marketplace exposure — clients can discover your business through Fresha\'s directory',
                  'Free tier available for basic booking features',
                  'Widely used — clients may already be familiar with the platform',
                  'Broad feature set for salons with multiple staff and service categories',
                ]}
                considerations={[
                  'Booking experience is within the Fresha ecosystem, not your own branded page',
                  'Less suited for nail techs whose clients come primarily from Instagram',
                  'Paid tiers unlock advanced features — verify current pricing on Fresha\'s site',
                ]}
              >
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Fresha operates as a marketplace: clients can search for and discover nail services in their area, and book through Fresha's platform. This is valuable if you're a newer nail tech who needs the discoverability — but if your clients already find you on Instagram, you may not need a marketplace at all. The tradeoff is that bookings happen inside Fresha's ecosystem rather than on your own branded page.
                </p>
              </PlatformSection>
            </motion.div>

            <motion.div {...fadeUp()}>
              <PlatformSection
                id="booksy"
                name="Booksy"
                forWho="Beauty professionals who want both a marketplace and a shareable booking link"
                strengths={[
                  'Has both a marketplace directory and shareable booking profile links',
                  'Serves a wide range of beauty professionals — large user base',
                  'Clients can be discovered through Booksy\'s directory',
                  'Calendar management and client messaging features',
                ]}
                considerations={[
                  'Not specifically built for nail techs — serves hair, nails, spa and wellness broadly',
                  'Subscription pricing varies by tier — verify current plans on Booksy\'s site',
                  'Booking experience is partly within Booksy\'s platform',
                ]}
              >
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Booksy bridges the marketplace and direct-booking worlds. It has a client-facing directory where new clients can find you, and it also provides shareable profile links. For nail techs who want both exposure and a direct booking option, it's a reasonable middle ground. That said, it's a generalist platform — it doesn't have the specific nail-tech workflow focus that tools like Nelsy or GlossGenius provide.
                </p>
              </PlatformSection>
            </motion.div>

            <motion.div {...fadeUp()}>
              <PlatformSection
                id="glossgenius"
                name="GlossGenius"
                forWho="Independent beauty professionals focused on branding and client experience"
                strengths={[
                  'Strong branding and customization features — your page looks polished',
                  'Built for independent beauty professionals (hair, nails, esthetics)',
                  'Includes a client discovery platform (GlossGenius Discovery)',
                  'Integrated marketing tools including rebooking reminders and client messaging',
                ]}
                considerations={[
                  'Higher price point than some alternatives — verify current pricing on GlossGenius\'s site',
                  'Not nail-tech-specific — serves a broad range of beauty professionals',
                  'Features are strong but the platform may include more than an independent nail tech needs',
                ]}
              >
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  GlossGenius has a strong reputation for helping independent beauty professionals present their work professionally. Its branding tools and client management features are well-regarded. It's a credible option for nail techs who want a polished, all-in-one platform — though the pricing is generally at the higher end of the market.
                </p>
              </PlatformSection>
            </motion.div>

            {/* Best fit */}
            <div id="best-fit" className="scroll-mt-20">
              <motion.div {...fadeUp()}>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">Best fit by nail tech type</h2>
                <div className="space-y-4">
                  {[
                    {
                      type: 'Instagram or TikTok nail tech with an existing following',
                      recommendation: 'Nelsy',
                      reason: 'You already have clients finding you through social. You need a booking page to link from your bio, deposit collection to stop no-shows, and a branded experience that matches your aesthetic. Nelsy is built exactly for this workflow.',
                    },
                    {
                      type: 'New nail tech without a built-in audience',
                      recommendation: 'Fresha or Booksy',
                      reason: 'Marketplace discovery helps when you can\'t yet drive your own traffic. Fresha\'s free tier is a low-risk starting point. As your Instagram grows, you may find you outgrow the need for a marketplace.',
                    },
                    {
                      type: 'Independent nail tech focused on premium client experience',
                      recommendation: 'GlossGenius or Nelsy',
                      reason: 'Both are built for independent professionals who care about how their brand looks. GlossGenius is stronger on marketing automation; Nelsy is stronger on the Instagram-to-booking-to-deposit pipeline.',
                    },
                    {
                      type: 'Nail tech in a salon or shared studio with multiple staff',
                      recommendation: 'Fresha or Booksy',
                      reason: 'Multi-staff scheduling and the marketplace exposure these tools offer are more valuable for studio environments than tools designed for solo independent nail techs.',
                    },
                  ].map((item) => (
                    <div key={item.type} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                      <p className="text-sm font-bold text-gray-900 mb-1">{item.type}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        <span className="font-semibold" style={{ color: PINK }}>Best fit: {item.recommendation}</span> — {item.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* FAQ */}
            <div id="faq" className="scroll-mt-20">
              <motion.div {...fadeUp()}>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">FAQ</h2>
                <div className="space-y-4">
                  {[
                    {
                      q: 'Can I switch booking apps later?',
                      a: 'Yes, though the transition involves moving your client list, re-uploading services and updating your booking links wherever you\'ve shared them. It\'s easier to choose the right tool at the start, but switching is manageable. Export your client data before you close your account anywhere.',
                    },
                    {
                      q: 'Do I need a booking app with a marketplace?',
                      a: 'Only if marketplace discovery matters for your growth. If you already have a social media audience, a direct booking tool is more valuable — and avoids having clients associate your brand with another platform.',
                    },
                    {
                      q: 'How much do nail tech booking apps cost?',
                      a: 'Pricing models vary widely: flat monthly subscriptions, per-booking fees, free tiers with paid upgrades, or marketplace commissions. Verify current pricing directly on each provider\'s website — this comparison reflects publicly available information as of October 2026 and may not reflect current offers.',
                    },
                    {
                      q: 'Does the booking app show on my clients\' side?',
                      a: 'It depends on the platform. With a marketplace tool like Fresha or Booksy, clients are booking on that platform\'s website or app. With a direct-booking tool like Nelsy or GlossGenius, clients see your branded page and may not see the underlying tool at all.',
                    },
                  ].map((item) => (
                    <div key={item.q} className="bg-white rounded-xl p-5 border border-gray-200">
                      <p className="font-bold text-gray-900 mb-2 text-sm">{item.q}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-14 sm:py-20 text-white px-4 text-center"
          style={{ background: `linear-gradient(to bottom right, ${PINK}, #9333EA)` }}>
          <div className="max-w-2xl mx-auto">
            <motion.h2 {...fadeUp()} className="text-3xl sm:text-4xl font-bold mb-4">
              Try Nelsy free for 14 days.
            </motion.h2>
            <motion.p {...fadeUp(0.06)} className="text-base sm:text-lg text-white/80 mb-8 max-w-lg mx-auto">
              If you build your client base on Instagram, Nelsy is built for you — booking, deposits and payments from your own branded page.
            </motion.p>
            <motion.div {...fadeUp(0.12)}>
              <SeoCTA label="Start your 14-day free trial →" position="footer_cta" variant="primary-dark" />
            </motion.div>
            <motion.p {...fadeUp(0.18)} className="mt-5 text-xs text-white/60">
              $0 today · Cancel anytime · 0% Nelsy booking commission
            </motion.p>
          </div>
        </section>

        {/* ── Related ── */}
        <section className="py-10 px-4 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">DEEP DIVES</p>
            <div className="flex flex-wrap gap-3">
              {[
                { to: '/fresha-alternative-nail-techs', label: 'Fresha vs Nelsy — Full Comparison' },
                { to: '/booksy-alternative-nail-techs', label: 'Booksy vs Nelsy — Full Comparison' },
                { to: '/nail-tech-deposits', label: 'How to Collect Deposits' },
                { to: '/instagram-booking-for-nail-techs', label: 'Instagram Booking for Nail Techs' },
              ].map((link) => (
                <Link key={link.to} to={link.to}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 underline underline-offset-2">
                  {link.label}
                </Link>
              )).reduce((acc: React.ReactNode[], el, i) => i === 0 ? [el] : [...acc, <span key={`dot-${i}`} className="text-gray-300">·</span>, el], [])}
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </div>
  );
}
