import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// ─── Motion helpers ────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay },
} as const);

// ─── SVG helpers ──────────────────────────────────────────────────────────────


// ─── 1. NAV ───────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md" style={{ backgroundColor: '#F52B8C' }} />
          <span className="text-base font-bold text-gray-900">Nelsy</span>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/login">
            <button className="px-4 py-2 rounded-lg text-sm font-bold border-2 border-gray-200 text-gray-700 hover:border-gray-300 transition active:scale-95">
              Log in
            </button>
          </Link>
          <Link to="/onboarding" className="hidden sm:block">
            <button className="px-4 py-2 text-white rounded-lg text-sm font-bold transition active:scale-95 shadow-sm hover:opacity-90" style={{ backgroundColor: '#F52B8C' }}>
              Start free →
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ─── 2. HERO ──────────────────────────────────────────────────────────────────

const PINK = '#F52B8C';

function Hero() {
  return (
    <section style={{ backgroundColor: '#FFF7FA', paddingTop: 56, overflow: 'hidden' }}>
      {/*
        Mobile  : flex-col — copy on top, mockup below (unchanged)
        Desktop : flex-row — copy left ~46%, mockup right ~54%, fills viewport height
      */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:min-h-[86vh]">

        {/* ── LEFT: Copy ────────────────────────────────────────────────────── */}
        {/*
          Padding strategy — all via className so lg: breakpoint can override:
          Mobile : pt-[52px] px-6 (52px top, 24px sides — identical to before)
          Desktop: pt-0 pl-16 pr-10 xl:pl-24 (flex centering handles vertical)
        */}
        <motion.div
          className="lg:w-[46%] lg:flex-shrink-0 pt-8 px-6 lg:pt-0 lg:pl-16 lg:pr-10 xl:pl-24 lg:-mt-16"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <p style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
            color: PINK, marginBottom: 12, textTransform: 'uppercase',
            lineHeight: 1,
          }}>
            BUILT FOR NAIL TECHS
          </p>

          <h1 style={{
            fontSize: 'clamp(2.1rem, 8.5vw, 3.5rem)',
            fontWeight: 900, color: '#0D0D0D',
            lineHeight: 1.05, letterSpacing: '-0.035em',
            marginBottom: 14, maxWidth: 480,
          }}>
            Your All-in-One<br />
            Link in Bio<br />
            <span style={{ color: PINK }}>for Nail Techs.</span>
          </h1>

          <p style={{
            fontSize: 16, color: '#6B7280', lineHeight: 1.6,
            marginBottom: 24, maxWidth: 340,
          }}>
            Show your work. Get booked. Get paid.<br />
            Turn your followers into paying clients — all from one link.
          </p>

          <Link to="/onboarding">
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="text-[15px] px-9 py-[13px] lg:text-[17px] lg:px-11 lg:py-4"
              style={{
                backgroundColor: PINK, color: '#FFFFFF',
                borderRadius: 99, fontWeight: 700, border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 28px rgba(245,43,140,0.28)',
                letterSpacing: '-0.01em',
              }}
            >
              Create my booking page →
            </motion.button>
          </Link>
        </motion.div>

        {/* ── RIGHT: Mockup ─────────────────────────────────────────────────── */}
        {/*
          mt-10 (40px) on mobile preserves the current gap below the copy block.
          lg:mt-0 removes it on desktop (flex row, no vertical gap needed).
          Image: w-full on mobile, capped to 700-800px on desktop, object-contain always.
        */}
        <motion.div
          className="mt-6 px-3 lg:mt-0 lg:px-0 lg:flex-1 lg:flex lg:items-center lg:justify-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          <img
            src="/hero-mockup.png"
            alt="Nelsy booking page preview"
            className="block h-auto object-contain w-full mx-auto
                       md:w-[70vw] md:max-w-[900px]
                       lg:w-full lg:max-w-[640px] xl:max-w-[740px]"
            draggable={false}
          />
        </motion.div>

      </div>
    </section>
  );
}

// ─── 3. HOW IT WORKS ─────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      title: 'Share your link',
      desc: 'Add your Nelsy link to Instagram, TikTok, or anywhere your clients find you.',
      src: '/nelsy-step-1-instagram.png',
      alt: 'Instagram profile with Nelsy link in bio',
    },
    {
      title: 'They choose a service',
      desc: 'Clients browse your services, prices and work.',
      src: '/nelsy-step-2-services.png',
      alt: 'Nelsy service browsing page',
    },
    {
      title: 'They pick a time',
      desc: 'They choose a date and time that works for them.',
      src: '/nelsy-step-3-calendar.png',
      alt: 'Nelsy date and time picker',
    },
    {
      title: 'They book and pay',
      desc: 'They confirm and pay online. You get a new booking. ✨',
      src: '/nelsy-step-4-payment.png',
      alt: 'Booking confirmation and payment screen',
    },
  ];

  return (
    <section style={{
      background: 'radial-gradient(ellipse 120% 65% at 50% 10%, #FFE4F0 0%, #FFF3F8 45%, #FFFFFF 80%)',
      paddingTop: 80,
      paddingBottom: 88,
    }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div className="text-center mb-10 lg:mb-12" {...fadeUp()}>
          <p style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
            color: PINK, marginBottom: 14, textTransform: 'uppercase',
          }}>
            FROM LINK IN BIO TO PAID APPOINTMENTS
          </p>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 5.5vw, 3.75rem)',
            fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.03em',
            marginBottom: 16,
          }}>
            <span style={{ color: '#0D0D0D' }}>Turn followers into</span><br />
            <span style={{ color: PINK }}>paying clients.</span>
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 1.5vw, 17px)',
            color: '#6B7280', lineHeight: 1.65,
            maxWidth: 500, margin: '0 auto',
          }}>
            From your link in bio to a booked and paid appointment —{' '}
            without the back-and-forth in DMs.
          </p>
        </motion.div>

        {/* Steps — desktop: 4-column row, mobile: stacked */}
        <div className="flex flex-col items-center lg:flex-row lg:items-start lg:gap-5">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center relative lg:flex-1 w-full max-w-[300px] lg:max-w-none">

              {/* Desktop: arrow centered on the image */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:flex absolute items-center justify-center"
                  style={{ right: -18, top: 195, zIndex: 10, width: 36 }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke={PINK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}

              <motion.div className="flex flex-col items-center text-center w-full" {...fadeUp(i * 0.1)}>

                {/* Mockup — exact asset, no modifications */}
                <img
                  src={step.src}
                  alt={step.alt}
                  className="h-[310px] lg:h-[390px] w-auto mx-auto mb-5"
                  draggable={false}
                />

                {/* Number + title on same row */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: 9, marginBottom: 7,
                }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                    backgroundColor: PINK, color: '#FFFFFF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 800,
                    boxShadow: '0 3px 10px rgba(245,43,140,0.30)',
                  }}>
                    {i + 1}
                  </div>
                  <h3 style={{
                    fontSize: 15, fontWeight: 800, color: '#0D0D0D',
                    letterSpacing: '-0.02em', lineHeight: 1.2, margin: 0,
                  }}>
                    {step.title}
                  </h3>
                </div>

                <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, maxWidth: 190 }}>
                  {step.desc}
                </p>
              </motion.div>

              {/* Mobile: vertical connector after description */}
              {i < steps.length - 1 && (
                <div className="lg:hidden flex flex-col items-center mt-6 mb-2">
                  <div style={{ width: 1.5, height: 28, backgroundColor: `${PINK}25` }} />
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M6 13l6 6 6-6" stroke={PINK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div className="text-center mt-12 lg:mt-14" {...fadeUp(0.35)}>
          <Link to="/onboarding">
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="text-[15px] px-9 py-[13px] lg:text-[17px] lg:px-11 lg:py-4"
              style={{
                backgroundColor: PINK, color: '#FFFFFF',
                borderRadius: 99, fontWeight: 700, border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 28px rgba(245,43,140,0.28)',
                letterSpacing: '-0.01em',
              }}
            >
              Create my booking page →
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 4. PRODUCT BENEFITS ──────────────────────────────────────────────────────

function ProductBenefits() {
  const items = [
    { icon: '💅', title: 'Services',     desc: 'Show your services and prices clearly.' },
    { icon: '📅', title: 'Availability', desc: 'Let clients choose a time that works for them.' },
    { icon: '💰', title: 'Deposits',     desc: 'Collect deposits before the appointment.' },
    { icon: '💳', title: 'Payments',     desc: 'Let clients book and pay online.' },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white px-4">
      <div className="max-w-md mx-auto sm:max-w-6xl">
        <motion.div {...fadeUp()} className="text-center mb-10">
          <p style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
            color: PINK, marginBottom: 14, textTransform: 'uppercase',
          }}>
            [ EVERYTHING IN ONE LINK ]
          </p>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)',
            fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em',
            color: '#0D0D0D',
          }}>
            Everything your clients need. One link.
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.09 } }, hidden: {} }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {items.map((item) => (
            <motion.div
              key={item.title}
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
              className="bg-white rounded-2xl p-5 border-2 border-gray-100 text-center hover:shadow-lg transition-all"
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#F52B8C'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#F3F4F6'; }}
            >
              <div className="text-3xl sm:text-4xl mb-3">{item.icon}</div>
              <div className="text-sm sm:text-base font-bold text-gray-900 mb-1">{item.title}</div>
              <div className="text-xs sm:text-sm text-gray-500 leading-relaxed">{item.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── 4. TRANSFORMATION CARDS ──────────────────────────────────────────────────

function Transformation() {
  const cards = [
    {
      leftEmoji: '📱', leftLabel: 'DMs',
      rightEmoji: '📅', rightLabel: 'Bookings',
      title: 'From DMs to Bookings.',
      sub: 'Clients choose a service and time themselves.',
    },
    {
      leftEmoji: '👻', leftLabel: 'No-Shows',
      rightEmoji: '💰', rightLabel: 'Deposits',
      title: 'From No-Shows to Deposits.',
      sub: 'Collect deposits before appointments and protect your time.',
    },
    {
      leftEmoji: '📸', leftLabel: 'Followers',
      rightEmoji: '💅', rightLabel: 'Clients',
      title: 'From Followers to Clients.',
      sub: 'Turn your Instagram audience into booked appointments.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white px-4">
      <div className="max-w-md mx-auto sm:max-w-6xl">
        <motion.div {...fadeUp()} className="text-center mb-12">
          <p className="text-xs font-bold tracking-widest text-gray-400 mb-4 uppercase">[ HOW IT WORKS ]</p>
          <h2 className="text-heading-mobile sm:text-heading-desktop text-gray-900 mb-4">
            Three things that change everything.
          </h2>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
          className="grid gap-6 sm:grid-cols-3"
        >
          {cards.map((c) => (
            <motion.div
              key={c.title}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}
              className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:shadow-xl transition-all active:scale-95 cursor-default"
              style={{ ['--hover-border' as string]: '#F52B8C' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#F52B8C'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E4E4E7'; }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">{c.leftEmoji}</div>
                  <div className="text-sm text-gray-400 line-through">{c.leftLabel}</div>
                </div>
                <div className="text-2xl font-bold" style={{ color: '#F52B8C' }}>→</div>
                <div className="text-center">
                  <div className="text-4xl mb-2">{c.rightEmoji}</div>
                  <div className="text-sm font-bold" style={{ color: '#F52B8C' }}>{c.rightLabel}</div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{c.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{c.sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── 5. BRAND SECTION ────────────────────────────────────────────────────────

function BrandSection() {
  const previews = [
    { src: '/nelsy-step-2-services.png', alt: 'Services page preview' },
    { src: '/nelsy-step-3-calendar.png', alt: 'Availability picker preview' },
    { src: '/nelsy-step-4-payment.png',  alt: 'Booking and payment preview' },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50 px-4">
      <div className="max-w-md mx-auto sm:max-w-6xl">
        <motion.div {...fadeUp()} className="text-center mb-12">
          <p className="text-xs font-bold tracking-widest text-gray-400 mb-4 uppercase">[ BUILT FOR YOUR BRAND ]</p>
          <h2 className="text-heading-mobile sm:text-heading-desktop text-gray-900 mb-4">
            Your booking page should look like you.
          </h2>
          <p className="text-lg sm:text-xl text-gray-500 max-w-lg mx-auto">
            Customize your page, services and booking experience to match your brand.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
          className="grid gap-4 sm:grid-cols-3 justify-items-center"
        >
          {previews.map((p) => (
            <motion.div
              key={p.src}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all w-full max-w-[260px]"
            >
              <img
                src={p.src}
                alt={p.alt}
                className="w-full h-auto object-contain"
                draggable={false}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── 6. FINAL CTA ─────────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="py-16 sm:py-24 text-white px-4" style={{ background: 'linear-gradient(to bottom right, #F52B8C, #9333EA)' }}>
      <div className="max-w-2xl mx-auto text-center">
        <motion.p {...fadeUp()} className="text-xs font-bold tracking-widest text-white/50 mb-6 uppercase">
          [ GET STARTED ]
        </motion.p>
        <motion.h2 {...fadeUp(0.04)} className="text-hero-mobile sm:text-hero-desktop font-bold mb-6">
          Your next client could already be following you.
        </motion.h2>

        <motion.p {...fadeUp(0.08)} className="text-lg sm:text-2xl mb-10 text-white/90">
          Turn your bio into your booking page.
        </motion.p>

        <motion.div {...fadeUp(0.16)}>
          <Link to="/onboarding">
            <button
              className="w-full sm:w-auto px-10 py-5 bg-white rounded-2xl font-bold hover:bg-gray-50 active:scale-95 transition-all shadow-2xl text-lg sm:text-xl mb-8"
              style={{ color: '#F52B8C' }}
            >
              Start your 14-day free trial →
            </button>
          </Link>
        </motion.div>

        <motion.p {...fadeUp(0.24)} className="mt-6 text-xs sm:text-sm text-white/70">
          $0 today · Cancel anytime · 0% Nelsy booking commission
        </motion.p>
      </div>
    </section>
  );
}

// ─── 6. ZERO COMMISSION ───────────────────────────────────────────────────────

function ZeroCommission() {
  return (
    <section className="py-20 sm:py-32 bg-white px-4 overflow-hidden">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div {...fadeUp()}>
          <motion.p {...fadeUp()} className="text-xs font-bold tracking-widest text-gray-400 mb-6 uppercase">
            [ 0% NELSY BOOKING COMMISSION ]
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-[7rem] sm:text-[11rem] font-black leading-none mb-2 select-none"
            style={{ color: '#F52B8C', filter: 'drop-shadow(0 0 60px rgba(245,43,140,0.15))' }}
          >
            0%
          </motion.div>
          <motion.h2 {...fadeUp(0.1)} className="text-3xl sm:text-5xl font-bold text-gray-900 mb-6">
            Nelsy doesn't take a cut of your bookings.
          </motion.h2>
          <motion.p {...fadeUp(0.18)} className="text-lg sm:text-xl text-gray-500 max-w-lg mx-auto leading-relaxed">
            You keep what you charge. Standard payment processing fees may apply when clients pay online.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 6b. COMPARISON TABLE ─────────────────────────────────────────────────────

function ComparisonTable() {
  const rows: { feature: string; dms: boolean | string; nelsy: boolean | string }[] = [
    { feature: '24/7 booking',           dms: false, nelsy: true  },
    { feature: 'Online deposits',        dms: false, nelsy: true  },
    { feature: 'Custom branded page',    dms: false, nelsy: true  },
    { feature: 'Services + availability',dms: false, nelsy: true  },
    { feature: 'Nelsy booking commission', dms: '—', nelsy: '0%'  },
  ];

  const Cell = ({ value }: { value: boolean | string }) => {
    if (value === true)  return <span className="text-xl" style={{ color: '#F52B8C' }}>✓</span>;
    if (value === false) return <span className="text-xl text-gray-300">✕</span>;
    return <span className="text-sm font-bold text-gray-700">{value}</span>;
  };

  return (
    <section className="py-16 sm:py-24 bg-gray-50 px-4">
      <div className="max-w-md mx-auto sm:max-w-3xl">
        <motion.div {...fadeUp()} className="text-center mb-12">
          <p className="text-xs font-bold tracking-widest text-gray-400 mb-4 uppercase">[ BUILT DIFFERENTLY ]</p>
          <h2 className="text-heading-mobile sm:text-heading-desktop text-gray-900 mb-4">
            Your brand. Your clients. Your business.
          </h2>
          <p className="text-lg sm:text-xl text-gray-500">
            A booking experience designed for independent nail techs.
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.1)} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="grid grid-cols-3 text-center text-xs sm:text-sm font-bold border-b border-gray-100">
            <div className="py-4 px-2 text-left text-gray-400 pl-4 sm:pl-6">Feature</div>
            <div className="py-4 px-2 text-gray-400">DMs</div>
            <div className="py-4 px-2 text-white rounded-tr-2xl" style={{ backgroundColor: '#F52B8C' }}>Nelsy</div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 text-center items-center border-b border-gray-50 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
            >
              <div className="py-4 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">{row.feature}</div>
              <div className="py-4 px-2"><Cell value={row.dms} /></div>
              <div className="py-4 px-2" style={{ backgroundColor: 'rgba(245,43,140,0.04)' }}>
                <Cell value={row.nelsy} />
              </div>
            </div>
          ))}

          {/* Footer CTA row */}
          <div className="grid grid-cols-3 text-center items-center bg-white border-t border-gray-100 rounded-b-2xl">
            <div className="py-4 px-4 sm:px-6" />
            <div className="py-4 px-2" />
            <div className="py-4 px-2">
              <Link to="/onboarding">
                <button
                  className="px-3 py-2 text-white text-xs sm:text-sm font-bold rounded-xl hover:opacity-90 active:scale-95 transition whitespace-nowrap"
                  style={{ backgroundColor: '#F52B8C' }}
                >
                  Start free →
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 7. FOOTER ────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md" style={{ backgroundColor: '#F52B8C' }} />
          <span className="font-bold text-white">Nelsy</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-gray-500">
          <Link to="/privacy" className="hover:text-white transition">Privacy</Link>
          <Link to="/terms" className="hover:text-white transition">Terms</Link>
          <a href="mailto:support@getnelsy.com" className="hover:text-white transition">Contact</a>
          <Link to="/studio/maya" className="hover:text-white transition">Demo</Link>
        </div>
        <p className="text-xs text-gray-600">© {new Date().getFullYear()} Nelsy</p>
      </div>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function LandingPremium() {
  return (
    <div className="font-sans min-h-screen bg-white antialiased">
      <Nav />
      <Hero />
      <HowItWorks />
      <ProductBenefits />
      <ZeroCommission />
      <ComparisonTable />
      <Transformation />
      <BrandSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}
