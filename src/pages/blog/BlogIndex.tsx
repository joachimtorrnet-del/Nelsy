import { useEffect, useMemo, useState } from 'react';
import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Search, Scissors, Sparkles, Users } from 'lucide-react';
import SEOMeta from '@/components/SEOMeta';
import SiteNav from '@/components/layout/SiteNav';
import SiteFooter from '@/components/layout/SiteFooter';
import ArticleCard from '@/components/article/ArticleCard';
import { readMinutes } from '@/components/article/ArticleTemplateBlocks';
import { TRIAL_PATH } from '@/components/article/ArticleBodyComponents';
import {
  getAllArticles,
  getFeaturedArticle,
  searchArticles,
  getAudiences,
  matchesCraft,
  CATEGORY_LABELS,
  AUDIENCE_LABELS,
  CRAFT_LABELS,
} from '@/lib/articleRegistry';
import type { Article, ArticleAudience, ArticleCategory, ArticleCraft } from '@/lib/articles';
import { CORE_TOOLS, TOOL_LINKS } from '@/lib/blogLinks';
import { track } from '@/lib/analytics';

const PINK = '#F52B8C';
const ORIGIN = 'https://getnelsy.com';
// 3 columns x 3 rows per step, like Stan's 9-card pages
const PAGE_SIZE = 9;

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
  'salons',
  'nail-education',
  'nail-inspo',
];

const JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'The Nelsy Blog',
    description: 'Practical guides for beauty pros, beauty creators and salons: getting clients, pricing, deposits, policies, booking apps, content and selling what you know.',
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

// The three audiences the blog is written for (entry doors near the top)
const DOORS: Array<{ audience: ArticleAudience; line: string; icon: typeof Sparkles }> = [
  { audience: 'pros', line: 'Nails, lashes, brows, makeup, hair and skin: clients, pricing, deposits and policies.', icon: Scissors },
  { audience: 'creators', line: 'Turn what you know into income: guides, courses, brand deals, UGC and your email list.', icon: Sparkles },
  { audience: 'salons', line: 'Booth rent, commission, schedules and running a salon or studio with a team.', icon: Users },
];

const CRAFTS = Object.keys(CRAFT_LABELS) as Array<Exclude<ArticleCraft, 'all'>>;

/** "Start here": one pick per audience, spotlight articles first, then the most recent. */
function startHerePicks(all: Article[], featuredSlug?: string): Article[] {
  const used = new Set<string>(featuredSlug ? [featuredSlug] : []);
  const pick = (aud: ArticleAudience, exclusive: boolean) => {
    const fits = (a: Article) =>
      !used.has(a.slug) && getAudiences(a).includes(aud) && (!exclusive || getAudiences(a).length === 1);
    const hit = all.find((a) => a.spotlight && fits(a)) ?? all.find(fits);
    if (hit) used.add(hit.slug);
    return hit;
  };
  // Salons and creators first so an article shared with pros doesn't take the pros slot
  const salons = pick('salons', false);
  const creators = pick('creators', false);
  const pros = pick('pros', true);
  return [pros, creators, salons].filter((a): a is Article => !!a);
}

function blogUrl(category: ArticleCategory | 'all', audience: ArticleAudience | 'all', craft: ArticleCraft) {
  const params = new URLSearchParams();
  if (category !== 'all') params.set('category', category);
  if (audience !== 'all') params.set('audience', audience);
  if (craft !== 'all') params.set('craft', craft);
  const q = params.toString();
  return q ? `/blog?${q}` : '/blog';
}

export default function BlogIndex() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | 'all'>('all');
  const [activeAudience, setActiveAudience] = useState<ArticleAudience | 'all'>('all');
  const [activeCraft, setActiveCraft] = useState<ArticleCraft>('all');
  const [visible, setVisible] = useState(PAGE_SIZE);

  // Deep links: /blog?category=pricing-money, ?audience=creators, ?craft=lashes
  // (read after mount, the prerendered page shows "All")
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get('category');
    const au = params.get('audience');
    const cr = params.get('craft');
    if (c && c in CATEGORY_LABELS) setActiveCategory(c as ArticleCategory);
    if (au && au in AUDIENCE_LABELS) setActiveAudience(au as ArticleAudience);
    if (cr && cr in CRAFT_LABELS) setActiveCraft(cr as ArticleCraft);
  }, []);

  const featured = getFeaturedArticle();
  const all = getAllArticles();
  const spotlight = useMemo(() => startHerePicks(all, featured?.slug), [all, featured]);

  const counts = useMemo(() => {
    const m = new Map<ArticleCategory, number>();
    for (const a of all) m.set(a.category, (m.get(a.category) ?? 0) + 1);
    return m;
  }, [all]);

  const filtered = useMemo(() => {
    // Unfiltered grid skips the featured story and the "Start here" picks shown above it
    const shown = new Set([featured?.slug, ...spotlight.map((a) => a.slug)]);
    const browsing = activeCategory === 'all' && activeAudience === 'all' && activeCraft === 'all';
    let articles = query ? searchArticles(query) : all.filter((a) => a.slug !== featured?.slug && (!browsing || !shown.has(a.slug)));
    if (activeCategory !== 'all') articles = articles.filter((a) => a.category === activeCategory);
    if (activeAudience !== 'all') articles = articles.filter((a) => getAudiences(a).includes(activeAudience));
    if (activeCraft !== 'all') articles = articles.filter((a) => matchesCraft(a, activeCraft));
    return articles;
  }, [query, activeCategory, activeAudience, activeCraft, all, featured, spotlight]);

  const craftCounts = useMemo(() => {
    const m = new Map<ArticleCraft, number>();
    for (const c of CRAFTS) m.set(c, all.filter((a) => matchesCraft(a, c)).length);
    return m;
  }, [all]);

  function apply(next: { category?: ArticleCategory | 'all'; audience?: ArticleAudience | 'all'; craft?: ArticleCraft }) {
    const cat = next.category ?? activeCategory;
    const aud = next.audience ?? activeAudience;
    const cr = next.craft ?? activeCraft;
    setActiveCategory(cat);
    setActiveAudience(aud);
    setActiveCraft(cr);
    setQuery('');
    setVisible(PAGE_SIZE);
    try {
      window.history.replaceState(null, '', blogUrl(cat, aud, cr));
    } catch { /* ignore */ }
  }

  const pick = (cat: ArticleCategory | 'all') => apply({ category: cat });

  function openDoor(e: MouseEvent, aud: ArticleAudience) {
    e.preventDefault();
    apply({ audience: aud, category: 'all', craft: 'all' });
    track('seo_cta_clicked', { landing_page: '/blog', page_type: 'blog_index', cta_position: 'hero', cta_label: `audience_${aud}` });
    document.getElementById('explore-articles')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const isFiltered = query.trim().length > 0 || activeCategory !== 'all' || activeAudience !== 'all' || activeCraft !== 'all';

  return (
    <>
      <SEOMeta
        title="Beauty Business Guides for Pros, Creators and Salons | Nelsy"
        description="Practical guides for beauty pros, beauty creators and salon owners: getting clients, pricing, deposits, policies, booking apps, content and what to sell."
        canonical="/blog"
        jsonLd={JSON_LD}
      />
      <SiteNav />

      <main className="bg-white min-h-screen pt-14">

        {/* ── Masthead: one H1, one line, the three audience doors ───────── */}
        <header className="relative overflow-hidden bg-[#FDF0F7]/60 border-b border-[#F4C2C2]/30">
          <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#F52B8C]/10 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-[#F4C2C2]/40 blur-3xl" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-10 md:pt-16 md:pb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-4" style={{ color: PINK }}>The Nelsy Blog · {all.length} guides</p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#1A1A1A] leading-[1.05] tracking-tight mb-4">
              The Beauty Business Edit
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Practical guides for beauty pros, beauty creators and salons: getting clients, pricing, deposits, policies, content and selling what you know.
            </p>

            <nav aria-label="Guides by audience" className="mt-8 md:mt-10 text-left">
              <ul className="grid sm:grid-cols-3 gap-3">
                {DOORS.map(({ audience, line, icon: Icon }) => {
                  const active = activeAudience === audience;
                  return (
                    <li key={audience}>
                      <a
                        href={`/blog?audience=${audience}`}
                        onClick={(e) => openDoor(e, audience)}
                        aria-current={active ? 'true' : undefined}
                        className={`group flex h-full items-center gap-3 rounded-2xl border px-4 py-3 transition ${
                          active ? 'border-[#F52B8C] bg-white' : 'border-[#1A1A1A]/10 bg-white/80 hover:border-[#F52B8C]/60 hover:bg-white'
                        }`}
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FDF0F7] text-[#F52B8C]">
                          <Icon size={18} aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-baseline justify-between gap-2">
                            <span className="font-serif text-lg font-bold text-[#1A1A1A]">{AUDIENCE_LABELS[audience]}</span>
                            <span className="shrink-0 text-xs font-bold text-[#F52B8C]">
                              {all.filter((a) => getAudiences(a).includes(audience)).length} guides <span aria-hidden>→</span>
                            </span>
                          </span>
                          <span className="hidden sm:block text-xs leading-snug text-gray-500 line-clamp-1">{line}</span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* ── Featured ──────────────────────────────────────────────── */}
          {featured && (
            <section aria-label="Featured article" className="pt-8 md:pt-10">
              <ArticleCard article={featured} size="featured" minutes={readMinutes(featured)} priority="high" />
            </section>
          )}

          {/* ── Start here (editor's picks) ───────────────────────────── */}
          {spotlight.length > 0 && (
            <section aria-labelledby="start-here" className="pt-12">
              <h2 id="start-here" className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-6">Start here</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {spotlight.map((a) => (
                  <ArticleCard key={a.slug} article={a} size="spotlight" minutes={readMinutes(a)} priority="eager" />
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
                  onChange={(e) => { setQuery(e.target.value); setActiveCategory('all'); setActiveAudience('all'); setActiveCraft('all'); setVisible(PAGE_SIZE); }}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-full border border-[#1A1A1A]/15 bg-[#F7F3F3] focus:bg-white focus:outline-none focus:border-[#F52B8C] transition"
                />
              </label>
            </div>

            <div className="-mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto mb-8 -mt-4">
              <div className="flex items-center gap-2 w-max md:w-auto md:flex-wrap" role="group" aria-label="Filter by craft">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mr-1">Craft</span>
                <button
                  aria-pressed={activeCraft === 'all'}
                  onClick={() => apply({ craft: 'all' })}
                  className={`whitespace-nowrap text-xs font-semibold px-3 py-1.5 rounded-full border transition ${
                    activeCraft === 'all' ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/15 hover:border-[#1A1A1A]/40'
                  }`}
                >
                  Every craft
                </button>
                {CRAFTS.map((c) => {
                  const active = activeCraft === c;
                  return (
                    <button
                      key={c}
                      aria-pressed={active}
                      onClick={() => apply({ craft: c })}
                      className={`whitespace-nowrap text-xs font-semibold px-3 py-1.5 rounded-full border transition ${
                        active ? 'bg-[#F52B8C] text-white border-[#F52B8C]' : 'bg-[#FFFBFB] text-[#1A1A1A] border-[#F4C2C2] hover:border-[#F52B8C]/60'
                      }`}
                    >
                      {CRAFT_LABELS[c]}
                      <span className={`ml-1 ${active ? 'text-white/80' : 'text-gray-400'}`}>{craftCounts.get(c)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {activeAudience !== 'all' && (
              <p className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-5">
                Showing guides for <strong className="text-[#1A1A1A]">{AUDIENCE_LABELS[activeAudience]}</strong>
                <button onClick={() => apply({ audience: 'all' })} className="rounded-full border border-[#1A1A1A]/15 px-3 py-1 text-xs font-semibold hover:border-[#F52B8C]">
                  Show all audiences
                </button>
              </p>
            )}

            {query && (
              <p className="text-sm text-gray-500 mb-5">
                {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
              </p>
            )}

            {filtered.length === 0 ? (
              <p className="text-center py-16 text-gray-400 text-sm">No articles found. Try a different search, craft or category.</p>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                  {filtered.slice(0, visible).map((a, i) => (
                    <ArticleCard
                      key={a.slug}
                      article={a}
                      size="grid"
                      minutes={readMinutes(a)}
                      // Filtered views put the grid near the top: load its first row right away
                      priority={isFiltered && i < 3 ? 'eager' : 'lazy'}
                    />
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
