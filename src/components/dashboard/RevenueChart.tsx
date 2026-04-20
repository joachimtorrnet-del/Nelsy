import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { DayRevenue } from '../../types';
import { formatShortDate } from '../../lib/utils';

interface RevenueChartProps {
  data: DayRevenue[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const { points, pathD, areaD, maxRevenue, labels } = useMemo(() => {
    const max = Math.max(...data.map((d) => d.revenue), 1);
    const W = 600;
    const H = 160;
    const pad = { top: 16, right: 8, bottom: 8, left: 8 };
    const innerW = W - pad.left - pad.right;
    const innerH = H - pad.top - pad.bottom;

    const pts = data.map((d, i) => ({
      x: pad.left + (i / (data.length - 1)) * innerW,
      y: pad.top + innerH - (d.revenue / max) * innerH,
      revenue: d.revenue,
      date: d.date,
    }));

    // Smooth curve via cubic bezier
    const pathParts = pts.map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = pts[i - 1];
      const cx = (prev.x + p.x) / 2;
      return `C ${cx} ${prev.y} ${cx} ${p.y} ${p.x} ${p.y}`;
    });

    const areaParts = [
      ...pathParts,
      `L ${pts[pts.length - 1].x} ${H}`,
      `L ${pts[0].x} ${H}`,
      'Z',
    ];

    // Show every 5th label
    const lbls = pts.filter((_, i) => i % 5 === 0 || i === data.length - 1);

    return {
      points: pts,
      pathD: pathParts.join(' '),
      areaD: areaParts.join(' '),
      maxRevenue: max,
      labels: lbls,
    };
  }, [data]);

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-espresso">Évolution du CA Net</h2>
        <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full font-medium">
          30 derniers jours
        </span>
      </div>

      <div className="w-full overflow-hidden">
        <svg
          viewBox={`0 0 600 180`}
          className="w-full"
          aria-label="Graphique d'évolution du CA"
        >
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="100%" stopColor="#764ba2" />
            </linearGradient>
            <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#667eea" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#764ba2" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines */}
          {[0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = 16 + (1 - ratio) * 144;
            const val = Math.round(maxRevenue * ratio);
            return (
              <g key={ratio}>
                <line x1="8" y1={y} x2="592" y2={y} stroke="#f3f4f6" strokeWidth="1" />
                <text x="596" y={y + 4} textAnchor="end" fill="#9ca3af" fontSize="10">
                  {val}€
                </text>
              </g>
            );
          })}

          {/* Area fill */}
          <motion.path
            d={areaD}
            fill="url(#areaGrad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />

          {/* Line */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          {/* Data points */}
          {points.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="3"
              fill="white"
              stroke="url(#lineGrad)"
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.02 }}
            />
          ))}

          {/* X axis labels */}
          {labels.map((p) => (
            <text
              key={p.date}
              x={p.x}
              y="175"
              textAnchor="middle"
              fill="#9ca3af"
              fontSize="9"
            >
              {formatShortDate(p.date)}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
