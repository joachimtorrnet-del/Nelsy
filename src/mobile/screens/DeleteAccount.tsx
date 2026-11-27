import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CircleCheck, TriangleAlert } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { track } from '@/lib/analytics';
import { useProData } from '../hooks/useProData';
import { SUPPORT_EMAIL } from '../lib/constants';

/** Days the team commits to in the confirmation. Keep in sync with docs/mobile/account-deletion.md. */
const DELETION_DAYS = 30;

/**
 * In-app account deletion (App Store Review Guideline 5.1.1(v)).
 * Records a request through the `request-account-deletion` edge function: it inserts a row in
 * account_deletion_requests and emails the team, who cancel the plan and delete the data.
 * See docs/mobile/account-deletion.md for the founder steps.
 */
export default function DeleteAccount() {
  const { data, signOut } = useProData();
  const [confirm, setConfirm] = useState('');
  const [reason, setReason] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const ok = confirm.trim().toUpperCase() === 'DELETE';

  const submit = async () => {
    if (!ok || state === 'sending') return;
    setState('sending');
    if (data?.mode === 'demo') {
      setState('done');
      return;
    }
    try {
      if (!supabase) throw new Error('not configured');
      const { error } = await supabase.functions.invoke('request-account-deletion', {
        body: { reason: reason.trim().slice(0, 500) || null, source: 'app' },
      });
      if (error) throw error;
      track('app_account_deletion_requested');
      setState('done');
    } catch {
      setState('error');
    }
  };

  if (state === 'done') {
    return (
      <div className="flex min-h-[100dvh] flex-col bg-white px-safe pb-safe pt-safe">
        <div className="flex-1 pt-16">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E3F7EC] text-[#11733F]">
            <CircleCheck size={28} />
          </div>
          <h1 className="mt-4 text-[26px] font-extrabold tracking-tight">Request received</h1>
          <p className="mt-2 text-[15px] leading-relaxed text-gray-600">
            We will delete your Nelsy account and its data within {DELETION_DAYS} days, and cancel any active plan so you are not charged again.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
            We will confirm by email at <span className="font-semibold text-[#1A1A1A]">{data?.email}</span>. Changed your mind? Reply to that email or write to {SUPPORT_EMAIL}.
          </p>
        </div>
        <button type="button" onClick={() => void signOut()} className="mb-4 h-14 w-full rounded-full bg-[#1A1A1A] text-[16px] font-bold text-white">
          Log out
        </button>
      </div>
    );
  }

  const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Delete my Nelsy account')}&body=${encodeURIComponent(
    `Hi Nelsy,\n\nPlease delete my account and its data.\n\nEmail: ${data?.email ?? ''}\nPage: getnelsy.com/${data?.slug ?? ''}\n`,
  )}`;

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
        This removes your Nelsy page, services, products, contacts, bookings history and login. Clients will no longer be able to book you. Any active plan is cancelled. This
        cannot be undone.
      </p>

      <label className="mt-6 block">
        <span className="mb-1.5 block text-[13px] font-semibold text-gray-700">Why are you leaving? (optional)</span>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={2}
          maxLength={500}
          className="w-full resize-none rounded-2xl border-2 border-gray-200 px-4 py-3 text-[16px] outline-none focus:border-gray-400"
        />
      </label>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-[13px] font-semibold text-gray-700">Type DELETE to confirm</span>
        <input
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoCapitalize="characters"
          autoComplete="off"
          className="h-14 w-full rounded-2xl border-2 border-gray-200 px-4 text-[16px] outline-none focus:border-[#B42318]"
        />
      </label>

      {state === 'error' && (
        <p role="alert" className="mt-4 rounded-xl bg-[#FDECEC] px-3 py-2.5 text-[13px] font-medium text-[#B42318]">
          We could not send your request. Check your connection and try again, or{' '}
          <a href={mailto} className="underline">
            email {SUPPORT_EMAIL}
          </a>
          .
        </p>
      )}

      <button
        type="button"
        onClick={() => void submit()}
        disabled={!ok || state === 'sending'}
        className="mt-5 flex h-14 w-full items-center justify-center rounded-full bg-[#B42318] text-[16px] font-bold text-white disabled:opacity-30"
      >
        {state === 'sending' ? 'Sending...' : 'Delete my account'}
      </button>
      <p className="mt-3 pb-6 text-center text-[12.5px] text-gray-400">Your data is deleted within {DELETION_DAYS} days. We confirm by email.</p>
    </div>
  );
}
