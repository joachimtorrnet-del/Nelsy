import { useParams, Navigate, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { getArticle, getRelatedArticles, CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/articleRegistry';
import SEOMeta from '@/components/SEOMeta';
import SiteNav from '@/components/layout/SiteNav';
import SiteFooter from '@/components/layout/SiteFooter';
import ArticleTOC from '@/components/article/ArticleTOC';
import ArticleCard from '@/components/article/ArticleCard';
import { ArticleCTABlock } from '@/components/article/ArticleBodyComponents';
import RelatedFeatures from '@/components/article/RelatedFeatures';
import { useEffect } from 'react';
import { trackArticleLandingView, trackArticleCTAClicked } from '@/lib/analytics';

const ORIGIN = 'https://getnelsy.com';

export default function BlogArticlePage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { pathname } = useLocation();
  const article = getArticle(slug);

  useEffect(() => {
    if (article) trackArticleLandingView(pathname, article.slug, article.category);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!article) return <Navigate to="/blog" replace />;

  const related = getRelatedArticles(slug, 3);
  const cat = CATEGORY_COLORS[article.category];
  const catLabel = CATEGORY_LABELS[article.category];

  const publishDate = new Date(article.publishedAt).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
  const updateDate = article.updatedAt
    ? new Date(article.updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  const canonicalPath = `/blog/${article.slug}`;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.seoTitle ?? article.title,
      description: article.seoDescription ?? article.excerpt,
      url: `${ORIGIN}${canonicalPath}`,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt ?? article.publishedAt,
      author: { '@type': 'Person', name: article.author },
      publisher: {
        '@type': 'Organization',
        name: 'Nelsy',
        url: ORIGIN,
        logo: { '@type': 'ImageObject', url: `${ORIGIN}/og-image.png` },
      },
      image: article.heroImage.startsWith('/') ? `${ORIGIN}${article.heroImage}` : undefined,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${ORIGIN}/blog` },
        { '@type': 'ListItem', position: 3, name: article.title, item: `${ORIGIN}${canonicalPath}` },
      ],
    },
    ...(article.faq?.length
      ? [{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: article.faq.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }]
      : []),
  ];

  const articleSlug = article.slug;
  const articleCategory = article.category;

  function handleCTAClick() {
    trackArticleCTAClicked(pathname, articleSlug, articleCategory, 'footer_cta', 'Start free →');
  }

  const hasRealImage = article.heroImage.startsWith('/');
  // Prefer real image for OG; fall back to generated cover
  const ogImage = hasRealImage
    ? `${ORIGIN}${article.heroImage}`
    : `${ORIGIN}/blog-covers/${article.slug}.png`;

  return (
    <>
      <SEOMeta
        title={article.seoTitle ?? article.title}
        description={article.seoDescription ?? article.excerpt}
        canonical={canonicalPath}
        ogType="article"
        ogImage={ogImage}
        jsonLd={jsonLd}
      />
      <SiteNav />

      <div className="bg-[#FFFBFB] min-h-screen pt-14">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <header className="border-b border-[#F4C2C2]/30 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
            <div className="grid md:grid-cols-2 gap-10 items-center">

              {/* Left */}
              <div>
                {/* Breadcrumb */}
                <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 flex-wrap mb-5">
                  <Link to="/" className="text-xs text-gray-400 hover:text-gray-600 transition">Home</Link>
                  <span className="text-gray-300 text-xs" aria-hidden>›</span>
                  <Link to="/blog" className="text-xs text-gray-400 hover:text-gray-600 transition">Blog</Link>
                  <span className="text-gray-300 text-xs" aria-hidden>›</span>
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ background: cat.bg, color: cat.text }}
                  >
                    {catLabel}
                  </span>
                </nav>

                <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] leading-snug mb-4">
                  {article.title}
                </h1>

                <p className="text-gray-500 text-lg leading-relaxed mb-6">
                  {article.excerpt}
                </p>

                {/* Author + date */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #F52B8C, #FF8EC7)' }}
                  >
                    {article.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A]">{article.author}</p>
                    <p className="text-xs text-gray-400">{article.authorRole}</p>
                  </div>
                  <span className="text-gray-200 mx-1 hidden sm:inline" aria-hidden>|</span>
                  <div className="text-xs text-gray-400">
                    <time dateTime={article.publishedAt}>{publishDate}</time>
                    {updateDate && <span className="ml-2">· Updated {updateDate}</span>}
                  </div>
                </div>
              </div>

              {/* Right: hero visual */}
              <div className="relative">
                {hasRealImage ? (
                  <img
                    src={article.heroImage}
                    alt={article.heroImageAlt}
                    className="w-full rounded-2xl object-cover shadow-lg"
                    style={{ maxHeight: 360 }}
                  />
                ) : (
                  <img
                    src={`/blog-covers/${article.slug}.png`}
                    alt={article.heroImageAlt}
                    className="w-full rounded-2xl object-cover shadow-lg"
                    style={{ maxHeight: 360 }}
                    loading="eager"
                    onError={(e) => {
                      // If generated cover is missing, show gradient fallback
                      const el = e.currentTarget as HTMLImageElement;
                      el.style.display = 'none';
                      const parent = el.parentElement;
                      if (parent) {
                        parent.style.height = '300px';
                        parent.style.background = article.heroImage;
                        parent.style.borderRadius = '1rem';
                      }
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </header>

        {/* ── Body ─────────────────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid lg:grid-cols-[220px_1fr] gap-12">

            {/* Sidebar TOC */}
            <ArticleTOC sections={article.toc} />

            {/* Main content */}
            <main className="min-w-0">
              <div className="prose-article max-w-[720px]">
                {article.content()}
              </div>

              {/* Related Nelsy features (opt-in per article via relatedFeatureSlugs) */}
              {article.relatedFeatureSlugs?.length ? (
                <RelatedFeatures slugs={article.relatedFeatureSlugs} />
              ) : null}

              {/* Product CTA */}
              <ArticleCTABlock onCtaClick={handleCTAClick} />

              {/* FAQ */}
              {article.faq?.length ? (
                <section className="mt-12">
                  <h2
                    id="faq"
                    className="font-serif text-2xl font-bold text-[#1A1A1A] mb-6"
                  >
                    Frequently asked questions
                  </h2>
                  <div className="space-y-4">
                    {article.faq.map((item, i) => (
                      <details
                        key={i}
                        className="group bg-white rounded-xl border border-[#F4C2C2]/30 p-5 cursor-pointer"
                      >
                        <summary className="font-semibold text-[#1A1A1A] text-sm list-none flex items-center justify-between gap-3">
                          {item.q}
                          <span className="text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180 text-xs" aria-hidden>
                            ▾
                          </span>
                        </summary>
                        <p className="mt-3 text-sm text-gray-600 leading-relaxed">{item.a}</p>
                      </details>
                    ))}
                  </div>
                </section>
              ) : null}
            </main>
          </div>
        </div>

        {/* ── Related articles ─────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="border-t border-[#F4C2C2]/30 bg-white py-16 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Keep reading</p>
              <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-8">
                Related guides
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} size="spotlight" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Back to blog ─────────────────────────────────────────────── */}
        <div className="border-t border-[#F4C2C2]/20 py-8 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#F52B8C] transition-colors"
            >
              <span aria-hidden>←</span> Back to the Nelsy Blog
            </Link>
          </div>
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
