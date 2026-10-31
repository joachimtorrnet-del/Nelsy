import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-handle-nail-repair-request',
  title: 'How to Handle a Nail Repair Request',
  seoTitle: 'How to Handle a Nail Repair Request (Policy + Scripts)',
  excerpt: 'How you handle repair requests — who pays, when you fix for free, and how to assess what happened — is one of the most practical policy decisions in a nail business.',
  seoDescription: 'How to handle nail repair requests. When to fix for free, when to charge, assessment scripts, repair policy wording, and how to reduce repair requests going forward.',
  category: 'policies-clients',
  tags: ['nail repair request', 'nail tech repairs', 'nail lifting repair', 'nail breakage repair'],
  heroImage: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
  heroImageAlt: 'How to handle a nail repair request',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'free-vs-charged', label: 'When to repair for free vs charge' },
    { id: 'assessment', label: 'How to assess what happened' },
    { id: 'repair-policy', label: 'Your repair policy' },
    { id: 'scripts', label: 'Response scripts' },
    { id: 'reducing-repairs', label: 'Reducing repair requests' },
  ],
  relatedSlugs: ['what-to-do-when-nail-client-complains', 'how-to-improve-nail-retention', 'nail-tech-booking-policy-template', 'how-to-handle-difficult-nail-clients'],
  faq: [
    { q: 'Should I offer free repairs as standard?', a: 'Not as standard — only when the repair is clearly due to your work. Offering free repairs automatically, regardless of cause, trains clients to expect them and attracts clients who push for free services. A clear repair policy (free within X days if the issue is service-related; charged repairs thereafter or for client-caused damage) is fairer to both parties.' },
    { q: 'How do I tell if lifting was my fault or the client\'s?', a: 'Location matters: lifting at the cuticle area or near the sidewalls often indicates a prep or application issue. Lifting at the free edge or a clean snap often indicates catching on something or a product exposure issue. Ask the client about their first few days: what they used on their hands, any exposure to water/chemicals/impact. You\'re assessing, not interrogating — the goal is to understand, not to find someone to blame.' },
    { q: 'What\'s a reasonable repair window?', a: 'Most nail techs offer a free repair window of 5–7 days for service-related issues. After that, repairs are charged at the standard repair rate. This window should be stated in your booking confirmation or policy. Some nail techs offer 48 hours for colour/aesthetic issues and 5–7 days for structural (lifting, breakage) issues.' },
  ],
  relatedFeatureSlugs: ['crm', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="free-vs-charged">
        <h2 className="font-serif text-2xl font-bold mb-4">When to repair for free vs charge</h2>
        <ArticleTable
          headers={['Scenario', 'Response']}
          rows={[
            ['Lifting within 48–72 hours, likely prep or application issue', 'Free repair — this is your service guarantee in practice'],
            ['Breakage within 3–5 days with no reported impact', 'Free repair — structural issue likely service-related'],
            ['Lifting after 2+ weeks of product/water exposure', 'Paid repair — normal wear; educate on aftercare'],
            ['Client picked or peeled at the product', 'Paid repair — clearly not service-related damage'],
            ['Breakage after client described a knock or impact', 'Paid repair at your standard rate or discounted goodwill rate'],
            ['Aesthetic dissatisfaction reported at appointment', 'Address at the time — this isn\'t a repair; it\'s a consultation issue'],
          ]}
        />
        <ArticleTip>The most important principle: you\'re not automatically responsible for every issue. You\'re responsible for issues that are clearly within your control — your prep, application, and product. Client aftercare and lifestyle factors that damage nails are outside your control.</ArticleTip>
      </section>

      <section id="assessment">
        <h2 className="font-serif text-2xl font-bold mb-4">How to assess what happened</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">When a client contacts you about a repair, gather information before responding with a resolution:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Ask for a photo (good lighting, close-up of the affected nail)</li>
          <li>Note which nail and where — cuticle area, sidewall, free edge, or full lift</li>
          <li>Ask when it happened and what they were doing (dishes, gym, gardening?)</li>
          <li>Note how many days since their appointment</li>
        </ul>
        <ArticleCallout variant="tip" title="Assessment message">
          "Hi [name]! I'm sorry to hear about that. Could you send me a clear photo of the affected nail so I can see what's happened? Also helpful to know: which nail is it, and do you have an idea of when it happened / what you were doing?"
        </ArticleCallout>
      </section>

      <section id="repair-policy">
        <h2 className="font-serif text-2xl font-bold mb-4">Your repair policy</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A clear repair policy prevents ambiguity and reduces the emotional weight of individual repair conversations. Example policy wording:</p>
        <ArticleCallout variant="info" title="Example repair policy">
          "I offer a free repair guarantee for the first 5 days after your appointment for any service-related issues (lifting, breakage not caused by impact or catching). Please contact me within this window with a photo and I'll do my best to fix it promptly.{'\n\n'}Repairs requested after 5 days, or for damage caused by impact, picking, or product exposure, are charged at my standard repair rate. Please check my booking page for the current repair price."
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">Include your repair policy in your booking confirmation so clients are aware before their appointment. This prevents surprise when you enforce it.</p>
      </section>

      <section id="scripts">
        <h2 className="font-serif text-2xl font-bold mb-4">Response scripts</h2>
        <ArticleCallout variant="tip" title="Free repair (within policy, service-related)">
          "Hi [name], I can see what's happened from the photo — I'm really sorry about that. This is covered under my repair guarantee, so I'd like to fix it for you at no charge. Can you come in [proposed time] or let me know what works for you?"
        </ArticleCallout>
        <ArticleCallout variant="tip" title="Charged repair (outside policy or client-caused)">
          "Hi [name], thanks for sending the photo. Looking at the location of the lift, this looks like it may have caught on something or come into contact with a product that's loosened the bond — this kind of thing can happen even with perfect nails. This falls outside my 5-day service guarantee, but I can repair it at my repair rate of £[X]. Want to book in?"
        </ArticleCallout>
      </section>

      <section id="reducing-repairs">
        <h2 className="font-serif text-2xl font-bold mb-4">Reducing repair requests</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The best approach to repairs is having fewer of them. Key preventive measures:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Standardise your prep sequence — never skip steps even under time pressure</li>
          <li>Give clear aftercare instructions at the end of every appointment (and send them by message)</li>
          <li>Track which clients have repeated repair requests and investigate your approach with them specifically</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">Retention and prep guides: <Link to="/learn/how-to-improve-nail-retention" className="underline text-[#F52B8C]">how to improve nail retention</Link> | <Link to="/learn/nail-prep-guide" className="underline text-[#F52B8C]">nail prep guide</Link>.</p>
      </section>
    </div>
  ),
});
export {};
