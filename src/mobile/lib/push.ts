import { PushNotifications } from '@capacitor/push-notifications';
import { isNative } from './native';

export type PushKind = 'new_booking' | 'payment_received' | 'cancellation';

/**
 * Registers the device for push notifications. Only runs inside the native app.
 *
 * TODO(founder): before this can deliver anything:
 *  - iOS: enable the Push Notifications capability in Xcode and create an APNs key
 *    in the Apple Developer account (Certificates, IDs & Profiles > Keys).
 *  - Android: create a Firebase project, add the Android app (com.getnelsy.app) and drop
 *    google-services.json into android/app/.
 *  - Backend: store the token per pro (e.g. a `push_tokens` table keyed by profile id)
 *    and send from the booking / payment / cancellation webhooks, honoring the
 *    per-kind toggles from Settings.
 */
export async function registerPush(onToken: (token: string) => void) {
  if (!isNative()) return;
  // Off until APNs / Firebase are set up: on Android, register() crashes without google-services.json.
  if (import.meta.env.VITE_PUSH_ENABLED !== '1') return;

  let perm = await PushNotifications.checkPermissions();
  if (perm.receive === 'prompt') perm = await PushNotifications.requestPermissions();
  if (perm.receive !== 'granted') return;

  await PushNotifications.removeAllListeners();
  await PushNotifications.addListener('registration', (t) => onToken(t.value));
  await PushNotifications.addListener('registrationError', (err) => {
    console.warn('[push] registration error', err.error);
  });
  await PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
    // Deep link: payloads should carry { route: '/bookings' } etc.
    const route = action.notification.data?.route as string | undefined;
    if (route) window.location.hash = route;
  });
  await PushNotifications.register();
}
