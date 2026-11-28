// ─────────────────────────────────────────────────────────────────────────────
// DEV-ONLY sandbox for the referral program. Routed only when import.meta.env.DEV
// (see App.tsx), so it never ships to production.
//
//   /dev/referrals            dashboard Referrals tab, in-memory demo data
//   /dev/referrals?empty=1    same, for a pro with no referral yet
// ─────────────────────────────────────────────────────────────────────────────
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Referrals from '@/pages/dashboard/Referrals';
import { createDemoReferralsApi } from '@/lib/referralsDemo';

export function ReferralsSandbox() {
  const [params] = useSearchParams();
  const empty = params.get('empty') === '1';
  const api = useMemo(() => createDemoReferralsApi(empty), [empty]);
  const [tab, setTab] = useState('referrals');
  const profile = {
    id: 'demo', full_name: 'Maya Laurent', slug: 'studio-maya', subscription_status: 'active', plan: 'independent_monthly',
  };
  return (
    <DashboardLayout profile={profile} activeTab={tab} setActiveTab={setTab}>
      {tab === 'referrals' ? (
        <Referrals profile={profile} api={api} />
      ) : (
        <p className="p-8 text-sm text-gray-500">Sandbox: only the Referrals tab is wired.</p>
      )}
    </DashboardLayout>
  );
}
