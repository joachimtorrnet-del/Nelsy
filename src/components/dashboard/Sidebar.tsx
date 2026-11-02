import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Sparkles, CalendarDays, ShoppingBag, Users, TrendingUp,
  BarChart2, Megaphone, Globe, Gift, HelpCircle, Settings, LogOut,
  X, ChevronLeft, ChevronRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

// ── Nav structure ──────────────────────────────────────────────────────────────

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  live: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home',       label: 'Home',            icon: Home,        live: true  },
  { id: 'preview',    label: 'My Studio',       icon: Sparkles,    live: true  },
  { id: 'calendar',   label: 'Bookings',        icon: CalendarDays,live: true  },
  { id: 'orders',     label: 'Orders',          icon: ShoppingBag, live: false },
  { id: 'customers',  label: 'Customers',       icon: Users,       live: false },
  { id: 'revenue',    label: 'Income',          icon: TrendingUp,  live: true  },
  { id: 'analytics',  label: 'Analytics',       icon: BarChart2,   live: true  },
  { id: 'marketing',  label: 'Marketing',       icon: Megaphone,   live: false },
  { id: 'community',  label: 'Community',       icon: Globe,       live: false },
  { id: 'referrals',  label: 'Referrals',       icon: Gift,        live: false },
];

const BOTTOM_ITEMS: NavItem[] = [
  { id: 'help',       label: 'Help & Tutorials',icon: HelpCircle,  live: false },
  { id: 'settings',   label: 'Settings',        icon: Settings,    live: true  },
];

// ── Tooltip wrapper ────────────────────────────────────────────────────────────

function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative group/tip">
      {children}
      <div
        role="tooltip"
        className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50
          px-2.5 py-1.5 rounded-lg bg-[#1A1A1A] text-white text-xs font-medium whitespace-nowrap
          opacity-0 group-hover/tip:opacity-100 focus-within:opacity-100 transition-opacity duration-150
          shadow-lg"
      >
        {label}
        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#1A1A1A]" />
      </div>
    </div>
  );
}

// ── Nav row ────────────────────────────────────────────────────────────────────

interface NavRowProps {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
  badge?: number;
  onClick: () => void;
}

function NavRow({ item, active, collapsed, badge, onClick }: NavRowProps) {
  const { label, icon: Icon, live } = item;

  const row = (
    <button
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`
        w-full flex items-center gap-3 rounded-xl text-sm font-medium transition-colors
        focus-visible:ring-2 focus-visible:ring-[#F52B8C] focus-visible:outline-none
        ${collapsed ? 'px-0 py-2.5 justify-center' : 'px-3 py-2.5'}
        ${active
          ? 'bg-[#fde8f3] text-[#F52B8C]'
          : 'text-gray-600 hover:bg-[#fdf0f7] hover:text-[#F52B8C]'}
      `}
    >
      <Icon
        className={`flex-shrink-0 transition-colors ${collapsed ? 'w-5 h-5' : 'w-[18px] h-[18px]'} ${active ? 'text-[#F52B8C]' : 'text-gray-400'}`}
        strokeWidth={active ? 2.2 : 1.8}
      />
      {!collapsed && (
        <>
          <span className="flex-1 min-w-0 truncate text-left">{label}</span>
          {!live && (
            <span className="flex-shrink-0 text-[10px] font-semibold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-md uppercase tracking-wide leading-none">
              Soon
            </span>
          )}
          {badge !== undefined && (
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#F52B8C] text-white text-[10px] font-bold flex items-center justify-center">
              {badge}
            </span>
          )}
        </>
      )}
    </button>
  );

  if (collapsed) {
    return <Tooltip label={`${label}${!live ? ' · Coming soon' : ''}`}>{row}</Tooltip>;
  }
  return row;
}

// ── Props ──────────────────────────────────────────────────────────────────────

interface Profile {
  id?: string;
  full_name?: string;
  slug?: string;
}

export interface SidebarProps {
  profile?: Profile | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  pendingCount?: number;
}

// ── Main ───────────────────────────────────────────────────────────────────────

export function Sidebar({
  profile,
  activeTab,
  setActiveTab,
  mobileOpen,
  onMobileClose,
  pendingCount = 0,
}: SidebarProps) {
  const navigate = useNavigate();

  // Persist collapse state in localStorage
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try { return localStorage.getItem('nelsy_sidebar_collapsed') === 'true'; }
    catch { return false; }
  });

  useEffect(() => {
    try { localStorage.setItem('nelsy_sidebar_collapsed', String(collapsed)); }
    catch { /* ignore */ }
  }, [collapsed]);

  const handleTab = (id: string) => {
    setActiveTab(id);
    navigate(id === 'home' ? '/dashboard' : `/dashboard/${id}`);
    onMobileClose?.();
  };

  const handleSignOut = async () => {
    if (supabase) await supabase.auth.signOut();
    navigate('/login');
  };

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'N';

  // ── Desktop sidebar ──────────────────────────────────────────────────────────

  const desktopSidebar = (
    <aside
      className={`hidden lg:flex flex-col flex-shrink-0 bg-[#fff8fa] border-r border-pink-100 h-full transition-[width] duration-200 ease-in-out overflow-hidden ${
        collapsed ? 'w-[72px]' : 'w-[248px]'
      }`}
      aria-label="Main navigation"
    >
      {/* Logo + collapse toggle */}
      <div className={`flex items-center flex-shrink-0 pt-5 pb-4 ${collapsed ? 'justify-center px-0' : 'justify-between px-5'}`}>
        {!collapsed && (
          <span className="text-2xl font-black text-[#1A1A1A] tracking-tight select-none">Nelsy</span>
        )}
        {collapsed ? (
          <Tooltip label="Expand sidebar">
            <button
              onClick={() => setCollapsed(false)}
              aria-label="Expand sidebar"
              aria-expanded={false}
              className="p-2 rounded-xl text-gray-400 hover:text-[#F52B8C] hover:bg-[#fde8f3] transition focus-visible:ring-2 focus-visible:ring-[#F52B8C] focus-visible:outline-none"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </Tooltip>
        ) : (
          <button
            onClick={() => setCollapsed(true)}
            aria-label="Collapse sidebar"
            aria-expanded={true}
            className="p-2 rounded-xl text-gray-400 hover:text-[#F52B8C] hover:bg-[#fde8f3] transition focus-visible:ring-2 focus-visible:ring-[#F52B8C] focus-visible:outline-none"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main nav — scrollable */}
      <nav
        aria-label="Main"
        className={`flex-1 overflow-y-auto pb-2 space-y-0.5 ${collapsed ? 'px-2' : 'px-3'}`}
      >
        {NAV_ITEMS.map((item) => {
          const badge = item.id === 'calendar' && pendingCount > 0
            ? Math.min(pendingCount, 99) : undefined;
          return (
            <NavRow
              key={item.id}
              item={item}
              active={activeTab === item.id}
              collapsed={collapsed}
              badge={badge}
              onClick={() => handleTab(item.id)}
            />
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className={`border-t border-pink-100 pt-2 pb-3 space-y-0.5 flex-shrink-0 ${collapsed ? 'px-2' : 'px-3'}`}>
        {BOTTOM_ITEMS.map((item) => (
          <NavRow
            key={item.id}
            item={item}
            active={activeTab === item.id}
            collapsed={collapsed}
            onClick={() => handleTab(item.id)}
          />
        ))}

        {/* Account row */}
        {collapsed ? (
          <Tooltip label={profile?.full_name ?? 'Your account'}>
            <button
              onClick={handleSignOut}
              aria-label={`Sign out (${profile?.full_name ?? 'Your account'})`}
              className="w-full flex items-center justify-center py-2.5 rounded-xl text-gray-500 hover:text-[#F52B8C] hover:bg-[#fde8f3] transition focus-visible:ring-2 focus-visible:ring-[#F52B8C] focus-visible:outline-none"
            >
              <div className="w-7 h-7 rounded-full bg-[#F52B8C] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[11px] font-bold">{initials}</span>
              </div>
            </button>
          </Tooltip>
        ) : (
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
              aria-label="Sign out"
              className="p-1.5 rounded-lg text-gray-400 hover:text-[#F52B8C] hover:bg-[#fde8f3] transition focus-visible:ring-2 focus-visible:ring-[#F52B8C] focus-visible:outline-none"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );

  // ── Mobile overlay ───────────────────────────────────────────────────────────

  const mobileSidebar = (
    <AnimatePresence>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onMobileClose}
          />
          <motion.aside
            key="panel"
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            aria-label="Main navigation"
            className="relative w-64 bg-[#fff8fa] h-full shadow-2xl border-r border-pink-100 flex flex-col"
          >
            {/* Logo + close */}
            <div className="flex items-center justify-between px-5 pt-6 pb-5 flex-shrink-0">
              <span className="text-2xl font-black text-[#1A1A1A] tracking-tight">Nelsy</span>
              <button
                onClick={onMobileClose}
                aria-label="Close navigation"
                className="p-1.5 rounded-lg hover:bg-[#fde8f3] text-gray-500 focus-visible:ring-2 focus-visible:ring-[#F52B8C] focus-visible:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Nav */}
            <nav aria-label="Main" className="flex-1 overflow-y-auto px-3 pb-4 space-y-0.5">
              {NAV_ITEMS.map((item) => {
                const badge = item.id === 'calendar' && pendingCount > 0
                  ? Math.min(pendingCount, 99) : undefined;
                return (
                  <NavRow
                    key={item.id}
                    item={item}
                    active={activeTab === item.id}
                    collapsed={false}
                    badge={badge}
                    onClick={() => handleTab(item.id)}
                  />
                );
              })}
            </nav>

            {/* Bottom */}
            <div className="border-t border-pink-100 px-3 pt-2 pb-4 space-y-0.5 flex-shrink-0">
              {BOTTOM_ITEMS.map((item) => (
                <NavRow
                  key={item.id}
                  item={item}
                  active={activeTab === item.id}
                  collapsed={false}
                  onClick={() => handleTab(item.id)}
                />
              ))}
              <div className="flex items-center gap-3 px-3 py-2.5">
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
                  aria-label="Sign out"
                  className="p-1.5 rounded-lg text-gray-400 hover:text-[#F52B8C] hover:bg-[#fde8f3] transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {desktopSidebar}
      {mobileSidebar}
    </>
  );
}

export default Sidebar;
