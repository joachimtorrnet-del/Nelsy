import { useEffect, useMemo, useRef, useState } from 'react';
import { AlertTriangle, Check, Info, Loader2, Plus, Video } from 'lucide-react';
import Sheet from './Sheet';
import {
  dayBlocks, dayKeyInTz, findConflicts, formatDay, formatDuration, formatRange, knownClients, matchClients,
  minutesInTz, parseTimeInput, toTimeInput, workingWindow, zonedToUtc, GRID_STATUSES,
} from '../../../lib/agenda';
import type { AgendaBooking, AgendaService, AvailabilityWindow, ClosedDate, DayKey } from '../../../lib/agenda';
import type { AgendaApi } from '../../../lib/agendaApi';
import { currencySymbol, formatMoney } from '../../../lib/currency';

export interface AddBookingPrefill {
  day: DayKey;
  minutes: number;
  /** Where the sheet was opened from, for analytics. */
  source: 'fab' | 'slot' | 'empty_state';
}

interface AddBookingSheetProps {
  /** Null while closed. */
  prefill: AddBookingPrefill | null;
  onClose: () => void;
  /** Called after a booking or a day off is saved. */
  onSaved: (result: { kind: 'booking' | 'day_off' | 'reopened'; day: DayKey; newService: boolean; source: AddBookingPrefill['source'] }) => void | Promise<void>;
  api: AgendaApi;
  profileId: string;
  services: AgendaService[];
  bookings: AgendaBooking[];
  availability: AvailabilityWindow[];
  closedDates: ClosedDate[];
  timezone: string;
  currency: string;
  hour12: boolean;
  now: Date;
}

type Tab = 'booking' | 'day_off';
type ErrorKey = 'clientName' | 'clientEmail' | 'service' | 'serviceName' | 'servicePrice' | 'date' | 'time' | 'submit';

const NEW_SERVICE = '__new__';
const DURATIONS = [15, 30, 45, 60, 75, 90, 105, 120, 150, 180, 210, 240];
/** Above this many services a native picker is faster to use than a long list of cards. */
const MAX_SERVICE_CARDS = 6;

const LABEL = 'mb-1.5 block text-sm font-semibold text-[#1A1A1A]';
const fieldClass = (invalid?: boolean) =>
  `h-12 w-full rounded-xl border bg-white px-3.5 text-base text-[#1A1A1A] placeholder:text-gray-400 transition focus:outline-none focus:ring-1 ${
    invalid ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#1A1A1A] focus:ring-[#1A1A1A]'
  }`;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return <p id={id} role="alert" className="mt-1.5 text-[13px] font-medium text-red-600">{message}</p>;
}

/**
 * "New booking" sheet of the agenda. Opens prefilled with the tapped day and time.
 * A pro with no service yet types one inline (name, duration, price): it is created with the
 * same insert as the offer editor, then the booking is added. The second tab marks a day off.
 */
export default function AddBookingSheet({
  prefill, onClose, onSaved, api, profileId, services, bookings, availability, closedDates, timezone, currency, hour12, now,
}: AddBookingSheetProps) {
  const open = prefill !== null;
  const [tab, setTab] = useState<Tab>('booking');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [serviceId, setServiceId] = useState<string>(NEW_SERVICE);
  const [newName, setNewName] = useState('');
  const [newDuration, setNewDuration] = useState(60);
  const [newPrice, setNewPrice] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState<Partial<Record<ErrorKey, string>>>({});
  const [saving, setSaving] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Reset every time the sheet opens.
  const openKey = prefill ? `${prefill.day}-${prefill.minutes}-${prefill.source}` : null;
  useEffect(() => {
    if (!prefill) return;
    setTab('booking');
    setClientName('');
    setClientPhone('');
    setClientEmail('');
    setSuggestOpen(false);
    setServiceId(services.find((s) => s.active)?.id ?? services[0]?.id ?? NEW_SERVICE);
    setNewName('');
    setNewDuration(60);
    setNewPrice('');
    setDate(prefill.day);
    setTime(toTimeInput(prefill.minutes));
    setReason('');
    setErrors({});
    setSaving(false);
    // Services are read once when the sheet opens: a reload must not wipe what she typed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openKey]);

  const clients = useMemo(() => knownClients(bookings), [bookings]);
  const suggestions = useMemo(() => (suggestOpen ? matchClients(clients, clientName) : []), [clients, clientName, suggestOpen]);

  const creatingService = serviceId === NEW_SERVICE;
  const service = creatingService ? null : services.find((s) => s.id === serviceId) ?? null;
  const priceValue = Number(newPrice.replace(',', '.'));
  const durationMin = service?.durationMin ?? newDuration;
  const price = service?.price ?? (Number.isFinite(priceValue) ? priceValue : 0);
  const serviceLabel = service?.name ?? newName.trim();

  const minutes = parseTimeInput(time);
  const start = useMemo(
    () => (date && minutes !== null ? zonedToUtc(date, minutes, timezone) : null),
    [date, minutes, timezone],
  );
  const conflicts = useMemo(
    () => (start ? findConflicts(bookings, start, new Date(start.getTime() + durationMin * 60_000)) : []),
    [bookings, start, durationMin],
  );

  const closedOnDate = closedDates.find((c) => c.day === date) ?? null;
  const window = date ? workingWindow(availability, date) : null;
  const notes: string[] = [];
  if (start && minutes !== null && conflicts.length === 0) {
    if (closedOnDate) notes.push('You marked this day as a day off.');
    else if (!window) notes.push('This is not one of your working days.');
    else if (minutes < window.startMin || minutes + durationMin > window.endMin) notes.push('This is outside your working hours.');
    if (start < now) notes.push('This time is in the past.');
  }

  const bookingsThatDay = useMemo(
    () => (date ? dayBlocks(bookings.filter((b) => GRID_STATUSES.has(b.status) && b.status !== 'no_show' && b.status !== 'completed'), date, timezone).length : 0),
    [bookings, date, timezone],
  );

  const pickClient = (c: { name: string; email: string; phone: string }) => {
    setClientName(c.name);
    setClientPhone(c.phone);
    setClientEmail(c.email);
    setSuggestOpen(false);
    setErrors((e) => ({ ...e, clientName: undefined, clientEmail: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<ErrorKey, string>> = {};
    if (!clientName.trim()) e.clientName = "Enter your client's name.";
    if (clientEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail.trim())) e.clientEmail = 'This email does not look right.';
    if (creatingService) {
      if (!newName.trim()) e.serviceName = 'Name the service, for example Gel manicure.';
      if (newPrice.trim() === '' || !Number.isFinite(priceValue) || priceValue < 0) e.servicePrice = 'Enter a price (0 if it is free).';
    } else if (!service) {
      e.service = 'Pick a service.';
    }
    if (!date) e.date = 'Pick a date.';
    if (minutes === null) e.time = 'Pick a time.';
    setErrors(e);
    const firstKey = Object.keys(e)[0];
    if (firstKey) {
      requestAnimationFrame(() => {
        const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${firstKey}"]`);
        el?.focus();
        el?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      });
    }
    return !firstKey;
  };

  const saveBooking = async () => {
    if (saving || !prefill) return;
    if (!validate() || !start || conflicts.length > 0) return;
    setSaving(true);
    setErrors({});
    try {
      let target = service;
      if (!target) {
        target = await api.createService({
          profileId, name: newName.trim(), durationMin: newDuration, price: Math.round(priceValue * 100) / 100,
        });
        setServiceId(target.id);
      }
      const result = await api.createBooking({
        profileId,
        serviceId: target.id,
        durationMin: target.durationMin,
        price: target.price,
        startIso: start.toISOString(),
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim().toLowerCase(),
        clientPhone: clientPhone.trim(),
        currency,
      });
      if (result === 'conflict') {
        setErrors({ submit: 'This time overlaps another booking. Pick a different time.' });
        return;
      }
      await onSaved({ kind: 'booking', day: dayKeyInTz(start, timezone), newService: creatingService, source: prefill.source });
      onClose();
    } catch (err) {
      console.error('Error creating booking:', err);
      setErrors({ submit: 'The booking was not saved. Check your connection and try again.' });
    } finally {
      setSaving(false);
    }
  };

  const saveDayOff = async () => {
    if (saving || !prefill) return;
    if (!date) { setErrors({ date: 'Pick a date.' }); return; }
    setSaving(true);
    setErrors({});
    try {
      if (closedOnDate) {
        await api.removeClosedDate(closedOnDate.id);
        await onSaved({ kind: 'reopened', day: date, newService: false, source: prefill.source });
      } else {
        await api.addClosedDate(profileId, date, reason.trim() || null);
        await onSaved({ kind: 'day_off', day: date, newService: false, source: prefill.source });
      }
      onClose();
    } catch (err) {
      console.error('Error saving day off:', err);
      setErrors({ submit: 'That was not saved. Check your connection and try again.' });
    } finally {
      setSaving(false);
    }
  };

  const useCards = services.length > 0 && services.length <= MAX_SERVICE_CARDS;
  const dateLabel = date ? formatDay(date, { weekday: 'long', month: 'long', day: 'numeric' }) : '';

  const footer = tab === 'booking' ? (
    <div>
      {serviceLabel && minutes !== null && (
        <p className="mb-2.5 flex items-center justify-between gap-3 text-[13px] text-gray-500">
          <span className="min-w-0 truncate">{serviceLabel} · {formatDuration(durationMin)}</span>
          <span className="flex-shrink-0 font-semibold tabular-nums text-[#1A1A1A]">{formatMoney(price, currency)}</span>
        </p>
      )}
      <button
        type="submit"
        form="add-booking-form"
        disabled={saving || conflicts.length > 0}
        className="flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-[#F52B8C] px-5 text-base font-bold text-white transition hover:opacity-90 active:scale-[0.99] disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F52B8C] focus-visible:ring-offset-2"
      >
        {saving && <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />}
        {saving ? 'Saving' : 'Add booking'}
      </button>
    </div>
  ) : (
    <button
      type="submit"
      form="add-booking-form"
      disabled={saving}
      className="flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-[#1A1A1A] px-5 text-base font-bold text-white transition hover:opacity-90 active:scale-[0.99] disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2"
    >
      {saving && <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />}
      {closedOnDate ? 'Reopen this day' : 'Mark as day off'}
    </button>
  );

  return (
    <Sheet open={open} onClose={onClose} title={tab === 'booking' ? 'New booking' : 'Day off'} footer={footer}>
      <div role="group" aria-label="What to add" className="mb-5 flex rounded-2xl bg-gray-100 p-1">
        {([['booking', 'Booking'], ['day_off', 'Day off']] as const).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => { setTab(id); setErrors({}); }}
            aria-pressed={tab === id}
            className={`h-11 flex-1 rounded-xl text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] ${
              tab === id ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-gray-500 hover:text-[#1A1A1A]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <form
        id="add-booking-form"
        ref={formRef}
        noValidate
        onSubmit={(e) => { e.preventDefault(); void (tab === 'booking' ? saveBooking() : saveDayOff()); }}
        className="space-y-6"
      >
        {tab === 'booking' ? (
          <>
            {/* When */}
            <fieldset>
              <legend className="mb-2 text-[17px] font-bold tracking-tight text-[#1A1A1A]">When</legend>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="ab-date" className={LABEL}>Date</label>
                  <input id="ab-date" data-field="date" type="date" value={date}
                    onChange={(e) => { setDate(e.target.value); setErrors((x) => ({ ...x, date: undefined, submit: undefined })); }}
                    aria-invalid={!!errors.date} aria-describedby={errors.date ? 'ab-date-error' : undefined}
                    className={fieldClass(!!errors.date)} />
                  <FieldError id="ab-date-error" message={errors.date} />
                </div>
                <div>
                  <label htmlFor="ab-time" className={LABEL}>Start</label>
                  <input id="ab-time" data-field="time" type="time" step={300} value={time}
                    onChange={(e) => { setTime(e.target.value); setErrors((x) => ({ ...x, time: undefined, submit: undefined })); }}
                    aria-invalid={!!errors.time} aria-describedby={errors.time ? 'ab-time-error' : undefined}
                    className={fieldClass(!!errors.time)} />
                  <FieldError id="ab-time-error" message={errors.time} />
                </div>
              </div>

              <div className="mt-3 space-y-2" aria-live="polite">
                {start && minutes !== null && conflicts.length === 0 && (
                  <p className="text-[14px] text-gray-600">
                    <span className="font-semibold text-[#1A1A1A]">{dateLabel}</span>, {formatRange(minutes, minutes + durationMin, hour12)}
                  </p>
                )}
                {conflicts.length > 0 && (
                  <div role="alert" className="flex gap-2.5 rounded-2xl bg-red-50 px-4 py-3 text-[14px] text-red-700">
                    <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    <p>
                      <span className="font-semibold">Already booked.</span>{' '}
                      {conflicts.slice(0, 2).map((c) => `${c.clientName}, ${formatRange(minutesInTz(c.start, timezone), minutesInTz(c.start, timezone) + c.durationMin, hour12)}`).join(' and ')}.
                      {' '}Pick another time.
                    </p>
                  </div>
                )}
                {notes.length > 0 && (
                  <p className="flex gap-2 text-[13px] leading-relaxed text-gray-500">
                    <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <span>{notes.join(' ')} You can still add it.</span>
                  </p>
                )}
              </div>
            </fieldset>

            {/* Client */}
            <fieldset className="space-y-3">
              <legend className="mb-2 text-[17px] font-bold tracking-tight text-[#1A1A1A]">Client</legend>
              <div className="relative">
                <label htmlFor="ab-client" className={LABEL}>Name</label>
                <input
                  id="ab-client"
                  data-field="clientName"
                  type="text"
                  autoComplete="off"
                  autoCapitalize="words"
                  enterKeyHint="next"
                  placeholder="Client name"
                  value={clientName}
                  onChange={(e) => { setClientName(e.target.value); setSuggestOpen(true); if (errors.clientName) setErrors((x) => ({ ...x, clientName: undefined })); }}
                  onBlur={() => setTimeout(() => setSuggestOpen(false), 150)}
                  aria-invalid={!!errors.clientName}
                  aria-describedby={errors.clientName ? 'ab-client-error' : undefined}
                  className={fieldClass(!!errors.clientName)}
                />
                <FieldError id="ab-client-error" message={errors.clientName} />
                {suggestions.length > 0 && (
                  <ul aria-label="Clients you already have" className="mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    {suggestions.map((c) => (
                      <li key={c.key} className="border-b border-gray-100 last:border-b-0">
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => pickClient(c)}
                          className="flex min-h-[48px] w-full items-center gap-3 px-3.5 py-1.5 text-left transition hover:bg-gray-50 focus-visible:bg-gray-50 focus-visible:outline-none"
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[15px] font-semibold text-[#1A1A1A]">{c.name}</span>
                            <span className="block truncate text-[12px] text-gray-500">{c.phone || c.email || 'No contact saved'}</span>
                          </span>
                          <span className="flex-shrink-0 text-[12px] text-gray-400">{c.visits} booking{c.visits === 1 ? '' : 's'}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="ab-phone" className={LABEL}>Phone <span className="font-normal text-gray-400">optional</span></label>
                  <input id="ab-phone" type="tel" inputMode="tel" autoComplete="off" placeholder="Phone" value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)} className={fieldClass()} />
                </div>
                <div>
                  <label htmlFor="ab-email" className={LABEL}>Email <span className="font-normal text-gray-400">optional</span></label>
                  <input id="ab-email" data-field="clientEmail" type="email" inputMode="email" autoComplete="off" autoCapitalize="none" placeholder="Email" value={clientEmail}
                    onChange={(e) => { setClientEmail(e.target.value); if (errors.clientEmail) setErrors((x) => ({ ...x, clientEmail: undefined })); }}
                    aria-invalid={!!errors.clientEmail}
                    aria-describedby={errors.clientEmail ? 'ab-email-error' : 'ab-email-hint'}
                    className={fieldClass(!!errors.clientEmail)} />
                  <FieldError id="ab-email-error" message={errors.clientEmail} />
                </div>
              </div>
              <p id="ab-email-hint" className="text-[13px] leading-relaxed text-gray-500">With an email, your client gets the reminder 24 hours before.</p>
            </fieldset>

            {/* Service */}
            <fieldset>
              <legend className="mb-2 text-[17px] font-bold tracking-tight text-[#1A1A1A]">Service</legend>
              {services.length === 0 && (
                <p className="mb-3 text-[14px] leading-relaxed text-gray-500">
                  You have no service yet. Type it here: it is saved to your services, so you only do this once.
                </p>
              )}

              {useCards && (
                <div role="radiogroup" aria-label="Service" className="space-y-2">
                  {services.map((s) => {
                    const on = serviceId === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        data-field={on || (!service && s === services[0]) ? 'service' : undefined}
                        onClick={() => { setServiceId(s.id); setErrors((x) => ({ ...x, service: undefined })); }}
                        className={`flex min-h-[56px] w-full items-center gap-3 rounded-2xl border px-4 py-2 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-1 ${
                          on ? 'border-[#1A1A1A] bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border ${on ? 'border-[#1A1A1A] bg-[#1A1A1A]' : 'border-gray-300'}`} aria-hidden="true">
                          {on && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-1.5">
                            <span className="truncate text-[15px] font-semibold text-[#1A1A1A]">{s.name}</span>
                            {s.online && <Video className="h-4 w-4 flex-shrink-0 text-[#C2186F]" aria-label="Video call" />}
                          </span>
                          <span className="block text-[13px] text-gray-500">{formatDuration(s.durationMin)}{!s.active ? ' · Hidden from your page' : ''}</span>
                        </span>
                        <span className="flex-shrink-0 text-[15px] font-semibold tabular-nums text-[#1A1A1A]">{formatMoney(s.price, currency)}</span>
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    role="radio"
                    aria-checked={creatingService}
                    onClick={() => setServiceId(NEW_SERVICE)}
                    className={`flex min-h-[52px] w-full items-center gap-3 rounded-2xl border border-dashed px-4 text-left text-[15px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-1 ${
                      creatingService ? 'border-[#1A1A1A] bg-gray-50 text-[#1A1A1A]' : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <Plus className="h-5 w-5" aria-hidden="true" /> New service
                  </button>
                </div>
              )}

              {services.length > MAX_SERVICE_CARDS && (
                <div>
                  <label htmlFor="ab-service" className="sr-only">Service</label>
                  <select id="ab-service" data-field="service" value={serviceId} onChange={(e) => setServiceId(e.target.value)} className={fieldClass(!!errors.service)}>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>{s.name} · {formatDuration(s.durationMin)} · {formatMoney(s.price, currency)}</option>
                    ))}
                    <option value={NEW_SERVICE}>New service</option>
                  </select>
                </div>
              )}
              <FieldError id="ab-service-error" message={errors.service} />

              {creatingService && (
                <div className={`space-y-3 ${services.length > 0 ? 'mt-3 rounded-2xl bg-gray-50 p-4' : ''}`}>
                  <div>
                    <label htmlFor="ab-svc-name" className={LABEL}>Service name</label>
                    <input id="ab-svc-name" data-field="serviceName" type="text" autoComplete="off" autoCapitalize="sentences" placeholder="Gel manicure" maxLength={80}
                      value={newName}
                      onChange={(e) => { setNewName(e.target.value); if (errors.serviceName) setErrors((x) => ({ ...x, serviceName: undefined })); }}
                      aria-invalid={!!errors.serviceName}
                      aria-describedby={errors.serviceName ? 'ab-svc-name-error' : undefined}
                      className={fieldClass(!!errors.serviceName)} />
                    <FieldError id="ab-svc-name-error" message={errors.serviceName} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="ab-svc-duration" className={LABEL}>Duration</label>
                      <select id="ab-svc-duration" value={newDuration} onChange={(e) => setNewDuration(Number(e.target.value))} className={fieldClass()}>
                        {DURATIONS.map((d) => <option key={d} value={d}>{formatDuration(d)}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="ab-svc-price" className={LABEL}>Price</label>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-base text-gray-400" aria-hidden="true">{currencySymbol(currency)}</span>
                        <input id="ab-svc-price" data-field="servicePrice" type="text" inputMode="decimal" autoComplete="off" placeholder="0"
                          value={newPrice}
                          onChange={(e) => { setNewPrice(e.target.value.replace(/[^\d.,]/g, '')); if (errors.servicePrice) setErrors((x) => ({ ...x, servicePrice: undefined })); }}
                          aria-invalid={!!errors.servicePrice}
                          aria-describedby={errors.servicePrice ? 'ab-svc-price-error' : undefined}
                          className={`${fieldClass(!!errors.servicePrice)} pl-9`} />
                      </div>
                    </div>
                  </div>
                  <FieldError id="ab-svc-price-error" message={errors.servicePrice} />
                  <p className="text-[13px] leading-relaxed text-gray-500">
                    It also shows on your booking page, paid at the studio. You can edit or hide it in My Studio.
                  </p>
                </div>
              )}
            </fieldset>

          </>
        ) : (
          <fieldset className="space-y-4">
            <legend className="sr-only">Day off</legend>
            <p className="text-[15px] leading-relaxed text-gray-600">
              Clients cannot book you online that day. Use it for holidays, training or a day you need for yourself.
            </p>
            <div>
              <label htmlFor="ab-off-date" className={LABEL}>Date</label>
              <input id="ab-off-date" data-field="date" type="date" value={date}
                onChange={(e) => { setDate(e.target.value); setErrors({}); }}
                aria-invalid={!!errors.date} className={fieldClass(!!errors.date)} />
              <FieldError id="ab-off-date-error" message={errors.date} />
            </div>
            {closedOnDate ? (
              <p className="flex gap-2.5 rounded-2xl bg-gray-50 px-4 py-3 text-[14px] text-gray-600">
                <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" aria-hidden="true" />
                <span>{dateLabel} is already a day off{closedOnDate.reason ? ` (${closedOnDate.reason})` : ''}. Reopen it to take bookings again.</span>
              </p>
            ) : (
              <>
                <div>
                  <label htmlFor="ab-off-reason" className={LABEL}>Note <span className="font-normal text-gray-400">optional, only you see it</span></label>
                  <input id="ab-off-reason" type="text" maxLength={80} placeholder="Holiday" value={reason} onChange={(e) => setReason(e.target.value)} className={fieldClass()} />
                </div>
                {bookingsThatDay > 0 && (
                  <p className="flex gap-2.5 rounded-2xl bg-amber-50 px-4 py-3 text-[14px] text-amber-800">
                    <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    <span>You have {bookingsThatDay} booking{bookingsThatDay === 1 ? '' : 's'} that day. {bookingsThatDay === 1 ? 'It stays' : 'They stay'} booked: move or cancel {bookingsThatDay === 1 ? 'it' : 'them'} yourself.</span>
                  </p>
                )}
              </>
            )}
          </fieldset>
        )}

        {errors.submit && (
          <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-[14px] font-medium text-red-700">{errors.submit}</p>
        )}
      </form>
    </Sheet>
  );
}
