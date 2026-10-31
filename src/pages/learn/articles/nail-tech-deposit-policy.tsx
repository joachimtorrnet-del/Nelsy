import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import {
  ArticleCallout,
  ArticleTip,
  ArticleTable,
  ArticleSteps,
  ArticleQuote,
  ArticleCTAInline,
} from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-deposit-policy',
  title: 'How to Write and Enforce a Nail Tech Deposit Policy',
  seoTitle: 'Nail Tech Deposit Policy: How to Write and Enforce One',
  excerpt:
    'A complete guide to deposit policies for nail techs — how much to charge, refundable vs non-refundable, communicating your policy, handling objections, and collecting deposits.',
  seoDescription:
    'How to write and enforce a deposit policy as a nail tech — deposit amounts, refundable vs non-refundable, policy templates, objection handling scripts and how to collect payments.',
  category: 'policies-clients',
  tags: ['deposits', 'policy', 'no-shows', 'cancellations', 'booking'],
  heroImage: 'linear-gradient(135deg, #F0FDF4 0%, #BBF7D0 70%, #86EFAC 100%)',
  heroImageAlt: 'Nail tech deposit policy guide',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-09-25',
  updatedAt: '2026-10-20',
  spotlight: true,
  toc: [
    { id: 'why-deposits', label: '1. Why a deposit policy matters' },
    { id: 'how-much', label: '2. How much to charge' },
    { id: 'refundable', label: '3. Refundable vs non-refundable' },
    { id: 'writing-the-policy', label: '4. Writing your deposit policy' },
    { id: 'communicating', label: '5. Communicating your policy' },
    { id: 'handling-objections', label: '6. Handling objections' },
    { id: 'collecting', label: '7. How to collect deposits' },
    { id: 'useful-resources', label: 'Useful resources' },
  ],
  relatedSlugs: ['how-to-get-more-nail-clients', 'nail-tech-pricing-guide'],
  faq: [
    {
      q: 'Should deposits be refundable or non-refundable?',
      a: "Most nail techs make deposits non-refundable if the client cancels within the notice period (usually 24–48 hours). Outside the notice period, the deposit is either refunded or transferred to a new appointment. Making deposits fully non-refundable regardless of notice deters some clients; making them fully refundable defeats the purpose.",
    },
    {
      q: 'How do I introduce a deposit policy to existing clients?',
      a: 'Give notice 2–4 weeks in advance. Message existing clients personally and explain that you\'re adding deposits to protect appointment times. Most loyal clients will understand and accept the change.',
    },
    {
      q: 'What if a client refuses to pay a deposit?',
      a: "It's reasonable to decline to book clients who won't pay a deposit. Your policy exists to protect your business. A client who refuses to pay £15 to hold a spot is likely not someone who will reliably show up.",
    },
    {
      q: 'Can I take deposits without a booking app?',
      a: "Yes — bank transfer or PayPal works. But manual deposit collection is time-consuming and harder to track. A booking platform that handles deposits automatically saves significant admin time and ensures clients see the deposit requirement before confirming.",
    },
  ],
  relatedFeatureSlugs: ['deposits', 'bookings', 'payments'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">

      <section id="why-deposits">
        <h2 className="font-serif text-2xl font-bold mb-4">1. Why a deposit policy matters</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          An empty appointment slot is lost income. A £50 nail appointment that doesn't show up costs you £50 in lost revenue — plus any products prepared, the time you could have given to another client, and the mental overhead of a last-minute cancellation.
        </p>
        <ArticleQuote attribution="Nail tech, East London (via Reddit)">
          I used to get 3–4 no-shows a month. Since adding a £20 deposit I've had maybe 2 in the last year. The clients who were ghosting me weren't serious — the deposit just made that clear before it cost me a slot.
        </ArticleQuote>
        <p className="text-gray-700 mb-4 leading-relaxed">
          A deposit policy has two effects: it reduces the number of no-shows (clients who have paid something are far less likely to ghost) and it ensures that when a cancellation does happen, you have partial compensation for the lost slot.
        </p>
        <ArticleCallout variant="info" title="Deposits vs no deposits">
          <ArticleTable
            headers={['Without deposits', 'With deposits']}
            rows={[
              ['No-shows cost you 100% of slot income', 'Late cancellations at least return the deposit'],
              ['Clients feel no commitment to the booking', 'Clients have skin in the game'],
              ['Last-minute gaps are hard to fill', 'Deposit refund policy incentivises early notice'],
              ['Admin time chasing clients who ghost', 'Screening filters out low-intent bookings'],
            ]}
          />
        </ArticleCallout>
      </section>

      <section id="how-much">
        <h2 className="font-serif text-2xl font-bold mb-4">2. How much to charge as a deposit</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          The right deposit amount is large enough to feel meaningful (deterring casual bookings) without being a barrier to serious clients. Most UK nail techs charge £15–25 for standard appointments and higher for longer or more complex services.
        </p>
        <ArticleTable
          caption="Deposit amount guidance by service type"
          headers={['Service type', 'Appointment value', 'Suggested deposit']}
          rows={[
            ['Gel polish manicure', '£25–40', '£10–15'],
            ['Full set (gel/acrylic)', '£40–60', '£15–25'],
            ['Full set with nail art', '£55–90', '£20–35'],
            ['Long appointment / premium work', '£80+', '£30–50'],
            ['Nail art session (2+ hours)', '£60–120', '£25–50'],
          ]}
        />
        <ArticleTip>
          A good rule of thumb: deposit = the cost of your time and materials if the client doesn't show up. For a 1-hour appointment, £15–25 covers your product cost and a portion of your time.
        </ArticleTip>
      </section>

      <section id="refundable">
        <h2 className="font-serif text-2xl font-bold mb-4">3. Refundable vs non-refundable deposits</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          The most client-friendly — and most effective — approach is a tiered deposit policy based on notice period:
        </p>
        <ArticleTable
          headers={['Notice given', 'Deposit outcome']}
          rows={[
            ['48+ hours', 'Deposit transferred to a new booking or fully refunded'],
            ['24–48 hours', 'Deposit retained or 50% refunded, depending on your policy'],
            ['Under 24 hours / no-show', 'Deposit retained (non-refundable)'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">
          This approach is firm enough to protect you from last-minute cancellations, but fair enough that clients who give proper notice don't feel penalised. It also gives clients an incentive to reschedule early rather than cancelling outright.
        </p>
        <ArticleCallout variant="warning" title="Avoid fully non-refundable blanket policies">
          A policy that retains the deposit regardless of notice period is legally more complex and will deter some genuine clients. The tiered approach achieves the same financial protection with less friction.
        </ArticleCallout>
      </section>

      <section id="writing-the-policy">
        <h2 className="font-serif text-2xl font-bold mb-4">4. Writing your deposit policy</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Your policy text should be short, clear, and included on your booking page and in your confirmation message. Here's a template:
        </p>
        <div
          className="my-6 p-5 rounded-2xl text-sm leading-relaxed text-gray-700"
          style={{ background: '#F7F3F3', border: '1px solid #F4C2C2' }}
        >
          <p className="font-semibold text-[#1A1A1A] mb-2">Deposit Policy — [Your Business Name]</p>
          <p>A non-refundable deposit of £[amount] is required to confirm your booking. This deposit is deducted from the total cost of your appointment.</p>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>Cancellations with 48+ hours notice: deposit transferred to a new appointment.</li>
            <li>Cancellations with less than 24 hours notice: deposit is retained.</li>
            <li>No-shows: deposit is retained and the appointment cannot be rescheduled without a new deposit.</li>
          </ul>
          <p className="mt-2">By booking, you agree to these terms.</p>
        </div>
        <p className="text-gray-600 text-sm">
          Use the{' '}
          <Link to="/tools/nail-tech-cancellation-policy-generator" className="underline text-[#F52B8C]">
            free cancellation policy generator
          </Link>{' '}
          to create a custom policy for your business.
        </p>
      </section>

      <section id="communicating">
        <h2 className="font-serif text-2xl font-bold mb-4">5. Communicating your policy to clients</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          A policy only protects you if clients are clearly informed of it before booking. The three places your deposit policy must appear:
        </p>
        <ArticleSteps
          steps={[
            {
              title: 'On your booking page, before confirmation',
              body: 'Clients should see the deposit amount and policy summary before entering their payment details. Presenting it at checkout and not before creates disputes.',
            },
            {
              title: 'In the booking confirmation message',
              body: 'Your confirmation should include: appointment details, deposit paid, and a one-line reminder of the cancellation notice required.',
            },
            {
              title: 'In your Instagram bio or Highlights',
              body: 'New clients may check your Instagram before booking. Including "Deposits required to book" in your bio or a Highlights story sets the expectation early.',
            },
          ]}
        />
      </section>

      <section id="handling-objections">
        <h2 className="font-serif text-2xl font-bold mb-4">6. Handling objections</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Some clients will push back on deposit requirements, especially if they've never been asked for one before. These responses can help:
        </p>
        <ArticleTable
          headers={['Client says', 'You can reply']}
          rows={[
            [
              '"I\'ve never had to pay a deposit before"',
              '"Most nail techs are adding them now — it\'s standard practice to hold appointment slots. The deposit comes off your total on the day."',
            ],
            [
              '"I\'m a regular, do I still need to pay?"',
              '"Yes — it\'s the same for all bookings. It just secures the slot and comes off the price as usual."',
            ],
            [
              '"What if I need to cancel?"',
              '"If you give 48 hours notice, I\'ll transfer it to a new booking with no problem. The deposit is only kept if it\'s a short-notice cancellation."',
            ],
            [
              '"Can I pay when I arrive?"',
              '"The deposit is what holds the slot — without it the booking isn\'t confirmed. I do get enquiries from multiple people for the same time, so I need it to secure yours."',
            ],
          ]}
        />
        <ArticleTip>
          The right response to "I don't want to pay a deposit" is not to waive the policy. It's to explain it clearly once. Clients who accept your policy are the clients worth having.
        </ArticleTip>
      </section>

      <section id="collecting">
        <h2 className="font-serif text-2xl font-bold mb-4">7. How to collect deposits</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          You have several options for collecting deposits, each with different levels of friction:
        </p>
        <ArticleTable
          headers={['Method', 'Friction', 'Notes']}
          rows={[
            ['Bank transfer / BACS', 'Medium', 'Manual — you have to confirm receipt and chase non-payment'],
            ['PayPal Friends & Family', 'Medium', 'No fees but no buyer protection; clients may dispute'],
            ['PayPal Goods & Services', 'Medium', 'Has fees; clients may raise disputes'],
            ['Booking app (Stripe-based)', 'Low', 'Automatic; collected at booking, tracked per appointment, reduces admin'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">
          <ArticleCTAInline to="/">Nelsy</ArticleCTAInline> collects deposits automatically when a client books — no bank transfers to chase, no manual tracking. The deposit is deducted from the final amount on the day.
        </p>
      </section>

      <section id="useful-resources">
        <h2 className="font-serif text-2xl font-bold mb-4">Useful resources</h2>
        <ul className="space-y-2 text-sm">
          {[
            ['/nail-tech-deposits', 'How to take deposits as a nail tech — the full guide'],
            ['/tools/nail-tech-cancellation-policy-generator', 'Free cancellation policy generator'],
            ['/tools/nail-tech-appointment-reminder-templates', 'Appointment reminder templates — including post-appointment follow-up'],
            ['/learn/how-to-get-more-nail-clients', 'How to get more nail clients'],
            ['/learn/nail-tech-pricing-guide', 'Nail tech pricing guide'],
          ].map(([href, label]) => (
            <li key={href}>
              <Link to={href} className="underline text-[#F52B8C] leading-relaxed">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  ),
});

export {};
