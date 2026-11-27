import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronRight, Copy, Sparkles, X } from 'lucide-react';
import { useMoney } from '@/lib/currency';
import { useProData } from '../hooks/useProData';
import { Avatar, DemoBanner } from '../components/ui';
import { RevenueChart } from '../components/RevenueChart';
import { BookingRow } from '../components/BookingRow';
import { Logo } from '../components/Logo';
import { PINK, WEB, WEB_ORIGIN, pageUrl } from '../lib/constants';
import { copyText, openExternal, prefs } from '../lib/native';
import type { ProSnapshot } from '../lib/types';

const DAY = 24 * 60 * 60 * 1000;
const EARNING = new Set(['paid', 'confirmed', 'completed']);
const ACTIVE_SUBS = new Set(['active', 'trialing', 'trial', 'past_due']);

function last28(data: ProSnapshot) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const from = start.getTime() - 27 * DAY;
  const days = new Array(28).fill(0) as number[];
  let count = 0;
  for (const b of data.bookings) {
    const t = new Date(b.datetime).getTime();
    if (t < from || t > Date.now()) continue;
    if (b.status !== 'cancelled' && b.status !== 'expired') count++;
    if (EARNING.has(b.status)) days[Math.min(27, Math.floor((t - from) / DAY))] += b.price;
  }
  const recent = data.bookings
    .filter((b) => new Date(b.datetime).getTime() <= Date.now())
    .sort((a, b) => +new Date(b.datetime) - +new Date(a.datetime))
    .slice(0, 4);
  return { days, count, from: new Date(from), recent };
}

export default function Home() {
  const { data } = useProData();
  const money = useMoney();
  const [copied, setCopied] = useState(false);
  const [promoHidden, setPromoHidden] = useState(true);

  useEffect(() => {
    void prefs.get('home-promo-dismissed', false).then(setPromoHidden);
  }, []);

  const stats = useMemo(() => (data ? last28(data) : null), [data]);
  if (!data || !stats) return null;

  const link = pageUrl(data.slug);
  const subscribed = ACTIVE_SUBS.has(data.subscriptionStatus ?? '');
  const { recent } = stats;

  const copy = async () => {
    if (await copyText(`https://${link}`)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };
  const dismissPromo = () => {
    setPromoHidden(true);
    void prefs.set('home-promo-dismissed', true);
  };

  return (
    <div className="pb-6">
      {/* Brand + page link */}
      <div className="flex items-center gap-3 px-4 pb-3 pt-2">
        <Logo size={30} wordmark={false} />
        <button
          type="button"
          onClick={copy}
          className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-full border border-gray-200 bg-white pl-4 pr-1.5"
          aria-label="Copy your page link"
        >
          <span className="min-w-0 flex-1 truncate text-left text-[14px] font-semibold text-[#1A1A1A]">{link}</span>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100">
            {copied ? <Check size={16} className="text-[#11733F]" /> : <Copy size={15} />}
          </span>
        </button>
      </div>

      {data.mode === 'demo' && <DemoBanner />}

      {/* Revenue */}
      <div className="flex items-center gap-3 px-4 pt-2">
        <Avatar src={data.avatarUrl} name={data.salonName} size={48} />
        <div>
          <p className="text-[13px] font-medium text-gray-500">Total revenue</p>
          <p className="text-[30px] font-extrabold leading-tight tracking-tight">{money(data.totalRevenue)}</p>
        </div>
      </div>

      {/* Balance */}
      <div className="mx-4 mt-4 flex items-center justify-between rounded-2xl bg-[#1A1A1A] p-4 text-white">
        <div>
          <p className="text-[12px] font-medium text-white/60">Balance</p>
          <p className="text-[22px] font-extrabold">{money(data.balance)}</p>
          <p className="text-[11.5px] text-white/50">From completed bookings. Payouts by Stripe.</p>
        </div>
        <button
          type="button"
          onClick={() => openExternal(WEB.payouts)}
          className="flex h-11 shrink-0 items-center rounded-full bg-white px-4 text-[13px] font-bold text-[#1A1A1A]"
        >
          Payouts
        </button>
      </div>

      {/* Promo */}
      {!subscribed ? (
        <div className="mx-4 mt-4 rounded-2xl p-4 text-white" style={{ backgroundColor: PINK }}>
          <p className="flex items-center gap-1.5 text-[15px] font-bold">
            <Sparkles size={16} /> Turn on your page
          </p>
          <p className="mt-1 text-[13px] text-white/85">Start your free trial on {WEB_ORIGIN.replace('https://', '')} so clients can book you.</p>
          <button
            type="button"
            onClick={() => openExternal(`${WEB.signup}?plan=independent_monthly&resume=1`)}
            className="mt-3 h-11 rounded-full bg-white px-4 text-[13px] font-bold"
            style={{ color: PINK }}
          >
            Start free trial
          </button>
        </div>
      ) : (
        !promoHidden && (
          <div className="relative mx-4 mt-4 rounded-2xl bg-[#FFF0F7] p-4 pr-12">
            <button type="button" onClick={dismissPromo} aria-label="Dismiss" className="absolute right-1 top-1 flex h-11 w-11 items-center justify-center text-gray-500">
              <X size={18} />
            </button>
            <p className="text-[15px] font-bold text-[#1A1A1A]">Put your link in your bio</p>
            <p className="mt-1 text-[13px] text-gray-600">Add {link} to Instagram and TikTok so followers can book in one tap.</p>
            <button type="button" onClick={copy} className="mt-3 h-11 rounded-full px-4 text-[13px] font-bold text-white" style={{ backgroundColor: PINK }}>
              {copied ? 'Copied' : 'Copy my link'}
            </button>
          </div>
        )
      )}

      {/* Stats */}
      <section className="mx-4 mt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[19px] font-extrabold">Stats</h2>
            <p className="text-[12px] text-gray-400">Last 28 days</p>
          </div>
          <button type="button" onClick={() => openExternal(WEB.analytics)} className="flex h-11 items-center gap-0.5 text-[14px] font-semibold" style={{ color: PINK }}>
            View all <ChevronRight size={16} />
          </button>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-gray-100 p-3.5">
            <p className="text-[12px] text-gray-500">Bookings</p>
            <p className="text-[24px] font-extrabold">{stats.count}</p>
          </div>
          <div className="rounded-2xl border border-gray-100 p-3.5">
            <p className="text-[12px] text-gray-500">Page views</p>
            <p className="text-[24px] font-extrabold">{data.pageViews28 ?? '-'}</p>
          </div>
        </div>
        <div className="mt-3 rounded-2xl border border-gray-100 p-3.5">
          <p className="mb-2 text-[12px] text-gray-500">Revenue per day</p>
          <RevenueChart
            points={stats.days}
            labels={[stats.from.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), 'Today']}
          />
        </div>
      </section>

      {/* Recent bookings */}
      <section className="mx-4 mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[19px] font-extrabold">Recent bookings</h2>
          <Link to="/bookings" className="flex h-11 items-center gap-0.5 text-[14px] font-semibold" style={{ color: PINK }}>
            See all <ChevronRight size={16} />
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="mt-2 rounded-2xl bg-gray-50 p-4 text-[14px] text-gray-500">No bookings yet. Share your link to get your first one.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {recent.map((b) => (
              <BookingRow key={b.id} b={b} showDate />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
