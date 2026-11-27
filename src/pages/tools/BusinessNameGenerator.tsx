import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ToolPage, { Prose, TextField, ChoiceField, CopyButton, PINK } from '@/components/tools/ToolPage';
import {
  CRAFT_OPTIONS, CRAFT_NOUNS, STYLE_OPTIONS, STYLE_WORDS, PLACE_WORDS, cleanWord, seededShuffle,
} from '@/components/tools/toolWords';
import type { Craft, NameStyle } from '@/components/tools/toolWords';

const link = 'underline text-[#F52B8C]';
const SHOW = 30;

function generateNames(keywordRaw: string, craft: Craft, style: NameStyle, seed: number): string[] {
  const k = cleanWord(keywordRaw, 20);
  const nouns = CRAFT_NOUNS[craft];
  const styles = STYLE_WORDS[style];
  const places = PLACE_WORDS[style];
  const out: string[] = [];

  for (const s of styles) {
    for (const n of nouns.slice(0, 4)) out.push(`${s} ${n}`);
    for (const p of places.slice(0, 3)) if (p !== s) out.push(`The ${s} ${p}`);
  }
  for (let i = 0; i < styles.length; i++) {
    const a = styles[i];
    const b = styles[(i + 3) % styles.length];
    out.push(`${a} & ${b}`);
    out.push(`${a} & ${b} ${nouns[0]}`);
  }
  // Alliteration: a style word that starts like the craft noun reads well.
  for (const n of nouns) {
    for (const s of Object.values(STYLE_WORDS).flat()) {
      if (s[0] === n[0] && s !== n) out.push(`${s} ${n}`);
    }
  }
  if (style === 'luxe') for (const s of styles.slice(0, 6)) out.push(`House of ${s}`);

  if (k) {
    const keywordNames: string[] = [];
    for (const n of nouns) {
      keywordNames.push(`${k} ${n}`);
      keywordNames.push(`${n} by ${k}`);
    }
    for (const p of places) keywordNames.push(`${k} ${p}`, `The ${k} ${p}`);
    for (const s of styles.slice(0, 6)) keywordNames.push(`${s} by ${k}`);
    keywordNames.push(`${k} & Co.`, `Studio ${k}`, `${k}'s ${nouns[0]}`);
    // Keyword ideas first, then the rest, both shuffled.
    const kw = seededShuffle([...new Set(keywordNames)], seed).slice(0, 18);
    const rest = seededShuffle([...new Set(out)], seed + 1).filter((n) => !kw.includes(n));
    return [...kw, ...rest].filter((n) => n.length <= 32).slice(0, SHOW);
  }
  return seededShuffle([...new Set(out)], seed).filter((n) => n.length <= 32).slice(0, SHOW);
}

export default function BusinessNameGenerator() {
  const [keyword, setKeyword] = useState('');
  const [craft, setCraft] = useState<Craft>('nails');
  const [style, setStyle] = useState<NameStyle>('luxe');
  const [seed, setSeed] = useState(1);

  const names = useMemo(() => generateNames(keyword, craft, style, seed), [keyword, craft, style, seed]);

  const calculator = (
    <div className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5 shadow-sm md:self-start">
        <h2 className="text-base font-bold text-gray-900">Your business</h2>
        <TextField label="Keyword or your name (optional)" value={keyword} onChange={setKeyword} placeholder="e.g. Luna, Maya, Rose" hint="A first name, a word you love, or your street or neighborhood" maxLength={20} />
        <ChoiceField label="What you do" value={craft} onChange={setCraft} options={CRAFT_OPTIONS} />
        <ChoiceField label="Style" value={style} onChange={setStyle} options={STYLE_OPTIONS} />
        <button
          type="button"
          onClick={() => setSeed((s) => s + 1)}
          className="w-full rounded-xl px-4 py-3 text-sm font-bold text-white transition hover:opacity-90"
          style={{ backgroundColor: PINK }}
        >
          Show more ideas
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">{names.length} name ideas</h2>
            <p className="text-xs text-gray-400">Updates as you type. Check availability before you commit.</p>
          </div>
          <CopyButton text={names.join('\n')} label="Copy all" />
        </div>
        <ul className="grid sm:grid-cols-2 gap-2" data-testid="results">
          {names.map((n) => (
            <li key={n} className="flex items-center justify-between gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2">
              <span className="text-sm font-semibold text-gray-900 break-words min-w-0">{n}</span>
              <CopyButton text={n} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <ToolPage
      slug="beauty-business-name-generator"
      name="Beauty Business Name Generator"
      seoTitle="Beauty Business Name Generator: Nail, Lash, Brow Names"
      seoDescription="Free beauty business name generator: pick your craft and style, add a keyword and get dozens of name ideas for your nail, lash, brow, hair or skin business."
      h1="Beauty Business Name Generator"
      intro="Get dozens of name ideas for your nail, lash, brow, hair, makeup or skincare business. Choose your craft and a style, add your name or a keyword if you like, then copy the ones you love and check they are free to use."
      calculator={calculator}
      toc={[
        { id: 'how-to', label: 'How to use the generator' },
        { id: 'good-name', label: 'What makes a good beauty business name' },
        { id: 'availability', label: 'Check availability before you commit' },
        { id: 'shortlist', label: 'From shortlist to final name' },
      ]}
      faq={[
        { q: 'How does the name generator work?', a: 'It combines curated word lists for each craft and style with naming patterns that beauty businesses commonly use, such as "keyword + craft", "craft by name" and "The ... Studio". Everything runs in your browser: nothing you type is sent anywhere.' },
        { q: 'Are these names available?', a: 'The generator cannot check availability. Before you choose, search the name on Instagram and TikTok, check the domain, search Google and Google Maps in your area, and look it up in your local business register and trademark database.' },
        { q: 'Should I use my own name?', a: 'Your own name is unique and builds a personal brand, which suits solo pros. A brand name is easier to grow into a team or sell later. Many pros combine both, for example "Nails by Maya".' },
        { q: 'Should the name say what I do?', a: 'It helps. A name with "nails", "lash" or "brows" in it tells people what you offer before they read your bio, and it can help people find you when they search for that service.' },
        { q: 'Can I use a name from this list for free?', a: 'Yes. The ideas are generated for you to use. Just make sure no one else already uses the name in your area or has registered it as a trademark.' },
      ]}
      cta={{ title: 'Found your name? Give it a home', text: 'Put it on a Nelsy page with your services, prices and online booking, and share one link in your bio. 0% Nelsy commission on your bookings.' }}
      related={[
        { label: 'How to name your nail business', href: '/blog/how-to-name-your-nail-business' },
        { label: '100 nail business name ideas', href: '/blog/100-nail-business-name-ideas' },
        { label: 'How to brand your nail business', href: '/blog/how-to-brand-your-nail-business' },
        { label: 'Nail tech branding ideas', href: '/blog/nail-tech-branding-ideas' },
      ]}
    >
      <Prose id="how-to" title="How to use the generator">
        <ol className="list-decimal list-inside space-y-2">
          <li><strong>Pick what you do.</strong> The craft sets the words that tell clients what you offer: nails, lash studio, brow bar and so on.</li>
          <li><strong>Pick a style.</strong> Luxe, minimal, cute, natural, bold or playful each use their own word list, so the ideas match the look of your work.</li>
          <li><strong>Add a keyword if you want.</strong> Your first name, a nickname, your neighborhood or a word that means something to you. Ideas with your keyword appear first.</li>
          <li><strong>Press "Show more ideas"</strong> for a new batch, copy the ones you like, and check them with the steps below.</li>
        </ol>
      </Prose>

      <Prose id="good-name" title="What makes a good beauty business name">
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Easy to say and spell.</strong> Clients will search for it after hearing it from a friend.</li>
          <li><strong>Clear about the service</strong>, either in the name or in the line right under it.</li>
          <li><strong>Room to grow.</strong> "Lash Lounge" is fine until you add brows. A broader word like "Beauty" or "Studio" leaves room.</li>
          <li><strong>Short enough for a handle.</strong> Instagram usernames are limited to 30 characters and TikTok to 24.</li>
        </ul>
        <p>For more ideas and examples, read <Link to="/blog/how-to-name-your-nail-business" className={link}>how to name your nail business</Link>.</p>
      </Prose>

      <Prose id="availability" title="Check availability before you commit">
        <ol className="list-decimal list-inside space-y-2">
          <li><strong>Instagram and TikTok.</strong> Search the name and the handle. The <Link to="/tools/username-generator" className={link}>username generator</Link> suggests handle versions that follow each app&apos;s rules.</li>
          <li><strong>Google and Google Maps.</strong> Search the name with your city to see if a business nearby already uses it.</li>
          <li><strong>Domain.</strong> Check whether the .com or your local domain is free, even if you do not need a website yet.</li>
          <li><strong>Business register and trademarks.</strong> Look the name up in your state or country business register and in the national trademark database (in the US, the USPTO trademark search).</li>
        </ol>
        <p>This is general guidance, not legal advice. If you plan to invest a lot in a brand, ask a local professional.</p>
      </Prose>

      <Prose id="shortlist" title="From shortlist to final name">
        <p>Keep three to five names. Say each one out loud, type it as a handle, and picture it on your booking page and price list. Ask a few clients which one they would remember. Then check availability for the winner before you print anything.</p>
        <p>Once you have a name, write a bio with the <Link to="/tools/instagram-bio-generator" className={link}>Instagram bio generator</Link>.</p>
      </Prose>
    </ToolPage>
  );
}
