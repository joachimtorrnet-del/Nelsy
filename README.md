# Nelsy - Beautiful Booking Management

Modern, mobile-first booking management platform for beauty professionals.

## Features

- **Calendar Management** - Visual booking calendar with filters
- **Revenue Tracking** - Real-time analytics and revenue stats
- **Dashboard** - Complete overview of your business
- **Services** - Create and manage your services
- **Stripe Integration** - Secure payments with 14-day free trial
- **Mobile-First** - Optimized for mobile devices
- **Secure** - RLS policies, input sanitization, rate limiting

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, TailwindCSS
- **Backend:** Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Payments:** Stripe Checkout & Webhooks
- **Routing:** React Router v6

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nelsy.git
cd nelsy
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env.local
```

4. Fill in your environment variables in `.env.local`:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_APP_URL=http://localhost:5174
```

5. Start the development server:
```bash
npm run dev
```

6. Open http://localhost:5174

## Database Setup

1. Go to your Supabase project SQL Editor
2. Run the schema: `supabase/schema.sql`
3. Run the RLS policies: `supabase/rls_fix.sql`

## Edge Functions Setup

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref your-project-ref

# Set secrets
supabase secrets set STRIPE_SECRET_KEY=sk_test_...
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
supabase secrets set SUPABASE_URL=https://...
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Deploy functions
supabase functions deploy create-checkout
supabase functions deploy stripe-webhooks
```

## Stripe Setup

1. Create products and prices in the Stripe Dashboard
2. Copy the Price ID to `src/pages/Onboarding.tsx`
3. Configure webhook endpoint:
   - URL: `https://your-project.supabase.co/functions/v1/stripe-webhooks`
   - Events: `checkout.session.completed`, `customer.subscription.*`, `invoice.payment_succeeded`, `invoice.payment_failed`

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables from `.env.production`
4. Deploy

### Manual build

```bash
npm run build
```

The `dist` folder contains the production build.

## Project Structure

```
nelsy/
├── src/
│   ├── components/
│   │   └── dashboard/     # Dashboard components
│   ├── pages/             # Route pages
│   ├── lib/               # Supabase client, queries
│   ├── hooks/             # Custom React hooks
│   └── utils/             # Helpers, validation, error handling
├── supabase/
│   ├── functions/         # Edge Functions (create-checkout, stripe-webhooks, ...)
│   ├── schema.sql         # Database schema + triggers
│   └── rls_fix.sql        # Security policies + Stripe column patches
└── public/                # Static assets
```

## Security

- RLS policies on all tables
- Input sanitization with DOMPurify
- Stripe webhook signature verification
- JWT token validation on Edge Functions
- Env secrets never committed to git

## Support

Email: support@nelsy.app
