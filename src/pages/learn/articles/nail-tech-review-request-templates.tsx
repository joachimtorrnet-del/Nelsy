import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-review-request-templates',
  title: 'Nail Tech Review Request Message Templates',
  seoTitle: 'Nail Tech Review Request Message Templates (Copy & Paste)',
  excerpt: 'Reviews build trust and bring in new clients. Here\'s how to ask for them without feeling awkward — templates for WhatsApp, Instagram, Google, and email.',
  seoDescription: 'Nail tech review request message templates. Ask clients for reviews via WhatsApp, DM, Google, and email — copy-paste templates for nail techs that actually work.',
  category: 'get-clients',
  tags: ['nail tech review request template', 'ask for review nail tech', 'nail tech google review message'],
  heroImage: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
  heroImageAlt: 'Nail tech review request message templates',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'when-to-ask', label: 'When to ask for a review' },
    { id: 'whatsapp-dm', label: 'WhatsApp and DM templates' },
    { id: 'google-review', label: 'Google review request templates' },
    { id: 'instagram', label: 'Instagram-specific templates' },
    { id: 'email', label: 'Email templates' },
    { id: 'tips', label: 'Tips for getting more reviews' },
  ],
  relatedSlugs: ['nail-tech-client-follow-up-templates', 'nail-tech-referral-message-templates', 'how-to-get-more-nail-clients', 'nail-tech-instagram-bio-ideas'],
  faq: [
    { q: 'Isn\'t it awkward to ask for a review?', a: 'It can feel awkward at first, but most happy clients don\'t think to leave a review unless they\'re asked. A warm, natural request after a great appointment is not pushy — it\'s normal for a small business. You\'ve done the hard part (great work); asking for a review just makes the result visible to future clients.' },
    { q: 'Should I ask every client for a review?', a: 'Not every time — focus on happy clients and new clients who had a great first experience. A client who\'s been coming for two years might not need to be asked again. A first-timer who raved about their set is a great candidate.' },
    { q: 'What platform should I direct clients to?', a: 'Google reviews have the most SEO impact and are the most trusted by potential new clients searching locally. Instagram reviews (comments, tagged posts) have social proof value. Pick one primary platform and consistently direct clients there rather than spreading across multiple platforms.' },
  ],
  relatedFeatureSlugs: ['crm', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="when-to-ask">
        <h2 className="font-serif text-2xl font-bold mb-4">When to ask for a review</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Right after the appointment</strong> — while they're still in the chair or just left, genuinely happy</li>
          <li><strong>In the follow-up message</strong> — 24–48 hours after, when they've seen how their nails wear</li>
          <li><strong>After a first appointment</strong> — new clients who had a great experience are the most motivated to leave reviews</li>
          <li><strong>When a client says something positive</strong> — "omg I love them!" → "Would you mind leaving a quick Google review? It really helps!"</li>
        </ul>
        <ArticleCallout variant="info" title="Don't wait too long">
          The longer after the appointment, the less likely a client is to leave a review. Ask within 48 hours while the experience is fresh.
        </ArticleCallout>
      </section>

      <section id="whatsapp-dm">
        <h2 className="font-serif text-2xl font-bold mb-4">WhatsApp and DM templates</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Casual and warm:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name]! So glad you loved your nails 💕 Would you be able to take 2 minutes to leave me a Google review? It really helps small businesses like mine to grow. Here's the link: [link]. Thank you so much! ✨
        </blockquote>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Slightly more formal:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Hi [Name]! I hope you're loving your new [service]. If you have a spare moment, I'd really appreciate a Google review — it means the world to a small business. You can leave one here: [link]. Thank you! [Your name]
        </blockquote>
      </section>

      <section id="google-review">
        <h2 className="font-serif text-2xl font-bold mb-4">Google review request templates</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>In-person ask (at the end of the appointment):</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          I'm so glad you love them! If you have a moment later, a Google review would mean so much — I'll send you the link in a message now. ✨
        </blockquote>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Follow-up message with Google link:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Hi [Name]! Here's that Google review link I mentioned — just takes 2 minutes and it really helps new clients find me: [link] 💕 Thank you!
        </blockquote>
        <ArticleTip>Create a short URL (using Bitly or just share your Google Maps link) so it's easy to paste into WhatsApp or Instagram. Long review URLs look spammy.</ArticleTip>
      </section>

      <section id="instagram">
        <h2 className="font-serif text-2xl font-bold mb-4">Instagram-specific templates</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Asking to tag on Instagram:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          If you post your nails, feel free to tag me — I love to repost and it helps more people find me! ✨ [@yourhandle]
        </blockquote>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>DM after seeing them post their nails:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Omg you posted them — I love it!! 😍 Would you be happy for me to repost? And if you have a moment, a Google review would be amazing: [link] 💕
        </blockquote>
      </section>

      <section id="email">
        <h2 className="font-serif text-2xl font-bold mb-4">Email templates</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Post-appointment email with review request:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Subject: How are your nails holding up? 💅<br /><br />
          Hi [Name],<br /><br />
          I hope you're loving your [service] — it was so lovely having you in!<br /><br />
          If you have 2 minutes, I'd be so grateful if you could leave a Google review. As a small business, reviews make a huge difference to how new clients find me: [link]<br /><br />
          Thank you so much, and I look forward to seeing you next time. 💕<br /><br />
          [Your name]
        </blockquote>
      </section>

      <section id="tips">
        <h2 className="font-serif text-2xl font-bold mb-4">Tips for getting more reviews</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Ask in person first, then follow up with the link — in-person asks convert better than cold messages</li>
          <li>Make it easy — one tap to the link, no extra steps</li>
          <li>Respond to every review you receive (positive and negative) — it shows future clients you care</li>
          <li>Don't ask clients who seemed unhappy — you'll get a negative review and an awkward situation</li>
          <li>Consistency beats volume — one review request per happy client, every appointment, compounds over time</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
