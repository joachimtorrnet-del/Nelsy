import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleSteps } from '@/components/article/ArticleBodyComponents';

const link = 'underline text-[#F52B8C]';

registerArticle({
  slug: 'nail-tech-cancellation-policy',
  title: 'Nail Tech Cancellation Policy: Complete Guide + Template',
  seoTitle: 'Nail Tech Cancellation Policy: Complete Guide + Templates',
  excerpt: 'A complete guide to writing, communicating, and enforcing your nail tech cancellation policy, with ready-to-use templates you can adapt.',
  seoDescription: 'Nail tech cancellation policy guide and templates. What to include, how to communicate it, when to enforce it, and how to handle disputes professionally.',
  category: 'policies-clients',
  tags: ['cancellation policy', 'nail tech policy', 'cancellation template', 'client management'],
  heroImage: 'linear-gradient(135deg, #FFF0F5 0%, #FBCFE8 100%)',
  heroImageAlt: 'Nail tech cancellation policy guide',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  updatedAt: '2026-11-26',
  spotlight: true,
  tldr: {
    answer: 'A good nail tech cancellation policy says how much notice you need (often 48 hours), what happens to the deposit with and without notice, what happens on a no-show, and how to cancel.',
    detail: 'Show it before the client pays, repeat it in the confirmation and the reminder, and apply it the same way every time. Copy one of the three templates below and fill in the brackets.',
    points: [
      { label: 'Notice', text: '24 hours for short services, 48 hours as a default, 72 hours for long or bridal slots.' },
      { label: 'Deposit', text: 'Moved to a new date with enough notice; kept with late notice or a no-show.' },
      { label: 'Placement', text: 'Booking page, confirmation, 24-hour reminder and a "Policies" Highlight.' },
    ],
  },
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
    { q: 'Is a cancellation policy legally enforceable for nail techs?', a: 'Your position is much stronger when the client saw the policy and agreed to it before booking, for example by ticking a box or completing an online booking that displays it. Consumer rules differ by country, so keep fees proportionate (a deposit rather than a large penalty) and check local guidance if you are unsure. This is general information, not legal advice.' },
    { q: 'What notice period should a nail tech require for cancellations?', a: '48 hours is a popular default because it leaves time to offer the slot to someone else. Shorter services can use 24 hours, and long or bridal appointments 72 hours. Choose a period you would be comfortable defending in a polite message, and use the same number everywhere.' },
    { q: 'What do I say when a client cancels last minute with an excuse?', a: 'Acknowledge their reason, then apply the policy: "I\'m sorry to hear that, I hope everything is OK. As my booking policy says, cancellations within 48 hours mean the deposit is kept, because I can\'t refill the slot at short notice. I\'d love to see you another time: here\'s my booking link." Keep it warm but consistent.' },
    { q: 'Should I charge the full price for a no-show?', a: 'Keeping the deposit is usually simpler than charging the full price, because the deposit is already paid and needs no chasing. If you want stronger protection on long appointments, take a larger deposit or full payment upfront for those services instead.' },
  ],
  relatedFeatureSlugs: ['bookings', 'deposits'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-to-include">
        <h2 className="font-serif text-2xl font-bold mb-4">What a good cancellation policy includes</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A clear cancellation policy covers five things: the notice required, what happens to the deposit with notice, what happens without notice, what happens on a no-show, and how to cancel.</p>
        <ArticleTable
          headers={['Element', 'Example']}
          rows={[
            ['Notice period', '"48 hours\' notice is required for cancellations and rescheduling"'],
            ['Deposit with notice', '"Your deposit moves to your new appointment"'],
            ['Deposit without notice', '"Deposits are kept for cancellations within 48 hours"'],
            ['No-show', '"No-shows lose the deposit, and a new deposit is needed to rebook"'],
            ['How to cancel', '"Use the reschedule link in your confirmation, or message me on Instagram"'],
          ]}
        />
        <ArticleCallout variant="info" title="Example: why the notice period matters">
          Example: a 90-minute Gel-X set at £55 with a £20 deposit. Cancelled 3 days before: you have time to offer the slot to your waitlist, and the deposit moves to the client&apos;s new date. Cancelled 3 hours before: the slot will probably stay empty, and keeping the £20 deposit reduces your loss from £55 to £35.
        </ArticleCallout>
      </section>

      <section id="templates">
        <h2 className="font-serif text-2xl font-bold mb-4">Ready-to-use templates</h2>
        <ArticleCallout variant="info" title="Short version (for booking page and bio)">
          Bookings require a £[X] deposit, which comes off your final price. Give [48] hours&apos; notice to reschedule and keep your deposit. Same-day cancellations and no-shows lose the deposit.
        </ArticleCallout>

        <ArticleCallout variant="info" title="Full version (for confirmation message and T&Cs)">
          <strong>Booking policy</strong><br /><br />
          A deposit of £[X] is required to confirm all appointments. It comes off your final balance.<br /><br />
          <strong>Cancellations and rescheduling:</strong> please give at least [48] hours&apos; notice. With [48]+ hours&apos; notice, your deposit moves to your new appointment. Cancellations within [48] hours are non-refundable.<br /><br />
          <strong>No-shows:</strong> if you don&apos;t attend and don&apos;t contact me, your deposit is kept and a new deposit is needed to rebook.<br /><br />
          <strong>Late arrival:</strong> if you arrive more than [15] minutes late, I may need to shorten or reschedule your service.<br /><br />
          To cancel or reschedule, use the link in your confirmation or message me on Instagram.
        </ArticleCallout>

        <ArticleCallout variant="info" title="Warm version">
          Just a few notes on my booking policy, so everything&apos;s clear!<br /><br />
          Your £[X] deposit secures your spot. It comes straight off your final price, so think of it as paying a little early.<br /><br />
          If you need to reschedule, give me [48] hours&apos; notice and I&apos;ll happily move your appointment. With less notice I usually can&apos;t fill the slot, so the deposit is non-refundable in that case.<br /><br />
          If you don&apos;t show up without letting me know, the deposit is kept and I&apos;ll need a new deposit to rebook you.<br /><br />
          Life happens: if you have a genuine emergency, just message me and we&apos;ll work something out. Thank you for understanding 🙏
        </ArticleCallout>
        <p className="text-gray-700 leading-relaxed">Want it written for you? The <Link to="/tools/nail-tech-cancellation-policy-generator" className={link}>nail tech cancellation policy generator</Link> builds a policy from your notice period and deposit amount.</p>
      </section>

      <section id="notice-periods">
        <h2 className="font-serif text-2xl font-bold mb-4">Choosing your notice period</h2>
        <ArticleTable
          headers={['Notice period', 'Who it suits', 'Trade-off']}
          rows={[
            ['24 hours', 'Shorter services, gel polish, quick infills', 'Less time to refill the slot'],
            ['48 hours', 'A common default for most nail services', 'Time to offer the slot to a waitlist; widely accepted by clients'],
            ['72 hours', 'Long appointments, bridal, full extension sets', 'More protection; some clients find it strict'],
          ]}
        />
        <ArticleTip>Consider a tiered policy: 48 hours for standard services, 72 hours for appointments over 2 hours. You protect your most valuable time without being strict on quick bookings.</ArticleTip>
      </section>

      <section id="where-to-put-it">
        <h2 className="font-serif text-2xl font-bold mb-4">Where to put your policy</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li><strong>Booking page:</strong> visible before the client completes booking and pays. This is the most important placement.</li>
          <li><strong>Confirmation message:</strong> one line after booking is confirmed.</li>
          <li><strong>Reminder message:</strong> a short line in the 24-hour reminder, such as &quot;Changes within 48 hours mean the deposit is kept.&quot;</li>
          <li><strong>Instagram Highlights:</strong> a &quot;Booking Info&quot; or &quot;Policies&quot; Highlight for clients who research first.</li>
        </ol>
        <p className="text-gray-700 mt-4 leading-relaxed">Reminder wording: <Link to="/tools/nail-tech-appointment-reminder-templates" className={link}>free appointment reminder templates</Link>.</p>
      </section>

      <section id="enforcement">
        <h2 className="font-serif text-2xl font-bold mb-4">How to enforce it</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Apply it every time, except for the genuine emergencies you define below. If you enforce it only sometimes, clients notice.</p>
        <ArticleSteps
          steps={[
            { title: 'Reply the same day', body: 'Thank them for letting you know and show you care about the reason.' },
            { title: 'Point to the policy, not your feelings', body: 'Quote the notice period they agreed to at booking.' },
            { title: 'Offer the next step', body: 'Send your booking link so they can rebook straight away.' },
            { title: 'Log it', body: 'Add a note to the client record. A pattern of late cancellations is your signal to ask for full payment upfront next time.' },
          ]}
        />
        <ArticleCallout variant="tip" title="Response script">
          &quot;I completely understand, sorry this came up. As my booking policy says, cancellations within 48 hours mean the deposit is kept, as I can&apos;t fill the slot at short notice. I&apos;d love to rebook you: here&apos;s my booking link whenever you&apos;re ready.&quot;
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">A deposit collected automatically at booking makes this much easier: there is nothing to chase, so the conversation is about rebooking, not money.</p>
      </section>

      <section id="exceptions">
        <h2 className="font-serif text-2xl font-bold mb-4">When to make exceptions</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Exceptions for real emergencies are reasonable. Decide your rule in advance, so you are not making it up under pressure:</p>
        <ArticleTable
          headers={['Situation', 'Suggested approach']}
          rows={[
            ['Serious illness, bereavement, accident', 'Move the deposit to a new date'],
            ['First late cancellation from a long-standing regular', 'Move the deposit once, as goodwill, and say so'],
            ['Second late cancellation within a few months', 'Apply the policy'],
            ['Third late cancellation or a no-show', 'Apply the policy and require full payment upfront for future bookings'],
          ]}
        />
        <p className="text-gray-700 leading-relaxed">The moment clients learn you always make exceptions, the policy stops working. More wording ideas: <Link to="/blog/nail-tech-no-show-policy-examples" className={link}>no-show policy examples</Link>.</p>
      </section>
    </div>
  ),
});
export {};
