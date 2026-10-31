import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-cancellation-policy',
  title: 'Nail Tech Cancellation Policy: Complete Guide + Template',
  seoTitle: 'Nail Tech Cancellation Policy: Complete Guide + Templates',
  excerpt: 'A complete guide to writing, communicating, and enforcing your nail tech cancellation policy — with ready-to-use templates you can adapt.',
  seoDescription: 'Nail tech cancellation policy guide and templates. What to include, how to communicate it, when to enforce it, and how to handle disputes professionally.',
  category: 'policies-clients',
  tags: ['cancellation policy', 'nail tech policy', 'cancellation template', 'client management'],
  heroImage: 'linear-gradient(135deg, #FFF0F5 0%, #FBCFE8 100%)',
  heroImageAlt: 'Nail tech cancellation policy guide',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  spotlight: true,
  toc: [
    { id: 'what-to-include', label: 'What a good policy includes' },
    { id: 'templates', label: 'Ready-to-use templates' },
    { id: 'notice-periods', label: 'Choosing your notice period' },
    { id: 'where-to-put-it', label: 'Where to put your policy' },
    { id: 'enforcement', label: 'How to enforce it' },
    { id: 'exceptions', label: 'When to make exceptions' },
  ],
  relatedSlugs: ['nail-tech-no-show-policy-examples', 'nail-tech-late-policy', 'nail-tech-booking-policy-template', 'how-much-deposit-should-nail-tech-charge'],
  faq: [
    { q: 'Is a cancellation policy legally enforceable for nail techs?', a: 'Yes, if it was clearly stated before the client booked and they agreed to it (either explicitly or by completing the booking). This is why having it visible on your booking page and in confirmation messages matters — you can point to where the client saw it. Verbal-only policies are harder to enforce.' },
    { q: 'What notice period should a nail tech require for cancellations?', a: '48 hours is the most common among UK nail techs — enough time to rebook the slot, not so much that it feels unreasonable. Some nail techs require 24 hours for shorter appointments and 72 hours for longer ones. Choose a period you can realistically expect clients to meet.' },
    { q: 'What do I say when a client cancels last minute with an excuse?', a: 'Acknowledge their reason, then apply the policy: "I understand — sorry to hear that. As I mentioned in my booking confirmation, last-minute cancellations result in the deposit being forfeit. I\'d love to rebook you for a future date with a new deposit." Keep it warm but consistent.' },
  ],
  relatedFeatureSlugs: ['bookings', 'deposits'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-to-include">
        <h2 className="font-serif text-2xl font-bold mb-4">What a good cancellation policy includes</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A clear cancellation policy covers four things: the notice period required, what happens to the deposit, what happens for no-shows, and how to cancel (not just what happens when you do).</p>
        <ArticleTable
          headers={['Element', 'Example']}
          rows={[
            ['Notice period', '"48 hours\' notice is required for cancellations and rescheduling"'],
            ['Deposit with notice', '"Deposits are transferred to your next appointment"'],
            ['Deposit without notice', '"Deposits are forfeit for cancellations within 48 hours"'],
            ['No-show', '"No-shows result in the deposit being forfeit and a new deposit required to rebook"'],
            ['How to cancel', '"Message me on Instagram or reply to your confirmation email"'],
          ]}
        />
      </section>

      <section id="templates">
        <h2 className="font-serif text-2xl font-bold mb-4">Ready-to-use templates</h2>
        <ArticleCallout variant="info" title="Short version (for booking page and bio)">
          Bookings require a £[X] deposit. 48 hours\' notice needed to reschedule without losing your deposit. No-shows and same-day cancellations forfeit the deposit.
        </ArticleCallout>

        <ArticleCallout variant="info" title="Full version (for confirmation message and T&Cs)">
          Booking Policy{'\n\n'}
          A non-refundable deposit of £[X] is required to confirm all appointments. This deposit comes off your final balance.{'\n\n'}
          Cancellations & rescheduling: I ask for at least 48 hours\' notice. With 48+ hours\' notice, your deposit will be transferred to a future appointment. Cancellations within 48 hours are non-refundable.{'\n\n'}
          No-shows: If you don\'t attend and don\'t contact me, your deposit is forfeit. A new deposit will be required to rebook.{'\n\n'}
          To cancel or reschedule, please message me on Instagram or reply to this message.
        </ArticleCallout>

        <ArticleCallout variant="info" title="Warm version">
          Just a few notes on my booking policy, so everything\'s clear!{'\n\n'}
          Your £[X] deposit secures your spot — it comes straight off your final price, so think of it as paying a little early.{'\n\n'}
          If you need to reschedule, please give me 48 hours\' notice and I\'ll be happy to move your appointment. With less notice, I\'m usually unable to fill the slot, so the deposit is non-refundable in that case.{'\n\n'}
          If you don\'t show up without letting me know, the deposit will be kept and I\'ll need a new deposit to rebook you.{'\n\n'}
          I completely understand that life happens — if you have a genuine emergency, please just message me and we\'ll figure something out. Thank you for understanding 🙏
        </ArticleCallout>
      </section>

      <section id="notice-periods">
        <h2 className="font-serif text-2xl font-bold mb-4">Choosing your notice period</h2>
        <ArticleTable
          headers={['Notice period', 'Who it suits', 'Trade-off']}
          rows={[
            ['24 hours', 'Nail techs with shorter services', 'Less time to rebook; clients may push this more'],
            ['48 hours', 'Most nail techs (industry standard)', 'Enough to rebook; clients generally accept it'],
            ['72 hours', 'Long appointments, bridal, gel extensions', 'More protection; some clients find it strict'],
          ]}
        />
        <ArticleTip>Consider a tiered policy: 48 hours for standard services, 72 hours for appointments over 2 hours. This protects your most valuable time while not being overly strict for quick bookings.</ArticleTip>
      </section>

      <section id="where-to-put-it">
        <h2 className="font-serif text-2xl font-bold mb-4">Where to put your policy</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li><strong>Booking page</strong> — visible before the client completes booking. This is the most important placement: visible before commitment.</li>
          <li><strong>Confirmation message</strong> — brief mention after booking is confirmed.</li>
          <li><strong>Reminder message</strong> — a short line in the 24-hour reminder: "As a reminder, late cancellations within 48 hours are non-refundable."</li>
          <li><strong>Instagram highlights</strong> — a "Booking Info" or "Policies" highlight for clients who research before booking.</li>
        </ol>
        <p className="text-gray-700 mt-4 leading-relaxed">For reminder message templates: <Link to="/tools/nail-tech-appointment-reminder-templates" className="underline text-[#F52B8C]">free appointment reminder templates</Link>. For a full policy generator: <Link to="/tools/nail-tech-cancellation-policy-generator" className="underline text-[#F52B8C]">nail tech cancellation policy generator</Link>.</p>
      </section>

      <section id="enforcement">
        <h2 className="font-serif text-2xl font-bold mb-4">How to enforce it</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Enforce every time, without exception (unless there's a genuine emergency). Selective enforcement creates inconsistency that clients notice and exploit:</p>
        <ArticleCallout variant="tip" title="Response script">
          "I completely understand — sorry this came up. As mentioned in my booking policy, late cancellations within 48 hours result in the deposit being forfeit as I wasn\'t able to fill the slot. I\'d love to rebook you — there\'s a new booking link if you\'d like to reserve a future appointment."
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">Automated deposit collection through your booking platform removes this awkwardness — the deposit isn't manually "taken" by you, it's collected by the system. This makes the conversation factual rather than personal.</p>
      </section>

      <section id="exceptions">
        <h2 className="font-serif text-2xl font-bold mb-4">When to make exceptions</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Exceptions for genuine emergencies are reasonable — serious illness, bereavement, accidents. What constitutes an exception is your discretion. A clear principle: make it the exception, not the rule. The moment clients know you'll always make an exception, the policy stops working.</p>
        <p className="text-gray-700 leading-relaxed">For long-standing loyal clients with an impeccable record, a first-time exception is a goodwill gesture. For a client who's already late-cancelled twice, an exception continues a pattern. See: <Link to="/learn/nail-tech-no-show-policy-examples" className="underline text-[#F52B8C]">no-show policy examples</Link>.</p>
      </section>
    </div>
  ),
});
export {};
