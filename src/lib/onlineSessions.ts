// Online video sessions (1:1 coaching, Creator plan).
// services.location_type is public; the meeting link lives in the private
// service_video_links table (owner-only RLS) so it only reaches the client by email.
// See supabase/migrations/20261128_02_online_services.sql.
import { supabase } from './supabase';

export type LocationType = 'in_person' | 'online';

export function isOnline(service: { location_type?: string | null } | null | undefined): boolean {
  return service?.location_type === 'online';
}

/** https only, a real host, no whitespace or characters that could break HTML. Mirrors the DB check. */
export function isValidVideoUrl(value: string): boolean {
  const v = value.trim();
  if (v.length < 12 || v.length > 2048) return false;
  if (!/^https:\/\/[^\s<>"'`]+$/.test(v)) return false;
  try {
    const u = new URL(v);
    return u.protocol === 'https:' && u.hostname.includes('.');
  } catch {
    return false;
  }
}

/** "Europe/Paris (GMT+1)". Falls back to the raw IANA name. */
export function timezoneLabel(tz: string, at: Date = new Date()): string {
  try {
    const offset = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'shortOffset' })
      .formatToParts(at)
      .find((p) => p.type === 'timeZoneName')?.value;
    return offset ? `${tz.replace(/_/g, ' ')} (${offset})` : tz;
  } catch {
    return tz;
  }
}

// ── Owner-only video link storage ────────────────────────────────────────────
// All calls are best-effort reads: before the migration is applied the table
// does not exist and the dashboard simply shows no link.

/* eslint-disable @typescript-eslint/no-explicit-any */
const linksTable = () => (supabase as any).from('service_video_links');

export async function fetchVideoLink(serviceId: string): Promise<string | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await linksTable().select('video_url').eq('service_id', serviceId).maybeSingle();
    return error ? null : (data?.video_url ?? null);
  } catch {
    return null;
  }
}

export async function fetchVideoLinksForProfile(profileId: string): Promise<Map<string, string>> {
  const out = new Map<string, string>();
  if (!supabase) return out;
  try {
    const { data, error } = await linksTable().select('service_id, video_url').eq('profile_id', profileId);
    if (!error && Array.isArray(data)) {
      for (const r of data as { service_id: string; video_url: string }[]) out.set(r.service_id, r.video_url);
    }
  } catch { /* table not there yet */ }
  return out;
}

/** Saves (or clears, with null) the link of a service. Throws on a real error. */
export async function saveVideoLink(serviceId: string, profileId: string, url: string | null): Promise<void> {
  if (!supabase) return;
  if (url) {
    const { error } = await linksTable()
      .upsert({ service_id: serviceId, profile_id: profileId, video_url: url.trim() }, { onConflict: 'service_id' });
    if (error) throw error;
  } else {
    const { error } = await linksTable().delete().eq('service_id', serviceId);
    // Missing table (migration not applied) means there is nothing to clear.
    if (error && !String(error.message ?? '').includes('service_video_links')) throw error;
  }
}
