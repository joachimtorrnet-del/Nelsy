import { useState } from 'react';
import type { FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, Loader2, CheckCircle2, FileDown } from 'lucide-react';
import { getProductDownload, PRODUCT_MAX_DOWNLOADS } from '@/lib/products';
import type { ProductDownload as DownloadResult } from '@/lib/products';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Buyer re-download page: /d/:orderId (link sent in the purchase email), and
 * /r/:claimId for free resources (link sent by claim-free-resource).
 * The URL carries no personal data; the buyer proves the purchase by typing the
 * email used at checkout. Stripe redirect-based payments also return here.
 */
export default function ProductDownload() {
  const { orderId = '', claimId = '' } = useParams<{ orderId: string; claimId: string }>();
  const isFree = !!claimId;
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DownloadResult | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const clean = email.trim().toLowerCase();
    if (!EMAIL_RE.test(clean)) { setError(isFree ? 'Enter the email this link was sent to.' : 'Enter the email you used at checkout.'); return; }
    setError(null);
    setLoading(true);
    try {
      const res = await getProductDownload(isFree ? { claimId, email: clean } : { orderId, email: clean });
      setResult(res);
      window.location.assign(res.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download is not available. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-[#fbf8fa] flex items-center justify-center px-4 py-10 font-sans">
      <div className="w-full max-w-[420px] bg-white rounded-3xl border border-gray-100 shadow-[0_12px_40px_rgba(0,0,0,0.06)] p-6 sm:p-8">
        <div className="w-12 h-12 rounded-2xl bg-[#fde8f3] flex items-center justify-center mb-5">
          <FileDown className="w-6 h-6 text-[#F52B8C]" strokeWidth={1.7} />
        </div>
        {result ? (
          <>
            <h1 className="text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" /> Your download is starting
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              <strong className="text-[#1A1A1A]">{result.product_title}</strong>. If nothing happens, use the button below.
            </p>
            <a href={result.url} className="mt-5 w-full py-3.5 rounded-2xl bg-[#F52B8C] text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition">
              <Download className="w-5 h-5" /> Download
            </a>
            <p className="text-xs text-gray-500 mt-3 text-center">
              {result.downloads_left} of {PRODUCT_MAX_DOWNLOADS} downloads left. This link expires in a few minutes.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold text-[#1A1A1A]">{isFree ? 'Download your free resource' : 'Download your purchase'}</h1>
            <p className="text-sm text-gray-600 mt-2">
              {isFree ? 'Enter the email this link was sent to, to get your file.' : 'Enter the email you used at checkout to get your file.'}
            </p>
            <form onSubmit={submit} className="mt-5 space-y-3">
              <label htmlFor="dl-email" className="sr-only">Email</label>
              <input id="dl-email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3.5 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F52B8C] focus:border-transparent outline-none" />
              {error && <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5">{error}</p>}
              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-[#F52B8C] text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-60">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                Get my file
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-4">
              {isFree ? 'This link' : 'Each purchase'} can be downloaded up to {PRODUCT_MAX_DOWNLOADS} times.
            </p>
          </>
        )}
        <p className="text-center text-xs text-gray-400 mt-6">
          {isFree ? 'Shared' : 'Sold'} with <Link to="/" className="font-semibold text-[#F52B8C]">Nelsy</Link>
        </p>
      </div>
    </div>
  );
}
