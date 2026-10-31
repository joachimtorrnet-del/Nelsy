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
  | 'branding-growth';

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

export function getRelatedArticles(slug: string, limit = 3): Article[] {
  const article = getArticle(slug);
  if (!article) return [];
  // First use explicit related slugs
  if (article.relatedSlugs?.length) {
    return article.relatedSlugs
      .map((s) => getArticle(s))
      .filter((a): a is Article => !!a)
      .slice(0, limit);
  }
  // Fallback: same category, excluding self
  return getAllArticles()
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, limit);
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
