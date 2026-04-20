import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#F52B8C] border-t-transparent" />
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
