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

  return (
    <section style={{ marginBottom: 24 }}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          borderRadius: 20,
          overflow: 'hidden',
          border: `1px solid ${theme.cardBorder}`,
          boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
          backgroundColor: theme.cardBg,
          display: 'flex',
          minHeight: 132,
        }}
      >
        {hasImage ? (
          // ── State A: horizontal — image left, content right ────────────────
          <>
            {/* Image panel */}
            <div style={{ position: 'relative', width: 130, flexShrink: 0, overflow: 'hidden' }}>
              <img
                src={service.image_url}
                alt={service.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {/* Most booked badge — bottom left */}
              <div style={{ position: 'absolute', bottom: 10, left: 10 }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.02em',
                  color: '#FFFFFF', backgroundColor: accent,
                  borderRadius: 99, padding: '4px 10px',
                  display: 'inline-block',
                }}>
                  Most booked
                </span>
              </div>
            </div>

            {/* Content */}
            <div style={{
              flex: 1, padding: '14px 14px 14px 13px',
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden', minWidth: 0,
            }}>
              <h3 style={{
                fontSize: 15, fontWeight: 800, color: theme.textPrimary,
                margin: '0 0 4px', letterSpacing: '-0.01em', lineHeight: 1.25,
                overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
              }}>
                {service.name}
              </h3>

              {service.description && (
                <p style={{
                  fontSize: 12, color: theme.textSecondary, lineHeight: 1.45,
                  margin: '0 0 8px', flex: 1,
                  overflow: 'hidden', display: '-webkit-box',
                  WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                }}>
                  {service.description}
                </p>
              )}

              {/* Duration | Price */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 10 }}>
                <Clock size={12} style={{ color: theme.textSecondary, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: theme.textSecondary }}>
                  {service.duration} min
                </span>
                <span style={{ fontSize: 12, color: theme.textSecondary, opacity: 0.4 }}>|</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: theme.textPrimary }}>
                  {formatCurrency(service.price)}
                </span>
              </div>

              {/* Book button — full width pill */}
              <motion.button
                whileTap={isPreview ? {} : { scale: 0.96 }}
                onClick={handleBook}
                disabled={isPreview}
                style={{
                  backgroundColor: accent, color: accentText,
                  borderRadius: 99, border: 'none',
                  padding: '9px 0', fontSize: 13, fontWeight: 700,
                  cursor: isPreview ? 'default' : 'pointer',
                  opacity: isPreview ? 0.5 : 1,
                  width: '100%',
                  boxShadow: `0 2px 10px ${accent}30`,
                  letterSpacing: '-0.01em',
                }}
              >
                {hasDeposit ? `Book · ${formatCurrency(chargeNow)}` : 'Book →'}
              </motion.button>
            </div>
          </>
        ) : (
          // ── State B: no image — clean text card ────────────────────────────
          <div style={{ padding: '20px', width: '100%' }}>
            <span style={{
              display: 'inline-block',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.04em',
              color: accent, backgroundColor: `${accent}12`,
              borderRadius: 99, padding: '4px 12px', marginBottom: 14,
            }}>
              Most booked
            </span>

            <h3 style={{
              fontSize: 22, fontWeight: 900, color: theme.textPrimary,
              margin: '0 0 8px', letterSpacing: '-0.02em', lineHeight: 1.1,
            }}>
              {service.name}
            </h3>

            {service.description && (
              <p style={{
                fontSize: 13, color: theme.textSecondary, lineHeight: 1.55,
                margin: '0 0 16px',
                overflow: 'hidden', display: '-webkit-box',
                WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
              }}>
                {service.description}
              </p>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 18 }}>
              <Clock size={13} style={{ color: theme.textSecondary }} />
              <span style={{ fontSize: 13, color: theme.textSecondary }}>{service.duration} min</span>
              <span style={{ fontSize: 13, color: theme.textSecondary, opacity: 0.4 }}>|</span>
              <span style={{ fontSize: 24, fontWeight: 900, color: theme.textPrimary, letterSpacing: '-0.035em', lineHeight: 1 }}>
                {formatCurrency(service.price)}
              </span>
            </div>

            <motion.button
              whileTap={isPreview ? {} : { scale: 0.96 }}
              onClick={handleBook}
              disabled={isPreview}
              style={{
                display: 'block', width: '100%', height: 50,
                borderRadius: 14, backgroundColor: accent, color: accentText,
                border: 'none', fontSize: 16, fontWeight: 700,
                cursor: isPreview ? 'default' : 'pointer',
                opacity: isPreview ? 0.5 : 1,
                boxShadow: `0 4px 16px ${accent}35`,
                letterSpacing: '-0.01em',
              }}
            >
              {hasDeposit ? `Book · ${formatCurrency(chargeNow)}` : 'Book now →'}
            </motion.button>

            {hasDeposit && (
              <p style={{ fontSize: 11, color: theme.textSecondary, textAlign: 'center', marginTop: 8 }}>
                {formatCurrency(service.price - service.deposit)} balance due on the day
              </p>
            )}
          </div>
        )}
      </motion.div>
    </section>
  );
}
