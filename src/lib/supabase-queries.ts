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

export async function updateProfile(userId: string, updates: Record<string, unknown>) {
  if (!supabase) throw new Error('Supabase not initialized');

  return supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
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

// ============ TRANSACTIONS ============

export async function getTransactions(proId: string) {
  if (!supabase) throw new Error('Supabase not initialized');

  return supabase
    .from('transactions')
    .select('*')
    .eq('profile_id', proId)
    .order('created_at', { ascending: false });
}
