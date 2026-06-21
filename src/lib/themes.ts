export interface NelsyTheme {
  id: string;
  name: string;
  emoji: string;
  // Page
  pageBg: string;
  // Hero header area
  headerGradient: string;
  headerTextPrimary: string;
  headerTextSecondary: string;
  // Cards
  cardBg: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  // Font
  fontClass: 'font-sans' | 'font-serif';
  // Default accent (overridden by profile.color_accent)
  defaultAccent: string;
}

export const THEMES: Record<string, NelsyTheme> = {
  soft: {
    id: 'soft',
    name: 'Soft',
    emoji: '🌸',
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
  },
  luxe: {
    id: 'luxe',
    name: 'Luxe',
    emoji: '🖤',
    pageBg: '#0D0D0D',
    headerGradient: 'linear-gradient(160deg, #1C1C1C 0%, #0D0D0D 100%)',
    headerTextPrimary: '#FFFFFF',
    headerTextSecondary: '#888888',
    cardBg: '#1A1A1A',
    cardBorder: '#2A2A2A',
    textPrimary: '#FFFFFF',
    textSecondary: '#888888',
    fontClass: 'font-serif',
    defaultAccent: '#F52B8C',
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
  },
};

export const DEFAULT_THEME = THEMES.soft;

export function getTheme(preset?: string | null, accentOverride?: string | null): NelsyTheme {
  const base = THEMES[preset ?? 'soft'] ?? DEFAULT_THEME;
  if (accentOverride) return { ...base, defaultAccent: accentOverride };
  return base;
}
