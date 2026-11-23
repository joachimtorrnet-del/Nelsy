import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  TrendingDown, TrendingUp, Plus, ArrowRight, Eye, CalendarDays, Wallet,
  AlertCircle, RefreshCw, Lightbulb, Sparkles, Clock, UserRound, Share2, CalendarPlus, Pencil,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '../../lib/supabase';
import type { DbProfileRow, DbBookingRow } from '../../lib/supabase';
import { getBookings } from '../../lib/supabase-queries';
import { buildLiveMerchant } from '../../lib/liveMerchant';
import { LoadingScreen } from '../../components/dashboard/SkeletonLoader';
import { StudioPhonePreview } from '../../components/dashboard/StudioPhonePreview';
import { useToast } from '../../hooks/useToast';
import Toast from '../../components/dashboard/Toast';
import AddBookingModal from '../../components/dashboard/AddBookingModal';

interface Service {
  id: string;
  name: string;
  description?: string | null;
  price_total?: number;
  price?: number;
  duration_minutes?: number;
  duration?: number;
  deposit_amount?: number;
  category?: string | null;
  image_url?: string | null;
  is_featured?: boolean | null;
  active?: boolean | null;
  card_style?: 'button' | 'callout' | 'preview' | null;
  card_subtitle?: string | null;
  card_cta_text?: string | null;
}

type Range = '7d' | '30d' | '90d';
type Metric = 'visits' | 'revenue' | 'bookings';

interface Action {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  run: () => void;
}

const RANGE_DAYS: Record<Range, number> = { '7d': 7, '30d': 30, '90d': 90 };
const RANGE_LABEL: Record<Range, string> = { '7d': '7D', '30d': '30D', '90d': '90D' };
// Appointments that happened or will happen (paid or not)
const BOOKED = new Set(['paid', 'confirmed', 'completed']);
const UPCOMING = new Set(['pending', 'confirmed', 'paid']);

const STATUS_CONFIG: Record<string, { label: string; cls: string }> = {
  pending:   { label: 'Awaiting payment', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
  confirmed: { label: 'Confirmed',        cls: 'bg-green-50 text-green-700 border-green-200' },
  paid:      { label: 'Paid',             cls: 'bg-green-50 text-green-700 border-green-200' },
};

function fmt(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 2 }).format(amount);
}

function dayKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function growthPct(current: number, previous: number) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

// Staggered entrance for the page's blocks
const rise = (i: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay: 0.05 + i * 0.06, ease: [0.2, 0.8, 0.2, 1] as const },
});

export default function Home({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const [profile, setProfile] = useState<DbProfileRow | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [allBookings, setAllBookings] = useState<DbBookingRow[]>([]);
  const [upcoming, setUpcoming] = useState<DbBookingRow[]>([]);
  const [visitTimes, setVisitTimes] = useState<number[]>([]);
  const [payments, setPayments] = useState<{ t: number; amount: number; online: boolean }[]>([]);
  const [balance, setBalance] = useState<{ available: number; pending: number }>({ available: 0, pending: 0 });
  const [hasHours, setHasHours] = useState(true);
  const [profileId, setProfileId] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [showAddBooking, setShowAddBooking] = useState(false);
  const [range, setRange] = useState<Range>('30d');
  const [metric, setMetric] = useState<Metric>('revenue');

  const { toast, showSuccess, showError, hideToast } = useToast();
  const currency = (profile?.business_currency ?? 'EUR').toUpperCase();

  const loadData = useCallback(async () => {
    setLoadError(null);
    if (!supabase) return;
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setProfileId(user.id);

      // Two periods of visits so the KPI can show growth vs the previous period
      const visitsSince = new Date();
      visitsSince.setDate(visitsSince.getDate() - RANGE_DAYS['90d'] * 2);
      const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
      const in30Days = new Date(); in30Days.setDate(in30Days.getDate() + 30);

      const [
        { data: profileData },
        { data: servicesData },
        { data: bookingsData },
        { data: balanceData },
        { count: hoursCount },
        { data: viewsData },
        { data: upcomingData },
        { data: paymentsData },
      ] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('services').select('*').eq('profile_id', user.id).eq('active', true).order('display_order', { ascending: true }),
        supabase.from('bookings').select('*').eq('profile_id', user.id),
        supabase.from('pro_balance').select('available_balance, pending_balance').eq('profile_id', user.id).maybeSingle(),
        supabase.from('availabilities').select('id', { count: 'exact', head: true }).eq('profile_id', user.id).eq('active', true),
        supabase.from('page_views').select('created_at').eq('profile_id', user.id).gte('created_at', visitsSince.toISOString()),
        getBookings(user.id, todayStart, in30Days),
        supabase.from('booking_payments').select('amount, method, created_at').eq('profile_id', user.id).gte('created_at', visitsSince.toISOString()),
      ]);

      setProfile(profileData as DbProfileRow);
      setServices((servicesData ?? []) as Service[]);
      setAllBookings((bookingsData ?? []) as DbBookingRow[]);
      setBalance({
        available: Number(balanceData?.available_balance ?? 0),
        pending: Number(balanceData?.pending_balance ?? 0),
      });
      setHasHours((hoursCount ?? 0) > 0);
      setVisitTimes((viewsData ?? []).map((v: { created_at: string }) => new Date(v.created_at).getTime()));
      setUpcoming(((upcomingData ?? []) as DbBookingRow[]).filter((b) => UPCOMING.has(b.status)));
      setPayments(((paymentsData ?? []) as { amount: number; method: string; created_at: string }[]).map((p) => ({
        t: new Date(p.created_at).getTime(), amount: Number(p.amount), online: p.method === 'stripe',
      })));
    } catch (err) {
      console.error('Home load error:', err);
      setLoadError('Failed to load your dashboard. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadData(); }, [loadData]);

  // Per-day series for the selected range, plus totals for this and the previous period
  const series = useMemo(() => {
    const days = RANGE_DAYS[range];
    const now = new Date();
    const start = new Date(now); start.setHours(0, 0, 0, 0); start.setDate(start.getDate() - (days - 1));
    const prevStart = new Date(start); prevStart.setDate(prevStart.getDate() - days);

    const buckets = new Map<string, { label: string; visits: number; revenue: number; bookings: number }>();
    for (let i = 0; i < days; i++) {
      const d = new Date(start); d.setDate(start.getDate() + i);
      buckets.set(dayKey(d), { label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), visits: 0, revenue: 0, bookings: 0 });
    }

    const totals = { visits: 0, revenue: 0, bookings: 0 };
    const prev = { visits: 0, revenue: 0, bookings: 0 };

    for (const t of visitTimes) {
      if (t >= start.getTime() && t <= now.getTime()) {
        totals.visits++;
        const b = buckets.get(dayKey(new Date(t)));
        if (b) b.visits++;
      } else if (t >= prevStart.getTime() && t < start.getTime()) prev.visits++;
    }

    // Revenue = money actually received (online + at the studio), dated when received
    let online = 0;
    for (const p of payments) {
      if (p.t >= start.getTime() && p.t <= now.getTime()) {
        totals.revenue += p.amount;
        if (p.online) online += p.amount;
        const b = buckets.get(dayKey(new Date(p.t)));
        if (b) b.revenue += p.amount;
      } else if (p.t >= prevStart.getTime() && p.t < start.getTime()) prev.revenue += p.amount;
    }

    for (const bk of allBookings) {
      if (!BOOKED.has(bk.status)) continue;
      const t = new Date(bk.booking_datetime).getTime();
      if (t >= start.getTime() && t <= now.getTime()) {
        totals.bookings++;
        const b = buckets.get(dayKey(new Date(t)));
        if (b) b.bookings++;
      } else if (t >= prevStart.getTime() && t < start.getTime()) prev.bookings++;
    }

    return { points: Array.from(buckets.values()), totals, prev, online, onSite: totals.revenue - online };
  }, [range, visitTimes, allBookings, payments]);

  if (loading) return <LoadingScreen message="Loading your dashboard..." />;

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 gap-4">
        <AlertCircle className="w-10 h-10 text-red-400" />
        <p className="text-gray-700 font-semibold">{loadError}</p>
        <button onClick={() => { setLoading(true); void loadData(); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#F52B8C] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition">
          <RefreshCw className="w-4 h-4" /> Try again
        </button>
      </div>
    );
  }

  if (!profile) return null;

  const firstName = (profile.full_name || profile.salon_name || 'there').split(' ')[0];
  const stripeReady = !!profile.stripe_account_id && profile.stripe_onboarding_complete;
  const servicesMap = new Map(services.map((s) => [s.id, s]));
  const studioUrl = `https://getnelsy.com/${profile.slug}`;

  const copyLink = () => {
    navigator.clipboard.writeText(studioUrl)
      .then(() => showSuccess('Studio link copied'))
      .catch(() => showError('Could not copy the link'));
  };

  // Setup first, then everyday actions; only real features
  const setup: (Action & { done: boolean })[] = [
    { id: 'service', icon: Sparkles, title: 'Add your first service', description: 'Clients book from your services. Add one with a price and a duration.', run: () => onNavigate?.('preview'), done: services.length > 0 },
    { id: 'hours', icon: Clock, title: 'Set your opening hours', description: 'Clients can only book inside the hours you choose.', run: () => onNavigate?.('settings'), done: hasHours },
    { id: 'payments', icon: Wallet, title: 'Set up payments', description: 'Connect Stripe to take deposits when clients book.', run: () => onNavigate?.('stripe'), done: stripeReady },
    { id: 'profile', icon: UserRound, title: 'Complete your profile', description: 'Add a photo and a short bio so clients know who you are.', run: () => onNavigate?.('preview'), done: !!(profile.bio && profile.logo_url) },
  ];
  const everyday: Action[] = [
    { id: 'share', icon: Share2, title: 'Share your studio link', description: 'Put it in your Instagram and TikTok bio so clients can book you.', run: copyLink },
    { id: 'appointment', icon: CalendarPlus, title: 'Add an appointment', description: 'Booked a client by DM? Add it to your calendar.', run: () => setShowAddBooking(true) },
    { id: 'edit', icon: Pencil, title: 'Refresh your studio', description: 'Try a new template or accent color.', run: () => onNavigate?.('preview') },
  ];
  const pendingSetup = setup.filter((s) => !s.done);
  const actions: Action[] = [...pendingSetup, ...everyday].slice(0, 3);
  const [hero, ...secondary] = actions;
  const setupDoneCount = setup.length - pendingSetup.length;

  const kpis: { id: Metric; label: string; icon: LucideIcon; value: string; growth: number; sub?: string }[] = [
    { id: 'visits', label: 'Studio visits', icon: Eye, value: series.totals.visits.toLocaleString(), growth: growthPct(series.totals.visits, series.prev.visits) },
    { id: 'revenue', label: 'Revenue', icon: Wallet, value: fmt(series.totals.revenue, currency), growth: growthPct(series.totals.revenue, series.prev.revenue),
      sub: series.totals.revenue > 0 ? `${fmt(series.online, currency)} online · ${fmt(series.onSite, currency)} at studio` : undefined },
    { id: 'bookings', label: 'Bookings', icon: CalendarDays, value: String(series.totals.bookings), growth: growthPct(series.totals.bookings, series.prev.bookings) },
  ];
  const chartEmpty = series.points.every((p) => p[metric] === 0);
  const metricLabel = kpis.find((k) => k.id === metric)!.label;

  const merchant = buildLiveMerchant(profile, services);

  return (
    <div className="px-4 py-6 lg:px-8 lg:py-8 max-w-[1400px] mx-auto">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_330px] gap-8 xl:gap-12">
        {/* ── Main column ─────────────────────────────────────────────── */}
        <div className="min-w-0 space-y-6">
          <motion.h2 {...rise(0)} className="text-2xl lg:text-[32px] font-bold text-[#1A1A1A] tracking-tight leading-tight">
            Hey {firstName}, welcome back!
          </motion.h2>

          {/* Recommended actions */}
          <motion.section {...rise(1)}>
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-gray-500" />
                <h3 className="text-[15px] font-semibold text-[#1A1A1A]">Recommended actions</h3>
              </div>
              {pendingSetup.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Setup {setupDoneCount}/{setup.length}</span>
                  <div className="w-16 h-1.5 bg-pink-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#F52B8C] rounded-full" style={{ width: `${(setupDoneCount / setup.length) * 100}%` }} />
                  </div>
                </div>
              )}
            </div>
            <div className="grid md:grid-cols-[1.35fr_1fr] gap-3">
              <button onClick={hero.run}
                className="group text-left bg-[#fde8f3] rounded-2xl p-5 lg:p-6 flex items-center gap-4 hover:bg-[#fbd9eb] hover:-translate-y-0.5 active:scale-[0.99] transition duration-200 focus-visible:ring-2 focus-visible:ring-[#F52B8C] focus-visible:outline-none">
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <hero.icon className="w-7 h-7 text-[#F52B8C]" strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#1A1A1A] text-base lg:text-lg leading-snug">{hero.title}</p>
                  <p className="text-sm text-gray-600 mt-0.5 leading-snug">{hero.description}</p>
                </div>
                <span className="w-10 h-10 rounded-full bg-[#F52B8C] text-white flex items-center justify-center flex-shrink-0 group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </button>
              <div className="grid gap-3">
                {secondary.map((a) => (
                  <button key={a.id} onClick={a.run}
                    className="group text-left bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-3 hover:border-pink-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-16px_rgba(26,26,26,0.3)] active:scale-[0.99] transition duration-200 focus-visible:ring-2 focus-visible:ring-[#F52B8C] focus-visible:outline-none">
                    <div className="w-10 h-10 rounded-xl bg-[#fff4f9] flex items-center justify-center flex-shrink-0">
                      <a.icon className="w-5 h-5 text-[#F52B8C]" strokeWidth={1.8} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-[#1A1A1A]">{a.title}</p>
                      <p className="text-xs text-gray-500 leading-snug">{a.description}</p>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-[#fff4f9] text-[#F52B8C] flex items-center justify-center flex-shrink-0">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Period + KPIs + chart */}
          <motion.section {...rise(2)}>
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="inline-flex gap-1 bg-gray-100 rounded-full p-1">
                {(Object.keys(RANGE_DAYS) as Range[]).map((r) => (
                  <button key={r} onClick={() => setRange(r)} aria-pressed={range === r}
                    className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition ${range === r ? 'bg-white text-[#F52B8C] shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}>
                    {RANGE_LABEL[r]}
                  </button>
                ))}
              </div>
              <button onClick={() => onNavigate?.('analytics')} className="text-sm font-semibold text-[#F52B8C] hover:opacity-75 transition">
                See full analytics
              </button>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-4 lg:p-6">
              <div className="grid grid-cols-3 gap-2 lg:gap-4">
                {kpis.map((k) => {
                  const active = metric === k.id;
                  return (
                    <button key={k.id} onClick={() => setMetric(k.id)} aria-pressed={active}
                      className={`text-left rounded-2xl border p-3 lg:p-4 transition focus-visible:ring-2 focus-visible:ring-[#F52B8C] focus-visible:outline-none ${active ? 'border-[#F52B8C] bg-[#fff8fb]' : 'border-gray-100 hover:border-gray-200'}`}>
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <k.icon className="w-3.5 h-3.5" />
                        <span className="text-xs lg:text-sm font-medium truncate">{k.label}</span>
                      </div>
                      <div className="flex flex-wrap items-baseline gap-x-2 mt-1.5">
                        <span className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#1A1A1A] tracking-tight truncate">{k.value}</span>
                        {k.growth !== 0 && (
                          <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${k.growth > 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {k.growth > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {Math.abs(k.growth)}%
                          </span>
                        )}
                      </div>
                      {k.sub && <p className="hidden sm:block text-[11px] text-gray-400 mt-1 truncate">{k.sub}</p>}
                    </button>
                  );
                })}
              </div>

              <div className="h-[220px] lg:h-[280px] mt-5">
                {chartEmpty ? (
                  <div className="h-full flex items-center justify-center rounded-xl bg-gray-50 text-sm text-gray-400 text-center px-6">
                    No {metricLabel.toLowerCase()} in this period yet.
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={series.points} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
                      <defs>
                        <linearGradient id="homeGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F52B8C" stopOpacity={0.18} />
                          <stop offset="95%" stopColor="#F52B8C" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} minTickGap={24} />
                      <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} width={44} allowDecimals={metric === 'revenue'} />
                      <Tooltip
                        contentStyle={{ background: '#fff', border: '1px solid #f3f4f6', borderRadius: 12, fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                        formatter={(v) => [metric === 'revenue' ? fmt(Number(v ?? 0), currency) : String(v), metricLabel]}
                        labelStyle={{ color: '#6b7280', fontWeight: 500 }} />
                      <Area type="monotone" dataKey={metric} stroke="#F52B8C" strokeWidth={2.5} fill="url(#homeGrad)"
                        dot={false} activeDot={{ r: 4, fill: '#F52B8C', stroke: '#fff', strokeWidth: 2 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </motion.section>

          {/* Upcoming + balance */}
          <motion.section {...rise(3)} className="grid md:grid-cols-[minmax(0,1fr)_260px] gap-3">
            <div className="bg-white border border-gray-100 rounded-2xl p-4 lg:p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-[#1A1A1A]">Upcoming appointments</h3>
                <div className="flex items-center gap-3">
                  <button onClick={() => onNavigate?.('calendar')} className="text-xs font-medium text-gray-500 hover:text-[#1A1A1A] transition">
                    View calendar
                  </button>
                  <button onClick={() => setShowAddBooking(true)} aria-label="Add appointment"
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#F52B8C] text-white rounded-lg text-xs font-bold hover:opacity-90 transition">
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>
              {upcoming.length === 0 ? (
                <p className="text-sm text-gray-400 py-4">No upcoming appointments. Share your link to get booked.</p>
              ) : (
                <div className="space-y-1.5">
                  {upcoming.slice(0, 5).map((b) => {
                    const dt = new Date(b.booking_datetime);
                    const when = dt.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: profile.timezone ?? undefined });
                    const cfg = STATUS_CONFIG[b.status] ?? STATUS_CONFIG.pending;
                    const name = b.client_name || 'Client';
                    return (
                      <div key={b.id} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                        <div className="w-9 h-9 rounded-full bg-[#fde8f3] text-[#F52B8C] flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-semibold text-sm text-[#1A1A1A] truncate">{name}</p>
                            <p className="font-semibold text-sm text-[#1A1A1A] flex-shrink-0">{fmt(Number(b.price_total ?? 0), currency)}</p>
                          </div>
                          <div className="flex items-center justify-between gap-2 mt-0.5">
                            <p className="text-xs text-gray-500 truncate">{servicesMap.get(b.service_id ?? '')?.name ?? 'Service'} · {when}</p>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border flex-shrink-0 ${cfg.cls}`}>{cfg.label}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {upcoming.length > 5 && (
                    <button onClick={() => onNavigate?.('calendar')} className="w-full pt-2 text-xs font-semibold text-[#F52B8C] hover:opacity-75 transition">
                      View {upcoming.length - 5} more
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="bg-[#1A1A1A] rounded-2xl p-5 flex flex-col">
              <p className="text-white/50 text-[11px] font-semibold uppercase tracking-wider">Balance</p>
              {stripeReady ? (
                <>
                  <p className="text-white text-3xl font-bold tracking-tight mt-2">{fmt(balance.available, currency)}</p>
                  <p className="text-white/50 text-xs mt-1">{fmt(balance.pending, currency)} pending</p>
                  <button onClick={() => onNavigate?.('revenue')}
                    className="mt-auto pt-4 w-full">
                    <span className="block w-full py-2.5 bg-[#F52B8C] text-white rounded-xl text-sm font-bold hover:opacity-90 transition">View income</span>
                  </button>
                </>
              ) : (
                <>
                  <p className="text-white font-semibold mt-2">Payments not set up</p>
                  <p className="text-white/50 text-xs mt-1 leading-relaxed">Connect Stripe to accept deposits and receive payouts.</p>
                  <button onClick={() => onNavigate?.('stripe')} className="mt-auto pt-4 w-full">
                    <span className="block w-full py-2.5 bg-white text-[#1A1A1A] rounded-xl text-sm font-bold hover:opacity-90 transition">Set up payments</span>
                  </button>
                </>
              )}
            </div>
          </motion.section>
        </div>

        {/* ── Live studio preview ─────────────────────────────────────── */}
        <motion.aside {...rise(2)} className="hidden lg:block">
          <div className="sticky top-6 flex flex-col items-center gap-4">
            <StudioPhonePreview merchant={merchant} width={300} />
            <button onClick={() => onNavigate?.('preview')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#fde8f3] text-[#F52B8C] text-sm font-bold hover:bg-[#fbd9eb] transition">
              <Pencil className="w-4 h-4" /> Edit studio
            </button>
          </div>
        </motion.aside>
      </div>

      <AddBookingModal
        isOpen={showAddBooking}
        onClose={() => setShowAddBooking(false)}
        onSuccess={() => { void loadData(); showSuccess('Appointment added'); }}
        profileId={profileId}
        services={services}
      />
      {toast && <Toast type={toast.type} message={toast.message} onClose={hideToast} />}
    </div>
  );
}
