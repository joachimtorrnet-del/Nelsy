// Contacts list (Audience page, Creator plan). Table: public.contacts
// (supabase/migrations/20261128_01_free_resources_contacts.sql). Pros can only SELECT
// their own rows (RLS); every write goes through edge functions.
import { supabase } from './supabase';

export type ContactSource = 'free_resource' | 'product_purchase' | 'booking';

export interface Contact {
  id: string;
  profile_id: string;
  email: string;
  first_name: string | null;
  source: ContactSource;
  source_ref: string | null;
  consent_marketing: boolean;
  consent_at: string | null;
  unsubscribed_at: string | null;
  last_activity_at: string;
  created_at: string;
}

export interface ContactsApi {
  list: (profileId: string) => Promise<Contact[]>;
}

export const CONTACT_SOURCE_LABEL: Record<ContactSource, string> = {
  free_resource: 'Free resource',
  product_purchase: 'Purchase',
  booking: 'Booking',
};

export type ConsentState = 'subscribed' | 'unsubscribed' | 'no_consent';

/** "subscribed" means you may send this contact marketing emails. */
export function consentState(c: Pick<Contact, 'consent_marketing' | 'unsubscribed_at'>): ConsentState {
  if (c.unsubscribed_at) return 'unsubscribed';
  return c.consent_marketing ? 'subscribed' : 'no_consent';
}

const MAX_ROWS = 5000;

export async function getMyContacts(profileId: string): Promise<Contact[]> {
  if (!supabase) throw new Error('Supabase not initialized');
  const { data, error } = await supabase
    .from('contacts')
    .select('id, profile_id, email, first_name, source, source_ref, consent_marketing, consent_at, unsubscribed_at, last_activity_at, created_at')
    .eq('profile_id', profileId)
    .order('created_at', { ascending: false })
    .limit(MAX_ROWS);
  if (error) throw error;
  return (data ?? []) as Contact[];
}

export const contactsApi: ContactsApi = { list: getMyContacts };

// ── CSV export (runs in the browser on rows the pro already loaded) ──────────

function csvCell(value: string): string {
  // Neutralise spreadsheet formulas (CSV injection) and quote everything.
  const safe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}

export function contactsToCsv(contacts: Contact[]): string {
  const header = ['email', 'first_name', 'source', 'marketing_consent', 'consent_at', 'unsubscribed_at', 'added_at'];
  const lines = contacts.map((c) => [
    c.email,
    c.first_name ?? '',
    CONTACT_SOURCE_LABEL[c.source] ?? c.source,
    consentState(c) === 'subscribed' ? 'yes' : 'no',
    c.consent_at ?? '',
    c.unsubscribed_at ?? '',
    c.created_at,
  ].map(csvCell).join(','));
  return [header.join(','), ...lines].join('\r\n');
}

export function downloadContactsCsv(contacts: Contact[], fileName = 'nelsy-contacts.csv'): void {
  // BOM so Excel opens accented names correctly.
  const blob = new Blob(['﻿' + contactsToCsv(contacts)], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ── Unsubscribe (public page /u/:contactId?t=token) ──────────────────────────

export async function unsubscribeContact(contactId: string, token: string): Promise<{ studioName: string | null }> {
  if (!supabase) throw new Error('Supabase not initialized');
  const { data, error } = await supabase.functions.invoke('unsubscribe-contact', {
    body: { contact_id: contactId, token },
  });
  if (error) {
    let msg = 'This unsubscribe link is not valid.';
    try {
      const body = await (error as { context?: Response }).context?.json();
      msg = body?.message ?? msg;
    } catch { /* ignore */ }
    throw new Error(msg);
  }
  return { studioName: (data as { studio_name?: string | null })?.studio_name ?? null };
}
