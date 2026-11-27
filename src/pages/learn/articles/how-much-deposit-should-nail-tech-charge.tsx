import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleSteps } from '@/components/article/ArticleBodyComponents';

const link = 'underline text-[#F52B8C]';

registerArticle({
  slug: 'how-much-deposit-should-nail-tech-charge',
  title: 'How Much Deposit Should a Nail Tech Charge?',
  coverTitle: 'How Much Deposit?',
  seoTitle: 'How Much Deposit Should a Nail Tech Charge?',
  excerpt: 'The right deposit amount reduces no-shows without deterring genuine clients. Here\'s the maths and the reasoning behind common deposit strategies.',
  seoDescription: 'How much deposit should a nail tech charge? The right amount, percentage vs flat fee, how to collect it, and what happens if a client refuses.',
  category: 'policies-clients',
  audience: ['pros'],
  craft: 'nails',
  tags: ['deposit', 'nail tech deposit', 'no-shows', 'deposit amount'],
  heroImage: 'linear-gradient(135deg, #F0FDF4 0%, #86EFAC 100%)',
  heroImageAlt: 'How much deposit should nail tech charge',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  updatedAt: '2026-11-26',
  tldr: {
    answer: 'A practical deposit for most nail services is 25 to 30% of the price, rounded to a simple number, with a higher share (up to full payment) for long or high-value appointments.',
    detail: 'The deposit should at least cover your product cost and part of the slot you would lose to a no-show. Example: a £60 set × 30% = £18, rounded to £20, deducted from the final price.',
    points: [
      { label: 'Standard sets', text: '25 to 30% of the price, or one flat amount for all services.' },
      { label: 'Long or bridal', text: '50% or full payment upfront for slots of 3 hours or more.' },
      { label: 'Quick services', text: 'A small flat deposit, or pay on arrival for trusted regulars.' },
    ],
  },
  toc: [
    { id: 'why-deposits-work', label: 'Why deposits work' },
    { id: 'how-much', label: 'How much to charge' },
    { id: 'flat-vs-percentage', label: 'Flat fee vs percentage' },
    { id: 'collecting', label: 'How to collect deposits' },
    { id: 'what-happens-after', label: 'What happens to the deposit' },
    { id: 'client-refuses', label: 'What if a client refuses a deposit' },
  ],
  relatedSlugs: ['nail-tech-deposit-policy', 'nail-tech-no-show-policy-examples', 'how-much-should-nail-tech-charge'],
  faq: [
    { q: 'Is it normal for nail techs to charge deposits?', a: 'Yes, deposits are widely used by independent nail techs, and clients who book beauty services online are used to paying something upfront. It is not a sign of distrust: it protects a slot you keep free for one person. State it on your booking page and in your bio so nobody is surprised.' },
    { q: 'Should I charge a deposit for existing clients?', a: 'The simplest option is the same rule for everyone, which avoids awkward case-by-case decisions. If you want to reward regulars, a clear rule works better than exceptions: for example, "clients with 5 or more visits and no missed appointments can pay on arrival".' },
    { q: 'What if a client says they can\'t pay online?', a: 'Offer one alternative, such as a bank transfer before a set deadline, and confirm the slot only once the money arrives. Keep it as an exception. If someone repeatedly avoids paying anything upfront, it is reasonable to decline the booking.' },
    { q: 'Should the deposit be refundable?', a: 'Make it refundable or transferable when the client cancels within your notice window (for example 48 hours or more), and kept when they cancel late or don\'t show. Write the rule in your policy and show it before the client pays.' },
  ],
  relatedFeatureSlugs: ['deposits', 'bookings', 'payments'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-deposits-work">
        <h2 className="font-serif text-2xl font-bold mb-4">Why deposits work</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Deposits reduce no-shows because they create a financial commitment. A client who has paid £20 to secure a slot has a reason to show up or cancel properly.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">They also filter out people who were never serious. Someone who asks questions across five DMs and never commits won&apos;t pay a deposit, which means they won&apos;t leave a hole in your diary either.</p>
        <ArticleCallout variant="info" title="Example: what a deposit protects">
          Example: you get 3 no-shows a month on £50 sets. Without deposits you lose 3 × £50 = £150 of booked income. With a £15 deposit kept on each, you recover 3 × £15 = £45, and clients who have paid are less likely to skip in the first place.
        </ArticleCallout>
      </section>

      <section id="how-much">
        <h2 className="font-serif text-2xl font-bold mb-4">How much to charge</h2>
        <ArticleTable
          headers={['Approach', 'Best for', 'Pros', 'Cons']}
          rows={[
            ['Small flat fee (e.g. £10)', 'Quick services, new techs building trust', 'Low friction, easy to explain', 'Covers little of a long slot'],
            ['Standard flat fee (e.g. £20)', 'Menus with similar prices', 'Clear and simple: one number for everything', 'Too small for long or expensive sets'],
            ['25–30% of the price', 'Mixed menus with a wide price range', 'Scales with the value of the slot', 'Slightly harder to state in a bio'],
            ['50% to full payment upfront', 'Bridal, 3+ hour art sets, first-time clients on long slots', 'Strong protection on your most valuable slots', 'Can put off some first-time clients'],
          ]}
          caption="Example amounts only. Set yours from your own prices with the method below."
        />
        <ArticleSteps
          steps={[
            { title: 'Start with 30% of the service price', body: 'Example: £60 × 0.30 = £18.' },
            { title: 'Check it covers your product cost', body: 'If the set uses £6 of product, £18 is well above it. If not, raise the deposit.' },
            { title: 'Round to an easy number', body: '£18 becomes £20. Clients remember round numbers.' },
            { title: 'Scale up for long slots', body: 'For anything over 3 hours, use 50% or ask for full payment upfront.' },
          ]}
        />
        <ArticleTip>Set the rule per service, not once for the whole menu. A gel polish change can be pay on arrival, a full set can take a 30% deposit, and a bridal trial can be paid in full upfront.</ArticleTip>
      </section>

      <section id="flat-vs-percentage">
        <h2 className="font-serif text-2xl font-bold mb-4">Flat fee vs percentage</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Both work. Choose based on how spread out your prices are:</p>
        <ArticleTable
          headers={['Service (example prices)', 'Flat £20 deposit', '30% deposit']}
          rows={[
            ['Gel polish, £30', '£20 (67% of the price)', '£9'],
            ['Gel-X full set, £55', '£20 (36%)', '£16.50'],
            ['Acrylic with art, £80', '£20 (25%)', '£24'],
            ['Bridal set, £120', '£20 (17%)', '£36'],
          ]}
        />
        <p className="text-gray-700 leading-relaxed">A flat fee is easiest to say (&quot;A £20 deposit secures every appointment&quot;) and works when prices are close together. A percentage is fairer when your menu runs from £30 to £120, and most booking systems calculate it for you.</p>
      </section>

      <section id="collecting">
        <h2 className="font-serif text-2xl font-bold mb-4">How to collect deposits</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The most reliable method is automatic collection at the time of online booking: the client picks a slot, pays the deposit, and the booking is confirmed. No chasing.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">Alternatives all need more admin:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Bank transfer:</strong> works, but you have to check every payment and confirm the booking by hand.</li>
          <li><strong>Payment links:</strong> sent by DM, which still means waiting and following up.</li>
          <li><strong>Cash in advance:</strong> only practical for clients you see before the appointment.</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">Compare apps that take deposits automatically: <Link to="/best-booking-app-for-nail-techs" className={link}>best booking apps for nail techs</Link>.</p>
      </section>

      <section id="what-happens-after">
        <h2 className="font-serif text-2xl font-bold mb-4">What happens to the deposit</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Present the deposit as part payment, not an extra charge:</p>
        <ArticleCallout variant="info" title="Copy this wording">
          &quot;A [£20] deposit secures your appointment and comes off your final price. Cancel or reschedule with at least [48] hours&apos; notice and it moves to your new date or is refunded. With less notice, or if you don&apos;t arrive, the deposit is kept.&quot;
        </ArticleCallout>
        <p className="text-gray-700 leading-relaxed">Example: a £60 set with a £20 deposit means the client pays £40 at the appointment. If they cancel with enough notice, moving the deposit to a new date (rather than refunding) keeps them in your diary. Generate full policy wording with the <Link to="/tools/nail-tech-cancellation-policy-generator" className={link}>cancellation policy generator</Link>.</p>
      </section>

      <section id="client-refuses">
        <h2 className="font-serif text-2xl font-bold mb-4">What if a client refuses to pay a deposit</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Clients who push back usually fall into three groups:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>Those who lost a deposit elsewhere and are being cautious</li>
          <li>Those who find online payment inconvenient but will pay once you explain</li>
          <li>Those who don&apos;t want any commitment at all</li>
        </ol>
        <ArticleCallout variant="info" title="Copy this reply">
          &quot;Totally understand! The deposit just holds your slot, because I keep that time free only for you. It comes off your final price, and if you need to move with [48] hours&apos; notice it simply moves with you. You can pay it when you pick your time here: [link].&quot;
        </ArticleCallout>
        <p className="text-gray-700 leading-relaxed">Groups 1 and 2 usually go ahead after this. For group 3, it is fine to decline: a client who won&apos;t pay a small deposit is the one most likely to leave you with an empty slot. Full strategy: <Link to="/nail-tech-deposits" className={link}>how to take deposits as a nail tech</Link>.</p>
      </section>
    </div>
  ),
});
export {};
