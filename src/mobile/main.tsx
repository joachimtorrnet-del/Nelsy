import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import posthog from 'posthog-js';
import { Capacitor } from '@capacitor/core';
import ErrorBoundary from '@/components/ErrorBoundary';
import App from './App';
import './mobile.css';

// Same PostHog project as the website; events from the app carry platform = ios | android | web.
// Note for App Store privacy labels: product analytics, not linked to third-party tracking.
if (import.meta.env.VITE_PUBLIC_POSTHOG_KEY) {
  posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com',
    capture_pageview: false,
    person_profiles: 'identified_only',
    persistence: 'localStorage',
    loaded: (ph) => {
      ph.register({ app: 'nelsy_pro_app', platform: Capacitor.getPlatform() });
      if (import.meta.env.DEV) ph.opt_out_capturing();
    },
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
