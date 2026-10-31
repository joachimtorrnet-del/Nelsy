import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-run-nail-tech-popup-events',
  title: 'How to Run Nail Tech Pop-Up Events',
  seoTitle: 'How to Run a Nail Tech Pop-Up Event (Step-by-Step Guide)',
  excerpt: 'A well-run pop-up puts you in front of a room full of potential new clients in one afternoon. Here\'s how to plan, promote, and execute a nail tech pop-up that actually converts.',
  seoDescription: 'How to run a nail tech pop-up event. Planning, promotion, pricing, and converting pop-up clients into regular bookings — a practical guide for independent nail techs.',
  category: 'get-clients',
  tags: ['nail tech pop-up', 'nail pop-up event', 'nail tech event', 'nail business events'],
  heroImage: 'linear-gradient(135deg, #FFF0F6 0%, #FAD2E8 100%)',
  heroImageAlt: 'How to run a nail tech pop-up event',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'what-is-popup', label: 'What makes a good pop-up' },
    { id: 'types', label: 'Types of pop-up events' },
    { id: 'planning', label: 'Planning and logistics' },
    { id: 'pricing', label: 'Pop-up pricing' },
    { id: 'promotion', label: 'Promoting your pop-up' },
    { id: 'converting', label: 'Converting pop-up clients to regulars' },
  ],
  relatedSlugs: ['how-to-work-with-local-businesses-nail-tech', 'how-to-get-more-local-nail-clients', 'how-to-get-first-10-nail-clients', 'how-to-fill-nail-appointment-book'],
  faq: [
    { q: 'How much should I charge at a nail pop-up?', a: 'Pop-ups typically offer quick, simple services at accessible prices — nail polish application, simple gel polish, or nail art on existing nails rather than full extension sets. Pricing depends on your services and the event format, but quick-format services (express gel, nail art on 2 nails) allow more clients per hour. Set prices that make sense for your speed at a pop-up versus your regular appointment pricing.' },
    { q: 'What services work best at a pop-up?', a: 'Services that are fast, low-risk, and visually impressive work best. Nail art (on clients\' own nails), simple gel polish, chrome effects, nail wraps, and press-on sets are all popular pop-up formats. Full acrylic or extension sets are generally too slow for a pop-up context unless you\'re booking specific extended time slots.' },
    { q: 'Where can I host a nail pop-up?', a: 'Suitable venues: a hair salon (before/after hours or in quiet periods), a boutique clothing shop, a coffee shop (check they allow it), a market stall, a beauty studio, a gym changing room event, a wedding fair. The best venues are places where your target clients already go.' },
  ],
  relatedFeatureSlugs: ['bookings', 'payments', 'audience-capture'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-is-popup">
        <h2 className="font-serif text-2xl font-bold mb-4">What makes a good nail pop-up</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A nail pop-up is a temporary setup — in a boutique, at a market, at an event — where you offer nail services to walk-in or pre-booked clients. Done well, a pop-up delivers three things: immediate revenue, a room full of potential new regular clients, and content for your social media.</p>
        <p className="text-gray-700 leading-relaxed">The difference between a pop-up that converts and one that doesn't is how well you capture those clients' details and convert them into repeat bookings after the event. A pop-up is an acquisition channel — the goal isn't just the day's revenue, it's the long-term clients it generates.</p>
      </section>

      <section id="types">
        <h2 className="font-serif text-2xl font-bold mb-4">Types of pop-up events</h2>
        <ArticleTable
          headers={['Type', 'Format', 'Best for']}
          rows={[
            ['Market stall', 'Dedicated nail station at a craft market, farmers market, or artisan fair', 'High foot traffic; new client discovery in your area'],
            ['Brand collaboration', 'Nail pop-up at a boutique, coffee shop, or beauty brand launch', 'Shared audience with the hosting brand; premium positioning'],
            ['Salon guest spot', 'Set up at a hair or beauty salon for a day or week', 'Clients already in a beauty mindset; natural cross-referral context'],
            ['Corporate / office pop-up', 'On-site at an employer\'s office for employee wellbeing events', 'Higher volume; multiple clients in one location'],
            ['Wedding fair', 'Bridal nail demonstrations at a wedding exhibition', 'High-value bridal clients; premium booking potential'],
            ['Charity / community event', 'Nail services at a local fundraiser or community event', 'Community visibility; lower revenue but high goodwill and referrals'],
          ]}
        />
      </section>

      <section id="planning">
        <h2 className="font-serif text-2xl font-bold mb-4">Planning and logistics</h2>
        <ArticleChecklist items={[
          'Venue confirmed with clear terms (your space, power, tables, timing)',
          'Services and menu decided — keep it focused and fast',
          'Supplies packed: lighting, tools, colour range, sanitiser, disposables',
          'Client intake process planned: how will you collect names, emails, and consent?',
          'Booking system set up for pre-bookings vs walk-ins',
          'Social media promotion scheduled (at least 1 week out)',
          'Business cards and booking link QR code printed',
          'Portfolio photos or iPad to show clients your work',
        ]} />
        <ArticleTip>Bring a portable ring light — even at a well-lit venue, your own light gives you consistent content for your Instagram and makes the nail colour look better to clients choosing their shade.</ArticleTip>
      </section>

      <section id="pricing">
        <h2 className="font-serif text-2xl font-bold mb-4">Pop-up pricing</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Pop-up pricing should reflect the format — shorter services, faster turnover, sometimes with an introductory offer for first-time clients:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Price for your time — a 20-minute express gel should reflect 20 minutes of your hourly rate plus product cost</li>
          <li>An introductory discount for pop-up clients who book a full appointment works well — it drives trial without permanently discounting your work</li>
          <li>Don't undervalue your work to attract footfall. Pop-up clients who see a nail tech charging very low prices may expect the same rate as regulars.</li>
        </ul>
        <ArticleCallout variant="info" title="Introductory offer approach">
          "Pop-up special: express gel polish £25. Book a full appointment today and get £10 off your first full session." This drives footfall at the pop-up AND converts to a regular booking at full price.
        </ArticleCallout>
      </section>

      <section id="promotion">
        <h2 className="font-serif text-2xl font-bold mb-4">Promoting your pop-up</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Instagram Stories + feed post 7–10 days before: date, location, services, how to pre-book</li>
          <li>Instagram Stories countdown in the week before</li>
          <li>Story on the day of event (go live if you're comfortable)</li>
          <li>Ask the venue/host to promote it on their channels — their audience is your target audience</li>
          <li>Post content during the event: nails being done, the space, client reactions</li>
        </ul>
      </section>

      <section id="converting">
        <h2 className="font-serif text-2xl font-bold mb-4">Converting pop-up clients to regulars</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">This is the most important part. At the end of each service:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Ask every client to follow you on Instagram (show them your account)</li>
          <li>Offer them your booking link or QR code directly: "I do full appointments at [location] — here's how to book"</li>
          <li>If you collect emails: add them to your list (with consent) and send a follow-up within 48 hours</li>
          <li>Photograph their nails for your portfolio (with their permission)</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">For local partnerships that can host your pop-up: <Link to="/learn/how-to-work-with-local-businesses-nail-tech" className="underline text-[#F52B8C]">how to work with local businesses as a nail tech</Link>.</p>
      </section>
    </div>
  ),
});
export {};
