import { useParams, Link, useLocation } from 'react-router-dom';
import NotFound from '@/pages/NotFound';
import { useEffect } from 'react';
import { getArticle, getRelatedArticles, getMoreInCategory, isProArticle, PRO_GUIDES, CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/articleRegistry';
import SEOMeta from '@/components/SEOMeta';
import SiteNav from '@/components/layout/SiteNav';
import SiteFooter from '@/components/layout/SiteFooter';
import ArticleTOC from '@/components/article/ArticleTOC';
import ArticleCard, { ArticleCover, coverUrl } from '@/components/article/ArticleCard';
import { ArticleCTABlock, ArticleTLDR, SummarizeWithAI } from '@/components/article/ArticleBodyComponents';
import {
  ArticleBody, ArticleSidebarCTA, FreeToolsBox, NelsyPagesBox, articleStats, readMinutes, resolveArticleLinks,
} from '@/components/article/ArticleTemplateBlocks';
import RelatedFeatures from '@/components/article/RelatedFeatures';
import { trackArticleLandingView, trackArticleCTAClicked, track } from '@/lib/analytics';

const ORIGIN = 'https://getnelsy.com';

const fmt = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric' });

export default function BlogArticlePage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { pathname } = useLocation();
  const article = getArticle(slug);

  useEffect(() => {
    if (article) trackArticleLandingView(pathname, article.slug, article.category);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!article) return <NotFound backTo="/blog" backLabel="Browse all guides" />;

  const related = getRelatedArticles(slug, 3);
  const moreInCategory = getMoreInCategory(slug, related.map((a) => a.slug), 8);
  // Two of them go into the inline "Keep reading" box, the rest in the list at the end
  const keepReading = moreInCategory.slice(0, 2);
  const moreList = moreInCategory.slice(2);
  const { tools, pages } = resolveArticleLinks(article);
  const cat = CATEGORY_COLORS[article.category];
  const catLabel = CATEGORY_LABELS[article.category];
  const minutes = readMinutes(article);

  const publishDate = fmt(article.publishedAt);
  const updateDate = article.updatedAt ? fmt(article.updatedAt) : null;

  const canonicalPath = `/blog/${article.slug}`;
  const url = `${ORIGIN}${canonicalPath}`;
  const hasRealImage = article.heroImage.startsWith('/');
  // og:image uses the JPEG version of the generated cover (widest crawler support)
  const coverSrc = hasRealImage ? article.heroImage : coverUrl(article.slug, 'jpg');
  const ogImage = `${ORIGIN}${coverSrc}`;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.seoTitle ?? article.title,
      description: article.seoDescription ?? article.excerpt,
      url,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      datePublished: article.publishedAt,
      dateModified: article.updatedAt ?? article.publishedAt,
      articleSection: catLabel,
      keywords: article.tags.join(', '),
      wordCount: articleStats(article).words,
      timeRequired: `PT${minutes}M`,
      author: { '@type': 'Organization', name: article.author, url: ORIGIN },
      publisher: {
        '@type': 'Organization',
        name: 'Nelsy',
        url: ORIGIN,
        logo: { '@type': 'ImageObject', url: `${ORIGIN}/og-image.png` },
      },
      image: { '@type': 'ImageObject', url: ogImage, ...(hasRealImage ? {} : { width: 1200, height: 675 }) },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${ORIGIN}/blog` },
        { '@type': 'ListItem', position: 3, name: article.title, item: url },
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

  const ctaClick = (position: 'mid_article' | 'sidebar' | 'footer_cta') => () =>
    trackArticleCTAClicked(pathname, article.slug, article.category, position, 'Start your free trial');

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

      <div className="bg-white min-h-screen pt-14">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <header className="bg-[#FDF0F7]/60 border-b border-[#F4C2C2]/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-9 pb-10 md:py-14">
            <div className="grid md:grid-cols-[1.1fr_1fr] gap-8 md:gap-12 items-center">
              <div className="min-w-0">
                <nav aria-label="Breadcrumb" className="mb-5">
                  <ol className="flex items-center gap-1.5 flex-wrap text-[13px] sm:text-xs text-gray-500">
                    <li><Link to="/" className="hover:text-[#1A1A1A] transition">Home</Link></li>
                    <li aria-hidden className="text-gray-300">›</li>
                    <li><Link to="/blog" className="hover:text-[#1A1A1A] transition">Blog</Link></li>
                    <li aria-hidden className="text-gray-300">›</li>
                    <li>
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                        style={{ background: cat.bg, color: cat.text }}
                      >
                        {catLabel}
                      </span>
                    </li>
                  </ol>
                </nav>

                <h1 className="font-serif text-[2rem] leading-[1.2] sm:text-4xl sm:leading-[1.15] lg:text-5xl lg:leading-[1.1] font-bold text-[#1A1A1A] mb-5 tracking-tight">
                  {article.title}
                </h1>

                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #F52B8C, #FF8EC7)' }}
                    aria-hidden
                  >
                    N
                  </div>
                  <div className="text-sm leading-tight">
                    <p className="font-semibold text-[#1A1A1A]">By {article.author}</p>
                    <p className="text-gray-500 mt-1">
                      {updateDate ? (
                        <>Updated <time dateTime={article.updatedAt}>{updateDate}</time></>
                      ) : (
                        <time dateTime={article.publishedAt}>{publishDate}</time>
                      )}
                      <span aria-hidden> · </span>{minutes} min read
                    </p>
                  </div>
                </div>

                <SummarizeWithAI
                  url={url}
                  title={article.title}
                  onClick={(tool) => track('article_summarize_clicked', { slug: article.slug, tool })}
                />
              </div>

              <div className="relative">
                <ArticleCover
                  article={article}
                  priority="high"
                  className="w-full aspect-video rounded-2xl shadow-xl shadow-[#F52B8C]/10"
                />
              </div>
            </div>
          </div>
        </header>

        {/* ── Body ─────────────────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <div className="grid lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-12 xl:gap-16">

            <ArticleTOC sections={article.toc}>
              <ArticleSidebarCTA onClick={ctaClick('sidebar')} />
            </ArticleTOC>

            <main className="min-w-0">
              <div className="prose-article max-w-[720px]">
                {article.tldr && <ArticleTLDR {...article.tldr} />}
                <ArticleBody article={article} keepReading={keepReading} onMidCtaClick={ctaClick('mid_article')} />

                {/* Related Nelsy features (opt-in per article via relatedFeatureSlugs) */}
                {article.relatedFeatureSlugs?.length ? (
                  <RelatedFeatures slugs={article.relatedFeatureSlugs} />
                ) : null}

                {/* FAQ */}
                {article.faq?.length ? (
                  <section className="mt-12">
                    <h2 id="faq" className="font-serif text-2xl font-bold text-[#1A1A1A] mb-6">
                      Frequently asked questions
                    </h2>
                    <div className="space-y-3">
                      {article.faq.map((item, i) => (
                        <details
                          key={i}
                          className="group bg-white rounded-2xl border border-[#1A1A1A]/10 p-5 cursor-pointer open:border-[#F52B8C]/40"
                        >
                          <summary className="font-semibold text-[#1A1A1A] text-base sm:text-[15px] leading-snug list-none flex items-center justify-between gap-3">
                            {item.q}
                            <span className="text-[#F52B8C] flex-shrink-0 transition-transform group-open:rotate-45 text-xl leading-none" aria-hidden>
                              +
                            </span>
                          </summary>
                          <p className="mt-3 text-[15px] sm:text-sm text-gray-600 leading-relaxed">{item.a}</p>
                        </details>
                      ))}
                    </div>
                  </section>
                ) : null}

                {/* End CTA */}
                <ArticleCTABlock onCtaClick={ctaClick('footer_cta')} />

                <FreeToolsBox tools={tools} />
                <NelsyPagesBox pages={pages} />

                {/* Guides for nail techs (money pages) */}
                {isProArticle(article) && (
                  <nav aria-label="Guides for nail techs" className="not-prose mt-8 rounded-3xl border border-[#1A1A1A]/10 p-5 sm:p-8">
                    <p className="font-serif text-xl font-bold text-[#1A1A1A] mb-4">Guides for nail techs</p>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3.5 sm:gap-y-2.5">
                      {PRO_GUIDES.map((g) => (
                        <li key={g.path}>
                          <Link to={g.path} className="text-[15px] sm:text-sm font-medium text-[#1A1A1A] hover:text-[#F52B8C] transition">
                            {g.label} →
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
              </div>
            </main>
          </div>
        </div>

        {/* ── Related articles ─────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="border-t border-[#F4C2C2]/30 bg-[#FFFBFB] py-12 md:py-16 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-serif text-[28px] leading-tight sm:text-3xl font-bold text-[#1A1A1A] mb-6 sm:mb-8">You might also like</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-6">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} size="spotlight" />
                ))}
              </div>
              {moreList.length > 0 && (
                <nav aria-label={`More in ${catLabel}`} className="mt-12">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">More in {catLabel}</h3>
                  <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 sm:gap-y-3">
                    {moreList.map((a) => (
                      <li key={a.slug}>
                        <Link to={`/blog/${a.slug}`} className="text-[15px] text-[#1A1A1A] hover:text-[#F52B8C] transition leading-snug">
                          {a.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
              <Link
                to="/blog"
                className="mt-10 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#F52B8C] transition-colors"
              >
                <span aria-hidden>←</span> Back to the Nelsy Blog
              </Link>
            </div>
          </section>
        )}
      </div>

      <SiteFooter />
    </>
  );
}
