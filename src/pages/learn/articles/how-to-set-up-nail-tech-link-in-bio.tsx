import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-set-up-nail-tech-link-in-bio',
  title: 'How to Set Up a Nail Tech Link in Bio Page',
  seoTitle: 'How to Set Up a Nail Tech Link in Bio Page',
  excerpt: 'Your link in bio is where followers become clients. Here\'s what to put on your nail tech link in bio page and how to set it up so it actually converts.',
  seoDescription: 'How to set up a nail tech link in bio page. What to include, which tools to use, how to structure it for bookings, and what to avoid on your nail tech link page.',
  category: 'instagram-content',
  tags: ['nail tech link in bio', 'nail tech linktree', 'nail tech instagram bio', 'nail tech booking page'],
  heroImage: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
  heroImageAlt: 'How to set up a nail tech link in bio page',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'what-link-in-bio', label: 'What a link in bio page does' },
    { id: 'what-to-include', label: 'What to include on your page' },
    { id: 'what-to-avoid', label: 'What to avoid' },
    { id: 'tools', label: 'Tools for building your page' },
    { id: 'optimising', label: 'Optimising for bookings' },
  ],
  relatedSlugs: ['nail-tech-call-to-action-examples', 'how-to-build-nail-tech-website', 'how-to-get-nail-clients-from-tiktok', 'nail-tech-content-calendar-30-day'],
  faq: [
    { q: 'Should I use a link in bio tool or my own website?', a: 'If you have a booking website already, link directly to your booking page — that\'s the most efficient path. A link in bio tool is useful when you want to link to multiple destinations (booking, price list, Instagram portfolio, testimonials) rather than just one. Some nail techs use a link in bio as a lightweight "hub" page when they don\'t have a full website.' },
    { q: 'How often should I update my link in bio?', a: 'Keep the core links permanent — booking, prices, contact. Update seasonal or time-limited links when they\'re relevant (e.g., a Christmas availability link, a new service announcement). Review it every few months to remove stale links and make sure everything still works.' },
    { q: 'Does having too many links in my bio hurt conversions?', a: 'Yes. Each additional link adds a decision. Clients who land on a page with 10 links often don\'t know which one to pick and leave. Keep your primary page to 3–5 links maximum, with your booking link first and most prominent. Everything else should serve a purpose — remove it if it\'s not getting clicks.' },
  ],
  relatedFeatureSlugs: ['link-in-bio', 'bookings', 'instagram-autodm'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-link-in-bio">
        <h2 className="font-serif text-2xl font-bold mb-4">What a link in bio page does</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Instagram allows one clickable link in your profile bio. Most nail techs who tell followers to "check the link in bio" send them to a simple page that links to multiple destinations — booking, price list, portfolio, contact.</p>
        <p className="text-gray-700 leading-relaxed">The link in bio page is a bridge between your Instagram presence and your booking system. It's the last step before someone becomes a client — keep it simple, fast, and focused on making that booking happen.</p>
      </section>

      <section id="what-to-include">
        <h2 className="font-serif text-2xl font-bold mb-4">What to include on your page</h2>
        <ArticleTable
          headers={['Element', 'Purpose', 'Priority']}
          rows={[
            ['Booking link', 'Direct link to your booking system or booking enquiry form', 'Essential — always first'],
            ['Price list', 'Link to prices so new clients can self-qualify before booking', 'High — reduces back-and-forth'],
            ['Location / area', 'Clear about where you work (home, salon, which area)', 'High — saves wasted enquiries'],
            ['Contact / DM prompt', 'A way to ask questions if the booking link doesn\'t cover their need', 'Useful'],
            ['Portfolio gallery', 'Link to more of your work (or to Instagram itself)', 'Nice to have'],
          ]}
        />
        <ArticleTip>Your booking link should be the most prominent thing on the page — larger button, first position, different colour. Don't bury it after five other links.</ArticleTip>
      </section>

      <section id="what-to-avoid">
        <h2 className="font-serif text-2xl font-bold mb-4">What to avoid</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Too many links:</strong> More than 5–6 links creates decision paralysis</li>
          <li><strong>Stale links:</strong> Links to old promotions, unavailable services, or broken pages undermine trust</li>
          <li><strong>No mobile optimisation:</strong> Most Instagram visitors are on mobile — make sure everything is easy to tap</li>
          <li><strong>Generic page with no personality:</strong> Your link in bio page should feel like you — name, brief description, on-brand style</li>
          <li><strong>Missing your location/area:</strong> Clients need to know where you are before they can book</li>
        </ul>
      </section>

      <section id="tools">
        <h2 className="font-serif text-2xl font-bold mb-4">Tools for building your page</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Several tools create simple link-in-bio pages:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Linktree:</strong> The most widely known option; simple, free tier available; branded pages on paid plan</li>
          <li><strong>Stan.store / Beacons:</strong> Creator-focused; some include features for selling (gift cards, services)</li>
          <li><strong>Your booking software's profile page:</strong> Some booking platforms (including Nelsy) provide a shareable booking profile that works as a link in bio page</li>
          <li><strong>A simple page on your own website:</strong> If you have one — the most control and no tool branding</li>
        </ul>
        <ArticleCallout variant="info" title="No tool needed if you have one booking link">
          If your only goal is booking, link directly to your booking page without a link tool. Fewer clicks = higher conversion. A link in bio tool makes sense when you genuinely need multiple destinations.
        </ArticleCallout>
      </section>

      <section id="optimising">
        <h2 className="font-serif text-2xl font-bold mb-4">Optimising for bookings</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Small changes that increase the chance of a click converting to a booking:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Use action-oriented button text:</strong> "Book your appointment" converts better than "Booking"</li>
          <li><strong>Add availability context:</strong> "Spaces available in [month] — book below" creates urgency</li>
          <li><strong>Include your name and location:</strong> "Nail tech based in [area]" qualifies visitors immediately</li>
          <li><strong>Update your Instagram bio to reference the link:</strong> "Book below 👇" or "Availability in bio link" — remind people it's there</li>
          <li><strong>Make sure the page loads quickly on mobile:</strong> Test it on your own phone before sending anyone there</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">For what to put in your Instagram captions to drive clicks: <Link to="/learn/nail-tech-call-to-action-examples" className="underline text-[#F52B8C]">nail tech call-to-action examples</Link>.</p>
      </section>
    </div>
  ),
});
export {};
