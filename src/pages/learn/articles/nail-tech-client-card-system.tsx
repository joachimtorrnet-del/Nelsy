import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTable, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-client-card-system',
  title: 'How to Create a Nail Tech Client Card System',
  seoTitle: 'How to Create a Nail Tech Client Card System (What to Track)',
  excerpt: 'Knowing your clients\' history — their nail shape, sensitivities, what they liked last time — creates the personalised experience that builds loyalty. Here\'s what to record and how.',
  seoDescription: 'How to create a nail tech client card system. What client information to record, paper vs digital, consultation forms, and how client history builds loyalty and saves time.',
  category: 'policies-clients',
  tags: ['nail client card', 'nail client record', 'nail tech consultation form', 'nail client history'],
  heroImage: 'linear-gradient(135deg, #F0FDF4 0%, #D1FAE5 100%)',
  heroImageAlt: 'How to create a nail tech client card system',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-client-cards', label: 'Why client records matter' },
    { id: 'what-to-record', label: 'What to record' },
    { id: 'paper-vs-digital', label: 'Paper vs digital' },
    { id: 'consultation-form', label: 'New client consultation form' },
    { id: 'updating-records', label: 'Keeping records updated' },
  ],
  relatedSlugs: ['how-to-create-nail-client-experience', 'how-to-increase-nail-client-retention', 'how-to-handle-difficult-nail-clients', 'nail-tech-booking-policy-template'],
  faq: [
    { q: 'Is it a legal requirement to keep client records as a nail tech?', a: 'Requirements vary by jurisdiction and the services you offer. Some regions require a written record for certain chemical services. In the UK, while there\'s no universal legal requirement for nail client records, keeping them is considered best practice professionally. Check with your insurance provider — some professional indemnity insurers expect or recommend consultation records. This is not legal advice; consult a relevant authority for your situation.' },
    { q: 'Do I need GDPR consent to store client information?', a: 'In the UK and EU, storing personal data (name, health information, contact details) requires a lawful basis under GDPR. For existing clients receiving a service, this is typically the performance of a contract. Ensure you have a privacy notice, store data securely, and don\'t retain data longer than necessary. The ICO (UK) provides guidance for small businesses. This is not legal advice.' },
    { q: 'What\'s the minimum information I need on a client card?', a: 'At minimum: name, contact details, any allergies or sensitivities, nail shape preference, and the service/colour from their last appointment. Everything else is a bonus. Even this basic information significantly improves the client experience and your ability to provide safe, consistent services.' },
  ],
  relatedFeatureSlugs: ['crm', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-client-cards">
        <h2 className="font-serif text-2xl font-bold mb-4">Why client records matter</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A client who arrives and hears "what length did we do last time?" feels like a number. A client who arrives and hears "I've got your shape noted as short almond — shall we keep it the same?" feels like a valued regular. Client records are the foundation of the personalised experience that builds long-term loyalty.</p>
        <p className="text-gray-700 leading-relaxed">Beyond experience, records have practical safety value. Knowing a client had a previous reaction to a specific monomer, is pregnant, or has a fungal condition they're treating means you can make informed service decisions rather than guessing.</p>
      </section>

      <section id="what-to-record">
        <h2 className="font-serif text-2xl font-bold mb-4">What to record</h2>
        <ArticleTable
          headers={['Category', 'What to note']}
          rows={[
            ['Contact', 'Name, phone number, email, Instagram handle (if relevant)'],
            ['Health & allergies', 'Known allergies (gels, monomers, adhesives), skin conditions on hands, medications affecting nails (e.g. blood thinners), pregnancy, recent illness'],
            ['Nail preferences', 'Shape (almond, coffin, square, short), usual length, preferred finish (matte, glossy, chrome), favourite colours or shades'],
            ['Service history', 'Date, service, colour/shade used, any issues noted (lifting on specific nail, tip breakage), retention feedback'],
            ['Personal notes', 'Occupation (impacts nail length choices), lifestyle notes ("works with her hands"), upcoming events they mentioned'],
          ]}
        />
        <ArticleCallout variant="info" title="Personal notes are powerful">
          "Works as a nurse — keeps nails short and natural" or "has a wedding in May" — these small notes let you ask relevant questions and make considered recommendations. Clients notice when you remember.
        </ArticleCallout>
      </section>

      <section id="paper-vs-digital">
        <h2 className="font-serif text-2xl font-bold mb-4">Paper vs digital</h2>
        <ArticleTable
          headers={['Option', 'Pros', 'Cons']}
          rows={[
            ['Paper consultation cards', 'Simple; no tech required; physical signature for consent', 'Hard to search or sort; can be lost; takes storage space'],
            ['Spreadsheet (Google Sheets)', 'Free; searchable; accessible from any device', 'Manual to maintain; not client-facing'],
            ['Notes app with one note per client', 'Fast to update; searchable; always in your pocket', 'Not structured; easy to forget to update'],
            ['Booking platform client notes', 'Integrated with booking history; automatically linked to appointments', 'Depends on your platform\'s notes features'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">Most nail techs combine approaches: a digital consultation record on their booking platform or a spreadsheet for health/allergy information, and brief appointment notes added after each visit.</p>
      </section>

      <section id="consultation-form">
        <h2 className="font-serif text-2xl font-bold mb-4">New client consultation form</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Send a consultation form before the first appointment, or have clients complete it on arrival. Keep it focused — a 20-question form creates friction. The essentials:</p>
        <ArticleChecklist items={[
          'Full name',
          'Phone number and email',
          'Any known allergies (gels, monomers, adhesives, latex)',
          'Any current skin conditions on hands/nails',
          'Medications that may affect nails or skin',
          'Nail shape and length preference',
          'Previous nail service history (what they\'ve had before)',
          'Any previous reactions to nail services',
          'Signature / digital consent',
        ]} />
      </section>

      <section id="updating-records">
        <h2 className="font-serif text-2xl font-bold mb-4">Keeping records updated</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A client card is only useful if it's current. Build updating into your post-appointment routine:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>After each appointment, note the service, colour, and any issues (2 minutes maximum)</li>
          <li>At each appointment, ask "anything changed since we last spoke? Any new allergies or sensitivities?"</li>
          <li>Re-confirm health information annually or after a significant gap in appointments</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">For creating a positive client experience around this data: <Link to="/learn/how-to-create-nail-client-experience" className="underline text-[#F52B8C]">how to create a better nail client experience</Link>.</p>
      </section>
    </div>
  ),
});
export {};
