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
      className="w-20 h-20 rounded-full flex-shrink-0 overflow-hidden"
      style={{
        boxShadow: `0 0 0 3px ${accent}30, 0 0 0 1.5px ${accent}60, 0 8px 24px rgba(0,0,0,0.10)`,
      }}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          loading="eager"
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center font-bold text-xl text-white"
          style={{ background: `linear-gradient(135deg, ${accent}CC, ${accent})` }}
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
}

export function StudioHero({ merchant, theme }: Props) {
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
      transition={{ duration: 0.38, ease: 'easeOut' }}
      className="flex flex-col items-center text-center px-6 pt-10 pb-8 relative"
    >
      {/* Share button — floating top-right */}
      <button
        onClick={handleShare}
        aria-label="Share"
        className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
        style={{ backgroundColor: theme.cardBorder, color: theme.textSecondary }}
      >
        <Share2 className="w-4 h-4" />
      </button>

      {/* Avatar */}
      <AvatarFrame src={merchant.logo_url} name={merchant.salon_name} accent={accent} />

      {/* Verified badge */}
      <div
        className="inline-flex items-center gap-1.5 mt-4 mb-2 px-3 py-1 rounded-full text-[11px] font-semibold"
        style={{
          backgroundColor: theme.cardBg,
          border: `1px solid ${theme.cardBorder}`,
          color: theme.textSecondary,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}
      >
        <span>✨</span>
        <span>Verified Nail Artist</span>
      </div>

      {/* Name */}
      <h1
        className="text-xl font-bold leading-tight"
        style={{ color: theme.textPrimary, letterSpacing: '-0.02em' }}
      >
        {merchant.salon_name}
      </h1>

      {/* Bio */}
      {merchant.bio && (
        <p
          className="text-[14px] leading-relaxed mt-2 max-w-[280px] line-clamp-2"
          style={{ color: theme.textSecondary }}
        >
          {merchant.bio}
        </p>
      )}

      {/* Social links */}
      {(merchant.instagram || tiktokHandle) && (
        <div className="flex items-center gap-2.5 mt-4">
          {merchant.instagram && (
            <a
              href={`https://instagram.com/${merchant.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
              style={{ backgroundColor: theme.cardBg, color: theme.textPrimary, border: `1px solid ${theme.cardBorder}` }}
            >
              <InstagramIcon />
            </a>
          )}
          {tiktokHandle && (
            <a
              href={`https://tiktok.com/@${tiktokHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
              style={{ backgroundColor: theme.cardBg, color: theme.textPrimary, border: `1px solid ${theme.cardBorder}` }}
            >
              <TikTokIcon />
            </a>
          )}
        </div>
      )}
    </motion.header>
  );
}
