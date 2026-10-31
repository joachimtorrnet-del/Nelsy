// Shared layout for /use-cases/* landing pages
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOMeta from '@/components/SEOMeta';
import SiteNav from '@/components/layout/SiteNav';
import SiteFooter from '@/components/layout/SiteFooter';
import { getArticle } from '@/lib/articleRegistry';
import { FEATURES, USE_CASE_PERSONAS, USE_CASE_GOALS } from '@/lib/navData';
import {
  Calendar, Wallet, CreditCard, Gift, Layers,
  GraduationCap, FileDown, Gem, Video, PackageCheck,
  Link2, MessageCircle, Mail, UserPlus,
  UsersRound, BarChart3,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const PINK = '#F52B8C';

const FEATURE_ICONS: Record<string, LucideIcon> = {
  courses:            GraduationCap,
  'digital-products': FileDown,
  memberships:        Gem,
  coaching:           Video,
  'custom-products':  PackageCheck,
  bookings:           Calendar,
  deposits:           Wallet,
  payments:           CreditCard,
  'gift-cards':       Gift,
  packages:           Layers,
  'link-in-bio':      Link2,
  'instagram-autodm': MessageCircle,
  email:              Mail,
  'email-newsletters': Mail,
  'audience-capture': UserPlus,
  crm:                UsersRound,
  analytics:          BarChart3,
};

export interface UseCasePageProps {
  seo: {
    title: string;
    description: string;
    canonical: string;
    ogTitle?: string;
    ogDescription?: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    ctaLabel?: string;
  };
  sections: Array<{
    heading: string;
    body: string | string[];
  }>;
  faq: Array<{ q: string; a: string }>;
  relatedFeatures?: string[];
  relatedUseCases?: string[];
  relatedPostSlugs?: string[];
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="bg-white rounded-xl border border-[#F4C2C2]/30 overflow-hidden cursor-pointer"
      onClick={() => setOpen(v => !v)}
    >
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <p className="font-semibold text-[#1A1A1A] text-sm">{q}</p>
        <span className={`shrink-0 text-gray-400 text-xs transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden>
          ▾
        </span>
      </div>
      {open && (
        <div className="px-5 pb-4">
          <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function UseCasePage({
  seo, hero, sections, faq,
  relatedFeatures, relatedUseCases, relatedPostSlugs,
}: UseCasePageProps) {
  const ctaLabel = hero.ctaLabel ?? 'Start for free';

  const featureItems = (relatedFeatures ?? [])
    .map(slug => FEATURES.find(f => f.slug === slug))
    .filter((f): f is NonNullable<typeof f> => f !== undefined);

  const useCaseItems = (relatedUseCases ?? []).map(slug => {
    const persona = USE_CASE_PERSONAS.find(p => p.slug === slug);
    if (persona) return { title: persona.title, route: persona.route };
    const goal = USE_CASE_GOALS.find(g => g.slug === slug);
    if (goal) return { title: goal.title, route: goal.route };
    return null;
  }).filter((x): x is NonNullable<typeof x> => x !== null);

  const postItems = (relatedPostSlugs ?? [])
    .map(slug => getArticle(slug))
    .filter((a): a is NonNullable<typeof a> => a !== undefined);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: seo.title,
      description: seo.description,
      url: `https://getnelsy.com${seo.canonical}`,
      isPartOf: { '@type': 'WebSite', url: 'https://getnelsy.com' },
    },
    ...(faq.length ? [{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    }] : []),
  ];

  return (
    <>
      <SEOMeta
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        jsonLd={jsonLd}
      />
      <SiteNav />

      <div className="bg-[#FFFBFB] min-h-screen pt-14">

        {/* Hero */}
        <header className="bg-white border-b border-[#F4C2C2]/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 md:py-20 text-center">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-snug mb-5">
              {hero.headline}
            </h1>
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
              {hero.subheadline}
            </p>
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-[15px] transition hover:opacity-90"
              style={{ background: PINK }}
            >
              {ctaLabel}
            </Link>
          </div>
        </header>

        {/* Sections */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
          {sections.map((section, i) => (
            <section key={i}>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-4">
                {section.heading}
              </h2>
              {typeof section.body === 'string' ? (
                <p className="text-gray-600 leading-relaxed">{section.body}</p>
              ) : (
                <ul className="space-y-2">
                  {section.body.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-600">
                      <span className="mt-1 shrink-0 font-bold text-sm" style={{ color: PINK }}>✓</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* FAQ */}
        {faq.length > 0 && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-6 text-center">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {faq.map((item, i) => (
                <FAQItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section
          className="py-16 text-center"
          style={{ background: `linear-gradient(135deg, ${PINK}10, #FF8EC720)` }}
        >
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-4">
              Ready to get started?
            </h2>
            <p className="text-gray-500 mb-8">Set up in minutes. No tech skills needed.</p>
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-bold text-[15px] transition hover:opacity-90"
              style={{ background: PINK }}
            >
              {ctaLabel}
            </Link>
          </div>
        </section>

        {/* Related features */}
        {featureItems.length > 0 && (
          <section className="border-t border-[#F4C2C2]/30 bg-white py-12 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Explore more</p>
              <h2 className="font-serif text-xl font-bold text-[#1A1A1A] mb-6">Related features</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {featureItems.map(f => {
                  const Icon = FEATURE_ICONS[f.slug];
                  return (
                    <Link
                      key={f.slug}
                      to={f.route}
                      className="flex items-center gap-3 p-4 bg-white border border-[#F4C2C2]/50 rounded-xl hover:border-[#F52B8C] hover:text-[#F52B8C] transition-colors group"
                    >
                      {Icon && (
                        <span
                          className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg"
                          style={{ background: `${PINK}12` }}
                        >
                          <Icon size={14} strokeWidth={1.75} color={PINK} />
                        </span>
                      )}
                      <span className="text-sm font-semibold text-gray-700 group-hover:text-[#F52B8C] transition-colors">{f.title} →</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Related use cases */}
        {useCaseItems.length > 0 && (
          <section className="border-t border-[#F4C2C2]/30 py-10 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-xl font-bold text-[#1A1A1A] mb-5">Related use cases</h2>
              <div className="flex flex-wrap gap-3">
                {useCaseItems.map(item => (
                  <Link
                    key={item.route}
                    to={item.route}
                    className="inline-flex items-center px-4 py-2 bg-white border border-[#F4C2C2]/50 rounded-xl text-sm font-semibold text-gray-700 hover:border-[#F52B8C] hover:text-[#F52B8C] transition-colors"
                  >
                    {item.title} →
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* From the blog */}
        {postItems.length > 0 && (
          <section className="border-t border-[#F4C2C2]/30 bg-white py-12 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Learn more</p>
              <h2 className="font-serif text-xl font-bold text-[#1A1A1A] mb-6">From the blog</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {postItems.map(article => (
                  <Link
                    key={article.slug}
                    to={`/blog/${article.slug}`}
                    className="flex flex-col p-4 bg-[#FFFBFB] border border-[#F4C2C2]/30 rounded-xl hover:border-[#F52B8C]/40 transition-colors"
                  >
                    <p className="text-sm font-semibold text-gray-800 leading-snug mb-2 line-clamp-2">{article.title}</p>
                    <p className="text-xs text-gray-500 line-clamp-2 flex-1">{article.excerpt}</p>
                    <p className="mt-3 text-xs font-bold" style={{ color: PINK }}>Read article →</p>
                  </Link>
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
