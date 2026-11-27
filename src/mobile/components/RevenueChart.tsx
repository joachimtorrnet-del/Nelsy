import { PINK } from '../lib/constants';

/** Daily revenue as slim bars (bookings are sparse, so bars read better than a line). `points` are oldest first. */
export function RevenueChart({ points, labels }: { points: number[]; labels: [string, string] }) {
  const max = Math.max(...points, 1);
  const empty = points.every((p) => p === 0);

  return (
    <div>
      <div className="relative flex h-[110px] items-end gap-[3px]" role="img" aria-label="Revenue per day">
        <div className="pointer-events-none absolute inset-x-0 top-1/3 border-t border-dashed border-gray-100" />
        <div className="pointer-events-none absolute inset-x-0 top-2/3 border-t border-dashed border-gray-100" />
        {points.map((v, i) => (
          <div
            key={i}
            className="relative flex-1 rounded-t-[3px]"
            style={{
              height: v > 0 ? `${Math.max(6, (v / max) * 100)}%` : 3,
              backgroundColor: v > 0 ? PINK : '#EFEFEF',
              opacity: v > 0 ? 1 : 0.9,
            }}
          />
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-[11px] text-gray-400">
        <span>{labels[0]}</span>
        {empty && <span>No revenue yet</span>}
        <span>{labels[1]}</span>
      </div>
    </div>
  );
}
