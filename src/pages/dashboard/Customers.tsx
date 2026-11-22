import { useEffect, useMemo, useState } from 'react';
import { Search, Download, Mail, Phone, X, Users, CalendarDays, AlertCircle, RefreshCw } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { DbBookingRow } from '../../lib/supabase';
import { getBookings } from '../../lib/supabase-queries';

interface CustomersProfile {
  id: string;
  business_currency?: string;
  timezone?: string;
}

interface Customer {
  key: string;
  name: string;
  email: string;
  phone: string;
  visits: number;
  noShows: number;
  cancellations: number;
  totalBooked: number;
  firstVisit: string;
  lastVisit: string;
  nextVisit: string | null;
  bookings: DbBookingRow[];
}

type SortKey = 'recent' | 'visits' | 'total' | 'name';

const COUNTED = new Set(['confirmed', 'paid', 'completed']);
const IGNORED = new Set(['pending', 'expired']);

const STATUS_LABEL: Record<string, { label: string; cls: string }> = {
  confirmed: { label: 'Confirmed', cls: 'bg-blue-50 text-blue-700 border-blue-200' },
  paid:      { label: 'Paid',      cls: 'bg-green-50 text-green-700 border-green-200' },
  completed: { label: 'Completed', cls: 'bg-gray-100 text-gray-700 border-gray-200' },
  no_show:   { label: 'No-show',   cls: 'bg-orange-50 text-orange-700 border-orange-200' },
  cancelled: { label: 'Cancelled', cls: 'bg-red-50 text-red-600 border-red-200' },
  refunded:  { label: 'Refunded',  cls: 'bg-purple-50 text-purple-700 border-purple-200' },
};

function fmtMoney(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 2 }).format(amount);
}

function fmtDate(iso: string, timeZone?: string) {
  return new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', timeZone });
}

function customerKey(b: DbBookingRow) {
  const email = b.client_email?.trim().toLowerCase();
  if (email) return `e:${email}`;
  const phone = b.client_phone?.replace(/\D/g, '');
  if (phone) return `p:${phone}`;
  return `n:${b.client_name?.trim().toLowerCase() ?? 'unknown'}`;
}

function buildCustomers(bookings: DbBookingRow[]): Customer[] {
  const now = Date.now();
  const map = new Map<string, Customer>();

  for (const b of bookings) {
    if (IGNORED.has(b.status)) continue;
    const key = customerKey(b);
    let c = map.get(key);
    if (!c) {
      c = {
        key, name: b.client_name || 'Unknown', email: b.client_email ?? '', phone: b.client_phone ?? '',
        visits: 0, noShows: 0, cancellations: 0, totalBooked: 0,
        firstVisit: b.booking_datetime, lastVisit: b.booking_datetime, nextVisit: null, bookings: [],
      };
      map.set(key, c);
    }
    c.bookings.push(b);
    if (!c.email && b.client_email) c.email = b.client_email;
    if (!c.phone && b.client_phone) c.phone = b.client_phone;

    if (COUNTED.has(b.status)) {
      c.visits += 1;
      c.totalBooked += Number(b.price_total) || 0;
      const t = new Date(b.booking_datetime).getTime();
      if (t < new Date(c.firstVisit).getTime()) c.firstVisit = b.booking_datetime;
      if (t <= now && t > new Date(c.lastVisit).getTime()) c.lastVisit = b.booking_datetime;
      if (t > now && (!c.nextVisit || t < new Date(c.nextVisit).getTime())) c.nextVisit = b.booking_datetime;
    }
    if (b.status === 'no_show') c.noShows += 1;
    if (b.status === 'cancelled') c.cancellations += 1;
  }

  for (const c of map.values()) {
    c.bookings.sort((a, b) => new Date(b.booking_datetime).getTime() - new Date(a.booking_datetime).getTime());
    // Name from the most recent booking is the most likely to be current
    c.name = c.bookings[0]?.client_name || c.name;
  }
  return Array.from(map.values());
}

function exportCsv(customers: Customer[], currency: string) {
  const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
  const header = ['Name', 'Email', 'Phone', 'Visits', 'No-shows', 'Cancellations', `Total booked (${currency})`, 'First visit', 'Last visit'];
  const rows = customers.map((c) => [
    c.name, c.email, c.phone, c.visits, c.noShows, c.cancellations, c.totalBooked.toFixed(2),
    c.firstVisit.slice(0, 10), c.lastVisit.slice(0, 10),
  ]);
  const csv = [header, ...rows].map((r) => r.map(esc).join(',')).join('\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `nelsy-customers-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Customers({ profile }: { profile: CustomersProfile | null }) {
  const [bookings, setBookings] = useState<DbBookingRow[]>([]);
  const [serviceNames, setServiceNames] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('recent');
  const [selected, setSelected] = useState<Customer | null>(null);

  const currency = (profile?.business_currency ?? 'EUR').toUpperCase();
  const tz = profile?.timezone;

  const load = async () => {
    if (!profile?.id || !supabase) return;
    setLoading(true);
    setError(false);
    try {
      const [{ data: bk, error: bkErr }, { data: svc }] = await Promise.all([
        getBookings(profile.id),
        supabase.from('services').select('id, name').eq('profile_id', profile.id),
      ]);
      if (bkErr) throw bkErr;
      setBookings((bk ?? []) as DbBookingRow[]);
      setServiceNames(Object.fromEntries((svc ?? []).map((s: { id: string; name: string }) => [s.id, s.name])));
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { void load(); }, [profile?.id]);

  const customers = useMemo(() => buildCustomers(bookings), [bookings]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? customers.filter((c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q))
      : customers.slice();
    list.sort((a, b) => {
      if (sort === 'visits') return b.visits - a.visits;
      if (sort === 'total') return b.totalBooked - a.totalBooked;
      if (sort === 'name') return a.name.localeCompare(b.name);
      return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime();
    });
    return list;
  }, [customers, query, sort]);

  const repeatCount = customers.filter((c) => c.visits >= 2).length;
  const repeatRate = customers.length ? Math.round((repeatCount / customers.length) * 100) : 0;
  const avgValue = customers.length ? customers.reduce((s, c) => s + c.totalBooked, 0) / customers.length : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#F52B8C] border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <AlertCircle className="w-8 h-8 text-red-400 mb-3" />
        <p className="text-sm text-gray-600 mb-4">We couldn't load your customers.</p>
        <button onClick={() => void load()} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:border-[#F52B8C] hover:text-[#F52B8C] transition">
          <RefreshCw className="w-4 h-4" /> Try again
        </button>
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 min-h-[60vh]">
        <div className="max-w-sm w-full text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#fde8f3] flex items-center justify-center mx-auto mb-5">
            <Users className="w-7 h-7 text-[#F52B8C]" strokeWidth={1.6} />
          </div>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">No customers yet</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Every client who books with you shows up here automatically, with their visit history and contact details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 lg:px-8 max-w-6xl">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Customers', value: String(customers.length) },
          { label: 'Repeat clients', value: `${repeatRate}%` },
          { label: 'Avg. value', value: fmtMoney(avgValue, currency) },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-4">
            <p className="text-xs text-gray-400 mb-1">{s.label}</p>
            <p className="text-xl lg:text-2xl font-bold text-[#1A1A1A] tracking-tight truncate">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email or phone"
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#F52B8C] focus:outline-none transition"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:border-[#F52B8C] focus:outline-none"
            aria-label="Sort customers"
          >
            <option value="recent">Most recent</option>
            <option value="visits">Most visits</option>
            <option value="total">Highest value</option>
            <option value="name">Name A–Z</option>
          </select>
          <button
            onClick={() => exportCsv(visible, currency)}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-[#F52B8C] hover:text-[#F52B8C] transition whitespace-nowrap"
          >
            <Download className="w-4 h-4" /> <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* List */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="hidden md:grid grid-cols-[2fr_2fr_1fr_1fr_1fr] gap-4 px-5 py-3 border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
          <span>Customer</span><span>Contact</span><span>Visits</span><span>Total booked</span><span>Last visit</span>
        </div>
        {visible.length === 0 && (
          <p className="px-5 py-10 text-center text-sm text-gray-400">No customer matches "{query}".</p>
        )}
        {visible.map((c) => (
          <button
            key={c.key}
            onClick={() => setSelected(c)}
            className="w-full text-left grid grid-cols-[1fr_auto] md:grid-cols-[2fr_2fr_1fr_1fr_1fr] gap-4 items-center px-5 py-3.5 border-b border-gray-50 last:border-0 hover:bg-[#fff8fa] transition focus-visible:outline-none focus-visible:bg-[#fff8fa]"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-[#fde8f3] text-[#F52B8C] flex items-center justify-center text-sm font-bold flex-shrink-0">
                {c.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#1A1A1A] truncate">{c.name}</p>
                <p className="text-xs text-gray-400 truncate md:hidden">{c.visits} visit{c.visits === 1 ? '' : 's'} · {c.email || c.phone}</p>
                {c.visits >= 2 && <span className="hidden md:inline text-[10px] font-semibold text-[#F52B8C]">Regular</span>}
              </div>
            </div>
            <div className="hidden md:block min-w-0">
              <p className="text-sm text-gray-600 truncate">{c.email || '—'}</p>
              <p className="text-xs text-gray-400 truncate">{c.phone}</p>
            </div>
            <p className="hidden md:block text-sm text-gray-700">
              {c.visits}
              {c.noShows > 0 && <span className="ml-1.5 text-[11px] text-orange-600">({c.noShows} no-show)</span>}
            </p>
            <p className="text-sm font-semibold text-[#1A1A1A] md:font-medium">{fmtMoney(c.totalBooked, currency)}</p>
            <p className="hidden md:block text-sm text-gray-500">{c.visits ? fmtDate(c.lastVisit, tz) : '—'}</p>
          </button>
        ))}
      </div>

      {selected && (
        <CustomerDrawer
          customer={selected}
          currency={currency}
          tz={tz}
          serviceNames={serviceNames}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

function CustomerDrawer({ customer: c, currency, tz, serviceNames, onClose }: {
  customer: Customer;
  currency: string;
  tz?: string;
  serviceNames: Record<string, string>;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label={c.name}>
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <aside className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-full bg-[#fde8f3] text-[#F52B8C] flex items-center justify-center font-bold flex-shrink-0">
              {c.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-[#1A1A1A] truncate">{c.name}</h2>
              <p className="text-xs text-gray-400">Client since {fmtDate(c.firstVisit, tz)}</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-2 rounded-xl hover:bg-gray-100 text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          <div className="flex gap-2">
            {c.email && (
              <a href={`mailto:${c.email}`} className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:border-[#F52B8C] hover:text-[#F52B8C] transition">
                <Mail className="w-4 h-4" /> Email
              </a>
            )}
            {c.phone && (
              <a href={`tel:${c.phone}`} className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:border-[#F52B8C] hover:text-[#F52B8C] transition">
                <Phone className="w-4 h-4" /> Call
              </a>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Visits', value: String(c.visits) },
              { label: 'Total', value: fmtMoney(c.totalBooked, currency) },
              { label: 'No-shows', value: String(c.noShows) },
            ].map((s) => (
              <div key={s.label} className="bg-gray-50 rounded-xl p-3">
                <p className="text-[11px] text-gray-400">{s.label}</p>
                <p className="text-sm font-bold text-[#1A1A1A] truncate">{s.value}</p>
              </div>
            ))}
          </div>

          {c.nextVisit && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#fff8fa] border border-pink-100">
              <CalendarDays className="w-4 h-4 text-[#F52B8C]" />
              <p className="text-sm text-gray-700">Next visit: <span className="font-semibold">{fmtDate(c.nextVisit, tz)}</span></p>
            </div>
          )}

          <div className="space-y-1 text-sm">
            {c.email && <p className="text-gray-600 break-all">{c.email}</p>}
            {c.phone && <p className="text-gray-600">{c.phone}</p>}
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Booking history</p>
            <div className="space-y-2">
              {c.bookings.map((b) => {
                const st = STATUS_LABEL[b.status] ?? { label: b.status, cls: 'bg-gray-100 text-gray-600 border-gray-200' };
                return (
                  <div key={b.id} className="flex items-center justify-between gap-3 p-3 rounded-xl border border-gray-100">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#1A1A1A] truncate">{(b.service_id && serviceNames[b.service_id]) || 'Service'}</p>
                      <p className="text-xs text-gray-400">{fmtDate(b.booking_datetime, tz)}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold text-[#1A1A1A]">{fmtMoney(Number(b.price_total) || 0, currency)}</p>
                      <span className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium border ${st.cls}`}>{st.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
