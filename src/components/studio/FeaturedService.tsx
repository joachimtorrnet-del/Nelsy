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
    <section style={{ marginBottom: 28 }}>
      {/* Quiet label — not uppercase, not admin-y */}
      <p style={{
        fontSize: 11, fontWeight: 600, letterSpacing: '0.02em',
        color: theme.textSecondary, marginBottom: 10,
      }}>
        Featured service
      </p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      >
        {service.image_url ? (
          /* ── State A: image-led card ── */
          <div
            style={{
              borderRadius: 20,
              overflow: 'hidden',
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.cardBorder}`,
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            }}
          >
            {/* Image with price overlaid */}
            <div
              style={{
                height: 180,
                background: `url(${service.image_url}) center/cover no-repeat`,
                position: 'relative',
              }}
            >
              {/* Bottom gradient for legibility */}
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.42) 0%, transparent 55%)',
                }}
              />
              {/* Price on image */}
              <span
                style={{
                  position: 'absolute', bottom: 14, right: 16,
                  fontSize: 26, fontWeight: 900, color: '#FFFFFF',
                  letterSpacing: '-0.03em',
                  textShadow: '0 1px 6px rgba(0,0,0,0.35)',
                }}
              >
                {formatCurrency(service.price)}
              </span>
            </div>

            {/* Content */}
            <div style={{ padding: '16px 18px 18px' }}>
              <h3
                style={{
                  fontSize: 18, fontWeight: 800, color: theme.textPrimary,
                  margin: 0, letterSpacing: '-0.015em',
                }}
              >
                {service.name}
              </h3>

              {service.description && (
                <p
                  style={{
                    fontSize: 13, color: theme.textSecondary, lineHeight: 1.5,
                    marginTop: 5, overflow: 'hidden', display: '-webkit-box',
                    WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                  }}
                >
                  {service.description}
                </p>
              )}

              <div
                style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', marginTop: 16, gap: 12,
                }}
              >
                <div>
                  <span style={{ fontSize: 13, color: theme.textSecondary }}>
                    {service.duration} min
                  </span>
                  {hasDeposit && (
                    <p style={{ fontSize: 11, color: theme.textSecondary, marginTop: 2 }}>
                      Deposit {formatCurrency(service.deposit)}
                    </p>
                  )}
                </div>
                <motion.button
                  whileTap={isPreview ? {} : { scale: 0.96 }}
                  onClick={handleBook}
                  disabled={isPreview}
                  style={{
                    backgroundColor: accent, color: accentText,
                    borderRadius: 12, border: 'none',
                    padding: '11px 20px',
                    fontSize: 14, fontWeight: 700,
                    cursor: isPreview ? 'default' : 'pointer',
                    opacity: isPreview ? 0.5 : 1,
                    boxShadow: `0 3px 12px ${accent}40`,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {hasDeposit ? `Book · ${formatCurrency(chargeNow)}` : 'Book →'}
                </motion.button>
              </div>
            </div>
          </div>
        ) : (
          /* ── State B: typography-led card — NO placeholder image ── */
          <div
            style={{
              borderRadius: 20,
              border: `1px solid ${theme.cardBorder}`,
              backgroundColor: theme.cardBg,
              padding: '22px 20px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            }}
          >
            {/* Name + price on top row */}
            <div
              style={{
                display: 'flex', alignItems: 'flex-start',
                justifyContent: 'space-between', gap: 12,
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3
                  style={{
                    fontSize: 20, fontWeight: 800, color: theme.textPrimary,
                    margin: 0, lineHeight: 1.2, letterSpacing: '-0.02em',
                  }}
                >
                  {service.name}
                </h3>
                {service.description && (
                  <p
                    style={{
                      fontSize: 13, color: theme.textSecondary, lineHeight: 1.5,
                      marginTop: 6, overflow: 'hidden', display: '-webkit-box',
                      WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {service.description}
                  </p>
                )}
                <p style={{ fontSize: 13, color: theme.textSecondary, marginTop: service.description ? 4 : 8 }}>
                  {service.duration} min
                </p>
              </div>
              <span
                style={{
                  fontSize: 30, fontWeight: 900, color: theme.textPrimary,
                  letterSpacing: '-0.04em', lineHeight: 1, flexShrink: 0,
                }}
              >
                {formatCurrency(service.price)}
              </span>
            </div>

            {/* Deposit + CTA row */}
            <div
              style={{
                display: 'flex', alignItems: 'center',
                justifyContent: hasDeposit ? 'space-between' : 'flex-end',
                marginTop: 20, gap: 12,
              }}
            >
              {hasDeposit && (
                <p style={{ fontSize: 12, color: theme.textSecondary }}>
                  {formatCurrency(service.deposit)} deposit due now
                </p>
              )}
              <motion.button
                whileTap={isPreview ? {} : { scale: 0.96 }}
                onClick={handleBook}
                disabled={isPreview}
                style={{
                  backgroundColor: accent, color: accentText,
                  borderRadius: 14, border: 'none',
                  padding: '12px 24px',
                  fontSize: 15, fontWeight: 700,
                  cursor: isPreview ? 'default' : 'pointer',
                  opacity: isPreview ? 0.5 : 1,
                  boxShadow: `0 4px 16px ${accent}40`,
                  whiteSpace: 'nowrap',
                }}
              >
                {hasDeposit ? `Book · ${formatCurrency(chargeNow)}` : 'Book →'}
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
