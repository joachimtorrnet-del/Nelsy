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
  { slug: 'courses',          title: 'Courses',          desc: 'Sell online courses from your Nelsy page.',              icon: '🎓', route: '/features/courses',          category: 'sell' },
  { slug: 'digital-products', title: 'Digital Products', desc: 'Sell guides, templates and downloadable files.',         icon: '📄', route: '/features/digital-products', category: 'sell' },
  { slug: 'memberships',      title: 'Memberships',      desc: 'Create recurring paid memberships.',                     icon: '💎', route: '/features/memberships',      category: 'sell' },
  { slug: 'coaching',         title: 'Coaching',         desc: 'Sell 1:1 sessions and consultations.',                   icon: '👤', route: '/features/coaching',         category: 'sell' },
  { slug: 'custom-products',  title: 'Custom Products',  desc: 'Sell personalized and custom offers.',                   icon: '✨', route: '/features/custom-products',  category: 'sell' },
  // BOOK & GET PAID
  { slug: 'bookings',         title: 'Bookings',         desc: 'Let clients book services 24/7.',                        icon: '📅', route: '/features/bookings',         category: 'book' },
  { slug: 'deposits',         title: 'Deposits',         desc: 'Collect deposits before appointments.',                  icon: '💰', route: '/features/deposits',         category: 'book' },
  { slug: 'payments',         title: 'Payments',         desc: 'Get paid directly through Nelsy.',                      icon: '💳', route: '/features/payments',         category: 'book' },
  { slug: 'gift-cards',       title: 'Gift Cards',       desc: 'Sell gift cards to clients.',                            icon: '🎁', route: '/features/gift-cards',       category: 'book', status: 'coming-soon' },
  { slug: 'packages',         title: 'Packages',         desc: 'Bundle services and offers.',                            icon: '📦', route: '/features/packages',         category: 'book', status: 'coming-soon' },
  // GROW
  { slug: 'link-in-bio',      title: 'Link in Bio',      desc: 'One branded page for your whole business.',              icon: '🔗', route: '/features/link-in-bio',      category: 'grow' },
  { slug: 'instagram-autodm', title: 'Instagram AutoDM', desc: 'Turn comments and DMs into bookings and sales.',         icon: '💬', route: '/features/instagram-autodm', category: 'grow' },
  { slug: 'email',            title: 'Email & Newsletters', desc: 'Capture and message your audience.',                  icon: '📧', route: '/features/email-newsletters', category: 'grow' },
  { slug: 'audience-capture', title: 'Audience Capture', desc: 'Own your audience beyond social media.',                 icon: '👥', route: '/features/audience-capture', category: 'grow' },
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
  { slug: 'nail-techs',       title: 'Nail Techs',       desc: 'Take bookings, sell courses and grow your clientele.',   icon: '💅', route: '/for/nail-techs' },
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
  { slug: 'deposit-calculator',                  title: 'Deposit Calculator',                  category: 'calculator', route: '/tools/deposit-calculator',          status: 'coming-soon' },
  { slug: 'no-show-cost-calculator',             title: 'No-Show Cost Calculator',             category: 'calculator', route: '/tools/no-show-cost-calculator',     status: 'coming-soon' },
  { slug: 'instagram-engagement-calculator',     title: 'Instagram Engagement Rate Calculator',category: 'calculator', route: '/tools/instagram-engagement-calculator', status: 'coming-soon' },
  { slug: 'creator-rate-calculator',             title: 'Creator Rate Calculator',             category: 'calculator', route: '/tools/creator-rate-calculator',     status: 'coming-soon' },
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
};

export type UseCaseGoal = {
  slug: string;
  title: string;
  route: string;
};

export const USE_CASE_PERSONAS: UseCasePersona[] = [
  {
    slug: 'nail-techs',
    title: 'Nail Techs',
    subtitle: 'Get booked, take deposits, and turn followers into clients.',
    icon: Paintbrush,
    route: '/use-cases/nail-techs',
    live: true,
  },
  {
    slug: 'lash-techs',
    title: 'Lash Techs',
    subtitle: 'Fill your calendar, reduce no-shows, and manage clients.',
    icon: Eye,
    route: '/use-cases/lash-techs',
    live: true,
  },
  {
    slug: 'brow-artists',
    title: 'Brow Artists',
    subtitle: 'Make booking easier and grow your beauty business.',
    icon: ScanFace,
    route: '/use-cases/brow-artists',
    live: false,
  },
  {
    slug: 'hair-stylists',
    title: 'Hair Stylists',
    subtitle: 'Manage appointments, clients, and payments in one place.',
    icon: Scissors,
    route: '/use-cases/hair-stylists',
    live: false,
  },
  {
    slug: 'makeup-artists',
    title: 'Makeup Artists',
    subtitle: 'Turn inquiries into paid bookings with less back-and-forth.',
    icon: Palette,
    route: '/use-cases/makeup-artists',
    live: false,
  },
  {
    slug: 'estheticians',
    title: 'Estheticians',
    subtitle: 'Build repeat business and simplify your client experience.',
    icon: Droplets,
    route: '/use-cases/estheticians',
    live: false,
  },
  {
    slug: 'salons',
    title: 'Salons',
    subtitle: 'Manage your team, clients, bookings, and payments.',
    icon: Store,
    route: '/use-cases/salons',
    live: false,
  },
  {
    slug: 'beauty-creators',
    title: 'Beauty Creators',
    subtitle: 'Monetize your audience with bookings, products, and content.',
    icon: Sparkles,
    route: '/use-cases/beauty-creators',
    live: false,
  },
];

export const USE_CASE_GOALS: UseCaseGoal[] = [
  { slug: 'get-more-clients',             title: 'Get More Clients',             route: '/use-cases/get-more-clients' },
  { slug: 'reduce-no-shows',              title: 'Reduce No-Shows',              route: '/use-cases/reduce-no-shows' },
  { slug: 'turn-followers-into-bookings', title: 'Turn Followers Into Bookings', route: '/use-cases/turn-followers-into-bookings' },
  { slug: 'manage-clients',               title: 'Manage Your Clients',          route: '/use-cases/manage-clients' },
  { slug: 'grow-your-audience',           title: 'Grow Your Audience',           route: '/use-cases/grow-your-audience' },
  { slug: 'get-paid-online',              title: 'Get Paid Online',              route: '/use-cases/get-paid-online' },
  { slug: 'grow-your-beauty-business',    title: 'Grow Your Beauty Business',    route: '/use-cases/grow-your-beauty-business' },
  { slug: 'sell-digital-products',        title: 'Sell Digital Products',        route: '/use-cases/sell-digital-products' },
];
