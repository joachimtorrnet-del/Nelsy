// ─────────────────────────────────────────────────────────────────────────────
// DEV-ONLY sandbox for the digital products feature. Routed only when
// import.meta.env.DEV (see App.tsx), so it never ships to production.
//
//   /dev/products              dashboard Products page, in-memory demo data
//   /dev/products?empty=1      same, starting with no products
//   /dev/products?gated=1      the locked (Creator upgrade) state
//   /dev/studio?preset=c_blush public studio page with demo products, any template
//   /dev/audience              dashboard Audience page (?empty=1, ?gated=1)
// ─────────────────────────────────────────────────────────────────────────────
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Products from '@/pages/dashboard/Products';
import Audience from '@/pages/dashboard/Audience';
import { createDemoContactsApi } from '@/lib/contactsDemo';
import { PublicStudioView } from '@/components/studio/PublicStudioView';
import { createDemoProductsApi } from '@/lib/productsDemo';
import { getMerchantBySlug } from '@/lib/mockData';

export function ProductsSandbox() {
  const [params] = useSearchParams();
  const empty = params.get('empty') === '1';
  const gated = params.get('gated') === '1';
  const api = useMemo(() => createDemoProductsApi(empty), [empty]);
  const [tab, setTab] = useState('products');
  const profile = {
    id: 'demo', full_name: 'Maya Laurent', slug: 'studio-maya', subscription_status: 'active',
    plan: gated ? 'independent_monthly' : 'creator_monthly', business_currency: 'eur', stripe_onboarding_complete: params.get('nostripe') !== '1',
  };
  return (
    <DashboardLayout profile={profile} activeTab={tab} setActiveTab={setTab}>
      {tab === 'products' ? (
        <Products profile={profile} api={api} forceLocked={gated} onNavigate={setTab} />
      ) : (
        <p className="p-8 text-sm text-gray-500">Sandbox: only the Products tab is wired.</p>
      )}
    </DashboardLayout>
  );
}

export function AudienceSandbox() {
  const [params] = useSearchParams();
  const empty = params.get('empty') === '1';
  const gated = params.get('gated') === '1';
  const api = useMemo(() => createDemoContactsApi(empty), [empty]);
  const [tab, setTab] = useState('audience');
  const profile = {
    id: 'demo', full_name: 'Maya Laurent', slug: 'studio-maya', subscription_status: 'active',
    plan: gated ? 'independent_monthly' : 'creator_monthly',
  };
  return (
    <DashboardLayout profile={profile} activeTab={tab} setActiveTab={setTab}>
      {tab === 'audience' ? (
        <Audience profile={profile} api={api} forceLocked={gated} onNavigate={setTab} />
      ) : (
        <p className="p-8 text-sm text-gray-500">Sandbox: only the Audience tab is wired.</p>
      )}
    </DashboardLayout>
  );
}

export function StudioSandbox() {
  const [params] = useSearchParams();
  const base = getMerchantBySlug('studio-maya')!;
  const merchant = { ...base, theme_preset: params.get('preset') ?? base.theme_preset };
  return (
    <div className="min-h-dvh" style={{ backgroundColor: '#E8E8E8' }}>
      <div className="w-full max-w-[480px] md:max-w-[560px] mx-auto min-h-dvh relative">
        <PublicStudioView merchant={merchant} mode="live" />
      </div>
    </div>
  );
}
