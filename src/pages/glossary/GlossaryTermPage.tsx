import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import SEOMeta from '@/components/SEOMeta';
import Breadcrumb from '@/components/Breadcrumb';
import SeoCTA from '@/components/SeoCTA';
import SiteNav from '@/components/layout/SiteNav';
import SiteFooter from '@/components/layout/SiteFooter';
import { GLOSSARY, GLOSSARY_UPDATED, getGlossaryTerm } from '@/lib/glossary';

const PINK = '#F52B8C';
const ORIGIN = 'https://getnelsy.com';

export default function GlossaryTermPage() {
  const { term: slug = '' } = useParams();
  const term = getGlossaryTerm(slug);

  useEffect(() => {
    if (term) document.dispatchEvent(new Event('render-complete'));
  }, [term]);

  if (!term) return <Navigate to="/glossary" replace />;

  const url = `${ORIGIN}/glossary/${term.slug}`;
  const index = GLOSSARY.findIndex((t) => t.slug === term.slug);
  const prev = GLOSSARY[(index - 1 + GLOSSARY.length) % GLOSSARY.length];
  const next = GLOSSARY[(index + 1) % GLOSSARY.length];
  const description = term.short.length > 160 ? `${term.short.slice(0, 156).replace(/\s+\S*$/, '')}...` : term.short;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'DefinedTerm',
      name: term.term,
      description: term.short,
      url,
      inDefinedTermSet: { '@type': 'DefinedTermSet', '@id': `${ORIGIN}/glossary`, name: 'Beauty Business Glossary', url: `${ORIGIN}/glossary` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Glossary', item: `${ORIGIN}/glossary` },
        { '@type': 'ListItem', position: 3, name: term.term, item: url },
      ],
    },
  ];

  return (
    <div className="font-sans min-h-screen bg-white antialiased">
      <SEOMeta title={`${term.term}: Definition for Beauty Pros`} description={description} canonical={`/glossary/${term.slug}`} jsonLd={jsonLd} />
      <SiteNav />
      <div style={{ paddingTop: 56 }}>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Glossary', href: '/glossary' }, { label: term.term }]} />
        <article className="max-w-3xl mx-auto px-4 pt-8 pb-14">
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: PINK }}>Glossary</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-6">{term.term}</h1>
          <p className="text-lg sm:text-xl text-gray-800 leading-relaxed border-l-4 pl-4 mb-8" style={{ borderColor: PINK }}>
            {term.short}
          </p>
          <div className="space-y-4 text-[15px] text-gray-600 leading-relaxed">
            {term.body.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
          </div>
          <p className="text-xs text-gray-400 mt-8">Last updated <time dateTime={GLOSSARY_UPDATED}>November 26, 2026</time></p>

          <section className="mt-10 rounded-2xl bg-gray-50 border border-gray-200 p-6">
            <h2 className="text-base font-bold text-gray-900 mb-3">Related guides</h2>
            <ul className="space-y-2">
              {term.related.map((r) => (
                <li key={r.href}>
                  <Link to={r.href} className="text-sm font-medium text-gray-600 hover:text-gray-900 underline underline-offset-2">{r.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          <nav aria-label="More terms" className="mt-10 flex flex-col sm:flex-row justify-between gap-3 text-sm">
            <Link to={`/glossary/${prev.slug}`} className="text-gray-600 hover:text-gray-900">← {prev.term}</Link>
            <Link to="/glossary" className="font-semibold" style={{ color: PINK }}>All terms, A to Z</Link>
            <Link to={`/glossary/${next.slug}`} className="text-gray-600 hover:text-gray-900">{next.term} →</Link>
          </nav>
        </article>

        <section className="py-14 text-white px-4 text-center" style={{ background: `linear-gradient(to bottom right, ${PINK}, #9333EA)` }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Bookings, deposits and your shop, one link</h2>
            <p className="text-base text-white/80 mb-7 max-w-lg mx-auto">Nelsy is $29 a month, or $25 a month billed yearly, with 0% Nelsy commission. Try it free for 14 days.</p>
            <SeoCTA label="Start your 14-day free trial →" position="footer_cta" variant="primary-dark" />
          </div>
        </section>
      </div>
      <SiteFooter />
    </div>
  );
}
