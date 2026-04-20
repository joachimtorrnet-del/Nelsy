#!/bin/bash

set -e

echo "Deploying Supabase Edge Functions..."

supabase functions deploy create-connect-account
supabase functions deploy create-payment-intent
supabase functions deploy stripe-webhooks

echo "Setting Stripe secrets in Supabase..."
echo "(Update these values with your real keys)"

# supabase secrets set STRIPE_SECRET_KEY=sk_test_your_key_here
# supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_your_secret_here

echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "  1. Run: supabase secrets set STRIPE_SECRET_KEY=sk_test_..."
echo "  2. Run: supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_..."
echo "  3. Register the webhook URL in Stripe Dashboard:"
echo "     https://<project>.supabase.co/functions/v1/stripe-webhooks"
echo "  4. Subscribe to events: payment_intent.succeeded, payment_intent.payment_failed,"
echo "     account.updated, payout.paid, charge.refunded"
