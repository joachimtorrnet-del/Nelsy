import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import posthog from 'posthog-js';
import { supabase } from '../lib/supabase';
import { track } from '../lib/analytics';

import Home from './dashboard/Home';
import Calendar from './dashboard/Calendar';
import Preview from './dashboard/Preview';
import Analytics from './dashboard/Analytics';
import Settings from './dashboard/Settings';
import type { SettingsProfile } from './dashboard/Settings';
import StripeSettings from './dashboard/StripeSettings';
import Revenue from './dashboard/Revenue';
import BottomNav from '../components/dashboard/BottomNav';
import DashboardLayout from '../components/dashboard/DashboardLayout';

interface Profile {
  id: string;
  full_name?: string;
  slug?: string;
  instagram_url?: string;
  subscription_status?: string;
  timezone?: string;
}

const VALID_TABS = ['home', 'calendar', 'preview', 'analytics', 'revenue', 'stripe', 'settings'];

function tabFromPath(pathname: string): string {
  const seg = pathname.replace(/^\/dashboard\/?/, '') || 'home';
  return VALID_TABS.includes(seg) ? seg : 'home';
}

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(() => tabFromPath(location.pathname));
  const [profile, setProfile] = useState<Profile | null>(null);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Keep activeTab in sync when user navigates back/forward
  useEffect(() => {
    setActiveTab(tabFromPath(location.pathname));
  }, [location.pathname]);

  const handleSetTab = (tab: string) => {
    setActiveTab(tab);
    navigate(tab === 'home' ? '/dashboard' : `/dashboard/${tab}`, { replace: false });
  };

  useEffect(() => {
    checkUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkUser = async () => {
    try {
      if (!supabase) {
        navigate('/login');
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate('/login'); return; }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setProfile(profileData);

      if (!profileData?.subscription_status || profileData.subscription_status === 'incomplete') {
        navigate('/onboarding');
        return;
      }

      posthog.identify(user.id, {
        email: user.email,
        name: profileData?.full_name,
        slug: profileData?.slug,
      });

      const { count } = await supabase
        .from('bookings')
        .select('id', { count: 'exact', head: true })
        .eq('profile_id', user.id)
        .in('status', ['pending', 'confirmed']);
      setPendingCount(count ?? 0);

      if (sessionStorage.getItem('nelsy_onboarding_just_completed')) {
        sessionStorage.removeItem('nelsy_onboarding_just_completed');
        track('dashboard_first_view', { plan: profileData?.subscription_status });
      }

      setLoading(false);
    } catch {
      navigate('/login');
    }
  };

  const BLOCKED_STATUSES = ['canceled', 'cancelled'];
  const isBlocked = profile && BLOCKED_STATUSES.includes(profile.subscription_status ?? '');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#F52B8C] border-t-transparent" />
      </div>
    );
  }

  if (isBlocked) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
        <div className="text-5xl mb-6">💅</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Your subscription has ended</h1>
        <p className="text-gray-500 text-sm max-w-xs mb-8 leading-relaxed">
          Reactivate your plan to access your dashboard, bookings, and studio page.
        </p>
        <a
          href="/onboarding"
          className="w-full max-w-xs py-4 bg-[#F52B8C] text-white rounded-2xl font-bold text-base text-center hover:opacity-90 transition active:scale-95 shadow-md shadow-[#F52B8C]/25"
        >
          Reactivate my plan →
        </a>
        <button
          onClick={async () => { await supabase?.auth.signOut(); navigate('/login'); }}
          className="mt-4 text-sm text-gray-400 hover:text-gray-600 transition"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Desktop layout with sidebar */}
      <div className="hidden lg:flex h-screen">
        <DashboardLayout
          profile={profile}
          activeTab={activeTab}
          setActiveTab={handleSetTab}
          pendingCount={pendingCount}
        >
          <TabContent activeTab={activeTab} profile={profile} onNavigate={handleSetTab} />
        </DashboardLayout>
      </div>

      {/* Mobile layout — original design preserved */}
      <div className="lg:hidden min-h-screen bg-white pb-20">
        <MobileHeader profile={profile} />

        {profile?.subscription_status === 'inactive' && (
          <div className="fixed top-14 left-0 right-0 z-30 bg-[#1A1A1A] text-white px-4 py-3 flex items-center justify-between gap-3">
            <p className="text-[13px] font-medium leading-snug flex-1 min-w-0">
              Your page isn't live yet. Start your free trial to publish it.
            </p>
            <a
              href="/onboarding?step=plan"
              className="flex-shrink-0 px-4 py-1.5 rounded-lg text-[12px] font-bold text-[#1A1A1A] bg-white hover:bg-gray-100 transition whitespace-nowrap"
            >
              Choose plan →
            </a>
          </div>
        )}

        <div className={profile?.subscription_status === 'inactive' ? 'pt-28' : 'pt-14'}>
          <TabContent activeTab={activeTab} profile={profile} onNavigate={handleSetTab} />
        </div>

        <BottomNav activeTab={activeTab} setActiveTab={handleSetTab} pendingCount={pendingCount} />
      </div>
    </>
  );
}

// ── Shared tab content ───────────────────────────────────────────────────────

interface TabContentProps {
  activeTab: string;
  profile: Profile | null;
  onNavigate: (tab: string) => void;
}

function TabContent({ activeTab, profile, onNavigate }: TabContentProps) {
  return (
    <>
      {activeTab === 'home'     && <Home onNavigate={onNavigate} />}
      {activeTab === 'calendar' && <Calendar profile={profile} />}
      {activeTab === 'preview'  && <Preview profile={profile} />}
      {activeTab === 'analytics'&& <Analytics profile={profile} />}
      {activeTab === 'revenue'  && (
        <div className="px-4 py-6 lg:px-8">
          <Revenue />
        </div>
      )}
      {activeTab === 'stripe'   && (
        <div className="px-4 py-6 lg:px-8">
          <StripeSettings />
        </div>
      )}
      {activeTab === 'settings' && (
        <Settings profile={profile as SettingsProfile | null} onNavigate={onNavigate} />
      )}
    </>
  );
}

// ── Compact mobile header ────────────────────────────────────────────────────

import { Copy } from 'lucide-react';
import { useState as useLocalState } from 'react';

function MobileHeader({ profile }: { profile: Profile | null }) {
  const slug = profile?.slug ?? 'mon-studio';
  const [copied, setCopied] = useLocalState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(`https://getnelsy.com/${slug}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-40 h-14 flex items-center justify-between px-4">
      <span className="font-black text-[#1A1A1A] text-lg">Nelsy</span>
      <div className="flex items-center gap-2">
        <a
          href={`/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#F52B8C] text-sm font-medium truncate max-w-[140px]"
        >
          getnelsy.com/{slug}
        </a>
        <button
          onClick={copyUrl}
          className="w-7 h-7 border border-gray-200 rounded-lg flex items-center justify-center transition-colors active:bg-gray-50"
        >
          {copied
            ? <span className="text-[10px] text-green-600 font-bold">✓</span>
            : <Copy className="w-3.5 h-3.5 text-gray-500" />
          }
        </button>
      </div>
    </div>
  );
}
