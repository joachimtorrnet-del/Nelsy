// Shop my kit (Creator plan, feature key 'affiliates'): types + Supabase helpers.
// Table / view / bucket / function names match supabase/migrations/20261128_03_shop_my_kit.sql.
import { supabase, isSupabaseConfigured } from './supabase';
import { DEMO_PUBLIC_KIT } from './kitDemo';
import type { KitApi } from './kitDemo';

export interface KitItem {
  id: string;
  profile_id: string;
  title: string;
  /** Short "why I use it". */
  note: string | null;
  brand: string | null;
  category: string | null;
  image_url: string | null;
  /** The pro's affiliate / brand / distributor link (https only). */
  url: string;
  promo_code: string | null;
  position: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type KitItemInput = Pick<KitItem, 'title' | 'note' | 'brand' | 'category' | 'image_url' | 'url' | 'promo_code' | 'is_active'>;

/** What the public studio page sees (public_kit_items view). */
export type PublicKitItem = Pick<
  KitItem,
  'id' | 'profile_id' | 'title' | 'note' | 'brand' | 'category' | 'image_url' | 'url' | 'promo_code' | 'position' | 'created_at'
> & { section_title: string | null };

export interface PublicKit {
  title: string;
  items: PublicKitItem[];
}

export interface KitClickCount {
  kit_item_id: string;
  clicks_7d: number;
  clicks_28d: number;
}

export const KIT_DEFAULT_TITLE = 'Products I use';
export const KIT_DISCLOSURE = 'I may earn a commission from these links.';
export const KIT_CATEGORY_SUGGESTIONS = ['Gel & polish', 'Tools', 'Lamps', 'Care'];
export const KIT_IMAGE_MAX_BYTES = 5 * 1024 * 1024;
export const KIT_MAX_ITEMS = 100;
export const KIT_LIMITS = { title: 120, note: 280, brand: 60, category: 40, sectionTitle: 60, promo: 40 } as const;
const IMAGES_BUCKET = 'kit-images';

// Same rules as the kit_items.url CHECK constraint.
const HOST_LABEL = '[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?';
const KIT_URL_RE = new RegExp(`^https://${HOST_LABEL}(\\.${HOST_LABEL})+(:[0-9]{1,5})?([/?#]\\S*)?$`);
const PROMO_RE = /^[A-Za-z0-9][A-Za-z0-9_.-]{0,39}$/;

/**
 * Cleans a pasted link. Adds https:// when the scheme is missing.
 * Returns the URL, or an error message the dashboard can show as is.
 */
export function normalizeKitUrl(raw: string): { url: string } | { error: string } {
  let value = raw.trim();
  if (!value) return { error: 'Paste the link to the product.' };
  if (/^http:\/\//i.test(value)) return { error: 'Use the secure link that starts with https://' };
  if (!/^[a-z][a-z0-9+.-]*:/i.test(value)) value = `https://${value}`;
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    return { error: 'This does not look like a link. Copy it again from the shop.' };
  }
  if (parsed.protocol !== 'https:') return { error: 'Use the secure link that starts with https://' };
  if (parsed.username || parsed.password) return { error: 'This link cannot be used.' };
  // Keep exactly what the pro pasted: affiliate tags must stay untouched.
  const url = value.length <= 2048 ? value : '';
  if (!url || !KIT_URL_RE.test(url)) return { error: 'This does not look like a link. Copy it again from the shop.' };
  return { url };
}

/** Uppercases nothing: some brand codes are case sensitive. Returns null when empty. */
export function normalizePromoCode(raw: string): { code: string | null } | { error: string } {
  const value = raw.trim();
  if (!value) return { code: null };
  if (!PROMO_RE.test(value)) return { error: 'Promo codes can use letters, numbers, dots, dashes and underscores, with no spaces.' };
  return { code: value };
}

/** Bare host shown under a link in the dashboard, e.g. "amazon.fr". */
export function kitLinkHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function client() {
  if (!supabase) throw new Error('Supabase not initialized');
  return supabase;
}

// ============ PRO (dashboard) ============

export async function getMyKitItems(profileId: string): Promise<KitItem[]> {
  const { data, error } = await client()
    .from('kit_items')
    .select('*')
    .eq('profile_id', profileId)
    .order('position', { ascending: true })
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data ?? []) as KitItem[];
}

export async function createKitItem(profileId: string, input: KitItemInput, position: number): Promise<KitItem> {
  const { data, error } = await client()
    .from('kit_items')
    .insert({ ...input, profile_id: profileId, position })
    .select('*')
    .single();
  if (error) throw error;
  return data as KitItem;
}

export async function updateKitItem(id: string, updates: Partial<KitItemInput>): Promise<KitItem> {
  const { data, error } = await client().from('kit_items').update(updates).eq('id', id).select('*').single();
  if (error) throw error;
  return data as KitItem;
}

export async function deleteKitItem(item: KitItem): Promise<void> {
  const db = client();
  const { error } = await db.from('kit_items').delete().eq('id', item.id);
  if (error) throw error;
  const path = kitImagePath(item.image_url);
  if (path) await db.storage.from(IMAGES_BUCKET).remove([path]).catch(() => undefined);
}

export async function reorderKitItems(items: { id: string; position: number }[]): Promise<void> {
  const db = client();
  const results = await Promise.all(items.map(({ id, position }) => db.from('kit_items').update({ position }).eq('id', id)));
  const failed = results.find((r) => r.error);
  if (failed?.error) throw failed.error;
}

export async function uploadKitImage(file: File, profileId: string): Promise<string> {
  const ext = (file.name.split('.').pop() ?? 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
  const path = `${profileId}/${crypto.randomUUID()}.${ext}`;
  const db = client();
  const { error } = await db.storage.from(IMAGES_BUCKET).upload(path, file, { cacheControl: '31536000', upsert: false, contentType: file.type });
  if (error) throw error;
  return db.storage.from(IMAGES_BUCKET).getPublicUrl(path).data.publicUrl;
}

/** Object path of an image stored in kit-images, or null for any other URL. */
function kitImagePath(url: string | null): string | null {
  if (!url) return null;
  const marker = `/storage/v1/object/public/${IMAGES_BUCKET}/`;
  const i = url.indexOf(marker);
  return i >= 0 ? decodeURIComponent(url.slice(i + marker.length)) : null;
}

export async function removeKitImage(url: string | null): Promise<void> {
  const path = kitImagePath(url);
  if (path) await client().storage.from(IMAGES_BUCKET).remove([path]);
}

export async function getMyKitClickCounts(): Promise<KitClickCount[]> {
  const { data, error } = await client().rpc('my_kit_click_counts');
  if (error) throw error;
  return ((data ?? []) as KitClickCount[]).map((r) => ({ ...r, clicks_7d: Number(r.clicks_7d), clicks_28d: Number(r.clicks_28d) }));
}

export async function getMyKitTitle(profileId: string): Promise<string | null> {
  const { data, error } = await client().from('kit_settings').select('title').eq('profile_id', profileId).maybeSingle();
  if (error) throw error;
  return (data?.title as string | null | undefined) ?? null;
}

export async function setMyKitTitle(profileId: string, title: string | null): Promise<void> {
  const { error } = await client()
    .from('kit_settings')
    .upsert({ profile_id: profileId, title: title?.trim() ? title.trim().slice(0, KIT_LIMITS.sectionTitle) : null }, { onConflict: 'profile_id' });
  if (error) throw error;
}

/** Real dashboard API (the /dev/kit sandbox swaps in createDemoKitApi). */
export const kitApi: KitApi = {
  list: getMyKitItems,
  create: createKitItem,
  update: updateKitItem,
  remove: deleteKitItem,
  reorder: reorderKitItems,
  uploadImage: uploadKitImage,
  removeImage: removeKitImage,
  clickCounts: getMyKitClickCounts,
  getTitle: getMyKitTitle,
  setTitle: setMyKitTitle,
};

// ============ PUBLIC (studio page) ============

export async function getPublicKit(profileId: string): Promise<PublicKit> {
  // Local dev without Supabase: the mock studios show a demo kit.
  if (!isSupabaseConfigured || !supabase) {
    const items = DEMO_PUBLIC_KIT[profileId] ?? [];
    return { title: items[0]?.section_title || KIT_DEFAULT_TITLE, items };
  }
  const { data, error } = await supabase
    .from('public_kit_items')
    .select('*')
    .eq('profile_id', profileId)
    .order('position', { ascending: true })
    .order('created_at', { ascending: true });
  // Before the migration is applied the view does not exist: show nothing.
  if (error) return { title: KIT_DEFAULT_TITLE, items: [] };
  const items = (data ?? []) as PublicKitItem[];
  return { title: items[0]?.section_title || KIT_DEFAULT_TITLE, items };
}

/** Host of the page that sent the visitor to the studio (e.g. "instagram.com"), never the full URL. */
function referrerHost(): string | null {
  try {
    if (!document.referrer) return null;
    const host = new URL(document.referrer).hostname.toLowerCase();
    return host && host !== window.location.hostname ? host : null;
  } catch {
    return null;
  }
}

/**
 * Counts an outbound click through the kit-click edge function. Fire and forget: the link
 * itself opens the pro's URL directly in a new tab, so the visitor never waits on this.
 */
export function recordKitClick(itemId: string): void {
  if (!isSupabaseConfigured || !supabase || itemId.startsWith('demo-')) return;
  void supabase.functions.invoke('kit-click', { body: { id: itemId, ref: referrerHost() } }).catch(() => undefined);
}
