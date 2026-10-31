import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'best-instagram-bio-ideas-for-nail-techs',
  title: 'Best Instagram Bio Ideas for Nail Techs',
  seoTitle: 'Best Instagram Bio Ideas for Nail Techs (Copy & Paste)',
  excerpt: '30+ ready-to-use Instagram bio ideas for nail techs — from minimal to detailed, with tips on what every booking-focused bio needs to include.',
  seoDescription: '30+ Instagram bio ideas for nail techs you can copy and edit. What to include, what to avoid, and how to write a bio that converts profile visitors into bookings.',
  category: 'instagram-content',
  tags: ['Instagram bio', 'Instagram', 'nail tech branding', 'profile setup'],
  heroImage: 'linear-gradient(135deg, #F0FDFA 0%, #99F6E4 100%)',
  heroImageAlt: 'Best Instagram bio ideas for nail techs',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'what-every-bio-needs', label: 'What every nail tech bio needs' },
    { id: 'bio-templates', label: 'Ready-to-use bio templates' },
    { id: 'name-field', label: 'The Instagram name field' },
    { id: 'emojis', label: 'Using emojis in your bio' },
    { id: 'link-strategy', label: 'Your bio link strategy' },
    { id: 'examples-by-style', label: 'Bio examples by style' },
  ],
  relatedSlugs: ['how-to-grow-nail-tech-instagram', 'how-to-get-nail-clients-from-instagram', '100-nail-tech-content-ideas'],
  faq: [
    { q: 'How long should a nail tech\'s Instagram bio be?', a: 'Instagram gives you 150 characters. Most effective nail tech bios use 80–120 characters — enough for your location, what you do, and a booking CTA. Don\'t try to fill all 150 characters if the extra content isn\'t adding value.' },
    { q: 'Should I include my prices in my Instagram bio?', a: 'The bio isn\'t the right place for prices — too much text, too little space. Instead, note that prices are in a Highlight or on your booking page. "Prices in booking link" is enough.' },
    { q: 'Can I use a personal account or do I need a business account for my nail Instagram?', a: 'A professional/creator account is worth having — it gives you access to Instagram Insights (so you can see where your followers are located) and contact buttons. It\'s free to switch. You don\'t need a full "business" account; a creator account works fine.' },
  ],
  relatedFeatureSlugs: ['link-in-bio', 'instagram-autodm'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-every-bio-needs">
        <h2 className="font-serif text-2xl font-bold mb-4">What every nail tech bio needs</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A nail tech's Instagram bio has one job: tell a stranger who just landed on your profile who you are, where you are, and how to book. Everything else is secondary.</p>
        <ArticleTable
          headers={['Element', 'Example', 'Required?']}
          rows={[
            ['What you do', '"Nail tech" / "Nail artist"', 'Yes'],
            ['Where you\'re based', '"East London" / "Manchester"', 'Yes'],
            ['Booking CTA', '"Book via link below" / "DM to book"', 'Yes'],
            ['Speciality/style', '"Gel & nail art" / "Soft gel extensions"', 'Useful'],
            ['Availability signal', '"Now taking new clients"', 'Useful when true'],
            ['Social proof', '"200+ happy clients"', 'Optional'],
          ]}
        />
        <ArticleTip>The most important thing missing from most nail tech bios: the location. Without it, potential clients in your area can't tell if you're local to them.</ArticleTip>
      </section>

      <section id="bio-templates">
        <h2 className="font-serif text-2xl font-bold mb-4">Ready-to-use bio templates</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Copy any of these and edit for your location and style:</p>

        <div className="space-y-4">
          <ArticleCallout variant="info" title="Minimal + clean">
            Nail tech 💅 East London{'\n'}Gel sets | Nail art{'\n'}Book via link ↓
          </ArticleCallout>
          <ArticleCallout variant="info" title="Taking new clients">
            Nail artist | Manchester{'\n'}Now taking new clients ✨{'\n'}Soft gel extensions + custom nail art{'\n'}Book below ↓
          </ArticleCallout>
          <ArticleCallout variant="info" title="With speciality">
            Gel + acrylic nail tech 💅{'\n'}South London | Home studio{'\n'}Specialising in nail art & extensions{'\n'}DM or book via link below
          </ArticleCallout>
          <ArticleCallout variant="info" title="With social proof">
            Nail tech | Leeds{'\n'}500+ happy clients{'\n'}Gel nails, extensions, nail art{'\n'}Online booking: link below ↓
          </ArticleCallout>
          <ArticleCallout variant="info" title="New nail tech">
            Nail tech | Liverpool{'\n'}Just starting out — introductory rates available{'\n'}Gel & nail art{'\n'}Book via link below
          </ArticleCallout>
          <ArticleCallout variant="info" title="Premium positioning">
            Nail artist | West London{'\n'}Luxury gel sets & bespoke nail art{'\n'}By appointment only{'\n'}Book below ↓
          </ArticleCallout>
        </div>
      </section>

      <section id="name-field">
        <h2 className="font-serif text-2xl font-bold mb-4">The Instagram name field — don't waste it</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The name field (not your username) appears under your profile photo and is searchable on Instagram. Most nail techs just put their name — a missed opportunity.</p>
        <ArticleTable
          headers={['Name field example', 'Why it works']}
          rows={[
            ['"Sarah | Nail Tech London"', 'Appears in searches for nail tech London'],
            ['"Maya Nails | East London"', 'Brand name + location'],
            ['"Nail Tech Manchester | Gel & Art"', 'Category + location + speciality in one line'],
            ['"Amy | Nail Artist Brighton"', 'Personal + professional + location'],
          ]}
        />
      </section>

      <section id="emojis">
        <h2 className="font-serif text-2xl font-bold mb-4">Using emojis in your bio</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Emojis can make your bio more visually scannable and add personality — but use them to enhance clarity, not replace it. Most effective nail tech bio emojis:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>💅 — signals nails immediately, familiar shorthand</li>
          <li>📍 — used before your location</li>
          <li>✨ — enthusiasm, works for "Now taking bookings ✨"</li>
          <li>↓ — direction arrow pointing to your link</li>
          <li>📲 — used before booking instruction</li>
        </ul>
        <p className="text-gray-700 mt-4">Avoid rows of emojis without text — they don't convey information and look cluttered. One or two emojis per line is enough.</p>
      </section>

      <section id="link-strategy">
        <h2 className="font-serif text-2xl font-bold mb-4">Your bio link strategy</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The bio link should go directly to your booking page — not a Linktree with 10 options. Every extra click between "I want to book" and "booking confirmed" costs you clients.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">If you want to share multiple links (booking + portfolio + pricing), use a link-in-bio tool with the booking link at the top, first and most prominent. Or just use your booking page — it should contain your portfolio and pricing too.</p>
        <ArticleCallout variant="warning" title="The Linktree trap">
          A Linktree with 8 equally-weighted options makes clients decide what to click. Most click nothing. If you use a link tool, make "Book now" the first and most prominent option, visually distinct from the rest.
        </ArticleCallout>
      </section>

      <section id="examples-by-style">
        <h2 className="font-serif text-2xl font-bold mb-4">Bio examples by style</h2>
        <ArticleTable
          headers={['Style', 'Example bio']}
          rows={[
            ['Minimal', 'Nail tech | SE London\nGel nails & art\nBook ↓'],
            ['Warm and personal', 'Hi, I\'m Jade 💅 Nail tech in Bristol\nI love making people feel their best\nBook a slot via the link below'],
            ['Premium', 'Nail artist | Notting Hill\nBespoke gel sets & nail art\nBy appointment only → link below'],
            ['Growing nail tech', 'Nail tech | Sheffield 📍\nTaking new clients ✨\nGel extensions, nail art, pedicures\nOnline booking below ↓'],
            ['Nail art specialist', 'Nail artist | Glasgow\nCustom nail art & gel extensions\nEvery set is unique\nBook your design: link below'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">See also: <Link to="/learn/how-to-grow-nail-tech-instagram" className="underline text-[#F52B8C]">How to grow your nail tech Instagram</Link>.</p>
      </section>
    </div>
  ),
});
export {};
