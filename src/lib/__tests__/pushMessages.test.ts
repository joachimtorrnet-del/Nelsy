/**
 * Pro push notifications: message wording and per-type toggles
 * (supabase/functions/_shared/push-messages.ts, used by _shared/push.ts).
 */
import { describe, it, expect } from 'vitest';
import {
  cancellationMessage,
  fcmMessage,
  leadMessage,
  newBookingMessage,
  paidBookingMessage,
  productSaleMessage,
  pushAllowed,
  pushFeatureEnabled,
} from '../../../supabase/functions/_shared/push-messages.ts';

const booking = {
  clientName: 'Jade M.',
  serviceName: 'Gel manicure',
  bookingDatetime: '2026-12-05T09:00:00Z',
  timezone: 'Europe/Paris',
};

describe('push messages', () => {
  it('uses the Stan style: emoji + title, one-line detail in the pro timezone', () => {
    const m = paidBookingMessage({}, { ...booking, amount: 45, currency: 'usd' });
    expect(m?.title).toBe('💰 You just earned $45.00');
    expect(m?.body).toBe('Jade M. · Gel manicure · Sat, Dec 5 at 10:00 AM');
    expect(m?.route).toBe('/bookings');
    expect(newBookingMessage(booking).title).toBe('📅 New booking');
    expect(cancellationMessage(booking).title).toBe('❌ Booking cancelled');
    expect(leadMessage({ firstName: 'Lina', resourceTitle: 'Nail shapes' })).toMatchObject({ title: '✉️ New lead', body: 'Lina downloaded Nail shapes', route: '/audience' });
    expect(productSaleMessage({ title: 'Aftercare guide', amount: 9, currency: 'eur' }).title).toBe('💰 You just earned €9.00');
  });

  it('formats zero-decimal currencies without cents', () => {
    expect(productSaleMessage({ title: 'x', amount: 1500, currency: 'jpy' }).title).toBe('💰 You just earned ¥1,500');
  });

  it('respects the per-type toggles, absent = on', () => {
    expect(pushAllowed(null, 'lead')).toBe(true);
    expect(pushAllowed({ push_lead: false }, 'lead')).toBe(false);
    expect(pushAllowed({ push_lead: false }, 'payment')).toBe(true);
  });

  it('sends one push for a paid booking, falling back to new booking when payments are off', () => {
    const input = { ...booking, amount: 45, currency: 'eur' };
    expect(paidBookingMessage({ push_payment: false }, input)?.kind).toBe('new_booking');
    expect(paidBookingMessage({ push_payment: false, push_new_booking: false }, input)).toBeNull();
  });

  it('is off unless PUSH_ENABLED is exactly true or 1', () => {
    expect(pushFeatureEnabled(undefined)).toBe(false);
    expect(pushFeatureEnabled('false')).toBe(false);
    expect(pushFeatureEnabled('yes')).toBe(false);
    expect(pushFeatureEnabled('true')).toBe(true);
    expect(pushFeatureEnabled('1')).toBe(true);
  });

  it('builds an FCM v1 body with the in-app route', () => {
    const body = fcmMessage('tok', newBookingMessage(booking));
    expect(body.message.token).toBe('tok');
    expect(body.message.data.route).toBe('/bookings');
    expect(body.message.notification.title).toBe('📅 New booking');
  });
});
