import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-fill-january-nail-appointments',
  title: 'How to Fill January Nail Appointments',
  seoTitle: 'How to Fill January Nail Appointments as a Nail Tech',
  excerpt: 'January is notoriously slow for beauty businesses. Here\'s how to fill your diary after Christmas — without discounting your prices or panicking.',
  seoDescription: 'How to fill January nail appointments. Beat the post-Christmas slump with smart marketing, re-engagement campaigns, and strategies that work for nail techs.',
  category: 'get-clients',
  tags: ['fill january nail appointments', 'january nail tech marketing', 'slow january nail business'],
  heroImage: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
  heroImageAlt: 'How to fill January nail appointments',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-january-slow', label: 'Why January is slow and what to expect' },
    { id: 'pre-jan-strategy', label: 'Pre-January strategy (do this in December)' },
    { id: 'content-angles', label: 'January content angles' },
    { id: 're-engagement', label: 'Re-engaging lapsed clients' },
    { id: 'offers', label: 'January offers without heavy discounts' },
  ],
  relatedSlugs: ['how-to-handle-christmas-nail-rush', 'christmas-marketing-ideas-nail-techs', 'nail-tech-client-follow-up-templates', 'how-to-get-more-nail-clients'],
  faq: [
    { q: 'Should I discount in January to fill slots?', a: 'Discounting in January can work short-term but trains clients to wait for cheaper prices. A better approach: promotions that add value (nail art add-on, product bundle, loyalty reward) rather than straight price cuts. If you do discount, limit it to new clients only or specific slow slots — not your full service menu.' },
    { q: 'How bad is the January slump really?', a: 'It varies significantly by location, client base, and how well you prepared. Nail techs who take bookings in December for January, keep their social media active, and re-engage lapsed clients typically have a manageable January. Those who go quiet through December and do nothing until January opens can experience a real dip.' },
  ],
  relatedFeatureSlugs: ['email-newsletters', 'bookings', 'audience-capture'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-january-slow">
        <h2 className="font-serif text-2xl font-bold mb-4">Why January is slow and what to expect</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">January is slow for most beauty businesses for predictable reasons: clients overspent in December, they're in "new year savings mode," routines are disrupted, and nail appointments feel like a luxury after the festive splurge.</p>
        <p className="text-gray-700 leading-relaxed">This is normal and manageable. The nail techs who fill January are those who plan for it in December — not those who start marketing in the second week of January after a quiet first week.</p>
      </section>

      <section id="pre-jan-strategy">
        <h2 className="font-serif text-2xl font-bold mb-4">Pre-January strategy (do this in December)</h2>
        <ArticleTable
          headers={['Action', 'When to do it']}
          rows={[
            ['Open January availability for booking', 'Mid to late December'],
            ['Mention January availability at every December appointment', 'Throughout December'],
            ['Post about January slots on Instagram before Christmas', 'Mid December'],
            ['Message regulars who didn\'t rebook for January', 'Last week of December or first week of January'],
          ]}
        />
        <ArticleCallout variant="info" title="Book January in December">
          The most effective way to fill January is to take the bookings in December, while clients are in your chair and in a positive mood. "Shall we book your next appointment before Christmas?" converts better than any January marketing campaign.
        </ArticleCallout>
      </section>

      <section id="content-angles">
        <h2 className="font-serif text-2xl font-bold mb-4">January content angles</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>"New year, fresh nails"</strong> — the most reliable January hook; new year = new look</li>
          <li><strong>Nail care recovery angle</strong> — "give your nails some love after Christmas"</li>
          <li><strong>New year nail aesthetic</strong> — cleaner, more minimal looks after festive maximalism</li>
          <li><strong>2027 nail trends</strong> — what you're excited to be doing this year (link to trends content)</li>
          <li><strong>Behind the scenes: January prep</strong> — setting up your space for the new year, new products</li>
          <li><strong>Self-care in January</strong> — an appointment as a wellbeing treat, not a luxury splurge</li>
        </ul>
      </section>

      <section id="re-engagement">
        <h2 className="font-serif text-2xl font-bold mb-4">Re-engaging lapsed clients</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">January is a great time to reach out to clients who didn't book over Christmas or haven't been in for a while:</p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name]! Happy new year 🎉 Hope you had a wonderful Christmas! I'm back to normal bookings in January and would love to see you for a fresh set. I have some great availability coming up — book at [link] or let me know what works for you! 💕
        </blockquote>
        <p className="text-gray-700 leading-relaxed">More re-engagement templates: <Link to="/learn/nail-tech-client-follow-up-templates" className="underline text-[#F52B8C]">nail tech client follow-up templates</Link>.</p>
      </section>

      <section id="offers">
        <h2 className="font-serif text-2xl font-bold mb-4">January offers without heavy discounts</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>New client first-visit offer</strong> — a small discount or nail art add-on for brand new clients only; not for your existing base</li>
          <li><strong>Refer a friend promotion</strong> — give existing clients a reason to bring someone new in January</li>
          <li><strong>January challenge</strong> — "book 3 appointments in January, get a loyalty reward" style programme</li>
          <li><strong>Nail care add-on</strong> — nail treatment or cuticle care promotion positioned as post-Christmas recovery</li>
          <li><strong>Instagram giveaway</strong> — a free appointment to generate reach and engagement at the start of the year</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
