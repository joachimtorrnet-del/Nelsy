import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { trackSeoCTAClicked } from '@/lib/analytics';
import { NAV_CTA } from '@/lib/navData';

const PINK = '#F52B8C';

const FOCUS = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F52B8C]';

const matches = (pathname: string, route: string) => pathname === route || pathname.startsWith(route + '/');

// ─── Mobile menu ──────────────────────────────────────────────────────────────

const MOBILE_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Blog', to: '/blog' },
  { label: 'Affiliates', to: '/affiliates' },
];

function MobileMenu({ onClose, onCta, drawerRef, pathname }: { onClose: () => void; onCta: () => void; drawerRef: React.RefObject<HTMLDivElement | null>; pathname: string }) {
  // Lock page scroll while the menu is open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div ref={drawerRef} id="mobile-menu" className="lg:hidden fixed inset-0 z-40 px-4 pt-3">
      {/* Stan-style: the page dims and the nav pill grows into a card (links, then Log in and the CTA). */}
      <div className="nav-sheet-backdrop absolute inset-0 bg-[#1A1A1A]/70" aria-hidden="true" onClick={onClose} />
      <div
        className="nav-sheet relative max-w-6xl mx-auto bg-white rounded-2xl pt-[52px] max-h-[calc(100dvh-24px)] overflow-y-auto overscroll-contain"
        style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.08)' }}
      >
        <nav aria-label="Mobile" className="nav-sheet-body px-2 pt-2 pb-4">
          <ul>
            {MOBILE_LINKS.map((l) => {
              const current = l.to === '/' ? pathname === '/' : matches(pathname, l.to);
              return (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={onClose}
                    aria-current={current ? 'page' : undefined}
                    className={`flex min-h-[44px] items-center px-3 rounded-xl text-[17px] transition-colors ${FOCUS} ${current ? 'font-semibold text-[#1A1A1A]' : 'font-medium text-gray-600 hover:text-[#1A1A1A]'}`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 space-y-2.5 px-2">
            <Link
              to="/login"
              onClick={onClose}
              className={`flex min-h-[48px] items-center justify-center rounded-xl border border-[#1A1A1A]/20 text-[15px] font-semibold text-[#1A1A1A] hover:border-[#1A1A1A]/40 transition-colors ${FOCUS}`}
            >
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

export default function SiteNav() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const trackCta = useCallback(() => trackSeoCTAClicked(pathname, 'nav', NAV_CTA.label), [pathname]);

  // Close everything on navigation.
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Escape closes the menu and returns focus to the button that opened it.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        burgerRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !burgerRef.current) return;
      // Keep Tab inside the open menu: close button, links, then back to the close button.
      const items = [burgerRef.current, ...(drawerRef.current?.querySelectorAll<HTMLElement>('a, button') ?? [])];
      const i = items.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : (i === items.length - 1 ? 0 : i + 1);
      e.preventDefault();
      items[next].focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

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
          className={`relative max-w-6xl mx-auto pl-5 pr-2 lg:pr-3 h-[52px] flex items-center gap-4 pointer-events-auto rounded-2xl ${mobileOpen ? 'bg-white' : 'bg-white/95 backdrop-blur-md'}`}
          style={{ boxShadow: mobileOpen ? 'none' : '0 1px 2px rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.08)' }}
        >
          <Link to="/" aria-label="Nelsy home" className={`flex items-center gap-2 shrink-0 rounded ${FOCUS}`}>
            <span className="w-5 h-5 rounded" style={{ backgroundColor: PINK }} aria-hidden="true" />
            <span className="text-[15px] font-extrabold text-gray-900 tracking-tight">Nelsy</span>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1">
            {/* Stan-style: a few plain links. The full map of pages lives in the footer. */}
            {[{ label: 'Home', to: '/' }, { label: 'Blog', to: '/blog' }].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                aria-current={pathname === l.to ? 'page' : undefined}
                className={`rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-colors duration-150 ${FOCUS} ${pathname === l.to ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/pricing"
              aria-current={pricingActive ? 'page' : undefined}
              className={`rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-colors duration-150 ${FOCUS} ${pricingActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Pricing
            </Link>
            <Link
              to="/affiliates"
              aria-current={pathname === '/affiliates' ? 'page' : undefined}
              className={`rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-colors duration-150 ${FOCUS} ${pathname === '/affiliates' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Affiliates
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
              className={`${mobileOpen ? 'hidden' : 'inline-flex'} min-h-[40px] items-center text-[13px] font-bold text-white px-3.5 rounded-xl transition hover:opacity-90 ${FOCUS}`}
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
              onClick={() => { setMobileOpen((v) => !v); }}
              className={`flex items-center justify-center w-11 h-11 rounded-full transition ${FOCUS} ${mobileOpen ? 'bg-gray-100 text-[#1A1A1A]' : 'text-gray-700 hover:bg-gray-100'}`}
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

      {mobileOpen && <MobileMenu drawerRef={drawerRef} pathname={pathname} onClose={() => setMobileOpen(false)} onCta={trackCta} />}
    </>
  );
}
