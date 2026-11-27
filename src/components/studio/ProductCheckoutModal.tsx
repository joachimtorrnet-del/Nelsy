import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Elements, PaymentElement, ExpressCheckoutElement, useStripe, useElements } from '@stripe/react-stripe-js';
import type { StripeExpressCheckoutElementConfirmEvent } from '@stripe/stripe-js';
import { X, Loader2, CheckCircle2, Download, Mail, ShieldCheck } from 'lucide-react';
import { getStripeForAccount, isStripeConfigured } from '@/lib/stripe';
import { isSupabaseConfigured } from '@/lib/supabase';
import { track } from '@/lib/analytics';
import { startProductCheckout, getProductDownload, formatProductPrice, PRODUCT_MAX_DOWNLOADS } from '@/lib/products';
import type { PublicProduct, ProductCheckout } from '@/lib/products';
import { ProductCover } from './StudioProducts';

interface Props {
  product: PublicProduct | null;
  sellerName: string;
  accent: string;
  onClose: () => void;
}

type Step = 'details' | 'pay' | 'done';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Local dev without Supabase/Stripe: walk through the flow without charging anything.
const LOCAL_DEMO = import.meta.env.DEV && (!isSupabaseConfigured || !isStripeConfigured);

export function ProductCheckoutModal({ product, sellerName, accent, onClose }: Props) {
  const [step, setStep] = useState<Step>('details');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);
  const [checkout, setCheckout] = useState<ProductCheckout | null>(null);

  // Reset when another product opens
  useEffect(() => {
    setStep('details'); setError(null); setCheckout(null); setStarting(false);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [product, onClose]);

  if (!product) return null;
  const price = formatProductPrice(product.price_cents, product.currency);

  const start = async (e: FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!EMAIL_RE.test(cleanEmail)) { setError('Enter a valid email: your download link is sent there.'); return; }
    setError(null);
    if (LOCAL_DEMO) { setStep('done'); return; }
    setStarting(true);
    try {
      const co = await startProductCheckout(product.id, cleanEmail, name.trim());
      setCheckout(co);
      track('product_checkout_started', { product_id: product.id, profile_id: product.profile_id, amount_cents: co.amount_cents, currency: co.currency });
      setStep('pay');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout could not start. Please try again.');
    } finally {
      setStarting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-label={product.title}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full sm:max-w-[440px] max-h-[92dvh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl font-sans">
        <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 z-10 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center text-gray-600 hover:text-[#1A1A1A]">
          <X className="w-4 h-4" />
        </button>

        {step !== 'done' && (
          <div className="p-4 pb-0">
            <ProductCover url={product.cover_url} accent={accent} height={step === 'pay' ? 120 : 200} />
          </div>
        )}

        <div className="p-5 sm:p-6">
          {step === 'details' && (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">{sellerName}</p>
              <h2 className="text-xl font-bold text-[#1A1A1A] leading-snug">{product.title}</h2>
              <p className="text-lg font-bold mt-1" style={{ color: accent }}>{price}</p>
              {product.description && (
                <p className="text-sm text-gray-600 leading-relaxed mt-3 whitespace-pre-line">{product.description}</p>
              )}
              <ul className="mt-4 space-y-1.5 text-[13px] text-gray-500">
                <li className="flex items-center gap-2"><Download className="w-4 h-4 text-gray-400" /> Instant download after payment</li>
                <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" /> A copy of the link is emailed to you</li>
              </ul>
              <form onSubmit={start} className="mt-5 space-y-3">
                <div>
                  <label htmlFor="buyer-email" className="block text-sm font-semibold text-[#1A1A1A] mb-1">Email</label>
                  <input id="buyer-email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:border-transparent outline-none"
                    style={{ ['--tw-ring-color' as string]: accent }} />
                </div>
                <div>
                  <label htmlFor="buyer-name" className="block text-sm font-semibold text-[#1A1A1A] mb-1">Name <span className="font-normal text-gray-400">(optional)</span></label>
                  <input id="buyer-name" autoComplete="name" maxLength={100} value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:border-transparent outline-none"
                    style={{ ['--tw-ring-color' as string]: accent }} />
                </div>
                {error && <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5">{error}</p>}
                <button type="submit" disabled={starting}
                  className="w-full py-3.5 rounded-2xl text-white font-bold text-base hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2"
                  style={{ backgroundColor: accent }}>
                  {starting && <Loader2 className="w-5 h-5 animate-spin" />}
                  Continue to payment
                </button>
                {LOCAL_DEMO && <p className="text-xs text-amber-700 text-center">Local demo: payments are not configured, nothing is charged.</p>}
              </form>
            </>
          )}

          {step === 'pay' && checkout && (
            <>
              <div className="flex items-baseline justify-between gap-3 mb-4">
                <h2 className="text-base font-bold text-[#1A1A1A] truncate">{product.title}</h2>
                <span className="text-base font-bold flex-shrink-0" style={{ color: accent }}>{price}</span>
              </div>
              <Elements
                stripe={getStripeForAccount(checkout.stripe_account_id)}
                options={{ clientSecret: checkout.client_secret, appearance: { theme: 'stripe', variables: { colorPrimary: accent } } }}
              >
                <ProductPaymentForm
                  amountLabel={price}
                  accent={accent}
                  orderId={checkout.order_id}
                  onSuccess={() => {
                    track('product_purchased', { product_id: product.id, profile_id: product.profile_id, amount_cents: checkout.amount_cents, currency: checkout.currency });
                    setStep('done');
                  }}
                />
              </Elements>
            </>
          )}

          {step === 'done' && (
            <SuccessPanel
              productTitle={product.title}
              email={email.trim().toLowerCase()}
              paymentIntentId={checkout?.payment_intent_id ?? null}
              accent={accent}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ProductPaymentForm({ amountLabel, accent, orderId, onSuccess }: { amountLabel: string; accent: string; orderId: string; onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expressAvailable, setExpressAvailable] = useState(false);
  // Redirect-based methods come back to the re-download page for this order.
  const returnUrl = `${window.location.origin}/d/${encodeURIComponent(orderId)}`;

  const confirm = async (express?: StripeExpressCheckoutElementConfirmEvent) => {
    if (!stripe || !elements) { express?.paymentFailed({ reason: 'fail' }); return; }
    setProcessing(true);
    setError(null);
    try {
      const { error: err, paymentIntent } = await stripe.confirmPayment({ elements, confirmParams: { return_url: returnUrl }, redirect: 'if_required' });
      if (err) {
        express?.paymentFailed({ reason: 'fail' });
        setError(err.message ?? 'Payment failed');
      } else if (paymentIntent?.status === 'succeeded' || paymentIntent?.status === 'processing') {
        // The webhook is the authority for marking the order paid; the download
        // endpoint re-checks the PaymentIntent with Stripe if it runs first.
        onSuccess();
      }
    } catch {
      express?.paymentFailed({ reason: 'fail' });
      setError('Payment error. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <ExpressCheckoutElement
        onConfirm={(e) => void confirm(e)}
        onReady={({ availablePaymentMethods }) => setExpressAvailable(!!(availablePaymentMethods?.applePay || availablePaymentMethods?.googlePay || availablePaymentMethods?.link))}
        options={{ buttonType: { applePay: 'buy', googlePay: 'buy' }, buttonTheme: { applePay: 'black', googlePay: 'black' }, buttonHeight: 48, layout: { maxColumns: 1, maxRows: 2, overflow: 'auto' } }}
      />
      {expressAvailable && (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium">or by card</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
      )}
      <form onSubmit={(e) => { e.preventDefault(); void confirm(); }} className="space-y-4">
        <PaymentElement />
        {error && <p className="text-sm text-red-800 bg-red-50 border border-red-200 rounded-xl p-3">{error}</p>}
        <button type="submit" disabled={!stripe || processing}
          className="w-full py-4 text-white rounded-2xl font-bold text-base hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
          style={{ backgroundColor: accent }}>
          {processing ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing…</> : `Pay ${amountLabel}`}
        </button>
      </form>
      <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Secured by Stripe</p>
    </div>
  );
}

function SuccessPanel({ productTitle, email, paymentIntentId, accent }: { productTitle: string; email: string; paymentIntentId: string | null; accent: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [left, setLeft] = useState<number | null>(null);

  const download = async () => {
    if (!paymentIntentId) { setError('Local demo: there is no file to download.'); return; }
    setLoading(true);
    setError(null);
    try {
      // The webhook can lag a few seconds: retry briefly while the payment settles.
      let lastErr: unknown = null;
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const res = await getProductDownload({ paymentIntentId, email });
          setLeft(res.downloads_left);
          window.location.assign(res.url);
          return;
        } catch (err) {
          lastErr = err;
          await new Promise((r) => setTimeout(r, 2000));
        }
      }
      throw lastErr;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download is not available yet. Use the link in your email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center py-4">
      <CheckCircle2 className="w-14 h-14 mx-auto mb-4" style={{ color: accent }} strokeWidth={1.6} />
      <h2 className="text-xl font-bold text-[#1A1A1A]">Payment received</h2>
      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
        <strong className="text-[#1A1A1A]">{productTitle}</strong> is yours. We also emailed the download link to <strong className="text-[#1A1A1A] break-all">{email}</strong>.
      </p>
      <button onClick={() => void download()} disabled={loading}
        className="mt-6 w-full py-4 rounded-2xl text-white font-bold text-base hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2"
        style={{ backgroundColor: accent }}>
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
        Download
      </button>
      {left !== null && <p className="text-xs text-gray-500 mt-2">{left} downloads left on this purchase.</p>}
      {error && <p className="text-sm text-red-700 mt-3">{error}</p>}
      <p className="text-xs text-gray-400 mt-4">The link works up to {PRODUCT_MAX_DOWNLOADS} times.</p>
    </div>
  );
}
