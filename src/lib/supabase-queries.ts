import { supabase } from './supabase';

// ============ BOOKINGS (Appointments) ============

export async function getBookings(profileId: string, startDate?: Date, endDate?: Date) {
  if (!supabase) throw new Error('Supabase not initialized');

  let query = supabase
    .from('bookings')
    .select('*')
    .eq('profile_id', profileId)
    .order('booking_datetime', { ascending: true });

  if (startDate) {
    query = query.gte('booking_datetime', startDate.toISOString());
  }
  if (endDate) {
    query = query.lte('booking_datetime', endDate.toISOString());
  }

  return query;
}

export async function createBooking(data: {
  profile_id: string;
  service_id: string;
  booking_datetime: string;
  client_name: string;
  client_email?: string;
  client_phone?: string;
  price_total: number;
  deposit_paid?: number;
  status?: string;
}) {
  if (!supabase) throw new Error('Supabase not initialized');

  return supabase
    .from('bookings')
    .insert({ ...data, status: data.status ?? 'pending' })
    .select('*')
    .single();
}

export async function updateBooking(id: string, updates: Record<string, unknown>) {
  if (!supabase) throw new Error('Supabase not initialized');

  return supabase
    .from('bookings')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single();
}

export async function deleteBooking(id: string) {
  if (!supabase) throw new Error('Supabase not initialized');

  return supabase
    .from('bookings')
    .delete()
    .eq('id', id);
}

export async function confirmBooking(id: string) {
  if (!supabase) throw new Error('Supabase not initialized');

  return supabase
    .from('bookings')
    .update({ status: 'confirmed' })
    .eq('id', id)
    .select('*')
    .single();
}

export async function completeBooking(id: string) {
  if (!supabase) throw new Error('Supabase not initialized');

  return supabase
    .from('bookings')
    .update({ status: 'completed', completed_at: new Date().toISOString() })
    .eq('id', id)
    .select('*')
    .single();
}

export async function cancelBooking(id: string) {
  if (!supabase) throw new Error('Supabase not initialized');

  return supabase
    .from('bookings')
    .update({ status: 'cancelled' })
    .eq('id', id)
    .select('*')
    .single();
}

// ============ SERVICES ============

export async function getServices(profileId: string) {
  if (!supabase) throw new Error('Supabase not initialized');

  return supabase
    .from('services')
    .select('*')
    .eq('profile_id', profileId)
    .order('display_order', { ascending: true });
}

export async function toggleServiceActive(id: string, active: boolean) {
  if (!supabase) throw new Error('Supabase not initialized');

  return supabase
    .from('services')
    .update({ active })
    .eq('id', id)
    .select('*')
    .single();
}

export async function createService(data: Record<string, unknown>) {
  if (!supabase) throw new Error('Supabase not initialized');

  return supabase
    .from('services')
    .insert(data)
    .select()
    .single();
}

export async function updateService(id: string, updates: Record<string, unknown>) {
  if (!supabase) throw new Error('Supabase not initialized');

  return supabase
    .from('services')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
}

export async function deleteService(id: string) {
  if (!supabase) throw new Error('Supabase not initialized');

  return supabase
    .from('services')
    .delete()
    .eq('id', id);
}

export async function reorderServices(serviceUpdates: { id: string; display_order: number }[]) {
  if (!supabase) throw new Error('Supabase not initialized');

  return Promise.all(
    serviceUpdates.map(({ id, display_order }) => updateService(id, { display_order })),
  );
}

// ============ PROFILE ============

const PROFILE_SAFE_COLUMNS = new Set([
  'full_name', 'salon_name', 'bio', 'phone',
  'instagram_url', 'tiktok_url', 'instagram', 'tiktok',
  'logo_url', 'color_accent', 'theme_preset',
  'slug', 'notification_preferences',
  'cover_url', 'specialty', 'location', 'pinterest_url', 'website_url',
]);

export async function updateProfile(userId: string, updates: Record<string, unknown>) {
  if (!supabase) throw new Error('Supabase not initialized');

  const safe: Record<string, unknown> = {};
  for (const key of Object.keys(updates)) {
    if (PROFILE_SAFE_COLUMNS.has(key)) {
      safe[key] = updates[key];
    } else {
      throw new Error(`updateProfile: column '${key}' is not in the safe allowlist`);
    }
  }

  return supabase
    .from('profiles')
    .update({ ...safe, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();
}

export async function uploadImage(file: File, folder: string) {
  if (!supabase) throw new Error('Supabase not initialized');

  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('images')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('images')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

// ============ AVAILABILITIES ============

export async function getAvailabilities(proId: string) {
  if (!supabase) throw new Error('Supabase not initialized');

  return supabase
    .from('availabilities')
    .select('*')
    .eq('profile_id', proId)
    .order('day_of_week', { ascending: true });
}

export async function updateAvailability(proId: string, dayOfWeek: number, settings: Record<string, unknown>) {
  if (!supabase) throw new Error('Supabase not initialized');

  return supabase
    .from('availabilities')
    .upsert({
      profile_id: proId,
      day_of_week: dayOfWeek,
      ...settings,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();
}

// ============ STATS CALCULATIONS ============

export async function calculateStats(profileId: string) {
  if (!supabase) throw new Error('Supabase not initialized');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());

  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  const { data: bookings } = await supabase
    .from('bookings')
    .select('*')
    .eq('profile_id', profileId)
    .in('status', ['paid', 'confirmed', 'completed']);

  if (!bookings) return null;

  const todayEnd = new Date(today.getTime() + 24 * 60 * 60 * 1000);

  const todayBookings = bookings.filter((b) => {
    const d = new Date(b.booking_datetime);
    return d >= today && d < todayEnd;
  });

  const weekBookings = bookings.filter((b) => new Date(b.booking_datetime) >= weekStart);
  const monthBookings = bookings.filter((b) => new Date(b.booking_datetime) >= monthStart);

  const weekRevenue = weekBookings.reduce((sum, b) => sum + parseFloat(b.price_total ?? 0), 0);
  const monthRevenue = monthBookings.reduce((sum, b) => sum + parseFloat(b.price_total ?? 0), 0);
  const totalRevenue = bookings.reduce((sum, b) => sum + parseFloat(b.price_total ?? 0), 0);

  const completedRevenue = bookings
    .filter((b) => b.status === 'completed')
    .reduce((sum, b) => sum + parseFloat(b.price_total ?? 0), 0);

  // Calculate growth vs previous month
  const prevMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const prevMonthBookings = bookings.filter((b) => {
    const d = new Date(b.booking_datetime);
    return d >= prevMonthStart && d < monthStart;
  });
  const prevMonthRevenue = prevMonthBookings.reduce((sum, b) => sum + parseFloat(b.price_total ?? 0), 0);
  const growth = prevMonthRevenue === 0
    ? (monthRevenue > 0 ? 100 : 0)
    : Math.round(((monthRevenue - prevMonthRevenue) / prevMonthRevenue) * 100);

  return {
    todayBookings: todayBookings.length,
    weekRevenue,
    monthRevenue,
    totalRevenue,
    availableBalance: completedRevenue,
    growth,
  };
}

// ============ PAGE VIEWS ============

export type PageViewSource = 'instagram' | 'tiktok' | 'direct' | 'other';

export function detectPageViewSource(): { source: PageViewSource; referrer: string } {
  const referrer = document.referrer;
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get('utm_source')?.toLowerCase() ?? '';

  let source: PageViewSource = 'direct';

  if (utmSource === 'instagram' || referrer.includes('instagram.com')) {
    source = 'instagram';
  } else if (utmSource === 'tiktok' || referrer.includes('tiktok.com')) {
    source = 'tiktok';
  } else if (referrer && !referrer.includes(window.location.hostname)) {
    source = 'other';
  }

  return { source, referrer };
}

export async function recordPageView(profileId: string) {
  if (!supabase) return; // silently skip — visitor shouldn't see errors

  const { source, referrer } = detectPageViewSource();

  await supabase.from('page_views').insert({
    profile_id: profileId,
    source,
    referrer: referrer || null,
  });
}

export interface PageViewStats {
  total: number;
  bySource: Record<PageViewSource, number>;
}

export async function getPageViewStats(
  profileId: string,
  startDate?: Date,
  endDate?: Date,
): Promise<PageViewStats> {
  if (!supabase) throw new Error('Supabase not initialized');

  let query = supabase
    .from('page_views')
    .select('source')
    .eq('profile_id', profileId);

  if (startDate) query = query.gte('created_at', startDate.toISOString());
  if (endDate) query = query.lte('created_at', endDate.toISOString());

  const { data, error } = await query;
  if (error) throw error;

  const bySource: Record<PageViewSource, number> = {
    instagram: 0,
    tiktok: 0,
    direct: 0,
    other: 0,
  };

  (data ?? []).forEach((row) => {
    const src = row.source as PageViewSource;
    if (src in bySource) bySource[src]++;
  });

  return { total: data?.length ?? 0, bySource };
}

// ============ STUDIO PUBLIC DATA ============

export interface GalleryPhoto {
  id: string;
  image_url: string;
  caption: string | null;
  order_index: number;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_avatar: string | null;
  rating: number;
  text: string;
  created_at: string;
}

export interface BusinessHour {
  id: string;
  day_of_week: number;
  open_time: string | null;
  close_time: string | null;
  is_closed: boolean;
}

export async function addGalleryPhoto(
  profileId: string,
  imageUrl: string,
  caption?: string,
): Promise<GalleryPhoto | null> {
  if (!supabase) throw new Error('Supabase not configured');
  const { data: existing } = await supabase
    .from('gallery_photos')
    .select('order_index')
    .eq('profile_id', profileId)
    .order('order_index', { ascending: false })
    .limit(1);
  const nextOrder = ((existing?.[0] as { order_index: number } | undefined)?.order_index ?? -1) + 1;
  const { data, error } = await supabase
    .from('gallery_photos')
    .insert({ profile_id: profileId, image_url: imageUrl, caption: caption ?? null, order_index: nextOrder })
    .select('id, image_url, caption, order_index')
    .single();
  if (error) throw error;
  return data as GalleryPhoto | null;
}

export async function deleteGalleryPhoto(id: string): Promise<void> {
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await supabase.from('gallery_photos').delete().eq('id', id);
  if (error) throw error;
}

export async function setFeaturedService(profileId: string, serviceId: string): Promise<void> {
  if (!supabase) throw new Error('Supabase not configured');
  await supabase.from('services').update({ is_featured: false }).eq('profile_id', profileId);
  await supabase.from('services').update({ is_featured: true }).eq('id', serviceId);
}

export async function clearFeaturedService(profileId: string): Promise<void> {
  if (!supabase) throw new Error('Supabase not configured');
  await supabase.from('services').update({ is_featured: false }).eq('profile_id', profileId);
}

export async function getGalleryPhotos(profileId: string): Promise<GalleryPhoto[]> {
  if (!supabase) return [];
  const { data } = await supabase
    .from('gallery_photos')
    .select('id, image_url, caption, order_index')
    .eq('profile_id', profileId)
    .order('order_index', { ascending: true })
    .limit(12);
  return (data ?? []) as GalleryPhoto[];
}

export async function getApprovedTestimonials(profileId: string): Promise<Testimonial[]> {
  if (!supabase) return [];
  const { data } = await supabase
    .from('testimonials')
    .select('id, client_name, client_avatar, rating, text, created_at')
    .eq('profile_id', profileId)
    .eq('approved', true)
    .order('created_at', { ascending: false })
    .limit(20);
  return (data ?? []) as Testimonial[];
}

export async function getBusinessHours(profileId: string): Promise<BusinessHour[]> {
  if (!supabase) return [];
  const { data } = await supabase
    .from('business_hours')
    .select('id, day_of_week, open_time, close_time, is_closed')
    .eq('profile_id', profileId)
    .order('day_of_week', { ascending: true });
  return (data ?? []) as BusinessHour[];
}

// ============ SERVICE COLLECTIONS ============

import type { ServiceCollection, CollectionSubcategory, CollectionMember } from '@/types';

export async function getCollectionsForProfile(profileId: string): Promise<ServiceCollection[]> {
  if (!supabase) throw new Error('Supabase not initialized');
  const { data: cols, error: colErr } = await supabase
    .from('service_collections')
    .select('*')
    .eq('profile_id', profileId)
    .order('display_order', { ascending: true });
  if (colErr) throw colErr;
  if (!cols?.length) return [];

  const colIds = cols.map((c: Record<string, unknown>) => c.id as string);

  const [{ data: subs }, { data: members }] = await Promise.all([
    supabase.from('collection_subcategories').select('*').in('collection_id', colIds).order('display_order'),
    supabase.from('collection_members')
      .select('collection_id, service_id, subcategory_id, display_order, services(*)')
      .in('collection_id', colIds)
      .order('display_order'),
  ]);

  return cols.map((col: Record<string, unknown>) => {
    const colSubs = ((subs ?? []) as Record<string, unknown>[])
      .filter((s) => s.collection_id === col.id)
      .map((s) => ({ id: s.id as string, name: s.name as string, display_order: s.display_order as number }));
    const colMembers = ((members ?? []) as Record<string, unknown>[])
      .filter((m) => m.collection_id === col.id)
      .map((m) => {
        const svc = m.services as Record<string, unknown>;
        return {
          service: {
            id: svc.id as string,
            name: svc.name as string,
            description: (svc.description as string) ?? '',
            price: parseFloat(String(svc.price_total ?? 0)),
            duration: (svc.duration_minutes as number) ?? 60,
            deposit: parseFloat(String(svc.deposit_amount ?? 0)),
            category: svc.category as string | undefined,
            image_url: svc.image_url as string | undefined,
            is_featured: (svc.is_featured as boolean) ?? false,
            active: (svc.active as boolean) ?? true,
            studio_placement: (svc.studio_placement as 'individual' | 'collection' | 'both') ?? 'individual',
            card_style: (svc.card_style as 'button' | 'callout' | 'preview') ?? 'callout',
            card_subtitle: svc.card_subtitle as string | undefined,
            card_cta_text: svc.card_cta_text as string | undefined,
          },
          subcategory_id: m.subcategory_id as string | null,
          display_order: m.display_order as number,
        } satisfies CollectionMember;
      });
    return {
      id: col.id as string,
      profile_id: col.profile_id as string,
      title: col.title as string,
      description: col.description as string | null,
      image_url: col.image_url as string | null,
      display_order: col.display_order as number,
      active: col.active as boolean,
      subcategories: colSubs,
      members: colMembers,
    } satisfies ServiceCollection;
  });
}

export async function getPublicCollections(profileId: string): Promise<ServiceCollection[]> {
  if (!supabase) throw new Error('Supabase not initialized');
  const all = await getCollectionsForProfile(profileId);
  return all
    .filter((c) => c.active)
    .map((c) => ({ ...c, members: c.members.filter((m) => m.service.active !== false) }))
    .filter((c) => c.members.length > 0);
}

export async function createCollection(data: { profile_id: string; title: string; description?: string; image_url?: string; active?: boolean }) {
  if (!supabase) throw new Error('Supabase not initialized');
  return supabase.from('service_collections').insert(data).select().single();
}

export async function updateCollection(id: string, updates: Record<string, unknown>) {
  if (!supabase) throw new Error('Supabase not initialized');
  return supabase.from('service_collections').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id).select().single();
}

export async function deleteCollection(id: string) {
  if (!supabase) throw new Error('Supabase not initialized');
  return supabase.from('service_collections').delete().eq('id', id);
}

export async function addCollectionMember(collectionId: string, serviceId: string, subcategoryId?: string) {
  if (!supabase) throw new Error('Supabase not initialized');
  const { data: existing } = await supabase.from('collection_members')
    .select('display_order').eq('collection_id', collectionId).order('display_order', { ascending: false }).limit(1);
  const nextOrder = ((existing?.[0] as { display_order: number } | undefined)?.display_order ?? -1) + 1;
  return supabase.from('collection_members')
    .insert({ collection_id: collectionId, service_id: serviceId, subcategory_id: subcategoryId ?? null, display_order: nextOrder })
    .select().single();
}

export async function removeCollectionMember(serviceId: string) {
  if (!supabase) throw new Error('Supabase not initialized');
  return supabase.from('collection_members').delete().eq('service_id', serviceId);
}

export async function updateCollectionMember(serviceId: string, updates: { subcategory_id?: string | null; display_order?: number }) {
  if (!supabase) throw new Error('Supabase not initialized');
  return supabase.from('collection_members').update(updates).eq('service_id', serviceId);
}

export async function upsertSubcategory(data: { id?: string; collection_id: string; profile_id: string; name: string; display_order: number }): Promise<CollectionSubcategory> {
  if (!supabase) throw new Error('Supabase not initialized');
  const { id, ...rest } = data;
  const query = id
    ? supabase.from('collection_subcategories').update(rest).eq('id', id).select().single()
    : supabase.from('collection_subcategories').insert(rest).select().single();
  const { data: row, error } = await query;
  if (error) throw error;
  return row as CollectionSubcategory;
}

export async function deleteSubcategory(id: string) {
  if (!supabase) throw new Error('Supabase not initialized');
  return supabase.from('collection_subcategories').delete().eq('id', id);
}

// ============ TRANSACTIONS ============

export async function getTransactions(proId: string) {
  if (!supabase) throw new Error('Supabase not initialized');

  return supabase
    .from('transactions')
    .select('*')
    .eq('profile_id', proId)
    .order('created_at', { ascending: false });
}
