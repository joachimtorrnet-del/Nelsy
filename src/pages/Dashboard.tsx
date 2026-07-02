import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import posthog from 'posthog-js';
import { supabase } from '../lib/supabase';

import Home from './dashboard/Home';
import Calendar from './dashboard/Calendar';
import Preview from './dashboard/Preview';
import Analytics from './dashboard/Analytics';
import Settings from './dashboard/Settings';
import type { SettingsProfile } from './dashboard/Settings';
import BottomNav from '../components/dashboard/BottomNav';
import Header from '../components/dashboard/Header';

interface Profile {
  id: string;
  full_name?: string;
  slug?: string;
  instagram_url?: string;
  subscription_status?: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

      setLoading(false);
    } catch (error) {
      console.error('Dashboard error:', error);
      navigate('/login');
    }
  };

  const BLOCKED_STATUSES = ['canceled', 'cancelled', 'inactive'];
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
    <div className="min-h-screen bg-white pb-20">
      <Header profile={profile} />

      <div className="pt-16">
        {activeTab === 'home' && <Home onNavigate={setActiveTab} />}
        {activeTab === 'calendar' && <Calendar profile={profile} />}
        {activeTab === 'preview' && <Preview profile={profile} />}
        {activeTab === 'analytics' && <Analytics profile={profile} />}
        {activeTab === 'settings' && <Settings profile={profile as SettingsProfile | null} />}
      </div>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} pendingCount={pendingCount} />
    </div>
  );
}
