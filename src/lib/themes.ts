export interface NelsyTheme {
  id: string;
  name: string;
  emoji: string;
  // Page
  pageBg: string;
  // Hero (legacy: used by old StudioHero if kept)
  headerGradient: string;
  headerTextPrimary: string;
  headerTextSecondary: string;
  // Cards
  cardBg: string;
  cardBorder: string;
  cardBlur?: string; // backdrop-filter value for glassmorphism (e.g. 'blur(12px)')
  // Text
  textPrimary: string;
  textSecondary: string;
  // Font
  fontClass: 'font-sans' | 'font-serif';
  /** CSS font-family stack set when the pro picked a font; overrides fontClass. */
  fontFamily?: string;
  /** Background the pro picked; layouts that don't use pageBg honour it too. */
  backgroundOverride?: string;
  /** Accent, or the text color when the accent would be illegible on the page background. */
  accentOnBg?: string;
  // Accent
  defaultAccent: string;
  accentText: string; // text color drawn on top of accent (almost always #FFFFFF)
}

// ── Spec-defined presets ───────────────────────────────────────────────────────

const SPEC_THEMES: Record<string, NelsyTheme> = {
  soft_pink: {
    id: 'soft_pink',
    name: 'Soft Pink',
    emoji: '🌸',
    pageBg: '#FFF5F7',
    headerGradient: 'linear-gradient(160deg, #FFE0EF 0%, #FFF5F7 100%)',
    headerTextPrimary: '#1E1B18',
    headerTextSecondary: '#8C827A',
    cardBg: '#FFFFFF',
    cardBorder: 'rgba(255, 0, 122, 0.08)',
    textPrimary: '#1E1B18',
    textSecondary: '#8C827A',
    fontClass: 'font-sans',
    defaultAccent: '#FF007A',
    accentText: '#FFFFFF',
  },

  minimal_nude: {
    id: 'minimal_nude',
    name: 'Minimal Nude',
    emoji: '🤍',
    pageBg: '#FDFBF7',
    headerGradient: 'linear-gradient(160deg, #F5EDE0 0%, #FDFBF7 100%)',
    headerTextPrimary: '#2C2A29',
    headerTextSecondary: '#8F857D',
    cardBg: '#FFFFFF',
    cardBorder: 'rgba(61, 49, 46, 0.08)',
    textPrimary: '#2C2A29',
    textSecondary: '#8F857D',
    fontClass: 'font-sans',
    defaultAccent: '#3D312E',
    accentText: '#FFFFFF',
  },

  clean_luxe: {
    id: 'clean_luxe',
    name: 'Clean Luxe',
    emoji: '🖤',
    pageBg: '#FAFAFA',
    headerGradient: 'linear-gradient(160deg, #ECECEC 0%, #FAFAFA 100%)',
    headerTextPrimary: '#09090B',
    headerTextSecondary: '#71717A',
    cardBg: 'rgba(255, 255, 255, 0.85)',
    cardBorder: 'rgba(0, 0, 0, 0.06)',
    cardBlur: 'blur(12px)',
    textPrimary: '#09090B',
    textSecondary: '#71717A',
    fontClass: 'font-sans',
    defaultAccent: '#000000',
    accentText: '#FFFFFF',
  },
};

// ── 2026 collection ───────────────────────────────────────────────────────────

const COLLECTION_THEMES: Record<string, NelsyTheme> = {
  blush: {
    id: 'blush',
    name: 'Blush',
    emoji: '🌺',
    pageBg: '#FFF8F9',
    headerGradient: 'linear-gradient(160deg, #FFD6E7 0%, #FFC2D4 100%)',
    headerTextPrimary: '#3D1F28',
    headerTextSecondary: '#8B5E6B',
    cardBg: '#FFFFFF',
    cardBorder: 'rgba(245,114,155,0.10)',
    textPrimary: '#3D1F28',
    textSecondary: '#8B5E6B',
    fontClass: 'font-sans',
    defaultAccent: '#E8446E',
    accentText: '#FFFFFF',
  },

  editorial: {
    id: 'editorial',
    name: 'Editorial',
    emoji: '📰',
    pageBg: '#FAFAFA',
    headerGradient: 'linear-gradient(160deg, #1A1A1A 0%, #2D2D2D 100%)',
    headerTextPrimary: '#FFFFFF',
    headerTextSecondary: 'rgba(255,255,255,0.55)',
    cardBg: '#FFFFFF',
    cardBorder: 'rgba(0,0,0,0.08)',
    textPrimary: '#0A0A0A',
    textSecondary: '#6B6B6B',
    fontClass: 'font-serif',
    defaultAccent: '#0A0A0A',
    accentText: '#FFFFFF',
  },

  chrome: {
    id: 'chrome',
    name: 'Chrome',
    emoji: '🪞',
    pageBg: '#F4F4F4',
    headerGradient: 'linear-gradient(160deg, #CFCFCF 0%, #E8E8E8 100%)',
    headerTextPrimary: '#1A1A1A',
    headerTextSecondary: '#666666',
    cardBg: 'rgba(255,255,255,0.90)',
    cardBorder: 'rgba(0,0,0,0.07)',
    cardBlur: 'blur(10px)',
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    fontClass: 'font-sans',
    defaultAccent: '#1A1A1A',
    accentText: '#FFFFFF',
  },
};

// ── Legacy presets (kept for existing users) ──────────────────────────────────

const LEGACY_THEMES: Record<string, NelsyTheme> = {
  dark_luxe: {
    id: 'dark_luxe',
    name: 'Dark Luxe',
    emoji: '🌑',
    pageBg: '#000000',
    headerGradient: 'linear-gradient(160deg, #1A1A1A 0%, #000000 100%)',
    headerTextPrimary: '#FFFFFF',
    headerTextSecondary: '#888888',
    cardBg: '#121212',
    cardBorder: 'rgba(255, 255, 255, 0.08)',
    textPrimary: '#FFFFFF',
    textSecondary: '#888888',
    fontClass: 'font-sans',
    defaultAccent: '#F52B8C',
    accentText: '#FFFFFF',
  },
  soft: {
    id: 'soft',
    name: 'Soft',
    emoji: '🌷',
    pageBg: '#FFFFFF',
    headerGradient: 'linear-gradient(160deg, #FFF0F7 0%, #FFE0EF 100%)',
    headerTextPrimary: '#1A1A1A',
    headerTextSecondary: '#888888',
    cardBg: '#FAFAFA',
    cardBorder: '#F0F0F0',
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    fontClass: 'font-sans',
    defaultAccent: '#F52B8C',
    accentText: '#FFFFFF',
  },
  luxe: {
    id: 'luxe',
    name: 'Luxe',
    emoji: '🖤',
    pageBg: '#000000',
    headerGradient: 'linear-gradient(160deg, #1A1A1A 0%, #000000 100%)',
    headerTextPrimary: '#FFFFFF',
    headerTextSecondary: '#888888',
    cardBg: '#121212',
    cardBorder: 'rgba(255, 255, 255, 0.08)',
    textPrimary: '#FFFFFF',
    textSecondary: '#888888',
    fontClass: 'font-sans',
    defaultAccent: '#F52B8C',
    accentText: '#FFFFFF',
  },
  rose: {
    id: 'rose',
    name: 'Rose',
    emoji: '🌹',
    pageBg: '#FFF5F7',
    headerGradient: 'linear-gradient(160deg, #FFCDD7 0%, #FFA3B3 100%)',
    headerTextPrimary: '#1A1A1A',
    headerTextSecondary: '#666666',
    cardBg: '#FFFFFF',
    cardBorder: '#FFD6DE',
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    fontClass: 'font-serif',
    defaultAccent: '#E0024A',
    accentText: '#FFFFFF',
  },
  nude: {
    id: 'nude',
    name: 'Nude',
    emoji: '🤎',
    pageBg: '#FAF7F4',
    headerGradient: 'linear-gradient(160deg, #F5EDE0 0%, #EDD9C0 100%)',
    headerTextPrimary: '#2C1810',
    headerTextSecondary: '#7D6155',
    cardBg: '#FFFFFF',
    cardBorder: '#EDE0D4',
    textPrimary: '#2C1810',
    textSecondary: '#7D6155',
    fontClass: 'font-sans',
    defaultAccent: '#8B6343',
    accentText: '#FFFFFF',
  },
  bold: {
    id: 'bold',
    name: 'Bold',
    emoji: '⚡',
    pageBg: '#FFFFFF',
    headerGradient: 'linear-gradient(160deg, #F52B8C 0%, #9333EA 100%)',
    headerTextPrimary: '#FFFFFF',
    headerTextSecondary: 'rgba(255,255,255,0.75)',
    cardBg: '#F9F9F9',
    cardBorder: '#EEEEEE',
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    fontClass: 'font-sans',
    defaultAccent: '#F52B8C',
    accentText: '#FFFFFF',
  },
};


// ── Creator templates (LayoutCreator) ─────────────────────────────────────────

function creatorTheme(t: {
  id: string; name: string; pageBg: string; cardBg: string; cardBorder: string;
  text: string; muted: string; accent: string; accentText?: string; serif?: boolean;
}): NelsyTheme {
  return {
    id: t.id, name: t.name, emoji: '',
    pageBg: t.pageBg, headerGradient: t.pageBg,
    headerTextPrimary: t.text, headerTextSecondary: t.muted,
    cardBg: t.cardBg, cardBorder: t.cardBorder,
    textPrimary: t.text, textSecondary: t.muted,
    fontClass: t.serif ? 'font-serif' : 'font-sans',
    defaultAccent: t.accent, accentText: t.accentText ?? '#FFFFFF',
  };
}

const CREATOR_THEMES: Record<string, NelsyTheme> = {
  c_classic:  creatorTheme({ id: 'c_classic',  name: 'Classic',  pageBg: '#FFFFFF', cardBg: '#FFFFFF', cardBorder: '#ECECEC', text: '#1A1A1A', muted: '#6B7280', accent: '#F52B8C' }),
  c_gallery:  creatorTheme({ id: 'c_gallery',  name: 'Gallery',  pageBg: '#F7F7F7', cardBg: '#FFFFFF', cardBorder: '#EEEEEE', text: '#1A1A1A', muted: '#6B7280', accent: '#1A1A1A' }),
  c_blush:    creatorTheme({ id: 'c_blush',    name: 'Blush',    pageBg: '#F6E6F2', cardBg: 'rgba(255,255,255,0.6)', cardBorder: 'rgba(26,26,26,0.06)', text: '#1A1A1A', muted: '#5F5560', accent: '#1A1A1A', serif: true }),
  c_atelier:  creatorTheme({ id: 'c_atelier',  name: 'Atelier',  pageBg: '#FBF6F1', cardBg: '#EFE6DC', cardBorder: 'rgba(58,51,48,0.06)', text: '#2B2420', muted: '#6E625A', accent: '#3A3330', serif: true }),
  c_noir:     creatorTheme({ id: 'c_noir',     name: 'Noir',     pageBg: '#0B0B0B', cardBg: '#1C1C1C', cardBorder: '#2A2A2A', text: '#FFFFFF', muted: 'rgba(255,255,255,0.65)', accent: '#FFFFFF', accentText: '#111111' }),
  c_minimal:  creatorTheme({ id: 'c_minimal',  name: 'Minimal',  pageBg: '#FFFFFF', cardBg: '#FFFFFF', cardBorder: '#F1F1F1', text: '#1A1A1A', muted: '#6B7280', accent: '#F52B8C' }),
  c_midnight: creatorTheme({ id: 'c_midnight', name: 'Midnight', pageBg: '#15142B', cardBg: '#21203D', cardBorder: 'rgba(255,255,255,0.08)', text: '#FFFFFF', muted: 'rgba(255,255,255,0.65)', accent: '#2EF2C4', accentText: '#0E1A24' }),
  c_muse:     creatorTheme({ id: 'c_muse',     name: 'Muse',     pageBg: '#1A1A1A', cardBg: '#FFF8EE', cardBorder: 'rgba(0,0,0,0.04)', text: '#FFFFFF', muted: 'rgba(255,255,255,0.8)', accent: '#F52B8C', serif: true }),
  c_split:    creatorTheme({ id: 'c_split',    name: 'Split',    pageBg: '#FFF1F7', cardBg: '#F65AA6', cardBorder: 'rgba(0,0,0,0)', text: '#1A1A1A', muted: '#6B5B63', accent: '#F65AA6' }),
  c_glow:     creatorTheme({ id: 'c_glow',     name: 'Glow',     pageBg: '#D61A7A', cardBg: 'rgba(255,255,255,0.16)', cardBorder: 'rgba(255,255,255,0.18)', text: '#FFFFFF', muted: 'rgba(255,255,255,0.8)', accent: '#FFE3F1', accentText: '#9E0F57' }),
  c_coach:    creatorTheme({ id: 'c_coach',    name: 'Coach',    pageBg: '#FBE4EE', cardBg: '#FFFFFF', cardBorder: 'rgba(245,43,140,0.08)', text: '#1A1A1A', muted: '#6B5B63', accent: '#F52B8C', serif: true }),
};

export const THEMES: Record<string, NelsyTheme> = {
  ...SPEC_THEMES,
  ...COLLECTION_THEMES,
  ...LEGACY_THEMES,
  ...CREATOR_THEMES,
};

export const DEFAULT_THEME = THEMES.soft_pink;

function luminance(hex: string): number | null {
  const m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
  if (!m) return null;
  const [r, g, b] = [m[1], m[2], m[3]].map((h) => {
    const c = parseInt(h, 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function isDark(hex: string): boolean {
  const l = luminance(hex);
  return l !== null && l < 0.18;
}

function contrastRatio(a: string, b: string): number | null {
  const la = luminance(a); const lb = luminance(b);
  if (la === null || lb === null) return null;
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

export function getTheme(
  preset?: string | null,
  accentOverride?: string | null,
  overrides?: { background?: string | null; fontFamily?: string | null },
): NelsyTheme {
  let theme = THEMES[preset ?? 'soft_pink'] ?? DEFAULT_THEME;
  if (accentOverride) {
    // White text unless the accent is genuinely light (keeps brand pink buttons white-on-pink)
    const onWhite = contrastRatio(accentOverride, '#FFFFFF') ?? 21;
    theme = { ...theme, defaultAccent: accentOverride, accentText: onWhite >= 2.2 ? '#FFFFFF' : '#111111' };
  }
  if (overrides?.background) {
    const bg = overrides.background;
    const templateWasDark = isDark(theme.pageBg);
    theme = { ...theme, pageBg: bg, headerGradient: bg, backgroundOverride: bg };
    // Keep text and cards readable whatever background the pro picks
    if (isDark(bg)) {
      theme = {
        ...theme,
        textPrimary: '#FFFFFF',
        textSecondary: 'rgba(255,255,255,0.72)',
        headerTextPrimary: '#FFFFFF',
        headerTextSecondary: 'rgba(255,255,255,0.72)',
        cardBg: 'rgba(255,255,255,0.08)',
        cardBorder: 'rgba(255,255,255,0.16)',
      };
    } else if (templateWasDark) {
      theme = {
        ...theme,
        textPrimary: '#1A1A1A',
        textSecondary: '#6B7280',
        headerTextPrimary: '#1A1A1A',
        headerTextSecondary: '#6B7280',
        cardBg: '#FFFFFF',
        cardBorder: 'rgba(0,0,0,0.06)',
      };
    }
  }
  if (overrides?.fontFamily) theme = { ...theme, fontFamily: overrides.fontFamily };
  const ratio = contrastRatio(theme.defaultAccent, theme.backgroundOverride ?? theme.pageBg);
  theme = { ...theme, accentOnBg: ratio !== null && ratio < 2.2 ? theme.textPrimary : theme.defaultAccent };
  return theme;
}
