import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOMeta from '@/components/SEOMeta';
import SiteNav from '@/components/layout/SiteNav';
import SiteFooter from '@/components/layout/SiteFooter';
import ArticleCard from '@/components/article/ArticleCard';
import {
  getAllArticles,
  getFeaturedArticle,
  getSpotlightArticles,
  searchArticles,
  getArticlesByCategory,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
} from '@/lib/articleRegistry';
import type { ArticleCategory } from '@/lib/articles';

const PINK = '#F52B8C';
const ORIGIN = 'https://getnelsy.com';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
} as const);

// Category nav displayed below hero
const NAV_CATEGORIES: ArticleCategory[] = [
  'get-clients',
  'instagram-content',
  'pricing-money',
  'booking-software',
  'nail-education',
  'nail-inspo',
];

// Editorial sections on the homepage
const EDITORIAL_SECTIONS: { category: ArticleCategory; emoji: string; desc: string }[] = [
  { category: 'get-clients',         emoji: '🌸', desc: 'Strategies to attract and keep more nail clients.' },
  { category: 'instagram-content',   emoji: '📱', desc: 'Content ideas, hooks, and social media strategy.' },
  { category: 'pricing-money',       emoji: '💸', desc: 'Price with confidence and know your numbers.' },
  { category: 'nail-education',      emoji: '💅', desc: 'Technique guides and product deep-dives.' },
  { category: 'nail-inspo',          emoji: '✨', desc: 'Seasonal looks and colour inspiration.' },
  { category: 'start-your-business', emoji: '🚀', desc: 'Everything you need to launch and grow.' },
];

const CATEGORIES = Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][];

const JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Nail Tech Business Tips, Guides & Inspiration | Nelsy',
    description: 'Practical ideas, strategies and inspiration for growing a better nail business.',
    url: `${ORIGIN}/blog`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${ORIGIN}/blog` },
    ],
  },
];

export default function BlogIndex() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | 'all'>('all');

  const featured = getFeaturedArticle();
  const spotlight = getSpotlightArticles();
  const all = getAllArticles();

  const isFiltered = query.trim().length > 0 || activeCategory !== 'all';

  const filtered = useMemo(() => {
    let articles = query ? searchArticles(query) : all;
    if (activeCategory !== 'all') {
      articles = articles.filter((a) => a.category === activeCategory);
    }
    return articles;
  }, [query, activeCategory, all]);

  // Grid: when filtered show the filtered list; otherwise show remaining articles
  const gridArticles = isFiltered
    ? filtered
    : filtered.filter((a) => !a.featured && !a.spotlight);

  return (
    <>
      <SEOMeta
        title="Nail Tech Business Tips, Guides & Inspiration | Nelsy"
        description="Practical ideas, strategies and inspiration for growing a better nail business."
        canonical="/blog"
        jsonLd={JSON_LD}
      />
      <SiteNav />

      <main className="bg-[#FFFBFB] min-h-screen pt-14">

        {/* ── Blog hero ───────────────────────────────────────────────── */}
        <header
          className="border-b border-[#F4C2C2]/30"
          style={{ background: 'linear-gradient(165deg, #FFF5F9 0%, #FFFBFB 55%, #F7F3FF 100%)' }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
            <motion.div {...fadeUp()}>
              <p
                className="text-xs font-black uppercase tracking-[0.2em] mb-4"
                style={{ color: PINK }}
              >
                Nelsy Blog
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] mb-5 leading-tight max-w-2xl">
                The Nail Business Edit
              </h1>
              <p className="text-gray-500 text-lg max-w-lg leading-relaxed">
                Practical ideas, strategies and inspiration for growing a better nail business.
              </p>
            </motion.div>

            {/* Category quick nav */}
            <motion.div {...fadeUp(0.12)} className="mt-10 flex flex-wrap gap-2">
              {NAV_CATEGORIES.map((cat) => {
                const c = CATEGORY_COLORS[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setQuery(''); window.scrollTo({ top: 600, behavior: 'smooth' }); }}
                    className="text-xs font-semibold px-3.5 py-1.5 rounded-full transition-colors hover:opacity-90"
                    style={{ background: c.bg, color: c.text }}
                  >
                    {CATEGORY_LABELS[cat]}
                  </button>
                );
              })}
            </motion.div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {!isFiltered && (
            <>
              {/* ── Featured story ──────────────────────────────────────── */}
              {featured && (
                <motion.section {...fadeUp(0.05)} className="py-14 border-b border-[#F4C2C2]/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px flex-1 bg-[#F4C2C2]/40" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Featured</p>
                    <div className="h-px flex-1 bg-[#F4C2C2]/40" />
                  </div>
                  <ArticleCard article={featured} size="featured" />
                </motion.section>
              )}

              {/* ── Spotlight row ────────────────────────────────────────── */}
              {spotlight.length > 0 && (
                <motion.section {...fadeUp(0.1)} className="py-14 border-b border-[#F4C2C2]/20">
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Editors' picks</p>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {spotlight.map((a) => (
                      <ArticleCard key={a.slug} article={a} size="spotlight" />
                    ))}
                  </div>
                </motion.section>
              )}

              {/* ── Editorial sections ───────────────────────────────────── */}
              {EDITORIAL_SECTIONS.map((sec, idx) => {
                const articles = getArticlesByCategory(sec.category).slice(0, 6);
                if (!articles.length) return null;
                const c = CATEGORY_COLORS[sec.category];
                return (
                  <motion.section
                    key={sec.category}
                    {...fadeUp(0.05 * idx)}
                    className="py-14 border-b border-[#F4C2C2]/20 last:border-b-0"
                  >
                    {/* Section header */}
                    <div className="flex items-end justify-between mb-7 flex-wrap gap-3">
                      <div>
                        <span
                          className="inline-block text-[10px] font-black uppercase tracking-[0.18em] px-2.5 py-1 rounded-full mb-3"
                          style={{ background: c.bg, color: c.text }}
                        >
                          {CATEGORY_LABELS[sec.category]}
                        </span>
                        <p className="text-gray-500 text-sm">{sec.desc}</p>
                      </div>
                      <button
                        onClick={() => { setActiveCategory(sec.category); setQuery(''); window.scrollTo({ top: 800, behavior: 'smooth' }); }}
                        className="text-sm font-semibold flex items-center gap-1 transition-opacity hover:opacity-70 flex-shrink-0"
                        style={{ color: PINK }}
                      >
                        View all <span aria-hidden>→</span>
                      </button>
                    </div>

                    {/* Article grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {articles.map((a) => (
                        <ArticleCard key={a.slug} article={a} size="grid" />
                      ))}
                    </div>
                  </motion.section>
                );
              })}
            </>
          )}

          {/* ── Search + filter (always visible below curated) ───────── */}
          <motion.section {...fadeUp(0.15)} className="py-14">
            {/* Section divider */}
            {!isFiltered && (
              <div className="flex items-center gap-3 mb-10">
                <div className="h-px flex-1 bg-[#F4C2C2]/40" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">All articles</p>
                <div className="h-px flex-1 bg-[#F4C2C2]/40" />
              </div>
            )}

            {/* Search */}
            <div className="relative max-w-md mb-6">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                width="14" height="14" viewBox="0 0 20 20" fill="currentColor"
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <input
                type="search"
                placeholder="Search the Nelsy Blog…"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setActiveCategory('all'); }}
                className="w-full pl-10 pr-4 py-3 text-sm rounded-full border border-[#F4C2C2]/60 bg-white focus:outline-none focus:border-[#F52B8C] transition"
              />
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => { setActiveCategory('all'); setQuery(''); }}
                className="text-xs font-semibold px-3.5 py-1.5 rounded-full transition-colors"
                style={
                  activeCategory === 'all' && !query
                    ? { background: PINK, color: '#fff' }
                    : { background: '#F7F3F3', color: '#555' }
                }
              >
                All
              </button>
              {CATEGORIES.map(([cat, label]) => {
                const c = CATEGORY_COLORS[cat];
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setQuery(''); }}
                    className="text-xs font-semibold px-3.5 py-1.5 rounded-full transition-colors"
                    style={
                      isActive
                        ? { background: c.text, color: '#fff' }
                        : { background: c.bg, color: c.text }
                    }
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Results label */}
            {query && (
              <p className="text-sm text-gray-500 mb-5">
                {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
              </p>
            )}
            {activeCategory !== 'all' && !query && (
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-5">
                {CATEGORY_LABELS[activeCategory]}
              </p>
            )}

            {/* Article grid */}
            {gridArticles.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-400 text-sm">No articles found. Try a different search or category.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gridArticles.map((a, i) => (
                  <motion.div key={a.slug} {...fadeUp(Math.min(i, 8) * 0.04)}>
                    <ArticleCard article={a} size="grid" />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>
        </div>

        {/* ── Free tools cross-link ────────────────────────────────────── */}
        {!isFiltered && (
          <motion.section
            {...fadeUp()}
            className="border-t border-[#F4C2C2]/30 bg-white py-14 px-4"
          >
            <div className="max-w-6xl mx-auto">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Free tools</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: 'Nail Tech Pricing Calculator', desc: 'Calculate your service prices for profit.', href: '/tools/nail-tech-pricing-calculator' },
                  { label: 'Cancellation Policy Generator', desc: 'Generate a professional cancellation policy in seconds.', href: '/tools/nail-tech-cancellation-policy-generator' },
                  { label: 'Appointment Reminder Templates', desc: 'Copy-paste reminder messages for any booking system.', href: '/tools/nail-tech-appointment-reminder-templates' },
                ].map((t) => (
                  <Link
                    key={t.href}
                    to={t.href}
                    className="group flex items-start gap-4 rounded-2xl border border-[#F4C2C2]/40 bg-white p-5 hover:shadow-md transition-shadow"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-sm font-bold"
                      style={{ background: PINK }}
                    >
                      ✦
                    </div>
                    <div>
                      <p className="font-semibold text-[#1A1A1A] text-sm group-hover:text-[#F52B8C] transition-colors">{t.label}</p>
                      <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{t.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
