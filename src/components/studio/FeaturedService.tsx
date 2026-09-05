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

// Image dimensions — drives the card height
const IMG_W = 96;
const IMG_H = 118;
const CARD_PAD = 12;

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
            boxShadow: '0 1px 10px rgba(0,0,0,0.055)',
            backgroundColor: theme.cardBg,
            padding: CARD_PAD,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            gap: 12,
            backdropFilter: theme.cardBlur,
            WebkitBackdropFilter: theme.cardBlur,
          }}
        >
          {/* ── Image — fixed dimensions ──────────────────────── */}
          <div style={{
            position: 'relative',
            width: IMG_W,
            height: IMG_H,
            flexShrink: 0,
          }}>
            <img
              src={service.image_url}
              alt={service.name}
              style={{
                width: IMG_W,
                height: IMG_H,
                objectFit: 'cover',
                display: 'block',
                borderRadius: 10,
              }}
            />
            {/* Most booked badge */}
            <div style={{ position: 'absolute', bottom: 7, left: 7 }}>
              <span style={{
                display: 'inline-block',
                fontSize: 10, fontWeight: 600,
                color: accent,
                backgroundColor: 'rgba(255,255,255,0.90)',
                borderRadius: 99,
                padding: '2px 8px',
                lineHeight: 1.6,
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
            justifyContent: 'space-between',
          }}>
            {/* Top: name + description */}
            <div>
              <p style={{
                fontSize: 16, fontWeight: 700, color: theme.textPrimary,
                margin: '0 0 4px', letterSpacing: '-0.015em', lineHeight: 1.25,
                overflow: 'hidden', display: '-webkit-box',
                WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
              }}>
                {service.name}
              </p>
              {service.description && (
                <p style={{
                  fontSize: 12.5, color: theme.textSecondary, lineHeight: 1.45,
                  margin: 0,
                  overflow: 'hidden', display: '-webkit-box',
                  WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                }}>
                  {service.description}
                </p>
              )}
            </div>

            {/* Bottom: metadata + Book pill */}
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Clock size={12} style={{ color: theme.textSecondary, flexShrink: 0 }} />
                <span style={{ fontSize: 12.5, color: theme.textSecondary }}>
                  {service.duration} min
                </span>
                <span style={{ fontSize: 12, color: theme.textSecondary, opacity: 0.35, margin: '0 1px' }}>|</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: theme.textPrimary }}>
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
                  height: 40, padding: '0 18px',
                  fontSize: 13.5, fontWeight: 700,
                  cursor: isPreview ? 'default' : 'pointer',
                  opacity: isPreview ? 0.5 : 1,
                  boxShadow: `0 3px 10px ${accent}38`,
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
          boxShadow: '0 1px 10px rgba(0,0,0,0.055)',
          backgroundColor: theme.cardBg,
          padding: 16,
          backdropFilter: theme.cardBlur,
          WebkitBackdropFilter: theme.cardBlur,
        }}
      >
        <span style={{
          display: 'inline-block',
          fontSize: 10, fontWeight: 600,
          color: accent, backgroundColor: `${accent}14`,
          borderRadius: 99, padding: '2px 9px', marginBottom: 9,
        }}>
          Most booked
        </span>

        <p style={{
          fontSize: 19, fontWeight: 800, color: theme.textPrimary,
          margin: '0 0 5px', letterSpacing: '-0.02em', lineHeight: 1.15,
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

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: service.description ? 0 : 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Clock size={12} style={{ color: theme.textSecondary }} />
            <span style={{ fontSize: 12.5, color: theme.textSecondary }}>{service.duration} min</span>
            <span style={{ fontSize: 12, color: theme.textSecondary, opacity: 0.35 }}>|</span>
            <span style={{ fontSize: 17, fontWeight: 800, color: theme.textPrimary, letterSpacing: '-0.025em' }}>
              {formatCurrency(service.price)}
            </span>
          </div>

          <motion.button
            whileTap={isPreview ? {} : { scale: 0.95 }}
            onClick={handleBook}
            disabled={isPreview}
            style={{
              borderRadius: 99, backgroundColor: accent, color: accentText,
              border: 'none', height: 40, padding: '0 18px',
              fontSize: 13.5, fontWeight: 700,
              cursor: isPreview ? 'default' : 'pointer',
              opacity: isPreview ? 0.5 : 1,
              boxShadow: `0 3px 10px ${accent}38`,
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
