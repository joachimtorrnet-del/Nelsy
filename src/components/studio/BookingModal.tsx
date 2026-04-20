import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Elements } from '@stripe/react-stripe-js';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  ChevronLeft,
  CheckCircle2,
  MessageCircle,
  AlertCircle,
  Loader2,
  Clock,
  CalendarDays,
  X,
} from 'lucide-react';
import { useBookingStore } from '@/store/bookingStore';
import type { Merchant } from '@/types';
import { formatDate, formatCurrency, getDaysInMonth, isDateInPast } from '@/lib/utils';
import { createBooking, getAvailableSlots } from '@/lib/bookings';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { getStripe, isStripeConfigured } from '@/lib/stripe';
import { CLOSED_DAYS } from '@/lib/mockData';
import PaymentForm from './PaymentForm';

// ── Schema ────────────────────────────────────────────────────────────────────

const clientSchema = z.object({
  name: z.string().min(2, 'Nom trop court'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Numéro invalide'),
});
type ClientForm = z.infer<typeof clientSchema>;

// ── Constants ─────────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];
const DAY_INITIALS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

// ── Animation variants ────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
};

// ── Main component ────────────────────────────────────────────────────────────

export function BookingModal({ merchant }: { merchant: Merchant }) {
  const {
    isOpen, selectedService, step,
    selectedDate, selectedTime,
    closeModal, setStep, setSelectedDate, setSelectedTime,
  } = useBookingStore();

  const accent = merchant.color_accent ?? '#F52B8C';

  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [paymentClientSecret, setPaymentClientSecret] = useState<string | null>(null);
  const [paymentBookingId, setPaymentBookingId] = useState<string | null>(null);

  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const contentRef = useRef<HTMLDivElement>(null);

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Reset scroll when step changes
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 });
  }, [step]);

  // Fetch slots when step 2 is reached
  useEffect(() => {
    if (step !== 2 || !selectedDate) return;
    let cancelled = false;
    setSlotsLoading(true);
    setAvailableSlots([]);
    void getAvailableSlots(merchant.id, new Date(selectedDate)).then((slots) => {
      if (!cancelled) { setAvailableSlots(slots); setSlotsLoading(false); }
    });
    return () => { cancelled = true; };
  }, [step, selectedDate, merchant.id]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ClientForm>({
    resolver: zodResolver(clientSchema),
  });

  const goTo = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const handleDateSelect = (dateStr: string) => {
    setSelectedDate(dateStr);
    setTimeout(() => goTo(2), 320);
  };

  const handleTimeSelect = (slot: string) => {
    setSelectedTime(slot);
    setTimeout(() => goTo(3), 320);
  };

  const onSubmit = async (data: ClientForm) => {
    if (!selectedService || !selectedDate || !selectedTime) return;
    setIsSubmitting(true);
    setBookingError(null);

    try {
      const [hour, minute] = selectedTime.split(':').map(Number);
      const dt = new Date(selectedDate);
      dt.setHours(hour, minute, 0, 0);

      if (isSupabaseConfigured && isStripeConfigured && supabase) {
        const { data: payData, error: payError } = await supabase.functions.invoke(
          'create-payment-intent',
          {
            body: {
              booking_data: {
                profile_id: merchant.id,
                service_id: selectedService.id,
                booking_datetime: dt.toISOString(),
                client_name: data.name,
                client_email: data.email,
                client_phone: data.phone,
                price_total: selectedService.price,
                deposit_paid: 0,
                nelsy_fee: 0,
              },
            },
          }
        );
        if (payError) throw new Error(payError.message);
        const { client_secret, booking_id } = payData as { client_secret: string; booking_id: string };
        setPaymentClientSecret(client_secret);
        setPaymentBookingId(booking_id);
        goTo(4);
      } else {
        await createBooking({
          serviceId: selectedService.id,
          profileId: merchant.id,
          datetime: dt,
          clientName: data.name,
          clientEmail: data.email,
          clientPhone: data.phone,
          priceTotal: selectedService.price,
          depositAmount: selectedService.deposit,
        });
        goTo(5);
      }
    } catch (err) {
      setBookingError(err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setStep(1);
      setBookingError(null);
      setPaymentClientSecret(null);
      setPaymentBookingId(null);
      reset();
    }, 350);
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const days = getDaysInMonth(viewYear, viewMonth);
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const offset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  const todayStr = today.toISOString().split('T')[0];

  if (!selectedService) return null;

  const stepLabels = ['Date', 'Horaire', 'Mes infos', 'Paiement'];

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
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-40"
            aria-hidden="true"
          />

          {/* Bottom sheet */}
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320, mass: 0.8 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[28px] flex flex-col shadow-2xl"
            style={{ maxHeight: '92dvh' }}
            role="dialog"
            aria-modal="true"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
              <div className="w-10 h-1 bg-gray-200 rounded-full" />
            </div>

            {/* Header */}
            {step < 5 && (
              <div className="px-5 pt-1 pb-4 flex-shrink-0">
                {/* Service summary */}
                <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3 mb-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm truncate">{selectedService.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {selectedService.duration} min
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xl font-extrabold text-gray-900">{selectedService.price}€</p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="ml-1 w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 hover:bg-gray-300 transition-colors"
                    aria-label="Fermer"
                  >
                    <X className="w-3.5 h-3.5 text-gray-500" />
                  </button>
                </div>

                {/* Step progress */}
                <div className="flex items-center gap-1.5">
                  {stepLabels.map((label, i) => {
                    const s = i + 1;
                    const active = s === step;
                    const done = s < step;
                    return (
                      <div key={s} className="flex items-center gap-1.5 flex-1">
                        <div className="flex flex-col items-center flex-1">
                          <div
                            className={`h-1 w-full rounded-full transition-all duration-400 ${
                              done ? '' : active ? '' : 'bg-gray-100'
                            }`}
                            style={done || active ? { background: done ? `${accent}80` : accent } : {}}
                          />
                          {active && (
                            <p className="text-[10px] font-semibold mt-1.5" style={{ color: accent }}>
                              {label}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Scrollable content */}
            <div ref={contentRef} className="flex-1 overflow-y-auto overscroll-contain">
              <AnimatePresence mode="wait" custom={direction}>

                {/* ── Step 1: Date ─────────────────────────────── */}
                {step === 1 && (
                  <motion.div
                    key="s1"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    className="px-5 pb-8"
                  >
                    {/* Month nav */}
                    <div className="flex items-center justify-between mb-5">
                      <button
                        onClick={prevMonth}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Mois précédent"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </button>
                      <p className="font-bold text-gray-900 capitalize text-base">
                        {MONTH_NAMES[viewMonth]} {viewYear}
                      </p>
                      <button
                        onClick={nextMonth}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors rotate-180"
                        aria-label="Mois suivant"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>

                    {/* Day headers */}
                    <div className="grid grid-cols-7 mb-2">
                      {DAY_INITIALS.map((d, i) => (
                        <div key={i} className="text-center text-xs font-bold text-gray-300 py-1">
                          {d}
                        </div>
                      ))}
                    </div>

                    {/* Days */}
                    <div className="grid grid-cols-7 gap-y-1">
                      {Array.from({ length: offset }).map((_, i) => <div key={`e${i}`} />)}
                      {days.map((date) => {
                        const dateStr = date.toISOString().split('T')[0];
                        const past = isDateInPast(date);
                        const closed = CLOSED_DAYS.includes(date.getDay());
                        const disabled = past || closed;
                        const selected = selectedDate === dateStr;
                        const isToday = dateStr === todayStr;
                        return (
                          <motion.button
                            key={dateStr}
                            onClick={() => !disabled && handleDateSelect(dateStr)}
                            disabled={disabled}
                            whileTap={disabled ? {} : { scale: 0.88 }}
                            className={`
                              aspect-square flex items-center justify-center rounded-full text-sm font-medium transition-all mx-auto w-10 h-10
                              ${disabled ? 'text-gray-200 cursor-not-allowed' : 'cursor-pointer'}
                              ${selected ? 'text-white shadow-md' : ''}
                              ${!disabled && !selected && isToday ? 'font-extrabold' : ''}
                              ${!disabled && !selected ? 'hover:bg-gray-100 text-gray-900' : ''}
                            `}
                            style={
                              selected
                                ? { background: accent }
                                : isToday && !disabled
                                  ? { color: accent }
                                  : {}
                            }
                          >
                            {date.getDate()}
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Hint */}
                    {!selectedDate && (
                      <p className="text-center text-xs text-gray-400 mt-6">
                        Sélectionnez une date disponible
                      </p>
                    )}
                  </motion.div>
                )}

                {/* ── Step 2: Time ─────────────────────────────── */}
                {step === 2 && (
                  <motion.div
                    key="s2"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    className="px-5 pb-8"
                  >
                    {/* Selected date pill */}
                    <button
                      onClick={() => goTo(1)}
                      className="flex items-center gap-2 mb-5 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <CalendarDays className="w-4 h-4" style={{ color: accent }} />
                      <span className="capitalize">{selectedDate ? formatDate(selectedDate) : ''}</span>
                      <ChevronLeft className="w-4 h-4 rotate-180 text-gray-400" />
                    </button>

                    {slotsLoading ? (
                      <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
                        <Loader2 className="w-6 h-6 animate-spin" style={{ color: accent }} />
                        <p className="text-sm">Vérification des disponibilités...</p>
                      </div>
                    ) : availableSlots.length === 0 ? (
                      <div className="text-center py-16">
                        <p className="text-3xl mb-3">😔</p>
                        <p className="font-semibold text-gray-900 mb-1">Aucun créneau disponible</p>
                        <p className="text-sm text-gray-400 mb-6">Essayez une autre date</p>
                        <button
                          onClick={() => goTo(1)}
                          className="px-6 py-2.5 rounded-xl font-semibold text-sm text-white"
                          style={{ background: accent }}
                        >
                          Changer de date
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                          {availableSlots.length} créneaux disponibles
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          {availableSlots.map((slot) => {
                            const selected = selectedTime === slot;
                            return (
                              <motion.button
                                key={slot}
                                onClick={() => handleTimeSelect(slot)}
                                whileTap={{ scale: 0.93 }}
                                className="py-3.5 rounded-2xl text-sm font-semibold transition-all border-2"
                                style={
                                  selected
                                    ? { background: accent, color: '#fff', borderColor: accent }
                                    : { borderColor: '#f3f4f6', color: '#111827' }
                                }
                              >
                                {slot}
                              </motion.button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </motion.div>
                )}

                {/* ── Step 3: Info ──────────────────────────────── */}
                {step === 3 && (
                  <motion.div
                    key="s3"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    className="px-5 pb-8"
                  >
                    {/* Mini recap */}
                    <div className="flex items-center gap-3 mb-6 text-sm text-gray-600">
                      <span className="flex items-center gap-1.5 font-semibold text-gray-900">
                        <CalendarDays className="w-4 h-4" style={{ color: accent }} />
                        <span className="capitalize">{selectedDate ? formatDate(selectedDate) : ''}</span>
                      </span>
                      <span className="text-gray-300">·</span>
                      <span className="flex items-center gap-1.5 font-semibold text-gray-900">
                        <Clock className="w-4 h-4" style={{ color: accent }} />
                        {selectedTime}
                      </span>
                    </div>

                    {bookingError && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-2xl p-3 mb-4 text-sm text-red-700"
                      >
                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{bookingError}</span>
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                          Prénom et nom
                        </label>
                        <input
                          {...register('name')}
                          type="text"
                          placeholder="Marie Dupont"
                          autoComplete="name"
                          className={`w-full px-4 py-3.5 rounded-2xl border-2 text-gray-900 placeholder-gray-300 outline-none transition-colors text-base ${
                            errors.name ? 'border-red-400 bg-red-50' : 'border-gray-100 bg-gray-50 focus:border-gray-300'
                          }`}
                        />
                        {errors.name && <p className="text-xs text-red-500 mt-1 ml-1">{errors.name.message}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                          Téléphone
                        </label>
                        <input
                          {...register('phone')}
                          type="tel"
                          placeholder="06 12 34 56 78"
                          autoComplete="tel"
                          className={`w-full px-4 py-3.5 rounded-2xl border-2 text-gray-900 placeholder-gray-300 outline-none transition-colors text-base ${
                            errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-100 bg-gray-50 focus:border-gray-300'
                          }`}
                        />
                        {errors.phone && <p className="text-xs text-red-500 mt-1 ml-1">{errors.phone.message}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                          Email
                        </label>
                        <input
                          {...register('email')}
                          type="email"
                          placeholder="marie@email.fr"
                          autoComplete="email"
                          className={`w-full px-4 py-3.5 rounded-2xl border-2 text-gray-900 placeholder-gray-300 outline-none transition-colors text-base ${
                            errors.email ? 'border-red-400 bg-red-50' : 'border-gray-100 bg-gray-50 focus:border-gray-300'
                          }`}
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1 ml-1">{errors.email.message}</p>}
                      </div>

                      {/* Payment summary */}
                      <div className="rounded-2xl border border-gray-100 p-4 mt-5 space-y-2">
                        <div className="flex justify-between text-sm pt-2">
                          <span className="font-bold text-gray-900">Total</span>
                          <span className="font-bold" style={{ color: accent }}>
                            {formatCurrency(selectedService.price)}
                          </span>
                        </div>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-2xl font-bold text-base text-white mt-2 flex items-center justify-center gap-2 disabled:opacity-60 transition-opacity active:scale-[0.98]"
                        style={{ background: accent }}
                      >
                        {isSubmitting ? (
                          <><Loader2 className="w-5 h-5 animate-spin" /> Réservation en cours...</>
                        ) : (
                          `💳 Payer ${formatCurrency(selectedService.price)} →`
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* ── Step 4: Payment ───────────────────────────── */}
                {step === 4 && paymentClientSecret && (
                  <motion.div
                    key="s4"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    className="px-5 pb-8"
                  >
                    <div className="rounded-2xl border border-gray-100 p-4 mb-5 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-1.5">
                          <CalendarDays className="w-3.5 h-3.5" style={{ color: accent }} />
                          {selectedDate ? formatDate(selectedDate) : ''}
                        </span>
                        <span className="font-semibold text-gray-900">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">{selectedService.name}</span>
                        <span className="font-semibold text-gray-900">{formatCurrency(selectedService.price)}</span>
                      </div>
                      <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
                        <span className="font-bold text-gray-900">Total</span>
                        <span className="font-bold text-lg" style={{ color: accent }}>
                          {formatCurrency(selectedService.price)}
                        </span>
                      </div>
                    </div>

                    <Elements
                      stripe={getStripe()}
                      options={{
                        clientSecret: paymentClientSecret,
                        appearance: {
                          theme: 'stripe',
                          variables: { colorPrimary: accent },
                        },
                      }}
                    >
                      <PaymentForm
                        amount={selectedService.price}
                        bookingId={paymentBookingId}
                        onSuccess={() => goTo(5)}
                      />
                    </Elements>
                  </motion.div>
                )}

                {/* ── Step 5: Confirmed ─────────────────────────── */}
                {step === 5 && (
                  <motion.div
                    key="s5"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    className="px-5 pt-4 pb-10 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -15 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.05 }}
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                      style={{ background: `${accent}18` }}
                    >
                      <CheckCircle2 className="w-10 h-10" style={{ color: accent }} />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <h2 className="text-2xl font-extrabold text-gray-900 mb-1">C'est réservé !</h2>
                      <p className="text-gray-500 text-sm mb-6">
                        Un email de confirmation vous a été envoyé.
                      </p>

                      <div className="bg-gray-50 rounded-2xl p-4 text-sm text-left space-y-2.5 mb-6">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Service</span>
                          <span className="font-semibold text-gray-900">{selectedService.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Salon</span>
                          <span className="font-semibold text-gray-900">{merchant.salon_name}</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-100 pt-2.5">
                          <span className="text-gray-400">Date</span>
                          <span className="font-semibold text-gray-900 capitalize">
                            {selectedDate ? formatDate(selectedDate) : ''}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Heure</span>
                          <span className="font-semibold text-gray-900">{selectedTime}</span>
                        </div>
                      </div>

                      <motion.a
                        href={`https://wa.me/?text=${encodeURIComponent(
                          `✅ Réservé : "${selectedService.name}" chez ${merchant.salon_name} le ${selectedDate ? formatDate(selectedDate) : ''} à ${selectedTime} !`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileTap={{ scale: 0.97 }}
                        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#25D366] text-white font-bold text-sm mb-3"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Partager sur WhatsApp
                      </motion.a>

                      <button
                        onClick={handleClose}
                        className="w-full py-3 text-sm text-gray-400 font-medium"
                      >
                        Fermer
                      </button>
                    </motion.div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Back nav (steps 2–3) */}
            {(step === 2 || step === 3) && (
              <div className="px-5 pt-2 pb-5 flex-shrink-0 border-t border-gray-50">
                <button
                  onClick={() => goTo(step - 1)}
                  className="flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Retour
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
