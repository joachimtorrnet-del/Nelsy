import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { DbBooking, DbProfile, DbService } from '@/lib/supabase';
import { calculateStats, getBookings, getPageViewStats, getServices, toggleServiceActive } from '@/lib/supabase-queries';
import { dbProfileToMerchant } from '@/hooks/useStudio';
import { CurrencyProvider } from '@/lib/currency';
import { buildDemoSnapshot, clearDemoFlag } from '../lib/demo';
import { registerPush } from '../lib/push';
import type { ProBooking, ProSnapshot } from '../lib/types';
import { ProDataContext } from './useProData';
import type { ProDataValue } from './useProData';

const DAY = 24 * 60 * 60 * 1000;

async function loadLive(userId: string, email: string): Promise<ProSnapshot> {
  const client = supabase;
  if (!client) throw new Error('Supabase is not configured in this build.');

  const { data: profile, error } = await client.from('profiles').select('*').eq('id', userId).single();
  if (error || !profile) throw new Error('We could not find a Nelsy studio for this account.');
  const p = profile as DbProfile;

  const now = Date.now();
  const [servicesRes, bookingsRes, stats, views] = await Promise.all([
    getServices(p.id),
    getBookings(p.id, new Date(now - 60 * DAY), new Date(now + 60 * DAY)),
    calculateStats(p.id).catch(() => null),
    getPageViewStats(p.id, new Date(now - 28 * DAY)).catch(() => null),
  ]);
  const serviceRows = (servicesRes.data ?? []) as DbService[];
  const bookingRows = (bookingsRes.data ?? []) as DbBooking[];

  const full = dbProfileToMerchant(p, serviceRows);
  const services = full.services.map((s, i) => ({ ...s, active: serviceRows[i]?.active ?? true }));
  const merchant = { ...full, services: full.services.filter((_, i) => serviceRows[i]?.active !== false) };
  const serviceName = new Map(serviceRows.map((s) => [s.id, s.name]));

  const bookings: ProBooking[] = bookingRows.map((b) => ({
    id: b.id,
    datetime: b.booking_datetime,
    clientName: b.client_name,
    serviceName: (b.service_id && serviceName.get(b.service_id)) || 'Booking',
    price: Number(b.price_total),
    depositPaid: Number(b.deposit_paid),
    duration: b.duration_minutes,
    status: b.status,
  }));

  return {
    mode: 'live',
    profileId: p.id,
    email: p.email || email,
    fullName: p.full_name,
    salonName: p.salon_name,
    slug: p.slug,
    avatarUrl: p.logo_url,
    currency: (p.business_currency ?? 'EUR').toUpperCase(),
    plan: p.plan,
    subscriptionStatus: p.subscription_status,
    merchant,
    services,
    bookings,
    totalRevenue: stats?.totalRevenue ?? 0,
    balance: stats?.availableBalance ?? 0,
    pageViews28: views?.total ?? null,
  };
}

interface Props {
  demo: boolean;
  userId: string | null;
  email: string;
  onSignedOut: () => void;
  children: ReactNode;
}

export function ProDataProvider({ demo, userId, email, onSignedOut, children }: Props) {
  const [data, setData] = useState<ProSnapshot | null>(() => (demo ? buildDemoSnapshot() : null));
  const [loading, setLoading] = useState(!demo);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (demo) {
      setData(buildDemoSnapshot());
      return;
    }
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      setData(await loadLive(userId, email));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }, [demo, userId, email]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (demo || !userId) return;
    void registerPush((token) => {
      // TODO(backend): save `token` for this pro (push_tokens table + RLS) once APNs / FCM keys exist.
      console.info('[push] device token received', token.slice(0, 12));
    });
  }, [demo, userId]);

  const setServiceActive = useCallback(
    async (id: string, active: boolean) => {
      // Optimistic update; demo mode never writes.
      setData((d) => d && { ...d, services: d.services.map((s) => (s.id === id ? { ...s, active } : s)) });
      if (demo) return;
      const { error: err } = await toggleServiceActive(id, active);
      if (err) await refresh();
    },
    [demo, refresh],
  );

  const signOut = useCallback(async () => {
    if (demo) clearDemoFlag();
    else await supabase?.auth.signOut();
    setData(null);
    onSignedOut();
  }, [demo, onSignedOut]);

  const value = useMemo<ProDataValue>(
    () => ({ data, loading, error, refresh, setServiceActive, signOut }),
    [data, loading, error, refresh, setServiceActive, signOut],
  );

  return (
    <ProDataContext.Provider value={value}>
      <CurrencyProvider currency={data?.currency}>{children}</CurrencyProvider>
    </ProDataContext.Provider>
  );
}
