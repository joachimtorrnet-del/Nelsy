// Client side of the referral ("Affiliates") program.
// Terms and money rules: supabase/functions/_shared/referrals.ts (the one place to change them).
// Feature doc: docs/features/referrals.md.
import { supabase } from './supabase';
import { getConsent, needsConsent } from './consent';
import {
  REFERRAL_TERMS,
  isRefFresh,
  parseRef,
  pickStoredRef,
  summarizeCommissions,
} from '../../supabase/functions/_shared/referrals.ts';
import type {
  CommissionStatus,
  PayoutStatus,
  ReferralBalance,
  ReferralStatus,
  StoredRef,
} from '../../supabase/functions/_shared/referrals.ts';

export * from '../../supabase/functions/_shared/referrals.ts';

export const SITE_ORIGIN = 'https://getnelsy.com';
export const referralLink = (code: string) => `${SITE_ORIGIN}/?ref=${encodeURIComponent(code)}`;

// ─── Click capture: first-party, 60 days, last click wins ────────────────────
// Stored in localStorage and in a first-party cookie (the cookie survives a cleared localStorage and
// is shared across subdomains). Visitors who are asked for cookie consent and have not accepted get a
// session-only copy: the referral still counts when they sign up during the same visit.

const KEY = 'nelsy_ref';
const MAX_AGE = REFERRAL_TERMS.cookieDays * 86_400;

function canPersist(): boolean {
  return !needsConsent() || getConsent() === 'granted';
}

function decode(raw: string | null | undefined): StoredRef | null {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as StoredRef;
    return v && typeof v.ref === 'string' && typeof v.at === 'number' && parseRef(v.ref) ? v : null;
  } catch {
    return null;
  }
}

function readCookie(): StoredRef | null {
  try {
    const m = document.cookie.match(new RegExp(`(?:^|; )${KEY}=([^;]*)`));
    return m ? decode(decodeURIComponent(m[1])) : null;
  } catch {
    return null;
  }
}

function readStored(): StoredRef | null {
  const candidates: (StoredRef | null)[] = [];
  try { candidates.push(decode(sessionStorage.getItem(KEY))); } catch { /* storage blocked */ }
  try { candidates.push(decode(localStorage.getItem(KEY))); } catch { /* storage blocked */ }
  candidates.push(readCookie());
  // Last click wins across the three places.
  return candidates.filter((c): c is StoredRef => isRefFresh(c)).sort((a, b) => b.at - a.at)[0] ?? null;
}

function writeStored(value: StoredRef): void {
  const raw = JSON.stringify(value);
  try { sessionStorage.setItem(KEY, raw); } catch { /* storage blocked */ }
  if (!canPersist()) return;
  try { localStorage.setItem(KEY, raw); } catch { /* storage blocked */ }
  try {
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${KEY}=${encodeURIComponent(raw)}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  } catch { /* cookies blocked */ }
}

/** The ref to attribute a signup to, if a referral link was clicked in the last 60 days. */
export function getStoredReferral(): string | null {
  return readStored()?.ref ?? null;
}

/**
 * Call on page load. Reads ?ref= from the URL (code, slug or the studio badge's profile id), keeps
 * it for 60 days and counts the click. Returns the ref now in force.
 */
export function captureReferral(search: string = window.location.search): string | null {
  let incoming: string | null = null;
  try { incoming = new URLSearchParams(search).get('ref'); } catch { /* malformed query */ }
  const before = readStored();
  const next = pickStoredRef(incoming, before);
  if (!next) return null;
  // Re-write even when unchanged: upgrades a session-only copy once consent is granted.
  writeStored(next);
  if (parseRef(incoming) && supabase) {
    // Rough click counter for the referrer's dashboard. No visitor data is sent.
    void supabase.rpc('referral_click', { p_ref: next.ref }).then(() => {}, () => {});
  }
  return next.ref;
}

export function clearStoredReferral(): void {
  try { sessionStorage.removeItem(KEY); } catch { /* storage blocked */ }
  try { localStorage.removeItem(KEY); } catch { /* storage blocked */ }
  try { document.cookie = `${KEY}=; Max-Age=0; Path=/; SameSite=Lax`; } catch { /* cookies blocked */ }
}

export type ClaimSource = 'link' | 'badge' | 'app_handle';

/**
 * Attach the signed-in (new) pro to her referrer. Safe to call more than once and never throws:
 * the server refuses self-referrals, unknown refs, accounts already referred and old accounts.
 */
export async function claimReferral(ref: string | null | undefined, source: ClaimSource = 'link'): Promise<boolean> {
  const parsed = parseRef(ref);
  if (!parsed || !supabase) return false;
  try {
    const { data, error } = await supabase.rpc('claim_referral', {
      p_ref: parsed.value,
      p_source: source === 'link' && parsed.kind === 'id' ? 'badge' : source,
    });
    if (error) return false;
    const result = data as { claimed?: boolean; reason?: string } | null;
    // Settled either way (claimed, or refused for good): stop carrying the ref around.
    if (result?.claimed || ['self', 'already_referred', 'too_late', 'unknown_ref', 'circular'].includes(result?.reason ?? '')) {
      clearStoredReferral();
    }
    return !!result?.claimed;
  } catch {
    return false;
  }
}

/** Signup helper: claim with the ref kept from the link she clicked, if any. */
export function claimStoredReferral(): Promise<boolean> {
  return claimReferral(getStoredReferral());
}

// ─── Dashboard data ──────────────────────────────────────────────────────────

export interface ReferralRow {
  id: string;
  status: ReferralStatus;
  created_at: string;
  first_paid_at: string | null;
  /** First name and slug only: a referrer never sees the referred pro's email. */
  first_name: string | null;
  slug: string | null;
}

export interface CommissionRow {
  id: string;
  referral_id: string | null;
  amount_cents: number;
  currency: string;
  commission_cents: number;
  status: CommissionStatus;
  available_at: string;
  payout_id: string | null;
  clawback_payout_id: string | null;
  created_at: string;
}

export interface PayoutRow {
  id: string;
  total_cents: number;
  currency: string;
  status: PayoutStatus;
  requested_at: string;
  paid_at: string | null;
}

export interface ReferralOverview {
  code: string;
  /** null when clicks are not tracked. */
  clicks: number | null;
  referrals: ReferralRow[];
  commissions: CommissionRow[];
  payouts: PayoutRow[];
}

export interface ReferralsApi {
  load(profileId: string): Promise<ReferralOverview>;
  requestPayout(): Promise<PayoutRow>;
}

export interface ReferralStats {
  signups: number;
  trialing: number;
  paying: number;
  churned: number;
  balance: ReferralBalance;
  openPayout: PayoutRow | null;
}

export function referralStats(o: Pick<ReferralOverview, 'referrals' | 'commissions' | 'payouts'>, now: Date = new Date()): ReferralStats {
  const count = (s: ReferralStatus) => o.referrals.filter((r) => r.status === s).length;
  return {
    signups: o.referrals.length,
    trialing: count('trialing'),
    paying: count('paying'),
    churned: count('churned'),
    balance: summarizeCommissions(o.commissions, now),
    openPayout: o.payouts.find((p) => p.status !== 'paid') ?? null,
  };
}

export const referralsApi: ReferralsApi = {
  async load(profileId) {
    if (!supabase) throw new Error('Supabase not initialized');
    // Creates the code on first visit (her slug): opening this tab is how a pro joins the program.
    const { data: code, error: codeError } = await supabase.rpc('my_referral_code');
    if (codeError || !code) throw new Error(codeError?.message ?? 'No referral code');

    const [codeRow, referrals, commissions, payouts] = await Promise.all([
      supabase.from('referral_codes').select('clicks').eq('referrer_id', profileId).maybeSingle(),
      supabase.rpc('my_referrals'),
      supabase
        .from('referral_commissions')
        .select('id, referral_id, amount_cents, currency, commission_cents, status, available_at, payout_id, clawback_payout_id, created_at')
        .eq('referrer_id', profileId)
        .order('created_at', { ascending: false }),
      supabase
        .from('referral_payouts')
        .select('id, total_cents, currency, status, requested_at, paid_at')
        .eq('referrer_id', profileId)
        .order('requested_at', { ascending: false }),
    ]);
    if (referrals.error) throw new Error(referrals.error.message);
    if (commissions.error) throw new Error(commissions.error.message);
    if (payouts.error) throw new Error(payouts.error.message);

    return {
      code: code as string,
      clicks: (codeRow.data as { clicks: number } | null)?.clicks ?? null,
      referrals: (referrals.data ?? []) as ReferralRow[],
      commissions: (commissions.data ?? []) as CommissionRow[],
      payouts: (payouts.data ?? []) as PayoutRow[],
    };
  },

  async requestPayout() {
    if (!supabase) throw new Error('Supabase not initialized');
    const { data, error } = await supabase.functions.invoke('request-referral-payout', { body: {} });
    if (error) {
      let detail = error.message;
      const ctx = (error as { context?: Response }).context;
      if (ctx && typeof ctx.json === 'function') {
        try { detail = ((await ctx.json()) as { error?: string }).error ?? detail; } catch { /* keep message */ }
      }
      throw new Error(detail);
    }
    const payout = (data as { payout: { id: string; total_cents: number; currency: string; status: PayoutStatus; requested_at: string } }).payout;
    return { ...payout, paid_at: null };
  },
};
