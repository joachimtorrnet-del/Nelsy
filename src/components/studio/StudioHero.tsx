import { Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Merchant } from '@/types';
import { Avatar } from '@/components/shared/Avatar';
import type { NelsyTheme } from '@/lib/themes';

function TikTokIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.13 8.13 0 004.78 1.52V6.82a4.85 4.85 0 01-1-.13z" />
    </svg>
  );
}

function parseTikTok(raw: string): string {
  return raw.replace(/^https?:\/\/(www\.)?tiktok\.com\/@?/, '').replace(/^@/, '').split('?')[0];
}

interface Props {
  merchant: Merchant;
  theme: NelsyTheme;
}

export function StudioHero({ merchant, theme }: Props) {
  const tiktokHandle = merchant.tiktok ? parseTikTok(merchant.tiktok) : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center text-center pt-10 pb-8 px-4"
      style={{ background: theme.headerGradient }}
    >
      <Avatar
        src={merchant.logo_url}
        name={merchant.name}
        size="xl"
        className="mb-4 shadow-lg ring-4 ring-white/30"
      />

      <h1
        className="text-3xl font-extrabold tracking-tight mb-2"
        style={{ color: theme.headerTextPrimary }}
      >
        {merchant.salon_name}
      </h1>

      {merchant.bio && (
        <p
          className="text-sm leading-relaxed max-w-xs mb-4"
          style={{ color: theme.headerTextSecondary }}
        >
          {merchant.bio}
        </p>
      )}

      {(merchant.instagram || tiktokHandle) && (
        <div className="flex items-center gap-2">
          {merchant.instagram && (
            <a
              href={`https://instagram.com/${merchant.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" style={{ color: theme.headerTextPrimary }} />
            </a>
          )}
          {tiktokHandle && (
            <a
              href={`https://tiktok.com/@${tiktokHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              aria-label="TikTok"
            >
              <TikTokIcon />
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}
