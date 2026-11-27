import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TriangleAlert } from 'lucide-react';
import { useProData } from '../hooks/useProData';
import { SUPPORT_EMAIL } from '../lib/constants';

/**
 * Apple requires account deletion to be startable in-app (App Store Review Guideline 5.1.1(v)).
 * TODO(backend): replace the mailto with a real deletion endpoint (edge function that cancels the
 * Stripe subscription, deletes the auth user and profile data), then sign the user out here.
 */
export default function DeleteAccount() {
  const { data } = useProData();
  const [confirm, setConfirm] = useState('');
  const ok = confirm.trim().toUpperCase() === 'DELETE';

  const subject = encodeURIComponent('Delete my Nelsy account');
  const body = encodeURIComponent(
    `Hi Nelsy,\n\nPlease delete my account and its data.\n\nEmail: ${data?.email ?? ''}\nPage: getnelsy.com/${data?.slug ?? ''}\n`,
  );
  const href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;

  return (
    <div className="min-h-[100dvh] bg-white px-safe pb-safe pt-safe">
      <Link to="/settings" className="-ml-2 mt-2 inline-flex h-11 items-center gap-1.5 px-2 text-[15px] font-semibold text-gray-600">
        <ArrowLeft size={18} /> Settings
      </Link>
      <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#FDECEC] text-[#B42318]">
        <TriangleAlert size={26} />
      </div>
      <h1 className="mt-4 text-[26px] font-extrabold tracking-tight">Delete your account</h1>
      <p className="mt-2 text-[15px] leading-relaxed text-gray-600">
        This removes your Nelsy page, services, bookings history and login. Clients will no longer be able to book you. Any active plan is cancelled. This cannot be undone.
      </p>
      <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
        We will email you at <span className="font-semibold text-[#1A1A1A]">{data?.email}</span> once it is done.
      </p>

      <label className="mt-6 block">
        <span className="mb-1.5 block text-[13px] font-semibold text-gray-700">Type DELETE to confirm</span>
        <input
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoCapitalize="characters"
          className="h-14 w-full rounded-2xl border-2 border-gray-200 px-4 text-[16px] outline-none focus:border-[#B42318]"
        />
      </label>

      <a
        href={ok ? href : undefined}
        aria-disabled={!ok}
        className={`mt-5 flex h-14 w-full items-center justify-center rounded-full text-[16px] font-bold text-white ${ok ? 'bg-[#B42318]' : 'pointer-events-none bg-[#B42318]/30'}`}
      >
        Request account deletion
      </a>
      <p className="mt-3 text-center text-[12.5px] text-gray-400">Opens your email app with a request to {SUPPORT_EMAIL}.</p>
    </div>
  );
}
