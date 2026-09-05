import type { RefObject } from 'react';
import { motion } from 'framer-motion';
import { Share2, Star } from 'lucide-react';
import type { Merchant } from '@/types';
import type { NelsyTheme } from '@/lib/themes';

// ── Social icons ──────────────────────────────────────────────────────────────

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.13 8.13 0 004.78 1.52V6.82a4.85 4.85 0 01-1-.13z" />
    </svg>
  );
}

function parseTikTok(raw: string): string {
  return raw.replace(/^https?:\/\/(www\.)?tiktok\.com\/@?/, '').replace(/^@/, '').split('?')[0];
}

// ── Rating stars ──────────────────────────────────────────────────────────────

function RatingRow({ rating, reviewCount }: { rating: number; reviewCount: number; accent?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
      <div style={{ display: 'flex', gap: 2 }}>
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={13}
            style={{
              color: s <= Math.round(rating) ? '#FBBF24' : '#E5E7EB',
              fill: s <= Math.round(rating) ? '#FBBF24' : '#E5E7EB',
            }}
          />
        ))}
      </div>
      <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>
        {rating.toFixed(1)}
      </span>
      <span style={{ fontSize: 13, color: '#9CA3AF' }}>
        · {reviewCount.toLocaleString('fr-FR')} avis
      </span>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  merchant: Merchant;
  theme: NelsyTheme;
  isPreview?: boolean;
  ctaRef?: RefObject<HTMLDivElement | null>;
}

export function StudioHeroV2({ merchant, theme, isPreview = false, ctaRef }: Props) {
  const accent = theme.defaultAccent;
  const accentText = theme.accentText;
  const tiktokHandle = merchant.tiktok ? parseTikTok(merchant.tiktok) : undefined;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: merchant.salon_name, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
  };

  const scrollToServices = () => {
    if (isPreview) return;
    document.getElementById('nelsy-services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const initials = merchant.salon_name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* ── Cover band ─────────────────────────────────────── */}
      <div
        style={{
          height: 200,
          background: theme.headerGradient,
          position: 'relative',
          flexShrink: 0,
        }}
      >
        {/* Share button */}
        {!isPreview && (
          <button
            onClick={handleShare}
            aria-label="Partager"
            style={{
              position: 'absolute', top: 14, right: 14,
              width: 36, height: 36, borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.25)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.35)',
              color: theme.headerTextPrimary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Share2 size={15} />
          </button>
        )}
      </div>

      {/* ── Identity section — avatar overlaps cover ──────── */}
      {/* position+zIndex required: cover has position:relative so it paints after static
          elements; without this the cover gradient would clip the avatar's upper half */}
      <div
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center',
          marginTop: -48,
          padding: '0 24px 28px',
          backgroundColor: theme.pageBg,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 96, height: 96, borderRadius: '50%',
            border: `4px solid ${theme.pageBg}`,
            boxShadow: `0 4px 24px rgba(0,0,0,0.14), 0 0 0 1px ${accent}28`,
            overflow: 'hidden', flexShrink: 0,
            marginBottom: 14,
          }}
        >
          {merchant.logo_url ? (
            <img
              src={merchant.logo_url}
              alt={merchant.salon_name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              loading="eager"
            />
          ) : (
            <div
              style={{
                width: '100%', height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 28, color: '#FFFFFF',
                background: `linear-gradient(135deg, ${accent}CC, ${accent})`,
                userSelect: 'none',
              }}
            >
              {initials}
            </div>
          )}
        </div>

        {/* Name */}
        <h1
          style={{
            fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em',
            lineHeight: 1.2, color: theme.textPrimary, margin: 0,
          }}
        >
          {merchant.salon_name}
        </h1>

        {/* Bio — max 2 lines */}
        {merchant.bio && (
          <p
            style={{
              fontSize: 14, color: theme.textSecondary,
              lineHeight: 1.55, marginTop: 6, maxWidth: 300,
              overflow: 'hidden', display: '-webkit-box',
              WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
            }}
          >
            {merchant.bio}
          </p>
        )}

        {/* Rating — only if real data */}
        {merchant.rating && merchant.review_count && merchant.review_count > 0 && (
          <RatingRow
            rating={merchant.rating}
            reviewCount={merchant.review_count}
          />
        )}

        {/* Social links */}
        {(merchant.instagram || tiktokHandle) && (
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            {merchant.instagram && (
              <a
                href={isPreview ? '#' : `https://instagram.com/${merchant.instagram}`}
                target={isPreview ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{
                  width: 38, height: 38, borderRadius: '50%',
                  border: `1px solid ${theme.cardBorder}`,
                  backgroundColor: theme.cardBg, color: theme.textPrimary,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  textDecoration: 'none',
                }}
              >
                <InstagramIcon />
              </a>
            )}
            {tiktokHandle && (
              <a
                href={isPreview ? '#' : `https://tiktok.com/@${tiktokHandle}`}
                target={isPreview ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label="TikTok"
                style={{
                  width: 38, height: 38, borderRadius: '50%',
                  border: `1px solid ${theme.cardBorder}`,
                  backgroundColor: theme.cardBg, color: theme.textPrimary,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  textDecoration: 'none',
                }}
              >
                <TikTokIcon />
              </a>
            )}
          </div>
        )}

        {/* Primary Book CTA — observed by StickyBookCTA */}
        <div ref={ctaRef} style={{ width: '100%', marginTop: 20 }}>
          <motion.button
            whileTap={isPreview ? {} : { scale: 0.97 }}
            onClick={scrollToServices}
            disabled={isPreview}
            style={{
              width: '100%', height: 54,
              backgroundColor: accent, color: accentText,
              borderRadius: 16, border: 'none',
              fontSize: 16, fontWeight: 700,
              cursor: isPreview ? 'default' : 'pointer',
              opacity: isPreview ? 0.6 : 1,
              boxShadow: `0 6px 24px ${accent}45`,
              letterSpacing: '-0.01em',
            }}
          >
            Réserver un créneau →
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
