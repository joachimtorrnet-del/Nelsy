import { useState, useEffect } from 'react';
import Modal from './Modal';
import { supabase } from '../../lib/supabase';

interface Service {
  id: string;
  name: string;
  price_total?: number;
  price?: number;
  duration_minutes?: number;
  duration?: number;
}

interface AddBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  profileId: string;
  services: Service[];
}

const TIME_SLOTS: string[] = [];
for (let h = 9; h <= 18; h++) {
  for (let m = 0; m < 60; m += 30) {
    if (h === 18 && m > 0) break;
    TIME_SLOTS.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
  }
}

const TODAY = new Date().toISOString().split('T')[0];

export default function AddBookingModal({
  isOpen,
  onClose,
  onSuccess,
  profileId,
  services,
}: AddBookingModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    serviceId: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    date: '',
    time: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setFormData({
        serviceId: services[0]?.id ?? '',
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        date: TODAY,
        time: TIME_SLOTS[0] ?? '',
        notes: '',
      });
      setErrors({});
    }
  }, [isOpen, services]);

  const selectedService = services.find((s) => s.id === formData.serviceId);
  const servicePrice = selectedService?.price_total ?? selectedService?.price ?? 0;
  const serviceDuration = selectedService?.duration_minutes ?? selectedService?.duration ?? 60;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.serviceId) e.serviceId = 'Service required';
    if (!formData.clientName.trim()) e.clientName = 'Client name required';
    if (!formData.clientEmail.trim()) e.clientEmail = 'Email required';
    if (formData.clientEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail)) {
      e.clientEmail = 'Invalid email';
    }
    if (!formData.date) e.date = 'Date required';
    if (!formData.time) e.time = 'Time required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCreateBooking = async () => {
    if (!validate() || !supabase) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from('bookings')
        .insert({
          profile_id: profileId,
          client_name: formData.clientName,
          client_email: formData.clientEmail,
          client_phone: formData.clientPhone || null,
          service_id: formData.serviceId,
          booking_datetime: new Date(`${formData.date}T${formData.time}`).toISOString(),
          price_total: servicePrice,
          deposit_paid: 0,
          nelsy_fee: 0,
          status: 'confirmed',
          paid_at: new Date().toISOString(),
        });

      if (error) throw error;
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Error creating booking:', err);
      setErrors({ submit: err instanceof Error ? err.message : 'Failed to create booking' });
    } finally {
      setLoading(false);
    }
  };

  const field = (key: keyof typeof formData) => ({
    value: formData[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setFormData((f) => ({ ...f, [key]: e.target.value })),
  });

  const inputClass = (key: string) =>
    `w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition text-sm ${
      errors[key] ? 'border-red-500' : 'border-gray-200 focus:border-[#F52B8C]'
    }`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add appointment" maxWidth="lg">
      <div className="space-y-4">

        {/* Service */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Service *</label>
          <select {...field('serviceId')} className={inputClass('serviceId')}>
            {services.length === 0 && <option value="">No services — add one first</option>}
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — €{(s.price_total ?? s.price ?? 0).toFixed(2)} ({s.duration_minutes ?? s.duration ?? 60} min)
              </option>
            ))}
          </select>
          {errors.serviceId && <p className="text-xs text-red-600 mt-1">{errors.serviceId}</p>}
        </div>

        {/* Client Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Client name *</label>
          <input type="text" placeholder="Sarah Martin" {...field('clientName')} className={inputClass('clientName')} />
          {errors.clientName && <p className="text-xs text-red-600 mt-1">{errors.clientName}</p>}
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input type="email" placeholder="sarah@email.com" {...field('clientEmail')} className={inputClass('clientEmail')} />
            {errors.clientEmail && <p className="text-xs text-red-600 mt-1">{errors.clientEmail}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input type="tel" placeholder="+33 6 12 34 56 78" {...field('clientPhone')} className={inputClass('clientPhone')} />
          </div>
        </div>

        {/* Date + Time */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
            <input type="date" min={TODAY} {...field('date')} className={inputClass('date')} />
            {errors.date && <p className="text-xs text-red-600 mt-1">{errors.date}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
            <select {...field('time')} className={inputClass('time')}>
              <option value="">Choose time</option>
              {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            {errors.time && <p className="text-xs text-red-600 mt-1">{errors.time}</p>}
          </div>
        </div>

        {/* Summary */}
        {selectedService && (
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Service</span>
              <span className="font-semibold">{selectedService.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Duration</span>
              <span className="font-semibold">{serviceDuration} min</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
              <span className="font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-[#F52B8C]">€{servicePrice.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-400">✓ Booking will be marked as confirmed</p>
          </div>
        )}

        {errors.submit && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {errors.submit}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={() => void handleCreateBooking()}
            disabled={loading || services.length === 0}
            className="flex-1 py-4 bg-gradient-to-r from-[#F52B8C] to-[#E0167A] text-white rounded-xl font-bold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Adding…' : '✅ Confirm'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
