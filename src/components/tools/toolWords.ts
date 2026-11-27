// Curated word lists and helpers shared by the free generator tools (name, bio, caption, username).
// Everything runs client-side: no API, no network call.

export type Craft = 'nails' | 'lashes' | 'brows' | 'hair' | 'makeup' | 'skin' | 'beauty';

export const CRAFT_OPTIONS: { value: Craft; label: string }[] = [
  { value: 'nails', label: 'Nails' },
  { value: 'lashes', label: 'Lashes' },
  { value: 'brows', label: 'Brows' },
  { value: 'hair', label: 'Hair' },
  { value: 'makeup', label: 'Makeup' },
  { value: 'skin', label: 'Skin / esthetics' },
  { value: 'beauty', label: 'Multi-service beauty' },
];

/** How a pro describes their job, for bios and captions. */
export const CRAFT_PRO: Record<Craft, string> = {
  nails: 'Nail tech',
  lashes: 'Lash artist',
  brows: 'Brow artist',
  hair: 'Hairstylist',
  makeup: 'Makeup artist',
  skin: 'Esthetician',
  beauty: 'Beauty pro',
};

/** The thing a client gets, for captions ("your next set"). */
export const CRAFT_RESULT: Record<Craft, string> = {
  nails: 'set',
  lashes: 'lash set',
  brows: 'brows',
  hair: 'look',
  makeup: 'glam',
  skin: 'glow',
  beauty: 'look',
};

export const CRAFT_EMOJI: Record<Craft, string> = {
  nails: '💅',
  lashes: '✨',
  brows: '✨',
  hair: '💇‍♀️',
  makeup: '💄',
  skin: '🧴',
  beauty: '✨',
};

/** Nouns used in business names. */
export const CRAFT_NOUNS: Record<Craft, string[]> = {
  nails: ['Nails', 'Nail Studio', 'Nail Bar', 'Polish', 'Lacquer', 'Nail Co.', 'Tips', 'Nail Lounge'],
  lashes: ['Lashes', 'Lash Studio', 'Lash Lounge', 'Lash Bar', 'Lash Co.', 'Flutter'],
  brows: ['Brows', 'Brow Bar', 'Brow Studio', 'Arch', 'Brow Co.', 'Brow Lounge'],
  hair: ['Hair', 'Hair Studio', 'Salon', 'Tresses', 'Strands', 'Hair Co.', 'Locks'],
  makeup: ['Makeup', 'Glam', 'Beauty', 'Glam Studio', 'Face', 'Artistry'],
  skin: ['Skin', 'Skin Studio', 'Skincare', 'Glow', 'Facials', 'Skin Co.'],
  beauty: ['Beauty', 'Beauty Studio', 'Beauty Bar', 'Glow', 'Beauty Co.', 'Beauty Lounge'],
};

/** Lowercase craft words for usernames and hashtags. */
export const CRAFT_HANDLE_WORDS: Record<Craft, string[]> = {
  nails: ['nails', 'nailtech', 'nailstudio', 'nailbar', 'polish'],
  lashes: ['lashes', 'lashtech', 'lashstudio', 'lashbar', 'lashartist'],
  brows: ['brows', 'browbar', 'browartist', 'browstudio', 'arch'],
  hair: ['hair', 'hairstylist', 'hairstudio', 'salon', 'hairby'],
  makeup: ['makeup', 'mua', 'glam', 'makeupartist', 'artistry'],
  skin: ['skin', 'skincare', 'esthetics', 'skinstudio', 'glow'],
  beauty: ['beauty', 'beautybar', 'beautystudio', 'glow', 'studio'],
};

export type NameStyle = 'luxe' | 'cute' | 'minimal' | 'bold' | 'natural' | 'playful';

export const STYLE_OPTIONS: { value: NameStyle; label: string }[] = [
  { value: 'luxe', label: 'Luxe' },
  { value: 'minimal', label: 'Minimal' },
  { value: 'cute', label: 'Cute' },
  { value: 'natural', label: 'Natural' },
  { value: 'bold', label: 'Bold' },
  { value: 'playful', label: 'Playful' },
];

export const STYLE_WORDS: Record<NameStyle, string[]> = {
  luxe: ['Velvet', 'Gilded', 'Opal', 'Pearl', 'Maison', 'Satin', 'Silk', 'Couture', 'Ivory', 'Noir', 'Gold Leaf', 'Cashmere'],
  cute: ['Honey', 'Cherry', 'Peachy', 'Bloom', 'Sugar', 'Petal', 'Bubble', 'Candy', 'Cloud', 'Sweet Pea', 'Daisy', 'Bunny'],
  minimal: ['Form', 'Pure', 'Line', 'Bare', 'Edit', 'Muse', 'Nude', 'Still', 'Plain', 'Shape', 'Mono', 'Neutral'],
  bold: ['Fierce', 'Electric', 'Neon', 'Wild', 'Riot', 'Rebel', 'Edge', 'Chrome', 'Blaze', 'Volt', 'Jet', 'Siren'],
  natural: ['Sage', 'Fern', 'Clay', 'Linen', 'Dew', 'Moss', 'Willow', 'Botanic', 'Root', 'Olive', 'Juniper', 'Meadow'],
  playful: ['Glitter', 'Sparkle', 'Pop', 'Confetti', 'Disco', 'Glossy', 'Juicy', 'Sprinkle', 'Twinkle', 'Fizz', 'Jelly', 'Bounce'],
};

export const PLACE_WORDS: Record<NameStyle, string[]> = {
  luxe: ['Atelier', 'Maison', 'House', 'Salon', 'Lounge', 'Suite'],
  cute: ['Club', 'Corner', 'Nook', 'Room', 'Shop', 'Spot'],
  minimal: ['Studio', 'Room', 'Lab', 'Space', 'Co.', 'Edit'],
  bold: ['Lab', 'Club', 'Society', 'Studio', 'House', 'Collective'],
  natural: ['Studio', 'House', 'Room', 'Garden', 'Collective', 'Co.'],
  playful: ['Club', 'Bar', 'Party', 'Shop', 'Studio', 'Room'],
};

/** Title-cases free text and keeps only letters, digits, spaces, apostrophes and ampersands. */
export function cleanWord(raw: string, max = 24): string {
  return raw
    .replace(/[^\p{L}\p{N}\s'&-]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/** Lowercase ASCII letters and digits only (accents removed), for handles and hashtags. */
export function toHandlePart(raw: string): string {
  return raw
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

/** Character count as Instagram is most likely to count it: UTF-16 length is the conservative choice. */
export function charCount(s: string): number {
  return s.length;
}

/** Copies text to the clipboard, with a fallback for browsers without the async Clipboard API. */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the textarea fallback
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

/** Small deterministic PRNG so "More ideas" gives a new but reproducible shuffle. */
export function seededShuffle<T>(items: T[], seed: number): T[] {
  let a = seed >>> 0 || 1;
  const rand = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
