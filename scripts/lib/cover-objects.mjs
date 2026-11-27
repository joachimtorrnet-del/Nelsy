/**
 * Glossy "3D-looking" objects for the blog covers, drawn as SVG (original drawings).
 *
 * Every object is built from the same few primitives so the set reads as one family:
 * cylinders with a horizontal light sweep, bevelled tiles with a top-left gloss, spheres
 * with a radial highlight, all in the Nelsy palette (pink, berry, ink, pearl, chrome).
 * Depth comes from the light sweep, a darker underside and the soft drop shadow the
 * cover adds around the SVG (see `obj()` at the bottom).
 *
 * Each draw function returns SVG markup for a 400x400 viewBox (some are taller or wider:
 * they say so with their own viewBox).
 */

let n = 0;
const uid = (p) => `${p}${++n}`;

// Light sweep stops for each material: dark edge, mid, highlight, mid, dark edge
export const MAT = {
  pink: ['#8A1457', '#D61F7E', '#FF6FB0', '#FFD8E6', '#FF5FA8', '#C41C72', '#7A1250'],
  hot: ['#A3105C', '#F52B8C', '#FF8EC0', '#FFE3EE', '#FF5FA8', '#E0207F', '#9C1460'],
  berry: ['#3D0726', '#6E0F47', '#A31665', '#E77AB4', '#A31665', '#6E0F47', '#3D0726'],
  ink: ['#000000', '#141414', '#3A3A3A', '#9A9A9A', '#2E2E2E', '#121212', '#000000'],
  pearl: ['#D6B4C4', '#F2DDE6', '#FFFFFF', '#FFFFFF', '#FBEFF4', '#E8CAD7', '#CDA6B8'],
  blush: ['#E58BB0', '#FFB8D4', '#FFDDEA', '#FFFFFF', '#FFD0E2', '#F7A8C8', '#DB7FA5'],
  chrome: ['#6E6A75', '#A9A4B0', '#EEEAF0', '#FFFFFF', '#C7C2CC', '#918C98', '#5E5A65'],
  gold: ['#8A4F1E', '#C9853D', '#F2C57A', '#FFF0CC', '#E4AD5C', '#B7772F', '#7A4318'],
};

const STOPS = [0, 0.14, 0.32, 0.44, 0.62, 0.86, 1];

function sweep(id, mat, { vertical = false, opacity = 1 } = {}) {
  const c = MAT[mat] ?? mat;
  const [x2, y2] = vertical ? [0, 1] : [1, 0];
  return `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${c
    .map((col, i) => `<stop offset="${STOPS[i]}" stop-color="${col}" stop-opacity="${opacity}"/>`)
    .join('')}</linearGradient>`;
}

/** Diagonal face gradient: lit top-left, shaded bottom-right. */
function face(id, mat) {
  const c = MAT[mat] ?? mat;
  return `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c[3]}"/><stop offset=".28" stop-color="${c[2]}"/><stop offset=".7" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[0]}"/></linearGradient>`;
}

function radial(id, mat, cx = 0.35, cy = 0.3) {
  const c = MAT[mat] ?? mat;
  return `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r=".75"><stop offset="0" stop-color="${c[3]}"/><stop offset=".25" stop-color="${c[2]}"/><stop offset=".65" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[0]}"/></radialGradient>`;
}

const blur = (id, s = 6) => `<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${s}"/></filter>`;

const svg = (inner, defs, vb = '0 0 400 400') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="100%" height="100%" style="overflow:visible"><defs>${defs}</defs>${inner}</svg>`;

/** Upright cylinder: body with a light sweep, elliptical lid, specular streak. */
function cylinder(cx, top, w, h, mat, { lid = true, lidMat } = {}) {
  const g = uid('cy'), t = uid('ct'), f = uid('cf');
  const ry = w * 0.16;
  const defs = sweep(g, mat) + face(t, lidMat ?? mat) + blur(f, w * 0.03);
  const body = `<path d="M${cx - w / 2},${top} L${cx - w / 2},${top + h} A${w / 2},${ry} 0 0 0 ${cx + w / 2},${top + h} L${cx + w / 2},${top} Z" fill="url(#${g})"/>`;
  const cap = lid ? `<ellipse cx="${cx}" cy="${top}" rx="${w / 2}" ry="${ry}" fill="url(#${t})"/>` : '';
  const streak = `<rect x="${cx - w * 0.2}" y="${top + ry * 0.6}" width="${w * 0.09}" height="${h - ry * 0.4}" rx="${w * 0.045}" fill="#fff" opacity=".55" filter="url(#${f})"/>`;
  return { defs, g: body + cap + streak };
}

/** Bevelled rounded tile with a darker base for thickness and a top-left gloss. */
function tile(x, y, w, h, r, mat, { depth = 18, gloss = true } = {}) {
  const fc = uid('tf'), sd = uid('ts'), gl = uid('tg');
  const c = MAT[mat] ?? mat;
  const defs = face(fc, mat) + `<linearGradient id="${sd}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c[0]}"/><stop offset=".5" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[0]}"/></linearGradient>`
    + `<linearGradient id="${gl}" x1="0" y1="0" x2=".6" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset=".45" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>`;
  const g = `<rect x="${x}" y="${y + depth}" width="${w}" height="${h}" rx="${r}" fill="url(#${sd})"/>`
    + `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="url(#${fc})"/>`
    + (gloss ? `<rect x="${x + w * 0.04}" y="${y + h * 0.035}" width="${w * 0.92}" height="${h * 0.5}" rx="${r * 0.85}" fill="url(#${gl})"/>` : '')
    + `<rect x="${x + 1.5}" y="${y + 1.5}" width="${w - 3}" height="${h - 3}" rx="${r - 1.5}" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="3"/>`;
  return { defs, g };
}

function sphere(cx, cy, r, mat) {
  const id = uid('sp'), f = uid('sf');
  return {
    defs: radial(id, mat) + blur(f, r * 0.08),
    g: `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${id})"/><ellipse cx="${cx - r * 0.35}" cy="${cy - r * 0.42}" rx="${r * 0.32}" ry="${r * 0.2}" fill="#fff" opacity=".8" filter="url(#${f})"/>`,
  };
}

const join = (...parts) => ({ defs: parts.map((p) => p.defs).join(''), g: parts.map((p) => p.g).join('') });
const raw = (g, defs = '') => ({ defs, g });

// ── Glyphs (generic, white line icons used on tiles) ─────────────────────────
export const GLYPH = {
  calendar: `<rect x="-60" y="-50" width="120" height="110" rx="20" fill="none" stroke="currentColor" stroke-width="14"/><path d="M-60,-12 H60 M-30,-72 V-36 M30,-72 V-36" stroke="currentColor" stroke-width="14" stroke-linecap="round"/><circle cx="-26" cy="22" r="9" fill="currentColor"/><circle cx="8" cy="22" r="9" fill="currentColor"/><circle cx="-26" cy="44" r="9" fill="currentColor" opacity="0"/>`,
  camera: `<path d="M-74,-34 A14,14 0 0 1 -60,-48 H-34 L-20,-68 H20 L34,-48 H60 A14,14 0 0 1 74,-34 V50 A14,14 0 0 1 60,64 H-60 A14,14 0 0 1 -74,50 Z" fill="none" stroke="currentColor" stroke-width="14" stroke-linejoin="round"/><circle cx="0" cy="6" r="30" fill="none" stroke="currentColor" stroke-width="14"/>`,
  note: `<path d="M-22,40 V-58 L48,-72 V22" fill="none" stroke="currentColor" stroke-width="15" stroke-linejoin="round"/><circle cx="-42" cy="42" r="24" fill="currentColor"/><circle cx="28" cy="26" r="24" fill="currentColor"/>`,
  search: `<circle cx="-14" cy="-14" r="44" fill="none" stroke="currentColor" stroke-width="16"/><path d="M20,20 L58,58" stroke="currentColor" stroke-width="18" stroke-linecap="round"/>`,
  pin: `<path d="M0,72 C-40,24 -56,0 -56,-22 A56,56 0 0 1 56,-22 C56,0 40,24 0,72 Z" fill="none" stroke="currentColor" stroke-width="15" stroke-linejoin="round"/><circle cx="0" cy="-22" r="19" fill="currentColor"/>`,
  chat: `<path d="M-64,-46 H64 A14,14 0 0 1 78,-32 V28 A14,14 0 0 1 64,42 H-10 L-44,70 V42 H-64 A14,14 0 0 1 -78,28 V-32 A14,14 0 0 1 -64,-46 Z" fill="none" stroke="currentColor" stroke-width="14" stroke-linejoin="round"/><circle cx="-32" cy="-2" r="10" fill="currentColor"/><circle cx="0" cy="-2" r="10" fill="currentColor"/><circle cx="32" cy="-2" r="10" fill="currentColor"/>`,
  play: `<rect x="-74" y="-54" width="148" height="108" rx="30" fill="none" stroke="currentColor" stroke-width="14"/><path d="M-18,-26 L30,0 L-18,26 Z" fill="currentColor" stroke="currentColor" stroke-width="8" stroke-linejoin="round"/>`,
  heart: `<path d="M0,62 C-70,14 -76,-30 -52,-52 C-32,-70 -8,-60 0,-40 C8,-60 32,-70 52,-52 C76,-30 70,14 0,62 Z" fill="currentColor"/>`,
  star: `<path d="M0,-70 L20,-24 L70,-20 L32,12 L44,62 L0,36 L-44,62 L-32,12 L-70,-20 L-20,-24 Z" fill="currentColor" stroke="currentColor" stroke-width="8" stroke-linejoin="round"/>`,
  check: `<path d="M-48,0 L-14,34 L52,-34" fill="none" stroke="currentColor" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>`,
  link: `<path d="M-14,14 L14,-14" stroke="currentColor" stroke-width="15" stroke-linecap="round"/><path d="M-6,-36 L12,-54 A30,30 0 0 1 54,-12 L36,6 M6,36 L-12,54 A30,30 0 0 1 -54,12 L-36,-6" fill="none" stroke="currentColor" stroke-width="15" stroke-linecap="round"/>`,
  mail: `<rect x="-72" y="-50" width="144" height="100" rx="18" fill="none" stroke="currentColor" stroke-width="14"/><path d="M-66,-40 L0,10 L66,-40" fill="none" stroke="currentColor" stroke-width="14" stroke-linejoin="round"/>`,
  coin: `<circle cx="0" cy="0" r="66" fill="none" stroke="currentColor" stroke-width="14"/><path d="M22,-26 C14,-36 -26,-38 -26,-14 C-26,10 26,0 26,22 C26,44 -14,42 -26,30 M0,-48 V-36 M0,36 V48" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>`,
  scissors: `<circle cx="-40" cy="40" r="24" fill="none" stroke="currentColor" stroke-width="13"/><circle cx="40" cy="40" r="24" fill="none" stroke="currentColor" stroke-width="13"/><path d="M-24,22 L44,-66 M24,22 L-44,-66" stroke="currentColor" stroke-width="13" stroke-linecap="round"/>`,
  store: `<path d="M-66,-20 L-54,-62 H54 L66,-20 Z M-58,-20 V60 H58 V-20" fill="none" stroke="currentColor" stroke-width="14" stroke-linejoin="round"/><rect x="-18" y="16" width="36" height="44" rx="6" fill="currentColor"/>`,
  phone: `<rect x="-44" y="-74" width="88" height="148" rx="22" fill="none" stroke="currentColor" stroke-width="14"/><path d="M-14,52 H14" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>`,
  sparkle: `<path d="M0,-72 C6,-24 24,-6 72,0 C24,6 6,24 0,72 C-6,24 -24,6 -72,0 C-24,-6 -6,-24 0,-72 Z" fill="currentColor"/>`,
  nelsy: `<path d="M-46,52 V-52 L46,52 V-52" fill="none" stroke="currentColor" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>`,
  clock: `<circle cx="0" cy="0" r="68" fill="none" stroke="currentColor" stroke-width="14"/><path d="M0,-38 V0 L28,20" fill="none" stroke="currentColor" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>`,
  home: `<path d="M-66,-4 L0,-62 L66,-4 M-48,-18 V62 H48 V-18" fill="none" stroke="currentColor" stroke-width="14" stroke-linejoin="round" stroke-linecap="round"/><rect x="-16" y="18" width="32" height="44" rx="5" fill="currentColor"/>`,
  users: `<circle cx="-22" cy="-24" r="28" fill="none" stroke="currentColor" stroke-width="13"/><path d="M-78,58 C-74,16 30,16 34,58" fill="none" stroke="currentColor" stroke-width="13" stroke-linecap="round"/><circle cx="42" cy="-30" r="22" fill="none" stroke="currentColor" stroke-width="12"/><path d="M48,10 C66,12 78,26 80,48" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>`,
  tag: `<path d="M-70,-10 L-10,-70 H60 A10,10 0 0 1 70,-60 V10 L10,70 A12,12 0 0 1 -6,70 L-70,6 A12,12 0 0 1 -70,-10 Z" fill="none" stroke="currentColor" stroke-width="13" stroke-linejoin="round"/><circle cx="32" cy="-32" r="12" fill="currentColor"/>`,
  file: `<path d="M-40,-70 H20 L50,-40 V70 H-40 Z" fill="none" stroke="currentColor" stroke-width="13" stroke-linejoin="round"/><path d="M-18,-6 H28 M-18,22 H28 M-18,48 H10" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>`,
};

export function glyph(name, color = '#fff', scale = 1) {
  return `<g color="${color}" transform="scale(${scale})">${GLYPH[name] ?? GLYPH.sparkle}</g>`;
}

// ── Objects ───────────────────────────────────────────────────────────────────
const DRAW = {
  polish({ mat = 'hot', cap = 'ink' } = {}) {
    // Glass bottle with lacquer inside, tall cap
    const gl = uid('pg'), lq = uid('pl'), hl = uid('ph');
    const c = MAT[mat];
    const defs = `<linearGradient id="${gl}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c[0]}"/><stop offset=".2" stop-color="${c[1]}"/><stop offset=".4" stop-color="${c[2]}"/><stop offset=".55" stop-color="${c[1]}"/><stop offset=".85" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[0]}"/></linearGradient>`
      + `<linearGradient id="${lq}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".0"/><stop offset="1" stop-color="#fff" stop-opacity=".25"/></linearGradient>`
      + blur(hl, 5);
    const capC = cylinder(200, 40, 92, 150, cap);
    const neck = cylinder(200, 178, 120, 26, 'chrome');
    const body = raw(`<rect x="88" y="196" width="224" height="186" rx="46" fill="url(#${gl})"/>
      <rect x="88" y="196" width="224" height="186" rx="46" fill="url(#${lq})"/>
      <rect x="88" y="196" width="224" height="186" rx="46" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="5"/>
      <rect x="112" y="220" width="30" height="132" rx="15" fill="#fff" opacity=".7" filter="url(#${hl})"/>
      <rect x="264" y="236" width="14" height="96" rx="7" fill="#fff" opacity=".35" filter="url(#${hl})"/>`, defs);
    return svg(join(body, neck, capC).g, join(body, neck, capC).defs, '0 0 400 400');
  },

  gelpot({ mat = 'hot', lid = 'ink' } = {}) {
    const lidC = cylinder(200, 150, 290, 70, lid);
    const body = cylinder(200, 226, 270, 120, mat, { lid: false });
    const lip = cylinder(200, 214, 250, 18, 'chrome', { lid: false });
    const p = join(body, lip, lidC);
    return svg(p.g, p.defs);
  },

  uvlamp() {
    const shell = uid('us'), inner = uid('ui'), glow = uid('ug'), f = uid('uf');
    const defs = face(shell, 'pearl') + `<linearGradient id="${inner}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A0A26"/><stop offset="1" stop-color="#8A1457"/></linearGradient>`
      + `<radialGradient id="${glow}" cx=".5" cy=".9" r=".7"><stop offset="0" stop-color="#FFE3F0"/><stop offset=".4" stop-color="#FF5FA8"/><stop offset="1" stop-color="#FF5FA8" stop-opacity="0"/></radialGradient>` + blur(f, 10);
    const g = `<path d="M30,330 V240 C30,120 110,70 200,70 C290,70 370,120 370,240 V330 Z" fill="url(#${shell})"/>
      <path d="M30,330 V240 C30,120 110,70 200,70 C290,70 370,120 370,240 V330" fill="none" stroke="#fff" stroke-width="5" opacity=".7"/>
      <path d="M90,330 V260 C90,200 140,170 200,170 C260,170 310,200 310,260 V330 Z" fill="url(#${inner})"/>
      <ellipse cx="200" cy="320" rx="120" ry="40" fill="url(#${glow})" filter="url(#${f})"/>
      ${[130, 165, 200, 235, 270].map((x) => `<circle cx="${x}" cy="188" r="7" fill="#FFB3D6"/>`).join('')}
      <rect x="20" y="322" width="360" height="34" rx="17" fill="#E8CAD7"/>
      <path d="M80,110 C120,86 160,80 190,80" stroke="#fff" stroke-width="16" stroke-linecap="round" opacity=".85" filter="url(#${f})"/>
      <circle cx="320" cy="150" r="14" fill="#F52B8C"/>`;
    return svg(g, defs);
  },

  calendar({ mat = 'hot' } = {}) {
    const base = tile(40, 60, 320, 300, 54, 'pearl', { depth: 20 });
    const band = uid('cb');
    const c = MAT[mat];
    const defs = `<linearGradient id="${band}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c[2]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient>`;
    const head = raw(`<path d="M40,114 A54,54 0 0 1 94,60 H306 A54,54 0 0 1 360,114 V140 H40 Z" fill="url(#${band})"/>`, defs);
    const rings = join(cylinder(130, 36, 30, 60, 'chrome'), cylinder(270, 36, 30, 60, 'chrome'));
    const cells = [];
    for (let r = 0; r < 3; r++) for (let k = 0; k < 4; k++) {
      const x = 74 + k * 66, y = 166 + r * 60;
      const on = r === 1 && k === 2;
      cells.push(on
        ? `<rect x="${x - 6}" y="${y - 6}" width="56" height="52" rx="14" fill="${c[1]}"/><g transform="translate(${x + 22},${y + 20}) scale(.28)">${glyph('check', '#fff')}</g>`
        : `<rect x="${x}" y="${y}" width="44" height="40" rx="11" fill="${(r + k) % 3 === 0 ? '#FFD3E4' : '#F6E6ED'}"/>`);
    }
    const p = join(base, head, raw(cells.join('')), rings);
    return svg(p.g, p.defs);
  },

  phone({ screen = 'booking' } = {}) {
    const bz = uid('pb'), sc = uid('ps');
    const defs = face(bz, 'ink') + `<linearGradient id="${sc}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE3EE"/><stop offset="1" stop-color="#FFFFFF"/></linearGradient>`;
    const ui = screen === 'profile'
      ? `<circle cx="200" cy="120" r="34" fill="#F52B8C"/><circle cx="200" cy="120" r="40" fill="none" stroke="#FF8EC0" stroke-width="5"/>
         <rect x="150" y="170" width="100" height="14" rx="7" fill="#1A1A1A"/><rect x="130" y="194" width="140" height="10" rx="5" fill="#D9C4CE"/>
         ${[222, 268, 314].map((y, i) => `<rect x="118" y="${y}" width="164" height="36" rx="12" fill="${i === 0 ? '#F52B8C' : '#F4E7EC'}"/>`).join('')}`
      : `<rect x="122" y="84" width="90" height="12" rx="6" fill="#B9A3AE"/><rect x="122" y="106" width="150" height="18" rx="9" fill="#1A1A1A"/>
         ${[0, 1, 2, 3, 4].map((k) => `<rect x="${122 + k * 31}" y="146" width="24" height="34" rx="8" fill="${k === 2 ? '#F52B8C' : '#F4E7EC'}"/>`).join('')}
         ${[198, 240, 282].map((y, i) => `<rect x="122" y="${y}" width="156" height="32" rx="10" fill="${i === 1 ? '#FFD3E4' : '#F4E7EC'}" stroke="${i === 1 ? '#F52B8C' : 'none'}" stroke-width="3"/>`).join('')}
         <rect x="122" y="328" width="156" height="34" rx="17" fill="#F52B8C"/>`;
    const g = `<rect x="96" y="20" width="208" height="376" rx="44" fill="url(#${bz})"/>
      <rect x="106" y="30" width="188" height="356" rx="36" fill="url(#${sc})"/>
      <rect x="166" y="42" width="68" height="18" rx="9" fill="#141414"/>
      ${ui}
      <path d="M112,60 C112,44 120,36 134,34" stroke="#fff" stroke-width="5" fill="none" opacity=".6"/>
      <rect x="96" y="20" width="208" height="376" rx="44" fill="none" stroke="#5a5a5a" stroke-width="2"/>`;
    return svg(g, defs, '0 0 400 410');
  },

  envelope({ mat = 'pearl', seal = 'hot' } = {}) {
    const b = uid('eb'), fl = uid('ef');
    const defs = face(b, mat) + `<linearGradient id="${fl}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="${MAT[mat][1]}"/></linearGradient>`;
    const s = sphere(200, 214, 34, seal);
    const g = `<rect x="40" y="110" width="320" height="214" rx="26" fill="${MAT[mat][0]}" transform="translate(0,14)"/>
      <rect x="40" y="110" width="320" height="214" rx="26" fill="url(#${b})"/>
      <path d="M52,312 L170,214 M348,312 L230,214" stroke="${MAT[mat][0]}" stroke-width="5" opacity=".7"/>
      <path d="M44,124 L200,232 L356,124 L356,122 A16,16 0 0 0 340,110 H60 A16,16 0 0 0 44,122 Z" fill="url(#${fl})" stroke="#fff" stroke-width="3"/>`;
    const hs = `<g transform="translate(200,214) scale(.26)">${glyph('heart', '#fff')}</g>`;
    return svg(g + s.g + hs, defs + s.defs);
  },

  magnet() {
    const m = uid('mg'), h = uid('mh'), f = uid('mf');
    const defs = sweep(m, 'hot') + blur(f, 4) + `<linearGradient id="${h}" x1="0" y1="0" x2="1" y2="0">${MAT.chrome.map((c, i) => `<stop offset="${STOPS[i]}" stop-color="${c}"/>`).join('')}</linearGradient>`;
    const g = `<path d="M110,90 V210 A90,90 0 0 0 290,210 V90" fill="none" stroke="#7A1250" stroke-width="96" transform="translate(0,12)"/>
      <path d="M110,90 V210 A90,90 0 0 0 290,210 V90" fill="none" stroke="url(#${m})" stroke-width="96"/>
      <path d="M92,120 V210 A108,108 0 0 0 150,302" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".6" filter="url(#${f})"/>
      <rect x="62" y="40" width="96" height="74" rx="10" fill="url(#${h})"/><rect x="242" y="40" width="96" height="74" rx="10" fill="url(#${h})"/>
      <ellipse cx="110" cy="40" rx="48" ry="12" fill="#F4F2F6"/><ellipse cx="290" cy="40" rx="48" ry="12" fill="#F4F2F6"/>`;
    return svg(g, defs);
  },

  coins({ mat = 'gold' } = {}) {
    const parts = [];
    const stack = (cx, base, count) => {
      for (let i = 0; i < count; i++) parts.push(cylinder(cx, base - i * 26, 150, 26, mat));
    };
    stack(130, 330, 6);
    stack(270, 330, 4);
    const front = uid('cf');
    const c = MAT[mat];
    const coin = raw(`<ellipse cx="236" cy="300" rx="92" ry="92" fill="${c[0]}" transform="translate(10,6)"/><circle cx="236" cy="300" r="92" fill="url(#${front})"/><circle cx="236" cy="300" r="70" fill="none" stroke="${c[0]}" stroke-width="6" opacity=".5"/><g transform="translate(236,300) scale(.78)">${glyph('coin', c[0])}</g>`, radial(front, mat));
    const p = join(...parts, coin);
    return svg(p.g, p.defs, '0 0 400 420');
  },

  bookingcard() {
    const card = tile(30, 90, 340, 230, 36, 'pearl', { depth: 16 });
    const av = sphere(96, 160, 32, 'hot');
    const g = `<rect x="146" y="138" width="150" height="20" rx="10" fill="#1A1A1A"/><rect x="146" y="168" width="104" height="14" rx="7" fill="#C9AEBB"/>
      <rect x="62" y="216" width="276" height="16" rx="8" fill="#F1E2E9"/><rect x="62" y="242" width="200" height="16" rx="8" fill="#F1E2E9"/>
      <rect x="62" y="272" width="276" height="34" rx="17" fill="#F52B8C"/><g transform="translate(200,289) scale(.2)">${glyph('check', '#fff')}</g>`;
    const badge = sphere(338, 100, 46, 'hot');
    const p = join(card, av, raw(g), badge, raw(`<g transform="translate(338,100) scale(.36)">${glyph('check', '#fff')}</g>`));
    return svg(p.g, p.defs);
  },

  badge({ mat = 'hot', icon = 'check' } = {}) {
    // Scalloped seal with a thick rim
    const pts = [];
    const N = 16;
    for (let i = 0; i < N * 2; i++) {
      const a = (Math.PI * i) / N - Math.PI / 2;
      const r = i % 2 ? 150 : 176;
      pts.push(`${200 + r * Math.cos(a)},${200 + r * Math.sin(a)}`);
    }
    const f = uid('bf'), s = uid('bs');
    const c = MAT[mat];
    const defs = face(f, mat) + `<linearGradient id="${s}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[0]}"/></linearGradient>`;
    const g = `<polygon points="${pts.join(' ')}" fill="url(#${s})" transform="translate(0,16)" stroke="url(#${s})" stroke-width="14" stroke-linejoin="round"/>
      <polygon points="${pts.join(' ')}" fill="url(#${f})" stroke="url(#${f})" stroke-width="14" stroke-linejoin="round"/>
      <circle cx="200" cy="200" r="112" fill="none" stroke="#fff" stroke-width="8" opacity=".85"/>
      <g transform="translate(200,200) scale(1)">${glyph(icon, '#fff')}</g>`;
    return svg(g, defs);
  },

  star({ mat = 'hot' } = {}) {
    const id = uid('st'), d = uid('sd'), f = uid('sb');
    const path = (s, dx = 0, dy = 0) => {
      const pts = [];
      for (let i = 0; i < 10; i++) {
        const a = (Math.PI * i) / 5 - Math.PI / 2;
        const r = i % 2 ? s * 0.48 : s;
        pts.push(`${200 + dx + r * Math.cos(a)},${210 + dy + r * Math.sin(a)}`);
      }
      return pts.join(' ');
    };
    const defs = radial(id, mat, 0.4, 0.3) + `<linearGradient id="${d}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${MAT[mat][1]}"/><stop offset="1" stop-color="${MAT[mat][0]}"/></linearGradient>` + blur(f, 8);
    const g = `<polygon points="${path(170, 0, 18)}" fill="url(#${d})" stroke="url(#${d})" stroke-width="34" stroke-linejoin="round"/>
      <polygon points="${path(170)}" fill="url(#${id})" stroke="url(#${id})" stroke-width="34" stroke-linejoin="round"/>
      <ellipse cx="158" cy="140" rx="40" ry="18" fill="#fff" opacity=".75" filter="url(#${f})" transform="rotate(-30 158 140)"/>`;
    return svg(g, defs);
  },

  nailfile() {
    const a = uid('na'), b = uid('nb'), dots = uid('nd');
    const defs = sweep(a, 'hot', { vertical: true }) + sweep(b, 'pearl', { vertical: true })
      + `<pattern id="${dots}" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.6" fill="#fff" opacity=".45"/><circle cx="8" cy="8" r="1.2" fill="#000" opacity=".12"/></pattern>`;
    const g = `<g transform="rotate(-35 200 200)">
      <rect x="10" y="164" width="380" height="84" rx="42" fill="#7A1250" transform="translate(0,12)"/>
      <path d="M52,164 H200 V248 H52 A42,42 0 0 1 52,164 Z" fill="url(#${a})"/><path d="M200,164 H348 A42,42 0 0 1 348,248 H200 Z" fill="url(#${b})"/>
      <rect x="10" y="164" width="380" height="84" rx="42" fill="url(#${dots})"/>
      <rect x="40" y="176" width="320" height="12" rx="6" fill="#fff" opacity=".55"/></g>`;
    return svg(g, defs);
  },

  lashwand() {
    const tube = cylinder(140, 120, 84, 250, 'ink');
    const cap = cylinder(140, 70, 84, 60, 'chrome');
    const parts = [];
    for (let i = 0; i < 18; i++) {
      const y = 70 + i * 13;
      parts.push(`<path d="M262,${y} L${300 + (i % 2) * 8},${y - 6} M262,${y} L${224 - (i % 2) * 8},${y - 6}" stroke="#1A1A1A" stroke-width="5" stroke-linecap="round"/>`);
    }
    const wand = cylinder(262, 300, 22, 90, 'hot');
    const p = join(tube, cap, raw(`<rect x="257" y="56" width="10" height="250" rx="5" fill="#2a2a2a"/>${parts.join('')}`), wand);
    return svg(p.g, p.defs);
  },

  brush() {
    const h = uid('bh'), br = uid('bb'), f = uid('bf');
    const defs = sweep(h, 'berry') + blur(f, 4)
      + `<linearGradient id="${br}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFE3EE"/><stop offset=".5" stop-color="#FF8EC0"/><stop offset="1" stop-color="#C41C72"/></linearGradient>`;
    const fer = uid('bc');
    const g = `<g transform="rotate(32 200 200)">
      <path d="M182,190 L170,392 A30,14 0 0 0 230,392 L218,190 Z" fill="url(#${h})"/>
      <rect x="166" y="130" width="68" height="70" rx="8" fill="url(#${fer})"/>
      <path d="M168,136 C120,80 140,0 200,-10 C260,0 280,80 232,136 Z" fill="url(#${br})"/>
      <path d="M176,110 C160,70 172,24 196,10" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" opacity=".7" filter="url(#${f})"/>
      <rect x="184" y="210" width="8" height="160" rx="4" fill="#fff" opacity=".35"/></g>`;
    return svg(g, defs + sweep(fer, 'chrome'));
  },

  ringlight() {
    const r = uid('rl'), f = uid('rf'), g2 = uid('rg');
    const defs = `<linearGradient id="${r}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".5" stop-color="#FFE3EE"/><stop offset="1" stop-color="#E8A6C4"/></linearGradient>`
      + blur(f, 14) + `<radialGradient id="${g2}"><stop offset=".6" stop-color="#FFB3D6" stop-opacity="0"/><stop offset=".8" stop-color="#FFB3D6" stop-opacity=".9"/><stop offset="1" stop-color="#FFB3D6" stop-opacity="0"/></radialGradient>`;
    const ph = `<g transform="translate(200,182) rotate(6)"><rect x="-36" y="-66" width="72" height="132" rx="16" fill="#1A1A1A"/><rect x="-30" y="-60" width="60" height="120" rx="12" fill="#F52B8C"/><circle cx="0" cy="-12" r="16" fill="#FFD8E6"/><rect x="-18" y="16" width="36" height="8" rx="4" fill="#FFD8E6"/></g>`;
    const g = `<circle cx="200" cy="182" r="190" fill="url(#${g2})"/>
      <circle cx="200" cy="182" r="140" fill="none" stroke="#C97FA3" stroke-width="44" transform="translate(0,8)"/>
      <circle cx="200" cy="182" r="140" fill="none" stroke="url(#${r})" stroke-width="44"/>
      <path d="M90,100 A140,140 0 0 1 200,42" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" filter="url(#${f})"/>
      <rect x="192" y="320" width="16" height="90" fill="#1A1A1A"/>${ph}`;
    return svg(g, defs, '0 0 400 420');
  },

  pricetag({ mat = 'pearl', text = '' } = {}) {
    const f = uid('pf'), s = uid('ps');
    const defs = face(f, mat) + sweep(s, 'hot');
    const shape = 'M90,90 H300 A40,40 0 0 1 340,130 V270 A40,40 0 0 1 300,310 H90 L30,200 Z';
    const g = `<path d="M160,200 C60,200 40,330 -10,360" stroke="#F52B8C" stroke-width="8" fill="none" stroke-linecap="round"/>
      <g transform="rotate(-14 200 200)"><path d="${shape}" fill="#CFA0B6" transform="translate(0,16)"/><path d="${shape}" fill="url(#${f})"/>
      <circle cx="96" cy="200" r="20" fill="#E8C4D4"/><circle cx="96" cy="200" r="12" fill="#B07A93"/>
      <rect x="150" y="150" width="150" height="26" rx="13" fill="url(#${s})"/><rect x="150" y="196" width="110" height="18" rx="9" fill="#E9D3DD"/>
      <rect x="150" y="230" width="130" height="18" rx="9" fill="#E9D3DD"/>${text}</g>`;
    return svg(g, defs);
  },

  bubble({ mat = 'hot', icon = 'dots' } = {}) {
    const f = uid('bf'), s = uid('bs'), gl = uid('bg');
    const c = MAT[mat];
    const defs = face(f, mat) + `<linearGradient id="${s}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[0]}"/></linearGradient>`
      + `<linearGradient id="${gl}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>`;
    const shape = 'M90,70 H310 A60,60 0 0 1 370,130 V240 A60,60 0 0 1 310,300 H170 L90,360 L104,300 H90 A60,60 0 0 1 30,240 V130 A60,60 0 0 1 90,70 Z';
    const inner = icon === 'heart'
      ? `<g transform="translate(200,188) scale(.95)">${glyph('heart', '#fff')}</g>`
      : [140, 200, 260].map((x) => `<circle cx="${x}" cy="186" r="22" fill="#fff"/>`).join('');
    const g = `<path d="${shape}" fill="url(#${s})" transform="translate(0,16)"/><path d="${shape}" fill="url(#${f})"/>
      <path d="M90,84 H310 A46,46 0 0 1 356,130 V150 H44 V130 A46,46 0 0 1 90,84 Z" fill="url(#${gl})"/>${inner}`;
    return svg(g, defs);
  },

  heart({ mat = 'hot' } = {}) {
    const id = uid('hr'), d = uid('hd'), f = uid('hf');
    const p = 'M200,350 C70,262 40,180 70,120 C100,64 170,60 200,118 C230,60 300,64 330,120 C360,180 330,262 200,350 Z';
    const defs = radial(id, mat, 0.38, 0.28) + `<linearGradient id="${d}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${MAT[mat][1]}"/><stop offset="1" stop-color="${MAT[mat][0]}"/></linearGradient>` + blur(f, 8);
    const g = `<path d="${p}" fill="url(#${d})" transform="translate(0,18)"/><path d="${p}" fill="url(#${id})"/>
      <ellipse cx="128" cy="132" rx="38" ry="22" fill="#fff" opacity=".75" filter="url(#${f})" transform="rotate(-40 128 132)"/>`;
    return svg(g, defs);
  },

  chart() {
    const bars = [90, 140, 120, 200, 270].map((h, i) => cylinder(70 + i * 66, 370 - h, 54, h, i === 4 ? 'hot' : 'blush'));
    const arrow = uid('ca');
    const defs = sweep(arrow, 'hot');
    const g = `<path d="M50,250 L140,190 L210,215 L330,90" fill="none" stroke="#8A1457" stroke-width="26" stroke-linecap="round" stroke-linejoin="round" transform="translate(0,10)"/>
      <path d="M50,250 L140,190 L210,215 L330,90" fill="none" stroke="url(#${arrow})" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M282,82 L346,72 L338,136 Z" fill="#F52B8C" stroke="#F52B8C" stroke-width="14" stroke-linejoin="round"/>`;
    const p = join(...bars, raw(g, defs));
    return svg(p.g, p.defs);
  },

  gift() {
    const box = tile(60, 170, 280, 200, 26, 'hot', { depth: 18 });
    const lid = tile(40, 120, 320, 70, 22, 'hot', { depth: 12 });
    const rib = uid('gr');
    const defs = sweep(rib, 'pearl');
    const g = `<rect x="176" y="120" width="48" height="268" fill="url(#${rib})"/>
      <path d="M200,122 C150,40 70,60 110,110 C130,130 180,124 200,122 Z M200,122 C250,40 330,60 290,110 C270,130 220,124 200,122 Z" fill="url(#${rib})" stroke="#E5C9D6" stroke-width="4"/>`;
    const p = join(box, lid, raw(g, defs));
    return svg(p.g, p.defs);
  },

  clock() {
    const s = sphere(200, 210, 170, 'pearl');
    const g = `<circle cx="200" cy="210" r="130" fill="#fff"/>
      ${Array.from({ length: 12 }, (_, i) => { const a = (i * Math.PI) / 6; return `<circle cx="${200 + 108 * Math.sin(a)}" cy="${210 - 108 * Math.cos(a)}" r="${i % 3 ? 5 : 9}" fill="${i % 3 ? '#E1C3D1' : '#F52B8C'}"/>`; }).join('')}
      <path d="M200,210 V128 M200,210 L262,246" stroke="#1A1A1A" stroke-width="16" stroke-linecap="round"/><circle cx="200" cy="210" r="14" fill="#F52B8C"/>`;
    const bell = join(sphere(90, 66, 34, 'hot'), sphere(310, 66, 34, 'hot'));
    const p = join(bell, s, raw(g));
    return svg(p.g, p.defs, '0 0 400 400');
  },

  lock() {
    const body = tile(70, 170, 260, 210, 46, 'hot', { depth: 20 });
    const sh = uid('ls');
    const defs = sweep(sh, 'chrome');
    const g = `<path d="M120,180 V120 A80,80 0 0 1 280,120 V180" fill="none" stroke="url(#${sh})" stroke-width="40"/>`;
    const hole = `<circle cx="200" cy="262" r="26" fill="#7A1250"/><rect x="190" y="272" width="20" height="50" rx="10" fill="#7A1250"/>`;
    const p = join(raw(g, defs), body, raw(hole));
    return svg(p.g, p.defs);
  },

  clipboard() {
    const board = tile(70, 50, 260, 340, 34, 'hot', { depth: 18 });
    const paper = tile(96, 86, 208, 280, 18, 'pearl', { depth: 0, gloss: false });
    const clip = tile(150, 30, 100, 56, 18, 'chrome', { depth: 8 });
    const rows = [128, 196, 264].map((y, i) => `<rect x="118" y="${y}" width="44" height="44" rx="12" fill="${i < 2 ? '#F52B8C' : '#F3E3EA'}"/>${i < 2 ? `<g transform="translate(140,${y + 22}) scale(.24)">${glyph('check', '#fff')}</g>` : ''}<rect x="176" y="${y + 8}" width="${i === 1 ? 90 : 108}" height="12" rx="6" fill="#D8C0CB"/><rect x="176" y="${y + 28}" width="70" height="10" rx="5" fill="#EBDDE3"/>`).join('');
    const p = join(board, paper, raw(rows), clip);
    return svg(p.g, p.defs);
  },

  apptile({ mat = 'hot', icon = 'calendar', color } = {}) {
    const t = tile(40, 40, 320, 320, 84, mat, { depth: 22 });
    const ink = color ?? (['pearl', 'blush', 'chrome'].includes(mat) ? '#F52B8C' : '#fff');
    const p = join(t, raw(`<g transform="translate(200,200) scale(1.35)">${glyph(icon, ink)}</g>`));
    return svg(p.g, p.defs);
  },

  house() {
    const wall = tile(80, 180, 240, 190, 18, 'pearl', { depth: 16 });
    const r = uid('hr');
    const defs = face(r, 'hot');
    const roof = raw(`<path d="M40,206 L200,70 L360,206 Z" fill="#8A1457" transform="translate(0,14)" stroke="#8A1457" stroke-width="24" stroke-linejoin="round"/><path d="M40,206 L200,70 L360,206 Z" fill="url(#${r})" stroke="url(#${r})" stroke-width="24" stroke-linejoin="round"/>`, defs);
    const door = `<rect x="166" y="270" width="68" height="100" rx="12" fill="#F52B8C"/><circle cx="220" cy="322" r="6" fill="#FFD8E6"/><rect x="104" y="232" width="44" height="44" rx="10" fill="#FFD8E6"/><rect x="252" y="232" width="44" height="44" rx="10" fill="#FFD8E6"/>`;
    const p = join(wall, roof, raw(door));
    return svg(p.g, p.defs);
  },

  megaphone() {
    const c = uid('mc');
    const defs = face(c, 'hot');
    const g = `<path d="M70,170 L300,60 V340 L70,230 Z" fill="#8A1457" transform="translate(0,14)"/><path d="M70,170 L300,60 V340 L70,230 Z" fill="url(#${c})"/>
      <ellipse cx="300" cy="200" rx="40" ry="140" fill="#FFD8E6"/><ellipse cx="300" cy="200" rx="24" ry="110" fill="#F52B8C"/>
      <rect x="36" y="160" width="60" height="80" rx="18" fill="#1A1A1A"/><path d="M110,236 L130,320 H170 L156,252" fill="#1A1A1A"/>`;
    return svg(g, defs);
  },
};

export const OBJECTS = Object.keys(DRAW);

/**
 * One object as HTML, absolutely positioned. size = width in px on the 1200x675 cover.
 * shadow: soft coloured drop shadow that grounds the object on the field.
 */
export function obj(name, { x, y, size, rotate = 0, z = 1, opts = {}, shadow = 'rgba(90,10,50,.45)', style = '' } = {}) {
  const draw = DRAW[name] ?? DRAW.badge;
  return `<div class="obj" style="position:absolute;left:${x}px;top:${y}px;width:${size}px;height:${size}px;transform:rotate(${rotate}deg);z-index:${z};filter:drop-shadow(0 ${Math.round(size * 0.07)}px ${Math.round(size * 0.08)}px ${shadow});${style}">${draw(opts)}</div>`;
}
