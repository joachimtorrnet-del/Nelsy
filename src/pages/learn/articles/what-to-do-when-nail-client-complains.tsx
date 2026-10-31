import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'what-to-do-when-nail-client-complains',
  title: 'What to Do When a Nail Client Complains',
  seoTitle: 'What to Do When a Nail Client Complains (How to Handle It Right)',
  excerpt: 'How you handle a nail client complaint determines whether you lose that client forever or turn a difficult moment into lasting loyalty. Here\'s the approach that works.',
  seoDescription: 'What to do when a nail client complains. How to respond to nail complaints professionally — in person, by message, and for online reviews. Scripts and decision framework.',
  category: 'policies-clients',
  tags: ['nail client complaint', 'nail complaint handling', 'nail tech client dispute', 'nail service complaint'],
  heroImage: 'linear-gradient(135deg, #FFF5F5 0%, #FFE4E4 100%)',
  heroImageAlt: 'What to do when a nail client complains',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'types-of-complaints', label: 'Types of complaints' },
    { id: 'in-person', label: 'Handling a complaint in person' },
    { id: 'by-message', label: 'Handling a complaint by message' },
    { id: 'what-to-offer', label: 'What to offer as resolution' },
    { id: 'online-reviews', label: 'Responding to a bad review' },
    { id: 'learning', label: 'Using complaints to improve' },
  ],
  relatedSlugs: ['how-to-handle-difficult-nail-clients', 'how-to-handle-nail-repair-request', 'how-to-set-boundaries-with-nail-clients', 'how-to-ask-nail-clients-for-reviews'],
  faq: [
    { q: 'What if the client is wrong — they caused the damage themselves?', a: 'Even if you know the lifting or breakage was caused by the client\'s own aftercare (picking, peeling, knocking), the complaint conversation isn\'t the right time to be defensive. Listen, acknowledge their frustration, and then calmly explain what you believe happened. "I can see it\'s lifted at the free edge — this typically happens when nails catch on something or come into contact with harsh chemicals. Let me take a look and we can work out the best solution." Facts over blame.' },
    { q: 'Do I have to offer a free fix for every complaint?', a: 'Not automatically. A nail that lifts after 3 weeks due to the client\'s own product exposure is different from a nail that lifts after 3 days due to a prep issue. Assess each situation. For complaints where your work is clearly at fault (early lifting, incorrect service, discomfort), a free repair or redo is appropriate. For complaints where the cause is unclear or client-related, offer a paid repair at a discounted rate and explain the likely cause.' },
    { q: 'What if a client complains weeks after their appointment?', a: 'Assess the timeline. A complaint 2–3 days after an appointment about lifting is worth investigating and possibly addressing. A complaint 4 weeks after an appointment, when nails have worn naturally to the point of needing an infill, is a different conversation — the client may be confused about reasonable wear. Have a clear policy on your complaint/repair window (typically 5–7 days) and communicate it at booking.' },
  ],
  relatedFeatureSlugs: ['crm', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="types-of-complaints">
        <h2 className="font-serif text-2xl font-bold mb-4">Types of nail complaints</h2>
        <ArticleTable
          headers={['Complaint type', 'Common cause', 'Typical resolution']}
          rows={[
            ['Lifting within a few days', 'Prep issue (dehydration, oil residue); client\'s own product exposure', 'Repair/redo if your prep error; educate about aftercare if client-related'],
            ['Wrong colour / shape', 'Communication gap; client changed their mind', 'Discuss what happened; repair at your discretion'],
            ['Nail discomfort / burning', 'Over-filing, heat spike from lamp, sensitivity to product', 'Listen carefully; assess; refer to a doctor if skin is damaged'],
            ['Breakage', 'Extension too long for lifestyle; knock/impact', 'Quick repair; discuss appropriate length for client\'s lifestyle'],
            ['Not what they expected aesthetically', 'Consultation gap; reference photos weren\'t aligned', 'Listen; discuss; offer a minor adjustment where possible'],
          ]}
        />
      </section>

      <section id="in-person">
        <h2 className="font-serif text-2xl font-bold mb-4">Handling a complaint in person</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">In-person complaints are the easiest to resolve well — you can see the issue, the client can see you taking it seriously, and resolution is immediate. The response framework:</p>
        <ul className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Listen completely</strong> — let the client finish before responding</li>
          <li><strong>Acknowledge</strong> — "I understand that's frustrating, and I want to make sure we get this right"</li>
          <li><strong>Look at the issue</strong> — don't respond before you've actually examined it</li>
          <li><strong>Explain</strong> — calmly state what you believe happened (without being defensive)</li>
          <li><strong>Offer a resolution</strong> — see the section below on what to offer</li>
        </ul>
        <ArticleTip>Don\'t apologise excessively or accept all responsibility immediately — you don\'t yet know the full picture. "I\'m sorry this has happened, let me take a look and understand what\'s going on" is better than "I\'m so sorry, this is terrible" before you\'ve assessed the situation.</ArticleTip>
      </section>

      <section id="by-message">
        <h2 className="font-serif text-2xl font-bold mb-4">Handling a complaint by message</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Message complaints (DMs, WhatsApp, text) require care — written communication loses tone, and defensive wording escalates quickly. Always:</p>
        <ArticleCallout variant="tip" title="First response to a message complaint">
          "Hi [name], I'm sorry to hear this — I want to make it right. Could you send me a photo so I can see what's happening? I'll take a look and we can work out the best way forward."
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">Asking for a photo serves two purposes: it helps you assess, and it briefly pauses the emotional momentum of the complaint while the client takes the photo.</p>
        <p className="text-gray-700 leading-relaxed">Never argue by message. If the conversation escalates, move it to a call or an in-person visit: "This is easier to sort out in person — can you come in this week so I can take a proper look?"</p>
      </section>

      <section id="what-to-offer">
        <h2 className="font-serif text-2xl font-bold mb-4">What to offer as resolution</h2>
        <ArticleTable
          headers={['Situation', 'Appropriate resolution']}
          rows={[
            ['Your prep error causing lifting in first 5 days', 'Free repair / redo — this is clearly your work'],
            ['Client-caused lifting (products, picking)', 'Offer a paid repair at a small discount; educate on aftercare'],
            ['Aesthetic disappointment (colour, style)', 'One free correction within 48 hours; charge for follow-up changes'],
            ['Significant service error (damage, burning)', 'Free correction and genuine apology; consider partial or full refund'],
            ['Complaint after your reasonable repair window', 'Offer paid repair at your normal rate; explain the timeline respectfully'],
          ]}
        />
      </section>

      <section id="online-reviews">
        <h2 className="font-serif text-2xl font-bold mb-4">Responding to a bad review</h2>
        <ArticleCallout variant="tip" title="Bad review response framework">
          "Thank you for your feedback, [name]. I'm sorry to hear you weren't happy with your experience — this is genuinely important to me. I'd love to discuss this further and make it right if I can. Please feel free to reach out directly at [email/DM]."
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">Never: argue publicly, call the client wrong, or be defensive in a review response. A calm, professional public response is read by every potential client who sees it. It speaks louder than the review itself.</p>
        <p className="text-gray-700 leading-relaxed">For repair requests specifically: <Link to="/learn/how-to-handle-nail-repair-request" className="underline text-[#F52B8C]">how to handle a nail repair request</Link>.</p>
      </section>

      <section id="learning">
        <h2 className="font-serif text-2xl font-bold mb-4">Using complaints to improve</h2>
        <p className="text-gray-700 leading-relaxed">A pattern of similar complaints (repeated lifting on the same nails, multiple colour dissatisfaction conversations) is data. Track complaint types and look for patterns in your prep, product choice, or consultation process. A complaint that leads to a genuine process improvement has generated value beyond the immediate incident.</p>
      </section>
    </div>
  ),
});
export {};
