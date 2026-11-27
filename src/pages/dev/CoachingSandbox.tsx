// ─────────────────────────────────────────────────────────────────────────────
// DEV-ONLY sandbox for online video sessions (1:1 coaching, Creator plan).
// Routed only when import.meta.env.DEV (see App.tsx), so it never ships.
//
//   /dev/coaching?view=editor&state=in_person   OfferEditor, in-person service
//   /dev/coaching?view=editor&state=online      OfferEditor, online with a link
//   /dev/coaching?view=editor&state=later       OfferEditor, online, link sent later
//   /dev/coaching?view=editor&state=gated       OfferEditor on the Independent plan
//   /dev/coaching?view=studio                   studio page + booking flow with an online service
//   /dev/coaching?view=confirmed                booking confirmation page for an online session
// ─────────────────────────────────────────────────────────────────────────────
import { useSearchParams } from 'react-router-dom';
import OfferEditor from '@/pages/dashboard/OfferEditor';
import type { OfferEditorSandbox } from '@/pages/dashboard/OfferEditor';
import BookingConfirmed from '@/pages/BookingConfirmed';
import { PublicStudioView } from '@/components/studio/PublicStudioView';
import { BookingModal } from '@/components/studio/BookingModal';
import { getMerchantBySlug } from '@/lib/mockData';
import type { Merchant, Service } from '@/types';

const COACHING: Service = {
  id: 'coach-1',
  name: '1:1 Nail business coaching',
  description: 'A 60 minute video call to review your prices, your booking page and your Instagram.',
  price: 90,
  duration: 60,
  deposit: 0,
  payment_mode: 'full',
  location_type: 'online',
  is_featured: false,
};

function editorConfig(state: string): OfferEditorSandbox {
  const profile = {
    id: 'demo', full_name: 'Maya Dupont', salon_name: 'Studio Maya', slug: 'studio-maya',
    subscription_status: 'active', color_accent: '#F52B8C',
    plan: state === 'gated' ? 'independent_monthly' : 'creator_monthly',
  };
  const base = {
    id: 'svc-demo', name: '1:1 Nail business coaching', description: COACHING.description,
    price_total: 90, deposit_amount: 0, duration_minutes: 60, category: 'Other', payment_mode: 'full' as const,
  };
  if (state === 'in_person' || state === 'gated') {
    return { profile, service: { ...base, name: 'Gel manicure', price_total: 45, payment_mode: 'deposit', deposit_amount: 10, location_type: 'in_person' } };
  }
  if (state === 'later') return { profile, service: { ...base, location_type: 'online' }, videoUrl: null };
  return { profile, service: { ...base, location_type: 'online', payment_mode: 'deposit', deposit_amount: 30 }, videoUrl: 'https://zoom.us/j/123456789' };
}

export function CoachingSandbox() {
  const [params] = useSearchParams();
  const view = params.get('view') ?? 'editor';

  if (view === 'confirmed') {
    return (
      <BookingConfirmed devBooking={{
        id: 'demo-booking', booking_datetime: '2026-12-03T17:00:00.000Z', client_name: 'Lea Martin',
        client_email: 'lea@example.com', price_total: 90, amount_paid: 90, status: 'confirmed',
        service_name: COACHING.name, duration: 60, salon_timezone: 'Europe/Paris', salon_currency: 'eur',
        location_type: 'online', video_url: params.get('nolink') === '1' ? null : 'https://zoom.us/j/123456789',
      }} />
    );
  }

  if (view === 'studio') {
    const base = getMerchantBySlug('studio-maya')!;
    const merchant: Merchant = {
      ...base,
      timezone: 'Europe/Paris',
      theme_preset: params.get('preset') ?? base.theme_preset,
      services: [base.services[0], COACHING, ...base.services.slice(1, 3)],
    };
    return (
      <div className="min-h-dvh" style={{ backgroundColor: '#E8E8E8' }}>
        <div className="w-full max-w-[480px] md:max-w-[560px] mx-auto min-h-dvh relative">
          <PublicStudioView merchant={merchant} mode="live" />
          <BookingModal merchant={merchant} />
        </div>
      </div>
    );
  }

  return <OfferEditor devSandbox={editorConfig(params.get('state') ?? 'online')} />;
}
