import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import SEOMeta from '@/components/SEOMeta';
import SiteNav from '@/components/layout/SiteNav';
import { trackSeoCTAClicked, track } from '@/lib/analytics';
import FeaturesSection from '../components/landing/FeaturesSection';
import ProductShowcaseSection from '../components/landing/ProductShowcaseSection';
import ZeroFeesSection from '../components/landing/ZeroFeesSection';
import ValueStackSection from '../components/landing/ValueStackSection';
import SocialProofSection from '../components/landing/SocialProofSection';

// ─── Motion helpers ────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay },
} as const);

const PINK = '#F52B8C';


// ─── Reserved slugs (matches app routes) ─────────────────────────────────────



// ─── 1. HERO ──────────────────────────────────────────────────────────────────

function Hero() {
  const navigate = useNavigate();

  const handleContinue = () => {
    track('hero_cta_clicked', { label: 'Continue', position: 'hero' });
    trackSeoCTAClicked('/', 'hero', 'Continue');
    navigate('/onboarding');
  };

  return (
    <section style={{
      paddingTop: 80, overflowX: 'clip', position: 'relative',
      background: 'transparent',
      paddingBottom: 0,
    }}>

      {/* Mobile layout */}
      <div className="lg:hidden px-6 pt-10 pb-0">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          style={{
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            marginBottom: 14,
            color: '#0A0A0A',
            fontSize: 'clamp(2rem, 9.5vw, 2.8rem)',
          }}
        >
          Meet Your All-in-One{' '}
          <span style={{ color: PINK }}>Beauty Creator Store</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
          style={{
            fontSize: 'clamp(15px, 4vw, 17px)',
            color: '#6B7280',
            lineHeight: 1.65,
            marginBottom: 24,
            maxWidth: 440,
          }}
        >
          Nelsy is the easiest way for beauty creators to take bookings, sell digital products and coaching, and get paid from one link.
        </motion.p>

        <motion.div
          id="hero-claim"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18 }}
          style={{ marginBottom: 44 }}
        >
          <button
            onClick={handleContinue}
            className="w-full flex items-center justify-center gap-2 text-white font-bold rounded-full"
            style={{
              background: PINK,
              fontSize: 16,
              paddingTop: 14,
              paddingBottom: 14,
              boxShadow: '0 6px 24px rgba(245,43,140,0.30)',
              letterSpacing: '0.01em',
            }}
          >
            Continue <span aria-hidden>→</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.28 }}
          className="flex justify-center"
        >
          <img
            src="/hero-mockup.png"
            alt="Nelsy beauty creator storefront — bookings, courses and digital products in one link"
            style={{ width: '100%', maxWidth: 400, height: 'auto', display: 'block' }}
          />
        </motion.div>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:flex max-w-6xl mx-auto px-10 pt-14 pb-0 items-center gap-12">
        {/* Left: text + CTA */}
        <div className="flex-1" style={{ maxWidth: 520 }}>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            style={{
              fontWeight: 900,
              lineHeight: 1.06,
              letterSpacing: '-0.04em',
              marginBottom: 18,
              color: '#0A0A0A',
              fontSize: 'clamp(2.8rem, 4.2vw, 4rem)',
            }}
          >
            Meet Your All-in-One{' '}
            <span style={{ color: PINK }}>Beauty Creator Store</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.12 }}
            style={{
              fontSize: 'clamp(16px, 1.3vw, 18px)',
              color: '#6B7280',
              lineHeight: 1.7,
              marginBottom: 32,
              maxWidth: 460,
            }}
          >
            Nelsy is the easiest way for beauty creators to take bookings, sell digital products and coaching, and get paid from one link.
          </motion.p>

          <motion.div
            id="hero-claim"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18 }}
          >
            <button
              onClick={handleContinue}
              className="inline-flex items-center justify-center gap-2 text-white font-bold rounded-full"
              style={{
                background: PINK,
                fontSize: 16,
                paddingTop: 14,
                paddingBottom: 14,
                paddingLeft: 36,
                paddingRight: 36,
                boxShadow: '0 6px 24px rgba(245,43,140,0.30)',
                letterSpacing: '0.01em',
              }}
            >
              Continue <span aria-hidden>→</span>
            </button>
          </motion.div>
        </div>

        {/* Right: mockup */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.22 }}
          className="flex-shrink-0"
          style={{ width: '50%', maxWidth: 540 }}
        >
          <img
            src="/hero-mockup.png"
            alt="Nelsy beauty creator storefront — bookings, courses and digital products in one link"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </motion.div>
      </div>

    </section>
  );
}



// ─── FINAL CTA ────────────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="py-14 sm:py-24 px-4" style={{ backgroundColor: '#0D0D0D' }}>
      <div className="max-w-2xl mx-auto text-center">
        <motion.p {...fadeUp()} style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
          color: PINK, marginBottom: 18, textTransform: 'uppercase',
          opacity: 0.85,
        }}>
          GET STARTED
        </motion.p>

        <motion.h2 {...fadeUp(0.04)} style={{
          fontSize: 'clamp(2rem, 5.5vw, 3.25rem)',
          fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.035em',
          color: '#FFFFFF', marginBottom: 16,
        }}>
          Ready to grow your beauty business?
        </motion.h2>

        <motion.p {...fadeUp(0.08)} style={{
          fontSize: 'clamp(15px, 1.6vw, 18px)',
          color: 'rgba(255,255,255,0.55)',
          lineHeight: 1.65,
          maxWidth: 400,
          margin: '0 auto 36px',
        }}>
          Build your page, get booked, sell your work and grow from one place.
        </motion.p>

        <motion.div {...fadeUp(0.14)}>
          <Link to="/onboarding" onClick={() => trackSeoCTAClicked('/', 'footer_cta', 'Start for free')}>
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="text-[16px] sm:text-[18px] px-11 py-4 font-bold rounded-2xl hover:opacity-90 active:scale-95 transition-all"
              style={{
                backgroundColor: PINK,
                color: '#FFFFFF',
                boxShadow: '0 10px 36px rgba(245,43,140,0.32)',
                letterSpacing: '-0.01em',
              }}
            >
              Start for free
            </motion.button>
          </Link>
        </motion.div>

        <motion.p {...fadeUp(0.22)} style={{
          marginTop: 14,
          fontSize: 12,
          color: 'rgba(255,255,255,0.30)',
          letterSpacing: '0.01em',
        }}>
          14-day free trial · Cancel anytime
        </motion.p>
      </div>
    </section>
  );
}

// ─── 13. FOOTER ───────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md" style={{ backgroundColor: PINK }} />
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
  useEffect(() => {
    document.dispatchEvent(new Event('render-complete'));
  }, []);

  return (
    <div className="font-sans min-h-screen bg-white antialiased">
      <SEOMeta
        title="Nelsy | The All-In-One Platform For Beauty Creators"
        description="Book clients, sell online courses & digital products. One link, 0% commission. The easiest way for beauty creators to make money. Try free for 14 days."
        canonical="/"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Nelsy',
            url: 'https://getnelsy.com',
            logo: 'https://getnelsy.com/og-image.png',
            sameAs: ['https://www.instagram.com/getnelsy'],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Nelsy',
            url: 'https://getnelsy.com',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Nelsy',
            url: 'https://getnelsy.com',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description: 'Booking app for independent nail techs. Accept online bookings, collect deposits, take payments, and manage your schedule.',
            offers: {
              '@type': 'Offer',
              price: '29.99',
              priceCurrency: 'USD',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: '29.99',
                priceCurrency: 'USD',
                unitCode: 'MON',
              },
            },
          },
        ]}
      />
      <div style={{
        background: 'radial-gradient(ellipse 110% 85% at 70% 55%, #FFCBD9 0%, #FFD8E4 18%, #FFE5EE 36%, #FFF0F6 55%, #FFF7FA 74%, #FFFBFD 100%)',
        position: 'relative',
      }}>
        <SiteNav />
        <Hero />
      </div>
      <FeaturesSection />
      <ProductShowcaseSection />
      <ZeroFeesSection />
      <ValueStackSection />
      <SocialProofSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}
