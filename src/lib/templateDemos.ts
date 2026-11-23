import type { Merchant, Service } from '../types';

// Template gallery previews only: never applied to a pro's studio.
// Photos: Unsplash (free to use under the Unsplash License), hotlinked from images.unsplash.com.
const u = (id: string, w = 600, h?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=70`;

type CardStyle = 'button' | 'callout' | 'preview';

interface Persona {
  name: string;
  slug: string;
  specialty: string;
  location: string;
  bio: string;
  avatar: string;
  /** Large header photo; defaults to the avatar portrait. */
  cover?: string;
  services: [string, string, number, number, number, string, CardStyle][]; // name, description, price, min, deposit, photo, card style
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
    cover_url: u(p.cover ?? p.avatar, 900),
    rating: 0,
    review_count: 0,
    services: p.services.map(([name, description, price, duration, deposit, photo, card_style], i) => ({
      id: `${id}-${i}`, name, description, price, duration, deposit, image_url: u(photo, 600, 440), card_style,
    })) as Service[],
  };
}

// One persona per template, all within Nelsy's categories:
// Nails, Lashes, Brows, Makeup, Hair, Skin Care, Massage.
const PERSONAS: Record<string, Persona> = {
  classic: {
    name: 'Inès Nails', slug: 'inesnails', specialty: 'Nail artist', location: 'Paris 11e',
    bio: 'Soft gel sets and hand-painted details.',
    avatar: '1534528741775-53994a69daeb',
    services: [
      ['Gel manicure', 'Builder gel, cuticle care and a glossy finish.', 45, 60, 15, '1610992015762-45dca7fa3a85', 'button'],
      ['Signature set', 'Long-lasting gel with your choice of soft colours.', 55, 75, 15, '1612887390768-fb02affea7a6', 'callout'],
      ['Minimal nail art', 'Fine lines, dots and tiny botanical details.', 65, 90, 20, '1769687209448-025548dfca8b', 'preview'],
    ],
  },
  gallery: {
    name: 'The Lash Lab', slug: 'thelashlab', specialty: 'Lash artist', location: 'Nice',
    bio: 'Lashes mapped to your eye shape.',
    avatar: '1534751516642-a1af1ef26a56',
    services: [
      ['Volume full set', 'Handmade fans for a fuller, fluffier look.', 110, 150, 30, '1639629509821-c54cdd984227', 'preview'],
      ['Classic full set', 'One extension per natural lash for a soft look.', 85, 120, 25, '1589710751893-f9a6770ad71b', 'callout'],
      ['Lash refill', 'Top up your set within three weeks.', 50, 60, 15, '1770999086860-143f54adf01b', 'button'],
    ],
  },
  blush: {
    name: 'Glow Skin', slug: 'glowskin', specialty: 'Esthetician', location: 'Bordeaux',
    bio: 'Facials and skin rituals for a calm, healthy glow.',
    avatar: '1672794776762-18dddc72982e',
    services: [
      ['Skin consultation', 'A routine built around your skin.', 35, 30, 10, '1598440947619-2c35fc9aa908', 'button'],
      ['Signature facial', 'Deep cleanse, gentle peel, mask and lymphatic massage.', 90, 75, 25, '1731514771613-991a02407132', 'callout'],
      ['Jade roller ritual', 'Cooling massage to depuff and relax the face.', 45, 30, 0, '1586220742613-b731f66f7743', 'callout'],
    ],
  },
  atelier: {
    name: 'Atelier Awa', slug: 'atelierawa', specialty: 'Hair stylist', location: 'Paris 18e',
    bio: 'Cuts, blowouts and colour for every texture.',
    avatar: '1632765854612-9b02b6ec2b15',
    services: [
      ['Cut and blowout', 'Wash, precision cut and a smooth blowout.', 60, 60, 15, '1634449571010-02389ed0f9b0', 'callout'],
      ['Curl styling', 'Defined, bouncy curls with heat-free options.', 55, 75, 15, '1560869713-7d0a29430803', 'callout'],
      ['Blowout', 'Smooth, voluminous finish for any occasion.', 40, 45, 10, '1580618672591-eb180b1a973f', 'button'],
    ],
  },
  noir: {
    name: 'Noir Nail Club', slug: 'noirnailclub', specialty: 'Nail artist', location: 'Lyon',
    bio: 'Bold sets, chrome and statement nail art.',
    avatar: '1506863530036-1efeddceb993',
    services: [
      ['Chrome extensions', 'Sculpted extensions with a mirror chrome top.', 80, 120, 25, '1777287216954-2b4b22bb6bf2', 'callout'],
      ['Tortoise nail art', 'Hand-painted tortoiseshell with gold accents.', 70, 90, 20, '1604654894610-df63bc536371', 'callout'],
      ['Statement set', 'A full custom design, made with you.', 95, 120, 30, '1758178309407-6562d1687b01', 'button'],
    ],
  },
  minimal: {
    name: 'Lina Brows', slug: 'linabrows', specialty: 'Brow artist', location: 'Lyon',
    bio: 'Natural brows that frame your face.',
    avatar: '1551184451-76b762941ad6',
    services: [
      ['Brow lamination', 'Fuller, brushed-up brows that last six weeks.', 55, 45, 15, '1516220362602-dba5272034e7', 'callout'],
      ['Brow shaping', 'Threading and tweezing tailored to your features.', 25, 30, 0, '1519415387722-a1c3bbef716c', 'button'],
      ['Tint and shape', 'Shaping plus a soft tint for definition.', 40, 40, 10, '1666858619985-701e36b3bc57', 'button'],
    ],
  },
  midnight: {
    name: 'Clara Beauty', slug: 'clarabeauty', specialty: 'Makeup artist', location: 'Paris 6e',
    bio: 'Editorial and bridal makeup, skin first.',
    avatar: '1568038479111-87bf80659645',
    services: [
      ['Editorial look', 'Camera-ready makeup for shoots and campaigns.', 140, 90, 40, '1764333746348-1df13b3a4aae', 'callout'],
      ['Bridal makeup', 'Your wedding day look, built to last.', 180, 120, 60, '1620464003286-a5b0d79f32c2', 'callout'],
      ['Skin prep facial', 'Hydrating prep before a big event.', 60, 45, 15, '1761718210089-ba3bb5ccb54f', 'preview'],
    ],
  },
  split: {
    name: 'Studio Nacre', slug: 'studionacre', specialty: 'Nail technician', location: 'Nantes',
    bio: 'Soft, natural nails in a calm studio.',
    avatar: '1531123897727-8f129e1688ce',
    services: [
      ['Russian manicure', 'Precise cuticle work and a flawless gel finish.', 50, 75, 15, '1632345031435-8727f6897d53', 'button'],
      ['Glitter fade', 'Sparkling ombré for a festive touch.', 55, 75, 15, '1607779097040-26e80aa78e66', 'callout'],
      ['Pastel gel set', 'Soft pastel shades on a strong gel base.', 50, 60, 15, '1610992015762-45dca7fa3a85', 'callout'],
    ],
  },
  muse: {
    name: 'Maison Sérénité', slug: 'maisonserenite', specialty: 'Massage therapist', location: 'Annecy',
    bio: 'Slow, restorative massages in a quiet studio.',
    avatar: '1589525231707-f2de2428f59c', cover: '1600334089648-b0d9d3028eb2',
    services: [
      ['Relaxing massage', 'Full-body massage with warm oils.', 80, 60, 20, '1519823551278-64ac92734fb1', 'callout'],
      ['Hot stone massage', 'Heated stones to release deep tension.', 95, 75, 25, '1696841212541-449ca29397cc', 'callout'],
      ['Aromatherapy ritual', 'Essential oils chosen for your mood.', 70, 50, 15, '1515377905703-c4788e51af15', 'preview'],
    ],
  },
  glow: {
    name: 'Glow by Amara', slug: 'glowbyamara', specialty: 'Lash and brow artist', location: 'Paris 9e',
    bio: 'Lashes, brows and soft glam.',
    avatar: '1589156191108-c762ff4b96ab',
    services: [
      ['Hybrid lashes', 'A mix of classic and volume for texture.', 95, 120, 25, '1772236617396-2f8460293c07', 'callout'],
      ['Lash lift', 'Curl and tint your natural lashes.', 60, 60, 15, '1730226995154-efe9e13db300', 'preview'],
      ['Soft glam', 'Fresh, glowing makeup for any occasion.', 75, 60, 20, '1773688189414-7637b9b138e1', 'button'],
    ],
  },
  coach: {
    name: 'Maya Glam', slug: 'mayaglam', specialty: 'Makeup artist', location: 'Marseille',
    bio: 'Bridal and event makeup that lasts all night.',
    avatar: '1594465919760-441fe5908ab0',
    services: [
      ['Event makeup', 'Full glam for parties, shoots and nights out.', 85, 75, 25, '1709477542149-f4e0e21d590b', 'callout'],
      ['Bridal trial', 'Test your wedding look and lock in every detail.', 120, 90, 40, '1512496015851-a90fb38ba796', 'callout'],
      ['Makeup lesson', 'Learn a quick everyday routine with your kit.', 70, 60, 20, '1596462502278-27bfdc403348', 'button'],
    ],
  },
};

export const TEMPLATE_DEMOS: Record<string, Omit<Merchant, 'theme_preset' | 'color_accent'>> = Object.fromEntries(
  Object.entries(PERSONAS).map(([id, p]) => [id, toMerchant(id, p)]),
);
