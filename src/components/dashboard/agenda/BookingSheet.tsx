import { useEffect, useMemo, useState } from 'react';
import {
  CalendarClock, Check, ChevronRight, Copy, Loader2, Mail, MapPin, MessageSquare, Phone, UserRound, Video, XCircle,
} from 'lucide-react';
import Sheet from './Sheet';
import BookingPaymentPanel from '../BookingPaymentPanel';
import { TONE } from './tones';
import {
  dayKeyInTz, findConflicts, formatDay, formatDuration, formatRange, minutesInTz, parseTimeInput, paymentSummary,
  toTimeInput, zonedToUtc, STATUS_META,
} from '../../../lib/agenda';
import type { AgendaBooking } from '../../../lib/agenda';
import type { AgendaApi } from '../../../lib/agendaApi';
import { formatMoney } from '../../../lib/currency';
import { isValidVideoUrl } from '../../../lib/onlineSessions';

interface BookingSheetProps {
  booking: AgendaBooking | null;
  onClose: () => void;
  api: AgendaApi;
  profileId: string;
  bookings: AgendaBooking[];
  timezone: string;
  currency: string;
  hour12: boolean;
  now: Date;
  /** Reload the agenda after a change. */
  onChanged: () => void | Promise<void>;
  onToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  onViewClient: (booking: AgendaBooking) => void;
}

type Mode = 'view' | 'reschedule' | 'cancel';

const FIELD = 'h-12 w-full rounded-xl border border-gray-200 bg-white px-3.5 text-base text-[#1A1A1A] transition focus:border-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#1A1A1A]';
const PRIMARY = 'flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#1A1A1A] px-5 text-[15px] font-semibold text-white transition hover:opacity-90 active:scale-[0.99] disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2';
const SECONDARY = 'flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 text-[15px] font-semibold text-[#1A1A1A] transition hover:bg-gray-50 active:scale-[0.99] disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2';

/** Appointment details: contact, time, money, video link and the actions on its status. */
export default function BookingSheet({
  booking, onClose, api, profileId, bookings, timezone, currency, hour12, now, onChanged, onToast, onViewClient,
}: BookingSheetProps) {
  // Keep the last booking on screen while the sheet slides away.
  const [shown, setShown] = useState<AgendaBooking | null>(booking);
  useEffect(() => { if (booking) setShown(booking); }, [booking]);

  const [mode, setMode] = useState<Mode>('view');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [recording, setRecording] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const openId = booking?.id;
  useEffect(() => {
    setMode('view');
    setError(null);
    setCopied(false);
    setRecording(false);
    setBusy(false);
  }, [openId]);

  const b = shown;

  const newStart = useMemo(() => {
    const minutes = parseTimeInput(time);
    if (!date || minutes === null) return null;
    return zonedToUtc(date, minutes, timezone);
  }, [date, time, timezone]);

  const conflicts = useMemo(() => {
    if (!b || !newStart || mode !== 'reschedule') return [];
    return findConflicts(bookings, newStart, new Date(newStart.getTime() + b.durationMin * 60_000), b.id);
  }, [b, newStart, mode, bookings]);

  if (!b) return null;

  const meta = STATUS_META[b.status];
  const tone = TONE[meta.tone];
  const payment = paymentSummary(b);
  const day = dayKeyInTz(b.start, timezone);
  const startMin = minutesInTz(b.start, timezone);
  const active = b.status === 'pending' || b.status === 'confirmed' || b.status === 'paid';
  const started = b.start <= now;
  const videoOk = !!b.videoUrl && isValidVideoUrl(b.videoUrl);
  const firstName = b.clientName.trim().split(/\s+/)[0] || 'your client';

  const run = async (action: () => Promise<unknown>, success: string, closeAfter = true) => {
    setBusy(true);
    setError(null);
    try {
      const result = await action();
      if (result === 'conflict') {
        setError('That time overlaps another booking. Pick a different time.');
        return;
      }
      await onChanged();
      onToast(success);
      if (closeAfter) onClose();
      else setMode('view');
    } catch (err) {
      console.error('Agenda action failed:', err);
      setError('That did not work. Check your connection and try again.');
    } finally {
      setBusy(false);
    }
  };

  const startReschedule = () => {
    setDate(day);
    setTime(toTimeInput(startMin));
    setError(null);
    setMode('reschedule');
  };

  const copyLink = async () => {
    if (!b.videoUrl) return;
    try {
      await navigator.clipboard.writeText(b.videoUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onToast('Could not copy the link', 'error');
    }
  };

  const contact = [
    { label: 'Call', Icon: Phone, href: b.clientPhone ? `tel:${b.clientPhone.replace(/[^\d+]/g, '')}` : null, missing: 'No phone number' },
    { label: 'Text', Icon: MessageSquare, href: b.clientPhone ? `sms:${b.clientPhone.replace(/[^\d+]/g, '')}` : null, missing: 'No phone number' },
    { label: 'Email', Icon: Mail, href: b.clientEmail ? `mailto:${b.clientEmail}` : null, missing: 'No email' },
  ];

  const footer = mode === 'reschedule' ? (
    <div className="flex gap-3">
      <button type="button" className={SECONDARY} onClick={() => { setMode('view'); setError(null); }} disabled={busy}>Back</button>
      <button
        type="button"
        className={PRIMARY}
        disabled={busy || !newStart || conflicts.length > 0}
        onClick={() => newStart && void run(() => api.reschedule(b.id, newStart.toISOString()), 'Booking moved')}
      >
        {busy && <Loader2 className="h-4 w-4 animate-spin" />} Save new time
      </button>
    </div>
  ) : mode === 'cancel' ? (
    <div className="flex gap-3">
      <button type="button" className={SECONDARY} onClick={() => { setMode('view'); setError(null); }} disabled={busy}>Keep it</button>
      <button
        type="button"
        disabled={busy}
        onClick={() => void run(() => api.cancel(b.id), 'Booking cancelled')}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 text-[15px] font-semibold text-white transition hover:bg-red-700 active:scale-[0.99] disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
      >
        {busy && <Loader2 className="h-4 w-4 animate-spin" />} Cancel booking
      </button>
    </div>
  ) : b.status === 'pending' ? (
    <button type="button" className={PRIMARY} disabled={busy} onClick={() => void run(() => api.confirm(b.id), 'Booking confirmed')}>
      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Confirm booking
    </button>
  ) : active && started ? (
    <button type="button" className={PRIMARY} disabled={busy} onClick={() => void run(() => api.complete(b.id), 'Marked as completed')}>
      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Mark completed
    </button>
  ) : undefined;

  return (
    <Sheet
      open={!!booking}
      onClose={onClose}
      title={mode === 'reschedule' ? 'Move this booking' : mode === 'cancel' ? 'Cancel this booking?' : b.clientName || 'Client'}
      eyebrow={mode === 'view' ? (
        <span className="inline-flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full ${tone.dot}`} aria-hidden="true" />
          <span className={`font-semibold ${tone.text}`}>{meta.label}</span>
        </span>
      ) : `${b.clientName} · ${b.serviceName}`}
      footer={footer}
    >
      {mode === 'reschedule' && (
        <div className="space-y-4 pt-1">
          <p className="text-[15px] text-gray-500">
            Now on {formatDay(day, { weekday: 'long', month: 'long', day: 'numeric' })}, {formatRange(startMin, startMin + b.durationMin, hour12)}.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-[#1A1A1A]">New date</span>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={FIELD} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-[#1A1A1A]">New time</span>
              <input type="time" step={300} value={time} onChange={(e) => setTime(e.target.value)} className={FIELD} />
            </label>
          </div>
          {newStart && conflicts.length === 0 && (
            <p className="text-sm text-gray-500">
              {formatDay(dayKeyInTz(newStart, timezone), { weekday: 'long', month: 'long', day: 'numeric' })},{' '}
              {formatRange(minutesInTz(newStart, timezone), minutesInTz(newStart, timezone) + b.durationMin, hour12)}
            </p>
          )}
          {conflicts.length > 0 && (
            <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              Overlaps {conflicts[0].clientName}, {formatRange(minutesInTz(conflicts[0].start, timezone), minutesInTz(conflicts[0].start, timezone) + conflicts[0].durationMin, hour12)}. Pick another time.
            </p>
          )}
          <p className="text-[13px] leading-relaxed text-gray-500">Nelsy does not message {firstName} about the change, so send the new time yourself.</p>
          {error && <p role="alert" className="text-sm font-medium text-red-600">{error}</p>}
        </div>
      )}

      {mode === 'cancel' && (
        <div className="space-y-3 pt-1 text-[15px] leading-relaxed text-gray-600">
          <p>
            {b.serviceName} on {formatDay(day, { weekday: 'long', month: 'long', day: 'numeric' })} at {formatRange(startMin, startMin + b.durationMin, hour12).split(' to ')[0]}.
            The slot opens again for other clients.
          </p>
          <p>
            Nelsy does not message {firstName}, so tell them yourself.
            {payment.paid > 0 && ` The ${formatMoney(payment.paid, currency)} already paid is not refunded automatically.`}
          </p>
          {error && <p role="alert" className="text-sm font-medium text-red-600">{error}</p>}
        </div>
      )}

      {mode === 'view' && (
        <div className="space-y-5">
          <p className="-mt-1 text-[15px] text-gray-500">{b.serviceName} · {formatDuration(b.durationMin)}</p>

          {/* Contact */}
          <div className="grid grid-cols-3 gap-2.5">
            {contact.map(({ label, Icon, href, missing }) => href ? (
              <a key={label} href={href}
                className="flex h-16 flex-col items-center justify-center gap-1 rounded-2xl bg-gray-50 text-[13px] font-semibold text-[#1A1A1A] transition hover:bg-gray-100 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A]">
                <Icon className="h-5 w-5" aria-hidden="true" /> {label}
              </a>
            ) : (
              <span key={label} role="link" aria-disabled="true" aria-label={`${label}: ${missing}`} title={missing}
                className="flex h-16 flex-col items-center justify-center gap-1 rounded-2xl bg-gray-50 text-[13px] font-semibold text-gray-300">
                <Icon className="h-5 w-5" aria-hidden="true" /> {label}
              </span>
            ))}
          </div>

          {/* When and where */}
          <dl className="divide-y divide-gray-100 rounded-2xl border border-gray-100">
            <div className="flex items-start gap-3 px-4 py-3.5">
              <CalendarClock className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <div className="min-w-0">
                <dt className="sr-only">Date and time</dt>
                <dd className="text-[15px] font-semibold text-[#1A1A1A]">{formatDay(day, { weekday: 'long', month: 'long', day: 'numeric' })}</dd>
                <dd className="text-[14px] text-gray-500">{formatRange(startMin, startMin + b.durationMin, hour12)}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3 px-4 py-3.5">
              {b.online ? <Video className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#C2186F]" aria-hidden="true" /> : <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />}
              <div className="min-w-0 flex-1">
                <dt className="sr-only">Location</dt>
                <dd className="text-[15px] font-semibold text-[#1A1A1A]">{b.online ? 'Video call' : 'At your studio'}</dd>
                {b.online && (videoOk ? (
                  <dd className="mt-2.5 flex gap-2">
                    <a href={b.videoUrl!} target="_blank" rel="noopener noreferrer"
                      className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#1A1A1A] px-4 text-sm font-semibold text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2">
                      <Video className="h-4 w-4" aria-hidden="true" /> Join
                    </a>
                    <button type="button" onClick={() => void copyLink()}
                      className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 text-sm font-semibold text-[#1A1A1A] transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A]">
                      {copied ? <Check className="h-4 w-4 text-green-600" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                      <span aria-live="polite">{copied ? 'Copied' : 'Copy link'}</span>
                    </button>
                  </dd>
                ) : (
                  <dd className="text-[14px] text-gray-500">No link saved on this service. Send {firstName} your link.</dd>
                ))}
              </div>
            </div>
          </dl>

          {/* Money */}
          <div className="rounded-2xl border border-gray-100 px-4 py-3.5">
            <dl className="space-y-2 text-[15px]">
              <div className="flex items-center justify-between">
                <dt className="text-gray-500">Price</dt>
                <dd className="font-semibold tabular-nums text-[#1A1A1A]">{formatMoney(b.price, currency)}</dd>
              </div>
              {payment.state === 'deposit' && (
                <div className="flex items-center justify-between">
                  <dt className="text-gray-500">Deposit paid</dt>
                  <dd className="font-semibold tabular-nums text-[#1A1A1A]">{formatMoney(payment.paid, currency)}</dd>
                </div>
              )}
              {payment.state === 'paid' ? (
                <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                  <dt className="font-semibold text-[#1A1A1A]">Paid</dt>
                  <dd className="flex items-center gap-1.5 font-bold tabular-nums text-green-700"><Check className="h-4 w-4" aria-hidden="true" />{formatMoney(payment.paid, currency)}</dd>
                </div>
              ) : payment.state !== 'free' && (
                <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                  <dt className="font-semibold text-[#1A1A1A]">To pay at studio</dt>
                  <dd className="text-[17px] font-bold tabular-nums text-[#1A1A1A]">{formatMoney(payment.remaining, currency)}</dd>
                </div>
              )}
            </dl>
            {b.status !== 'cancelled' && b.status !== 'refunded' && payment.state !== 'free' && !recording && (
              <button
                type="button"
                onClick={() => (api.live ? setRecording(true) : onToast('Payments are not recorded in the sandbox', 'info'))}
                className="mt-3 flex h-11 w-full items-center justify-center rounded-xl border border-gray-200 text-sm font-semibold text-[#1A1A1A] transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A]"
              >
                {payment.remaining > 0 ? 'Record a payment' : 'See payments'}
              </button>
            )}
            {recording && api.live && (
              <div className="mt-3">
                <BookingPaymentPanel bookingId={b.id} profileId={profileId} price={b.price} currency={currency} onChanged={() => void onChanged()} />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100">
            {active && (
              <button type="button" onClick={startReschedule}
                className="flex min-h-[52px] w-full items-center gap-3 px-4 text-left text-[15px] font-semibold text-[#1A1A1A] transition hover:bg-gray-50 focus-visible:bg-gray-50 focus-visible:outline-none">
                <CalendarClock className="h-5 w-5 text-gray-400" aria-hidden="true" /> <span className="flex-1">Reschedule</span>
                <ChevronRight className="h-4 w-4 text-gray-300" aria-hidden="true" />
              </button>
            )}
            <button type="button" onClick={() => onViewClient(b)}
              className="flex min-h-[52px] w-full items-center gap-3 px-4 text-left text-[15px] font-semibold text-[#1A1A1A] transition hover:bg-gray-50 focus-visible:bg-gray-50 focus-visible:outline-none">
              <UserRound className="h-5 w-5 text-gray-400" aria-hidden="true" /> <span className="flex-1">View {firstName} in Customers</span>
              <ChevronRight className="h-4 w-4 text-gray-300" aria-hidden="true" />
            </button>
            {active && (
              <button type="button" onClick={() => { setError(null); setMode('cancel'); }}
                className="flex min-h-[52px] w-full items-center gap-3 px-4 text-left text-[15px] font-semibold text-red-600 transition hover:bg-red-50 focus-visible:bg-red-50 focus-visible:outline-none">
                <XCircle className="h-5 w-5" aria-hidden="true" /> <span className="flex-1">Cancel booking</span>
              </button>
            )}
          </div>

          {error && <p role="alert" className="text-sm font-medium text-red-600">{error}</p>}
        </div>
      )}
    </Sheet>
  );
}
