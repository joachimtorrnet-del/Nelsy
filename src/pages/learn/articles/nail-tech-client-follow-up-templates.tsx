import { registerArticle } from '@/lib/articles';
import { ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-client-follow-up-templates',
  title: 'Nail Tech Client Follow-Up Message Templates',
  seoTitle: 'Nail Tech Client Follow-Up Message Templates (Copy & Paste)',
  excerpt: 'Following up with clients after an appointment builds loyalty and drives rebooking. Templates for post-appointment follow-ups, win-back messages, and checking in.',
  seoDescription: 'Nail tech client follow-up message templates. Post-appointment follow-up, win-back messages, and check-in templates for nail techs to boost rebooking and retention.',
  category: 'policies-clients',
  tags: ['nail tech follow-up message template', 'nail appointment follow-up', 'client follow-up nail tech'],
  heroImage: 'linear-gradient(135deg, #FFF0F6 0%, #FCE4F5 100%)',
  heroImageAlt: 'Nail tech client follow-up message templates',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'post-appointment', label: 'Post-appointment follow-up' },
    { id: 'first-appointment', label: 'After a first appointment' },
    { id: 'win-back', label: 'Win-back message for lapsed clients' },
    { id: 'seasonal-checkin', label: 'Seasonal check-in' },
    { id: 'rebook-nudge', label: 'Rebook nudge message' },
  ],
  relatedSlugs: ['nail-tech-review-request-templates', 'nail-tech-referral-message-templates', 'nail-client-welcome-message-templates', 'how-to-retain-nail-clients'],
  faq: [
    { q: 'How soon after an appointment should I follow up?', a: 'Within 24–48 hours is ideal for a post-appointment follow-up — close enough that the appointment is fresh in their mind but not so immediate it feels scripted. For a check-in or win-back message, the timing depends on your booking cycle — if clients typically rebook every 3 weeks, check in around week 4–5 if you haven\'t seen them.' },
    { q: 'Is following up pushy?', a: 'A genuine, warm follow-up isn\'t pushy — it\'s good service. Most clients appreciate a nail tech who checks in to make sure they\'re happy. Keep it short, warm, and non-pressuring. A follow-up that feels like a sales message is pushy; one that asks how their nails are holding up feels caring.' },
  ],
  relatedFeatureSlugs: ['crm', 'email-newsletters', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="post-appointment">
        <h2 className="font-serif text-2xl font-bold mb-4">Post-appointment follow-up</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Warm post-appointment message (send 24–48 hours after):</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name]! It was so lovely having you in yesterday. I hope you're loving your nails! Let me know how they're getting on, and feel free to reach out if you have any questions about aftercare. Looking forward to seeing you next time 💕
        </blockquote>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Follow-up with a rebook prompt:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Hi [Name], I hope you're enjoying your new set! Just a reminder that infills/soaks are recommended every [X] weeks to keep your nails healthy. When you're ready to book your next appointment, you can grab a slot at [link]. Hope to see you soon! 💅 [Your name]
        </blockquote>
      </section>

      <section id="first-appointment">
        <h2 className="font-serif text-2xl font-bold mb-4">After a first appointment</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Following up with a new client is especially important — it sets the tone for the relationship:</p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name]! It was so lovely meeting you today and having you as my first-timer 💕 I hope you're happy with your [service]! If you have any questions about looking after your nails, don't hesitate to ask. I'd love to see you again — you can book your next appointment at [link]. [Your name] ✨
        </blockquote>
        <ArticleTip>After a first appointment is also the best time to ask for a review, while the experience is fresh. You can include a review request naturally at the end of this message.</ArticleTip>
      </section>

      <section id="win-back">
        <h2 className="font-serif text-2xl font-bold mb-4">Win-back message for lapsed clients</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">For clients you haven't seen in 2–3+ months:</p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name]! It's been a little while — I hope you're well! I've been thinking about you and wanted to check in. Have you been looking after your nails okay? 😊 If you're ready for a new set, I'd love to have you back. You can book at [link] — I have availability coming up in [timeframe]. Hope to see you soon! 💕
        </blockquote>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>More direct win-back:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Hi [Name]! Haven't seen you in a while — we miss you! I have some availability coming up if you fancy treating yourself. Book at [link] or message me if you have any questions. Hope to see you soon! 💅
        </blockquote>
      </section>

      <section id="seasonal-checkin">
        <h2 className="font-serif text-2xl font-bold mb-4">Seasonal check-in</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Use seasonal moments to reach out — Christmas, summer, Valentine's Day — without it feeling like a cold call:</p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name]! With Christmas just around the corner, I wanted to reach out — my festive slots are filling up fast! If you want to get your nails done for the season, it's worth booking soon. You can grab a slot at [link] 🎄✨
        </blockquote>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Hi [Name]! Hope you're having a lovely summer ☀️ If you want a fresh set before [upcoming event or season], I have some availability — book at [link] or let me know!
        </blockquote>
      </section>

      <section id="rebook-nudge">
        <h2 className="font-serif text-2xl font-bold mb-4">Rebook nudge message</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">For regular clients who are overdue a rebook:</p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name]! Just checking in — it's been about [X] weeks since your last appointment. If you're ready for a refresh, I have availability coming up. Book at [link] or let me know what works for you! 💅
        </blockquote>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Hey [Name]! Your nails must be getting to the infill stage 😄 I have a slot on [day] if you fancy it — let me know! 💕
        </blockquote>
      </section>
    </div>
  ),
});
export {};
