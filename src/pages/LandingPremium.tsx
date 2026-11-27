import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import posthog from 'posthog-js';
import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, CalendarCheck, Check, CreditCard } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
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

// ─── 2. Skills into income: three personas ───────────────────────────────────
// Same composition as stan.store's "Turn what you know into what you earn." (1440: one tall card on
// the left, two stacked on the right; 390: swipe row). Illustrative personas, one per audience
// (nail tech, nail tech who sells a guide, nail salon): no names, numbers or quotes, and each card
// carries a discreet "Example" marker. Photos: Unsplash (Unsplash License), hotlinked.

const unsplash = (id: string, w: number, h?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=70`;
const unsplashSet = (id: string, widths: number[]) => widths.map((w) => `${unsplash(id, w)} ${w}w`).join(', ');

interface Persona {
  key: string;
  label: string;
  photo: string;
  photoAlt: string;
  photoSize: [number, number];
  /** object-position of the photo, so the face stays in frame at every card size. */
  focus: string;
  thumb: 'photo' | 'guide' | 'team';
  thumbPhoto?: string;
  thumbAlt?: string;
  offerType: string;
  offer: string;
  href: string;
  /** Size and position of the card in the desktop collage (measured on stan.store at 1440). */
  desktop: string;
}

const PERSONAS: Persona[] = [
  {
    key: 'pro',
    label: 'Nail tech · Bookings',
    photo: '1666226399043-bbb245d216d0',
    photoAlt: 'Smiling nail tech with mint nails at her station, next to a UV nail lamp',
    photoSize: [1200, 1800],
    focus: '50% 18%',
    thumb: 'photo',
    thumbPhoto: '1610992015762-45dca7fa3a85',
    thumbAlt: 'Nude gel nail set',
    offerType: 'Booking · Deposit',
    offer: 'Gel-X full set',
    href: '/use-cases/nail-techs',
    desktop: 'xl:left-0 xl:top-[45px] xl:w-[324px] xl:h-[476px]',
  },
  {
    key: 'creator',
    label: 'Nail tech · Creator',
    photo: '1642449687759-afab6f0ebc1c',
    photoAlt: 'Smiling nail tech framing her face with her nail art for the camera',
    photoSize: [1200, 1500],
    focus: '50% 22%',
    thumb: 'guide',
    thumbPhoto: '1772322586785-3a34772cbc61',
    offerType: 'Digital guide',
    offer: 'Gel-X at home: the full guide',
    href: '/use-cases/beauty-creators',
    desktop: 'xl:left-[340px] xl:top-0 xl:w-[296px] xl:h-[270px]',
  },
  {
    key: 'salon',
    label: 'Nail salon · Team',
    photo: '1666226398826-5b7ae0111e9a',
    photoAlt: 'Pink nail salon where a nail tech works while a client smiles',
    photoSize: [1800, 1200],
    focus: '45% 30%',
    thumb: 'team',
    offerType: 'Team booking',
    offer: 'Book with your nail tech',
    href: '/use-cases/nail-salons',
    desktop: 'xl:left-[352px] xl:top-[286px] xl:w-[296px] xl:h-[270px]',
  },
];

const TEAM = [
  { i: 'A', bg: '#F9C6DC', pos: 'left-[3px] top-[4px]' },
  { i: 'M', bg: '#FBD9B5', pos: 'right-[3px] top-[4px]' },
  { i: 'J', bg: '#CFE3F7', pos: 'left-1/2 -translate-x-1/2 bottom-[3px]' },
];

function PersonaThumb({ p }: { p: Persona }) {
  if (p.thumb === 'team') {
    return (
      <span className="relative h-[46px] w-[46px] shrink-0 rounded-md" style={{ background: '#FDE8F3' }} aria-hidden="true">
        {TEAM.map((m) => (
          <span key={m.i} className={`absolute ${m.pos} flex h-[20px] w-[20px] items-center justify-center rounded-full text-[9px] font-bold ring-2 ring-white`} style={{ background: m.bg, color: INK }}>{m.i}</span>
        ))}
      </span>
    );
  }
  if (p.thumb === 'guide' && p.thumbPhoto) {
    // A small guide cover: nail photo on top, title band below.
    return (
      <span className="relative flex h-[46px] w-[46px] shrink-0 flex-col overflow-hidden rounded-md shadow-[0_1px_3px_rgba(0,0,0,0.2)]" aria-hidden="true">
        <img
          src={unsplash(p.thumbPhoto, 100, 70)}
          srcSet={`${unsplash(p.thumbPhoto, 100, 70)} 100w, ${unsplash(p.thumbPhoto, 200, 140)} 200w`}
          sizes="46px"
          width={100}
          height={70}
          loading="lazy"
          decoding="async"
          alt="Gel-X at home guide cover"
          className="h-[30px] w-full object-cover"
        />
        <span className="flex flex-1 flex-col justify-center px-[3px] leading-none text-white" style={{ background: PINK }}>
          <span className="block text-[6px] font-black uppercase tracking-tight">Gel-X</span>
          <span className="block text-[5px] font-bold uppercase">at home</span>
        </span>
      </span>
    );
  }
  return (
    <img
      src={unsplash(p.thumbPhoto ?? '', 100, 100)}
      srcSet={`${unsplash(p.thumbPhoto ?? '', 100, 100)} 100w, ${unsplash(p.thumbPhoto ?? '', 200, 200)} 200w`}
      sizes="46px"
      width={100}
      height={100}
      loading="lazy"
      decoding="async"
      alt={p.thumbAlt ?? ''}
      className="h-[46px] w-[46px] shrink-0 rounded-md object-cover"
    />
  );
}

function PersonaCard({ p }: { p: Persona }) {
  return (
    <Link
      to={p.href}
      onClick={() => track('landing_cta_clicked', { position: 'personas', persona: p.key, action: 'use_case' })}
      aria-label={`${p.label}: ${p.offer}. See how it works`}
      className={`group relative block shrink-0 snap-start overflow-hidden rounded-xl bg-gray-200 w-[282px] h-[380px] xl:absolute ${p.desktop} transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_44px_-24px_rgba(26,26,26,0.55)]`}
    >
      <img
        src={unsplash(p.photo, 640)}
        srcSet={unsplashSet(p.photo, [400, 640, 900])}
        sizes="(max-width: 1279px) 282px, 324px"
        width={p.photoSize[0]}
        height={p.photoSize[1]}
        loading="lazy"
        decoding="async"
        alt={p.photoAlt}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
        style={{ objectPosition: p.focus }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(20,14,22,0.78) 0%, rgba(20,14,22,0.35) 32%, rgba(20,14,22,0) 55%)' }} aria-hidden="true" />
      <span className="absolute left-2.5 top-2.5 rounded bg-black/20 px-1.5 py-0.5 text-[10px] font-medium text-white/70">Example</span>

      <div className="absolute inset-x-3 bottom-4">
        <p className="mb-2 text-[11px] font-semibold text-white" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>{p.label}</p>
        <div className="relative flex items-center gap-3 rounded-lg bg-white py-2.5 pl-2.5 pr-8 min-h-[84px]">
          <PersonaThumb p={p} />
          <div className="min-w-0">
            <span className="inline-block rounded px-1.5 py-0.5 text-[10px] font-bold" style={{ background: '#FDE8F3', color: PINK }}>{p.offerType}</span>
            <p className="mt-1.5 text-[13px] font-bold leading-[1.35]" style={{ color: INK }}>{p.offer}</p>
          </div>
          <ArrowUpRight className="absolute bottom-3 right-3 h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" style={{ color: PINK }} aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}

function SkillsSection({ variant }: { variant: Variant }) {
  return (
    <section className="pt-[60px] pb-16 lg:py-[100px] bg-white overflow-hidden">
      <div className={`${WRAP} grid xl:grid-cols-[minmax(0,1fr)_648px] gap-10 xl:gap-12 items-center`}>
        <div className="max-w-[520px] xl:max-w-[440px]">
          <h2 className="font-bold tracking-tight leading-[1.08] mb-6 text-[36px] lg:text-[48px]" style={{ color: INK, letterSpacing: '-0.035em' }}>
            Turn your skills<br /> into income.
          </h2>
          <p className="text-[17px] lg:text-lg text-gray-500 leading-[1.7] mb-6 max-w-[340px] lg:max-w-[360px]">Your services, your know-how and your team, ready to book or buy.</p>
          <p className="text-[17px] font-semibold leading-[1.9] mb-8" style={{ color: INK }}>
            A gel set with a deposit.<br />A nail guide your followers buy.<br />A whole nail salon on one link.
          </p>
          <button
            type="button"
            onClick={() => scrollToPricing('skills', variant)}
            className={`${BTN} h-[62px] pl-7 pr-6 gap-8 text-base text-white`}
            style={{ background: INK }}
          >
            Start your page <ArrowDown className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="-mx-6 px-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 xl:mx-0 xl:px-0 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-6 sm:scroll-px-8 lg:scroll-px-12 pb-4 xl:pb-0 xl:block xl:relative xl:h-[556px] xl:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {PERSONAS.map((p) => <PersonaCard key={p.key} p={p} />)}
        </div>
      </div>
    </section>
  );
}

// ─── 3. A place to sell ──────────────────────────────────────────────────────

const STEPS = [
  { title: 'Make it yours.', text: 'Pick a template, add your photos and colors, and put your services and products front and center.' },
  { title: 'Share it everywhere.', text: 'Put your link in your Instagram and TikTok bio, your stories, your DMs and your emails.' },
  { title: 'Nelsy handles the rest.', text: 'Booking, deposits or pay on arrival, checkout and delivery in one place, so you can spend more time on your craft.' },
];

// Illustrative notifications floating around the phone (the page itself is labeled as an example).
const CHIPS: { icon: LucideIcon; tint: string; color: string; title: string; text: string; pos: string }[] = [
  { icon: CalendarCheck, tint: '#FDE8F3', color: PINK, title: 'New booking', text: 'Signature set · Sat 10:30', pos: 'left-0 top-[24%] lg:-left-2 lg:top-[13%] -rotate-2' },
  { icon: CreditCard, tint: '#DDF5E8', color: '#16A34A', title: 'Deposit received', text: '$15 for Signature set', pos: 'right-0 top-[50%] lg:-right-4 lg:top-[45%] rotate-2' },
  { icon: BookOpen, tint: '#EDE7FE', color: '#7C3AED', title: 'Guide sold', text: 'Nail care at home', pos: 'left-1 bottom-[9%] lg:left-0 lg:bottom-[10%] -rotate-1' },
];

function PhoneMockup({ merchant }: { merchant: Merchant }) {
  return (
    // Frame 268x540 on mobile, 308x620 on desktop. The 390px wide page is scaled to the screen width
    // through --s (screen width / 390).
    <div
      className="relative transition-transform duration-300 group-hover:-translate-y-1.5 w-[268px] h-[540px] lg:w-[308px] lg:h-[620px] rounded-[46px] lg:rounded-[54px] p-[9px] lg:p-[11px] [--s:0.641] lg:[--s:0.7333] rotate-[5deg]"
      style={{
        background: 'linear-gradient(150deg, #55555a 0%, #1d1d1f 22%, #2b2b2e 60%, #6a6a70 100%)',
        boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.22), inset 0 0 0 4px #111, 0 60px 90px -40px rgba(120,10,60,0.55), 0 35px 60px -30px rgba(0,0,0,0.5)',
      }}
    >
      {/* Side buttons */}
      <span className="absolute -left-[3px] top-[96px] lg:top-[112px] h-7 w-[3px] rounded-l bg-[#3a3a3e]" aria-hidden="true" />
      <span className="absolute -left-[3px] top-[140px] lg:top-[160px] h-12 w-[3px] rounded-l bg-[#3a3a3e]" aria-hidden="true" />
      <span className="absolute -left-[3px] top-[198px] lg:top-[222px] h-12 w-[3px] rounded-l bg-[#3a3a3e]" aria-hidden="true" />
      <span className="absolute -right-[3px] top-[160px] lg:top-[180px] h-16 w-[3px] rounded-r bg-[#3a3a3e]" aria-hidden="true" />

      <div className="relative h-full w-full overflow-hidden rounded-[37px] lg:rounded-[43px] bg-white">
        {/* Status bar and island */}
        <div className="relative z-10 flex h-[34px] lg:h-[40px] items-center justify-between bg-white px-6 text-[11px] font-semibold" style={{ color: INK }} aria-hidden="true">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="flex items-end gap-[1.5px]">
              {[4, 6, 8, 10].map((h) => <span key={h} className="w-[2.5px] rounded-sm bg-current" style={{ height: h }} />)}
            </span>
            <span className="ml-1 h-[10px] w-[20px] rounded-[3px] border border-current p-[1px]"><span className="block h-full w-3/4 rounded-[1px] bg-current" /></span>
          </span>
          <span className="absolute left-1/2 top-[8px] h-[22px] lg:h-[25px] w-[80px] lg:w-[92px] -translate-x-1/2 rounded-full bg-black" />
        </div>
        <div className="pointer-events-none select-none absolute left-0 top-[34px] lg:top-[40px]" style={{ width: 390, height: 900, transform: 'scale(var(--s))', transformOrigin: 'top left' }}>
          <PublicStudioView merchant={merchant} mode="preview" />
        </div>
        {/* Glass reflection */}
        <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(115deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 32%)' }} aria-hidden="true" />
      </div>
    </div>
  );
}

function PlaceToSellSection({ variant }: { variant: Variant }) {
  const template = STUDIO_TEMPLATES.find((t) => t.id === 'classic') ?? STUDIO_TEMPLATES[0];
  const demo: Merchant = { ...TEMPLATE_DEMOS[template.id], theme_preset: template.themeId, color_accent: template.accentColor };
  return (
    <section className="py-[55px] lg:py-[75px] overflow-hidden" style={{ background: '#F7F3F5' }}>
      <div className={`${WRAP} grid lg:grid-cols-2 gap-12 lg:gap-14 items-center`}>
        <div className="lg:max-w-[535px]">
          <h2 className={`${H2} mb-5`} style={H2_STYLE}>
            Now give it<br /> a place to sell.
          </h2>
          <p className="text-base lg:text-lg text-gray-600 leading-relaxed mb-8">Your own beauty store. One link. Everything you offer.</p>
          <ul className="space-y-6 mb-10">
            {STEPS.map((s) => (
              <li key={s.title} className="flex gap-3">
                <Check className="w-5 h-5 mt-0.5 shrink-0" style={{ color: PINK }} strokeWidth={3} aria-hidden="true" />
                <div>
                  <p className="font-bold text-base lg:text-lg" style={{ color: INK }}>{s.title}</p>
                  <p className="mt-1 text-[15px] lg:text-base text-gray-600 leading-relaxed">{s.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => scrollToPricing('place_to_sell', variant)}
            className={`${BTN} h-[61px] px-7 text-[15px] text-white`}
            style={{ background: PINK, boxShadow: '0 10px 30px -10px rgba(245,43,140,0.55)' }}
          >
            Show me the plans
          </button>
        </div>

        <div className="flex flex-col items-center">
          <Link
            to="/demo"
            onClick={() => track('landing_cta_clicked', { position: 'place_to_sell_phone', variant, action: 'demo' })}
            aria-label="Open the live demo page"
            className="group relative w-full max-w-[400px] lg:max-w-[540px] h-[600px] lg:h-[690px] flex items-center justify-center"
          >
            {/* Pink disc behind the phone */}
            <div
              className="absolute left-1/2 top-[56%] h-[330px] w-[330px] lg:h-[460px] lg:w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: 'radial-gradient(circle at 32% 28%, #FF8CC3 0%, #F52B8C 55%, #DD1477 100%)' }}
              aria-hidden="true"
            />
            <PhoneMockup merchant={demo} />
            {CHIPS.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className={`absolute ${c.pos} flex items-center gap-2.5 rounded-2xl bg-white py-2.5 pl-2.5 pr-4 shadow-[0_18px_40px_-14px_rgba(26,26,26,0.3)] ring-1 ring-black/5 scale-[0.88] lg:scale-100 origin-center`}
                  aria-hidden="true"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: c.tint }}>
                    <Icon className="h-[18px] w-[18px]" style={{ color: c.color }} />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[13px] font-bold" style={{ color: INK }}>{c.title}</span>
                    <span className="block text-xs text-gray-500">{c.text}</span>
                  </span>
                </div>
              );
            })}
          </Link>
          <Link to="/demo" onClick={() => track('landing_cta_clicked', { position: 'place_to_sell_demo', variant, action: 'demo' })} className="mt-6 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-1 min-h-[52px] bg-white rounded-2xl px-6 py-3 shadow-[0_6px_20px_-10px_rgba(26,26,26,0.2)] text-sm hover:shadow-[0_10px_26px_-10px_rgba(26,26,26,0.3)] transition">
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
            track('landing_cta_clicked', { position: 'pricing', variant, plan: key, action: 'trial' });
            trackSeoCTAClicked('/', 'inline', 'Continue with Independent');
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
  {
    q: 'Which plan should I start with?',
    a: 'Start with Independent, the plan available today: bookings, deposits, online payments and reminders from your link in bio, free for 14 days. Creator (guides, courses, memberships and email marketing) and Salon (your whole team on one page) are not open yet. Select one in the plans above to join its waitlist and we will email you when it opens.',
  },
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
