import { supabase, isSupabaseConfigured } from './supabase';
import { TIME_SLOTS } from './mockData';
import { isDateInPast } from './utils';

// ----------------------------------------------------------------
// Types
// ----------------------------------------------------------------

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

// ----------------------------------------------------------------
// createBooking
// Persists a booking to Supabase (if configured), otherwise
// returns a mock confirmation object.
// ----------------------------------------------------------------

export async function createBooking(
  params: CreateBookingParams
): Promise<CreatedBooking> {
  // Capture in local const so TypeScript can narrow the type
  const client = supabase;

  if (!isSupabaseConfigured || !client) {
    // Mock mode: simulate a short delay then return a fake booking
    await new Promise<void>((resolve) => setTimeout(resolve, 1200));
    return {
      id: crypto.randomUUID(),
      status: 'pending',
      booking_datetime: params.datetime.toISOString(),
      client_name: params.clientName,
      client_email: params.clientEmail,
    };
  }

  // 1. Verify the slot is still free (optimistic concurrency check)
  const slotStart = new Date(params.datetime);
  const slotEnd = new Date(params.datetime.getTime() + 60 * 60 * 1000); // +1h buffer

  const { data: conflicts } = await client
    .from('bookings')
    .select('id')
    .eq('profile_id', params.profileId)
    .gte('booking_datetime', slotStart.toISOString())
    .lt('booking_datetime', slotEnd.toISOString())
    .not('status', 'in', '("cancelled","no_show")')
    .limit(1);

  if (conflicts && conflicts.length > 0) {
    throw new Error('Ce créneau vient d\'être pris. Choisissez un autre horaire.');
  }

  // 2. Insert booking (status = 'pending' until Stripe payment confirmed)
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

// ----------------------------------------------------------------
// getAvailableSlots
// Returns array of "HH:MM" strings for a given merchant + date.
// Falls back to mock slots when Supabase is not configured.
// ----------------------------------------------------------------

const TAKEN_MOCK = new Set(['10:00', '11:30', '15:00']);

export async function getAvailableSlots(
  profileId: string,
  date: Date
): Promise<string[]> {
  // Never return slots for past dates
  if (isDateInPast(date)) {
    return [];
  }

  // Capture in local const so TypeScript can narrow the type
  const client = supabase;

  if (!isSupabaseConfigured || !client) {
    // Mock: return hardcoded slots minus a few "taken" ones
    return TIME_SLOTS.filter((s) => !TAKEN_MOCK.has(s));
  }

  try {
    const dayOfWeek = date.getDay();

    // Check if there's an availability window for this day
    const { data: avail } = await client
      .from('availabilities')
      .select('start_time, end_time, break_duration_minutes')
      .eq('profile_id', profileId)
      .eq('day_of_week', dayOfWeek)
      .eq('active', true)
      .single();

    if (!avail) return [];

    // Fetch bookings on this date
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const { data: existingBookings } = await client
      .from('bookings')
      .select('booking_datetime')
      .eq('profile_id', profileId)
      .gte('booking_datetime', startOfDay.toISOString())
      .lte('booking_datetime', endOfDay.toISOString())
      .not('status', 'in', '("cancelled","no_show")');

    const bookedTimes = new Set(
      (existingBookings ?? []).map((b) => {
        const dt = new Date(b.booking_datetime);
        return `${String(dt.getHours()).padStart(2, '0')}:${String(dt.getMinutes()).padStart(2, '0')}`;
      })
    );

    // Generate 30-min slots between start_time and end_time
    const [startH, startM] = avail.start_time.split(':').map(Number);
    const [endH, endM] = avail.end_time.split(':').map(Number);

    const slots: string[] = [];
    let current = startH * 60 + startM;
    const end = endH * 60 + endM;

    while (current < end) {
      const h = Math.floor(current / 60);
      const m = current % 60;
      const timeStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;

      if (!bookedTimes.has(timeStr)) {
        slots.push(timeStr);
      }
      current += 30;
    }

    return slots;
  } catch {
    return [];
  }
}
