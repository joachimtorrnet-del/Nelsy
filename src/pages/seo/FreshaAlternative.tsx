import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOMeta from '@/components/SEOMeta';
import Breadcrumb from '@/components/Breadcrumb';
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
    '@type': 'WebPage',
    name: 'Fresha Alternative for Nail Techs',
    description: 'Comparing Fresha and Nelsy for independent nail techs. See how each platform approaches branding, booking flow, deposits, Instagram integration and client ownership.',
    url: 'https://getnelsy.com/fresha-alternative-nail-techs',
    isPartOf: { '@type': 'WebSite', url: 'https://getnelsy.com' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://getnelsy.com/' },
      { '@type': 'ListItem', position: 2, name: 'Fresha Alternative for Nail Techs', item: 'https://getnelsy.com/fresha-alternative-nail-techs' },
    ],
  },
];

type CellValue = boolean | string | null;

const COMPARISON_ROWS: { feature: string; fresha: CellValue; nelsy: CellValue }[] = [
  { feature: 'Target user',            fresha: 'Salons & studios of all sizes', nelsy: 'Independent nail techs' },
  { feature: 'Booking experience',     fresha: 'Within the Fresha marketplace', nelsy: 'Your own branded booking page' },
  { feature: 'Instagram integration',  fresha: 'Link to Fresha profile page',   nelsy: 'Own booking page, link anywhere' },
  { feature: 'Client discovery',       fresha: '✓ Marketplace exposure',        nelsy: 'You own your client relationships' },
  { feature: 'Branded booking page',   fresha: 'Fresha-branded experience',     nelsy: 'Fully branded to your business' },
  { feature: 'Deposit collection',     fresha: true,                            nelsy: true },
  { feature: 'Online payments',        fresha: true,                            nelsy: true },
  { feature: 'Nelsy booking commission', fresha: '—',                           nelsy: '0%' },
];

function ComparisonCell({ value }: { value: CellValue }) {
  if (value === true)  return <span style={{ color: PINK }} className="text-lg font-bold">✓</span>;
  if (value === false) return <span className="text-gray-300 text-lg">✕</span>;
  return <span className="text-sm text-gray-700">{value}</span>;
}

export default function FreshaAlternative() {
  useEffect(() => {
    document.dispatchEvent(new Event('render-complete'));
  }, []);

  return (
    <div className="font-sans min-h-screen bg-white antialiased">
      <SEOMeta
        title="Fresha Alternative for Nail Techs — Why Nail Techs Switch to Nelsy"
        description="Comparing Fresha vs Nelsy for independent nail techs. See how each platform handles branding, Instagram booking, deposits and client ownership before you decide."
        canonical="/fresha-alternative-nail-techs"
        jsonLd={JSON_LD}
      />
      <SiteNav />
      <div style={{ paddingTop: 56 }}>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Fresha Alternative for Nail Techs' }]} />

        {/* ── Disclosure ── */}
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
          <p className="max-w-6xl mx-auto text-xs text-gray-500 text-center">
            <strong>Transparency note:</strong> This page is published by Nelsy. We've done our best to represent both platforms fairly based on publicly available information. Product details change — verify current features and pricing directly with each provider.
          </p>
        </div>

        {/* ── Hero ── */}
        <section style={{ background: 'linear-gradient(135deg, #FFF7FA 0%, #FFFFFF 60%)' }} className="px-4 pt-10 pb-14 sm:pt-14 sm:pb-18">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: PINK, marginBottom: 12, textTransform: 'uppercase' }}
            >
              FRESHA vs NELSY
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }}
              style={{ fontSize: 'clamp(1.9rem, 5.5vw, 3rem)', fontWeight: 900, color: '#0D0D0D', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 16 }}
            >
              Looking for a Fresha Alternative?<br />
              <span style={{ color: PINK }}>Here's Why Nail Techs Switch to Nelsy.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }}
              className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed"
            >
              Fresha is a strong platform for salons and studios. But independent nail techs who build their audience on Instagram often find they need something different — a booking tool that works around their social presence, not a marketplace that owns the client relationship.
            </motion.p>
          </div>
        </section>

        {/* ── Comparison table ── */}
        <section className="py-14 sm:py-20 bg-white px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-10">
              <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 900, color: '#0D0D0D', letterSpacing: '-0.03em' }}>
                Fresha vs Nelsy — How They Compare
              </h2>
              <p className="text-gray-400 text-sm mt-2">Based on publicly available product information. Verify details directly with each provider.</p>
            </motion.div>

            <motion.div {...fadeUp(0.1)} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="grid grid-cols-3 text-center text-xs sm:text-sm font-bold border-b border-gray-100">
                <div className="py-4 px-3 text-left text-gray-400 pl-5">Feature</div>
                <div className="py-4 px-2 text-gray-500">Fresha</div>
                <div className="py-4 px-2 text-white rounded-tr-2xl" style={{ backgroundColor: PINK }}>Nelsy</div>
              </div>
              {COMPARISON_ROWS.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-3 text-center items-center border-b border-gray-50 last:border-0 text-xs sm:text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}
                >
                  <div className="py-4 px-5 text-left font-medium text-gray-700">{row.feature}</div>
                  <div className="py-4 px-2"><ComparisonCell value={row.fresha} /></div>
                  <div className="py-4 px-2" style={{ backgroundColor: 'rgba(245,43,140,0.04)' }}>
                    <ComparisonCell value={row.nelsy} />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Key differences ── */}
        <section className="py-14 sm:py-20 px-4" style={{ background: '#F9FAFB' }}>
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-12">
              <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 900, color: '#0D0D0D', letterSpacing: '-0.03em' }}>
                The Fundamental Difference
              </h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-6">
              <motion.div {...fadeUp()} className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 text-base mb-3">Fresha is a marketplace</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Fresha works by listing your business on the Fresha platform. Clients can discover you through Fresha's directory and book through Fresha's interface. This is powerful for client discovery — especially if you're a new business without an existing following.
                </p>
                <p className="text-sm text-gray-500 leading-relaxed mt-3">
                  The tradeoff: the booking experience lives within Fresha's ecosystem. Your clients are booking on Fresha, not exclusively on your own branded page.
                </p>
              </motion.div>
              <motion.div {...fadeUp(0.08)} className="bg-white rounded-2xl p-6 border-2" style={{ borderColor: PINK }}>
                <h3 className="font-bold text-gray-900 text-base mb-3" style={{ color: PINK }}>Nelsy is your own branded booking tool</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Nelsy gives you a booking page that belongs to your business — not to a marketplace. When clients book through your Nelsy link, they're booking with you directly. Your brand, your URL, your client relationships.
                </p>
                <p className="text-sm text-gray-500 leading-relaxed mt-3">
                  This is especially valuable for nail techs who already have an Instagram audience. Your followers know you — they don't need a marketplace to find you. They need a frictionless way to book and pay.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── When each is better ── */}
        <section className="py-14 sm:py-20 bg-white px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-12">
              <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 900, color: '#0D0D0D', letterSpacing: '-0.03em' }}>
                When Each Platform Is the Better Choice
              </h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-6">
              <motion.div {...fadeUp()} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h3 className="font-bold text-gray-700 text-base mb-4">Fresha may be a better fit if…</h3>
                <ul className="space-y-3">
                  {[
                    'You\'re a new nail tech without an existing social audience and want marketplace discovery',
                    'You run a salon or studio with multiple team members',
                    'You want clients to be able to find you through a booking directory',
                    'Your clients aren\'t coming primarily from Instagram or TikTok',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-0.5 text-gray-400 flex-shrink-0">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div {...fadeUp(0.08)} className="rounded-2xl p-6 border-2" style={{ backgroundColor: '#FFF7FA', borderColor: PINK }}>
                <h3 className="font-bold text-base mb-4" style={{ color: PINK }}>Nelsy is a better fit if…</h3>
                <ul className="space-y-3">
                  {[
                    'You\'re an independent nail tech with an Instagram or TikTok following',
                    'You want clients to book directly through your own branded page',
                    'You want to require deposits and reduce no-shows automatically',
                    'You want a booking experience that feels like you, not a third-party platform',
                    'You want a flat-rate subscription with no booking commissions',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="flex-shrink-0 w-4 h-4 rounded-full text-white text-xs font-bold flex items-center justify-center mt-0.5" style={{ backgroundColor: PINK }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="py-16 sm:py-24 text-white px-4 text-center"
          style={{ background: `linear-gradient(to bottom right, ${PINK}, #9333EA)` }}
        >
          <div className="max-w-2xl mx-auto">
            <motion.h2 {...fadeUp()} className="text-3xl sm:text-4xl font-bold mb-4">
              Try Nelsy free for 14 days.
            </motion.h2>
            <motion.p {...fadeUp(0.06)} className="text-base sm:text-xl text-white/80 mb-8 max-w-lg mx-auto">
              Set up your branded booking page, add it to your Instagram bio and start collecting deposits — without leaving your clients to a marketplace.
            </motion.p>
            <motion.div {...fadeUp(0.12)}>
              <SeoCTA label="Start your 14-day free trial →" position="footer_cta" variant="primary-dark" />
            </motion.div>
            <motion.p {...fadeUp(0.18)} className="mt-5 text-xs text-white/60">
              $0 today · Cancel anytime · 0% Nelsy booking commission
            </motion.p>
          </div>
        </section>

        {/* ── Internal links ── */}
        <section className="py-10 px-4 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">ALSO COMPARE</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 underline underline-offset-2">
                Nelsy — Nail Tech Booking App
              </Link>
              <span className="text-gray-300">·</span>
              <Link to="/booksy-alternative-nail-techs" className="text-sm font-medium text-gray-600 hover:text-gray-900 underline underline-offset-2">
                Booksy Alternative for Nail Techs
              </Link>
              <span className="text-gray-300">·</span>
              <Link to="/nail-tech-deposits" className="text-sm font-medium text-gray-600 hover:text-gray-900 underline underline-offset-2">
                How to Collect Deposits
              </Link>
              <span className="text-gray-300">·</span>
              <Link to="/instagram-booking-for-nail-techs" className="text-sm font-medium text-gray-600 hover:text-gray-900 underline underline-offset-2">
                Instagram Booking for Nail Techs
              </Link>
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </div>
  );
}
