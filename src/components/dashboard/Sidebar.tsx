import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Sparkles, CalendarDays, ShoppingBag, Users, TrendingUp,
  BarChart2, Megaphone, Globe, Gift, HelpCircle, Settings, LogOut,
  X, PanelLeftClose, PanelLeftOpen, Search, ExternalLink, ChevronUp, Package,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  live: boolean;
}

export const MAIN_NAV: NavItem[] = [
  { id: 'home',      label: 'Home',      icon: Home,         live: true },
  { id: 'preview',   label: 'My Studio', icon: Sparkles,     live: true },
  { id: 'calendar',  label: 'Bookings',  icon: CalendarDays, live: true },
  { id: 'customers', label: 'Customers', icon: Users,        live: true },
  { id: 'revenue',   label: 'Income',    icon: TrendingUp,   live: true },
  { id: 'analytics', label: 'Analytics', icon: BarChart2,    live: true },
];

// Roadmap: these stay visible with a Soon badge until they ship
export const GROW_NAV: NavItem[] = [
  { id: 'products',  label: 'Products',  icon: Package,     live: true },
  { id: 'orders',    label: 'Orders',    icon: ShoppingBag, live: false },
  { id: 'marketing', label: 'Marketing', icon: Megaphone,   live: false },
  { id: 'community', label: 'Community', icon: Globe,       live: false },
  { id: 'referrals', label: 'Referrals', icon: Gift,        live: false },
];

export const BOTTOM_NAV: NavItem[] = [
  { id: 'help',     label: 'Help & Tutorials', icon: HelpCircle, live: true },
  { id: 'settings', label: 'Settings',         icon: Settings,   live: true },
];

// ── Tooltip (collapsed rail) ──────────────────────────────────────────────────

function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative group/tip">
      {children}
      <div role="tooltip"
        className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 px-2.5 py-1.5 rounded-lg bg-[#1A1A1A] text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity duration-150 shadow-lg">
        {label}
      </div>
    </div>
  );
}

// ── Nav row ──────────────────────────────────────────────────────────────────

function NavRow({ item, active, collapsed, badge, layoutId, onClick }: {
  item: NavItem; active: boolean; collapsed: boolean; badge?: number; layoutId: string; onClick: () => void;
}) {
  const { label, icon: Icon, live } = item;
  const row = (
    <button
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`relative w-full flex items-center gap-3 rounded-xl text-[14.5px] font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[#F52B8C] focus-visible:outline-none
        ${collapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2.5'}
        ${active ? 'text-[#C2186F]' : 'text-gray-600 hover:text-[#1A1A1A] hover:bg-black/[0.03]'}`}
    >
      {active && (
        <motion.span layoutId={layoutId} className="absolute inset-0 rounded-xl bg-[#fde3f0]"
          transition={{ type: 'spring', stiffness: 500, damping: 38 }} />
      )}
      {active && !collapsed && (
        <motion.span layoutId={`${layoutId}-bar`} className="absolute -left-3 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-[#F52B8C]"
          transition={{ type: 'spring', stiffness: 500, damping: 38 }} />
      )}
      <Icon className={`relative flex-shrink-0 w-[18px] h-[18px] ${active ? 'text-[#F52B8C]' : 'text-gray-500'}`} strokeWidth={active ? 2.2 : 1.8} />
      {!collapsed && (
        <>
          <span className="relative flex-1 min-w-0 truncate text-left">{label}</span>
          {!live && (
            <span className="relative flex-shrink-0 text-[10px] font-semibold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-md uppercase tracking-wide leading-none">Soon</span>
          )}
          {badge !== undefined && (
            <span className="relative flex-shrink-0 min-w-5 h-5 px-1.5 rounded-full bg-[#F52B8C] text-white text-[10px] font-bold flex items-center justify-center">{badge}</span>
          )}
        </>
      )}
    </button>
  );
  return collapsed ? <Tooltip label={`${label}${!live ? ' · Coming soon' : ''}`}>{row}</Tooltip> : row;
}

// ── Props ────────────────────────────────────────────────────────────────────

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
  onOpenSearch?: () => void;
}

export function Sidebar({ profile, activeTab, setActiveTab, mobileOpen, onMobileClose, pendingCount = 0, onOpenSearch }: SidebarProps) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try { return localStorage.getItem('nelsy_sidebar_collapsed') === 'true'; } catch { return false; }
  });
  useEffect(() => {
    try { localStorage.setItem('nelsy_sidebar_collapsed', String(collapsed)); } catch { /* ignore */ }
  }, [collapsed]);

  const go = (id: string) => {
    setActiveTab(id);
    onMobileClose?.();
  };

  const signOut = async () => {
    if (supabase) await supabase.auth.signOut();
    navigate('/login');
  };

  const name = profile?.full_name ?? 'Your account';
  const initials = profile?.full_name
    ? profile.full_name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'N';
  const isMac = typeof navigator !== 'undefined' && /Mac/i.test(navigator.platform);

  const content = (rail: boolean, layoutId: string, mobile: boolean) => (
    <>
      {/* Logo + collapse / close */}
      <div className={`flex items-center flex-shrink-0 pt-5 pb-4 ${rail ? 'justify-center' : 'justify-between px-5'}`}>
        {!rail && <span className="text-[24px] font-black text-[#1A1A1A] tracking-tight select-none">Nelsy</span>}
        {mobile ? (
          <button onClick={onMobileClose} aria-label="Close menu" className="p-2 rounded-lg hover:bg-black/5 text-gray-500">
            <X className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => setCollapsed((c) => !c)}
            aria-label={rail ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!rail}
            className="p-2 rounded-lg text-gray-400 hover:text-[#1A1A1A] hover:bg-black/5 transition focus-visible:ring-2 focus-visible:ring-[#F52B8C] focus-visible:outline-none"
          >
            {rail ? <PanelLeftOpen className="w-[18px] h-[18px]" /> : <PanelLeftClose className="w-[18px] h-[18px]" />}
          </button>
        )}
      </div>

      {/* Search */}
      <div className={`flex-shrink-0 pb-3 ${rail ? 'px-2' : 'px-3'}`}>
        {rail ? (
          <Tooltip label="Search">
            <button onClick={onOpenSearch} aria-label="Search" className="w-full flex justify-center py-2.5 rounded-xl text-gray-500 hover:bg-black/5 transition">
              <Search className="w-[18px] h-[18px]" />
            </button>
          </Tooltip>
        ) : (
          <button onClick={() => { onMobileClose?.(); onOpenSearch?.(); }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white border border-gray-200/80 text-sm text-gray-400 hover:border-gray-300 transition shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <Search className="w-4 h-4" />
            <span className="flex-1 text-left">Search</span>
            {!mobile && <kbd className="text-[10px] font-semibold text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">{isMac ? '⌘K' : 'Ctrl K'}</kbd>}
          </button>
        )}
      </div>

      {/* Main + grow */}
      <nav aria-label="Main" className={`flex-1 overflow-y-auto pb-2 ${rail ? 'px-2' : 'px-3'}`}>
        <div className="space-y-0.5">
          {MAIN_NAV.map((item) => (
            <NavRow key={item.id} item={item} active={activeTab === item.id} collapsed={rail} layoutId={layoutId}
              badge={item.id === 'calendar' && pendingCount > 0 ? Math.min(pendingCount, 99) : undefined}
              onClick={() => go(item.id)} />
          ))}
        </div>
        {rail ? <div className="my-3 mx-3 h-px bg-black/5" /> : <p className="px-3 pt-5 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">Grow</p>}
        <div className="space-y-0.5">
          {GROW_NAV.map((item) => (
            <NavRow key={item.id} item={item} active={activeTab === item.id} collapsed={rail} layoutId={layoutId} onClick={() => go(item.id)} />
          ))}
        </div>
      </nav>

      {/* Bottom */}
      <div className={`flex-shrink-0 border-t border-black/5 pt-2 pb-3 space-y-0.5 ${rail ? 'px-2' : 'px-3'}`}>
        {BOTTOM_NAV.map((item) => (
          <NavRow key={item.id} item={item} active={activeTab === item.id} collapsed={rail} layoutId={layoutId} onClick={() => go(item.id)} />
        ))}
        <AccountMenu rail={rail} name={name} initials={initials} slug={profile?.slug} onSettings={() => go('settings')} onSignOut={signOut} />
      </div>
    </>
  );

  return (
    <>
      <aside
        className={`hidden lg:flex flex-col flex-shrink-0 bg-[#fbf8fa] border-r border-black/[0.06] h-full transition-[width] duration-200 ease-out ${collapsed ? 'w-[76px]' : 'w-[252px]'}`}
        aria-label="Main navigation"
      >
        {content(collapsed, 'nav-active-desktop', false)}
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-[55] flex">
            <motion.div key="backdrop" className="absolute inset-0 bg-black/40"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onMobileClose} />
            <motion.aside key="panel" aria-label="Main navigation"
              className="relative w-[280px] max-w-[85vw] bg-[#fbf8fa] h-full shadow-2xl flex flex-col"
              initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 32, stiffness: 320 }}>
              {content(false, 'nav-active-mobile', true)}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function AccountMenu({ rail, name, initials, slug, onSettings, onSignOut }: {
  rail: boolean; name: string; initials: string; slug?: string; onSettings: () => void; onSignOut: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((o) => !o)} aria-haspopup="menu" aria-expanded={open} aria-label="Account menu"
        className={`w-full flex items-center gap-3 rounded-xl py-2 hover:bg-black/[0.03] transition ${rail ? 'justify-center' : 'px-2.5'}`}>
        <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F52B8C] to-[#E0167A] flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">{initials}</span>
        {!rail && (
          <>
            <span className="flex-1 min-w-0 text-left text-sm font-semibold text-[#1A1A1A] truncate">{name}</span>
            <ChevronUp className={`w-4 h-4 text-gray-400 transition-transform ${open ? '' : 'rotate-180'}`} />
          </>
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div role="menu"
            initial={{ opacity: 0, y: 6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.14 }}
            className={`absolute z-50 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-1.5 ${rail ? 'left-full ml-2 bottom-0' : 'left-0 bottom-full mb-2'}`}>
            {slug && (
              <a role="menuitem" href={`/${slug}`} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                <ExternalLink className="w-4 h-4 text-gray-400" /> View my studio
              </a>
            )}
            <button role="menuitem" onClick={() => { setOpen(false); onSettings(); }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
              <Settings className="w-4 h-4 text-gray-400" /> Settings
            </button>
            <div className="h-px bg-gray-100 mx-3 my-1" />
            <button role="menuitem" onClick={() => { setOpen(false); onSignOut(); }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50">
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Sidebar;
