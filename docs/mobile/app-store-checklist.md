# Nelsy pro app: App Store + Google Play checklist (v1.0.0)

App: **Nelsy** · bundle / package `com.getnelsy.app` · version **1.0.0**, build **1** (iOS `MARKETING_VERSION` / `CURRENT_PROJECT_VERSION`, Android `versionName` / `versionCode`, in-app `APP_VERSION` / `APP_BUILD` in `src/mobile/lib/constants.ts`: bump all three together). iPhone only (`TARGETED_DEVICE_FAMILY = 1`, so no iPad screenshots are needed), portrait only, iOS 15+.

Related: [push-notifications.md](push-notifications.md) · [account-deletion.md](account-deletion.md)

## 1. In-app purchase rule (read first)

Current Apple wording (App Review Guidelines, checked 2026-11-27):

- **3.1.1**: unlocking features or functionality in the app (subscriptions included) must use in-app purchase.
- **3.1.3 intro**: apps using other purchase methods "cannot, within the app, encourage users to use a purchasing method other than in-app purchase, except for apps on the United States storefront and as set forth in 3.1.1(a) and 3.1.3(a)".
- **3.1.3(f) Free Stand-alone Apps**: a free companion to a paid web-based tool does not need IAP "provided there is no purchasing inside the app, or calls to action for purchase outside of the app".
- **3.1.3(a) Reader apps** are the only apps that can request the **External Link Account Entitlement** (magazines, books, audio, music, video). Nelsy is not a reader app, so that entitlement is not available to it. The other entitlement (3.1.1(a), StoreKit External Purchase Link) applies in specific storefronts with Apple commission and its own UI rules.
- **3.1.3(e)**: services consumed outside the app (the bookings clients pay for) must NOT use IAP. Stripe for bookings and product sales on the public page is correct.

**Decision built into the app** (`src/mobile/lib/storePolicy.ts`): the iOS build and the Android build show **plan status only** (plan name, trial or renewal date). No price, no "Upgrade", no "Manage plan on getnelsy.com", no plan link anywhere, and no "Start free trial" outside the signup flow (see the exception below), and the Creator-gated sections (Products, Shop my kit, Audience: "Not included in your current plan"). Website links that are not about buying (payouts, editing services, design, analytics, legal) stay.

Why not a neutral "Manage your plan on getnelsy.com" button: under 3.1.3(f) any call to action toward an outside purchase is a rejection reason, and reviewers read a link to a page that sells the plan as one. The US storefront exception exists, but one binary serves every storefront, so the conservative choice is to hide it everywhere. Reach users about plans by email instead (allowed: "Developers can send communications outside of the app to their user base about purchasing methods").

### Exception: the free trial screen at the end of signup ("How your trial works")

The last signup screen (`TrialScreen` in `src/mobile/screens/Onboarding.tsx`) has one billing-related action: **"Start my free trial"**, which calls the `start-trial` edge function. That function starts the 14-day trial **without a card** and without any payment; it never charges and the app never opens a payment page (if the trial was already used, the server answers `checkoutRequired` and the app just goes to Home, it does not open the Checkout URL). There is no "pay" or "subscribe" button and no purchase link.

What each build shows:

| | Web / `?demo=1` preview (`planLinksAllowed()` true) | iOS and Android store builds (`planLinksAllowed()` false) |
|---|---|---|
| Subline | "First 14 days free, then $29/month" | "First 14 days free" (no price) |
| Day 14 line | "Add a card on getnelsy.com to keep your page live. No card needed today." (getnelsy.com is a link) | "Keep your page live by adding a card from your dashboard on the web." (no link) |
| Button | Start my free trial (no card) | Start my free trial (no card) |
| Footer | Terms, Privacy Policy, Logout | Terms, Privacy Policy, Logout (no "Restore": Nelsy has no in-app purchase) |

Check it in a browser with `#/signup?demo=1&step=8&store=1`.

**Risk note (3.1.1 / 3.1.3(f))**: a reviewer can read "Start my free trial" as unlocking a subscription feature outside IAP (3.1.1), and the day-14 line as pointing users to pay on the web (3.1.3(f): "no calls to action for purchase outside of the app"). Mitigations built in: the trial is free and needs no card, no price is shown in store builds, no link to a page that sells the plan, wording describes what happens rather than asking to buy. Fallback if review objects: set the store build to skip this screen (go straight to Home after Step 5/5; the trial can be started on the web), or change the day-14 line to "We'll email you before your trial ends." Mention the free, card-less trial in the review notes (section 4).

Android: Google Play's payments policy also restricts steering to outside payment for digital subscriptions, so the same rule applies. `VITE_PLAN_LINKS=android` re-enables the links in Android builds only if the founder decides it later.

## 2. App Store Connect fields

| Field | Value |
|---|---|
| Name | Nelsy |
| Subtitle (30) | Bookings for beauty pros |
| Primary category | Business |
| Secondary category | Productivity |
| Price | Free |
| In-app purchases | None |
| Age rating | 4+ (no objectionable content; answer "No" to all) |
| Copyright | 2026 Nelsy |
| Support URL | https://getnelsy.com/contact |
| Marketing URL | https://getnelsy.com |
| Privacy policy URL | https://getnelsy.com/privacy |
| Sign in required | Yes (demo account below) |
| Export compliance | Uses only standard HTTPS: `ITSAppUsesNonExemptEncryption = NO` is set in Info.plist |
| Content rights | Does not contain third-party content requiring rights |

Promotional text (170): "See your bookings, revenue and page at a glance. Get notified when a client books or pays."

Description (draft, no claims we cannot prove):

> Nelsy is the companion app for beauty pros who use Nelsy for their booking page.
> - See today's and upcoming bookings, with client contact and video call links
> - Track revenue, balance and page views for the last 28 days
> - Preview your booking page and copy your link for your bio
> - Show or hide services, see your products, kit and contacts
> - Get notified about new bookings, payments, cancellations and leads
> A Nelsy account is required.

Keywords (100): `booking,appointments,nail tech,lash,beauty,salon,clients,deposits,link in bio,schedule`

## 3. Privacy nutrition labels (App Store)

Tracking: **No** (no data used for tracking, no ad SDK, PostHog is first-party product analytics).

| Data type | Collected | Linked to user | Used for tracking | Purposes |
|---|---|---|---|---|
| Contact Info > Name | Yes | Yes | No | App Functionality |
| Contact Info > Email Address | Yes | Yes | No | App Functionality, Developer's Communications |
| Contact Info > Phone Number | Yes (signup) | Yes | No | App Functionality (account security) |
| Identifiers > User ID | Yes (Supabase user id, PostHog identify) | Yes | No | App Functionality, Analytics |
| Usage Data > Product Interaction | Yes (PostHog events: screens, onboarding steps) | Yes | No | Analytics |
| User Content > Other User Content | Yes (social handles, specialty entered at signup) | Yes | No | App Functionality |
| Purchases | **No** (nothing is bought in the app) | | | |
| Financial Info | No (payouts and bank details are handled by Stripe on the website) | | | |
| Location, Health, Contacts (address book), Browsing, Search, Diagnostics | No | | | |

Notes: the app displays the pro's clients (names, emails, phones) that clients entered on the website; the app does not collect them. The push token is stored to deliver notifications (App Functionality). If crash reporting is added later, add Diagnostics.

## 4. Review notes (paste into App Review Information)

> Nelsy is a free companion app for beauty professionals who run their booking page on getnelsy.com. Clients book and pay the professional on the website (services consumed in person, guideline 3.1.3(e)); the app lets the professional follow bookings, revenue and their page.
> The app does not sell anything and contains no purchase links (3.1.3(f)).
> Demo account: email `appreview@getnelsy.com`, password: (in the password field).
> The account has example services, bookings, products and contacts so every screen has content.
> Account deletion: Settings > Delete account (type DELETE).
> Push notifications are optional and only announce bookings, payments, cancellations and leads.

Founder: create that account on production before submitting (sign up on the website, add 3 services, set the plan to Creator with an active status in the profiles table, create a few test bookings and a free resource claim with your own emails). Keep it active during review.

## 5. Screenshots plan

Generated from example data: `npm run dev:mobile`, then `npm run mobile:screenshots -- store-screenshots` (writes both sizes, store behaviour, demo label hidden).

| Set | Size | Screens |
|---|---|---|
| 6.7" iPhone (required set, also used for 6.9") | 1290 x 2796 | 1 Home, 2 Bookings, 3 Studio services, 4 Products, 5 Preview, 6 Settings |
| 6.5" iPhone | 1242 x 2688 | same 6 |

Optional captions (one line each, top of frame): "Your day at a glance" · "Every booking in your time zone" · "Your studio in your pocket" · "Products and free resources" · "See your page like clients do" · "Notifications your way". No invented numbers, ratings or testimonials in captions.

## 6. Icons, splash, status bar, safe areas, deep links

- Icons: `npm run mobile:assets` (script `scripts/mobile/generate-app-assets.mjs`): pink #F52B8C tile with a white "N" (same mark as the site favicon). iOS 1024 x 1024 opaque single-size icon; Android legacy, round and adaptive icons (pink background color).
- Splash: pink full screen with the white "N" (iOS `Splash.imageset`, Android `drawable*/splash.png`), hidden by `SplashScreen.hide()` once the web app starts.
- Status bar: dark text on white (`Style.Light`, `UIStatusBarStyleDarkContent`); Android draws under the status bar and screens pad with `env(safe-area-inset-*)` (`pt-safe`, `pb-safe`). The pink tab bar sits above the home indicator.
- Deep links: Android intent filter for `https://getnelsy.com/dashboard*` (in AndroidManifest). The app maps `/dashboard` to Home, `/dashboard/calendar` to Bookings, `/dashboard/settings` to Settings, `/dashboard/products` and `/dashboard/kit` to Studio tabs, `/dashboard/audience` to Audience. Public studio pages stay in the browser. Founder steps:
  - iOS: Xcode > Signing & Capabilities > Associated Domains: `applinks:getnelsy.com`; publish `https://getnelsy.com/.well-known/apple-app-site-association`:
    ```json
    { "applinks": { "details": [ { "appIDs": ["TEAMID.com.getnelsy.app"], "components": [ { "/": "/dashboard*" } ] } ] } }
    ```
  - Android: publish `https://getnelsy.com/.well-known/assetlinks.json` with the SHA-256 of the Play app signing key:
    ```json
    [{ "relation": ["delegate_permission/common.handle_all_urls"], "target": { "namespace": "android_app", "package_name": "com.getnelsy.app", "sha256_cert_fingerprints": ["AA:BB:..."] } }]
    ```
  - Both files must be served as `application/json` without redirects (add a Vercel header/rewrite exclusion for `/.well-known/`).

## 7. Google Play data safety form

| Question | Answer |
|---|---|
| Collects or shares user data | Collects: yes. Shares: no (Supabase, Stripe, PostHog, Firebase are service providers) |
| Encrypted in transit | Yes |
| Users can request deletion | Yes: in the app (Settings > Delete account) and by web link (see account-deletion.md) |
| Personal info: Name, Email, Phone | Collected, required, App functionality / Account management |
| Personal info: Other info (social handles, specialty) | Collected, optional, App functionality |
| App activity: App interactions | Collected, Analytics (PostHog) |
| Device or other IDs | Collected (push token), App functionality |
| Financial info, Location, Contacts, Photos, Messages, Health | Not collected by the app |

Also on Play: target audience 18+, ads: none, app access: provide the same demo account, content rating questionnaire (Business, no sensitive content), `POST_NOTIFICATIONS` is requested by the push plugin on Android 13+.

## 8. Pre-submission checks

- [ ] `npm run build:mobile` then `npx cap sync` (copies `dist-app` into both native projects and updates native plugins).
- [ ] iOS: `cd ios/App && pod install` happens during `cap sync` when CocoaPods is installed (Capacitor 8 may use Swift Package Manager instead; follow what `cap sync` prints).
- [ ] Xcode: set the Team, check Display Name "Nelsy", version 1.0.0 (1), add capabilities (Push Notifications, Associated Domains), Product > Archive > Distribute > TestFlight.
- [ ] Android Studio: create the upload keystore, Build > Generate Signed Bundle (AAB), upload to an internal testing track.
- [ ] On device: login, every tab, a booking detail sheet, a website hand-off (opens Safari / Chrome), Delete account (with a throwaway account), log out.
- [ ] Confirm no screen shows a price, trial offer or plan link in the store builds (only plan status in Settings).
- [ ] Apple privacy manifest: Capacitor 8 plugins ship their own `PrivacyInfo.xcprivacy`; Xcode's "Generate Privacy Report" on the archive should list no missing required-reason APIs.
