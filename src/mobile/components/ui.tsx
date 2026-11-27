import { useEffect } from 'react';
import type { ReactNode } from 'react';
import type { BookingStatus } from '../lib/types';
import { PINK } from '../lib/constants';

const STATUS: Record<BookingStatus, { label: string; bg: string; fg: string }> = {
  pending: { label: 'Pending', bg: '#FFF4DB', fg: '#8A5A00' },
  confirmed: { label: 'Confirmed', bg: '#E5F0FF', fg: '#1F4FB8' },
  paid: { label: 'Deposit paid', bg: '#E3F7EC', fg: '#11733F' },
  completed: { label: 'Completed', bg: '#EEEEEE', fg: '#3D3D3D' },
  no_show: { label: 'No-show', bg: '#FDE7E7', fg: '#B42318' },
  cancelled: { label: 'Cancelled', bg: '#FDE7E7', fg: '#B42318' },
  refunded: { label: 'Refunded', bg: '#F1EAFE', fg: '#5B35B5' },
  expired: { label: 'Expired', bg: '#EEEEEE', fg: '#6B6B6B' },
};

export function StatusChip({ status }: { status: BookingStatus }) {
  const s = STATUS[status] ?? STATUS.pending;
  return (
    <span
      className="inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[11px] font-semibold leading-none"
      style={{ backgroundColor: s.bg, color: s.fg }}
    >
      {s.label}
    </span>
  );
}

export function Avatar({ src, name, size = 44 }: { src?: string | null; name: string; size?: number }) {
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return src ? (
    <img src={src} alt="" className="shrink-0 rounded-full object-cover" style={{ width: size, height: size }} />
  ) : (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-bold text-white"
      style={{ width: size, height: size, backgroundColor: PINK, fontSize: size * 0.38 }}
    >
      {initials}
    </div>
  );
}

/** Persistent label on every screen when showing the example persona. */
export function DemoBanner() {
  return (
    <div className="mx-4 mb-3 rounded-xl bg-[#FFF0F7] px-3 py-2 text-center text-[12px] font-medium text-[#B0125E]">
      Demo mode: example studio and example data
    </div>
  );
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className="flex h-11 w-14 shrink-0 items-center justify-center"
    >
      <span
        className="relative block h-[30px] w-[50px] rounded-full transition-colors"
        style={{ backgroundColor: checked ? PINK : '#D9D9D9' }}
      >
        <span
          className="absolute top-[3px] h-6 w-6 rounded-full bg-white shadow transition-[left]"
          style={{ left: checked ? 23 : 3 }}
        />
      </span>
    </button>
  );
}

/** Bottom sheet with a dim backdrop. */
export function Sheet({ open, onClose, children, title }: { open: boolean; onClose: () => void; children: ReactNode; title?: string }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <button type="button" aria-label="Close" className="m-fade absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="m-sheet relative rounded-t-3xl bg-white px-4 pb-safe pt-2">
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-gray-300" />
        {title && <h3 className="mb-2 px-1 text-[17px] font-bold">{title}</h3>}
        <div className="pb-4">{children}</div>
      </div>
    </div>
  );
}

export function SheetAction({ icon, label, onClick, danger }: { icon?: ReactNode; label: string; onClick: () => void; danger?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[52px] w-full items-center gap-3 rounded-xl px-2 text-left text-[15px] font-medium active:bg-gray-100 ${
        danger ? 'text-[#B42318]' : 'text-[#1A1A1A]'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

export function ScreenTitle({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="flex min-h-[52px] items-center justify-between px-4">
      <h1 className="text-[26px] font-extrabold tracking-tight">{children}</h1>
      {right}
    </div>
  );
}

export function Spinner() {
  return (
    <div className="flex h-40 items-center justify-center">
      <span className="h-7 w-7 animate-spin rounded-full border-[3px] border-gray-200" style={{ borderTopColor: PINK }} />
    </div>
  );
}
