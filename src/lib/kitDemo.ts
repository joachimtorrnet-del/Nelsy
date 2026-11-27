// ─────────────────────────────────────────────────────────────────────────────
// DEV-ONLY demo data + in-memory API for Shop my kit.
//
// Used when:
//   - the app runs without Supabase (mock studios, e.g. /studio-maya), or
//   - a developer opens the dashboard sandbox at /dev/kit (DEV builds only), or
//   - a developer adds ?demo=1 to /dashboard/kit in a DEV build (unlocks the
//     Creator gate locally; data still comes from the real API).
// Links point to example.com: nothing here is a real affiliate link.
// ─────────────────────────────────────────────────────────────────────────────
import type { KitClickCount, KitItem, KitItemInput, PublicKitItem } from './kit';

const now = Date.now();
const daysAgo = (d: number) => new Date(now - d * 86_400_000).toISOString();

function demoItem(id: string, profileId: string, p: Partial<KitItem> & Pick<KitItem, 'title' | 'url'>): KitItem {
  return {
    id,
    profile_id: profileId,
    note: null,
    brand: null,
    category: null,
    image_url: null,
    promo_code: null,
    position: 0,
    is_active: true,
    created_at: daysAgo(12),
    updated_at: daysAgo(2),
    ...p,
  };
}

// Mock studio "studio-maya" has profile id '1' in mockData.ts.
const MAYA_KIT: KitItem[] = [
  demoItem('demo-k1', '1', {
    title: 'Cordless LED/UV lamp 48W',
    brand: 'Lumina Pro',
    category: 'Lamps',
    note: 'Cures builder gel in 30 seconds and the battery lasts a full day of clients.',
    url: 'https://example.com/shop/led-lamp?tag=maya-21',
    position: 0,
  }),
  demoItem('demo-k2', '1', {
    title: 'Builder gel in a bottle, Soft Pink',
    brand: 'Gelique',
    category: 'Gel & polish',
    note: 'Self-leveling, so my structure is done in half the time.',
    url: 'https://example.com/shop/builder-gel',
    promo_code: 'MAYA10',
    position: 1,
  }),
  demoItem('demo-k3', '1', {
    title: '180/240 zebra files (pack of 50)',
    brand: 'FileWorks',
    category: 'Tools',
    note: 'Sturdy core, does not bend on hard gel.',
    url: 'https://example.com/shop/zebra-files',
    position: 2,
  }),
  demoItem('demo-k4', '1', {
    title: 'Jojoba cuticle oil pen',
    brand: 'Petal & Co',
    category: 'Care',
    note: 'The one I send every client home with.',
    url: 'https://example.com/shop/cuticle-oil',
    promo_code: 'NELSY15',
    position: 3,
  }),
  demoItem('demo-k5', '1', {
    title: 'E-file with 5 bits',
    brand: 'Drillo',
    category: 'Tools',
    url: 'https://example.com/shop/e-file',
    position: 4,
    is_active: false,
  }),
];

const toPublic = (k: KitItem, sectionTitle: string | null = null): PublicKitItem => ({
  id: k.id, profile_id: k.profile_id, title: k.title, note: k.note, brand: k.brand, category: k.category,
  image_url: k.image_url, url: k.url, promo_code: k.promo_code, position: k.position, created_at: k.created_at,
  section_title: sectionTitle,
});

/** Public kit for the mock studios (keyed by mock profile id). */
export const DEMO_PUBLIC_KIT: Record<string, PublicKitItem[]> = {
  '1': MAYA_KIT.filter((k) => k.is_active).map((k) => toPublic(k)),
};

// ── In-memory dashboard API ──────────────────────────────────────────────────

export interface KitApi {
  list: (profileId: string) => Promise<KitItem[]>;
  create: (profileId: string, input: KitItemInput, position: number) => Promise<KitItem>;
  update: (id: string, updates: Partial<KitItemInput>) => Promise<KitItem>;
  remove: (item: KitItem) => Promise<void>;
  reorder: (items: { id: string; position: number }[]) => Promise<void>;
  uploadImage: (file: File, profileId: string) => Promise<string>;
  removeImage: (url: string | null) => Promise<void>;
  clickCounts: () => Promise<KitClickCount[]>;
  getTitle: (profileId: string) => Promise<string | null>;
  setTitle: (profileId: string, title: string | null) => Promise<void>;
}

const DEMO_CLICKS: KitClickCount[] = [
  { kit_item_id: 'demo-k1', clicks_7d: 14, clicks_28d: 52 },
  { kit_item_id: 'demo-k2', clicks_7d: 9, clicks_28d: 31 },
  { kit_item_id: 'demo-k3', clicks_7d: 2, clicks_28d: 11 },
  { kit_item_id: 'demo-k4', clicks_7d: 6, clicks_28d: 19 },
];

/** In-memory API for the /dev/kit sandbox. `empty` starts with no items. */
export function createDemoKitApi(empty = false): KitApi {
  let items: KitItem[] = empty ? [] : MAYA_KIT.map((k) => ({ ...k, profile_id: 'demo' }));
  let title: string | null = null;
  const wait = <T,>(v: T) => new Promise<T>((r) => setTimeout(() => r(v), 150));
  return {
    list: async () => wait([...items].sort((a, b) => a.position - b.position)),
    create: async (profileId, input, position) => {
      const k = demoItem(`demo-${Math.random().toString(36).slice(2, 8)}`, profileId, { ...input, position, created_at: new Date().toISOString() });
      items = [...items, k];
      return wait(k);
    },
    update: async (id, updates) => {
      items = items.map((k) => (k.id === id ? { ...k, ...updates, updated_at: new Date().toISOString() } : k));
      return wait(items.find((k) => k.id === id)!);
    },
    remove: async (item) => {
      items = items.filter((k) => k.id !== item.id);
      return wait(undefined);
    },
    reorder: async (order) => {
      items = items.map((k) => ({ ...k, position: order.find((o) => o.id === k.id)?.position ?? k.position }));
      return wait(undefined);
    },
    uploadImage: async (file) => wait(URL.createObjectURL(file)),
    removeImage: async () => wait(undefined),
    clickCounts: async () => wait(empty ? [] : DEMO_CLICKS),
    getTitle: async () => wait(title),
    setTitle: async (_profileId, t) => { title = t?.trim() || null; return wait(undefined); },
  };
}
