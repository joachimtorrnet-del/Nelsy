// Client side of the no-card free trial: start-trial and trial-card edge functions.
// Decision logic (eligibility, statuses) lives server side in supabase/functions/_shared/trial.ts.
import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { trialDaysLeft } from '../../supabase/functions/_shared/trial.ts';

export { trialDaysLeft };

export type StartTrialResult =
  | { kind: 'trialing'; trialEnd: string | null }
  | { kind: 'already_subscribed'; status: string }
  | { kind: 'checkout'; url: string };

async function invoke<T>(name: string, body: Record<string, unknown>): Promise<T> {
  if (!supabase) throw new Error('[session] Configuration error');
  const { data, error } = await supabase.functions.invoke(name, { body });
  if (error) {
    // FunctionsHttpError carries the Response: surface the function's own { error } message.
    let detail = error.message;
    let status: number | undefined;
    const ctx = (error as { context?: Response }).context;
    if (ctx && typeof ctx.json === 'function') {
      status = ctx.status;
      try { detail = ((await ctx.json()) as { error?: string }).error ?? detail; } catch { /* keep message */ }
    }
    throw new Error(`[${name}] ${status ? `${status}: ` : ''}${detail}`);
  }
  return data as T;
}

/** Starts the 14-day trial without a card, or returns a Checkout URL when the trial was already used. */
export async function startTrial(plan: string): Promise<StartTrialResult> {
  const data = await invoke<{
    status?: string; trialEnd?: string | null; alreadySubscribed?: boolean; checkoutRequired?: boolean; url?: string;
  }>('start-trial', { plan });
  if (data.checkoutRequired && data.url) return { kind: 'checkout', url: data.url };
  if (data.alreadySubscribed) return { kind: 'already_subscribed', status: data.status ?? 'active' };
  if (data.status === 'trialing') return { kind: 'trialing', trialEnd: data.trialEnd ?? null };
  throw new Error('[start-trial] Unexpected response');
}

/** Read only: can this signed-in account still get a free trial? */
export async function checkTrialEligibility(plan: string): Promise<{ eligible: boolean; alreadySubscribed: boolean }> {
  return invoke('start-trial', { plan, check: true });
}

export interface TrialCardStatus {
  status: string;
  trialEnd: string | null;
  hasCard: boolean;
  cancelAtPeriodEnd: boolean;
}

let cached: { at: number; promise: Promise<TrialCardStatus> } | null = null;

export function getTrialCardStatus(force = false): Promise<TrialCardStatus> {
  if (!force && cached && Date.now() - cached.at < 60_000) return cached.promise;
  const promise = invoke<TrialCardStatus>('trial-card', { action: 'status' });
  cached = { at: Date.now(), promise };
  promise.catch(() => { cached = null; });
  return promise;
}

/** Opens Stripe Checkout (setup mode) to save a card. Nothing is charged before the trial ends. */
export async function openAddCard(): Promise<void> {
  const { url } = await invoke<{ url?: string }>('trial-card', { action: 'checkout' });
  if (!url) throw new Error('[trial-card] No URL returned');
  window.location.href = url;
}

/** Card status while trialing; null otherwise or while loading / on error (callers then show nothing). */
export function useTrialCard(subscriptionStatus: string | undefined): TrialCardStatus | null {
  const [state, setState] = useState<TrialCardStatus | null>(null);
  useEffect(() => {
    if (subscriptionStatus !== 'trialing') { setState(null); return; }
    let alive = true;
    getTrialCardStatus().then((s) => { if (alive) setState(s); }).catch(() => { if (alive) setState(null); });
    return () => { alive = false; };
  }, [subscriptionStatus]);
  return state;
}

export function formatTrialEnd(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
