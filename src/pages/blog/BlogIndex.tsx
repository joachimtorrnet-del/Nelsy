import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Search } from 'lucide-react';
import SEOMeta from '@/components/SEOMeta';
import SiteNav from '@/components/layout/SiteNav';
import SiteFooter from '@/components/layout/SiteFooter';
import ArticleCard from '@/components/article/ArticleCard';
import { readMinutes } from '@/components/article/ArticleTemplateBlocks';
import { TRIAL_PATH } from '@/components/article/ArticleBodyComponents';
import {
  getAllArticles,
  getFeaturedArticle,
  getSpotlightArticles,
  searchArticles,
  CATEGORY_LABELS,
} from '@/lib/articleRegistry';
import type { ArticleCategory } from '@/lib/articles';
import { CORE_TOOLS, TOOL_LINKS } from '@/lib/blogLinks';
import { track } from '@/lib/analytics';

const PINK = '#F52B8C';
const ORIGIN = 'https://getnelsy.com';
const PAGE_SIZE = 12;

// Category order in the navigation (most useful for pros first)
const NAV_CATEGORIES: ArticleCategory[] = [
  'get-clients',
  'pricing-money',
  'policies-clients',
  'booking-software',
  'comparisons',
  'instagram-content',
  'start-your-business',
  'branding-growth',
  'beauty-creators',
  'nail-education',
  'nail-inspo',
];

const JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'The Nelsy Blog',
    description: 'Practical guides for nail techs and beauty pros: getting clients, pricing, deposits, policies, booking apps and content.',
    url: `${ORIGIN}/blog`,
    publisher: { '@type': 'Organization', name: 'Nelsy', url: ORIGIN },
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
  const [visible, setVisible] = useState(PAGE_SIZE);

  // Deep link: /blog?category=pricing-money (read after mount, the prerendered page shows "All")
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get('category');
    if (c && c in CATEGORY_LABELS) setActiveCategory(c as ArticleCategory);
  }, []);

  const featured = getFeaturedArticle();
  const spotlight = getSpotlightArticles();
  const all = getAllArticles();

  const counts = useMemo(() => {
    const m = new Map<ArticleCategory, number>();
    for (const a of all) m.set(a.category, (m.get(a.category) ?? 0) + 1);
    return m;
  }, [all]);

  const filtered = useMemo(() => {
    let articles = query ? searchArticles(query) : all.filter((a) => a.slug !== featured?.slug);
    if (activeCategory !== 'all') articles = articles.filter((a) => a.category === activeCategory);
    return articles;
  }, [query, activeCategory, all, featured]);

  function pick(cat: ArticleCategory | 'all') {
    setActiveCategory(cat);
    setQuery('');
    setVisible(PAGE_SIZE);
    try {
      const url = cat === 'all' ? '/blog' : `/blog?category=${cat}`;
      window.history.replaceState(null, '', url);
    } catch { /* ignore */ }
  }

  const isFiltered = query.trim().length > 0 || activeCategory !== 'all';

  return (
    <>
      <SEOMeta
        title="Nail Tech Business Tips, Guides & Inspiration | Nelsy"
        description="Practical ideas, strategies and inspiration for growing a better nail business."
        canonical="/blog"
        jsonLd={JSON_LD}
      />
      <SiteNav />

      <main className="bg-white min-h-screen pt-14">

        {/* ── Masthead ────────────────────────────────────────────────── */}
        <header className="relative overflow-hidden bg-[#FDF0F7]/60 border-b border-[#F4C2C2]/30">
          <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#F52B8C]/10 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-[#F4C2C2]/40 blur-3xl" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-14 md:py-20 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-4" style={{ color: PINK }}>The Nelsy Blog</p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#1A1A1A] leading-[1.05] tracking-tight mb-5">
              The Nail Business Edit
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Practical guides for nail techs and beauty pros: getting clients, pricing, deposits, policies, booking apps and content that books.
            </p>
            <p className="mt-6 text-xs text-gray-500">{all.length} guides · Free tools</p>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* ── Featured ──────────────────────────────────────────────── */}
          {featured && (
            <section aria-label="Featured article" className="pt-10 md:pt-14">
              <ArticleCard article={featured} size="featured" />
            </section>
          )}

          {/* ── Start here (editor's picks) ───────────────────────────── */}
          {spotlight.length > 0 && (
            <section aria-labelledby="start-here" className="pt-14">
              <h2 id="start-here" className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-6">Start here</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {spotlight.map((a) => (
                  <ArticleCard key={a.slug} article={a} size="spotlight" minutes={readMinutes(a)} />
                ))}
              </div>
            </section>
          )}

          {/* ── More to explore: category nav + search + grid ─────────── */}
          <section aria-labelledby="explore" className="pt-16 pb-14" id="explore-articles">
            <div className="text-center mb-8">
              <h2 id="explore" className="font-serif text-3xl sm:text-4xl font-bold text-[#1A1A1A]">More to explore</h2>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
              <div className="-mx-4 px-4 md:mx-0 md:px-0 flex-1 overflow-x-auto">
                <div className="flex gap-2 w-max md:w-auto md:flex-wrap" role="tablist" aria-label="Categories">
                  <button
                    role="tab"
                    aria-selected={activeCategory === 'all' && !query}
                    onClick={() => pick('all')}
                    className={`whitespace-nowrap text-sm font-semibold px-4 py-2 rounded-full border transition ${
                      activeCategory === 'all' && !query ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/15 hover:border-[#1A1A1A]/40'
                    }`}
                  >
                    All
                  </button>
                  {NAV_CATEGORIES.filter((c) => counts.get(c)).map((cat) => {
                    const active = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        role="tab"
                        aria-selected={active}
                        onClick={() => pick(cat)}
                        className={`whitespace-nowrap text-sm font-semibold px-4 py-2 rounded-full border transition ${
                          active ? 'bg-[#F52B8C] text-white border-[#F52B8C]' : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/15 hover:border-[#F52B8C]/60'
                        }`}
                      >
                        {CATEGORY_LABELS[cat]}
                        <span className={`ml-1.5 text-xs ${active ? 'text-white/80' : 'text-gray-400'}`}>{counts.get(cat)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <label className="relative md:w-64 shrink-0">
                <span className="sr-only">Search the blog</span>
                <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden />
                <input
                  type="search"
                  placeholder="Search guides"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setActiveCategory('all'); setVisible(PAGE_SIZE); }}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-full border border-[#1A1A1A]/15 bg-[#F7F3F3] focus:bg-white focus:outline-none focus:border-[#F52B8C] transition"
                />
              </label>
            </div>

            {query && (
              <p className="text-sm text-gray-500 mb-5">
                {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
              </p>
            )}

            {filtered.length === 0 ? (
              <p className="text-center py-16 text-gray-400 text-sm">No articles found. Try a different search or category.</p>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.slice(0, visible).map((a) => (
                    <ArticleCard key={a.slug} article={a} size="grid" minutes={readMinutes(a)} />
                  ))}
                </div>
                {filtered.length > visible && (
                  <div className="mt-10 text-center">
                    <button
                      onClick={() => setVisible((v) => v + PAGE_SIZE)}
                      className="rounded-full border border-[#1A1A1A] px-6 py-3 text-sm font-bold text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition"
                    >
                      Show more guides ({filtered.length - visible} left)
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>

        {/* ── Tools + trial band ───────────────────────────────────────── */}
        <section aria-labelledby="tools-band" className="px-4 sm:px-6 pb-16">
          <div className="max-w-6xl mx-auto rounded-3xl bg-[#1A1A1A] text-white p-7 sm:p-12 grid lg:grid-cols-[1fr_1.2fr] gap-10 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: PINK }}>Free tools</p>
              <h2 id="tools-band" className="font-serif text-3xl sm:text-4xl font-bold leading-tight mb-4">Know your numbers before you change anything</h2>
              <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-md">
                Free calculators for deposits, no-shows and booking app fees. When you are ready, try Nelsy free for 14 days: $29/month after, 0% Nelsy commission.
              </p>
              <Link
                to={TRIAL_PATH}
                onClick={() => track('seo_cta_clicked', { landing_page: '/blog', page_type: 'blog_index', cta_position: 'footer_cta', cta_label: 'Start your free trial' })}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: PINK }}
              >
                Start your free trial <span aria-hidden>→</span>
              </Link>
            </div>
            <ul className="grid gap-3">
              {CORE_TOOLS.map((path) => (
                <li key={path}>
                  <Link to={path} className="group flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: PINK }}>
                      <Calculator size={18} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-sm">{TOOL_LINKS[path].label}</span>
                      <span className="block text-xs text-white/60 mt-0.5">{TOOL_LINKS[path].desc}</span>
                    </span>
                    <span aria-hidden className="text-white/40 group-hover:text-white transition">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── All guides by topic (plain links: every article reachable from /blog) ── */}
        {!isFiltered && (
          <section aria-labelledby="by-topic" className="border-t border-[#F4C2C2]/30 bg-[#FFFBFB] px-4 sm:px-6 py-14">
            <div className="max-w-6xl mx-auto">
              <h2 id="by-topic" className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-8">All guides by topic</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
                {NAV_CATEGORIES.filter((c) => counts.get(c)).map((cat) => (
                  <details key={cat} className="group" open>
                    <summary className="cursor-pointer list-none flex items-center justify-between border-b border-[#1A1A1A]/10 pb-2 mb-3">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#1A1A1A]">{CATEGORY_LABELS[cat]}</h3>
                      <span className="text-xs text-gray-400">{counts.get(cat)}</span>
                    </summary>
                    <ul className="space-y-2 max-h-72 overflow-y-auto pr-2">
                      {all.filter((a) => a.category === cat).map((a) => (
                        <li key={a.slug}>
                          <Link to={`/blog/${a.slug}`} className="text-sm text-gray-700 hover:text-[#F52B8C] transition leading-snug">
                            {a.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </>
  );
}
