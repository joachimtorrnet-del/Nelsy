import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  TrendingDown, TrendingUp, Eye, CalendarDays, Wallet, ChevronRight,
  Plus, AlertCircle, RefreshCw, CheckCircle2, Circle,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '../../lib/supabase';
import type { DbProfileRow, DbBookingRow } from '../../lib/supabase';
import { getBookings, getPageViewStats } from '../../lib/supabase-queries';
import { LoadingScreen } from '../../components/dashboard/SkeletonLoader';
import { useToast } from '../../hooks/useToast';
import Toast from '../../components/dashboard/Toast';
import AddBookingModal from '../../components/dashboard/AddBookingModal';

interface Service {
  id: string;
  name: string;
  price_total?: number;
  price?: number;
  duration_minutes?: number;
  deposit_amount?: number;
}

interface ChartPoint { day: string; revenue: number }
type ChartRange = '7d' | '30d' | '90d';

const RANGE_DAYS: Record<ChartRange, number> = { '7d': 7, '30d': 30, '90d': 90 };

const RANGE_LABELS: Record<ChartRange, string> = {
  '7d': 'Last 7 days',
  '30d': 'Last 30 days',
  '90d': 'Last 90 days',
};

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; border: string; avatar: string }> = {
  pending:   { label: 'Awaiting payment', bg: 'bg-yellow-50',  text: 'text-yellow-700',  border: 'border-yellow-200', avatar: 'from-orange-400 to-amber-500' },
  paid:      { label: 'Paid',             bg: 'bg-green-50',   text: 'text-green-700',   border: 'border-green-200',  avatar: 'from-green-400 to-emerald-500' },
  confirmed: { label: 'Paid',             bg: 'bg-green-50',   text: 'text-green-700',   border: 'border-green-200',  avatar: 'from-green-400 to-emerald-500' },
  completed: { label: 'Completed',        bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-200',   avatar: 'from-blue-400 to-indigo-500' },
  cancelled: { label: 'Cancelled',        bg: 'bg-gray-100',   text: 'text-gray-500',    border: 'border-gray-200',   avatar: 'from-gray-300 to-gray-400' },
  refunded:  { label: 'Refunded',         bg: 'bg-red-50',     text: 'text-red-600',     border: 'border-red-200',    avatar: 'from-red-400 to-rose-500' },
};

const PAID_STATUSES = new Set(['paid', 'confirmed', 'completed']);

function buildChartData(bookings: DbBookingRow[], days: number): ChartPoint[] {
  const map = new Map<string, number>();
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    map.set(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), 0);
  }
  const cutoff = new Date(now);
  cutoff.setDate(cutoff.getDate() - days);
  for (const b of bookings) {
    if (!PAID_STATUSES.has(b.status ?? '')) continue;
    const dt = new Date(b.booking_datetime);
    if (dt < cutoff) continue;
    const key = dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (map.has(key)) map.set(key, (map.get(key) ?? 0) + Number(b.price_total ?? 0));
  }
  return Array.from(map.entries()).map(([day, revenue]) => ({ day, revenue }));
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function GrowthBadge({ pct }: { pct: number }) {
  if (pct === 0) return null;
  const up = pct > 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${up ? 'text-green-600' : 'text-red-500'}`}>
      {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      {up ? '+' : ''}{pct}%
    </span>
  );
}

export default function Home({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const [profile, setProfile] = useState<DbProfileRow | null>(null);
  const [allBookings, setAllBookings] = useState<DbBookingRow[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<DbBookingRow[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [profileId, setProfileId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddBooking, setShowAddBooking] = useState(false);
  const [chartRange, setChartRange] = useState<ChartRange>('30d');
  const [storeViews, setStoreViews] = useState<number | null>(null);
  const [balance, setBalance] = useState<{ available: number; pending: number } | null>(null);
  const [serviceCount, setServiceCount] = useState(0);
  const [stripeReady, setStripeReady] = useState(false);

  const { toast, showSuccess, hideToast } = useToast();
  const currency = (profile?.business_currency ?? 'EUR').toUpperCase();

  // ── Period-derived KPIs (computed from cached allBookings) ───────────────
  const periodKpis = useMemo(() => {
    const days = RANGE_DAYS[chartRange];
    const now = new Date();
    const cutoff = new Date(now);
    cutoff.setDate(cutoff.getDate() - days);
    cutoff.setHours(0, 0, 0, 0);
    const prevCutoff = new Date(cutoff);
    prevCutoff.setDate(prevCutoff.getDate() - days);

    const current = allBookings.filter((b) => PAID_STATUSES.has(b.status ?? '') && new Date(b.booking_datetime) >= cutoff);
    const prev    = allBookings.filter((b) => PAID_STATUSES.has(b.status ?? '') && new Date(b.booking_datetime) >= prevCutoff && new Date(b.booking_datetime) < cutoff);

    const periodRevenue  = current.reduce((s, b) => s + Number(b.price_total ?? 0), 0);
    const prevRevenue    = prev.reduce((s, b) => s + Number(b.price_total ?? 0), 0);
    const revenueGrowth  = prevRevenue === 0 ? (periodRevenue > 0 ? 100 : 0) : Math.round(((periodRevenue - prevRevenue) / prevRevenue) * 100);
    const bookingCount   = current.length;
    const prevCount      = prev.length;
    const bookingGrowth  = prevCount === 0 ? (bookingCount > 0 ? 100 : 0) : Math.round(((bookingCount - prevCount) / prevCount) * 100);

    return { periodRevenue, revenueGrowth, bookingCount, bookingGrowth };
  }, [allBookings, chartRange]);

  const chartData = useMemo(
    () => buildChartData(allBookings, RANGE_DAYS[chartRange]),
    [allBookings, chartRange],
  );

  // ── Re-fetch studio views when period changes ────────────────────────────
  useEffect(() => {
    if (!profileId) return;
    const days = RANGE_DAYS[chartRange];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    getPageViewStats(profileId, startDate).then((s) => setStoreViews(s.total)).catch(() => setStoreViews(null));
  }, [profileId, chartRange]);

  // ── Initial data load ────────────────────────────────────────────────────
  const loadData = useCallback(async () => {
    setError(null);
    if (!supabase) return;
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) return;
      setProfileId(authUser.id);

      const [
        { data: profileData },
        { data: allBookingsData },
        { data: balanceData },
        { data: servicesData },
        { count: svcCount },
      ] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', authUser.id).single(),
        supabase.from('bookings').select('*').eq('profile_id', authUser.id).order('booking_datetime', { ascending: true }),
        supabase.from('pro_balance').select('available_balance, pending_balance').eq('profile_id', authUser.id).maybeSingle(),
        supabase.from('services').select('id, name, price_total, price, duration_minutes, deposit_amount').eq('profile_id', authUser.id).eq('active', true),
        supabase.from('services').select('id', { count: 'exact', head: true }).eq('profile_id', authUser.id).eq('active', true),
      ]);

      setProfile(profileData as DbProfileRow);
      setAllBookings((allBookingsData ?? []) as DbBookingRow[]);
      setServices((servicesData ?? []) as Service[]);
      setServiceCount(svcCount ?? 0);
      setBalance({
        available: Number(balanceData?.available_balance ?? 0),
        pending:   Number(balanceData?.pending_balance ?? 0),
      });
      setStripeReady(!!(profileData as DbProfileRow)?.stripe_account_id && !!(profileData as DbProfileRow)?.stripe_onboarding_complete);

      // Upcoming appointments: today → next 30 days
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const in30 = new Date();
      in30.setDate(in30.getDate() + 30);
      in30.setHours(23, 59, 59, 999);
      const { data: upcoming } = await getBookings(authUser.id, todayStart, in30);
      setUpcomingBookings((upcoming ?? []).filter((b) => b.status !== 'cancelled' && b.status !== 'refunded') as DbBookingRow[]);
    } catch (err) {
      console.error('Home load error:', err);
      setError('Failed to load your dashboard. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  if (loading) return <LoadingScreen message="Loading your dashboard..." />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 gap-4">
        <AlertCircle className="w-10 h-10 text-red-400" />
        <p className="text-gray-700 font-semibold">{error}</p>
        <button
          onClick={() => { setLoading(true); loadData(); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#F52B8C] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition"
        >
          <RefreshCw className="w-4 h-4" /> Try again
        </button>
      </div>
    );
  }

  if (!profile) return null;

  const displayFirstName = (profile.full_name || profile.salon_name || 'there').split(' ')[0];
  const servicesMap = new Map(services.map((s) => [s.id, s]));

  // Setup steps — reflect real data only
  const isPublished = ['active', 'trialing', 'trial'].includes(profile.subscription_status ?? '');
  const setupSteps = [
    {
      id: 'profile',
      label: 'Complete your profile',
      done: !!(profile.full_name && profile.bio),
      action: () => onNavigate?.('settings'),
    },
    {
      id: 'service',
      label: 'Add your first service',
      done: serviceCount > 0,
      action: () => onNavigate?.('preview'),
    },
    {
      id: 'payments',
      label: 'Set up payments',
      done: stripeReady,
      action: () => onNavigate?.('stripe'),
    },
    {
      id: 'publish',
      label: 'Publish your studio',
      done: isPublished,
      action: () => { window.location.href = '/onboarding?step=plan'; },
    },
  ];
  const allSetupDone = setupSteps.every((s) => s.done);
  const setupDoneCount = setupSteps.filter((s) => s.done).length;

  return (
    <div className="bg-white min-h-full pb-8 lg:pb-12">
      <div className="w-full max-w-[1400px] mx-auto px-4 py-5 lg:px-8 lg:py-7">

        {/* ── Greeting + Period Selector ───────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-[#1A1A1A]">
              Hey {displayFirstName}, welcome back!
            </h2>
            <p className="text-sm text-gray-400 mt-0.5">{RANGE_LABELS[chartRange]}</p>
          </div>
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 self-start sm:self-auto">
            {(['7d', '30d', '90d'] as ChartRange[]).map((r) => (
              <button
                key={r}
                onClick={() => setChartRange(r)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  chartRange === r
                    ? 'bg-white text-[#1A1A1A] shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {r === '7d' ? 'Last 7 days' : r === '30d' ? 'Last 14 days' : 'Last 90 days'}
              </button>
            ))}
          </div>
        </div>

        {/* ── Setup checklist — only if not fully configured ───────────── */}
        {!allSetupDone && (
          <div className="mb-6 bg-[#fff8fa] border border-pink-100 rounded-2xl p-4 lg:p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-[#1A1A1A] text-sm">
                Get your studio ready — {setupDoneCount}/{setupSteps.length} steps done
              </p>
              <div className="w-24 h-1.5 bg-pink-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F52B8C] rounded-full transition-all"
                  style={{ width: `${(setupDoneCount / setupSteps.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {setupSteps.map(({ id, label, done, action }) => (
                <button
                  key={id}
                  onClick={() => !done && action()}
                  disabled={done}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-all ${
                    done
                      ? 'bg-white text-gray-400 cursor-default'
                      : 'bg-white border border-pink-100 text-[#1A1A1A] hover:border-[#F52B8C] hover:shadow-sm'
                  }`}
                >
                  {done
                    ? <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    : <Circle className="w-4 h-4 text-gray-300 flex-shrink-0" />
                  }
                  <span className={done ? 'line-through' : 'font-medium'}>{label}</span>
                  {!done && <ChevronRight className="w-4 h-4 text-[#F52B8C] ml-auto flex-shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── KPI Cards ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {/* Studio Visits */}
          <div className="bg-gray-50 rounded-2xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Studio visits</span>
              <Eye className="w-4 h-4 text-gray-300" />
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] leading-none">
              {storeViews !== null ? storeViews.toLocaleString() : '—'}
            </p>
            <button
              onClick={() => onNavigate?.('analytics')}
              className="text-xs text-[#F52B8C] font-semibold hover:opacity-75 transition text-left"
            >
              View analytics →
            </button>
          </div>

          {/* Bookings */}
          <div className="bg-gray-50 rounded-2xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Bookings</span>
              <CalendarDays className="w-4 h-4 text-gray-300" />
            </div>
            <div className="flex items-end gap-2">
              <p className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] leading-none">
                {periodKpis.bookingCount}
              </p>
              <GrowthBadge pct={periodKpis.bookingGrowth} />
            </div>
            <button
              onClick={() => onNavigate?.('calendar')}
              className="text-xs text-[#F52B8C] font-semibold hover:opacity-75 transition text-left"
            >
              View calendar →
            </button>
          </div>

          {/* Revenue */}
          <div className="col-span-2 lg:col-span-1 bg-[#fff8fa] border border-pink-100 rounded-2xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Revenue</span>
              <Wallet className="w-4 h-4 text-[#F52B8C]/40" />
            </div>
            <div className="flex items-end gap-2">
              <p className="text-2xl lg:text-3xl font-bold text-[#F52B8C] leading-none">
                {formatCurrency(periodKpis.periodRevenue, currency)}
              </p>
              <GrowthBadge pct={periodKpis.revenueGrowth} />
            </div>
            <button
              onClick={() => onNavigate?.('revenue')}
              className="text-xs text-[#F52B8C] font-semibold hover:opacity-75 transition text-left"
            >
              View income →
            </button>
          </div>
        </div>

        {/* ── Chart + Balance side-by-side on desktop ──────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">

          {/* Revenue chart */}
          <div className="flex-1 bg-gray-50 rounded-2xl p-4 lg:p-5 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Revenue · {currency}</p>
                <p className="text-xl font-bold text-[#1A1A1A] mt-0.5">
                  {formatCurrency(periodKpis.periodRevenue, currency)}
                </p>
              </div>
            </div>

            {chartData.every((p) => p.revenue === 0) ? (
              <div className="flex items-center justify-center h-[180px] lg:h-[260px] text-gray-400 text-sm">
                No revenue yet for this period
              </div>
            ) : (
              <div className="h-[180px] lg:h-[260px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="rGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#F52B8C" stopOpacity={0.18} />
                        <stop offset="95%" stopColor="#F52B8C" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 10, fill: '#9ca3af' }}
                      tickLine={false}
                      axisLine={false}
                      interval={chartRange === '7d' ? 1 : chartRange === '30d' ? 6 : 14}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: '#9ca3af' }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `${v}`}
                      domain={[0, (max: number) => max === 0 ? 10 : Math.ceil(max * 1.25)]}
                      width={40}
                    />
                    <Tooltip
                      contentStyle={{
                        background: '#fff',
                        border: '1px solid #f3f4f6',
                        borderRadius: '12px',
                        fontSize: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      }}
                      formatter={(v) => [formatCurrency(Number(v ?? 0), currency), 'Revenue']}
                      labelStyle={{ color: '#6b7280', fontWeight: 500 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#F52B8C"
                      strokeWidth={2}
                      fill="url(#rGrad)"
                      dot={false}
                      activeDot={{ r: 4, fill: '#F52B8C', stroke: '#fff', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Payment summary */}
          <div className="lg:w-64 flex-shrink-0 bg-[#1A1A1A] rounded-2xl p-5 flex flex-col justify-between gap-4">
            <div>
              <p className="text-white/50 text-[11px] font-medium uppercase tracking-wider mb-4">
                Current balance
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-white/50 text-xs mb-1">Available</p>
                  <p className="text-white text-2xl font-bold tracking-tight">
                    {formatCurrency(balance?.available ?? 0, currency)}
                  </p>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-white/50 text-xs mb-1">Pending</p>
                  <p className="text-white text-xl font-bold tracking-tight">
                    {formatCurrency(balance?.pending ?? 0, currency)}
                  </p>
                </div>
              </div>
            </div>

            {!stripeReady && (
              <div className="bg-white/10 rounded-xl px-3 py-2.5">
                <p className="text-white/80 text-xs font-medium">
                  Connect Stripe to receive payouts
                </p>
              </div>
            )}

            <button
              onClick={() => onNavigate?.('revenue')}
              className="w-full py-2.5 bg-[#F52B8C] text-white rounded-xl text-sm font-bold hover:opacity-90 transition"
            >
              View income →
            </button>
          </div>
        </div>

        {/* ── Upcoming appointments ────────────────────────────────────────── */}
        <div className="bg-gray-50 rounded-2xl p-4 lg:p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-[#1A1A1A]">Upcoming appointments</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate?.('calendar')}
                className="text-sm text-gray-500 font-medium hover:text-[#1A1A1A] transition"
              >
                View calendar
              </button>
              <button
                onClick={() => setShowAddBooking(true)}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#F52B8C] text-white rounded-lg text-xs font-bold hover:opacity-90 transition"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          </div>

          {upcomingBookings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-900 font-semibold text-sm mb-1">No upcoming appointments</p>
              <p className="text-gray-400 text-xs mb-4">Share your studio link to receive bookings</p>
              <button
                onClick={() => setShowAddBooking(true)}
                className="px-5 py-2.5 bg-[#F52B8C] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition"
              >
                + Add appointment
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {upcomingBookings.slice(0, 6).map((booking) => {
                const service = servicesMap.get(booking.service_id ?? '');
                const serviceName = service?.name ?? 'Service';
                const dt = new Date(booking.booking_datetime);
                const dateStr = dt.toLocaleDateString('en-US', {
                  weekday: 'short', month: 'short', day: 'numeric',
                  timeZone: profile?.timezone ?? undefined,
                });
                const timeStr = dt.toLocaleTimeString('en-US', {
                  hour: '2-digit', minute: '2-digit', hour12: false,
                  timeZone: profile?.timezone ?? undefined,
                });
                const status = booking.status ?? 'pending';
                const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
                const clientName = booking.client_name ?? 'Client';
                const clientInitials = clientName.split(' ').map((n: string) => n[0]).filter(Boolean).join('').toUpperCase().slice(0, 2) || '?';
                const price = Number(booking.price_total ?? 0);

                return (
                  <div key={booking.id} className="bg-white rounded-xl p-3.5 flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${cfg.avatar} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white text-xs font-bold">{clientInitials}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-sm text-[#1A1A1A] truncate">{clientName}</p>
                        <p className="font-bold text-sm text-[#F52B8C] flex-shrink-0">{formatCurrency(price, currency)}</p>
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-0.5">
                        <p className="text-xs text-gray-400 truncate">{serviceName} · {dateStr} {timeStr}</p>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border flex-shrink-0 ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                          {cfg.label}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {upcomingBookings.length > 6 && (
                <button
                  onClick={() => onNavigate?.('calendar')}
                  className="w-full py-2.5 text-sm text-[#F52B8C] font-semibold hover:opacity-75 transition text-center"
                >
                  View {upcomingBookings.length - 6} more →
                </button>
              )}
            </div>
          )}
        </div>

      </div>

      <AddBookingModal
        isOpen={showAddBooking}
        onClose={() => setShowAddBooking(false)}
        onSuccess={() => { loadData(); showSuccess('Booking added!'); }}
        profileId={profileId}
        services={services}
      />

      {toast && <Toast type={toast.type} message={toast.message} onClose={hideToast} />}
    </div>
  );
}
