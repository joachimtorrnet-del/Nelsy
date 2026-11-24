import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEOMeta from '@/components/SEOMeta';
import SiteNav from '@/components/layout/SiteNav';
import SiteFooter from '@/components/layout/SiteFooter';
import SeoCTA from '@/components/SeoCTA';
import { PublicStudioView } from '@/components/studio/PublicStudioView';
import { STUDIO_TEMPLATES, TEMPLATE_DEMOS } from '@/lib/templateDemos';
import type { Merchant } from '@/types';

const PINK = '#F52B8C';

/** Public demo: a real Nelsy page rendered with example personas, one per template. */
export default function Demo() {
  const [params, setParams] = useSearchParams();
  const initial = STUDIO_TEMPLATES.find((t) => t.id === params.get('template'))?.id ?? 'classic';
  const [templateId, setTemplateId] = useState<string>(initial);

  useEffect(() => {
    document.dispatchEvent(new Event('render-complete'));
  }, []);

  const template = STUDIO_TEMPLATES.find((t) => t.id === templateId) ?? STUDIO_TEMPLATES[0];
  const base = TEMPLATE_DEMOS[template.id];
  const merchant: Merchant = { ...base, theme_preset: template.themeId, color_accent: template.accentColor };

  const pick = (id: string) => {
    setTemplateId(id);
    setParams(id === 'classic' ? {} : { template: id }, { replace: true });
  };

  return (
    <div className="font-sans min-h-screen bg-[#FFFBFB] antialiased">
      <SEOMeta
        title="Live Demo: See a Nelsy Page in Action"
        description="See what a Nelsy page looks like for a nail tech, lash artist, makeup artist or esthetician: services, prices and booking in one link in bio. 11 templates."
        canonical="/demo"
      />
      <SiteNav />
      <main className="pt-20 pb-16 px-4">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_auto] gap-10 items-start">
          <div className="lg:pt-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: PINK }}>Live demo</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4 leading-tight">
              This is what your Nelsy page looks like
            </h1>
            <p className="text-gray-500 text-lg mb-6 max-w-md">
              Your services, prices and booking on one link for your bio. Pick a template to see it with a different style and craft.
            </p>
            <div className="flex flex-wrap gap-2 mb-8" role="radiogroup" aria-label="Templates">
              {STUDIO_TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={t.id === templateId}
                  onClick={() => pick(t.id)}
                  className={`px-3.5 py-2 rounded-full text-sm font-semibold border transition ${t.id === templateId ? 'text-white border-transparent' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'}`}
                  style={t.id === templateId ? { backgroundColor: '#1A1A1A' } : undefined}
                >
                  {t.name}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Showing <strong className="text-gray-800">{base.salon_name}</strong>, an example {base.specialty?.toLowerCase()} page. Names and photos are examples.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <SeoCTA label="Create my page free →" position="hero" />
              <Link to="/pricing" className="text-sm font-semibold underline underline-offset-2 text-gray-700">See pricing</Link>
            </div>
            <p className="mt-3 text-xs text-gray-400">14-day free trial · $0 today · 0% Nelsy commission</p>
          </div>

          <div className="mx-auto">
            <div className="rounded-[36px] border-[10px] border-[#1A1A1A] overflow-hidden shadow-2xl bg-white" style={{ width: 390, maxWidth: 'calc(100vw - 32px)' }}>
              <div className="h-[720px] overflow-y-auto">
                <PublicStudioView key={template.id} merchant={merchant} mode="preview" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
