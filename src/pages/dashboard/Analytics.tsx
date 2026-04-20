import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { calculateStats, getBookings, getPageViewStats } from '../../lib/supabase-queries';
import type { PageViewStats } from '../../lib/supabase-queries';
import { ChartSkeleton, CardSkeleton } from '../../components/dashboard/SkeletonLoader';

interface Profile {
  id?: string;
  full_name?: string;
}

type TimeRange = '7' | '30' | '90';

const SOURCE_LABELS: Record<string, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  direct: 'Direct link',
  other: 'Other',
};

const SOURCE_COLORS: Record<string, string> = {
  instagram: 'bg-gradient-to-r from-purple-500 to-pink-500',
  tiktok: 'bg-black',
  direct: 'bg-[#F52B8C]',
  other: 'bg-gray-400',
};

interface StatsState {
  bookings: number;
  revenue: number;
  revenueGrowth: number;
  revenueData: { date: string; amount: number }[];
  pageViews: PageViewStats | null;
}

const DEFAULT_STATS: StatsState = {
  bookings: 0,
  revenue: 0,
  revenueGrowth: 0,
  revenueData: [],
  pageViews: null,
};

export default function Analytics({ profile }: { profile: Profile | null }) {
  const [timeRange, setTimeRange] = useState<TimeRange>('7');
  const [initialLoading, setInitialLoading] = useState(true);
  const [stats, setStats] = useState<StatsState>(DEFAULT_STATS);

  useEffect(() => {
    if (profile?.id) loadAnalytics(); else setInitialLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id, timeRange]);

  const loadAnalytics = async () => {
    if (!profile?.id) return;
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - parseInt(timeRange));

      const [statsData, { data: bookings }, pageViews] = await Promise.all([
        calculateStats(profile.id),
        getBookings(profile.id, startDate, endDate),
        getPageViewStats(profile.id, startDate, endDate),
      ]);

      const days = parseInt(timeRange);
      const dayList = Array.from({ length: days }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (days - 1 - i));
        return d.toISOString().split('T')[0];
      });

      const revenueByDay = new Map(dayList.map((day) => [day, 0]));
      (bookings ?? []).forEach((b) => {
        const day = (b.booking_datetime as string).split('T')[0];
        if (revenueByDay.has(day)) {
          revenueByDay.set(day, (revenueByDay.get(day) ?? 0) + parseFloat(String(b.price_total ?? 0)));
        }
      });

      const revenueData = Array.from(revenueByDay.entries()).map(([date]) => {
        const d = new Date(date);
        return {
          date: `${d.toLocaleDateString('en-US', { month: 'short' })} ${d.getDate().toString().padStart(2, '0')}`,
          amount: revenueByDay.get(date) ?? 0,
        };
      });

      setStats({
        bookings: bookings?.length ?? 0,
        revenue: statsData?.monthRevenue ?? 0,
        revenueGrowth: statsData?.growth ?? 0,
        revenueData,
        pageViews,
      });
    } catch (err) {
      console.error('Error loading analytics:', err);
    } finally {
      setInitialLoading(false);
    }
  };

  // Date range display
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - parseInt(timeRange));
  const fmtDate = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const growth = stats.revenueGrowth;
  const totalViews = stats.pageViews?.total ?? 0;
  const bySource = stats.pageViews?.bySource;

  // Traffic source rows — only show sources with data, or all 4 if no data yet
  const trafficRows = bySource
    ? Object.entries(bySource).sort(([, a], [, b]) => b - a)
    : [];

  if (initialLoading) {
    return (
      <div className="px-4 py-6 space-y-4">
        <div className="h-8 w-32 bg-gray-100 rounded animate-pulse" />
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => <CardSkeleton key={i} />)}
        </div>
        <ChartSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="px-4 pt-5 space-y-5">

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>

        {/* Period Selector */}
        <div className="flex bg-gray-100 p-1 rounded-2xl gap-1">
          {([{ value: '7', label: '7 days' }, { value: '30', label: '30 days' }, { value: '90', label: '90 days' }] as const).map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                timeRange === range.value
                  ? 'bg-[#F52B8C] text-white shadow-sm shadow-[#F52B8C]/30'
                  : 'text-gray-500'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* Date Range */}
        <div className="flex items-center gap-2">
          <div className="flex-1 py-2.5 px-3 bg-gray-50 rounded-xl text-sm text-gray-600 text-center font-medium">
            {fmtDate(startDate)}
          </div>
          <span className="text-gray-400 font-medium">—</span>
          <div className="flex-1 py-2.5 px-3 bg-gray-50 rounded-xl text-sm text-gray-600 text-center font-medium">
            {fmtDate(endDate)}
          </div>
        </div>

        {/* 3-Metric Row */}
        <div className="flex gap-2">
          {/* Visits */}
          <div className="flex-1 p-3.5 bg-gray-50 rounded-2xl">
            <p className="text-gray-400 text-xs mb-1.5">Visits</p>
            <p className="text-2xl font-bold text-gray-900">{totalViews > 0 ? totalViews : '—'}</p>
          </div>

          {/* Revenue — highlighted */}
          <div className="flex-1 p-3.5 border-2 border-[#F52B8C] rounded-2xl">
            <div className="flex items-center gap-1 mb-1.5">
              <p className="text-gray-400 text-xs">Revenue</p>
              {growth !== 0 && (
                <div className={`flex items-center gap-0.5 ${growth > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {growth > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span className="text-xs font-semibold">{Math.abs(growth)}%</span>
                </div>
              )}
            </div>
            <p className="text-2xl font-bold text-gray-900">€{stats.revenue.toFixed(0)}</p>
          </div>

          {/* Bookings */}
          <div className="flex-1 p-3.5 bg-gray-50 rounded-2xl">
            <p className="text-gray-400 text-xs mb-1.5">Bookings</p>
            <p className="text-2xl font-bold text-gray-900">{stats.bookings}</p>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-gray-50 rounded-2xl p-4">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={stats.revenueData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <XAxis
                dataKey="date"
                tick={{ fontSize: 9, fill: '#9ca3af' }}
                tickLine={false}
                axisLine={false}
                interval={timeRange === '7' ? 0 : timeRange === '30' ? 6 : 14}
              />
              <YAxis
                tick={{ fontSize: 9, fill: '#9ca3af' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `€${v}`}
              />
              <Tooltip
                contentStyle={{
                  background: '#fff',
                  border: '1px solid #f3f4f6',
                  borderRadius: '10px',
                  fontSize: '11px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
                formatter={(value) => [`€${Number(value ?? 0).toFixed(2)}`, 'Revenue']}
                labelStyle={{ color: '#6b7280' }}
                cursor={{ fill: 'rgba(245,43,140,0.05)' }}
              />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]} maxBarSize={32}>
                {stats.revenueData.map((_, index) => (
                  <Cell key={index} fill="#F52B8C" fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic Sources */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Where do my clients come from?</h3>

          {totalViews === 0 ? (
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <p className="text-gray-400 text-sm">No visits recorded for this period.</p>
              <p className="text-gray-400 text-xs mt-1">Share your Nelsy link to start tracking.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {trafficRows.map(([sourceKey, count]) => {
                const pct = totalViews > 0 ? Math.round((count / totalViews) * 100) : 0;
                return (
                  <div key={sourceKey}>
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-sm text-gray-700">{SOURCE_LABELS[sourceKey] ?? sourceKey}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {count} <span className="text-gray-400 font-normal">({pct}%)</span>
                      </p>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${SOURCE_COLORS[sourceKey] ?? 'bg-gray-400'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
