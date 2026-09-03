import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { Service } from '@/types';
import type { NelsyTheme } from '@/lib/themes';

// ── Thumbnail placeholder ─────────────────────────────────────────────────────

function Thumbnail({ src, name }: { src?: string; name: string }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        loading="lazy"
        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
      />
    );
  }
  return (
    <div className="w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center text-2xl bg-gray-50 select-none">
      💅
    </div>
  );
}

// ── Single service card (accordion) ───────────────────────────────────────────

function ServiceCard({
  service,
  theme,
  onBook,
}: {
  service: Service;
  theme: NelsyTheme;
  onBook: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const accent = theme.defaultAccent;
  const accentText = theme.accentText ?? '#FFFFFF';

  return (
    <div
      className="overflow-hidden"
      style={{
        backgroundColor: theme.cardBg,
        border: `1px solid ${theme.cardBorder}`,
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        backdropFilter: theme.cardBlur,
        WebkitBackdropFilter: theme.cardBlur,
      }}
    >
      {/* ── Collapsed row ── */}
      <button
        className="w-full flex items-center gap-3 p-4 text-left"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <Thumbnail src={service.image_url} name={service.name} />

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p
            className="text-[15px] font-semibold leading-snug truncate"
            style={{ color: theme.textPrimary }}
          >
            {service.name}
          </p>
          <p className="text-[12px] mt-0.5" style={{ color: theme.textSecondary }}>
            ⏱ {service.duration} min
            {service.deposit > 0 && ' · Deposit required'}
          </p>
        </div>

        {/* Price + Book + chevron */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0 ml-1">
          <span
            className="text-[16px] font-bold leading-none"
            style={{ color: theme.textPrimary }}
          >
            €{service.price}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onBook();
            }}
            className="px-4 py-1.5 rounded-full text-[12px] font-bold leading-none transition-opacity hover:opacity-85 active:scale-95"
            style={{ backgroundColor: accent, color: accentText }}
          >
            Book
          </button>
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.22, ease: 'easeInOut' }}
          className="ml-1 flex-shrink-0"
          style={{ color: theme.textSecondary }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      {/* ── Expanded drawer ── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              className="px-4 pt-3 pb-4"
              style={{ borderTop: `1px solid ${theme.cardBorder}` }}
            >
              {service.description && (
                <p
                  className="text-[13px] leading-relaxed mb-3"
                  style={{ color: theme.textSecondary }}
                >
                  {service.description}
                </p>
              )}

              {service.deposit > 0 && (
                <div
                  className="flex items-center gap-2 text-[12px] mb-4 px-3 py-2 rounded-xl"
                  style={{ backgroundColor: `${accent}10`, color: theme.textPrimary }}
                >
                  <span>💳</span>
                  <span className="font-medium">
                    €{service.deposit} deposit required to secure your slot
                  </span>
                </div>
              )}

              <button
                onClick={onBook}
                className="w-full py-3.5 rounded-2xl text-[14px] font-bold transition-opacity hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: accent, color: accentText }}
              >
                Book this service →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Section header ────────────────────────────────────────────────────────────

function SectionHeader({ label, theme }: { label: string; theme: NelsyTheme }) {
  return (
    <p
      className="text-[11px] font-bold uppercase mb-3"
      style={{ color: theme.textSecondary, letterSpacing: '1px' }}
    >
      {label}
    </p>
  );
}

// ── Stagger animation ─────────────────────────────────────────────────────────

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  services: Service[];
  theme: NelsyTheme;
  onBook: (service: Service) => void;
}

export function StudioServiceList({ services, theme, onBook }: Props) {
  if (services.length === 0) return null;

  return (
    <section>
      <SectionHeader label="Services" theme={theme} />

      <motion.div
        className="flex flex-col gap-3"
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map((service) => (
          <motion.div key={service.id} variants={itemVariants}>
            <ServiceCard
              service={service}
              theme={theme}
              onBook={() => onBook(service)}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
