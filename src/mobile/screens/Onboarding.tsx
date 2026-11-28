import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Check, ChevronDown, LockKeyhole, LockKeyholeOpen, Mail, Search, Star, User, X } from 'lucide-react';
import { saveProfileTimezone } from '@/lib/timezone';
import { supabase } from '@/lib/supabase';
import { isReservedSlug } from '@/lib/reservedSlugs';
import { track, identify } from '@/lib/analytics';
import { AVAILABLE_PLANS, PLANS, TRIAL_DAYS, planKey } from '@/lib/plans';
import type { PlanTier } from '@/lib/plans';
import { updateProfile } from '@/lib/supabase-queries';
import { claimReferral } from '@/lib/referrals';
import { validatePassword } from '@/utils/validation';
import { Logo } from '../components/Logo';
import { FAINT, FIELD, MUTED, PillInput, PrimaryPill, TINT, Title } from '../components/onboardingUi';
import { COUNTRY_CODES, PASSWORD_RULES, defaultDialCode } from '../lib/countries';
import { INK, PINK, WEB } from '../lib/constants';
import { openExternal } from '../lib/native';
import { clearDemoFlag, readDemoFlag } from '../lib/demo';
import { planLinksAllowed } from '../lib/storePolicy';

// Native signup, laid out like the Stan app onboarding:
//   signup (username + email + password, account created here) → details (name + phone)
//   → 4 questions (Step 1/5 to 4/5) → referral (Step 5/5) → how your trial works → Home.
// Account creation mirrors src/pages/Onboarding.tsx: same supabase.auth.signUp metadata (the DB trigger
// creates the profile), same profile wait, same sign-in. The trial starts server side without a card
// (start-trial); nothing is sold in the app (see docs/mobile/app-store-checklist.md).

const STEPS = ['signup', 'details', 'categories', 'booking_method', 'clients_per_week', 'first_goal', 'referral', 'trial'] as const;
type StepName = (typeof STEPS)[number];
type QuestionStep = 'categories' | 'booking_method' | 'clients_per_week' | 'first_goal';

type Choice = { id: string; emoji: string; label: string };

/** Step 1/5. `specialty` replaces the old "craft" screen: the first pick fills profiles.specialty. */
const CATEGORIES: (Choice & { specialty: string })[] = [
  { id: 'nails', emoji: '💅', label: 'Nails', specialty: 'Nail technician' },
  { id: 'nail_art', emoji: '🎨', label: 'Nail art', specialty: 'Nail artist' },
  { id: 'gelx', emoji: '✨', label: 'Gel-X & extensions', specialty: 'Nail technician' },
  { id: 'lashes', emoji: '👁️', label: 'Lashes', specialty: 'Lash artist' },
  { id: 'brows', emoji: '🪮', label: 'Brows', specialty: 'Brow artist' },
  { id: 'makeup', emoji: '💄', label: 'Makeup', specialty: 'Makeup artist' },
  { id: 'hair', emoji: '💇', label: 'Hair', specialty: 'Hair stylist' },
  { id: 'skin', emoji: '🧴', label: 'Skin & esthetics', specialty: 'Esthetician' },
  { id: 'nail_education', emoji: '📚', label: 'Nail education', specialty: 'Nail educator' },
  { id: 'beauty_content', emoji: '🎥', label: 'Beauty content', specialty: '' },
  { id: 'salon_owner', emoji: '🏪', label: 'Salon owner', specialty: 'Salon owner' },
  { id: 'other', emoji: '➕', label: 'Other', specialty: '' },
];

const QUESTIONS: Record<Exclude<QuestionStep, 'categories'>, { title: ReactNode; step: string; choices: Choice[] }> = {
  booking_method: {
    title: <>Great! How do clients<br />book you today?</>,
    step: 'Step 2/5',
    choices: [
      { id: 'dms_texts', emoji: '💬', label: 'DMs and texts' },
      { id: 'notebook', emoji: '📒', label: 'Notebook or notes app' },
      { id: 'other_app', emoji: '📱', label: 'Another booking app' },
      { id: 'starting_out', emoji: '🐣', label: 'Just starting out' },
    ],
  },
  clients_per_week: {
    title: <>How many clients do<br />you see per week?</>,
    step: 'Step 3/5',
    choices: [
      { id: '0_5', emoji: '🌱', label: '0 to 5' },
      { id: '6_15', emoji: '🙌', label: '6 to 15' },
      { id: '16_30', emoji: '🔥', label: '16 to 30' },
      { id: '30_plus', emoji: '🚀', label: '30+' },
    ],
  },
  first_goal: {
    title: <>What do you want Nelsy<br />to help with first?</>,
    step: 'Step 4/5',
    choices: [
      { id: 'online_booking', emoji: '📅', label: 'Online booking' },
      { id: 'deposits_no_shows', emoji: '💳', label: 'Deposits and no-shows' },
      { id: 'get_paid_online', emoji: '💰', label: 'Get paid online' },
      { id: 'sell_guides', emoji: '📚', label: 'Sell guides and courses' },
    ],
  },
};

interface Form {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phone: string; // "+33 612345678", same shape as the website
  categories: string[];
  booking_method: string;
  clients_per_week: string;
  first_goal: string;
  referredBy: string;
}

const EMPTY: Form = {
  username: '',
  email: '',
  password: '',
  fullName: '',
  phone: '',
  categories: [],
  booking_method: '',
  clients_per_week: '',
  first_goal: '',
  referredBy: '',
};
// Screens after the first one show the example account; answers stay empty like a fresh screen.
const DEMO_FORM: Form = { ...EMPTY, username: 'inesnails', email: 'example@getnelsy.com', password: 'Example123' };

const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const cleanHandle = (h: string) =>
  h.trim().replace(/^https?:\/\/(www\.)?(instagram\.com|tiktok\.com|getnelsy\.com)\/@?/i, '').replace(/^@/, '').replace(/\/.*$/, '').slice(0, 60);

type SlugState = 'idle' | 'checking' | 'free' | 'taken' | 'reserved';

export default function Onboarding() {
  const navigate = useNavigate();
  const demo = useMemo(() => readDemoFlag(), []);
  const initialStep = useMemo(() => {
    if (!demo) return 0;
    const n = Number(new URLSearchParams(window.location.hash.split('?')[1] ?? '').get('step'));
    return n >= 1 && n <= STEPS.length ? n - 1 : 0;
  }, [demo]);
  const [step, setStep] = useState(initialStep);
  const [form, setForm] = useState<Form>(() => (demo && initialStep > 0 ? DEMO_FORM : EMPTY));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);
  const [trialFailed, setTrialFailed] = useState(false);
  const viewed = useRef(new Set<number>());
  const planLinks = useMemo(() => planLinksAllowed(), []);

  const name: StepName = STEPS[step];
  const set = (patch: Partial<Form>) => {
    setForm((f) => ({ ...f, ...patch }));
    setError('');
  };

  useEffect(() => {
    track('app_onboarding_started');
  }, []);
  useEffect(() => {
    if (viewed.current.has(step)) return;
    viewed.current.add(step);
    track('app_onboarding_step_viewed', { step: STEPS[step], step_number: step + 1 });
  }, [step]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const fail = (field: string, error_type: string, message: string) => {
    track('app_onboarding_validation_error', { step: name, field, error_type });
    setError(message);
  };
  const advance = () => {
    track('app_onboarding_step_completed', { step: name, step_number: step + 1 });
    setError('');
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => {
    setError('');
    if (step === 0) navigate('/welcome');
    else setStep(step - 1);
  };
  const backendError = (operation: string, e: unknown) => {
    const msg = e instanceof Error ? e.message : String(e);
    track('app_onboarding_backend_error', { step: name, operation: msg.match(/^\[([^\]]+)\]/)?.[1] ?? operation });
    setError(msg.replace(/^\[[^\]]+\]\s*/, '') || 'Something went wrong. Please try again.');
  };

  // ── Username (page link) availability ────────────────────────────────────
  const [slugState, setSlugState] = useState<SlugState>('idle');
  useEffect(() => {
    const slug = form.username;
    if (slug.length < 3) {
      setSlugState('idle');
      return;
    }
    if (isReservedSlug(slug)) {
      setSlugState('reserved');
      return;
    }
    const client = supabase;
    if (demo || !client || slug === createdSlug) {
      setSlugState('free');
      return;
    }
    setSlugState('checking');
    let alive = true;
    const t = setTimeout(async () => {
      // profiles is not readable by anon; the public view exposes slug (same check as the website)
      const { data } = await client.from('public_profiles').select('slug').eq('slug', slug).maybeSingle();
      if (alive) setSlugState(data ? 'taken' : 'free');
    }, 450);
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, [form.username, demo, createdSlug]);

  // ── Account creation (first screen), mirrors the website ─────────────────
  const createAccount = async (): Promise<boolean> => {
    if (demo) return true;
    if (!supabase) {
      setError('Sign up is not available in this build. Please try again later.');
      return false;
    }
    try {
      const { data: existing } = await supabase.auth.getSession();
      const sessionUser = existing.session?.user.id ?? null;
      if (sessionUser) {
        // Came back to this screen after the account exists: only the link can change.
        if (createdSlug && form.username !== createdSlug) {
          const { error: slugError } = await updateProfile(sessionUser, { slug: form.username });
          if (slugError) throw new Error(`[slug] ${slugError.code === '23505' ? 'This link is already taken.' : slugError.message}`);
          setCreatedSlug(form.username);
        }
        setUserId(sessionUser);
        return true;
      }
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        // full_name is a placeholder until "Share your details" (the trigger otherwise writes a French default)
        options: { data: { full_name: form.username, slug: form.username, username: form.username } },
      });
      if (signUpError?.message?.toLowerCase().includes('already registered') || (user && user.identities?.length === 0)) {
        track('app_onboarding_validation_error', { step: 'signup', field: 'email', error_type: 'already_registered' });
        setError('This email already has a Nelsy account. Log in instead.');
        return false;
      }
      if (signUpError) throw new Error(`[signup] ${signUpError.message}`);
      if (!user) throw new Error('[signup] No user returned');
      identify(user.id);
      track('app_onboarding_account_created');

      // The DB trigger creates the profile row; wait for it like the website does.
      let found = false;
      for (let i = 0; i < 6 && !found; i++) {
        await new Promise((r) => setTimeout(r, 500));
        const { data } = await supabase.from('profiles').select('id').eq('id', user.id).maybeSingle();
        found = !!data;
      }
      if (!found) throw new Error('[profile] Profile creation timed out');

      const { error: signInError } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password });
      if (signInError) throw new Error(`[signin] ${signInError.message}`);
      setUserId(user.id);
      setCreatedSlug(form.username);
      // Device timezone: slots, reminders and calendar times all follow profiles.timezone
      await saveProfileTimezone(user.id);
      return true;
    } catch (e) {
      backendError('unknown', e);
      return false;
    }
  };

  const saveDetails = async (): Promise<boolean> => {
    if (demo || !supabase || !userId) return true;
    try {
      const { error: e } = await updateProfile(userId, { full_name: form.fullName.trim(), phone: form.phone });
      if (e) throw new Error(`[details] ${e.message}`);
      // Keep auth metadata in line with the website signup (same keys)
      await supabase.auth.updateUser({ data: { full_name: form.fullName.trim(), phone: form.phone } }).catch(() => undefined);
      return true;
    } catch (e) {
      backendError('details', e);
      return false;
    }
  };

  /** Answers go to profiles.onboarding_answers (migration 20261130_01). Never blocks the flow if the column is missing. */
  const saveAnswers = async (referredBy: string) => {
    const answers = {
      categories: form.categories,
      booking_method: form.booking_method || null,
      clients_per_week: form.clients_per_week || null,
      first_goal: form.first_goal || null,
      referred_by: referredBy || null,
      answered_at: new Date().toISOString(),
      source: 'app',
    };
    if (demo || !supabase || !userId) return;
    const specialty = CATEGORIES.find((c) => c.id === form.categories[0])?.specialty;
    try {
      if (specialty) await updateProfile(userId, { specialty });
    } catch {
      /* non-blocking */
    }
    try {
      const { error: e } = await updateProfile(userId, { onboarding_answers: answers });
      if (e) track('app_onboarding_backend_error', { step: name, operation: 'answers' });
    } catch {
      track('app_onboarding_backend_error', { step: name, operation: 'answers' });
    }
    // Referral program: when the handle is a Nelsy pro (her slug or referral code), she becomes the
    // referrer. Unknown handles, self-referrals and a missing migration are ignored silently.
    if (referredBy && (await claimReferral(referredBy, 'app_handle'))) {
      track('referral_claimed', { source: 'app_handle' });
    }
  };

  // ── Trial (no card, server side) ──────────────────────────────────────────
  const tiers = useMemo(() => AVAILABLE_PLANS.filter((p) => p.tier === 'independent' || p.tier === 'creator').map((p) => p.tier), []);
  const [tier, setTier] = useState<PlanTier>('independent');
  const planParam = tier === 'independent' ? 'monthly' : planKey(tier, 'monthly');

  const startTrial = async () => {
    if (trialFailed) {
      track('app_onboarding_completed', { plan: 'trial_not_started' });
      navigate('/home', { replace: true });
      return;
    }
    if (demo || !supabase) {
      track('app_onboarding_completed', { plan: planParam, demo: true });
      navigate('/home', { replace: true });
      return;
    }
    try {
      const { data, error: fnError } = await supabase.functions.invoke('start-trial', { body: { plan: planParam } });
      if (fnError) throw new Error(`[start_trial] ${fnError.message}`);
      const res = (data ?? {}) as { status?: string; alreadySubscribed?: boolean; checkoutRequired?: boolean; error?: string };
      if (res.error) throw new Error(`[start_trial] ${res.error}`);
      // checkoutRequired = the free trial was already used. The app never opens a payment page.
      const outcome = res.checkoutRequired ? 'trial_already_used' : res.alreadySubscribed ? 'already_subscribed' : res.status ?? 'trialing';
      track('app_onboarding_trial_started', { plan: planParam, outcome });
      track('app_onboarding_completed', { plan: planParam, outcome });
      navigate('/home', { replace: true });
    } catch (e) {
      backendError('start_trial', e);
      setError('We could not start your free trial right now. Your account is ready: continue, and you can start the trial later.');
      setTrialFailed(true);
    }
  };

  const logout = async () => {
    track('app_onboarding_logout', { step: name });
    clearDemoFlag();
    try {
      await supabase?.auth.signOut();
    } catch {
      /* ignore */
    }
    navigate('/welcome', { replace: true });
  };

  const run = async (fn: () => Promise<void>) => {
    if (busy) return;
    setBusy(true);
    try {
      await fn();
    } finally {
      setBusy(false);
    }
  };

  const onNext = () =>
    run(async () => {
      switch (name) {
        case 'signup': {
          if (form.username.length < 3) return fail('username', 'too_short', 'Your username needs at least 3 characters.');
          if (slugState === 'reserved') return fail('username', 'reserved', 'This username is reserved, please choose another one.');
          if (slugState === 'taken') return fail('username', 'already_taken', 'This username is already taken.');
          if (slugState === 'checking') return;
          if (!emailOk(form.email)) return fail('email', 'invalid_format', 'Please enter a valid email address.');
          const pw = validatePassword(form.password);
          if (!pw.valid) return fail('password', 'too_weak', pw.errors[0]);
          if (await createAccount()) advance();
          return;
        }
        case 'details': {
          if (form.fullName.trim().length < 2) return fail('full_name', 'too_short', 'Please enter your full name.');
          const digits = form.phone.replace(/^\+\d+\s?/, '').replace(/\D/g, '');
          if (digits.length < 6)
            return fail('phone', 'too_short', digits ? 'This number looks too short. Enter it without the country code.' : 'Enter your phone number (we only use it for account security).');
          if (await saveDetails()) advance();
          return;
        }
        case 'categories':
          if (!form.categories.length) return fail('categories', 'required', 'Pick at least one category.');
          track('app_onboarding_answer', { question: 'categories', answer: form.categories });
          return advance();
        case 'booking_method':
        case 'clients_per_week':
        case 'first_goal':
          if (!form[name]) return fail(name, 'required', 'Pick the option closest to you.');
          track('app_onboarding_answer', { question: name, answer: form[name] });
          return advance();
        case 'referral': {
          const handle = cleanHandle(form.referredBy);
          track('app_onboarding_answer', { question: 'referred_by', answer: handle ? 'provided' : 'skipped' });
          await saveAnswers(handle);
          return advance();
        }
        case 'trial':
          return startTrial();
      }
    });

  const skipReferral = () =>
    run(async () => {
      set({ referredBy: '' });
      track('app_onboarding_answer', { question: 'referred_by', answer: 'skipped' });
      await saveAnswers('');
      advance();
    });

  const errorBox = error && (
    <p role="alert" className="mt-4 rounded-2xl bg-[#FDECEC] px-4 py-2.5 text-center text-[13px] font-medium text-[#B42318]">
      {error}
    </p>
  );

  // ── Screens ───────────────────────────────────────────────────────────────

  if (name === 'trial') {
    return (
      <TrialScreen
        planLinks={planLinks}
        tiers={tiers}
        tier={tier}
        setTier={setTier}
        busy={busy}
        failed={trialFailed}
        error={errorBox}
        onStart={() => void onNext()}
        onLogout={() => void logout()}
      />
    );
  }

  let body: ReactNode;
  let footer: ReactNode;
  let above: ReactNode = null;

  if (name === 'signup') {
    body = (
      <>
        <div className="mt-3 flex h-[30px] items-center justify-center">
          <Logo size={30} textSize={31} gap={10} />
        </div>
        <div className="mt-[104px]">
          <Title sub="Let's get you booked!">Hey 👋</Title>
        </div>
        <div className="mt-[29px] space-y-4">
          <div>
            <PillInput
              icon={<User size={19} strokeWidth={1.8} />}
              aria-label="Username"
              placeholder="Username*"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              value={form.username}
              onChange={(e) => set({ username: e.target.value.toLowerCase().replace(/\s/g, '-').replace(/[^a-z0-9-_]/g, '') })}
            />
            <SlugHint slug={form.username} state={slugState} />
          </div>
          <PillInput
            icon={<Mail size={19} strokeWidth={1.8} />}
            aria-label="Email"
            placeholder="Email*"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            value={form.email}
            onChange={(e) => set({ email: e.target.value.trim() })}
          />
          <PasswordField value={form.password} onChange={(password) => set({ password })} />
        </div>
        {errorBox}
      </>
    );
    footer = (
      <>
        <p className="mt-[15px] text-center text-[16.5px] font-medium" style={{ color: MUTED }}>
          Already have an account?{' '}
          <button type="button" onClick={() => navigate('/login')} className="font-bold underline underline-offset-2" style={{ color: PINK }}>
            Log in
          </button>
        </p>
        <p className="mx-auto mt-[22px] max-w-[310px] text-center text-[12px] leading-[1.35] tracking-[0.01em]" style={{ color: MUTED }}>
          By signing up, you accept our{' '}
          <button type="button" className="underline" onClick={() => openExternal(WEB.terms)}>
            Terms and Conditions
          </button>
          , and acknowledge you have read our{' '}
          <button type="button" className="underline" onClick={() => openExternal(WEB.privacy)}>
            Privacy Policy
          </button>
          .
        </p>
      </>
    );
  } else if (name === 'details') {
    body = (
      <>
        <div className="pt-[150px]">
          <Title sub={`@${form.username || 'you'}, we need a little more info!`}>Share your details</Title>
        </div>
        <div className="mt-[29px] space-y-4">
          <PillInput
            icon={<User size={19} strokeWidth={1.8} />}
            aria-label="Full name"
            placeholder="Full Name*"
            autoComplete="name"
            value={form.fullName}
            onChange={(e) => set({ fullName: e.target.value })}
          />
          <PhoneField value={form.phone} onChange={(phone) => set({ phone })} />
        </div>
        {errorBox}
      </>
    );
    footer = <TextLink onClick={back} icon={<ArrowLeft size={18} strokeWidth={2.2} />}>Back</TextLink>;
  } else if (name === 'categories') {
    body = (
      <>
        <div className="pt-[44px]">
          <Title step="Step 1/5">
            Which categories do you
            <br />
            relate to most?
          </Title>
        </div>
        <div className="mt-[22px] flex flex-wrap justify-center gap-x-[10px] gap-y-[11px]" role="group" aria-label="Categories">
          {CATEGORIES.map((c) => {
            const on = form.categories.includes(c.id);
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  if (on) set({ categories: form.categories.filter((x) => x !== c.id) });
                  else if (form.categories.length < 2) set({ categories: [...form.categories, c.id] });
                }}
                className="flex h-[30px] items-center gap-[7px] rounded-[10px] border-[1.5px] px-[9px] text-[15.5px] font-medium transition active:scale-[0.97]"
                style={{ backgroundColor: on ? '#FFD9EA' : TINT, borderColor: on ? PINK : 'transparent', color: INK }}
              >
                <span className="text-[16px]" aria-hidden="true">{c.emoji}</span>
                {c.label}
              </button>
            );
          })}
        </div>
        {errorBox}
      </>
    );
    above = (
      <p className="mb-[47px] text-center text-[16px] font-semibold" style={{ color: MUTED }}>
        Select up to two
      </p>
    );
    footer = null;
  } else if (name === 'referral') {
    body = (
      <>
        <div className="pt-[36px]">
          <Title step="Step 5/5">Did someone refer you?</Title>
        </div>
        <div className="mt-[76px]">
          <PillInput
            icon={<User size={19} strokeWidth={1.8} />}
            aria-label="Who referred you"
            placeholder="Nail tech @handle"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            value={form.referredBy}
            onChange={(e) => set({ referredBy: e.target.value })}
          />
        </div>
        <p className="mx-auto mt-[17px] max-w-[330px] text-center text-[14.5px] leading-[1.3]" style={{ color: MUTED }}>
          Tell us who sent you to Nelsy and we'll thank them 🎁
        </p>
        {errorBox}
      </>
    );
    footer = <TextLink onClick={() => void skipReferral()}>Skip</TextLink>;
  } else {
    const q = QUESTIONS[name];
    body = (
      <>
        <div className="pt-[44px]">
          <Title step={q.step}>{q.title}</Title>
        </div>
        <div className="mx-auto mt-[57px] grid max-w-[306px] grid-cols-2 gap-3" role="radiogroup">
          {q.choices.map((c) => {
            const on = form[name] === c.id;
            return (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => set({ [name]: c.id } as Partial<Form>)}
                className="flex h-[128px] flex-col items-center justify-center rounded-[14px] border-2 px-3 text-center transition active:scale-[0.98]"
                style={{ backgroundColor: on ? '#FFD9EA' : TINT, borderColor: on ? PINK : 'transparent' }}
              >
                <span className="text-[37px] leading-none" aria-hidden="true">{c.emoji}</span>
                <span className="mt-[14px] text-[16px] font-semibold leading-[1.15]" style={{ color: INK }}>
                  {c.label}
                </span>
              </button>
            );
          })}
        </div>
        {errorBox}
      </>
    );
    footer = null;
  }

  const label =
    name === 'signup' ? (busy ? 'Creating your account...' : 'Get Started') : name === 'referral' ? 'Finish' : busy ? 'Saving...' : 'Next';

  return (
    <div className="flex min-h-[100dvh] flex-col bg-white pt-safe">
      <div className="flex-1 px-8">{body}</div>
      <div className="sticky bottom-0 bg-white px-8 pb-safe">
        <div className="pt-3">
          {above}
          <PrimaryPill onClick={() => void onNext()} disabled={busy}>
            {label}
          </PrimaryPill>
          <div className="flex h-[95px] flex-col">{footer}</div>
        </div>
      </div>
    </div>
  );
}

// ── Pieces ───────────────────────────────────────────────────────────────────

function TextLink({ children, onClick, icon }: { children: ReactNode; onClick: () => void; icon?: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mx-auto mt-[8px] flex h-11 items-center gap-1.5 px-4 text-[17px] font-semibold"
      style={{ color: MUTED }}
    >
      {icon}
      {children}
    </button>
  );
}

function SlugHint({ slug, state }: { slug: string; state: SlugState }) {
  const status =
    state === 'checking' ? { t: 'Checking...', c: MUTED }
    : state === 'free' ? { t: 'Available', c: '#11733F' }
    : state === 'taken' ? { t: 'Already taken', c: '#B42318' }
    : state === 'reserved' ? { t: 'Reserved, choose another one', c: '#B42318' }
    : null;
  return (
    <p className="mt-1.5 flex items-center justify-between gap-2 px-[18px] text-[12.5px]" style={{ color: MUTED }}>
      <span className="truncate">
        getnelsy.com/<span className="font-semibold" style={{ color: slug ? INK : MUTED }}>{slug || 'yourname'}</span>
      </span>
      {status && (
        <span className="flex shrink-0 items-center gap-1 font-semibold" style={{ color: status.c }}>
          {state === 'free' && <Check size={13} strokeWidth={3} />}
          {status.t}
        </span>
      )}
    </p>
  );
}

function PasswordField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <PillInput
        icon={<LockKeyhole size={19} strokeWidth={1.8} />}
        aria-label="Password"
        placeholder="Password*"
        type={show ? 'text' : 'password'}
        autoComplete="new-password"
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        right={
          value ? (
            <button type="button" onClick={() => setShow((s) => !s)} className="h-11 px-2 text-[13px] font-semibold" style={{ color: MUTED }}>
              {show ? 'Hide' : 'Show'}
            </button>
          ) : null
        }
      />
      {(value || focused) && (
        <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 px-[18px]">
          {PASSWORD_RULES.map((r) => {
            const ok = r.test(value);
            return (
              <li key={r.label} className="flex items-center gap-1 text-[12px]" style={{ color: ok ? '#11733F' : MUTED }}>
                {ok ? <Check size={12} strokeWidth={3} /> : <span className="h-1 w-1 rounded-full" style={{ backgroundColor: FAINT }} />}
                {r.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function PhoneField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [code, setCode] = useState(() => value.match(/^\+\d+/)?.[0] ?? defaultDialCode());
  const [country, setCountry] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const digits = value.replace(/^\+\d+\s?/, '');
  const selected =
    COUNTRY_CODES.find((c) => c.code === code && (!country || c.name === country)) ??
    // +1 defaults to the United States rather than the first +1 entry in the list
    (code === '+1' ? COUNTRY_CODES.find((c) => c.name === 'United States') : undefined) ??
    COUNTRY_CODES.find((c) => c.code === code) ??
    COUNTRY_CODES[0];
  const list = COUNTRY_CODES.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.code.includes(q));
  return (
    <>
      <div className="flex h-[49px] items-center rounded-full border-2 border-transparent pl-[18px] pr-3 focus-within:border-[#F7B6D4]" style={{ backgroundColor: FIELD }}>
        <button type="button" onClick={() => setOpen(true)} className="flex h-full shrink-0 items-center gap-[10px]" aria-label={`Country code ${selected.name} ${selected.code}`}>
          <span className="text-[27px] leading-none">{selected.flag}</span>
          <ChevronDown size={15} strokeWidth={1.8} style={{ color: MUTED }} />
          <span className="text-[16px]" style={{ color: INK }}>{selected.code}</span>
        </button>
        <input
          aria-label="Phone number"
          inputMode="tel"
          autoComplete="tel-national"
          value={digits}
          onChange={(e) => onChange(`${code} ${e.target.value.replace(/\D/g, '')}`.trim())}
          className="ml-2 h-full min-w-0 flex-1 bg-transparent text-[16px] outline-none"
          style={{ color: INK }}
        />
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white pt-safe">
          <div className="flex items-center gap-2 px-safe py-2">
            <div className="flex h-11 flex-1 items-center gap-2 rounded-full px-4" style={{ backgroundColor: FIELD }}>
              <Search size={18} style={{ color: FAINT }} />
              <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search country" className="min-w-0 flex-1 bg-transparent text-[16px] outline-none" />
            </div>
            <button type="button" onClick={() => setOpen(false)} className="flex h-11 w-11 items-center justify-center" aria-label="Close">
              <X size={22} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pb-safe">
            {list.map((c) => (
              <button
                key={`${c.name}-${c.code}`}
                type="button"
                onClick={() => {
                  setCountry(c.name);
                  setCode(c.code);
                  onChange(`${c.code} ${digits}`.trim());
                  setOpen(false);
                  setQ('');
                }}
                className="flex min-h-[48px] w-full items-center gap-3 px-safe text-left text-[15px] active:bg-gray-50"
              >
                <span className="text-[20px]">{c.flag}</span>
                <span className="flex-1 truncate">{c.name}</span>
                <span className="text-gray-400">{c.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function TrialScreen({
  planLinks,
  tiers,
  tier,
  setTier,
  busy,
  failed,
  error,
  onStart,
  onLogout,
}: {
  planLinks: boolean;
  tiers: PlanTier[];
  tier: PlanTier;
  setTier: (t: PlanTier) => void;
  busy: boolean;
  failed: boolean;
  error: ReactNode;
  onStart: () => void;
  onLogout: () => void;
}) {
  const plan = PLANS[tier];
  // Store builds (storePolicy): no price and no website link, only the free trial facts.
  const steps: { icon: ReactNode; title: string; text: ReactNode }[] = [
    { icon: <LockKeyholeOpen size={17} strokeWidth={2.2} />, title: 'Today', text: 'Your booking page goes live from your link in bio.' },
    { icon: <Bell size={17} strokeWidth={2.2} />, title: `In ${TRIAL_DAYS - 3} days`, text: "We'll remind you your trial is almost over." },
    {
      icon: <Star size={17} strokeWidth={2.2} />,
      title: `In ${TRIAL_DAYS} days`,
      text: planLinks ? (
        <>
          Add a card on{' '}
          <button type="button" className="underline underline-offset-2" onClick={() => openExternal(WEB.plan)}>
            getnelsy.com
          </button>{' '}
          to keep your page live. <b style={{ color: INK }}>No card needed today.</b>
        </>
      ) : (
        'Keep your page live by adding a card from your dashboard on the web.'
      ),
    },
  ];
  return (
    <div className="flex min-h-[100dvh] flex-col bg-white pt-safe">
      <div className="flex-1 px-5">
        <div className="mt-[23px] flex h-[30px] items-center justify-center">
          <Logo size={30} textSize={31} gap={10} />
        </div>
        <h1 className="mt-[40px] text-center text-[29px] font-extrabold leading-[36px] tracking-[-0.02em]" style={{ color: INK }}>
          How your trial works
        </h1>
        <p className="mt-[8px] text-center text-[17px]" style={{ color: MUTED }}>
          {planLinks ? `First ${TRIAL_DAYS} days free, then $${plan.monthly}/month` : `First ${TRIAL_DAYS} days free`}
        </p>

        <div className="mt-[32px] flex justify-center">
          <div className="flex rounded-full p-[5px]" style={{ backgroundColor: TINT }} role="tablist" aria-label="Plan">
            {tiers.map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={t === tier}
                onClick={() => setTier(t)}
                className="h-[34px] rounded-full px-[26px] text-[15px] font-semibold"
                style={t === tier ? { backgroundColor: PINK, color: '#FFFFFF' } : { color: PINK }}
              >
                {PLANS[t].name}
              </button>
            ))}
          </div>
        </div>

        <ol className="relative mt-[50px] pl-[44px] pr-[16px]">
          <span
            aria-hidden="true"
            className="absolute bottom-[-24px] left-[58px] top-[18px] w-[9px]"
            style={{ background: 'linear-gradient(#FBD3E6 0%, #FBD3E6 75%, rgba(251,211,230,0))' }}
          />
          {steps.map((s) => (
            <li key={s.title} className="relative flex gap-[11px] [&:not(:last-child)]:min-h-[113px]">
              <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: PINK }}>
                {s.icon}
              </span>
              <div className="-mt-[4px]">
                <p className="text-[19px] font-bold" style={{ color: INK }}>{s.title}</p>
                <p className="mt-[4px] text-[16.5px] leading-[1.35]" style={{ color: MUTED }}>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        {error}
      </div>

      <div className="sticky bottom-0 border-t border-[#EFEFEF] bg-white px-5 pb-safe pt-[20px]">
        <PrimaryPill onClick={onStart} disabled={busy} className="h-[61px] text-[19px] font-semibold">
          {busy ? 'Starting your trial...' : failed ? 'Continue to my studio' : 'Start my free trial'}
        </PrimaryPill>
        <div className="flex h-[60px] items-center justify-around text-[13.5px]" style={{ color: MUTED }}>
          <button type="button" className="h-11 px-2 underline underline-offset-2" onClick={() => openExternal(WEB.terms)}>
            Terms
          </button>
          <button type="button" className="h-11 px-2 underline underline-offset-2" onClick={() => openExternal(WEB.privacy)}>
            Privacy Policy
          </button>
          <button type="button" className="h-11 px-2 underline underline-offset-2" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
