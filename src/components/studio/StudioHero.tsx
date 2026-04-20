import { Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Merchant } from '@/types';
import { Avatar } from '@/components/shared/Avatar';

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
}

export function StudioHero({ merchant }: Props) {
  const tiktokHandle = merchant.tiktok ? parseTikTok(merchant.tiktok) : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center text-center pt-8 pb-6 px-4"
    >
      <Avatar
        src={merchant.logo_url}
        name={merchant.name}
        size="xl"
        className="mb-4 shadow-lg"
      />

      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
        {merchant.salon_name}
      </h1>

      {merchant.bio && (
        <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-4">
          {merchant.bio}
        </p>
      )}

      {/* Social icons — only if social links exist */}
      {(merchant.instagram || tiktokHandle) && (
        <div className="flex items-center gap-2">
          {merchant.instagram && (
            <a
              href={`https://instagram.com/${merchant.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4 text-gray-600" />
            </a>
          )}
          {tiktokHandle && (
            <a
              href={`https://tiktok.com/@${tiktokHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
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
