import type { ReactNode } from 'react';

// ─── Category definitions ────────────────────────────────────────────────────

export type ArticleCategory =
  | 'get-clients'
  | 'instagram-content'
  | 'pricing-money'
  | 'booking-software'
  | 'policies-clients'
  | 'start-your-business'
  | 'nail-education'
  | 'nail-inspo'
  | 'comparisons'
  | 'branding-growth'
  | 'beauty-creators';

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  'get-clients': 'Get Clients',
  'instagram-content': 'Instagram & Content',
  'pricing-money': 'Pricing & Money',
  'booking-software': 'Booking & Software',
  'policies-clients': 'Policies & Clients',
  'start-your-business': 'Start Your Business',
  'nail-education': 'Nail Education',
  'nail-inspo': 'Nail Inspo',
  comparisons: 'Comparisons',
  'branding-growth': 'Branding & Growth',
  'beauty-creators': 'Beauty Creators',
};

export const CATEGORY_COLORS: Record<ArticleCategory, { bg: string; text: string }> = {
  'get-clients':        { bg: '#FDF0F7', text: '#C8197A' },
  'instagram-content':  { bg: '#FFF0F5', text: '#B8185E' },
  'pricing-money':      { bg: '#FFF5E6', text: '#A05C00' },
  'booking-software':   { bg: '#F0F4FF', text: '#2D4FB8' },
  'policies-clients':   { bg: '#F0FDF4', text: '#166534' },
  'start-your-business':{ bg: '#FDF4FF', text: '#7E22CE' },
  'nail-education':     { bg: '#FFF1F1', text: '#9B1C1C' },
  'nail-inspo':         { bg: '#FFF9F0', text: '#92400E' },
  comparisons:          { bg: '#F0FFFE', text: '#0D6E6E' },
  'branding-growth':    { bg: '#FFF8F0', text: '#9A3412' },
  'beauty-creators':    { bg: '#F5F0FF', text: '#6D28D9' },
};

// ─── TOC section ─────────────────────────────────────────────────────────────

export interface TocSection {
  id: string;
  label: string;
}

// ─── Article data model ───────────────────────────────────────────────────────

export interface ArticleMeta {
  slug: string;
  title: string;
  seoTitle?: string;
  excerpt: string;
  seoDescription?: string;
  category: ArticleCategory;
  tags: string[];
  // Hero image: public path (e.g. '/og-image.png') or gradient CSS string
  heroImage: string;
  heroImageAlt: string;
  author: string;
  authorRole: string;
  publishedAt: string;   // ISO date string
  updatedAt?: string;
  featured?: boolean;
  spotlight?: boolean;
  toc: TocSection[];
  relatedSlugs?: string[];
  /** Nelsy feature slugs to show in the RelatedFeatures block at the bottom of the article */
  relatedFeatureSlugs?: string[];
  faq?: Array<{ q: string; a: string }>;
}

// Content is a React render function — keeps it in TSX, no MDX needed
export type ArticleContentFn = () => ReactNode;

export interface Article extends ArticleMeta {
  content: ArticleContentFn;
}

// ─── Registry ────────────────────────────────────────────────────────────────

const registry = new Map<string, Article>();

export function registerArticle(article: Article) {
  registry.set(article.slug, article);
}

export function getArticle(slug: string): Article | undefined {
  return registry.get(slug);
}

export function getAllArticles(): Article[] {
  return Array.from(registry.values()).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getFeaturedArticle(): Article | undefined {
  return getAllArticles().find((a) => a.featured);
}

export function getSpotlightArticles(): Article[] {
  return getAllArticles().filter((a) => a.spotlight).slice(0, 3);
}

// Deterministic pseudo-random order so links spread evenly across a category
function linkHash(a: string, b: string): number {
  let h = 2166136261;
  for (const ch of `${a}|${b}`) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return h >>> 0;
}

function keywords(a: Article): Set<string> {
  return new Set(
    [a.title, ...a.tags].join(' ').toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 3),
  );
}

/** Hand-picked related slugs first, then the closest articles of the same category. */
export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const article = getArticle(slug);
  if (!article) return [];
  const picked = (article.relatedSlugs ?? [])
    .map((s) => getArticle(s))
    .filter((a): a is Article => !!a && a.slug !== slug);
  if (picked.length >= limit) return picked.slice(0, limit);

  const own = keywords(article);
  const taken = new Set([slug, ...picked.map((a) => a.slug)]);
  const fill = getAllArticles()
    .filter((a) => !taken.has(a.slug) && a.category === article.category)
    .map((a) => {
      let overlap = 0;
      for (const w of keywords(a)) if (own.has(w)) overlap++;
      return { a, overlap, h: linkHash(slug, a.slug) };
    })
    .sort((x, y) => y.overlap - x.overlap || x.h - y.h)
    .map((x) => x.a);
  return [...picked, ...fill].slice(0, limit);
}

/** More articles of the same category, spread so every article receives inbound links. */
export function getMoreInCategory(slug: string, exclude: string[] = [], limit = 6): Article[] {
  const article = getArticle(slug);
  if (!article) return [];
  const skip = new Set([slug, ...exclude]);
  return getAllArticles()
    .filter((a) => !skip.has(a.slug) && a.category === article.category)
    .sort((x, y) => linkHash(slug, x.slug) - linkHash(slug, y.slug))
    .slice(0, limit);
}

// Pages that convert nail techs: linked from every article written for pros
export const PRO_GUIDES: { path: string; label: string }[] = [
  { path: '/best-booking-app-for-nail-techs', label: 'Best booking app for nail techs' },
  { path: '/fresha-alternative-nail-techs', label: 'Fresha alternative for nail techs' },
  { path: '/booksy-alternative-nail-techs', label: 'Booksy alternative for nail techs' },
  { path: '/nail-tech-deposits', label: 'How to take deposits as a nail tech' },
  { path: '/instagram-booking-for-nail-techs', label: 'Instagram booking for nail techs' },
  { path: '/tools/nail-tech-pricing-calculator', label: 'Nail tech pricing calculator' },
  { path: '/tools/nail-tech-cancellation-policy-generator', label: 'Cancellation policy generator' },
  { path: '/tools/nail-tech-appointment-reminder-templates', label: 'Appointment reminder templates' },
];

/** Client-facing inspiration content doesn't get the pro guides block. */
export function isProArticle(article: Article): boolean {
  return article.category !== 'nail-inspo';
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase().trim();
  if (!q) return getAllArticles();
  return getAllArticles().filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q)) ||
      CATEGORY_LABELS[a.category].toLowerCase().includes(q),
  );
}
