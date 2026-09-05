import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
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
  const hasImage = !!service.image_url;

  const handleBook = () => {
    if (isPreview) return;
    openModal(service);
  };

  if (hasImage) {
    return (
      <section style={{ marginBottom: 20 }}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{
            borderRadius: 20,
            border: `1px solid ${theme.cardBorder}`,
            boxShadow: '0 1px 12px rgba(0,0,0,0.06)',
            backgroundColor: theme.cardBg,
            padding: 14,
            display: 'flex',
            flexDirection: 'row',
            gap: 14,
            backdropFilter: theme.cardBlur,
            WebkitBackdropFilter: theme.cardBlur,
          }}
        >
          {/* ── Image (inset, own border-radius) ─────────────── */}
          <div style={{ position: 'relative', width: 130, flexShrink: 0 }}>
            <img
              src={service.image_url}
              alt={service.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                borderRadius: 12,
              }}
            />
            {/* Most booked — bottom-left overlay */}
            <div style={{ position: 'absolute', bottom: 8, left: 8 }}>
              <span style={{
                display: 'inline-block',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.02em',
                color: accent,
                backgroundColor: 'rgba(255,255,255,0.88)',
                borderRadius: 99,
                padding: '3px 9px',
                lineHeight: 1.5,
              }}>
                Most booked
              </span>
            </div>
          </div>

          {/* ── Content ───────────────────────────────────────── */}
          <div style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Name */}
            <p style={{
              fontSize: 18, fontWeight: 800, color: theme.textPrimary,
              margin: '0 0 5px', letterSpacing: '-0.02em', lineHeight: 1.2,
              overflow: 'hidden', display: '-webkit-box',
              WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
            }}>
              {service.name}
            </p>

            {/* Description */}
            {service.description && (
              <p style={{
                fontSize: 13, color: theme.textSecondary, lineHeight: 1.45,
                margin: '0 0 10px', flex: 1,
                overflow: 'hidden', display: '-webkit-box',
                WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
              }}>
                {service.description}
              </p>
            )}

            {/* Bottom row: metadata left, Book right */}
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 'auto',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <Clock size={13} style={{ color: theme.textSecondary, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: theme.textSecondary }}>
                  {service.duration} min
                </span>
                <span style={{ fontSize: 13, color: theme.textSecondary, opacity: 0.4 }}>|</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: theme.textPrimary }}>
                  {formatCurrency(service.price)}
                </span>
              </div>

              <motion.button
                whileTap={isPreview ? {} : { scale: 0.95 }}
                onClick={handleBook}
                disabled={isPreview}
                style={{
                  backgroundColor: accent, color: accentText,
                  borderRadius: 99, border: 'none',
                  height: 44, padding: '0 20px',
                  fontSize: 14, fontWeight: 700,
                  cursor: isPreview ? 'default' : 'pointer',
                  opacity: isPreview ? 0.5 : 1,
                  boxShadow: `0 3px 10px ${accent}40`,
                  letterSpacing: '-0.01em',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                {hasDeposit ? `Book · ${formatCurrency(chargeNow)}` : 'Book →'}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  // State B: no image
  return (
    <section style={{ marginBottom: 20 }}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          borderRadius: 20,
          border: `1px solid ${theme.cardBorder}`,
          boxShadow: '0 1px 12px rgba(0,0,0,0.06)',
          backgroundColor: theme.cardBg,
          padding: 16,
          backdropFilter: theme.cardBlur,
          WebkitBackdropFilter: theme.cardBlur,
        }}
      >
        <span style={{
          display: 'inline-block',
          fontSize: 10, fontWeight: 700, letterSpacing: '0.04em',
          color: accent, backgroundColor: `${accent}15`,
          border: `1px solid ${accent}25`,
          borderRadius: 99, padding: '3px 10px', marginBottom: 10,
        }}>
          Most booked
        </span>

        <p style={{
          fontSize: 20, fontWeight: 900, color: theme.textPrimary,
          margin: '0 0 6px', letterSpacing: '-0.02em', lineHeight: 1.1,
        }}>
          {service.name}
        </p>

        {service.description && (
          <p style={{
            fontSize: 13, color: theme.textSecondary, lineHeight: 1.5,
            margin: '0 0 12px',
            overflow: 'hidden', display: '-webkit-box',
            WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          }}>
            {service.description}
          </p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Clock size={13} style={{ color: theme.textSecondary }} />
            <span style={{ fontSize: 13, color: theme.textSecondary }}>{service.duration} min</span>
            <span style={{ fontSize: 13, color: theme.textSecondary, opacity: 0.4 }}>|</span>
            <span style={{ fontSize: 18, fontWeight: 900, color: theme.textPrimary, letterSpacing: '-0.03em' }}>
              {formatCurrency(service.price)}
            </span>
          </div>

          <motion.button
            whileTap={isPreview ? {} : { scale: 0.95 }}
            onClick={handleBook}
            disabled={isPreview}
            style={{
              borderRadius: 99, backgroundColor: accent, color: accentText,
              border: 'none', height: 44, padding: '0 20px',
              fontSize: 14, fontWeight: 700,
              cursor: isPreview ? 'default' : 'pointer',
              opacity: isPreview ? 0.5 : 1,
              boxShadow: `0 3px 10px ${accent}40`,
              letterSpacing: '-0.01em', flexShrink: 0,
            }}
          >
            {hasDeposit ? `Book · ${formatCurrency(chargeNow)}` : 'Book now →'}
          </motion.button>
        </div>

        {hasDeposit && (
          <p style={{ fontSize: 11, color: theme.textSecondary, textAlign: 'right', marginTop: 6 }}>
            {formatCurrency(service.price - service.deposit)} balance due on the day
          </p>
        )}
      </motion.div>
    </section>
  );
}
