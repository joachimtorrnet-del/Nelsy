import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import posthog from 'posthog-js';
import { ArrowDown, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import SEOMeta from '@/components/SEOMeta';
import SiteNav from '@/components/layout/SiteNav';
import SiteFooter from '@/components/layout/SiteFooter';
import PlanPicker from '@/components/landing/PlanPicker';
import { PublicStudioView } from '@/components/studio/PublicStudioView';
import { STUDIO_TEMPLATES, TEMPLATE_DEMOS } from '@/lib/templateDemos';
import { PLANS, TRIAL_DAYS, planKey } from '@/lib/plans';
import { trackSeoCTAClicked, track } from '@/lib/analytics';
import type { Merchant } from '@/types';

const PINK = '#F52B8C';
const INK = '#1A1A1A';

// Layout scale measured on stan.store (plans-first variant), see docs/landing-stan-measurements.md.
// Container: 1240px max with 48px gutters on desktop (1144px content), 24px gutters on mobile.
const WRAP = 'max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12';
// Section heading: 34px on mobile, 48px on desktop, line-height 1.15.
const H2 = 'font-bold tracking-tight leading-[1.15] text-[34px] lg:text-[48px]';
const H2_STYLE = { color: INK, letterSpacing: '-0.02em' } as const;
// Pill buttons; each call site sets its height (60 to 69px), padding and font size.
const BTN = 'inline-flex items-center justify-center gap-3 rounded-full font-bold transition hover:opacity-90 active:scale-[0.98]';

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
      <div className={`relative ${WRAP} pt-24 lg:pt-32 pb-11 lg:pb-16 grid lg:grid-cols-[minmax(0,545px)_1fr] gap-10 lg:gap-0 items-center`}>
        <div>
          <p className="text-sm lg:text-base font-bold mb-4" style={{ color: PINK }}>The Beauty Creator Store</p>
          <h1 className="font-bold tracking-tight leading-[1.1] mb-5 text-[36px] sm:text-[48px] lg:text-[60px]" style={{ color: INK, letterSpacing: '-0.03em' }}>
            {copy.title}
          </h1>
          <p className="text-[15px] lg:text-lg text-gray-600 leading-relaxed mb-7 max-w-[430px]">{copy.sub}</p>

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
            className={`${BTN} w-full sm:w-auto h-[60px] lg:h-[69px] px-[30px] text-base lg:text-[19px] text-white`}
            style={{ background: PINK, boxShadow: '0 10px 30px -8px rgba(245,43,140,0.55)' }}
          >
            Get started <ArrowDown className="w-5 h-5" aria-hidden="true" />
          </button>
          <p className="mt-3 text-sm text-gray-500 text-center sm:text-left">{TRIAL_DAYS}-day free trial · $0 today · Cancel anytime</p>
        </div>

        <div className="flex justify-center lg:justify-end lg:-mr-12">
          <img
            src="/hero-mockup-540.webp"
            srcSet="/hero-mockup-540.webp 540w, /hero-mockup.webp 900w"
            sizes="(max-width: 1024px) 100vw, 680px"
            width={900}
            height={962}
            fetchPriority="high"
            alt="A Nelsy beauty creator page with bookings, a coaching session and a downloadable guide"
            className="w-[calc(100%+3rem)] max-w-none -mx-6 sm:mx-0 sm:w-full sm:max-w-[480px] lg:w-[min(680px,50vw)] lg:max-w-none h-auto"
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
    <section className="pt-[60px] pb-16 lg:py-[100px] bg-white overflow-hidden">
      <div className={`${WRAP} grid lg:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_640px] gap-7 lg:gap-14 items-center`}>
        <div className="lg:max-w-[440px]">
          <h2 className="font-bold tracking-tight leading-[1.15] mb-5 text-[34px] lg:text-[44px]" style={H2_STYLE}>
            Turn your skills into income.
          </h2>
          <p className="text-base lg:text-lg text-gray-600 leading-[1.7] mb-6">Package what you know into something your followers can book or buy.</p>
          <p className="text-base lg:text-[17px] font-semibold leading-[1.9] mb-8" style={{ color: INK }}>
            A gel-x masterclass. A lash aftercare guide.<br />A monthly glow club.
          </p>
          <button
            type="button"
            onClick={() => scrollToPricing('skills', variant)}
            className={`${BTN} h-[62px] px-7 text-base text-white`}
            style={{ background: INK }}
          >
            Start your page <ArrowDown className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="-mx-6 px-6 sm:mx-0 sm:px-0 flex sm:grid sm:grid-cols-2 gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scroll-px-6 pb-2">
          {EXAMPLES.map((ex) => {
            const demo = TEMPLATE_DEMOS[ex.template];
            return (
              <Link
                key={ex.template}
                to={`/demo?template=${ex.template}`}
                className="group relative shrink-0 w-[82%] sm:w-auto snap-start rounded-[14px] overflow-hidden aspect-[3/4] lg:aspect-square bg-gray-100"
              >
                <img src={demo.cover_url} alt={`${demo.salon_name}, example ${demo.specialty?.toLowerCase()} page`} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 55%)' }} />
                <div className="absolute inset-x-3 bottom-3">
                  <p className="text-white text-xs font-semibold mb-2 px-1">{demo.salon_name} · {demo.specialty}</p>
                  <div className="bg-white rounded-xl p-3 flex items-center gap-3">
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
      <p className={`${WRAP} mt-4 text-xs text-gray-400 lg:text-right`}>Example pages. Tap one to open the live demo.</p>
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
    <section className="py-[55px] lg:py-[75px] overflow-hidden" style={{ background: '#F7F3F5' }}>
      <div className={`${WRAP} grid lg:grid-cols-2 gap-14 items-center`}>
        <div className="lg:max-w-[535px]">
          <h2 className={`${H2} mb-5`} style={H2_STYLE}>
            Now give it a place to sell.
          </h2>
          <p className="text-base lg:text-lg text-gray-600 leading-relaxed mb-8">Your own beauty store. One link. Everything you offer.</p>
          <ul className="space-y-5 mb-10">
            {STEPS.map((s) => (
              <li key={s.title} className="flex gap-3">
                <Check className="w-5 h-5 mt-0.5 shrink-0" style={{ color: PINK }} strokeWidth={3} aria-hidden="true" />
                <div>
                  <p className="font-bold text-base lg:text-lg" style={{ color: INK }}>{s.title}</p>
                  <p className="text-[15px] lg:text-base text-gray-600 leading-relaxed">{s.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => scrollToPricing('place_to_sell', variant)}
            className={`${BTN} h-[61px] px-7 text-[15px] text-white`}
            style={{ background: PINK }}
          >
            Show me the plans
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 -m-10 rounded-full" style={{ background: PINK, opacity: 0.9, transform: 'scale(0.9)' }} aria-hidden="true" />
            {/* Phone frame: 280x514 on mobile, 308x567 on desktop. The 390px wide page preview is
                scaled to the inner width through --s (inner width / 390). */}
            <div className="relative rounded-[40px] border-[10px] overflow-hidden shadow-2xl bg-white w-[280px] h-[514px] lg:w-[308px] lg:h-[567px] [--s:0.6667] lg:[--s:0.7385]" style={{ borderColor: INK }}>
              <div className="pointer-events-none select-none absolute left-0 top-0" style={{ width: 390, height: 741, transform: 'scale(var(--s))', transformOrigin: 'top left' }}>
                <PublicStudioView merchant={demo} mode="preview" />
              </div>
            </div>
          </div>
          <Link to="/demo" className="mt-8 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 min-h-[44px] bg-white rounded-2xl px-5 py-3 shadow-sm text-sm hover:shadow-md transition">
            <span className="font-bold" style={{ color: INK }}>{demo.salon_name}, example page</span>
            <span className="font-semibold inline-flex items-center gap-1" style={{ color: PINK }}>See the live demo <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" /></span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── 4. Pricing ──────────────────────────────────────────────────────────────

function PricingSection({ variant }: { variant: Variant }) {
  return (
    <section id="pricing" className="py-[72px] lg:py-28 bg-white scroll-mt-20">
      <div className="max-w-[1180px] mx-auto px-6 sm:px-8 lg:px-12">
        <PlanPicker
          onStartTrial={(key) => {
            track('landing_cta_clicked', { position: 'pricing', variant, plan: key, action: 'start_trial' });
            trackSeoCTAClicked('/', 'inline', 'Start my free trial');
          }}
          onWaitlist={(tier, interval) => {
            track('landing_cta_clicked', { position: 'pricing', variant, plan: planKey(tier, interval), action: 'waitlist' });
          }}
        />
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
  { q: 'Which plan should I start with?', a: 'Start with Independent to take bookings, deposits and payments from your link in bio today. Creator and Salon are not open yet: join their waitlist from the plans above and we will email you when they open.' },
  { q: 'Can clients pay at the appointment instead of online?', a: 'Yes. For each service you choose pay on arrival, a deposit, or full payment upfront, and you can record cash or card payments taken at the studio.' },
];

function FaqSection() {
  return (
    <section className="py-[60px] lg:py-[86px]" style={{ background: '#F7F3F5' }}>
      <div className={`${WRAP} grid lg:grid-cols-[minmax(0,1fr)_570px] gap-8 lg:gap-24`}>
        <h2 className="font-bold tracking-tight leading-[1.2] text-[32px] lg:text-[38px]" style={H2_STYLE}>
          Your questions, answered
        </h2>
        <div className="divide-y divide-gray-300 border-b border-gray-300">
          {FAQ.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex min-h-[71px] lg:min-h-[75px] items-center justify-between gap-4 py-3 cursor-pointer list-none text-[15px] font-bold" style={{ color: INK }}>
                {f.q}
                <span className="text-2xl font-light transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="pb-5 text-[15px] text-gray-600 leading-relaxed">{f.a}</p>
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
    <section className="py-[65px] lg:py-[85px] text-center text-white" style={{ background: PINK }}>
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-bold tracking-tight leading-[1.15] mb-4 text-[39px] lg:text-[64px]" style={{ letterSpacing: '-0.03em' }}>Start your free trial</h2>
        <p className="text-sm lg:text-base text-white/90 mb-8">Your bookings, courses and products. One link.</p>
        <button
          type="button"
          onClick={() => {
            track('landing_cta_clicked', { position: 'final', variant, action: 'start_trial' });
            trackSeoCTAClicked('/', 'footer_cta', 'Get started');
            navigate(`/onboarding?plan=${planKey('independent', 'yearly')}`);
          }}
          className={`${BTN} h-16 lg:h-[69px] px-[30px] text-base lg:text-[19px]`}
          style={{ background: '#FFFFFF', color: INK }}
        >
          Get started <ArrowRight className="w-5 h-5" aria-hidden="true" />
        </button>
        <p className="mt-4 text-sm text-white/80">{TRIAL_DAYS}-day free trial · $0 today · Cancel anytime</p>
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
            sameAs: ['https://www.instagram.com/nelsy.app'],
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
              price: String(PLANS.independent.monthly),
              priceCurrency: 'USD',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: String(PLANS.independent.monthly),
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
