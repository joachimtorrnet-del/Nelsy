import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { Service } from '@/types';
import type { NelsyTheme } from '@/lib/themes';
import { formatCurrency } from '@/lib/utils';
import { useBookingStore } from '@/store/bookingStore';

interface CardProps {
  service: Service;
  theme: NelsyTheme;
  isPreview: boolean;
}

function ServiceCard({ service, theme, isPreview }: CardProps) {
  const { openModal } = useBookingStore();
  const accent = theme.defaultAccent;

  const handleBook = () => {
    if (isPreview) return;
    openModal(service);
  };

  return (
    <div
      onClick={handleBook}
      role={isPreview ? undefined : 'button'}
      tabIndex={isPreview ? undefined : 0}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 12px',
        backgroundColor: theme.cardBg,
        border: `1px solid ${theme.cardBorder}`,
        borderRadius: 16,
        boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
        cursor: isPreview ? 'default' : 'pointer',
        backdropFilter: theme.cardBlur,
        WebkitBackdropFilter: theme.cardBlur,
      }}
    >
      {/* Square thumbnail */}
      <div style={{
        width: 88, height: 88, borderRadius: 12,
        overflow: 'hidden', flexShrink: 0,
        backgroundColor: `${accent}10`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {service.image_url ? (
          <img
            src={service.image_url}
            alt={service.name}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <span style={{ fontSize: 28 }}>💅</span>
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: 15, fontWeight: 700, color: theme.textPrimary,
          margin: '0 0 3px', letterSpacing: '-0.01em',
          overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
        }}>
          {service.name}
        </p>
        {service.description && (
          <p style={{
            fontSize: 12, color: theme.textSecondary, margin: '0 0 5px',
            overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
          }}>
            {service.description}
          </p>
        )}
        <p style={{ fontSize: 12, color: theme.textSecondary, margin: 0 }}>
          {service.duration} min
          <span style={{ margin: '0 5px', opacity: 0.35 }}>|</span>
          <span style={{ fontWeight: 700, color: theme.textPrimary }}>{formatCurrency(service.price)}</span>
        </p>
      </div>

      <ChevronRight size={16} style={{ color: theme.textSecondary, flexShrink: 0, opacity: 0.35 }} />
    </div>
  );
}

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } },
};

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
        fontSize: 17, fontWeight: 800, color: theme.textPrimary,
        letterSpacing: '-0.02em', margin: '0 0 10px',
      }}>
        All services
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
