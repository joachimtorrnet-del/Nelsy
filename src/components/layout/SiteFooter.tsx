import { Link } from 'react-router-dom';
import {
  NAV_PRODUCT_GROUPS, NAV_AUDIENCES, NAV_CTA, USE_CASE_GOALS, TOOLS,
  liveFeatures, liveCrafts, isLive,
} from '@/lib/navData';
import type { NavLink } from '@/lib/navData';

const PINK = '#F52B8C';

// Built from navData, in the same order as the header, so the two never drift apart
// and only live pages are linked. The footer is the sitewide internal-linking hub:
// dropdown menus are not in the prerendered HTML.
const ALL_FEATURES = NAV_PRODUCT_GROUPS.flatMap((g) => liveFeatures(g.key));
const toLink = (f: (typeof ALL_FEATURES)[number]) => ({ label: f.title, to: f.route });

// `subheading` starts a labelled group inside a column (used for Creator plan features).
const COLUMNS: { title: string; links: (NavLink & { subheading?: string })[] }[] = [
  {
    title: 'Product',
    links: [
      ...ALL_FEATURES.filter((f) => f.plan !== 'creator').map(toLink),
      ...ALL_FEATURES.filter((f) => f.plan === 'creator').map((f, i) => ({ ...toLink(f), subheading: i === 0 ? 'Creator plan' : undefined })),
    ],
  },
  {
    title: 'Who it’s for',
    links: [
      ...NAV_AUDIENCES.map((a) => ({ label: a.title, to: a.route })),
      ...liveCrafts().map((c) => ({ label: c.title, to: c.route })),
      ...USE_CASE_GOALS.map((g) => ({ label: g.title, to: g.route })),
    ],
  },
  {
    title: 'Free tools',
    links: [
      ...TOOLS.filter(isLive).map((t) => ({ label: t.title, to: t.route })),
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
      { label: 'Live demo', to: '/demo' },
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
      { label: 'Affiliates', to: '/affiliates' },
      { label: 'Contact', to: '/contact' },
      { label: 'Log in', to: '/login' },
      { label: NAV_CTA.label, to: NAV_CTA.to },
    ],
  },
];

const LINK = 'inline-block py-1 rounded hover:text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F52B8C]';

export default function SiteFooter() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-14 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10 mb-12">
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={`Footer: ${col.title}`}>
              <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">{col.title}</p>
              <ul className="space-y-0.5 text-sm text-gray-400">
                {col.links.map((l) => (
                  <li key={l.to}>
                    {l.subheading && (
                      <p className="mt-4 mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">{l.subheading}</p>
                    )}
                    <Link to={l.to} className={LINK}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className={`flex items-center gap-2 ${LINK}`}>
            <span className="w-6 h-6 rounded-md" style={{ backgroundColor: PINK }} aria-hidden="true" />
            <span className="font-bold text-white">Nelsy</span>
            <span className="text-xs text-gray-500 ml-2 hidden sm:inline">Your all-in-one link for nail techs</span>
          </Link>
          <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-5 text-sm text-gray-500">
            <Link to="/privacy" className={LINK}>Privacy</Link>
            <Link to="/terms" className={LINK}>Terms</Link>
            <a href="mailto:support@getnelsy.com" className={LINK}>support@getnelsy.com</a>
          </nav>
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} Nelsy</p>
        </div>
      </div>
    </footer>
  );
}
