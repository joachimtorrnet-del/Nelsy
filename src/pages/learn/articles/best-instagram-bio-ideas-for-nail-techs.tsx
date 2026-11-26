import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleSteps, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

const link = 'underline text-[#F52B8C]';

function Bio({ title, lines }: { title: string; lines: string[] }) {
  return (
    <ArticleCallout variant="info" title={title}>
      {lines.map((l, i) => (
        <span key={i}>
          {l}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </ArticleCallout>
  );
}

registerArticle({
  slug: 'best-instagram-bio-ideas-for-nail-techs',
  title: 'Best Instagram Bio Ideas for Nail Techs',
  seoTitle: "30+ Instagram Bio Ideas for Nail Techs (Copy & Paste)",
  excerpt: '30+ ready-to-use Instagram bio ideas for nail techs, from minimal to detailed, with tips on what every booking-focused bio needs to include.',
  seoDescription: "Instagram bio ideas for nail techs and nail artists you can copy: examples by style, what to include, and how to turn your bio into bookings.",
  category: 'instagram-content',
  tags: ['Instagram bio', 'Instagram', 'nail tech branding', 'profile setup'],
  heroImage: 'linear-gradient(135deg, #F0FDFA 0%, #99F6E4 100%)',
  heroImageAlt: 'Best Instagram bio ideas for nail techs',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  updatedAt: '2026-11-26',
  publishedAt: '2026-10-20',
  tldr: {
    answer: 'A nail tech Instagram bio should say what you do, where you are, and how to book, in that order, with your booking link right below.',
    detail: 'You have 150 characters. Use them for service, location and one booking instruction, and put your city in the name field so local clients can find you in search.',
    points: [
      { label: 'Line 1', text: 'What you do and your speciality: "Gel nail tech | Soft gel extensions".' },
      { label: 'Line 2', text: 'Where you are: "📍 East London, home studio".' },
      { label: 'Line 3', text: 'One booking action: "Book in 2 min ↓" pointing to a link that opens your booking page.' },
    ],
  },
  toc: [
    { id: 'what-every-bio-needs', label: 'What every nail tech bio needs' },
    { id: 'write-yours', label: 'Write your bio in 4 steps' },
    { id: 'bio-templates', label: 'Ready-to-use bio templates' },
    { id: 'name-field', label: 'The Instagram name field' },
    { id: 'emojis', label: 'Using emojis in your bio' },
    { id: 'link-strategy', label: 'Your bio link strategy' },
    { id: 'examples-by-style', label: 'Bio examples by style' },
  ],
  relatedSlugs: ['how-to-grow-nail-tech-instagram', 'how-to-get-nail-clients-from-instagram', '100-nail-tech-content-ideas'],
  faq: [
    { q: 'How long should a nail tech\'s Instagram bio be?', a: 'Instagram allows 150 characters. You rarely need all of them: three short lines covering service, location and a booking instruction usually fit in around 80 to 120 characters. If a word doesn\'t help a stranger decide to book, cut it.' },
    { q: 'Should I include my prices in my Instagram bio?', a: 'Usually not. There is too little space and prices change. Put prices on your booking page and in a "Prices" Highlight, then write "Prices + booking ↓" in the bio. The exception: a single starting price can work as a filter, for example "Gel sets from £35".' },
    { q: 'Do I need a business account for my nail Instagram?', a: 'Switch to a professional account (business or creator). It is free and gives you Insights, such as where your followers are located, plus contact buttons. Either professional type works for a nail tech.' },
    { q: 'Should my username and name field be different?', a: 'Yes, use them for different jobs. The username is your brand handle (for example @mayanails.ldn). The name field is searchable, so use it for keywords: "Maya | Nail Tech East London".' },
  ],
  relatedFeatureSlugs: ['link-in-bio', 'instagram-autodm'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-every-bio-needs">
        <h2 className="font-serif text-2xl font-bold mb-4">What every nail tech bio needs</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A nail tech&apos;s Instagram bio has one job: tell a stranger who just landed on your profile who you are, where you are, and how to book. Everything else is secondary.</p>
        <ArticleTable
          headers={['Element', 'Example', 'Required?']}
          rows={[
            ['What you do', '"Nail tech" / "Nail artist"', 'Yes'],
            ['Where you\'re based', '"East London" / "Manchester"', 'Yes'],
            ['Booking CTA', '"Book via link below" / "DM to book"', 'Yes'],
            ['Speciality/style', '"Gel & nail art" / "Soft gel extensions"', 'Useful'],
            ['Availability signal', '"Now taking new clients"', 'Useful when true'],
            ['Social proof', '"[number]+ five-star reviews"', 'Optional, only if true'],
          ]}
        />
        <ArticleTip>The thing most often missing from nail tech bios is the location. Without it, potential clients can&apos;t tell if you&apos;re local to them, and they won&apos;t DM to ask.</ArticleTip>
      </section>

      <section id="write-yours">
        <h2 className="font-serif text-2xl font-bold mb-4">Write your bio in 4 steps</h2>
        <ArticleSteps
          steps={[
            { title: 'Pick your main service', body: 'The one you want more of, not everything you offer. "Builder gel" or "Gel-X and nail art".' },
            { title: 'Add your location', body: 'City plus area if you are in a big city: "📍 Leeds, Headingley". Add "home studio" or "mobile" if relevant.' },
            { title: 'Write one booking line', body: 'One action, not three. "Book in 2 min ↓" or "DM BOOK for availability".' },
            { title: 'Count the characters', body: 'Paste it into your notes app, check it is under 150 characters and reads in 3 seconds.' },
          ]}
        />
        <ArticleCallout variant="info" title="Example: a bio built in 4 steps">
          Builder gel + nail art 💅 (24 characters)<br />
          📍 Leeds, home studio (20 characters)<br />
          Taking new clients. Book in 2 min ↓ (35 characters)<br />
          <br />
          Total: about 79 characters plus line breaks, well under the 150 limit.
        </ArticleCallout>
      </section>

      <section id="bio-templates">
        <h2 className="font-serif text-2xl font-bold mb-4">Ready-to-use bio templates</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Copy any of these and edit for your location and style:</p>
        <div className="space-y-4">
          <Bio title="Minimal + clean" lines={['Nail tech 💅 East London', 'Gel sets | Nail art', 'Book via link ↓']} />
          <Bio title="Taking new clients" lines={['Nail artist | Manchester', 'Now taking new clients ✨', 'Soft gel extensions + custom nail art', 'Book below ↓']} />
          <Bio title="With speciality" lines={['Gel + acrylic nail tech 💅', 'South London | Home studio', 'Specialising in nail art & extensions', 'DM or book via link below']} />
          <Bio title="With social proof" lines={['Nail tech | Leeds', '[number]+ five-star reviews', 'Gel nails, extensions, nail art', 'Online booking: link below ↓']} />
          <Bio title="New nail tech" lines={['Nail tech | Liverpool', 'Newly qualified, building my portfolio', 'Gel & nail art', 'Book via link below']} />
          <Bio title="Premium positioning" lines={['Nail artist | West London', 'Luxury gel sets & bespoke nail art', 'By appointment only', 'Book below ↓']} />
          <Bio title="Mobile nail tech" lines={['Mobile nail tech 🚗 Birmingham + 10 miles', 'Gel, BIAB, bridal parties', 'I come to you. Book ↓']} />
          <Bio title="Deposit-friendly" lines={['Nail tech | Bristol 📍', 'Gel-X & chrome', 'Deposit secures your slot', 'Book + pay deposit ↓']} />
        </div>
      </section>

      <section id="name-field">
        <h2 className="font-serif text-2xl font-bold mb-4">The Instagram name field: don&apos;t waste it</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The name field (not your username) appears under your profile photo and is searchable on Instagram. Most nail techs just put their name, which is a missed opportunity.</p>
        <ArticleTable
          headers={['Name field example', 'Why it works']}
          rows={[
            ['"Sarah | Nail Tech London"', 'Can appear in searches for nail tech London'],
            ['"Maya Nails | East London"', 'Brand name + location'],
            ['"Nail Tech Manchester | Gel & Art"', 'Category + location + speciality in one line'],
            ['"Amy | Nail Artist Brighton"', 'Personal + professional + location'],
          ]}
        />
      </section>

      <section id="emojis">
        <h2 className="font-serif text-2xl font-bold mb-4">Using emojis in your bio</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Emojis make your bio easier to scan, but use them to support clarity, not replace it. The most useful ones for nail techs:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>💅 signals nails immediately</li>
          <li>📍 goes before your location</li>
          <li>✨ for news, like &quot;Now taking bookings ✨&quot;</li>
          <li>↓ points to your link</li>
          <li>📲 goes before a booking instruction</li>
        </ul>
        <p className="text-gray-700 mt-4">Avoid rows of emojis without text: they don&apos;t convey information and look cluttered. One emoji per line is enough.</p>
      </section>

      <section id="link-strategy">
        <h2 className="font-serif text-2xl font-bold mb-4">Your bio link strategy</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The bio link should go straight to a page where clients can book, not to a list of 10 equal options. Every extra tap between &quot;I want to book&quot; and &quot;booking confirmed&quot; loses some people.</p>
        <ArticleCallout variant="info" title="Example: why taps matter">
          Example: 100 people tap your bio link. If each extra step loses a fifth of them, a direct booking page leaves you with 80 people choosing a slot. A link list, then a DM, then a reply about availability adds two more steps: 100 × 0.8 × 0.8 × 0.8 = about 51 people. The numbers are illustrative; the pattern is the point.
        </ArticleCallout>
        <ArticleChecklist
          title="Your bio link page should show"
          items={['A "Book" button first and most visible', 'Services with prices and durations', 'Live availability', 'Your deposit or cancellation policy', 'A few photos of your work']}
        />
        <p className="text-gray-700 leading-relaxed">Step-by-step setup: <Link to="/blog/how-to-set-up-nail-tech-link-in-bio" className={link}>how to set up a nail tech link in bio</Link>.</p>
      </section>

      <section id="examples-by-style">
        <h2 className="font-serif text-2xl font-bold mb-4">Bio examples by style</h2>
        <ArticleTable
          headers={['Style', 'Example bio']}
          rows={[
            ['Minimal', 'Nail tech | SE London · Gel nails & art · Book ↓'],
            ['Warm and personal', 'Hi, I\'m Jade 💅 Nail tech in Bristol · I love making people feel their best · Book a slot via the link below'],
            ['Premium', 'Nail artist | Notting Hill · Bespoke gel sets & nail art · By appointment only → link below'],
            ['Growing nail tech', 'Nail tech | Sheffield 📍 · Taking new clients ✨ · Gel extensions, nail art, pedicures · Online booking below ↓'],
            ['Nail art specialist', 'Nail artist | Glasgow · Custom nail art & gel extensions · Every set is unique · Book your design: link below'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">The dots show where each line break goes. See also: <Link to="/blog/how-to-grow-nail-tech-instagram" className={link}>how to grow your nail tech Instagram</Link>.</p>
      </section>
    </div>
  ),
});
export {};
