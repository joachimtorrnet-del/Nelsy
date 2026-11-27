// Shared layout for the audience landings (/use-cases/nail-techs, /beauty-creators, /nail-salons).
// Same design language as the homepage (LandingPremium): 1240px container, bold Inter headings,
// PINK / INK, soft pink hero gradient, pill buttons. Each page brings its own copy and structure.
import { useEffect, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Clock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import SEOMeta from '@/components/SEOMeta';
import SiteNav from '@/components/layout/SiteNav';
import SiteFooter from '@/components/layout/SiteFooter';
import PlanPicker from '@/components/landing/PlanPicker';
import ArticleCard from '@/components/article/ArticleCard';
import { PublicStudioView } from '@/components/studio/PublicStudioView';
import { StudioTitleTag } from '@/components/studio/StudioTitle';
import { STUDIO_TEMPLATES, TEMPLATE_DEMOS } from '@/lib/templateDemos';
import { getArticle, getAudiences } from '@/lib/articleRegistry';
import type { ArticleAudience } from '@/lib/articleRegistry';
import { planKey } from '@/lib/plans';
import { track, trackSeoCTAClicked } from '@/lib/analytics';
import type { Merchant } from '@/types';

const PINK = '#F52B8C';
const INK = '#1A1A1A';
const SOFT = '#F7F3F5';
const TINT = '#FDE8F3';

const WRAP = 'max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12';
const H2 = 'font-bold tracking-tight leading-[1.15] text-[32px] lg:text-[44px]';
const H2_STYLE = { color: INK, letterSpacing: '-0.02em' } as const;
const BTN = 'inline-flex items-center justify-center gap-2.5 rounded-full font-bold transition hover:opacity-90 active:scale-[0.98]';

const ORIGIN = 'https://getnelsy.com';

const unsplash = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=70`;

// ─── Types ───────────────────────────────────────────────────────────────────

/** `to`: a route ("/onboarding"), a mailto: link, or "#pricing" to scroll to the plans. */
export interface Cta { label: string; to: string }

export interface Photo { id: string; alt: string }

export interface Pain { icon: LucideIcon; pain: string; painText: string; fix: string; fixText: string; link?: { label: string; to: string } }

export interface Step { title: string; text: string }

export type Availability = 'today' | 'creator' | 'salon';

export interface FeatureItem { icon: LucideIcon; title: string; text: string; to: string; availability: Availability; linkLabel?: string }

export interface ToolItem { title: string; text: string; to: string }

export interface CompareRow { label: string; today: string | boolean; next: string | boolean }

export interface UpcomingPlanCard {
  name: string;
  price: string;
  priceNote: string;
  points: string[];
  cta: Cta;
}

export interface UseCaseLandingProps {
  path: string;
  /** Short name used in the breadcrumb and analytics, e.g. "Beauty pros". */
  crumb: string;
  seo: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: ReactNode;
    sub: string;
    primary: Cta;
    secondary: Cta;
    note: string;
    checks: string[];
    photo: Photo;
    /** Illustrative notifications around the photo (aria-hidden). */
    chips: { icon: LucideIcon; title: string; text: string; tint: string; color: string }[];
    photoLabel: string;
  };
  /** Optional row of links under the hero ("Built for nail techs, lash techs, ..."). */
  audienceLinks?: { title: string; links: { label: string; to: string }[] };
  pains: { title: string; sub: string; items: Pain[]; photo: Photo };
  steps: { title: string; sub: string; items: Step[]; cta: Cta };
  features: { title: string; sub: string; items: FeatureItem[] };
  tools: { title: string; items: ToolItem[] };
  showcase: { title: string; sub: string; templates: string[]; points: string[] };
  compare?: { title: string; sub: string; todayLabel: string; nextLabel: string; rows: CompareRow[] };
  pricing: { title: string; sub: string; upcoming?: UpcomingPlanCard; pickerTitle: string };
  articles: { title: string; audience: ArticleAudience; slugs: string[] };
  faq: { q: string; a: string }[];
  final: { title: string; sub: string; primary: Cta; secondary: Cta; note: string };
}

// ─── CTA button ──────────────────────────────────────────────────────────────

function CtaButton({ cta, variant, position, path, className = '' }: {
  cta: Cta; variant: 'pink' | 'ink' | 'outline' | 'white' | 'ghost-white'; position: string; path: string; className?: string;
}) {
  const styles: Record<typeof variant, { className: string; style: CSSProperties }> = {
    pink: { className: 'text-white', style: { background: PINK, boxShadow: '0 10px 30px -10px rgba(245,43,140,0.55)' } },
    ink: { className: 'text-white', style: { background: INK } },
    outline: { className: 'bg-white border border-gray-300 hover:border-gray-900', style: { color: INK } },
    white: { className: '', style: { background: '#FFFFFF', color: INK } },
    'ghost-white': { className: 'text-white border border-white/60 hover:border-white', style: {} },
  };
  const s = styles[variant];
  const cls = `${BTN} h-[56px] lg:h-[60px] px-7 text-[15px] lg:text-base ${s.className} ${className}`;
  const onClick = () => {
    track('usecase_cta_clicked', { page: path, position, label: cta.label, target: cta.to });
    trackSeoCTAClicked(path, position === 'final' ? 'footer_cta' : 'inline', cta.label);
  };
  const icon = cta.to.startsWith('#') ? null : <ArrowRight className="w-[18px] h-[18px]" aria-hidden="true" />;

  if (cta.to.startsWith('#')) {
    return (
      <button
        type="button"
        onClick={() => { onClick(); document.getElementById(cta.to.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
        className={cls}
        style={s.style}
      >
        {cta.label}
      </button>
    );
  }
  if (cta.to.startsWith('mailto:') || cta.to.startsWith('http')) {
    return <a href={cta.to} onClick={onClick} className={cls} style={s.style}>{cta.label}{icon}</a>;
  }
  return <Link to={cta.to} onClick={onClick} className={cls} style={s.style}>{cta.label}{icon}</Link>;
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero({ p }: { p: UseCaseLandingProps }) {
  const h = p.hero;
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 110% 85% at 70% 55%, #FFCBD9 0%, #FFD8E4 18%, #FFE5EE 36%, #FFF0F6 55%, #FFF7FA 74%, #FFFBFD 100%)' }}
    >
      <div className={`relative ${WRAP} pt-24 lg:pt-32 pb-14 lg:pb-20 grid lg:grid-cols-[minmax(0,560px)_1fr] gap-12 lg:gap-10 items-center`}>
        <div>
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-1.5 text-[13px] text-gray-500">
              <li><Link to="/" className="hover:text-gray-900 transition">Home</Link></li>
              <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5" /></li>
              <li aria-current="page" className="font-medium text-gray-700">{p.crumb}</li>
            </ol>
          </nav>
          <p className="text-sm lg:text-base font-bold mb-4" style={{ color: PINK }}>{h.eyebrow}</p>
          <h1 className="font-bold tracking-tight leading-[1.08] mb-5 text-[36px] sm:text-[46px] lg:text-[56px]" style={{ color: INK, letterSpacing: '-0.03em' }}>
            {h.title}
          </h1>
          <p className="text-base lg:text-lg text-gray-600 leading-relaxed mb-6 max-w-[500px]">{h.sub}</p>
          <ul className="space-y-2 mb-8">
            {h.checks.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-[15px] font-medium text-gray-800">
                <Check className="w-[18px] h-[18px] mt-0.5 shrink-0" style={{ color: PINK }} strokeWidth={3} aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3">
            <CtaButton cta={h.primary} variant="pink" position="hero" path={p.path} />
            <CtaButton cta={h.secondary} variant="outline" position="hero_secondary" path={p.path} />
          </div>
          <p className="mt-4 text-sm text-gray-500">{h.note}</p>
        </div>

        <div className="relative mx-auto w-full max-w-[420px] lg:max-w-[460px] lg:mr-0">
          <div className="relative overflow-hidden rounded-[28px] bg-gray-200 shadow-[0_40px_80px_-40px_rgba(120,10,60,0.55)] aspect-[4/5]">
            <img
              src={unsplash(h.photo.id, 800, 1000)}
              srcSet={`${unsplash(h.photo.id, 480, 600)} 480w, ${unsplash(h.photo.id, 800, 1000)} 800w, ${unsplash(h.photo.id, 1100, 1375)} 1100w`}
              sizes="(max-width: 1024px) 90vw, 460px"
              width={800}
              height={1000}
              fetchPriority="high"
              decoding="async"
              alt={h.photo.alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 backdrop-blur">{h.photoLabel}</span>
          </div>
          {h.chips.map((c, i) => {
            const Icon = c.icon;
            const pos = [
              '-left-3 sm:-left-10 top-[18%] -rotate-2',
              '-right-3 sm:-right-8 top-[48%] rotate-2',
              '-left-2 sm:-left-6 bottom-[8%] -rotate-1',
            ][i % 3];
            return (
              <div
                key={c.title}
                className={`absolute ${pos} flex items-center gap-2.5 rounded-2xl bg-white py-2.5 pl-2.5 pr-4 shadow-[0_18px_40px_-14px_rgba(26,26,26,0.35)] ring-1 ring-black/5 max-w-[270px]`}
                aria-hidden="true"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: c.tint }}>
                  <Icon className="h-[18px] w-[18px]" style={{ color: c.color }} />
                </span>
                <span className="leading-tight min-w-0">
                  <span className="block text-[13px] font-bold" style={{ color: INK }}>{c.title}</span>
                  <span className="block text-xs text-gray-500 truncate">{c.text}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AudienceLinks({ data }: { data: NonNullable<UseCaseLandingProps['audienceLinks']> }) {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className={`${WRAP} py-6 flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6`}>
        <p className="text-sm font-bold shrink-0" style={{ color: INK }}>{data.title}</p>
        <ul className="flex flex-wrap gap-2">
          {data.links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-3.5 py-1.5 text-sm font-medium text-gray-700 transition hover:border-[#F52B8C] hover:text-[#F52B8C]">
                {l.label} <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── Pain → outcome ──────────────────────────────────────────────────────────

function Pains({ p }: { p: UseCaseLandingProps }) {
  const d = p.pains;
  return (
    <section className="py-16 lg:py-[100px] bg-white">
      <div className={WRAP}>
        <div className="max-w-[720px] mb-10 lg:mb-14">
          <h2 className={`${H2} mb-4`} style={H2_STYLE}>{d.title}</h2>
          <p className="text-base lg:text-lg text-gray-600 leading-relaxed">{d.sub}</p>
        </div>
        <div className="grid lg:grid-cols-[400px_1fr] gap-8 lg:gap-12 items-start">
          <div className="relative overflow-hidden rounded-[22px] bg-gray-200 aspect-[16/11] lg:aspect-[4/5] lg:sticky lg:top-28">
            <img
              src={unsplash(d.photo.id, 800, 1000)}
              srcSet={`${unsplash(d.photo.id, 480, 600)} 480w, ${unsplash(d.photo.id, 800, 1000)} 800w`}
              sizes="(max-width: 1024px) 90vw, 400px"
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
              alt={d.photo.alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <ol className="space-y-5">
            {d.items.map((it, i) => {
              const Icon = it.icon;
              return (
                <li key={it.pain} className="rounded-[22px] border border-gray-200 p-6 lg:p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: TINT }}>
                      <Icon className="h-5 w-5" style={{ color: PINK }} aria-hidden="true" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-gray-400">Problem {i + 1}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5 md:gap-8">
                    <div>
                      <h3 className="text-lg font-bold mb-1.5" style={{ color: INK }}>{it.pain}</h3>
                      <p className="text-[15px] text-gray-500 leading-relaxed">{it.painText}</p>
                    </div>
                    <div className="md:border-l md:border-gray-200 md:pl-8">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] mb-1.5" style={{ color: PINK }}>With Nelsy</p>
                      <p className="text-[17px] font-bold mb-1.5" style={{ color: INK }}>{it.fix}</p>
                      <p className="text-[15px] text-gray-600 leading-relaxed">{it.fixText}</p>
                      {it.link && (
                        <Link to={it.link.to} className="mt-3 inline-flex items-center gap-1 text-sm font-bold hover:underline" style={{ color: PINK }}>
                          {it.link.label} <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

// ─── How it works ────────────────────────────────────────────────────────────

function Steps({ p }: { p: UseCaseLandingProps }) {
  const d = p.steps;
  return (
    <section className="py-16 lg:py-[90px]" style={{ background: SOFT }}>
      <div className={WRAP}>
        <div className="text-center max-w-[640px] mx-auto mb-10 lg:mb-14">
          <h2 className={`${H2} mb-4`} style={H2_STYLE}>{d.title}</h2>
          <p className="text-base lg:text-lg text-gray-600 leading-relaxed">{d.sub}</p>
        </div>
        <ol className="grid md:grid-cols-3 gap-5">
          {d.items.map((s, i) => (
            <li key={s.title} className="rounded-[22px] bg-white p-7 shadow-[0_10px_30px_-20px_rgba(26,26,26,0.25)]">
              <span className="flex h-11 w-11 items-center justify-center rounded-full text-lg font-black text-white mb-5" style={{ background: PINK }}>{i + 1}</span>
              <h3 className="text-lg lg:text-xl font-bold mb-2" style={{ color: INK }}>{s.title}</h3>
              <p className="text-[15px] text-gray-600 leading-relaxed">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex justify-center">
          <CtaButton cta={d.cta} variant="ink" position="steps" path={p.path} />
        </div>
      </div>
    </section>
  );
}

// ─── Features + tools ────────────────────────────────────────────────────────

const AVAILABILITY: Record<Availability, { label: string; bg: string; color: string }> = {
  today: { label: 'Available today', bg: '#DDF5E8', color: '#15803D' },
  creator: { label: 'Creator plan, waitlist open', bg: '#EDE7FE', color: '#6D28D9' },
  salon: { label: 'Salon plan, waitlist open', bg: '#E0EEFB', color: '#1E5A8C' },
};

function Features({ p }: { p: UseCaseLandingProps }) {
  const d = p.features;
  return (
    <section className="py-16 lg:py-[100px] bg-white">
      <div className={WRAP}>
        <div className="max-w-[720px] mb-10 lg:mb-12">
          <h2 className={`${H2} mb-4`} style={H2_STYLE}>{d.title}</h2>
          <p className="text-base lg:text-lg text-gray-600 leading-relaxed">{d.sub}</p>
        </div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {d.items.map((f) => {
            const Icon = f.icon;
            const a = AVAILABILITY[f.availability];
            const cardClass = 'group flex h-full flex-col rounded-[22px] border border-gray-200 p-6 transition hover:border-[#F52B8C] hover:shadow-[0_18px_40px_-24px_rgba(245,43,140,0.45)]';
            const body = (
              <>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: TINT }}>
                      <Icon className="h-5 w-5" style={{ color: PINK }} aria-hidden="true" />
                    </span>
                    <span className="rounded-full px-2.5 py-1 text-[11px] font-bold" style={{ background: a.bg, color: a.color }}>{a.label}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: INK }}>{f.title}</h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed flex-1">{f.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold" style={{ color: PINK }}>
                    {f.linkLabel ?? 'Learn more'} <ArrowRight className="w-3.5 h-3.5 transition group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
              </>
            );
            return (
              <li key={f.title}>
                {f.to.startsWith('#') ? (
                  <a
                    href={f.to}
                    onClick={(e) => { e.preventDefault(); document.getElementById(f.to.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                    className={cardClass}
                  >
                    {body}
                  </a>
                ) : (
                  <Link to={f.to} className={cardClass}>{body}</Link>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-14 rounded-[26px] p-6 lg:p-10" style={{ background: SOFT }}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <h3 className="text-2xl lg:text-[28px] font-bold tracking-tight" style={{ color: INK }}>{p.tools.title}</h3>
            <Link to="/tools" className="text-sm font-bold inline-flex items-center gap-1 hover:underline" style={{ color: PINK }}>
              All free tools <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {p.tools.items.map((t) => (
              <li key={t.to}>
                <Link to={t.to} className="group flex h-full items-start justify-between gap-3 rounded-2xl bg-white p-5 transition hover:shadow-[0_10px_30px_-18px_rgba(26,26,26,0.35)]">
                  <span>
                    <span className="block font-bold text-[15px] mb-1" style={{ color: INK }}>{t.title}</span>
                    <span className="block text-sm text-gray-500 leading-snug">{t.text}</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 mt-1 shrink-0 text-gray-400 transition group-hover:text-gray-900" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─── Example page showcase ───────────────────────────────────────────────────

function PhoneFrame({ merchant }: { merchant: Merchant }) {
  return (
    <div
      className="relative w-[268px] h-[540px] lg:w-[300px] lg:h-[604px] rounded-[46px] lg:rounded-[52px] p-[9px] lg:p-[10px] [--s:0.641] lg:[--s:0.718]"
      style={{
        background: 'linear-gradient(150deg, #55555a 0%, #1d1d1f 22%, #2b2b2e 60%, #6a6a70 100%)',
        boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.22), inset 0 0 0 4px #111, 0 60px 90px -40px rgba(120,10,60,0.55), 0 35px 60px -30px rgba(0,0,0,0.5)',
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[37px] lg:rounded-[42px] bg-white">
        <div className="relative z-10 flex h-[34px] lg:h-[38px] items-center justify-between bg-white px-6 text-[11px] font-semibold" style={{ color: INK }} aria-hidden="true">
          <span>9:41</span>
          <span className="ml-1 h-[10px] w-[20px] rounded-[3px] border border-current p-[1px]"><span className="block h-full w-3/4 rounded-[1px] bg-current" /></span>
          <span className="absolute left-1/2 top-[8px] h-[22px] lg:h-[24px] w-[80px] lg:w-[90px] -translate-x-1/2 rounded-full bg-black" />
        </div>
        <div className="pointer-events-none select-none absolute left-0 top-[34px] lg:top-[38px]" style={{ width: 390, height: 900, transform: 'scale(var(--s))', transformOrigin: 'top left' }} aria-hidden="true" inert>
          {/* This page has its own h1: the studio name renders as a <p> here. */}
          <StudioTitleTag.Provider value="p">
            <PublicStudioView merchant={merchant} mode="preview" />
          </StudioTitleTag.Provider>
        </div>
      </div>
    </div>
  );
}

function Showcase({ p }: { p: UseCaseLandingProps }) {
  const d = p.showcase;
  const [id, setId] = useState(d.templates[0]);
  const template = STUDIO_TEMPLATES.find((t) => t.id === id) ?? STUDIO_TEMPLATES[0];
  const merchant: Merchant = { ...TEMPLATE_DEMOS[template.id], theme_preset: template.themeId, color_accent: template.accentColor };
  const demoHref = template.id === 'classic' ? '/demo' : `/demo?template=${template.id}`;
  return (
    <section className="py-16 lg:py-[90px] overflow-hidden" style={{ background: SOFT }}>
      <div className={`${WRAP} grid lg:grid-cols-2 gap-12 lg:gap-14 items-center`}>
        <div className="lg:max-w-[520px]">
          <h2 className={`${H2} mb-4`} style={H2_STYLE}>{d.title}</h2>
          <p className="text-base lg:text-lg text-gray-600 leading-relaxed mb-6">{d.sub}</p>
          <p className="text-sm font-bold mb-3" style={{ color: INK }}>Example pages</p>
          <div className="flex flex-wrap gap-2 mb-7" role="group" aria-label="Choose an example page">
            {d.templates.map((t) => {
              const m = TEMPLATE_DEMOS[t];
              const active = t === id;
              return (
                <button
                  key={t}
                  type="button"
                  aria-pressed={active}
                  onClick={() => { setId(t); track('usecase_showcase_switched', { page: p.path, template: t }); }}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${active ? 'text-white' : 'bg-white text-gray-700 hover:text-gray-900'}`}
                  style={active ? { background: INK } : undefined}
                >
                  {m.salon_name}
                </button>
              );
            })}
          </div>
          <ul className="space-y-3 mb-8">
            {d.points.map((pt) => (
              <li key={pt} className="flex items-start gap-2.5 text-[15px] text-gray-700">
                <Check className="w-[18px] h-[18px] mt-0.5 shrink-0" style={{ color: PINK }} strokeWidth={3} aria-hidden="true" />
                {pt}
              </li>
            ))}
          </ul>
          <Link
            to={demoHref}
            onClick={() => track('usecase_cta_clicked', { page: p.path, position: 'showcase', target: demoHref })}
            className={`${BTN} h-[56px] px-7 text-[15px] text-white`}
            style={{ background: INK }}
          >
            Open the live demo <ArrowUpRight className="w-[18px] h-[18px]" aria-hidden="true" />
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-[400px] lg:max-w-[520px] h-[600px] lg:h-[660px] flex items-center justify-center">
            <div
              className="absolute left-1/2 top-[54%] h-[320px] w-[320px] lg:h-[440px] lg:w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: 'radial-gradient(circle at 32% 28%, #FF8CC3 0%, #F52B8C 55%, #DD1477 100%)' }}
              aria-hidden="true"
            />
            <div className="relative transition hover:-translate-y-1">
              <PhoneFrame merchant={merchant} />
              <Link to={demoHref} aria-label={`Open the ${merchant.salon_name} example page in the live demo`} className="absolute inset-0 rounded-[46px] lg:rounded-[52px]" />
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500 text-center">
            <span className="font-bold" style={{ color: INK }}>{merchant.salon_name}</span>, example page ({(merchant.specialty ?? "").toLowerCase()})
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Today vs upcoming plan ──────────────────────────────────────────────────

function Cell({ v }: { v: string | boolean }) {
  if (v === true) return <Check className="w-5 h-5" style={{ color: '#15803D' }} strokeWidth={3} aria-label="Yes" />;
  if (v === false) return <span className="text-gray-300 font-bold" aria-label="No">-</span>;
  return <span className="text-sm text-gray-700">{v}</span>;
}

function Compare({ p }: { p: UseCaseLandingProps }) {
  const d = p.compare;
  if (!d) return null;
  return (
    <section className="py-16 lg:py-[90px] bg-white">
      <div className="max-w-[960px] mx-auto px-6 sm:px-8">
        <div className="text-center max-w-[680px] mx-auto mb-10">
          <h2 className={`${H2} mb-4`} style={H2_STYLE}>{d.title}</h2>
          <p className="text-base lg:text-lg text-gray-600 leading-relaxed">{d.sub}</p>
        </div>
        <div className="overflow-hidden rounded-[22px] border border-gray-200">
          <table className="w-full text-left">
            <thead>
              <tr style={{ background: SOFT }}>
                <th scope="col" className="p-3 sm:p-4 lg:px-6 text-sm font-bold" style={{ color: INK }}>What you need</th>
                <th scope="col" className="p-3 sm:p-4 lg:px-6 text-sm font-bold w-[30%]" style={{ color: '#15803D' }}>{d.todayLabel}</th>
                <th scope="col" className="p-3 sm:p-4 lg:px-6 text-sm font-bold w-[30%]" style={{ color: PINK }}>{d.nextLabel}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {d.rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="p-3 sm:p-4 lg:px-6 text-sm sm:text-[15px] font-semibold" style={{ color: INK }}>{r.label}</th>
                  <td className="p-3 sm:p-4 lg:px-6"><Cell v={r.today} /></td>
                  <td className="p-3 sm:p-4 lg:px-6"><Cell v={r.next} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ─────────────────────────────────────────────────────────────────

function Pricing({ p }: { p: UseCaseLandingProps }) {
  const d = p.pricing;
  const u = d.upcoming;
  return (
    <section id="pricing" className="py-16 lg:py-[100px] scroll-mt-20" style={{ background: u ? SOFT : '#FFFFFF' }}>
      <div className="max-w-[1180px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-[680px] mx-auto mb-10">
          <h2 className={`${H2} mb-4`} style={H2_STYLE}>{d.title}</h2>
          <p className="text-base lg:text-lg text-gray-600 leading-relaxed">{d.sub}</p>
        </div>
        {u && (
          <div className="mx-auto mb-12 max-w-[860px] rounded-[26px] p-7 lg:p-10 text-white" style={{ background: INK }}>
            <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <p className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold mb-4">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" /> Waitlist open
                </p>
                <h3 className="text-2xl lg:text-[30px] font-bold tracking-tight mb-1">{u.name}</h3>
                <p className="text-lg font-semibold mb-1">{u.price}</p>
                <p className="text-sm text-white/70 mb-5">{u.priceNote}</p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                  {u.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-[15px] text-white/90">
                      <Check className="w-4 h-4 mt-1 shrink-0" style={{ color: '#FF8CC3' }} strokeWidth={3} aria-hidden="true" /> {pt}
                    </li>
                  ))}
                </ul>
              </div>
              <CtaButton cta={u.cta} variant="pink" position="pricing_waitlist" path={p.path} />
            </div>
          </div>
        )}
        <PlanPicker
          title={d.pickerTitle}
          onStartTrial={(key) => {
            track('usecase_cta_clicked', { page: p.path, position: 'pricing', plan: key, action: 'start_trial' });
            trackSeoCTAClicked(p.path, 'inline', 'Start my free trial');
          }}
          onWaitlist={(tier, interval) => {
            track('usecase_cta_clicked', { page: p.path, position: 'pricing', plan: planKey(tier, interval), action: 'waitlist' });
          }}
        />
      </div>
    </section>
  );
}

// ─── Articles ────────────────────────────────────────────────────────────────

function Articles({ p }: { p: UseCaseLandingProps }) {
  const d = p.articles;
  const items = d.slugs
    .map((s) => getArticle(s))
    .filter((a): a is NonNullable<typeof a> => !!a && getAudiences(a).includes(d.audience));
  if (!items.length) return null;
  return (
    <section className="py-16 lg:py-[90px] bg-white">
      <div className={WRAP}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <h2 className={H2} style={H2_STYLE}>{d.title}</h2>
          <Link to={`/blog?audience=${d.audience}`} className="text-sm font-bold inline-flex items-center gap-1 hover:underline shrink-0" style={{ color: PINK }}>
            More guides <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.slice(0, 3).map((a) => <ArticleCard key={a.slug} article={a} />)}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ + final CTA ─────────────────────────────────────────────────────────

function Faq({ p }: { p: UseCaseLandingProps }) {
  return (
    <section className="py-[60px] lg:py-[86px]" style={{ background: SOFT }}>
      <div className={`${WRAP} grid lg:grid-cols-[minmax(0,1fr)_600px] gap-8 lg:gap-24`}>
        <h2 className="font-bold tracking-tight leading-[1.2] text-[32px] lg:text-[38px]" style={H2_STYLE}>
          Questions from {p.crumb.toLowerCase()}
        </h2>
        <div className="divide-y divide-gray-300 border-b border-gray-300">
          {p.faq.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex min-h-[71px] items-center justify-between gap-4 py-3 cursor-pointer list-none text-[15px] font-bold" style={{ color: INK }}>
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

function FinalCta({ p }: { p: UseCaseLandingProps }) {
  const d = p.final;
  return (
    <section className="py-[65px] lg:py-[85px] text-center text-white" style={{ background: PINK }}>
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-bold tracking-tight leading-[1.12] mb-4 text-[36px] lg:text-[56px]" style={{ letterSpacing: '-0.03em' }}>{d.title}</h2>
        <p className="text-base lg:text-lg text-white/90 mb-8">{d.sub}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <CtaButton cta={d.primary} variant="white" position="final" path={p.path} />
          <CtaButton cta={d.secondary} variant="ghost-white" position="final_secondary" path={p.path} />
        </div>
        <p className="mt-5 text-sm text-white/80">{d.note}</p>
      </div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function UseCaseLanding(props: UseCaseLandingProps) {
  const p = props;
  useEffect(() => {
    document.dispatchEvent(new Event('render-complete'));
  }, []);

  const url = `${ORIGIN}${p.path}`;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: p.seo.title,
      description: p.seo.description,
      url,
      isPartOf: { '@type': 'WebSite', name: 'Nelsy', url: ORIGIN },
      about: { '@type': 'SoftwareApplication', name: 'Nelsy', applicationCategory: 'BusinessApplication', operatingSystem: 'Web' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: p.crumb, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: p.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  return (
    <div className="font-sans min-h-screen bg-white antialiased">
      <SEOMeta title={p.seo.title} description={p.seo.description} canonical={p.path} jsonLd={jsonLd} />
      <SiteNav />
      <main>
        <Hero p={p} />
        {p.audienceLinks && <AudienceLinks data={p.audienceLinks} />}
        <Pains p={p} />
        <Steps p={p} />
        <Features p={p} />
        <Showcase p={p} />
        <Compare p={p} />
        <Pricing p={p} />
        <Articles p={p} />
        <Faq p={p} />
        <FinalCta p={p} />
      </main>
      <SiteFooter />
    </div>
  );
}
