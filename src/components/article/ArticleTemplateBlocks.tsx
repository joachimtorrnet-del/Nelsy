/**
 * Blocks the blog article template adds around and inside every article
 * (Stan-style anatomy, see docs/blog-stan-anatomy.md): mid-article CTA,
 * sidebar CTA, free tools box, Nelsy feature links, inline "keep reading",
 * auto-inserted photos, plus the read-time estimate.
 */
import { Children, cloneElement, isValidElement } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, CalendarCheck, ArrowRight } from 'lucide-react';
import type { Article, ArticleCategory } from '@/lib/articles';
import { CORE_TOOLS, TOOL_LINKS, PAGE_LINKS, CATEGORY_LINKS, coverPhotoFor, pickArticlePhotos } from '@/lib/blogLinks';
import type { PagePath, ToolPath } from '@/lib/blogLinks';
import { ArticleImage, HeroMockupImage, TRIAL_PATH } from './ArticleBodyComponents';

const PINK = '#F52B8C';

// ─── Copy per category for the mid-article CTA (no claims beyond the product) ──

const MID_CTA_COPY: Partial<Record<ArticleCategory, { title: string; body: string }>> = {
  'pricing-money': { title: 'Get paid upfront for your time', body: 'Set a deposit or full payment per service. Clients pay when they book on your Nelsy page.' },
  'policies-clients': { title: 'Put your policy where clients book', body: 'Show your policy on your Nelsy booking page and take a deposit with every booking.' },
  'booking-software': { title: 'A booking page made for beauty pros', body: 'Services, deposits, payments and your client list on one link.' },
  comparisons: { title: 'Compare it yourself for 14 days', body: 'Set up your services, deposits and booking link on Nelsy, then decide.' },
  'instagram-content': { title: 'Turn your posts into bookings', body: 'Put one Nelsy link in your bio: clients pick a service, a time and pay a deposit.' },
  'get-clients': { title: 'Make it easy for new clients to book', body: 'One link with your services, prices and free slots. No more back and forth in DMs.' },
  'beauty-creators': { title: 'Start with bookings on one link', body: 'Put your services, deposits and payments behind your link in bio. Selling guides and courses is part of the upcoming Creator plan.' },
  salons: { title: 'Try it on your own chair first', body: 'Nelsy is built for independent pros today: services, deposits and payments on one booking link. Team features are part of the upcoming Salon plan.' },
};
const DEFAULT_MID_CTA = { title: 'Your booking page, ready in minutes', body: 'Clients book and pay a deposit from your link in bio. You keep your schedule in one place.' };

export function ArticleMidCTA({ category, onClick }: { category: ArticleCategory; onClick?: () => void }) {
  const copy = MID_CTA_COPY[category] ?? DEFAULT_MID_CTA;
  return (
    <aside aria-label="Try Nelsy" className="not-prose relative overflow-hidden rounded-3xl bg-[#FDF0F7] border border-[#F4C2C2]">
      <span className="absolute top-0 left-0 rounded-br-2xl bg-[#F52B8C] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
        Nelsy
      </span>
      <div className="grid sm:grid-cols-[1fr_260px] items-center gap-6 sm:gap-4 px-5 pb-7 pt-12 sm:p-8 sm:pt-12">
        <div>
          <p className="font-serif text-2xl font-bold text-[#1A1A1A] leading-tight mb-2">{copy.title}</p>
          <p className="text-[15px] sm:text-sm text-gray-700 leading-relaxed mb-5">{copy.body}</p>
          <Link
            to={TRIAL_PATH}
            onClick={onClick}
            className="inline-flex min-h-[48px] sm:min-h-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: PINK }}
          >
            Start your free trial <ArrowRight size={15} aria-hidden />
          </Link>
          <p className="mt-3 text-xs text-gray-500">14 days free, then $29/month. 0% Nelsy commission.</p>
        </div>
        <HeroMockupImage className="justify-self-center" />
      </div>
    </aside>
  );
}

export function ArticleSidebarCTA({ onClick }: { onClick?: () => void }) {
  return (
    <div className="rounded-2xl bg-[#1A1A1A] p-5 text-white">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#F52B8C] mb-2">Nelsy</p>
      <p className="font-serif text-lg font-bold leading-snug mb-2">Bookings and deposits from your link in bio</p>
      <p className="text-xs text-white/70 leading-relaxed mb-4">14-day free trial, then $29/month. 0% Nelsy commission.</p>
      <Link
        to={TRIAL_PATH}
        onClick={onClick}
        className="block text-center rounded-full px-4 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
        style={{ background: PINK }}
      >
        Start your free trial
      </Link>
    </div>
  );
}

// ─── Free tools + Nelsy pages ────────────────────────────────────────────────

export function resolveArticleLinks(article: Article): { tools: ToolPath[]; pages: PagePath[] } {
  const defaults = CATEGORY_LINKS[article.category];
  const extraTool = article.relatedLinks?.tool ?? defaults.tool;
  const tools = CORE_TOOLS.includes(extraTool) ? CORE_TOOLS : [...CORE_TOOLS, extraTool];
  const pages = article.relatedLinks?.pages?.length ? article.relatedLinks.pages : defaults.pages;
  return { tools, pages };
}

export function FreeToolsBox({ tools }: { tools: ToolPath[] }) {
  return (
    <section aria-labelledby="free-tools" className="not-prose mt-12 rounded-3xl border border-[#1A1A1A]/10 bg-white px-5 py-6 sm:p-8">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#F52B8C] mb-1">Free tools</p>
      <h2 id="free-tools" className="font-serif text-2xl font-bold text-[#1A1A1A] mb-5">Run the numbers for your business</h2>
      <ul className="grid sm:grid-cols-2 gap-3">
        {tools.map((path) => (
          <li key={path}>
            <Link
              to={path}
              className="group flex items-start gap-3 rounded-2xl border border-[#F4C2C2]/60 bg-[#FFFBFB] p-4 transition hover:border-[#F52B8C]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F52B8C] text-white">
                <Calculator size={16} aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-[#1A1A1A] group-hover:text-[#F52B8C] transition-colors">{TOOL_LINKS[path].label}</span>
                <span className="block text-xs text-gray-500 leading-snug mt-0.5">{TOOL_LINKS[path].desc}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function NelsyPagesBox({ pages }: { pages: PagePath[] }) {
  return (
    <nav aria-label="Nelsy features" className="not-prose mt-8 rounded-3xl bg-[#FDF0F7] px-5 py-6 sm:p-8">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#F52B8C] mb-1">How Nelsy helps</p>
      <p className="font-serif text-2xl font-bold text-[#1A1A1A] mb-5">Put this into practice</p>
      <ul className="grid sm:grid-cols-2 gap-3">
        {pages.map((path) => (
          <li key={path}>
            <Link to={path} className="group flex items-start gap-3 rounded-2xl bg-white p-4 transition hover:shadow-md">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FDF0F7] text-[#F52B8C]">
                <CalendarCheck size={16} aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-[#1A1A1A] group-hover:text-[#F52B8C] transition-colors">{PAGE_LINKS[path].label}</span>
                <span className="block text-xs text-gray-500 leading-snug mt-0.5">{PAGE_LINKS[path].desc}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function KeepReadingInline({ articles }: { articles: Article[] }) {
  if (!articles.length) return null;
  return (
    <aside aria-label="Keep reading" className="not-prose rounded-2xl border-l-4 border-[#F52B8C] bg-white px-5 py-4 shadow-sm">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-2">Keep reading</p>
      <ul className="space-y-2.5 sm:space-y-1.5">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link to={`/blog/${a.slug}`} className="text-base sm:text-[15px] font-semibold text-[#1A1A1A] hover:text-[#F52B8C] transition-colors leading-snug">
              {a.title} <span aria-hidden className="text-[#F52B8C]">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

// ─── Tree helpers (read time, image count) ───────────────────────────────────

const SKIP_PROPS = new Set(['className', 'style', 'id', 'to', 'href', 'src', 'srcSet', 'sizes', 'variant', 'rel', 'target', 'alt', 'key', 'width', 'height']);

function walk(node: unknown, onText: (s: string) => void, onElement: (el: ReactElement) => void, depth = 0): void {
  if (node == null || typeof node === 'boolean' || depth > 40) return;
  if (typeof node === 'string' || typeof node === 'number') { onText(String(node)); return; }
  if (Array.isArray(node)) { for (const n of node) walk(n, onText, onElement, depth + 1); return; }
  if (isValidElement(node)) {
    onElement(node);
    const props = node.props as Record<string, unknown>;
    for (const [k, v] of Object.entries(props)) if (!SKIP_PROPS.has(k)) walk(v, onText, onElement, depth + 1);
    return;
  }
  if (typeof node === 'object') {
    for (const [k, v] of Object.entries(node as Record<string, unknown>)) if (!SKIP_PROPS.has(k)) walk(v, onText, onElement, depth + 1);
  }
}

const statsCache = new Map<string, { words: number; images: number }>();

/** Word count and in-body image count, computed from the article's element tree (cached). */
export function articleStats(article: Article): { words: number; images: number } {
  const hit = statsCache.get(article.slug);
  if (hit) return hit;
  let words = 0;
  let images = 0;
  walk(
    article.content(),
    (s) => { words += s.split(/\s+/).filter(Boolean).length; },
    (el) => { if (el.type === ArticleImage || el.type === 'img') images++; },
  );
  const stats = { words, images };
  statsCache.set(article.slug, stats);
  return stats;
}

export function readMinutes(article: Article): number {
  return Math.max(2, Math.round(articleStats(article).words / 220));
}

// ─── Article body with auto-inserted blocks ──────────────────────────────────

/** Target: cover + at least 2 in-body photos (3 images per article). */
const MIN_BODY_IMAGES = 2;

/**
 * Renders article.content() and inserts, between top-level <section>s:
 * photos (when the article has fewer than 2), the mid-article CTA after about
 * 40% of the sections, and an inline "Keep reading" box later on.
 */
export function ArticleBody({
  article,
  keepReading,
  onMidCtaClick,
}: {
  article: Article;
  keepReading: Article[];
  onMidCtaClick?: () => void;
}) {
  const root = article.content();
  if (!isValidElement(root)) return <>{root}</>;
  const rootEl = root as ReactElement<{ children?: ReactNode }>;
  const children = Children.toArray(rootEl.props.children);
  const sectionAt = children
    .map((c, i) => (isValidElement(c) && c.type === 'section' ? i : -1))
    .filter((i) => i >= 0);
  const n = sectionAt.length;
  if (n < 2) return root;

  const missing = Math.max(0, MIN_BODY_IMAGES - articleStats(article).images);
  const photos = pickArticlePhotos(article.slug, article.category, missing, [coverPhotoFor(article.slug, article.category).id]);

  // Insert after section number k (1-based)
  const inserts = new Map<number, ReactNode[]>();
  const add = (k: number, node: ReactNode) => {
    const at = Math.min(Math.max(1, k), n - 1 >= 1 ? n - 1 : 1);
    inserts.set(at, [...(inserts.get(at) ?? []), node]);
  };

  const ctaK = Math.max(1, Math.round(n * 0.4));
  if (photos[0]) add(Math.max(1, Math.round(n * 0.2)), <ArticleImage key="auto-img-0" src={photos[0].id} alt={photos[0].alt} flush wide />);
  add(ctaK, <ArticleMidCTA key="auto-mid-cta" category={article.category} onClick={onMidCtaClick} />);
  if (photos[1]) add(Math.round(n * 0.7), <ArticleImage key="auto-img-1" src={photos[1].id} alt={photos[1].alt} flush wide />);
  const readK = Math.max(ctaK + 1, Math.round(n * 0.55));
  if (keepReading.length && readK < n) add(readK, <KeepReadingInline key="auto-keep-reading" articles={keepReading} />);

  const out: ReactNode[] = [];
  let sectionNo = 0;
  children.forEach((child, i) => {
    out.push(child);
    if (sectionAt.includes(i)) {
      sectionNo++;
      const extra = inserts.get(sectionNo);
      if (extra) out.push(...extra);
    }
  });
  return cloneElement(rootEl, undefined, out);
}
