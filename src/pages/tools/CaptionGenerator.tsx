import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ToolPage, { Prose, TextField, ChoiceField, CopyButton, PINK } from '@/components/tools/ToolPage';
import { CRAFT_OPTIONS, CRAFT_RESULT, CRAFT_EMOJI, cleanWord, toHandlePart, seededShuffle } from '@/components/tools/toolWords';
import type { Craft } from '@/components/tools/toolWords';

const link = 'underline text-[#F52B8C]';

type PostType = 'showcase' | 'before-after' | 'availability' | 'promo' | 'tip' | 'behind';
type Tone = 'warm' | 'luxe' | 'playful' | 'minimal';
type Cta = 'link' | 'dm' | 'comment' | 'save';

const POST_OPTIONS: { value: PostType; label: string }[] = [
  { value: 'showcase', label: 'New set or look' },
  { value: 'before-after', label: 'Before and after' },
  { value: 'availability', label: 'Open spots' },
  { value: 'promo', label: 'Offer' },
  { value: 'tip', label: 'Aftercare tip' },
  { value: 'behind', label: 'Behind the scenes' },
];
const TONE_OPTIONS: { value: Tone; label: string }[] = [
  { value: 'warm', label: 'Warm' },
  { value: 'luxe', label: 'Luxe' },
  { value: 'playful', label: 'Playful' },
  { value: 'minimal', label: 'Minimal' },
];
const CTA_OPTIONS: { value: Cta; label: string }[] = [
  { value: 'link', label: 'Book via link in bio' },
  { value: 'dm', label: 'DM to book' },
  { value: 'comment', label: 'Comment a keyword' },
  { value: 'save', label: 'Save and share' },
];

const TONE_EMOJI: Record<Tone, string[]> = { warm: ['💕', '🥰', '✨'], luxe: ['🤍', '✨'], playful: ['😍', '🎉', '👀'], minimal: [''] };

// {r} = what the client gets ("set"), {d} = details typed by the user, {D} = same, capitalized.
const HOOKS: Record<PostType, Record<Tone, string[]>> = {
  showcase: {
    warm: ['Fresh {r} for a lovely client today {em}', '{D}, and I am so happy with how it turned out {em}', 'Made this {r} with so much love {em}'],
    luxe: ['{D}. Simple, polished, made to last.', 'Details make the difference: {d}.', 'Quietly perfect. {D}.'],
    playful: ['Okay, this {r} came out SO good {em}', '{D}? Yes please {em}', 'Can we talk about this {r} for a second {em}'],
    minimal: ['{D}.', 'Today: {d}.', 'Fresh {r}. {D}.'],
  },
  'before-after': {
    warm: ['Before and after {em} Swipe to see the difference', 'From before to after: {d} {em}', 'Love a good before and after {em}'],
    luxe: ['Before / after. {D}.', 'The transformation: {d}.', 'Before and after, refined.'],
    playful: ['Wait for the after {em}', 'Swipe for the glow up {em}', 'The before vs the after {em}'],
    minimal: ['Before → after.', 'Before and after: {d}.', 'Swipe.'],
  },
  availability: {
    warm: ['A few spots just opened up {em}', 'I have some openings coming up and would love to see you {em}', 'Good news: new openings this week {em}'],
    luxe: ['A few appointments are open this week.', 'New availability, for {d}.', 'Openings this week, for those who plan ahead.'],
    playful: ['Spots are OPEN {em} Who needs a fresh {r}?', 'Your sign to finally book that {r} {em}', 'Calendar update {em} New spots just dropped'],
    minimal: ['New openings this week.', 'Availability updated.', 'Open spots: {d}.'],
  },
  promo: {
    warm: ['A little something for you {em} {D}', 'Treat yourself: {d} {em}', 'This one is for you {em} {D}'],
    luxe: ['An invitation: {d}.', 'For a limited time: {d}.', 'A small treat, beautifully done. {D}.'],
    playful: ['Offer alert {em} {D}', 'Your wallet will thank you {em} {D}', 'Okay, this is a good one {em} {D}'],
    minimal: ['Offer: {d}.', 'This month: {d}.', '{D}.'],
  },
  tip: {
    warm: ['A quick tip to keep your {r} looking fresh {em}', 'Little reminder from me to you {em}', 'Your aftercare, made easy {em}'],
    luxe: ['How to make your {r} last.', 'Aftercare, simplified.', 'The secret to a {r} that lasts.'],
    playful: ['Save this before your next appointment {em}', 'PSA for everyone with a fresh {r} {em}', 'Aftercare tip you will thank me for {em}'],
    minimal: ['One aftercare tip.', 'Aftercare.', 'Make it last.'],
  },
  behind: {
    warm: ['A little peek behind the scenes {em}', 'This is what goes into every {r} {em}', 'Come spend an appointment with me {em}'],
    luxe: ['The process behind the result.', 'Every detail, considered.', 'Behind every {r}: time and care.'],
    playful: ['POV: you are watching me work {em}', 'Process video, because the details matter {em}', 'How it started vs how it is going {em}'],
    minimal: ['Process.', 'How it is made.', 'Behind the scenes.'],
  },
};

const DEFAULT_DETAILS: Record<PostType, Record<Craft, string>> = {
  showcase: { nails: 'chrome french on short almond', lashes: 'a soft hybrid set', brows: 'laminated and tinted brows', hair: 'a soft balayage', makeup: 'soft glam for a wedding guest', skin: 'a hydrating facial', beauty: 'a fresh, natural look' },
  'before-after': { nails: 'a fresh builder gel set', lashes: 'a volume set', brows: 'brow lamination', hair: 'a color correction', makeup: 'full glam', skin: 'a deep-cleansing facial', beauty: 'a full refresh' },
  availability: { nails: 'gel and builder gel sets', lashes: 'full sets and fills', brows: 'brow shaping and lamination', hair: 'cuts and color', makeup: 'event makeup', skin: 'facials', beauty: 'all services' },
  promo: { nails: 'a free nail art add-on with any full set', lashes: 'a free lash bath with every fill', brows: 'a free tint with brow lamination', hair: 'a free gloss with any color', makeup: 'a free lash strip with full glam', skin: 'a free mask add-on with any facial', beauty: 'a free add-on with your next booking' },
  tip: { nails: 'cuticle oil', lashes: 'lash care', brows: 'brow care', hair: 'color care', makeup: 'long-wear makeup', skin: 'daily SPF', beauty: 'aftercare' },
  behind: { nails: 'prep and shaping', lashes: 'isolation and mapping', brows: 'mapping and shaping', hair: 'sectioning and toning', makeup: 'skin prep', skin: 'skin analysis', beauty: 'prep' },
};

const TIPS: Record<Craft, string[]> = {
  nails: ['Use cuticle oil every day and wear gloves when you clean: it keeps your set strong and your cuticles healthy.', 'Your nails are jewels, not tools. Use your fingertips, not your nails, to open cans and peel labels.'],
  lashes: ['Keep your lashes dry for the first 24 hours and brush them gently every morning.', 'Skip oil-based makeup removers near your lashes: oil weakens the bond.'],
  brows: ['Follow the aftercare from your appointment, and avoid rubbing or picking at your brows while they settle.', 'Brush your brows into place each morning with a clean spoolie.'],
  hair: ['Use a color-safe shampoo and turn the water temperature down: it helps your color stay vibrant.', 'Protect your hair before heat styling, every time.'],
  makeup: ['Start with skin prep and finish with a setting spray for makeup that lasts all day.', 'Bring blotting papers to long events instead of adding more powder.'],
  skin: ['Wear SPF every day, even when it is cloudy: it protects your skin and the results of your treatment.', 'Be gentle after a treatment: skip strong exfoliants for a few days unless told otherwise.'],
  beauty: ['Follow your aftercare and book your next appointment before you leave: it keeps everything looking fresh.', 'Small daily habits make results last longer than any product.'],
};

const BODIES: Record<PostType, string[]> = {
  showcase: ['Every {r} is planned around your style and your routine.', 'Want something like this? Tell me what you love and we will plan it together.'],
  'before-after': ['Results like this start with a short chat about what you want.', 'Every result is planned around you.'],
  availability: ['Spots are first come, first served.', 'If you have been waiting for a sign, this is it.'],
  promo: ['Message me if you have any questions about the offer.', 'Mention this post when you book.'],
  tip: ['TIP'],
  behind: ['Prep is the part you do not see, and it is what makes the result last.', 'Good work takes time. This is where it goes.'],
};

const CTAS: Record<Cta, string[]> = {
  link: ['Book through the link in my bio.', 'Tap the link in my bio to book your spot.'],
  dm: ['DM me to book.', 'Send me a DM and I will find you a time.'],
  comment: ['Comment "BOOK" and I will send you my booking link.', 'Comment "LINK" and I will send it to you.'],
  save: ['Save this for your next appointment.', 'Save this and send it to a friend who needs it.'],
};

const NICHE_TAGS: Record<Craft, string[]> = {
  nails: ['#nailart', '#gelnails', '#naildesign', '#nailinspo', '#nailtech', '#buildergel', '#nailsofinstagram', '#chromenails', '#frenchnails', '#gelx'],
  lashes: ['#lashextensions', '#lashartist', '#lashtech', '#hybridlashes', '#volumelashes', '#classiclashes', '#lashlift', '#lashesonfleek', '#lashinspo', '#lashstudio'],
  brows: ['#browlamination', '#browartist', '#brows', '#browshaping', '#browtint', '#browgoals', '#laminatedbrows', '#browstudio', '#browinspo', '#browmapping'],
  hair: ['#balayage', '#hairstylist', '#haircolor', '#hairinspo', '#blonde', '#haircut', '#hairtransformation', '#colorist', '#hairgoals', '#salonlife'],
  makeup: ['#makeupartist', '#softglam', '#bridalmakeup', '#mua', '#glam', '#makeuplook', '#eventmakeup', '#makeupinspo', '#weddingmakeup', '#makeupartistry'],
  skin: ['#esthetician', '#skincare', '#facial', '#glowingskin', '#skincareroutine', '#skintreatment', '#healthyskin', '#facialist', '#skinhealth', '#glow'],
  beauty: ['#beautystudio', '#beautysalon', '#beautypro', '#selfcare', '#beautyinspo', '#beautytreatment', '#glowup', '#beautybusiness', '#treatyourself', '#beautytips'],
};

const LOCAL_SUFFIX: Record<Craft, string[]> = {
  nails: ['nails', 'nailtech', 'nailartist', 'manicure', 'beauty'],
  lashes: ['lashes', 'lashtech', 'lashextensions', 'lashartist', 'beauty'],
  brows: ['brows', 'browartist', 'browlamination', 'browbar', 'beauty'],
  hair: ['hair', 'hairstylist', 'salon', 'balayage', 'beauty'],
  makeup: ['makeup', 'makeupartist', 'mua', 'bridalmakeup', 'beauty'],
  skin: ['esthetician', 'facial', 'skincare', 'skin', 'beauty'],
  beauty: ['beauty', 'beautysalon', 'beautystudio', 'selfcare', 'glow'],
};

const BROAD_TAGS = ['#beauty', '#selfcare', '#smallbusiness', '#supportsmallbusiness', '#beautytips', '#treatyourself', '#instabeauty'];

function fill(t: string, r: string, d: string, em: string): string {
  const D = d.charAt(0).toUpperCase() + d.slice(1);
  return t.replace(/\{r\}/g, r).replace(/\{d\}/g, d).replace(/\{D\}/g, D).replace(/\{em\}/g, em).replace(/\s+([.!?])/g, '$1').replace(/ {2,}/g, ' ').trim();
}

export default function CaptionGenerator() {
  const [craft, setCraft] = useState<Craft>('nails');
  const [postType, setPostType] = useState<PostType>('showcase');
  const [tone, setTone] = useState<Tone>('warm');
  const [cta, setCta] = useState<Cta>('link');
  const [details, setDetails] = useState('');
  const [city, setCity] = useState('Austin');
  const [seed, setSeed] = useState(1);

  const { captions, sets } = useMemo(() => {
    const r = CRAFT_RESULT[craft];
    const d = details.replace(/\s+/g, ' ').trim().replace(/[.!?]+$/, '').slice(0, 80) || DEFAULT_DETAILS[postType][craft];
    const cityName = cleanWord(city, 30);
    const cityTag = toHandlePart(city);
    const hooks = seededShuffle(HOOKS[postType][tone], seed);
    const bodies = postType === 'tip' ? seededShuffle(TIPS[craft], seed + 1) : seededShuffle(BODIES[postType], seed + 1);
    const ctas = seededShuffle(CTAS[cta], seed + 2);
    const emojis = TONE_EMOJI[tone];

    const out: string[] = [];
    for (let i = 0; i < 4; i++) {
      const em = tone === 'minimal' ? '' : emojis[(i + seed) % emojis.length] || CRAFT_EMOJI[craft];
      const hook = fill(hooks[i % hooks.length], r, d, em);
      const body = fill(bodies[i % bodies.length], r, d, em);
      const ctaLine = ctas[i % ctas.length];
      const loc = cityName && i % 2 === 0 ? (tone === 'minimal' ? cityName : `📍 ${cityName}`) : '';
      out.push([hook, body, [ctaLine, loc].filter(Boolean).join('\n')].join('\n\n'));
    }

    const niche = seededShuffle(NICHE_TAGS[craft], seed + 3).slice(0, 5);
    const local = cityTag ? [...new Set(LOCAL_SUFFIX[craft].map((s) => `#${cityTag}${s}`))].slice(0, 5) : [];
    const broad = seededShuffle(BROAD_TAGS, seed + 4).slice(0, 5);
    const mixed = [...niche.slice(0, 2), ...(local.length ? local.slice(0, 2) : NICHE_TAGS[craft].slice(6, 8)), broad[0]];
    const tagSets = [
      { name: 'Balanced mix', tags: [...new Set(mixed)] },
      { name: 'Niche', tags: niche },
      ...(local.length ? [{ name: `Local: ${cityName}`, tags: local }] : []),
      { name: 'Broad', tags: broad },
    ];
    return { captions: [...new Set(out)], sets: tagSets };
  }, [craft, postType, tone, cta, details, city, seed]);

  const firstSet = sets[0].tags.join(' ');

  const calculator = (
    <div className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5 shadow-sm md:self-start">
        <h2 className="text-base font-bold text-gray-900">Your post</h2>
        <ChoiceField label="What you do" value={craft} onChange={setCraft} options={CRAFT_OPTIONS} />
        <ChoiceField label="Post type" value={postType} onChange={setPostType} options={POST_OPTIONS} />
        <TextField
          label={postType === 'promo' ? 'Your offer (optional)' : 'Details (optional)'}
          value={details}
          onChange={setDetails}
          placeholder={DEFAULT_DETAILS[postType][craft]}
          hint={postType === 'promo' ? 'Describe the offer exactly as it is' : 'What is in the photo or video'}
          maxLength={80}
        />
        <ChoiceField label="Tone" value={tone} onChange={setTone} options={TONE_OPTIONS} />
        <ChoiceField label="Call to action" value={cta} onChange={setCta} options={CTA_OPTIONS} />
        <TextField label="City (optional, for local hashtags)" value={city} onChange={setCity} placeholder="e.g. Austin" maxLength={30} />
        <button
          type="button"
          onClick={() => setSeed((s) => s + 1)}
          className="w-full rounded-xl px-4 py-3 text-sm font-bold text-white transition hover:opacity-90"
          style={{ backgroundColor: PINK }}
        >
          New captions
        </button>
      </div>
      <div className="space-y-6 min-w-0">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-900">{captions.length} captions</h2>
          <p className="text-xs text-gray-400 mb-4">Edit a word or two so they sound like you.</p>
          <ul className="space-y-3" data-testid="results">
            {captions.map((c) => (
              <li key={c} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <p className="whitespace-pre-line text-sm text-gray-900 leading-relaxed break-words">{c}</p>
                <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
                  <CopyButton text={c} label="Copy caption" />
                  <CopyButton text={`${c}\n\n${firstSet}`} label="Copy with hashtags" />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-900">Hashtag sets</h2>
          <p className="text-xs text-gray-400 mb-4">Five per set. "Copy with hashtags" uses the balanced mix.</p>
          <ul className="space-y-3">
            {sets.map((s) => (
              <li key={s.name} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{s.name}</p>
                  <CopyButton text={s.tags.join(' ')} />
                </div>
                <p className="text-sm text-gray-800 break-words">{s.tags.join(' ')}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <ToolPage
      slug="beauty-caption-generator"
      name="Beauty Caption Generator"
      seoTitle="Beauty Caption Generator: Instagram Captions + Hashtags"
      seoDescription="Free caption generator for nail techs, lash artists and beauty pros: pick your post type, tone and call to action and copy captions with hashtag sets."
      h1="Beauty Caption Generator"
      intro="Write Instagram and TikTok captions for your beauty posts in seconds. Choose what you do, the type of post, your tone and a call to action, then copy a caption with a matching hashtag set."
      calculator={calculator}
      toc={[
        { id: 'how-to', label: 'How to use the generator' },
        { id: 'structure', label: 'The caption structure behind it' },
        { id: 'hashtags', label: 'How to use the hashtag sets' },
        { id: 'cta', label: 'Choosing a call to action' },
      ]}
      faq={[
        { q: 'How does the caption generator work?', a: 'It combines a hook, a short body line and a call to action written for each post type and tone, then fills in your details and city. It runs entirely in your browser, with no AI service and no data sent anywhere.' },
        { q: 'How many hashtags should I use?', a: 'Each set has five. Instagram has reduced how many hashtags a single post can carry, and a few relevant tags tend to work better than a long list. Check the current limit in the app before you post.' },
        { q: 'Should I use local hashtags?', a: 'Yes, if your clients come to you in person. A tag like #austinnails is used by people looking for a pro nearby, which is the audience most likely to book.' },
        { q: 'Can I use these captions on TikTok?', a: 'Yes. The hook, body and call to action structure works on TikTok too. Keep the first line short, because it is what people see before they tap "more".' },
        { q: 'What if I run a promotion?', a: 'Choose "Offer" and type the offer exactly as it is, including any conditions. The generator does not invent prices or discounts: it uses what you write.' },
      ]}
      cta={{ title: 'Turn likes into bookings', text: 'Point your call to action to a Nelsy page where clients see your services and prices and book with a deposit. 0% Nelsy commission on your bookings.' }}
      related={[
        { label: 'Nail tech caption ideas', href: '/blog/nail-tech-caption-ideas' },
        { label: 'Nail content that gets bookings', href: '/blog/nail-content-that-gets-bookings' },
        { label: 'Nail tech reel hooks', href: '/blog/nail-tech-reel-hooks' },
        { label: '100 nail tech content ideas', href: '/blog/100-nail-tech-content-ideas' },
      ]}
    >
      <Prose id="how-to" title="How to use the generator">
        <ol className="list-decimal list-inside space-y-2">
          <li><strong>Choose your craft and the post type</strong>: a new set, a before and after, open spots, an offer, an aftercare tip or a behind-the-scenes video.</li>
          <li><strong>Add the details</strong> of what is in the photo, or the exact offer. Leave it empty to see an example.</li>
          <li><strong>Pick a tone and a call to action</strong>, then add your city for local hashtags.</li>
          <li><strong>Copy a caption</strong> on its own or with the balanced hashtag set. Press "New captions" for other combinations.</li>
        </ol>
      </Prose>

      <Prose id="structure" title="The caption structure behind it">
        <p><strong>Hook, value, call to action.</strong> The first line is what people see in the feed, so it has to make them stop. The middle line gives a reason to care: a detail about the work, a tip, or why the opening matters. The last line tells them exactly what to do next.</p>
        <p>For more first lines, see <Link to="/blog/nail-tech-reel-hooks" className={link}>reel hooks for nail techs</Link>, and plan a month of posts with the <Link to="/blog/nail-tech-content-calendar-30-day" className={link}>30-day content calendar</Link>.</p>
      </Prose>

      <Prose id="hashtags" title="How to use the hashtag sets">
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Niche</strong> tags describe the exact service. They reach people interested in that look.</li>
          <li><strong>Local</strong> tags combine your city and your craft. They reach people who can actually book you.</li>
          <li><strong>Broad</strong> tags are large and competitive. Use them sparingly.</li>
          <li><strong>Balanced mix</strong> takes a little of each and is a good default.</li>
        </ul>
        <p>Rotate sets between posts rather than pasting the same tags every time, and remove any tag that does not match the post.</p>
      </Prose>

      <Prose id="cta" title="Choosing a call to action">
        <p>If you want bookings, send people to your booking link: it shows services, prices and free times without a back-and-forth. "DM to book" suits pros who like to talk first. "Comment a keyword" invites engagement, but you then need to reply to each comment with your link. "Save and share" works best on tips and tutorials.</p>
        <p>Make the bio match the caption with the <Link to="/tools/instagram-bio-generator" className={link}>Instagram bio generator</Link>, and see <Link to="/blog/nail-tech-call-to-action-examples" className={link}>call to action examples</Link>.</p>
      </Prose>
    </ToolPage>
  );
}
