// Data access of the pro agenda. The dashboard uses `agendaApi` (Supabase, the same
// queries and mutations the Bookings tab already used); the dev sandbox passes an
// in-memory implementation (see agendaDemo.ts).
import { supabase } from './supabase';
import type { DbAvailabilityRow, DbBookingRow, DbClosedDateRow, DbServiceRow } from './supabase';
import {
  cancelBooking, completeBooking, confirmBooking, createService, getAvailabilities, getBookings, updateBooking,
} from './supabase-queries';
import { fetchVideoLinksForProfile } from './onlineSessions';
import type { AgendaBooking, AgendaService, AvailabilityWindow, BookingStatus, ClosedDate, DayKey } from './agenda';

export interface AgendaData {
  bookings: AgendaBooking[];
  services: AgendaService[];
  availability: AvailabilityWindow[];
  closedDates: ClosedDate[];
}

export interface NewBookingInput {
  profileId: string;
  serviceId: string;
  durationMin: number;
  price: number;
  startIso: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  /** The pro's currency (ISO code). Stored on the booking so it does not fall back to the DB default. */
  currency?: string;
}

export interface NewServiceInput {
  profileId: string;
  name: string;
  durationMin: number;
  price: number;
}

export interface AgendaApi {
  /** False in the dev sandbox: panels that talk to Supabase on their own are not mounted. */
  live: boolean;
  load(profileId: string): Promise<AgendaData>;
  /** Resolves 'conflict' when the database refuses an overlap, throws on any other error. */
  createBooking(input: NewBookingInput): Promise<'ok' | 'conflict'>;
  createService(input: NewServiceInput): Promise<AgendaService>;
  confirm(id: string): Promise<void>;
  cancel(id: string): Promise<void>;
  complete(id: string): Promise<void>;
  reschedule(id: string, startIso: string): Promise<'ok' | 'conflict'>;
  addClosedDate(profileId: string, day: DayKey, reason: string | null): Promise<void>;
  removeClosedDate(id: string): Promise<void>;
}

/** Postgres exclusion_violation raised by the bookings_no_overlap constraint. */
const OVERLAP = '23P01';

export function timeToMinutes(value: string): number {
  const [h, m] = value.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

export function toAgendaService(s: Pick<DbServiceRow, 'id' | 'name' | 'duration_minutes' | 'price_total' | 'active' | 'location_type'>): AgendaService {
  return {
    id: s.id,
    name: s.name,
    durationMin: Number(s.duration_minutes) || 60,
    price: Number(s.price_total) || 0,
    online: s.location_type === 'online',
    active: s.active !== false,
  };
}

/**
 * A booking row as the agenda shows it. Returns null for rows that are not appointments:
 * expired checkouts, and pending checkouts whose hold has run out.
 */
export function toAgendaBooking(
  b: DbBookingRow & { payment_status?: string | null },
  services: Map<string, AgendaService>,
  videoLinks: Map<string, string>,
  paidByBooking: Map<string, number>,
  now: Date,
): AgendaBooking | null {
  const status = b.status as BookingStatus;
  if (status === 'expired') return null;
  if (status === 'pending' && b.expires_at && new Date(b.expires_at) <= now) return null;

  const service = b.service_id ? services.get(b.service_id) : undefined;
  const start = new Date(b.booking_datetime);
  const durationMin = Number(b.duration_minutes) || service?.durationMin || 60;
  const end = b.booking_end_datetime ? new Date(b.booking_end_datetime) : new Date(start.getTime() + durationMin * 60_000);
  const price = Number(b.price_total) || 0;

  // Money received: the payments ledger when it has rows, otherwise the booking's own payment status.
  let paid = paidByBooking.get(b.id);
  if (paid === undefined) {
    paid = b.payment_status === 'paid' ? price
      : b.payment_status === 'deposit_paid' ? Number(b.deposit_paid) || 0
      : 0;
  }

  return {
    id: b.id,
    start,
    end,
    durationMin,
    clientName: b.client_name ?? '',
    clientEmail: b.client_email ?? '',
    clientPhone: b.client_phone ?? '',
    serviceId: b.service_id,
    serviceName: service?.name ?? 'Service',
    price,
    paid,
    status,
    online: !!service?.online,
    videoUrl: b.service_id ? videoLinks.get(b.service_id) ?? null : null,
  };
}

export function toAvailability(rows: Pick<DbAvailabilityRow, 'day_of_week' | 'start_time' | 'end_time' | 'active'>[]): AvailabilityWindow[] {
  return rows
    .filter((r) => r.active !== false)
    .map((r) => ({ dayOfWeek: r.day_of_week, startMin: timeToMinutes(r.start_time), endMin: timeToMinutes(r.end_time) }))
    .filter((w) => w.endMin > w.startMin);
}

function client() {
  if (!supabase) throw new Error('Supabase not initialized');
  return supabase;
}

export const agendaApi: AgendaApi = {
  live: true,

  async load(profileId) {
    const db = client();
    const [servicesRes, bookingsRes, availabilityRes, closedRes, paymentsRes] = await Promise.all([
      db.from('services').select('*').eq('profile_id', profileId).order('display_order', { ascending: true }),
      getBookings(profileId),
      getAvailabilities(profileId),
      db.from('closed_dates').select('id, closed_date, reason').eq('profile_id', profileId),
      db.from('booking_payments').select('booking_id, amount').eq('profile_id', profileId),
    ]);
    if (bookingsRes.error) throw bookingsRes.error;

    const serviceRows = (servicesRes.data ?? []) as DbServiceRow[];
    const services = serviceRows.map(toAgendaService);
    const serviceMap = new Map(services.map((s) => [s.id, s]));
    // Private video links of online services (empty when she has none).
    const videoLinks = services.some((s) => s.online) ? await fetchVideoLinksForProfile(profileId) : new Map<string, string>();

    const paidByBooking = new Map<string, number>();
    for (const p of (paymentsRes.data ?? []) as { booking_id: string; amount: number }[]) {
      paidByBooking.set(p.booking_id, (paidByBooking.get(p.booking_id) ?? 0) + Number(p.amount));
    }

    const now = new Date();
    const bookings = ((bookingsRes.data ?? []) as DbBookingRow[])
      .map((b) => toAgendaBooking(b, serviceMap, videoLinks, paidByBooking, now))
      .filter((b): b is AgendaBooking => b !== null);

    return {
      bookings,
      services,
      availability: toAvailability((availabilityRes.data ?? []) as DbAvailabilityRow[]),
      closedDates: ((closedRes.data ?? []) as Pick<DbClosedDateRow, 'id' | 'closed_date' | 'reason'>[])
        .map((c) => ({ id: c.id, day: c.closed_date, reason: c.reason })),
    };
  },

  // Same insert the "Add appointment" modal always did: a confirmed booking, nothing paid online.
  async createBooking(input) {
    const { error } = await client().from('bookings').insert({
      profile_id: input.profileId,
      client_name: input.clientName,
      client_email: input.clientEmail,
      client_phone: input.clientPhone,
      service_id: input.serviceId,
      duration_minutes: input.durationMin,
      booking_datetime: input.startIso,
      price_total: input.price,
      deposit_paid: 0,
      nelsy_fee: 0,
      status: 'confirmed',
      paid_at: new Date().toISOString(),
      ...(input.currency && /^[a-z]{3}$/i.test(input.currency) ? { currency: input.currency.toLowerCase() } : {}),
    });
    if (error?.code === OVERLAP) return 'conflict';
    if (error) throw error;
    return 'ok';
  },

  // Same insert as the offer editor (createService), with its defaults for a service paid at the studio.
  async createService(input) {
    const { data, error } = await createService({
      profile_id: input.profileId,
      name: input.name,
      description: '',
      image_url: null,
      price_total: input.price,
      deposit_amount: 0,
      payment_mode: 'on_arrival',
      on_arrival_methods: ['cash', 'card'],
      duration_minutes: input.durationMin,
      category: 'Nails',
      active: true,
      is_featured: false,
      card_style: 'callout',
      card_subtitle: null,
      card_cta_text: null,
    });
    if (error) throw error;
    return toAgendaService(data as DbServiceRow);
  },

  async confirm(id) {
    const { error } = await confirmBooking(id);
    if (error) throw error;
  },

  async cancel(id) {
    const { error } = await cancelBooking(id);
    if (error) throw error;
  },

  async complete(id) {
    const { error } = await completeBooking(id);
    if (error) throw error;
  },

  async reschedule(id, startIso) {
    const { error } = await updateBooking(id, { booking_datetime: startIso });
    if (error?.code === OVERLAP) return 'conflict';
    if (error) throw error;
    return 'ok';
  },

  async addClosedDate(profileId, day, reason) {
    const { error } = await client().from('closed_dates').insert({ profile_id: profileId, closed_date: day, reason });
    // 23505: that day is already closed, which is what she asked for.
    if (error && error.code !== '23505') throw error;
  },

  async removeClosedDate(id) {
    const { error } = await client().from('closed_dates').delete().eq('id', id);
    if (error) throw error;
  },
};
