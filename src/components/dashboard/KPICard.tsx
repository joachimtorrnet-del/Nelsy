import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { ReactNode } from 'react';

interface KPICardProps {
  icon: LucideIcon;
  iconColor: string;
  label: string;
  value: string;
  trend?: number;
  subtitle?: string;
  progress?: number;
  insight?: string;
  action?: ReactNode;
  sparkline?: number[];
  delay?: number;
}

export function KPICard({
  icon: Icon,
  iconColor,
  label,
  value,
  trend,
  subtitle,
  progress,
  insight,
  action,
  sparkline,
  delay = 0,
}: KPICardProps) {
  return (
    <motion.div
      className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ boxShadow: '0 10px 30px rgba(0,0,0,0.08)', y: -2 }}
    >
      <div className="flex items-center justify-between">
        <div className={`w-10 h-10 rounded-2xl ${iconColor} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${trend >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {trend >= 0
              ? <TrendingUp className="w-4 h-4" />
              : <TrendingDown className="w-4 h-4" />
            }
            {trend >= 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>

      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
        <p className="text-3xl font-black text-espresso leading-none">{value}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-1.5">{subtitle}</p>}
      </div>

      {progress !== undefined && (
        <div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, delay: delay + 0.3, ease: 'easeOut' }}
            />
          </div>
          {insight && <p className="text-xs text-gray-400 mt-2">{insight}</p>}
        </div>
      )}

      {sparkline && sparkline.length > 0 && (
        <Sparkline data={sparkline} />
      )}

      {action && <div>{action}</div>}
    </motion.div>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const height = 40;
  const width = 120;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  });

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id="sparkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
      </defs>
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke="url(#sparkGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
