import { useState } from 'react';
import { Copy, CheckCheck, ExternalLink, Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';
import BottomNav from './BottomNav';
import type { ReactNode } from 'react';

interface Profile {
  id?: string;
  full_name?: string;
  slug?: string;
  subscription_status?: string;
}

const PAGE_TITLES: Record<string, string> = {
  home:      'Home',
  preview:   'My Studio',
  calendar:  'Bookings',
  orders:    'Orders',
  revenue:   'Income',
  analytics: 'Analytics',
  customers: 'Customers',
  marketing: 'Marketing',
  referrals: 'Referrals',
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

export default function DashboardLayout({
  profile,
  activeTab,
  setActiveTab,
  pendingCount = 0,
  children,
}: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const slug = profile?.slug ?? 'mon-studio';
  const studioUrl = `getnelsy.com/${slug}`;
  const pageTitle = PAGE_TITLES[activeTab] ?? 'Dashboard';
  const isDraft = profile?.subscription_status === 'inactive';
  const isLive = !isDraft && !!profile?.subscription_status && !['incomplete', 'canceled', 'cancelled'].includes(profile.subscription_status);

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${studioUrl}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* ── Desktop Sidebar ──────────────────────────────────────────────── */}
      <Sidebar
        profile={profile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        pendingCount={pendingCount}
      />

      {/* ── Right panel ─────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Draft banner */}
        {isDraft && (
          <div className="bg-[#1A1A1A] text-white px-4 py-2 flex items-center justify-between gap-3 flex-shrink-0">
            <p className="text-[13px] font-medium leading-snug flex-1 min-w-0">
              Your studio is not published yet. Choose a plan to go live.
            </p>
            <a
              href="/onboarding?step=plan"
              className="flex-shrink-0 px-4 py-1.5 rounded-lg text-[12px] font-bold text-[#1A1A1A] bg-white hover:bg-gray-100 transition whitespace-nowrap"
            >
              Choose plan →
            </a>
          </div>
        )}

        {/* Header */}
        <header className="h-16 flex-shrink-0 bg-white border-b border-gray-100 flex items-center px-4 lg:px-8 gap-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500"
            aria-label="Open navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Mobile logo */}
          <span className="lg:hidden text-lg font-black text-[#1A1A1A]">Nelsy</span>

          {/* Page title (desktop) */}
          <h1 className="hidden lg:block text-lg font-bold text-[#1A1A1A] flex-1">{pageTitle}</h1>

          <div className="flex-1 lg:flex-none" />

          {/* Studio status + link */}
          <div className="flex items-center gap-2">
            {/* Studio live/unpublished status pill — desktop only */}
            {isLive ? (
              <span className="hidden lg:inline-flex items-center gap-1.5 text-[11px] font-semibold text-green-700 bg-green-50 border border-green-200 rounded-full px-2.5 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                Live
              </span>
            ) : (
              profile && (
                <span className="hidden lg:inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-full px-2.5 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />
                  Not published
                </span>
              )
            )}
            <a
              href={`/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-[#F52B8C] text-sm font-medium hover:opacity-80 transition max-w-[180px] lg:max-w-[220px] truncate"
            >
              <span className="truncate">{studioUrl}</span>
              <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
            </a>
            <button
              onClick={handleCopy}
              title="Copy studio link"
              className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:border-[#F52B8C] hover:text-[#F52B8C] transition"
            >
              {copied ? (
                <>
                  <CheckCheck className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copy link</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Main content — extra bottom padding on mobile for BottomNav */}
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav — hidden on desktop */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingCount={pendingCount}
      />
    </div>
  );
}
