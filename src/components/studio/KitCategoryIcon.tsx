import { Droplet, Heart, Scissors, ShoppingBag, Sun } from 'lucide-react';
import type { CSSProperties } from 'react';

type Kind = 'lamp' | 'gel' | 'tool' | 'care' | 'other';

function kindOf(category: string | null): Kind {
  const c = (category ?? '').toLowerCase();
  if (/lamp|led|uv/.test(c)) return 'lamp';
  if (/gel|polish|vernis|acryl/.test(c)) return 'gel';
  if (/tool|file|lime|drill|brush|pinceau|outil/.test(c)) return 'tool';
  if (/care|oil|huile|soin|cream|crème/.test(c)) return 'care';
  return 'other';
}

/** Placeholder icon for a kit item without a photo, picked from its category. */
export function KitCategoryIcon({ category, size, className, style }: {
  category: string | null; size?: number; className?: string; style?: CSSProperties;
}) {
  const props = { size, className, style, strokeWidth: 1.7, 'aria-hidden': true } as const;
  switch (kindOf(category)) {
    case 'lamp': return <Sun {...props} />;
    case 'gel': return <Droplet {...props} />;
    case 'tool': return <Scissors {...props} />;
    case 'care': return <Heart {...props} />;
    default: return <ShoppingBag {...props} />;
  }
}
