import { supabase, isSupabaseConfigured } from './supabase';
import { TIME_SLOTS } from './mockData';
import { isDateInPast } from './utils';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CreateBookingParams {
  serviceId: string;
  profileId: string;
  datetime: Date;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  priceTotal: number;
  depositAmount: number;
}

export interface CreatedBooking {
  id: string;
  status: string;
  booking_datetime: string;
  client_name: string;
  client_email: string;
}

// ── createBooking ─────────────────────────────────────────────────────────────
// Dev/fallback path used when Supabase + Stripe are not configured.
// In production the booking is created inside create-payment-intent (Edge Function).

export async function createBooking(
  params: CreateBookingParams,
): Promise<CreatedBooking> {
  const client = supabase;

  if (!isSupabaseConfigured || !client) {
    await new Promise<void>((resolve) => setTimeout(resolve, 1200));
    return {
      id: crypto.randomUUID(),
      status: 'pending',
      booking_datetime: params.datetime.toISOString(),
      client_name: params.clientName,
      client_email: params.clientEmail,
    };
  }

  // Verify slot is still free (optimistic pre-check; DB constraint is authoritative)
  const slotStart = new Date(params.datetime);
  const slotEnd = new Date(params.datetime.getTime() + 60 * 60 * 1000);

  const { data: conflicts } = await client
    .from('bookings')
    .select('id')
    .eq('profile_id', params.profileId)
    .gte('booking_datetime', slotStart.toISOString())
    .lt('booking_datetime', slotEnd.toISOString())
    .not('status', 'in', '("cancelled","no_show","expired")')
    .limit(1);

  if (conflicts && conflicts.length > 0) {
    throw new Error('Ce créneau vient d\'être pris. Choisissez un autre horaire.');
  }

  const { data, error } = await client
    .from('bookings')
    .insert({
      profile_id: params.profileId,
      service_id: params.serviceId,
      booking_datetime: params.datetime.toISOString(),
      client_name: params.clientName,
      client_email: params.clientEmail,
      client_phone: params.clientPhone,
      status: 'pending',
      price_total: params.priceTotal,
      deposit_paid: params.depositAmount,
      nelsy_fee: 1.0,
    })
    .select('id, status, booking_datetime, client_name, client_email')
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// ── getAvailableSlots ─────────────────────────────────────────────────────────
// Returns 'HH:MM' strings for available 30-min slot starts on the given date.
// serviceDurationMinutes: the selected service's duration — used to:
//   (a) exclude start-time slots where a prior booking overlaps
//   (b) exclude start-time slots where the service would end past closing
//
// Slots are generated every 30 minutes between the pro's open/close times.
// A slot at time T is available only if:
//   - No existing booking occupies [T, T + serviceDuration)
//   - The service end time T + serviceDuration ≤ closing time
//
// This matches the server-side EXCLUDE constraint logic so the UI accurately
// reflects which slots the server will accept.

const MOCK_TAKEN_TIMES = new Set(['10:00', '11:30', '15:00']);

export async function getAvailableSlots(
  profileId: string,
  date: Date,
  serviceDurationMinutes = 60,
): Promise<string[]> {
  if (isDateInPast(date)) return [];

  const client = supabase;

  if (!isSupabaseConfigured || !client) {
    return TIME_SLOTS.filter((s) => !MOCK_TAKEN_TIMES.has(s));
  }

  try {
    const dayOfWeek = date.getDay();

    const { data: avail } = await client
      .from('availabilities')
      .select('start_time, end_time, break_duration_minutes')
      .eq('profile_id', profileId)
      .eq('day_of_week', dayOfWeek)
      .eq('active', true)
      .single();

    if (!avail) return [];

    // Fetch bookings that overlap the whole day
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const { data: existingBookings } = await client
      .from('bookings')
      .select('booking_datetime, duration_minutes')
      .eq('profile_id', profileId)
      .gte('booking_datetime', startOfDay.toISOString())
      .lte('booking_datetime', endOfDay.toISOString())
      .not('status', 'in', '("cancelled","no_show","expired")');

    // Convert each booking to a [startMin, endMin) range in minutes-since-midnight
    const occupiedRanges = (existingBookings ?? []).map((b) => {
      const dt = new Date(b.booking_datetime);
      const startMin = dt.getHours() * 60 + dt.getMinutes();
      const duration = Number(b.duration_minutes ?? 60);
      return { start: startMin, end: startMin + duration };
    });

    // Parse availability window (stored as 'HH:MM:SS' or 'HH:MM')
    const [openH, openM] = avail.start_time.split(':').map(Number);
    const [closeH, closeM] = avail.end_time.split(':').map(Number);
    const openMin = openH * 60 + openM;
    const closeMin = closeH * 60 + closeM;

    const SLOT_STEP = 30; // minutes between slot starts
    const slots: string[] = [];
    let current = openMin;

    while (current + serviceDurationMinutes <= closeMin) {
      const slotEnd = current + serviceDurationMinutes;

      // A slot is available iff its range [current, slotEnd) doesn't overlap
      // any existing booking range [occ.start, occ.end)
      const overlaps = occupiedRanges.some(
        (occ) => current < occ.end && slotEnd > occ.start,
      );

      if (!overlaps) {
        const h = Math.floor(current / 60);
        const m = current % 60;
        slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
      }

      current += SLOT_STEP;
    }

    return slots;
  } catch {
    return [];
  }
}
