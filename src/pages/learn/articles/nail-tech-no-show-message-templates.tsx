import { registerArticle } from '@/lib/articles';
import { ArticleCallout } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-no-show-message-templates',
  title: 'Nail Tech No-Show Message Templates',
  seoTitle: 'Nail Tech No-Show Message Templates (Copy & Paste)',
  excerpt: 'A no-show is frustrating. Here\'s how to handle it professionally — templates for reaching out, retaining the deposit, and deciding whether to rebook the client.',
  seoDescription: 'Nail tech no-show message templates. Copy-paste no-show messages for nail techs — reach out, retain deposit, and handle repeat no-shows professionally.',
  category: 'policies-clients',
  tags: ['nail tech no-show message template', 'nail appointment no show message', 'client no show nail tech'],
  heroImage: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
  heroImageAlt: 'Nail tech no-show message templates',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'first-contact', label: 'First contact after a no-show' },
    { id: 'deposit-retained', label: 'No-show with deposit retained' },
    { id: 'no-deposit', label: 'No-show without a deposit' },
    { id: 'repeat-no-show', label: 'Repeat no-show' },
    { id: 'rebook-conditions', label: 'Conditional rebook message' },
  ],
  relatedSlugs: ['nail-tech-cancellation-message-templates', 'nail-tech-appointment-reminder-templates', 'how-to-deal-with-nail-client-no-shows', 'nail-tech-deposit-policy'],
  faq: [
    { q: 'Should I reach out to a client who no-showed?', a: 'Yes — a brief, neutral message gives the client a chance to explain (emergencies happen). It also puts your policy on record. Send it the same day or within a few hours of the missed appointment. Keep it short and professional, not passive-aggressive.' },
    { q: 'Can I refuse to rebook a client who no-showed?', a: 'Yes. If a client has a history of no-shows or last-minute cancellations, you can decline to rebook, or make rebooking conditional on a larger deposit or full prepayment. This is your business — protecting your time is entirely reasonable.' },
    { q: 'What if the client had an emergency?', a: 'An emergency is a reason, not an excuse to waive your policy. You can acknowledge the difficulty while still retaining the deposit. Some nail techs choose to waive in genuine emergencies — that\'s a personal decision. If you do waive it, make sure it\'s a genuine exception and not a pattern.' },
  ],
  relatedFeatureSlugs: ['deposits', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="first-contact">
        <h2 className="font-serif text-2xl font-bold mb-4">First contact after a no-show</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Send this within a couple of hours of the missed appointment — neutral, not accusatory:</p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name], I had you booked in for a [service] today at [time] and it looks like you weren't able to make it. I hope everything's okay. As per my booking policy, your deposit of £[amount] will be retained for the missed appointment. Please let me know if you'd like to rebook. [Your name]
        </blockquote>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Shorter version:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Hi [Name], it looks like you missed your [time] appointment today. I hope you're okay! Unfortunately your deposit has been retained as per my no-show policy. You're welcome to rebook at [link].
        </blockquote>
      </section>

      <section id="deposit-retained">
        <h2 className="font-serif text-2xl font-bold mb-4">No-show with deposit retained</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">If the client then responds asking about the deposit:</p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name], I completely understand that things come up. Unfortunately, as per the cancellation and no-show policy you agreed to when booking, the deposit is non-refundable for missed appointments. This policy is in place because the time was held exclusively for you and couldn't be offered to another client. I hope you understand. You're welcome to rebook and I'd love to see you again. [Your name]
        </blockquote>
      </section>

      <section id="no-deposit">
        <h2 className="font-serif text-2xl font-bold mb-4">No-show without a deposit</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">If you don't currently collect deposits (and this is a reminder to start):</p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name], I had you booked in for [service] at [time] today and it looks like you weren't able to come. I hope everything's okay. Could you let me know what happened? Going forward, all bookings will require a deposit to hold the appointment. You're welcome to rebook at [link].
        </blockquote>
        <ArticleCallout variant="warning" title="This is the moment to start collecting deposits">
          No-shows without a deposit cost you money and fill the slot permanently. If you've experienced a no-show this week, set up deposit collection today. It's the single most effective change you can make.
        </ArticleCallout>
      </section>

      <section id="repeat-no-show">
        <h2 className="font-serif text-2xl font-bold mb-4">Repeat no-show</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">If a client has no-showed or cancelled late more than once:</p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name], I had you booked in today at [time] and you weren't able to make it. As this is the second time we've had a missed appointment, I'm no longer able to hold appointments for you without full prepayment at the time of booking. If you'd like to rebook under those terms, please let me know. I hope you understand. [Your name]
        </blockquote>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Declining to rebook entirely:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Hi [Name], I had you booked in today and you weren't able to make it. Unfortunately, after multiple missed appointments, I'm unable to take future bookings from you. I wish you well. [Your name]
        </blockquote>
      </section>

      <section id="rebook-conditions">
        <h2 className="font-serif text-2xl font-bold mb-4">Conditional rebook message</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">If you're willing to rebook but want a larger deposit or full prepayment:</p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Hi [Name], I'd be happy to rebook you — however, given the previous missed appointment, I'll need full payment in advance to secure your spot. If you're happy with that, just let me know what dates work and I'll send a payment link. [Your name]
        </blockquote>
      </section>
    </div>
  ),
});
export {};
