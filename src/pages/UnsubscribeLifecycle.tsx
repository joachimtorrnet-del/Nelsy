import { useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Loader2, MailX, CheckCircle2 } from 'lucide-react';
import { unsubscribeLifecycleEmails } from '@/lib/contacts';

/**
 * /u/emails/:profileId?t=<token> (link in every trial setup email sent to a pro).
 * Unsubscribing takes one click on the button: opening the page alone changes
 * nothing, because email link scanners open URLs automatically.
 */
export default function UnsubscribeLifecycle() {
  const { profileId = '' } = useParams<{ profileId: string }>();
  const [params] = useSearchParams();
  const token = params.get('t') ?? '';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const confirm = async () => {
    setLoading(true);
    setError(null);
    try {
      await unsubscribeLifecycleEmails(profileId, token);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'This unsubscribe link is not valid.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-[#fbf8fa] flex items-center justify-center px-4 py-10 font-sans">
      <div className="w-full max-w-[420px] bg-white rounded-3xl border border-gray-100 shadow-[0_12px_40px_rgba(0,0,0,0.06)] p-6 sm:p-8">
        <div className="w-12 h-12 rounded-2xl bg-[#fde8f3] flex items-center justify-center mb-5">
          {done ? <CheckCircle2 className="w-6 h-6 text-green-600" strokeWidth={1.7} /> : <MailX className="w-6 h-6 text-[#F52B8C]" strokeWidth={1.7} />}
        </div>
        {done ? (
          <>
            <h1 className="text-xl font-bold text-[#1A1A1A]">You are unsubscribed</h1>
            <p className="text-sm text-gray-600 mt-2">
              You will not get setup tips from Nelsy anymore. Emails about your bookings and your plan are not affected.
              You can turn the tips back on in your dashboard settings.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold text-[#1A1A1A]">Stop setup tips</h1>
            <p className="text-sm text-gray-600 mt-2">Stop the short setup emails Nelsy sends during your free trial.</p>
            {error && <p className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5">{error}</p>}
            <button onClick={() => void confirm()} disabled={loading || !profileId || !token}
              className="mt-5 w-full py-3.5 rounded-2xl bg-[#1A1A1A] text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50">
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              Unsubscribe
            </button>
          </>
        )}
        <p className="text-center text-xs text-gray-400 mt-6">
          <Link to="/" className="font-semibold text-[#F52B8C]">Nelsy</Link>
        </p>
      </div>
    </div>
  );
}
