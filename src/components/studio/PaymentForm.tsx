import { useState } from 'react';
import {
  PaymentElement,
  ExpressCheckoutElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import type { FormEvent } from 'react';
import type { StripeExpressCheckoutElementConfirmEvent } from '@stripe/stripe-js';
import { Loader2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

interface PaymentFormProps {
  amount: number;
  bookingId: string | null;
  onSuccess: () => void;
}

export default function PaymentForm({ amount, bookingId, onSuccess }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [expressAvailable, setExpressAvailable] = useState(false);

  const markBookingPaid = async () => {
    if (bookingId && supabase) {
      await supabase
        .from('bookings')
        .update({ status: 'paid', paid_at: new Date().toISOString() })
        .eq('id', bookingId);
    }
    onSuccess();
  };

  const confirmPayment = async () => {
    if (!stripe || !elements) return;
    setIsProcessing(true);
    setErrorMessage(null);
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: `${window.location.origin}/booking-confirmed` },
        redirect: 'if_required',
      });
      if (error) {
        setErrorMessage(error.message ?? 'Payment failed');
      } else if (paymentIntent?.status === 'succeeded') {
        await markBookingPaid();
      }
    } catch {
      setErrorMessage('Payment error. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExpressConfirm = async (event: StripeExpressCheckoutElementConfirmEvent) => {
    if (!stripe || !elements) { event.paymentFailed({ reason: 'fail' }); return; }
    setIsProcessing(true);
    setErrorMessage(null);
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: `${window.location.origin}/booking-confirmed` },
        redirect: 'if_required',
      });
      if (error) {
        event.paymentFailed({ reason: 'fail' });
        setErrorMessage(error.message ?? 'Payment failed');
      } else if (paymentIntent?.status === 'succeeded') {
        await markBookingPaid();
      }
    } catch {
      event.paymentFailed({ reason: 'fail' });
      setErrorMessage('Payment error. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCardSubmit = (e: FormEvent) => {
    e.preventDefault();
    void confirmPayment();
  };

  return (
    <div className="space-y-4">
      {/* Apple Pay / Google Pay */}
      <ExpressCheckoutElement
        onConfirm={handleExpressConfirm}
        onReady={({ availablePaymentMethods }) => {
          setExpressAvailable(
            !!(
              availablePaymentMethods?.applePay ||
              availablePaymentMethods?.googlePay ||
              availablePaymentMethods?.link
            )
          );
        }}
        options={{
          buttonType: { applePay: 'buy', googlePay: 'buy' },
          buttonTheme: { applePay: 'black', googlePay: 'black' },
          buttonHeight: 48,
          layout: { maxColumns: 1, maxRows: 2, overflow: 'auto' },
        }}
      />

      {/* Separator — only shown when express methods are available */}
      {expressAvailable && (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium">or pay by card</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
      )}

      {/* Card form */}
      <form onSubmit={handleCardSubmit} className="space-y-4">
        <PaymentElement />

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-800">{errorMessage}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="w-full py-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-2xl font-bold text-base hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing…
            </>
          ) : (
            `Pay ${formatCurrency(amount)}`
          )}
        </button>
      </form>

      <p className="text-xs text-gray-500 text-center">
        Secured by Stripe · Your data is protected
      </p>
    </div>
  );
}
