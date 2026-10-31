import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Calendar, Wallet, CreditCard, Gift, Layers,
  GraduationCap, FileDown, Gem, Video, PackageCheck,
  Link2, MessageCircle, Mail, UserPlus,
  UsersRound, BarChart3,
  ChevronDown,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import SeoCTA from '@/components/SeoCTA';
import {
  FEATURES, NAV_FEATURE_CATEGORIES, TOOLS, TOOL_CATEGORIES,
  USE_CASE_PERSONAS,
  type NavFeature, type NavTool,
} from '@/lib/navData';

const PINK = '#F52B8C';
const INK  = '#1A1A1A';

// ─── Icon mapping ─────────────────────────────────────────────────────────────

const FEATURE_ICONS: Record<string, LucideIcon> = {
  courses:            GraduationCap,
  'digital-products': FileDown,
  memberships:        Gem,
  coaching:           Video,
  'custom-products':  PackageCheck,
  bookings:           Calendar,
  deposits:           Wallet,
  payments:           CreditCard,
  'gift-cards':       Gift,
  packages:           Layers,
  'link-in-bio':      Link2,
  'instagram-autodm': MessageCircle,
  email:              Mail,
  'audience-capture': UserPlus,
  crm:                UsersRound,
  analytics:          BarChart3,
};

// ─── NavIcon ─────────────────────────────────────────────────────────────────

function NavIcon({ icon: Icon, pink = false }: { icon: LucideIcon; pink?: boolean }) {
  return (
    <span
      className="shrink-0 flex items-center justify-center rounded-[8px] w-[34px] h-[34px]"
      style={{ background: pink ? `${PINK}12` : '#F5F5F5' }}
    >
      <Icon size={15} strokeWidth={1.75} color={pink ? PINK : INK} />
    </span>
  );
}

// ─── Mega menu panel ─────────────────────────────────────────────────────────

function MenuPanel({
  children,
  className = '',
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      role="menu"
      className={`absolute top-[calc(100%+10px)] z-50 rounded-[22px] bg-white ${className}`}
      style={{
        boxShadow: '0 4px 32px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
        border: '1px solid rgba(0,0,0,0.06)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Feature menu item ───────────────────────────────────────────────────────

function FeatureItem({ f }: { f: NavFeature }) {
  const Icon = FEATURE_ICONS[f.slug];
  const dimmed = f.status === 'coming-soon';
  return (
    <Link
      to={f.route}
      role="menuitem"
      className={`group flex items-start gap-2.5 rounded-xl px-2 py-1.5 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#F52B8C] ${
        dimmed ? 'pointer-events-none opacity-40' : 'hover:bg-[#FFF5F9]'
      }`}
    >
      {Icon && <NavIcon icon={Icon} />}
      <div className="min-w-0 pt-0.5">
        <p className="flex items-center gap-1.5 text-[13px] font-semibold leading-tight text-gray-900">
          {f.title}
          {dimmed && (
            <span className="rounded-full bg-gray-100 px-1.5 py-[2px] text-[9px] font-bold uppercase tracking-wide text-gray-400">
              Soon
            </span>
          )}
        </p>
        <p className="mt-0.5 text-[11.5px] leading-snug text-gray-400 line-clamp-1">{f.desc}</p>
      </div>
    </Link>
  );
}

// ─── Tool menu item ───────────────────────────────────────────────────────────

function ToolItem({ t }: { t: NavTool }) {
  if (t.status === 'coming-soon') {
    return (
      <div className="flex items-center justify-between px-3 py-1.5 opacity-40 cursor-default">
        <p className="text-[12.5px] font-medium text-gray-700 leading-snug">{t.title}</p>
        <span className="shrink-0 rounded-full bg-gray-100 px-1.5 py-[2px] text-[9px] font-bold uppercase tracking-wide text-gray-400">
          Soon
        </span>
      </div>
    );
  }
  return (
    <Link
      to={t.route}
      role="menuitem"
      className="block rounded-xl px-3 py-1.5 transition-colors duration-150 hover:bg-[#FFF5F9] focus-visible:outline-2 focus-visible:outline-[#F52B8C]"
    >
      <p className="text-[12.5px] font-medium text-gray-800 leading-snug">{t.title}</p>
    </Link>
  );
}

// ─── Product mega menu ───────────────────────────────────────────────────────

function ProductMenu() {
  return (
    <MenuPanel
      className="left-1/2 -translate-x-1/2 p-4"
      style={{ width: 'min(calc(100vw - 40px), 720px)' }}
    >
      <div className="grid grid-cols-3 gap-x-2">
        {NAV_FEATURE_CATEGORIES.map(cat => {
          const items = FEATURES.filter(f => f.category === cat.key);
          return (
            <div key={cat.key}>
              <p className="mb-1.5 px-2.5 text-[9.5px] font-bold uppercase tracking-[0.1em] text-gray-400">
                {cat.label}
              </p>
              <div className="space-y-0">
                {items.map(f => <FeatureItem key={f.slug} f={f} />)}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 border-t border-gray-100 pt-2.5 px-1">
        <Link to="/features" className="text-[12px] font-semibold transition-colors hover:opacity-80" style={{ color: PINK }}>
          View all features →
        </Link>
      </div>
    </MenuPanel>
  );
}

// ─── Use Cases mega menu ─────────────────────────────────────────────────────

function UseCasesMenu() {
  return (
    <MenuPanel
      className="left-1/2 -translate-x-1/2 p-5"
      style={{ width: 'min(calc(100vw - 40px), 680px)' }}
    >
      <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
        {USE_CASE_PERSONAS.map(p => {
          const Icon = p.icon;
          if (!p.live) {
            return (
              <div
                key={p.slug}
                className="flex items-start gap-2.5 rounded-xl px-2 py-1.5 opacity-50 pointer-events-none cursor-default"
              >
                <span
                  className="shrink-0 flex items-center justify-center rounded-[8px] w-[34px] h-[34px]"
                  style={{ background: '#F5F5F5' }}
                >
                  <Icon size={15} strokeWidth={1.75} color={INK} />
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="text-[13.5px] font-semibold leading-tight text-gray-900">{p.title}</p>
                  <p className="mt-0.5 text-[11.5px] leading-snug text-gray-400 line-clamp-1">{p.subtitle}</p>
                </div>
              </div>
            );
          }
          return (
            <Link
              key={p.slug}
              to={p.route}
              role="menuitem"
              className="flex items-start gap-2.5 rounded-xl px-2 py-1.5 transition-colors duration-150 hover:bg-[#FFF5F9] focus-visible:outline-2 focus-visible:outline-[#F52B8C]"
            >
              <span
                className="shrink-0 flex items-center justify-center rounded-[8px] w-[34px] h-[34px]"
                style={{ background: '#F5F5F5' }}
              >
                <Icon size={15} strokeWidth={1.75} color={INK} />
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="text-[13.5px] font-semibold leading-tight text-gray-900">{p.title}</p>
                <p className="mt-0.5 text-[11.5px] leading-snug text-gray-400 line-clamp-1">{p.subtitle}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </MenuPanel>
  );
}

// ─── Free Tools mega menu ────────────────────────────────────────────────────

function ToolsMenu() {
  return (
    <MenuPanel
      className="left-1/2 -translate-x-1/2 p-5"
      style={{ width: 'min(calc(100vw - 40px), 620px)' }}
    >
      <div className="grid grid-cols-3 gap-x-2">
        {TOOL_CATEGORIES.map(cat => {
          const items = TOOLS.filter(t => t.category === cat.key);
          return (
            <div key={cat.key}>
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">
                {cat.label}
              </p>
              <div className="space-y-0.5">
                {items.map(t => <ToolItem key={t.slug} t={t} />)}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 border-t border-gray-100 pt-3 px-1">
        <Link to="/tools" className="text-[12px] font-semibold transition-colors hover:opacity-80" style={{ color: PINK }}>
          View all free tools →
        </Link>
      </div>
    </MenuPanel>
  );
}

// ─── Desktop dropdown trigger ────────────────────────────────────────────────

interface DropdownProps {
  id: string;
  label: string;
  isActive: boolean;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}

function Dropdown({ id, label, isActive, open, onToggle, children }: DropdownProps) {
  return (
    <div>
      <button
        id={`${id}-btn`}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={`${id}-menu`}
        onClick={onToggle}
        className={`inline-flex items-center gap-1 rounded px-2 py-1.5 text-[13px] font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F52B8C] ${
          isActive || open ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        {label}
        <ChevronDown
          size={12}
          strokeWidth={2}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div id={`${id}-menu`}>{children}</div>}
    </div>
  );
}

// ─── Mobile accordion section ─────────────────────────────────────────────────

function MobileSection({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        className="flex w-full items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition focus-visible:outline-2 focus-visible:outline-[#F52B8C]"
      >
        {label}
        <ChevronDown size={14} strokeWidth={2} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="mt-1 pl-2">{children}</div>}
    </div>
  );
}

// ─── Mobile menu drawer ───────────────────────────────────────────────────────

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div role="dialog" aria-modal="true" aria-label="Navigation menu" className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/15 backdrop-blur-sm" aria-hidden="true" onClick={onClose} />
      <div className="relative bg-white w-full mt-[52px] rounded-b-2xl shadow-lg max-h-[calc(100vh-52px)] overflow-y-auto">
        <nav className="px-3 py-3 space-y-0.5">

          <MobileSection label="Features">
            {NAV_FEATURE_CATEGORIES.map(cat => (
              <div key={cat.key} className="mt-2 first:mt-1">
                <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">{cat.label}</p>
                {FEATURES.filter(f => f.category === cat.key).map(f => {
                  const Icon = FEATURE_ICONS[f.slug];
                  return (
                    <Link
                      key={f.slug}
                      to={f.route}
                      onClick={onClose}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium text-gray-700 hover:bg-[#FFF5F9] transition"
                    >
                      {Icon && <Icon size={14} strokeWidth={1.75} color={INK} />}
                      {f.title}
                      {f.status === 'coming-soon' && (
                        <span className="ml-auto text-[9px] font-bold uppercase text-gray-400">Soon</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </MobileSection>

          <MobileSection label="Use cases">
            <div className="mt-1">
              {USE_CASE_PERSONAS.map(p => {
                const Icon = p.icon;
                if (!p.live) {
                  return (
                    <div
                      key={p.slug}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl opacity-50 pointer-events-none cursor-default"
                    >
                      <Icon size={14} strokeWidth={1.75} color={INK} />
                      <div className="min-w-0">
                        <span className="text-[13px] font-medium text-gray-700">{p.title}</span>
                        <span className="ml-2 text-[11px] text-gray-400 truncate">{p.subtitle}</span>
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={p.slug}
                    to={p.route}
                    onClick={onClose}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium text-gray-700 hover:bg-[#FFF5F9] transition"
                  >
                    <Icon size={14} strokeWidth={1.75} color={INK} />
                    <div className="min-w-0">
                      <span>{p.title}</span>
                      <span className="ml-2 text-[11px] text-gray-400 truncate">{p.subtitle}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </MobileSection>

          <MobileSection label="Free Tools">
            {TOOL_CATEGORIES.map(cat => (
              <div key={cat.key} className="mt-2 first:mt-1">
                <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">{cat.label}</p>
                {TOOLS.filter(t => t.category === cat.key).map(t => (
                  t.status === 'coming-soon'
                    ? (
                      <div key={t.slug} className="flex items-center justify-between px-3 py-2 text-[13px] text-gray-400">
                        {t.title}
                        <span className="text-[9px] font-bold uppercase">Soon</span>
                      </div>
                    )
                    : (
                      <Link
                        key={t.slug}
                        to={t.route}
                        onClick={onClose}
                        className="block px-3 py-2 rounded-xl text-[13px] font-medium text-gray-700 hover:bg-[#FFF5F9] transition"
                      >
                        {t.title}
                      </Link>
                    )
                ))}
              </div>
            ))}
            <Link to="/tools" onClick={onClose} className="block px-3 py-2 text-[13px] font-semibold" style={{ color: PINK }}>
              View all free tools →
            </Link>
          </MobileSection>

          <Link to="/pricing" onClick={onClose} className="flex items-center px-3 py-2.5 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition">
            Pricing
          </Link>
          <Link to="/affiliate" onClick={onClose} className="flex items-center px-3 py-2.5 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition">
            Affiliate
          </Link>
          <Link to="/blog" onClick={onClose} className="flex items-center px-3 py-2.5 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition">
            Blog
          </Link>

          <div className="border-t border-gray-100 pt-3 mt-3 space-y-2 px-1">
            <Link to="/login" onClick={onClose} className="block text-center py-2.5 rounded-xl text-[14px] font-medium text-gray-600 hover:bg-gray-50 transition">
              Log in
            </Link>
            <Link
              to="/onboarding"
              onClick={onClose}
              className="block text-center py-3 rounded-xl text-[14px] font-bold text-white transition hover:opacity-90"
              style={{ background: PINK }}
            >
              Start for free
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function SiteNav() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback((id: string) => {
    setOpenMenu(prev => prev === id ? null : id);
  }, []);

  const closeAll = useCallback(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, []);

  useEffect(() => { closeAll(); }, [pathname, closeAll]);

  useEffect(() => {
    if (openMenu === null && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeAll(); };
    const onMouse = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) closeAll();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onMouse);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onMouse);
    };
  }, [openMenu, mobileOpen, closeAll]);

  const isProductActive   = FEATURES.some(f => pathname.startsWith(f.route));
  const isUseCasesActive  = pathname.startsWith('/use-cases');
  const isToolsActive     = pathname.startsWith('/tools');

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="fixed top-0 w-full z-50 px-4 pt-3 pointer-events-none"
      >
        {/* Pill — position:relative anchors mega menus so left:50% centers against the pill */}
        <div
          className="relative max-w-6xl mx-auto px-5 h-[52px] flex items-center gap-5 pointer-events-auto bg-white/92 backdrop-blur-md rounded-2xl"
          style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.08)' }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 focus-visible:outline-2 focus-visible:outline-[#F52B8C] rounded">
            <div className="w-5 h-5 rounded" style={{ backgroundColor: PINK }} aria-hidden="true" />
            <span className="text-[15px] font-extrabold text-gray-900 tracking-tight">Nelsy</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5 flex-1">
            <Dropdown
              id="product" label="Features"
              isActive={isProductActive} open={openMenu === 'product'}
              onToggle={() => toggle('product')}
            >
              <ProductMenu />
            </Dropdown>

            <Dropdown
              id="use-cases" label="Use cases"
              isActive={isUseCasesActive} open={openMenu === 'use-cases'}
              onToggle={() => toggle('use-cases')}
            >
              <UseCasesMenu />
            </Dropdown>

            <Dropdown
              id="tools" label="Free Tools"
              isActive={isToolsActive} open={openMenu === 'tools'}
              onToggle={() => toggle('tools')}
            >
              <ToolsMenu />
            </Dropdown>

            <Link to="/pricing" className="px-2 py-1.5 text-[13px] font-medium text-gray-500 hover:text-gray-900 transition-colors duration-150 rounded focus-visible:outline-2 focus-visible:outline-[#F52B8C]">
              Pricing
            </Link>
            <Link to="/affiliate" className="px-2 py-1.5 text-[13px] font-medium text-gray-500 hover:text-gray-900 transition-colors duration-150 rounded focus-visible:outline-2 focus-visible:outline-[#F52B8C]">
              Affiliate
            </Link>
            <Link
              to="/blog"
              className={`px-2 py-1.5 text-[13px] font-medium transition-colors duration-150 rounded focus-visible:outline-2 focus-visible:outline-[#F52B8C] ${pathname.startsWith('/blog') ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Blog
            </Link>
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2 ml-auto shrink-0">
            <Link
              to="/login"
              className="text-[13px] font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-[7px] rounded-xl transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F52B8C]"
            >
              Log in
            </Link>
            <SeoCTA
              label="Start for free"
              position="nav"
              variant="nav"
              className="text-[13px] font-bold text-white px-4 py-[7px] rounded-xl"
            />
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => { setMobileOpen(v => !v); setOpenMenu(null); }}
            className="md:hidden ml-auto flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F52B8C]"
          >
            {mobileOpen ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M3 3l12 12M15 3L3 15" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M3 5h12M3 9h12M3 13h12" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </>
  );
}
