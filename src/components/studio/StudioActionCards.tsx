import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Calendar, Instagram, MapPin, Share2 } from 'lucide-react';
import type { Merchant } from '@/types';

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: 'easeOut' } },
};

interface Props {
  merchant: Merchant;
  onBook: () => void;
}

export function StudioActionCards({ merchant, onBook }: Props) {
  const accent = merchant.color_accent ?? '#F52B8C';

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({ title: merchant.salon_name, url: window.location.href })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
  };

  return (
    <motion.div
      className="grid grid-cols-3 grid-rows-[96px_96px_auto] gap-2 mb-5"
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
      initial="hidden"
      animate="visible"
    >
      {/* Book Now — 2 cols × 2 rows */}
      <motion.button
        variants={itemVariants}
        onClick={onBook}
        className="col-span-2 row-span-2 relative overflow-hidden rounded-2xl p-5 flex flex-col justify-between text-white shadow-lg active:scale-[0.98] transition-transform"
        style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accent}bb 100%)` }}
        aria-label="Réserver maintenant"
      >
        {/* Shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl pointer-events-none" />
        <Calendar className="w-6 h-6 opacity-90 relative z-10" />
        <div className="relative z-10">
          <p className="text-xs font-semibold opacity-80 mb-0.5">Disponible maintenant</p>
          <p className="text-xl font-extrabold leading-tight tracking-tight">Réserver →</p>
        </div>
      </motion.button>

      {/* Instagram */}
      {merchant.instagram ? (
        <motion.a
          variants={itemVariants}
          href={`https://instagram.com/${merchant.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-1 row-span-1 rounded-2xl bg-white border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-1.5 hover:bg-gray-50 active:scale-95 transition-all"
          aria-label="Instagram"
        >
          <Instagram className="w-5 h-5 text-pink-500" />
          <span className="text-[10px] font-semibold text-gray-500">Instagram</span>
        </motion.a>
      ) : (
        <motion.div
          variants={itemVariants}
          className="col-span-1 row-span-1 rounded-2xl bg-gray-50 border border-gray-100"
        />
      )}

      {/* Share */}
      <motion.button
        variants={itemVariants}
        onClick={handleShare}
        className="col-span-1 row-span-1 rounded-2xl bg-white border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-1.5 hover:bg-gray-50 active:scale-95 transition-all"
        aria-label="Partager"
      >
        <Share2 className="w-5 h-5 text-gray-500" />
        <span className="text-[10px] font-semibold text-gray-500">Partager</span>
      </motion.button>

      {/* Location — full width */}
      <motion.div
        variants={itemVariants}
        className="col-span-3 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center gap-3 px-4 py-3"
      >
        <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
          <MapPin className="w-4 h-4 text-gray-500" />
        </div>
        <div>
          <p className="text-xs font-bold text-gray-900">Paris, France</p>
          <p className="text-[10px] text-gray-400 mt-0.5">Sur rendez-vous uniquement</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
