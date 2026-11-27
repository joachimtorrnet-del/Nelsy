import { useMoney } from '@/lib/currency';
import type { ProBooking } from '../lib/types';
import { StatusChip, VideoBadge } from './ui';
import { fmtDay, fmtTime } from '../lib/format';

export function BookingRow({ b, tz, showDate, onClick }: { b: ProBooking; tz: string; showDate?: boolean; onClick?: () => void }) {
  const money = useMoney();
  return (
    <button type="button" onClick={onClick} className="flex min-h-[64px] w-full items-center gap-3 py-2.5 text-left active:bg-gray-50">
      <div className="w-[70px] shrink-0 whitespace-nowrap">
        <p className="text-[14px] font-bold text-[#1A1A1A]">{fmtTime(b.datetime, tz)}</p>
        <p className="text-[12px] text-gray-400">{showDate ? fmtDay(b.datetime, tz) : `${b.duration} min`}</p>
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold text-[#1A1A1A]">{b.clientName}</p>
        <p className="truncate text-[13px] text-gray-500">
          {b.serviceName} · {money(b.price)}
        </p>
        {b.online && (
          <span className="mt-1 block">
            <VideoBadge />
          </span>
        )}
      </div>
      <StatusChip status={b.status} />
    </button>
  );
}
