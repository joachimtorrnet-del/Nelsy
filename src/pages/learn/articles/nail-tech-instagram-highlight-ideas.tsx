import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-instagram-highlight-ideas',
  title: 'Nail Tech Instagram Highlight Ideas (That Actually Get Bookings)',
  seoTitle: 'Nail Tech Instagram Highlight Ideas That Get Bookings',
  excerpt: 'Instagram Highlights are the first thing a potential client checks before booking. Here\'s exactly what to include, what to name them, and how to make them work for you.',
  seoDescription: 'Nail tech Instagram highlight ideas. Which highlights to create, what to put in each one, and how to use them to turn profile visitors into booked clients.',
  category: 'instagram-content',
  tags: ['instagram highlights', 'nail tech instagram', 'instagram strategy', 'nail tech social media'],
  heroImage: 'linear-gradient(135deg, #FFF0F9 0%, #FBCFE8 100%)',
  heroImageAlt: 'Nail tech Instagram highlight ideas',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'why-highlights-matter', label: 'Why Highlights convert visitors to bookings' },
    { id: 'essential-highlights', label: 'Essential Highlights for nail techs' },
    { id: 'what-to-put-in-each', label: 'What to put in each Highlight' },
    { id: 'optional-highlights', label: 'Optional Highlights to consider' },
    { id: 'covers', label: 'Highlight covers: what actually works' },
  ],
  relatedSlugs: ['how-to-get-nail-clients-from-instagram', 'best-instagram-bio-ideas-for-nail-techs', 'nail-tech-story-ideas-that-get-clients-to-book'],
  faq: [
    { q: 'How many Instagram Highlights should a nail tech have?', a: '4–6 is the sweet spot. Fewer than 4 and you\'re leaving useful client information out; more than 8 and the row looks overwhelming and most get ignored. Prioritise the ones a potential client needs before deciding to book.' },
    { q: 'Do Instagram Highlights need to be updated regularly?', a: 'The "Work" and "Reviews" Highlights benefit from regular refreshes with recent content. The "Booking Info" and "Prices" Highlights need updating only when those things change. "FAQ" and "About" rarely need updates. At minimum, check everything quarterly.' },
    { q: 'What should nail tech Highlight covers look like?', a: 'Simple, readable icons or initials in your brand colours on a consistent background. Avoid highly detailed graphics — they\'re hard to read at the small Highlight circle size. Canva has ready-made Highlight cover templates. Matching covers make your profile look more polished than a random mix of story screenshots.' },
  ],
  relatedFeatureSlugs: ['link-in-bio', 'instagram-autodm'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-highlights-matter">
        <h2 className="font-serif text-2xl font-bold mb-4">Why Highlights convert visitors to bookings</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">When someone discovers your Instagram through a Reel, a tag, or a search, they visit your profile for about 30 seconds. They look at your bio, scan a few posts, and — if they're seriously considering booking — they tap on your Highlights. Highlights answer the questions every potential client has before they commit: <em>What does your work look like? How much does it cost? How do I book? What are the rules?</em></p>
        <p className="text-gray-700 leading-relaxed">A nail tech with clear, well-organised Highlights removes friction from the decision to book. A nail tech with no Highlights (or outdated ones) pushes clients toward the DMs with questions that could have been answered immediately.</p>
      </section>

      <section id="essential-highlights">
        <h2 className="font-serif text-2xl font-bold mb-4">Essential Highlights for nail techs</h2>
        <ArticleTable
          headers={['Highlight name', 'Purpose', 'Priority']}
          rows={[
            ['Work / Portfolio', 'Show your best work — the range of styles, colours, and techniques you offer', 'Must-have'],
            ['Prices / Menu', 'Service list and prices — stops price enquiry DMs and pre-qualifies clients', 'Must-have'],
            ['How to Book', 'Step-by-step booking instructions, link to your booking page', 'Must-have'],
            ['Policies', 'Deposit, cancellation, late policy — sets expectations before booking', 'Strongly recommended'],
            ['Reviews', 'Client messages, before/afters with captions, 5-star feedback', 'Strongly recommended'],
            ['About / Meet Me', 'Who you are, your training, your style, your location', 'Recommended'],
            ['FAQ', 'Answers to your most common DM questions', 'Optional'],
          ]}
        />
      </section>

      <section id="what-to-put-in-each">
        <h2 className="font-serif text-2xl font-bold mb-4">What to put in each Highlight</h2>

        <h3 className="font-semibold text-lg mb-2">Work / Portfolio</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
          <li>Your 10–20 best photos, rotated with recent work</li>
          <li>Show range: short/long, simple/detailed, different colour families</li>
          <li>Lead with your strongest piece — it's the first slide people see</li>
          <li>Add a slide occasionally: "DM 'BOOK' to get a slot" or "Link in bio to book"</li>
        </ul>

        <h3 className="font-semibold text-lg mb-2">Prices / Menu</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
          <li>One slide per service or per category (gel nails / nail art / removal)</li>
          <li>Include time as well as price: "Gel manicure — 45 min — £35"</li>
          <li>End with your booking link slide: "Ready to book? Link in bio"</li>
          <li>Update when prices change</li>
        </ul>

        <h3 className="font-semibold text-lg mb-2">How to Book</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
          <li>Slide 1: "Ready to book?"</li>
          <li>Slide 2: "Click the link in my bio"</li>
          <li>Slide 3: "Choose your service and date"</li>
          <li>Slide 4: "Pay your deposit to confirm — see you there!"</li>
          <li>Optional: add a slide showing a screenshot of your booking page</li>
        </ul>

        <h3 className="font-semibold text-lg mb-2">Policies</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700 mb-4">
          <li>Keep it brief: one slide per policy section (deposits, cancellations, lateness)</li>
          <li>Don't use legal language — write it the way you'd explain it to a friend</li>
          <li>End with: "These policies help me give every client the best possible service"</li>
        </ul>

        <h3 className="font-semibold text-lg mb-2">Reviews</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Screenshots of DM feedback, text message reviews, Google reviews</li>
          <li>Before/after photos with a caption about the client's experience</li>
          <li>Keep recent — add new reviews as they arrive</li>
          <li>A mix of short ("she's amazinggg") and detailed reviews works well</li>
        </ul>

        <ArticleTip>Screenshot client DMs immediately when they say something positive — you'll have a review bank to pull from without needing to chase clients for testimonials.</ArticleTip>
      </section>

      <section id="optional-highlights">
        <h2 className="font-serif text-2xl font-bold mb-4">Optional Highlights to consider</h2>
        <ArticleTable
          headers={['Highlight', 'What\'s in it', 'Good for']}
          rows={[
            ['Inspo / Trends', 'Nail designs you offer or love — client mood board input', 'Nail techs who do lots of bespoke art'],
            ['Products', 'Brands and products you use — builds trust and transparency', 'Premium-positioned nail techs'],
            ['Training / Certs', 'Your qualifications, courses, accreditations', 'Newer nail techs building credibility'],
            ['Availability', 'Current slots / waitlist info', 'Very booked nail techs; update frequently or remove'],
            ['Behind the Scenes', 'Prep, product unboxing, day-in-the-life clips', 'Personality-led brands'],
          ]}
        />
      </section>

      <section id="covers">
        <h2 className="font-serif text-2xl font-bold mb-4">Highlight covers: what actually works</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">At 55px diameter, Highlight covers are tiny. What reads at thumbnail size:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Single word labels</strong> in a readable font (Work, Book, Prices, FAQ)</li>
          <li><strong>Simple icons</strong> (calendar, star, speech bubble, price tag)</li>
          <li><strong>Initials</strong> of the Highlight name (W for Work, P for Prices)</li>
          <li><strong>Consistent background colour</strong> from your brand palette — the consistency matters more than any individual design</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">Detailed illustrations, complex graphics, and multi-colour designs are invisible at this size. Create covers in Canva using the "Instagram Story" format (1080×1920), design centrally, then the small circle crop will catch the right part. For more Instagram bio and profile advice: <Link to="/learn/best-instagram-bio-ideas-for-nail-techs" className="underline text-[#F52B8C]">best Instagram bio ideas for nail techs</Link>.</p>
      </section>
    </div>
  ),
});
export {};
