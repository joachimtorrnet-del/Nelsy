import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  TrendingDown, TrendingUp, Plus, ChevronRight,
  Eye, CalendarDays, Wallet,
  AlertCircle, RefreshCw, CheckCircle2, Circle,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '../../lib/supabase';
import type { DbProfileRow, DbBookingRow } from '../../lib/supabase';
import { getBookings, calculateStats, getPageViewStats } from '../../lib/supabase-queries';
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
  duration?: number;
  deposit_amount?: number;
}

interface ChartPoint { day: string; revenue: number }
type ChartRange = '7d' | '30d' | '90d';

const STATUS_CONFIG: Record<string, { label: string; icon: string; bg: string; text: string; border: string; avatar: string }> = {
  pending:   { label: 'Pending Payment', icon: '⏳', bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200', avatar: 'from-orange-400 to-amber-500' },
  paid:      { label: 'Paid',            icon: '✅', bg: 'bg-green-100',  text: 'text-green-700',  border: 'border-green-200',  avatar: 'from-green-400 to-emerald-500' },
  confirmed: { label: 'Paid',            icon: '✅', bg: 'bg-green-100',  text: 'text-green-700',  border: 'border-green-200',  avatar: 'from-green-400 to-emerald-500' },
  completed: { label: 'Completed',       icon: '🎉', bg: 'bg-blue-100',   text: 'text-blue-700',   border: 'border-blue-200',   avatar: 'from-blue-400 to-indigo-500' },
  cancelled: { label: 'Cancelled',       icon: '❌', bg: 'bg-gray-100',   text: 'text-gray-700',   border: 'border-gray-200',   avatar: 'from-gray-300 to-gray-400' },
  refunded:  { label: 'Refunded',        icon: '↩️', bg: 'bg-red-100',    text: 'text-red-700',    border: 'border-red-200',    avatar: 'from-red-400 to-rose-500' },
};

const RANGE_DAYS: Record<ChartRange, number> = { '7d': 7, '30d': 30, '90d': 90 };
const PAID = new Set(['paid', 'confirmed', 'completed']);

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
    if (!PAID.has(b.status ?? '')) continue;
    const dt = new Date(b.booking_datetime);
    if (dt < cutoff) continue;
    const key = dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (map.has(key)) map.set(key, (map.get(key) ?? 0) + Number(b.price_total ?? 0));
  }
  return Array.from(map.entries()).map(([day, revenue]) => ({ day, revenue }));
}

function fmt(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 2 }).format(amount);
}

export default function Home({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  // ── shared state ──────────────────────────────────────────────────────────
  const [profile, setProfile] = useState<DbProfileRow | null>(null);
  const [stats, setStats] = useState<Awaited<ReturnType<typeof calculateStats>>>(null);
  const [bookings, setBookings] = useState<DbBookingRow[]>([]);       // upcoming (shared)
  const [allBookings, setAllBookings] = useState<DbBookingRow[]>([]);  // all paid, for chart
  const [services, setServices] = useState<Service[]>([]);
  const [profileId, setProfileId] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [showAddBooking, setShowAddBooking] = useState(false);
  const [chartRange, setChartRange] = useState<ChartRange>('30d');
  const [storeViews, setStoreViews] = useState<number | null>(null);
  const [balance, setBalance] = useState<{ available: number; pending: number; thisMonth: number } | null>(null);
  const [setupDone, setSetupDone] = useState(true);
  // desktop-only extras
  const [serviceCount, setServiceCount] = useState(0);
  const [stripeReady, setStripeReady] = useState(false);
  const [checklistCollapsed, setChecklistCollapsed] = useState(false);

  const { toast, showSuccess, showError, hideToast } = useToast();
  const chartData = buildChartData(allBookings, RANGE_DAYS[chartRange]);
  const currency = (profile?.business_currency ?? 'EUR').toUpperCase();

  // ── desktop period KPIs ───────────────────────────────────────────────────
  const periodKpis = useMemo(() => {
    const days = RANGE_DAYS[chartRange];
    const now = new Date();
    const cutoff = new Date(now);
    cutoff.setDate(cutoff.getDate() - days);
    cutoff.setHours(0, 0, 0, 0);
    const prevCutoff = new Date(cutoff);
    prevCutoff.setDate(prevCutoff.getDate() - days);
    const current = allBookings.filter((b) => PAID.has(b.status ?? '') && new Date(b.booking_datetime) >= cutoff);
    const prev    = allBookings.filter((b) => PAID.has(b.status ?? '') && new Date(b.booking_datetime) >= prevCutoff && new Date(b.booking_datetime) < cutoff);
    const periodRevenue = current.reduce((s, b) => s + Number(b.price_total ?? 0), 0);
    const prevRevenue   = prev.reduce((s, b) => s + Number(b.price_total ?? 0), 0);
    const revenueGrowth = prevRevenue === 0 ? (periodRevenue > 0 ? 100 : 0) : Math.round(((periodRevenue - prevRevenue) / prevRevenue) * 100);
    const bookingCount  = current.length;
    const prevCount     = prev.length;
    const bookingGrowth = prevCount === 0 ? (bookingCount > 0 ? 100 : 0) : Math.round(((bookingCount - prevCount) / prevCount) * 100);
    return { periodRevenue, revenueGrowth, bookingCount, bookingGrowth };
  }, [allBookings, chartRange]);

  // ── re-fetch studio views when period changes (desktop) ───────────────────
  useEffect(() => {
    if (!profileId) return;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - RANGE_DAYS[chartRange]);
    getPageViewStats(profileId, startDate).then((s) => setStoreViews(s.total)).catch(() => setStoreViews(null));
  }, [profileId, chartRange]);

  // ── data load ─────────────────────────────────────────────────────────────
  const loadData = useCallback(async () => {
    setLoadError(null);
    if (!supabase) return;
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) return;
      setProfileId(authUser.id);

      const [
        { data: profileData },
        statsData,
        { data: servicesData },
        { data: allBookingsData },
        { data: balanceData },
        { count: svcCount },
      ] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', authUser.id).single(),
        calculateStats(authUser.id),
        supabase.from('services').select('*').eq('profile_id', authUser.id).eq('active', true),
        supabase.from('bookings').select('*').eq('profile_id', authUser.id).order('booking_datetime', { ascending: true }),
        supabase.from('pro_balance').select('available_balance, pending_balance, total_earnings').eq('profile_id', authUser.id).maybeSingle(),
        supabase.from('services').select('id', { count: 'exact', head: true }).eq('profile_id', authUser.id).eq('active', true),
      ]);

      setProfile(profileData as DbProfileRow);
      setStats(statsData);
      setServices((servicesData ?? []) as Service[]);
      setAllBookings((allBookingsData ?? []) as DbBookingRow[]);
      setServiceCount(svcCount ?? 0);
      setStripeReady(!!(profileData as DbProfileRow)?.stripe_account_id && !!(profileData as DbProfileRow)?.stripe_onboarding_complete);

      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const thisMonth = (allBookingsData ?? [])
        .filter((b) => PAID.has(b.status ?? '') && new Date(b.booking_datetime) >= monthStart)
        .reduce((sum, b) => sum + Number(b.price_total ?? 0), 0);

      setBalance({
        available: Number(balanceData?.available_balance ?? 0),
        pending:   Number(balanceData?.pending_balance ?? 0),
        thisMonth,
      });

      const { count: availCount } = await supabase
        .from('availabilities').select('id', { count: 'exact', head: true })
        .eq('profile_id', authUser.id).eq('active', true);
      const { count: serviceCount2 } = await supabase
        .from('services').select('id', { count: 'exact', head: true })
        .eq('profile_id', authUser.id).eq('active', true);
      setSetupDone((availCount ?? 0) > 0 && (serviceCount2 ?? 0) > 0);

      const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
      const in30Days = new Date(); in30Days.setDate(in30Days.getDate() + 30); in30Days.setHours(23, 59, 59, 999);
      const { data: bookingsData } = await getBookings(authUser.id, todayStart, in30Days);
      setBookings((bookingsData ?? []) as DbBookingRow[]);
    } catch (err) {
      console.error('Home load error:', err);
      setLoadError('Failed to load your dashboard. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  if (loading) return <LoadingScreen message="Loading your dashboard..." />;

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 gap-4">
        <AlertCircle className="w-10 h-10 text-red-400" />
        <p className="text-gray-700 font-semibold">{loadError}</p>
        <button onClick={() => { setLoading(true); loadData(); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#F52B8C] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition">
          <RefreshCw className="w-4 h-4" /> Try again
        </button>
      </div>
    );
  }

  if (!profile || !stats) return null;

  const displayName = profile.full_name || profile.salon_name || 'Studio';
  const displayFirstName = displayName.split(' ')[0];
  const avatarUrl = profile.logo_url ?? undefined;
  const initials = displayName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  const growth = stats?.growth ?? 0;
  const availableBalance = balance?.available ?? 0;
  const servicesMap = new Map(services.map((s) => [s.id, s]));

  // desktop setup checklist
  const isPublished = ['active', 'trialing', 'trial'].includes(profile.subscription_status ?? '');
  const setupSteps = [
    { id: 'profile',  label: 'Complete your profile',  done: !!(profile.full_name && profile.bio),  action: () => onNavigate?.('settings') },
    { id: 'service',  label: 'Add your first service',  done: serviceCount > 0,                      action: () => onNavigate?.('preview') },
    { id: 'payments', label: 'Set up payments',          done: stripeReady,                           action: () => onNavigate?.('stripe') },
    { id: 'publish',  label: 'Publish your studio',      done: isPublished,                           action: () => { window.location.href = '/onboarding?step=plan'; } },
  ];
  const allSetupDone = setupSteps.every((s) => s.done);
  const setupDoneCount = setupSteps.filter((s) => s.done).length;

  // ── shared chart gradient id ──────────────────────────────────────────────
  const chartGradient = (
    <defs>
      <linearGradient id="rGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%"  stopColor="#F52B8C" stopOpacity={0.2} />
        <stop offset="95%" stopColor="#F52B8C" stopOpacity={0} />
      </linearGradient>
    </defs>
  );

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════
          MOBILE  (< lg)  — exact original layout
      ════════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden bg-white min-h-screen pb-24">

        {/* Hero: Avatar + Total Revenue */}
        <div className="px-5 pt-5 pb-4 flex items-center gap-4">
          <div className="w-[72px] h-[72px] rounded-full border-2 border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0">
            {avatarUrl
              ? <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
              : <span className="text-gray-700 font-bold text-3xl leading-none">{initials}</span>
            }
          </div>
          <div>
            <p className="text-gray-500 text-sm mb-0.5">Total revenue</p>
            <p className="text-gray-900 text-4xl font-bold leading-none tracking-tight">
              €{(stats?.totalRevenue ?? 0).toFixed(2)}
            </p>
            {growth !== 0 && (
              <div className={`flex items-center gap-1 mt-1.5 ${growth > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {growth > 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                <span className="text-sm font-semibold">{growth > 0 ? '+' : ''}{growth}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Setup Banner */}
        {!setupDone && (
          <div className="px-4 mb-4">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <p className="text-sm font-bold text-amber-900 mb-1">⚙️ Set up your studio before sharing your link</p>
              <p className="text-xs text-amber-700 mb-3">Clients can't book if you haven't added services and availability hours.</p>
              <div className="flex gap-2">
                <button onClick={() => onNavigate?.('preview')}
                  className="flex-1 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold hover:opacity-90 transition-opacity">
                  + Add a service
                </button>
                <button onClick={() => onNavigate?.('settings')}
                  className="flex-1 py-2 bg-white border border-amber-300 text-amber-800 rounded-xl text-xs font-bold hover:bg-amber-50 transition-colors">
                  Set hours
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Balance Hero Card */}
        <div className="px-4 mb-5">
          <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
            <div className="grid grid-cols-3 gap-2 mb-5">
              <div>
                <p className="text-white/50 text-[10px] font-medium uppercase tracking-wider mb-1">Available</p>
                <p className="text-white text-xl font-bold tracking-tight">€{availableBalance.toFixed(2)}</p>
              </div>
              <div className="border-l border-white/10 pl-3">
                <p className="text-white/50 text-[10px] font-medium uppercase tracking-wider mb-1">Pending</p>
                <p className="text-white text-xl font-bold tracking-tight">€{(balance?.pending ?? 0).toFixed(2)}</p>
              </div>
              <div className="border-l border-white/10 pl-3">
                <p className="text-white/50 text-[10px] font-medium uppercase tracking-wider mb-1">This Month</p>
                <p className="text-white text-xl font-bold tracking-tight">€{(balance?.thisMonth ?? 0).toFixed(2)}</p>
              </div>
            </div>
            <button
              disabled={availableBalance < 20}
              onClick={async () => {
                if (!supabase || availableBalance < 20) return;
                try {
                  const { data, error } = await supabase.functions.invoke('create-stripe-dashboard-link');
                  if (error || !data?.url) throw new Error(error?.message ?? 'No URL');
                  window.open(data.url as string, '_blank');
                } catch {
                  showError('Connect your Stripe account in Settings to enable payouts.');
                }
              }}
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.98] ${
                availableBalance >= 20
                  ? 'bg-[#F52B8C] text-white hover:opacity-90 shadow-lg shadow-[#F52B8C]/30'
                  : 'bg-white/10 text-white/40 cursor-not-allowed'
              }`}
            >
              {availableBalance >= 20 ? '+ Cash Out' : 'Cash Out (€20 min)'}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="px-4 mb-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-gray-900">Stats</span>
              <span className="text-gray-400 text-xs">(last 30 days)</span>
            </div>
            <button onClick={() => onNavigate?.('analytics')}
              className="flex items-center gap-0.5 text-[#F52B8C] text-sm font-semibold hover:opacity-75 transition-opacity">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-gray-50 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-2 divide-x divide-gray-200">
              <div className="p-4">
                <p className="text-gray-400 text-xs mb-1.5">Bookings</p>
                <p className="text-gray-900 text-2xl font-bold">{stats?.todayBookings ?? 0}</p>
                {growth !== 0 && (
                  <div className={`flex items-center gap-1 mt-1.5 ${growth > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${growth > 0 ? 'bg-green-100' : 'bg-red-50'}`}>
                      {growth > 0 ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                    </div>
                    <span className="text-xs font-semibold">{growth > 0 ? '+' : ''}{growth}%</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="text-gray-400 text-xs mb-1.5">Studio visits</p>
                <p className="text-gray-900 text-2xl font-bold">{storeViews !== null ? storeViews : '—'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="px-4 mb-5">
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-start justify-between mb-1">
              <p className="text-gray-400 text-xs">Revenue</p>
              <div className="flex gap-0.5">
                {(['7d', '30d', '90d'] as ChartRange[]).map((r) => (
                  <button key={r} onClick={() => setChartRange(r)}
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold transition-all ${chartRange === r ? 'bg-[#F52B8C] text-white' : 'text-gray-400'}`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-gray-900 text-2xl font-bold mb-3 tracking-tight">
              €{(stats?.totalRevenue ?? 0).toFixed(2)}
            </p>
            <ResponsiveContainer width="100%" height={130}>
              <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -32, bottom: 0 }}>
                {chartGradient}
                <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#9ca3af' }} tickLine={false} axisLine={false}
                  interval={chartRange === '7d' ? 1 : chartRange === '30d' ? 6 : 14} />
                <YAxis tick={{ fontSize: 9, fill: '#9ca3af' }} tickLine={false} axisLine={false} tickFormatter={(v) => `€${v}`}
                  domain={[0, (dataMax: number) => dataMax === 0 ? 10 : Math.ceil(dataMax * 1.2)]} />
                <Tooltip contentStyle={{ background: '#fff', border: '1px solid #f3f4f6', borderRadius: '10px', fontSize: '11px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  formatter={(value) => [`€${Number(value ?? 0).toFixed(2)}`, 'Revenue']} labelStyle={{ color: '#6b7280' }} />
                <Area type="monotone" dataKey="revenue" stroke="#F52B8C" strokeWidth={2.5} fill="url(#rGrad)"
                  dot={false} activeDot={{ r: 4, fill: '#F52B8C', stroke: '#fff', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming appointments */}
        <div className="px-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-base font-bold text-gray-900">Upcoming appointments</span>
            <button onClick={() => setShowAddBooking(true)}
              className="flex items-center gap-1 text-[#F52B8C] text-sm font-semibold">
              <Plus className="w-3.5 h-3.5" /> Add <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          {bookings.length === 0 ? (
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="flex justify-center gap-2 mb-3">
                <span className="text-2xl animate-bounce" style={{ animationDelay: '0s' }}>✨</span>
                <span className="text-2xl animate-bounce" style={{ animationDelay: '0.15s' }}>💅</span>
                <span className="text-2xl animate-bounce" style={{ animationDelay: '0.3s' }}>✨</span>
              </div>
              <p className="text-gray-900 font-bold text-sm mb-1">No upcoming appointments</p>
              <p className="text-gray-400 text-xs mb-4">Share your studio link to receive bookings</p>
              <button onClick={() => setShowAddBooking(true)}
                className="px-5 py-2.5 bg-[#F52B8C] text-white rounded-xl text-sm font-semibold hover:opacity-90 active:scale-95 transition-all shadow-md shadow-[#F52B8C]/25">
                + Add appointment
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {bookings.map((booking, index) => {
                const service = servicesMap.get(booking.service_id ?? '');
                const serviceName = service?.name ?? 'Service';
                const bookingTime = new Date(booking.booking_datetime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
                const status = booking.status || 'pending';
                const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
                const clientName = booking.client_name ?? 'Client';
                const clientInitials = clientName.split(' ').map((n: string) => n[0]).filter(Boolean).join('').toUpperCase().slice(0, 2) || '?';
                const price = Number(booking.price_total ?? 0);
                return (
                  <div key={booking.id} className="bg-gray-50 rounded-xl p-3.5 transition-all" style={{ animationDelay: `${index * 0.06}s` }}>
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${cfg.avatar} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-xs font-bold">{clientInitials}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-semibold text-sm text-gray-900 truncate">{clientName}</p>
                          <p className="font-bold text-sm text-[#F52B8C] flex-shrink-0">€{price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-1">
                          <p className="text-xs text-gray-400 truncate">{serviceName} · {bookingTime}</p>
                          <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium border flex-shrink-0 ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                            <span>{cfg.icon}</span><span>{cfg.label}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          DESKTOP  (≥ lg)  — new layout
      ════════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:block bg-white min-h-full pb-10">
        <div className="w-full max-w-[1400px] mx-auto px-8 py-5">

          {/* Greeting + period selector */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl font-bold text-[#1A1A1A]">Hey {displayFirstName}, welcome back!</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {chartRange === '7d' ? 'Last 7 days' : chartRange === '30d' ? 'Last 30 days' : 'Last 90 days'}
              </p>
            </div>
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
              {(['7d', '30d', '90d'] as ChartRange[]).map((r) => (
                <button key={r} onClick={() => setChartRange(r)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${chartRange === r ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                  {r === '7d' ? 'Last 7 days' : r === '30d' ? 'Last 30 days' : 'Last 90 days'}
                </button>
              ))}
            </div>
          </div>

          {/* Setup checklist — collapsible */}
          {!allSetupDone && (
            <div className="mb-4 bg-[#fff8fa] border border-pink-100 rounded-2xl overflow-hidden">
              {/* Header — always visible */}
              <button
                onClick={() => setChecklistCollapsed((v) => !v)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-pink-50/50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-[#1A1A1A] text-sm">
                    Get your studio ready
                  </span>
                  <span className="text-xs text-gray-400">{setupDoneCount}/{setupSteps.length} done</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-1.5 bg-pink-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#F52B8C] rounded-full transition-all" style={{ width: `${(setupDoneCount / setupSteps.length) * 100}%` }} />
                  </div>
                  <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${checklistCollapsed ? '' : 'rotate-90'}`} />
                </div>
              </button>
              {/* Steps — hidden when collapsed */}
              {!checklistCollapsed && (
                <div className="px-4 pb-3 grid grid-cols-2 gap-2">
                  {setupSteps.map(({ id, label, done, action }) => (
                    <button key={id} onClick={() => !done && action()} disabled={done}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-left transition-all ${done ? 'bg-white text-gray-400 cursor-default' : 'bg-white border border-pink-100 text-[#1A1A1A] hover:border-[#F52B8C]'}`}>
                      {done ? <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" /> : <Circle className="w-4 h-4 text-gray-300 flex-shrink-0" />}
                      <span className={done ? 'line-through text-xs' : 'font-medium text-sm'}>{label}</span>
                      {!done && <ChevronRight className="w-3.5 h-3.5 text-[#F52B8C] ml-auto flex-shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* KPI cards */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {/* Studio visits */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">Studio visits</span>
                <Eye className="w-3.5 h-3.5 text-gray-200" />
              </div>
              <p className="text-3xl font-bold text-[#1A1A1A] leading-none tracking-tight">
                {storeViews !== null ? storeViews.toLocaleString() : '—'}
              </p>
              <button onClick={() => onNavigate?.('analytics')}
                className="text-[11px] text-gray-400 hover:text-[#F52B8C] transition text-left mt-auto">
                View analytics →
              </button>
            </div>
            {/* Bookings */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">Bookings</span>
                <CalendarDays className="w-3.5 h-3.5 text-gray-200" />
              </div>
              <div className="flex items-end gap-2">
                <p className="text-3xl font-bold text-[#1A1A1A] leading-none tracking-tight">{periodKpis.bookingCount}</p>
                {periodKpis.bookingGrowth !== 0 && (
                  <span className={`text-xs font-semibold mb-0.5 flex items-center gap-0.5 ${periodKpis.bookingGrowth > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {periodKpis.bookingGrowth > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {periodKpis.bookingGrowth > 0 ? '+' : ''}{periodKpis.bookingGrowth}%
                  </span>
                )}
              </div>
              <button onClick={() => onNavigate?.('calendar')}
                className="text-[11px] text-gray-400 hover:text-[#F52B8C] transition text-left mt-auto">
                View calendar →
              </button>
            </div>
            {/* Revenue */}
            <div className="bg-white border border-pink-100 rounded-2xl p-4 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">Revenue</span>
                <Wallet className="w-3.5 h-3.5 text-[#F52B8C]/30" />
              </div>
              <div className="flex items-end gap-2">
                <p className="text-3xl font-bold text-[#F52B8C] leading-none tracking-tight">
                  {fmt(periodKpis.periodRevenue, currency)}
                </p>
                {periodKpis.revenueGrowth !== 0 && (
                  <span className={`text-xs font-semibold mb-0.5 flex items-center gap-0.5 ${periodKpis.revenueGrowth > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {periodKpis.revenueGrowth > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {periodKpis.revenueGrowth > 0 ? '+' : ''}{periodKpis.revenueGrowth}%
                  </span>
                )}
              </div>
              <button onClick={() => onNavigate?.('revenue')}
                className="text-[11px] text-gray-400 hover:text-[#F52B8C] transition text-left mt-auto">
                View income →
              </button>
            </div>
          </div>

          {/* Chart + Balance — 2/3 + 1/3 grid */}
          <div className="grid grid-cols-[2fr_1fr] gap-3 mb-4">
            {/* Revenue chart */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium">Revenue · {currency}</p>
                  <p className="text-lg font-bold text-[#1A1A1A] mt-0.5">{fmt(periodKpis.periodRevenue, currency)}</p>
                </div>
              </div>
              {chartData.every((p) => p.revenue === 0) ? (
                <div className="flex items-center gap-2 py-3 text-gray-400 text-sm">
                  <span>No revenue recorded for this period.</span>
                </div>
              ) : (
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                      {chartGradient}
                      <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#9ca3af' }} tickLine={false} axisLine={false}
                        interval={chartRange === '7d' ? 1 : chartRange === '30d' ? 6 : 14} />
                      <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} tickLine={false} axisLine={false} width={40}
                        tickFormatter={(v) => `${v}`} domain={[0, (max: number) => max === 0 ? 10 : Math.ceil(max * 1.25)]} />
                      <Tooltip contentStyle={{ background: '#fff', border: '1px solid #f3f4f6', borderRadius: '12px', fontSize: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                        formatter={(v) => [fmt(Number(v ?? 0), currency), 'Revenue']} labelStyle={{ color: '#6b7280', fontWeight: 500 }} />
                      <Area type="monotone" dataKey="revenue" stroke="#F52B8C" strokeWidth={2} fill="url(#rGrad)"
                        dot={false} activeDot={{ r: 4, fill: '#F52B8C', stroke: '#fff', strokeWidth: 2 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Balance */}
            <div className="bg-[#1A1A1A] rounded-2xl p-4 flex flex-col gap-3">
              <p className="text-white/50 text-[11px] font-medium uppercase tracking-wider">Current balance</p>

              {!stripeReady ? (
                /* Stripe not connected */
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">Payments not set up</p>
                    <p className="text-white/50 text-xs leading-relaxed">
                      Connect Stripe to accept payments and receive payouts.
                    </p>
                  </div>
                  <button onClick={() => onNavigate?.('stripe')}
                    className="w-full py-2.5 bg-white text-[#1A1A1A] rounded-xl text-sm font-bold hover:opacity-90 transition mt-4">
                    Set up payments →
                  </button>
                </div>
              ) : (
                /* Stripe connected */
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div>
                      <p className="text-white/50 text-xs mb-0.5">Available</p>
                      <p className="text-white text-2xl font-bold tracking-tight leading-none">
                        {fmt(balance?.available ?? 0, currency)}
                      </p>
                    </div>
                    <div className="border-t border-white/10 pt-3">
                      <p className="text-white/50 text-xs mb-0.5">Pending</p>
                      <p className="text-white text-xl font-bold tracking-tight leading-none">
                        {fmt(balance?.pending ?? 0, currency)}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => onNavigate?.('revenue')}
                    className="w-full py-2.5 bg-[#F52B8C] text-white rounded-xl text-sm font-bold hover:opacity-90 transition mt-4">
                    View income →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming appointments */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-[#1A1A1A]">Upcoming appointments</span>
              <div className="flex items-center gap-2">
                <button onClick={() => onNavigate?.('calendar')}
                  className="text-xs text-gray-400 font-medium hover:text-[#1A1A1A] transition">
                  View calendar
                </button>
                <button onClick={() => setShowAddBooking(true)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#F52B8C] text-white rounded-lg text-xs font-bold hover:opacity-90 transition">
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
            </div>
            {bookings.length === 0 ? (
              <div className="flex items-center justify-between py-3 px-1">
                <p className="text-sm text-gray-400">No upcoming appointments. Share your link to get booked.</p>
                <button onClick={() => setShowAddBooking(true)}
                  className="flex-shrink-0 px-4 py-2 bg-[#F52B8C] text-white rounded-xl text-xs font-semibold hover:opacity-90 transition ml-4">
                  + Add appointment
                </button>
              </div>
            ) : (
              <div className="space-y-1.5">
                {bookings.slice(0, 6).map((booking) => {
                  const service = servicesMap.get(booking.service_id ?? '');
                  const dt = new Date(booking.booking_datetime);
                  const dateStr = dt.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: profile?.timezone ?? undefined });
                  const timeStr = dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: profile?.timezone ?? undefined });
                  const status = booking.status ?? 'pending';
                  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
                  const clientName = booking.client_name ?? 'Client';
                  const clientInitials = clientName.split(' ').map((n: string) => n[0]).filter(Boolean).join('').toUpperCase().slice(0, 2) || '?';
                  const price = Number(booking.price_total ?? 0);
                  return (
                    <div key={booking.id} className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${cfg.avatar} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-xs font-bold">{clientInitials}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-semibold text-sm text-[#1A1A1A] truncate">{clientName}</p>
                          <p className="font-bold text-sm text-[#F52B8C] flex-shrink-0">{fmt(price, currency)}</p>
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-0.5">
                          <p className="text-xs text-gray-400 truncate">{service?.name ?? 'Service'} · {dateStr} {timeStr}</p>
                          <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium border flex-shrink-0 ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                            <span>{cfg.icon}</span><span>{cfg.label}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {bookings.length > 6 && (
                  <button onClick={() => onNavigate?.('calendar')}
                    className="w-full py-2 text-xs text-[#F52B8C] font-semibold hover:opacity-75 transition text-center">
                    View {bookings.length - 6} more →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <AddBookingModal
        isOpen={showAddBooking}
        onClose={() => setShowAddBooking(false)}
        onSuccess={() => { loadData(); showSuccess('Booking added! 🎉'); }}
        profileId={profileId}
        services={services}
      />
      {toast && <Toast type={toast.type} message={toast.message} onClose={hideToast} />}
    </>
  );
}
