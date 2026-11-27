import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { DbBooking, DbProfile, DbService } from '@/lib/supabase';
import { calculateStats, getBookings, getPageViewStats, getServices, toggleServiceActive, updateProfile } from '@/lib/supabase-queries';
import { dbProfileToMerchant } from '@/hooks/useStudio';
import { CurrencyProvider } from '@/lib/currency';
import { hasFeature } from '@/lib/plans';
import { getMyProducts } from '@/lib/products';
import { getMyKitItems } from '@/lib/kit';
import { fetchVideoLinksForProfile } from '@/lib/onlineSessions';
import { saveProfileTimezone } from '@/lib/timezone';
import { buildDemoSnapshot, clearDemoFlag } from '../lib/demo';
import { registerPush, unregisterPush } from '../lib/push';
import { DEFAULT_TZ } from '../lib/format';
import type { NotificationPrefs, ProBooking, ProSnapshot } from '../lib/types';
import { ProDataContext } from './useProData';
import type { ProDataValue } from './useProData';

const DAY = 24 * 60 * 60 * 1000;

async function loadLive(userId: string, email: string): Promise<ProSnapshot> {
  const client = supabase;
  if (!client) throw new Error('Supabase is not configured in this build.');

  const { data: profile, error } = await client.from('profiles').select('*').eq('id', userId).single();
  if (error || !profile) throw new Error('We could not find a Nelsy studio for this account.');
  const p = profile as DbProfile;
  const creatorProducts = hasFeature(p.plan, 'digital_products');
  const creatorKit = hasFeature(p.plan, 'affiliates');

  const now = Date.now();
  // Everything after the profile is best effort: a missing table (migration not applied yet)
  // or a network blip on one section must not blank the whole app.
  const [servicesRes, bookingsRes, stats, views, products, kit, videoLinks] = await Promise.all([
    getServices(p.id),
    getBookings(p.id, new Date(now - 60 * DAY), new Date(now + 60 * DAY)),
    calculateStats(p.id).catch(() => null),
    getPageViewStats(p.id, new Date(now - 28 * DAY)).catch(() => null),
    creatorProducts ? getMyProducts(p.id).catch(() => []) : Promise.resolve([]),
    creatorKit ? getMyKitItems(p.id).catch(() => []) : Promise.resolve([]),
    fetchVideoLinksForProfile(p.id),
  ]);
  const serviceRows = (servicesRes.data ?? []) as DbService[];
  const bookingRows = (bookingsRes.data ?? []) as DbBooking[];

  const full = dbProfileToMerchant(p, serviceRows);
  const services = full.services.map((s, i) => ({
    ...s,
    active: serviceRows[i]?.active ?? true,
    online: serviceRows[i]?.location_type === 'online',
  }));
  const merchant = { ...full, services: full.services.filter((_, i) => serviceRows[i]?.active !== false) };
  const byId = new Map(serviceRows.map((s) => [s.id, s]));

  const bookings: ProBooking[] = bookingRows.map((b) => {
    const svc = b.service_id ? byId.get(b.service_id) : undefined;
    const online = svc?.location_type === 'online';
    return {
      id: b.id,
      datetime: b.booking_datetime,
      clientName: b.client_name,
      clientEmail: b.client_email ?? '',
      clientPhone: b.client_phone ?? '',
      serviceId: b.service_id,
      serviceName: svc?.name || 'Booking',
      price: Number(b.price_total),
      depositPaid: Number(b.deposit_paid),
      duration: b.duration_minutes,
      status: b.status,
      online,
      videoUrl: online && b.service_id ? (videoLinks.get(b.service_id) ?? null) : null,
    };
  });

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
    planRenewsAt: (p.subscription_status === 'trialing' || p.subscription_status === 'trial' ? p.trial_ends_at : p.current_period_end) ?? null,
    stripeConnected: !!p.stripe_onboarding_complete,
    timezone: p.timezone || DEFAULT_TZ,
    notificationPrefs: (p.notification_preferences ?? {}) as NotificationPrefs,
    merchant,
    services,
    bookings,
    products,
    kit,
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

  // Register the device for push on login (native builds with VITE_PUSH_ENABLED=1 only).
  useEffect(() => {
    if (demo || !userId) return;
    void registerPush();
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

  /** Same storage as the website Settings: profiles.notification_preferences (merged, absent = on). */
  const setNotificationPref = useCallback(
    async (key: string, value: boolean): Promise<boolean> => {
      const before = data?.notificationPrefs ?? {};
      const next = { ...before, [key]: value };
      setData((d) => d && { ...d, notificationPrefs: next });
      if (demo || !data) return true;
      try {
        const { error: err } = await updateProfile(data.profileId, { notification_preferences: next });
        if (err) throw err;
        return true;
      } catch {
        setData((d) => d && { ...d, notificationPrefs: before });
        return false;
      }
    },
    [demo, data],
  );

  const setTimezone = useCallback(
    async (tz: string): Promise<boolean> => {
      if (!data) return false;
      if (!demo && !(await saveProfileTimezone(data.profileId, tz))) return false;
      setData((d) => d && { ...d, timezone: tz });
      return true;
    },
    [demo, data],
  );

  const signOut = useCallback(async () => {
    if (demo) clearDemoFlag();
    else {
      await unregisterPush();
      await supabase?.auth.signOut();
    }
    setData(null);
    onSignedOut();
  }, [demo, onSignedOut]);

  const value = useMemo<ProDataValue>(
    () => ({ data, loading, error, refresh, setServiceActive, setNotificationPref, setTimezone, signOut }),
    [data, loading, error, refresh, setServiceActive, setNotificationPref, setTimezone, signOut],
  );

  return (
    <ProDataContext.Provider value={value}>
      <CurrencyProvider currency={data?.currency}>{children}</CurrencyProvider>
    </ProDataContext.Provider>
  );
}
