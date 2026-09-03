export interface NelsyTheme {
  id: string;
  name: string;
  emoji: string;
  // Page
  pageBg: string;
  // Hero (legacy — used by old StudioHero if kept)
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

export const THEMES: Record<string, NelsyTheme> = {
  ...SPEC_THEMES,
  ...LEGACY_THEMES,
};

export const DEFAULT_THEME = THEMES.soft_pink;

export function getTheme(preset?: string | null, accentOverride?: string | null): NelsyTheme {
  const base = THEMES[preset ?? 'soft_pink'] ?? DEFAULT_THEME;
  if (accentOverride) return { ...base, defaultAccent: accentOverride };
  return base;
}
