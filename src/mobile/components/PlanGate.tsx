import type { ReactNode } from 'react';
import { ExternalLink, Lock } from 'lucide-react';
import { PLANS } from '@/lib/plans';
import { WEB } from '../lib/constants';
import { openExternal } from '../lib/native';
import { planLinksAllowed } from '../lib/storePolicy';

/**
 * Card shown in place of a Creator-plan section.
 * Store builds (iOS, Android): plan status only. No price, no upgrade button, no link
 * (App Store Guideline 3.1.3(f), see lib/storePolicy.ts).
 * Browser builds: a link to the plans on the website. Never an in-app purchase.
 */
export function PlanGate({ icon, feature, what }: { icon: ReactNode; feature: string; what: string }) {
  return (
    <div className="mx-4 mt-2 rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFF0F7] text-[#F52B8C]">{icon}</div>
        <div className="min-w-0">
          <p className="text-[16px] font-bold">{feature}</p>
          <p className="flex items-center gap-1 text-[13px] text-gray-500">
            <Lock size={12} /> {PLANS.creator.name} plan
          </p>
        </div>
      </div>
      <p className="mt-3 text-[14px] leading-relaxed text-gray-600">{what}</p>
      {planLinksAllowed() ? (
        <button
          type="button"
          onClick={() => openExternal(WEB.pricing)}
          className="mt-4 flex h-11 w-full items-center justify-center gap-1.5 rounded-full bg-[#1A1A1A] text-[14px] font-bold text-white"
        >
          See plans on getnelsy.com <ExternalLink size={15} />
        </button>
      ) : (
        <p className="mt-3 rounded-xl bg-gray-50 px-3 py-2.5 text-[13px] text-gray-500">Not included in your current plan.</p>
      )}
    </div>
  );
}
