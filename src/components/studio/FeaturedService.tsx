import { motion } from 'framer-motion';
import type { Service } from '@/types';
import type { NelsyTheme } from '@/lib/themes';
import { formatCurrency } from '@/lib/utils';
import { useBookingStore } from '@/store/bookingStore';

interface Props {
  service: Service;
  theme: NelsyTheme;
  isPreview?: boolean;
}

export function FeaturedService({ service, theme, isPreview = false }: Props) {
  const { openModal } = useBookingStore();
  const accent = theme.defaultAccent;
  const accentText = theme.accentText;
  const hasDeposit = service.deposit > 0;
  const chargeNow = hasDeposit ? service.deposit : service.price;

  const handleBook = () => {
    if (isPreview) return;
    openModal(service);
  };

  return (
    <section style={{ marginBottom: 24 }}>
      <p style={{
        fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '1px', color: theme.textSecondary, marginBottom: 12,
      }}>
        Service phare
      </p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          borderRadius: 20,
          overflow: 'hidden',
          backgroundColor: theme.cardBg,
          border: `1px solid ${theme.cardBorder}`,
          boxShadow: '0 6px 32px rgba(0,0,0,0.07)',
        }}
      >
        {/* Image / gradient header */}
        <div
          style={{
            height: 140,
            background: service.image_url
              ? `url(${service.image_url}) center/cover no-repeat`
              : `linear-gradient(135deg, ${accent}22 0%, ${accent}40 100%)`,
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '14px 16px',
          }}
        >
          {hasDeposit && (
            <span
              style={{
                backgroundColor: accent, color: accentText,
                borderRadius: 8, padding: '4px 10px',
                fontSize: 11, fontWeight: 700,
              }}
            >
              Acompte {formatCurrency(service.deposit)}
            </span>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '18px 20px 20px' }}>
          <h3
            style={{
              fontSize: 18, fontWeight: 800, color: theme.textPrimary,
              margin: 0, letterSpacing: '-0.01em',
            }}
          >
            {service.name}
          </h3>

          {service.description && (
            <p
              style={{
                fontSize: 13, color: theme.textSecondary,
                lineHeight: 1.5, marginTop: 6,
                overflow: 'hidden', display: '-webkit-box',
                WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
              }}
            >
              {service.description}
            </p>
          )}

          {/* Price row */}
          <div
            style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', marginTop: 18,
            }}
          >
            <div>
              <span
                style={{ fontSize: 26, fontWeight: 900, color: theme.textPrimary, lineHeight: 1 }}
              >
                {formatCurrency(service.price)}
              </span>
              <p style={{ fontSize: 12, color: theme.textSecondary, marginTop: 2 }}>
                {service.duration} min
              </p>
            </div>

            <motion.button
              whileTap={isPreview ? {} : { scale: 0.96 }}
              onClick={handleBook}
              disabled={isPreview}
              style={{
                backgroundColor: accent, color: accentText,
                borderRadius: 14, border: 'none',
                padding: '12px 20px',
                fontSize: 14, fontWeight: 700,
                cursor: isPreview ? 'default' : 'pointer',
                opacity: isPreview ? 0.5 : 1,
                boxShadow: `0 4px 16px ${accent}40`,
                whiteSpace: 'nowrap',
              }}
            >
              {hasDeposit
                ? `Réserver · ${formatCurrency(chargeNow)}`
                : 'Réserver →'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
