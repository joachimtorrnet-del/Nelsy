import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Merchant } from '@/types';
import { getTheme } from '@/lib/themes';
import { getStudioFont, ensureStudioFontLoaded } from '@/lib/studioFonts';
import { useStudioPublic } from '@/hooks/useStudioPublic';
import { StudioHeroV2 } from './StudioHeroV2';
import { FeaturedService } from './FeaturedService';
import { StudioServiceList } from './StudioServiceList';
import { StudioGallery } from './StudioGallery';
import { StudioTestimonials } from './StudioTestimonials';
import { StudioHours } from './StudioHours';
import { StickyBookCTA } from './StickyBookCTA';
import { PlgCTA } from './PlgCTA';
import { LayoutSplit } from './layouts/LayoutSplit';
import { LayoutEditorial } from './layouts/LayoutEditorial';
import { LayoutSpotlight } from './layouts/LayoutSpotlight';
import { LayoutCreator, CREATOR_VARIANTS } from './layouts/LayoutCreator';
import { useBookingStore } from '@/store/bookingStore';
import { CurrencyProvider } from '@/lib/currency';

// Theme presets that use a standalone layout component (no StudioHeroV2 sections)
const LAYOUT_PRESETS: Record<string, 'split' | 'editorial' | 'spotlight'> = {
  minimal_nude: 'split',
  editorial: 'editorial',
  blush: 'spotlight',
};

// ── Types ─────────────────────────────────────────────────────────────────────

export type StudioMode = 'live' | 'preview';

// ── Skeleton (preview loading state) ─────────────────────────────────────────

function PreviewSkeleton({ bgColor }: { bgColor: string }) {
  return (
    <div style={{ backgroundColor: bgColor, minHeight: '100%' }}>
      {/* Cover skeleton */}
      <div style={{ height: 140, backgroundColor: 'rgba(128,128,128,0.12)' }} />
      {/* Identity — same zIndex fix as real hero */}
      <div
        style={{
          padding: '0 20px 20px',
          marginTop: -48,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          position: 'relative', zIndex: 1,
        }}
      >
        <div style={{ width: 96, height: 96, borderRadius: '50%', backgroundColor: 'rgba(128,128,128,0.15)', marginBottom: 12 }} />
        <div style={{ width: 140, height: 18, borderRadius: 8, backgroundColor: 'rgba(128,128,128,0.12)', marginBottom: 7 }} />
        <div style={{ width: 200, height: 13, borderRadius: 8, backgroundColor: 'rgba(128,128,128,0.10)', marginBottom: 18 }} />
        <div style={{ width: '100%', height: 52, borderRadius: 16, backgroundColor: 'rgba(128,128,128,0.15)', marginBottom: 24 }} />
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ width: '100%', height: 68, borderRadius: 16, backgroundColor: 'rgba(128,128,128,0.10)', marginBottom: 8 }} />
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

export function PublicStudioView(props: Props) {
  return (
    <CurrencyProvider currency={props.merchant.currency}>
      <PublicStudioViewInner {...props} />
    </CurrencyProvider>
  );
}

function PublicStudioViewInner({ merchant, mode = 'live' }: Props) {
  const studioFont = getStudioFont(merchant.font_family);
  const theme = getTheme(merchant.theme_preset, merchant.color_accent, {
    background: merchant.color_background,
    fontFamily: studioFont?.stack,
  });
  useEffect(() => { ensureStudioFontLoaded(studioFont); }, [studioFont]);
  const { openModal } = useBookingStore();
  const onBook = (serviceId: string) => {
    const service = merchant.services.find((s) => s.id === serviceId)
      ?? merchantWithCollections.collections?.flatMap((c) => c.members.map((m) => m.service)).find((s) => s.id === serviceId);
    if (service) openModal(service);
  };
  const accent = theme.defaultAccent;
  const isPreview = mode === 'preview';

  const { photos, testimonials, hours, collections } = useStudioPublic(merchant.id);
  // Merge live collections into the merchant object for layout components
  const merchantWithCollections = { ...merchant, collections: merchant.collections ?? collections };

  // Hero photo: explicit cover takes priority, then first gallery photo
  const heroPhotoUrl = merchant.cover_url ?? photos[0]?.image_url;

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

  // Route to standalone layout components for new-generation templates
  const layoutVariant = LAYOUT_PRESETS[merchant.theme_preset ?? ''];

  const creatorVariant = CREATOR_VARIANTS[merchant.theme_preset ?? ''];
  if (creatorVariant) {
    return (
      <>
        <LayoutCreator merchant={merchantWithCollections} theme={theme} variant={creatorVariant} isPreview={isPreview} photos={photos} onBook={onBook} />
        {!isPreview && <StickyBookCTA merchant={merchant} show={true} />}
      </>
    );
  }
  if (layoutVariant === 'split') {
    return (
      <>
        <LayoutSplit merchant={merchantWithCollections} theme={theme} isPreview={isPreview} photos={photos} onBook={onBook} />
        {!isPreview && <StickyBookCTA merchant={merchant} show={true} />}
      </>
    );
  }
  if (layoutVariant === 'editorial') {
    return (
      <>
        <LayoutEditorial merchant={merchantWithCollections} theme={theme} isPreview={isPreview} photos={photos} onBook={onBook} />
        {!isPreview && <StickyBookCTA merchant={merchant} show={true} />}
      </>
    );
  }
  if (layoutVariant === 'spotlight') {
    return (
      <>
        <LayoutSpotlight merchant={merchantWithCollections} theme={theme} isPreview={isPreview} photos={photos} onBook={onBook} />
        {!isPreview && <StickyBookCTA merchant={merchant} show={true} />}
      </>
    );
  }

  const featuredService = merchant.services.find((s) => s.is_featured) ?? null;
  const restServices = featuredService
    ? merchant.services.filter((s) => s.id !== featuredService.id)
    : merchant.services;

  return (
    <div
      className={theme.fontFamily ? undefined : theme.fontClass}
      style={{
        fontFamily: theme.fontFamily,
        backgroundColor: theme.pageBg,
        minHeight: isPreview ? '100%' : '100dvh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Hero ─────────────────────────────────────────────── */}
      <StudioHeroV2
        merchant={merchant}
        theme={theme}
        isPreview={isPreview}
        ctaRef={heroCTARef}
        heroPhotoUrl={heroPhotoUrl}
      />

      {/* ── Gallery — StudioGallery manages its own insets ─────────── */}
      {photos.length > 0 && (
        <StudioGallery photos={photos} textPrimary={theme.textPrimary} textSecondary={theme.textSecondary} accent={accent} />
      )}

      {/* ── Services ─────────────────────────────────────────── */}
      {merchant.services.length > 0 && (
        <div id="nelsy-services" style={{ padding: '0 16px' }}>
          {featuredService && (
            <FeaturedService
              service={featuredService}
              theme={theme}
              isPreview={isPreview}
            />
          )}
          {restServices.length > 0 && (
            <StudioServiceList
              services={restServices}
              theme={theme}
              isPreview={isPreview}
            />
          )}
        </div>
      )}

      {/* Empty state — only when no services at all */}
      {merchant.services.length === 0 && (
        <div
          style={{
            textAlign: 'center', padding: '40px 24px',
            color: theme.textSecondary, fontSize: 14,
          }}
        >
          No services available yet.
        </div>
      )}

      {/* ── Reviews — real data only ──────────────────────────── */}
      {testimonials.length > 0 && (
        <StudioTestimonials testimonials={testimonials} accentColor={accent} />
      )}

      {/* ── Hours — real data only ────────────────────────────── */}
      {hours.length > 0 && (
        <div style={{ padding: '0 16px' }}>
          <StudioHours hours={hours} accentColor={accent} />
        </div>
      )}

      {/* ── Footer ───────────────────────────────────────────── */}
      {isPreview ? (
        <div style={{ textAlign: 'center', padding: '16px 0 24px' }}>
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

      {/* Safe area spacer for sticky CTA */}
      <div style={{ height: isPreview ? 0 : 80, flexShrink: 0 }} />

      {/* ── Sticky Book CTA (live only) ───────────────────────── */}
      {!isPreview && (
        <StickyBookCTA merchant={merchant} show={!heroCTAVisible} />
      )}
    </div>
  );
}

export { PreviewSkeleton };
