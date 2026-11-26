import { Link } from 'react-router-dom';
import { FEATURES, TOOLS, USE_CASE_PERSONAS, USE_CASE_GOALS } from '@/lib/navData';

const PINK = '#F52B8C';

type FooterLink = { label: string; to: string };

// Built from navData so the footer and the menus never drift apart, and only live pages are linked.
// The footer is the sitewide internal-linking hub: dropdown menus are not in the prerendered HTML.
const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Product',
    links: FEATURES.filter((f) => f.status !== 'coming-soon').map((f) => ({ label: f.title, to: f.route })),
  },
  {
    title: 'Who it’s for',
    links: [
      ...USE_CASE_PERSONAS.filter((p) => p.live).map((p) => ({ label: p.title, to: p.route })),
      ...USE_CASE_GOALS.map((g) => ({ label: g.title, to: g.route })),
    ],
  },
  {
    title: 'Free tools',
    links: [
      ...TOOLS.filter((t) => t.status !== 'coming-soon').map((t) => ({ label: t.title, to: t.route })),
      { label: 'All free tools', to: '/tools' },
    ],
  },
  {
    title: 'Compare',
    links: [
      { label: 'Best booking apps', to: '/best-booking-app-for-nail-techs' },
      { label: 'Fresha vs Booksy', to: '/blog/fresha-vs-booksy-for-nail-techs' },
      { label: 'GlossGenius vs Booksy', to: '/blog/glossgenius-vs-booksy-nail-techs' },
      { label: 'GlossGenius vs Fresha', to: '/blog/glossgenius-vs-fresha-for-nail-techs' },
      { label: 'Fresha review', to: '/blog/should-nail-techs-use-fresha' },
      { label: 'Is GlossGenius worth it?', to: '/blog/is-glossgenius-worth-it-nail-techs' },
      { label: 'Fresha alternative', to: '/fresha-alternative-nail-techs' },
      { label: 'Booksy alternative', to: '/booksy-alternative-nail-techs' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', to: '/blog' },
      { label: 'Glossary', to: '/glossary' },
      { label: 'Make money as a beauty creator', to: '/blog/how-to-make-money-as-a-beauty-creator' },
      { label: 'Collect deposits', to: '/nail-tech-deposits' },
      { label: 'Instagram booking', to: '/instagram-booking-for-nail-techs' },
      { label: 'Pricing guide', to: '/blog/nail-tech-pricing-guide' },
      { label: 'Deposit policy', to: '/blog/nail-tech-deposit-policy' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Pricing', to: '/pricing' },
      { label: 'Live demo', to: '/demo' },
      { label: 'Start free trial', to: '/onboarding' },
      { label: 'Contact', to: '/contact' },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-14 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10 mb-12">
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-3">{col.title}</p>
              <ul className="space-y-2 text-sm text-gray-400">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="hover:text-white transition">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md" style={{ backgroundColor: PINK }} />
            <span className="font-bold text-white">Nelsy</span>
            <span className="text-xs text-gray-500 ml-2 hidden sm:inline">The Beauty Creator Store</span>
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition">Terms</Link>
            <a href="mailto:support@getnelsy.com" className="hover:text-white transition">support@getnelsy.com</a>
          </div>
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} Nelsy</p>
        </div>
      </div>
    </footer>
  );
}
