import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-create-nail-client-experience',
  title: 'How to Create a Better Nail Client Experience',
  seoTitle: 'How to Create a Better Nail Client Experience (Every Touchpoint)',
  excerpt: 'The nail service is only part of what clients pay for. The experience around it — from booking to walking out the door — is what determines whether they come back and refer others.',
  seoDescription: 'How to create a better nail client experience. Every touchpoint from booking to follow-up — what excellent looks like and how to improve each stage for better retention.',
  category: 'policies-clients',
  tags: ['nail client experience', 'nail tech client service', 'nail appointment experience', 'nail client satisfaction'],
  heroImage: 'linear-gradient(135deg, #FFF0F6 0%, #FBCFE8 100%)',
  heroImageAlt: 'How to create a better nail client experience',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'booking', label: 'The booking experience' },
    { id: 'before-appointment', label: 'Before the appointment' },
    { id: 'arrival', label: 'Arrival and setup' },
    { id: 'during', label: 'During the appointment' },
    { id: 'finish', label: 'The finish and checkout' },
    { id: 'after', label: 'After the appointment' },
  ],
  relatedSlugs: ['nail-tech-client-card-system', 'how-to-increase-nail-client-retention', 'how-to-get-more-nail-client-rebookings', 'nail-client-welcome-message-templates'],
  faq: [
    { q: 'What part of the client experience matters most?', a: 'The beginning and end of any appointment have the strongest impact on memory and satisfaction. Getting the arrival and welcome right (first impression), and the finish and rebooking right (last impression) are the two highest-leverage investments. The middle — the service itself — matters for quality and results, but clients who feel welcomed at the start and cared for at the end tend to rebook even if the conversation during the service was quiet.' },
    { q: 'Does the physical environment matter for a home nail tech?', a: 'Yes — a clean, pleasant, dedicated space is important even for home-based techs. Clients are coming to your home, and the professionalism of your setup significantly affects their experience and perception of your work. A dedicated nail area (not the kitchen table) with good lighting, a clean setup, and a pleasant smell signals that this is a real business, not a casual favour.' },
    { q: 'How do I improve the client experience without it becoming a performance?', a: 'The best client experience isn\'t a scripted performance — it\'s genuine attentiveness. Ask about preferences rather than assuming. Remember small details. Calibrate your conversation to the client\'s cues (some want to chat, some want quiet time). The goal is for clients to feel comfortable and cared for, not entertained.' },
  ],
  relatedFeatureSlugs: ['crm', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="booking">
        <h2 className="font-serif text-2xl font-bold mb-4">The booking experience</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The client experience begins before they arrive — at the moment they try to book. Friction at the booking stage doesn't just lose the booking; it shapes the client's first impression of how professional your business is.</p>
        <ArticleTable
          headers={['Touchpoint', 'What excellent looks like']}
          rows={[
            ['Finding your booking page', 'One tap from your Instagram bio; clear link; loads on mobile'],
            ['Booking form', 'Services clearly described with prices; easy to select; no unnecessary questions'],
            ['Confirmation', 'Instant confirmation with appointment details, location/address, and what to expect'],
            ['Policy communication', 'Deposit, cancellation, and late arrival policy stated clearly before payment — no surprises'],
          ]}
        />
      </section>

      <section id="before-appointment">
        <h2 className="font-serif text-2xl font-bold mb-4">Before the appointment</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A reminder message 24–48 hours before isn't just a practical tool — it's an opportunity to build anticipation and show attentiveness:</p>
        <ArticleCallout variant="tip" title="Reminder message tone">
          "Looking forward to seeing you tomorrow at [time]! Just a reminder to arrive with bare nails / remove any existing polish before your appointment. Let me know if anything changes 💅"
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">This is also a good moment to include any prep instructions (remove old product, arrive with clean nails) that affect your workflow — said warmly, not as a demand.</p>
      </section>

      <section id="arrival">
        <h2 className="font-serif text-2xl font-bold mb-4">Arrival and setup</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Acknowledge the client immediately when they arrive — don't keep them waiting or uncertain</li>
          <li>Offer something to make them comfortable: a drink, somewhere to put their bag, a moment to settle</li>
          <li>For new clients: a quick tour of your setup helps them feel oriented and builds trust</li>
          <li>Your space: clean, well-lit, good ventilation, pleasant without being overwhelming</li>
        </ul>
        <ArticleTip>The 30 seconds after a client walks through the door sets the tone for the entire appointment. Being warm, ready, and genuinely pleased to see them is not performative — clients can tell when welcome is genuine.</ArticleTip>
      </section>

      <section id="during">
        <h2 className="font-serif text-2xl font-bold mb-4">During the appointment</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The quality of your work is the foundation — but the experience around it matters:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Consultation before starting:</strong> Ask, don't assume — nail shape, colour, any changes since last time</li>
          <li><strong>Calibrate conversation:</strong> Some clients want to chat; some want peaceful quiet time. Follow their lead rather than filling silence</li>
          <li><strong>Narrate what you're doing:</strong> Especially for new clients or new services — brief explanation builds trust and reduces anxiety</li>
          <li><strong>Show progress:</strong> Let clients see their nails before topcoat, before filing is complete — people love being included in the process</li>
        </ul>
      </section>

      <section id="finish">
        <h2 className="font-serif text-2xl font-bold mb-4">The finish and checkout</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The end of the appointment is the highest-converting moment for rebooking, review requests, and referrals — because the client's satisfaction is at its peak:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Take a moment to let the client admire the finished set before moving to payment</li>
          <li>Give aftercare advice — brief, practical, specific to what they've had</li>
          <li>Offer to rebook: "Shall I put you in for your next appointment now?"</li>
          <li>Ask for a review naturally: "If you're happy, a Google review means the world to me — I'll text you the link"</li>
        </ul>
      </section>

      <section id="after">
        <h2 className="font-serif text-2xl font-bold mb-4">After the appointment</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A brief follow-up 2–3 days after the appointment is rare enough that it genuinely stands out — and it shows you care about the result beyond the session:</p>
        <ArticleCallout variant="tip" title="Post-appointment follow-up">
          "Hey [name]! Just checking in — how are you getting on with your nails? Hope they're settling in beautifully 🤍"
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">This message also creates a natural opening for the client to mention any issues early — a potential lifting problem addressed at day 3 is a small fix; the same problem at week 3 is a disappointed client.</p>
        <p className="text-gray-700 leading-relaxed">For message templates across the client journey: <Link to="/learn/nail-client-welcome-message-templates" className="underline text-[#F52B8C]">nail client welcome message templates</Link>.</p>
      </section>
    </div>
  ),
});
export {};
