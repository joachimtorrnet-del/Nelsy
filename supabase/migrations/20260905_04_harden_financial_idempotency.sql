-- =============================================================================
-- Migration: 20260905_04_harden_financial_idempotency.sql
-- Add UNIQUE partial indexes on balance_transactions to guarantee that
-- a given Stripe payment or refund can only ever produce one balance movement.
-- This is the DB-level guard against Stripe webhook retries double-crediting.
-- =============================================================================

-- Pre-check: detect duplicate stripe_payment_id values before creating index
-- SELECT stripe_payment_id, count(*) FROM balance_transactions
-- WHERE stripe_payment_id IS NOT NULL
-- GROUP BY stripe_payment_id HAVING count(*) > 1;

-- Pre-check: detect duplicate stripe_refund_id values before creating index
-- SELECT stripe_refund_id, count(*) FROM balance_transactions
-- WHERE stripe_refund_id IS NOT NULL
-- GROUP BY stripe_refund_id HAVING count(*) > 1;

-- ── Payment deduplication ─────────────────────────────────────────────────────
-- One Stripe PaymentIntent → at most one credit entry in balance_transactions.
CREATE UNIQUE INDEX IF NOT EXISTS balance_transactions_unique_payment
  ON balance_transactions (stripe_payment_id)
  WHERE stripe_payment_id IS NOT NULL;

-- ── Refund deduplication ──────────────────────────────────────────────────────
-- One Stripe Refund ID → at most one debit entry in balance_transactions.
CREATE UNIQUE INDEX IF NOT EXISTS balance_transactions_unique_refund
  ON balance_transactions (stripe_refund_id)
  WHERE stripe_refund_id IS NOT NULL;

-- The stripe-webhooks Edge Function ALSO does an application-level check
-- (SELECT before calling add_to_balance / deduct_from_balance) for clean
-- early exit on duplicates. This index is the last-resort DB guard for
-- concurrent retries that pass the application check simultaneously.

-- Rollback:
-- DROP INDEX IF EXISTS balance_transactions_unique_payment;
-- DROP INDEX IF EXISTS balance_transactions_unique_refund;
