# Fee Circuit Proposal — Destination Charges vs Direct Charges

## Current circuit: destination charges

```
Client → pays platform (Nelsy)
  Stripe deducts processing fee from Nelsy's platform balance
  Nelsy transfers (gross − application_fee_amount) to connected account
  Nelsy keeps application_fee_amount
```

**`application_fee_amount` = what Nelsy retains from the transfer. It is NOT Stripe's fee.**

To make Nelsy neutral, we set `application_fee_amount = estimated_stripe_fee`.
- If estimate equals actual fee → Nelsy net = 0 ✓
- If estimate < actual fee → Nelsy loses (estimate − actual) — hidden loss
- If estimate > actual fee → Nelsy profits — hidden margin violating 0% model

**The estimation can never guarantee exact neutrality.**

---

## Proposed circuit: direct charges

```
Client → pays connected account (via Stripe-Account header)
  Stripe deducts processing fee DIRECTLY from connected account
  Nelsy collects application_fee_amount (set to 0 for 0% model)
  Connected account nets (gross − stripe_fee) automatically
```

**With `application_fee_amount = 0` and direct charges: Nelsy is perfectly neutral.**
The pro bears Stripe fees directly. No estimation needed. No rounding error.

### What changes in the code

In `create-checkout/index.ts` and `create-payment-intent/index.ts`:

```typescript
// Current (destination charge — estimation required):
sessionParams.payment_intent_data = {
  application_fee_amount: applicationFeeSmallest,  // estimated Stripe fee
  transfer_data: { destination: profileData.stripe_account_id },
}

// Proposed (direct charge — exact, no estimation):
// 1. Create the Checkout Session on the connected account:
const session = await stripe.checkout.sessions.create(
  {
    ...sessionParams,
    // application_fee_amount: 0,  // Nelsy takes nothing
  },
  { stripeAccount: profileData.stripe_account_id }  // ← key difference
)
// 2. Return the session URL to the client (no transfer_data needed)
```

### Architectural differences

| Aspect | Destination charges (current) | Direct charges (proposed) |
|--------|-------------------------------|---------------------------|
| Charge appears on | Platform account | Connected account |
| Stripe fee deducted from | Platform (Nelsy) | Connected account (pro) |
| application_fee_amount | Estimated Stripe fee | 0 (Nelsy 0% model) |
| Nelsy neutrality | Approximate | Exact |
| Refund initiator | Platform | Connected account |
| Transfer reversal on refund | Manual (createReversal) | Not needed |
| Statement descriptor | Platform's | Connected account's |
| Webhook delivery | Platform account | Connected account + `event.account` |

### Refund behavior

With direct charges:
- Refunds are issued from the connected account's balance
- No transfer reversal needed (no transfer was created)
- `application_fee` reversal is automatic if `refund_application_fee: true`

This eliminates the complexity of `charge.refunded` → `transfers.createReversal()`.

### Migration steps (when ready)

1. Update `create-checkout/index.ts` and `create-payment-intent/index.ts`:
   - Remove `transfer_data`, set `stripeAccount: profileData.stripe_account_id`
   - Remove fee estimation entirely
   - Set `application_fee_amount: 0` (or omit it)
2. Update `stripe-webhooks/index.ts`:
   - Remove `charge.refunded` → `transfers.createReversal()` block
   - Payout webhooks already use `event.account` — no change needed
3. Test on new bookings only (existing bookings stay as destination charges)
4. No data migration required — new bookings use new circuit, old ones keep old

**Do not migrate automatically. Apply to new accounts only after testing.**
