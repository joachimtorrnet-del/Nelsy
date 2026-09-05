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
        <div className="flex items-center gap-2">
          <Link to="/login">
            <button className="px-4 py-2 rounded-lg text-sm font-bold border-2 border-gray-200 text-gray-700 hover:border-gray-300 transition active:scale-95">
              Log in
            </button>
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

const PINK = '#F52B8C';

// ── Mini social icons (inside product mockup only) ────────────────────────────

function IgMini() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="#374151" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}
function TtMini() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="#374151" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.13 8.13 0 004.78 1.52V6.82a4.85 4.85 0 01-1-.13z" />
    </svg>
  );
}
function PtMini() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="#E60023" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 010 .345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}
function LinkMini() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  );
}

// ── Product mockup ────────────────────────────────────────────────────────────

function NelsyProductMockup() {
  return (
    <div style={{ position: 'relative', width: 290, flexShrink: 0 }}>

      {/* Soft depth layer behind */}
      <div style={{
        position: 'absolute',
        inset: 14,
        backgroundColor: '#FDDDE9',
        borderRadius: 28,
        transform: 'rotate(-4deg)',
        zIndex: 0,
      }} />

      {/* ── Central booking UI ── */}
      <div style={{
        position: 'relative',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        boxShadow: '0 20px 60px rgba(0,0,0,0.10)',
        overflow: 'hidden',
        zIndex: 1,
        margin: '0 14px',
      }}>
        {/* Cover band */}
        <div style={{
          height: 82,
          background: 'linear-gradient(135deg, #FBCFE8 0%, #F9A8D4 60%, #F472B6 100%)',
          position: 'relative', flexShrink: 0,
        }}>
          {/* Avatar */}
          <div style={{
            position: 'absolute', bottom: -22, left: '50%', transform: 'translateX(-50%)',
            width: 46, height: 46, borderRadius: '50%',
            border: '3px solid #FFFFFF',
            background: 'linear-gradient(135deg, #FDE68A, #F59E0B)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.10)',
          }} />
        </div>

        {/* Identity */}
        <div style={{ textAlign: 'center', paddingTop: 30, padding: '30px 14px 10px' }}>
          <p style={{ fontSize: 15, fontWeight: 800, color: '#0D0D0D', margin: '0 0 2px', letterSpacing: '-0.02em' }}>
            Mia Nails
          </p>
          <p style={{ fontSize: 11, color: '#6B7280', margin: '0 0 5px' }}>
            Nail Artist · Paris
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, marginBottom: 7 }}>
            <span style={{ color: '#FBBF24', fontSize: 11 }}>★</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#0D0D0D' }}>4.9</span>
            <span style={{ fontSize: 10, color: '#9CA3AF' }}>(127 reviews)</span>
          </div>
          {/* Social icons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 5, marginBottom: 10 }}>
            {([<IgMini key="ig" />, <TtMini key="tt" />, <PtMini key="pt" />, <LinkMini key="link" />] as React.ReactNode[]).map((icon, i) => (
              <div key={i} style={{
                width: 26, height: 26, borderRadius: '50%',
                backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {icon}
              </div>
            ))}
          </div>
          {/* Book now */}
          <div style={{
            backgroundColor: PINK, borderRadius: 10,
            padding: '9px 0', color: '#FFFFFF',
            fontSize: 12, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 10,
          }}>
            Book now →
          </div>
        </div>

        {/* My work */}
        <div style={{ padding: '0 12px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#0D0D0D', margin: 0 }}>My work</p>
            <p style={{ fontSize: 10, fontWeight: 600, color: PINK, margin: 0 }}>See all →</p>
          </div>
          <div style={{ display: 'flex', gap: 5 }}>
            {[
              'linear-gradient(135deg,#FBCFE8,#F9A8D4)',
              'linear-gradient(135deg,#FDE68A,#FCA5A5)',
              'linear-gradient(135deg,#C7D2FE,#DDD6FE)',
            ].map((g, i) => (
              <div key={i} style={{ flex: 1, height: 52, borderRadius: 9, background: g }} />
            ))}
          </div>
        </div>

        {/* Featured service */}
        <div style={{ padding: '0 12px 14px' }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: '#0D0D0D', margin: '0 0 6px' }}>Featured service</p>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            backgroundColor: '#FFF5F9', borderRadius: 12, padding: 8,
            border: '1px solid rgba(245,43,140,0.08)',
          }}>
            <div style={{
              position: 'relative', width: 46, height: 46, flexShrink: 0,
              borderRadius: 9, overflow: 'hidden',
              background: 'linear-gradient(135deg,#FBCFE8,#F9A8D4)',
            }}>
              <div style={{
                position: 'absolute', bottom: 3, left: 3,
                backgroundColor: 'rgba(255,255,255,0.90)', borderRadius: 99,
                padding: '1px 5px', fontSize: 7, fontWeight: 700, color: PINK,
                lineHeight: 1.5,
              }}>
                Most booked
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 10.5, fontWeight: 700, color: '#0D0D0D', margin: '0 0 1px' }}>BIAB Full Set</p>
              <p style={{ fontSize: 9.5, color: '#6B7280', margin: '0 0 2px' }}>Strong, natural and glossy.</p>
              <p style={{ fontSize: 9.5, color: '#9CA3AF', margin: 0 }}>
                60 min · <strong style={{ color: '#0D0D0D' }}>€65</strong>
              </p>
            </div>
            <div style={{
              backgroundColor: PINK, borderRadius: 99,
              padding: '5px 10px', flexShrink: 0,
              color: '#FFFFFF', fontSize: 9.5, fontWeight: 700,
            }}>
              Book →
            </div>
          </div>
        </div>
      </div>

      {/* ── Floating card: New booking (top-left) ── */}
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: 28, left: -20,
          backgroundColor: '#FFFFFF', borderRadius: 16,
          padding: '10px 12px',
          boxShadow: '0 8px 28px rgba(0,0,0,0.09)',
          zIndex: 3, width: 158,
          transform: 'rotate(-2deg)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <div style={{
            width: 26, height: 26, borderRadius: 7, backgroundColor: '#FDE8F3',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0,
          }}>📅</div>
          <p style={{ fontSize: 10, fontWeight: 700, color: '#0D0D0D', margin: 0 }}>New booking ✨</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg,#F9A8D4,#F52B8C)',
          }} />
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, color: '#0D0D0D', margin: 0 }}>Sarah</p>
            <p style={{ fontSize: 9.5, color: '#6B7280', margin: 0 }}>BIAB Full Set</p>
            <p style={{ fontSize: 9.5, color: '#9CA3AF', margin: 0 }}>Today · 2:30 PM</p>
          </div>
        </div>
      </motion.div>

      {/* ── Floating card: Revenue (bottom-left) ── */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 4.1, ease: 'easeInOut', delay: 1 }}
        style={{
          position: 'absolute', bottom: 72, left: -24,
          backgroundColor: '#FFFFFF', borderRadius: 16,
          padding: '10px 14px',
          boxShadow: '0 8px 28px rgba(0,0,0,0.09)',
          zIndex: 3,
          transform: 'rotate(2.5deg)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10, backgroundColor: '#FDE8F3',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0,
          }}>📊</div>
          <div>
            <p style={{ fontSize: 17, fontWeight: 900, color: '#0D0D0D', margin: 0, letterSpacing: '-0.025em', lineHeight: 1 }}>€320</p>
            <p style={{ fontSize: 9.5, color: '#6B7280', margin: '1px 0' }}>earned this week</p>
            <p style={{ fontSize: 10, fontWeight: 700, color: '#10B981', margin: 0 }}>↑ +24%</p>
          </div>
        </div>
      </motion.div>

      {/* ── Floating card: Calendar (top-right) ── */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 0.6 }}
        style={{
          position: 'absolute', top: 22, right: -16,
          backgroundColor: '#FFFFFF', borderRadius: 16,
          padding: '10px 12px',
          boxShadow: '0 8px 28px rgba(0,0,0,0.09)',
          zIndex: 3, width: 138,
          transform: 'rotate(3deg)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7 }}>
          <div style={{
            width: 26, height: 26, borderRadius: 7, backgroundColor: '#FDE8F3',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0,
          }}>📅</div>
          <div>
            <p style={{ fontSize: 10, fontWeight: 800, color: '#0D0D0D', margin: 0 }}>Today</p>
            <p style={{ fontSize: 9.5, color: '#6B7280', margin: 0 }}>6 appointments</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 2 }}>
          {(['Mon','Tue','Wed','Thu','Fri'] as const).map((d, i) => (
            <div key={d} style={{ flex: 1, textAlign: 'center' }}>
              <p style={{ fontSize: 7.5, color: '#9CA3AF', margin: '0 0 2px' }}>{d.slice(0,1)}</p>
              <p style={{
                fontSize: 8.5, fontWeight: 700, margin: 0,
                color: i === 2 ? '#FFFFFF' : '#374151',
                backgroundColor: i === 2 ? PINK : 'transparent',
                borderRadius: 4, padding: '1px 0',
              }}>{[8,9,10,11,12][i]}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Floating card: Payment received (bottom-right) ── */}
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 4.3, ease: 'easeInOut', delay: 1.8 }}
        style={{
          position: 'absolute', bottom: 58, right: -20,
          backgroundColor: '#FFFFFF', borderRadius: 16,
          padding: '10px 12px',
          boxShadow: '0 8px 28px rgba(0,0,0,0.09)',
          zIndex: 3,
          transform: 'rotate(-2deg)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 9, backgroundColor: '#D1FAE5',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7l3.5 3.5L12 3" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 9.5, color: '#6B7280', margin: 0 }}>Payment received</p>
            <p style={{ fontSize: 14, fontWeight: 800, color: '#0D0D0D', margin: '1px 0', letterSpacing: '-0.02em', lineHeight: 1 }}>€65</p>
            <p style={{ fontSize: 9.5, color: '#9CA3AF', margin: 0 }}>Today · 12:14 PM</p>
          </div>
        </div>
      </motion.div>

    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section style={{ backgroundColor: '#FEF6F9', paddingTop: 56, overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div
          className="flex flex-col lg:flex-row lg:items-center"
          style={{ gap: 40, paddingBottom: 80 }}
        >
          {/* ── Copy ── */}
          <motion.div
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
            style={{ flex: '0 0 auto', maxWidth: 480, width: '100%', paddingTop: 60 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Eyebrow */}
            <p style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
              color: PINK, marginBottom: 20, textTransform: 'uppercase', lineHeight: 1,
            }}>
              BUILT FOR NAIL TECHS
            </p>

            {/* Headline */}
            <h1 style={{
              fontSize: 'clamp(2.25rem, 7vw, 3.75rem)',
              fontWeight: 900,
              color: '#0D0D0D',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              marginBottom: 20,
            }}>
              Your All-in-One<br />
              Link in Bio<br />
              <span style={{ color: PINK }}>for Nail Techs.</span>
            </h1>

            {/* Supporting copy */}
            <p style={{
              fontSize: 16.5,
              color: '#6B7280',
              lineHeight: 1.6,
              marginBottom: 38,
              maxWidth: 360,
            }}>
              Bookings, payments, your work and more —<br />
              all in one beautiful page.
            </p>

            {/* CTA */}
            <Link to="/onboarding">
              <motion.button
                whileTap={{ scale: 0.97 }}
                style={{
                  backgroundColor: PINK,
                  color: '#FFFFFF',
                  borderRadius: 99,
                  padding: '15px 40px',
                  fontSize: 17,
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 28px rgba(245,43,140,0.28)',
                  letterSpacing: '-0.01em',
                }}
              >
                Continue →
              </motion.button>
            </Link>
          </motion.div>

          {/* ── Mockup ── */}
          <motion.div
            className="flex justify-center lg:justify-end flex-1"
            style={{ paddingTop: 48, paddingBottom: 60 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            <NelsyProductMockup />
          </motion.div>
        </div>
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
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      name: 'Sarah K.',    location: 'Paris',
      quote: 'I went from 20 to 80 bookings a month. The deposit feature alone paid for itself in week one.',
      metric: '+300%', metricLabel: 'bookings',
    },
    {
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      name: 'Maya L.',     location: 'Lyon',
      quote: 'Setup took 8 minutes. I copied the link into my bio and woke up to 4 new bookings. Wild.',
      metric: '8 min', metricLabel: 'to go live',
    },
    {
      avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
      name: 'Jade B.',     location: 'Bordeaux',
      quote: 'No more "how much?" DMs. Clients see prices, pick a slot, pay. Done. I got my weekends back.',
      metric: '3h', metricLabel: 'saved / week',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50 px-4">
      <div className="max-w-md mx-auto sm:max-w-6xl">
        <motion.div {...fadeUp()} className="text-center mb-12">
          <p className="text-xs font-bold tracking-widest text-gray-400 mb-4 uppercase">[ WALL OF LOVE ]</p>
          <h2 className="text-heading-mobile sm:text-heading-desktop text-gray-900 mb-4">
            They love it. Why not you?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            500+ nail techs have already taken back their time — and their income.
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
        <motion.p {...fadeUp()} className="text-xs font-bold tracking-widest text-white/50 mb-6 uppercase">
          [ GET STARTED ]
        </motion.p>
        <motion.h2 {...fadeUp(0.04)} className="text-hero-mobile sm:text-hero-desktop font-bold mb-6">
          Ready to book your first client tonight?
        </motion.h2>

        <motion.p {...fadeUp(0.08)} className="text-lg sm:text-2xl mb-10 text-white/90">
          2 minutes setup. Your link, live tonight.
        </motion.p>

        <motion.div {...fadeUp(0.16)}>
          <Link to="/onboarding">
            <button
              className="w-full sm:w-auto px-10 py-5 bg-white rounded-2xl font-bold hover:bg-gray-50 active:scale-95 transition-all shadow-2xl text-lg sm:text-xl mb-8"
              style={{ color: '#F52B8C' }}
            >
              Get my free booking page →
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

// ─── 6. ZERO COMMISSION ───────────────────────────────────────────────────────

function ZeroCommission() {
  return (
    <section className="py-20 sm:py-32 bg-white px-4 overflow-hidden">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div {...fadeUp()}>
          <motion.p {...fadeUp()} className="text-xs font-bold tracking-widest text-gray-400 mb-6 uppercase">
            [ 0% COMMISSION ]
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
            Commission. Always.
          </motion.h2>
          <motion.p {...fadeUp(0.18)} className="text-lg sm:text-xl text-gray-500 max-w-lg mx-auto leading-relaxed">
            Every booking platform takes a cut of your income. Nelsy doesn't.
            You keep everything you charge — only Stripe's standard 2.9% applies. That's it.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 6b. COMPARISON TABLE ─────────────────────────────────────────────────────

function ComparisonTable() {
  const rows = [
    { feature: 'Online booking page',     dms: false,   others: true,    nelsy: true  },
    { feature: 'Commission per booking',  dms: false,   others: '5–20%', nelsy: '0%'  },
    { feature: 'Deposit / prepayment',    dms: false,   others: true,    nelsy: true  },
    { feature: 'No-show protection',      dms: false,   others: false,   nelsy: true  },
    { feature: 'Your own brand & colors', dms: false,   others: false,   nelsy: true  },
    { feature: 'Setup time',              dms: '∞ DMs', others: 'Days',  nelsy: '8 min' },
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
          <p className="text-xs font-bold tracking-widest text-gray-400 mb-4 uppercase">[ VS THE REST ]</p>
          <h2 className="text-heading-mobile sm:text-heading-desktop text-gray-900 mb-4">
            The booking app that doesn't steal from you.
          </h2>
          <p className="text-lg sm:text-xl text-gray-500">
            See what you've been missing.
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.1)} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="grid grid-cols-4 text-center text-xs sm:text-sm font-bold border-b border-gray-100">
            <div className="py-4 px-2 text-left text-gray-400 pl-4 sm:pl-6">Feature</div>
            <div className="py-4 px-2 text-gray-400">DMs</div>
            <div className="py-4 px-2 text-gray-400">Others</div>
            <div className="py-4 px-2 text-white rounded-tr-2xl" style={{ backgroundColor: '#F52B8C' }}>Nelsy</div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-4 text-center items-center border-b border-gray-50 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
            >
              <div className="py-4 px-4 sm:px-6 text-left text-xs sm:text-sm font-medium text-gray-700">{row.feature}</div>
              <div className="py-4 px-2"><Cell value={row.dms} /></div>
              <div className="py-4 px-2"><Cell value={row.others} /></div>
              <div className="py-4 px-2" style={{ backgroundColor: 'rgba(245,43,140,0.04)' }}>
                <Cell value={row.nelsy} />
              </div>
            </div>
          ))}

          {/* Footer CTA row */}
          <div className="grid grid-cols-4 text-center items-center bg-white border-t border-gray-100 rounded-b-2xl">
            <div className="py-4 px-4 sm:px-6" />
            <div className="py-4 px-2" />
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
      <StatsBar />
      <ZeroCommission />
      <ComparisonTable />
      <Transformation />
      <CEOClub />
      <FinalCTA />
      <Footer />
    </div>
  );
}
