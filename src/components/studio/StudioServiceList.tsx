import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import type { Service, Merchant } from '@/types';
import type { NelsyTheme } from '@/lib/themes';
import { getDaysInMonth, isDateInPast } from '@/lib/utils';
import { getAvailableSlots } from '@/lib/bookings';
import { CLOSED_DAYS } from '@/lib/mockData';
import { useBookingStore } from '@/store/bookingStore';

// ── Constants ─────────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

// ── Inline Calendar ───────────────────────────────────────────────────────────

interface CalendarProps {
  selectedDate: string | null;
  onSelect: (date: string) => void;
  theme: NelsyTheme;
}

function InlineCalendar({ selectedDate, onSelect, theme }: CalendarProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const days = getDaysInMonth(viewYear, viewMonth);
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1; // Monday-first grid
  const todayStr = today.toISOString().split('T')[0];

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else setViewMonth((m) => m + 1);
  };

  const accent = theme.defaultAccent;
  const accentText = theme.accentText ?? '#FFFFFF';

  return (
    <div>
      {/* Month navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <button
          onClick={prevMonth}
          style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.textSecondary }}
        >
          <ChevronLeft size={16} />
        </button>
        <span style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary }}>
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.textSecondary }}
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 4 }}>
        {DAY_LABELS.map((d, i) => (
          <div key={i} style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: theme.textSecondary, paddingBottom: 4 }}>
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', rowGap: 2 }}>
        {Array.from({ length: offset }).map((_, i) => <div key={`e${i}`} />)}
        {days.map((date) => {
          const dateStr = date.toISOString().split('T')[0];
          const past = isDateInPast(date);
          const closed = CLOSED_DAYS.includes(date.getDay());
          const disabled = past || closed;
          const selected = selectedDate === dateStr;
          const isToday = dateStr === todayStr;

          return (
            <button
              key={dateStr}
              disabled={disabled}
              onClick={() => !disabled && onSelect(dateStr)}
              style={{
                width: 36, height: 36, margin: '0 auto',
                borderRadius: '50%', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: isToday && !selected ? 800 : 500,
                transition: 'all 0.15s ease',
                backgroundColor: selected ? accent : 'transparent',
                color: selected ? accentText
                  : disabled ? `${theme.textPrimary}28`
                  : isToday ? accent
                  : theme.textPrimary,
              }}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Time slot grid ────────────────────────────────────────────────────────────

function TimeSlotGrid({
  slots,
  loading,
  selected,
  onSelect,
  theme,
}: {
  slots: string[];
  loading: boolean;
  selected: string | null;
  onSelect: (t: string) => void;
  theme: NelsyTheme;
}) {
  const accent = theme.defaultAccent;
  const accentText = theme.accentText ?? '#FFFFFF';

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0', gap: 8, color: theme.textSecondary }}>
        <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
        <span style={{ fontSize: 13 }}>Checking availability…</span>
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <p style={{ textAlign: 'center', fontSize: 13, color: theme.textSecondary, padding: '16px 0' }}>
        No slots available — try another date
      </p>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
      {slots.map((slot) => {
        const active = selected === slot;
        return (
          <button
            key={slot}
            onClick={() => onSelect(slot)}
            style={{
              padding: '10px 0', borderRadius: 12, border: `2px solid ${active ? accent : theme.cardBorder}`,
              backgroundColor: active ? accent : 'transparent',
              color: active ? accentText : theme.textPrimary,
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.18s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}

// ── Service card thumbnail ────────────────────────────────────────────────────

function Thumbnail({ src, name }: { src?: string; name: string }) {
  if (src) {
    return (
      <img
        src={src} alt={name} loading="lazy"
        style={{ width: 64, height: 64, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }}
      />
    );
  }
  return (
    <div
      style={{
        width: 64, height: 64, borderRadius: 12, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 24, backgroundColor: 'rgba(128,128,128,0.08)', userSelect: 'none',
      }}
    >
      💅
    </div>
  );
}

// ── Single service card ───────────────────────────────────────────────────────

function ServiceCard({
  service,
  merchant,
  theme,
  isPreview,
}: {
  service: Service;
  merchant: Merchant;
  theme: NelsyTheme;
  isPreview: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  const { openWithDateTime } = useBookingStore();
  const accent = theme.defaultAccent;
  const accentText = theme.accentText ?? '#FFFFFF';

  // Reset time when date changes
  useEffect(() => { setSelectedTime(null); }, [selectedDate]);

  // Fetch slots when a date is selected (live mode only)
  useEffect(() => {
    if (!selectedDate || isPreview || !merchant.id) return;
    let cancelled = false;
    setSlotsLoading(true);
    setSlots([]);
    void getAvailableSlots(merchant.id, new Date(selectedDate)).then((s) => {
      if (!cancelled) { setSlots(s); setSlotsLoading(false); }
    });
    return () => { cancelled = true; };
  }, [selectedDate, merchant.id, isPreview]);

  const handleBook = () => {
    if (!selectedDate || !selectedTime) return;
    openWithDateTime(service, selectedDate, selectedTime);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <div
      style={{
        backgroundColor: theme.cardBg,
        border: `1px solid ${theme.cardBorder}`,
        borderRadius: 16,
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        backdropFilter: theme.cardBlur,
        WebkitBackdropFilter: theme.cardBlur,
        overflow: 'hidden',
        transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {/* ── Collapsed row ── */}
      <button
        onClick={() => !isPreview && setExpanded((v) => !v)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 12,
          padding: 16, background: 'none', border: 'none',
          cursor: isPreview ? 'default' : 'pointer', textAlign: 'left',
        }}
        aria-expanded={expanded}
      >
        <Thumbnail src={service.image_url} name={service.name} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: theme.textPrimary, margin: 0, lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {service.name}
          </p>
          <p style={{ fontSize: 12, color: theme.textSecondary, margin: '4px 0 0' }}>
            ⏱ {service.duration} min{service.deposit > 0 ? ' · Deposit required' : ''}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: theme.textPrimary, lineHeight: 1 }}>
            €{service.price}
          </span>
          {/* Inline Book pill — stops propagation so it doesn't toggle accordion */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (isPreview) return;
              // If date+time already selected, book directly; otherwise expand to show calendar
              if (selectedDate && selectedTime) {
                handleBook();
              } else {
                setExpanded(true);
              }
            }}
            style={{
              backgroundColor: accent, color: accentText,
              borderRadius: 99, border: 'none', padding: '6px 14px',
              fontSize: 12, fontWeight: 700, cursor: isPreview ? 'default' : 'pointer',
              transition: 'opacity 0.2s',
            }}
          >
            Book
          </button>
        </div>

        {!isPreview && (
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            style={{ color: theme.textSecondary, flexShrink: 0 }}
          >
            <ChevronDown size={16} />
          </motion.div>
        )}
      </button>

      {/* ── Expanded inline booking drawer ── */}
      <AnimatePresence initial={false}>
        {expanded && !isPreview && (
          <motion.div
            key="drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ borderTop: `1px solid ${theme.cardBorder}`, padding: '16px 16px 20px' }}>

              {/* Description */}
              {service.description && (
                <p style={{ fontSize: 13, color: theme.textSecondary, lineHeight: 1.65, marginBottom: 16 }}>
                  {service.description}
                </p>
              )}

              {/* Deposit chip */}
              {service.deposit > 0 && (
                <div
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    backgroundColor: `${accent}12`, borderRadius: 10, padding: '6px 12px',
                    marginBottom: 20, fontSize: 12, fontWeight: 500, color: theme.textPrimary,
                  }}
                >
                  <span>💳</span>
                  <span>€{service.deposit} deposit to secure your slot</span>
                </div>
              )}

              {/* Section label */}
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: theme.textSecondary, marginBottom: 12 }}>
                Select a date
              </p>

              {/* Inline calendar */}
              <InlineCalendar selectedDate={selectedDate} onSelect={handleDateSelect} theme={theme} />

              {/* Time slots — appear after date selected */}
              <AnimatePresence>
                {selectedDate && (
                  <motion.div
                    key="slots"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    style={{ marginTop: 20 }}
                  >
                    <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: theme.textSecondary, marginBottom: 12 }}>
                      Available times
                    </p>
                    <TimeSlotGrid
                      slots={slots}
                      loading={slotsLoading}
                      selected={selectedTime}
                      onSelect={setSelectedTime}
                      theme={theme}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Book CTA — appears only when both date + time are chosen */}
              <AnimatePresence>
                {selectedDate && selectedTime && (
                  <motion.button
                    key="cta"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.2 }}
                    onClick={handleBook}
                    style={{
                      width: '100%', marginTop: 16,
                      padding: '14px 0', borderRadius: 12, border: 'none',
                      backgroundColor: accent, color: accentText,
                      fontSize: 15, fontWeight: 700, cursor: 'pointer',
                      transition: 'opacity 0.2s',
                      boxShadow: `0 4px 16px ${accent}40`,
                    }}
                  >
                    Book Service →
                  </motion.button>
                )}
              </AnimatePresence>

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
    <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: theme.textSecondary, marginBottom: 12 }}>
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } },
};

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  services: Service[];
  merchant: Merchant;
  theme: NelsyTheme;
  isPreview?: boolean;
}

export function StudioServiceList({ services, merchant, theme, isPreview = false }: Props) {
  if (services.length === 0) return null;

  return (
    <section style={{ paddingBottom: 8 }}>
      <SectionHeader label="Services" theme={theme} />

      <motion.div
        style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map((service) => (
          <motion.div key={service.id} variants={itemVariants}>
            <ServiceCard
              service={service}
              merchant={merchant}
              theme={theme}
              isPreview={isPreview}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
