import type { RefObject } from 'react';
import { motion } from 'framer-motion';
import { Share2, Star, Globe } from 'lucide-react';
import type { Merchant } from '@/types';
import type { NelsyTheme } from '@/lib/themes';

// ── Social icons ──────────────────────────────────────────────────────────────

function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.13 8.13 0 004.78 1.52V6.82a4.85 4.85 0 01-1-.13z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
    </svg>
  );
}

function parseTikTok(raw: string): string {
  return raw.replace(/^https?:\/\/(www\.)?tiktok\.com\/@?/, '').replace(/^@/, '').split('?')[0];
}

// ── Rating row ────────────────────────────────────────────────────────────────

function RatingRow({ rating, reviewCount, textPrimary }: { rating: number; reviewCount: number; textPrimary: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 6 }}>
      <Star size={14} style={{ color: '#FBBF24', fill: '#FBBF24' }} />
      <span style={{ fontSize: 14, fontWeight: 700, color: textPrimary, lineHeight: 1 }}>
        {rating.toFixed(1)}
      </span>
      <span style={{ fontSize: 13, color: '#9CA3AF' }}>
        ({reviewCount.toLocaleString('en')} reviews)
      </span>
    </div>
  );
}

// ── Social button ─────────────────────────────────────────────────────────────

function SocialBtn({
  href, label, isPreview, theme, children,
}: {
  href: string; label: string; isPreview: boolean; theme: NelsyTheme; children: React.ReactNode;
}) {
  return (
    <a
      href={isPreview ? '#' : href}
      target={isPreview ? undefined : '_blank'}
      rel="noopener noreferrer"
      aria-label={label}
      onClick={isPreview ? (e) => e.preventDefault() : undefined}
      style={{
        width: 38, height: 38, borderRadius: '50%',
        border: `1px solid ${theme.cardBorder}`,
        backgroundColor: theme.cardBg,
        color: theme.textPrimary,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        textDecoration: 'none',
        flexShrink: 0,
      }}
    >
      {children}
    </a>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  merchant: Merchant;
  theme: NelsyTheme;
  isPreview?: boolean;
  ctaRef?: RefObject<HTMLDivElement | null>;
  heroPhotoUrl?: string;
}

export function StudioHeroV2({ merchant, theme, isPreview = false, ctaRef, heroPhotoUrl }: Props) {
  const accent = theme.defaultAccent;
  const accentText = theme.accentText;
  const tiktokHandle = merchant.tiktok ? parseTikTok(merchant.tiktok) : undefined;

  const hasPhoto = !!heroPhotoUrl;
  const COVER_H = hasPhoto ? 260 : 140;
  const AVATAR_SIZE = 96;
  const OVERLAP = AVATAR_SIZE / 2;

  const hasSocials = !!(merchant.instagram || tiktokHandle || merchant.pinterest_url || merchant.website_url);

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
      transition={{ duration: 0.25 }}
    >
      {/* ── Cover band ─────────────────────────────────────────── */}
      <div
        style={{
          height: COVER_H,
          background: hasPhoto
            ? `url(${heroPhotoUrl}) center/cover no-repeat`
            : theme.headerGradient,
          position: 'relative',
          flexShrink: 0,
        }}
      >
        {hasPhoto && (
          <div
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.22) 0%, transparent 50%)',
            }}
          />
        )}

        {/* Share button */}
        {!isPreview && (
          <button
            onClick={handleShare}
            aria-label="Share"
            style={{
              position: 'absolute', top: 14, right: 14,
              width: 36, height: 36, borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.22)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.30)',
              color: hasPhoto ? '#FFFFFF' : theme.headerTextPrimary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Share2 size={14} />
          </button>
        )}
      </div>

      {/* ── Identity section ──────────────────────────────────────
          position + zIndex: cover paints after static elements;
          this div paints on top so the avatar stays fully visible. */}
      <div
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center',
          marginTop: -OVERLAP,
          padding: '0 24px 24px',
          backgroundColor: theme.pageBg,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: '50%',
            border: `4px solid ${theme.pageBg}`,
            boxShadow: `0 2px 16px rgba(0,0,0,0.12), 0 0 0 1px ${accent}20`,
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
        <h1 style={{
          fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em',
          lineHeight: 1.1, color: theme.textPrimary, margin: 0,
        }}>
          {merchant.salon_name}
        </h1>

        {/* Specialty · Location */}
        {(merchant.specialty || merchant.location) && (
          <p style={{ fontSize: 13, color: theme.textSecondary, marginTop: 5, lineHeight: 1.4 }}>
            {[merchant.specialty, merchant.location].filter(Boolean).join(' · ')}
          </p>
        )}

        {/* Rating */}
        {merchant.rating && merchant.review_count && merchant.review_count > 0 && (
          <RatingRow rating={merchant.rating} reviewCount={merchant.review_count} textPrimary={theme.textPrimary} />
        )}

        {/* Bio */}
        {merchant.bio && (
          <p style={{
            fontSize: 13, color: theme.textSecondary,
            lineHeight: 1.55, marginTop: 8, maxWidth: 280,
            overflow: 'hidden', display: '-webkit-box',
            WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          }}>
            {merchant.bio}
          </p>
        )}

        {/* Social links */}
        {hasSocials && (
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            {merchant.instagram && (
              <SocialBtn href={`https://instagram.com/${merchant.instagram}`} label="Instagram" isPreview={isPreview} theme={theme}>
                <InstagramIcon />
              </SocialBtn>
            )}
            {tiktokHandle && (
              <SocialBtn href={`https://tiktok.com/@${tiktokHandle}`} label="TikTok" isPreview={isPreview} theme={theme}>
                <TikTokIcon />
              </SocialBtn>
            )}
            {merchant.pinterest_url && (
              <SocialBtn href={merchant.pinterest_url} label="Pinterest" isPreview={isPreview} theme={theme}>
                <PinterestIcon />
              </SocialBtn>
            )}
            {merchant.website_url && (
              <SocialBtn href={merchant.website_url} label="Website" isPreview={isPreview} theme={theme}>
                <Globe size={16} />
              </SocialBtn>
            )}
          </div>
        )}

        {/* Primary Book CTA */}
        <div ref={ctaRef} style={{ width: '100%', marginTop: 20 }}>
          <motion.button
            whileTap={isPreview ? {} : { scale: 0.97 }}
            onClick={scrollToServices}
            disabled={isPreview}
            style={{
              width: '100%', height: 52,
              backgroundColor: accent, color: accentText,
              borderRadius: 16, border: 'none',
              fontSize: 16, fontWeight: 700,
              cursor: isPreview ? 'default' : 'pointer',
              opacity: isPreview ? 0.6 : 1,
              boxShadow: `0 4px 20px ${accent}40`,
              letterSpacing: '-0.01em',
            }}
          >
            Book now →
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
