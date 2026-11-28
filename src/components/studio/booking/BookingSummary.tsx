import { CalendarDays, Clock, Video, MapPin } from 'lucide-react';
import type { Merchant, Service } from '@/types';
import { useMoney } from '@/lib/currency';
import { formatDate, getInitials } from '@/lib/utils';
import { addMinutes } from './availability';

/** What the selected offer charges online and what is left for the day. Mirrors create-payment-intent. */
export interface PaymentPlan {
  payOnArrival: boolean;
  hasDeposit: boolean;
  /** Amount charged online now (0 for pay on arrival). */
  dueToday: number;
  /** Amount left to pay in person (or at the session). */
  remainder: number;
  /** "Cash", "Card" or "Cash or card". */
  onSiteLabel: string;
  /** "at the studio" / "at the session". */
  payPlace: string;
}

interface Props {
  merchant: Merchant;
  service: Service;
  plan: PaymentPlan;
  selectedDate: string | null;
  selectedTime: string | null;
  online: boolean;
  /** Timezone label, shown for online sessions only. */
  timezone?: string | null;
  /** Hide the studio header (mobile, where the page behind already shows it). */
  showStudio?: boolean;
}

export function BookingSummary({ merchant, service, plan, selectedDate, selectedTime, online, timezone, showStudio = true }: Props) {
  const money = useMoney();
  const studioName = merchant.salon_name || merchant.name;

  return (
    <div className="text-sm" data-testid="booking-summary">
      {showStudio && (
        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-200">
          {merchant.logo_url ? (
            <img src={merchant.logo_url} alt="" className="w-11 h-11 rounded-full object-cover flex-shrink-0" />
          ) : (
            <span
              className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{ backgroundColor: 'var(--bk-soft)', color: 'var(--bk-ink)' }}
              aria-hidden="true"
            >
              {getInitials(studioName)}
            </span>
          )}
          <div className="min-w-0">
            <p className="font-bold text-gray-900 truncate">{studioName}</p>
            {merchant.location && !online && (
              <p className="text-xs text-gray-500 truncate flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                {merchant.location}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Service */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold text-gray-900 leading-snug">{service.name}</p>
          <p className="text-[13px] text-gray-500 mt-1 flex items-center gap-1.5 flex-wrap">
            <span>{service.duration} min</span>
            {online && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-700">
                <Video className="w-3 h-3" aria-hidden="true" /> Video call
              </span>
            )}
          </p>
        </div>
        <p className="font-semibold text-gray-900 tabular-nums flex-shrink-0">{money(service.price)}</p>
      </div>

      {/* Date + time */}
      <div className="mt-4 space-y-2">
        <p className="flex items-center gap-2.5">
          <CalendarDays className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--bk-ink)' }} aria-hidden="true" />
          {selectedDate
            ? <span className="font-medium text-gray-900">{formatDate(selectedDate)}</span>
            : <span className="text-gray-400">Choose a day</span>}
        </p>
        <p className="flex items-center gap-2.5">
          <Clock className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--bk-ink)' }} aria-hidden="true" />
          {selectedTime
            ? <span className="font-medium text-gray-900 tabular-nums">{selectedTime} to {addMinutes(selectedTime, service.duration)}</span>
            : <span className="text-gray-400">Choose a time</span>}
        </p>
        {online && timezone && (
          <p className="text-xs text-gray-500 pl-[26px]">Times are in {timezone}</p>
        )}
      </div>

      {/* Price breakdown */}
      <dl className="mt-4 pt-4 border-t border-gray-200 space-y-2">
        {(plan.hasDeposit || plan.payOnArrival) && (
          <div className="flex justify-between gap-3 text-gray-600">
            <dt>Service total</dt>
            <dd className="tabular-nums">{money(service.price)}</dd>
          </div>
        )}
        <div className="flex justify-between gap-3 items-baseline">
          <dt className="font-bold text-gray-900">
            {plan.hasDeposit ? 'Deposit due today' : 'Due today'}
            {plan.payOnArrival && <span className="block text-xs font-normal text-gray-500">Nothing to pay now</span>}
          </dt>
          <dd className="font-bold text-lg tabular-nums" style={{ color: 'var(--bk-ink)' }} data-testid="due-today">
            {money(plan.dueToday)}
          </dd>
        </div>
        {plan.remainder > 0 && (
          <div className="flex justify-between gap-3 text-gray-600">
            <dt>
              To pay {plan.payPlace}
              <span className="block text-xs text-gray-500">{plan.onSiteLabel}</span>
            </dt>
            <dd className="tabular-nums" data-testid="pay-later">{money(plan.remainder)}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
