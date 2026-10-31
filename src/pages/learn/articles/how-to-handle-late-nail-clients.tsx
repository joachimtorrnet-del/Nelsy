import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-handle-late-nail-clients',
  title: 'How to Handle Late Nail Clients',
  seoTitle: 'How to Handle Late Nail Clients (Scripts + What to Do)',
  excerpt: 'Late clients are one of the most common frustrations for nail techs. Here\'s exactly what to do — in the moment and in your booking system — to protect your day.',
  seoDescription: 'How to handle late nail clients. What to say, when to turn them away, how to shorten the appointment, and how to stop lateness from cascading through your day.',
  category: 'policies-clients',
  tags: ['late clients', 'nail tech client management', 'lateness', 'appointment management'],
  heroImage: 'linear-gradient(135deg, #FFFBEB 0%, #FDE68A 100%)',
  heroImageAlt: 'How to handle late nail clients',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'in-the-moment', label: 'What to do when a client is late' },
    { id: 'decision-tree', label: 'Late client decision guide' },
    { id: 'shortening-services', label: 'How to shorten a service gracefully' },
    { id: 'prevention', label: 'Preventing lateness before it happens' },
    { id: 'chronic-latecomers', label: 'Chronic latecomers' },
  ],
  relatedSlugs: ['nail-tech-late-policy', 'nail-tech-no-show-policy-examples', 'how-to-set-boundaries-with-nail-clients'],
  faq: [
    { q: 'Should I charge full price if a client is late and gets a shorter service?', a: 'Yes, if the appointment time was theirs and they arrived late. You held that slot; the cost is their missed time, not yours. Some nail techs reduce the price proportionally if the shortened service was dramatically different (e.g. only able to do half the nails), but this is discretionary. Your policy should state: full price applies regardless of arrival time.' },
    { q: 'How do I tell a client their appointment will be shorter because they\'re late?', a: 'Directly but warmly. "We have about [X] minutes left of your appointment time, so I\'ll focus on [core service] — we may not be able to fit in [extras]." Don\'t apologise for this, since the lateness is theirs. State it as a practical matter.' },
    { q: 'What counts as "on time"?', a: 'Your appointment start time, not a few minutes before. Arriving at the exact appointment time is fine. Being there 5 minutes early is courteous. Most nail techs apply a 10–15 minute grace window before considering an appointment officially late. State your grace period in your policy.' },
  ],
  relatedFeatureSlugs: ['bookings', 'crm'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="in-the-moment">
        <h2 className="font-serif text-2xl font-bold mb-4">What to do when a client is late</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The moment a client hasn't arrived at their start time, start a mental clock. Your decisions from here depend on three things: how late they are, whether you have someone after them, and what service they booked.</p>
        <ArticleTable
          headers={['Time late', 'Action']}
          rows={[
            ['0–10 minutes', 'Wait. Don\'t contact. Most clients arrive within a few minutes.'],
            ['10–15 minutes', 'Send a brief message: "Hey — just checking you\'re still coming? Your appointment started at [time]."'],
            ['15 minutes (back-to-back bookings)', 'Decide: can you still deliver a meaningful shortened service? If not, prepare to send them away.'],
            ['15 minutes (no client after)', 'More flexibility — you may be able to run late. But apply your policy for any appointment charges.'],
            ['30+ minutes, no contact', 'Mark as no-show. Apply your no-show policy.'],
          ]}
        />
        <ArticleTip>A quick message at 10–12 minutes achieves two things: it sometimes prompts the client to rush, and it creates a timestamp showing you tried to reach them before treating the appointment as a no-show.</ArticleTip>
      </section>

      <section id="decision-tree">
        <h2 className="font-serif text-2xl font-bold mb-4">Late client decision guide</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">When a late client arrives, run through this sequence:</p>
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li><strong>How late are they?</strong> Calculate the remaining appointment time.</li>
          <li><strong>Is there a client after them?</strong> If yes, you cannot run over — their remaining time is firm.</li>
          <li><strong>Can you complete a meaningful service in the time remaining?</strong> For a full set, arriving 25 minutes late on a 60-minute slot may not be viable. For a polish change, it might be fine.</li>
          <li><strong>If viable:</strong> Welcome them, state the time remaining matter-of-factly, proceed.</li>
          <li><strong>If not viable:</strong> Turn them away, apply no-show policy, offer to rebook.</li>
        </ol>
        <ArticleCallout variant="info" title="Rule of thumb">
          If you cannot complete the core service safely and to your standard within the remaining time, it's better to turn them away than to rush and deliver substandard work. A rushed set reflects on you, not on their lateness.
        </ArticleCallout>
      </section>

      <section id="shortening-services">
        <h2 className="font-serif text-2xl font-bold mb-4">How to shorten a service gracefully</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">When a client arrives 10–15 minutes late and you can still serve them (with less time), state this clearly:</p>
        <ArticleCallout variant="tip" title="Script — arriving late, service can continue">
          "Good to see you! We have about [X] minutes, so I'll get straight into it. We may not have time for [X extra] today — I'll focus on [core service]. If you'd like the extras next time, we can book a longer slot."
        </ArticleCallout>
        <p className="text-gray-700 mt-4 mb-4 leading-relaxed">Tips for the shortened appointment:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Prioritise the core service (e.g. application) over the nice-to-haves (e.g. nail art, cuticle work)</li>
          <li>Don't rush on prep — rushed prep leads to lifting, which leads to a complaint later</li>
          <li>If you can't do it properly, don't do it — see above</li>
          <li>Full price applies; don't offer a discount for the shortened service unless you're the one who chose to reduce scope</li>
        </ul>
      </section>

      <section id="prevention">
        <h2 className="font-serif text-2xl font-bold mb-4">Preventing lateness before it happens</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The best handling of late clients is making lateness less common. Three tools:</p>
        <ArticleTable
          headers={['Tool', 'What it does']}
          rows={[
            ['24-hour reminder', 'Confirms the appointment time, includes a "please arrive on time" note'],
            ['1-hour reminder', 'Quick SMS or message closer to the time — works well for clients who\'ve been late before'],
            ['Visible late policy', 'Published on booking page: clients who know lateness means a shorter service are more likely to be on time'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">For late policy templates: <Link to="/learn/nail-tech-late-policy" className="underline text-[#F52B8C]">nail tech late policy examples</Link>.</p>
      </section>

      <section id="chronic-latecomers">
        <h2 className="font-serif text-2xl font-bold mb-4">Chronic latecomers</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Some clients are always late — not maliciously, but structurally. They book 5pm and habitually arrive at 5:15. Options:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Buffer booking:</strong> When they book, internally block an extra 15 minutes after their slot so late arrival doesn't cascade into the next client's time.</li>
          <li><strong>Direct conversation:</strong> "I've noticed you often run a few minutes late — I want to make sure we have enough time for your full service. Could you aim to arrive 5–10 minutes before your time?"</li>
          <li><strong>Stop booking them in back-to-back slots:</strong> Give them a slot with natural buffer before your next client.</li>
          <li><strong>Stop booking them:</strong> If it's creating ongoing problems, it's okay to stop. See: <Link to="/learn/how-to-set-boundaries-with-nail-clients" className="underline text-[#F52B8C]">how to set boundaries with nail clients</Link>.</li>
        </ul>
        <ArticleTip>Many nail techs find that enforcing the shortened-service policy once resolves chronic lateness permanently. The experience of arriving at 5:20 and leaving at 5:45 with half their nail art done is usually enough of an incentive to be punctual.</ArticleTip>
      </section>
    </div>
  ),
});
export {};
