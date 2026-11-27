import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEOMeta from '@/components/SEOMeta';
import Breadcrumb from '@/components/Breadcrumb';
import { trackSeoCTAClicked } from '@/lib/analytics';
import { copyText } from '@/components/tools/toolWords';
import SiteNav from '@/components/layout/SiteNav';
import SiteFooter from '@/components/layout/SiteFooter';
import { TOOLS } from '@/lib/navData';

export const PINK = '#F52B8C';
const ORIGIN = 'https://getnelsy.com';

export function NumberField({
  label, value, onChange, min = 0, max, step = 1, prefix, suffix, hint,
}: {
  label: string; value: number; onChange: (v: number) => void;
  min?: number; max?: number; step?: number; prefix?: string; suffix?: string; hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      {hint && <p className="text-xs text-gray-400 mb-2">{hint}</p>}
      <div className="flex items-center rounded-xl border-2 border-gray-200 focus-within:border-pink-400 overflow-hidden transition-colors">
        {prefix && <span className="px-3 py-2.5 bg-gray-50 text-gray-500 text-sm font-medium border-r border-gray-200 select-none">{prefix}</span>}
        <input
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => {
            const v = Math.max(min, Number(e.target.value) || 0);
            onChange(max !== undefined ? Math.min(max, v) : v);
          }}
          className="flex-1 px-3 py-2.5 text-sm font-medium text-gray-900 outline-none bg-white min-w-0"
        />
        {suffix && <span className="px-3 py-2.5 bg-gray-50 text-gray-500 text-sm font-medium border-l border-gray-200 select-none">{suffix}</span>}
      </div>
    </div>
  );
}

export function ResultLine({ label, value, formula, highlight = false }: { label: string; value: string; formula?: string; highlight?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-3 py-3 border-b border-gray-100 last:border-0">
      <div>
        <p className={`text-sm ${highlight ? 'font-bold text-gray-900' : 'font-medium text-gray-600'}`}>{label}</p>
        {formula && <p className="text-xs text-gray-400 mt-0.5 font-mono">{formula}</p>}
      </div>
      <span className={`flex-shrink-0 font-bold text-right ${highlight ? 'text-xl' : 'text-sm text-gray-700'}`} style={highlight ? { color: PINK } : undefined}>
        {value}
      </span>
    </div>
  );
}

export function CopyButton({ text, label = 'Copy', className = '' }: { text: string; label?: string; className?: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  async function handle() {
    const ok = await copyText(text);
    setState(ok ? 'copied' : 'failed');
    window.setTimeout(() => setState('idle'), 2000);
  }
  return (
    <button
      type="button"
      onClick={() => void handle()}
      data-copy={text}
      className={`flex-shrink-0 rounded-lg border px-3 py-1.5 text-xs font-bold transition ${
        state === 'copied' ? 'border-green-300 bg-green-50 text-green-700' : 'border-gray-200 bg-white text-gray-700 hover:border-pink-300'
      } ${className}`}
      aria-live="polite"
    >
      {state === 'copied' ? 'Copied' : state === 'failed' ? 'Select and copy' : label}
    </button>
  );
}

export function TextField({
  label, value, onChange, placeholder, hint, maxLength = 40,
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; hint?: string; maxLength?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      {hint && <p className="text-xs text-gray-400 mb-2">{hint}</p>}
      <input
        type="text"
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border-2 border-gray-200 focus:border-pink-400 px-3 py-2.5 text-sm font-medium text-gray-900 outline-none bg-white transition-colors"
      />
    </div>
  );
}

export function ChoiceField<T extends string>({
  label, value, onChange, options,
}: {
  label: string; value: T; onChange: (v: T) => void; options: { value: T; label: string }[];
}) {
  return (
    <fieldset>
      <legend className="block text-sm font-semibold text-gray-700 mb-2">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            aria-pressed={value === o.value}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              value === o.value ? 'border-transparent text-white' : 'border-gray-200 bg-white text-gray-600 hover:border-pink-300'
            }`}
            style={value === o.value ? { backgroundColor: PINK } : undefined}
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export const SIGNUP_HREF = '/onboarding?plan=independent_monthly';

function SignupCTA({ label }: { label: string }) {
  const { pathname } = useLocation();
  return (
    <Link
      to={SIGNUP_HREF}
      onClick={() => trackSeoCTAClicked(pathname, 'footer_cta', label)}
      className="inline-block px-10 py-4 bg-white font-bold rounded-2xl hover:bg-gray-50 transition active:scale-95 shadow-2xl text-base sm:text-lg"
      style={{ color: PINK }}
    >
      {label}
    </Link>
  );
}

export function Prose({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id}>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="space-y-4 text-[15px] text-gray-600 leading-relaxed">{children}</div>
    </section>
  );
}

interface ToolPageProps {
  slug: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  calculator: ReactNode;
  toc: { id: string; label: string }[];
  children: ReactNode;
  faq: { q: string; a: string }[];
  cta: { title: string; text: string };
  related: { label: string; href: string }[];
}

/** Shared layout for free tools: calculator, explanation, FAQ (with schema) and links to sibling tools. */
export default function ToolPage(p: ToolPageProps) {
  const url = `${ORIGIN}/tools/${p.slug}`;
  const siblings = TOOLS.filter((t) => t.slug !== p.slug && t.status !== 'coming-soon');

  useEffect(() => {
    document.dispatchEvent(new Event('render-complete'));
  }, []);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: p.name,
      url,
      description: p.seoDescription,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      isPartOf: { '@type': 'WebSite', url: ORIGIN },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Free tools', item: `${ORIGIN}/tools` },
        { '@type': 'ListItem', position: 3, name: p.name, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: p.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  return (
    <div className="font-sans min-h-screen bg-white antialiased">
      <SEOMeta title={p.seoTitle} description={p.seoDescription} canonical={`/tools/${p.slug}`} jsonLd={jsonLd} />
      <SiteNav />
      <div style={{ paddingTop: 56 }}>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Free tools', href: '/tools' }, { label: p.name }]} />

        <section style={{ background: 'linear-gradient(135deg, #FFF7FA 0%, #FFFFFF 60%)' }} className="px-4 pt-8 pb-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: PINK }}>Free tool · No signup</p>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1A1A1A] mb-4 leading-tight">{p.h1}</h1>
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">{p.intro}</p>
          </div>
        </section>

        <section className="px-4 pb-14">
          <div className="max-w-4xl mx-auto">{p.calculator}</div>
        </section>

        <section className="py-14 sm:py-20 bg-gray-50 px-4">
          <div className="max-w-3xl mx-auto space-y-12">
            <nav aria-label="On this page" className="bg-white rounded-2xl border border-gray-200 p-5">
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">On this page</p>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                {p.toc.map((t) => (
                  <li key={t.id}><a href={`#${t.id}`} className="text-gray-600 hover:text-gray-900 underline-offset-2 hover:underline">{t.label}</a></li>
                ))}
                <li><a href="#faq" className="text-gray-600 hover:text-gray-900 underline-offset-2 hover:underline">FAQ</a></li>
              </ul>
            </nav>

            {p.children}

            <section id="faq">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
              <div className="space-y-4">
                {p.faq.map((f) => (
                  <div key={f.q} className="bg-white rounded-xl p-5 border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm">{f.q}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section className="py-14 sm:py-20 text-white px-4 text-center" style={{ background: `linear-gradient(to bottom right, ${PINK}, #9333EA)` }}>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{p.cta.title}</h2>
            <p className="text-base sm:text-lg text-white/80 mb-8 max-w-lg mx-auto">{p.cta.text}</p>
            <SignupCTA label="Start your 14-day free trial →" />
            <p className="mt-5 text-xs text-white/60">$0 today · Cancel anytime · 0% Nelsy commission</p>
          </div>
        </section>

        <section className="py-10 px-4 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">More free tools</p>
              <ul className="space-y-2">
                {siblings.map((t) => (
                  <li key={t.slug}><Link to={t.route} className="text-sm font-medium text-gray-600 hover:text-gray-900 underline underline-offset-2">{t.title}</Link></li>
                ))}
                <li><Link to="/tools" className="text-sm font-medium hover:underline underline-offset-2" style={{ color: PINK }}>All free tools →</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Related guides</p>
              <ul className="space-y-2">
                {p.related.map((r) => (
                  <li key={r.href}><Link to={r.href} className="text-sm font-medium text-gray-600 hover:text-gray-900 underline underline-offset-2">{r.label}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </div>
  );
}
