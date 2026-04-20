<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into Nelsy's server-side Supabase Edge Functions (Deno). The integration uses `posthog-node` (imported via Deno's `npm:posthog-node` specifier) and is configured for the serverless environment with `flushAt: 1` and `flushInterval: 0`, with `await posthog.shutdown()` called before each response to ensure all events are flushed.

**12 business-critical events** were added across 4 Supabase Edge Functions, covering the full booking and subscription lifecycle.

| Event Name | Description | File |
|---|---|---|
| `booking created` | Client submitted a booking and a payment intent was created. Top of the booking funnel. | `supabase/functions/create-payment-intent/index.ts` |
| `booking checkout started` | A Stripe Checkout session was created for a booking (alternative checkout path). | `supabase/functions/create-checkout/index.ts` |
| `booking payment completed` | Booking payment succeeded via Checkout Session (`checkout.session.completed`). Critical conversion. | `supabase/functions/stripe-webhooks/index.ts` |
| `booking payment intent completed` | Booking payment succeeded via PaymentIntent (`payment_intent.succeeded`). Alternative payment path. | `supabase/functions/stripe-webhooks/index.ts` |
| `booking refunded` | A booking was refunded and balance was deducted from the pro. Churn/refund signal. | `supabase/functions/stripe-webhooks/index.ts` |
| `subscription checkout started` | A pro initiated the subscription checkout flow (start of pro onboarding funnel). | `supabase/functions/create-subscription-checkout/index.ts` |
| `subscription trial started` | A pro completed subscription checkout and started their 14-day trial. | `supabase/functions/stripe-webhooks/index.ts` |
| `subscription activated` | A pro subscription became active (post-trial conversion). | `supabase/functions/stripe-webhooks/index.ts` |
| `subscription cancelled` | A pro subscription was cancelled. Critical churn event. | `supabase/functions/stripe-webhooks/index.ts` |
| `subscription payment failed` | Subscription invoice payment failed, status moved to `past_due`. Churn risk signal. | `supabase/functions/stripe-webhooks/index.ts` |
| `stripe connect account created` | A pro created a Stripe Connect account to receive payments directly. | `supabase/functions/create-connect-account/index.ts` |
| `stripe connect onboarding completed` | A pro completed Stripe Connect onboarding (charges enabled). | `supabase/functions/stripe-webhooks/index.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://eu.posthog.com/project/162633/dashboard/631502
- **Booking Conversion Funnel** (booking created → checkout started → payment completed): https://eu.posthog.com/project/162633/insights/VUgxDBpa
- **Pro Subscription Funnel** (checkout started → trial started → activated): https://eu.posthog.com/project/162633/insights/8VlFcC8Q
- **Booking Payments Over Time** (daily payment volume, both paths): https://eu.posthog.com/project/162633/insights/hu5LWE2g
- **Subscription Churn Events** (cancellations + payment failures over time): https://eu.posthog.com/project/162633/insights/wpDlCNP0
- **Stripe Connect Onboarding Completion Rate** (account created → onboarding completed funnel): https://eu.posthog.com/project/162633/insights/WSLkY8kP

> **Important:** The `POSTHOG_API_KEY` and `POSTHOG_HOST` environment variables have been added to `.env.local`. For production, add them as Supabase secrets:
> ```
> supabase secrets set POSTHOG_API_KEY=<your_posthog_api_key>
> supabase secrets set POSTHOG_HOST=<your_posthog_host>
> ```

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
