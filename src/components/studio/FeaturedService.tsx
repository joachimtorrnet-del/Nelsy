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
    <section style={{ marginBottom: 20 }}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={handleBook}
        role={isPreview ? undefined : 'button'}
        tabIndex={isPreview ? undefined : 0}
        style={{
          borderRadius: 18,
          overflow: 'hidden',
          border: `1px solid ${theme.cardBorder}`,
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          backgroundColor: theme.cardBg,
          display: 'flex',
          minHeight: 140,
          cursor: isPreview ? 'default' : 'pointer',
          backdropFilter: theme.cardBlur,
          WebkitBackdropFilter: theme.cardBlur,
        }}
      >
        {hasImage ? (
          <>
            {/* Image panel */}
            <div style={{ position: 'relative', width: 120, flexShrink: 0, overflow: 'hidden' }}>
              <img
                src={service.image_url}
                alt={service.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ position: 'absolute', bottom: 8, left: 8 }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.02em',
                  color: '#FFFFFF', backgroundColor: accent,
                  borderRadius: 99, padding: '3px 8px',
                  display: 'inline-block',
                }}>
                  Most booked
                </span>
              </div>
            </div>

            {/* Content */}
            <div style={{
              flex: 1, padding: '14px 14px 12px 13px',
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden', minWidth: 0,
            }}>
              <h3 style={{
                fontSize: 16, fontWeight: 800, color: theme.textPrimary,
                margin: '0 0 4px', letterSpacing: '-0.02em', lineHeight: 1.2,
                overflow: 'hidden', display: '-webkit-box',
                WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
              }}>
                {service.name}
              </h3>

              {service.description && (
                <p style={{
                  fontSize: 12, color: theme.textSecondary, lineHeight: 1.4,
                  margin: '0 0 8px', flex: 1,
                  overflow: 'hidden', display: '-webkit-box',
                  WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                }}>
                  {service.description}
                </p>
              )}

              {/* Duration + Price */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
                <Clock size={11} style={{ color: theme.textSecondary, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: theme.textSecondary }}>
                  {service.duration} min
                </span>
                <span style={{ fontSize: 12, color: theme.textSecondary, opacity: 0.35, margin: '0 1px' }}>|</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: theme.textPrimary }}>
                  {formatCurrency(service.price)}
                </span>
              </div>

              {/* Book button — small pill, aligned right */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <motion.button
                  whileTap={isPreview ? {} : { scale: 0.95 }}
                  onClick={(e) => { e.stopPropagation(); handleBook(); }}
                  disabled={isPreview}
                  style={{
                    backgroundColor: accent, color: accentText,
                    borderRadius: 99, border: 'none',
                    padding: '8px 18px', fontSize: 13, fontWeight: 700,
                    cursor: isPreview ? 'default' : 'pointer',
                    opacity: isPreview ? 0.5 : 1,
                    boxShadow: `0 2px 8px ${accent}35`,
                    letterSpacing: '-0.01em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {hasDeposit ? `Book · ${formatCurrency(chargeNow)}` : 'Book →'}
                </motion.button>
              </div>
            </div>
          </>
        ) : (
          // State B: no image — text-only compact card
          <div style={{ padding: '16px 18px', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: 10 }}>
              <span style={{
                display: 'inline-block',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.04em',
                color: accent, backgroundColor: `${accent}12`,
                borderRadius: 99, padding: '3px 10px', marginBottom: 10,
              }}>
                Most booked
              </span>
              <h3 style={{
                fontSize: 20, fontWeight: 900, color: theme.textPrimary,
                margin: '0 0 6px', letterSpacing: '-0.02em', lineHeight: 1.1,
              }}>
                {service.name}
              </h3>
              {service.description && (
                <p style={{
                  fontSize: 13, color: theme.textSecondary, lineHeight: 1.5,
                  margin: '0 0 10px',
                  overflow: 'hidden', display: '-webkit-box',
                  WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                }}>
                  {service.description}
                </p>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <Clock size={12} style={{ color: theme.textSecondary }} />
                <span style={{ fontSize: 12, color: theme.textSecondary }}>{service.duration} min</span>
                <span style={{ fontSize: 12, color: theme.textSecondary, opacity: 0.35 }}>|</span>
                <span style={{ fontSize: 20, fontWeight: 900, color: theme.textPrimary, letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {formatCurrency(service.price)}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <motion.button
                whileTap={isPreview ? {} : { scale: 0.95 }}
                onClick={(e) => { e.stopPropagation(); handleBook(); }}
                disabled={isPreview}
                style={{
                  borderRadius: 99, backgroundColor: accent, color: accentText,
                  border: 'none', padding: '9px 20px', fontSize: 14, fontWeight: 700,
                  cursor: isPreview ? 'default' : 'pointer',
                  opacity: isPreview ? 0.5 : 1,
                  boxShadow: `0 3px 12px ${accent}35`,
                  letterSpacing: '-0.01em',
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
          </div>
        )}
      </motion.div>
    </section>
  );
}
