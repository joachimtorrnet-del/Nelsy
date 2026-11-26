import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOMeta from '@/components/SEOMeta';
import Breadcrumb from '@/components/Breadcrumb';
import SiteNav from '@/components/layout/SiteNav';
import SiteFooter from '@/components/layout/SiteFooter';
import { GLOSSARY } from '@/lib/glossary';
import type { GlossaryTerm } from '@/lib/glossary';

const PINK = '#F52B8C';
const ORIGIN = 'https://getnelsy.com';

export default function GlossaryIndex() {
  useEffect(() => {
    document.dispatchEvent(new Event('render-complete'));
  }, []);

  const groups = GLOSSARY.reduce<Record<string, GlossaryTerm[]>>((acc, t) => {
    const letter = t.term[0].toUpperCase();
    (acc[letter] ??= []).push(t);
    return acc;
  }, {});
  const letters = Object.keys(groups).sort();

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      '@id': `${ORIGIN}/glossary`,
      name: 'Beauty Business Glossary',
      url: `${ORIGIN}/glossary`,
      hasDefinedTerm: GLOSSARY.map((t) => ({
        '@type': 'DefinedTerm',
        name: t.term,
        description: t.short,
        url: `${ORIGIN}/glossary/${t.slug}`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Glossary', item: `${ORIGIN}/glossary` },
      ],
    },
  ];

  return (
    <div className="font-sans min-h-screen bg-white antialiased">
      <SEOMeta
        title="Beauty Business Glossary: Nail & Booking Terms"
        description="Plain-English definitions of the nail and booking terms beauty pros search for, from apex and bead ratio to deposits, no-shows and booth rental."
        canonical="/glossary"
        jsonLd={jsonLd}
      />
      <SiteNav />
      <div style={{ paddingTop: 56 }}>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Glossary' }]} />
        <div className="max-w-3xl mx-auto px-4 pt-8 pb-16 md:pb-24">
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: PINK }}>Glossary</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">Beauty business glossary</h1>
          <p className="text-gray-500 text-lg mb-8 max-w-xl">
            Short, clear definitions of the nail techniques and booking terms beauty pros use every day, with links to the guides that go further.
          </p>

          <nav aria-label="Letters" className="flex flex-wrap gap-2 mb-10">
            {letters.map((l) => (
              <a key={l} href={`#letter-${l}`} className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700 hover:border-pink-300">
                {l}
              </a>
            ))}
          </nav>

          <div className="space-y-10">
            {letters.map((l) => (
              <section key={l} id={`letter-${l}`}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">{l}</h2>
                <ul className="space-y-4">
                  {groups[l].map((t) => (
                    <li key={t.slug}>
                      <Link to={`/glossary/${t.slug}`} className="font-semibold hover:underline underline-offset-2" style={{ color: PINK }}>
                        {t.term}
                      </Link>
                      <p className="text-sm text-gray-500 leading-relaxed mt-1">{t.short}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-14 rounded-2xl bg-gray-50 border border-gray-200 p-6">
            <p className="font-semibold text-gray-900 mb-2">Free tools for beauty pros</p>
            <p className="text-sm text-gray-500 mb-3">Calculators, generators and templates to price, protect and grow your bookings.</p>
            <Link to="/tools" className="text-sm font-semibold underline underline-offset-2" style={{ color: PINK }}>See all free tools</Link>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
