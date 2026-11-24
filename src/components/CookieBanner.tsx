import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import posthog from 'posthog-js';
import { needsConsent, getConsent, setConsent } from '@/lib/consent';

/**
 * Shown only to visitors in Europe who haven't chosen yet. Rendered after mount,
 * so it never ends up in the prerendered HTML.
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // navigator.webdriver: the prerender (headless Chrome) must never bake the banner into static HTML
    if (navigator.webdriver) return;
    if (needsConsent() && getConsent() === 'pending') setVisible(true);
  }, []);

  if (!visible) return null;

  const choose = (granted: boolean) => {
    setConsent(granted ? 'granted' : 'denied');
    if (granted) {
      try { posthog.set_config({ persistence: 'localStorage+cookie' }); } catch { /* analytics disabled */ }
    }
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-[70] bg-white rounded-2xl border border-gray-200 shadow-xl p-5"
    >
      <p className="text-sm font-semibold text-gray-900 mb-1">Cookies</p>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">
        We&apos;d like to use analytics cookies to understand how Nelsy is used and improve it. No ads, no selling of data.{' '}
        <Link to="/privacy" className="underline">Privacy policy</Link>
      </p>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => choose(false)}
          className="py-2.5 rounded-xl text-sm font-semibold border border-gray-300 text-gray-800 hover:bg-gray-50 transition"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => choose(true)}
          className="py-2.5 rounded-xl text-sm font-semibold text-white transition hover:opacity-90"
          style={{ backgroundColor: '#1A1A1A' }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
