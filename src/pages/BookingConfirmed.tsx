import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function BookingConfirmed() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    loadBookingDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadBookingDetails = async () => {
    if (!sessionId || !supabase) {
      navigate('/');
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('get-booking-from-session', {
        body: { session_id: sessionId },
      });

      if (error) throw error;

      setBooking(data.booking);
    } catch (error) {
      console.error('Error loading booking:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#F52B8C] border-t-transparent" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Booking not found</p>
          <button onClick={() => navigate('/')} className="mt-4 text-[#F52B8C] hover:underline">
            Go home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
      <div className="max-w-md w-full">

        {/* Success Animation */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 animate-bounce">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed! 🎉</h1>
          <p className="text-gray-600">Your payment was successful</p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6 space-y-4">

          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-[#F52B8C] mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Date & Time</p>
              <p className="font-semibold text-gray-900">
                {new Date(booking.booking_datetime).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-gray-700">
                {new Date(booking.booking_datetime).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200" />

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-[#F52B8C] mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Service</p>
              <p className="font-semibold text-gray-900">{booking.service_name}</p>
              {booking.duration && (
                <p className="text-gray-600">{booking.duration} minutes</p>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200" />

          <div className="flex items-center justify-between">
            <span className="text-gray-600">Amount Paid</span>
            <span className="text-2xl font-bold text-[#F52B8C]">€{Number(booking.price_total).toFixed(2)}</span>
          </div>

        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-900 mb-1">Confirmation sent!</p>
              <p className="text-sm text-blue-700">
                We've sent all the details to <strong>{booking.client_email}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Cancellation Policy:</strong>
          </p>
          <p className="text-sm text-gray-600">
            Free cancellation up to 24 hours before your appointment.
            Cancellations within 24 hours are non-refundable.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/')}
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
          >
            Back to Home
          </button>
          <button
            onClick={() => alert('Add to calendar feature coming soon!')}
            className="flex-1 py-3 bg-[#F52B8C] text-white rounded-xl font-semibold hover:opacity-90 transition"
          >
            📅 Add to Calendar
          </button>
        </div>

      </div>
    </div>
  );
}
