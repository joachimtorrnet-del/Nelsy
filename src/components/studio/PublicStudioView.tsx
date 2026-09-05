import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Merchant } from '@/types';
import { getTheme } from '@/lib/themes';
import { useStudioPublic } from '@/hooks/useStudioPublic';
import { StudioHeroV2 } from './StudioHeroV2';
import { FeaturedService } from './FeaturedService';
import { StudioServiceList } from './StudioServiceList';
import { StudioGallery } from './StudioGallery';
import { StudioTestimonials } from './StudioTestimonials';
import { StudioHours } from './StudioHours';
import { StickyBookCTA } from './StickyBookCTA';
import { PlgCTA } from './PlgCTA';

// ── Types ─────────────────────────────────────────────────────────────────────

export type StudioMode = 'live' | 'preview';

// ── Skeleton ──────────────────────────────────────────────────────────────────

function PreviewSkeleton({ bgColor }: { bgColor: string }) {
  return (
    <div style={{ backgroundColor: bgColor, minHeight: '100%' }}>
      {/* Cover skeleton */}
      <div style={{ height: 200, backgroundColor: 'rgba(128,128,128,0.12)' }} />
      <div style={{ padding: '0 20px 20px', marginTop: -48, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 96, height: 96, borderRadius: '50%', backgroundColor: 'rgba(128,128,128,0.15)', marginBottom: 14 }} />
        <div style={{ width: 140, height: 20, borderRadius: 8, backgroundColor: 'rgba(128,128,128,0.12)', marginBottom: 8 }} />
        <div style={{ width: 200, height: 14, borderRadius: 8, backgroundColor: 'rgba(128,128,128,0.10)', marginBottom: 20 }} />
        <div style={{ width: '100%', height: 54, borderRadius: 16, backgroundColor: 'rgba(128,128,128,0.15)', marginBottom: 24 }} />
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ width: '100%', height: 72, borderRadius: 16, backgroundColor: 'rgba(128,128,128,0.10)', marginBottom: 10 }} />
        ))}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface Props {
  merchant: Merchant;
  mode?: StudioMode;
}

export function PublicStudioView({ merchant, mode = 'live' }: Props) {
  const theme = getTheme(merchant.theme_preset, merchant.color_accent);
  const accent = theme.defaultAccent;
  const isPreview = mode === 'preview';

  // Public data: gallery, testimonials, hours
  const { photos, testimonials, hours } = useStudioPublic(isPreview ? '' : merchant.id);

  // Sticky CTA: watch when hero Book button leaves viewport
  const heroCTARef = useRef<HTMLDivElement>(null);
  const [heroCTAVisible, setHeroCTAVisible] = useState(true);

  useEffect(() => {
    const el = heroCTARef.current;
    if (!el || isPreview) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroCTAVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isPreview]);

  // Split services: first = featured, rest = compact list
  const [featuredService, ...restServices] = merchant.services;

  return (
    <div
      className={theme.fontClass}
      style={{
        backgroundColor: theme.pageBg,
        minHeight: isPreview ? '100%' : '100dvh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Hero V2 ─────────────────────────────────────────── */}
      <StudioHeroV2
        merchant={merchant}
        theme={theme}
        isPreview={isPreview}
        ctaRef={heroCTARef}
      />

      {/* ── Gallery (shows only when photos available) ───────── */}
      <div style={{ padding: '0 16px' }}>
        <StudioGallery photos={photos} textPrimary={theme.textSecondary} />
      </div>

      {/* ── Services section ──────────────────────────────────── */}
      <div id="nelsy-services" style={{ padding: '0 16px' }}>
        {/* Featured service — first in list */}
        {featuredService && (
          <FeaturedService
            service={featuredService}
            theme={theme}
            isPreview={isPreview}
          />
        )}

        {/* Remaining services */}
        {restServices.length > 0 && (
          <StudioServiceList
            services={restServices}
            theme={theme}
            isPreview={isPreview}
          />
        )}

        {/* Empty state */}
        {merchant.services.length === 0 && (
          <div
            style={{
              textAlign: 'center', padding: '40px 0',
              color: theme.textSecondary, fontSize: 14,
            }}
          >
            Aucun service disponible pour le moment.
          </div>
        )}
      </div>

      {/* ── Testimonials (shows only when data available) ────── */}
      {testimonials.length > 0 && (
        <div style={{ padding: '0 0 0 16px' }}>
          <StudioTestimonials testimonials={testimonials} accentColor={accent} />
        </div>
      )}

      {/* ── Business hours (shows only when data available) ──── */}
      {hours.length > 0 && (
        <div style={{ padding: '0 16px' }}>
          <StudioHours hours={hours} accentColor={accent} />
        </div>
      )}

      {/* ── Footer ───────────────────────────────────────────── */}
      {isPreview ? (
        <div style={{ textAlign: 'center', padding: '16px 0 28px' }}>
          <Link
            to="/"
            style={{ fontSize: 11, color: theme.textSecondary, textDecoration: 'none' }}
          >
            Powered by <strong style={{ color: accent }}>Nelsy</strong>
          </Link>
        </div>
      ) : (
        <PlgCTA profileId={merchant.id} theme={theme} />
      )}

      {/* Safe area spacer (accounts for sticky CTA height) */}
      <div style={{ height: isPreview ? 0 : 80, flexShrink: 0 }} />

      {/* ── Sticky Book CTA (live only) ───────────────────────── */}
      {!isPreview && (
        <StickyBookCTA merchant={merchant} show={!heroCTAVisible} />
      )}
    </div>
  );
}

// Re-export skeleton for Studio.tsx usage
export { PreviewSkeleton };
