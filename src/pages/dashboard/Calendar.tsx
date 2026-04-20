import { useState, useEffect } from 'react';
import Modal from '../../components/dashboard/Modal';
import Toast from '../../components/dashboard/Toast';
import ConfirmDialog from '../../components/dashboard/ConfirmDialog';
import AddBookingModal from '../../components/dashboard/AddBookingModal';
import { CalendarSkeleton, BookingCardSkeleton } from '../../components/dashboard/SkeletonLoader';
import { useToast } from '../../hooks/useToast';
import { supabase } from '../../lib/supabase';
import type { DbServiceRow } from '../../lib/supabase';
import { getBookings, confirmBooking, cancelBooking, updateBooking } from '../../lib/supabase-queries';

interface Profile {
  id?: string;
  full_name?: string;
}

interface Appointment {
  id: string;
  date: Date;
  service: string;
  client: string;
  clientInitials: string;
  price: number;
  duration: number;
  status: 'pending' | 'paid' | 'confirmed' | 'completed' | 'cancelled' | 'refunded';
  phone: string;
  notes: string;
}

type FilterType = 'all' | 'pending' | 'confirmed' | 'completed';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const STATUS_BADGE: Record<string, { bg: string; text: string; border: string; label: string; icon: string }> = {
  pending:   { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200', label: 'Pending',    icon: '⏳' },
  paid:      { bg: 'bg-green-100',  text: 'text-green-700',  border: 'border-green-200',  label: 'Paid',       icon: '✅' },
  confirmed: { bg: 'bg-green-100',  text: 'text-green-700',  border: 'border-green-200',  label: 'Paid',       icon: '✅' },
  completed: { bg: 'bg-blue-100',   text: 'text-blue-700',   border: 'border-blue-200',   label: 'Completed',  icon: '🎉' },
  cancelled: { bg: 'bg-gray-100',   text: 'text-gray-700',   border: 'border-gray-200',   label: 'Cancelled',  icon: '❌' },
  refunded:  { bg: 'bg-red-100',    text: 'text-red-700',    border: 'border-red-200',    label: 'Refunded',   icon: '↩️' },
};

function getStatusBadge(status: string) {
  const cfg = STATUS_BADGE[status] ?? STATUS_BADGE.pending;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      <span>{cfg.icon}</span>
      <span>{cfg.label}</span>
    </span>
  );
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function formatDateFull(date: Date) {
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

interface CardHandlers {
  onView: (apt: Appointment) => void;
  onConfirm: (apt: Appointment) => void;
  onCancel: (apt: Appointment) => void;
  onReschedule: (apt: Appointment) => void;
}

export default function Calendar({ profile }: { profile: Profile | null }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'list'>('month');
  const [filter, setFilter] = useState<FilterType>('all');
  const [initialLoading, setInitialLoading] = useState(true);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [servicesArr, setServicesArr] = useState<DbServiceRow[]>([]);

  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showAddBookingModal, setShowAddBookingModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const [reschedule, setReschedule] = useState<{
    isOpen: boolean; appointment: Appointment | null; date: string; time: string;
  }>({ isOpen: false, appointment: null, date: '', time: '' });
  const [rescheduleSaving, setRescheduleSaving] = useState(false);

  const { toast, showSuccess, showError, showInfo, hideToast } = useToast();
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    if (type === 'error') showError(message);
    else if (type === 'info') showInfo(message);
    else showSuccess(message);
  };

  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean; title: string; message: string;
    onConfirm: () => void; type: 'danger' | 'warning' | 'info';
  }>({
    isOpen: false, title: '', message: '', onConfirm: () => {}, type: 'warning',
  });

  const loadData = async () => {
    if (!profile?.id || !supabase) return;
    try {

      // Load services for name/duration lookup
      const { data: servicesData } = await supabase
        .from('services')
        .select('*')
        .eq('profile_id', profile.id);

      setServicesArr((servicesData ?? []) as DbServiceRow[]);
      const servicesMap = new Map((servicesData ?? []).map((s) => [s.id, s]));

      // Load all bookings (no date filter for full calendar)
      const { data: bookings, error } = await getBookings(profile.id);

      if (error) {
        showToast('Failed to load bookings', 'error');
      } else if (bookings) {
        const transformed: Appointment[] = bookings.map((b) => {
          const service = servicesMap.get(b.service_id ?? '');
          const nameParts = (b.client_name ?? '').split(' ');
          const statusMap: Record<string, Appointment['status']> = {
            pending: 'pending', confirmed: 'confirmed', paid: 'paid',
            completed: 'completed', no_show: 'cancelled', cancelled: 'cancelled',
            refunded: 'refunded',
          };
          return {
            id: b.id,
            date: new Date(b.booking_datetime),
            service: service?.name ?? 'Service',
            client: b.client_name,
            clientInitials: nameParts.map((n: string) => n[0]).join('').toUpperCase(),
            price: Number(b.price_total ?? 0),
            duration: service?.duration_minutes ?? 60,
            status: statusMap[b.status] ?? 'pending',
            phone: b.client_phone ?? '',
            notes: '',
          };
        });
        setAppointments(transformed);
      }
    } catch (err) {
      console.error('Error loading calendar data:', err);
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    if (profile?.id) {
      loadData();
    } else {
      setInitialLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id]);

  const handleViewAppointment = (apt: Appointment) => {
    setSelectedAppointment(apt);
    setShowAppointmentModal(true);
  };

  const handleConfirmAppointment = (apt: Appointment) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Confirm appointment',
      message: `Confirm ${apt.client}'s appointment for ${apt.service} on ${formatDateFull(apt.date)}?`,
      type: 'info',
      onConfirm: async () => {
        try {
          await confirmBooking(apt.id);
          showToast(`${apt.client}'s appointment confirmed ✓`, 'success');
          setShowAppointmentModal(false);
          loadData();
        } catch (err) {
          console.error('Error confirming booking:', err);
          showToast('Could not confirm appointment', 'error');
        }
      },
    });
  };

  const handleCancelAppointment = (apt: Appointment) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Cancel appointment',
      message: `Cancel ${apt.client}'s appointment for ${apt.service}? This cannot be undone.`,
      type: 'danger',
      onConfirm: async () => {
        try {
          await cancelBooking(apt.id);
          showToast(`${apt.client}'s appointment cancelled`, 'info');
          setShowAppointmentModal(false);
          loadData();
        } catch (err) {
          console.error('Error cancelling booking:', err);
          showToast('Could not cancel appointment', 'error');
        }
      },
    });
  };

  const handleReschedule = (apt: Appointment) => {
    const dt = apt.date;
    setReschedule({
      isOpen: true,
      appointment: apt,
      date: dt.toISOString().split('T')[0],
      time: `${String(dt.getHours()).padStart(2, '0')}:${String(dt.getMinutes()).padStart(2, '0')}`,
    });
  };

  const handleRescheduleSubmit = async () => {
    if (!reschedule.appointment || !reschedule.date || !reschedule.time) return;
    setRescheduleSaving(true);
    try {
      const { error } = await updateBooking(reschedule.appointment.id, {
        booking_datetime: new Date(`${reschedule.date}T${reschedule.time}`).toISOString(),
      });
      if (error) throw error;
      setReschedule({ isOpen: false, appointment: null, date: '', time: '' });
      setShowAppointmentModal(false);
      loadData();
      showToast('Appointment rescheduled!');
    } catch {
      showToast('Could not reschedule appointment', 'error');
    } finally {
      setRescheduleSaving(false);
    }
  };

  const handleAddBooking = () => {
    setShowAddBookingModal(true);
  };

  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const filteredAppointments = filter === 'all'
    ? appointments
    : filter === 'confirmed'
    ? appointments.filter((apt) => apt.status === 'confirmed' || apt.status === 'paid')
    : appointments.filter((apt) => apt.status === filter);

  const selectedDateAppointments = filteredAppointments.filter(
    (apt) => apt.date.toDateString() === selectedDate.toDateString(),
  );

  const datesWithAppointments = new Set(filteredAppointments.map((apt) => apt.date.toDateString()));

  const changeMonth = (delta: number) => {
    setSelectedDate(new Date(currentYear, currentMonth + delta, 1));
  };

  const renderCalendar = () => {
    const totalCells = Math.ceil((startingDayOfWeek + daysInMonth) / 7) * 7;
    return Array.from({ length: totalCells }, (_, i) => {
      const dayNumber = i - startingDayOfWeek + 1;
      const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;
      const date = isValidDay ? new Date(currentYear, currentMonth, dayNumber) : null;
      const isToday = date?.toDateString() === new Date().toDateString();
      const isSelected = date?.toDateString() === selectedDate.toDateString();
      const hasAppointments = date && datesWithAppointments.has(date.toDateString());

      return (
        <button
          key={i}
          onClick={() => date && setSelectedDate(date)}
          disabled={!isValidDay}
          className={`aspect-square p-2 rounded-xl text-sm font-medium transition relative ${
            !isValidDay
              ? 'text-transparent cursor-default'
              : isSelected
              ? 'bg-[#F52B8C] text-white'
              : isToday
              ? 'bg-blue-50 text-blue-600 border-2 border-blue-200'
              : 'text-gray-900 hover:bg-gray-100'
          }`}
        >
          {isValidDay && dayNumber}
          {hasAppointments && (
            <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-[#F52B8C]'}`} />
          )}
        </button>
      );
    });
  };

  const grouped = filteredAppointments.reduce<Record<string, Appointment[]>>((acc, apt) => {
    const key = apt.date.toDateString();
    if (!acc[key]) acc[key] = [];
    acc[key].push(apt);
    return acc;
  }, {});

  const filterCounts: Record<FilterType, number> = {
    all: appointments.length,
    pending: appointments.filter((a) => a.status === 'pending').length,
    confirmed: appointments.filter((a) => a.status === 'confirmed' || a.status === 'paid').length,
    completed: appointments.filter((a) => a.status === 'completed').length,
  };

  const handlers: CardHandlers = {
    onView: handleViewAppointment,
    onConfirm: handleConfirmAppointment,
    onCancel: handleCancelAppointment,
    onReschedule: handleReschedule,
  };

  if (initialLoading) {
    return (
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
        <CalendarSkeleton />
        <div className="space-y-3">
          {[0, 1].map((i) => <BookingCardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-24 px-4 pt-5 space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
        <div className="flex bg-gray-100 p-1 rounded-xl gap-1">
          {(['month', 'list'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition capitalize ${
                view === v ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400'
              }`}
            >
              {v === 'month' ? 'Month' : 'List'}
            </button>
          ))}
        </div>
      </div>

      {view === 'month' ? (
        <>
          {/* Month calendar */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-100 rounded-xl transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 className="text-lg font-bold text-gray-900">{MONTH_NAMES[currentMonth]} {currentYear}</h2>
              <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-100 rounded-xl transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAY_NAMES.map((day) => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 p-2">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
          </div>

          {/* Selected day appointments */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">{formatDateFull(selectedDate)}</h3>
              <span className="text-sm text-gray-500">
                {selectedDateAppointments.length} appointment{selectedDateAppointments.length !== 1 ? 's' : ''}
              </span>
            </div>

            {selectedDateAppointments.length === 0 ? (
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <p className="text-3xl mb-2">✨</p>
                <p className="text-gray-500 text-sm mb-4">No appointments today</p>
                <button
                  onClick={handleAddBooking}
                  className="px-5 py-2.5 bg-[#F52B8C] text-white rounded-xl text-sm font-semibold hover:opacity-90 active:scale-95 transition shadow-md shadow-[#F52B8C]/25"
                >
                  + Add
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDateAppointments.map((apt) => (
                  <AppointmentCard key={apt.id} apt={apt} showActions handlers={handlers} />
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        /* List view */
        <div className="space-y-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {(['all', 'pending', 'confirmed', 'completed'] as FilterType[]).map((f) => {
              const labels: Record<string, string> = { all: 'All', pending: 'Pending', confirmed: 'Paid', completed: 'Completed' };
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition ${
                    filter === f ? 'bg-[#F52B8C] text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {labels[f]} ({filterCounts[f]})
                </button>
              );
            })}
          </div>

          {filteredAppointments.length === 0 ? (
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <p className="text-3xl mb-2">📅</p>
              <p className="text-gray-400 text-sm">No bookings found</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(grouped).map(([dateKey, apts]) => (
                <div key={dateKey}>
                  <h3 className="font-bold text-gray-900 mb-3">{formatDateFull(new Date(dateKey))}</h3>
                  <div className="space-y-3">
                    {apts.map((apt) => (
                      <AppointmentCard key={apt.id} apt={apt} handlers={handlers} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Floating add button */}
      <button
        onClick={handleAddBooking}
        className="fixed bottom-24 right-4 w-14 h-14 bg-gradient-to-br from-[#F52B8C] to-[#E0167A] text-white rounded-full shadow-xl flex items-center justify-center text-2xl hover:scale-110 transition z-40"
      >
        +
      </button>

      {/* Appointment Details Modal */}
      <Modal
        isOpen={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
        title="Appointment details"
        maxWidth="sm"
      >
        {selectedAppointment && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F52B8C] to-[#E0167A] flex items-center justify-center text-white font-bold text-xl">
                {selectedAppointment.clientInitials}
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{selectedAppointment.client}</p>
                <p className="text-gray-500">{selectedAppointment.phone}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Service</span>
                <span className="font-semibold">{selectedAppointment.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date</span>
                <span className="font-semibold">{formatDateFull(selectedAppointment.date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Time</span>
                <span className="font-semibold">{formatTime(selectedAppointment.date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Duration</span>
                <span className="font-semibold">{selectedAppointment.duration} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Price</span>
                <span className="font-bold text-[#F52B8C]">€{selectedAppointment.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Status</span>
                {getStatusBadge(selectedAppointment.status)}
              </div>
            </div>

            {selectedAppointment.notes && (
              <div className="bg-blue-50 rounded-2xl p-4">
                <p className="text-xs font-medium text-blue-600 mb-1">Notes</p>
                <p className="text-gray-700">{selectedAppointment.notes}</p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              {selectedAppointment.status === 'pending' && (
                <button
                  onClick={() => {
                    setShowAppointmentModal(false);
                    handleConfirmAppointment(selectedAppointment);
                  }}
                  className="flex-1 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition"
                >
                  ✓ Confirm
                </button>
              )}
              <button
                onClick={() => {
                  setShowAppointmentModal(false);
                  handleReschedule(selectedAppointment);
                }}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition"
              >
                Reschedule
              </button>
              <button
                onClick={() => {
                  setShowAppointmentModal(false);
                  handleCancelAppointment(selectedAppointment);
                }}
                className="flex-1 py-3 bg-orange-50 text-orange-600 rounded-xl font-semibold hover:bg-orange-100 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Booking Modal */}
      <AddBookingModal
        isOpen={showAddBookingModal}
        onClose={() => setShowAddBookingModal(false)}
        onSuccess={() => {
          showToast('Booking added! 📅');
          loadData();
        }}
        profileId={profile?.id ?? ''}
        services={servicesArr}
      />

      {toast && <Toast type={toast.type} message={toast.message} onClose={hideToast} />}

      {/* Reschedule Modal */}
      <Modal
        isOpen={reschedule.isOpen}
        onClose={() => setReschedule((r) => ({ ...r, isOpen: false }))}
        title="Reschedule appointment"
        maxWidth="sm"
      >
        <div className="space-y-4">
          {reschedule.appointment && (
            <p className="text-sm text-gray-500">
              {reschedule.appointment.client} — {reschedule.appointment.service}
            </p>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New date</label>
              <input
                type="date"
                value={reschedule.date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setReschedule((r) => ({ ...r, date: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#F52B8C] focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New time</label>
              <select
                value={reschedule.time}
                onChange={(e) => setReschedule((r) => ({ ...r, time: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#F52B8C] focus:outline-none transition"
              >
                {Array.from({ length: 19 }, (_, i) => {
                  const h = Math.floor(i / 2) + 9;
                  const m = i % 2 === 0 ? '00' : '30';
                  const val = `${String(h).padStart(2, '0')}:${m}`;
                  return <option key={val} value={val}>{val}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-1">
            <button
              onClick={() => setReschedule((r) => ({ ...r, isOpen: false }))}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => void handleRescheduleSubmit()}
              disabled={rescheduleSaving || !reschedule.date || !reschedule.time}
              className="flex-1 py-3 bg-[#F52B8C] text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {rescheduleSaving ? 'Saving…' : 'Confirm'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog((d) => ({ ...d, isOpen: false }))}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
        type={confirmDialog.type}
        confirmText={confirmDialog.type === 'danger' ? 'Cancel booking' : 'Confirm'}
        cancelText="Back"
      />
    </div>
  );
}

function AppointmentCard({
  apt,
  showActions = false,
  handlers,
}: {
  apt: Appointment;
  showActions?: boolean;
  handlers: CardHandlers;
}) {
  return (
    <div className="bg-gray-50 rounded-2xl p-4">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F52B8C] to-[#E0167A] flex items-center justify-center text-white font-bold flex-shrink-0">
          {apt.clientInitials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <p className="font-bold text-gray-900">{apt.client}</p>
              <p className="text-sm text-gray-600">{apt.service}</p>
            </div>
            <p className="text-sm font-bold text-[#F52B8C]">€{apt.price.toFixed(2)}</p>
          </div>

          <div className="flex items-center gap-3 text-xs mb-3">
            <span className="text-gray-500">🕐 {formatTime(apt.date)}</span>
            {showActions && <span className="text-gray-500">⏱ {apt.duration} min</span>}
            {getStatusBadge(apt.status)}
          </div>

          <div className="flex gap-2">
            {apt.status === 'pending' && (
              <button
                onClick={() => handlers.onConfirm(apt)}
                className="flex-1 py-2 bg-green-50 text-green-600 rounded-xl text-sm font-medium hover:bg-green-100 transition"
              >
                ✓ Confirm
              </button>
            )}
            {showActions ? (
              <button
                onClick={() => handlers.onReschedule(apt)}
                className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition"
              >
                Reschedule
              </button>
            ) : (
              <button
                onClick={() => handlers.onView(apt)}
                className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition"
              >
                View details
              </button>
            )}
            {showActions && (
              <button
                onClick={() => handlers.onCancel(apt)}
                className="flex-1 py-2 bg-orange-50 text-orange-600 rounded-xl text-sm font-medium hover:bg-orange-100 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
