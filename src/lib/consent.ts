/**
 * Cookie consent for analytics (PostHog).
 *
 * Visitors in Europe (GDPR / UK GDPR / ePrivacy) are asked before PostHog stores anything on their device.
 * Until they accept, PostHog runs with in-memory persistence: no cookies, no localStorage, events stay anonymous.
 * Everyone else keeps the default behaviour. The visitor's choice itself is stored, which is allowed.
 */
export type ConsentStatus = 'granted' | 'denied' | 'pending';

const KEY = 'nelsy_analytics_consent';

export function needsConsent(): boolean {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone.startsWith('Europe/');
  } catch {
    return true; // can't tell: ask, the safe default
  }
}

export function getConsent(): ConsentStatus {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'granted' || v === 'denied' ? v : 'pending';
  } catch {
    return 'pending';
  }
}

export function setConsent(status: Exclude<ConsentStatus, 'pending'>): void {
  try {
    localStorage.setItem(KEY, status);
  } catch {
    /* private mode: the choice lasts for this page view only */
  }
}

/** PostHog persistence to use for this visitor right now. */
export function analyticsPersistence(): 'memory' | 'localStorage+cookie' {
  if (!needsConsent()) return 'localStorage+cookie';
  return getConsent() === 'granted' ? 'localStorage+cookie' : 'memory';
}
