// In-memory agenda for the dev sandbox (/dev/calendar). Never imported by production code.
import { addDays, dayKeyInTz, dayOfWeek, findConflicts, zonedToUtc } from './agenda';
import type { AgendaBooking, AgendaService, AvailabilityWindow, BookingStatus, ClosedDate } from './agenda';
import type { AgendaApi, AgendaData } from './agendaApi';

const SERVICES: AgendaService[] = [
  { id: 'svc-gel', name: 'Gel manicure', durationMin: 60, price: 45, online: false, active: true },
  { id: 'svc-builder', name: 'Builder gel refill', durationMin: 90, price: 60, online: false, active: true },
  { id: 'svc-art', name: 'Nail art add-on', durationMin: 30, price: 15, online: false, active: true },
  { id: 'svc-coach', name: '1:1 Nail business coaching', durationMin: 60, price: 90, online: true, active: true },
];

type Seed = [dayOffset: number, startMin: number, serviceId: string, name: string, email: string, phone: string, status: BookingStatus, paid: number];

const SEEDS: Seed[] = [
  [-1, 10 * 60, 'svc-builder', 'Nora Petit', 'nora.petit@example.com', '+33 6 55 01 02 03', 'completed', 60],
  [-1, 14 * 60, 'svc-gel', 'Alice Garnier', 'alice.g@example.com', '', 'completed', 45],
  [0, 9 * 60, 'svc-gel', 'Emma Roy', 'emma.roy@example.com', '+33 6 55 10 20 30', 'completed', 45],
  [0, 10 * 60 + 30, 'svc-builder', 'Lina Sow', 'lina.sow@example.com', '+33 6 55 11 22 33', 'paid', 20],
  [0, 13 * 60, 'svc-gel', 'Chloé Martin', 'chloe.m@example.com', '+33 6 55 44 55 66', 'no_show', 15],
  [0, 13 * 60, 'svc-gel', 'Zoé Adam', 'zoe.adam@example.com', '+33 6 55 77 88 99', 'confirmed', 0],
  [0, 14 * 60 + 30, 'svc-coach', 'Sarah Benali', 'sarah.benali@example.com', '+33 6 55 12 34 56', 'paid', 90],
  [0, 16 * 60, 'svc-gel', 'Inès Vidal', '', '+33 6 55 98 76 54', 'confirmed', 0],
  [0, 17 * 60, 'svc-art', 'Julia Costa', 'julia.costa@example.com', '', 'pending', 0],
  [1, 10 * 60, 'svc-gel', 'Maya Traoré', 'maya.t@example.com', '+33 6 55 00 11 22', 'paid', 45],
  [1, 11 * 60 + 30, 'svc-builder', 'Léa Henry', 'lea.henry@example.com', '', 'paid', 20],
  [1, 15 * 60, 'svc-coach', 'Camille Faure', 'camille.f@example.com', '', 'paid', 90],
  [3, 9 * 60 + 30, 'svc-gel', 'Emma Roy', 'emma.roy@example.com', '+33 6 55 10 20 30', 'confirmed', 0],
  [3, 11 * 60, 'svc-builder', 'Rose Fabre', 'rose.fabre@example.com', '+33 6 55 31 41 59', 'paid', 20],
  [3, 14 * 60, 'svc-art', 'Lina Sow', 'lina.sow@example.com', '+33 6 55 11 22 33', 'confirmed', 0],
  [5, 10 * 60, 'svc-gel', 'Anna Morel', 'anna.morel@example.com', '', 'cancelled', 0],
  [6, 13 * 60 + 30, 'svc-builder', 'Nora Petit', 'nora.petit@example.com', '+33 6 55 01 02 03', 'paid', 60],
];

const VIDEO_URL = 'https://meet.google.com/abc-defg-hij';

export interface DemoAgendaOptions {
  /** A brand-new pro: no service, no booking, default opening hours. */
  empty?: boolean;
  timezone: string;
}

export function createDemoAgendaApi({ empty = false, timezone }: DemoAgendaOptions): AgendaApi {
  const today = dayKeyInTz(new Date(), timezone);
  const services: AgendaService[] = empty ? [] : SERVICES.map((s) => ({ ...s }));
  const serviceById = (id: string | null) => services.find((s) => s.id === id);

  // Open every day but the one two days from now, so today is always a working day.
  const dayOff = dayOfWeek(addDays(today, 2));
  const availability: AvailabilityWindow[] = [0, 1, 2, 3, 4, 5, 6]
    .filter((d) => d !== dayOff)
    .map((d) => ({ dayOfWeek: d, startMin: 9 * 60, endMin: 18 * 60 }));

  let closedDates: ClosedDate[] = empty ? [] : [{ id: 'closed-1', day: addDays(today, 4), reason: 'Training day' }];
  let seq = 0;

  let bookings: AgendaBooking[] = empty ? [] : SEEDS.map(([offset, startMin, serviceId, name, email, phone, status, paid], i) => {
    const service = serviceById(serviceId)!;
    const start = zonedToUtc(addDays(today, offset), startMin, timezone);
    return {
      id: `demo-${i}`, start, end: new Date(start.getTime() + service.durationMin * 60_000), durationMin: service.durationMin,
      clientName: name, clientEmail: email, clientPhone: phone,
      serviceId, serviceName: service.name, price: service.price, paid,
      status, online: service.online, videoUrl: service.online ? VIDEO_URL : null,
    };
  });

  const wait = (ms = 250) => new Promise<void>((resolve) => setTimeout(resolve, ms));
  const setStatus = (id: string, status: BookingStatus) => {
    bookings = bookings.map((b) => (b.id === id ? { ...b, status } : b));
  };

  return {
    live: false,

    async load(): Promise<AgendaData> {
      await wait(350);
      return {
        bookings: [...bookings].sort((a, b) => a.start.getTime() - b.start.getTime()),
        services: [...services],
        availability,
        closedDates: [...closedDates],
      };
    },

    async createBooking(input) {
      await wait();
      const service = serviceById(input.serviceId);
      const start = new Date(input.startIso);
      const end = new Date(start.getTime() + input.durationMin * 60_000);
      if (findConflicts(bookings, start, end).length > 0) return 'conflict';
      bookings.push({
        id: `demo-new-${++seq}`, start, end, durationMin: input.durationMin,
        clientName: input.clientName, clientEmail: input.clientEmail, clientPhone: input.clientPhone,
        serviceId: input.serviceId, serviceName: service?.name ?? 'Service', price: input.price, paid: 0,
        status: 'confirmed', online: !!service?.online, videoUrl: service?.online ? VIDEO_URL : null,
      });
      return 'ok';
    },

    async createService(input) {
      await wait();
      const service: AgendaService = {
        id: `svc-new-${++seq}`, name: input.name, durationMin: input.durationMin, price: input.price, online: false, active: true,
      };
      services.push(service);
      return service;
    },

    async confirm(id) { await wait(); setStatus(id, 'confirmed'); },
    async cancel(id) { await wait(); setStatus(id, 'cancelled'); },
    async complete(id) { await wait(); setStatus(id, 'completed'); },
    async noShow(id) { await wait(); setStatus(id, 'no_show'); },
    async undoNoShow(id) {
      await wait();
      const current = bookings.find((b) => b.id === id);
      if (current && findConflicts(bookings, current.start, current.end, id).length > 0) return 'conflict';
      setStatus(id, 'confirmed');
      return 'ok';
    },
    async saveNote(_profileId, bookingId, note) {
      await wait();
      const text = note.trim();
      bookings = bookings.map((b) => (b.id === bookingId ? { ...b, note: text || undefined } : b));
    },

    async reschedule(id, startIso) {
      await wait();
      const current = bookings.find((b) => b.id === id);
      if (!current) return 'ok';
      const start = new Date(startIso);
      const end = new Date(start.getTime() + current.durationMin * 60_000);
      if (findConflicts(bookings, start, end, id).length > 0) return 'conflict';
      bookings = bookings.map((b) => (b.id === id ? { ...b, start, end } : b));
      return 'ok';
    },

    async addClosedDate(_profileId, day, reason) {
      await wait();
      if (!closedDates.some((c) => c.day === day)) closedDates.push({ id: `closed-new-${++seq}`, day, reason });
    },

    async removeClosedDate(id) {
      await wait();
      closedDates = closedDates.filter((c) => c.id !== id);
    },
  };
}
