import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ToolPage, { Prose, TextField, ChoiceField, CopyButton, PINK } from '@/components/tools/ToolPage';
import { CRAFT_OPTIONS, CRAFT_HANDLE_WORDS, toHandlePart, seededShuffle } from '@/components/tools/toolWords';
import type { Craft } from '@/components/tools/toolWords';

const link = 'underline text-[#F52B8C]';
const SHOW = 30;

const DOES: Partial<Record<Craft, string>> = { nails: 'nails', lashes: 'lashes', brows: 'brows', hair: 'hair', makeup: 'makeup' };
const THE_PRO: Record<Craft, string> = { nails: 'nailtech', lashes: 'lashtech', brows: 'browartist', hair: 'stylist', makeup: 'mua', skin: 'esthetician', beauty: 'beautypro' };

/** Instagram: 1 to 30 characters, a-z 0-9 . _, no leading or trailing period, no "..". */
function isValidInstagram(h: string): boolean {
  return /^[a-z0-9._]{1,30}$/.test(h) && !h.startsWith('.') && !h.endsWith('.') && !h.includes('..');
}
/** TikTok: 2 to 24 characters, a-z 0-9 . _, cannot end with a period. */
function isValidTikTok(h: string): boolean {
  return /^[a-z0-9._]{2,24}$/.test(h) && !h.endsWith('.');
}
/** Nelsy page address: lowercase letters, digits, hyphens and underscores. */
function toNelsySlug(h: string): string {
  return h.replace(/\./g, '-').replace(/-{2,}/g, '-').replace(/^-|-$/g, '');
}

function generateHandles(nameRaw: string, craft: Craft, cityRaw: string, seed: number): string[] {
  const words = nameRaw.split(/\s+/).map((w) => toHandlePart(w).slice(0, 16)).filter(Boolean).slice(0, 3);
  if (!words.length) return [];
  const first = words[0];
  const full = words.join('');
  const initials = words.length > 1 ? words.map((w) => w[0]).join('') : '';
  const city = toHandlePart(cityRaw);
  const crafts = CRAFT_HANDLE_WORDS[craft];
  const out: string[] = [];

  for (const w of crafts) {
    out.push(`${first}${w}`, `${first}.${w}`, `${first}_${w}`, `${w}by${first}`, `${w}.by.${first}`);
    if (words.length > 1) out.push(`${full}${w}`, `${full}.${w}`);
    if (city) out.push(`${first}${w}.${city}`, `${first}.${w}.${city}`, `${city}${w}by${first}`, `${city}.${w}`);
    if (initials) out.push(`${initials}.${w}`, `${initials}${w}`);
  }
  const main = crafts[0];
  out.push(`the${first}${main}`, `${first}${main}studio`, `${first}${main}co`, `studio.${first}`, `${first}.studio`, `${main}with${first}`, `${first}the${THE_PRO[craft]}`, `${first}.beauty`, `by.${first}`);
  const does = DOES[craft];
  if (does) out.push(`${first}does${does}`, `${first}.does.${does}`);
  if (words.length > 1) out.push(`${full}`, `${words.join('.')}`, `${words.join('_')}`);
  if (city) out.push(`${first}.${city}`, `${first}in${city}`);

  const valid = [...new Set(out)].filter(isValidInstagram);
  // Handles with the first name read best; initials-only versions go last.
  const rank = (h: string) => (h.includes(first) ? 0 : 1);
  return seededShuffle(valid, seed).slice(0, SHOW).sort((a, b) => rank(a) - rank(b) || a.length - b.length);
}

export default function UsernameGenerator() {
  const [name, setName] = useState('Maya Lopez');
  const [craft, setCraft] = useState<Craft>('nails');
  const [city, setCity] = useState('');
  const [seed, setSeed] = useState(1);

  const handles = useMemo(() => generateHandles(name, craft, city, seed), [name, craft, city, seed]);

  const calculator = (
    <div className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5 shadow-sm md:self-start">
        <h2 className="text-base font-bold text-gray-900">Your name</h2>
        <TextField label="Your name or brand" value={name} onChange={setName} placeholder="e.g. Maya Lopez or Velvet Studio" hint="Accents and symbols are removed automatically" maxLength={40} />
        <ChoiceField label="What you do" value={craft} onChange={setCraft} options={CRAFT_OPTIONS} />
        <TextField label="City (optional)" value={city} onChange={setCity} placeholder="e.g. Austin" maxLength={30} />
        <button
          type="button"
          onClick={() => setSeed((s) => s + 1)}
          className="w-full rounded-xl px-4 py-3 text-sm font-bold text-white transition hover:opacity-90"
          style={{ backgroundColor: PINK }}
        >
          Show more ideas
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm min-w-0">
        <div className="flex items-center justify-between gap-3 mb-1">
          <h2 className="text-base font-bold text-gray-900">{handles.length} username ideas</h2>
          {handles.length > 0 && <CopyButton text={handles.map((h) => `@${h}`).join('\n')} label="Copy all" />}
        </div>
        <p className="text-xs text-gray-400 mb-4">All follow Instagram&apos;s rules. The TikTok badge means the handle also fits TikTok&apos;s 24-character limit.</p>
        {handles.length === 0 ? (
          <p className="rounded-xl bg-gray-50 border border-gray-100 p-4 text-sm text-gray-500">Type your name or brand to see ideas.</p>
        ) : (
          <ul className="space-y-2" data-testid="results">
            {handles.map((h) => (
              <li key={h} className="flex items-center justify-between gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 break-all">@{h}</p>
                  <p className="text-[11px] text-gray-400 break-all">
                    <span className="font-semibold text-gray-500">IG</span>
                    {isValidTikTok(h) && <span className="font-semibold text-gray-500"> · TikTok</span>}
                    <span> · {h.length} chars · getnelsy.com/{toNelsySlug(h)}</span>
                  </p>
                </div>
                <CopyButton text={h} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  return (
    <ToolPage
      slug="username-generator"
      name="Link-in-Bio Username Generator"
      seoTitle="Username Generator for Beauty Pros: Instagram and TikTok"
      seoDescription="Free username generator for nail techs, lash artists and beauty pros: handle ideas from your name and craft that follow Instagram and TikTok rules."
      h1="Username Generator for Beauty Pros"
      intro="Get Instagram and TikTok handle ideas from your name or brand and what you do. Every suggestion is lowercase, uses only letters, numbers, periods and underscores, and fits Instagram's 30-character limit."
      calculator={calculator}
      toc={[
        { id: 'how-to', label: 'How to use the generator' },
        { id: 'rules', label: 'Instagram and TikTok username rules' },
        { id: 'good-handle', label: 'What makes a good beauty handle' },
        { id: 'everywhere', label: 'Use the same handle everywhere' },
      ]}
      faq={[
        { q: 'What characters are allowed in an Instagram username?', a: 'Letters, numbers, periods and underscores, up to 30 characters. A username cannot start or end with a period or contain two periods in a row. Usernames are not case sensitive, so the generator shows them in lowercase.' },
        { q: 'How long can a TikTok username be?', a: 'TikTok usernames can be 2 to 24 characters and use letters, numbers, underscores and periods, but cannot end with a period. Handles marked with the TikTok badge meet those rules.' },
        { q: 'Does the generator check if a handle is taken?', a: 'No. It suggests handles that follow the rules, but only Instagram and TikTok can tell you if one is free. Search for it in each app, or try it in the username field of your profile settings.' },
        { q: 'Should I use periods or underscores?', a: 'Fewer is better. A handle without symbols is the easiest to say and type. If your first choice is taken, a single period between words, like maya.nails, is easier to read than an underscore.' },
        { q: 'Can I use the same name for my Nelsy page?', a: 'Yes. Nelsy pages live at getnelsy.com/your-name, using lowercase letters, numbers, hyphens and underscores. The generator shows the matching address for each handle, with periods turned into hyphens.' },
      ]}
      cta={{ title: 'Claim your page with the same name', text: 'Create your Nelsy page at getnelsy.com/your-name, add your services and take bookings and deposits from your bio. 0% Nelsy commission on your bookings.' }}
      related={[
        { label: 'How to set up your link in bio', href: '/blog/how-to-set-up-nail-tech-link-in-bio' },
        { label: 'How to name your nail business', href: '/blog/how-to-name-your-nail-business' },
        { label: 'How to grow your nail tech Instagram', href: '/blog/how-to-grow-nail-tech-instagram' },
        { label: 'Best link in bio for beauty creators', href: '/blog/best-link-in-bio-for-beauty-creators' },
      ]}
    >
      <Prose id="how-to" title="How to use the generator">
        <ol className="list-decimal list-inside space-y-2">
          <li><strong>Type your name or your brand.</strong> Accents and symbols are removed, so "Zoé" becomes "zoe".</li>
          <li><strong>Choose what you do</strong> so the handles tell people your craft.</li>
          <li><strong>Add your city</strong> if you want local versions, which help when your first choice is taken.</li>
          <li><strong>Copy the ones you like</strong> and check them in Instagram and TikTok. Press "Show more ideas" for a new batch.</li>
        </ol>
      </Prose>

      <Prose id="rules" title="Instagram and TikTok username rules">
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-2">
          <p><strong>Instagram:</strong> up to 30 characters; letters, numbers, periods and underscores; no period at the start or end; no two periods in a row.</p>
          <p><strong>TikTok:</strong> 2 to 24 characters; letters, numbers, underscores and periods; no period at the end.</p>
        </div>
        <p>The generator applies these rules to every suggestion. The apps can change their rules, so the app itself always has the final word.</p>
      </Prose>

      <Prose id="good-handle" title="What makes a good beauty handle">
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Says what you do.</strong> "nails", "lashes" or "mua" in the handle helps people remember you and find you in search.</li>
          <li><strong>Easy to say out loud.</strong> Clients will tell friends about you. Avoid swapped letters and long strings of numbers.</li>
          <li><strong>Short.</strong> Under 20 characters fits both apps and looks clean on business cards.</li>
          <li><strong>Matches your business name.</strong> Still choosing one? Try the <Link to="/tools/beauty-business-name-generator" className={link}>beauty business name generator</Link>.</li>
        </ul>
      </Prose>

      <Prose id="everywhere" title="Use the same handle everywhere">
        <p>Using one handle on Instagram, TikTok, your Google Business Profile and your booking page makes you easier to find and tag. Put your booking link in your bio, then write the bio with the <Link to="/tools/instagram-bio-generator" className={link}>Instagram bio generator</Link>. For more on links, read <Link to="/blog/how-to-set-up-nail-tech-link-in-bio" className={link}>how to set up your link in bio</Link>.</p>
      </Prose>
    </ToolPage>
  );
}
