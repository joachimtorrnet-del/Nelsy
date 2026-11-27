import { useEffect, useState } from 'react';
import { getPublicProducts } from '@/lib/products';
import type { PublicProduct } from '@/lib/products';

/** Active products for a studio page (public_products view, or demo data without Supabase). */
export function useStudioProducts(profileId: string): PublicProduct[] {
  const [products, setProducts] = useState<PublicProduct[]>([]);
  useEffect(() => {
    if (!profileId) return;
    let cancelled = false;
    getPublicProducts(profileId).then((p) => { if (!cancelled) setProducts(p); }).catch(() => undefined);
    return () => { cancelled = true; };
  }, [profileId]);
  return products;
}
