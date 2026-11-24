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
    },
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>,
)
