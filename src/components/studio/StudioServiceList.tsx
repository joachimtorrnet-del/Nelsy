import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { Service } from '@/types';
import type { NelsyTheme } from '@/lib/themes';
import { formatCurrency } from '@/lib/utils';
import { useBookingStore } from '@/store/bookingStore';

// ── Thumbnail — only renders when real image exists ───────────────────────────

function Thumbnail({ src, name }: { src?: string; name: string }) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      style={{
        width: 52, height: 52, borderRadius: 11,
        objectFit: 'cover', flexShrink: 0,
      }}
    />
  );
}

// ── Service card ──────────────────────────────────────────────────────────────

interface CardProps {
  service: Service;
  theme: NelsyTheme;
  isPreview: boolean;
}

function ServiceCard({ service, theme, isPreview }: CardProps) {
  const { openModal } = useBookingStore();
  const accent = theme.defaultAccent;
  const accentText = theme.accentText ?? '#FFFFFF';
  const hasImage = !!service.image_url;
  const chargeNow = service.deposit > 0 ? service.deposit : service.price;
  const hasDeposit = service.deposit > 0;

  const handleBook = () => {
    if (isPreview) return;
    openModal(service);
  };

  return (
    <div
      style={{
        backgroundColor: theme.cardBg,
        border: `1px solid ${theme.cardBorder}`,
        borderRadius: 16,
        boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
        backdropFilter: theme.cardBlur,
        WebkitBackdropFilter: theme.cardBlur,
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 14px 14px 16px' }}>

        {/* Real image only — no fake placeholder */}
        {hasImage && <Thumbnail src={service.image_url} name={service.name} />}

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize: 15, fontWeight: 700, color: theme.textPrimary,
            margin: 0, lineHeight: 1.3,
            overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
          }}>
            {service.name}
          </p>

          {service.description && (
            <p style={{
              fontSize: 12, color: theme.textSecondary, margin: '2px 0 0',
              overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
            }}>
              {service.description}
            </p>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: theme.textSecondary }}>
              {service.duration} min
            </span>
            {hasDeposit && (
              <>
                <span style={{ fontSize: 10, color: theme.textSecondary }}>·</span>
                <span style={{
                  fontSize: 11, fontWeight: 600, color: accent,
                  backgroundColor: `${accent}12`, borderRadius: 5,
                  padding: '1px 6px',
                }}>
                  Deposit {formatCurrency(service.deposit)}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Price + CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: 17, fontWeight: 800, color: theme.textPrimary, lineHeight: 1 }}>
            {formatCurrency(service.price)}
          </span>
          <button
            onClick={handleBook}
            disabled={isPreview}
            aria-label={`Book ${service.name}`}
            style={{
              backgroundColor: accent,
              color: accentText,
              borderRadius: 99,
              border: 'none',
              padding: '7px 16px',
              fontSize: 13,
              fontWeight: 700,
              cursor: isPreview ? 'default' : 'pointer',
              opacity: isPreview ? 0.5 : 1,
              transition: 'opacity 0.15s',
              whiteSpace: 'nowrap',
              minHeight: 32,
            }}
          >
            {hasDeposit ? `Book · ${formatCurrency(chargeNow)}` : 'Book →'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Animation ─────────────────────────────────────────────────────────────────

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
};

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  services: Service[];
  theme: NelsyTheme;
  isPreview?: boolean;
}

export function StudioServiceList({ services, theme, isPreview = false }: Props) {
  if (services.length === 0) return null;

  return (
    <section style={{ paddingBottom: 8 }}>
      <p style={{
        fontSize: 11, fontWeight: 600, letterSpacing: '0.02em',
        color: theme.textSecondary, marginBottom: 10,
      }}>
        More services
      </p>

      <motion.div
        style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map((service) => (
          <motion.div key={service.id} variants={itemVariants}>
            <ServiceCard service={service} theme={theme} isPreview={isPreview} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
