import { useState, useRef, useEffect, useCallback, type ReactNode, type CSSProperties } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Calendar, Wallet, CreditCard, Gift, Layers,
  GraduationCap, FileDown, Gem, Video, PackageCheck,
  Link2, MessageCircle, Mail, UserPlus,
  UsersRound, BarChart3,
  BookOpen, BookA, Scale, PlayCircle, MessageSquare,
  ChevronDown, ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { trackSeoCTAClicked } from '@/lib/analytics';
import {
  NAV_PRODUCT_GROUPS, NAV_AUDIENCES, NAV_RESOURCES, NAV_CTA, USE_CASE_GOALS,
  liveFeatures, featureBlurb, liveToolGroups, liveCrafts,
} from '@/lib/navData';
import type { NavFeature } from '@/lib/navData';

const PINK = '#F52B8C';
const INK  = '#1A1A1A';

// ─── Icons ────────────────────────────────────────────────────────────────────

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

const RESOURCE_ICONS: Record<string, LucideIcon> = {
  '/blog':                            BookOpen,
  '/glossary':                        BookA,
  '/best-booking-app-for-nail-techs': Scale,
  '/demo':                            PlayCircle,
  '/contact':                         MessageSquare,
};

// Computed once: menus only list pages that exist.
const PRODUCT_COLUMNS = NAV_PRODUCT_GROUPS
  .map((g) => ({ ...g, items: liveFeatures(g.key) }))
  .filter((g) => g.items.length > 0);
const TOOL_GROUPS = liveToolGroups();
const CRAFTS = liveCrafts();

const FEATURE_ROUTES = PRODUCT_COLUMNS.flatMap((c) => c.items.map((f) => f.route));
const SOLUTION_ROUTES = [...NAV_AUDIENCES.map((a) => a.route), ...CRAFTS.map((c) => c.route), ...USE_CASE_GOALS.map((g) => g.route)];
const RESOURCE_ROUTES = NAV_RESOURCES.map((r) => r.to);

const matches = (pathname: string, route: string) => pathname === route || pathname.startsWith(route + '/');

const FOCUS = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F52B8C]';
const ITEM = `rounded-xl transition-colors duration-150 hover:bg-[#FFF5F9] ${FOCUS}`;

// ─── Small parts ──────────────────────────────────────────────────────────────

function NavIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="shrink-0 flex items-center justify-center rounded-[8px] w-[34px] h-[34px] bg-[#F5F5F5]" aria-hidden="true">
      <Icon size={15} strokeWidth={1.75} color={INK} />
    </span>
  );
}

function CreatorBadge() {
  return (
    <span
      className="shrink-0 rounded-full px-1.5 py-[2px] text-[9px] font-bold uppercase tracking-wide whitespace-nowrap"
      style={{ background: '#FFE4F1', color: '#B3125F' }}
    >
      Creator plan
    </span>
  );
}

function GroupLabel({ children }: { children: ReactNode }) {
  return <p className="mb-1.5 px-2 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">{children}</p>;
}

function PanelFooter({ children }: { children: ReactNode }) {
  return <div className="mt-3 border-t border-gray-100 pt-3 px-2 flex flex-wrap items-center gap-x-6 gap-y-2">{children}</div>;
}

function PinkLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className={`inline-flex items-center gap-1 rounded text-[12.5px] font-semibold hover:opacity-80 ${FOCUS}`} style={{ color: PINK }}>
      {children} <ArrowRight size={13} strokeWidth={2} aria-hidden="true" />
    </Link>
  );
}

function MenuPanel({ id, labelledBy, children, className = '', style }: {
  id: string; labelledBy: string; children: ReactNode; className?: string; style?: CSSProperties;
}) {
  return (
    <div
      id={id}
      aria-labelledby={labelledBy}
      className={`absolute z-50 rounded-[22px] bg-white p-4 ${className}`}
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

function FeatureLink({ f, pathname }: { f: NavFeature; pathname: string }) {
  const Icon = FEATURE_ICONS[f.slug] ?? Layers;
  const current = matches(pathname, f.route);
  return (
    <Link
      to={f.route}
      aria-current={current ? 'page' : undefined}
      className={`flex items-start gap-2.5 px-2 py-2 ${ITEM} ${current ? 'bg-[#FFF5F9]' : ''}`}
    >
      <NavIcon icon={Icon} />
      <span className="min-w-0 pt-0.5">
        <span className="block text-[13px] font-semibold leading-tight text-gray-900">{f.title}</span>
        {f.plan === 'creator' && <span className="mt-1 flex"><CreatorBadge /></span>}
        <span className="mt-0.5 block text-[11.5px] leading-snug text-gray-500 line-clamp-2">{featureBlurb(f)}</span>
      </span>
    </Link>
  );
}

// ─── Desktop menus ────────────────────────────────────────────────────────────

function ProductMenu({ pathname }: { pathname: string }) {
  return (
    <MenuPanel id="product-menu" labelledBy="product-btn" className="left-1/2 -translate-x-1/2 top-[calc(100%+10px)]" style={{ width: 'min(calc(100vw - 40px), 940px)' }}>
      <div className="grid gap-x-2" style={{ gridTemplateColumns: `repeat(${PRODUCT_COLUMNS.length}, minmax(0, 1fr))` }}>
        {PRODUCT_COLUMNS.map((col) => (
          <div key={col.key} className={col.key === 'sell' ? 'rounded-2xl bg-[#FFFAFC] -my-1 py-1' : ''}>
            <GroupLabel>{col.label}</GroupLabel>
            <div>{col.items.map((f) => <FeatureLink key={f.slug} f={f} pathname={pathname} />)}</div>
          </div>
        ))}
      </div>
      <PanelFooter>
        <PinkLink to="/pricing">Compare plans</PinkLink>
        <PinkLink to="/demo">See the live demo</PinkLink>
        <span className="ml-auto text-[11.5px] text-gray-500">
          <span className="font-semibold text-gray-700">Creator plan</span> features are part of our upcoming plan for creators.
        </span>
      </PanelFooter>
    </MenuPanel>
  );
}

function SolutionsMenu({ pathname }: { pathname: string }) {
  return (
    <MenuPanel id="solutions-menu" labelledBy="solutions-btn" className="left-1/2 -translate-x-1/2 top-[calc(100%+10px)]" style={{ width: 'min(calc(100vw - 40px), 680px)' }}>
      <div className="grid grid-cols-[1.25fr_1fr] gap-x-4">
        <div>
          <GroupLabel>Built for</GroupLabel>
          {NAV_AUDIENCES.map((a) => {
            const current = matches(pathname, a.route);
            return (
              <Link
                key={a.slug}
                to={a.route}
                aria-current={current ? 'page' : undefined}
                className={`flex items-start gap-2.5 px-2 py-2.5 ${ITEM} ${current ? 'bg-[#FFF5F9]' : ''}`}
              >
                <NavIcon icon={a.icon} />
                <span className="min-w-0 pt-0.5">
                  <span className="block text-[13.5px] font-semibold leading-tight text-gray-900">{a.title}</span>
                  <span className="mt-0.5 block text-[11.5px] leading-snug text-gray-500">{a.desc}</span>
                </span>
              </Link>
            );
          })}
        </div>
        <div className="border-l border-gray-100 pl-4">
          {CRAFTS.length > 0 && (
            <div className="mb-3">
              <GroupLabel>By craft</GroupLabel>
              {CRAFTS.map((c) => (
                <Link
                  key={c.slug}
                  to={c.route}
                  aria-current={matches(pathname, c.route) ? 'page' : undefined}
                  className={`flex items-center gap-2 px-2 py-2 text-[13px] font-medium text-gray-800 ${ITEM}`}
                >
                  <c.icon size={14} strokeWidth={1.75} color={INK} aria-hidden="true" />
                  {c.title}
                </Link>
              ))}
            </div>
          )}
          <GroupLabel>By goal</GroupLabel>
          {USE_CASE_GOALS.map((g) => (
            <Link
              key={g.slug}
              to={g.route}
              aria-current={matches(pathname, g.route) ? 'page' : undefined}
              className={`block px-2 py-2 text-[13px] font-medium text-gray-800 ${ITEM}`}
            >
              {g.title}
            </Link>
          ))}
        </div>
      </div>
    </MenuPanel>
  );
}

function ToolsMenu({ pathname }: { pathname: string }) {
  return (
    <MenuPanel id="tools-menu" labelledBy="tools-btn" className="left-1/2 -translate-x-1/2 top-[calc(100%+10px)]" style={{ width: `min(calc(100vw - 40px), ${Math.max(TOOL_GROUPS.length, 2) * 230}px)` }}>
      <div className="grid gap-x-2" style={{ gridTemplateColumns: `repeat(${TOOL_GROUPS.length}, minmax(0, 1fr))` }}>
        {TOOL_GROUPS.map((g) => (
          <div key={g.key}>
            <GroupLabel>{g.label}</GroupLabel>
            {g.tools.map((t) => (
              <Link
                key={t.slug}
                to={t.route}
                aria-current={matches(pathname, t.route) ? 'page' : undefined}
                className={`block px-2 py-2 text-[12.5px] font-medium leading-snug text-gray-800 ${ITEM}`}
              >
                {t.title}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <PanelFooter>
        <PinkLink to="/tools">All free tools</PinkLink>
      </PanelFooter>
    </MenuPanel>
  );
}

function ResourcesMenu({ pathname }: { pathname: string }) {
  return (
    // Anchored to its trigger (not the pill), so the offset adds the gap between button and pill bottom.
    <MenuPanel id="resources-menu" labelledBy="resources-btn" className="left-0 top-[calc(100%+21px)]" style={{ width: 320 }}>
      {NAV_RESOURCES.map((r) => (
        <Link
          key={r.to}
          to={r.to}
          aria-current={matches(pathname, r.to) ? 'page' : undefined}
          className={`flex items-start gap-2.5 px-2 py-2 ${ITEM}`}
        >
          <NavIcon icon={RESOURCE_ICONS[r.to] ?? BookOpen} />
          <span className="min-w-0 pt-0.5">
            <span className="block text-[13px] font-semibold leading-tight text-gray-900">{r.label}</span>
            <span className="mt-0.5 block text-[11.5px] leading-snug text-gray-500">{r.desc}</span>
          </span>
        </Link>
      ))}
    </MenuPanel>
  );
}

// ─── Desktop dropdown trigger ─────────────────────────────────────────────────

function Dropdown({ id, label, isActive, open, onToggle, anchorToTrigger = false, children }: {
  id: string; label: string; isActive: boolean; open: boolean; onToggle: () => void;
  /** true: panel opens under its trigger; false: panel centers on the nav pill */
  anchorToTrigger?: boolean; children: ReactNode;
}) {
  return (
    <div className={anchorToTrigger ? 'relative' : undefined}>
      <button
        type="button"
        id={`${id}-btn`}
        aria-expanded={open}
        aria-controls={`${id}-menu`}
        onClick={onToggle}
        className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-colors duration-150 ${FOCUS} ${
          isActive || open ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        {label}
        <ChevronDown size={12} strokeWidth={2} aria-hidden="true" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && children}
    </div>
  );
}

// ─── Mobile drawer ────────────────────────────────────────────────────────────

const M_ROW = `flex min-h-[44px] items-center gap-2.5 px-3 rounded-xl text-[14px] font-medium text-gray-800 hover:bg-[#FFF5F9] transition ${FOCUS}`;

function MobileSection({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        type="button"
        id={`m-${id}-btn`}
        aria-expanded={open}
        aria-controls={`m-${id}-panel`}
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full min-h-[48px] items-center justify-between px-3 rounded-xl text-[15px] font-semibold text-gray-900 hover:bg-gray-50 transition ${FOCUS}`}
      >
        {label}
        <ChevronDown size={16} strokeWidth={2} aria-hidden="true" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div id={`m-${id}-panel`} className="pb-2 pl-1">{children}</div>}
    </div>
  );
}

function MobileLabel({ children }: { children: ReactNode }) {
  return <p className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">{children}</p>;
}

function MobileMenu({ onClose, onCta, drawerRef }: { onClose: () => void; onCta: () => void; drawerRef: React.RefObject<HTMLDivElement | null> }) {
  // Lock page scroll while the drawer is open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div ref={drawerRef} id="mobile-menu" className="lg:hidden fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" aria-hidden="true" onClick={onClose} />
      <div className="relative bg-white w-full pt-[72px] pb-4 rounded-b-2xl shadow-lg max-h-[100dvh] overflow-y-auto overscroll-contain">
        <nav aria-label="Mobile" className="px-3">
          <MobileSection id="product" label="Product">
            {PRODUCT_COLUMNS.map((col) => (
              <div key={col.key}>
                <MobileLabel>{col.label}</MobileLabel>
                {col.items.map((f) => {
                  const Icon = FEATURE_ICONS[f.slug] ?? Layers;
                  return (
                    <Link key={f.slug} to={f.route} onClick={onClose} className={M_ROW}>
                      <Icon size={16} strokeWidth={1.75} color={INK} aria-hidden="true" />
                      <span className="flex-1">{f.title}</span>
                      {f.plan === 'creator' && <CreatorBadge />}
                    </Link>
                  );
                })}
              </div>
            ))}
          </MobileSection>

          <MobileSection id="solutions" label="Who it's for">
            <MobileLabel>Built for</MobileLabel>
            {NAV_AUDIENCES.map((a) => (
              <Link key={a.slug} to={a.route} onClick={onClose} className={M_ROW}>
                <a.icon size={16} strokeWidth={1.75} color={INK} aria-hidden="true" />
                {a.title}
              </Link>
            ))}
            {CRAFTS.length > 0 && <MobileLabel>By craft</MobileLabel>}
            {CRAFTS.map((c) => (
              <Link key={c.slug} to={c.route} onClick={onClose} className={M_ROW}>
                <c.icon size={16} strokeWidth={1.75} color={INK} aria-hidden="true" />
                {c.title}
              </Link>
            ))}
            <MobileLabel>By goal</MobileLabel>
            {USE_CASE_GOALS.map((g) => (
              <Link key={g.slug} to={g.route} onClick={onClose} className={M_ROW}>{g.title}</Link>
            ))}
          </MobileSection>

          <MobileSection id="tools" label="Free tools">
            {TOOL_GROUPS.map((g) => (
              <div key={g.key}>
                <MobileLabel>{g.label}</MobileLabel>
                {g.tools.map((t) => (
                  <Link key={t.slug} to={t.route} onClick={onClose} className={M_ROW}>{t.title}</Link>
                ))}
              </div>
            ))}
            <Link to="/tools" onClick={onClose} className={`${M_ROW} font-semibold`} style={{ color: PINK }}>
              All free tools <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </MobileSection>

          <MobileSection id="resources" label="Resources">
            {NAV_RESOURCES.map((r) => {
              const Icon = RESOURCE_ICONS[r.to] ?? BookOpen;
              return (
                <Link key={r.to} to={r.to} onClick={onClose} className={M_ROW}>
                  <Icon size={16} strokeWidth={1.75} color={INK} aria-hidden="true" />
                  {r.label}
                </Link>
              );
            })}
          </MobileSection>

          <Link to="/pricing" onClick={onClose} className={`flex min-h-[48px] items-center px-3 rounded-xl text-[15px] font-semibold text-gray-900 hover:bg-gray-50 transition ${FOCUS}`}>
            Pricing
          </Link>

          <div className="border-t border-gray-100 pt-3 mt-2 space-y-2 px-1">
            <Link to="/login" onClick={onClose} className={`flex min-h-[48px] items-center justify-center rounded-xl bg-gray-100 text-[15px] font-medium text-gray-800 hover:bg-gray-200 transition ${FOCUS}`}>
              Log in
            </Link>
            <Link
              to={NAV_CTA.to}
              onClick={() => { onCta(); onClose(); }}
              className={`flex min-h-[48px] items-center justify-center rounded-xl text-[15px] font-bold text-white transition hover:opacity-90 ${FOCUS}`}
              style={{ background: PINK }}
            >
              {NAV_CTA.label}
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

type MenuId = 'product' | 'solutions' | 'tools' | 'resources';

export default function SiteNav() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const toggle = useCallback((id: MenuId) => {
    setOpenMenu((prev) => (prev === id ? null : id));
  }, []);

  const trackCta = useCallback(() => trackSeoCTAClicked(pathname, 'nav', NAV_CTA.label), [pathname]);

  // Close everything on navigation.
  useEffect(() => { setOpenMenu(null); setMobileOpen(false); }, [pathname]);

  // Escape closes and returns focus to the control that opened the menu.
  useEffect(() => {
    if (openMenu === null && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (openMenu) {
        document.getElementById(`${openMenu}-btn`)?.focus();
        setOpenMenu(null);
      }
      if (mobileOpen) {
        setMobileOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openMenu, mobileOpen]);

  // Desktop dropdowns: close on click outside the bar or when focus leaves it (Tab past the last item).
  useEffect(() => {
    if (openMenu === null) return;
    const inside = (t: EventTarget | null) => !!t && !!navRef.current?.contains(t as Node);
    const onMouse = (e: MouseEvent) => { if (!inside(e.target)) setOpenMenu(null); };
    const onFocus = (e: FocusEvent) => { if (!inside(e.target)) setOpenMenu(null); };
    document.addEventListener('mousedown', onMouse);
    document.addEventListener('focusin', onFocus);
    return () => {
      document.removeEventListener('mousedown', onMouse);
      document.removeEventListener('focusin', onFocus);
    };
  }, [openMenu]);

  // Move focus into the drawer when it opens.
  useEffect(() => {
    if (mobileOpen) drawerRef.current?.querySelector<HTMLElement>('button, a')?.focus();
  }, [mobileOpen]);

  // Leaving mobile width with the drawer open: close it so the scroll lock is released.
  useEffect(() => {
    if (!mobileOpen) return;
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => { if (mq.matches) setMobileOpen(false); };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [mobileOpen]);

  const active = {
    product:   FEATURE_ROUTES.some((r) => matches(pathname, r)),
    solutions: SOLUTION_ROUTES.some((r) => matches(pathname, r)),
    tools:     matches(pathname, '/tools'),
    resources: RESOURCE_ROUTES.some((r) => matches(pathname, r)),
  };
  const pricingActive = matches(pathname, '/pricing');

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="fixed top-0 w-full z-50 px-4 pt-3 pointer-events-none"
      >
        {/* Pill: position:relative anchors the wide menus so left-1/2 centers them on the pill */}
        <div
          className="relative max-w-6xl mx-auto pl-5 pr-2 lg:pr-3 h-[52px] flex items-center gap-4 pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl"
          style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.08)' }}
        >
          <Link to="/" aria-label="Nelsy home" className={`flex items-center gap-2 shrink-0 rounded ${FOCUS}`}>
            <span className="w-5 h-5 rounded" style={{ backgroundColor: PINK }} aria-hidden="true" />
            <span className="text-[15px] font-extrabold text-gray-900 tracking-tight">Nelsy</span>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1">
            <Dropdown id="product" label="Product" isActive={active.product} open={openMenu === 'product'} onToggle={() => toggle('product')}>
              <ProductMenu pathname={pathname} />
            </Dropdown>
            <Dropdown id="solutions" label="Who it's for" isActive={active.solutions} open={openMenu === 'solutions'} onToggle={() => toggle('solutions')}>
              <SolutionsMenu pathname={pathname} />
            </Dropdown>
            <Dropdown id="tools" label="Free tools" isActive={active.tools} open={openMenu === 'tools'} onToggle={() => toggle('tools')}>
              <ToolsMenu pathname={pathname} />
            </Dropdown>
            <Dropdown id="resources" label="Resources" isActive={active.resources} open={openMenu === 'resources'} onToggle={() => toggle('resources')} anchorToTrigger>
              <ResourcesMenu pathname={pathname} />
            </Dropdown>
            <Link
              to="/pricing"
              aria-current={pricingActive ? 'page' : undefined}
              className={`rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-colors duration-150 ${FOCUS} ${pricingActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Pricing
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-2 ml-auto shrink-0">
            <Link
              to="/login"
              className={`text-[13px] font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-[7px] rounded-xl transition-colors duration-150 ${FOCUS}`}
            >
              Log in
            </Link>
            <Link
              to={NAV_CTA.to}
              onClick={trackCta}
              className={`text-[13px] font-bold text-white px-4 py-[7px] rounded-xl transition hover:opacity-90 ${FOCUS}`}
              style={{ backgroundColor: PINK }}
            >
              {NAV_CTA.label}
            </Link>
          </div>

          {/* Mobile: CTA stays visible, everything else lives in the drawer */}
          <div className="lg:hidden ml-auto flex items-center gap-1">
            <Link
              to={NAV_CTA.to}
              onClick={trackCta}
              className={`inline-flex min-h-[40px] items-center text-[13px] font-bold text-white px-3.5 rounded-xl transition hover:opacity-90 ${FOCUS}`}
              style={{ backgroundColor: PINK }}
            >
              {NAV_CTA.label}
            </Link>
            <button
              ref={burgerRef}
              type="button"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => { setMobileOpen((v) => !v); setOpenMenu(null); }}
              className={`flex items-center justify-center w-11 h-11 rounded-xl text-gray-700 hover:bg-gray-100 transition ${FOCUS}`}
            >
              {mobileOpen ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <path d="M3 3l12 12M15 3L3 15" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <path d="M3 5h12M3 9h12M3 13h12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && <MobileMenu drawerRef={drawerRef} onClose={() => setMobileOpen(false)} onCta={trackCta} />}
    </>
  );
}
