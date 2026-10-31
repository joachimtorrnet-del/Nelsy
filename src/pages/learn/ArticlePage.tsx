import { useParams, Navigate } from 'react-router-dom';
// articleRegistry uses import.meta.glob to auto-import all article files
import { getArticle, getRelatedArticles, CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/articleRegistry';
import SEOMeta from '@/components/SEOMeta';
import SiteNav from '@/components/layout/SiteNav';
import SiteFooter from '@/components/layout/SiteFooter';
import ArticleTOC from '@/components/article/ArticleTOC';
import ArticleCard from '@/components/article/ArticleCard';
import { ArticleCTABlock } from '@/components/article/ArticleBodyComponents';
import { trackSeoCTAClicked } from '@/lib/analytics';
import { useLocation } from 'react-router-dom';

export default function ArticlePage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { pathname } = useLocation();
  const article = getArticle(slug);

  if (!article) return <Navigate to="/learn" replace />;

  const related = getRelatedArticles(slug, 3);
  const cat = CATEGORY_COLORS[article.category];
  const catLabel = CATEGORY_LABELS[article.category];

  const publishDate = new Date(article.publishedAt).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
  const updateDate = article.updatedAt
    ? new Date(article.updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  const ORIGIN = 'https://getnelsy.com';
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.seoTitle ?? article.title,
      description: article.seoDescription ?? article.excerpt,
      url: `${ORIGIN}/learn/${article.slug}`,
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
        { '@type': 'ListItem', position: 2, name: 'Learn', item: `${ORIGIN}/learn` },
        { '@type': 'ListItem', position: 3, name: article.title, item: `${ORIGIN}/learn/${article.slug}` },
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

  function handleCTAClick() {
    trackSeoCTAClicked(pathname, 'footer_cta', 'Start free →');
  }

  const hasRealImage = article.heroImage.startsWith('/');

  return (
    <>
      <SEOMeta
        title={article.seoTitle ?? article.title}
        description={article.seoDescription ?? article.excerpt}
        canonical={`/learn/${article.slug}`}
        ogType="article"
        ogImage={hasRealImage ? `${ORIGIN}${article.heroImage}` : undefined}
        jsonLd={jsonLd}
      />
      <SiteNav />

      <div className="bg-[#FFFBFB] min-h-screen">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <header className="border-b border-[#F4C2C2]/30 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
            <div className="grid md:grid-cols-2 gap-10 items-center">

              {/* Left */}
              <div>
                {/* Breadcrumb + category */}
                <div className="flex items-center gap-2 flex-wrap mb-5">
                  <a href="/learn" className="text-xs text-gray-400 hover:text-gray-600 transition">Learn</a>
                  <span className="text-gray-300 text-xs">›</span>
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ background: cat.bg, color: cat.text }}
                  >
                    {catLabel}
                  </span>
                </div>

                <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] leading-snug mb-4">
                  {article.title}
                </h1>

                <p className="text-gray-500 text-lg leading-relaxed mb-6">
                  {article.excerpt}
                </p>

                {/* Author block */}
                <div className="flex items-center gap-3">
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
                  <span className="text-gray-200 mx-1">|</span>
                  <div className="text-xs text-gray-400">
                    <span>{publishDate}</span>
                    {updateDate && <span className="ml-2">· Updated {updateDate}</span>}
                  </div>
                </div>
              </div>

              {/* Right: hero image */}
              <div className="relative">
                {hasRealImage ? (
                  <img
                    src={article.heroImage}
                    alt={article.heroImageAlt}
                    className="w-full rounded-2xl object-cover shadow-lg"
                    style={{ maxHeight: 360 }}
                  />
                ) : (
                  <div
                    className="w-full rounded-2xl shadow-inner flex items-center justify-center"
                    style={{
                      height: 300,
                      background: article.heroImage,
                    }}
                  >
                    <span className="font-serif text-4xl text-white/30 select-none font-bold">
                      {article.title.split(' ').slice(0, 2).join(' ')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* ── Body ──────────────────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-[200px_1fr] gap-12">

            {/* Sidebar */}
            <ArticleTOC sections={article.toc} />

            {/* Main content */}
            <main className="min-w-0">
              {/* Mobile TOC is rendered inside ArticleTOC */}

              <div className="prose-article max-w-[720px]">
                {article.content()}
              </div>

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
                        className="group bg-white rounded-xl border border-[#F4C2C2]/30 p-4 cursor-pointer"
                      >
                        <summary className="font-semibold text-[#1A1A1A] text-sm list-none flex items-center justify-between gap-3">
                          {item.q}
                          <span className="text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180">
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

        {/* ── Related articles ──────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="border-t border-[#F4C2C2]/30 bg-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-8">
                Keep reading
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} size="spotlight" />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <SiteFooter />
    </>
  );
}
