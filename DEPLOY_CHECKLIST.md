# Deploy Checklist — Stripe Connect Direct Charges (Custom accounts)

## Summary of changes

- **Account type**: new accounts created as `type: 'custom'` (was `express`)
- **Payment circuit**: direct charges via `Stripe-Account` header (was destination charges)
- **Fee model**: Stripe processing fees deducted from connected account by Stripe directly — no `application_fee_amount`, no `transfer_data`, no Nelsy margin
- **Backward compatibility**: existing Express account and historical payments are preserved; the webhook handles both circuits
- **`stripe-fees.ts`**: deprecated, not imported by any active function

## 1. Edge Functions to deploy

Run from the project root. Deploy backend before pushing frontend.

```bash
npx supabase functions deploy create-connect-account --project-ref qbrqsvdustqeoplebzwi
npx supabase functions deploy create-checkout --project-ref qbrqsvdustqeoplebzwi
npx supabase functions deploy create-payment-intent --project-ref qbrqsvdustqeoplebzwi
npx supabase functions deploy stripe-webhooks --project-ref qbrqsvdustqeoplebzwi
# Already deployed:
# npx supabase functions deploy get-stripe-account --project-ref qbrqsvdustqeoplebzwi
```

No changes required for: `create-payout`, `get-stripe-balance`, `get-stripe-transactions`,
`create-connect-account` (account_update path unchanged), `get-booking-from-session`,
`create-setup-intent`, `create-subscription-*`, `cancel-subscription`, `create-billing-portal`.

## 2. Database migrations

No new migrations required for this change set. Direct charges don't change the schema.
Prior migrations (01–10, `payouts` table + `request_id` lock) must be applied if not already:

```bash
npx supabase db push --project-ref qbrqsvdustqeoplebzwi
```

## 3. Frontend

Changes: `StripeSettings.tsx` fee card copy.

```bash
git add -A && git commit -m "feat: switch to direct charges on Custom Connect accounts

- create-connect-account: type: custom (was express)
- create-checkout: direct charge via Stripe-Account header, remove fee estimation
- create-payment-intent: direct charge, remove application_fee_amount + transfer_data
- stripe-webhooks: payment_intent.succeeded handles both circuits (direct + destination)
  for backward compat with existing Express account; fetches real Stripe fee from
  connected account balance transaction for accurate DB records
- stripe-fees.ts: deprecated (no longer imported)
- StripeSettings: fee card updated to reflect direct charge model
- 0% Nelsy commission, no margin, no estimation

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"

git push
```

## 4. Stripe webhook configuration

In Stripe Dashboard > Developers > Webhooks:

1. Endpoint URL: `https://qbrqsvdustqeoplebzwi.supabase.co/functions/v1/stripe-webhooks`
2. **Enable "Listen to events on Connected accounts"** — required for:
   - `payment_intent.succeeded` on direct charges (fires on connected account)
   - `payout.*` events
3. Events to subscribe:
   - `payment_intent.succeeded`
   - `checkout.session.completed`
   - `charge.refunded`
   - `payout.created`
   - `payout.updated`
   - `payout.paid`
   - `payout.failed`
   - `payout.canceled`
   - `account.updated`

## 5. Circuit details

### Direct charges (new Custom accounts — all new users)
- Charge created on connected account: `stripe.paymentIntents.create({...}, { stripeAccount: acct_xxx })`
- Stripe deducts processing fee from connected account balance
- `application_fee_amount`: absent
- `transfer_data`: absent
- Nelsy retains: 0
- Webhook event arrives with `event.account = acct_xxx`
- Refunds: issued on connected account — no transfer reversal needed (already handled by existing `charge.transfer` null check)

### Destination charges (existing Express account — historical only)
- `application_fee_amount` was set to estimated Stripe fee — kept in DB records
- `transfer_data.destination` = Express account ID
- Webhook event arrives without `event.account`
- Refunds: transfer reversal issued (existing `charge.refunded` logic)

### Distinction in webhook
`event.account` field:
- Set → direct charge → fetch real fee from connected account's `balance_transaction`
- Absent → destination charge → use `application_fee_amount` (legacy path)

## 6. No pending decisions

The fee circuit decision is resolved:
- Direct charges (exact) for all new Custom accounts
- Existing Express account preserved as-is

## 7. What is NOT in scope

- Refund management UI (no UI for initiating refunds from dashboard)
- Dispute/chargeback handling UI
- Automatic payout schedule / cron for Stripe retention limits
