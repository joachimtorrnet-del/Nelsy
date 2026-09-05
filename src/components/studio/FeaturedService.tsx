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

  // Header area: real image takes priority; otherwise the theme's own gradient
  const headerBg = service.image_url
    ? `url(${service.image_url}) center/cover no-repeat`
    : theme.headerGradient;

  // When image exists, overlay text in white; otherwise use theme header text
  const headerTextPrimary = service.image_url ? '#FFFFFF' : theme.headerTextPrimary;
  const headerTextSecondary = service.image_url ? 'rgba(255,255,255,0.75)' : theme.headerTextSecondary;

  return (
    <section style={{ marginBottom: 28 }}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          borderRadius: 22,
          overflow: 'hidden',
          border: `1px solid ${theme.cardBorder}`,
          boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
        }}
      >
        {/* ── Image / gradient header — always present ───── */}
        <div
          style={{
            height: 190,
            background: headerBg,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '14px 16px 18px',
          }}
        >
          {/* Dark overlay only when image — for text legibility */}
          {service.image_url && (
            <div
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.05) 55%)',
              }}
            />
          )}

          {/* "Featured" badge — top left */}
          <div style={{ position: 'relative', zIndex: 1, alignSelf: 'flex-start' }}>
            <span
              style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.07em',
                color: headerTextSecondary,
                backgroundColor: service.image_url
                  ? 'rgba(255,255,255,0.18)'
                  : 'rgba(0,0,0,0.06)',
                borderRadius: 6, padding: '3px 9px',
                backdropFilter: service.image_url ? 'blur(6px)' : undefined,
                WebkitBackdropFilter: service.image_url ? 'blur(6px)' : undefined,
              }}
            >
              FEATURED
            </span>
          </div>

          {/* Service name + price — bottom of header */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3
              style={{
                fontSize: 21, fontWeight: 900, color: headerTextPrimary,
                margin: 0, letterSpacing: '-0.025em', lineHeight: 1.15,
              }}
            >
              {service.name}
            </h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
              <span
                style={{
                  fontSize: 26, fontWeight: 900, color: headerTextPrimary,
                  letterSpacing: '-0.035em', lineHeight: 1,
                }}
              >
                {formatCurrency(service.price)}
              </span>
              <span style={{ fontSize: 13, color: headerTextSecondary }}>
                · {service.duration} min
              </span>
            </div>
          </div>
        </div>

        {/* ── Content below header ─────────────────────── */}
        <div style={{ padding: '14px 18px 18px', backgroundColor: theme.cardBg }}>
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
              marginTop: service.description ? 0 : 4,
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
                boxShadow: `0 4px 16px ${accent}40`,
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
