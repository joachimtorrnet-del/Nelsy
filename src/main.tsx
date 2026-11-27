import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import posthog from 'posthog-js'
import { analyticsPersistence } from './lib/consent'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary.tsx'

if (import.meta.env.VITE_PUBLIC_POSTHOG_KEY) {
  posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com',
    // Manual $pageview tracking in App.tsx preserves SEO attribution logic —
    // enabling 'history_change' here would double-count every route change.
    capture_pageview: false,
    person_profiles: 'identified_only',
    // Europe: nothing stored on the device until the visitor accepts the cookie banner
    persistence: analyticsPersistence(),
    // Error tracking: uncaught errors and unhandled promise rejections show up in PostHog > Error tracking
    capture_exceptions: true,
    loaded: (ph) => {
      // Expose as global for debugging; suppress dev events.
      (window as typeof window & { posthog: typeof ph }).posthog = ph;
      if (import.meta.env.DEV) ph.opt_out_capturing();
      // Keep the numbers honest: automated browsers (tests, prerender) and the team's own
      // devices never count. Visit any page with ?internal=1 once to exclude this browser
      // (?internal=0 to count it again).
      try {
        const flag = new URLSearchParams(window.location.search).get('internal');
        if (flag === '1') localStorage.setItem('nelsy_internal', '1');
        if (flag === '0') localStorage.removeItem('nelsy_internal');
        if (navigator.webdriver || localStorage.getItem('nelsy_internal') === '1') ph.opt_out_capturing();
        else if (flag === '0') ph.opt_in_capturing();
      } catch { /* storage blocked: keep default */ }
    },
  });
}

// After a deploy, a tab opened before it asks for JS files that no longer exist and would show
// a blank page. Reload once to pick up the new version (guarded so it can never loop).
window.addEventListener('vite:preloadError', (event) => {
  try {
    const last = Number(sessionStorage.getItem('nelsy_chunk_reload') ?? 0);
    if (Date.now() - last < 30_000) return;
    sessionStorage.setItem('nelsy_chunk_reload', String(Date.now()));
  } catch { return; }
  event.preventDefault();
  window.location.reload();
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>,
)
