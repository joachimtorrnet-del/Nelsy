# Account deletion (App Store Guideline 5.1.1(v), Google Play account deletion policy)

## In the app

Settings > Delete account: the pro types DELETE (optional reason) and taps "Delete my account". The app calls the edge function `request-account-deletion`, then shows "Request received" (deleted within 30 days, confirmation by email) and offers Log out. If the call fails, the error message offers an email link to hello@getnelsy.com.

## What the function does

`supabase/functions/request-account-deletion/index.ts` (JWT required):

1. Inserts a row in `account_deletion_requests` (one pending request per pro; a second tap returns the existing one).
2. Emails hello@getnelsy.com with studio, email, page, plan, Stripe subscription id, profile id, request id, reason.
3. Emails the pro a confirmation.

It deletes nothing by itself.

## Founder steps (before App Review)

1. Apply `supabase/migrations/20261129_02_account_deletion_requests.sql`.
2. Deploy: `supabase functions deploy request-account-deletion` (keep JWT verification on).
3. Test once from the app with a test account; check both emails arrive.
4. Google Play also asks for a **web link** where users can request deletion without the app. Use a short page or `mailto:hello@getnelsy.com?subject=Delete%20my%20Nelsy%20account` and put it in the Data safety form.

## Deletion checklist (each request, within 30 days)

1. Stripe: cancel the subscription (Dashboard > Customers > the pro > cancel immediately). Payouts owed to the pro stay with her connected account; do not delete the connected account while a balance or dispute is open.
2. Keep what the law requires (invoices and payment records for accounting) and delete the rest: services, availability, collections, products and files (storage `product-files`, `product-covers`, `kit-images`), kit items, contacts, page views, push tokens.
3. Bookings: clients' bookings with this pro are deleted with the profile (or anonymised if kept for accounting).
4. Delete the auth user (Authentication > Users). `profiles` and the tables with `ON DELETE CASCADE` follow.
5. Set the request row: `status = 'completed', completed_at = now()`, then reply to the pro's confirmation email.
