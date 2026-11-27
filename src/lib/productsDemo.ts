// ─────────────────────────────────────────────────────────────────────────────
// DEV-ONLY demo data + in-memory API for the digital products feature.
//
// Used when:
//   - the app runs without Supabase (mock studios, e.g. /studio-maya), or
//   - a developer opens the dashboard sandbox at /dev/products (DEV builds only), or
//   - a developer adds ?demo=1 to /dashboard/products in a DEV build (unlocks the
//     Creator gate locally; data still comes from the real API).
//
// import.meta.env.DEV is false in production builds, so isProductsDemo() is always
// false there and the plan gate cannot be bypassed.
// ─────────────────────────────────────────────────────────────────────────────
import type { CreatableProductType, Product, ProductInput, ProductOrder, PublicProduct } from './products';

/** DEV-only override: ?demo=1 in the URL or VITE_PRODUCTS_DEMO=1. Always false in production. */
export function isProductsDemo(): boolean {
  if (!import.meta.env.DEV) return false;
  if (import.meta.env.VITE_PRODUCTS_DEMO === '1') return true;
  try {
    return new URLSearchParams(window.location.search).get('demo') === '1';
  } catch {
    return false;
  }
}

const now = Date.now();
const daysAgo = (d: number) => new Date(now - d * 86_400_000).toISOString();

function demoProduct(id: string, profileId: string, p: Partial<Product> & Pick<Product, 'title' | 'price_cents'>): Product {
  return {
    id,
    profile_id: profileId,
    type: 'digital',
    description: null,
    currency: 'eur',
    cover_url: null,
    file_path: `${profileId}/${id}/file.pdf`,
    file_name: 'file.pdf',
    file_size_bytes: 2_400_000,
    settings: {},
    is_active: true,
    position: 0,
    archived_at: null,
    created_at: daysAgo(10),
    updated_at: daysAgo(1),
    ...p,
  };
}

// Mock studio "studio-maya" has profile id '1' in mockData.ts.
const MAYA_PRODUCTS: Product[] = [
  demoProduct('demo-p1', '1', {
    title: 'Aftercare guide for gel extensions',
    description: 'A 12 page PDF to send your clients home with: daily care, what to avoid, and when to book a fill.',
    price_cents: 900,
    file_name: 'gel-aftercare-guide.pdf',
    position: 0,
  }),
  demoProduct('demo-p2', '1', {
    title: 'Price list template (Canva)',
    description: 'An editable price list in three color themes. Open it in Canva, change the prices, post it.',
    price_cents: 1500,
    file_name: 'price-list-template.zip',
    file_size_bytes: 18_500_000,
    position: 1,
  }),
  demoProduct('demo-p4', '1', {
    type: 'free_resource',
    title: 'Free nail aftercare guide',
    description: 'A one page checklist to keep your manicure perfect for longer: what to do the first 24 hours, oils, gloves and when to come back.',
    price_cents: 0,
    file_name: 'nail-aftercare-checklist.pdf',
    file_size_bytes: 640_000,
    position: 2,
  }),
  demoProduct('demo-p3', '1', {
    title: 'Chrome nail tutorial (video)',
    description: 'A 25 minute video walking through prep, base, chrome powder and top coat on a full set.',
    price_cents: 2900,
    file_name: 'chrome-tutorial.mp4',
    file_size_bytes: 96_000_000,
    position: 3,
  }),
];

const toPublic = ({ id, profile_id, type, title, description, price_cents, currency, cover_url, position, created_at }: Product): PublicProduct =>
  ({ id, profile_id, type, title, description, price_cents, currency, cover_url, position, created_at });

/** Public products for the mock studios (keyed by mock profile id). */
export const DEMO_PUBLIC_PRODUCTS: Record<string, PublicProduct[]> = {
  '1': MAYA_PRODUCTS.map(toPublic),
};

// ── In-memory dashboard API ──────────────────────────────────────────────────

export interface ProductsApi {
  list: (profileId: string) => Promise<Product[]>;
  create: (profileId: string, input: ProductInput, position: number, type?: CreatableProductType) => Promise<Product>;
  update: (id: string, updates: Partial<ProductInput>) => Promise<Product>;
  remove: (product: Product) => Promise<'deleted' | 'archived'>;
  reorder: (items: { id: string; position: number }[]) => Promise<void>;
  uploadCover: (file: File, profileId: string) => Promise<string>;
  uploadFile: (file: File, profileId: string) => Promise<{ path: string; name: string; size: number }>;
  orders: (profileId: string) => Promise<ProductOrder[]>;
}

const DEMO_ORDERS: ProductOrder[] = [
  { id: 'demo-o1', product_id: 'demo-p1', profile_id: 'demo', buyer_email: 'client.one@example.com', buyer_name: 'Client One', amount_cents: 900, currency: 'eur', stripe_payment_intent_id: 'pi_demo_1', status: 'paid', download_count: 2, paid_at: daysAgo(1), refunded_at: null, created_at: daysAgo(1) },
  { id: 'demo-o2', product_id: 'demo-p2', profile_id: 'demo', buyer_email: 'client.two@example.com', buyer_name: 'Client Two', amount_cents: 1500, currency: 'eur', stripe_payment_intent_id: 'pi_demo_2', status: 'paid', download_count: 1, paid_at: daysAgo(3), refunded_at: null, created_at: daysAgo(3) },
  { id: 'demo-o3', product_id: 'demo-p1', profile_id: 'demo', buyer_email: 'client.three@example.com', buyer_name: null, amount_cents: 900, currency: 'eur', stripe_payment_intent_id: 'pi_demo_3', status: 'refunded', download_count: 0, paid_at: daysAgo(6), refunded_at: daysAgo(5), created_at: daysAgo(6) },
];

/** In-memory API for the /dev/products sandbox. `empty` starts with no products. */
export function createDemoProductsApi(empty = false): ProductsApi {
  let products: Product[] = empty ? [] : MAYA_PRODUCTS.map((p) => ({ ...p, profile_id: 'demo', file_path: `demo/${p.id}/${p.file_name}` }));
  const wait = <T,>(v: T) => new Promise<T>((r) => setTimeout(() => r(v), 150));
  return {
    list: async () => wait([...products].sort((a, b) => a.position - b.position)),
    create: async (profileId, input, position, type = 'digital') => {
      const p = demoProduct(`demo-${Math.random().toString(36).slice(2, 8)}`, profileId, {
        ...input, type, price_cents: type === 'free_resource' ? 0 : input.price_cents, position, created_at: new Date().toISOString(),
      });
      products = [...products, p];
      return wait(p);
    },
    update: async (id, updates) => {
      products = products.map((p) => (p.id === id ? { ...p, ...updates, updated_at: new Date().toISOString() } : p));
      return wait(products.find((p) => p.id === id)!);
    },
    remove: async (product) => {
      products = products.filter((p) => p.id !== product.id);
      return wait('deleted' as const);
    },
    reorder: async (items) => {
      products = products.map((p) => ({ ...p, position: items.find((i) => i.id === p.id)?.position ?? p.position }));
      return wait(undefined);
    },
    uploadCover: async (file) => wait(URL.createObjectURL(file)),
    uploadFile: async (file, profileId) => wait({ path: `${profileId}/demo/${file.name}`, name: file.name, size: file.size }),
    orders: async () => wait(empty ? [] : DEMO_ORDERS),
  };
}
