/**
 * Blog cover generator for Nelsy.
 *
 * Covers follow the thumbnail architecture documented in docs/blog-thumbnail-style.md:
 * 16:9, one strong colour field per category, a short punchy cover headline
 * (article.coverTitle) set big enough to read on a 390px phone card, and one visual
 * that says what the article is about: compared tool names as text chips, a big
 * number for list posts, a Nelsy UI element (booking card, deposit chip, calendar,
 * messages, phone) next to a photo sticker for guides, a full photo for inspiration.
 *
 * Output per article, in public/blog-covers/:
 *   <slug>.webp  1200x675, used by cards and the article hero
 *   <slug>.jpg   1200x675, used as og:image / twitter:image (wider support than WebP)
 *
 * Usage:
 *   node scripts/generate-blog-covers.mjs [--force] [--slug=<slug>] [--only=compare,list,guide,inspo,vs]
 */

import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { tmpdir } from 'os';
import { fileURLToPath } from 'url';
import { setDefaultResultOrder } from 'dns';
import puppeteer from 'puppeteer';
import sharp from 'sharp';
import { loadArticles } from './lib/load-articles.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ARTICLES_DIR = join(ROOT, 'src/pages/learn/articles');
const OUTPUT_DIR = join(ROOT, 'public/blog-covers');
const PHOTO_CACHE = join(tmpdir(), 'nelsy-cover-photos');

// Node's fetch can stall on IPv6 here; IPv4 first keeps downloads fast
setDefaultResultOrder('ipv4first');

const W = 1200;
const H = 675;

const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const SLUG_FILTER = args.find((a) => a.startsWith('--slug='))?.split('=')[1] ?? null;
const ONLY = args.find((a) => a.startsWith('--only='))?.split('=')[1]?.split(',') ?? null;

// ── Palette ───────────────────────────────────────────────────────────────────
const PINK = '#F52B8C';
const INK = '#1A1A1A';

// One colour field per category, all inside the Nelsy pink family plus ink.
// dark: white text on the field. accent: number / highlight colour.
const THEMES = {
  'get-clients':         { bg: 'linear-gradient(135deg, #F52B8C 0%, #FF5FA8 100%)', dark: true,  accent: '#FFE3F0', glow: '#FFB3D6' },
  'booking-software':    { bg: 'linear-gradient(135deg, #9C1460 0%, #D61F7E 100%)', dark: true,  accent: '#FFC2DF', glow: '#FF7AB8' },
  'pricing-money':       { bg: 'linear-gradient(135deg, #1A1A1A 0%, #2E1A25 100%)', dark: true,  accent: PINK,      glow: '#F52B8C' },
  comparisons:           { bg: 'linear-gradient(135deg, #1A1A1A 0%, #321528 100%)', dark: true,  accent: PINK,      glow: '#F52B8C' },
  'branding-growth':     { bg: 'linear-gradient(135deg, #4A1035 0%, #7A1A55 100%)', dark: true,  accent: '#FFB3D6', glow: '#F52B8C' },
  'policies-clients':    { bg: 'linear-gradient(135deg, #FFE1EE 0%, #FCD0E3 100%)', dark: false, accent: PINK,      glow: '#FFFFFF' },
  'instagram-content':   { bg: 'linear-gradient(135deg, #FFC2DC 0%, #FFE0D2 100%)', dark: false, accent: '#D61F7E', glow: '#FFFFFF' },
  'start-your-business': { bg: 'linear-gradient(135deg, #F4C2C2 0%, #FADCDC 100%)', dark: false, accent: '#C2185B', glow: '#FFFFFF' },
  'nail-education':      { bg: 'linear-gradient(135deg, #FFF5F8 0%, #FDE4EE 100%)', dark: false, accent: PINK,      glow: '#F4C2C2' },
  'beauty-creators':     { bg: 'linear-gradient(135deg, #F6D3EE 0%, #FBE6F3 100%)', dark: false, accent: '#B0177A', glow: '#FFFFFF' },
  salons:                { bg: 'linear-gradient(135deg, #3A1430 0%, #6B1F4F 100%)', dark: true,  accent: '#FFB3D6', glow: '#F52B8C' },
  'nail-inspo':          { bg: '#1A1A1A', dark: true, accent: PINK, glow: PINK },
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

// Tool names shown as plain text chips on comparison covers (never logos)
const BRANDS = [
  'GlossGenius', 'Square Appointments', 'Fresha', 'Booksy', 'Vagaro', 'Acuity', 'Linktree', 'Beacons',
  'Stan Store', 'Kajabi', 'Teachable', 'Setmore', 'Calendly', 'Treatwell', 'Schedulicity', 'Mindbody',
  'Boulevard', 'Gumroad', 'Podia', 'Thinkific', 'Squarespace', 'Wix', 'Payhip', 'Shopify', 'Milkshake',
  'Koji', 'StyleSeat', 'Mangomint', 'SimplyBook', 'Phorest', 'Timely', 'Square',
];
const SHORT_BRAND = { 'Square Appointments': 'Square', 'Stan Store': 'Stan' };

// ── Helpers ───────────────────────────────────────────────────────────────────
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function sourceFor(slug) {
  const p = join(ARTICLES_DIR, `${slug}.tsx`);
  if (existsSync(p)) return readFileSync(p, 'utf8');
  for (const f of readdirSync(ARTICLES_DIR)) {
    const s = readFileSync(join(ARTICLES_DIR, f), 'utf8');
    if (s.includes(`'${slug}'`) || s.includes(`"${slug}"`)) return s;
  }
  return '';
}

/** Tools an article compares, most mentioned first, from its own text. */
function brandsIn(src, title) {
  const counts = new Map();
  let text = src;
  for (const b of BRANDS) {
    const re = new RegExp(`\\b${b.replace(/ /g, '\\s+')}\\b`, 'g');
    const n = (text.match(re) ?? []).length;
    if (n) {
      const name = SHORT_BRAND[b] ?? b;
      counts.set(name, (counts.get(name) ?? 0) + n);
      text = text.replace(re, ''); // "Square Appointments" is not counted twice as "Square"
    }
  }
  const inTitle = (n) => title.toLowerCase().includes(n.toLowerCase());
  return [...counts.entries()]
    .filter(([, n]) => n >= 3)
    .sort((a, b) => Number(inTitle(b[0])) - Number(inTitle(a[0])) || b[1] - a[1])
    .map(([name]) => name);
}

function leadingNumber(text) {
  const m = text.match(/^(\d+\+?)\s+(.+)$/);
  return m ? { num: m[1], rest: m[2] } : null;
}

/** Template per article: vs, compare, list, inspo or guide. */
function templateFor(a, brands) {
  const ct = a.coverTitle;
  if (/ vs /i.test(ct)) return 'vs';
  const compareTitle = /\balternatives\b|worth it|review|^best |\bvs\b/i.test(a.title);
  if ((a.category === 'comparisons' || compareTitle) && brands.length >= 2) return 'compare';
  if (a.category === 'nail-inspo') return 'inspo';
  if (leadingNumber(ct)) return 'list';
  return 'guide';
}

/** Which Nelsy UI element illustrates a guide. */
function widgetFor(a) {
  // Match whole slug words (prefix): "late" must not match "calculate"
  const slug = `-${a.slug}-`;
  const has = (words) => new RegExp(`-(${words})`).test(slug);
  if (has('template|message|reply|dm-|dms|enquiry')) return 'messages';
  if (has('deposit|no-show|cancel|late-|policy|reschedul|boundar')) return 'deposit';
  if (has('review|referral|loyalty|retention|experience|complain|rebook|difficult|aftercare|client-card|repair')) return 'review';
  if (has('schedule|calendar|gaps|fill|january|slow|rush|waitlist|per-day|booked|holiday|how-long|batch')) return 'calendar';
  if (has('link-in-bio|instagram|tiktok|reel|content|bio-|story|caption|highlight|pinterest|feed|photo|film|giveaway|call-to-action|likes|post|brand-deal|ugc|email-list|monetize|make-money')) return 'phone';
  if (has('income|revenue|profit|break-even|expense|hourly|cost|undercharg|discount|raise-prices')) return 'chart';
  if (has('price|pricing|charge|menu|package|add-on|gift|upsell|value|course|ebook|digital|consultation')) return 'menu';
  if (a.category === 'nail-education') return 'steps';
  if (has('checklist|starter|plan|start|mistake|name|brand|professional')) return 'checklist';
  return 'booking';
}

async function photoDataUri(photo, w, h) {
  mkdirSync(PHOTO_CACHE, { recursive: true });
  const file = join(PHOTO_CACHE, `${photo.id}-${w}x${h}.jpg`);
  if (!existsSync(file)) {
    const url = `https://images.unsplash.com/${photo.id}?auto=format&fit=crop&w=${w}&h=${h}&q=75&fm=jpg`;
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
  return `data:image/jpeg;base64,${readFileSync(file).toString('base64')}`;
}

// ── UI widgets (Nelsy product elements in HTML/CSS) ───────────────────────────
const CHECK = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="${PINK}"/><path d="M7 12.5l3.2 3.2L17 9" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const bar = (w, c = '#EFE6EA', h = 12) => `<div style="height:${h}px;width:${w}px;border-radius:99px;background:${c}"></div>`;

function widget(kind) {
  const card = (inner, extra = '') => `<div class="ui" style="${extra}">${inner}</div>`;
  switch (kind) {
    case 'deposit':
      return card(`
        <div class="ui-row"><span class="ui-label">Booking request</span><span class="chip-ok">Deposit paid</span></div>
        <div class="ui-title">Gel manicure</div>
        <div class="ui-sub">Friday · 10:30</div>
        <div class="ui-row" style="margin-top:18px;padding-top:16px;border-top:2px solid #F6EEF1">
          <span class="ui-sub" style="color:${INK};font-weight:700">Require a deposit</span>
          <span class="toggle"><span></span></span>
        </div>`, 'width:380px');
    case 'calendar': {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
      const fill = [[1, 1, 0, 1], [1, 0, 1, 1], [0, 1, 1, 1], [1, 1, 1, 0], [1, 1, 1, 1]];
      return card(`
        <div class="ui-row"><span class="ui-label">This week</span><span class="chip-pink">Open slot</span></div>
        <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-top:14px">
          ${days.map((d, i) => `<div><div style="font:700 15px Inter;color:#9A8A92;text-align:center;margin-bottom:8px">${d}</div>
            ${fill[i].map((f) => `<div style="height:30px;border-radius:9px;margin-bottom:7px;background:${f ? PINK : 'transparent'};border:${f ? 'none' : `2px dashed ${PINK}`};opacity:${f ? 1 : 0.9}"></div>`).join('')}</div>`).join('')}
        </div>`, 'width:400px');
    }
    case 'messages':
      return card(`
        <div class="bubble in">Hi! Do you have anything on Friday?</div>
        <div class="bubble out">Yes! Pick a time here and you're booked</div>
        <div class="bubble out link">nelsy.app/your-studio</div>`, 'width:400px;padding:22px');
    case 'review':
      return card(`
        <div style="color:${PINK};font-size:34px;letter-spacing:4px;line-height:1">★★★★★</div>
        <div class="ui-title" style="margin-top:12px">Loved my set!</div>
        <div style="display:grid;gap:9px;margin-top:14px">${bar(300)}${bar(240)}</div>
        <div class="ui-row" style="margin-top:18px"><span class="ui-sub">Rebook in 3 weeks?</span><span class="chip-pink">Book again</span></div>`, 'width:380px');
    case 'phone':
      return `<div class="phone"><div class="notch"></div>
        <div style="width:78px;height:78px;border-radius:99px;background:linear-gradient(135deg,${PINK},#FF9BC9);margin:34px auto 10px"></div>
        <div style="font:800 21px Inter;text-align:center;color:${INK}">Your Studio</div>
        <div style="display:flex;justify-content:center;margin:8px 0 16px">${bar(120, '#EFE6EA', 10)}</div>
        <div class="pbtn" style="background:${PINK};color:#fff">Book now</div>
        <div class="pbtn">Price list</div>
        <div class="pbtn">Gift cards</div>
      </div>`;
    case 'chart':
      return card(`
        <div class="ui-row"><span class="ui-label">Monthly income</span><span class="chip-ok">On track</span></div>
        <div style="display:flex;align-items:flex-end;gap:14px;height:150px;margin-top:18px">
          ${[45, 60, 52, 75, 88, 100].map((h, i) => `<div style="flex:1;height:${h}%;border-radius:10px 10px 4px 4px;background:${i === 5 ? PINK : '#F9D2E4'}"></div>`).join('')}
        </div>`, 'width:380px');
    case 'menu':
      return card(`
        <div class="ui-label" style="margin-bottom:12px">Service menu</div>
        ${['Gel manicure', 'BIAB infill', 'Nail art'].map((s, i) => `
          <div class="ui-row" style="padding:12px 0;${i ? 'border-top:2px solid #F6EEF1' : ''}">
            <span style="font:700 21px Inter;color:${INK}">${s}</span>${bar(64, i === 0 ? PINK : '#F4C2C2', 14)}
          </div>`).join('')}
        <div class="pbtn" style="background:${PINK};color:#fff;margin:12px 0 0">Book now</div>`, 'width:380px');
    case 'steps':
      return card(`
        ${[1, 2, 3].map((n) => `
          <div class="ui-row" style="justify-content:flex-start;gap:14px;padding:10px 0">
            <span style="width:40px;height:40px;border-radius:99px;background:${n < 3 ? PINK : '#FCE4EF'};color:${n < 3 ? '#fff' : PINK};font:800 19px Inter;display:flex;align-items:center;justify-content:center">${n}</span>
            <span style="display:grid;gap:8px">${bar(n === 3 ? 150 : 200, '#EFE6EA', 12)}${bar(120, '#F6EEF1', 10)}</span>
          </div>`).join('')}`, 'width:340px');
    case 'checklist':
      return card(`
        <div class="ui-label" style="margin-bottom:10px">Checklist</div>
        ${[230, 190, 210].map((w) => `<div class="ui-row" style="justify-content:flex-start;gap:14px;padding:9px 0">${CHECK}${bar(w, '#EFE6EA', 13)}</div>`).join('')}`, 'width:340px');
    case 'booking':
    default:
      return card(`
        <div class="ui-row"><span class="ui-label">New booking</span><span class="chip-ok">Confirmed</span></div>
        <div style="display:flex;gap:14px;align-items:center;margin-top:14px">
          <div style="width:58px;height:58px;border-radius:16px;background:#FCE4EF;color:${PINK};font:800 22px Inter;display:flex;align-items:center;justify-content:center">Th</div>
          <div><div class="ui-title" style="margin:0">Gel manicure</div><div class="ui-sub">Thursday · 14:00</div></div>
        </div>
        <div class="pbtn" style="background:${PINK};color:#fff;margin:18px 0 0">Deposit paid ✓</div>`, 'width:380px');
  }
}

// ── Page shell ────────────────────────────────────────────────────────────────
const FONT_CSS_URL = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=Inter:wght@500;600;700;800;900&display=block';
let FONTS = '';

/** Google Fonts (latin subset) inlined as data URIs, cached on disk: no network during renders. */
async function loadFonts() {
  mkdirSync(PHOTO_CACHE, { recursive: true });
  const cssFile = join(PHOTO_CACHE, 'fonts.css');
  if (!existsSync(cssFile)) {
    const css = await (await fetch(FONT_CSS_URL, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36' } })).text();
    const latin = css.split('/* ').filter((b) => b.startsWith('latin */'));
    const out = [];
    for (const block of latin) {
      const url = block.match(/url\((https:[^)]+)\)/)[1];
      const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
      out.push(block.replace('latin */', '').replace(url, `data:font/woff2;base64,${buf.toString('base64')}`));
    }
    writeFileSync(cssFile, out.join('\n'));
  }
  FONTS = `<style>${readFileSync(cssFile, 'utf8')}</style>`;
}

function shell(theme, body) {
  const fg = theme.dark ? '#FFFFFF' : INK;
  return `<!DOCTYPE html><html><head><meta charset="utf-8">${FONTS}<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden}
#cover{position:relative;width:${W}px;height:${H}px;overflow:hidden;background:${theme.bg};color:${fg};font-family:Inter,sans-serif}
.glow{position:absolute;border-radius:999px;filter:blur(70px);opacity:${theme.dark ? 0.45 : 0.75}}
.pill{display:inline-flex;align-items:center;gap:10px;font:800 22px Inter;letter-spacing:.12em;text-transform:uppercase;padding:11px 22px;border-radius:99px;
  background:${theme.dark ? 'rgba(255,255,255,.16)' : '#FFFFFF'};color:${theme.dark ? '#FFFFFF' : theme.accent};border:${theme.dark ? '2px solid rgba(255,255,255,.28)' : 'none'}}
.title{font-family:'Playfair Display',serif;font-weight:800;letter-spacing:-.015em;line-height:1.02;color:${fg}}
.brand{position:absolute;left:64px;bottom:44px;display:flex;align-items:center;gap:10px;font:800 30px 'Playfair Display',serif;color:${fg};opacity:.92}
.brand i{display:inline-block;width:12px;height:12px;border-radius:99px;background:${theme.dark ? '#FFFFFF' : PINK}}
.ui{position:relative;background:#FFFFFF;color:${INK};border-radius:28px;padding:24px 26px;box-shadow:0 30px 60px -20px rgba(80,10,45,.45),0 0 0 1px rgba(26,26,26,.04)}
.ui-row{display:flex;align-items:center;justify-content:space-between;gap:12px}
.ui-label{font:800 15px Inter;letter-spacing:.12em;text-transform:uppercase;color:#9A8A92}
.ui-title{font:800 27px Inter;color:${INK};margin-top:12px;letter-spacing:-.01em}
.ui-sub{font:600 19px Inter;color:#7A6A72;margin-top:4px}
.chip-ok{font:800 16px Inter;padding:8px 14px;border-radius:99px;background:#E7F7EE;color:#137A3F}
.chip-pink{font:800 16px Inter;padding:8px 14px;border-radius:99px;background:#FCE4EF;color:${PINK}}
.toggle{width:62px;height:36px;border-radius:99px;background:${PINK};position:relative}.toggle span{position:absolute;right:4px;top:4px;width:28px;height:28px;border-radius:99px;background:#fff}
.bubble{font:700 21px Inter;line-height:1.3;padding:14px 18px;border-radius:22px;margin:8px 0;max-width:330px}
.bubble.in{background:#F3EDF0;color:${INK};border-bottom-left-radius:6px}
.bubble.out{background:${PINK};color:#fff;margin-left:auto;border-bottom-right-radius:6px}
.bubble.link{background:#FCE4EF;color:${PINK};text-decoration:underline}
.phone{position:relative;width:300px;height:560px;border-radius:52px;background:#FFFFFF;border:12px solid ${INK};padding:0 22px;box-shadow:0 40px 70px -25px rgba(80,10,45,.55)}
.notch{position:absolute;top:10px;left:50%;transform:translateX(-50%);width:92px;height:24px;border-radius:99px;background:${INK}}
.pbtn{font:800 19px Inter;text-align:center;padding:14px;border-radius:16px;margin-bottom:10px;background:#F7F0F3;color:${INK}}
.sticker{position:absolute;border-radius:30px;border:10px solid #FFFFFF;box-shadow:0 30px 60px -20px rgba(60,10,35,.5);background-size:cover;background-position:center}
.chipname{display:inline-flex;align-items:center;font:800 40px Inter;letter-spacing:-.01em;padding:16px 30px;border-radius:99px;background:rgba(255,255,255,.1);border:2px solid rgba(255,255,255,.35);color:#fff}
.chipname.me{background:${PINK};border-color:${PINK};color:#fff}
.chipname.light{background:#fff;border-color:#fff;color:${INK}}
</style></head><body><div id="cover">
<div class="glow" style="width:520px;height:520px;right:-140px;top:-160px;background:${theme.glow}"></div>
<div class="glow" style="width:420px;height:420px;left:-160px;bottom:-200px;background:${theme.glow};opacity:${theme.dark ? 0.25 : 0.5}"></div>
${body}
</div></body></html>`;
}

const brandMark = `<div class="brand"><i></i>Nelsy</div>`;

function kicker(a) {
  if (/^how to\b/i.test(a.title)) return 'How to';
  if (/template/i.test(a.title)) return 'Templates';
  if (/checklist/i.test(a.title)) return 'Checklist';
  if (/examples?\b/i.test(a.title)) return 'Examples';
  if (/explained|guide/i.test(a.title)) return 'Guide';
  if (/^why\b/i.test(a.title)) return 'Fix it';
  if (/ideas?\b/i.test(a.title)) return 'Ideas';
  return CATEGORY_LABELS[a.category] ?? 'Guide';
}

// ── Templates ─────────────────────────────────────────────────────────────────
function guideHTML(a, theme, photo) {
  const w = widgetFor(a);
  const isPhone = w === 'phone';
  return shell(theme, `
    <div style="position:absolute;left:64px;top:60px;width:560px">
      <span class="pill">${esc(kicker(a))}</span>
      <h1 id="fit" class="title" data-max="96" data-min="58" data-h="360" style="margin-top:28px">${esc(a.coverTitle)}</h1>
    </div>
    ${brandMark}
    <div class="sticker" style="width:${isPhone ? 330 : 400}px;height:${isPhone ? 400 : 440}px;right:${isPhone ? 250 : 74}px;top:${isPhone ? 150 : 56}px;transform:rotate(-5deg);background-image:url(${photo})"></div>
    <div style="position:absolute;${isPhone ? 'right:70px;top:70px;transform:rotate(4deg)' : 'right:200px;bottom:48px;transform:rotate(3deg)'}">${widget(w)}</div>`);
}

function listHTML(a, theme, photo, photo2) {
  const { num, rest } = leadingNumber(a.coverTitle);
  return shell(theme, `
    <div class="sticker" style="width:290px;height:360px;right:280px;top:150px;transform:rotate(-8deg);background-image:url(${photo2})"></div>
    <div class="sticker" style="width:340px;height:420px;right:64px;top:110px;transform:rotate(5deg);background-image:url(${photo})"></div>
    <div style="position:absolute;left:64px;top:40px;width:520px;z-index:2">
      <div style="font:900 ${num.length > 3 ? 220 : 260}px/1 'Playfair Display',serif;letter-spacing:-.04em;color:${theme.accent};height:${num.length > 3 ? 230 : 270}px">${esc(num)}</div>
      <h1 id="fit" class="title" data-max="84" data-min="50" data-h="200" style="margin-top:6px">${esc(rest)}</h1>
    </div>
    ${brandMark}`);
}

function inspoHTML(a, theme, photo) {
  const lead = leadingNumber(a.coverTitle);
  const words = (lead ? lead.rest : a.coverTitle).split(' ');
  // Two white label lines, Stan-style stickers on the photo
  const cut = Math.ceil(words.length / 2);
  const lines = words.length > 2 ? [words.slice(0, cut).join(' '), words.slice(cut).join(' ')] : [words.join(' ')];
  return shell(theme, `
    <div style="position:absolute;inset:0;background-image:url(${photo});background-size:cover;background-position:center"></div>
    <div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(26,26,26,.55) 0%,rgba(26,26,26,.15) 55%,rgba(26,26,26,0) 100%)"></div>
    <div style="position:absolute;left:64px;bottom:120px;display:flex;flex-direction:column;align-items:flex-start;gap:12px">
      ${lead ? `<span style="font:900 140px/1 'Playfair Display',serif;background:${PINK};color:#fff;padding:6px 30px 14px;border-radius:22px;transform:rotate(-3deg);margin-bottom:6px">${esc(lead.num)}</span>` : ''}
      ${lines.map((l, i) => `<span id="${i === 0 ? 'fit' : ''}" class="title" data-max="92" data-min="60" data-h="140" style="background:#fff;color:${INK};padding:8px 26px 16px;border-radius:16px;white-space:nowrap;font-size:92px;max-width:1080px">${esc(l)}</span>`).join('')}
    </div>
    <div class="brand" style="color:#fff"><i style="background:#fff"></i>Nelsy</div>`);
}

function vsHTML(a, theme, brands) {
  const [l, r] = a.coverTitle.split(/ vs /i);
  const extra = brands.filter((b) => ![l, r].some((x) => x.toLowerCase().includes(b.toLowerCase())));
  const mentionsNelsy = /Nelsy/.test(a.src) && brands.length >= 2;
  const longest = Math.max(l.length, r.length);
  const size = longest <= 9 ? 92 : 80;
  const chip = (t) => `<span class="chipname light" style="font-size:${size}px;padding:26px 44px;box-shadow:0 26px 50px -20px rgba(80,10,45,.55)">${esc(t)}</span>`;
  const label = a.category === 'comparisons' ? 'Comparison' : (CATEGORY_LABELS[a.category] ?? 'Guide');
  return shell(theme, `
    <div style="position:absolute;left:64px;top:56px"><span class="pill">${esc(label)}</span></div>
    <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:34px;padding:0 40px">
      <div id="vsrow" style="display:flex;align-items:center;justify-content:center;gap:22px;white-space:nowrap">
        <span style="transform:rotate(-3deg)">${chip(l)}</span>
        <span style="flex:none;width:124px;height:124px;border-radius:99px;background:${PINK};color:#fff;font:900 52px 'Playfair Display',serif;font-style:italic;display:flex;align-items:center;justify-content:center;transform:rotate(-8deg);border:6px solid #fff;box-shadow:0 18px 40px -14px rgba(245,43,140,.7);margin:0 -40px;z-index:2">vs</span>
        <span style="transform:rotate(3deg)">${chip(r)}</span>
      </div>
      <div class="title" style="font-size:52px;font-style:italic;font-weight:800;text-align:center">${esc(subtitleFor(a))}</div>
      ${mentionsNelsy ? `<div style="display:flex;gap:12px;align-items:center;margin-top:-6px">
        <span style="font:700 24px Inter;opacity:.85">Also compared</span><span class="chipname me" style="font-size:28px;padding:10px 22px">Nelsy</span>
        ${extra.slice(0, 1).map((b) => `<span class="chipname" style="font-size:28px;padding:10px 22px">${esc(b)}</span>`).join('')}
      </div>` : ''}
    </div>
    ${brandMark}`);
}

function subtitleFor(a) {
  const m = a.title.match(/\bfor ([A-Za-z -]+?)(?:\s*\(|:|$)/);
  if (m) return `for ${m[1].trim()}`;
  return 'Which one fits you?';
}

function compareHTML(a, theme, brands) {
  const nelsyFirst = /Nelsy/.test(a.src) ? ['Nelsy', ...brands.filter((b) => b !== 'Nelsy')] : brands;
  const chips = nelsyFirst.slice(0, 5);
  const label = /worth it|review/i.test(a.title) ? 'Honest review' : /alternatives/i.test(a.title) ? 'Alternatives' : 'Compared';
  return shell(theme, `
    <div style="position:absolute;left:64px;top:60px;width:560px">
      <span class="pill">${esc(label)}</span>
      <h1 id="fit" class="title" data-max="92" data-min="58" data-h="330" style="margin-top:28px">${esc(a.coverTitle)}</h1>
    </div>
    ${brandMark}
    <div style="position:absolute;right:70px;top:0;bottom:0;width:420px;display:flex;flex-direction:column;justify-content:center;gap:16px">
      ${chips.map((c, i) => `<div style="display:flex;align-items:center;gap:16px;transform:translateX(${i % 2 ? 26 : 0}px)">
        <span class="chipname ${c === 'Nelsy' ? 'me' : 'light'}" style="font-size:38px;padding:16px 28px;${c === 'Nelsy' ? 'box-shadow:0 18px 40px -14px rgba(245,43,140,.75)' : ''}">${esc(c)}</span>
        ${c === 'Nelsy' ? `<span style="display:flex">${CHECK.replace(/width="22" height="22"/, 'width="40" height="40"').replace(`fill="${PINK}"`, 'fill="#FFFFFF"').replace('stroke="#fff"', `stroke="${PINK}"`)}</span>` : ''}
      </div>`).join('')}
    </div>`);
}

// Auto-fit: shrink the headline until it fits its box and no word overflows.
async function fit(page) {
  return page.evaluate(() => {
    // vs covers: shrink both name chips together until the row fits the canvas
    const row = document.getElementById('vsrow');
    if (row) {
      const chips = [...row.querySelectorAll('.chipname')];
      let f = parseFloat(chips[0].style.fontSize);
      while (f > 40 && Math.max(row.scrollWidth, row.getBoundingClientRect().width) > 1090) {
        f -= 2;
        chips.forEach((c) => { c.style.fontSize = f + 'px'; c.style.padding = `${Math.round(f * 0.28)}px ${Math.round(f * 0.48)}px`; });
      }
      return f;
    }
    const el = document.getElementById('fit');
    if (!el) return null;
    const max = Number(el.dataset.max), min = Number(el.dataset.min), maxH = Number(el.dataset.h);
    let fs = max;
    el.style.fontSize = fs + 'px';
    const box = el.parentElement;
    const over = () => el.getBoundingClientRect().height > maxH || el.scrollWidth > el.clientWidth + 1 || box.scrollWidth > box.clientWidth + 1;
    while (fs > min && over()) { fs -= 2; el.style.fontSize = fs + 'px'; }
    // inspo: keep both label lines the same size
    document.querySelectorAll('[data-max]').forEach((n) => { if (n !== el && n.dataset.max === el.dataset.max) n.style.fontSize = fs + 'px'; });
    return fs;
  });
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  await loadFonts();
  const articles = await loadArticles(ROOT);
  const missing = articles.filter((a) => !a.coverTitle);
  if (missing.length) {
    console.error(`Articles without coverTitle: ${missing.map((a) => a.slug).join(', ')}`);
    process.exit(1);
  }

  let todo = articles.map((a) => {
    const src = sourceFor(a.slug);
    const brands = brandsIn(src, a.title);
    return { ...a, src, brands, template: templateFor(a, brands) };
  });
  if (SLUG_FILTER) todo = todo.filter((a) => SLUG_FILTER.split(',').includes(a.slug));
  if (ONLY) todo = todo.filter((a) => ONLY.includes(a.template));
  if (!FORCE) todo = todo.filter((a) => !existsSync(join(OUTPUT_DIR, `${a.slug}.webp`)));

  console.log(`\nNelsy blog covers: ${articles.length} articles, ${todo.length} to render\n`);
  if (!todo.length) return;

  // Photo pairs for list covers: the article's cover photo plus a second one of the same pool
  const byPhoto = articles.map((a) => a.photo);

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });

  const failed = [];
  const sizes = [];
  const counts = {};
  const t0 = Date.now();
  for (let i = 0; i < todo.length; i++) {
    const a = todo[i];
    const theme = THEMES[a.category] ?? THEMES['get-clients'];
    try {
      let html;
      if (a.template === 'vs') html = vsHTML(a, theme, a.brands);
      else if (a.template === 'compare') html = compareHTML(a, theme, a.brands);
      else if (a.template === 'inspo') html = inspoHTML(a, theme, await photoDataUri(a.photo, 1200, 675));
      else if (a.template === 'list') {
        // Second sticker: another cover photo from the same category (same topic pool)
        const pool = articles.filter((o) => o.category === a.category && o.photo.id !== a.photo.id).map((o) => o.photo);
        const second = pool.length ? pool[a.slug.length % pool.length] : byPhoto.find((p) => p.id !== a.photo.id);
        html = listHTML(a, theme, await photoDataUri(a.photo, 400, 480), await photoDataUri(second, 400, 480));
      } else html = guideHTML(a, theme, await photoDataUri(a.photo, 440, 480));

      await page.setContent(html, { waitUntil: 'load', timeout: 60000 });
      await page.evaluate(() => document.fonts.ready);
      const fs = await fit(page);
      const png = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: W, height: H } });
      const webp = await sharp(png).webp({ quality: 80, effort: 6, smartSubsample: true }).toBuffer();
      const jpg = await sharp(png).jpeg({ quality: 80, mozjpeg: true }).toBuffer();
      writeFileSync(join(OUTPUT_DIR, `${a.slug}.webp`), webp);
      writeFileSync(join(OUTPUT_DIR, `${a.slug}.jpg`), jpg);
      sizes.push(webp.length);
      counts[a.template] = (counts[a.template] ?? 0) + 1;
      if (webp.length > 80 * 1024) console.log(`  ! ${a.slug}.webp is ${(webp.length / 1024).toFixed(0)} KB`);
      if ((i + 1) % 20 === 0 || i === todo.length - 1) {
        console.log(`  [${i + 1}/${todo.length}] ${a.slug} (${a.template}, ${fs ?? '-'}px) ${((Date.now() - t0) / 1000).toFixed(0)}s`);
      }
    } catch (err) {
      failed.push({ slug: a.slug, error: err.message });
      console.error(`  x ${a.slug}: ${err.message}`);
    }
  }
  await browser.close();

  const total = sizes.reduce((s, n) => s + n, 0);
  console.log(`\nRendered ${sizes.length} covers by template: ${JSON.stringify(counts)}`);
  if (sizes.length) {
    console.log(`WebP total ${(total / 1024 / 1024).toFixed(2)} MB, average ${(total / sizes.length / 1024).toFixed(0)} KB, max ${(Math.max(...sizes) / 1024).toFixed(0)} KB`);
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
