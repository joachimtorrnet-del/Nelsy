import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleChecklist, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'what-should-nail-tech-booking-page-include',
  title: 'What Should a Nail Tech Booking Page Include?',
  seoTitle: 'What Should a Nail Tech Booking Page Include?',
  excerpt: 'Everything a client needs to see before booking — and the things nail techs most often forget to include on their booking pages.',
  seoDescription: 'What to include on your nail tech booking page: services, pricing, deposit info, cancellation policy, location, and what makes clients actually book.',
  category: 'booking-software',
  tags: ['booking page', 'nail tech setup', 'online booking', 'client experience'],
  heroImage: 'linear-gradient(135deg, #F0FDF4 0%, #BBF7D0 100%)',
  heroImageAlt: 'What to include on a nail tech booking page',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'essentials', label: 'The essential elements' },
    { id: 'service-menu', label: 'Your service menu' },
    { id: 'deposit-policy', label: 'Deposit and payment info' },
    { id: 'location', label: 'Location and access info' },
    { id: 'cancellation', label: 'Cancellation policy' },
    { id: 'photos', label: 'Photos and portfolio' },
    { id: 'what-to-leave-out', label: 'What to leave out' },
  ],
  relatedSlugs: ['how-to-move-from-instagram-dms-to-online-booking', 'best-booking-apps-for-nail-techs-2026', 'nail-tech-no-show-policy-examples'],
  faq: [
    { q: 'Should I list prices on my booking page?', a: 'Yes. Hiding prices creates friction and distrust. Clients who don\'t know your price often assume the worst. Listing prices upfront filters out clients who can\'t afford your services (saving you both time) and attracts clients who are comfortable with your rates.' },
    { q: 'Do I need a photo on my booking page?', a: 'A photo of your work is strongly recommended. Clients booking nails want to see what they\'re getting. Even one or two high-quality nail photos significantly improve booking conversion. A photo of you is a bonus — it adds trust, especially for clients booking for the first time.' },
    { q: 'How detailed should service descriptions be?', a: 'Detailed enough to answer the most common pre-booking questions. For each service: what\'s included, approximately how long it takes, what preparation the client needs to do (if any), and what the end result looks like. Avoid jargon that clients might not know — "gel overlay" is clear; technical terms for specific nail techniques may not be.' },
  ],
  relatedFeatureSlugs: ['bookings', 'deposits', 'payments'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="essentials">
        <h2 className="font-serif text-2xl font-bold mb-4">The essential elements</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Your booking page has one job: convince a potential client to book with you and make that booking as easy as possible. Everything on the page should serve one of those two goals.</p>
        <ArticleChecklist title="Booking page essentials" items={[
          'Your name / business name',
          'A brief description of what you offer and where you\'re based',
          'Full service menu with prices and durations',
          'Deposit amount and what it covers',
          'Your location (city / area — full address can come in confirmation)',
          'Your cancellation policy and notice period',
          'Photos of your work',
          'How to contact you if clients have questions',
        ]} />
        <ArticleTip>The most common mistake on nail tech booking pages is being vague about pricing. If a client can't see your prices, they either assume they can't afford you or click away to find a nail tech who's more transparent.</ArticleTip>
      </section>

      <section id="service-menu">
        <h2 className="font-serif text-2xl font-bold mb-4">Your service menu</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A good service menu answers every question a client might have before they decide to book. For each service:</p>
        <ArticleTable
          headers={['Field', 'Example', 'Why it matters']}
          rows={[
            ['Service name', 'Gel full set', 'Clients recognise what they\'re booking'],
            ['Price', '£50', 'Eliminates the "how much do you charge?" DM'],
            ['Duration', '90 minutes', 'Clients know when to clear their schedule'],
            ['Description', '1–2 sentences on what\'s included', 'Manages expectations, reduces pre-booking questions'],
            ['Add-ons', 'Nail art from £5 per nail', 'Lets clients customise without a separate DM'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">Group services logically (e.g. Sets / Infills / Pedicures) rather than listing them alphabetically or in the order you thought of them. Clients should be able to find what they want in one scan.</p>
      </section>

      <section id="deposit-policy">
        <h2 className="font-serif text-2xl font-bold mb-4">Deposit and payment info</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Be upfront about deposits. Don't hide the deposit requirement at the end of the booking flow — state it clearly at the start. Clients who are surprised by a deposit at checkout are more likely to abandon the booking than clients who knew it was coming.</p>
        <ArticleCallout variant="info" title="What to include about deposits">
          <ul className="space-y-1 list-disc list-inside text-sm">
            <li>The deposit amount or percentage</li>
            <li>That it's deducted from the final price (not an additional charge)</li>
            <li>Whether it's refundable and under what conditions</li>
            <li>What payment methods you accept</li>
          </ul>
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">For a full deposit strategy guide: <Link to="/nail-tech-deposits" className="underline text-[#F52B8C]">How to take deposits as a nail tech</Link>.</p>
      </section>

      <section id="location">
        <h2 className="font-serif text-2xl font-bold mb-4">Location and access info</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">You don't need to put your full address on a public booking page — especially if you work from home. What clients need to know at booking time:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>The area or neighbourhood you're based in (e.g. "East London, E3")</li>
          <li>Whether there's parking or which tube/train station is closest</li>
          <li>Whether you're home-based, in a salon, or mobile</li>
          <li>Full address can come in the confirmation message after booking</li>
        </ul>
        <ArticleTip>If you work from home and prefer not to share your address publicly, put "Home studio — East London" on the booking page and include the full address in the booking confirmation message.</ArticleTip>
      </section>

      <section id="cancellation">
        <h2 className="font-serif text-2xl font-bold mb-4">Cancellation policy</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Your cancellation policy should be visible before booking, not just in the confirmation email. Clients who know the policy upfront are less likely to dispute it later. Include:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>How much notice is required to cancel or reschedule without losing the deposit</li>
          <li>What happens to the deposit if they cancel within the notice period</li>
          <li>What happens for no-shows</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">For policy templates and examples: <Link to="/learn/nail-tech-no-show-policy-examples" className="underline text-[#F52B8C]">Nail tech no-show policy examples</Link>.</p>
      </section>

      <section id="photos">
        <h2 className="font-serif text-2xl font-bold mb-4">Photos and portfolio</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Clients book nail services based on what they see. A booking page with no photos converts significantly worse than one with even 3–4 good photos of your work. You don't need a professional shoot — clean, well-lit photos of recent sets you're proud of are enough.</p>
        <ArticleTable
          headers={['Photo type', 'Effectiveness']}
          rows={[
            ['Recent nail sets (close-up)', 'High — shows clients what to expect'],
            ['Nail art you\'re proud of', 'High — attracts clients who want similar work'],
            ['Photo of you working', 'Medium — adds trust and personality'],
            ['Before/after', 'High — shows skill and transformation'],
          ]}
        />
      </section>

      <section id="what-to-leave-out">
        <h2 className="font-serif text-2xl font-bold mb-4">What to leave out</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Booking pages that convert well are focused. Things that clutter a booking page without adding value:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Long personal bios (put this on Instagram)</li>
          <li>Excessive rules and warnings before clients have even booked</li>
          <li>Services you no longer offer</li>
          <li>Overly complex add-on structures that require reading a guide</li>
          <li>Multiple ways to book (if you're directing to the booking page, remove the DM alternative)</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
