import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-ask-nail-clients-for-reviews',
  title: 'How to Ask Nail Clients for Reviews',
  seoTitle: 'How to Ask Nail Clients for Reviews (Scripts + Strategy)',
  excerpt: 'Reviews are one of the strongest trust signals for potential nail clients. Here\'s when and how to ask for them — without feeling awkward about it.',
  seoDescription: 'How to ask nail clients for reviews. When to ask, what to say, where to direct clients (Google, Instagram), and how to use reviews in your marketing.',
  category: 'get-clients',
  tags: ['nail client reviews', 'nail tech reviews', 'Google reviews nail tech', 'nail business testimonials'],
  heroImage: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
  heroImageAlt: 'How to ask nail clients for reviews',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-reviews-matter', label: 'Why reviews matter for nail techs' },
    { id: 'when-to-ask', label: 'When to ask' },
    { id: 'how-to-ask', label: 'How to ask (scripts)' },
    { id: 'where-to-direct', label: 'Where to direct clients' },
    { id: 'using-reviews', label: 'Using reviews in your marketing' },
  ],
  relatedSlugs: ['how-to-get-nail-clients-from-google-business-profile', 'how-to-build-nail-client-referral-program', 'how-to-increase-nail-client-retention'],
  faq: [
    { q: 'How do I ask for a Google review without sounding pushy?', a: 'Make it easy and direct. "Would you be happy to leave me a Google review? It really helps new clients find me. Here\'s the link — takes about 60 seconds." Most clients who are happy with their nails are happy to leave a review when asked; they just never think to do it unprompted. A direct, warm ask is not pushy.' },
    { q: 'Can I incentivise clients to leave reviews?', a: 'Be careful here. Google\'s terms of service explicitly prohibit incentivising reviews (e.g. "leave a review and get X off"). You can ask sincerely, remind clients, and make it easy — but don\'t offer rewards for positive reviews. A warm ask is both compliant and more authentic.' },
    { q: 'What do I do with negative reviews?', a: 'Respond promptly, professionally, and without defensiveness. Acknowledge the client\'s experience: "I\'m sorry to hear you weren\'t happy — I\'d love to discuss this and make it right." Don\'t get into a public back-and-forth. A well-handled negative review often improves trust — it shows you take client concerns seriously.' },
  ],
  relatedFeatureSlugs: ['crm', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-reviews-matter">
        <h2 className="font-serif text-2xl font-bold mb-4">Why reviews matter for nail techs</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Reviews serve two distinct purposes: trust for new clients who discover you, and visibility on Google. A nail tech with 50 positive Google reviews appears higher in local searches than one with none — and converts at a higher rate when potential clients compare options.</p>
        <p className="text-gray-700 leading-relaxed">Most nail techs underinvest in reviews because asking feels awkward. The strategies below make asking feel natural — and a consistent approach to review collection becomes a meaningful long-term asset for your business.</p>
      </section>

      <section id="when-to-ask">
        <h2 className="font-serif text-2xl font-bold mb-4">When to ask</h2>
        <ArticleTable
          headers={['Timing', 'Why it works']}
          rows={[
            ['End of appointment (best time)', 'Client is happy, nails look fresh, positive feeling is at its peak'],
            ['Post-appointment message (1–2 days later)', 'Client has had time to show off their nails; still fresh; a follow-up message is natural'],
            ['After a client shares their nails on social media', 'They\'re already celebrating their nails — this is a warm moment to ask for a review'],
            ['After a compliment or positive DM', '"Thank you so much! Would you be happy to leave a quick Google review? It really helps."'],
          ]}
        />
        <ArticleTip>Don\'t ask for a review before the client has left the appointment. If something goes wrong between the appointment and when they post, you\'ve already set them up to review something that soured. Ask after they\'ve lived with the nails for a day or two.</ArticleTip>
      </section>

      <section id="how-to-ask">
        <h2 className="font-serif text-2xl font-bold mb-4">How to ask (scripts)</h2>
        <ArticleCallout variant="tip" title="In-person (end of appointment)">
          "I'm so glad you love them! If you have a spare minute, it would mean a lot to me if you left a Google review — it really helps new clients find me. I'll text you the link."
        </ArticleCallout>
        <ArticleCallout variant="tip" title="Post-appointment message (1–2 days later)">
          "Hey [name]! Hope you're still loving your nails 💅 If you're happy with how they've settled, I'd really appreciate a quick Google review — it helps so much when new clients are looking for a nail tech. Here's the link: [link] Thanks so much 🤍"
        </ArticleCallout>
        <ArticleCallout variant="tip" title="After a client shares their nails on Instagram">
          "Love that you shared these! 😍 If you ever have a spare moment, a Google review would mean the world to me — [link]. You're the best!"
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">Note: always include the direct review link — don\'t just say "leave us a Google review." Every extra step the client has to take reduces the chance they\'ll do it. A direct link to your Google review page reduces the ask to two taps.</p>
      </section>

      <section id="where-to-direct">
        <h2 className="font-serif text-2xl font-bold mb-4">Where to direct clients for reviews</h2>
        <ArticleTable
          headers={['Platform', 'Best for', 'Notes']}
          rows={[
            ['Google Business Profile', 'Local SEO; new client discovery', 'Most impactful for visibility; requires a Google account'],
            ['Instagram DM/Stories', 'Social proof; content repurposing', 'Screenshot and repost; add to Highlights'],
            ['Facebook', 'Local communities; older demographics', 'Less critical than Google for most nail techs'],
            ['Treatwell / Fresha (if listed)', 'In-platform reviews visible to searchers', 'Reviews stay within the platform'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">For most independent nail techs, Google reviews are the highest-priority channel. Even a handful of genuine, detailed reviews ("she transformed my nails, they lasted 4 weeks, I\'ve already reboooked") significantly impacts local search visibility and trust.</p>
      </section>

      <section id="using-reviews">
        <h2 className="font-serif text-2xl font-bold mb-4">Using reviews in your marketing</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Instagram Highlights:</strong> Screenshot DMs, text messages, and Google reviews; add to a "Reviews" Highlight</li>
          <li><strong>Instagram Stories:</strong> Share a review as a Story with a booking CTA: "If you want results like this — link in bio to book"</li>
          <li><strong>Booking page:</strong> Add testimonials to your booking page — a few client quotes under your services build trust at the decision moment</li>
          <li><strong>Instagram captions:</strong> Include brief client feedback in nail photo captions: "Client told me these lasted 4 full weeks 🙌"</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">For Google Business Profile strategy: <Link to="/learn/how-to-get-nail-clients-from-google-business-profile" className="underline text-[#F52B8C]">how to get nail clients from Google Business Profile</Link>.</p>
      </section>
    </div>
  ),
});
export {};
