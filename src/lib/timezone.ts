import { supabase } from '@/lib/supabase';

/** IANA timezone of this device (e.g. "America/New_York"), or null if the browser can't tell. */
export function deviceTimezone(): string | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return tz && tz.includes('/') ? tz : null;
  } catch {
    return null;
  }
}

/**
 * Saves the device timezone on the pro's profile. Availability, slots, reminders and calendar
 * times are all interpreted in profiles.timezone (default Europe/Paris), so a pro outside France
 * must have her real timezone stored. Never throws: a failure just keeps the default.
 */
export async function saveProfileTimezone(userId: string, tz: string | null = deviceTimezone()): Promise<boolean> {
  if (!supabase || !userId || !tz) return false;
  try {
    const { error } = await supabase.from('profiles').update({ timezone: tz }).eq('id', userId);
    return !error;
  } catch {
    return false;
  }
}

/** "America/New_York" → "New York" for UI labels. */
export function timezoneCity(tz: string): string {
  return (tz.split('/').pop() ?? tz).replace(/_/g, ' ');
}
