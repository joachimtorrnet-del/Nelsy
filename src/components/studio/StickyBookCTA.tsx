import { AnimatePresence, motion } from 'framer-motion';
import { useBookingStore } from '@/store/bookingStore';
import type { Merchant } from '@/types';

interface Props {
  merchant: Merchant;
  show: boolean;
}

export function StickyBookCTA({ merchant, show }: Props) {
  const { isOpen } = useBookingStore();
  const accent = merchant.color_accent ?? '#F52B8C';
  const visible = show && !isOpen;

  const scrollToServices = () => {
    document.getElementById('nelsy-services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            backgroundColor: 'rgba(255,255,255,0.85)',
            borderTop: '1px solid rgba(0,0,0,0.06)',
          }}
          role="banner"
          aria-label="Réserver"
        >
          <button
            onClick={scrollToServices}
            style={{
              display: 'block', width: '100%',
              height: 52, borderRadius: 16,
              backgroundColor: accent, color: '#FFFFFF',
              fontSize: 16, fontWeight: 700,
              border: 'none', cursor: 'pointer',
              boxShadow: `0 4px 20px ${accent}40`,
              letterSpacing: '-0.01em',
            }}
          >
            Réserver un créneau →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
