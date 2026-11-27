// DEV-ONLY demo data for the Audience page sandbox (/dev/audience). Never used in production:
// the sandbox route only exists when import.meta.env.DEV is true (see App.tsx).
import type { Contact, ContactsApi } from './contacts';

const now = Date.now();
const daysAgo = (d: number) => new Date(now - d * 86_400_000).toISOString();

function c(id: string, p: Partial<Contact> & Pick<Contact, 'email' | 'source'>): Contact {
  return {
    id, profile_id: 'demo', first_name: null, source_ref: null, consent_marketing: false,
    consent_at: null, unsubscribed_at: null, last_activity_at: daysAgo(1), created_at: daysAgo(1), ...p,
  };
}

const DEMO_CONTACTS: Contact[] = [
  c('c1', { email: 'client.one@example.com', first_name: 'Client', source: 'free_resource', consent_marketing: true, consent_at: daysAgo(0), created_at: daysAgo(0) }),
  c('c2', { email: 'client.two@example.com', first_name: 'Alex', source: 'free_resource', created_at: daysAgo(1) }),
  c('c3', { email: 'client.three@example.com', source: 'product_purchase', created_at: daysAgo(2) }),
  c('c4', { email: 'client.four@example.com', first_name: 'Sam', source: 'free_resource', consent_marketing: true, consent_at: daysAgo(4), created_at: daysAgo(4) }),
  c('c5', { email: 'client.five@example.com', first_name: 'Jo', source: 'product_purchase', consent_marketing: true, consent_at: daysAgo(6), unsubscribed_at: daysAgo(2), created_at: daysAgo(6) }),
  c('c6', { email: 'client.six@example.com', source: 'free_resource', consent_marketing: true, consent_at: daysAgo(9), created_at: daysAgo(9) }),
];

export function createDemoContactsApi(empty = false): ContactsApi {
  return { list: async () => new Promise((r) => setTimeout(() => r(empty ? [] : DEMO_CONTACTS), 150)) };
}
