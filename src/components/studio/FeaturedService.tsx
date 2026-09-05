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
  const hasImage = !!service.image_url;

  const handleBook = () => {
    if (isPreview) return;
    openModal(service);
  };

  return (
    <section style={{ marginBottom: 28 }}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          borderRadius: 20,
          overflow: 'hidden',
          border: `1px solid ${theme.cardBorder}`,
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          backgroundColor: theme.cardBg,
        }}
      >
        {hasImage ? (
          // ── State A: service has a photo ──────────────────────────────
          <>
            <div
              style={{
                height: 200,
                background: `url(${service.image_url}) center/cover no-repeat`,
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.02) 55%)',
                }}
              />
              {/* Most booked badge — top left on image */}
              <div style={{ position: 'absolute', top: 14, left: 14, zIndex: 1 }}>
                <span
                  style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.04em',
                    color: 'rgba(255,255,255,0.92)',
                    backgroundColor: 'rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    borderRadius: 99, padding: '4px 10px',
                  }}
                >
                  Most booked
                </span>
              </div>
              <div style={{ position: 'absolute', bottom: 18, left: 18, right: 18, zIndex: 1 }}>
                <h3
                  style={{
                    fontSize: 22, fontWeight: 900, color: '#FFFFFF',
                    margin: '0 0 4px', letterSpacing: '-0.025em', lineHeight: 1.1,
                  }}
                >
                  {service.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span
                    style={{
                      fontSize: 26, fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.035em',
                    }}
                  >
                    {formatCurrency(service.price)}
                  </span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>
                    · {service.duration} min
                  </span>
                </div>
              </div>
            </div>

            <div style={{ padding: '14px 18px 18px' }}>
              {service.description && (
                <p
                  style={{
                    fontSize: 13, color: theme.textSecondary, lineHeight: 1.55,
                    margin: '0 0 14px',
                    overflow: 'hidden', display: '-webkit-box',
                    WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                  }}
                >
                  {service.description}
                </p>
              )}

              <div
                style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: hasDeposit ? 'space-between' : 'flex-end',
                  gap: 12,
                }}
              >
                {hasDeposit && (
                  <p style={{ fontSize: 12, color: theme.textSecondary, lineHeight: 1.4 }}>
                    {formatCurrency(service.deposit)}<br />
                    <span style={{ opacity: 0.7 }}>deposit today</span>
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
                    boxShadow: `0 4px 16px ${accent}35`,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {hasDeposit ? `Book · ${formatCurrency(chargeNow)}` : 'Book now →'}
                </motion.button>
              </div>
            </div>
          </>
        ) : (
          // ── State B: no photo — clean text-first layout ───────────────
          <div style={{ padding: '20px 20px 20px' }}>
            <span
              style={{
                display: 'inline-block',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.04em',
                color: accent, backgroundColor: `${accent}12`,
                borderRadius: 99, padding: '4px 12px',
                marginBottom: 14,
              }}
            >
              Most booked
            </span>

            <h3
              style={{
                fontSize: 22, fontWeight: 900, color: theme.textPrimary,
                margin: '0 0 8px', letterSpacing: '-0.02em', lineHeight: 1.1,
              }}
            >
              {service.name}
            </h3>

            {service.description && (
              <p
                style={{
                  fontSize: 13, color: theme.textSecondary, lineHeight: 1.55,
                  margin: '0 0 16px',
                  overflow: 'hidden', display: '-webkit-box',
                  WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                }}
              >
                {service.description}
              </p>
            )}

            <div
              style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 18,
              }}
            >
              <span style={{ fontSize: 13, color: theme.textSecondary }}>
                {service.duration} min
              </span>
              <span
                style={{
                  fontSize: 28, fontWeight: 900, color: theme.textPrimary,
                  letterSpacing: '-0.035em', lineHeight: 1,
                }}
              >
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
              <p
                style={{
                  fontSize: 11, color: theme.textSecondary,
                  textAlign: 'center', marginTop: 8,
                }}
              >
                {formatCurrency(service.price - service.deposit)} balance due on the day
              </p>
            )}
          </div>
        )}
      </motion.div>
    </section>
  );
}
