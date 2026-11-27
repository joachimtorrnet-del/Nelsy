import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleSteps, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

const link = 'underline text-[#F52B8C]';

registerArticle({
  slug: 'how-to-set-up-nail-tech-link-in-bio',
  title: 'How to Set Up a Nail Tech Link in Bio Page',
  coverTitle: 'Set Up Your Link in Bio',
  seoTitle: 'How to Set Up a Nail Tech Link in Bio Page',
  excerpt: 'Your link in bio is where followers become clients. Here\'s what to put on your nail tech link in bio page and how to set it up so it actually converts.',
  seoDescription: 'How to set up a nail tech link in bio page. What to include, which tools to use, how to structure it for bookings, and what to avoid on your nail tech link page.',
  category: 'instagram-content',
  audience: ['pros'],
  craft: 'nails',
  tags: ['nail tech link in bio', 'nail tech linktree', 'nail tech instagram bio', 'nail tech booking page'],
  heroImage: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
  heroImageAlt: 'How to set up a nail tech link in bio page',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  updatedAt: '2026-11-26',
  tldr: {
    answer: 'Set up your nail tech link in bio as a booking page first: a big "Book" button at the top, then services with prices, your location, your policy and a few photos, with no more than 3 to 5 other links.',
    detail: 'Every extra tap between your bio and a confirmed booking loses people. If your only goal is bookings, link straight to a page where clients can pick a service, see times and pay a deposit.',
    points: [
      { label: 'Top', text: 'Name, area and one "Book now" button.' },
      { label: 'Middle', text: 'Services with prices and durations, plus deposit and cancellation policy.' },
      { label: 'Bottom', text: 'Photos of your work, then a few optional links (gift cards, aftercare, contact).' },
    ],
  },
  toc: [
    { id: 'what-link-in-bio', label: 'What a link in bio page does' },
    { id: 'what-to-include', label: 'What to include on your page' },
    { id: 'setup-steps', label: 'Set it up in 6 steps' },
    { id: 'what-to-avoid', label: 'What to avoid' },
    { id: 'tools', label: 'Tools for building your page' },
    { id: 'optimising', label: 'Optimising for bookings' },
  ],
  relatedSlugs: ['nail-tech-call-to-action-examples', 'how-to-build-nail-tech-website', 'how-to-get-nail-clients-from-tiktok', 'nail-tech-content-calendar-30-day'],
  faq: [
    { q: 'Should I use a link in bio tool or my own website?', a: 'Use whatever gets a client from your bio to a confirmed booking in the fewest taps. If you already have a booking page, link straight to it. A separate link page only makes sense when you genuinely need several destinations, and then "Book" must still be the first and biggest button.' },
    { q: 'How often should I update my link in bio?', a: 'Keep booking, prices and contact permanent. Add time-limited links only while they are live (for example a Christmas gift card link in December) and remove them afterwards. Once a month, tap every link on your own phone to check nothing is broken.' },
    { q: 'Does having too many links in my bio hurt conversions?', a: 'It can. Each extra link adds a decision, and visitors who are unsure often leave. Keep it to 3 to 5 links besides booking, check which ones get taps, and remove any that nobody uses.' },
    { q: 'Should my link in bio show prices?', a: 'Yes. Clients who see prices before booking self-select, which means fewer "how much?" DMs and fewer surprises at the appointment. Show a fixed price for standard services and "from" prices only where the final price genuinely varies, like nail art.' },
  ],
  relatedFeatureSlugs: ['link-in-bio', 'bookings', 'instagram-autodm'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-link-in-bio">
        <h2 className="font-serif text-2xl font-bold mb-4">What a link in bio page does</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Your Instagram or TikTok bio has one main clickable link. When you tell followers to &quot;check the link in bio&quot;, that page is where they decide whether to book.</p>
        <p className="text-gray-700 leading-relaxed">It is the bridge between your content and your diary. Keep it simple, fast, and focused on one outcome: a confirmed booking.</p>
      </section>

      <section id="what-to-include">
        <h2 className="font-serif text-2xl font-bold mb-4">What to include on your page</h2>
        <ArticleTable
          headers={['Element', 'Purpose', 'Priority']}
          rows={[
            ['Booking button', 'Opens your services, live times and deposit payment', 'Essential: always first'],
            ['Services and prices', 'New clients can check fit before booking', 'High: cuts back-and-forth'],
            ['Location / area', 'Home studio, salon or mobile, and which area', 'High: saves wasted enquiries'],
            ['Deposit and cancellation policy', 'Clients agree before they pay', 'High'],
            ['Photos of your work', 'Reassures people who arrived from a single post', 'Useful'],
            ['Contact / DM prompt', 'For questions the page doesn\'t answer', 'Useful'],
            ['Gift cards, aftercare guide', 'Extra revenue and fewer repeat questions', 'Nice to have'],
          ]}
        />
        <ArticleTip>Make the booking button the most visible thing on the page: first position, bigger, in your brand colour. Don&apos;t bury it under five other links.</ArticleTip>
      </section>

      <section id="setup-steps">
        <h2 className="font-serif text-2xl font-bold mb-4">Set it up in 6 steps</h2>
        <ArticleSteps
          steps={[
            { title: 'Write your header', body: '"[Name] | Nail tech in [area]" plus one line on your speciality, for example "Builder gel and soft nail art, home studio".' },
            { title: 'Add your services', body: 'Name, what is included, duration and price for each. Put add-ons (nail art, chrome, removal) on their own lines.' },
            { title: 'Choose a payment rule per service', body: 'Pay on arrival for quick services, a deposit for full sets, full payment upfront for long or bridal slots.' },
            { title: 'Set your availability', body: 'Working days, hours and a 10 to 15 minute buffer between clients so nobody can book into your clean-up time.' },
            { title: 'Paste your policy', body: 'Short version of your deposit and cancellation policy, shown before payment. Generate one with the cancellation policy generator.' },
            { title: 'Test it on your phone', body: 'Tap the link from your own Instagram profile and make a test booking. Count the taps and fix anything confusing.' },
          ]}
        />
        <p className="text-gray-700 leading-relaxed">Policy wording: <Link to="/tools/nail-tech-cancellation-policy-generator" className={link}>cancellation policy generator</Link>. To see a finished page, open the <Link to="/demo" className={link}>demo booking page</Link>.</p>
      </section>

      <section id="what-to-avoid">
        <h2 className="font-serif text-2xl font-bold mb-4">What to avoid</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Too many links:</strong> more than 5 or 6 makes people hesitate.</li>
          <li><strong>Stale links:</strong> old promotions, services you no longer offer, or broken pages undermine trust.</li>
          <li><strong>Hard to use on a phone:</strong> almost everyone arriving from Instagram or TikTok is on a phone, so buttons must be easy to tap.</li>
          <li><strong>No personality:</strong> the page should look like you: your name, photos and colours.</li>
          <li><strong>No location:</strong> clients need to know where you are before they book.</li>
          <li><strong>&quot;DM to book&quot; as the only option:</strong> it works only while you are free to reply.</li>
        </ul>
      </section>

      <section id="tools">
        <h2 className="font-serif text-2xl font-bold mb-4">Tools for building your page</h2>
        <ArticleTable
          headers={['Option', 'Good for', 'Watch out for']}
          rows={[
            ['General link-in-bio tool', 'Listing several links on one page', 'Booking is one more tap away, and payments usually happen elsewhere'],
            ['Your booking software\'s profile page', 'Booking, prices and policy in one place', 'Check how it looks inside the Instagram in-app browser'],
            ['A page on your own website', 'Full control over design', 'You still need a booking system behind it'],
          ]}
        />
        <p className="text-gray-700 mb-4 leading-relaxed">Nelsy combines the link-in-bio page and the booking system, takes 0% commission on your bookings, and lets you set a payment rule per service.</p>
        <ArticleCallout variant="info" title="No tool needed if you have one booking link">
          If your only goal is bookings, link straight to your booking page. A separate link page makes sense only when you genuinely need several destinations.
        </ArticleCallout>
      </section>

      <section id="optimising">
        <h2 className="font-serif text-2xl font-bold mb-4">Optimising for bookings</h2>
        <ArticleChecklist
          title="Quick wins"
          items={[
            'Action button text: "Book your appointment", not just "Booking"',
            'Real availability context: "Spaces open for [month]" when it is true',
            'Name and area at the top so visitors know you are local',
            'Bio line pointing to the link: "Book in 2 min ↓"',
            'Page opens fast on mobile data, tested on your own phone',
          ]}
        />
        <ArticleCallout variant="info" title="Example: measure your page">
          Example: in one month, 200 people tap your bio link and 16 book. Conversion = 16 ÷ 200 = 8%. Change one thing (for example, move prices above photos), wait a month, and compare. If 20 of 200 book next month, that is 10%, and the change stays.
        </ArticleCallout>
        <p className="text-gray-700 leading-relaxed">For captions that drive taps: <Link to="/blog/nail-tech-call-to-action-examples" className={link}>nail tech call-to-action examples</Link>.</p>
      </section>
    </div>
  ),
});
export {};
