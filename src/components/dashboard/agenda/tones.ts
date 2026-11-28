import type { StatusTone } from '../../../lib/agenda';

/** One calm colour per status. The pink accent is kept for confirmed appointments. */
export const TONE: Record<StatusTone, { block: string; bar: string; dot: string; text: string }> = {
  accent: { block: 'bg-[#FFF0F7] text-[#1A1A1A]', bar: 'bg-[#F52B8C]', dot: 'bg-[#F52B8C]', text: 'text-[#C2186F]' },
  amber:  { block: 'bg-amber-50 text-[#1A1A1A]', bar: 'bg-amber-400', dot: 'bg-amber-400', text: 'text-amber-700' },
  gray:   { block: 'bg-gray-100 text-gray-600', bar: 'bg-gray-400', dot: 'bg-gray-400', text: 'text-gray-600' },
  orange: { block: 'bg-orange-50 text-gray-700', bar: 'bg-orange-400', dot: 'bg-orange-400', text: 'text-orange-700' },
  muted:  { block: 'bg-gray-50 text-gray-500', bar: 'bg-gray-300', dot: 'bg-gray-300', text: 'text-gray-500' },
};
