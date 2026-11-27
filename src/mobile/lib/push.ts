import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { supabase } from '@/lib/supabase';
import { isNative, prefs } from './native';

/**
 * Push types. Each one maps to a key in profiles.notification_preferences that the server
 * (supabase/functions/_shared/push.ts) reads before sending. Absent key = on.
 */
export type PushKind = 'new_booking' | 'payment' | 'cancellation' | 'lead';

export const PUSH_PREF_KEY: Record<PushKind, 'push_new_booking' | 'push_payment' | 'push_cancellation' | 'push_lead'> = {
  new_booking: 'push_new_booking',
  payment: 'push_payment',
  cancellation: 'push_cancellation',
  lead: 'push_lead',
};

const TOKEN_KEY = 'push-token';

/**
 * Registers the device for push notifications and saves the token for this pro.
 * Only runs inside the native app, and only when the build was made with VITE_PUSH_ENABLED=1
 * (on Android, register() crashes without google-services.json).
 *
 * Token storage: RPC register_push_token (supabase/migrations/20261129_01_push_tokens.sql).
 * It moves the token to the signed-in pro if another account used this device before.
 */
export async function registerPush() {
  if (!isNative()) return;
  if (import.meta.env.VITE_PUSH_ENABLED !== '1') return;

  try {
    let perm = await PushNotifications.checkPermissions();
    if (perm.receive === 'prompt') perm = await PushNotifications.requestPermissions();
    if (perm.receive !== 'granted') return;

    await PushNotifications.removeAllListeners();
    await PushNotifications.addListener('registration', (t) => void saveToken(t.value));
    await PushNotifications.addListener('registrationError', (err) => {
      console.warn('[push] registration error', err.error);
    });
    await PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
      // Payloads carry { route: '/bookings' } (see _shared/push-messages.ts).
      const route = action.notification.data?.route as string | undefined;
      if (route && route.startsWith('/')) window.location.hash = route;
    });
    await PushNotifications.register();
  } catch (e) {
    console.warn('[push] setup failed', e);
  }
}

async function saveToken(token: string) {
  if (!supabase || !token) return;
  const platform = Capacitor.getPlatform() === 'android' ? 'android' : 'ios';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any).rpc('register_push_token', { p_token: token, p_platform: platform });
  if (error) console.warn('[push] could not save token', error.message);
  else await prefs.set(TOKEN_KEY, token);
}

/** On log out: this device must stop receiving the pro's notifications. Never throws. */
export async function unregisterPush() {
  if (!isNative() || !supabase) return;
  try {
    const token = await prefs.get<string | null>(TOKEN_KEY, null);
    if (token) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any).rpc('unregister_push_token', { p_token: token });
      await prefs.set(TOKEN_KEY, null);
    }
    if (import.meta.env.VITE_PUSH_ENABLED === '1') await PushNotifications.removeAllListeners();
  } catch {
    /* best effort */
  }
}
