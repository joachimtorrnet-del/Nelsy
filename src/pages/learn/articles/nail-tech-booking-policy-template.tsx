import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTable, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-booking-policy-template',
  title: 'Nail Tech Booking Policy Template',
  seoTitle: 'Nail Tech Booking Policy Template (Copy & Customise)',
  excerpt: 'A complete booking policy template for nail techs — covering deposits, cancellations, rescheduling, late arrivals, and no-shows in one place.',
  seoDescription: 'Nail tech booking policy template. Complete policy covering deposits, cancellations, rescheduling, late arrivals, and no-shows — copy, edit, and use immediately.',
  category: 'policies-clients',
  tags: ['booking policy', 'nail tech policy template', 'nail policy', 'client booking policy'],
  heroImage: 'linear-gradient(135deg, #F0FDFA 0%, #99F6E4 100%)',
  heroImageAlt: 'Nail tech booking policy template',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'complete-template', label: 'Complete policy template' },
    { id: 'short-version', label: 'Short version (for booking pages)' },
    { id: 'section-breakdown', label: 'Section-by-section breakdown' },
    { id: 'where-to-use', label: 'Where to use each version' },
    { id: 'customising', label: 'How to customise it' },
  ],
  relatedSlugs: ['nail-tech-cancellation-policy', 'nail-tech-no-show-policy-examples', 'nail-tech-late-policy', 'how-much-deposit-should-nail-tech-charge'],
  faq: [
    { q: 'Do I need a written booking policy as a nail tech?', a: 'Yes — for your protection and your client\'s clarity. A visible written policy you can point to is much more useful than a verbal understanding if a dispute arises. It also sets professional expectations that make most issues less likely to occur in the first place.' },
    { q: 'Can I use the same policy for all clients?', a: 'Yes — a uniform policy is better than case-by-case decisions. Consistency prevents the perception of favouritism and makes enforcing the policy much easier. You can use discretion in genuine emergencies, but the written policy should apply equally to all clients.' },
    { q: 'What if a client says they didn\'t see my policy?', a: 'This is why it needs to be on your booking page (visible before booking is completed), in your confirmation message, and mentioned in the reminder. Three touchpoints makes "I didn\'t know" very hard to sustain. If the policy was visible before they booked, they agreed to it by completing the booking.' },
  ],
  relatedFeatureSlugs: ['bookings', 'deposits'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="complete-template">
        <h2 className="font-serif text-2xl font-bold mb-4">Complete policy template</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Copy this template and edit the details in brackets:</p>
        <ArticleCallout variant="info" title="[Your Business Name] — Booking Policy">
          Thank you for booking with me! Please read the following so we both know what to expect.{'\n\n'}
          DEPOSITS{'\n'}
          All appointments require a non-refundable deposit of £[X] to confirm your booking. This deposit is deducted from your final balance at the time of your appointment.{'\n\n'}
          CANCELLATIONS & RESCHEDULING{'\n'}
          I ask for a minimum of 48 hours\' notice for any cancellation or rescheduling request.{'\n'}
          • With 48+ hours\' notice: your deposit will be transferred to a future appointment.{'\n'}
          • Within 48 hours: the deposit is non-refundable. A new deposit will be required to rebook.{'\n\n'}
          NO-SHOWS{'\n'}
          If you do not attend your appointment without contacting me, your deposit is forfeit. A new full-price deposit will be required for any future booking.{'\n\n'}
          LATE ARRIVALS{'\n'}
          Please arrive on time. If you are more than 15 minutes late, I may need to shorten your service to avoid affecting subsequent clients, or reschedule your appointment. The full service price applies regardless of time remaining.{'\n\n'}
          HOW TO CANCEL OR RESCHEDULE{'\n'}
          Please message me on Instagram [@your_handle] or reply to your booking confirmation.{'\n\n'}
          Thank you for understanding — these policies help me provide the best possible service to all my clients.
        </ArticleCallout>
      </section>

      <section id="short-version">
        <h2 className="font-serif text-2xl font-bold mb-4">Short version (for booking pages)</h2>
        <ArticleCallout variant="info" title="Short booking policy">
          All appointments require a £[X] deposit. 48 hours\' notice required to cancel or reschedule without losing your deposit. No-shows and late cancellations forfeit the deposit. Please arrive on time — clients more than 15 minutes late may receive a shortened service.
        </ArticleCallout>
      </section>

      <section id="section-breakdown">
        <h2 className="font-serif text-2xl font-bold mb-4">Section-by-section breakdown</h2>
        <ArticleTable
          headers={['Section', 'What it covers', 'Essential?']}
          rows={[
            ['Deposits', 'Amount, when collected, what happens to it', 'Yes'],
            ['Cancellations', 'Notice period, deposit handling', 'Yes'],
            ['Rescheduling', 'Same as cancellation or different rules', 'Yes'],
            ['No-shows', 'What happens if client doesn\'t arrive', 'Yes'],
            ['Late arrivals', 'Grace period, shortened service policy', 'Recommended'],
            ['How to cancel', 'Specific contact method', 'Recommended'],
            ['Exceptions clause', 'Genuine emergencies at nail tech\'s discretion', 'Optional'],
          ]}
        />
      </section>

      <section id="where-to-use">
        <h2 className="font-serif text-2xl font-bold mb-4">Where to use each version</h2>
        <ArticleTable
          headers={['Location', 'Version to use']}
          rows={[
            ['Booking page (before client books)', 'Short version — visible before commitment'],
            ['Booking confirmation message', 'Full version — client can read in detail after booking'],
            ['24-hour reminder', 'Brief mention only: "As a reminder, late cancellations forfeit the deposit"'],
            ['Instagram highlights / bio', 'Short version or link to your booking page'],
          ]}
        />
      </section>

      <section id="customising">
        <h2 className="font-serif text-2xl font-bold mb-4">How to customise it</h2>
        <ArticleChecklist title="Customisation checklist" items={[
          'Replace £[X] with your actual deposit amount',
          'Replace 48 hours with your notice period if different',
          'Replace 15 minutes with your actual late grace period',
          'Replace [@your_handle] with your Instagram handle',
          'Adjust the tone to match your brand voice (warmer or more formal)',
          'Add any service-specific policies (e.g. different notice for long bookings)',
          'Review annually — update if your policies change',
        ]} />
        <p className="text-gray-700 mt-4 leading-relaxed">Generate a customised version automatically: <Link to="/tools/nail-tech-cancellation-policy-generator" className="underline text-[#F52B8C]">nail tech cancellation policy generator</Link>. For individual policy guides: <Link to="/learn/nail-tech-cancellation-policy" className="underline text-[#F52B8C]">cancellation policy guide</Link> | <Link to="/learn/nail-tech-no-show-policy-examples" className="underline text-[#F52B8C]">no-show policy examples</Link>.</p>
      </section>
    </div>
  ),
});
export {};
