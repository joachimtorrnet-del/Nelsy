// Keep ids in sync with profiles_font_family_allowed (migration 20261122_04).
export interface StudioFont {
  id: string;
  label: string;
  stack: string;
  /** Google Fonts css2 family param; null when already loaded by index.html. */
  google: string | null;
  kind: 'sans' | 'serif';
}

export const STUDIO_FONTS: StudioFont[] = [
  { id: 'inter',         label: 'Inter',              stack: "'Inter', system-ui, sans-serif",             google: null,                                  kind: 'sans' },
  { id: 'dm-sans',       label: 'DM Sans',            stack: "'DM Sans', system-ui, sans-serif",           google: 'DM+Sans:wght@400;500;600;700',        kind: 'sans' },
  { id: 'poppins',       label: 'Poppins',            stack: "'Poppins', system-ui, sans-serif",           google: 'Poppins:wght@400;500;600;700',        kind: 'sans' },
  { id: 'montserrat',    label: 'Montserrat',         stack: "'Montserrat', system-ui, sans-serif",        google: 'Montserrat:wght@400;500;600;700',     kind: 'sans' },
  { id: 'space-grotesk', label: 'Space Grotesk',      stack: "'Space Grotesk', system-ui, sans-serif",     google: 'Space+Grotesk:wght@400;500;600;700',  kind: 'sans' },
  { id: 'playfair',      label: 'Playfair Display',   stack: "'Playfair Display', Georgia, serif",         google: null,                                  kind: 'serif' },
  { id: 'fraunces',      label: 'Fraunces',           stack: "'Fraunces', Georgia, serif",                 google: 'Fraunces:wght@400;500;600;700',       kind: 'serif' },
  { id: 'cormorant',     label: 'Cormorant Garamond', stack: "'Cormorant Garamond', Georgia, serif",       google: 'Cormorant+Garamond:wght@400;500;600;700', kind: 'serif' },
  { id: 'lora',          label: 'Lora',               stack: "'Lora', Georgia, serif",                     google: 'Lora:wght@400;500;600;700',           kind: 'serif' },
  { id: 'bodoni',        label: 'Bodoni Moda',        stack: "'Bodoni Moda', Georgia, serif",              google: 'Bodoni+Moda:wght@400;500;600;700',    kind: 'serif' },
];

export function getStudioFont(id?: string | null): StudioFont | undefined {
  return id ? STUDIO_FONTS.find((f) => f.id === id) : undefined;
}

/** Injects the Google Fonts stylesheet for a font once per page. */
export function ensureStudioFontLoaded(font: StudioFont | undefined) {
  if (!font?.google || typeof document === 'undefined') return;
  const id = `studio-font-${font.id}`;
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${font.google}&display=swap`;
  document.head.appendChild(link);
}
