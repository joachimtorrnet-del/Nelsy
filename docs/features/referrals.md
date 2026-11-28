# Referral program ("Affiliates")

A pro shares her link. Each time a pro she referred pays for a Nelsy plan, she earns 30% of that
payment, for as long as the referred pro stays subscribed. Model: Stan's referral program and
TrendTrack's affiliate page.

Status: code is ready, **nothing is applied or deployed**. See "Go-live steps".

## Terms (founder-approved)

All numbers live in **one file**: `supabase/functions/_shared/referrals.ts` (`REFERRAL_TERMS`).
The public page, the dashboard, the webhook and the payout function all read it.

| term | value | constant |
|---|---|---|
| commission | 30% of every subscription payment actually collected, taxes excluded, recurring | `commissionRateBps: 3000` |
| free trials | no commission ($0 invoices are skipped) | `commissionableCents()` |
| refund / chargeback | commission reversed | `applyRefund()`, `referral_reverse_commission()` |
| hold | 30 days before a commission is approved | `holdDays: 30` |
| minimum payout | $50 of approved balance | `minPayoutCents: 5000` |
| payouts | monthly, each one approved and sent by hand by the founder | |
| click memory | 60 days, last click wins | `cookieDays: 60` |
| signup window | a new account can be attached to a referrer for 7 days after creation | `claimWindowDays: 7` |
| who can join | anyone with a Nelsy account, no paid plan needed | |
| not allowed | self-referral, paid ads on the Nelsy brand | |

Two values are mirrored in SQL and must be changed in both places:
`referral_min_payout_cents()` (5000) and `referral_claim_window()` (7 days).

Rules 7 (tax responsibility), 9 (spam, fake reviews) and 11 (changes to the program) on
`/affiliates#terms` are standard clauses added while writing the page. They were not in the
approved list: read them before launch.

## Attribution rules

1. **Link**: `https://getnelsy.com/?ref=<code>`. The code is the pro's slug by default
   (`referral_codes.code`, unique). A slug with no code row works too. If the slug is already held
   as a code by another pro (she had that slug before), the new code is `<slug>-<4 hex>`.
2. **Studio badge**: "Made with Nelsy" links (`src/components/studio/PlgCTA.tsx`) already send
   `ref=<profileId>`. Both forms are accepted everywhere (`parseRef`, `referral_resolve`).
3. **App**: the handle typed at "Did someone refer you?" (stored in
   `profiles.onboarding_answers.referred_by`) is resolved against codes and slugs. No match: ignored.
4. **Capture** (`captureReferral()` in `src/lib/referrals.ts`, run once per page load in `App.tsx`):
   `ref` is kept for 60 days in localStorage and a first-party cookie, both named `nelsy_ref`
   (`SameSite=Lax`, value `{ ref, at }`). A new valid `ref` replaces the old one (last click wins).
   Visitors who are asked for cookie consent (Europe) and have not accepted only get a
   sessionStorage copy: the referral counts if they sign up during the same visit.
5. **Claim** (`claim_referral(p_ref, p_source)`, SECURITY DEFINER, signed-in only): called right
   after account creation on the web (`src/pages/Onboarding.tsx`), again when the trial starts, and
   after the referral question in the app. It refuses: unknown ref, self, account already referred,
   account older than 7 days, two accounts referring each other.
6. `profiles.referred_by` is set once. Clients cannot write it (trigger ignores their changes), the
   service role cannot point it at another referrer (trigger raises), and it can never equal `id`
   (CHECK). It goes back to NULL only if the referrer's profile is deleted.

## Data model

Migration: `supabase/migrations/20261201_01_referrals.sql` (idempotent; run twice in a local
PGlite Postgres with 73 checks including RLS, see "Test plan").

| object | content |
|---|---|
| `profiles.referred_by` | referrer's profile id |
| `referral_codes` | `referrer_id` (PK), `code` (unique, lowercase), `clicks`, `created_at` |
| `referrals` | `referrer_id`, `referred_id` (unique), `code`, `source` (link, badge, app_handle, manual), `status` (signed_up, trialing, paying, churned), `flagged_reason`, `first_paid_at` |
| `referral_commissions` | one row per paid invoice: `stripe_invoice_id` (unique), `stripe_charge_id`, `amount_cents`, `currency`, `commission_rate_bps`, `commission_cents`, `status` (pending, approved, paid, reversed), `available_at` (end of hold), `payout_id`, `clawback_payout_id`, `reversed_at`, `reversal_reason` |
| `referral_payouts` | `referrer_id`, `total_cents`, `currency`, `status` (requested, approved, paid), `method`, `stripe_transfer_id`, `approved_by`, `notes`, `requested_at`, `approved_at`, `paid_at`. One open request per referrer (partial unique index) |

Financial rows survive account deletion: `referrer_id` / `referred_id` go to NULL on
`referral_commissions` and `referral_payouts`.

### RLS

| object | anon | authenticated pro | service_role |
|---|---|---|---|
| `referral_codes` | none | SELECT own row | all |
| `referrals` | none | SELECT rows where she is the referrer (not `flagged_reason`, not `code`) | all |
| `referral_commissions` | none | SELECT own (no Stripe ids, no `reversal_reason`) | all |
| `referral_payouts` | none | SELECT own (no `notes`, `approved_by`, `stripe_transfer_id`) | all |

No INSERT, UPDATE or DELETE grant or policy for clients on any of the four tables. The referred pro
cannot see the referral row about her. The referrer never reads the referred pro's profile: the
list comes from `my_referrals()`, which returns first name and slug only.

### Functions

| function | who | what |
|---|---|---|
| `my_referral_code()` | authenticated | her code, created on first call (opening the Referrals tab) |
| `my_referrals()` | authenticated | id, status, dates, first name, slug of her referrals |
| `claim_referral(ref, source)` | authenticated | attach the caller to a referrer (see above) |
| `referral_click(ref)` | anon, authenticated | +1 on `referral_codes.clicks`. No visitor data. Rough counter, not rate limited, never used for money |
| `referral_resolve`, `referral_ensure_code` | service_role | internal |
| `referral_approve_due(referrer?)` | service_role | pending to approved once `available_at` has passed |
| `referral_reverse_commission(id, reason)` | service_role | full reversal, idempotent |
| `referral_request_payout(referrer)` | service_role | creates the payout request; raises `below_minimum` or `payout_already_open` |
| `referral_mark_payout_paid(payout, method, approved_by, transfer_id?)` | service_role | records a payout the founder sent by hand |

## Money flow

1. `invoice.payment_succeeded` with `amount_paid > 0` on a subscription invoice of a referred pro:
   one `referral_commissions` row, `pending`, `available_at = paid_at + 30 days`,
   `commission_cents = floor((amount_paid - tax) x 30%)`. Idempotent on the invoice id (lookup,
   then unique constraint).
2. After 30 days the dashboard shows it as approved (`effectiveStatus`). The row itself flips when
   she requests a payout or when the founder runs `referral_approve_due()`.
3. "Request payout" (enabled from $50 of approved balance, one open request at a time) calls the
   `request-referral-payout` function: it creates the `referral_payouts` row, attaches the approved
   commissions and emails hello@getnelsy.com. **No money moves.**
4. The founder pays by hand and runs `referral_mark_payout_paid` (below). Commissions become `paid`.

Reversals (`charge.refunded`, `charge.dispute.created`):
- full refund or dispute: `reversed`. If the commission was in a payout not sent yet, it is taken
  out and the payout total is lowered (the request is dropped if nothing is left). If it was already
  paid, it stays linked to that payout and the amount is deducted from her next payout
  (`clawback_payout_id`).
- partial refund before any payout: commission recomputed on what the pro still paid.
- partial refund after payout: nothing automatic, a warning is logged (`[referrals] ... review`).
- a dispute won later is not restored automatically: set the row back by hand if needed.

Referral status: `signed_up` at claim, `trialing` on `customer.subscription.*` with status
trialing, `paying` on the first paid invoice, `churned` on `customer.subscription.deleted`.

## Anti-abuse

- Self-referral is refused at claim (same user, or two accounts referring each other) and checked
  again at each payment (`selfReferralReason`): same Stripe customer, same email (case, Gmail dots
  and `+tags` ignored; account email and invoice email), same card fingerprint (the invoice's
  charge against the referrer's saved cards: two Stripe reads). A blocked payment is recorded as
  `reversed` with `reversal_reason = self_referral:<why>` and the referral gets `flagged_reason`.
- Commissions only on collected revenue: trial invoices, unpaid invoices and taxes earn nothing.
- 30-day hold before approval.
- Existing pros cannot attach themselves to a friend afterwards (7-day window, set-once column).
- Manual approval of every payout is the last check: look at `flagged_reason` and at referrals
  that all come from one place before paying.

## Code map

| part | file |
|---|---|
| terms + pure rules | `supabase/functions/_shared/referrals.ts` |
| webhook hook | `supabase/functions/_shared/referral-webhook.ts`, called at the end of `stripe-webhooks/index.ts` inside its own try/catch, after the existing switch (nothing else changed there) |
| payout request | `supabase/functions/request-referral-payout/index.ts` (JWT verification on) |
| client lib | `src/lib/referrals.ts` (capture, claim, dashboard API), `src/lib/referralsDemo.ts` |
| public page | `src/pages/Affiliates.tsx`, route `/affiliates`, prerendered, in sitemap, nav and footer; terms at `/affiliates#terms` |
| dashboard | `src/pages/dashboard/Referrals.tsx` (the former Soon tab; Orders, Marketing and Community stay Soon) |
| signup | `src/pages/Onboarding.tsx` (claim + `?next=affiliates` lands on the Referrals tab), `src/mobile/screens/Onboarding.tsx` |
| dev sandbox | `/dev/referrals`, `/dev/referrals?empty=1` |
| tests | `src/lib/__tests__/referrals.test.ts` |

`affiliates` was added to the reserved slugs (`src/lib/reservedSlugs.ts`, `scripts/generate-routes.mjs`).

## Go-live steps

1. Check no studio already uses the slug: `select id from profiles where slug = 'affiliates';`
2. Apply the migration (not `db push`):
   ```
   npx supabase db query --remote -f supabase/migrations/20261201_01_referrals.sql
   ```
3. Deploy the functions, keeping each one's JWT setting:
   ```
   npx supabase functions deploy request-referral-payout --project-ref qbrqsvdustqeoplebzwi
   npx supabase functions deploy stripe-webhooks --no-verify-jwt --project-ref qbrqsvdustqeoplebzwi
   ```
   `request-referral-payout` is new and keeps JWT verification ON (default, no flag).
   `stripe-webhooks` must stay WITHOUT JWT verification: after deploying, check Dashboard > Edge
   Functions > stripe-webhooks, "Enforce JWT" is off. No new secret (uses `RESEND_API_KEY`,
   `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY` already set).
4. Stripe Dashboard > Developers > Webhooks > platform endpoint: add the event
   `charge.dispute.created`, and check that `invoice.payment_succeeded`, `customer.subscription.*` and
   `charge.refunded` are in the list. Without the dispute event, chargebacks are not reversed automatically.
5. Deploy the front end (Vercel). Before step 2 the page and tab load but the tab shows "could not
   be loaded" and claims are silently skipped, so do 2 and 3 first.
6. Add a line about the `nelsy_ref` cookie to the Privacy page if you want it listed there.

## Monthly payout procedure

Run in the Supabase SQL editor (service role). Suggested day: the 5th of each month.

1. Approve what left the hold, then list the open requests:
   ```sql
   select referral_approve_due();

   select p.id as payout_id, p.total_cents / 100.0 as usd, p.requested_at, p.notes,
          pr.full_name, pr.slug, pr.email, pr.stripe_account_id, pr.stripe_onboarding_complete
   from referral_payouts p join profiles pr on pr.id = p.referrer_id
   where p.status in ('requested', 'approved')
   order by p.requested_at;
   ```
2. Review each one: what it is made of and whether anything is flagged.
   ```sql
   select c.created_at, c.amount_cents, c.commission_cents, c.status, c.stripe_invoice_id,
          rp.slug as referred_slug, r.flagged_reason
   from referral_commissions c
   left join referrals r on r.id = c.referral_id
   left join profiles rp on rp.id = c.referred_id
   where c.payout_id = '<payout_id>' or c.clawback_payout_id = '<payout_id>'
   order by c.created_at;
   ```
   Rows with `clawback_payout_id` set are deductions already included in `total_cents`.
   To refuse a commission: `select referral_reverse_commission('<commission_id>', 'manual: <why>');`
   (the payout total is lowered automatically).
3. Re-read `total_cents` (it can go down after a late refund), then pay that exact amount by hand:
   Stripe Dashboard > Connect > her account > Send funds (a transfer to her Connect account), or a
   bank transfer if she has no Connect account.
4. Mark it paid:
   ```sql
   select referral_mark_payout_paid(
     '<payout_id>',
     'stripe_transfer',        -- or 'bank', 'other'
     'joachim',                -- approved_by
     'tr_...'                  -- Stripe transfer id, or null for a bank transfer
   );
   ```
   The payout becomes `paid` and its commissions `paid`. Calling it twice raises "payout already paid".
5. Tell the pro (email): amount and method.

Useful extras:
```sql
-- Balance of every referrer (approved, not requested yet)
select referrer_id, sum(commission_cents) / 100.0 as usd
from referral_commissions where status = 'approved' and payout_id is null group by 1 order by 2 desc;

-- Create a request on behalf of a pro (same checks as the button)
select referral_request_payout('<referrer_id>');

-- Attach a pro to a referrer by hand (support case; only when referred_by is null)
update profiles set referred_by = '<referrer_id>' where id = '<referred_id>' and referred_by is null;
insert into referrals (referrer_id, referred_id, source) values ('<referrer_id>', '<referred_id>', 'manual')
on conflict (referred_id) do nothing;
```

## Test plan

Automated (done):
- `npx vitest run`: `src/lib/__tests__/referrals.test.ts` covers commission math, the trial
  invoice, tax, the 30-day hold, full and partial refunds, reversal after payout, balance and the
  $50 threshold, referral status, the self-referral guard, ref parsing and last click wins.
- Migration on PGlite (run twice): codes, resolve, claim rules, the `referred_by` guard, RLS for
  the referrer, the referred pro, another pro and anon, client write attempts, payout request,
  reversal inside and after a payout, deduction on the next payout, account deletion.
- `tsc -b`, `npm run build` with the SEO audit.

Manual, on a Stripe test-mode project after go-live steps 2 to 4:
1. Pro A opens Dashboard > Referrals: a `referral_codes` row appears, link is `/?ref=<slug>`.
2. In a private window open A's link, then sign up as pro B: `profiles.referred_by` = A, one
   `referrals` row `signed_up`, then `trialing` once the trial starts. A sees B (first name + slug).
3. Open A's own link while signed in as A and call the claim: refused (`self`).
4. Click A's studio badge, sign up as pro C: attached to A with `source = badge`.
5. B adds a test card and the trial ends (Stripe test clock): `invoice.payment_succeeded` creates
   a `pending` commission of 580 for a $29 invoice. Resend the event from Stripe: still one row.
6. The $0 trial invoice created no commission.
7. Refund B's charge in Stripe: commission `reversed`.
8. Sign up D from A's link and pay with the same card as A: commission recorded as `reversed`,
   `reversal_reason = self_referral:same_card`, referral flagged.
9. Set `available_at` in the past on enough test commissions, press "Request payout": payout row
   `requested`, email received at hello@getnelsy.com, button replaced by the "being reviewed" note.
10. Run the monthly procedure: payout `paid`, commissions `paid`, dashboard shows Paid.
11. Cancel B's subscription: referral `churned`.
