import type { Merchant, Service } from '../types';

// Template gallery previews only: never applied to a pro's studio.
// Photos: Unsplash (free to use under the Unsplash License), hotlinked from images.unsplash.com.
const u = (id: string, w = 600, h?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=70`;

interface Persona {
  name: string;
  slug: string;
  specialty: string;
  location: string;
  bio: string;
  avatar: string;
  cover?: string;
  services: [string, string, number, number, number, string][]; // name, description, price, duration, deposit, photo id
}

function toMerchant(id: string, p: Persona): Omit<Merchant, 'theme_preset' | 'color_accent'> {
  return {
    id: `demo-${id}`,
    slug: p.slug,
    salon_name: p.name,
    name: p.name,
    bio: p.bio,
    specialty: p.specialty,
    location: p.location,
    instagram: p.slug,
    tiktok: p.slug,
    logo_url: u(p.avatar, 400, 400),
    cover_url: p.cover ? u(p.cover, 900) : undefined,
    rating: 0,
    review_count: 0,
    services: p.services.map(([name, description, price, duration, deposit, photo], i) => ({
      id: `${id}-${i}`, name, description, price, duration, deposit, image_url: u(photo, 500, 400),
    })) as Service[],
  };
}

const PERSONAS: Record<string, Persona> = {
  classic: {
    name: 'Inès Nails', slug: 'inesnails', specialty: 'Nail artist', location: 'Paris 11e',
    bio: 'Gel, chrome and hand-painted nail art. Clean, long-lasting sets.',
    avatar: '1534528741775-53994a69daeb',
    services: [
      ['Gel manicure', 'Builder gel, cuticle care and a glossy finish.', 45, 60, 15, '1610992015762-45dca7fa3a85'],
      ['Nail art set', 'Hand-painted designs on all ten nails.', 65, 90, 20, '1604654894610-df63bc536371'],
      ['Chrome extensions', 'Sculpted extensions with a mirror chrome top.', 80, 120, 25, '1777287216954-2b4b22bb6bf2'],
    ],
  },
  minimal: {
    name: 'Lina Brow Studio', slug: 'linabrows', specialty: 'Brow artist', location: 'Lyon',
    bio: 'Natural brows that frame your face. Lamination, tint and shaping.',
    avatar: '1551184451-76b762941ad6',
    services: [
      ['Brow lamination', 'Fuller, brushed-up brows that last six weeks.', 55, 45, 15, '1516220362602-dba5272034e7'],
      ['Brow shaping', 'Threading and tweezing tailored to your features.', 25, 30, 0, '1519415387722-a1c3bbef716c'],
      ['Tint and shape', 'Shaping plus a soft tint for definition.', 40, 40, 10, '1666858619985-701e36b3bc57'],
    ],
  },
  coach: {
    name: 'Maya Glam', slug: 'mayaglam', specialty: 'Makeup artist', location: 'Marseille',
    bio: 'Bridal and event makeup. Skin first, glam that lasts all night.',
    avatar: '1594465919760-441fe5908ab0',
    services: [
      ['Event makeup', 'Full glam for parties, shoots and nights out.', 85, 75, 25, '1709477542149-f4e0e21d590b'],
      ['Bridal trial', 'Test your wedding look and lock in every detail.', 120, 90, 40, '1512496015851-a90fb38ba796'],
      ['Makeup lesson', 'Learn a quick everyday routine with your own kit.', 70, 60, 20, '1596462502278-27bfdc403348'],
    ],
  },
  blush: {
    name: 'Glow Skin Clinic', slug: 'glowskin', specialty: 'Esthetician', location: 'Bordeaux',
    bio: 'Facials and skin treatments for a calm, healthy glow.',
    avatar: '1672794776762-18dddc72982e', cover: '1570172619644-dfd03ed5d881',
    services: [
      ['Signature facial', 'Deep cleanse, gentle peel, mask and lymphatic massage.', 90, 75, 25, '1731514771613-991a02407132'],
      ['Jade roller ritual', 'Cooling massage to depuff and relax the face.', 45, 30, 0, '1586220742613-b731f66f7743'],
      ['Skin consultation', 'A tailored routine built around your skin.', 35, 30, 10, '1598440947619-2c35fc9aa908'],
    ],
  },
  atelier: {
    name: 'Atelier Awa', slug: 'atelierawa', specialty: 'Hair stylist', location: 'Paris 18e',
    bio: 'Cuts, blowouts and colour for every texture, curls included.',
    avatar: '1632765854612-9b02b6ec2b15', cover: '1580618672591-eb180b1a973f',
    services: [
      ['Cut and blowout', 'Wash, precision cut and a smooth blowout.', 60, 60, 15, '1634449571010-02389ed0f9b0'],
      ['Curl styling', 'Defined, bouncy curls with heat-free options.', 55, 75, 15, '1560869713-7d0a29430803'],
      ['Colour gloss', 'Shine and tone refresh between colours.', 70, 60, 20, '1781450090585-1a511b7066d9'],
    ],
  },
  gallery: {
    name: 'The Lash Lab', slug: 'thelashlab', specialty: 'Lash artist', location: 'Nice',
    bio: 'Classic, hybrid and volume lashes mapped to your eye shape.',
    avatar: '1534751516642-a1af1ef26a56',
    services: [
      ['Classic full set', 'One extension per natural lash for a soft look.', 85, 120, 25, '1589710751893-f9a6770ad71b'],
      ['Volume full set', 'Handmade fans for a fuller, fluffier look.', 110, 150, 30, '1639629509821-c54cdd984227'],
      ['Lash refill', 'Top up your set within three weeks.', 50, 60, 15, '1770999086860-143f54adf01b'],
    ],
  },
  muse: {
    name: 'Maison Sérénité', slug: 'maisonserenite', specialty: 'Massage therapist', location: 'Annecy',
    bio: 'Slow, restorative massages in a quiet private studio.',
    avatar: '1589525231707-f2de2428f59c', cover: '1600334089648-b0d9d3028eb2',
    services: [
      ['Relaxing massage', 'Full-body massage with warm oils.', 80, 60, 20, '1519823551278-64ac92734fb1'],
      ['Hot stone massage', 'Heated stones to release deep tension.', 95, 75, 25, '1696841212541-449ca29397cc'],
      ['Aromatherapy ritual', 'Essential oils chosen for your mood.', 70, 50, 15, '1515377905703-c4788e51af15'],
    ],
  },
  noir: {
    name: 'Kings Cut', slug: 'kingscut', specialty: 'Barber', location: 'Lille',
    bio: 'Sharp fades, beard work and hot towel shaves.',
    avatar: '1544225917-1bf66feace19', cover: '1503951914875-452162b0f3f1',
    services: [
      ['Skin fade', 'Clean fade with a sharp line-up.', 30, 40, 0, '1647140655214-e4a2d914971f'],
      ['Cut and beard', 'Haircut plus beard shaping and hot towel.', 45, 60, 10, '1621605815971-fbc98d665033'],
      ['Hot towel shave', 'Traditional straight-razor shave.', 35, 40, 10, '1585747860715-2ba37e788b70'],
    ],
  },
  midnight: {
    name: 'Ink & Line', slug: 'inkandline', specialty: 'Fine line tattoo', location: 'Toulouse',
    bio: 'Delicate fine line and script tattoos, custom drawn.',
    avatar: '1677543167033-af3c688aa4df', cover: '1542744383-8c330d91f4b1',
    services: [
      ['Fine line tattoo', 'Small custom piece up to 8 cm.', 120, 90, 40, '1643513456892-437e82e06f4a'],
      ['Script tattoo', 'A word or date in your chosen lettering.', 90, 60, 30, '1570168983832-8989dae1522e'],
      ['Design consultation', 'Plan placement, size and style together.', 30, 30, 0, '1547754145-ef9ff306e3f3'],
    ],
  },
  split: {
    name: 'Studio Nacre', slug: 'studionacre', specialty: 'Nail technician', location: 'Nantes',
    bio: 'Soft, natural nails and minimal art in a calm studio.',
    avatar: '1531123897727-8f129e1688ce',
    services: [
      ['Russian manicure', 'Precise cuticle work and a flawless gel finish.', 50, 75, 15, '1632345031435-8727f6897d53'],
      ['Glitter fade', 'Sparkling ombré for a festive touch.', 55, 75, 15, '1607779097040-26e80aa78e66'],
      ['Minimal nail art', 'Fine lines, dots and tiny details.', 60, 90, 20, '1769687209448-025548dfca8b'],
    ],
  },
  glow: {
    name: 'Glow by Amara', slug: 'glowbyamara', specialty: 'Lash and brow artist', location: 'Paris 9e',
    bio: 'Lashes, brows and soft glam to wake up looking ready.',
    avatar: '1589156191108-c762ff4b96ab',
    services: [
      ['Hybrid lashes', 'A mix of classic and volume for texture.', 95, 120, 25, '1772236617396-2f8460293c07'],
      ['Lash lift', 'Curl and tint your natural lashes.', 60, 60, 15, '1730226995154-efe9e13db300'],
      ['Soft glam', 'Fresh, glowing makeup for any occasion.', 75, 60, 20, '1773688189414-7637b9b138e1'],
    ],
  },
  editorial: {
    name: 'Clara Beauty', slug: 'clarabeauty', specialty: 'Editorial makeup', location: 'Paris 6e',
    bio: 'Editorial and bridal makeup with a skin-first approach.',
    avatar: '1568038479111-87bf80659645', cover: '1568038479111-87bf80659645',
    services: [
      ['Editorial look', 'Camera-ready makeup for shoots and campaigns.', 140, 90, 40, '1764333746348-1df13b3a4aae'],
      ['Bridal makeup', 'Your wedding day look, built to last.', 180, 120, 60, '1620464003286-a5b0d79f32c2'],
      ['Skin prep facial', 'Hydrating prep before a big event.', 60, 45, 15, '1761718210089-ba3bb5ccb54f'],
    ],
  },
};

export const TEMPLATE_DEMOS: Record<string, Omit<Merchant, 'theme_preset' | 'color_accent'>> = Object.fromEntries(
  Object.entries(PERSONAS).map(([id, p]) => [id, toMerchant(id, p)]),
);
