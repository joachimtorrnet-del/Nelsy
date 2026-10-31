import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-set-boundaries-with-nail-clients',
  title: 'How to Set Boundaries With Nail Clients',
  seoTitle: 'How to Set Boundaries With Nail Clients (Without Losing Them)',
  excerpt: 'Setting boundaries with nail clients doesn\'t have to cost you bookings. Here\'s how to communicate limits professionally and build a better client base in the process.',
  seoDescription: 'How to set boundaries with nail clients professionally. Scripts, examples, and advice for handling common boundary violations — without losing good clients.',
  category: 'policies-clients',
  tags: ['client boundaries', 'nail tech client management', 'difficult clients', 'professional boundaries'],
  heroImage: 'linear-gradient(135deg, #F5F3FF 0%, #DDD6FE 100%)',
  heroImageAlt: 'How to set professional boundaries with nail clients',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'why-boundaries-matter', label: 'Why boundaries matter for your business' },
    { id: 'common-violations', label: 'Common boundary violations' },
    { id: 'scripts', label: 'Scripts for common situations' },
    { id: 'policy-vs-preference', label: 'Policy vs. personal preference' },
    { id: 'firing-clients', label: 'When to stop taking a client' },
  ],
  relatedSlugs: ['nail-tech-cancellation-policy', 'nail-tech-late-policy', 'nail-tech-no-show-policy-examples', 'nail-tech-booking-policy-template'],
  faq: [
    { q: 'Is it okay to "fire" a nail client?', a: 'Yes. You are a self-employed professional and you can choose who to take as a client. You are not obligated to continue serving someone who repeatedly disrespects your time, ignores your policies, or makes your work unpleasant. Declining future bookings is professional and legal.' },
    { q: 'How do I handle a client who keeps messaging outside working hours?', a: 'Set a clear expectation in your booking confirmation or DMs: "I try to respond to messages between [hours]." If a client continues messaging at all hours, you can say: "I don\'t check messages in the evening — I\'ll respond tomorrow morning." Repeat consistently. Most clients respect this once it\'s stated.' },
    { q: 'What if a client gets angry when I enforce a boundary?', a: 'Some will. Stay calm, don\'t over-explain, and don\'t apologise for the policy itself. "I understand you\'re frustrated — my cancellation policy is in place to protect my income. I\'d love to rebook you at a time that works." If they escalate, you\'re learning something important about this client.' },
  ],
  relatedFeatureSlugs: ['crm', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-boundaries-matter">
        <h2 className="font-serif text-2xl font-bold mb-4">Why boundaries matter for your business</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Nail techs without clear boundaries tend to develop the same problems: late clients who run into each other's time, last-minute cancellations that go unpaid, messages at midnight expecting next-day replies, and clients who push for discounts or extras. Each issue, individually, feels manageable. Collectively, they create a business where you're working harder and earning less than your rates suggest.</p>
        <p className="text-gray-700 leading-relaxed">Boundaries aren't about being difficult — they're about making your business sustainable. A client who respects your policies and time is a better long-term client than one who books frequently but costs you more in absorbed losses and stress.</p>
      </section>

      <section id="common-violations">
        <h2 className="font-serif text-2xl font-bold mb-4">Common boundary violations and what they cost</h2>
        <ArticleTable
          headers={['Situation', 'What it costs you', 'The underlying boundary needed']}
          rows={[
            ['Client arrives 20 minutes late', 'Disrupted schedule; late subsequent clients', 'Clear late policy and grace period'],
            ['Client cancels same-day', 'Lost income on an unfillable slot', 'Enforced cancellation policy with deposit'],
            ['Client messages at 11pm', 'Blurred work-life boundary; always "on"', 'Stated response hours'],
            ['Client asks for extras after service starts', '"Can you just do one more nail"', 'Clear service scope; firm "that\'s an add-on"'],
            ['Client asks for discount "as a regular"', 'Reduced income; expectation that price is negotiable', 'No informal discounting outside stated promotions'],
            ['Client brings an extra person unannounced', 'Disrupted timing; unfair to booked clients', 'Stated capacity; "bookings are for one person"'],
          ]}
        />
      </section>

      <section id="scripts">
        <h2 className="font-serif text-2xl font-bold mb-4">Scripts for common situations</h2>

        <h3 className="font-semibold text-lg mb-2">Late cancellations</h3>
        <ArticleCallout variant="tip" title="Response to a late cancellation">
          "Thanks for letting me know. As mentioned in my booking policy, cancellations within 48 hours result in the deposit being forfeit as I wasn't able to fill the slot. I'd love to rebook you — here's my booking link when you're ready."
        </ArticleCallout>

        <h3 className="font-semibold text-lg mb-2 mt-6">Requests to add services mid-appointment</h3>
        <ArticleCallout variant="tip" title="Response to mid-appointment extras">
          "I'd love to do that for you! That would be an extra £[X] and would take an additional [time] — I do have another client after you, so I just need to check if we have time. [If yes: great, I'll add it. If no: let's book you in for a longer appointment next time.]"
        </ArticleCallout>

        <h3 className="font-semibold text-lg mb-2 mt-6">Discount requests</h3>
        <ArticleCallout variant="tip" title="Response to a discount request">
          "I appreciate your loyalty — you've been a lovely regular client. My pricing is set to reflect the time and materials for each service, so I'm not able to reduce it. I do occasionally run a promotion for my regulars — I'll make sure you're first to know."
        </ArticleCallout>

        <h3 className="font-semibold text-lg mb-2 mt-6">Late night messages</h3>
        <ArticleCallout variant="tip" title="Response to out-of-hours messages">
          "Thanks for your message! I reply to messages between [hours] — I'll get back to you then."
        </ArticleCallout>

        <ArticleTip>The key to boundary scripts is being warm but not apologetic. You're not sorry for having a policy — you're just stating how things work. Warmth without apology signals confidence.</ArticleTip>
      </section>

      <section id="policy-vs-preference">
        <h2 className="font-serif text-2xl font-bold mb-4">Policy vs. personal preference</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Some boundaries need to be formal policies (in writing, applied to everyone). Others are just preferences you communicate individually:</p>
        <ArticleTable
          headers={['Type', 'Example', 'How to handle it']}
          rows={[
            ['Formal policy', 'Cancellation terms, deposit rules, late policy', 'Written policy, visible on booking page'],
            ['Operational preference', 'No children in the space, no strong fragrance', 'Mention in booking confirmation or FAQ'],
            ['Personal limit', 'You don\'t do coffin shapes on short nail beds', 'State plainly: "That style won\'t work on your current length — here\'s what I can do."'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">Nail techs often feel they have to fulfil every request. You don't — especially on technique grounds. Declining a service you don't offer or that you know won't look right is professional, not unhelpful.</p>
      </section>

      <section id="firing-clients">
        <h2 className="font-serif text-2xl font-bold mb-4">When to stop taking a client</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">You can decline future bookings from any client, for any reason. Signs it may be time:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Repeatedly late cancellations or no-shows despite clear policy</li>
          <li>Consistently disrespects your time (late, runs over, messages constantly)</li>
          <li>Complains about or resists paying your stated prices</li>
          <li>Rude, dismissive, or undermines your work</li>
          <li>Makes appointments feel dreaded rather than neutral or enjoyable</li>
        </ul>
        <ArticleCallout variant="info" title="How to end a client relationship">
          You don't owe an explanation. If they try to book: "I'm afraid I'm not taking new bookings at the moment" or simply don't respond to booking requests. If you'd prefer to be direct: "I don't think I'm the right fit for you going forward — I'd suggest trying [other local nail tech]." Keep it brief and don't engage with pushback.
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">For policy templates to back all of this up: <Link to="/learn/nail-tech-booking-policy-template" className="underline text-[#F52B8C]">nail tech booking policy template</Link>.</p>
      </section>
    </div>
  ),
});
export {};
