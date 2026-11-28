import { contrastRatio } from '@/lib/themes';
import type { NelsyTheme } from '@/lib/themes';

/** Colours the booking dialog uses on its white surface. */
export interface BookingAccent {
  /** Filled controls: primary button, selected day, selected time. */
  fill: string;
  /** Text drawn on top of `fill`. */
  onFill: string;
  /** Accent for text and icons on white. */
  ink: string;
  /** Very light tint of `fill`. */
  soft: string;
}

const WHITE = '#FFFFFF';
const INK = '#1A1A1A';
const onWhite = (color: string) => contrastRatio(color, WHITE) ?? 0;

/**
 * The template's accent, kept legible on a white sheet. Templates with a very
 * light accent (white on Noir, mint on Midnight) fall back to their own dark
 * page colour (with the accent as the text on it), so the dialog still looks
 * like the page it came from.
 */
export function bookingAccent(theme: NelsyTheme): BookingAccent {
  let fill = theme.defaultAccent;
  let onFill = theme.accentText;
  if (onWhite(fill) < 2.2) {
    const pageBg = theme.backgroundOverride ?? theme.pageBg;
    const accent = fill;
    fill = onWhite(pageBg) >= 3 ? pageBg : INK;
    // The light accent itself becomes the text on the dark fill when it reads well there
    onFill = (contrastRatio(accent, fill) ?? 0) >= 4.5 ? accent : WHITE;
  } else if ((contrastRatio(fill, onFill) ?? 0) < 3) {
    onFill = onWhite(fill) >= 3 ? WHITE : '#111111';
  }
  return {
    fill,
    onFill,
    ink: onWhite(fill) >= 3 ? fill : INK,
    soft: /^#[0-9a-f]{6}$/i.test(fill) ? `${fill}14` : 'rgba(0,0,0,0.05)',
  };
}
