import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-much-deposit-should-nail-tech-charge',
  title: 'How Much Deposit Should a Nail Tech Charge?',
  seoTitle: 'How Much Deposit Should a Nail Tech Charge?',
  excerpt: 'The right deposit amount reduces no-shows without deterring genuine clients. Here\'s the maths and the reasoning behind common deposit strategies.',
  seoDescription: 'How much deposit should a nail tech charge? The right amount, percentage vs flat fee, how to collect it, and what happens if a client refuses.',
  category: 'policies-clients',
  tags: ['deposit', 'nail tech deposit', 'no-shows', 'deposit amount'],
  heroImage: 'linear-gradient(135deg, #F0FDF4 0%, #86EFAC 100%)',
  heroImageAlt: 'How much deposit should nail tech charge',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
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
    { q: 'Is it normal for nail techs to charge deposits?', a: 'Yes — deposits are now standard practice among established UK nail techs. Most clients expect it, especially for first appointments. Nail techs who don\'t take deposits often have higher no-show rates. It\'s not a sign of distrust; it\'s a professional boundary.' },
    { q: 'Should I charge a deposit for existing clients?', a: 'Most nail techs charge deposits for all bookings, including regulars. It removes the need to decide case-by-case and keeps your policy consistent. Loyal clients who\'ve never no-showed are usually unbothered by deposits — they understand the business reason.' },
    { q: 'What if a client claims they can\'t pay online?', a: 'Most clients who say this can pay online perfectly fine but prefer not to commit. A small number genuinely have issues (no card, limited online access). For these clients, you can offer bank transfer as an alternative if you\'re confident in their reliability. But don\'t make exceptions the norm.' },
  ],
  relatedFeatureSlugs: ['deposits', 'bookings', 'payments'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-deposits-work">
        <h2 className="font-serif text-2xl font-bold mb-4">Why deposits work</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Deposits reduce no-shows because they create a financial commitment. A client who's paid £20 to secure a slot has a reason to show up or cancel properly — they don't want to lose their money.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">The secondary effect is equally important: deposits filter out clients who were never serious about booking. Someone who bounced from DM to DM asking questions and never quite committed won't pay a deposit — which means they won't be in your diary either. This is a feature, not a bug.</p>
        <ArticleCallout variant="info" title="Deposits don't need to be large to work">
          The psychological commitment created by a £15 deposit is nearly as powerful as one created by a £40 deposit. The client has made a financial commitment and paid attention. The size of the deposit matters less than its existence.
        </ArticleCallout>
      </section>

      <section id="how-much">
        <h2 className="font-serif text-2xl font-bold mb-4">How much to charge</h2>
        <ArticleTable
          headers={['Deposit amount', 'Who uses it', 'Pros', 'Cons']}
          rows={[
            ['£10–15 (flat)', 'New nail techs, budget end', 'Low friction, easy to collect', 'May not deter serial no-shows'],
            ['£20–25 (flat)', 'Most established UK nail techs', 'Clear commitment, easy to explain', 'Some price-sensitive clients resist'],
            ['20–30% of service price', 'Premium nail techs', 'Scales with appointment value', 'More complex to explain and remember'],
            ['50%+ of service price', 'Special occasion / complex bookings', 'Significant commitment for high-value slots', 'Can deter first-time clients'],
          ]}
        />
        <ArticleTip>The sweet spot for most UK nail techs is £15–25 flat for standard services. This is enough to create commitment but low enough not to deter genuine clients. For very long or complex appointments (bridal, 3+ hours), scale to 25–30%.</ArticleTip>
      </section>

      <section id="flat-vs-percentage">
        <h2 className="font-serif text-2xl font-bold mb-4">Flat fee vs percentage</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Both work. Choose based on your service mix and pricing structure:</p>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Flat fee:</strong> Simpler to communicate. "A £20 deposit is required for all appointments." Clients know exactly what they're paying. Easier to state clearly on your booking page. Works well if your prices are fairly consistent.</p>
        <p className="text-gray-700 leading-relaxed"><strong>Percentage:</strong> Scales with the appointment value. A 25% deposit on a £60 set = £15; on a £120 bridal set = £30. This feels proportionate. Slightly more complex to state but most booking platforms handle the calculation automatically.</p>
      </section>

      <section id="collecting">
        <h2 className="font-serif text-2xl font-bold mb-4">How to collect deposits</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The most reliable method is automatic collection at the time of online booking. The client books → deposit is collected → booking confirmed. No chasing, no manual follow-up.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">Alternative methods (all require more admin):</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Bank transfer:</strong> Works but requires you to check payment and manually confirm the booking</li>
          <li><strong>PayPal:</strong> Similar to bank transfer — higher friction and manual process</li>
          <li><strong>Cash in advance:</strong> Only practical if the client comes to you before the appointment date — rarely viable</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">The strong recommendation: use a booking platform that collects the deposit automatically. See: <Link to="/learn/best-booking-apps-for-nail-techs-2026" className="underline text-[#F52B8C]">best booking apps for nail techs</Link>.</p>
      </section>

      <section id="what-happens-after">
        <h2 className="font-serif text-2xl font-bold mb-4">What happens to the deposit</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The deposit should be clearly positioned as part payment — not an extra charge. "A £20 deposit is required to book. This is deducted from your appointment price." Clients are paying £20 now and the remaining balance at the appointment.</p>
        <p className="text-gray-700 leading-relaxed">If a client cancels with adequate notice (per your policy), you can either refund the deposit or offer to transfer it to a future booking. Most nail techs transfer to a future booking rather than refund — it keeps the client in your diary.</p>
      </section>

      <section id="client-refuses">
        <h2 className="font-serif text-2xl font-bold mb-4">What if a client refuses to pay a deposit</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Clients who push back on deposits fall into three categories:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>Those who've had bad experiences with non-refundable deposits elsewhere and are being cautious</li>
          <li>Those who find online payment inconvenient but will pay once you explain the process</li>
          <li>Those who resent any form of commitment — these are often the clients most likely to no-show</li>
        </ol>
        <p className="text-gray-700 mb-4 leading-relaxed">For category 1 and 2: explain your policy clearly and reassure them the deposit comes off the final price. Most will proceed.</p>
        <p className="text-gray-700 leading-relaxed">For category 3: it's usually fine to decline the booking. A client who won't pay a small deposit is more likely to no-show — which costs you more than the booking was worth.</p>
        <p className="text-gray-700 mt-4 leading-relaxed">Full deposit strategy: <Link to="/nail-tech-deposits" className="underline text-[#F52B8C]">How to take deposits as a nail tech</Link>.</p>
      </section>
    </div>
  ),
});
export {};
