import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { CalendarOff, Check, Link2, Plus, RefreshCw } from 'lucide-react';
import Toast from '../../components/dashboard/Toast';
import AddBookingSheet from '../../components/dashboard/agenda/AddBookingSheet';
import type { AddBookingPrefill } from '../../components/dashboard/agenda/AddBookingSheet';
import AgendaHeader from '../../components/dashboard/agenda/AgendaHeader';
import type { AgendaView } from '../../components/dashboard/agenda/AgendaHeader';
import AgendaList from '../../components/dashboard/agenda/AgendaList';
import BookingSheet from '../../components/dashboard/agenda/BookingSheet';
import TimeGrid from '../../components/dashboard/agenda/TimeGrid';
import { useToast } from '../../hooks/useToast';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { track } from '../../lib/analytics';
import { agendaApi } from '../../lib/agendaApi';
import type { AgendaApi, AgendaData } from '../../lib/agendaApi';
import {
  addDays, dayBlocks, dayKeyInTz, defaultStartMinutes, formatDay, gridBounds, minutesInTz, monthLabel, nextFreeStart, rangeDays,
  safeTimezone, weekDays, workingWindow, BLOCKING_STATUSES, GRID_STATUSES,
} from '../../lib/agenda';
import type { AgendaBooking, DayKey } from '../../lib/agenda';
import { deviceTimezone } from '../../lib/timezone';

interface Profile {
  id?: string;
  full_name?: string;
  slug?: string;
  timezone?: string | null;
  business_currency?: string | null;
}

interface CalendarProps {
  profile: Profile | null;
  /** Data source. The dev sandbox passes an in-memory one. */
  api?: AgendaApi;
  initialView?: AgendaView;
}

const VIEW_KEY = 'nelsy_agenda_view';
const EMPTY_DATA: AgendaData = { bookings: [], services: [], availability: [], closedDates: [] };

/** A phone opens on the day, a wide screen has room for the whole week. */
function defaultView(): AgendaView {
  try {
    return window.matchMedia('(min-width: 1024px)').matches ? 'week' : 'day';
  } catch {
    return 'day';
  }
}

function storedView(): AgendaView | null {
  try {
    const v = localStorage.getItem(VIEW_KEY);
    return v === 'day' || v === 'week' || v === 'list' ? v : null;
  } catch {
    return null;
  }
}

/** 12 hour clock and first day of the week follow the device language, like the rest of her phone. */
function localeHabits(): { hour12: boolean; weekStartsOn: number } {
  let hour12 = false;
  let weekStartsOn = 1;
  try {
    hour12 = new Intl.DateTimeFormat(undefined, { hour: 'numeric' }).resolvedOptions().hour12 ?? false;
    const locale = new Intl.Locale(navigator.language) as Intl.Locale & {
      getWeekInfo?: () => { firstDay: number };
      weekInfo?: { firstDay: number };
    };
    const firstDay = locale.getWeekInfo?.().firstDay ?? locale.weekInfo?.firstDay;
    if (firstDay === 7) weekStartsOn = 0;
    else if (typeof firstDay === 'number' && firstDay >= 1 && firstDay <= 6) weekStartsOn = firstDay;
  } catch { /* keep the defaults */ }
  return { hour12, weekStartsOn };
}

function useNow(intervalMs = 30_000): Date {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

export default function Calendar({ profile, api = agendaApi, initialView }: CalendarProps) {
  const navigate = useNavigate();
  const desktop = useMediaQuery('(min-width: 1024px)');
  const timezone = useMemo(() => safeTimezone(profile?.timezone ?? deviceTimezone()), [profile?.timezone]);
  const currency = (profile?.business_currency || 'EUR').toUpperCase();
  const { hour12, weekStartsOn } = useMemo(localeHabits, []);
  const now = useNow();
  const today = dayKeyInTz(now, timezone);
  const nowMin = minutesInTz(now, timezone);

  const [view, setView] = useState<AgendaView>(() => initialView ?? storedView() ?? defaultView());
  const [selected, setSelected] = useState<DayKey>(today);
  const [data, setData] = useState<AgendaData>(EMPTY_DATA);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [prefill, setPrefill] = useState<AddBookingPrefill | null>(null);
  const [openBookingId, setOpenBookingId] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [focusTick, setFocusTick] = useState(0);
  const { toast, showSuccess, showError, showInfo, hideToast } = useToast();

  const profileId = profile?.id;
  const requestId = useRef(0);

  const load = useCallback(async () => {
    if (!profileId) {
      setLoading(false);
      return;
    }
    const id = ++requestId.current;
    try {
      const next = await api.load(profileId);
      if (id !== requestId.current) return;
      setData(next);
      setLoadError(false);
    } catch (err) {
      console.error('Error loading the agenda:', err);
      if (id === requestId.current) setLoadError(true);
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }, [api, profileId]);

  useEffect(() => { void load(); }, [load]);

  const changeView = (next: AgendaView) => {
    if (next === view) return;
    setView(next);
    try { localStorage.setItem(VIEW_KEY, next); } catch { /* private mode */ }
    track('calendar_view_changed', { view: next });
  };

  const week = useMemo(() => weekDays(selected, weekStartsOn), [selected, weekStartsOn]);
  const columnDays = useMemo(
    () => (view === 'week' ? (desktop ? week : rangeDays(selected, 3)) : [selected]),
    [view, desktop, week, selected],
  );

  const gridBookings = useMemo(() => data.bookings.filter((b) => GRID_STATUSES.has(b.status)), [data.bookings]);
  const counts = useMemo(() => {
    const map = new Map<DayKey, number>();
    for (const b of gridBookings) {
      const day = dayKeyInTz(b.start, timezone);
      map.set(day, (map.get(day) ?? 0) + 1);
    }
    return map;
  }, [gridBookings, timezone]);
  const closed = useMemo(() => new Set(data.closedDates.map((c) => c.day)), [data.closedDates]);

  const bounds = useMemo(() => {
    const blocks = columnDays.flatMap((d) => dayBlocks(gridBookings, d, timezone));
    return gridBounds(data.availability, columnDays, blocks);
  }, [columnDays, gridBookings, data.availability, timezone]);

  const openBooking = openBookingId ? data.bookings.find((b) => b.id === openBookingId) ?? null : null;
  const isNewPro = !loading && !loadError && data.bookings.length === 0;
  const selectedCount = counts.get(selected) ?? 0;
  const selectedClosed = data.closedDates.find((c) => c.day === selected) ?? null;
  const selectedWorking = workingWindow(data.availability, selected);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    if (type === 'error') showError(message);
    else if (type === 'info') showInfo(message);
    else showSuccess(message);
  };

  const selectDay = (day: DayKey) => {
    setSelected(day);
    setFocusTick((t) => t + 1);
  };

  const openAdd = (source: AddBookingPrefill['source'], day?: DayKey, minutes?: number) => {
    const target = day ?? (view === 'list' ? today : selected);
    // From the "+" button, propose the next time that is actually free for her first service.
    let start = minutes;
    if (start === undefined) {
      const duration = (data.services.find((s) => s.active) ?? data.services[0])?.durationMin ?? 60;
      const busy = dayBlocks(data.bookings.filter((b) => BLOCKING_STATUSES.has(b.status)), target, timezone);
      start = nextFreeStart(defaultStartMinutes(target, today, nowMin, data.availability), duration, busy);
    }
    setPrefill({ day: target, minutes: start, source });
  };

  const studioUrl = profile?.slug ? `https://getnelsy.com/${profile.slug}` : null;
  const copyLink = async () => {
    if (!studioUrl) return;
    try {
      await navigator.clipboard.writeText(studioUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2200);
    } catch {
      showToast('Could not copy your link', 'error');
    }
  };

  const reopenDay = async () => {
    if (!selectedClosed) return;
    try {
      await api.removeClosedDate(selectedClosed.id);
      await load();
      showToast('Day reopened');
    } catch {
      showToast('Could not reopen this day', 'error');
    }
  };

  const label = monthLabel(view === 'week' ? columnDays : [selected]);

  const emptyCard = isNewPro && (
    <div className="mx-4 mt-4 rounded-2xl bg-[#FAF7F7] p-4 lg:mx-8">
      <p className="text-[15px] leading-relaxed text-[#1A1A1A]">
        <span className="font-semibold">No bookings yet.</span> Tap + to add one, or share your link so clients book themselves.
      </p>
      {studioUrl && (
        <button
          type="button"
          onClick={() => void copyLink()}
          className="mt-3 inline-flex h-11 items-center gap-2 rounded-full bg-[#1A1A1A] px-5 text-sm font-semibold text-white transition hover:opacity-90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2"
        >
          {linkCopied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
          <span aria-live="polite">{linkCopied ? 'Link copied' : 'Copy my link'}</span>
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-full bg-white pb-20 lg:pb-24">
      <AgendaHeader
        label={label}
        week={week}
        selected={selected}
        today={today}
        view={view}
        columnDays={view === 'week' && !desktop ? columnDays : undefined}
        counts={counts}
        closed={closed}
        onSelect={selectDay}
        onShiftWeek={(d) => selectDay(addDays(selected, d * 7))}
        onToday={() => selectDay(today)}
        onView={changeView}
      />

      {loading ? (
        <AgendaSkeleton />
      ) : loadError ? (
        <div className="px-6 py-16 text-center">
          <p className="text-[17px] font-semibold text-[#1A1A1A]">Your bookings did not load.</p>
          <p className="mt-1 text-[15px] text-gray-500">Check your connection and try again.</p>
          <button
            type="button"
            onClick={() => { setLoading(true); void load(); }}
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-[#1A1A1A] px-5 text-sm font-semibold text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" /> Try again
          </button>
        </div>
      ) : view === 'list' ? (
        <>
          {emptyCard}
          {!isNewPro && (
            <AgendaList
              bookings={data.bookings}
              timezone={timezone}
              today={today}
              now={now}
              currency={currency}
              hour12={hour12}
              onOpen={(b) => setOpenBookingId(b.id)}
            />
          )}
        </>
      ) : (
        <>
          {emptyCard}

          {view === 'day' && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 pt-4 lg:px-8">
              <h3 className="text-[17px] font-bold tracking-tight text-[#1A1A1A]">
                {selected === today ? 'Today' : formatDay(selected, { weekday: 'long' })}
                <span className="ml-2 font-medium text-gray-500">{formatDay(selected, { month: 'short', day: 'numeric' })}</span>
              </h3>
              <span className="text-[14px] font-medium text-gray-500">
                {selectedCount === 0 ? 'No bookings' : `${selectedCount} booking${selectedCount === 1 ? '' : 's'}`}
              </span>
              {selectedClosed ? (
                <span className="ml-auto inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] py-1 pl-3 pr-1 text-[13px] font-semibold text-white">
                  <CalendarOff className="h-3.5 w-3.5" aria-hidden="true" />
                  Day off{selectedClosed.reason ? `: ${selectedClosed.reason}` : ''}
                  <button
                    type="button"
                    onClick={() => void reopenDay()}
                    className="flex h-9 items-center rounded-full bg-white/20 px-3 text-[13px] font-semibold transition hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    Reopen
                  </button>
                </span>
              ) : !selectedWorking && data.availability.length > 0 ? (
                <span className="ml-auto inline-flex h-8 items-center gap-1.5 rounded-full bg-gray-100 px-3 text-[13px] font-semibold text-gray-600">
                  <CalendarOff className="h-3.5 w-3.5" aria-hidden="true" /> Not a working day
                </span>
              ) : null}
            </div>
          )}

          <TimeGrid
            days={columnDays}
            bounds={bounds}
            bookings={data.bookings}
            availability={data.availability}
            closedDates={data.closedDates}
            timezone={timezone}
            today={today}
            nowMin={nowMin}
            hour12={hour12}
            focusKey={`${view}-${columnDays[0]}-${columnDays.length}-${focusTick}`}
            autoFocus={!isNewPro}
            onSlot={(day, minutes) => openAdd('slot', day, minutes)}
            onBooking={(b) => setOpenBookingId(b.id)}
          />
        </>
      )}

      {/* Floating add button, above the bottom navigation on a phone */}
      {typeof document !== 'undefined' && createPortal(
        <button
          type="button"
          onClick={() => openAdd('fab')}
          aria-label="Add a booking"
          className="fixed right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#F52B8C] text-white shadow-lg shadow-[#F52B8C]/30 transition hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2 bottom-[calc(env(safe-area-inset-bottom,0px)+88px)] lg:bottom-8 lg:right-8"
        >
          <Plus className="h-7 w-7" strokeWidth={2.25} aria-hidden="true" />
        </button>,
        document.body,
      )}

      <AddBookingSheet
        prefill={prefill}
        onClose={() => setPrefill(null)}
        onSaved={async (result) => {
          await load();
          if (result.kind === 'booking') {
            track('booking_added_manually', { source: result.source, new_service: result.newService, view });
            showToast('Booking added');
          } else {
            showToast(result.kind === 'day_off' ? 'Day off saved' : 'Day reopened');
          }
          selectDay(result.day);
        }}
        api={api}
        profileId={profileId ?? ''}
        services={data.services}
        bookings={data.bookings}
        availability={data.availability}
        closedDates={data.closedDates}
        timezone={timezone}
        currency={currency}
        hour12={hour12}
        now={now}
      />

      <BookingSheet
        booking={openBooking}
        onClose={() => setOpenBookingId(null)}
        api={api}
        profileId={profileId ?? ''}
        bookings={data.bookings}
        timezone={timezone}
        currency={currency}
        hour12={hour12}
        now={now}
        onChanged={load}
        onToast={showToast}
        onViewClient={(b: AgendaBooking) => {
          setOpenBookingId(null);
          navigate(`/dashboard/customers?q=${encodeURIComponent(b.clientName)}`);
        }}
      />

      {toast && <Toast type={toast.type} message={toast.message} onClose={hideToast} />}
    </div>
  );
}

function AgendaSkeleton() {
  return (
    <div className="flex animate-pulse pb-4 pr-4 pt-6 lg:pr-8" aria-busy="true" aria-label="Loading your bookings">
      <div className="w-12 flex-shrink-0 space-y-[84px] pl-3 sm:w-14">
        {[0, 1, 2, 3, 4].map((i) => <div key={i} className="h-3 w-7 rounded bg-gray-100" />)}
      </div>
      <div className="relative h-[480px] flex-1 border-l border-gray-100">
        {[0, 1, 2, 3, 4].map((i) => <div key={i} className="absolute inset-x-0 border-t border-gray-100" style={{ top: i * 96 }} />)}
        <div className="absolute left-1 right-1 top-[52px] h-[92px] rounded-xl bg-gray-100" />
        <div className="absolute left-1 right-1 top-[196px] h-[140px] rounded-xl bg-gray-100" />
        <div className="absolute left-1 right-1 top-[388px] h-[68px] rounded-xl bg-gray-100" />
      </div>
    </div>
  );
}
