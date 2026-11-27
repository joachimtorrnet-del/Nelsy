/**
 * Trial decisions used by start-trial, trial-card, create-subscription-checkout and stripe-webhooks
 * (supabase/functions/_shared/trial.ts).
 */
import { describe, it, expect } from 'vitest';
import {
  decideTrial,
  isAbandonedCardSetup,
  isLiveSubscription,
  isTrialEndCancellation,
  profileStatusFor,
  shouldApplySubscriptionEvent,
  trialAlreadyUsed,
  trialDaysLeft,
} from '../../../supabase/functions/_shared/trial.ts';
import type { SubscriptionLike } from '../../../supabase/functions/_shared/trial.ts';

const T0 = 1_800_000_000; // unix seconds
const DAY = 86_400;

const sub = (over: Partial<SubscriptionLike>): SubscriptionLike => ({
  id: 'sub_x', status: 'trialing', trial_start: T0, trial_end: T0 + 14 * DAY,
  default_payment_method: null, pending_setup_intent: null, metadata: {}, ...over,
});
const noCard = (over: Partial<SubscriptionLike> = {}) => sub({ metadata: { no_card_trial: '1', plan: 'independent_monthly' }, ...over });
const abandoned = (over: Partial<SubscriptionLike> = {}) => sub({ id: 'sub_old', pending_setup_intent: 'seti_1', ...over });

describe('decideTrial', () => {
  it('starts a trial for a brand new customer', () => {
    expect(decideTrial([])).toEqual({ action: 'start_trial', cancelIds: [] });
  });

  it('reuses a live no-card trial (idempotent: no second subscription)', () => {
    const live = noCard({ id: 'sub_live' });
    expect(decideTrial([live])).toEqual({ action: 'reuse', subscription: live });
  });

  it('reuses an active paid subscription', () => {
    const paid = sub({ id: 'sub_paid', status: 'active', default_payment_method: 'pm_1', trial_start: null, trial_end: null });
    expect(decideTrial([paid]).action).toBe('reuse');
  });

  it('gives a trial to a pro who abandoned the old card step, and cancels that subscription', () => {
    expect(decideTrial([abandoned()])).toEqual({ action: 'start_trial', cancelIds: ['sub_old'] });
  });

  it('abandoned card-step subscriptions that already expired do not count as a used trial', () => {
    expect(decideTrial([abandoned({ status: 'canceled', pending_setup_intent: null })]).action).toBe('start_trial');
  });

  it('no second free trial after a no-card trial ended without a card', () => {
    expect(decideTrial([noCard({ status: 'canceled' })])).toEqual({ action: 'checkout', cancelIds: [] });
  });

  it('no second free trial after a paid plan was canceled', () => {
    expect(decideTrial([sub({ status: 'canceled', default_payment_method: 'pm_1' })]).action).toBe('checkout');
  });

  it('a past_due subscription is live (reused, not replaced)', () => {
    expect(decideTrial([sub({ status: 'past_due', default_payment_method: 'pm_1' })]).action).toBe('reuse');
  });
});

describe('trialAlreadyUsed / isAbandonedCardSetup / isLiveSubscription', () => {
  it('flags card trials that got a card, unpaid and paused subscriptions', () => {
    expect(trialAlreadyUsed([sub({ default_payment_method: 'pm_1' })])).toBe(true);
    expect(trialAlreadyUsed([sub({ status: 'unpaid' })])).toBe(true);
    expect(trialAlreadyUsed([sub({ status: 'paused' })])).toBe(true);
    expect(trialAlreadyUsed([abandoned()])).toBe(false);
  });

  it('a no-card trial with a pending setup intent is not "abandoned"', () => {
    const s = noCard({ pending_setup_intent: 'seti_2' });
    expect(isAbandonedCardSetup(s)).toBe(false);
    expect(isLiveSubscription(s)).toBe(true);
  });

  it('an abandoned card-step subscription is not live', () => {
    expect(isLiveSubscription(abandoned())).toBe(false);
  });
});

describe('profileStatusFor (webhook mapping)', () => {
  it('no-card trial is live (trialing) right away, even with a pending setup intent', () => {
    expect(profileStatusFor(noCard())).toBe('trialing');
    expect(profileStatusFor(noCard({ pending_setup_intent: 'seti_2' }))).toBe('trialing');
  });

  it('card-first trial stays a draft until the card is saved', () => {
    expect(profileStatusFor(abandoned())).toBe('inactive');
    expect(profileStatusFor(sub({ default_payment_method: 'pm_1' }))).toBe('trialing');
  });

  it('maps the other statuses like before', () => {
    expect(profileStatusFor(sub({ status: 'active' }))).toBe('active');
    expect(profileStatusFor(sub({ status: 'past_due' }))).toBe('past_due');
    expect(profileStatusFor(sub({ status: 'canceled' }))).toBe('cancelled');
    expect(profileStatusFor(sub({ status: 'incomplete_expired' }))).toBe('cancelled');
    expect(profileStatusFor(sub({ status: 'incomplete' }))).toBe('inactive');
    expect(profileStatusFor(sub({ status: 'paused' }))).toBe('inactive');
  });
});

describe('shouldApplySubscriptionEvent', () => {
  it('applies events for the profile subscription or when none is stored', () => {
    expect(shouldApplySubscriptionEvent(null, sub({ status: 'canceled' }))).toBe(true);
    expect(shouldApplySubscriptionEvent('sub_x', sub({ status: 'canceled' }))).toBe(true);
  });

  it('ignores the cancel of a replaced abandoned subscription (cannot unpublish the new trial)', () => {
    expect(shouldApplySubscriptionEvent('sub_new', abandoned({ status: 'canceled' }))).toBe(false);
    expect(shouldApplySubscriptionEvent('sub_new', abandoned())).toBe(false);
  });

  it('a new live subscription replaces the stored one', () => {
    expect(shouldApplySubscriptionEvent('sub_old', noCard({ id: 'sub_new' }))).toBe(true);
  });
});

describe('isTrialEndCancellation (page paused email)', () => {
  it('true when a no-card trial is canceled at trial end without a card', () => {
    expect(isTrialEndCancellation(noCard({ status: 'canceled', ended_at: T0 + 14 * DAY + 30 }))).toBe(true);
  });

  it('false when the pro canceled mid-trial, had a card, or for card-first trials', () => {
    expect(isTrialEndCancellation(noCard({ status: 'canceled', ended_at: T0 + 3 * DAY }))).toBe(false);
    expect(isTrialEndCancellation(noCard({ status: 'canceled', ended_at: T0 + 14 * DAY, default_payment_method: 'pm_1' }))).toBe(false);
    expect(isTrialEndCancellation(abandoned({ status: 'canceled', ended_at: T0 + 14 * DAY }))).toBe(false);
    expect(isTrialEndCancellation(noCard())).toBe(false);
  });
});

describe('trialDaysLeft', () => {
  const now = Date.UTC(2026, 10, 27, 12);
  it('rounds up partial days and never goes below 0', () => {
    expect(trialDaysLeft(new Date(now + 13.2 * 86_400_000).toISOString(), now)).toBe(14);
    expect(trialDaysLeft(new Date(now + 1000).toISOString(), now)).toBe(1);
    expect(trialDaysLeft(new Date(now - 1000).toISOString(), now)).toBe(0);
  });
  it('accepts unix seconds and handles missing values', () => {
    expect(trialDaysLeft(Math.floor(now / 1000) + 3 * DAY, now)).toBe(3);
    expect(trialDaysLeft(null, now)).toBeNull();
    expect(trialDaysLeft('nope', now)).toBeNull();
  });
});
