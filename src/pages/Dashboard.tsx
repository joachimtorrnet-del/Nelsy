import { useState, useEffect, useCallback } from 'react';
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

  // Sync tab when user navigates back/forward
  useEffect(() => {
    setActiveTab(tabFromPath(location.pathname));
  }, [location.pathname]);

  const handleSetTab = (tab: string) => {
    navigate(tab === 'home' ? '/dashboard' : `/dashboard/${tab}`, { replace: false });
  };

  const checkUser = useCallback(async () => {
    try {
      if (!supabase) { navigate('/login'); return; }

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
  }, [navigate]);

  useEffect(() => { checkUser(); }, [checkUser]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#F52B8C] border-t-transparent" />
      </div>
    );
  }

  const BLOCKED = ['canceled', 'cancelled'];
  if (profile && BLOCKED.includes(profile.subscription_status ?? '')) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
        <div className="text-5xl mb-6">💅</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Your subscription has ended</h1>
        <p className="text-gray-500 text-sm max-w-xs mb-8 leading-relaxed">
          Reactivate your plan to access your dashboard, bookings, and studio page.
        </p>
        <a
          href="/onboarding"
          className="w-full max-w-xs py-4 bg-[#F52B8C] text-white rounded-2xl font-bold text-base text-center hover:opacity-90 transition"
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
    <DashboardLayout
      profile={profile}
      activeTab={activeTab}
      setActiveTab={handleSetTab}
      pendingCount={pendingCount}
    >
      {activeTab === 'home'      && <Home onNavigate={handleSetTab} />}
      {activeTab === 'calendar'  && <Calendar profile={profile} />}
      {activeTab === 'preview'   && <Preview profile={profile} />}
      {activeTab === 'analytics' && <Analytics profile={profile} />}
      {activeTab === 'revenue'   && (
        <div className="px-4 py-6 lg:px-8">
          <Revenue />
        </div>
      )}
      {activeTab === 'stripe'    && (
        <div className="px-4 py-6 lg:px-8">
          <StripeSettings />
        </div>
      )}
      {activeTab === 'settings'  && (
        <Settings profile={profile as SettingsProfile | null} onNavigate={handleSetTab} />
      )}
    </DashboardLayout>
  );
}
