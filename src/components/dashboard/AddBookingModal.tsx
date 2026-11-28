import { useEffect, useMemo, useState } from 'react';
import AddBookingSheet from './agenda/AddBookingSheet';
import type { AddBookingPrefill } from './agenda/AddBookingSheet';
import { supabase } from '../../lib/supabase';
import { agendaApi } from '../../lib/agendaApi';
import type { AgendaData } from '../../lib/agendaApi';
import { dayKeyInTz, defaultStartMinutes, minutesInTz, safeTimezone } from '../../lib/agenda';
import { deviceTimezone } from '../../lib/timezone';

interface AddBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  profileId: string;
  /** Kept for callers of the previous modal. The sheet loads the pro's services itself. */
  services?: unknown[];
}

const EMPTY: AgendaData = { bookings: [], services: [], availability: [], closedDates: [] };

/**
 * "Add a booking" from anywhere in the dashboard (the Home shortcut uses it).
 * Loads what the agenda's sheet needs (services, bookings for conflicts, working hours,
 * timezone, currency) and opens it on today. The Bookings tab uses AddBookingSheet directly.
 */
export default function AddBookingModal({ isOpen, onClose, onSuccess, profileId }: AddBookingModalProps) {
  const [data, setData] = useState<AgendaData | null>(null);
  const [timezone, setTimezone] = useState(() => safeTimezone(deviceTimezone()));
  const [currency, setCurrency] = useState('EUR');
  const [prefill, setPrefill] = useState<AddBookingPrefill | null>(null);

  useEffect(() => {
    if (!isOpen || !profileId || !supabase) return;
    let cancelled = false;
    (async () => {
      let tz = safeTimezone(deviceTimezone());
      let loaded = EMPTY;
      try {
        const [{ data: profile }, agenda] = await Promise.all([
          supabase.from('profiles').select('timezone, business_currency').eq('id', profileId).maybeSingle(),
          agendaApi.load(profileId),
        ]);
        const row = profile as { timezone?: string | null; business_currency?: string | null } | null;
        if (row?.timezone) tz = safeTimezone(row.timezone);
        if (!cancelled && row?.business_currency) setCurrency(row.business_currency.toUpperCase());
        loaded = agenda;
      } catch (err) {
        console.error('Error preparing the booking sheet:', err);
      }
      if (cancelled) return;
      const now = new Date();
      const today = dayKeyInTz(now, tz);
      setTimezone(tz);
      setData(loaded);
      setPrefill({ day: today, minutes: defaultStartMinutes(today, today, minutesInTz(now, tz), loaded.availability), source: 'fab' });
    })();
    return () => { cancelled = true; };
  }, [isOpen, profileId]);

  const hour12 = useMemo(() => {
    try {
      return new Intl.DateTimeFormat(undefined, { hour: 'numeric' }).resolvedOptions().hour12 ?? false;
    } catch {
      return false;
    }
  }, []);
  const agenda = data ?? EMPTY;

  return (
    <AddBookingSheet
      prefill={isOpen ? prefill : null}
      onClose={onClose}
      onSaved={(result) => {
        if (result.kind === 'booking') onSuccess();
      }}
      api={agendaApi}
      profileId={profileId}
      services={agenda.services}
      bookings={agenda.bookings}
      availability={agenda.availability}
      closedDates={agenda.closedDates}
      timezone={timezone}
      currency={currency}
      hour12={hour12}
      now={new Date()}
    />
  );
}
