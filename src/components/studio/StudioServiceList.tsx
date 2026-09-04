import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { Service } from '@/types';
import type { NelsyTheme } from '@/lib/themes';
import { formatCurrency } from '@/lib/utils';
import { useBookingStore } from '@/store/bookingStore';

// ── Thumbnail ─────────────────────────────────────────────────────────────────

function Thumbnail({ src, name, accent }: { src?: string; name: string; accent: string }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        loading="lazy"
        style={{ width: 52, height: 52, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }}
      />
    );
  }
  const initial = name.charAt(0).toUpperCase();
  return (
    <div
      style={{
        width: 52, height: 52, borderRadius: 12, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 18, fontWeight: 700, color: '#FFFFFF',
        background: `linear-gradient(135deg, ${accent}CC, ${accent})`,
        userSelect: 'none',
      }}
    >
      {initial}
    </div>
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

  const handleBook = () => {
    if (isPreview) return;
    openModal(service);
  };

  // Amount charged now: deposit if set, otherwise full price
  const chargeNow = service.deposit > 0 ? service.deposit : service.price;
  const hasDeposit = service.deposit > 0;

  return (
    <div
      style={{
        backgroundColor: theme.cardBg,
        border: `1px solid ${theme.cardBorder}`,
        borderRadius: 16,
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        backdropFilter: theme.cardBlur,
        WebkitBackdropFilter: theme.cardBlur,
        overflow: 'hidden',
        transition: 'box-shadow 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px' }}>

        {/* Thumbnail */}
        <Thumbnail src={service.image_url} name={service.name} accent={accent} />

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize: 15, fontWeight: 700, color: theme.textPrimary,
            margin: 0, lineHeight: 1.3,
            overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
          }}>
            {service.name}
          </p>

          {/* Description — 1 line truncated */}
          {service.description && (
            <p style={{
              fontSize: 12, color: theme.textSecondary, margin: '2px 0 0',
              overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
            }}>
              {service.description}
            </p>
          )}

          {/* Meta row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: theme.textSecondary }}>
              {service.duration} min
            </span>
            {hasDeposit && (
              <>
                <span style={{ fontSize: 10, color: theme.textSecondary }}>·</span>
                <span style={{
                  fontSize: 11, fontWeight: 600, color: accent,
                  backgroundColor: `${accent}12`, borderRadius: 6,
                  padding: '1px 6px',
                }}>
                  Acompte {formatCurrency(service.deposit)}
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
            aria-label={`Réserver ${service.name}`}
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
            }}
          >
            {hasDeposit ? `Réserver · ${formatCurrency(chargeNow)}` : 'Réserver →'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Stagger animation ─────────────────────────────────────────────────────────

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } },
};

// ── Section label ─────────────────────────────────────────────────────────────

function SectionLabel({ label, theme }: { label: string; theme: NelsyTheme }) {
  return (
    <p style={{
      fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
      letterSpacing: '1px', color: theme.textSecondary, marginBottom: 12,
    }}>
      {label}
    </p>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  services: Service[];
  theme: NelsyTheme;
  isPreview?: boolean;
}

export function StudioServiceList({ services, theme, isPreview = false }: Props) {
  if (services.length === 0) {
    return (
      <div style={{
        textAlign: 'center', padding: '32px 0',
        color: theme.textSecondary, fontSize: 14,
      }}>
        Aucun service disponible pour le moment.
      </div>
    );
  }

  return (
    <section style={{ paddingBottom: 8 }}>
      <SectionLabel label="Services" theme={theme} />

      <motion.div
        style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map((service) => (
          <motion.div key={service.id} variants={itemVariants}>
            <ServiceCard
              service={service}
              theme={theme}
              isPreview={isPreview}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
