import { useEffect, useMemo, useRef, useState } from 'react';
import { saveProfileTimezone } from '@/lib/timezone';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, ChevronDown, Eye, EyeOff, Search, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { isReservedSlug } from '@/lib/reservedSlugs';
import { track, identify } from '@/lib/analytics';
import { PLANS, TRIAL_DAYS, planKey } from '@/lib/plans';
import { updateProfile } from '@/lib/supabase-queries';
import { validatePassword } from '@/utils/validation';
import { COUNTRY_CODES, PASSWORD_RULES, defaultDialCode } from '../lib/countries';
import { PINK, WEB_ORIGIN, WEB } from '../lib/constants';
import { openExternal } from '../lib/native';
import { readDemoFlag } from '../lib/demo';
import { trialEndLabel } from '../lib/format';

// Native signup, one or two fields per screen. Account creation mirrors src/pages/Onboarding.tsx:
// same supabase.auth.signUp metadata (the DB trigger creates the profile), same profile wait, same sign-in.
// Payment for the trial happens on the website (Apple: no digital subscription sales outside IAP).

const STEPS = ['claim_link', 'details', 'credentials', 'socials', 'craft', 'plan'] as const;
type StepName = (typeof STEPS)[number];

const CRAFTS = [
  { id: 'nail_tech', label: 'Nail tech', specialty: 'Nail technician', emoji: '💅' },
  { id: 'lash_brow', label: 'Lash or brow artist', specialty: 'Lash and brow artist', emoji: '👁️' },
  { id: 'makeup', label: 'Makeup artist', specialty: 'Makeup artist', emoji: '💄' },
  { id: 'hair', label: 'Hairstylist', specialty: 'Hair stylist', emoji: '💇‍♀️' },
  { id: 'skin', label: 'Esthetician', specialty: 'Esthetician', emoji: '🧴' },
  { id: 'other', label: 'Something else', specialty: '', emoji: '✨' },
] as const;

const PLAN = PLANS.independent;
const PLAN_PARAM = planKey('independent', 'monthly');

interface Form {
  username: string;
  fullName: string;
  phone: string; // "+33 612345678", same shape as the website
  email: string;
  password: string;
  instagram: string;
  tiktok: string;
  craft: string;
}

const EMPTY: Form = { username: '', fullName: '', phone: '', email: '', password: '', instagram: '', tiktok: '', craft: '' };
const DEMO_FORM: Form = {
  username: 'inesnails',
  fullName: 'Inès Example',
  phone: '+1 5550100',
  email: 'example@getnelsy.com',
  password: 'Example123',
  instagram: 'inesnails',
  tiktok: '',
  craft: 'nail_tech',
};

const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const cleanHandle = (h: string) => h.trim().replace(/^@/, '').replace(/^https?:\/\/(www\.)?(instagram|tiktok)\.com\/@?/, '');

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
  const viewed = useRef(new Set<number>());

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

  // ── Step 1: slug availability ────────────────────────────────────────────
  const [slugState, setSlugState] = useState<'idle' | 'checking' | 'free' | 'taken' | 'reserved'>('idle');
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
    if (demo || !client) {
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
  }, [form.username, demo]);

  // ── Account creation (end of step 5), mirrors the website ────────────────
  const createAccount = async (): Promise<boolean> => {
    const craft = CRAFTS.find((c) => c.id === form.craft);
    if (demo) return true;
    if (!supabase) {
      setError('Sign up is not available in this build. Please try again later.');
      return false;
    }
    try {
      const { data: existing } = await supabase.auth.getSession();
      let userId = existing.session?.user.id ?? null;
      if (!userId) {
        const { data: { user }, error: signUpError } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            data: {
              full_name: form.fullName,
              slug: form.username,
              phone: form.phone,
              instagram: form.instagram,
              tiktok: form.tiktok,
            },
          },
        });
        if (signUpError?.message?.toLowerCase().includes('already registered') || (user && user.identities?.length === 0)) {
          track('app_onboarding_validation_error', { step: 'credentials', field: 'email', error_type: 'already_registered' });
          setStep(STEPS.indexOf('credentials'));
          setError('This email already has a Nelsy account. Log in instead.');
          return false;
        }
        if (signUpError) throw new Error(`[signup] ${signUpError.message}`);
        if (!user) throw new Error('[signup] No user returned');
        identify(user.id);
        track('app_onboarding_account_created', { craft: form.craft });

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
        userId = user.id;
      }
      // Extra over the website flow (the signup trigger only copies name + slug): store craft and socials
      // on the profile so the page shows them, as plain handles like EditProfileModal does.
      const extra: Record<string, string> = {};
      if (craft?.specialty) extra.specialty = craft.specialty;
      if (form.instagram) extra.instagram_url = form.instagram;
      if (form.tiktok) extra.tiktok_url = form.tiktok;
      if (Object.keys(extra).length) await updateProfile(userId, extra);
      // Device timezone: slots, reminders and calendar times all follow profiles.timezone
      await saveProfileTimezone(userId);
      return true;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      track('app_onboarding_backend_error', { step: name, operation: msg.match(/^\[([^\]]+)\]/)?.[1] ?? 'unknown' });
      setError(msg.replace(/^\[[^\]]+\]\s*/, '') || 'Something went wrong. Please try again.');
      return false;
    }
  };

  const onNext = async () => {
    if (busy) return;
    switch (name) {
      case 'claim_link':
        if (form.username.length < 3) return fail('username', 'too_short', 'Your link needs at least 3 characters.');
        if (slugState === 'reserved') return fail('username', 'reserved', 'This name is reserved, please choose another one.');
        if (slugState === 'taken') return fail('username', 'already_taken', 'This link is already taken.');
        if (slugState === 'checking') return;
        return advance();
      case 'details': {
        if (form.fullName.trim().length < 2) return fail('full_name', 'too_short', 'Please enter your full name.');
        const digits = form.phone.replace(/^\+\d+\s?/, '').replace(/\D/g, '');
        if (digits.length < 6)
          return fail('phone', 'too_short', digits ? 'This number looks too short. Enter it without the country code.' : 'Enter your phone number (we only use it for account security).');
        return advance();
      }
      case 'credentials': {
        if (!emailOk(form.email)) return fail('email', 'invalid_format', 'Please enter a valid email address.');
        const pw = validatePassword(form.password);
        if (!pw.valid) return fail('password', 'too_weak', pw.errors[0]);
        return advance();
      }
      case 'socials':
        set({ instagram: cleanHandle(form.instagram), tiktok: cleanHandle(form.tiktok) });
        return advance();
      case 'craft':
        if (!form.craft) return fail('craft', 'required', 'Pick the option closest to your work.');
        setBusy(true);
        try {
          if (await createAccount()) advance();
        } finally {
          setBusy(false);
        }
        return;
      case 'plan':
        track('app_onboarding_trial_opened_web', { plan: PLAN_PARAM });
        openExternal(`${WEB.signup}?plan=${PLAN_PARAM}&resume=1`);
        track('app_onboarding_completed', { plan: PLAN_PARAM });
        navigate('/home', { replace: true });
    }
  };

  const nextLabel = name === 'craft' ? (busy ? 'Creating your account...' : 'Create my account') : name === 'plan' ? 'Start my free trial' : 'Next';
  const nextDisabled =
    busy ||
    (name === 'claim_link' && (form.username.length < 3 || slugState === 'checking' || slugState === 'taken' || slugState === 'reserved')) ||
    (name === 'craft' && !form.craft);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-white pt-safe">
      {/* Top: back + progress */}
      <div className="px-safe pt-2">
        <div className="flex h-11 items-center">
          {name !== 'plan' && (
            <button type="button" onClick={back} className="-ml-2 flex h-11 items-center gap-1.5 px-2 text-[15px] font-semibold text-gray-600">
              <ArrowLeft size={18} /> Back
            </button>
          )}
        </div>
        <div className="mt-1 flex gap-1.5" aria-label={`Step ${step + 1} of ${STEPS.length}`}>
          {STEPS.map((s, i) => (
            <span key={s} className="h-1 flex-1 rounded-full transition-colors" style={{ backgroundColor: i <= step ? PINK : '#EDEDED' }} />
          ))}
        </div>
      </div>

      <div className="flex-1 px-safe pb-6 pt-8">
        {name === 'claim_link' && <StepLink form={form} set={set} state={slugState} />}
        {name === 'details' && <StepDetails form={form} set={set} />}
        {name === 'credentials' && <StepCredentials form={form} set={set} />}
        {name === 'socials' && <StepSocials form={form} set={set} />}
        {name === 'craft' && <StepCraft form={form} set={set} />}
        {name === 'plan' && <StepPlan />}
        {error && (
          <p role="alert" className="mt-4 rounded-xl bg-[#FDECEC] px-3 py-2.5 text-[13px] font-medium text-[#B42318]">
            {error}
          </p>
        )}
      </div>

      {/* Bottom actions */}
      <div className="sticky bottom-0 bg-white px-safe pb-safe">
        <div className="pb-4 pt-2">
          <button
            type="button"
            onClick={() => void onNext()}
            disabled={nextDisabled}
            className="h-14 w-full rounded-full text-[16px] font-bold text-white transition active:scale-[0.98] disabled:opacity-40"
            style={{ backgroundColor: PINK }}
          >
            {nextLabel}
          </button>
          {name === 'socials' && (
            <button type="button" onClick={advance} className="mt-1 h-11 w-full text-[15px] font-semibold" style={{ color: PINK }}>
              Skip
            </button>
          )}
          {name === 'plan' && (
            <button type="button" onClick={() => navigate('/home', { replace: true })} className="mt-1 h-11 w-full text-[15px] font-semibold text-gray-500">
              Not now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Pieces ───────────────────────────────────────────────────────────────────

function Heading({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-7">
      <h1 className="text-[28px] font-extrabold leading-[1.15] tracking-tight text-[#1A1A1A]">{title}</h1>
      {sub && <p className="mt-2 text-[15px] leading-snug text-gray-500">{sub}</p>}
    </div>
  );
}

function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: ReactNode }) {
  return (
    <label className="mb-4 block">
      <span className="mb-1.5 block text-[13px] font-semibold text-gray-700">{label}</span>
      {children}
      {hint}
    </label>
  );
}

const inputCls =
  'h-14 w-full rounded-2xl border-2 border-gray-200 bg-white px-4 text-[16px] text-[#1A1A1A] outline-none transition placeholder:text-gray-400 focus:border-[#F52B8C]';

type StepProps = { form: Form; set: (p: Partial<Form>) => void };

function StepLink({ form, set, state }: StepProps & { state: 'idle' | 'checking' | 'free' | 'taken' | 'reserved' }) {
  const msg =
    state === 'checking' ? { t: 'Checking...', c: 'text-gray-500' }
    : state === 'free' ? { t: 'Available', c: 'text-[#11733F]' }
    : state === 'taken' ? { t: 'Already taken', c: 'text-[#B42318]' }
    : state === 'reserved' ? { t: 'Reserved, choose another one', c: 'text-[#B42318]' }
    : null;
  return (
    <>
      <Heading title="Claim your link" sub="This is the link you put in your bio. Clients book you here." />
      <div className="flex h-14 items-center rounded-2xl border-2 border-gray-200 bg-white pl-4 pr-3 focus-within:border-[#F52B8C]">
        <span className="shrink-0 text-[16px] font-medium text-gray-400">getnelsy.com/</span>
        <input
          aria-label="Your link"
          autoFocus
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          value={form.username}
          onChange={(e) => set({ username: e.target.value.toLowerCase().replace(/\s/g, '-').replace(/[^a-z0-9-_]/g, '') })}
          placeholder="yourname"
          className="min-w-0 flex-1 bg-transparent text-[16px] font-semibold text-[#1A1A1A] outline-none placeholder:font-normal placeholder:text-gray-400"
        />
        {state === 'free' && <Check size={20} className="shrink-0 text-[#11733F]" />}
      </div>
      {msg && <p className={`mt-2 text-[13px] font-medium ${msg.c}`}>{msg.t}</p>}
    </>
  );
}

function StepDetails({ form, set }: StepProps) {
  const [code, setCode] = useState(() => form.phone.match(/^\+\d+/)?.[0] ?? defaultDialCode());
  const digits = form.phone.replace(/^\+\d+\s?/, '');
  return (
    <>
      <Heading title="Share your details" sub="Your name shows on your page. Your number is only used for account security." />
      <Field label="Full name">
        <input className={inputCls} autoComplete="name" value={form.fullName} onChange={(e) => set({ fullName: e.target.value })} placeholder="Your name" />
      </Field>
      <Field label="Phone">
        <div className="flex gap-2">
          <DialPicker
            value={code}
            onChange={(c) => {
              setCode(c);
              set({ phone: `${c} ${digits}`.trim() });
            }}
          />
          <input
            className={`${inputCls} min-w-0 flex-1`}
            inputMode="tel"
            autoComplete="tel-national"
            value={digits}
            onChange={(e) => set({ phone: `${code} ${e.target.value.replace(/\D/g, '')}`.trim() })}
            placeholder="Phone number"
          />
        </div>
      </Field>
    </>
  );
}

function DialPicker({ value, onChange }: { value: string; onChange: (code: string) => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [name, setName] = useState<string | null>(null);
  const selected = COUNTRY_CODES.find((c) => c.code === value && (!name || c.name === name)) ?? COUNTRY_CODES.find((c) => c.code === value) ?? COUNTRY_CODES[0];
  const list = COUNTRY_CODES.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.code.includes(q));
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-14 shrink-0 items-center gap-1.5 rounded-2xl border-2 border-gray-200 px-3 text-[16px] font-medium"
        aria-label={`Country code ${selected.name} ${selected.code}`}
      >
        <span className="text-[20px] leading-none">{selected.flag}</span>
        {selected.code}
        <ChevronDown size={16} className="text-gray-400" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white pt-safe">
          <div className="flex items-center gap-2 px-safe py-2">
            <div className="flex h-11 flex-1 items-center gap-2 rounded-xl bg-gray-100 px-3">
              <Search size={18} className="text-gray-400" />
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
                  setName(c.name);
                  onChange(c.code);
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

function StepCredentials({ form, set }: StepProps) {
  const [show, setShow] = useState(false);
  return (
    <>
      <Heading title="Create your login" sub="You will use it in the app and on getnelsy.com." />
      <Field label="Email">
        <input
          className={inputCls}
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          value={form.email}
          onChange={(e) => set({ email: e.target.value.trim() })}
          placeholder="you@example.com"
        />
      </Field>
      <Field
        label="Password"
        hint={
          <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5">
            {PASSWORD_RULES.map((r) => {
              const ok = r.test(form.password);
              return (
                <li key={r.label} className={`flex items-center gap-1.5 text-[12.5px] ${ok ? 'text-[#11733F]' : 'text-gray-400'}`}>
                  <span className={`flex h-4 w-4 items-center justify-center rounded-full ${ok ? 'bg-[#11733F] text-white' : 'border border-gray-300'}`}>
                    {ok && <Check size={11} strokeWidth={3} />}
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
            value={form.password}
            onChange={(e) => set({ password: e.target.value })}
            placeholder="Password"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-1 top-1/2 flex h-11 -translate-y-1/2 items-center gap-1 px-3 text-[13px] font-semibold text-gray-500"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
            {show ? 'Hide' : 'Show'}
          </button>
        </div>
      </Field>
    </>
  );
}

function StepSocials({ form, set }: StepProps) {
  return (
    <>
      <Heading title="Add your socials" sub="Optional. We link them on your page so clients can see your work." />
      <Field label="Instagram">
        <HandleInput value={form.instagram} onChange={(v) => set({ instagram: v })} />
      </Field>
      <Field label="TikTok">
        <HandleInput value={form.tiktok} onChange={(v) => set({ tiktok: v })} />
      </Field>
    </>
  );
}

function HandleInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex h-14 items-center rounded-2xl border-2 border-gray-200 px-4 focus-within:border-[#F52B8C]">
      <span className="text-[16px] text-gray-400">@</span>
      <input
        autoCapitalize="none"
        autoCorrect="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="yourname"
        className="ml-1 min-w-0 flex-1 bg-transparent text-[16px] outline-none placeholder:text-gray-400"
      />
    </div>
  );
}

function StepCraft({ form, set }: StepProps) {
  return (
    <>
      <Heading title="What do you do?" sub="Pick the one closest to your work. You can change it later." />
      <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Your craft">
        {CRAFTS.map((c) => {
          const on = form.craft === c.id;
          return (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => set({ craft: c.id })}
              className="relative flex min-h-[108px] flex-col items-start justify-between rounded-2xl border-2 p-4 text-left transition active:scale-[0.98]"
              style={{ borderColor: on ? PINK : '#E8E8E8', backgroundColor: on ? '#FFF0F7' : '#FFFFFF' }}
            >
              <span className="text-[28px] leading-none" aria-hidden="true">{c.emoji}</span>
              <span className="text-[15px] font-bold leading-tight text-[#1A1A1A]">{c.label}</span>
              {on && (
                <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full text-white" style={{ backgroundColor: PINK }}>
                  <Check size={14} strokeWidth={3} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}

function StepPlan() {
  const [end] = useState(() => trialEndLabel(TRIAL_DAYS));
  return (
    <>
      <Heading title="Start your free trial" sub="Your account is ready. Turn on your page with a free trial." />
      <div className="rounded-3xl border-2 p-5" style={{ borderColor: PINK, boxShadow: '0 10px 30px rgba(245,43,140,0.12)' }}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[18px] font-extrabold text-[#1A1A1A]">{PLAN.name}</p>
            <p className="mt-0.5 text-[13px] text-gray-500">{PLAN.tagline}</p>
          </div>
          <span className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold text-white" style={{ backgroundColor: PINK }}>
            {TRIAL_DAYS} days free
          </span>
        </div>
        <p className="mt-4 text-[14px] text-gray-600">
          <span className="text-[26px] font-extrabold text-[#1A1A1A]">$0</span> for {TRIAL_DAYS} days, then ${PLAN.monthly}/mo
        </p>
        <ul className="mt-4 space-y-2">
          {PLAN.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-[14px] text-[#1A1A1A]">
              <Check size={16} strokeWidth={3} className="mt-0.5 shrink-0" style={{ color: PINK }} />
              {h}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3.5">
        <span className="text-[14px] font-semibold text-gray-600">Due today</span>
        <span className="text-[20px] font-extrabold" style={{ color: PINK }}>$0</span>
      </div>
      <p className="mt-4 text-[12.5px] leading-relaxed text-gray-500">
        You add your card on {WEB_ORIGIN.replace('https://', '')} in your browser. Cancel anytime before {end} and you will not be charged.
      </p>
    </>
  );
}
