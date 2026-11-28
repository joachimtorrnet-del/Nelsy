import { AnimatePresence, motion } from 'framer-motion';
import { useBookingStore } from '@/store/bookingStore';
import type { Merchant } from '@/types';
import { getTheme } from '@/lib/themes';
import { bookingAccent } from './booking/accent';

interface Props {
  merchant: Merchant;
  show: boolean;
}

export function StickyBookCTA({ merchant, show }: Props) {
  const { isOpen, openModal } = useBookingStore();
  // Same accent as the page and the booking dialog (the template's own when the pro picked none)
  // The bar is white, so the accent goes through the same legibility rule as the dialog.
  const { fill: accent, onFill } = bookingAccent(getTheme(merchant.theme_preset, merchant.color_accent, { background: merchant.color_background }));
  const visible = show && !isOpen;

  const scrollToServices = () => {
    const list = document.getElementById('nelsy-services');
    if (list) list.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else if (merchant.services[0]) openModal(merchant.services[0]);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
          style={{
            position: 'fixed',
            bottom: 0, left: 0, right: 0,
            zIndex: 35,
            padding: '10px 16px',
            paddingBottom: 'calc(10px + env(safe-area-inset-bottom, 0px))',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            backgroundColor: 'rgba(255,255,255,0.88)',
            borderTop: '1px solid rgba(0,0,0,0.06)',
          }}
          role="banner"
          aria-label="Book"
        >
          <button
            onClick={scrollToServices}
            style={{
              display: 'block', width: '100%',
              height: 52, borderRadius: 16,
              backgroundColor: accent, color: onFill,
              fontSize: 16, fontWeight: 700,
              border: 'none', cursor: 'pointer',
              boxShadow: /^#[0-9a-f]{6}$/i.test(accent) ? `0 4px 20px ${accent}40` : undefined,
              letterSpacing: '-0.01em',
            }}
          >
            Book now →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
