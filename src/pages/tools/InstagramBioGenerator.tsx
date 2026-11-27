import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ToolPage, { Prose, TextField, ChoiceField, CopyButton, PINK } from '@/components/tools/ToolPage';
import { CRAFT_OPTIONS, CRAFT_PRO, CRAFT_EMOJI, cleanWord, charCount, seededShuffle } from '@/components/tools/toolWords';
import type { Craft } from '@/components/tools/toolWords';

const link = 'underline text-[#F52B8C]';
const LIMIT = 150;

type CtaStyle = 'link' | 'dm' | 'waitlist' | 'appointment';

const CTA_OPTIONS: { value: CtaStyle; label: string }[] = [
  { value: 'link', label: 'Book via link' },
  { value: 'dm', label: 'DM to book' },
  { value: 'waitlist', label: 'Join waitlist' },
  { value: 'appointment', label: 'By appointment only' },
];

const CTAS: Record<CtaStyle, [string, string][]> = {
  // [with emoji, without emoji]
  link: [['Book online 👇', 'Book online below'], ['Tap the link to book 👇', 'Tap the link to book'], ['Book your appointment 👇', 'Book your appointment below']],
  dm: [['DM to book 💌', 'DM to book'], ['DM me to book your spot', 'DM me to book your spot'], ['Bookings by DM 💌', 'Bookings by DM']],
  waitlist: [['Join the waitlist 👇', 'Join the waitlist below'], ['Waitlist open 👇', 'Waitlist open: link below'], ['Get on the waitlist 👇', 'Get on the waitlist below']],
  appointment: [['By appointment only · Book 👇', 'By appointment only · Book below'], ['Appointments only 👇', 'Appointments only: link below'], ['By appointment · Link to book 👇', 'By appointment · Link to book']],
};

const DEFAULT_SPECIALTY: Record<Craft, string> = {
  nails: 'Gel-X, builder gel and nail art',
  lashes: 'Classic, hybrid and volume lashes',
  brows: 'Brow lamination, tint and shaping',
  hair: 'Color, cuts and styling',
  makeup: 'Bridal and event makeup',
  skin: 'Facials and skin treatments',
  beauty: 'Nails, lashes and brows',
};

interface Ctx { pro: string; e: string; city: string; spec: string; cta: string; emoji: boolean }

const TEMPLATES: ((c: Ctx) => (string | false)[])[] = [
  (c) => [`${c.emoji ? `${c.e} ` : ''}${c.pro}${c.city ? ` in ${c.city}` : ''}`, c.spec, c.cta],
  (c) => [`${c.spec}${c.city ? ` | ${c.city}` : ''}`, c.cta],
  (c) => [`${c.city ? `${c.city} ` : ''}${c.pro.toLowerCase()}${c.emoji ? ` ${c.e}` : ''}`, `Specializing in ${lower(c.spec)}`, c.cta],
  (c) => [`${c.spec}${c.emoji ? ' ✨' : ''}`, `${c.pro}${c.city ? ` based in ${c.city}` : ''}`, c.cta],
  (c) => [c.city && `${c.emoji ? '📍 ' : ''}${c.city}`, `${c.emoji ? `${c.e} ` : ''}${c.spec}`, c.cta],
  (c) => [`Your ${c.city ? `${c.city} ` : ''}${c.pro.toLowerCase()} for ${lower(c.spec)}`, c.cta],
  (c) => [`${c.pro}${c.city ? ` · ${c.city}` : ''}`, `${c.spec}, done with care`, c.cta],
  (c) => [c.spec, `${c.city ? `${c.emoji ? '📍 ' : ''}${c.city} · ` : ''}${c.pro}`, c.cta],
  (c) => [`${c.spec}${c.emoji ? ` ${c.e}` : ''}`, 'Clean work, clear prices', c.cta],
  (c) => [`${c.pro} for ${lower(c.spec)}`, c.city && `Serving ${c.city}`, c.cta],
];

function lower(s: string): string {
  // Lowercase the first letter only, and leave words like "Gel-X" or "SPF" as typed.
  const firstWord = s.split(/[\s,]/)[0];
  if (firstWord.includes('-') || /[A-Z]/.test(firstWord.slice(1))) return s;
  return s.charAt(0).toLowerCase() + s.slice(1);
}

function cleanText(raw: string, max: number): string {
  return raw.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

export default function InstagramBioGenerator() {
  const [craft, setCraft] = useState<Craft>('nails');
  const [city, setCity] = useState('Austin');
  const [specialty, setSpecialty] = useState('');
  const [ctaStyle, setCtaStyle] = useState<CtaStyle>('link');
  const [emoji, setEmoji] = useState(true);
  const [seed, setSeed] = useState(1);

  const bios = useMemo(() => {
    const spec = cleanText(specialty, 70) || DEFAULT_SPECIALTY[craft];
    const cityClean = cleanWord(city, 30);
    const ctas = seededShuffle(CTAS[ctaStyle], seed);
    const templates = seededShuffle(TEMPLATES, seed + 7);
    const out = templates.map((t, i) => {
      const [withE, withoutE] = ctas[i % ctas.length];
      const ctx: Ctx = { pro: CRAFT_PRO[craft], e: CRAFT_EMOJI[craft], city: cityClean, spec, cta: emoji ? withE : withoutE, emoji };
      return t(ctx).filter((l): l is string => typeof l === 'string' && l.trim().length > 0).join('\n');
    });
    const unique = [...new Set(out)];
    // Bios that fit Instagram's limit first.
    return unique.sort((a, b) => Number(charCount(a) > LIMIT) - Number(charCount(b) > LIMIT));
  }, [craft, city, specialty, ctaStyle, emoji, seed]);

  const tooLong = bios.filter((b) => charCount(b) > LIMIT).length;

  const calculator = (
    <div className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5 shadow-sm md:self-start">
        <h2 className="text-base font-bold text-gray-900">About you</h2>
        <ChoiceField label="What you do" value={craft} onChange={setCraft} options={CRAFT_OPTIONS} />
        <TextField label="City or area" value={city} onChange={setCity} placeholder="e.g. Austin, East London" maxLength={30} />
        <TextField label="Specialty (optional)" value={specialty} onChange={setSpecialty} placeholder={DEFAULT_SPECIALTY[craft]} hint="What you want to be known for. Keep it short." maxLength={70} />
        <ChoiceField label="Call to action" value={ctaStyle} onChange={setCtaStyle} options={CTA_OPTIONS} />
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 cursor-pointer">
          <input type="checkbox" checked={emoji} onChange={(e) => setEmoji(e.target.checked)} className="h-4 w-4 accent-pink-500" />
          Use emoji
        </label>
        <button
          type="button"
          onClick={() => setSeed((s) => s + 1)}
          className="w-full rounded-xl px-4 py-3 text-sm font-bold text-white transition hover:opacity-90"
          style={{ backgroundColor: PINK }}
        >
          Shuffle the bios
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-base font-bold text-gray-900">{bios.length} bio ideas</h2>
        <p className="text-xs text-gray-400 mb-4">Instagram allows {LIMIT} characters, line breaks included.</p>
        {tooLong > 0 && (
          <p className="mb-4 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800">
            {tooLong} {tooLong === 1 ? 'bio is' : 'bios are'} over {LIMIT} characters. Shorten your specialty or city to make {tooLong === 1 ? 'it' : 'them'} fit.
          </p>
        )}
        <ul className="space-y-3" data-testid="results">
          {bios.map((b) => {
            const n = charCount(b);
            const over = n > LIMIT;
            return (
              <li key={b} className={`rounded-xl border p-4 ${over ? 'border-amber-200 bg-amber-50' : 'border-gray-100 bg-gray-50'}`}>
                <p className="whitespace-pre-line text-sm text-gray-900 leading-relaxed break-words">{b}</p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className={`text-xs font-semibold ${over ? 'text-amber-700' : 'text-gray-400'}`} data-count={n}>{n}/{LIMIT}{over ? ' · too long' : ''}</span>
                  <CopyButton text={b} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );

  return (
    <ToolPage
      slug="instagram-bio-generator"
      name="Instagram Bio Generator"
      seoTitle="Instagram Bio Generator for Beauty Pros (150 Characters)"
      seoDescription="Free Instagram bio generator for nail techs, lash artists and beauty pros: enter your craft, city and specialty and copy bios that fit in 150 characters."
      h1="Instagram Bio Generator for Beauty Pros"
      intro="Write an Instagram bio that says what you do, where you work and how to book, in 150 characters or less. Pick your craft, add your city and specialty, choose a call to action and copy the bio you like."
      calculator={calculator}
      toc={[
        { id: 'how-to', label: 'How to use the generator' },
        { id: 'formula', label: 'The bio formula that works' },
        { id: 'limit', label: 'The 150-character limit' },
        { id: 'link', label: 'What to put in your bio link' },
      ]}
      faq={[
        { q: 'How long can an Instagram bio be?', a: 'Instagram bios are limited to 150 characters, and line breaks count as characters. The generator counts every bio and flags any that go over. Some emoji count as two characters, so the count shown is on the safe side.' },
        { q: 'What should a beauty pro put in their Instagram bio?', a: 'Three things: what you do, where you work, and how to book. Your specialty helps the right clients recognize themselves, your city tells them you are nearby, and a clear call to action points them to your booking link.' },
        { q: 'Should I put my city in my bio?', a: 'Yes, if most clients come to you in person. It tells people at a glance whether you are close enough to book. Your profile name field is also searchable on Instagram, so many pros add their craft and city there too.' },
        { q: '"DM to book" or a booking link?', a: 'A booking link lets clients see your services, prices and free times and book without waiting for a reply. "DM to book" works if you prefer to talk first, but it means answering every message yourself.' },
        { q: 'Is the generator free and private?', a: 'Yes. It runs in your browser, there is no signup, and nothing you type is sent or saved.' },
      ]}
      cta={{ title: 'Give your bio a link that books', text: 'Your Nelsy page shows your services and prices, and clients book and pay a deposit in a few taps. 0% Nelsy commission on your bookings.' }}
      related={[
        { label: 'Best Instagram bio ideas for nail techs', href: '/blog/best-instagram-bio-ideas-for-nail-techs' },
        { label: 'How to set up your link in bio', href: '/blog/how-to-set-up-nail-tech-link-in-bio' },
        { label: 'What to put in your link in bio', href: '/blog/what-to-put-in-link-in-bio-beauty-creators' },
        { label: 'Call to action examples for nail techs', href: '/blog/nail-tech-call-to-action-examples' },
      ]}
    >
      <Prose id="how-to" title="How to use the generator">
        <ol className="list-decimal list-inside space-y-2">
          <li><strong>Choose what you do</strong> and type your city or area.</li>
          <li><strong>Add your specialty</strong>, the services you most want to be booked for. Leave it empty to start from a common example for your craft.</li>
          <li><strong>Pick a call to action</strong> that matches how clients book you today.</li>
          <li><strong>Copy a bio</strong>, paste it into Instagram (Edit profile, then Bio), and adjust a word or two so it sounds like you. Press "Shuffle the bios" for new combinations.</li>
        </ol>
      </Prose>

      <Prose id="formula" title="The bio formula that works">
        <p><strong>What you do + where + what you are known for + how to book.</strong> A visitor decides in a few seconds whether to tap your link. A bio that answers those four questions makes that decision easy.</p>
        <p>Keep the wording plain. Clients search for "lash extensions" and "gel nails", not for clever wordplay. Save the personality for your captions, which you can draft with the <Link to="/tools/beauty-caption-generator" className={link}>beauty caption generator</Link>.</p>
      </Prose>

      <Prose id="limit" title="The 150-character limit">
        <p>Instagram cuts bios at 150 characters, and each line break uses one. If a bio is flagged as too long, shorten the specialty first: "Gel-X and nail art" reads as well as a full service list. Your services and prices can live on your booking page instead.</p>
      </Prose>

      <Prose id="link" title="What to put in your bio link">
        <p>Instagram gives you one main link, so make it the page where clients can book. A good booking page shows your services, prices, policies and free times. See <Link to="/blog/what-should-nail-tech-booking-page-include" className={link}>what a booking page should include</Link>, and pick a matching handle with the <Link to="/tools/username-generator" className={link}>username generator</Link>.</p>
      </Prose>
    </ToolPage>
  );
}
