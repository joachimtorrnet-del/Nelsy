import { Video } from 'lucide-react';
import { formatDuration, formatMinutes, minutesInTz, paymentSummary, STATUS_META } from '../../lib/agenda';
import type { AgendaBooking } from '../../lib/agenda';
import { formatMoney } from '../../lib/currency';
import { TONE } from './agenda/tones';

interface BookingCardProps {
  booking: AgendaBooking;
  timezone: string;
  currency: string;
  hour12: boolean;
  onOpen: (booking: AgendaBooking) => void;
}

/** One appointment in the List view: time, client, service, status and what is left to pay. */
export function BookingCard({ booking, timezone, currency, hour12, onOpen }: BookingCardProps) {
  const meta = STATUS_META[booking.status];
  const tone = TONE[meta.tone];
  const payment = paymentSummary(booking);
  const inactive = booking.status === 'cancelled' || booking.status === 'refunded' || booking.status === 'no_show';
  const time = formatMinutes(minutesInTz(booking.start, timezone), hour12);

  return (
    <button
      type="button"
      onClick={() => onOpen(booking)}
      className="flex min-h-[76px] w-full items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 text-left transition hover:border-gray-200 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] active:scale-[0.99]"
    >
      <span className="w-[68px] flex-shrink-0">
        <span className="block text-[15px] font-bold tabular-nums leading-tight text-[#1A1A1A]">{time}</span>
        <span className="block text-[12px] text-gray-500">{formatDuration(booking.durationMin)}</span>
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5">
          <span className={`truncate text-[15px] font-semibold leading-tight text-[#1A1A1A] ${inactive ? 'line-through decoration-1 opacity-60' : ''}`}>
            {booking.clientName || 'Client'}
          </span>
          {booking.online && <Video className="h-4 w-4 flex-shrink-0 text-[#C2186F]" aria-label="Video call" />}
        </span>
        <span className="block truncate text-[13px] text-gray-500">{booking.serviceName}</span>
        <span className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-[12px] font-medium">
          <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${tone.dot}`} aria-hidden="true" />
          <span className={meta.tone === 'accent' ? 'text-gray-700' : tone.text}>{meta.label}</span>
          {!inactive && payment.state !== 'free' && (
            <span className="text-gray-500">
              · {payment.state === 'unpaid' ? payment.label
                : payment.state === 'deposit' ? `${formatMoney(payment.remaining, currency)} left`
                : payment.label}
            </span>
          )}
        </span>
        {booking.note && (
          <span className="mt-1 block truncate text-[12px] italic text-gray-500">{booking.note}</span>
        )}
      </span>

      <span className={`flex-shrink-0 text-[15px] font-bold tabular-nums text-[#1A1A1A] ${inactive ? 'opacity-50' : ''}`}>
        {formatMoney(booking.price, currency)}
      </span>
    </button>
  );
}
