import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import posthog from 'posthog-js';
import { ArrowDown, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import SEOMeta from '@/components/SEOMeta';
import SiteNav from '@/components/layout/SiteNav';
import SiteFooter from '@/components/layout/SiteFooter';
import { PublicStudioView } from '@/components/studio/PublicStudioView';
import { STUDIO_TEMPLATES, TEMPLATE_DEMOS } from '@/lib/templateDemos';
import { trackSeoCTAClicked, track } from '@/lib/analytics';
import type { Merchant } from '@/types';

const PINK = '#F52B8C';
const INK = '#1A1A1A';
const PLAN = { monthly: 29, yearly: 25, yearlyTotal: 300 };

// ─── Hero A/B test ───────────────────────────────────────────────────────────
// 50/50, sticky per browser. The variant is registered as a PostHog super property,
// so every later event (signup steps, account_created) can be broken down by variant.
// Prerender (headless Chrome) always gets A, so the indexed HTML stays stable.
type Variant = 'A' | 'B';
const VARIANT_KEY = 'nelsy_hero_variant';

function useHeroVariant(): Variant {
  const [variant] = useState<Variant>(() => {
    try {
      if (navigator.webdriver) return 'A';
      const saved = localStorage.getItem(VARIANT_KEY);
      if (saved === 'A' || saved === 'B') return saved;
      const picked: Variant = Math.random() < 0.5 ? 'A' : 'B';
      localStorage.setItem(VARIANT_KEY, picked);
      return picked;
    } catch {
      return 'A';
    }
  });
  useEffect(() => {
    try { posthog.register({ hero_variant: variant }); } catch { /* analytics off */ }
    track('hero_variant_viewed', { variant });
  }, [variant]);
  return variant;
}

const HERO: Record<Variant, { title: string; sub: string }> = {
  A: {
    title: 'Get booked and paid from your link in bio.',
    sub: 'Bookings with deposits, courses and digital products on one page built for beauty pros.',
  },
  B: {
    title: 'Your talent deserves more than DMs.',
    sub: 'Take bookings with deposits, sell your courses and guides, and get paid from one link made for beauty creators.',
  },
};

function scrollToPricing(position: string, variant: Variant) {
  track('landing_cta_clicked', { position, variant, action: 'scroll_to_pricing' });
  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── 1. Hero ─────────────────────────────────────────────────────────────────

function Hero({ variant }: { variant: Variant }) {
  const copy = HERO[variant];
  return (
    <section
      className="relative overflow-hidden"
      // Same soft pink glow as the previous landing, centered behind the phone visual
      style={{ background: 'radial-gradient(ellipse 110% 85% at 70% 55%, #FFCBD9 0%, #FFD8E4 18%, #FFE5EE 36%, #FFF0F6 55%, #FFF7FA 74%, #FFFBFD 100%)' }}
    >
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-28 lg:pt-36 pb-14 lg:pb-24 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div>
          <p className="text-sm font-bold mb-4" style={{ color: PINK }}>The Beauty Creator Store</p>
          <h1 className="font-bold tracking-tight leading-[1.04] mb-5" style={{ color: INK, fontSize: 'clamp(2.4rem, 6vw, 4.2rem)', letterSpacing: '-0.035em' }}>
            {copy.title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-7 max-w-xl">{copy.sub}</p>

          <div className="flex items-center gap-4 mb-8">
            <span className="relative inline-flex items-center justify-center w-[74px] h-[56px] text-3xl font-black" style={{ color: INK }}>
              <svg viewBox="0 0 100 70" className="absolute inset-0 w-full h-full" aria-hidden="true">
                <ellipse cx="50" cy="35" rx="46" ry="30" fill="none" stroke={PINK} strokeWidth="4" transform="rotate(-6 50 35)" />
              </svg>
              0%
            </span>
            <p className="text-base sm:text-lg font-semibold text-gray-800">Nelsy commission, <span style={{ color: PINK }}>always.</span></p>
          </div>

          <button
            type="button"
            onClick={() => scrollToPricing('hero', variant)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 text-white font-bold text-lg rounded-full px-9 py-4 transition hover:opacity-90 active:scale-[0.98]"
            style={{ background: PINK, boxShadow: '0 10px 30px -8px rgba(245,43,140,0.55)' }}
          >
            Get started <ArrowDown className="w-5 h-5" aria-hidden="true" />
          </button>
          <p className="mt-3 text-sm text-gray-500 text-center sm:text-left">14-day free trial · $0 today · Cancel anytime</p>
        </div>

        <div className="flex justify-center">
          <img
            src="/hero-mockup-540.webp"
            srcSet="/hero-mockup-540.webp 540w, /hero-mockup.webp 900w"
            sizes="(max-width: 1024px) 90vw, 540px"
            width={900}
            height={962}
            fetchPriority="high"
            alt="A Nelsy beauty creator page with bookings, a coaching session and a downloadable guide"
            className="w-full max-w-[420px] lg:max-w-[540px] h-auto"
          />
        </div>
      </div>
    </section>
  );
}

// ─── 2. Skills into income ───────────────────────────────────────────────────

const EXAMPLES: { template: string; offerType: string; offer: string }[] = [
  { template: 'gallery', offerType: 'Course', offer: 'Lash mapping masterclass' },
  { template: 'classic', offerType: 'Booking', offer: 'Signature gel set' },
  { template: 'blush', offerType: 'Digital guide', offer: 'Glow skin routine' },
  { template: 'coach', offerType: 'Coaching', offer: '1:1 bridal makeup call' },
];

function SkillsSection({ variant }: { variant: Variant }) {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
        <div>
          <h2 className="font-bold tracking-tight leading-[1.05] mb-5" style={{ color: INK, fontSize: 'clamp(2.1rem, 4.6vw, 3.4rem)', letterSpacing: '-0.03em' }}>
            Turn your skills into income.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">Package what you know into something your followers can book or buy.</p>
          <p className="text-lg font-semibold leading-relaxed mb-8" style={{ color: INK }}>
            A gel-x masterclass. A lash aftercare guide.<br />A monthly glow club.
          </p>
          <button
            type="button"
            onClick={() => scrollToPricing('skills', variant)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 text-white font-bold text-base rounded-full px-8 py-4 transition hover:opacity-90"
            style={{ background: INK }}
          >
            Start your page <ArrowDown className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="-mx-5 px-5 sm:mx-0 sm:px-0 flex sm:grid sm:grid-cols-2 gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-2">
          {EXAMPLES.map((ex) => {
            const demo = TEMPLATE_DEMOS[ex.template];
            return (
              <Link
                key={ex.template}
                to={`/demo?template=${ex.template}`}
                className="group relative shrink-0 w-[78%] sm:w-auto snap-start rounded-3xl overflow-hidden aspect-[4/5] bg-gray-100"
              >
                <img src={demo.cover_url} alt={`${demo.salon_name}, example ${demo.specialty?.toLowerCase()} page`} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 55%)' }} />
                <div className="absolute inset-x-3 bottom-3">
                  <p className="text-white text-xs font-semibold mb-2 px-1">{demo.salon_name} · {demo.specialty}</p>
                  <div className="bg-white rounded-2xl p-3 flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-md mb-1" style={{ background: '#FDE8F3', color: PINK }}>{ex.offerType}</span>
                      <p className="text-sm font-bold leading-snug truncate" style={{ color: INK }}>{ex.offer}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 shrink-0 text-gray-400 group-hover:text-gray-900" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <p className="max-w-6xl mx-auto px-5 sm:px-8 mt-4 text-xs text-gray-400 lg:text-right">Example pages. Tap one to open the live demo.</p>
    </section>
  );
}

// ─── 3. A place to sell ──────────────────────────────────────────────────────

const STEPS = [
  { title: 'Make it yours.', text: 'Pick a template, add your photos and colors, and put your services and products front and center.' },
  { title: 'Share it everywhere.', text: 'Put your link in your Instagram and TikTok bio, your stories, your DMs and your emails.' },
  { title: 'Nelsy handles the rest.', text: 'Booking, deposits or pay on arrival, checkout and delivery in one place, so you can spend more time on your craft.' },
];

function PlaceToSellSection({ variant }: { variant: Variant }) {
  const template = STUDIO_TEMPLATES.find((t) => t.id === 'classic') ?? STUDIO_TEMPLATES[0];
  const demo: Merchant = { ...TEMPLATE_DEMOS[template.id], theme_preset: template.themeId, color_accent: template.accentColor };
  return (
    <section className="py-20 lg:py-28" style={{ background: '#F7F3F5' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <h2 className="font-bold tracking-tight leading-[1.05] mb-5" style={{ color: INK, fontSize: 'clamp(2.1rem, 4.6vw, 3.4rem)', letterSpacing: '-0.03em' }}>
            Now give it a place to sell.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">Your own beauty store. One link. Everything you offer.</p>
          <ul className="space-y-6 mb-10">
            {STEPS.map((s) => (
              <li key={s.title} className="flex gap-3">
                <Check className="w-5 h-5 mt-1 shrink-0" style={{ color: PINK }} strokeWidth={3} aria-hidden="true" />
                <div>
                  <p className="font-bold text-lg" style={{ color: INK }}>{s.title}</p>
                  <p className="text-gray-600 leading-relaxed">{s.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => scrollToPricing('place_to_sell', variant)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white font-bold text-lg rounded-full px-9 py-4 transition hover:opacity-90"
            style={{ background: PINK }}
          >
            Show me the plans
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 -m-10 rounded-full" style={{ background: PINK, opacity: 0.9, transform: 'scale(0.9)' }} aria-hidden="true" />
            <div className="relative rounded-[40px] border-[10px] overflow-hidden shadow-2xl bg-white" style={{ borderColor: INK, width: 300 }}>
              <div className="pointer-events-none select-none" style={{ width: 390, height: 640, transform: 'scale(0.769)', transformOrigin: 'top left', marginBottom: -148, marginRight: -90 }}>
                <PublicStudioView merchant={demo} mode="preview" />
              </div>
            </div>
          </div>
          <Link to="/demo" className="mt-8 inline-flex items-center gap-3 bg-white rounded-2xl px-5 py-3 shadow-sm text-sm hover:shadow-md transition">
            <span className="font-bold" style={{ color: INK }}>{demo.salon_name}, example page</span>
            <span className="font-semibold inline-flex items-center gap-1" style={{ color: PINK }}>See the live demo <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" /></span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── 4. Pricing ──────────────────────────────────────────────────────────────

const FEATURES = [
  { title: 'Your beauty store page', text: 'Mobile-optimized, 11 templates, your colors and photos' },
  { title: 'Bookings and payments', text: 'Deposits, full payment or pay on arrival, per service' },
  { title: 'Sell what you know', text: 'Courses, digital products, coaching and memberships' },
  { title: 'Grow your audience', text: 'Instagram AutoDM, email and client CRM' },
  { title: 'Analytics', text: 'See what sells and where your clients come from' },
];

function PricingSection({ variant }: { variant: Variant }) {
  const navigate = useNavigate();
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly');
  const price = billing === 'yearly' ? PLAN.yearly : PLAN.monthly;

  const start = () => {
    track('landing_cta_clicked', { position: 'pricing', variant, plan: billing, action: 'start_trial' });
    trackSeoCTAClicked('/', 'inline', 'Start my free trial');
    navigate(`/onboarding?plan=${billing}`);
  };

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white scroll-mt-20">
      <div className="max-w-xl mx-auto px-5 sm:px-8 text-center">
        <h2 className="font-bold tracking-tight mb-3" style={{ color: INK, fontSize: 'clamp(2rem, 4vw, 2.8rem)', letterSpacing: '-0.03em' }}>Choose your plan</h2>
        <p className="text-gray-500 mb-8">Try it free for 14 days.</p>

        <div className="inline-flex bg-gray-100 rounded-full p-1 mb-8" role="radiogroup" aria-label="Billing period">
          {(['monthly', 'yearly'] as const).map((b) => (
            <button
              key={b}
              type="button"
              role="radio"
              aria-checked={billing === b}
              onClick={() => setBilling(b)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition ${billing === b ? 'bg-white shadow-sm' : 'text-gray-500'}`}
              style={billing === b ? { color: INK } : undefined}
            >
              {b === 'monthly' ? 'Monthly' : 'Yearly'}
            </button>
          ))}
        </div>

        <div className="relative text-left rounded-3xl border-2 p-7 sm:p-8" style={{ borderColor: PINK, background: '#FFF8FB' }}>
          <span className="absolute -top-3.5 right-6 text-white text-xs font-bold px-3 py-1 rounded-full" style={{ background: PINK }}>Everything included</span>
          <p className="text-2xl font-black mb-3" style={{ color: INK }}>Nelsy</p>
          <p className="mb-1"><span className="text-5xl font-black" style={{ color: INK }}>${price}</span><span className="text-xl text-gray-500">/mo</span></p>
          <p className="text-sm text-gray-500">After 14-day free trial</p>
          <p className="text-sm text-gray-500 mb-3">{billing === 'yearly' ? `$${PLAN.yearlyTotal} billed yearly after your free trial` : 'Billed monthly'}</p>
          {billing === 'yearly' && (
            <span className="inline-block text-sm font-bold px-3 py-1 rounded-lg mb-6" style={{ background: '#FDE8F3', color: PINK }}>
              Save ${(PLAN.monthly - PLAN.yearly) * 12} per year
            </span>
          )}
          <ul className={`space-y-4 ${billing === 'yearly' ? '' : 'mt-6'}`}>
            {FEATURES.map((f) => (
              <li key={f.title} className="flex gap-3">
                <span className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: '#FDE8F3' }}>
                  <Check className="w-4 h-4" style={{ color: PINK }} strokeWidth={3} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-bold" style={{ color: INK }}>{f.title}</p>
                  <p className="text-sm text-gray-500">{f.text}</p>
                </div>
              </li>
            ))}
            <li className="flex gap-3">
              <span className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black text-white" style={{ background: PINK }}>0%</span>
              <div>
                <p className="font-bold" style={{ color: INK }}>0% Nelsy commission</p>
                <p className="text-sm text-gray-500">You keep what you earn. Standard payment processing fees apply.</p>
              </div>
            </li>
          </ul>
        </div>

        <p className="mt-8 mb-3 text-gray-700">Due today: <strong style={{ color: INK }}>$0</strong></p>
        <button
          type="button"
          onClick={start}
          className="w-full inline-flex items-center justify-center gap-2 text-white font-bold text-lg rounded-full py-4 transition hover:opacity-90 active:scale-[0.99]"
          style={{ background: PINK }}
        >
          Start my free trial <ArrowRight className="w-5 h-5" aria-hidden="true" />
        </button>
        <p className="mt-4 text-xs text-gray-400">Prices shown in USD. Standard payment processing fees apply.</p>
      </div>
    </section>
  );
}

// ─── 5. FAQ ──────────────────────────────────────────────────────────────────

const FAQ = [
  { q: 'What can I sell with Nelsy?', a: 'Your beauty services with online booking, plus courses, digital products such as guides and templates, 1:1 coaching and memberships, all from one page you share in your bio.' },
  { q: 'Do I need a website or technical skills?', a: 'No. Pick a template, add your services and photos, and your page is ready to share. No code, no website needed.' },
  { q: 'Does Nelsy take a cut of my sales?', a: 'No. Nelsy charges 0% commission on your bookings and sales. You pay your plan, and standard payment processing fees apply to online payments.' },
  { q: 'How does the free trial work?', a: 'You get 14 days free. A card is saved at signup and you pay $0 today. Your plan starts after the trial, and you can cancel anytime before it ends.' },
  { q: 'Can clients pay at the appointment instead of online?', a: 'Yes. For each service you choose pay on arrival, a deposit, or full payment upfront, and you can record cash or card payments taken at the studio.' },
];

function FaqSection() {
  return (
    <section className="py-20 lg:py-28" style={{ background: '#F7F3F5' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[0.9fr_1.1fr] gap-10">
        <h2 className="font-bold tracking-tight leading-[1.05]" style={{ color: INK, fontSize: 'clamp(2.1rem, 4.6vw, 3.4rem)', letterSpacing: '-0.03em' }}>
          Your questions, answered
        </h2>
        <div className="divide-y divide-gray-300/70 border-y border-gray-300/70">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-lg font-bold" style={{ color: INK }}>
                {f.q}
                <span className="text-2xl font-light transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-gray-600 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 6. Final CTA ────────────────────────────────────────────────────────────

function FinalCTA({ variant }: { variant: Variant }) {
  const navigate = useNavigate();
  return (
    <section className="py-20 lg:py-28 text-center text-white" style={{ background: PINK }}>
      <div className="max-w-3xl mx-auto px-5">
        <h2 className="font-bold tracking-tight mb-4" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.2rem)', letterSpacing: '-0.035em' }}>Start your free trial</h2>
        <p className="text-lg text-white/85 mb-9">Your bookings, courses and products. One link.</p>
        <button
          type="button"
          onClick={() => {
            track('landing_cta_clicked', { position: 'final', variant, action: 'start_trial' });
            trackSeoCTAClicked('/', 'footer_cta', 'Get started');
            navigate('/onboarding?plan=yearly');
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 font-bold text-lg rounded-full px-10 py-4 transition hover:opacity-90"
          style={{ background: '#FFFFFF', color: INK }}
        >
          Get started <ArrowRight className="w-5 h-5" aria-hidden="true" />
        </button>
        <p className="mt-4 text-sm text-white/80">14-day free trial · $0 today · Cancel anytime</p>
      </div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LandingPremium() {
  const variant = useHeroVariant();

  useEffect(() => {
    document.dispatchEvent(new Event('render-complete'));
  }, []);

  return (
    <div className="font-sans min-h-screen bg-white antialiased">
      <SEOMeta
        title="Nelsy: Link in Bio Store & Booking App for Beauty Creators"
        description="Take bookings with deposits, sell courses, digital products and coaching, and get paid from one link. 0% Nelsy commission. Try free for 14 days."
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
            description: 'Link in bio store and booking app for beauty creators: online bookings with deposits or pay on arrival, courses, digital products, coaching and memberships, with 0% Nelsy commission.',
            offers: {
              '@type': 'Offer',
              price: String(PLAN.monthly),
              priceCurrency: 'USD',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: String(PLAN.monthly),
                priceCurrency: 'USD',
                unitCode: 'MON',
              },
            },
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
        <Hero variant={variant} />
        <SkillsSection variant={variant} />
        <PlaceToSellSection variant={variant} />
        <PricingSection variant={variant} />
        <FaqSection />
        <FinalCTA variant={variant} />
      </main>
      <SiteFooter />
    </div>
  );
}
