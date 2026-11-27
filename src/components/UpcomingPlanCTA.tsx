// Honest CTAs for pages about features that are not on sale yet (see src/lib/plans.ts):
// primary "Join the waitlist" (mailto), secondary "Start with bookings" on the Independent plan.
import { Link } from 'react-router-dom';

const PINK = '#F52B8C';

export type UpcomingPlan = 'Creator' | 'Salon';

export const INDEPENDENT_ONBOARDING = '/onboarding?plan=independent_monthly';

export function waitlistHref(plan: UpcomingPlan): string {
  return `mailto:hello@getnelsy.com?subject=${encodeURIComponent(`${plan} waitlist`)}`;
}

export function UpcomingPlanBadge({ plan }: { plan: UpcomingPlan }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full bg-[#FDF0F7] border border-[#F4C2C2] px-3 py-1 text-xs font-bold text-[#C8197A] mb-5">
      Part of the upcoming {plan} plan
    </p>
  );
}

export function UpcomingPlanButtons({ plan, large = false }: { plan: UpcomingPlan; large?: boolean }) {
  const pad = large ? 'px-8 py-3.5' : 'px-6 py-3';
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
      <a
        href={waitlistHref(plan)}
        className={`inline-flex items-center gap-2 ${pad} rounded-xl text-white font-bold text-[15px] transition hover:opacity-90`}
        style={{ background: PINK }}
      >
        Join the waitlist
      </a>
      <Link
        to={INDEPENDENT_ONBOARDING}
        className={`inline-flex items-center gap-2 ${pad} rounded-xl border border-[#1A1A1A]/15 bg-white font-bold text-[15px] text-[#1A1A1A] transition hover:border-[#F52B8C]`}
      >
        Start with bookings
      </Link>
    </div>
  );
}

/** One line under the buttons: what is on sale today. */
export function IndependentTodayNote() {
  return (
    <p className="mt-4 text-xs text-gray-500">
      Available today: bookings, deposits and payments on the Independent plan, $29/month (or $25/month billed yearly), 14-day free trial, 0% Nelsy commission.
    </p>
  );
}
