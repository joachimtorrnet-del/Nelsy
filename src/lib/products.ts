// Digital products: types + Supabase query helpers (supabase-queries style).
// Table / view / bucket names match supabase/migrations/20261127_01_digital_products.sql.
import { supabase, isSupabaseConfigured } from './supabase';
import { formatMoney } from './currency';
import { DEMO_PUBLIC_PRODUCTS } from './productsDemo';
import type { ProductsApi } from './productsDemo';

export type ProductType = 'digital' | 'course' | 'coaching' | 'membership' | 'free_resource';
export type ProductOrderStatus = 'pending' | 'paid' | 'refunded';

export interface Product {
  id: string;
  profile_id: string;
  type: ProductType;
  title: string;
  description: string | null;
  /** Smallest currency unit (cents; whole units for JPY/KRW), as Stripe expects. */
  price_cents: number;
  currency: string;
  cover_url: string | null;
  file_path: string | null;
  file_name: string | null;
  file_size_bytes: number | null;
  settings: Record<string, unknown>;
  is_active: boolean;
  position: number;
  archived_at: string | null;
  created_at: string;
  updated_at: string;
}

/** What the public studio page can see (public_products view). No file info. */
export type PublicProduct = Pick<
  Product,
  'id' | 'profile_id' | 'type' | 'title' | 'description' | 'price_cents' | 'currency' | 'cover_url' | 'position' | 'created_at'
>;

export interface ProductOrder {
  id: string;
  product_id: string;
  profile_id: string;
  buyer_email: string;
  buyer_name: string | null;
  amount_cents: number;
  currency: string;
  stripe_payment_intent_id: string | null;
  status: ProductOrderStatus;
  download_count: number;
  paid_at: string | null;
  refunded_at: string | null;
  created_at: string;
}

export type ProductInput = Pick<
  Product,
  'title' | 'description' | 'price_cents' | 'cover_url' | 'file_path' | 'file_name' | 'file_size_bytes' | 'is_active'
>;

export const PRODUCT_FILE_MAX_BYTES = 100 * 1024 * 1024;
export const PRODUCT_COVER_MAX_BYTES = 5 * 1024 * 1024;
export const PRODUCT_MAX_DOWNLOADS = 10;
const FILES_BUCKET = 'product-files';
const COVERS_BUCKET = 'product-covers';

// Stripe zero-decimal currencies among those Nelsy supports (same list as the edge functions).
const ZERO_DECIMAL = new Set(['jpy', 'krw']);

export function centsToMajor(cents: number, currency: string): number {
  return ZERO_DECIMAL.has(currency.toLowerCase()) ? cents : cents / 100;
}

export function majorToCents(major: number, currency: string): number {
  return ZERO_DECIMAL.has(currency.toLowerCase()) ? Math.round(major) : Math.round(major * 100);
}

export function formatProductPrice(cents: number, currency: string): string {
  return formatMoney(centsToMajor(cents, currency), currency);
}

export function formatBytes(bytes: number | null | undefined): string {
  if (!bytes) return '';
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function client() {
  if (!supabase) throw new Error('Supabase not initialized');
  return supabase;
}

/** Strips anything that is not safe in a storage object key. */
function safeFileName(name: string): string {
  const cleaned = name.normalize('NFKD').replace(/[^\w.-]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  return (cleaned || 'file').slice(-120);
}

// ============ PRO (dashboard) ============

export async function getMyProducts(profileId: string): Promise<Product[]> {
  const { data, error } = await client()
    .from('products')
    .select('*')
    .eq('profile_id', profileId)
    .is('archived_at', null)
    .order('position', { ascending: true })
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data ?? []) as Product[];
}

export async function createProduct(profileId: string, input: ProductInput, position: number): Promise<Product> {
  const { data, error } = await client()
    .from('products')
    .insert({ ...input, profile_id: profileId, type: 'digital', position })
    .select('*')
    .single();
  if (error) throw error;
  return data as Product;
}

export async function updateProduct(id: string, updates: Partial<ProductInput>): Promise<Product> {
  const { data, error } = await client()
    .from('products')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw error;
  return data as Product;
}

/**
 * Deletes a product. A product that already has orders cannot be deleted (buyers keep
 * their download), so it is archived and hidden instead. Returns what happened.
 */
export async function deleteProduct(product: Product): Promise<'deleted' | 'archived'> {
  const db = client();
  const { error } = await db.from('products').delete().eq('id', product.id);
  if (!error) {
    if (product.file_path) await db.storage.from(FILES_BUCKET).remove([product.file_path]).catch(() => undefined);
    return 'deleted';
  }
  if (error.code === '23503') {
    const { error: archErr } = await db
      .from('products')
      .update({ is_active: false, archived_at: new Date().toISOString() })
      .eq('id', product.id);
    if (archErr) throw archErr;
    return 'archived';
  }
  throw error;
}

export async function reorderProducts(items: { id: string; position: number }[]): Promise<void> {
  const db = client();
  const results = await Promise.all(items.map(({ id, position }) => db.from('products').update({ position }).eq('id', id)));
  const failed = results.find((r) => r.error);
  if (failed?.error) throw failed.error;
}

export async function uploadProductCover(file: File, profileId: string): Promise<string> {
  const ext = (file.name.split('.').pop() ?? 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
  const path = `${profileId}/${crypto.randomUUID()}.${ext}`;
  const db = client();
  const { error } = await db.storage.from(COVERS_BUCKET).upload(path, file, { cacheControl: '31536000', upsert: false, contentType: file.type });
  if (error) throw error;
  return db.storage.from(COVERS_BUCKET).getPublicUrl(path).data.publicUrl;
}

export async function uploadProductFile(file: File, profileId: string): Promise<{ path: string; name: string; size: number }> {
  if (file.size > PRODUCT_FILE_MAX_BYTES) throw new Error('File is larger than 100 MB');
  const path = `${profileId}/${crypto.randomUUID()}/${safeFileName(file.name)}`;
  const { error } = await client().storage.from(FILES_BUCKET).upload(path, file, {
    upsert: false,
    contentType: file.type || 'application/octet-stream',
  });
  if (error) throw error;
  return { path, name: file.name.slice(0, 255), size: file.size };
}

export async function removeProductFile(path: string): Promise<void> {
  await client().storage.from(FILES_BUCKET).remove([path]);
}

export async function getProductOrders(profileId: string): Promise<ProductOrder[]> {
  const { data, error } = await client()
    .from('product_orders')
    .select('id, product_id, profile_id, buyer_email, buyer_name, amount_cents, currency, stripe_payment_intent_id, status, download_count, paid_at, refunded_at, created_at')
    .eq('profile_id', profileId)
    .in('status', ['paid', 'refunded'])
    .order('created_at', { ascending: false })
    .limit(200);
  if (error) throw error;
  return (data ?? []) as ProductOrder[];
}

// ============ PUBLIC (studio page) ============

export async function getPublicProducts(profileId: string): Promise<PublicProduct[]> {
  // Local dev without Supabase: the mock studios show demo products.
  if (!isSupabaseConfigured || !supabase) return DEMO_PUBLIC_PRODUCTS[profileId] ?? [];
  const { data, error } = await supabase
    .from('public_products')
    .select('*')
    .eq('profile_id', profileId)
    .order('position', { ascending: true })
    .order('created_at', { ascending: true });
  // Before the migration is applied the view does not exist: show nothing.
  if (error) return [];
  return (data ?? []) as PublicProduct[];
}

export interface ProductCheckout {
  client_secret: string;
  payment_intent_id: string;
  order_id: string;
  amount_cents: number;
  currency: string;
  stripe_account_id: string;
}

async function invokeError(err: unknown, fallback: string): Promise<Error> {
  let msg = fallback;
  try {
    const body = await (err as { context?: Response }).context?.json();
    msg = body?.message ?? body?.error ?? msg;
  } catch { /* ignore */ }
  return new Error(msg);
}

export async function startProductCheckout(productId: string, buyerEmail: string, buyerName: string): Promise<ProductCheckout> {
  const { data, error } = await client().functions.invoke('create-product-checkout', {
    // Price and currency are never sent: the server reads them from the product.
    body: { product_id: productId, buyer_email: buyerEmail, buyer_name: buyerName },
  });
  if (error) throw await invokeError(error, 'Checkout could not start. Please try again.');
  return data as ProductCheckout;
}

export interface ProductDownload {
  url: string;
  expires_in: number;
  order_id: string;
  product_title: string;
  file_name: string | null;
  downloads_used: number;
  downloads_left: number;
}

export async function getProductDownload(
  params: { orderId?: string; paymentIntentId?: string; email: string },
): Promise<ProductDownload> {
  const { data, error } = await client().functions.invoke('get-product-download', {
    body: { order_id: params.orderId, payment_intent_id: params.paymentIntentId, email: params.email },
  });
  if (error) throw await invokeError(error, 'Download is not available. Please try again.');
  return data as ProductDownload;
}

/** Real dashboard API (the /dev/products sandbox swaps in createDemoProductsApi). */
export const productsApi: ProductsApi = {
  list: getMyProducts,
  create: createProduct,
  update: updateProduct,
  remove: deleteProduct,
  reorder: reorderProducts,
  uploadCover: uploadProductCover,
  uploadFile: uploadProductFile,
  orders: getProductOrders,
};
