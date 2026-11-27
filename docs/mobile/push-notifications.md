# Push notifications (Nelsy pro app)

Status: built, **off**. Nothing is sent until the founder finishes the steps below and sets `PUSH_ENABLED=true`.

## What the pro receives (Stan style)

| Trigger | Title | Detail line | Opens | Toggle (`notification_preferences`) |
|---|---|---|---|---|
| Paid booking (deposit or full) | 💰 You just earned $45.00 | Jade M. · Gel manicure · Fri, Dec 5 at 10:00 AM | Bookings | `push_payment` (falls back to `push_new_booking` if payments are off) |
| Pay-on-arrival booking | 📅 New booking | Jade M. · Gel manicure · Fri, Dec 5 at 10:00 AM | Bookings | `push_new_booking` |
| Refund that cancels a booking | ❌ Booking cancelled | Jade M. · Gel manicure · Fri, Dec 5 at 10:00 AM | Bookings | `push_cancellation` |
| Digital product sale | 💰 You just earned €9.00 | New sale: Aftercare guide | Studio > Products | `push_payment` |
| Free resource claimed (first time) | ✉️ New lead | Lina downloaded Nail shape cheat sheet | Audience | `push_lead` |

Times use the pro's `profiles.timezone`. A paid booking sends one push, not two. Absent toggle = on. The toggles live in the app (Settings > Notifications) and are stored in `profiles.notification_preferences`, the same JSON the website uses for `client_reminders`.

## How it is wired

- **Device token**: `src/mobile/lib/push.ts` asks permission after login (native only, build flag `VITE_PUSH_ENABLED=1`) and saves the token with the RPC `register_push_token` (migration `20261129_01_push_tokens.sql`). Log out calls `unregister_push_token`.
- **Table** `push_tokens` (profile_id, token, platform, created_at, last_seen_at). RLS: owner can read and delete her rows; writes only through the two SECURITY DEFINER RPCs (they move a token to the new account when someone else signs in on the same phone, and keep at most 10 devices per pro).
- **Sender** `supabase/functions/_shared/push.ts`: FCM HTTP v1 with an OAuth token signed from the service account (WebCrypto RS256, cached). iOS goes through FCM too (APNs key uploaded in Firebase). Dead tokens (404 / UNREGISTERED) are deleted.
- **Wording + toggles** `supabase/functions/_shared/push-messages.ts` (pure, unit tested in `src/lib/__tests__/pushMessages.test.ts`).
- **Call sites**, all placed after the existing logic and inside their own try/catch:
  - `stripe-webhooks` `payment_intent.succeeded`: after the ledger RPC and the emails, only when `creditResult === 'credited'` (retries never notify twice).
  - `stripe-webhooks` `charge.refunded`: after the refund deduction, only when this refund is the one that cancelled the booking.
  - `create-payment-intent` pay-on-arrival branch: after the insert and the emails, before the response.
  - `_shared/product-orders.ts` `markProductOrderPaid`: inside the existing once-only `notified_at` claim, after the emails.
  - `claim-free-resource`: after the claim and the email, only for a new claim.
- `notifyPro()` never throws, and returns immediately unless `PUSH_ENABLED` is `true` or `1` **and** `FCM_SERVICE_ACCOUNT` is set. It reads `profiles` and `push_tokens` only and deletes only dead tokens. Booking availability, balances, transactions and orders are never touched.
- The legacy `checkout.session.completed` booking path (create-checkout, not used by the current site) has no push.

## Founder steps

1. Firebase console: create a project, add an **iOS app** (bundle `com.getnelsy.app`) and an **Android app** (package `com.getnelsy.app`).
2. Download `GoogleService-Info.plist` into `ios/App/App/` (add it to the App target in Xcode) and `google-services.json` into `android/app/`.
3. Apple Developer > Keys: create an **APNs auth key** (.p8). Upload it in Firebase > Project settings > Cloud Messaging > Apple app configuration (Key ID + Team ID).
4. Xcode > App target > Signing & Capabilities: add **Push Notifications** (and **Background Modes > Remote notifications** is not needed for alerts).
5. iOS needs the token forwarded: in `ios/App/App/AppDelegate.swift` add the two Capacitor methods from the @capacitor/push-notifications README (`didRegisterForRemoteNotificationsWithDeviceToken` / `didFailToRegisterForRemoteNotificationsWithError` posting to `NotificationCenter`). With FCM, also add the Firebase Messaging pod and return the FCM token (see "Using FCM on iOS" in the Capacitor docs), otherwise iOS returns a raw APNs token that FCM v1 rejects.
6. Firebase > Project settings > Service accounts > Generate new private key. Store the JSON as a Supabase secret: `supabase secrets set FCM_SERVICE_ACCOUNT="$(cat key.json)"`. Never commit it.
7. Apply `supabase/migrations/20261129_01_push_tokens.sql`.
8. Deploy `stripe-webhooks`, `create-payment-intent`, `claim-free-resource`, `get-product-download`, `create-product-checkout`, `unsubscribe-contact` (they import `_shared/push.ts` directly or through `_shared/product-orders.ts`). Deploying them before step 10 is safe: with `PUSH_ENABLED` unset they behave exactly as today.
9. Build the app with `VITE_PUSH_ENABLED=1` in `.env` and test on a real device (simulators cannot receive remote pushes on older Xcode).
10. When a test booking works: `supabase secrets set PUSH_ENABLED=true`. To switch everything off again: `supabase secrets unset PUSH_ENABLED`.
