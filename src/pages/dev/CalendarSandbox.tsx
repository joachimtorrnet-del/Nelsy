// ─────────────────────────────────────────────────────────────────────────────
// DEV-ONLY sandbox for the pro agenda (dashboard Bookings tab). Routed only when
// import.meta.env.DEV (see App.tsx), so it never ships to production.
//
//   /dev/calendar                     a busy week, in-memory demo data
//   /dev/calendar?empty=1             a brand-new pro: no service, no booking
//   /dev/calendar?view=week|list|day  opens on that view
//   /dev/calendar?tz=America/New_York the pro lives in another timezone than this device
//   /dev/calendar?currency=USD
// ─────────────────────────────────────────────────────────────────────────────
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Calendar from '@/pages/dashboard/Calendar';
import { createDemoAgendaApi } from '@/lib/agendaDemo';
import { safeTimezone } from '@/lib/agenda';

export function CalendarSandbox() {
  const [params] = useSearchParams();
  const empty = params.get('empty') === '1';
  const timezone = safeTimezone(params.get('tz') ?? 'Europe/Paris');
  const viewParam = params.get('view');
  const view = viewParam === 'week' || viewParam === 'list' || viewParam === 'day' ? viewParam : undefined;
  const api = useMemo(() => createDemoAgendaApi({ empty, timezone }), [empty, timezone]);
  const [tab, setTab] = useState('calendar');
  const profile = {
    id: 'demo', full_name: 'Maya Laurent', slug: 'studio-maya', subscription_status: 'active', plan: 'independent_monthly',
    timezone, business_currency: params.get('currency') ?? 'EUR',
  };
  return (
    <DashboardLayout profile={profile} activeTab={tab} setActiveTab={setTab}>
      {tab === 'calendar' ? (
        <Calendar profile={profile} api={api} initialView={view} />
      ) : (
        <p className="p-8 text-sm text-gray-500">Sandbox: only the Bookings tab is wired.</p>
      )}
    </DashboardLayout>
  );
}
