import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStudio } from '@/hooks/useStudio';
import { useBookingStore } from '@/store/bookingStore';
import { BookingModal } from '@/components/studio/BookingModal';
import { StudioHero } from '@/components/studio/StudioHero';
import { StudioServiceList } from '@/components/studio/StudioServiceList';
import type { Service } from '@/types';
import { recordPageView } from '@/lib/supabase-queries';
import { getTheme } from '@/lib/themes';
import type { NelsyTheme } from '@/lib/themes';

// ── Skeleton ──────────────────────────────────────────────────────────────────

function Skeleton({ theme }: { theme: NelsyTheme }) {
  const pulse = { backgroundColor: theme.cardBorder };
  return (
    <div className="animate-pulse px-5 pt-10">
      {/* Avatar */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 rounded-full mb-4" style={{ backgroundColor: theme.cardBorder }} />
        <div className="h-3 w-28 rounded-full mb-3" style={pulse} />
        <div className="h-5 w-44 rounded-full mb-2" style={pulse} />
        <div className="h-3 w-56 rounded-full mb-1" style={pulse} />
        <div className="h-3 w-40 rounded-full" style={pulse} />
      </div>
      {/* Cards */}
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl h-20" style={{ backgroundColor: theme.cardBorder }} />
        ))}
      </div>
    </div>
  );
}

// ── PLG viral footer ──────────────────────────────────────────────────────────

function PlgFooter({ accent, slug }: { accent: string; slug: string }) {
  const href = `https://getnelsy.com/signup?utm_source=studio_footer&ref=${encodeURIComponent(slug)}`;
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-30 flex justify-center pointer-events-none"
      aria-hidden="true"
    >
      <div className="w-full max-w-[480px] pointer-events-auto px-4 pb-4">
        <div
          className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white"
          style={{
            boxShadow: '0 -2px 20px rgba(0,0,0,0.08), 0 4px 20px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: accent }}
            >
              <span className="text-white font-black text-[10px] leading-none">N</span>
            </div>
            <span className="font-bold text-gray-900 text-sm">Nelsy</span>
          </Link>

          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-4 py-2 rounded-full text-[13px] font-bold transition-opacity hover:opacity-90 active:scale-95"
            style={{ backgroundColor: accent, color: '#FFFFFF' }}
          >
            Try 14 Days Free →
          </a>
        </div>
      </div>
    </div>
  );
}

// ── 404 ───────────────────────────────────────────────────────────────────────

function NotFound({ accent }: { accent: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center px-6">
      <div className="text-5xl mb-4">💅</div>
      <h1 className="text-xl font-bold text-gray-900 mb-2">Studio not found</h1>
      <p className="text-gray-400 text-sm mb-6">
        This studio doesn't exist on Nelsy yet.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-semibold text-sm"
        style={{ background: accent }}
      >
        Create mine →
      </Link>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Studio() {
  const { slug } = useParams<{ slug: string }>();
  const openModal = useBookingStore((s) => s.openModal);
  const { merchant, loading } = useStudio(slug ?? '');

  const trackedRef = useRef(false);

  // Track visit once per session
  useEffect(() => {
    if (!merchant?.id || trackedRef.current) return;
    const sessionKey = `pv_${merchant.id}`;
    if (sessionStorage.getItem(sessionKey)) return;
    trackedRef.current = true;
    sessionStorage.setItem(sessionKey, '1');
    void recordPageView(merchant.id);
  }, [merchant?.id]);

  // SEO
  useEffect(() => {
    if (merchant) document.title = `${merchant.salon_name} — Book on Nelsy`;
    return () => { document.title = 'Nelsy'; };
  }, [merchant?.salon_name]);

  const handleBook = (service?: Service) => {
    if (service) { openModal(service); return; }
    if (merchant && merchant.services.length === 1) {
      openModal(merchant.services[0]);
    } else {
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const theme = getTheme(merchant?.theme_preset, merchant?.color_accent);
  const accent = theme.defaultAccent;

  return (
    // Outer: subtle desktop background dimming
    <div
      className={`min-h-dvh ${theme.fontClass}`}
      style={{ backgroundColor: '#E8E8E8' }}
    >
      {/* Inner: the 480px mobile column */}
      <div
        className="w-full max-w-[480px] mx-auto min-h-dvh flex flex-col relative"
        style={{ backgroundColor: theme.pageBg }}
      >
        {/* Scrollable content — pb-24 clears the sticky PLG footer */}
        <main className="flex-1 pb-24">
          {loading ? (
            <Skeleton theme={theme} />
          ) : !merchant ? (
            <NotFound accent={accent} />
          ) : (
            <>
              <StudioHero merchant={merchant} theme={theme} />

              <div id="services" className="px-4 mt-2">
                <StudioServiceList
                  services={merchant.services}
                  theme={theme}
                  onBook={handleBook}
                />
              </div>
            </>
          )}
        </main>

        {/* PLG viral acquisition bar */}
        {merchant && <PlgFooter accent={accent} slug={merchant.slug} />}
      </div>

      {merchant && <BookingModal merchant={merchant} />}
    </div>
  );
}
