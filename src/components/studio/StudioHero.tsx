import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import type { Merchant } from '@/types';
import type { NelsyTheme } from '@/lib/themes';

// ── Social icons ──────────────────────────────────────────────────────────────

function InstagramIcon() {
  return (
    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.13 8.13 0 004.78 1.52V6.82a4.85 4.85 0 01-1-.13z" />
    </svg>
  );
}

function parseTikTok(raw: string): string {
  return raw.replace(/^https?:\/\/(www\.)?tiktok\.com\/@?/, '').replace(/^@/, '').split('?')[0];
}

// ── Avatar ────────────────────────────────────────────────────────────────────

function AvatarFrame({ src, name, accent }: { src?: string; name: string; accent: string }) {
  const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  return (
    <div
      style={{
        width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
        boxShadow: `0 0 0 3px ${accent}30, 0 0 0 1.5px ${accent}60, 0 8px 24px rgba(0,0,0,0.12)`,
      }}
    >
      {src ? (
        <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="eager" />
      ) : (
        <div
          style={{
            width: '100%', height: '100%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontWeight: 700, fontSize: 24, color: '#FFFFFF',
            background: `linear-gradient(135deg, ${accent}CC, ${accent})`,
          }}
        >
          {initials}
        </div>
      )}
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  merchant: Merchant;
  theme: NelsyTheme;
  isPreview?: boolean;
}

export function StudioHero({ merchant, theme, isPreview = false }: Props) {
  const accent = theme.defaultAccent;
  const tiktokHandle = merchant.tiktok ? parseTikTok(merchant.tiktok) : undefined;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: merchant.salon_name, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '40px 24px 28px', position: 'relative' }}
    >
      {/* Share — hidden in preview */}
      {!isPreview && (
        <button
          onClick={handleShare}
          aria-label="Share"
          style={{
            position: 'absolute', top: 16, right: 16,
            width: 36, height: 36, borderRadius: '50%', border: 'none',
            backgroundColor: theme.cardBorder, color: theme.textSecondary,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'opacity 0.2s',
          }}
        >
          <Share2 size={15} />
        </button>
      )}

      <AvatarFrame src={merchant.logo_url} name={merchant.salon_name} accent={accent} />

      {/* Name */}
      <h1 style={{ color: theme.textPrimary, fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.25, margin: 0, marginTop: 16 }}>
        {merchant.salon_name}
      </h1>

      {/* Bio */}
      {merchant.bio && (
        <p
          style={{
            color: theme.textSecondary, fontSize: 14, lineHeight: 1.6,
            marginTop: 8, maxWidth: 280,
            overflow: 'hidden', display: '-webkit-box',
            WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          }}
        >
          {merchant.bio}
        </p>
      )}

      {/* Social links */}
      {(merchant.instagram || tiktokHandle) && (
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          {merchant.instagram && (
            <a
              href={isPreview ? '#' : `https://instagram.com/${merchant.instagram}`}
              target={isPreview ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{
                width: 36, height: 36, borderRadius: '50%', border: `1px solid ${theme.cardBorder}`,
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
                width: 36, height: 36, borderRadius: '50%', border: `1px solid ${theme.cardBorder}`,
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
    </motion.header>
  );
}
