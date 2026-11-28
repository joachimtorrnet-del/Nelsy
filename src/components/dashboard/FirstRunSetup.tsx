// Guided first-run setup, shown instead of the empty dashboard to a pro with no service yet.
// Three screens, each skippable: services, opening hours, share your link.
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Plus, X, Copy, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { createServices } from '../../lib/supabase-queries';
import { track } from '../../lib/analytics';
import { currencySymbol, formatMoney } from '../../lib/currency';
import { buildLiveMerchant } from '../../lib/liveMerchant';
import { StudioPhonePreview } from './StudioPhonePreview';
import {
  SERVICE_PRESETS, DURATION_OPTIONS, TIME_OPTIONS, WEEK_DAYS,
  buildAvailabilityRows, buildServiceRow, defaultWeek, formatDuration, isUntouchedDefaultHours,
  parsePrice, saveSetupState, summarizeWeek, deviceUses12h, displayTime, validateDrafts, validateWeek, weekFromRows,
} from '../../lib/setup';
import type { AvailabilityRowLike, ServiceDraft, Week } from '../../lib/setup';

const PINK = '#F52B8C';
const STEPS = ['services', 'hours', 'share'] as const;
type StepName = (typeof STEPS)[number];

export interface SetupProfile {
  id: string;
  full_name?: string | null;
  slug?: string | null;
  business_currency?: string | null;
  subscription_status?: string | null;
}

interface CreatedService {
  id: string;
  name: string;
  price_total: number;
  duration_minutes: number;
}

interface Props {
  profile: SetupProfile;
  /** Leaves setup and opens the dashboard. */
  onDone: () => void;
}

interface PresetPick {
  checked: boolean;
  price: string;
  duration: number;
}

const inputCls =
  'h-12 w-full rounded-2xl border-2 border-gray-200 bg-white px-3.5 text-[16px] text-[#1A1A1A] outline-none transition placeholder:text-gray-400 focus:border-[#F52B8C]';
const selectCls =
  'h-12 w-full rounded-2xl border-2 border-gray-200 bg-white px-3 text-[16px] text-[#1A1A1A] outline-none transition focus:border-[#F52B8C]';

function readableError(err: unknown): string {
  const raw = err instanceof Error ? err.message : typeof err === 'object' && err && 'message' in err ? String((err as { message: unknown }).message) : '';
  if (/fetch|network/i.test(raw)) return 'Check your connection and try again.';
  return 'Nothing was lost, please try again.';
}

const HOUR12 = deviceUses12h();

export default function FirstRunSetup({ profile, onDone }: Props) {
  const [step, setStep] = useState(0);
  const name: StepName = STEPS[step];
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  // Services
  const [picks, setPicks] = useState<Record<string, PresetPick>>(() =>
    Object.fromEntries(SERVICE_PRESETS.map((p) => [p.key, { checked: false, price: '', duration: p.duration }])),
  );
  const [customs, setCustoms] = useState<ServiceDraft[]>([]);
  const [rowErrors, setRowErrors] = useState<Record<string, string>>({});
  const [created, setCreated] = useState<CreatedService[]>([]);
  const [createdKeys, setCreatedKeys] = useState<string[]>([]);
  const customSeq = useRef(0);

  // Hours
  const [week, setWeek] = useState<Week>(defaultWeek);
  const [savedRows, setSavedRows] = useState<AvailabilityRowLike[] | null>(null);
  const [hoursSaved, setHoursSaved] = useState(false);

  // Share
  const [copied, setCopied] = useState(false);
  const finished = useRef(false);

  const currency = (profile.business_currency ?? 'EUR').toUpperCase();
  const symbol = currencySymbol(currency);
  const slug = profile.slug ?? '';
  const displayUrl = `getnelsy.com/${slug}`;
  const isLive = ['trial', 'trialing', 'active', 'past_due'].includes(profile.subscription_status ?? '');

  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    track('setup_started');
  }, []);

  // Hours she already has. The signup default (Mon to Sat) is replaced by the suggested week.
  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;
    void supabase
      .from('availabilities')
      .select('day_of_week, start_time, end_time, active')
      .eq('profile_id', profile.id)
      .then(({ data }) => {
        if (cancelled || !data) return;
        const rows = data as AvailabilityRowLike[];
        setSavedRows(rows);
        if (!isUntouchedDefaultHours(rows)) setWeek(weekFromRows(rows));
      });
    return () => { cancelled = true; };
  }, [profile.id]);

  // Reaching the last screen ends setup, whether she filled or skipped the steps before it.
  useEffect(() => {
    if (name !== 'share' || finished.current) return;
    finished.current = true;
    track('setup_completed', { services_count: created.length });
    void saveSetupState(profile.id, { completed_at: new Date().toISOString() });
  }, [name, created.length, profile.id]);

  const go = (next: number) => {
    setError('');
    setStep(next);
    window.scrollTo({ top: 0 });
  };

  // ── Services ──
  const drafts: ServiceDraft[] = useMemo(() => [
    ...SERVICE_PRESETS
      .filter((p) => picks[p.key].checked && !createdKeys.includes(p.key))
      .map((p) => ({ key: p.key, name: p.name, duration: picks[p.key].duration, price: picks[p.key].price })),
    ...customs.filter((c) => !createdKeys.includes(c.key)),
  ], [picks, customs, createdKeys]);

  const clearRowError = (key: string) =>
    setRowErrors((e) => {
      if (!e[key]) return e;
      const rest = { ...e };
      delete rest[key];
      return rest;
    });

  const setPick = (key: string, patch: Partial<PresetPick>) => {
    setPicks((p) => ({ ...p, [key]: { ...p[key], ...patch } }));
    clearRowError(key);
  };
  const setCustom = (key: string, patch: Partial<ServiceDraft>) => {
    setCustoms((list) => list.map((c) => (c.key === key ? { ...c, ...patch } : c)));
    clearRowError(key);
  };
  const addCustom = () => {
    customSeq.current += 1;
    setCustoms((list) => [...list, { key: `custom_${customSeq.current}`, name: '', duration: 60, price: '' }]);
  };

  const saveServices = async () => {
    if (drafts.length === 0) { go(1); return; }
    const errors = validateDrafts(drafts);
    setRowErrors(errors);
    if (Object.keys(errors).length > 0) {
      setError(Object.keys(errors).length === 1 ? 'One service still needs a price.' : 'Some services still need a price.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const rows = drafts.map((d, i) =>
        buildServiceRow(profile.id, { name: d.name, duration: d.duration, price: parsePrice(d.price)! }, created.length + i),
      );
      const { data, error: insertError } = await createServices(rows);
      if (insertError) throw insertError;
      const saved = (data ?? []) as CreatedService[];
      if (created.length === 0) track('first_service_created', { source: 'setup' });
      setCreated((list) => [...list, ...saved]);
      setCreatedKeys((keys) => [...keys, ...drafts.map((d) => d.key)]);
      track('setup_step_completed', { step: 'services', services_count: saved.length });
      go(1);
    } catch (err) {
      console.error('[setup] services:', err);
      setError(`We could not save your services. ${readableError(err)}`);
    } finally {
      setBusy(false);
    }
  };

  // ── Hours ──
  const setDay = (day: number, patch: Partial<Week[number]>) =>
    setWeek((w) => ({ ...w, [day]: { ...w[day], ...patch } }));

  const saveHours = async () => {
    const problem = validateWeek(week);
    if (problem) { setError(problem); return; }
    if (!supabase) { setError('We could not save your hours. Please try again.'); return; }
    setBusy(true);
    setError('');
    try {
      const { error: upsertError } = await supabase
        .from('availabilities')
        .upsert(buildAvailabilityRows(profile.id, week), { onConflict: 'profile_id,day_of_week' });
      if (upsertError) throw upsertError;
      setHoursSaved(true);
      void saveSetupState(profile.id, { hours_set_at: new Date().toISOString() });
      track('setup_step_completed', { step: 'hours', open_days: WEEK_DAYS.filter((d) => week[d.value].active).length });
      go(2);
    } catch (err) {
      console.error('[setup] hours:', err);
      setError(`We could not save your hours. ${readableError(err)}`);
    } finally {
      setBusy(false);
    }
  };

  const skip = () => {
    track('setup_skipped', { step: name });
    go(step + 1);
  };

  // ── Share ──
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`https://${displayUrl}`);
      setCopied(true);
      setError('');
      track('link_copied', { source: 'setup' });
      void saveSetupState(profile.id, { link_copied_at: new Date().toISOString() });
    } catch {
      setError('We could not copy the link. Press and hold it to copy.');
    }
  };

  const onNext = () => {
    if (busy) return;
    if (name === 'services') void saveServices();
    else if (name === 'hours') void saveHours();
    else if (!copied) void copyLink();
    else onDone();
  };

  const nextLabel = busy
    ? 'Saving...'
    : name === 'share'
      ? (copied ? 'Go to my dashboard' : 'Copy my link')
      : 'Next';
  const nextDisabled = busy || (name === 'services' && drafts.length === 0 && created.length === 0);

  const merchant = useMemo(
    () => buildLiveMerchant(profile, created.map((s) => ({ ...s, payment_mode: 'on_arrival' as const, active: true, category: 'Nails' }))),
    [profile, created],
  );
  // What clients can book right now: the week she saved, or what was already there.
  const liveWeek = hoursSaved ? week : savedRows && savedRows.length > 0 ? weekFromRows(savedRows) : null;

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col">
      <div className={`w-full mx-auto flex-1 flex flex-col px-4 ${name === 'share' ? 'max-w-md lg:max-w-4xl' : 'max-w-md'}`}>
        {/* Top: back + progress */}
        <div className="pt-2 w-full max-w-md mx-auto lg:max-w-none">
          <div className="flex h-11 items-center justify-between">
            {step > 0 ? (
              <button type="button" onClick={() => go(step - 1)} disabled={busy}
                className="-ml-2 flex h-11 items-center gap-1.5 px-2 text-[15px] font-semibold text-gray-600 hover:text-gray-900 disabled:opacity-50">
                <span aria-hidden="true">←</span> Back
              </button>
            ) : <span />}
            <span className="text-[13px] font-semibold text-gray-400">Step {step + 1} of {STEPS.length}</span>
          </div>
          <div className="mt-1 flex gap-1.5" role="progressbar" aria-valuemin={1} aria-valuemax={STEPS.length} aria-valuenow={step + 1} aria-label={`Step ${step + 1} of ${STEPS.length}`}>
            {STEPS.map((s, i) => (
              <span key={s} className="h-1 flex-1 rounded-full transition-colors duration-300" style={{ backgroundColor: i <= step ? PINK : '#EDEDED' }} />
            ))}
          </div>
        </div>

        <form className="flex-1 flex flex-col" onSubmit={(e) => { e.preventDefault(); onNext(); }} noValidate>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={name} className="flex-1 pt-8 pb-6"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>

              {name === 'services' && (
                <>
                  <Title title="What do you offer?" sub="Tick your services and add your price. You can change everything later." />
                  <ul className="space-y-2.5">
                    {SERVICE_PRESETS.map((p) => {
                      const pick = picks[p.key];
                      const done = createdKeys.includes(p.key);
                      const open = pick.checked && !done;
                      return (
                        <li key={p.key}
                          className={`rounded-2xl border-2 transition-colors ${rowErrors[p.key] ? 'border-red-400' : pick.checked || done ? 'border-[#F52B8C] bg-[#fff8fb]' : 'border-gray-200'}`}>
                          <button type="button" disabled={done} aria-pressed={pick.checked || done}
                            onClick={() => setPick(p.key, { checked: !pick.checked })}
                            className="flex w-full min-h-[56px] items-center gap-3 px-4 py-3 text-left">
                            <Tick on={pick.checked || done} />
                            <span className="flex-1 text-[16px] font-semibold text-[#1A1A1A]">{p.name}</span>
                            <span className="text-[13px] text-gray-500">{done ? 'Added' : formatDuration(pick.duration)}</span>
                          </button>
                          {open && (
                            <div className="px-4 pb-4">
                              <div className="grid grid-cols-2 gap-2.5">
                                <PriceInput symbol={symbol} value={pick.price} label={`Price for ${p.name}`}
                                  invalid={!!rowErrors[p.key]} onChange={(v) => setPick(p.key, { price: v })} />
                                <DurationSelect value={pick.duration} label={`Duration of ${p.name}`}
                                  onChange={(v) => setPick(p.key, { duration: v })} />
                              </div>
                              {rowErrors[p.key] && <p className="mt-1.5 text-[13px] font-medium text-red-600">{rowErrors[p.key]}</p>}
                            </div>
                          )}
                        </li>
                      );
                    })}

                    {customs.map((c) => {
                      const done = createdKeys.includes(c.key);
                      if (done) {
                        return (
                          <li key={c.key} className="flex min-h-[56px] items-center gap-3 rounded-2xl border-2 border-[#F52B8C] bg-[#fff8fb] px-4 py-3">
                            <Tick on />
                            <span className="flex-1 text-[16px] font-semibold text-[#1A1A1A]">{c.name}</span>
                            <span className="text-[13px] text-gray-500">Added</span>
                          </li>
                        );
                      }
                      return (
                        <li key={c.key} className={`rounded-2xl border-2 p-4 ${rowErrors[c.key] ? 'border-red-400' : 'border-[#F52B8C] bg-[#fff8fb]'}`}>
                          <div className="flex items-center gap-2">
                            <input type="text" value={c.name} autoFocus maxLength={60} placeholder="Service name" aria-label="Service name"
                              onChange={(e) => setCustom(c.key, { name: e.target.value })} className={inputCls} />
                            <button type="button" aria-label="Remove this service"
                              onClick={() => { setCustoms((list) => list.filter((x) => x.key !== c.key)); clearRowError(c.key); }}
                              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100">
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                          <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                            <PriceInput symbol={symbol} value={c.price} label="Price" invalid={!!rowErrors[c.key]}
                              onChange={(v) => setCustom(c.key, { price: v })} />
                            <DurationSelect value={c.duration} label="Duration" onChange={(v) => setCustom(c.key, { duration: v })} />
                          </div>
                          {rowErrors[c.key] && <p className="mt-1.5 text-[13px] font-medium text-red-600">{rowErrors[c.key]}</p>}
                        </li>
                      );
                    })}
                  </ul>
                  <button type="button" onClick={addCustom}
                    className="mt-2.5 flex min-h-[56px] w-full items-center gap-3 rounded-2xl border-2 border-dashed border-gray-300 px-4 text-[16px] font-semibold text-gray-700 hover:border-[#F52B8C] hover:text-[#F52B8C] transition-colors">
                    <Plus className="h-5 w-5" /> Add my own
                  </button>
                </>
              )}

              {name === 'hours' && (
                <>
                  <Title title="When do you work?" sub="Clients can only book inside these hours. Adjust any day." />
                  <ul className="space-y-2">
                    {WEEK_DAYS.map((d) => {
                      const day = week[d.value];
                      return (
                        <li key={d.value} className="flex min-h-[56px] items-center gap-3">
                          <button type="button" role="switch" aria-checked={day.active} aria-label={d.label}
                            onClick={() => setDay(d.value, { active: !day.active })}
                            className={`relative h-7 w-12 flex-shrink-0 rounded-full transition-colors ${day.active ? 'bg-[#F52B8C]' : 'bg-gray-200'}`}>
                            <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all ${day.active ? 'left-[22px]' : 'left-0.5'}`} />
                          </button>
                          <span className={`w-11 flex-shrink-0 text-[16px] font-semibold ${day.active ? 'text-[#1A1A1A]' : 'text-gray-400'}`}>{d.short}</span>
                          {day.active ? (
                            <div className="flex flex-1 items-center gap-1.5 min-w-0">
                              <TimeSelect value={day.start} label={`${d.label} opens at`} onChange={(v) => setDay(d.value, { start: v })} />
                              <span className="text-[13px] text-gray-400">to</span>
                              <TimeSelect value={day.end} label={`${d.label} closes at`} onChange={(v) => setDay(d.value, { end: v })} />
                            </div>
                          ) : (
                            <span className="flex-1 text-[15px] text-gray-400">Closed</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}

              {name === 'share' && (
                <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16 lg:items-start">
                  <div className="max-w-md mx-auto lg:mx-0 w-full">
                    <Title
                      title={isLive ? 'Your page is live' : 'Your page is ready'}
                      sub={isLive ? 'This is your booking link. Put it where your clients are.' : 'It goes live when you start your free trial. This will be your booking link.'}
                    />
                    <div className="rounded-3xl border-2 p-5 text-center" style={{ borderColor: PINK, boxShadow: '0 10px 30px rgba(245,43,140,0.12)' }}>
                      <p className="break-all text-[22px] font-extrabold leading-tight tracking-tight text-[#1A1A1A]">
                        <span className="text-gray-400">getnelsy.com/</span>{slug}
                      </p>
                      {copied && (
                        <p className="mt-2 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#11733F]" role="status">
                          <Check className="h-4 w-4" /> Link copied
                          <button type="button" onClick={() => void copyLink()} className="ml-2 inline-flex items-center gap-1 text-gray-500 underline">
                            <Copy className="h-3.5 w-3.5" /> Copy again
                          </button>
                        </p>
                      )}
                    </div>

                    {!isLive && (
                      <a href="/onboarding?step=plan" className="mt-3 block text-center text-[15px] font-semibold" style={{ color: PINK }}>
                        Start my free trial
                      </a>
                    )}

                    <div className="mt-4 space-y-2">
                      {created.length === 0 ? (
                        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4">
                          <p className="flex items-start gap-2 text-[14px] font-medium text-amber-900">
                            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                            You have not added a service yet, so clients cannot book you. It takes one minute.
                          </p>
                          <button type="button" onClick={() => go(0)}
                            className="mt-3 h-11 rounded-full bg-[#1A1A1A] px-5 text-[14px] font-bold text-white hover:opacity-90 transition">
                            Add a service
                          </button>
                        </div>
                      ) : (
                        <SummaryRow label={created.length === 1 ? '1 service' : `${created.length} services`}
                          value={created.slice(0, 3).map((s) => `${s.name} ${formatMoney(Number(s.price_total), currency)}`).join(' · ') + (created.length > 3 ? ` · +${created.length - 3}` : '')} />
                      )}
                      {liveWeek && (
                        <SummaryRow label="Hours" value={summarizeWeek(liveWeek, HOUR12)}
                          note={hoursSaved ? undefined : 'You can change them in Settings.'} />
                      )}
                    </div>

                    <h2 className="mt-7 text-[16px] font-bold text-[#1A1A1A]">Paste it in your Instagram bio</h2>
                    <ol className="mt-3 space-y-2.5">
                      {['Copy your link below.', 'Open Instagram and tap Edit profile.', 'Tap Links, Add external link, then paste.'].map((text, i) => (
                        <li key={text} className="flex items-start gap-3 text-[15px] leading-snug text-gray-700">
                          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#fde8f3] text-[12px] font-bold text-[#F52B8C]">{i + 1}</span>
                          {text}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="mt-8 flex flex-col items-center gap-2 lg:mt-0">
                    <p className="text-[13px] font-semibold text-gray-500">What your clients see</p>
                    <StudioPhonePreview merchant={merchant} width={260} />
                  </div>
                </div>
              )}

              {error && (
                <p role="alert" className="mt-4 max-w-md rounded-xl bg-[#FDECEC] px-3 py-2.5 text-[13px] font-medium text-[#B42318]">
                  {error}
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Bottom actions */}
          <div className="sticky bottom-0 bg-white pt-2 w-full max-w-md mx-auto lg:mx-0" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
            <button type="submit" disabled={nextDisabled}
              className="h-14 w-full rounded-full text-[16px] font-bold text-white transition active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#E0167A] bg-[#F52B8C]">
              {nextLabel}
            </button>
            {name === 'share' ? (
              !copied && (
                <button type="button" onClick={onDone} className="mt-1 h-11 w-full text-[15px] font-semibold text-gray-500">
                  Go to my dashboard
                </button>
              )
            ) : (
              <button type="button" onClick={skip} disabled={busy} className="mt-1 h-11 w-full text-[15px] font-semibold text-gray-500 disabled:opacity-50">
                Skip for now
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Pieces ───────────────────────────────────────────────────────────────────

function Title({ title, sub }: { title: string; sub?: ReactNode }) {
  return (
    <div className="mb-7">
      <h1 className="text-[28px] font-extrabold leading-[1.15] tracking-tight text-[#1A1A1A]">{title}</h1>
      {sub && <p className="mt-2 text-[15px] leading-snug text-gray-500">{sub}</p>}
    </div>
  );
}

function Tick({ on }: { on: boolean }) {
  return (
    <span aria-hidden="true"
      className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border-2 transition-colors ${on ? 'border-[#F52B8C] bg-[#F52B8C] text-white' : 'border-gray-300 bg-white text-transparent'}`}>
      <Check className="h-4 w-4" strokeWidth={3} />
    </span>
  );
}

function PriceInput({ symbol, value, label, invalid, onChange }: { symbol: string; value: string; label: string; invalid: boolean; onChange: (v: string) => void }) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[16px] font-semibold text-gray-500">{symbol}</span>
      <input type="text" inputMode="decimal" autoComplete="off" value={value} placeholder="Your price"
        onChange={(e) => onChange(e.target.value.replace(/[^\d.,]/g, '').slice(0, 8))}
        className={`${inputCls} ${invalid ? 'border-red-400' : ''}`}
        style={{ paddingLeft: `${1.25 + symbol.length * 0.65}rem` }} />
    </label>
  );
}

function DurationSelect({ value, label, onChange }: { value: number; label: string; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(Number(e.target.value))} className={selectCls}>
        {DURATION_OPTIONS.map((m) => <option key={m} value={m}>{formatDuration(m)}</option>)}
      </select>
    </label>
  );
}

function TimeSelect({ value, label, onChange }: { value: string; label: string; onChange: (v: string) => void }) {
  return (
    <label className="block flex-1 min-w-0">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={`${selectCls} px-2`}>
        {!TIME_OPTIONS.includes(value) && <option value={value}>{displayTime(value, HOUR12)}</option>}
        {TIME_OPTIONS.map((t) => <option key={t} value={t}>{displayTime(t, HOUR12)}</option>)}
      </select>
    </label>
  );
}

function SummaryRow({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-gray-50 px-4 py-3">
      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#11733F] text-white">
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>
      <div className="min-w-0">
        <p className="text-[14px] font-semibold text-[#1A1A1A]">{label}</p>
        <p className="text-[13px] leading-snug text-gray-600">{value}</p>
        {note && <p className="text-[12px] text-gray-500">{note}</p>}
      </div>
    </div>
  );
}
