import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Elements } from '@stripe/react-stripe-js';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MessageCircle,
  AlertCircle,
  Loader2,
  CalendarPlus,
  X,
  Video,
} from 'lucide-react';
import { useMoney } from '@/lib/currency';
import { useBookingStore } from '@/store/bookingStore';
import type { Merchant } from '@/types';
import { formatDate, zonedTimeToUtcIso } from '@/lib/utils';
import {
  trackBookingStarted,
  trackBookingDaySelected,
  trackSlotSelected,
  trackBookingDetailsCompleted,
  trackPaymentStarted,
  trackBookingCompleted,
} from '@/lib/analytics';
import { createBooking } from '@/lib/bookings';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { getStripe, getStripeForAccount, isStripeConfigured } from '@/lib/stripe';
import { getTheme } from '@/lib/themes';
import { getStudioFont } from '@/lib/studioFonts';
import { downloadIcs } from '@/lib/ics';
import PaymentForm from './PaymentForm';
import { isOnline, timezoneLabel } from '@/lib/onlineSessions';
import { bookingAccent } from './booking/accent';
import {
  addMinutes,
  buildStripDays,
  findNextAvailable,
  invalidateAvailability,
  shortDayLabel,
  todayInTimezone,
  useDayAvailability,
} from './booking/availability';
import { DateTimeStep } from './booking/DateTimeStep';
import { BookingSummary } from './booking/BookingSummary';
import type { PaymentPlan } from './booking/BookingSummary';

// ── Schema ────────────────────────────────────────────────────────────────────

const clientSchema = z.object({
  name: z.string().min(2, 'Name too short'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(8, 'Invalid phone number'),
});
type ClientForm = z.infer<typeof clientSchema>;

// ── Constants ─────────────────────────────────────────────────────────────────

// Steps: 1 date + time, 2 details, 3 payment (online payments only), 4 confirmed
const STEP_TIME = 1;
const STEP_DETAILS = 2;
const STEP_PAYMENT = 3;
const STEP_CONFIRMED = 4;

/** Days shown in the strip, and how many are checked before the client scrolls further. */
const STRIP_DAYS = 28;
const FIRST_BATCH = 14;

const DETAILS_FORM_ID = 'nelsy-booking-details';

const FOCUS_RING = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--bk-ink)]';
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

// ── Main component ────────────────────────────────────────────────────────────

export function BookingModal({ merchant }: { merchant: Merchant }) {
  const formatCurrency = useMoney();
  const reduceMotion = useReducedMotion();
  const {
    isOpen, selectedService, step,
    selectedDate, selectedTime,
    closeModal, setStep, setSelectedDate, setSelectedTime,
  } = useBookingStore();

  // The template's own accent, adjusted so it stays readable on the white sheet
  const studioFont = getStudioFont(merchant.font_family);
  const theme = useMemo(
    () => getTheme(merchant.theme_preset, merchant.color_accent, { background: merchant.color_background, fontFamily: studioFont?.stack }),
    [merchant.theme_preset, merchant.color_accent, merchant.color_background, studioFont?.stack],
  );
  const ui = useMemo(() => bookingAccent(theme), [theme]);
  const accentVars = {
    '--bk-fill': ui.fill, '--bk-on-fill': ui.onFill, '--bk-ink': ui.ink, '--bk-soft': ui.soft,
  } as CSSProperties;

  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [paymentClientSecret, setPaymentClientSecret] = useState<string | null>(null);
  const [paymentBookingId, setPaymentBookingId] = useState<string | null>(null);
  const [bookingSessionToken, setBookingSessionToken] = useState<string | null>(null);
  const [paymentStripeAccountId, setPaymentStripeAccountId] = useState<string | null>(null);
  const [confirmLeave, setConfirmLeave] = useState(false);
  const [requestedCount, setRequestedCount] = useState(FIRST_BATCH);

  const dialogRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const keepButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);

  // Fallback to Europe/Paris (primary market) when timezone not yet set on profile.
  // Timezone is set via create-connect-account at onboarding; existing accounts may lack it.
  const proTz = merchant.timezone ?? 'Europe/Paris';
  const duration = selectedService?.duration ?? 60;

  // The strip lists calendar days in the pro's timezone, like the slots themselves
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const todayStr = useMemo(() => todayInTimezone(proTz), [proTz, isOpen]);
  const days = useMemo(() => buildStripDays(todayStr, STRIP_DAYS), [todayStr]);
  const requestedDates = useMemo(() => days.slice(0, requestedCount).map((d) => d.date), [days, requestedCount]);
  const { slotsByDate, refreshDay } = useDayAvailability(
    merchant.id, duration, proTz, requestedDates,
    isOpen && !!selectedService && step === STEP_TIME,
  );
  const needMoreDays = useCallback(() => setRequestedCount(STRIP_DAYS), []);

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Track booking_started on first open
  useEffect(() => {
    if (isOpen && !wasOpenRef.current && selectedService) {
      trackBookingStarted(merchant.id, selectedService.id);
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, selectedService, merchant.id]);

  // Move focus into the dialog on open, and give it back on close
  useEffect(() => {
    if (!isOpen) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const id = window.setTimeout(() => dialogRef.current?.focus(), 30);
    return () => {
      window.clearTimeout(id);
      returnFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  // New step: back to the top, and announce the step title
  useEffect(() => {
    if (!isOpen) return;
    contentRef.current?.scrollTo({ top: 0 });
    // The confirmation title mounts after the step transition, so the dialog itself takes focus there
    if (step > STEP_TIME) (step < STEP_CONFIRMED ? titleRef.current ?? dialogRef.current : dialogRef.current)?.focus();
  }, [step, isOpen]);

  // Coming back to the time step: re-check the chosen day (someone may have taken the slot)
  useEffect(() => {
    if (isOpen && step === STEP_TIME && selectedDate) refreshDay(selectedDate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, step]);

  // Nothing chosen yet: land on the first day that has an opening
  useEffect(() => {
    if (!isOpen || step !== STEP_TIME || selectedDate) return;
    const first = findNextAvailable(requestedDates, slotsByDate, null);
    if (first === undefined) return;
    if (first) setSelectedDate(first);
    else if (requestedCount < STRIP_DAYS) setRequestedCount(STRIP_DAYS);
    else setSelectedDate(todayStr);
  }, [isOpen, step, selectedDate, requestedDates, slotsByDate, requestedCount, todayStr, setSelectedDate]);

  // Chosen day is full and nothing else in the first batch: look further ahead
  useEffect(() => {
    if (!isOpen || step !== STEP_TIME || !selectedDate || requestedCount >= STRIP_DAYS) return;
    const slots = slotsByDate[selectedDate];
    if (slots && slots.length === 0 && findNextAvailable(requestedDates, slotsByDate, selectedDate) === null) {
      setRequestedCount(STRIP_DAYS);
    }
  }, [isOpen, step, selectedDate, slotsByDate, requestedDates, requestedCount]);

  // The chosen time was taken in the meantime: drop it rather than let the booking fail later
  useEffect(() => {
    if (step !== STEP_TIME || !selectedDate || !selectedTime) return;
    const slots = slotsByDate[selectedDate];
    if (slots && !slots.includes(selectedTime)) setSelectedTime(null);
  }, [step, selectedDate, selectedTime, slotsByDate, setSelectedTime]);

  const { register, handleSubmit, formState: { errors, isDirty }, reset } = useForm<ClientForm>({
    resolver: zodResolver(clientSchema),
  });

  const goTo = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const handleDaySelect = (dateStr: string, source: 'strip' | 'next_available') => {
    if (dateStr !== selectedDate) setSelectedTime(null);
    setSelectedDate(dateStr);
    refreshDay(dateStr);
    trackBookingDaySelected(merchant.id, {
      days_ahead: days.findIndex((d) => d.date === dateStr),
      source,
    });
  };

  const handleTimeSelect = (slot: string) => {
    setSelectedTime(slot);
    trackSlotSelected(merchant.id);
  };

  const onSubmit = async (data: ClientForm) => {
    if (!selectedService || !selectedDate || !selectedTime) return;
    setIsSubmitting(true);
    setBookingError(null);

    try {
      // Slots are wall-clock times in the pro's timezone, not the client's
      const bookingDatetime = zonedTimeToUtcIso(selectedDate, selectedTime, merchant.timezone ?? 'Europe/Paris');

      if (isSupabaseConfigured && isStripeConfigured && supabase) {
        const { data: payData, error: payError } = await supabase.functions.invoke(
          'create-payment-intent',
          {
            body: {
              booking_data: {
                profile_id: merchant.id,
                service_id: selectedService.id,
                booking_datetime: bookingDatetime,
                client_name: data.name,
                client_email: data.email,
                client_phone: data.phone,
                // Financial fields (price, deposit, fees) are intentionally
                // omitted — the server derives all amounts from the DB.
              },
              // Send session token on retry so the server can reuse the same
              // PaymentIntent instead of returning 409 for the same slot.
              ...(bookingSessionToken ? { booking_session_token: bookingSessionToken } : {}),
            },
          }
        );
        if (payError) {
          let msg = payError.message;
          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const body = await (payError as any).context?.json();
            msg = body?.message ?? body?.error ?? msg;
          } catch { /* ignore */ }
          throw new Error(msg);
        }
        const { client_secret, booking_id, booking_session_token, stripe_account_id, payment_required } = payData as {
          client_secret?: string;
          booking_id: string;
          booking_session_token: string;
          stripe_account_id?: string;
          payment_required?: boolean;
        };
        if (payment_required === false) {
          // Pay-on-arrival offer: the server already confirmed the appointment
          setPaymentBookingId(booking_id);
          trackBookingDetailsCompleted(merchant.id);
          trackBookingCompleted(merchant.id);
          invalidateAvailability(merchant.id);
          goTo(STEP_CONFIRMED);
          return;
        }
        if (!client_secret) throw new Error('Payment could not be started. Please try again.');
        setPaymentClientSecret(client_secret);
        setPaymentBookingId(booking_id);
        setBookingSessionToken(booking_session_token);
        if (stripe_account_id) setPaymentStripeAccountId(stripe_account_id);
        trackBookingDetailsCompleted(merchant.id);
        trackPaymentStarted(merchant.id);
        goTo(STEP_PAYMENT);
      } else {
        await createBooking({
          serviceId: selectedService.id,
          profileId: merchant.id,
          datetime: new Date(bookingDatetime),
          clientName: data.name,
          clientEmail: data.email,
          clientPhone: data.phone,
          priceTotal: selectedService.price,
          depositAmount: selectedService.deposit,
        });
        trackBookingDetailsCompleted(merchant.id);
        trackBookingCompleted(merchant.id);
        invalidateAvailability(merchant.id);
        goTo(STEP_CONFIRMED);
      }
    } catch (err) {
      setBookingError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setConfirmLeave(false);
    closeModal();
    setTimeout(() => {
      setStep(STEP_TIME);
      setBookingError(null);
      setPaymentClientSecret(null);
      setPaymentBookingId(null);
      setBookingSessionToken(null);
      setPaymentStripeAccountId(null);
      reset();
    }, 350);
  };

  // Typed details (or a payment in progress) are worth a confirmation before leaving
  const hasEnteredData = step < STEP_CONFIRMED && (isDirty || step === STEP_PAYMENT);
  const requestClose = () => {
    if (hasEnteredData) setConfirmLeave(true);
    else handleClose();
  };

  useEffect(() => {
    if (confirmLeave) keepButtonRef.current?.focus();
  }, [confirmLeave]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      if (confirmLeave) setConfirmLeave(false);
      else requestClose();
      return;
    }
    if (e.key !== 'Tab') return;
    // Focus trap: Tab cycles inside the dialog (or inside the leave prompt when it is up)
    const scope = confirmLeave
      ? dialogRef.current?.querySelector<HTMLElement>('[data-leave-prompt]')
      : dialogRef.current;
    if (!scope) return;
    const items = [...scope.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null);
    if (items.length === 0) { e.preventDefault(); return; }
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || active === dialogRef.current || !scope.contains(active))) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && (active === last || !scope.contains(active))) {
      e.preventDefault(); first.focus();
    }
  };
  // Listen on the document: focus can sit on the page for a moment between two steps
  const keyHandlerRef = useRef(onKeyDown);
  useEffect(() => { keyHandlerRef.current = onKeyDown; });
  useEffect(() => {
    if (!isOpen) return;
    const listener = (e: KeyboardEvent) => keyHandlerRef.current(e);
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [isOpen]);

  if (!selectedService) return null;

  // Mirrors create-payment-intent: the offer's payment mode decides what is charged online
  const paymentMode = selectedService.payment_mode ?? (selectedService.deposit > 0 ? 'deposit' : 'full');
  const payOnArrival = paymentMode === 'on_arrival';
  const hasDeposit = paymentMode === 'deposit' && selectedService.deposit > 0;
  const chargeAmount = hasDeposit ? selectedService.deposit : selectedService.price;
  const methods = selectedService.on_arrival_methods ?? ['cash', 'card'];
  const onSiteLabel = methods.length === 1 ? (methods[0] === 'cash' ? 'Cash' : 'Card') : 'Cash or card';
  // Online video session (Creator plan): display only, the booking flow itself is unchanged
  const online = isOnline(selectedService);
  const payPlace = online ? 'at the session' : 'at the studio';
  const plan: PaymentPlan = {
    payOnArrival,
    hasDeposit,
    dueToday: payOnArrival ? 0 : chargeAmount,
    remainder: payOnArrival ? selectedService.price : hasDeposit ? selectedService.price - chargeAmount : 0,
    onSiteLabel,
    payPlace,
  };
  // Same condition as onSubmit: without it the booking is confirmed straight from the details step
  const paysOnline = !payOnArrival && isSupabaseConfigured && isStripeConfigured;

  const studioName = merchant.salon_name || merchant.name;
  const stepLabels = ['Date and time', 'Your details', ...(paysOnline ? ['Payment'] : [])];
  const stepTitle = step === STEP_TIME ? 'Pick a date and time' : step === STEP_DETAILS ? 'Your details' : 'Payment';
  const whenShort = selectedDate && selectedTime ? `${shortDayLabel(selectedDate, todayStr)} at ${selectedTime}` : null;
  const tzLabel = online ? timezoneLabel(proTz) : null;

  const summary = (showStudio: boolean) => (
    <BookingSummary
      merchant={merchant}
      service={selectedService}
      plan={plan}
      selectedDate={selectedDate}
      selectedTime={selectedTime}
      online={online}
      timezone={tzLabel}
      showStudio={showStudio}
    />
  );

  // Primary action of the current step, shared by the mobile footer and the desktop summary column
  const primaryAction = step === STEP_TIME ? (
    <PrimaryButton onClick={() => goTo(STEP_DETAILS)} disabled={!selectedDate || !selectedTime}>
      Continue <ArrowRight className="w-4 h-4" aria-hidden="true" />
    </PrimaryButton>
  ) : step === STEP_DETAILS ? (
    <PrimaryButton type="submit" form={DETAILS_FORM_ID} disabled={isSubmitting}>
      {isSubmitting ? (
        <><Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> Processing…</>
      ) : paysOnline ? (
        <>Continue to payment <ArrowRight className="w-4 h-4" aria-hidden="true" /></>
      ) : (
        'Confirm booking'
      )}
    </PrimaryButton>
  ) : null;

  const slide = reduceMotion
    ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        enter: (dir: number) => ({ x: dir > 0 ? 32 : -32, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? -32 : 32, opacity: 0 }),
      };
  const stepMotion = {
    custom: direction, variants: slide, initial: 'enter', animate: 'center', exit: 'exit',
    transition: { duration: 0.2 },
  } as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={requestClose}
            className="fixed inset-0 bg-black/55 z-40"
            aria-hidden="true"
          />

          {/* Full-screen sheet on mobile, centered two-column dialog from md up */}
          <div key="frame" className="fixed inset-0 z-50 flex md:items-center md:justify-center md:p-6 pointer-events-none">
            <motion.div
              ref={dialogRef}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto relative flex flex-col w-full h-full bg-white text-gray-900 font-sans overflow-hidden outline-none md:h-[min(740px,calc(100dvh-48px))] md:max-w-[960px] md:rounded-[28px] md:shadow-2xl"
              style={accentVars}
              role="dialog"
              aria-modal="true"
              aria-label={`Book ${selectedService.name} with ${studioName}`}
              tabIndex={-1}
              data-testid="booking-dialog"
              data-step={step}
            >
              {/* ── Header ───────────────────────────────────────── */}
              <header className="flex-shrink-0 border-b border-gray-100 px-3 md:px-5 pt-[max(8px,env(safe-area-inset-top))] pb-3">
                <div className="flex items-center gap-1 min-h-[48px]">
                  {step === STEP_DETAILS ? (
                    <button
                      type="button"
                      onClick={() => goTo(STEP_TIME)}
                      aria-label="Back to date and time"
                      className={`w-11 h-11 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 transition-colors flex-shrink-0 ${FOCUS_RING}`}
                    >
                      <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                    </button>
                  ) : (
                    <span className="w-2 md:w-3 flex-shrink-0" aria-hidden="true" />
                  )}
                  <div className="flex-1 min-w-0 px-1">
                    {step < STEP_CONFIRMED ? (
                      <>
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                          Step {step} of {stepLabels.length}
                        </p>
                        <h2
                          ref={titleRef}
                          tabIndex={-1}
                          className={`text-lg font-bold text-gray-900 leading-tight outline-none truncate ${theme.fontFamily ? '' : theme.fontClass}`}
                          style={{ fontFamily: theme.fontFamily }}
                        >
                          {stepTitle}
                        </h2>
                      </>
                    ) : (
                      <p className="text-sm font-semibold text-gray-500 truncate">{studioName}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={requestClose}
                    aria-label="Close"
                    className={`w-11 h-11 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 transition-colors flex-shrink-0 ${FOCUS_RING}`}
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>

                {/* Step indicator */}
                {step < STEP_CONFIRMED && (
                  <ol className="flex gap-1.5 px-2 md:px-3 mt-2" aria-label="Booking steps">
                    {stepLabels.map((label, i) => {
                      const n = i + 1;
                      const state = n < step ? 'done' : n === step ? 'current' : 'upcoming';
                      return (
                        <li key={label} className="flex-1 min-w-0" aria-current={state === 'current' ? 'step' : undefined}>
                          <span
                            className="block h-1 rounded-full transition-colors"
                            style={{ backgroundColor: state === 'upcoming' ? '#E5E7EB' : 'var(--bk-fill)', opacity: state === 'done' ? 0.45 : 1 }}
                          />
                          <span className={`hidden md:flex items-center gap-1 mt-1.5 text-xs truncate ${state === 'current' ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                            {state === 'done' && <Check className="w-3 h-3" aria-hidden="true" />}
                            {label}
                            <span className="sr-only">{state === 'done' ? ' (done)' : state === 'current' ? ' (current step)' : ''}</span>
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </header>

              {/* ── Body ─────────────────────────────────────────── */}
              <div className={`flex-1 min-h-0 flex flex-col ${step < STEP_CONFIRMED ? 'md:grid md:grid-cols-[minmax(0,1fr)_340px] md:grid-rows-[minmax(0,1fr)]' : ''}`}>
                <div ref={contentRef} className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain">
                  <AnimatePresence mode="wait" custom={direction} initial={false}>

                    {/* ── Step 1: date + time ─────────────────────── */}
                    {step === STEP_TIME && (
                      <motion.div key="time" {...stepMotion} className="px-5 md:px-8 pt-5 pb-8">
                        {/* Service recap (mobile: the summary column is desktop only) */}
                        <div className="md:hidden flex items-center justify-between gap-3 rounded-2xl bg-gray-50 px-4 py-3 mb-5">
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 text-sm truncate">{selectedService.name}</p>
                            <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
                              {selectedService.duration} min
                              {online && (
                                <span className="inline-flex items-center gap-1 font-semibold text-gray-700">
                                  <Video className="w-3 h-3" aria-hidden="true" /> Video call
                                </span>
                              )}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-bold text-gray-900 tabular-nums">{formatCurrency(selectedService.price)}</p>
                            {hasDeposit && <p className="text-xs text-gray-500 mt-0.5">Deposit {formatCurrency(chargeAmount)}</p>}
                            {payOnArrival && <p className="text-xs text-gray-500 mt-0.5">Pay on arrival</p>}
                          </div>
                        </div>

                        <DateTimeStep
                          days={days}
                          todayStr={todayStr}
                          slotsByDate={slotsByDate}
                          requestedCount={requestedCount}
                          selectedDate={selectedDate}
                          selectedTime={selectedTime}
                          onSelectDay={handleDaySelect}
                          onSelectTime={handleTimeSelect}
                          onNeedMoreDays={needMoreDays}
                          timezoneNote={online ? `Video call. Times are in ${tzLabel}.` : null}
                        />
                      </motion.div>
                    )}

                    {/* ── Step 2: details ─────────────────────────── */}
                    {step === STEP_DETAILS && (
                      <motion.div key="details" {...stepMotion} className="px-5 md:px-8 pt-5 pb-8">
                        {bookingError && (
                          <div role="alert" className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-2xl p-3.5 mb-5 text-sm text-red-800">
                            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <div className="min-w-0">
                              <p>{bookingError}</p>
                              <button
                                type="button"
                                onClick={() => { setBookingError(null); goTo(STEP_TIME); }}
                                className="mt-1 py-1.5 font-semibold underline underline-offset-2"
                              >
                                Pick another time
                              </button>
                            </div>
                          </div>
                        )}

                        <form id={DETAILS_FORM_ID} onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                          <Field id="bk-name" label="Full name" error={errors.name?.message}>
                            <input
                              {...register('name')}
                              id="bk-name"
                              type="text"
                              placeholder="Your name"
                              autoComplete="name"
                              aria-invalid={!!errors.name}
                              aria-describedby={errors.name ? 'bk-name-error' : undefined}
                              className={inputClass(!!errors.name)}
                            />
                          </Field>
                          <Field id="bk-email" label="Email" error={errors.email?.message} hint="Your confirmation is sent here.">
                            <input
                              {...register('email')}
                              id="bk-email"
                              type="email"
                              inputMode="email"
                              placeholder="you@email.com"
                              autoComplete="email"
                              aria-invalid={!!errors.email}
                              aria-describedby={errors.email ? 'bk-email-error' : 'bk-email-hint'}
                              className={inputClass(!!errors.email)}
                            />
                          </Field>
                          <Field id="bk-phone" label="Phone" error={errors.phone?.message}>
                            <input
                              {...register('phone')}
                              id="bk-phone"
                              type="tel"
                              inputMode="tel"
                              placeholder="Phone number"
                              autoComplete="tel"
                              aria-invalid={!!errors.phone}
                              aria-describedby={errors.phone ? 'bk-phone-error' : undefined}
                              className={inputClass(!!errors.phone)}
                            />
                          </Field>
                        </form>

                        {/* Price breakdown (mobile: on desktop it sits in the summary column) */}
                        <div className="md:hidden mt-6 rounded-2xl border border-gray-200 p-4">
                          {summary(false)}
                        </div>
                      </motion.div>
                    )}

                    {/* ── Step 3: payment ─────────────────────────── */}
                    {step === STEP_PAYMENT && paymentClientSecret && (
                      <motion.div key="payment" {...stepMotion} className="px-5 md:px-8 pt-5 pb-8">
                        <div className="md:hidden rounded-2xl border border-gray-200 p-4 mb-5">
                          {summary(false)}
                        </div>

                        <Elements
                          stripe={paymentStripeAccountId ? getStripeForAccount(paymentStripeAccountId) : getStripe()}
                          options={{
                            clientSecret: paymentClientSecret,
                            appearance: {
                              theme: 'stripe',
                              variables: { colorPrimary: ui.fill },
                            },
                          }}
                        >
                          <PaymentForm
                            amount={chargeAmount}
                            accent={ui.fill}
                            accentText={ui.onFill}
                            bookingId={paymentBookingId}
                            onSuccess={() => {
                              trackBookingCompleted(merchant.id);
                              invalidateAvailability(merchant.id);
                              goTo(STEP_CONFIRMED);
                            }}
                          />
                        </Elements>
                      </motion.div>
                    )}

                    {/* ── Step 4: confirmed ───────────────────────── */}
                    {step === STEP_CONFIRMED && (
                      <motion.div key="confirmed" {...stepMotion} className="px-5 md:px-8 pt-8 pb-10">
                        <div className="max-w-md mx-auto text-center">
                          <motion.div
                            initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', damping: 14, stiffness: 220, delay: 0.05 }}
                            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                            style={{ backgroundColor: 'var(--bk-fill)', color: 'var(--bk-on-fill)' }}
                          >
                            <Check className="w-8 h-8" strokeWidth={2.5} aria-hidden="true" />
                          </motion.div>

                          <h2
                            ref={titleRef}
                            tabIndex={-1}
                            className={`text-2xl font-bold text-gray-900 mb-1.5 outline-none ${theme.fontFamily ? '' : theme.fontClass}`}
                            style={{ fontFamily: theme.fontFamily }}
                          >
                            You're booked
                          </h2>
                          <p className="text-gray-600 text-sm mb-6">
                            {payOnArrival ? `See you soon. ${onSiteLabel} ${payPlace}.` : 'A confirmation email has been sent.'}
                          </p>

                          <dl className="rounded-2xl border border-gray-200 text-sm text-left divide-y divide-gray-100 mb-5">
                            <ConfirmRow label="Service" value={selectedService.name} />
                            <ConfirmRow label="Studio" value={merchant.salon_name} />
                            <ConfirmRow label="Date" value={selectedDate ? formatDate(selectedDate) : ''} />
                            <ConfirmRow
                              label="Time"
                              value={selectedTime ? `${selectedTime} to ${addMinutes(selectedTime, selectedService.duration)}` : ''}
                            />
                            {online && (
                              <>
                                <ConfirmRow label="Time zone" value={timezoneLabel(proTz)} />
                                <ConfirmRow
                                  label="Location"
                                  value={<span className="inline-flex items-center gap-1.5"><Video className="w-3.5 h-3.5" style={{ color: 'var(--bk-ink)' }} aria-hidden="true" /> Video call</span>}
                                />
                              </>
                            )}
                            {(payOnArrival || hasDeposit) && (
                              <ConfirmRow
                                label={`To pay ${payPlace}`}
                                value={formatCurrency(payOnArrival ? selectedService.price : selectedService.price - chargeAmount)}
                              />
                            )}
                          </dl>

                          {online && (
                            <p className="text-[13px] text-gray-600 bg-gray-50 rounded-xl px-4 py-3 mb-5 text-left">
                              This is an online session. How to join (the video link) is in your confirmation email.
                            </p>
                          )}

                          <PrimaryButton
                            onClick={() => {
                              if (!selectedDate || !selectedTime) return;
                              downloadIcs({
                                uid: paymentBookingId ?? `${merchant.id}-${selectedDate}-${selectedTime}`,
                                start: zonedTimeToUtcIso(selectedDate, selectedTime, proTz),
                                durationMinutes: selectedService.duration,
                                summary: `${selectedService.name} with ${studioName}`,
                                location: online ? null : merchant.location,
                                description: online ? 'Online session. The video link is in your confirmation email.' : null,
                              });
                            }}
                          >
                            <CalendarPlus className="w-5 h-5" aria-hidden="true" /> Add to calendar
                          </PrimaryButton>

                          <button
                            type="button"
                            onClick={handleClose}
                            className={`mt-3 w-full h-[52px] rounded-2xl border border-gray-200 font-semibold text-gray-900 hover:bg-gray-50 transition-colors ${FOCUS_RING}`}
                          >
                            Back to {studioName}
                          </button>

                          <a
                            href={`https://wa.me/?text=${encodeURIComponent(
                              `Booked: "${selectedService.name}" at ${merchant.salon_name}, ${selectedDate ? formatDate(selectedDate) : ''} at ${selectedTime}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`mt-2 inline-flex items-center justify-center gap-2 min-h-[44px] px-4 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 ${FOCUS_RING}`}
                          >
                            <MessageCircle className="w-4 h-4" aria-hidden="true" />
                            Share via WhatsApp
                          </a>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

                {/* ── Summary column (desktop) ────────────────────── */}
                {step < STEP_CONFIRMED && (
                  <aside className="hidden md:flex flex-col min-h-0 border-l border-gray-100 bg-gray-50 p-6 overflow-y-auto" aria-label="Booking summary">
                    {summary(true)}
                    {primaryAction && <div className="mt-auto pt-6">{primaryAction}</div>}
                  </aside>
                )}

                {/* ── Sticky action bar (mobile) ──────────────────── */}
                {primaryAction && (
                  <div
                    className={`md:hidden flex-shrink-0 border-t border-gray-100 bg-white px-5 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] flex gap-3 ${
                      step === STEP_TIME ? 'items-center' : 'flex-col'
                    }`}
                  >
                    <div className={`min-w-0 flex-1 ${step === STEP_TIME ? '' : 'flex items-baseline justify-between gap-3'}`}>
                      <p className="text-[15px] font-bold text-gray-900 leading-tight tabular-nums truncate">
                        {payOnArrival ? `${formatCurrency(selectedService.price)} ${payPlace}` : `${formatCurrency(plan.dueToday)} due today`}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 truncate" aria-live="polite">
                        {whenShort ?? 'Choose a time to continue'}
                      </p>
                    </div>
                    <div className={step === STEP_TIME ? 'w-[44%] max-w-[200px] flex-shrink-0' : ''}>{primaryAction}</div>
                  </div>
                )}
              </div>

              {/* ── Leave prompt ─────────────────────────────────── */}
              {confirmLeave && (
                <div className="absolute inset-0 z-10 flex items-end md:items-center justify-center bg-black/40 p-4">
                  <div
                    data-leave-prompt
                    role="alertdialog"
                    aria-modal="true"
                    aria-labelledby="bk-leave-title"
                    aria-describedby="bk-leave-text"
                    className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
                  >
                    <h3 id="bk-leave-title" className="text-lg font-bold text-gray-900">Leave this booking?</h3>
                    <p id="bk-leave-text" className="mt-1.5 text-sm text-gray-600">
                      {step === STEP_PAYMENT
                        ? 'Your appointment is not confirmed until the payment goes through.'
                        : 'Your appointment is not booked yet and the details you typed will be cleared.'}
                    </p>
                    <div className="mt-5 flex flex-col gap-2">
                      <button
                        ref={keepButtonRef}
                        type="button"
                        onClick={() => setConfirmLeave(false)}
                        className={`h-12 rounded-2xl font-bold ${FOCUS_RING}`}
                        style={{ backgroundColor: 'var(--bk-fill)', color: 'var(--bk-on-fill)' }}
                      >
                        Keep booking
                      </button>
                      <button
                        type="button"
                        onClick={handleClose}
                        className={`h-12 rounded-2xl font-semibold text-gray-700 hover:bg-gray-100 transition-colors ${FOCUS_RING}`}
                      >
                        Leave
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Small building blocks ─────────────────────────────────────────────────────

function PrimaryButton({ children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...rest}
      className={`w-full h-[52px] px-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 whitespace-nowrap transition-[opacity,transform] hover:opacity-90 active:scale-[0.98] disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:opacity-100 ${FOCUS_RING}`}
      style={rest.disabled ? undefined : { backgroundColor: 'var(--bk-fill)', color: 'var(--bk-on-fill)' }}
    >
      {children}
    </button>
  );
}

function inputClass(invalid: boolean): string {
  return `w-full h-[52px] px-4 rounded-xl border text-gray-900 placeholder-gray-400 text-base outline-none transition-colors focus:border-[color:var(--bk-ink)] focus:ring-2 focus:ring-[color:var(--bk-soft)] ${
    invalid ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
  }`;
}

function Field({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-900 mb-1.5">{label}</label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-[13px] text-red-600 mt-1.5">{error}</p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-[13px] text-gray-500 mt-1.5">{hint}</p>
      ) : null}
    </div>
  );
}

function ConfirmRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex justify-between gap-4 px-4 py-3">
      <dt className="text-gray-500 flex-shrink-0">{label}</dt>
      <dd className="font-semibold text-gray-900 text-right">{value}</dd>
    </div>
  );
}
