import { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { validatePassword } from '../utils/validation';
import { isReservedSlug } from '@/lib/reservedSlugs';
import { track, identify } from '../lib/analytics';
import { PLANS, TRIAL_DAYS, parsePlanParam, planKey } from '@/lib/plans';
import type { BillingInterval } from '@/lib/plans';
import { saveProfileTimezone } from '@/lib/timezone';
import { checkTrialEligibility, startTrial } from '@/lib/trial';

// Plan picked on the landing / pricing page (?plan=independent_yearly, legacy ?plan=yearly). Unavailable tiers fall back to Independent.
const SELECTED = (() => {
  try { return parsePlanParam(new URLSearchParams(window.location.search).get('plan')); }
  catch { return parsePlanParam(null); }
})();
const SELECTED_PLAN = PLANS[SELECTED.tier];
const YEARLY_SAVING_PCT = Math.round((1 - SELECTED_PLAN.yearlyTotal / (SELECTED_PLAN.monthly * 12)) * 100);
const PINK = '#F52B8C';

// Signup, one or two fields per screen (same order and feel as the app's native signup,
// src/mobile/screens/Onboarding.tsx). The slug is checked on screen 1, before any account exists;
// the account is created on the email + password screen so the lead is kept even if she stops
// later, and the free trial (no card) starts on the last screen.
const STEPS = ['claim_link', 'name', 'credentials', 'phone', 'start_trial'] as const;
type StepName = (typeof STEPS)[number];

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  username: string;
  fullName: string;
  email: string;
  phone: string; // "+33 612345678"
  password: string;
  plan: BillingInterval;
  agreedToTerms: boolean;
}

type SlugState = 'idle' | 'checking' | 'free' | 'taken' | 'reserved';

// ─── Analytics helpers ────────────────────────────────────────────────────────

function parseBackendError(msg: string): { operation: string; http_status?: number; error_type: string } {
  const opMatch = msg.match(/^\[([^\]]+)\]/);
  const rawOp = opMatch?.[1] ?? 'unknown';
  const opMap: Record<string, string> = {
    signup: 'signup', profile: 'profile_creation',
    signin: 'signin', intent: 'subscription_intent', session: 'session',
    'start-trial': 'start_trial',
  };
  const operation = opMap[rawOp] ?? 'unknown';
  const statusMatch = msg.match(/\] (\d{3}):/);
  const http_status = statusMatch ? parseInt(statusMatch[1]) : undefined;
  const error_type = msg.includes('timed out') ? 'timeout'
    : msg.includes('No user') ? 'no_user'
    : msg.includes('No session') ? 'no_session'
    : http_status ? `http_${http_status}`
    : 'unknown';
  return { operation, http_status, error_type };
}

/** "[signup] 500: Something" → "Something" for display. */
const displayError = (msg: string) => msg.replace(/^\[[^\]]+\]\s*(\d{3}:\s*)?/, '') || 'Something went wrong. Please try again.';

const emailOk = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const nationalDigits = (phone: string) => phone.replace(/^\+\d+\s?/, '').replace(/\D/g, '');

function passwordErrorType(password: string): string {
  if (!password) return 'required';
  const pwErrors = validatePassword(password).errors;
  return pwErrors.some(e => e.includes('8 characters')) ? 'too_short'
    : pwErrors.some(e => e.includes('uppercase')) ? 'missing_uppercase'
    : pwErrors.some(e => e.includes('lowercase')) ? 'missing_lowercase'
    : pwErrors.some(e => e.includes('number')) ? 'missing_number'
    : 'too_weak';
}

// ─── Main Onboarding ──────────────────────────────────────────────────────────

export default function Onboarding() {
  const navigate = useNavigate();
  const [booting, setBooting] = useState(!!supabase);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    // Billing interval picked on the landing pricing section; the trial screen lets her switch
    plan: SELECTED.interval,
    agreedToTerms: false,
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<ReactNode>('');
  const [accountCreated, setAccountCreated] = useState(false);
  // Signed in when the page opened (mobile app ?resume=1, dashboard "Start free trial", reactivation)
  const [resumed, setResumed] = useState(false);
  // false: this account already used its free trial, the last screen reactivates with a payment
  const [trialEligible, setTrialEligible] = useState(true);
  const [termsNudge, setTermsNudge] = useState(false);

  const name: StepName = STEPS[step];
  const viewedSteps = useRef<Set<number>>(new Set());
  // Always-current plan ref so the step_viewed effect has a fresh value without
  // plan needing to be a dependency (which would re-fire on every plan toggle).
  const planRef = useRef<BillingInterval>(formData.plan);
  planRef.current = formData.plan;

  const set = (patch: Partial<FormData>) => {
    setFormData((f) => ({ ...f, ...patch }));
    setError('');
  };

  useEffect(() => {
    track('onboarding_started');
  }, []);

  // A signed-in pro (account already created: mobile app ?resume=1, dashboard banner, reactivation)
  // goes straight to the trial screen. ?resume=1 without a session: sign in first and come back here.
  useEffect(() => {
    if (!supabase) return;
    const search = window.location.search;
    let cancelled = false;
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (cancelled) return;
      if (session) {
        identify(session.user.id);
        setResumed(true);
        setStep(STEPS.indexOf('start_trial'));
        setBooting(false);
        try {
          const check = await checkTrialEligibility(planKey(SELECTED.tier, planRef.current));
          if (cancelled) return;
          if (check.alreadySubscribed) { navigate('/dashboard', { replace: true }); return; }
          setTrialEligible(check.eligible);
        } catch { /* keep the trial copy: start-trial decides server side anyway */ }
      } else if (new URLSearchParams(search).get('resume') === '1') {
        navigate(`/login?next=${encodeURIComponent(`/onboarding${search}`)}`, { replace: true });
      } else {
        setBooting(false);
      }
    }).catch(() => { if (!cancelled) setBooting(false); });
    return () => { cancelled = true; };
  }, [navigate]);

  useEffect(() => {
    if (booting || viewedSteps.current.has(step)) return;
    viewedSteps.current.add(step);
    track('onboarding_step_viewed', {
      step: STEPS[step],
      step_number: step + 1,
      plan: planRef.current,
    });
  }, [step, booting]);

  const fail = (field: string, error_type: string, message: ReactNode) => {
    track('onboarding_validation_error', { step: name, field, error_type });
    setError(message);
  };

  const advance = (extra?: Record<string, unknown>) => {
    track('onboarding_step_completed', { step: name, step_number: step + 1, plan: planRef.current, ...extra });
    setError('');
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => {
    setError('');
    if (step === 0) navigate('/');
    else setStep(step - 1);
  };

  // ── Screen 1: slug availability (debounced, same check as the app) ────────
  const [slugState, setSlugState] = useState<SlugState>('idle');
  useEffect(() => {
    const slug = formData.username;
    if (slug.length < 3) { setSlugState('idle'); return; }
    if (isReservedSlug(slug)) { setSlugState('reserved'); return; }
    const client = supabase;
    if (!client) { setSlugState('free'); return; }
    setSlugState('checking');
    let alive = true;
    const t = setTimeout(async () => {
      try {
        // profiles is not readable by anon; the public view exposes slug
        const { data } = await client.from('public_profiles').select('slug').eq('slug', slug).maybeSingle();
        if (alive) setSlugState(data ? 'taken' : 'free');
      } catch {
        if (alive) setSlugState('free'); // the unique constraint still guards it at signUp
      }
    }, 450);
    return () => { alive = false; clearTimeout(t); };
  }, [formData.username]);

  // ── Screen 3: account creation (slug and name already validated) ──────────
  const createAccount = async (): Promise<boolean> => {
    if (!supabase) { setError('Configuration error. Please contact support.'); return false; }
    try {
      // Existing session (e.g. went back and forth): the account exists, nothing to create.
      const { data: { session: existingSession } } = await supabase.auth.getSession();
      if (existingSession) {
        identify(existingSession.user.id);
        setAccountCreated(true);
        return true;
      }

      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName.trim(),
            slug: formData.username,
            phone: formData.phone,
            instagram: '',
            tiktok: '',
          },
        },
      });
      // With email confirmation on, Supabase answers an existing email with a user that has
      // no identities instead of an error; without it, it returns "User already registered".
      if (signUpError?.message?.toLowerCase().includes('already registered') || (user && user.identities?.length === 0)) {
        fail('email', 'already_registered', (
          <>This email already has a Nelsy account. <Link to="/login" className="underline font-semibold">Log in instead</Link>.</>
        ));
        return false;
      }
      // The profile trigger fails on the slug unique constraint if someone took the link meanwhile.
      if (signUpError?.message?.toLowerCase().includes('database error')) {
        const { data: taken } = await supabase.from('public_profiles').select('slug').eq('slug', formData.username).maybeSingle();
        if (taken) {
          track('onboarding_validation_error', { step: 'credentials', field: 'username', error_type: 'already_taken' });
          setSlugState('taken');
          setStep(0);
          setError('Someone just claimed this link. Please choose another one.');
          return false;
        }
      }
      if (signUpError) throw new Error(`[signup] ${signUpError.message}`);
      if (!user) throw new Error('[signup] No user returned');
      identify(user.id);
      track('account_created', { plan: formData.plan });

      // Wait for the DB trigger to create the profile
      let profile = null;
      for (let retries = 6; retries > 0 && !profile; retries--) {
        await new Promise((r) => setTimeout(r, 500));
        const { data } = await supabase.from('profiles').select('id').eq('id', user.id).maybeSingle();
        profile = data;
      }
      if (!profile) throw new Error('[profile] Profile creation timed out');

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (signInError) throw new Error(`[signin] ${signInError.message}`);

      // Store the device timezone: slots, reminders and calendar times all follow profiles.timezone
      await saveProfileTimezone(user.id);

      setAccountCreated(true);
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('[Onboarding]', msg);
      const { operation, http_status, error_type } = parseBackendError(msg);
      track('onboarding_backend_error', {
        step: 'credentials', operation, error_type,
        ...(http_status !== undefined ? { http_status } : {}),
      });
      setError(displayError(msg));
      return false;
    }
  };

  // ── Screen 5: start the trial (no card) ───────────────────────────────────
  const beginTrial = async () => {
    if (!formData.agreedToTerms) {
      setTermsNudge(true);
      setTimeout(() => document.getElementById('onboarding-terms')?.scrollIntoView({ block: 'center', behavior: 'smooth' }), 50);
      track('onboarding_validation_error', { step: 'start_trial', field: 'terms', error_type: 'not_accepted' });
      return;
    }
    const plan = planKey(SELECTED.tier, formData.plan);
    try {
      const result = await startTrial(plan);
      track('onboarding_step_completed', { step: 'start_trial', step_number: 5, plan: formData.plan });
      if (result.kind === 'checkout') {
        track('reactivation_checkout_opened', { plan });
        window.location.href = result.url;
        return;
      }
      if (result.kind === 'trialing') {
        track('subscription_trial_started', { plan: formData.plan, trial_type: 'no_card' });
      }
      track('onboarding_completed', { plan: formData.plan, trial_type: 'no_card' });
      sessionStorage.setItem('nelsy_onboarding_just_completed', '1');
      navigate('/dashboard');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('[Onboarding]', msg);
      const { operation, http_status, error_type } = parseBackendError(msg);
      track('onboarding_backend_error', {
        step: 'start_trial', operation, error_type,
        ...(http_status !== undefined ? { http_status } : {}),
      });
      setError(`We could not start your trial: ${displayError(msg)}`);
    }
  };

  const onNext = async () => {
    if (busy) return;
    switch (name) {
      case 'claim_link':
        if (formData.username.length < 3) return fail('username', 'too_short', 'Your link needs at least 3 characters.');
        if (slugState === 'reserved') return fail('username', 'reserved', 'This name is reserved, please choose another one.');
        if (slugState === 'taken') return fail('username', 'already_taken', 'This link is already taken.');
        if (slugState === 'checking') return;
        return advance();
      case 'name':
        if (formData.fullName.trim().length < 2) return fail('full_name', 'too_short', 'Please enter your full name.');
        return advance();
      case 'credentials': {
        if (!formData.email) return fail('email', 'required', 'Email is required.');
        if (!emailOk(formData.email)) return fail('email', 'invalid_format', 'Please enter a valid email address.');
        const pw = validatePassword(formData.password);
        if (!pw.valid) return fail('password', passwordErrorType(formData.password), pw.errors[0]);
        setBusy(true);
        try {
          if (await createAccount()) advance();
        } finally {
          setBusy(false);
        }
        return;
      }
      case 'phone': {
        const digits = nationalDigits(formData.phone);
        if (!digits) return skipPhone();
        if (digits.length < 6) return fail('phone', 'too_short', 'This number looks too short. Enter it without the country code.');
        setBusy(true);
        try {
          // Same place as before (auth user metadata.phone), written now that the account exists.
          const { error: phoneError } = supabase ? await supabase.auth.updateUser({ data: { phone: formData.phone } }) : { error: null };
          if (phoneError) {
            track('onboarding_backend_error', { step: 'phone', operation: 'phone_update', error_type: 'unknown' });
          }
        } finally {
          setBusy(false);
        }
        return advance({ skipped: false });
      }
      case 'start_trial':
        setBusy(true);
        try { await beginTrial(); } finally { setBusy(false); }
    }
  };

  const skipPhone = () => advance({ skipped: true });

  const nextLabel =
    name === 'credentials' ? (busy ? 'Creating your account...' : 'Create my account')
    : name === 'start_trial' ? (busy ? 'Starting...' : trialEligible ? 'Start my free trial' : 'Continue to payment')
    : busy ? 'Saving...' : 'Next';
  const nextDisabled =
    busy ||
    (name === 'claim_link' && (formData.username.length < 3 || slugState === 'checking' || slugState === 'taken' || slugState === 'reserved'));
  // No way back into screens whose data is already saved on the account
  const showBack = !busy && !(resumed && name === 'start_trial') && !(accountCreated && name === 'phone');

  if (booting) {
    return (
      <div className="min-h-[100dvh] bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#F52B8C] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col">
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col px-4">
        {/* Top: back + progress */}
        <div className="pt-2">
          <div className="flex h-11 items-center">
            {showBack && (
              <button type="button" onClick={back} className="-ml-2 flex h-11 items-center gap-1.5 px-2 text-[15px] font-semibold text-gray-600 hover:text-gray-900">
                <span aria-hidden="true">←</span> Back
              </button>
            )}
          </div>
          <div className="mt-1 flex gap-1.5" role="progressbar" aria-valuemin={1} aria-valuemax={STEPS.length} aria-valuenow={step + 1} aria-label={`Step ${step + 1} of ${STEPS.length}`}>
            {STEPS.map((s, i) => (
              <span key={s} className="h-1 flex-1 rounded-full transition-colors duration-300" style={{ backgroundColor: i <= step ? PINK : '#EDEDED' }} />
            ))}
          </div>
        </div>

        <form
          className="flex-1 flex flex-col"
          onSubmit={(e) => { e.preventDefault(); void onNext(); }}
          noValidate
        >
          <div className="flex-1 pt-8 pb-6">
            {name === 'claim_link' && <StepLink formData={formData} set={set} state={slugState} />}
            {name === 'name' && <StepFullName formData={formData} set={set} />}
            {name === 'credentials' && <StepCredentials formData={formData} set={set} />}
            {name === 'phone' && <StepPhone formData={formData} set={set} />}
            {name === 'start_trial' && (
              <StepTrial
                formData={formData}
                set={set}
                eligible={trialEligible}
                termsNudge={termsNudge}
                clearNudge={() => setTermsNudge(false)}
              />
            )}
            {error && (
              <p role="alert" className="mt-4 rounded-xl bg-[#FDECEC] px-3 py-2.5 text-[13px] font-medium text-[#B42318]">
                {error}
              </p>
            )}
          </div>

          {/* Bottom actions */}
          <div className="sticky bottom-0 bg-white pb-4 pt-2" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
            <button
              type="submit"
              disabled={nextDisabled}
              className="h-14 w-full rounded-full text-[16px] font-bold text-white transition active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#E0167A] bg-[#F52B8C]"
            >
              {nextLabel}
            </button>
            {name === 'phone' && (
              <button type="button" onClick={skipPhone} disabled={busy} className="mt-1 h-11 w-full text-[15px] font-semibold disabled:opacity-50" style={{ color: PINK }}>
                Skip
              </button>
            )}
            {name === 'start_trial' && resumed && (
              <button type="button" onClick={() => navigate('/dashboard')} disabled={busy} className="mt-1 h-11 w-full text-[15px] font-semibold text-gray-500 disabled:opacity-50">
                Not now
              </button>
            )}
            {name === 'claim_link' && (
              <p className="mt-3 text-center text-[13px] text-gray-600">
                Have an account?{' '}
                <Link to="/login" className="font-semibold text-[#F52B8C]">Log in</Link>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Pieces ───────────────────────────────────────────────────────────────────

function Heading({ title, sub }: { title: string; sub?: ReactNode }) {
  return (
    <div className="mb-7">
      <h1 className="text-[28px] font-extrabold leading-[1.15] tracking-tight text-[#1A1A1A]">{title}</h1>
      {sub && <p className="mt-2 text-[15px] leading-snug text-gray-500">{sub}</p>}
    </div>
  );
}

function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block">
        <span className="mb-1.5 block text-[13px] font-semibold text-gray-700">{label}</span>
        {children}
      </label>
      {hint}
    </div>
  );
}

const inputCls =
  'h-14 w-full rounded-2xl border-2 border-gray-200 bg-white px-4 text-[16px] text-[#1A1A1A] outline-none transition placeholder:text-gray-400 focus:border-[#F52B8C]';

interface StepProps {
  formData: FormData;
  set: (patch: Partial<FormData>) => void;
}

const CheckIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

// ─── Screen 1: claim your link ────────────────────────────────────────────────

function StepLink({ formData, set, state }: StepProps & { state: SlugState }) {
  const msg =
    state === 'checking' ? { t: 'Checking...', c: 'text-gray-500' }
    : state === 'free' ? { t: `Available: getnelsy.com/${formData.username}`, c: 'text-[#11733F]' }
    : state === 'taken' ? { t: 'Already taken, try another one', c: 'text-[#B42318]' }
    : state === 'reserved' ? { t: 'This name is reserved, please choose another one', c: 'text-[#B42318]' }
    : null;
  const border = state === 'free' ? 'border-green-500' : state === 'taken' || state === 'reserved' ? 'border-red-500' : 'border-gray-200 focus-within:border-[#F52B8C]';
  return (
    <>
      <Heading title="Claim your link" sub="This is the link you put in your bio. Clients book you here." />
      <div className={`flex h-14 items-center rounded-2xl border-2 bg-white pl-4 pr-3 transition ${border}`}>
        <span className="shrink-0 text-[16px] font-medium text-gray-400 select-none">getnelsy.com/</span>
        <input
          aria-label="Your link"
          autoFocus
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          value={formData.username}
          onChange={(e) => set({ username: e.target.value.toLowerCase().replace(/\s/g, '-').replace(/[^a-z0-9-_]/g, '') })}
          placeholder="yourname"
          className="min-w-0 flex-1 bg-transparent text-[16px] font-semibold text-[#1A1A1A] outline-none placeholder:font-normal placeholder:text-gray-400"
        />
        {state === 'checking' && (
          <svg className="animate-spin h-4 w-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {state === 'free' && <CheckIcon className="h-5 w-5 shrink-0 text-[#11733F]" />}
      </div>
      {msg && <p className={`mt-2 text-[13px] font-medium ${msg.c}`} aria-live="polite">{msg.t}</p>}
    </>
  );
}

// ─── Screen 2: name ───────────────────────────────────────────────────────────

function StepFullName({ formData, set }: StepProps) {
  return (
    <>
      <Heading title="What's your name?" sub="It shows on your page so clients know who they book." />
      <Field label="Full name">
        <input
          className={inputCls}
          autoFocus
          autoComplete="name"
          value={formData.fullName}
          onChange={(e) => set({ fullName: e.target.value })}
          placeholder="Your name"
        />
      </Field>
    </>
  );
}

// ─── Screen 3: email + password (creates the account) ─────────────────────────

function StepCredentials({ formData, set }: StepProps) {
  const [show, setShow] = useState(false);
  return (
    <>
      <Heading title="Create your login" sub="You will use it on getnelsy.com and in the app." />
      <Field label="Email">
        <input
          className={inputCls}
          type="email"
          inputMode="email"
          autoFocus
          autoComplete="email"
          autoCapitalize="none"
          value={formData.email}
          onChange={(e) => set({ email: e.target.value.trim() })}
          placeholder="you@example.com"
        />
      </Field>
      <Field
        label="Password"
        hint={
          <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5" aria-live="polite">
            {PASSWORD_RULES.map((r) => {
              const ok = r.test(formData.password);
              return (
                <li key={r.label} className={`flex items-center gap-1.5 text-[12.5px] ${ok ? 'text-[#11733F]' : 'text-gray-400'}`}>
                  <span className={`flex h-4 w-4 items-center justify-center rounded-full ${ok ? 'bg-[#11733F] text-white' : 'border border-gray-300'}`}>
                    {ok && <CheckIcon className="h-3 w-3" />}
                  </span>
                  {r.label}
                </li>
              );
            })}
          </ul>
        }
      >
        <div className="relative">
          <input
            className={`${inputCls} pr-20`}
            type={show ? 'text' : 'password'}
            autoComplete="new-password"
            value={formData.password}
            onChange={(e) => set({ password: e.target.value })}
            placeholder="Create a password"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-1 top-1/2 flex h-11 -translate-y-1/2 items-center px-3 text-[13px] font-semibold text-gray-500 hover:text-gray-800"
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? 'Hide' : 'Show'}
          </button>
        </div>
      </Field>
      <p className="mt-2 text-[12px] leading-relaxed text-gray-500">
        By continuing, you agree to our{' '}
        <a href="/terms" className="underline" style={{ color: PINK }}>Terms</a> and{' '}
        <a href="/privacy" className="underline" style={{ color: PINK }}>Privacy Policy</a>.
        Protected under <span className="font-semibold">GDPR</span>.
      </p>
    </>
  );
}

// ─── Screen 4: phone (optional) ───────────────────────────────────────────────

function StepPhone({ formData, set }: StepProps) {
  const [countryCode, setCountryCode] = useState(() => formData.phone.match(/^\+\d+/)?.[0] ?? defaultDialCode());
  const digits = formData.phone.replace(/^\+\d+\s?/, '');
  return (
    <>
      <Heading title="Add your phone number" sub="Optional. We only use it for account security, never on your page." />
      <Field label="Phone">
        <div className="flex gap-2">
          <CountryCodePicker
            value={countryCode}
            onChange={(code) => {
              setCountryCode(code);
              set({ phone: digits ? `${code} ${digits}` : '' });
            }}
          />
          <input
            className={`${inputCls} min-w-0 flex-1`}
            type="tel"
            inputMode="tel"
            autoFocus
            autoComplete="tel-national"
            value={digits}
            onChange={(e) => {
              const d = e.target.value.replace(/\D/g, '');
              set({ phone: d ? `${countryCode} ${d}` : '' });
            }}
            placeholder="Phone number"
          />
        </div>
      </Field>
    </>
  );
}

// ─── Screen 5: start the free trial (no card) ─────────────────────────────────

function StepTrial({ formData, set, eligible, termsNudge, clearNudge }: StepProps & { eligible: boolean; termsNudge: boolean; clearNudge: () => void }) {
  const [endLabel] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + TRIAL_DAYS);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });
  const yearly = formData.plan === 'yearly';
  const price = yearly ? `$${SELECTED_PLAN.yearlyTotal}/year` : `$${SELECTED_PLAN.monthly}/month`;

  return (
    <>
      {eligible ? (
        <Heading
          title="Start your free trial"
          sub={<>No card needed. {TRIAL_DAYS} days free, then {price}. We'll remind you 3 days before.</>}
        />
      ) : (
        <Heading
          title="Reactivate your page"
          sub={<>Your free trial was already used on this account. {price}, starting today. Cancel anytime.</>}
        />
      )}

      <div className="rounded-3xl border-2 p-5" style={{ borderColor: PINK, boxShadow: '0 10px 30px rgba(245,43,140,0.12)' }}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[18px] font-extrabold text-[#1A1A1A]">{SELECTED_PLAN.name}</p>
            <p className="mt-0.5 text-[13px] text-gray-500">{SELECTED_PLAN.tagline}</p>
          </div>
          {eligible && (
            <span className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold text-white" style={{ backgroundColor: PINK }}>
              {TRIAL_DAYS} days free
            </span>
          )}
        </div>

        {/* Billing interval */}
        <div className="mt-4 grid grid-cols-2 gap-1 rounded-full bg-gray-100 p-1" role="radiogroup" aria-label="Billing">
          {(['monthly', 'yearly'] as const).map((p) => (
            <button
              key={p}
              type="button"
              role="radio"
              aria-checked={formData.plan === p}
              onClick={() => set({ plan: p })}
              className={`h-9 rounded-full text-[13px] font-bold transition ${formData.plan === p ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-gray-500'}`}
            >
              {p === 'monthly' ? 'Monthly' : `Yearly, save ${YEARLY_SAVING_PCT}%`}
            </button>
          ))}
        </div>

        <p className="mt-4 text-[14px] text-gray-600">
          {eligible ? (
            <><span className="text-[26px] font-extrabold text-[#1A1A1A]">$0</span> for {TRIAL_DAYS} days, then {yearly ? `$${SELECTED_PLAN.yearly}/mo billed yearly` : `$${SELECTED_PLAN.monthly}/mo`}</>
          ) : (
            <><span className="text-[26px] font-extrabold text-[#1A1A1A]">${yearly ? SELECTED_PLAN.yearlyTotal : SELECTED_PLAN.monthly}</span> {yearly ? 'per year' : 'per month'}</>
          )}
        </p>
        <ul className="mt-4 space-y-2">
          {SELECTED_PLAN.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-[14px] text-[#1A1A1A]">
              <span className="mt-0.5 shrink-0" style={{ color: PINK }}><CheckIcon /></span>
              {h}
            </li>
          ))}
        </ul>
      </div>

      {eligible && (
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3.5">
          <span className="text-[14px] font-semibold text-gray-600">Due today</span>
          <span className="text-[20px] font-extrabold" style={{ color: PINK }}>$0</span>
        </div>
      )}

      {eligible && (
        <p className="mt-3 text-[12.5px] leading-relaxed text-gray-500">
          Your page goes live today. Add a card anytime before {endLabel} to keep it live. Without a card, it simply pauses.
        </p>
      )}

      {/* Terms */}
      <label id="onboarding-terms" className={`mt-4 flex items-start gap-2 cursor-pointer rounded-xl transition ${termsNudge && !formData.agreedToTerms ? 'p-3 bg-red-50 ring-2 ring-red-300' : ''}`}>
        <input
          type="checkbox"
          checked={formData.agreedToTerms}
          onChange={(e) => { set({ agreedToTerms: e.target.checked }); if (e.target.checked) clearNudge(); }}
          className="mt-0.5 w-4 h-4 rounded border-2 border-gray-300 accent-[#F52B8C]"
        />
        <span className="text-xs text-gray-600">
          I agree to the{' '}
          <a href="/terms" className="underline" style={{ color: PINK }}>Terms</a>{' '}
          and{' '}
          <a href="/privacy" className="underline" style={{ color: PINK }}>Privacy Policy</a>.
          GDPR compliant.
          {termsNudge && !formData.agreedToTerms && (
            <span className="block mt-1 font-semibold text-red-600">
              {eligible ? 'Tick this box to start your free trial.' : 'Tick this box to continue.'}
            </span>
          )}
        </span>
      </label>
    </>
  );
}

// ─── Phone helpers (country picker, default dial code) and password rules ────

const COUNTRY_CODES = [
  { code: '+93', flag: '🇦🇫', name: 'Afghanistan' },
  { code: '+355', flag: '🇦🇱', name: 'Albania' },
  { code: '+213', flag: '🇩🇿', name: 'Algeria' },
  { code: '+376', flag: '🇦🇩', name: 'Andorra' },
  { code: '+244', flag: '🇦🇴', name: 'Angola' },
  { code: '+54', flag: '🇦🇷', name: 'Argentina' },
  { code: '+374', flag: '🇦🇲', name: 'Armenia' },
  { code: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: '+43', flag: '🇦🇹', name: 'Austria' },
  { code: '+994', flag: '🇦🇿', name: 'Azerbaijan' },
  { code: '+973', flag: '🇧🇭', name: 'Bahrain' },
  { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
  { code: '+32', flag: '🇧🇪', name: 'Belgium' },
  { code: '+501', flag: '🇧🇿', name: 'Belize' },
  { code: '+229', flag: '🇧🇯', name: 'Benin' },
  { code: '+975', flag: '🇧🇹', name: 'Bhutan' },
  { code: '+591', flag: '🇧🇴', name: 'Bolivia' },
  { code: '+387', flag: '🇧🇦', name: 'Bosnia' },
  { code: '+267', flag: '🇧🇼', name: 'Botswana' },
  { code: '+55', flag: '🇧🇷', name: 'Brazil' },
  { code: '+673', flag: '🇧🇳', name: 'Brunei' },
  { code: '+359', flag: '🇧🇬', name: 'Bulgaria' },
  { code: '+226', flag: '🇧🇫', name: 'Burkina Faso' },
  { code: '+257', flag: '🇧🇮', name: 'Burundi' },
  { code: '+855', flag: '🇰🇭', name: 'Cambodia' },
  { code: '+237', flag: '🇨🇲', name: 'Cameroon' },
  { code: '+238', flag: '🇨🇻', name: 'Cape Verde' },
  { code: '+236', flag: '🇨🇫', name: 'Central African Rep.' },
  { code: '+235', flag: '🇹🇩', name: 'Chad' },
  { code: '+56', flag: '🇨🇱', name: 'Chile' },
  { code: '+86', flag: '🇨🇳', name: 'China' },
  { code: '+57', flag: '🇨🇴', name: 'Colombia' },
  { code: '+269', flag: '🇰🇲', name: 'Comoros' },
  { code: '+242', flag: '🇨🇬', name: 'Congo' },
  { code: '+506', flag: '🇨🇷', name: 'Costa Rica' },
  { code: '+385', flag: '🇭🇷', name: 'Croatia' },
  { code: '+53', flag: '🇨🇺', name: 'Cuba' },
  { code: '+357', flag: '🇨🇾', name: 'Cyprus' },
  { code: '+420', flag: '🇨🇿', name: 'Czech Republic' },
  { code: '+45', flag: '🇩🇰', name: 'Denmark' },
  { code: '+253', flag: '🇩🇯', name: 'Djibouti' },
  { code: '+1809', flag: '🇩🇴', name: 'Dominican Republic' },
  { code: '+593', flag: '🇪🇨', name: 'Ecuador' },
  { code: '+20', flag: '🇪🇬', name: 'Egypt' },
  { code: '+503', flag: '🇸🇻', name: 'El Salvador' },
  { code: '+240', flag: '🇬🇶', name: 'Equatorial Guinea' },
  { code: '+291', flag: '🇪🇷', name: 'Eritrea' },
  { code: '+372', flag: '🇪🇪', name: 'Estonia' },
  { code: '+251', flag: '🇪🇹', name: 'Ethiopia' },
  { code: '+679', flag: '🇫🇯', name: 'Fiji' },
  { code: '+358', flag: '🇫🇮', name: 'Finland' },
  { code: '+33', flag: '🇫🇷', name: 'France' },
  { code: '+241', flag: '🇬🇦', name: 'Gabon' },
  { code: '+220', flag: '🇬🇲', name: 'Gambia' },
  { code: '+995', flag: '🇬🇪', name: 'Georgia' },
  { code: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: '+233', flag: '🇬🇭', name: 'Ghana' },
  { code: '+30', flag: '🇬🇷', name: 'Greece' },
  { code: '+502', flag: '🇬🇹', name: 'Guatemala' },
  { code: '+224', flag: '🇬🇳', name: 'Guinea' },
  { code: '+245', flag: '🇬🇼', name: 'Guinea-Bissau' },
  { code: '+592', flag: '🇬🇾', name: 'Guyana' },
  { code: '+509', flag: '🇭🇹', name: 'Haiti' },
  { code: '+504', flag: '🇭🇳', name: 'Honduras' },
  { code: '+852', flag: '🇭🇰', name: 'Hong Kong' },
  { code: '+36', flag: '🇭🇺', name: 'Hungary' },
  { code: '+354', flag: '🇮🇸', name: 'Iceland' },
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+62', flag: '🇮🇩', name: 'Indonesia' },
  { code: '+98', flag: '🇮🇷', name: 'Iran' },
  { code: '+964', flag: '🇮🇶', name: 'Iraq' },
  { code: '+353', flag: '🇮🇪', name: 'Ireland' },
  { code: '+972', flag: '🇮🇱', name: 'Israel' },
  { code: '+39', flag: '🇮🇹', name: 'Italy' },
  { code: '+225', flag: '🇨🇮', name: 'Ivory Coast' },
  { code: '+1876', flag: '🇯🇲', name: 'Jamaica' },
  { code: '+81', flag: '🇯🇵', name: 'Japan' },
  { code: '+962', flag: '🇯🇴', name: 'Jordan' },
  { code: '+7', flag: '🇰🇿', name: 'Kazakhstan' },
  { code: '+254', flag: '🇰🇪', name: 'Kenya' },
  { code: '+965', flag: '🇰🇼', name: 'Kuwait' },
  { code: '+996', flag: '🇰🇬', name: 'Kyrgyzstan' },
  { code: '+856', flag: '🇱🇦', name: 'Laos' },
  { code: '+371', flag: '🇱🇻', name: 'Latvia' },
  { code: '+961', flag: '🇱🇧', name: 'Lebanon' },
  { code: '+266', flag: '🇱🇸', name: 'Lesotho' },
  { code: '+231', flag: '🇱🇷', name: 'Liberia' },
  { code: '+218', flag: '🇱🇾', name: 'Libya' },
  { code: '+423', flag: '🇱🇮', name: 'Liechtenstein' },
  { code: '+370', flag: '🇱🇹', name: 'Lithuania' },
  { code: '+352', flag: '🇱🇺', name: 'Luxembourg' },
  { code: '+853', flag: '🇲🇴', name: 'Macao' },
  { code: '+261', flag: '🇲🇬', name: 'Madagascar' },
  { code: '+265', flag: '🇲🇼', name: 'Malawi' },
  { code: '+60', flag: '🇲🇾', name: 'Malaysia' },
  { code: '+960', flag: '🇲🇻', name: 'Maldives' },
  { code: '+223', flag: '🇲🇱', name: 'Mali' },
  { code: '+356', flag: '🇲🇹', name: 'Malta' },
  { code: '+222', flag: '🇲🇷', name: 'Mauritania' },
  { code: '+230', flag: '🇲🇺', name: 'Mauritius' },
  { code: '+52', flag: '🇲🇽', name: 'Mexico' },
  { code: '+373', flag: '🇲🇩', name: 'Moldova' },
  { code: '+377', flag: '🇲🇨', name: 'Monaco' },
  { code: '+976', flag: '🇲🇳', name: 'Mongolia' },
  { code: '+382', flag: '🇲🇪', name: 'Montenegro' },
  { code: '+212', flag: '🇲🇦', name: 'Morocco' },
  { code: '+258', flag: '🇲🇿', name: 'Mozambique' },
  { code: '+95', flag: '🇲🇲', name: 'Myanmar' },
  { code: '+264', flag: '🇳🇦', name: 'Namibia' },
  { code: '+977', flag: '🇳🇵', name: 'Nepal' },
  { code: '+31', flag: '🇳🇱', name: 'Netherlands' },
  { code: '+64', flag: '🇳🇿', name: 'New Zealand' },
  { code: '+505', flag: '🇳🇮', name: 'Nicaragua' },
  { code: '+227', flag: '🇳🇪', name: 'Niger' },
  { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
  { code: '+389', flag: '🇲🇰', name: 'North Macedonia' },
  { code: '+47', flag: '🇳🇴', name: 'Norway' },
  { code: '+968', flag: '🇴🇲', name: 'Oman' },
  { code: '+92', flag: '🇵🇰', name: 'Pakistan' },
  { code: '+507', flag: '🇵🇦', name: 'Panama' },
  { code: '+675', flag: '🇵🇬', name: 'Papua New Guinea' },
  { code: '+595', flag: '🇵🇾', name: 'Paraguay' },
  { code: '+51', flag: '🇵🇪', name: 'Peru' },
  { code: '+63', flag: '🇵🇭', name: 'Philippines' },
  { code: '+48', flag: '🇵🇱', name: 'Poland' },
  { code: '+351', flag: '🇵🇹', name: 'Portugal' },
  { code: '+974', flag: '🇶🇦', name: 'Qatar' },
  { code: '+40', flag: '🇷🇴', name: 'Romania' },
  { code: '+7', flag: '🇷🇺', name: 'Russia' },
  { code: '+250', flag: '🇷🇼', name: 'Rwanda' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+221', flag: '🇸🇳', name: 'Senegal' },
  { code: '+381', flag: '🇷🇸', name: 'Serbia' },
  { code: '+232', flag: '🇸🇱', name: 'Sierra Leone' },
  { code: '+65', flag: '🇸🇬', name: 'Singapore' },
  { code: '+421', flag: '🇸🇰', name: 'Slovakia' },
  { code: '+386', flag: '🇸🇮', name: 'Slovenia' },
  { code: '+252', flag: '🇸🇴', name: 'Somalia' },
  { code: '+27', flag: '🇿🇦', name: 'South Africa' },
  { code: '+82', flag: '🇰🇷', name: 'South Korea' },
  { code: '+211', flag: '🇸🇸', name: 'South Sudan' },
  { code: '+34', flag: '🇪🇸', name: 'Spain' },
  { code: '+94', flag: '🇱🇰', name: 'Sri Lanka' },
  { code: '+249', flag: '🇸🇩', name: 'Sudan' },
  { code: '+597', flag: '🇸🇷', name: 'Suriname' },
  { code: '+268', flag: '🇸🇿', name: 'Swaziland' },
  { code: '+46', flag: '🇸🇪', name: 'Sweden' },
  { code: '+41', flag: '🇨🇭', name: 'Switzerland' },
  { code: '+963', flag: '🇸🇾', name: 'Syria' },
  { code: '+886', flag: '🇹🇼', name: 'Taiwan' },
  { code: '+992', flag: '🇹🇯', name: 'Tajikistan' },
  { code: '+255', flag: '🇹🇿', name: 'Tanzania' },
  { code: '+66', flag: '🇹🇭', name: 'Thailand' },
  { code: '+228', flag: '🇹🇬', name: 'Togo' },
  { code: '+216', flag: '🇹🇳', name: 'Tunisia' },
  { code: '+90', flag: '🇹🇷', name: 'Turkey' },
  { code: '+993', flag: '🇹🇲', name: 'Turkmenistan' },
  { code: '+256', flag: '🇺🇬', name: 'Uganda' },
  { code: '+380', flag: '🇺🇦', name: 'Ukraine' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+1', flag: '🇺🇸', name: 'United States' },
  { code: '+1', flag: '🇨🇦', name: 'Canada' },
  { code: '+598', flag: '🇺🇾', name: 'Uruguay' },
  { code: '+998', flag: '🇺🇿', name: 'Uzbekistan' },
  { code: '+58', flag: '🇻🇪', name: 'Venezuela' },
  { code: '+84', flag: '🇻🇳', name: 'Vietnam' },
  { code: '+967', flag: '🇾🇪', name: 'Yemen' },
  { code: '+260', flag: '🇿🇲', name: 'Zambia' },
  { code: '+263', flag: '🇿🇼', name: 'Zimbabwe' },
];

function CountryCodePicker({ value, onChange }: { value: string; onChange: (code: string) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = COUNTRY_CODES.find((c) => c.code === value) ?? COUNTRY_CODES[0];
  const filtered = COUNTRY_CODES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.includes(search)
  );

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50);
    else setSearch('');
  }, [open]);

  return (
    <div ref={ref} className="relative flex-shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3 py-4 text-base border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#F52B8C] transition bg-white whitespace-nowrap"
      >
        <span>{selected.flag}</span>
        <span className="font-medium">{selected.code}</span>
        <span className="text-gray-400 text-xs">▾</span>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 z-50 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden" style={{ width: 260 }}>
          {/* Search */}
          <div className="p-2 border-b border-gray-100">
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country..."
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#F52B8C] transition"
            />
          </div>
          {/* List */}
          <div className="overflow-y-auto" style={{ maxHeight: 220 }}>
            {filtered.length === 0 ? (
              <p className="text-center text-gray-400 text-sm py-4">No results</p>
            ) : (
              filtered.map((c) => (
                <button
                  key={`${c.name}-${c.code}`}
                  type="button"
                  onClick={() => { onChange(c.code); setOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition text-left ${c.code === value && c.name === selected.name ? 'bg-[#F52B8C]/5 text-[#F52B8C] font-semibold' : 'text-gray-700'}`}
                >
                  <span className="text-base flex-shrink-0">{c.flag}</span>
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="text-gray-400 text-xs flex-shrink-0">{c.code}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const DIAL_BY_REGION: Record<string, string> = {
  US: '+1', CA: '+1', GB: '+44', IE: '+353', AU: '+61', NZ: '+64', FR: '+33', BE: '+32', CH: '+41',
  DE: '+49', ES: '+34', IT: '+39', NL: '+31', PT: '+351', LU: '+352', MA: '+212', DZ: '+213', TN: '+216',
};

function defaultDialCode(): string {
  try {
    for (const lang of navigator.languages ?? [navigator.language]) {
      const region = lang.split('-')[1]?.toUpperCase();
      if (region && DIAL_BY_REGION[region]) return DIAL_BY_REGION[region];
    }
    if (navigator.language?.toLowerCase().startsWith('fr')) return '+33';
  } catch { /* SSR / prerender */ }
  return '+1';
}

const PASSWORD_RULES: { label: string; test: (p: string) => boolean }[] = [
  { label: '8+ characters', test: (p) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { label: 'One lowercase letter', test: (p) => /[a-z]/.test(p) },
  { label: 'One number', test: (p) => /[0-9]/.test(p) },
];
