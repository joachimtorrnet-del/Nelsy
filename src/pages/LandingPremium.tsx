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

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

// ─── 1. NAV ───────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md" style={{ backgroundColor: '#F52B8C' }} />
          <span className="text-base font-bold text-gray-900">Nelsy</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900 font-medium hidden sm:block">
            Log in
          </Link>
          <Link to="/onboarding">
            <button className="px-4 py-2 text-white rounded-lg text-sm font-bold transition active:scale-95 shadow-sm hover:opacity-90" style={{ backgroundColor: '#F52B8C' }}>
              Continue →
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ─── 2. HERO ──────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative bg-white pt-24 sm:pt-32 pb-16 sm:pb-20 px-4">
      <div className="max-w-md mx-auto sm:max-w-6xl">

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="text-[2.5rem] sm:text-[4rem] lg:text-[5rem] text-center text-gray-900 mb-8 leading-[1.1] font-extrabold tracking-tight px-4"
        >
          Nelsy turns nail techs into{' '}
          <span
            className="block mt-3 sm:mt-4 relative"
            style={{ color: '#F52B8C', filter: 'drop-shadow(0 0 30px rgba(245,43,140,0.15))' }}
          >
            Beauty CEOs.
            <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 400 12" fill="none" aria-hidden="true">
              <path d="M2 10C100 5 300 5 398 10" stroke="#F52B8C" strokeWidth="4" strokeLinecap="round" opacity="0.3" />
            </svg>
          </span>
        </motion.h1>

        {/* Sub-H1 */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-xl sm:text-2xl text-center text-gray-600 mb-8 max-w-2xl mx-auto px-4"
        >
          Stop chasing DMs. Start building an empire.
        </motion.p>

        {/* Social proof badge — après subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-10"
        >
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white"
                style={{
                  backgroundImage: `url(https://i.pravatar.cc/100?img=${i})`,
                  backgroundSize: 'cover',
                }}
              />
            ))}
          </div>
          <p className="text-sm sm:text-base font-semibold text-gray-700">
            Join <span style={{ color: '#F52B8C' }}>500+ nail techs</span>
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.27 }}
          className="flex justify-center mb-6"
        >
          <Link to="/onboarding">
            <button className="group px-16 py-5 bg-[#F52B8C] text-white rounded-full font-bold text-2xl hover:bg-[#E0167A] transition-all shadow-xl active:scale-95">
              <span className="flex items-center gap-2">
                Continue
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </Link>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-xs sm:text-sm text-center text-gray-500 flex items-center justify-center gap-4 flex-wrap mb-16 sm:mb-20"
        >
          <span className="flex items-center gap-1.5">
            <CheckIcon className="w-4 h-4 text-green-500" />
            <span className="font-medium">Start free</span>
          </span>
          <span className="text-gray-300">•</span>
          <span className="flex items-center gap-1.5">
            <CheckIcon className="w-4 h-4 text-green-500" />
            <span className="font-medium">2 min setup</span>
          </span>
          <span className="text-gray-300">•</span>
          <span className="flex items-center gap-1.5">
            <CheckIcon className="w-4 h-4 text-green-500" />
            <span className="font-medium">No credit card</span>
          </span>
        </motion.p>

        {/* Product screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.6 }}
          className="relative mt-16 sm:mt-20"
        >
          <div className="absolute inset-0 opacity-10 blur-3xl rounded-3xl" style={{ backgroundColor: '#F52B8C' }} />

          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ border: '4px solid #F52B8C' }}>
            {/* Browser chrome */}
            <div className="bg-gray-100 px-3 py-2 sm:px-4 sm:py-3 flex items-center gap-2" style={{ borderBottom: '2px solid #F52B8C' }}>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gray-300" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gray-300" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gray-300" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white rounded-lg px-3 py-1.5 text-xs sm:text-sm text-gray-500 font-mono flex items-center gap-1.5">
                  <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  yourname.nelsy.app
                </div>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-4 sm:p-6 bg-gradient-to-br from-white to-gray-50">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Today's bookings</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">3</p>
                </div>
                <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Deposits</p>
                  <p className="text-xl sm:text-2xl font-bold" style={{ color: '#F52B8C' }}>€127</p>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { initial: 'S', name: 'Sophie M.', time: '11:00', service: 'Gel Set',  paid: true,  color: 'from-pink-400 to-pink-500' },
                  { initial: 'L', name: 'Léa P.',    time: '14:00', service: 'Nail Art', paid: true,  color: 'from-purple-400 to-purple-500' },
                  { initial: 'E', name: 'Emma D.',   time: '16:30', service: 'Fill-in',  paid: false, color: 'from-blue-400 to-blue-500' },
                ].map((b) => (
                  <div key={b.name} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${b.color} flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0`}>
                      {b.initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{b.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{b.time} · {b.service}</p>
                    </div>
                    <div className={`px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${b.paid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {b.paid ? '✓ paid' : 'pending'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating notification */}
          <div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-4 bg-white rounded-xl shadow-2xl p-3 sm:p-4 border border-gray-100 animate-float">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
              <div className="text-xs sm:text-sm">
                <p className="font-semibold text-gray-900">New booking</p>
                <p className="text-gray-500">Emma D. just booked</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 3. STATS BAR ─────────────────────────────────────────────────────────────

function StatsBar() {
  const stats = [
    { value: '$2.4M', label: 'Booked',     icon: '💰' },
    { value: '98%',   label: 'Show-up',    icon: '✅' },
    { value: '3h',    label: 'Saved/week', icon: '⏰' },
    { value: '500+',  label: 'Nail techs', icon: '💅' },
  ];

  return (
    <section className="py-8 text-white" style={{ backgroundColor: '#F52B8C' }}>
      <div className="max-w-md mx-auto px-4 sm:max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } }, hidden: {} }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
              className="py-2"
            >
              <div className="text-3xl sm:text-4xl mb-1">{s.icon}</div>
              <div className="text-3xl sm:text-5xl font-bold mb-1">{s.value}</div>
              <div className="text-sm sm:text-base text-white/80">{s.label}</div>
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
      leftEmoji: '👻', leftLabel: 'Ghosting',
      rightEmoji: '💳', rightLabel: 'Deposits',
      title: 'From Ghosting to Deposits.',
      sub: 'No more no-shows. Get paid before they sit down.',
      badge: '−85% no-shows',
      badgeClass: 'bg-green-50',
      badgeText: 'text-green-700',
      checkClass: 'text-green-600',
    },
    {
      leftEmoji: '⏰', leftLabel: 'Hours',
      rightEmoji: '💎', rightLabel: 'Assets',
      title: 'From Hours to Assets.',
      sub: 'Sell e-guides 24/7. Stop trading time for money.',
      badge: '3h saved / week',
      badgeClass: 'bg-blue-50',
      badgeText: 'text-blue-700',
      checkClass: 'text-blue-600',
    },
    {
      leftEmoji: '📱', leftLabel: 'Profile',
      rightEmoji: '🏢', rightLabel: 'Platform',
      title: 'From Profile to Platform.',
      sub: 'Your colors. Your link. A studio that looks like you.',
      badge: '2 min setup',
      badgeClass: 'bg-purple-50',
      badgeText: 'text-purple-700',
      checkClass: 'text-purple-600',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white px-4">
      <div className="max-w-md mx-auto sm:max-w-6xl">
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
              <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">{c.sub}</p>

              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${c.badgeClass}`}>
                <CheckIcon className={`w-4 h-4 flex-shrink-0 ${c.checkClass}`} />
                <span className={`text-sm font-bold ${c.badgeText}`}>{c.badge}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── 5. THE CEO CLUB ──────────────────────────────────────────────────────────

function CEOClub() {
  const items = [
    {
      avatar: 'https://i.pravatar.cc/100?img=1',
      name: 'Sarah K.',    location: 'Paris',
      quote: 'I went from 20 to 80 bookings a month. The deposit feature alone paid for itself in week one.',
      metric: '+300%', metricLabel: 'bookings',
    },
    {
      avatar: 'https://i.pravatar.cc/100?img=5',
      name: 'Maya L.',     location: 'Lyon',
      quote: 'Setup took 8 minutes. I copied the link into my bio and woke up to 4 new bookings. Wild.',
      metric: '8 min', metricLabel: 'to go live',
    },
    {
      avatar: 'https://i.pravatar.cc/100?img=9',
      name: 'Jade B.',     location: 'Bordeaux',
      quote: 'No more "how much?" DMs. Clients see prices, pick a slot, pay. Done. I got my weekends back.',
      metric: '3h', metricLabel: 'saved / week',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50 px-4">
      <div className="max-w-md mx-auto sm:max-w-6xl">
        <motion.div {...fadeUp()} className="text-center mb-12">
          <h2 className="text-heading-mobile sm:text-heading-desktop text-gray-900 mb-4">
            The CEO Club.
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Join 500+ nail techs scaling with Nelsy.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((t) => (
            <motion.div
              key={t.name}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all"
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#F52B8C'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E4E4E7'; }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <StarIcon key={j} className="w-5 h-5 text-[#F52B8C]" />
                ))}
              </div>

              <p className="text-sm sm:text-base text-gray-700 mb-6 italic leading-relaxed">
                "{t.quote}"
              </p>

              {/* Metric gradient card */}
              <div className="rounded-xl p-4 mb-6 text-white" style={{ background: 'linear-gradient(to right, #F52B8C, #9333EA)' }}>
                <div className="text-3xl sm:text-4xl font-bold mb-1">{t.metric}</div>
                <div className="text-sm opacity-90">{t.metricLabel}</div>
              </div>

              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-gray-100" />
                <div>
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.location}</div>
                </div>
              </div>
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
        <motion.h2 {...fadeUp()} className="text-hero-mobile sm:text-hero-desktop font-bold mb-6">
          Own your brand.
        </motion.h2>

        <motion.p {...fadeUp(0.08)} className="text-lg sm:text-2xl mb-10 text-white/90">
          Free setup. 2 minutes.
        </motion.p>

        <motion.div {...fadeUp(0.16)}>
          <Link to="/onboarding">
            <button
              className="w-full sm:w-auto px-10 py-5 bg-white rounded-2xl font-bold hover:bg-gray-50 active:scale-95 transition-all shadow-2xl text-lg sm:text-xl mb-8"
              style={{ color: '#F52B8C' }}
            >
              Continue →
            </button>
          </Link>
        </motion.div>

        <motion.div
          {...fadeUp(0.24)}
          className="mt-8 flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/80 flex-wrap"
        >
          <span className="flex items-center gap-1.5"><CheckIcon className="w-4 h-4" /> No credit card</span>
          <span className="opacity-40">•</span>
          <span className="flex items-center gap-1.5"><CheckIcon className="w-4 h-4" /> 2 min setup</span>
          <span className="opacity-40">•</span>
          <span className="flex items-center gap-1.5"><CheckIcon className="w-4 h-4" /> Cancel anytime</span>
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
          <a href="mailto:support@nelsy.app" className="hover:text-white transition">Contact</a>
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
      <StatsBar />
      <Transformation />
      <CEOClub />
      <FinalCTA />
      <Footer />
    </div>
  );
}
