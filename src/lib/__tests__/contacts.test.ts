import { describe, it, expect } from 'vitest';
import { consentState, contactsToCsv } from '../contacts';
import type { Contact } from '../contacts';

const base: Contact = {
  id: '1', profile_id: 'p', email: 'a@example.com', first_name: null, source: 'free_resource', source_ref: null,
  consent_marketing: false, consent_at: null, unsubscribed_at: null, last_activity_at: '2026-01-01T00:00:00Z', created_at: '2026-01-01T00:00:00Z',
};

describe('consentState', () => {
  it('needs an explicit opt-in', () => {
    expect(consentState(base)).toBe('no_consent');
    expect(consentState({ ...base, consent_marketing: true })).toBe('subscribed');
  });
  it('unsubscribe wins over consent', () => {
    expect(consentState({ ...base, consent_marketing: true, unsubscribed_at: '2026-01-02T00:00:00Z' })).toBe('unsubscribed');
  });
});

describe('contactsToCsv', () => {
  it('quotes cells and neutralises formulas', () => {
    const csv = contactsToCsv([{ ...base, first_name: '=HYPERLINK("x")', consent_marketing: true }]);
    const [header, line] = csv.split('\r\n');
    expect(header).toBe('email,first_name,source,marketing_consent,consent_at,unsubscribed_at,added_at');
    expect(line).toContain(`"'=HYPERLINK(""x"")"`);
    expect(line).toContain('"Free resource","yes"');
  });
});
