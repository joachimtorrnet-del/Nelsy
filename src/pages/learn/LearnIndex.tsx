import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import SEOMeta from '@/components/SEOMeta';
import SiteNav from '@/components/layout/SiteNav';
import SiteFooter from '@/components/layout/SiteFooter';
import ArticleCard from '@/components/article/ArticleCard';
// articleRegistry uses import.meta.glob to auto-import all article files
import {
  getAllArticles,
  getFeaturedArticle,
  getSpotlightArticles,
  searchArticles,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
} from '@/lib/articleRegistry';
import type { ArticleCategory } from '@/lib/articles';

const PINK = '#F52B8C';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay },
} as const);

const CATEGORIES = Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][];

const JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Nelsy Learn — The Nail Tech Business Guide',
    description:
      'Practical guides, ideas and tools to help nail techs get more clients, charge with confidence and grow their nail business.',
    url: 'https://getnelsy.com/learn',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://getnelsy.com/' },
      { '@type': 'ListItem', position: 2, name: 'Learn', item: 'https://getnelsy.com/learn' },
    ],
  },
];

export default function LearnIndex() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | 'all'>('all');

  const featured = getFeaturedArticle();
  const spotlight = getSpotlightArticles();
  const all = getAllArticles();

  const filtered = useMemo(() => {
    let articles = query ? searchArticles(query) : all;
    if (activeCategory !== 'all') {
      articles = articles.filter((a) => a.category === activeCategory);
    }
    return articles;
  }, [query, activeCategory, all]);

  // Grid excludes featured and spotlight articles when no filter applied
  const gridArticles =
    query || activeCategory !== 'all'
      ? filtered
      : filtered.filter((a) => !a.featured && !a.spotlight);

  return (
    <>
      <SEOMeta
        title="Nelsy Learn — The Nail Tech Business Guide"
        description="Practical guides, ideas and tools to help nail techs get more clients, charge with confidence and grow their nail business."
        canonical="/learn"
        jsonLd={JSON_LD}
      />
      <SiteNav />

      <main className="bg-[#FFFBFB] min-h-screen">

        {/* ── Editorial hero ──────────────────────────────────────────── */}
        <header
          className="border-b border-[#F4C2C2]/30"
          style={{ background: 'linear-gradient(160deg, #FFF7FA 0%, #FFFBFB 60%)' }}
        >
          <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
            <motion.div {...fadeUp()}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: PINK }}>
                Nelsy Learn
              </p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4 leading-tight">
                The Nail Tech Business Guide
              </h1>
              <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
                Practical guides, ideas and tools to help you get more clients, charge with confidence and grow your nail business.
              </p>
            </motion.div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 py-14 space-y-16">

          {/* ── Featured article ────────────────────────────────────── */}
          {featured && !query && activeCategory === 'all' && (
            <motion.section {...fadeUp(0.05)}>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">Featured</p>
              <ArticleCard article={featured} size="featured" />
            </motion.section>
          )}

          {/* ── Spotlight ───────────────────────────────────────────── */}
          {spotlight.length > 0 && !query && activeCategory === 'all' && (
            <motion.section {...fadeUp(0.1)}>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">Spotlight</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {spotlight.map((a) => (
                  <ArticleCard key={a.slug} article={a} size="spotlight" />
                ))}
              </div>
            </motion.section>
          )}

          {/* ── Search + filters ────────────────────────────────────── */}
          <motion.section {...fadeUp(0.15)}>
            {/* Search */}
            <div className="relative max-w-md mb-6">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
              <input
                type="search"
                placeholder="Search Nelsy Learn…"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setActiveCategory('all'); }}
                className="w-full pl-10 pr-4 py-3 text-sm rounded-full border border-[#F4C2C2]/60 bg-white focus:outline-none focus:border-[#F52B8C] transition"
              />
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className="text-xs font-semibold px-3.5 py-1.5 rounded-full transition-colors"
                style={
                  activeCategory === 'all'
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
          </motion.section>

          {/* ── Article grid ────────────────────────────────────────── */}
          <section>
            {query && (
              <p className="text-sm text-gray-500 mb-5">
                {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
              </p>
            )}
            {activeCategory !== 'all' && !query && (
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
                {CATEGORY_LABELS[activeCategory]}
              </p>
            )}

            {gridArticles.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-400 text-sm">No articles found. Try a different search or category.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gridArticles.map((a, i) => (
                  <motion.div key={a.slug} {...fadeUp(i * 0.04)}>
                    <ArticleCard article={a} size="grid" />
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
