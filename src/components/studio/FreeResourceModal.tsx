import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { X, Loader2, MailCheck, Mail, Gift } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';
import { track } from '@/lib/analytics';
import { claimFreeResource, PRODUCT_MAX_DOWNLOADS } from '@/lib/products';
import type { PublicProduct } from '@/lib/products';
import { ProductCover } from './StudioProducts';

interface Props {
  product: PublicProduct;
  sellerName: string;
  accent: string;
  onClose: () => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Local dev without Supabase: walk through the flow without sending anything.
const LOCAL_DEMO = import.meta.env.DEV && !isSupabaseConfigured;

/**
 * Free resource (lead magnet) on a studio page: email + optional first name + an
 * explicit, unticked marketing consent box. The file is only ever emailed, so the
 * address has to be real to get it.
 */
export function FreeResourceModal({ product, sellerName, accent, onClose }: Props) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);

  useEffect(() => {
    setSentTo(null); setError(null); setSending(false); setConsent(false);
  }, [product.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!EMAIL_RE.test(cleanEmail)) { setError('Enter a valid email: the file is sent there.'); return; }
    setError(null);
    if (LOCAL_DEMO) { setSentTo(cleanEmail); return; }
    setSending(true);
    try {
      await claimFreeResource(product.id, { email: cleanEmail, firstName: firstName.trim(), consentMarketing: consent });
      track('free_resource_claimed', { product_id: product.id, profile_id: product.profile_id, consent_marketing: consent });
      setSentTo(cleanEmail);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'This free resource could not be sent. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const inputCls = 'w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:border-transparent outline-none';
  const ring = { ['--tw-ring-color' as string]: accent };

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-label={product.title}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full sm:max-w-[440px] max-h-[92dvh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl font-sans">
        <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 z-10 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center text-gray-600 hover:text-[#1A1A1A]">
          <X className="w-4 h-4" />
        </button>

        {sentTo ? (
          <div className="p-6 sm:p-8 text-center">
            <MailCheck className="w-14 h-14 mx-auto mb-4" style={{ color: accent }} strokeWidth={1.6} />
            <h2 className="text-xl font-bold text-[#1A1A1A]">Check your inbox</h2>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              We sent <strong className="text-[#1A1A1A]">{product.title}</strong> to <strong className="text-[#1A1A1A] break-words">{sentTo}</strong>.
              It can take a minute. Look in your spam folder if you do not see it.
            </p>
            <p className="text-xs text-gray-400 mt-4">The link in the email works up to {PRODUCT_MAX_DOWNLOADS} times.</p>
            {LOCAL_DEMO && <p className="text-xs text-amber-700 mt-3">Local demo: email is not configured, nothing was sent.</p>}
            <button onClick={onClose}
              className="mt-6 w-full py-3.5 rounded-2xl font-bold text-base border border-gray-200 text-[#1A1A1A] hover:bg-gray-50 transition">
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="p-4 pb-0">
              <ProductCover url={product.cover_url} accent={accent} height={180} />
            </div>
            <div className="p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">{sellerName}</p>
              <h2 className="text-xl font-bold text-[#1A1A1A] leading-snug">{product.title}</h2>
              <p className="text-lg font-bold mt-1 inline-flex items-center gap-1.5" style={{ color: accent }}>
                <Gift className="w-4 h-4" /> Free
              </p>
              {product.description && (
                <p className="text-sm text-gray-600 leading-relaxed mt-3 whitespace-pre-line">{product.description}</p>
              )}

              <form onSubmit={submit} className="mt-5 space-y-3" noValidate>
                <div>
                  <label htmlFor="fr-email" className="block text-sm font-semibold text-[#1A1A1A] mb-1">Email</label>
                  <input id="fr-email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com" className={inputCls} style={ring} />
                </div>
                <div>
                  <label htmlFor="fr-name" className="block text-sm font-semibold text-[#1A1A1A] mb-1">First name <span className="font-normal text-gray-400">(optional)</span></label>
                  <input id="fr-name" autoComplete="given-name" maxLength={100} value={firstName} onChange={(e) => setFirstName(e.target.value)}
                    className={inputCls} style={ring} />
                </div>
                <label htmlFor="fr-consent" className="flex items-start gap-3 rounded-xl border border-gray-200 px-3.5 py-3 cursor-pointer">
                  <input id="fr-consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 flex-shrink-0 rounded border-gray-300" style={{ accentColor: accent }} />
                  <span className="text-sm text-[#1A1A1A] leading-snug">
                    Send me emails from {sellerName}
                    <span className="block text-xs text-gray-500 mt-0.5">Tips and offers. Optional. Unsubscribe at any time.</span>
                  </span>
                </label>
                {error && <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5">{error}</p>}
                <button type="submit" disabled={sending}
                  className="w-full py-3.5 rounded-2xl text-white font-bold text-base hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2"
                  style={{ backgroundColor: accent }}>
                  {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mail className="w-5 h-5" />}
                  Email me the file
                </button>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Your email is shared with {sellerName}. If the box is unticked, you only receive this file.{' '}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Privacy</a>
                </p>
                {LOCAL_DEMO && <p className="text-xs text-amber-700 text-center">Local demo: email is not configured, nothing is sent.</p>}
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
