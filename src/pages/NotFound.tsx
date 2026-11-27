import { Link } from 'react-router-dom';
import SEOMeta from '@/components/SEOMeta';
import SiteNav from '@/components/layout/SiteNav';
import SiteFooter from '@/components/layout/SiteFooter';

const PINK = '#F52B8C';

/** Shown for unknown URLs. noindex keeps them out of Google (no soft 404s in Search Console). */
export default function NotFound({ backTo = '/', backLabel = 'Go to the homepage' }: { backTo?: string; backLabel?: string }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SEOMeta title="Page not found" description="This page does not exist on Nelsy." noindex />
      <SiteNav />
      <main className="flex-1 flex items-center justify-center px-6 py-32">
        <div className="max-w-md text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] mb-3" style={{ color: PINK }}>404</p>
          <h1 className="font-serif text-4xl font-bold text-[#1A1A1A] mb-4">This page does not exist</h1>
          <p className="text-gray-600 mb-8">The link may be old or mistyped. Here are a few good places to go instead.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to={backTo} className="inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-white" style={{ background: PINK }}>
              {backLabel}
            </Link>
            <Link to="/blog" className="inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-[#1A1A1A] border border-gray-200 hover:border-gray-300">
              Read the blog
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
