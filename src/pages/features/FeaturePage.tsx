// Shared layout for /features/* landing pages
import { Link } from 'react-router-dom';
import SEOMeta from '@/components/SEOMeta';
import SiteNav from '@/components/layout/SiteNav';
import SiteFooter from '@/components/layout/SiteFooter';
import type { LucideIcon } from 'lucide-react';

const PINK = '#F52B8C';

export interface FeaturePageProps {
  // SEO
  title: string;
  metaDescription: string;
  canonical: string;
  // Hero
  h1: string;
  heroDescription: string;
  icon: LucideIcon;
  // Benefits
  benefits: Array<{ title: string; desc: string }>;
  // How it works
  steps: Array<{ step: string; title: string; desc: string }>;
  // Use cases
  useCases: string[];
  // FAQ
  faq: Array<{ q: string; a: string }>;
  // Related features
  relatedFeatures: Array<{ slug: string; title: string; route: string }>;
}

export default function FeaturePage({
  title, metaDescription, canonical,
  h1, heroDescription, icon: Icon,
  benefits, steps, useCases, faq, relatedFeatures,
}: FeaturePageProps) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description: metaDescription,
      url: `https://getnelsy.com${canonical}`,
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
        title={title}
        description={metaDescription}
        canonical={canonical}
        jsonLd={jsonLd}
      />
      <SiteNav />

      <div className="bg-[#FFFBFB] min-h-screen pt-14">

        {/* Hero */}
        <header className="bg-white border-b border-[#F4C2C2]/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 md:py-20 text-center">
            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
              style={{ background: `${PINK}12` }}
            >
              <Icon size={26} strokeWidth={1.75} color={PINK} />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-snug mb-5">
              {h1}
            </h1>
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
              {heroDescription}
            </p>
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-[15px] transition hover:opacity-90"
              style={{ background: PINK }}
            >
              Start for free
            </Link>
          </div>
        </header>

        {/* Benefits */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-2 text-center">
            Why it matters
          </h2>
          <p className="text-gray-400 text-center mb-10 text-sm">Built for beauty professionals who want to run a smoother business.</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {benefits.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#F4C2C2]/30 p-6">
                <div
                  className="w-2 h-2 rounded-full mb-3"
                  style={{ background: PINK }}
                />
                <h3 className="font-semibold text-[#1A1A1A] mb-1.5 text-[15px]">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="bg-white border-y border-[#F4C2C2]/30 py-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-10 text-center">
              How it works
            </h2>
            <div className="space-y-8">
              {steps.map((s, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <div
                    className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: `linear-gradient(135deg, ${PINK}, #FF8EC7)` }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1A1A] mb-1">{s.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-8 text-center">
            Who uses this
          </h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {useCases.map((u, i) => (
              <li key={i} className="flex items-start gap-3 bg-white rounded-xl border border-[#F4C2C2]/30 px-4 py-3">
                <span style={{ color: PINK }} className="mt-0.5 shrink-0 font-bold">✓</span>
                <span className="text-sm text-gray-700">{u}</span>
              </li>
            ))}
          </ul>
        </section>

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
              Start for free
            </Link>
          </div>
        </section>

        {/* FAQ */}
        {faq.length > 0 && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-8 text-center">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {faq.map((item, i) => (
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
        )}

        {/* Related features */}
        {relatedFeatures.length > 0 && (
          <section className="border-t border-[#F4C2C2]/30 bg-white py-12 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Explore more</p>
              <h2 className="font-serif text-xl font-bold text-[#1A1A1A] mb-6">Related features</h2>
              <div className="flex flex-wrap gap-3">
                {relatedFeatures.map(f => (
                  <Link
                    key={f.slug}
                    to={f.route}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#F4C2C2]/50 rounded-xl text-sm font-semibold text-gray-700 hover:border-[#F52B8C] hover:text-[#F52B8C] transition-colors"
                  >
                    {f.title} →
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
