/**
 * Tests for the trial activation emails decision logic and copy used by the
 * send-lifecycle-emails edge function (supabase/functions/_shared/lifecycle-emails.ts).
 */
import { describe, it, expect } from 'vitest';
import {
  LIFECYCLE_KEYS,
  LIFECYCLE_STAGES,
  buildLifecycleEmail,
  decideLifecycleEmail,
  isDaytime,
  lifecycleEmailContent,
  lifecycleEmailText,
  lifecycleEmailsEnabled,
  lifecycleStage,
  lifecycleUnsubscribeToken,
  localHour,
  recapNumbers,
  stageAt,
  stripeReady,
  trialStartMs,
  verifyLifecycleUnsubscribeToken,
} from '../../../supabase/functions/_shared/lifecycle-emails.ts';
import type {
  LifecycleFacts,
  LifecycleKey,
  LifecycleProfile,
} from '../../../supabase/functions/_shared/lifecycle-emails.ts';

const H = 3_600_000;
const D = 24 * H;
/** Trial started 2026-12-01 10:00 UTC (11:00 in Paris). */
const START = Date.parse('2026-12-01T10:00:00Z');
const END = new Date(START + 14 * D).toISOString();

/** `days` after the trial start, at noon UTC offset by default (13:00 Paris: daytime). */
const at = (days: number, hours = 2) => new Date(START + days * D + hours * H);

function profile(over: Partial<LifecycleProfile> = {}): LifecycleProfile {
  return {
    id: '11111111-1111-4111-8111-111111111111',
    email: 'maya@example.com',
    subscription_status: 'trialing',
    trial_ends_at: END,
    timezone: 'Europe/Paris',
    notification_preferences: { new_bookings: true, purchase_confirmations: true, reminders: false },
    slug: 'maya',
    stripe_account_id: null,
    stripe_onboarding_complete: false,
    ...over,
  };
}

function facts(over: Partial<LifecycleFacts> = {}): LifecycleFacts {
  return { services: 0, visits: 0, instagramVisits: 0, bookings: 0, hasCard: false, ...over };
}

const decide = (now: Date, p = profile(), f = facts(), sent: string[] = []) => decideLifecycleEmail(p, sent, f, now);

describe('trial start and stages', () => {
  it('computes the start as trial end minus 14 days, or uses a stored start', () => {
    expect(trialStartMs({ trial_ends_at: END })).toBe(START);
    expect(trialStartMs({ trial_ends_at: END, trial_started_at: '2026-12-02T00:00:00Z' })).toBe(Date.parse('2026-12-02T00:00:00Z'));
    expect(Number.isNaN(trialStartMs({ trial_ends_at: null }))).toBe(true);
  });

  it('maps days since start to one email at most, with gaps and no overlap', () => {
    const expected: [number, LifecycleKey | null][] = [
      [0, 'day0_welcome'], [1.9, 'day0_welcome'],
      [2, 'day2_instagram'], [3.9, 'day2_instagram'],
      [4, null], [4.9, null],
      [5, 'day5_deposits'], [6.9, 'day5_deposits'],
      [7, null], [9.9, null],
      [10, 'day10_recap'], [10.9, 'day10_recap'],
      [11, null], [13.9, null],
    ];
    for (const [days, key] of expected) expect(stageAt(START, new Date(START + days * D)), `day ${days}`).toBe(key);
    expect(stageAt(START, new Date(START - H))).toBeNull();
    for (let i = 1; i < LIFECYCLE_STAGES.length; i++) {
      expect(LIFECYCLE_STAGES[i].fromDay).toBeGreaterThanOrEqual(LIFECYCLE_STAGES[i - 1].toDay);
    }
  });

  it('stops the day 10 email before Stripe trial_will_end (3 days before the end)', () => {
    const last = LIFECYCLE_STAGES[LIFECYCLE_STAGES.length - 1];
    expect(last.key).toBe('day10_recap');
    expect(last.toDay).toBeLessThanOrEqual(14 - 3);
  });
});

describe('who gets emails', () => {
  it('sends each email in its window to a trialing pro', () => {
    expect(decide(at(0, 0.3))).toEqual({ send: true, key: 'day0_welcome' });
    expect(decide(at(2))).toEqual({ send: true, key: 'day2_instagram' });
    expect(decide(at(5))).toEqual({ send: true, key: 'day5_deposits' });
    expect(decide(at(10))).toEqual({ send: true, key: 'day10_recap' });
  });

  it('never emails cancelled, paused, past due, active or legacy statuses', () => {
    for (const status of ['cancelled', 'canceled', 'inactive', 'paused', 'past_due', 'active', 'incomplete', 'trial', null]) {
      expect(decide(at(2), profile({ subscription_status: status })), String(status)).toEqual({ send: false, reason: 'not_trialing' });
    }
  });

  it('never emails after the trial ended, or without a trial end', () => {
    expect(decide(new Date(START + 14 * D))).toEqual({ send: false, reason: 'trial_ended' });
    expect(decide(at(20))).toEqual({ send: false, reason: 'trial_ended' });
    expect(decide(at(2), profile({ trial_ends_at: null }))).toEqual({ send: false, reason: 'no_trial_end' });
    expect(decide(at(2), profile({ trial_ends_at: 'garbage' }))).toEqual({ send: false, reason: 'no_trial_end' });
    // A trial that was cut short (trial end moved earlier than start + stage): still nothing after the end.
    const short = profile({ trial_ends_at: new Date(START + 3 * D).toISOString(), trial_started_at: new Date(START).toISOString() });
    expect(decide(at(5), short)).toEqual({ send: false, reason: 'trial_ended' });
  });

  it('respects the opt-out, on by default', () => {
    expect(decide(at(2), profile({ notification_preferences: { lifecycle_emails: false } }))).toEqual({ send: false, reason: 'opted_out' });
    expect(decide(at(2), profile({ notification_preferences: { lifecycle_emails: true } })).send).toBe(true);
    expect(decide(at(2), profile({ notification_preferences: null })).send).toBe(true);
    expect(lifecycleEmailsEnabled({})).toBe(true);
    expect(lifecycleEmailsEnabled('garbage')).toBe(true);
    // The client reminders toggle is a different preference.
    expect(lifecycleEmailsEnabled({ client_reminders: false })).toBe(true);
  });

  it('needs a valid email address', () => {
    expect(decide(at(2), profile({ email: null }))).toEqual({ send: false, reason: 'no_email' });
    expect(decide(at(2), profile({ email: 'not an email' }))).toEqual({ send: false, reason: 'no_email' });
  });

  it('sends nothing between windows', () => {
    expect(decide(at(4.5))).toEqual({ send: false, reason: 'no_email_due' });
    expect(decide(at(8))).toEqual({ send: false, reason: 'no_email_due' });
    expect(decide(at(12))).toEqual({ send: false, reason: 'no_email_due' });
  });
});

describe('once only', () => {
  it('does not send an email that is already in lifecycle_emails_sent', () => {
    expect(decide(at(0, 0.3), profile(), facts(), ['day0_welcome'])).toEqual({ send: false, reason: 'already_sent', key: 'day0_welcome' });
    expect(decide(at(2), profile(), facts(), ['day0_welcome', 'day2_instagram'])).toEqual({ send: false, reason: 'already_sent', key: 'day2_instagram' });
    expect(decide(at(10), profile(), facts(), ['day10_recap'])).toEqual({ send: false, reason: 'already_sent', key: 'day10_recap' });
  });

  it('a different email sent earlier does not block the current one', () => {
    expect(decide(at(5), profile(), facts(), ['day0_welcome', 'day2_instagram'])).toEqual({ send: true, key: 'day5_deposits' });
  });

  it('never goes back to an email whose window has passed', () => {
    // Day 6, nothing sent yet (job switched on mid-trial): only the day 5 email, not the older ones.
    expect(decide(at(6), profile(), facts(), [])).toEqual({ send: true, key: 'day5_deposits' });
  });

  it('every hourly run across a whole trial yields each email at most once', () => {
    const sent: string[] = [];
    for (let t = START; t < START + 15 * D; t += H) {
      const d = decideLifecycleEmail(profile(), sent, facts(), new Date(t + 20 * 60_000));
      if (d.send) sent.push(d.key);
    }
    expect(sent).toEqual([...LIFECYCLE_KEYS]);
  });
});

describe('skip when the step is done', () => {
  it('day 0: always sends the welcome, with or without a service', () => {
    expect(decide(at(0, 0.3), profile(), facts({ services: 2 }))).toEqual({ send: true, key: 'day0_welcome' });
  });

  it('day 2: skipped after an Instagram visit or any booking', () => {
    expect(decide(at(2), profile(), facts({ instagramVisits: 1, visits: 1 }))).toEqual({ send: false, reason: 'step_done', key: 'day2_instagram' });
    expect(decide(at(2), profile(), facts({ bookings: 1 }))).toEqual({ send: false, reason: 'step_done', key: 'day2_instagram' });
    // Visits from elsewhere do not count as "link is in the bio".
    expect(decide(at(2), profile(), facts({ visits: 30 }))).toEqual({ send: true, key: 'day2_instagram' });
  });

  it('day 2: needs a slug (the email is about her link)', () => {
    expect(decide(at(2), profile({ slug: null }))).toEqual({ send: false, reason: 'no_slug', key: 'day2_instagram' });
  });

  it('day 5: skipped when Stripe is connected and enabled', () => {
    const ready = profile({ stripe_account_id: 'acct_123', stripe_onboarding_complete: true });
    expect(decide(at(5), ready)).toEqual({ send: false, reason: 'step_done', key: 'day5_deposits' });
    // Account created but onboarding not finished: still send.
    expect(decide(at(5), profile({ stripe_account_id: 'acct_123', stripe_onboarding_complete: false }))).toEqual({ send: true, key: 'day5_deposits' });
    expect(stripeReady({ stripe_account_id: null, stripe_onboarding_complete: true })).toBe(false);
  });

  it('day 10: sent with or without a card, held back while the card state is unknown', () => {
    expect(decide(at(10), profile(), facts({ hasCard: true }))).toEqual({ send: true, key: 'day10_recap' });
    expect(decide(at(10), profile(), facts({ hasCard: false }))).toEqual({ send: true, key: 'day10_recap' });
    expect(decide(at(10), profile(), facts({ hasCard: null }))).toEqual({ send: false, reason: 'card_unknown', key: 'day10_recap' });
    // The card state only matters for the day 10 email.
    expect(decide(at(5), profile(), facts({ hasCard: null }))).toEqual({ send: true, key: 'day5_deposits' });
  });
});

describe('timezone daytime window (9:00 to 18:59 local)', () => {
  it('reads the local hour in the pro timezone', () => {
    const t = new Date('2026-12-03T14:20:00Z');
    expect(localHour(t, 'Europe/Paris')).toBe(15);
    expect(localHour(t, 'America/New_York')).toBe(9);
    expect(localHour(t, 'America/Los_Angeles')).toBe(6);
    expect(localHour(new Date('2026-12-03T23:20:00Z'), 'Europe/Paris')).toBe(0);
    expect(localHour(t, 'Not/AZone')).toBe(15); // falls back to Europe/Paris
    expect(localHour(t, null)).toBe(15);
  });

  it('is open from 9 to 19', () => {
    expect(isDaytime(new Date('2026-12-03T07:59:00Z'), 'Europe/Paris')).toBe(false); // 08:59
    expect(isDaytime(new Date('2026-12-03T08:00:00Z'), 'Europe/Paris')).toBe(true); // 09:00
    expect(isDaytime(new Date('2026-12-03T17:59:00Z'), 'Europe/Paris')).toBe(true); // 18:59
    expect(isDaytime(new Date('2026-12-03T18:00:00Z'), 'Europe/Paris')).toBe(false); // 19:00
  });

  it('holds an email until daytime in her timezone, then sends it', () => {
    const la = profile({ timezone: 'America/Los_Angeles' });
    // Day 2 window opens 2026-12-03 10:00 UTC = 02:00 in Los Angeles.
    expect(decide(new Date('2026-12-03T10:20:00Z'), la)).toEqual({ send: false, reason: 'outside_daytime', key: 'day2_instagram' });
    expect(decide(new Date('2026-12-03T16:20:00Z'), la)).toEqual({ send: false, reason: 'outside_daytime', key: 'day2_instagram' }); // 08:20
    expect(decide(new Date('2026-12-03T17:20:00Z'), la)).toEqual({ send: true, key: 'day2_instagram' }); // 09:20
    // The same instant is daytime in Paris.
    expect(decide(new Date('2026-12-03T10:20:00Z'), profile())).toEqual({ send: true, key: 'day2_instagram' });
  });

  it('sends the welcome right after signup even at night, then follows the window', () => {
    // Trial started at 23:00 Paris time.
    const start = Date.parse('2026-12-01T22:00:00Z');
    const night = profile({ trial_ends_at: new Date(start + 14 * D).toISOString() });
    expect(decide(new Date(start + 20 * 60_000), night)).toEqual({ send: true, key: 'day0_welcome' });
    expect(decide(new Date(start + 2.9 * H), night)).toEqual({ send: true, key: 'day0_welcome' });
    expect(decide(new Date(start + 4 * H), night)).toEqual({ send: false, reason: 'outside_daytime', key: 'day0_welcome' }); // 03:00
    expect(decide(new Date(start + 10.5 * H), night)).toEqual({ send: true, key: 'day0_welcome' }); // 09:30
  });

  it('every stage window contains a daytime slot in any timezone', () => {
    for (const tz of ['Pacific/Auckland', 'America/Los_Angeles', 'Asia/Kolkata', 'Europe/Paris']) {
      for (const s of LIFECYCLE_STAGES) {
        let found = false;
        for (let t = START + s.fromDay * D; t < START + s.toDay * D; t += H) {
          if (lifecycleStage(profile({ timezone: tz }), [], new Date(t)).send) { found = true; break; }
        }
        expect(found, `${s.key} in ${tz}`).toBe(true);
      }
    }
  });
});

describe('copy', () => {
  const input = (f: Partial<LifecycleFacts> = {}, over: Record<string, unknown> = {}) => ({
    fullName: 'Maya Lopez', slug: 'maya', timezone: 'America/New_York', trialEndsAt: END, facts: facts(f), priceLabel: '$29 per month', ...over,
  });
  const variants: [string, LifecycleKey, Partial<LifecycleFacts>][] = [
    ['welcome, no service', 'day0_welcome', {}],
    ['welcome, has service', 'day0_welcome', { services: 1 }],
    ['instagram', 'day2_instagram', {}],
    ['deposits', 'day5_deposits', {}],
    ['recap, nothing yet, no service', 'day10_recap', {}],
    ['recap, nothing yet, has service', 'day10_recap', { services: 2 }],
    ['recap, numbers, no card', 'day10_recap', { services: 2, visits: 12, bookings: 3 }],
    ['recap, numbers, card saved', 'day10_recap', { services: 2, visits: 12, bookings: 3, hasCard: true }],
  ];

  it.each(variants)('%s: under 120 words, no em dash, one pink CTA, sign-off, unsubscribe link', (_name, key, f) => {
    const { subject, html, text } = buildLifecycleEmail(key, input(f), { unsubscribeUrl: 'https://getnelsy.com/u/emails/x?t=y' });
    expect(text.split(/\s+/).filter(Boolean).length).toBeLessThan(120);
    expect(subject + html).not.toMatch(/[—–]|&mdash;|&ndash;/);
    expect(html.match(/background:#F52B8C;color:#ffffff;font-size:16px/g)).toHaveLength(1);
    expect(html).toContain('Joachim from Nelsy');
    expect(html).toContain('href="https://getnelsy.com/u/emails/x?t=y"');
    expect(html).toContain('Hi Maya,');
    expect(subject + text).not.toMatch(/course|guide|creator plan|testimonial/i);
  });

  it('day 0: service nudge only when she has no service; CTA to the dashboard', () => {
    const none = lifecycleEmailContent('day0_welcome', input());
    expect(lifecycleEmailText(none)).toContain('add your first service');
    expect(none.cta).toEqual({ label: 'Add my first service', url: 'https://getnelsy.com/dashboard' });
    const has = lifecycleEmailContent('day0_welcome', input({ services: 1 }));
    expect(lifecycleEmailText(has)).not.toContain('add your first service');
    expect(lifecycleEmailText(has)).toContain('Welcome to Nelsy');
    expect(has.cta.url).toBe('https://getnelsy.com/dashboard');
  });

  it('day 2: shows her link big, 3 steps, CTA to her page', () => {
    const c = lifecycleEmailContent('day2_instagram', input());
    expect(c.highlight).toEqual({ text: 'getnelsy.com/maya', href: 'https://getnelsy.com/maya' });
    expect(c.steps).toHaveLength(3);
    expect(c.cta).toEqual({ label: 'View my page', url: 'https://getnelsy.com/maya' });
  });

  it('day 5: CTA to the dashboard payments settings', () => {
    expect(lifecycleEmailContent('day5_deposits', input()).cta).toEqual({ label: 'Connect Stripe', url: 'https://getnelsy.com/dashboard/stripe' });
  });

  it('day 10: real numbers, singular and plural', () => {
    expect(recapNumbers({ visits: 12, bookings: 3 })).toBe('12 visits and 3 bookings');
    expect(recapNumbers({ visits: 1, bookings: 1 })).toBe('1 visit and 1 booking');
    expect(recapNumbers({ visits: 7, bookings: 0 })).toBe('7 visits and no bookings');
    const c = lifecycleEmailContent('day10_recap', input({ services: 1, visits: 12, bookings: 3 }));
    expect(c.highlight).toEqual({ label: 'Your page so far', text: '12 visits and 3 bookings' });
    expect(lifecycleEmailText(c)).toContain('Your page so far: 12 visits and 3 bookings');
  });

  it('day 10: says zero plainly and gives one next step', () => {
    const noService = lifecycleEmailText(lifecycleEmailContent('day10_recap', input()));
    expect(noService).toContain('Your page had no visits and no bookings so far.');
    expect(noService).toContain('add your first service');
    expect(noService).not.toContain('Instagram bio');
    const withService = lifecycleEmailText(lifecycleEmailContent('day10_recap', input({ services: 1 })));
    expect(withService).toContain('Your page had no visits and no bookings so far.');
    expect(withService).toContain('put getnelsy.com/maya in your Instagram bio');
    expect(withService).not.toContain('add your first service');
  });

  it('day 10: card ask with the trial end date, skipped when a card is saved', () => {
    // END = 2026-12-15T10:00Z = Tuesday, December 15 in New York.
    const ask = lifecycleEmailContent('day10_recap', input({ visits: 2 }));
    expect(lifecycleEmailText(ask)).toContain('Add a card to keep your page live after Tuesday, December 15,');
    expect(lifecycleEmailText(ask)).toContain('Then the plan is $29 per month.');
    expect(ask.cta).toEqual({ label: 'Add a card', url: 'https://getnelsy.com/dashboard?add_card=1' });

    const noPrice = lifecycleEmailText(lifecycleEmailContent('day10_recap', input({ visits: 2 }, { priceLabel: null })));
    expect(noPrice).not.toContain('the plan is');

    const saved = lifecycleEmailContent('day10_recap', input({ visits: 2, hasCard: true }));
    expect(lifecycleEmailText(saved)).not.toMatch(/add a card/i);
    expect(saved.cta.url).toBe('https://getnelsy.com/dashboard');
  });

  it('escapes every dynamic value', () => {
    const evil = { ...input(), fullName: '<script>x</script> Lopez', slug: 'ma"ya<b>', priceLabel: '<i>$29</i>' };
    for (const key of LIFECYCLE_KEYS) {
      const { html } = buildLifecycleEmail(key, evil, { unsubscribeUrl: 'https://x.test/?a=1&b="2"' });
      expect(html).not.toContain('<script>');
      expect(html).not.toContain('<b>');
      expect(html).not.toContain('<i>');
      expect(html).not.toContain('b="2"');
    }
    expect(buildLifecycleEmail('day2_instagram', evil).html).toContain('https://getnelsy.com/ma%22ya%3Cb%3E');
  });

  it('falls back to the Settings link when no unsubscribe token can be minted, and to "Hi," without a name', () => {
    const { html } = buildLifecycleEmail('day5_deposits', { ...input(), fullName: null });
    expect(html).toContain('href="https://getnelsy.com/dashboard/settings"');
    expect(html).toContain('>Hi,<');
  });
});

describe('unsubscribe token', () => {
  const SECRET = 'test-secret-0123456789';
  const ID = '11111111-1111-4111-8111-111111111111';

  it('verifies its own token and rejects others', async () => {
    const token = await lifecycleUnsubscribeToken(SECRET, ID);
    expect(token).toMatch(/^[A-Za-z0-9_-]{20,100}$/);
    expect(await verifyLifecycleUnsubscribeToken(SECRET, ID, token!)).toBe(true);
    expect(await verifyLifecycleUnsubscribeToken(SECRET, '22222222-2222-4222-8222-222222222222', token!)).toBe(false);
    expect(await verifyLifecycleUnsubscribeToken('another-secret-0123456789', ID, token!)).toBe(false);
    expect(await verifyLifecycleUnsubscribeToken(SECRET, ID, `${token!.slice(0, -1)}A`)).toBe(token!.endsWith('A'));
  });

  it('mints and verifies nothing without a long enough secret', async () => {
    expect(await lifecycleUnsubscribeToken(undefined, ID)).toBeNull();
    expect(await lifecycleUnsubscribeToken('short', ID)).toBeNull();
    expect(await verifyLifecycleUnsubscribeToken(undefined, ID, 'x'.repeat(43))).toBe(false);
  });
});
