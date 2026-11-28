import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Copy, CheckCheck, Menu, Plus, Link2, ExternalLink } from 'lucide-react';
import { Sidebar, MAIN_NAV, GROW_NAV, BOTTOM_NAV } from './Sidebar';
import BottomNav from './BottomNav';
import { TimezoneBanner } from './TimezoneBanner';
import { PausedPanel, TrialBanner } from './TrialBanner';
import { CommandPalette } from './CommandPalette';
import type { PaletteItem } from './CommandPalette';
import type { ReactNode } from 'react';
import { track } from '../../lib/analytics';
import { saveSetupState } from '../../lib/setup';

interface Profile {
  id?: string;
  full_name?: string;
  slug?: string;
  subscription_status?: string;
  timezone?: string | null;
  plan?: string | null;
  trial_ends_at?: string | null;
}

const PAGE_TITLES: Record<string, string> = {
  home:      'Home',
  preview:   'My Studio',
  calendar:  'Bookings',
  products:  'Products',
  audience:  'Audience',
  orders:    'Orders',
  marketing: 'Marketing',
  community: 'Community',
  referrals: 'Referrals',
  revenue:   'Income',
  analytics: 'Analytics',
  customers: 'Customers',
  help:      'Help & Tutorials',
  settings:  'Settings',
  stripe:    'Payments',
};

interface DashboardLayoutProps {
  profile: Profile | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingCount?: number;
  children: ReactNode;
}

export default function DashboardLayout({ profile, activeTab, setActiveTab, pendingCount = 0, children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const slug = profile?.slug ?? 'mon-studio';
  const studioUrl = `getnelsy.com/${slug}`;
  const pageTitle = PAGE_TITLES[activeTab] ?? 'Dashboard';
  const isDraft = profile?.subscription_status === 'inactive';
  const isLive = !isDraft && !!profile?.subscription_status && !['incomplete', 'canceled', 'cancelled'].includes(profile.subscription_status);

  const copyLink = () => {
    navigator.clipboard.writeText(`https://${studioUrl}`).catch(() => {});
    setCopied(true);
    track('link_copied', { source: 'header' });
    // Ticks "link in bio" in the Home checklist (real accounts only, not the dev sandboxes)
    if (profile?.id && profile.id !== 'demo') void saveSetupState(profile.id, { link_copied_at: new Date().toISOString() });
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const paletteItems: PaletteItem[] = [
    ...[...MAIN_NAV, ...GROW_NAV, ...BOTTOM_NAV].map((n) => ({
      id: `page-${n.id}`, label: n.label, hint: n.live ? undefined : 'Coming soon', icon: n.icon, group: 'Pages' as const,
      run: () => setActiveTab(n.id),
    })),
    { id: 'add-offer', label: 'Add an offer', hint: 'Create a service clients can book', icon: Plus, group: 'Actions', keywords: 'service new create', run: () => navigate('/dashboard/offer/new') },
    { id: 'copy-link', label: 'Copy studio link', hint: studioUrl, icon: Link2, group: 'Actions', keywords: 'share url', run: copyLink },
    { id: 'open-studio', label: 'Open my studio', hint: studioUrl, icon: ExternalLink, group: 'Actions', keywords: 'public page view', run: () => window.open(`/${slug}`, '_blank', 'noopener') },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar
        profile={profile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        pendingCount={pendingCount}
        onOpenSearch={() => setSearchOpen(true)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {isDraft && (
          <div className="bg-[#1A1A1A] text-white px-4 py-2 flex items-center justify-between gap-3 flex-shrink-0">
            <p className="text-[13px] font-medium leading-snug flex-1 min-w-0">Your page is not live yet. Start your 14-day free trial, no card needed.</p>
            <a href="/onboarding?step=plan" className="flex-shrink-0 px-4 py-1.5 rounded-lg text-[12px] font-bold text-[#1A1A1A] bg-white hover:bg-gray-100 transition whitespace-nowrap">
              Start free trial
            </a>
          </div>
        )}
        <TrialBanner subscriptionStatus={profile?.subscription_status} trialEndsAt={profile?.trial_ends_at} plan={profile?.plan} activeTab={activeTab} />

        <header className="h-16 flex-shrink-0 bg-white/90 backdrop-blur border-b border-black/[0.06] flex items-center px-4 lg:px-8 gap-3">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 -ml-1 rounded-lg hover:bg-gray-100 text-gray-600" aria-label="Open menu">
            <Menu className="w-5 h-5" />
          </button>
          <AnimatePresence mode="wait" initial={false}>
            <motion.h1
              key={pageTitle}
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }}
              className="text-[17px] lg:text-lg font-bold text-[#1A1A1A] flex-1 truncate"
            >
              {pageTitle}
            </motion.h1>
          </AnimatePresence>

          {profile && (
            <span className={`hidden md:inline-flex items-center gap-1.5 text-[11px] font-semibold rounded-full px-2.5 py-1 border ${isLive ? 'text-green-700 bg-green-50 border-green-200' : 'text-gray-500 bg-gray-100 border-gray-200'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-green-500' : 'bg-gray-400'}`} />
              {isLive ? 'Live' : 'Not published'}
            </span>
          )}
          <div className="flex items-center rounded-xl border border-gray-200 overflow-hidden">
            <a href={`/${slug}`} target="_blank" rel="noopener noreferrer"
              className="hidden sm:block px-3 py-1.5 text-sm font-semibold text-[#F52B8C] hover:bg-[#fff4f9] transition max-w-[200px] lg:max-w-[240px] truncate">
              {studioUrl}
            </a>
            <button onClick={copyLink} title="Copy studio link" aria-label="Copy studio link"
              className="px-2.5 py-1.5 sm:border-l border-gray-200 text-gray-500 hover:text-[#F52B8C] hover:bg-[#fff4f9] transition active:scale-95">
              {copied ? <CheckCheck className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          {activeTab === 'home' && <PausedPanel subscriptionStatus={profile?.subscription_status} plan={profile?.plan} />}
          {profile?.id && <TimezoneBanner userId={profile.id} profileTimezone={profile.timezone} />}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} pendingCount={pendingCount} />
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} items={paletteItems} />
    </div>
  );
}
