import { registerArticle } from '@/lib/articles';
import { ArticleCallout } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-cancellation-message-templates',
  title: 'Nail Tech Cancellation Message Templates',
  seoTitle: 'Nail Tech Cancellation Message Templates (Copy & Paste)',
  excerpt: 'Templates for every cancellation scenario — when the client cancels, when you need to cancel, and how to handle last-minute cancellations professionally.',
  seoDescription: 'Nail tech cancellation message templates. Copy-paste messages for when clients cancel, when you cancel, last-minute cancellations, and retaining deposits — friendly, professional, and firm.',
  category: 'policies-clients',
  tags: ['nail tech cancellation message template', 'nail appointment cancellation message', 'cancellation message nail tech'],
  heroImage: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)',
  heroImageAlt: 'Nail tech cancellation message templates',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'client-cancels-in-time', label: 'Client cancels with enough notice' },
    { id: 'client-cancels-late', label: 'Client cancels late (deposit retained)' },
    { id: 'you-cancel', label: 'You need to cancel' },
    { id: 'acknowledging-cancellation', label: 'Acknowledging a cancellation quickly' },
    { id: 'rebook-after-cancel', label: 'Inviting them to rebook' },
  ],
  relatedSlugs: ['nail-tech-no-show-message-templates', 'nail-tech-appointment-reminder-templates', 'nail-tech-deposit-policy', 'how-to-deal-with-nail-client-no-shows'],
  faq: [
    { q: 'Should I charge a cancellation fee even for a good reason?', a: 'Your policy should apply consistently. If you make exceptions for some clients but not others, clients will start testing your limits. A kind, empathetic message retaining the deposit ("I completely understand, but as per policy...") is both fair and professional. If you choose to waive the fee, that\'s your decision — but do it consciously, not because you felt too awkward to enforce the policy.' },
    { q: 'How do I respond when a client gets upset about their deposit being retained?', a: 'Acknowledge their frustration calmly and refer to the policy they agreed to at booking. "I understand this is frustrating — unfortunately the deposit is non-refundable for cancellations within [X] hours, which is the policy you agreed to when booking. I\'d love to have you back — you can rebook at [link]." Don\'t apologise for enforcing your policy, but do stay warm.' },
  ],
  relatedFeatureSlugs: ['bookings', 'deposits'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="client-cancels-in-time">
        <h2 className="font-serif text-2xl font-bold mb-4">Client cancels with enough notice</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Friendly response when client cancels with sufficient notice:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          No problem at all, [Name]! I'll get that cancelled for you. Your deposit will be refunded within [X] days. Would you like to rebook for another time? You can book at [link]. Hope to see you soon! 💅
        </blockquote>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Professional response:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Hi [Name], thanks for letting me know with enough notice. Your appointment has been cancelled and your deposit will be refunded within [X] working days. You're welcome to rebook when you're ready at [link]. Thank you!
        </blockquote>
      </section>

      <section id="client-cancels-late">
        <h2 className="font-serif text-2xl font-bold mb-4">Client cancels late (deposit retained)</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Empathetic but firm — deposit retained:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name], I'm sorry to hear you can't make it. Unfortunately, as this cancellation is within [X] hours of your appointment, your deposit will be retained as per my cancellation policy. I do understand it's frustrating — but this policy protects time that could have been offered to another client. I'd love to have you back — you can rebook at [link].
        </blockquote>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Brief and firm:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Hi [Name], thanks for letting me know. As per my cancellation policy, deposits are non-refundable for cancellations within [X] hours. Your appointment has been cancelled. You're welcome to rebook when you're ready at [link].
        </blockquote>
        <ArticleCallout variant="info" title="Why it's okay to enforce your policy">
          Consistently enforcing your cancellation policy is professional, not rude. Clients who booked agreed to it. A warm tone + clear reference to the policy is all you need.
        </ArticleCallout>
      </section>

      <section id="you-cancel">
        <h2 className="font-serif text-2xl font-bold mb-4">You need to cancel</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>You cancelling with advance notice:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name], I'm so sorry — I need to cancel your [service] appointment on [date] due to [brief reason if appropriate, e.g. illness, family emergency]. I've refunded your deposit in full and it should appear within [X] days. I'd love to rebook you — please let me know a time that works or book at [link]. I'm really sorry for the inconvenience.
        </blockquote>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>You cancelling same-day (emergency):</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Hi [Name], I am so sorry to message you so close to your appointment — I have an emergency and I'm unable to see you today. I've refunded your full deposit and I'm deeply sorry for the disruption to your day. Please let me know when you'd like to rebook and I'll prioritise you. Thank you so much for understanding. 🙏
        </blockquote>
        <ArticleCallout variant="warning" title="Always refund the full deposit when you cancel">
          If you are the one cancelling, always refund in full — no matter the reason, no matter the notice given. Retaining a deposit when you cancel damages trust and can create serious conflict.
        </ArticleCallout>
      </section>

      <section id="acknowledging-cancellation">
        <h2 className="font-serif text-2xl font-bold mb-4">Acknowledging a cancellation quickly</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">If you receive a cancellation and want to acknowledge it immediately before sending a fuller response:</p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name], thanks for letting me know — I'll get that sorted and come back to you shortly.
        </blockquote>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Got it, [Name] — I'll cancel your appointment now and be in touch.
        </blockquote>
      </section>

      <section id="rebook-after-cancel">
        <h2 className="font-serif text-2xl font-bold mb-4">Inviting them to rebook</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Always leave the door open to rebooking — even if a client cancels late, they may still want to return:</p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          I'd love to have you back whenever you're ready — you can book online at [link] any time.
        </blockquote>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Whenever you want to rebook, I'm here! [link]
        </blockquote>
      </section>
    </div>
  ),
});
export {};
