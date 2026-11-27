/**
 * Blog cover generator for Nelsy.
 *
 * Reproduces the thumbnail style families catalogued in docs/blog-thumbnail-style.md
 * (studied on 222 Stan blog thumbnails) with the Nelsy identity: soft pink to berry
 * fields, Plus Jakarta Sans ExtraBold headlines with tight tracking, original glossy
 * SVG objects (scripts/lib/cover-objects.mjs), the article's own verified Unsplash photo,
 * and a small "Nelsy" mark. No third-party logos or wordmarks: platforms appear as
 * generic glyph tiles plus their name in plain text.
 *
 * Families are spread across articles by type and topic (see assignFamilies): no family
 * above about 25% of covers, and two neighbouring articles of a category never share one.
 *
 * Output per article, in public/blog-covers/:
 *   <slug>.webp  1200x675, used by cards and the article hero (kept at or under 80 KB)
 *   <slug>.jpg   1200x675, used as og:image / twitter:image
 *
 * Photo cut-outs: on macOS the script compiles scripts/lib/cutout.swift (Apple Vision,
 * on-device, nothing downloaded) and removes the background of the reviewed photos in
 * CUTOUT_OK. Elsewhere those covers fall back to the framed photo version.
 *
 * Fonts: Plus Jakarta Sans (SIL Open Font License), latin subset, embedded from
 * scripts/assets/fonts so renders need no network for type.
 *
 * Usage:
 *   node scripts/generate-blog-covers.mjs [--force] [--slug=<slug>] [--only=<family,...>] [--plan]
 */

import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { tmpdir, platform } from 'os';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import { setDefaultResultOrder } from 'dns';
import puppeteer from 'puppeteer';
import sharp from 'sharp';
import { loadArticles } from './lib/load-articles.mjs';
import { obj, glyph, MAT } from './lib/cover-objects.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ARTICLES_DIR = join(ROOT, 'src/pages/learn/articles');
const OUTPUT_DIR = join(ROOT, 'public/blog-covers');
const CACHE = join(tmpdir(), 'nelsy-cover-photos');
const MAX_BYTES = 80 * 1024;

setDefaultResultOrder('ipv4first'); // Node's fetch can stall on IPv6 here

const W = 1200;
const H = 675;

const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const PLAN = args.includes('--plan');
const SLUG_FILTER = args.find((a) => a.startsWith('--slug='))?.split('=')[1] ?? null;
const ONLY = args.find((a) => a.startsWith('--only='))?.split('=')[1]?.split(',') ?? null;

// ── Palette ───────────────────────────────────────────────────────────────────
const PINK = '#F52B8C';
const BERRY = '#8A1457';
const INK = '#1A1A1A';
const DEEP = '#5C0E3B'; // headline colour on light fields (Stan uses a deep violet there)

// Saturated fields, all one family (like Stan's violet range)
const FIELD = {
  hot: `radial-gradient(ellipse 70% 90% at 82% 20%, rgba(255,166,206,.85) 0%, rgba(255,166,206,0) 60%), linear-gradient(118deg, #FF5FA8 0%, #F52B8C 38%, #C41C72 72%, ${BERRY} 100%)`,
  berry: `radial-gradient(ellipse 60% 80% at 80% 25%, rgba(245,43,140,.75) 0%, rgba(245,43,140,0) 62%), linear-gradient(118deg, #B0186E 0%, #8A1457 50%, #4F0A33 100%)`,
  rose: `radial-gradient(ellipse 70% 90% at 85% 15%, rgba(255,255,255,.55) 0%, rgba(255,255,255,0) 55%), linear-gradient(118deg, #FFB3D2 0%, #FF8EC0 45%, #F52B8C 100%)`,
  ink: `radial-gradient(ellipse 60% 80% at 80% 30%, rgba(245,43,140,.55) 0%, rgba(245,43,140,0) 62%), linear-gradient(118deg, #2A2A2A 0%, ${INK} 55%, #0E0E0E 100%)`,
  blush: `radial-gradient(ellipse 60% 80% at 15% 20%, rgba(255,255,255,.9) 0%, rgba(255,255,255,0) 60%), linear-gradient(100deg, #FFEAF2 0%, #FFD8E6 55%, #FFC2DA 100%)`,
};

const CATEGORY_LABELS = {
  'get-clients': 'Get Clients',
  'instagram-content': 'Instagram & Content',
  'pricing-money': 'Pricing & Money',
  'booking-software': 'Booking & Software',
  'policies-clients': 'Policies & Clients',
  'start-your-business': 'Start Your Business',
  'nail-education': 'Nail Education',
  'nail-inspo': 'Nail Inspo',
  comparisons: 'Comparisons',
  'branding-growth': 'Branding & Growth',
  'beauty-creators': 'Beauty Creators',
  salons: 'Salons & Teams',
};

// Photos whose Apple Vision cut-out was reviewed and looks clean (subject whole, no slivers)
const CUTOUT_OK = new Set([
  'photo-1522337660859-02fbefca4702', 'photo-1571290274554-6a2eaa771e5f', 'photo-1585060544812-6b45742d762f',
  'photo-1596462502278-27bfdc403348', 'photo-1602585578130-c9076e09330d', 'photo-1604654894610-df63bc536371',
  'photo-1608571423902-eed4a5ad8108', 'photo-1610992015762-45dca7fa3a85', 'photo-1630843599725-32ead7671867',
  'photo-1631214540553-ff044a3ff1d4', 'photo-1659391542239-9648f307c0b1', 'photo-1678695692040-e9a39502c357',
  'photo-1735236007245-9dc6e28bbe56', 'photo-1737214475292-949c0bf920b0', 'photo-1748163432725-454f46f68340',
  'photo-1754799670312-8e7da8e40ad7', 'photo-1759526997116-c8f4f2431869', 'photo-1762373349045-c2decd4ec3f3',
  'photo-1764694187667-f28a05a52c0e', 'photo-1769687209448-025548dfca8b', 'photo-1772322586754-34c9e6f5be6f',
  'photo-1775500835259-d3b3f6d6e2f2', 'photo-1777288390469-828f8816231c', 'photo-1513128034602-7814ccaddd4e',
  'photo-1596704017254-9b121068fb31', 'photo-1599050751795-6cdaafbc2319', 'photo-1632772998001-cc9bf6f7c852',
  'photo-1634733988138-bf2c3a2a13fa', 'photo-1554224155-6726b3ff858f', 'photo-1563986768609-322da13575f3',
  'photo-1460925895917-afdab827c52f', 'photo-1604902396830-aca29e19b067', 'photo-1693776529070-2cdea397595b',
  'photo-1599206676335-193c82b13c9e',
]);

// ── Helpers ───────────────────────────────────────────────────────────────────
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function hash(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
const pick = (arr, seed) => arr[hash(seed) % arr.length];

function sourceFor(slug) {
  const p = join(ARTICLES_DIR, `${slug}.tsx`);
  if (existsSync(p)) return readFileSync(p, 'utf8');
  for (const f of readdirSync(ARTICLES_DIR)) {
    const s = readFileSync(join(ARTICLES_DIR, f), 'utf8');
    if (s.includes(`'${slug}'`) || s.includes(`"${slug}"`)) return s;
  }
  return '';
}

function leadingNumber(text) {
  const m = text.match(/^(\d+\+?)\s+(.+)$/);
  return m ? { num: m[1], rest: m[2] } : null;
}

/** Split words into n lines of similar length. */
function splitLines(text, n) {
  const words = text.split(' ');
  if (n <= 1 || words.length < 2) return [text];
  const target = text.length / n;
  const lines = [];
  let cur = [];
  for (const w of words) {
    const len = [...cur, w].join(' ').length;
    if (cur.length && len > target * 1.15 && lines.length < n - 1) { lines.push(cur.join(' ')); cur = [w]; } else cur.push(w);
  }
  lines.push(cur.join(' '));
  return lines;
}

const PLATFORMS = ['Instagram', 'TikTok', 'Google', 'Pinterest'];
const PLATFORM_GLYPH = { Instagram: 'camera', TikTok: 'note', Google: 'search', Pinterest: 'pin' };

function isReview(a) {
  return a.category === 'comparisons' && /worth it|review/i.test(a.title);
}

function kicker(a) {
  if (/^how to\b/i.test(a.title)) return 'How to';
  if (/template/i.test(a.title)) return 'Templates';
  if (/checklist/i.test(a.title)) return 'Checklist';
  if (/examples?\b/i.test(a.title)) return 'Examples';
  if (/explained|guide/i.test(a.title)) return 'Guide';
  if (/^why\b/i.test(a.title)) return 'Fix it';
  if (/mistake/i.test(a.title)) return 'Fix it';
  if (/ideas?\b/i.test(a.title)) return 'Ideas';
  if (isReview(a)) return 'Honest review';
  if (/alternatives/i.test(a.title)) return 'Alternatives';
  if (/^best\b/i.test(a.title)) return 'Compared';
  return CATEGORY_LABELS[a.category] ?? 'Guide';
}

function subtitleFor(a) {
  const m = a.title.match(/\bfor ([A-Za-z -]+?)(?:\s*\(|:|\?|$)/);
  if (m && m[1].length < 26) return `for ${m[1].trim()}`;
  return null;
}

// ── Topic: which objects and glyphs illustrate an article ─────────────────────
const TOPIC_OBJECTS = [
  [/deposit|no-show|cancel/, ['bookingcard', 'badge', 'lock']],
  [/polic|boundar|resched|\blate\b/, ['lock', 'clipboard', 'clock']],
  [/template|message|reply|\bdms?\b|remind|confirm|follow-up|welcome/, ['bubble', 'envelope', 'phone']],
  [/review|retention|experience|complain|difficult|aftercare|rebook|loyal/, ['star', 'heart', 'bubble']],
  [/email|lead magnet|newsletter/, ['envelope', 'magnet', 'heart']],
  [/gift|christmas|black friday|birthday|giveaway|valentine/, ['gift', 'heart', 'pricetag']],
  [/price|pricing|charge|\brates?\b|menu|discount|add-on|package|upsell|ticket/, ['pricetag', 'coins', 'badge']],
  [/income|revenue|profit|money|cost|expense|paid|monetize|break-even|margin|make|streams|goals/, ['coins', 'chart', 'pricetag']],
  [/calendar|schedule|january|holiday|rush|gap|waitlist|slot|week|full book|booked|per day|slow season|summer|back to school/, ['calendar', 'clock', 'bookingcard']],
  [/\bapps?\b|software|online booking|website|phone|switch|tools|booking page/, ['phone', 'calendar', 'bookingcard']],
  [/link in bio|bio|instagram|tiktok|reel|content|post|caption|hook|stor|highlight|feed|photo|pinterest|film|follow|likes|cta/, ['phone', 'ringlight', 'heart']],
  [/client|referral|google|seo|local|pop-up|partner|marketing|win back|first 10/, ['magnet', 'megaphone', 'star']],
  [/gel polish|chrome|colou?r|french|polish|ombr|streak/, ['polish', 'uvlamp', 'gelpot']],
  [/builder|gel-x|gel|lift|peel|cure|retention|pops/, ['uvlamp', 'gelpot', 'polish']],
  [/acrylic|bead|infill|apex|primer|dehydrator|bubble/, ['gelpot', 'brush', 'polish']],
  [/\bfile\b|shape|grit|drill|square|almond|coffin|prep|removal|cuticle|faster|clean/, ['nailfile', 'polish', 'star']],
  [/charm|\bart\b|lines/, ['brush', 'star', 'polish']],
  [/home|studio|salon|suite|booth|independent|commission/, ['house', 'calendar', 'coins']],
  [/checklist|plan|starter|kit|mistake|start|name|card system|must-have/, ['clipboard', 'badge', 'star']],
  [/brand|premium|professional/, ['star', 'badge', 'heart']],
  [/mua|makeup|beauty|lash|brow|esthetic|course|ebook|ugc|creator|coaching|digital|virtual/, ['brush', 'lashwand', 'star']],
];

function topicText(a) {
  return `${a.coverTitle} ${a.title} ${a.slug.replace(/-/g, ' ')}`.toLowerCase();
}

function objectsFor(a) {
  const t = topicText(a);
  const out = [];
  for (const [re, objs] of TOPIC_OBJECTS) if (re.test(t)) for (const o of objs) if (!out.includes(o)) out.push(o);
  for (const o of ['polish', 'calendar', 'star']) if (!out.includes(o)) out.push(o);
  return out;
}

const TOPIC_GLYPH = [
  [/message|template|reply|\bdms?\b|remind|confirm|complain|difficult|welcome/, 'chat'],
  [/review|retention|experience|premium|level up/, 'star'],
  [/price|pricing|charge|\brates?\b|income|revenue|profit|money|cost|paid|monetize|discount|margin|expense|break-even/, 'coin'],
  [/gift|valentine|loyal|likes|heart/, 'heart'],
  [/reel|film|tiktok|video/, 'play'],
  [/instagram|photo|content|feed|post|caption|stor|highlight/, 'camera'],
  [/link in bio|bio|website/, 'link'],
  [/email|newsletter/, 'mail'],
  [/google|seo|search|local/, 'search'],
  [/\blate\b|\btime\b|hourly|how long|faster|often/, 'clock'],
  [/home|studio|salon|suite|booth/, 'home'],
  [/client|referral|partner/, 'users'],
  [/menu|add-on|package|tag/, 'tag'],
  [/policy|template|plan|checklist|card system/, 'file'],
  [/phone|\bapps?\b|software|online/, 'phone'],
  [/book|calendar|schedule|gap|waitlist|slot|january|holiday/, 'calendar'],
  [/\bfile\b|shape|drill|cuticle|removal/, 'scissors'],
];
function glyphFor(a) {
  const t = topicText(a);
  for (const [re, g] of TOPIC_GLYPH) if (re.test(t)) return g;
  return 'sparkle';
}

// ── Photos and cut-outs ───────────────────────────────────────────────────────
async function photoFile(photo, w, h) {
  mkdirSync(CACHE, { recursive: true });
  const file = join(CACHE, `${photo.id}-${w}x${h}.jpg`);
  if (!existsSync(file)) {
    const url = `https://images.unsplash.com/${photo.id}?auto=format&fit=crop&w=${w}&h=${h}&q=78&fm=jpg`;
    let lastErr;
    for (let i = 0; i < 4; i++) {
      try {
        const r = await fetch(url, { signal: AbortSignal.timeout(30000) });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        writeFileSync(file, Buffer.from(await r.arrayBuffer()));
        lastErr = null;
        break;
      } catch (e) { lastErr = e; }
    }
    if (lastErr) throw lastErr;
  }
  return file;
}

async function photoUri(photo, w, h) {
  return `data:image/jpeg;base64,${readFileSync(await photoFile(photo, w, h)).toString('base64')}`;
}

let CUTOUT_BIN = undefined;
function cutoutBin() {
  if (CUTOUT_BIN !== undefined) return CUTOUT_BIN;
  CUTOUT_BIN = null;
  if (platform() !== 'darwin') return null;
  const bin = join(CACHE, 'nelsy-cutout');
  try {
    if (!existsSync(bin)) execFileSync('swiftc', ['-O', join(__dirname, 'lib/cutout.swift'), '-o', bin], { stdio: 'ignore' });
    CUTOUT_BIN = bin;
  } catch { console.log('  (swiftc unavailable: covers use framed photos instead of cut-outs)'); }
  return CUTOUT_BIN;
}

const canCutout = (photo) => CUTOUT_OK.has(photo.id) && !!cutoutBin();

/** Cut-out PNG (transparent background) trimmed to the subject, as data URI + aspect. */
async function cutoutUri(photo) {
  const src = await photoFile(photo, 1000, 1000);
  const png = join(CACHE, `${photo.id}-cut.png`);
  const trimmed = join(CACHE, `${photo.id}-cut-trim.webp`);
  if (!existsSync(trimmed)) {
    if (!existsSync(png)) execFileSync(cutoutBin(), [src, png], { stdio: 'ignore' });
    const buf = await sharp(png).trim({ threshold: 1 }).resize({ width: 820, height: 820, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82, alphaQuality: 90 }).toBuffer();
    writeFileSync(trimmed, buf);
  }
  const meta = await sharp(trimmed).metadata();
  return { uri: `data:image/webp;base64,${readFileSync(trimmed).toString('base64')}`, ratio: meta.width / meta.height };
}

// ── Page shell ────────────────────────────────────────────────────────────────
let FONTS = '';
function loadFonts() {
  const f = (name) => readFileSync(join(__dirname, 'assets/fonts', name)).toString('base64');
  FONTS = `<style>
@font-face{font-family:'Jakarta';src:url(data:font/woff2;base64,${f('PlusJakartaSans-latin.woff2')}) format('woff2');font-weight:200 800;font-style:normal;font-display:block}
@font-face{font-family:'Jakarta';src:url(data:font/woff2;base64,${f('PlusJakartaSans-Italic-latin.woff2')}) format('woff2');font-weight:200 800;font-style:italic;font-display:block}
</style>`;
}

function shell(bg, body) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">${FONTS}<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden}
#cover{position:relative;width:${W}px;height:${H}px;overflow:hidden;background:${bg};font-family:'Jakarta',sans-serif;color:#fff}
.h{font-family:'Jakarta',sans-serif;font-weight:800;letter-spacing:-.035em;line-height:1.02}
.mark{position:absolute;display:flex;align-items:center;gap:9px;font:800 27px 'Jakarta';letter-spacing:-.02em;z-index:20}
.mark i{display:inline-block;width:12px;height:12px;border-radius:99px;background:currentColor}
.pill{display:inline-flex;align-items:center;font:800 19px 'Jakarta';letter-spacing:.1em;text-transform:uppercase;padding:9px 18px;border-radius:99px}
.lbl{display:inline-block;background:#fff;color:${INK};font:italic 800 70px/1.08 'Jakarta';letter-spacing:-.03em;padding:4px 22px 10px 18px;white-space:nowrap}
.abs{position:absolute}
</style></head><body><div id="cover">${body}</div></body></html>`;
}

/** Small Nelsy mark. Reviews stay neutral: no mark. */
function mark(a, { color = '#fff', hole = PINK, pos = 'left:64px;bottom:44px' } = {}) {
  if (isReview(a)) return '';
  return `<div class="mark" style="${pos};color:${color};--hole:${hole}"><i></i>Nelsy</div>`;
}

const fitBox = (text, { max, min, h, cls = 'h', style = '' }) =>
  `<div id="fit" class="${cls}" data-max="${max}" data-min="${min}" data-h="${h}" style="font-size:${max}px;${style}">${text}</div>`;

// ── Families ──────────────────────────────────────────────────────────────────
// Each takes the article (with .ctx: bg variant, objects, glyph, photo uris) and returns HTML.

/** 1. Glossy 3D objects on a saturated field, heavy white headline left. */
function famGlass(a) {
  const [o1, o2, o3] = a.ctx.objects;
  const sub = subtitleFor(a) && !a.coverTitle.toLowerCase().includes(subtitleFor(a).slice(4).toLowerCase()) ? subtitleFor(a) : null;
  const field = a.ctx.field;
  const light = field === 'rose';
  const fg = light ? DEEP : '#fff';
  const v = hash(a.slug) % 2;
  return shell(FIELD[field], `
    <div class="abs" style="left:68px;top:0;bottom:0;width:560px;display:flex;flex-direction:column;justify-content:center;z-index:5">
      ${fitBox(esc(a.coverTitle), { max: 100, min: 64, h: 380, style: `color:${fg}` })}
      ${sub ? `<div style="font:600 36px 'Jakarta';letter-spacing:-.02em;color:${fg};opacity:.92;margin-top:14px">${esc(sub)}</div>` : ''}
    </div>
    ${obj(o1, { x: v ? 640 : 660, y: v ? 120 : 90, size: 470, rotate: v ? -8 : 6, z: 3 })}
    ${obj(o2, { x: v ? 980 : 960, y: v ? -30 : 380, size: 250, rotate: v ? 14 : -12, z: 2 })}
    ${obj(o3, { x: v ? 980 : 610, y: v ? 450 : -40, size: 170, rotate: -10, z: 4, style: 'opacity:.95' })}
    ${mark(a, { color: fg, hole: light ? '#FFB3D2' : PINK })}`);
}

/** 2. Big number, highlighted middle line, emblem badge (Stan "5 Gumroad Alternatives"). */
function famNumber(a) {
  const { num, rest } = leadingNumber(a.coverTitle);
  const words = rest.split(' ');
  const hl = words.length <= 2 ? rest : words.slice(0, Math.ceil(words.length / 2)).join(' ');
  const tail = words.length <= 2 ? '' : words.slice(Math.ceil(words.length / 2)).join(' ');
  const thin = ['brush', 'lashwand', 'nailfile'];
  const [o1, o2] = [...a.ctx.objects.filter((o) => !thin.includes(o)), ...a.ctx.objects.filter((o) => thin.includes(o))];
  return shell(FIELD[a.ctx.field], `
    <div class="abs" style="left:66px;top:70px;width:640px;z-index:5">
      <div class="h" style="font-size:${num.length > 3 ? 190 : 230}px;line-height:.9;letter-spacing:-.05em">${esc(num)}</div>
      <div id="fit" data-max="72" data-min="46" data-h="230" style="font-size:72px;margin-top:18px">
        <span class="h" style="display:inline-block;background:#fff;color:${PINK};padding:2px 20px 10px;border-radius:6px;transform:rotate(-2deg);transform-origin:left;white-space:nowrap;box-shadow:0 14px 30px -12px rgba(60,0,30,.45)">${esc(hl)}</span>
        ${tail ? `<div class="h" style="margin-top:10px;white-space:nowrap">${esc(tail)}</div>` : ''}
      </div>
    </div>
    ${obj(o1, { x: 700, y: 70, size: 520, rotate: -6, z: 2 })}
    <div class="abs" style="left:${hash(a.slug) % 2 ? 700 : 960}px;top:${hash(a.slug) % 2 ? 430 : 400}px;width:190px;height:190px;z-index:4">${obj('apptile', { x: 0, y: 0, size: 190, rotate: 10, opts: { mat: 'ink', icon: a.ctx.glyph } })}</div>
    ${o2 ? obj(o2, { x: 1010, y: -30, size: 200, rotate: 16, z: 1 }) : ''}
    ${mark(a)}`);
}

/** 3. How-to: light field, dark pill, medium headline, photo or cut-out on the right half. */
function famHowto(a) {
  const k = kicker(a);
  const cut = a.ctx.cutout;
  const right = cut
    ? `<div class="abs" style="right:0;top:0;bottom:0;width:640px;background:linear-gradient(160deg,#FF8EC0 0%,${PINK} 60%,#C41C72 100%);clip-path:polygon(26% 0,100% 0,100% 100%,0 100%)"></div>
       <div class="abs" style="right:-30px;top:0;bottom:0;width:560px;border-radius:50%;background:radial-gradient(circle,rgba(255,227,238,.65) 0%,rgba(255,227,238,0) 65%);filter:blur(20px)"></div>
       <img class="abs" src="${cut.uri}" style="${cutoutBox(cut, { cx: 900, bottom: 0, maxW: 560, maxH: 640 })};filter:drop-shadow(0 30px 40px rgba(90,10,50,.45))">`
    : `<div class="abs" style="right:0;top:0;bottom:0;width:680px;background:url(${a.ctx.photoWide}) center/cover;clip-path:polygon(24% 0,100% 0,100% 100%,0 100%)"></div>
       <div class="abs" style="right:0;top:0;bottom:0;width:680px;background:linear-gradient(90deg,rgba(255,216,230,.95) 0%,rgba(255,216,230,0) 38%);clip-path:polygon(24% 0,100% 0,100% 100%,0 100%)"></div>`;
  return shell(FIELD.blush, `${right}
    <div class="abs" style="left:68px;top:0;bottom:0;width:520px;display:flex;flex-direction:column;justify-content:center;z-index:5">
      <div><span class="pill" style="background:${INK};color:#fff">${esc(k)}</span></div>
      ${fitBox(esc(a.coverTitle), { max: 84, min: 54, h: 330, style: `color:${DEEP};font-weight:700;letter-spacing:-.03em;margin-top:26px;line-height:1.06` })}
    </div>
    ${mark(a, { color: DEEP, hole: '#FFD8E6' })}`);
}

function cutoutBox(cut, { cx, bottom, maxW, maxH }) {
  let h = maxH, w = h * cut.ratio;
  if (w > maxW) { w = maxW; h = w / cut.ratio; }
  return `left:${Math.round(cx - w / 2)}px;bottom:${bottom}px;width:${Math.round(w)}px;height:${Math.round(h)}px`;
}

/** 4. Spotlight: inset field panel, heavy italic name-style headline, subject breaking out. */
function famSpotlight(a) {
  const lines = splitLines(a.coverTitle, a.coverTitle.length > 14 ? 2 : 1);
  const cut = a.ctx.cutout;
  const subject = cut
    ? `<img class="abs" src="${cut.uri}" style="${cutoutBox(cut, { cx: 905, bottom: 36, maxW: 500, maxH: 690 })};z-index:3;filter:drop-shadow(0 26px 34px rgba(60,0,30,.5))">`
    : `<div class="abs" style="right:90px;bottom:36px;width:430px;height:560px;border-radius:215px 215px 0 0;background:url(${a.ctx.photoTall}) center/cover;z-index:3;box-shadow:0 0 0 10px rgba(255,255,255,.22),0 0 80px 10px rgba(255,180,215,.55)"></div>`;
  return shell(FIELD.blush, `
    <div class="abs" style="left:36px;top:36px;right:36px;bottom:36px;border-radius:30px;background:${FIELD[a.ctx.field === 'rose' ? 'hot' : a.ctx.field]};overflow:hidden"></div>
    ${subject}
    <div class="abs" style="left:94px;top:84px;width:540px;z-index:5">
      ${fitBox(lines.map(esc).join('<br>'), { max: 100, min: 60, h: 300, style: 'font-style:italic;white-space:nowrap' })}
    </div>
    <div class="abs" style="left:94px;bottom:86px;display:flex;align-items:center;gap:14px;z-index:5">
      <span style="width:52px;height:52px;border-radius:99px;background:#fff;display:flex;align-items:center;justify-content:center"><svg width="30" height="30" viewBox="-80 -80 160 160">${glyph(a.ctx.glyph, PINK)}</svg></span>
      <span style="font:600 24px/1.15 'Jakarta';color:#fff">${esc(CATEGORY_LABELS[a.category] ?? 'Nail')}<br>${esc(kicker(a) === CATEGORY_LABELS[a.category] ? 'Guide' : kicker(a))}</span>
    </div>
    ${mark(a, { pos: 'right:64px;bottom:58px' })}`);
}

/** 5. Photo-led with white label boxes (heavy italic), one word in pink, a 3D sticker. */
function famLabels(a) {
  const words = a.coverTitle.split(' ');
  const lines = splitLines(a.coverTitle, words.length >= 3 ? 2 : 1);
  const lastLine = lines.length - 1;
  const v = hash(a.slug) % 3;
  const pos = [
    'left:56px;bottom:70px;align-items:flex-start',
    'left:56px;top:62px;align-items:flex-start',
    'right:56px;bottom:70px;align-items:flex-end',
  ][v];
  const html = lines.map((l, i) => {
    let t = esc(l);
    if (i === lastLine) {
      const ws = l.split(' ');
      const last = ws.pop();
      t = `${ws.length ? esc(ws.join(' ')) + ' ' : ''}<span style="color:${PINK}">${esc(last)}</span>`;
    }
    return `<span class="lbl" data-line="1">${t}</span>`;
  }).join('');
  const sticker = [{ x: 960, y: 40 }, { x: 980, y: 430 }, { x: 70, y: 40 }][v];
  return shell('#2a1a22', `
    <div class="abs" style="inset:0;background:url(${a.ctx.photoWide}) center/cover"></div>
    <div class="abs" style="inset:0;background:linear-gradient(${v === 1 ? '180deg' : '0deg'},rgba(40,8,26,.32) 0%,rgba(40,8,26,0) 50%)"></div>
    <div id="labels" class="abs" style="${pos};display:flex;flex-direction:column;gap:0;z-index:5">${html}</div>
    ${obj(a.ctx.sticker, { x: sticker.x, y: sticker.y, size: 170, rotate: -12, z: 4, opts: a.ctx.stickerOpts, shadow: 'rgba(0,0,0,.35)' })}
    ${mark(a, { pos: ['left:64px;top:44px', 'left:64px;bottom:40px', 'right:64px;top:44px'][v] })}`);
}

/** 6. Cheat sheet: light field, thin framing lines, centred gradient headline. */
function famCheat(a) {
  const k = kicker(a);
  const lines = splitLines(a.coverTitle, a.coverTitle.length > 16 ? 2 : 1);
  const line = 'rgba(138,20,87,.45)';
  return shell(`radial-gradient(ellipse 30% 70% at 0% 50%, #FFC2DA 0%, rgba(255,194,218,0) 100%), radial-gradient(ellipse 30% 70% at 100% 50%, #FFD0E2 0%, rgba(255,208,226,0) 100%), #FFF8FB`, `
    <svg class="abs" style="inset:0" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" stroke="${line}" stroke-width="2">
      <path d="M90,150 V96 H150 M1050,96 H1110 V150 M90,525 V579 H150 M1050,579 H1110 V525"/>
      <path d="M600,0 V70 M600,605 V675 M0,337 H60 M1140,337 H1200"/>
      <circle cx="600" cy="74" r="5" fill="${PINK}" stroke="none"/><circle cx="600" cy="601" r="5" fill="${PINK}" stroke="none"/>
      <circle cx="64" cy="337" r="5" fill="${PINK}" stroke="none"/><circle cx="1136" cy="337" r="5" fill="${PINK}" stroke="none"/>
      <path d="M120,337 H150 M1050,337 H1080" stroke-dasharray="4 6"/>
    </svg>
    <div class="abs" style="left:160px;right:160px;top:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center">
      <div style="font:500 44px 'Jakarta';letter-spacing:-.02em;color:${BERRY}">${esc(k)}</div>
      ${fitBox(lines.map(esc).join('<br>'), { max: 112, min: 66, h: 300, style: `margin-top:8px;white-space:nowrap;background:linear-gradient(100deg,${PINK} 0%,#D61F7E 50%,${BERRY} 100%);-webkit-background-clip:text;background-clip:text;color:transparent;padding-bottom:6px` })}
    </div>
    ${mark(a, { color: BERRY, hole: '#FFF8FB', pos: 'left:50%;transform:translateX(-50%);bottom:26px' })}`);
}

/** 7. Big app-icon tile + white title card (Stan "The TikTok Profit Playbook"). */
function famAppTile(a) {
  const lines = splitLines(a.coverTitle, a.coverTitle.length > 14 ? 2 : 1);
  const tileMat = a.ctx.field === 'ink' ? 'hot' : 'ink';
  return shell(FIELD[a.ctx.field === 'rose' ? 'hot' : a.ctx.field], `
    ${obj('apptile', { x: 70, y: 110, size: 470, rotate: 0, z: 2, opts: { mat: tileMat, icon: a.ctx.glyph }, shadow: 'rgba(40,0,20,.5)' })}
    <div class="abs" style="left:520px;top:178px;width:600px;min-height:300px;background:#fff;border-radius:34px;padding:40px 46px;z-index:3;box-shadow:0 40px 70px -30px rgba(60,0,30,.55);display:flex;flex-direction:column;justify-content:center">
      ${fitBox(lines.map(esc).join('<br>'), { max: 70, min: 46, h: 220, style: `color:${INK};white-space:nowrap` })}
      <div style="font:800 34px 'Jakarta';color:${PINK};margin-top:14px;letter-spacing:-.02em">${esc(a.ctx.tag)}</div>
    </div>
    ${mark(a, { pos: 'right:64px;bottom:40px' })}`);
}

/** 8. Search pill over a blurred photo (Stan "Turn Views into Sales"). */
function famSearch(a) {
  return shell('#3a1a2a', `
    <div class="abs" style="inset:-40px;background:url(${a.ctx.photoWide}) center/cover;filter:blur(11px) saturate(1.2)"></div>
    <div class="abs" style="inset:0;background:linear-gradient(120deg,rgba(245,43,140,.38),rgba(90,10,50,.42))"></div>
    <div class="abs" style="left:0;right:0;top:0;bottom:0;display:flex;align-items:center;justify-content:center">
      <div id="pill" style="display:flex;align-items:center;gap:26px;padding:34px 58px 38px 46px;border-radius:999px;background:linear-gradient(180deg,rgba(255,255,255,.34),rgba(255,255,255,.14));border:2.5px solid rgba(255,255,255,.75);box-shadow:inset 0 2px 0 rgba(255,255,255,.6),0 30px 60px -20px rgba(60,0,30,.55);backdrop-filter:blur(8px)">
        <svg width="60" height="60" viewBox="-80 -80 160 160" style="flex:none">${glyph('search', '#fff')}</svg>
        ${fitBox(esc(a.coverTitle), { max: 78, min: 44, h: 100, style: 'color:#fff;font-weight:700;white-space:nowrap;letter-spacing:-.03em' })}
      </div>
    </div>
    ${mark(a)}`);
}

/** 9. Flat illustrated objects scattered on a pastel field + one hero object, title in label boxes. */
function famFlat(a) {
  const [hero, small] = a.ctx.objects;
  const scatter = a.ctx.scatter;
  const items = [];
  const seeds = [[40, 40, -18], [230, 20, 12], [420, 60, -6], [60, 230, 20], [300, 210, -14], [500, 250, 8], [20, 420, -10], [640, 40, 16], [180, 380, 6]];
  seeds.forEach(([x, y, r], i) => items.push(obj(scatter, { x, y, size: 150 - (i % 3) * 14, rotate: r + (hash(a.slug + i) % 20) - 10, z: 1, shadow: 'rgba(138,20,87,.25)', opts: a.ctx.scatterOpts })));
  const lines = splitLines(a.coverTitle, a.coverTitle.split(' ').length >= 3 ? 2 : 1);
  return shell(`radial-gradient(ellipse 60% 80% at 80% 40%, #FFFFFF 0%, rgba(255,255,255,0) 60%), linear-gradient(120deg, #FFD8E6 0%, #FFE6F0 60%, #FFC9DE 100%)`, `
    ${items.join('')}
    ${obj(hero, { x: 690, y: 90, size: 480, rotate: -12, z: 3 })}
    ${small ? obj(small, { x: 1010, y: 430, size: 170, rotate: 12, z: 4 }) : ''}
    <div id="labels" class="abs" style="left:56px;bottom:66px;display:flex;flex-direction:column;align-items:flex-start;z-index:5;filter:drop-shadow(0 16px 24px rgba(138,20,87,.25))">
      ${lines.map((l) => `<span class="lbl" data-line="1">${esc(l)}</span>`).join('')}
    </div>
    ${mark(a, { color: BERRY, hole: '#FFE6F0', pos: 'right:56px;bottom:30px' })}`);
}

/** 10. A vs B: names on top with a VS pill, two overlapping glossy tiles on rings. */
function famVs(a) {
  const [l, r] = a.coverTitle.split(/ vs /i);
  const sub = subtitleFor(a) ?? 'Which one fits you?';
  const icons = ['calendar', 'star', 'sparkle', 'clock', 'store', 'scissors', 'coin', 'home', 'users'];
  const gl = (name) => {
    if (/rent|commission/i.test(name)) return /rent/i.test(name) ? 'home' : 'coin';
    if (/home/i.test(name)) return 'home';
    if (/salon|suite/i.test(name)) return 'store';
    if (/primer|acid/i.test(name)) return 'sparkle';
    if (/dehydrator/i.test(name)) return 'scissors';
    return pick(icons, name);
  };
  let gA = gl(l), gB = gl(r);
  if (gA === gB) gB = icons[(icons.indexOf(gA) + 1) % icons.length];
  const field = a.ctx.field === 'rose' ? 'hot' : a.ctx.field;
  return shell(`repeating-radial-gradient(circle at 50% 66%, rgba(255,255,255,0) 0 26px, rgba(255,255,255,.09) 26px 28px), ${FIELD[field]}`, `
    <div class="abs" style="left:0;right:0;top:64px;display:flex;justify-content:center;z-index:5">
      <div id="vsrow" style="display:flex;align-items:center;gap:22px;white-space:nowrap">
        <span class="h vsname" style="font-size:64px;font-weight:700;letter-spacing:-.03em">${esc(l)}</span>
        <span style="font:italic 800 34px 'Jakarta';background:#fff;color:${PINK};padding:6px 16px 8px;border-radius:10px;transform:skewX(-8deg)">VS.</span>
        <span class="h vsname" style="font-size:64px;font-weight:700;letter-spacing:-.03em">${esc(r)}</span>
      </div>
    </div>
    ${obj('apptile', { x: 330, y: 200, size: 330, rotate: -8, z: 3, opts: { mat: 'pearl', icon: gA }, shadow: 'rgba(40,0,20,.45)' })}
    ${obj('apptile', { x: 560, y: 230, size: 330, rotate: 8, z: 4, opts: { mat: 'ink', icon: gB }, shadow: 'rgba(40,0,20,.5)' })}
    <div class="abs" style="left:0;right:0;bottom:40px;text-align:center;font:600 30px 'Jakarta';opacity:.92;z-index:5">${esc(sub)}</div>
    ${isReview(a) || a.category === 'comparisons' ? '' : mark(a)}`);
}

/** 11. Big tilted phone + round badge (Stan creator bio / "500K+ in 9 months"). */
function famPhone(a) {
  const screen = /bio|link|instagram|tiktok|content|reel|post|caption|stor|highlight|follow|likes/i.test(topicText(a)) ? 'profile' : 'booking';
  const k = kicker(a);
  return shell(FIELD[a.ctx.field], `
    <div class="abs" style="left:68px;top:0;bottom:0;width:520px;display:flex;flex-direction:column;justify-content:center;z-index:5">
      <div><span class="pill" style="background:#fff;color:${PINK}">${esc(k)}</span></div>
      ${fitBox(esc(a.coverTitle), { max: 92, min: 58, h: 320, style: 'margin-top:24px' })}
    </div>
    ${obj('phone', { x: 610, y: 60, size: 600, rotate: -10, z: 3, opts: { screen }, shadow: 'rgba(40,0,20,.5)' })}
    <div class="abs" style="left:${hash(a.slug) % 2 ? 930 : 590}px;top:${hash(a.slug) % 2 ? 330 : 360}px;width:230px;height:230px;border-radius:999px;background:radial-gradient(circle at 35% 30%,#FFFFFF 0%,#FFE3EE 55%,#FFC2DA 100%);border:6px solid ${PINK};display:flex;align-items:center;justify-content:center;z-index:4;box-shadow:0 30px 50px -18px rgba(60,0,30,.55)">
      <svg width="120" height="120" viewBox="-80 -80 160 160">${glyph(a.ctx.glyph, PINK)}</svg>
    </div>
    ${mark(a)}`);
}

/** 12. Blueprint: grid field, line-art wireframes, outlined label, big title (Stan "Order Bumps"). */
function famBlueprint(a) {
  const k = kicker(a);
  const lines = splitLines(a.coverTitle, a.coverTitle.length > 12 ? 2 : 1);
  const st = 'rgba(255,255,255,.42)';
  const card = (x, y, w, h, g) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" stroke="${st}" stroke-width="2.5" fill="rgba(255,255,255,.04)"/>
    <path d="M${x},${y + 30} H${x + w}" stroke="${st}" stroke-width="2"/>${[0, 1, 2].map((i) => `<circle cx="${x + 18 + i * 14}" cy="${y + 15}" r="4" fill="${st}"/>`).join('')}
    <g transform="translate(${x + w / 2},${y + 30 + (h - 30) / 2}) scale(${Math.min(w, h - 30) / 260})" opacity=".75">${glyph(g, 'transparent').replace(/fill="currentColor"/g, `fill="${st}"`).replace(/stroke="currentColor"/g, `stroke="${st}"`)}</g>`;
  const glyphs = ['file', a.ctx.glyph, 'check', 'calendar', 'chat'];
  return shell(`linear-gradient(rgba(255,255,255,.06) 2px, transparent 2px) 0 0/48px 48px, linear-gradient(90deg, rgba(255,255,255,.06) 2px, transparent 2px) 0 0/48px 48px, ${FIELD.berry}`, `
    <svg class="abs" style="left:0;top:0" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none">
      ${card(650, 80, 230, 190, glyphs[0])}${card(920, 60, 220, 220, glyphs[1])}${card(700, 330, 200, 180, glyphs[2])}${card(950, 330, 190, 180, glyphs[3])}
      <path d="M880,175 H920 M790,270 V330 M1035,280 V330" stroke="${st}" stroke-width="2.5" stroke-dasharray="6 7"/>
      ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${680 + i * 70}" y="${600 - (i + 1) * 14}" width="40" height="${(i + 1) * 14}" rx="4" stroke="${st}" stroke-width="2"/>`).join('')}
      <path d="M660,560 C760,560 900,540 1120,470" stroke="${st}" stroke-width="2.5"/>
    </svg>
    <div class="abs" style="left:70px;top:0;bottom:0;width:580px;display:flex;flex-direction:column;justify-content:center;z-index:5">
      <div><span style="display:inline-block;font:700 20px 'Jakarta';letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.8);border:2px dashed rgba(255,255,255,.55);padding:6px 14px">${esc(k)}:</span></div>
      ${fitBox(lines.map(esc).join('<br>'), { max: 108, min: 62, h: 330, style: 'margin-top:22px;white-space:nowrap;color:#FFE3EE;text-shadow:0 2px 0 rgba(255,255,255,.25),0 18px 40px rgba(30,0,15,.35)' })}
    </div>
    ${mark(a)}`);
}

/** 13. Torn paper band across the field, heavy italic headline (Stan "By Creators for Creators"). */
function famTorn(a) {
  const pts = (y, dir) => {
    const p = [];
    for (let x = 0; x <= W; x += 24) p.push(`${x},${y + dir * ((hash(a.slug + x + dir) % 22) - 4)}`);
    return p;
  };
  const top = pts(170, 1), bot = pts(505, -1).reverse();
  const lines = splitLines(a.coverTitle, a.coverTitle.length > 16 ? 2 : 1);
  return shell(FIELD[a.ctx.field === 'ink' ? 'hot' : a.ctx.field], `
    <svg class="abs" style="left:0;top:0;filter:drop-shadow(0 18px 24px rgba(60,0,30,.35))" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <polygon points="${[...top, ...bot].join(' ')}" fill="#FFF9FB"/>
      <polygon points="${top.map((p) => { const [x, y] = p.split(','); return `${x},${+y + 8}`; }).join(' ')} ${W},${190} 0,${190}" fill="#F2E3EA" opacity=".8"/>
    </svg>
    <div class="abs" style="left:90px;right:90px;top:190px;bottom:180px;display:flex;align-items:center;justify-content:center;text-align:center">
      ${fitBox(lines.map(esc).join('<br>'), { max: 110, min: 62, h: 290, style: `font-style:italic;white-space:nowrap;color:${BERRY}` })}
    </div>
    ${mark(a, { pos: 'left:64px;bottom:40px' })}`);
}

/** 14. Floating Nelsy UI cards on a light field (Stan product "success" covers), headline left. */
function famUi(a) {
  const k = kicker(a);
  const t = topicText(a);
  const kinds = /deposit|no-show|cancel|polic/.test(t) ? ['deposit', 'booking']
    : /price|menu|add-on|package|upsell|charge|rate/.test(t) ? ['menu', 'chart']
      : /income|revenue|profit|money|cost|expense|margin|break-even|goals/.test(t) ? ['chart', 'booking']
        : /message|template|dm|reply|remind|confirm/.test(t) ? ['messages', 'booking']
          : ['calendar', 'booking'];
  return shell(FIELD.blush, `
    <div class="abs" style="left:68px;top:0;bottom:0;width:500px;display:flex;flex-direction:column;justify-content:center;z-index:5">
      <div><span class="pill" style="background:${PINK};color:#fff">${esc(k)}</span></div>
      ${fitBox(esc(a.coverTitle), { max: 88, min: 56, h: 330, style: `margin-top:24px;color:${INK}` })}
    </div>
    <svg class="abs" style="left:560px;top:0" width="640" height="${H}" fill="none"><path d="M120,330 C200,330 220,200 330,200 M300,470 C380,470 420,520 520,520" stroke="${PINK}" stroke-width="3" stroke-dasharray="8 9" opacity=".6"/></svg>
    <div class="abs" style="left:610px;top:70px;transform:rotate(-3deg);z-index:3">${widget(kinds[0])}</div>
    <div class="abs" style="left:780px;top:330px;transform:rotate(3deg) scale(.92);transform-origin:left top;z-index:4">${widget(kinds[1])}</div>
    ${obj(a.ctx.objects[0], { x: 1010, y: 30, size: 180, rotate: 12, z: 5 })}
    ${mark(a, { color: DEEP, hole: '#FFD8E6' })}`);
}

/** 15. App tile cluster around a hero tile (Stan "alternatives" grid), headline left. */
function famTiles(a) {
  const neutral = isReview(a) || /alternatives/i.test(a.title);
  const field = a.ctx.field === 'rose' ? 'hot' : a.ctx.field;
  const sub = subtitleFor(a) && !a.coverTitle.toLowerCase().includes(subtitleFor(a).slice(4).toLowerCase()) ? subtitleFor(a) : null;
  const others = ['scissors', 'star', 'clock', 'store', 'users', 'sparkle'];
  const pickO = (i) => others[(hash(a.slug) + i) % others.length];
  const t = (x, y, s, mat, icon, rot, z) => obj('apptile', { x, y, size: s, rotate: rot, z, opts: { mat, icon }, shadow: 'rgba(40,0,20,.45)' });
  return shell(FIELD[field], `
    <div class="abs" style="left:68px;top:0;bottom:0;width:520px;display:flex;flex-direction:column;justify-content:center;z-index:5">
      <div><span class="pill" style="background:rgba(255,255,255,.18);color:#fff;border:2px solid rgba(255,255,255,.4)">${esc(kicker(a))}</span></div>
      ${fitBox(esc(a.coverTitle), { max: 92, min: 58, h: 300, style: 'margin-top:24px' })}
      ${sub ? `<div style="font:600 34px 'Jakarta';opacity:.92;margin-top:12px;letter-spacing:-.02em">${esc(sub)}</div>` : ''}
    </div>
    ${t(640, 40, 210, 'pearl', pickO(0), -8, 2)}
    ${t(980, 30, 190, 'ink', pickO(1), 10, 2)}
    ${t(1000, 420, 200, 'berry', pickO(2), -6, 2)}
    ${t(640, 430, 190, 'blush', pickO(3), 8, 2)}
    ${t(740, 160, 360, neutral || hash(a.slug) % 2 ? 'hot' : 'pearl', neutral ? a.ctx.glyph : hash(a.slug) % 2 ? 'nelsy' : 'calendar', 0, 4)}
    ${mark(a)}`);
}

/** 16. Platform monetize: small line + big platform name with a generic glyph tile (no logos). */
function famPlatform(a) {
  const p = PLATFORMS.find((x) => new RegExp(`\\b${x}\\b`, 'i').test(a.coverTitle));
  const [before, after] = a.coverTitle.split(new RegExp(`\\b${p}\\b`, 'i')).map((s) => s.trim());
  const field = a.ctx.field === 'rose' ? 'berry' : a.ctx.field;
  const pattern = Array.from({ length: 18 }, (_, i) => `<g transform="translate(${80 + (i % 6) * 210},${70 + Math.floor(i / 6) * 230}) rotate(${(i * 23) % 40 - 20}) scale(.7)" opacity=".08">${glyph(PLATFORM_GLYPH[p], '#fff')}</g>`).join('');
  return shell(FIELD[field], `
    <svg class="abs" style="left:0;top:0" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${pattern}</svg>
    <div class="abs" style="left:60px;right:60px;top:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;z-index:5">
      ${before ? `<div style="font:italic 500 56px 'Jakarta';letter-spacing:-.02em;opacity:.95">${esc(before)}</div>` : ''}
      <div id="prow" style="display:flex;align-items:center;gap:30px;margin:14px 0">
        <div style="position:relative;width:170px;height:170px;flex:none">${obj('apptile', { x: 0, y: 0, size: 170, opts: { mat: 'pearl', icon: PLATFORM_GLYPH[p] }, shadow: 'rgba(40,0,20,.45)' })}</div>
        <span class="h" style="font-size:150px;letter-spacing:-.045em;white-space:nowrap">${esc(p)}</span>
      </div>
      ${after ? `<div style="font:italic 500 56px 'Jakarta';letter-spacing:-.02em;opacity:.95">${esc(after)}</div>` : ''}
    </div>
    ${mark(a)}`);
}

// Nelsy UI widgets used by famUi (pure HTML/CSS, no prices or stats)
const CHECK = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="${PINK}"/><path d="M7 12.5l3.2 3.2L17 9" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const bar = (w, c = '#EFE6EA', h = 12) => `<div style="height:${h}px;width:${w}px;border-radius:99px;background:${c}"></div>`;
function widget(kind) {
  const card = (inner, extra = '') => `<div style="position:relative;background:#fff;color:${INK};border-radius:26px;padding:22px 24px;box-shadow:0 30px 60px -20px rgba(138,20,87,.45),0 0 0 1px rgba(26,26,26,.04);font-family:'Jakarta';${extra}">${inner}</div>`;
  const row = (l, r, extra = '') => `<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;${extra}">${l}${r}</div>`;
  const label = (t) => `<span style="font:800 14px 'Jakarta';letter-spacing:.12em;text-transform:uppercase;color:#9A8A92">${t}</span>`;
  const chip = (t, ok) => `<span style="font:800 15px 'Jakarta';padding:7px 13px;border-radius:99px;background:${ok ? '#E7F7EE' : '#FCE4EF'};color:${ok ? '#137A3F' : PINK}">${t}</span>`;
  const title = (t) => `<div style="font:800 26px 'Jakarta';letter-spacing:-.02em;margin-top:10px">${t}</div>`;
  const sub = (t) => `<div style="font:600 18px 'Jakarta';color:#7A6A72;margin-top:4px">${t}</div>`;
  switch (kind) {
    case 'deposit':
      return card(`${row(label('Booking request'), chip('Deposit paid', true))}${title('Gel manicure')}${sub('Friday · 10:30')}
        ${row(`<span style="font:700 18px 'Jakarta'">Require a deposit</span>`, `<span style="width:58px;height:34px;border-radius:99px;background:${PINK};position:relative;display:inline-block"><span style="position:absolute;right:4px;top:4px;width:26px;height:26px;border-radius:99px;background:#fff"></span></span>`, 'margin-top:16px;padding-top:14px;border-top:2px solid #F6EEF1')}`, 'width:370px');
    case 'calendar': {
      const fill = [[1, 1, 0, 1], [1, 0, 1, 1], [0, 1, 1, 1], [1, 1, 1, 0], [1, 1, 1, 1]];
      return card(`${row(label('This week'), chip('Open slot'))}
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-top:14px">${['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => `<div><div style="font:700 14px 'Jakarta';color:#9A8A92;text-align:center;margin-bottom:7px">${d}</div>${fill[i].map((f) => `<div style="height:28px;border-radius:9px;margin-bottom:6px;background:${f ? PINK : 'transparent'};border:${f ? 'none' : `2px dashed ${PINK}`}"></div>`).join('')}</div>`).join('')}</div>`, 'width:390px');
    }
    case 'messages':
      return card(`<div style="font:700 20px/1.3 'Jakarta';padding:13px 17px;border-radius:20px;border-bottom-left-radius:6px;background:#F3EDF0;max-width:300px">Hi! Anything on Friday?</div>
        <div style="font:700 20px/1.3 'Jakarta';padding:13px 17px;border-radius:20px;border-bottom-right-radius:6px;background:${PINK};color:#fff;margin:8px 0 0 auto;max-width:300px">Yes! Book here</div>
        <div style="font:700 20px/1.3 'Jakarta';padding:13px 17px;border-radius:20px;background:#FCE4EF;color:${PINK};margin:8px 0 0 auto;max-width:300px;text-decoration:underline">nelsy.app/your-studio</div>`, 'width:380px');
    case 'chart':
      return card(`${row(label('Monthly income'), chip('On track', true))}
        <div style="display:flex;align-items:flex-end;gap:12px;height:130px;margin-top:16px">${[45, 60, 52, 75, 88, 100].map((h, i) => `<div style="flex:1;height:${h}%;border-radius:10px 10px 4px 4px;background:${i === 5 ? PINK : '#F9D2E4'}"></div>`).join('')}</div>`, 'width:360px');
    case 'menu':
      return card(`${label('Service menu')}${['Gel manicure', 'BIAB infill', 'Nail art'].map((s, i) => row(`<span style="font:700 20px 'Jakarta'">${s}</span>`, bar(60, i === 0 ? PINK : '#F4C2C2', 13), `padding:11px 0;${i ? 'border-top:2px solid #F6EEF1' : 'margin-top:8px'}`)).join('')}
        <div style="font:800 18px 'Jakarta';text-align:center;padding:13px;border-radius:15px;background:${PINK};color:#fff;margin-top:10px">Book now</div>`, 'width:360px');
    case 'booking':
    default:
      return card(`${row(label('New booking'), chip('Confirmed', true))}
        <div style="display:flex;gap:14px;align-items:center;margin-top:14px"><div style="width:54px;height:54px;border-radius:16px;background:#FCE4EF;color:${PINK};font:800 21px 'Jakarta';display:flex;align-items:center;justify-content:center">Th</div><div>${title('Gel manicure').replace('margin-top:10px', 'margin:0')}${sub('Thursday · 14:00')}</div></div>
        <div style="display:flex;align-items:center;justify-content:center;gap:8px;font:800 18px 'Jakarta';padding:13px;border-radius:15px;background:${PINK};color:#fff;margin-top:16px">Deposit paid ${CHECK.replace(`fill="${PINK}"`, 'fill="#fff"').replace('stroke="#fff"', `stroke="${PINK}"`)}</div>`, 'width:370px');
  }
}

const FAMILIES = {
  glass: famGlass, number: famNumber, howto: famHowto, spotlight: famSpotlight, labels: famLabels,
  cheatsheet: famCheat, apptile: famAppTile, search: famSearch, flat: famFlat, vs: famVs, phone: famPhone,
  blueprint: famBlueprint, torn: famTorn, ui: famUi, tiles: famTiles, platform: famPlatform,
};

// ── Family assignment ─────────────────────────────────────────────────────────
// Preference order per category (first = most typical). Topic rules add or force families.
const CATEGORY_PREFS = {
  'nail-inspo': ['labels', 'spotlight', 'howto', 'search'],
  'nail-education': ['howto', 'glass', 'cheatsheet', 'spotlight', 'search', 'labels', 'number', 'torn'],
  'get-clients': ['glass', 'flat', 'search', 'phone', 'labels', 'howto', 'apptile', 'number', 'ui', 'torn'],
  'instagram-content': ['phone', 'apptile', 'number', 'labels', 'glass', 'search', 'flat', 'cheatsheet'],
  'pricing-money': ['glass', 'ui', 'number', 'apptile', 'flat', 'cheatsheet', 'torn', 'blueprint'],
  'policies-clients': ['blueprint', 'ui', 'glass', 'apptile', 'cheatsheet', 'torn', 'flat', 'howto'],
  'booking-software': ['tiles', 'ui', 'phone', 'apptile', 'glass', 'blueprint', 'torn'],
  'start-your-business': ['torn', 'glass', 'howto', 'cheatsheet', 'blueprint', 'spotlight', 'number'],
  'beauty-creators': ['number', 'glass', 'phone', 'apptile', 'flat', 'tiles', 'spotlight', 'torn'],
  comparisons: ['tiles', 'glass', 'apptile', 'cheatsheet'],
  'branding-growth': ['torn', 'glass', 'number', 'labels', 'cheatsheet'],
  salons: ['glass', 'tiles', 'torn', 'howto'],
};

function eligible(a, f) {
  const t = topicText(a);
  const num = !!leadingNumber(a.coverTitle);
  const len = a.coverTitle.length;
  switch (f) {
    case 'vs': return / vs /i.test(a.coverTitle);
    case 'number': return num;
    case 'platform': return !num && PLATFORMS.some((p) => new RegExp(`\\b${p}\\b`, 'i').test(a.coverTitle));
    case 'spotlight': return len <= 26 && !isReview(a);
    case 'search': return len <= 26;
    case 'labels': return len <= 30;
    case 'apptile': return len <= 30;
    case 'cheatsheet': return len <= 28 && !/\?$/.test(a.coverTitle);
    case 'torn': return len <= 30;
    case 'tiles': return /\bapps?\b|software|alternatives|worth it|review|link in bio|tools|platform|sell your course|where to sell|choose/.test(t) || a.category === 'comparisons';
    case 'ui': return a.category !== 'nail-education' && a.category !== 'nail-inspo';
    case 'phone': return /\bapps?\b|phone|online|link|bio|instagram|tiktok|content|reel|post|caption|stor|highlight|\bdms?\b|website|booking page|follow|likes|google|pinterest/.test(t);
    case 'flat': return !num || a.category !== 'nail-inspo';
    default: return true;
  }
}

// Topic bonuses: a family that fits the subject moves up the preference list
function topicBonus(a, f) {
  const t = topicText(a);
  const b = {
    cheatsheet: /explained|guide|grit|drill bits|shapes|ratio|basics|examples|step by step|costs/.test(t) ? 3 : 0,
    blueprint: /template|policy|checklist|plan|system|must-have|messages/.test(t) ? 2.5 : 0,
    search: /^why |google|seo|local|likes but|without instagram|pops|peel|lift/.test(t) ? 2.5 : 0,
    torn: /\?$|should you|ready for|independent or|stop |mistakes/.test(a.coverTitle.toLowerCase()) ? 2.5 : 0,
    platform: 4,
    vs: 10,
    flat: /lead magnet|email|referral|loyalty|gift|black friday|christmas|valentine|giveaway|win back|coming back/.test(t) ? 2.5 : 0,
    phone: /link in bio|bio|from your phone|from dms|booking page|website|online booking|stories|highlights/.test(t) ? 2.5 : 0,
    apptile: /tiktok|reel|hooks|messages|templates|calendar|app or website|run it/.test(t) ? 1.5 : 0,
    ui: /deposit|no-show|cancel|menu|package|add-on|revenue|income|track|break-even|waitlist|switch apps|how online/.test(t) ? 2 : 0,
    tiles: /alternatives|worth it|review|booking apps|best link|where to sell|tools/.test(t) ? 3 : 0,
    howto: /^how to|step by step|shape|fix|prep|perfect|no more|clean|even|faster/.test(t) ? 1.5 : 0,
    spotlight: a.ctx?.cutoutOk ? 1.5 : 0,
    number: 3,
  };
  return b[f] ?? 0;
}

function assignFamilies(articles) {
  const counts = {};
  const lastByCat = {};
  const recent = [];
  const cap = Math.floor(articles.length * 0.25);
  const ideal = articles.length / Object.keys(FAMILIES).length;
  for (const a of articles) {
    const prefs = CATEGORY_PREFS[a.category] ?? CATEGORY_PREFS['get-clients'];
    const pool = [...new Set([...(eligible(a, 'vs') ? ['vs'] : []), ...(eligible(a, 'platform') ? ['platform'] : []), ...prefs])];
    let best = null, bestScore = Infinity;
    for (const f of pool) {
      if (!eligible(a, f)) continue;
      if ((counts[f] ?? 0) >= cap) continue;
      if (f !== 'vs' && (lastByCat[a.category] ?? []).includes(f)) continue;
      const prefIdx = prefs.indexOf(f) === -1 ? 0 : prefs.indexOf(f);
      let score = prefIdx * 0.9 - topicBonus(a, f) + ((counts[f] ?? 0) / ideal) * 1.6;
      if (recent.slice(-2).includes(f)) score += 2;
      score += (hash(a.slug + f) % 100) / 400; // stable tie-break
      if (score < bestScore) { best = f; bestScore = score; }
    }
    best ??= 'glass';
    a.family = best;
    counts[best] = (counts[best] ?? 0) + 1;
    lastByCat[a.category] = [best, ...(lastByCat[a.category] ?? [])].slice(0, 2);
    recent.push(best);
  }
  return counts;
}

// Field colour per article: the hot pink family dominates, berry and rose vary it, ink for comparisons
function fieldFor(a, i) {
  if (a.category === 'comparisons') return ['ink', 'hot', 'berry'][i % 3];
  if (a.category === 'pricing-money') return ['berry', 'hot', 'ink'][i % 3];
  return ['hot', 'hot', 'berry', 'rose'][hash(a.slug) % 4];
}

const STICKERS = [['badge', { icon: 'heart' }], ['star', {}], ['heart', {}], ['badge', { icon: 'star' }], ['badge', { icon: 'sparkle' }], ['bubble', { icon: 'heart' }]];
const SCATTER = { magnet: 'envelope', envelope: 'envelope', heart: 'heart', coins: 'coins', gift: 'gift', star: 'star', bubble: 'bubble', pricetag: 'pricetag', polish: 'polish', calendar: 'calendar', megaphone: 'heart' };

function tagFor(a) {
  if (a.category === 'nail-education') return 'Step by step';
  if (/template|message/i.test(a.title)) return 'Templates';
  if (/tiktok|reel|instagram/i.test(a.title)) return 'Playbook';
  return CATEGORY_LABELS[a.category] ?? 'Guide';
}

// ── Auto-fit ──────────────────────────────────────────────────────────────────
async function fit(page) {
  return page.evaluate(() => {
    const cover = document.getElementById('cover').getBoundingClientRect();
    const inside = (el, pad = 24) => {
      const r = el.getBoundingClientRect();
      return r.left >= cover.left + pad - 1 && r.right <= cover.right - pad + 1 && r.top >= cover.top + 8 && r.bottom <= cover.bottom - 8;
    };
    // label stacks: shrink all lines together until they fit the canvas
    const labels = document.getElementById('labels');
    if (labels) {
      const ls = [...labels.querySelectorAll('[data-line]')];
      let f = 70;
      while (f > 40 && (!inside(labels, 40) || labels.getBoundingClientRect().width > 760)) { f -= 2; ls.forEach((l) => { l.style.fontSize = f + 'px'; }); }
      return f;
    }
    const vs = document.getElementById('vsrow');
    if (vs) {
      const names = [...vs.querySelectorAll('.vsname')];
      let f = 64;
      while (f > 36 && vs.getBoundingClientRect().width > 1080) { f -= 2; names.forEach((n) => { n.style.fontSize = f + 'px'; }); }
      return f;
    }
    const prow = document.getElementById('prow');
    if (prow) {
      const name = prow.querySelector('.h');
      let f = 150;
      while (f > 70 && prow.getBoundingClientRect().width > 1060) { f -= 4; name.style.fontSize = f + 'px'; }
      return f;
    }
    const el = document.getElementById('fit');
    if (!el) return null;
    const max = Number(el.dataset.max), min = Number(el.dataset.min), maxH = Number(el.dataset.h);
    let fs = max;
    el.style.fontSize = fs + 'px';
    const box = el.parentElement;
    const pill = document.getElementById('pill');
    const over = () => el.getBoundingClientRect().height > maxH || el.scrollWidth > el.clientWidth + 1
      || box.scrollWidth > box.clientWidth + 1 || [...el.querySelectorAll('span,div')].some((s) => s.getBoundingClientRect().right > box.getBoundingClientRect().right + 2)
      || (pill && pill.getBoundingClientRect().width > 1090);
    while (fs > min && over()) { fs -= 2; el.style.fontSize = fs + 'px'; }
    return fs;
  });
}

async function encode(png) {
  let q = 82;
  let webp;
  for (;;) {
    webp = await sharp(png).webp({ quality: q, effort: 6, smartSubsample: true }).toBuffer();
    if (webp.length <= MAX_BYTES || q <= 50) break;
    q -= 6;
  }
  const jpg = await sharp(png).jpeg({ quality: 80, mozjpeg: true }).toBuffer();
  return { webp, jpg, q };
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  loadFonts();
  const articles = await loadArticles(ROOT);
  const missing = articles.filter((a) => !a.coverTitle);
  if (missing.length) {
    console.error(`Articles without coverTitle: ${missing.map((a) => a.slug).join(', ')}`);
    process.exit(1);
  }

  // Context first (cut-out availability feeds the family choice), then families in display order
  articles.forEach((a, i) => {
    a.src = sourceFor(a.slug);
    a.ctx = { field: fieldFor(a, i), objects: objectsFor(a), glyph: glyphFor(a), cutoutOk: canCutout(a.photo) };
    const [st, stOpts] = STICKERS[hash(a.slug) % STICKERS.length];
    a.ctx.sticker = st;
    a.ctx.stickerOpts = stOpts;
    a.ctx.scatter = SCATTER[a.ctx.objects[0]] ?? 'heart';
    a.ctx.scatterOpts = {};
    a.ctx.tag = tagFor(a);
  });
  const counts = assignFamilies(articles);
  console.log(`\nFamilies: ${JSON.stringify(counts)}`);
  if (PLAN) {
    for (const a of articles) console.log(`${a.family.padEnd(10)} ${a.category.padEnd(20)} ${a.coverTitle}`);
    return;
  }

  let todo = articles;
  if (SLUG_FILTER) todo = todo.filter((a) => SLUG_FILTER.split(',').includes(a.slug));
  if (ONLY) todo = todo.filter((a) => ONLY.includes(a.family));
  if (!FORCE) todo = todo.filter((a) => !existsSync(join(OUTPUT_DIR, `${a.slug}.webp`)));
  console.log(`Nelsy blog covers: ${articles.length} articles, ${todo.length} to render\n`);
  if (!todo.length) return;

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });

  const failed = [];
  const sizes = [];
  const t0 = Date.now();
  for (let i = 0; i < todo.length; i++) {
    const a = todo[i];
    try {
      const needsWide = ['labels', 'search', 'howto'].includes(a.family);
      if (needsWide) a.ctx.photoWide = await photoUri(a.photo, 1200, 675);
      if (['spotlight', 'howto'].includes(a.family)) {
        if (a.ctx.cutoutOk) a.ctx.cutout = await cutoutUri(a.photo);
        else a.ctx.photoTall = await photoUri(a.photo, 440, 560);
      }
      const html = FAMILIES[a.family](a);
      await page.setContent(html, { waitUntil: 'load', timeout: 60000 });
      await page.evaluate(() => document.fonts.ready);
      const fs = await fit(page);
      const png = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: W, height: H } });
      const { webp, jpg, q } = await encode(png);
      writeFileSync(join(OUTPUT_DIR, `${a.slug}.webp`), webp);
      writeFileSync(join(OUTPUT_DIR, `${a.slug}.jpg`), jpg);
      sizes.push(webp.length);
      if (webp.length > MAX_BYTES) console.log(`  ! ${a.slug}.webp is ${(webp.length / 1024).toFixed(0)} KB`);
      if ((i + 1) % 20 === 0 || i === todo.length - 1) {
        console.log(`  [${i + 1}/${todo.length}] ${a.slug} (${a.family}, ${fs ?? '-'}px, q${q}) ${((Date.now() - t0) / 1000).toFixed(0)}s`);
      }
    } catch (err) {
      failed.push({ slug: a.slug, error: err.message });
      console.error(`  x ${a.slug}: ${err.message}`);
    }
  }
  await browser.close();

  const total = sizes.reduce((s, n) => s + n, 0);
  if (sizes.length) {
    console.log(`\nRendered ${sizes.length} covers. WebP total ${(total / 1024 / 1024).toFixed(2)} MB, average ${(total / sizes.length / 1024).toFixed(0)} KB, max ${(Math.max(...sizes) / 1024).toFixed(0)} KB`);
  }
  const all = readdirSync(OUTPUT_DIR).reduce((s, f) => s + statSync(join(OUTPUT_DIR, f)).size, 0);
  console.log(`public/blog-covers total ${(all / 1024 / 1024).toFixed(2)} MB`);
  if (failed.length) {
    console.log(`Failures (${failed.length}):`);
    failed.forEach(({ slug, error }) => console.log(`  - ${slug}: ${error}`));
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
