// ─── Centralized navigation data ─────────────────────────────────────────────
// Single source of truth for header, footer, and internal linking.

export type FeatureStatus = 'live' | 'coming-soon';
export type FeatureCategory = 'sell' | 'book' | 'grow' | 'run';
export type ToolCategory = 'calculator' | 'generator' | 'template';

export type NavFeature = {
  slug: string;
  title: string;
  desc: string;
  icon: string;
  route: string;
  category: FeatureCategory;
  status?: FeatureStatus;
  /** 'creator' = ships with the upcoming Creator plan (page is live, feature is not in the current plan) */
  plan?: 'creator';
};

export type NavPersona = {
  slug: string;
  title: string;
  desc: string;
  route: string;
  icon: string;
  featured?: boolean;
};

export type NavTool = {
  slug: string;
  title: string;
  category: ToolCategory;
  route: string;
  status?: FeatureStatus;
};

// ─── Product features ─────────────────────────────────────────────────────────

export const FEATURES: NavFeature[] = [
  // SELL
  { slug: 'courses',          title: 'Courses',          desc: 'Upcoming Creator plan: sell online courses.',            icon: '🎓', route: '/features/courses',          category: 'sell', plan: 'creator' },
  { slug: 'digital-products', title: 'Digital Products', desc: 'Upcoming Creator plan: sell guides and templates.',      icon: '📄', route: '/features/digital-products', category: 'sell', plan: 'creator' },
  { slug: 'memberships',      title: 'Memberships',      desc: 'Upcoming Creator plan: recurring memberships.',          icon: '💎', route: '/features/memberships',      category: 'sell', plan: 'creator' },
  { slug: 'coaching',         title: 'Coaching',         desc: 'Book paid sessions today; coaching tools in Creator plan.', icon: '👤', route: '/features/coaching',         category: 'sell' },
  { slug: 'custom-products',  title: 'Custom Products',  desc: 'Sell personalized and custom offers.',                   icon: '✨', route: '/features/custom-products',  category: 'sell', status: 'coming-soon' },
  // BOOK & GET PAID
  { slug: 'bookings',         title: 'Bookings',         desc: 'Let clients book services 24/7.',                        icon: '📅', route: '/features/bookings',         category: 'book' },
  { slug: 'deposits',         title: 'Deposits',         desc: 'Collect deposits before appointments.',                  icon: '💰', route: '/features/deposits',         category: 'book' },
  { slug: 'payments',         title: 'Payments',         desc: 'Get paid directly through Nelsy.',                      icon: '💳', route: '/features/payments',         category: 'book' },
  { slug: 'gift-cards',       title: 'Gift Cards',       desc: 'Sell gift cards to clients.',                            icon: '🎁', route: '/features/gift-cards',       category: 'book', status: 'coming-soon' },
  { slug: 'packages',         title: 'Packages',         desc: 'Bundle services and offers.',                            icon: '📦', route: '/features/packages',         category: 'book', status: 'coming-soon' },
  // GROW
  { slug: 'link-in-bio',      title: 'Link in Bio',      desc: 'One branded page for your whole business.',              icon: '🔗', route: '/features/link-in-bio',      category: 'grow' },
  { slug: 'instagram-autodm', title: 'Instagram AutoDM', desc: 'Upcoming Creator plan: auto-reply to comments.',         icon: '💬', route: '/features/instagram-autodm', category: 'grow', plan: 'creator' },
  { slug: 'email',            title: 'Email & Newsletters', desc: 'Upcoming Creator plan: email your audience.',        icon: '📧', route: '/features/email-newsletters', category: 'grow', plan: 'creator' },
  { slug: 'audience-capture', title: 'Audience Capture', desc: 'Upcoming Creator plan: collect contacts you own.',       icon: '👥', route: '/features/audience-capture', category: 'grow', plan: 'creator' },
  // RUN YOUR BUSINESS
  { slug: 'crm',              title: 'CRM & Clients',    desc: 'Manage your clients and relationships.',                 icon: '🗂️', route: '/features/crm',              category: 'run' },
  { slug: 'analytics',        title: 'Analytics',        desc: 'Understand bookings, sales and performance.',            icon: '📊', route: '/features/analytics',        category: 'run' },
];

export const FEATURE_CATEGORIES: { key: FeatureCategory; label: string }[] = [
  { key: 'sell', label: 'Sell' },
  { key: 'book', label: 'Book & Get Paid' },
  { key: 'grow', label: 'Grow' },
  { key: 'run',  label: 'Run Your Business' },
];

// ─── Nav dropdown categories (3-column, no SELL) ──────────────────────────────
export const NAV_FEATURE_CATEGORIES: { key: FeatureCategory; label: string }[] = [
  { key: 'book', label: 'Book & Get Paid' },
  { key: 'grow', label: 'Grow' },
  { key: 'run',  label: 'Run Your Business' },
];

// ─── Personas ─────────────────────────────────────────────────────────────────

export const PERSONAS: NavPersona[] = [
  { slug: 'beauty-creators',  title: 'Beauty Creators',  desc: 'The all-in-one business platform for beauty creators.', icon: '✨', route: '/for/beauty-creators',  featured: true },
  { slug: 'nail-techs',       title: 'Nail Techs',       desc: 'Take bookings and deposits and grow your clientele.',  icon: '💅', route: '/for/nail-techs' },
  { slug: 'lash-artists',     title: 'Lash Artists',     desc: 'Automate bookings, deposits and client follow-ups.',     icon: '👁️', route: '/for/lash-artists' },
  { slug: 'makeup-artists',   title: 'Makeup Artists',   desc: 'Sell packages, take deposits and grow your brand.',      icon: '💄', route: '/for/makeup-artists' },
  { slug: 'hairstylists',     title: 'Hairstylists',     desc: 'Manage your chair, sell courses and build your list.',   icon: '✂️', route: '/for/hairstylists' },
  { slug: 'brow-artists',     title: 'Brow Artists',     desc: 'Bookings, deposits and a page that converts.',           icon: '🤨', route: '/for/brow-artists' },
  { slug: 'estheticians',     title: 'Estheticians',     desc: 'Sell skincare consultations, courses and memberships.',  icon: '🧴', route: '/for/estheticians' },
  { slug: 'beauty-educators', title: 'Beauty Educators', desc: 'Turn your expertise into courses, memberships and 1:1s.',icon: '🎓', route: '/for/beauty-educators' },
  { slug: 'salon-owners',     title: 'Salon Owners',     desc: 'Run your salon, team and clients in one place.',         icon: '🏪', route: '/for/salon-owners' },
];

// ─── Free tools ───────────────────────────────────────────────────────────────

export const TOOLS: NavTool[] = [
  // Calculators
  { slug: 'nail-tech-pricing-calculator',        title: 'Beauty Service Price Calculator',     category: 'calculator', route: '/tools/nail-tech-pricing-calculator' },
  { slug: 'profit-calculator',                   title: 'Beauty Business Profit Calculator',   category: 'calculator', route: '/tools/profit-calculator',           status: 'coming-soon' },
  { slug: 'deposit-calculator',                  title: 'Deposit Calculator',                  category: 'calculator', route: '/tools/deposit-calculator' },
  { slug: 'no-show-cost-calculator',             title: 'No-Show Cost Calculator',             category: 'calculator', route: '/tools/no-show-cost-calculator' },
  { slug: 'booking-app-fee-calculator',          title: 'Booking App Fee Calculator',          category: 'calculator', route: '/tools/booking-app-fee-calculator' },
  { slug: 'instagram-engagement-calculator',     title: 'Instagram Engagement Rate Calculator',category: 'calculator', route: '/tools/instagram-engagement-calculator', },
  { slug: 'creator-rate-calculator',             title: 'Creator Rate Calculator',             category: 'calculator', route: '/tools/creator-rate-calculator', },
  // Generators
  { slug: 'nail-tech-cancellation-policy-generator', title: 'Cancellation Policy Generator',  category: 'generator',  route: '/tools/nail-tech-cancellation-policy-generator' },
  { slug: 'beauty-business-name-generator',      title: 'Beauty Business Name Generator',      category: 'generator',  route: '/tools/beauty-business-name-generator', status: 'coming-soon' },
  { slug: 'instagram-bio-generator',             title: 'Instagram Bio Generator',             category: 'generator',  route: '/tools/instagram-bio-generator',     status: 'coming-soon' },
  { slug: 'beauty-caption-generator',            title: 'Beauty Caption Generator',            category: 'generator',  route: '/tools/beauty-caption-generator',    status: 'coming-soon' },
  { slug: 'username-generator',                  title: 'Link-in-Bio Username Generator',      category: 'generator',  route: '/tools/username-generator',          status: 'coming-soon' },
  // Templates
  { slug: 'nail-tech-appointment-reminder-templates', title: 'Appointment Reminder Templates', category: 'template',   route: '/tools/nail-tech-appointment-reminder-templates' },
];

export const TOOL_CATEGORIES: { key: ToolCategory; label: string }[] = [
  { key: 'calculator', label: 'Calculators' },
  { key: 'generator',  label: 'Generators' },
  { key: 'template',   label: 'Templates' },
];

// ─── Use Case types ───────────────────────────────────────────────────────────

import type { LucideIcon } from 'lucide-react';
import {
  Paintbrush, Eye, ScanFace, Scissors, Palette, Droplets, Store, Sparkles,
} from 'lucide-react';

export type UseCasePersona = {
  slug: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  route: string;
  live: boolean;
  /** 'segment' = who Nelsy is for (top of the menu); 'craft' = a specific profession */
  group: 'segment' | 'craft';
};

export type UseCaseGoal = {
  slug: string;
  title: string;
  route: string;
};

export const USE_CASE_PERSONAS: UseCasePersona[] = [
  {
    slug: 'independent-beauty-pros',
    group: 'segment',
    title: 'Independent Beauty Pros',
    subtitle: 'Get booked and paid from your link in bio, your way.',
    icon: Sparkles,
    route: '/use-cases/independent-beauty-pros',
    live: true,
  },
  {
    slug: 'beauty-creators',
    group: 'segment',
    title: 'Beauty Creators',
    subtitle: 'Bookings today; products and courses with the Creator plan.',
    icon: Sparkles,
    route: '/use-cases/beauty-creators',
    live: true,
  },
  {
    slug: 'salons',
    group: 'segment',
    title: 'Salons',
    subtitle: 'Manage your team, clients, bookings, and payments.',
    icon: Store,
    route: '/use-cases/salons',
    live: false,
  },
  {
    slug: 'nail-techs',
    group: 'craft',
    title: 'Nail Techs',
    subtitle: 'Get booked, take deposits, and turn followers into clients.',
    icon: Paintbrush,
    route: '/use-cases/nail-techs',
    live: true,
  },
  {
    slug: 'lash-techs',
    group: 'craft',
    title: 'Lash Techs',
    subtitle: 'Fill your calendar, reduce no-shows, and manage clients.',
    icon: Eye,
    route: '/use-cases/lash-techs',
    live: true,
  },
  {
    slug: 'brow-artists',
    group: 'craft',
    title: 'Brow Artists',
    subtitle: 'Make booking easier and grow your beauty business.',
    icon: ScanFace,
    route: '/use-cases/brow-artists',
    live: false,
  },
  {
    slug: 'hair-stylists',
    group: 'craft',
    title: 'Hair Stylists',
    subtitle: 'Manage appointments, clients, and payments in one place.',
    icon: Scissors,
    route: '/use-cases/hair-stylists',
    live: false,
  },
  {
    slug: 'makeup-artists',
    group: 'craft',
    title: 'Makeup Artists',
    subtitle: 'Turn inquiries into paid bookings with less back-and-forth.',
    icon: Palette,
    route: '/use-cases/makeup-artists',
    live: false,
  },
  {
    slug: 'estheticians',
    group: 'craft',
    title: 'Estheticians',
    subtitle: 'Build repeat business and simplify your client experience.',
    icon: Droplets,
    route: '/use-cases/estheticians',
    live: false,
  },
];

export const USE_CASE_GOALS: UseCaseGoal[] = [
  { slug: 'turn-followers-into-bookings', title: 'Get Booked from Instagram', route: '/use-cases/turn-followers-into-bookings' },
  { slug: 'reduce-no-shows',              title: 'Reduce No-Shows',           route: '/use-cases/reduce-no-shows' },
];

// ─── Nav helpers (header + footer) ────────────────────────────────────────────
// Menus are generated from the data above so they only ever link pages that exist.
// A missing `status` means the page is live.

export const isLive = (item: { status?: FeatureStatus }) => item.status !== 'coming-soon';

/** Live features in a category, in data order. */
export const liveFeatures = (category: FeatureCategory) =>
  FEATURES.filter((f) => f.category === category && isLive(f));

/** Feature blurb for menus: drops the "Upcoming Creator plan:" prefix, the menu shows a badge instead. */
export const featureBlurb = (f: NavFeature) => {
  const s = f.desc.replace(/^Upcoming Creator plan:\s*/i, '');
  return s.charAt(0).toUpperCase() + s.slice(1);
};

/** Product menu columns, in order. "Sell" holds the Creator plan offers; each Creator plan item carries a badge. */
export const NAV_PRODUCT_GROUPS: { key: FeatureCategory; label: string }[] = [
  { key: 'book', label: 'Book & get paid' },
  { key: 'grow', label: 'Grow' },
  { key: 'run',  label: 'Run your business' },
  { key: 'sell', label: 'Sell' },
];

/** Live tools grouped by category; empty categories are dropped. */
export const liveToolGroups = () =>
  TOOL_CATEGORIES
    .map((c) => ({ ...c, tools: TOOLS.filter((t) => t.category === c.key && isLive(t)) }))
    .filter((c) => c.tools.length > 0);

/** The three audiences Nelsy is built for. Fixed routes; the pages own their copy. */
export type NavAudience = { slug: string; title: string; desc: string; route: string; icon: LucideIcon };
export const NAV_AUDIENCES: NavAudience[] = [
  { slug: 'beauty-pros',     title: 'Beauty Pros',     desc: 'Solo artists who want to get booked and paid.', route: '/use-cases/beauty-pros',     icon: Sparkles },
  { slug: 'beauty-creators', title: 'Beauty Creators', desc: 'Turn your audience into clients and sales.',     route: '/use-cases/beauty-creators', icon: Palette },
  { slug: 'salons',          title: 'Salons',          desc: 'Bookings and payments for your whole team.',     route: '/use-cases/salons',          icon: Store },
];

/** Live craft pages (nail techs, lash techs, ...). */
export const liveCrafts = () => USE_CASE_PERSONAS.filter((p) => p.group === 'craft' && p.live);

export type NavLink = { label: string; to: string };

/** Resources: learning content and ways to see the product. Only routes that exist. */
export const NAV_RESOURCES: (NavLink & { desc: string })[] = [
  { label: 'Blog',                       to: '/blog',                            desc: 'Guides for beauty pros and creators.' },
  { label: 'Glossary',                   to: '/glossary',                        desc: 'Beauty business terms, explained.' },
  { label: 'Booking apps compared',      to: '/best-booking-app-for-nail-techs', desc: 'How the main booking apps stack up.' },
  { label: 'Live demo',                  to: '/demo',                            desc: 'See a Nelsy booking page in action.' },
  { label: 'Contact us',                 to: '/contact',                         desc: 'Questions? We answer fast.' },
];

/** Primary call to action: same label everywhere in the header and footer. */
export const NAV_CTA: NavLink = { label: 'Start free trial', to: '/onboarding' };
