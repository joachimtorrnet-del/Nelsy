import posthog from 'posthog-js';

// PostHog is initialized in main.tsx. This module is a typed wrapper.
// All calls are no-ops when PostHog key is not configured.

function isConfigured(): boolean {
  return !!import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
}

export function track(event: string, props?: Record<string, unknown>) {
  if (!isConfigured()) return;
  posthog.capture(event, props);
}

// ── Public studio funnel ──────────────────────────────────────────────────────

export function trackStudioView(profileId: string) {
  track('public_nelsy_view', { profile_id: profileId });
}

export function trackServiceView(profileId: string, serviceId: string) {
  track('service_view', { profile_id: profileId, service_id: serviceId });
}

export function trackBookingStarted(profileId: string, serviceId: string) {
  track('booking_started', { profile_id: profileId, service_id: serviceId });
}

export function trackSlotSelected(profileId: string) {
  track('slot_selected', { profile_id: profileId });
}

export function trackBookingDetailsCompleted(profileId: string) {
  track('booking_details_completed', { profile_id: profileId });
}

export function trackPaymentStarted(profileId: string) {
  track('payment_started', { profile_id: profileId });
}

export function trackBookingCompleted(profileId: string) {
  track('booking_completed', { profile_id: profileId });
}

// ── PLG ───────────────────────────────────────────────────────────────────────

export function trackPlgCtaView(profileId: string) {
  track('nelsy_plg_cta_view', { profile_id: profileId });
}

export function trackPlgCtaClick(profileId: string) {
  track('nelsy_plg_cta_click', { profile_id: profileId });
}
