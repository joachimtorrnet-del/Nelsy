import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
import Header from '../components/dashboard/Header';

interface Profile {
  id: string;
  full_name?: string;
  slug?: string;
  instagram_url?: string;
  subscription_status?: string;
  timezone?: string;
}

const VALID_TABS = ['home', 'calendar', 'preview', 'analytics', 'revenue', 'stripe', 'settings'];

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = VALID_TABS.includes(searchParams.get('tab') ?? '') ? (searchParams.get('tab') as string) : 'home';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSetTab = (tab: string) => {
    setActiveTab(tab);
    // Remove ?tab= query param once navigated so URL stays clean
    if (searchParams.get('tab')) setSearchParams({});
  };

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      if (!supabase) {
        navigate('/login');
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate('/login');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setProfile(profile);

      // No session at all → onboarding (shouldn't happen but guard it).
      // 'incomplete' = payment was started but not finished → resume onboarding plan step.
      // 'inactive' = draft mode (user hit "Maybe later") → allow into dashboard, show banner.
      if (!profile?.subscription_status || profile.subscription_status === 'incomplete') {
        navigate('/onboarding');
        return;
      }

      posthog.identify(user.id, {
        email: user.email,
        name: profile?.full_name,
        slug: profile?.slug,
      });

      // Load pending bookings count for badge
      const { count } = await supabase
        .from('bookings')
        .select('id', { count: 'exact', head: true })
        .eq('profile_id', user.id)
        .in('status', ['pending', 'confirmed']);
      setPendingCount(count ?? 0);

      if (sessionStorage.getItem('nelsy_onboarding_just_completed')) {
        sessionStorage.removeItem('nelsy_onboarding_just_completed');
        track('dashboard_first_view', { plan: profile?.subscription_status });
      }

      setLoading(false);
    } catch (error) {
      console.error('Dashboard error:', error);
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

  const isDraft = profile?.subscription_status === 'inactive';

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header profile={profile} />

      {/* Draft mode banner — shown when user skipped plan selection */}
      {isDraft && (
        <div className="fixed top-16 left-0 right-0 z-30 bg-[#1A1A1A] text-white px-4 py-3 flex items-center justify-between gap-3">
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

      <div className={isDraft ? 'pt-28' : 'pt-16'}>
        {activeTab === 'home' && <Home onNavigate={handleSetTab} />}
        {activeTab === 'calendar' && <Calendar profile={profile} />}
        {activeTab === 'preview' && <Preview profile={profile} />}
        {activeTab === 'analytics' && <Analytics profile={profile} />}
        {activeTab === 'revenue' && (
          <div className="px-4 py-6">
            <Revenue />
          </div>
        )}
        {activeTab === 'stripe' && (
          <div className="px-4 py-6">
            <StripeSettings />
          </div>
        )}
        {activeTab === 'settings' && <Settings profile={profile as SettingsProfile | null} onNavigate={handleSetTab} />}
      </div>

      <BottomNav activeTab={activeTab} setActiveTab={handleSetTab} pendingCount={pendingCount} />
    </div>
  );
}
