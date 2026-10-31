import { motion } from 'framer-motion';
import {
  Home, Sparkles, CalendarDays, ShoppingBag, TrendingUp, BarChart2,
  Users, Megaphone, Gift, HelpCircle, Settings, LogOut, X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  live: boolean;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home',      label: 'Home',             icon: Home,        live: true  },
  { id: 'preview',   label: 'My Studio',        icon: Sparkles,    live: true  },
  { id: 'calendar',  label: 'Bookings',         icon: CalendarDays,live: true  },
  { id: 'orders',    label: 'Orders',           icon: ShoppingBag, live: false },
  { id: 'revenue',   label: 'Income',           icon: TrendingUp,  live: true  },
  { id: 'analytics', label: 'Analytics',        icon: BarChart2,   live: true  },
  { id: 'customers', label: 'Customers',        icon: Users,       live: false },
  { id: 'marketing', label: 'Marketing',        icon: Megaphone,   live: false },
  { id: 'referrals', label: 'Referrals',        icon: Gift,        live: false },
  { id: 'help',      label: 'Help & Tutorials', icon: HelpCircle,  live: false },
];

interface Profile {
  id?: string;
  full_name?: string;
  slug?: string;
}

interface SidebarProps {
  profile?: Profile | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  pendingCount?: number;
}

export function Sidebar({
  profile,
  activeTab,
  setActiveTab,
  mobileOpen,
  onMobileClose,
  pendingCount = 0,
}: SidebarProps) {
  const navigate = useNavigate();

  const handleTab = (id: string) => {
    setActiveTab(id);
    navigate(id === 'home' ? '/dashboard' : `/dashboard/${id}`);
    onMobileClose?.();
  };

  const handleSignOut = async () => {
    if (supabase) await supabase.auth.signOut();
    navigate('/login');
  };

  const liveItems = NAV_ITEMS.map((item) =>
    item.id === 'calendar' && pendingCount > 0
      ? { ...item, badge: Math.min(pendingCount, 99) }
      : item,
  ).filter((item) => item.live);

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'N';

  const content = (
    <div className="h-full flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 pt-6 pb-5">
        <span className="text-2xl font-black text-[#1A1A1A] tracking-tight">Nelsy</span>
        {onMobileClose && (
          <button
            onClick={onMobileClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-[#fde8f3] text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-0.5">
        {liveItems.map(({ id, label, icon: Icon, badge }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => handleTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left focus-visible:ring-2 focus-visible:ring-[#F52B8C] focus-visible:outline-none ${
                active
                  ? 'bg-[#fde8f3] text-[#F52B8C]'
                  : 'text-gray-600 hover:bg-[#fdf0f7] hover:text-[#F52B8C]'
              }`}
            >
              <Icon
                className={`w-[18px] h-[18px] flex-shrink-0 transition-colors ${
                  active ? 'text-[#F52B8C]' : 'text-gray-400'
                }`}
                strokeWidth={active ? 2.2 : 1.8}
              />
              <span className="flex-1 min-w-0 truncate">{label}</span>
              {badge !== undefined && (
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#F52B8C] text-white text-[10px] font-bold flex items-center justify-center">
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-pink-100 px-3 py-4 space-y-0.5">
        {/* Settings */}
        <button
          onClick={() => handleTab('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-[#F52B8C] focus-visible:outline-none ${
            activeTab === 'settings'
              ? 'bg-[#fde8f3] text-[#F52B8C]'
              : 'text-gray-600 hover:bg-[#fdf0f7] hover:text-[#F52B8C]'
          }`}
        >
          <Settings
            className={`w-[18px] h-[18px] flex-shrink-0 ${activeTab === 'settings' ? 'text-[#F52B8C]' : 'text-gray-400'}`}
            strokeWidth={activeTab === 'settings' ? 2.2 : 1.8}
          />
          Settings
        </button>

        {/* User row */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-[#F52B8C] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">{initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#1A1A1A] truncate">
              {profile?.full_name ?? 'Your account'}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            title="Sign out"
            className="p-1.5 rounded-lg text-gray-400 hover:text-[#F52B8C] hover:bg-[#fde8f3] transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 bg-[#fff8fa] border-r border-pink-100 h-full">
        {content}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onMobileClose}
          />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-64 bg-[#fff8fa] h-full shadow-2xl border-r border-pink-100"
          >
            {content}
          </motion.aside>
        </div>
      )}
    </>
  );
}

// keep default export for any legacy import
export default Sidebar;
