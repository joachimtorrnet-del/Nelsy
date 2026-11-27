import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleComparison } from '@/components/article/ArticleBodyComponents';

const ext = 'underline text-[#F52B8C]';

registerArticle({
  slug: 'best-booking-app-for-estheticians',
  title: 'Best Booking App for Estheticians: Forms, Packages and Deposits Compared',
  seoTitle: 'Best Booking App for Estheticians (2026)',
  excerpt: 'The best booking apps for estheticians and skin therapists compared: Acuity Scheduling, GlossGenius, Mangomint, Square Appointments and Nelsy, on price, intake forms, packages and deposits.',
  seoDescription: 'Best booking app for estheticians: Acuity, GlossGenius, Mangomint, Square and Nelsy compared on price, intake forms, packages and deposits.',
  category: 'comparisons',
  tags: ['best booking app for estheticians', 'esthetician booking software', 'skin care booking app', 'esthetician scheduling', 'facial booking app'],
  heroImage: 'linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%)',
  heroImageAlt: 'Best booking apps for estheticians compared',
  author: 'Nelsy Editorial',
  authorRole: 'Beauty Business Guide',
  publishedAt: '2026-11-26',
  tldr: {
    answer: 'For most estheticians, the deciding feature is client intake forms, then packages.',
    detail: 'Skin treatments often need a consultation form before the first visit, and facials are frequently sold as a series. Acuity includes custom client forms on every plan, GlossGenius has forms on Gold, and Mangomint is built for spas with forms, charting and packages.',
    points: [
      { label: 'Acuity Scheduling', text: 'Best value for solo estheticians who need intake forms and packages.' },
      { label: 'GlossGenius', text: 'Best for US estheticians who want a polished site and card reader.' },
      { label: 'Mangomint', text: 'Best for spas and teams with several providers.' },
      { label: 'Nelsy', text: 'Best for estheticians booked from Instagram who sell skincare guides or courses.' },
    ],
  },
  toc: [
    { id: 'what-to-look-for', label: 'What estheticians should look for' },
    { id: 'comparison', label: 'Comparison table' },
    { id: 'acuity', label: 'Acuity Scheduling' },
    { id: 'glossgenius', label: 'GlossGenius' },
    { id: 'mangomint', label: 'Mangomint' },
    { id: 'square', label: 'Square Appointments' },
    { id: 'nelsy', label: 'Nelsy' },
    { id: 'verdict', label: 'Verdict' },
  ],
  relatedSlugs: ['best-booking-app-for-lash-techs', 'best-booking-app-for-makeup-artists', 'acuity-scheduling-alternatives-nail-techs', 'glossgenius-alternatives-nail-techs'],
  faq: [
    { q: 'What is the best booking app for a solo esthetician?', a: 'If you need intake forms and packages on a budget, Acuity Scheduling covers both from its Standard plan ($27/month billed annually). If your clients come from Instagram and you sell skincare guides or courses, Nelsy puts bookings and products on one page.' },
    { q: 'Which booking apps include client intake forms?', a: 'Acuity lists custom client forms on every plan. GlossGenius lists forms and waivers on its Gold plan. Mangomint lists forms and charting. Square\'s appointments pricing page does not list intake forms.' },
    { q: 'How much does Mangomint cost?', a: 'Mangomint\'s pricing page lists $120 per month per location plus $10 per month per user, with add-ons such as phone lines and marketing credits priced separately.' },
    { q: 'Can I sell facial packages through a booking app?', a: 'Acuity sells appointment packages, including payment plans, on Standard and Premium. Mangomint lists memberships and packages. GlossGenius and Square have their own options; check the plan before you commit.' },
    { q: 'Do estheticians need a HIPAA-compliant booking app?', a: 'It depends on your services and where you work. Acuity offers a Business Associate Agreement on its Premium plan. If you perform medical treatments, check your local rules and ask the provider directly.' },
  ],
  relatedFeatureSlugs: ['bookings', 'deposits', 'digital-products'],
  relatedLinks: { tool: '/tools/booking-app-fee-calculator', pages: ['/use-cases/independent-beauty-pros', '/features/deposits', '/features/payments'] },
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="info" title="How we sourced these figures">
        Every competitor figure comes from the vendor&apos;s official pricing page, checked on November 27, 2026: <a href="https://acuityscheduling.com/pricing" rel="nofollow noopener" target="_blank" className={ext}>Acuity Scheduling</a>, <a href="https://www.glossgenius.com/pricing" rel="nofollow noopener" target="_blank" className={ext}>GlossGenius</a>, <a href="https://www.mangomint.com/pricing/" rel="nofollow noopener" target="_blank" className={ext}>Mangomint</a> and <a href="https://squareup.com/us/en/appointments/pricing" rel="nofollow noopener" target="_blank" className={ext}>Square Appointments</a>. Prices are in USD and exclude tax, and can change, so check each page before you sign up. We left Vagaro out because its pricing page only showed us UK pricing, which we could not confirm for the US. Nelsy is our product.
      </ArticleCallout>

      <section id="what-to-look-for">
        <h2 className="font-serif text-2xl font-bold mb-4">What estheticians should look for</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Intake and consultation forms</strong> sent before the first visit: skin concerns, allergies, medication, consent.</li>
          <li><strong>Packages or series</strong>, since many facials and peels work best as a course of treatments.</li>
          <li><strong>Deposits</strong> for longer or premium treatments.</li>
          <li><strong>A way to sell what you know</strong>: a skincare routine guide, a course, or virtual consultations.</li>
        </ul>
      </section>

      <section id="comparison">
        <h2 className="font-serif text-2xl font-bold mb-4">Comparison table</h2>
        <ArticleTable
          headers={['App', 'Price', 'Intake forms', 'Packages', 'Free trial']}
          rows={[
            ['Acuity Scheduling', 'Starter $16 yearly or $20 monthly; Standard $27 / $34; Premium $55 / $69', 'Custom client forms on all plans', 'Standard and Premium', '7 days'],
            ['GlossGenius', 'Standard $24 yearly or $28 monthly; Gold $48 / $56; Platinum $148 / $168', 'Forms and waivers on Gold', 'Not detailed on the pricing page', '14 days'],
            ['Mangomint', '$120 per location + $10 per user, per month', 'Forms and charting', 'Memberships and packages', 'Trial offered (length not stated)'],
            ['Square Appointments', 'Free $0; Plus $49; Premium $149 per location', 'Not listed', 'Not listed on the appointments page', '30 days on Plus and Premium'],
            ['Nelsy', '$29, or $25 billed yearly', 'Not offered', 'Not offered', '14 days'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed text-sm">
          Card fees: GlossGenius 2.4% + $0.15 in person, 3.4% + $0.15 online; Square Free 2.6% + 15¢ in person, 3.3% + 30¢ online; Acuity uses Stripe, Square, PayPal or Venmo; Mangomint does not publish its processing rate on the pricing page; Nelsy uses standard Stripe fees. Prices checked on November 27, 2026 on each vendor&apos;s official pricing page.
        </p>
      </section>

      <section id="acuity">
        <h2 className="font-serif text-2xl font-bold mb-4">1. Acuity Scheduling</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Acuity includes payments (via Stripe, Square, PayPal or Venmo), email reminders and custom client forms on every plan, starting at $16/month billed annually ($20 monthly). Standard ($27/$34) adds text reminders, a waitlist, packages with payment plans, memberships and gift certificates. Premium ($55/$69) adds a HIPAA Business Associate Agreement and removes Acuity branding. 7-day trial, no card required.
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> solo estheticians who want forms and packages without paying spa-software prices.</p>
        <ArticleComparison
          items={[
            { label: 'Pros', pros: ['Forms and payments on every plan', 'Packages and memberships from Standard', 'BAA available on Premium'], cons: [] },
            { label: 'Cons', pros: [], cons: ['Text reminders and packages need Standard', 'Generic design', 'BAA only on Premium'] },
          ]}
        />
      </section>

      <section id="glossgenius">
        <h2 className="font-serif text-2xl font-bold mb-4">2. GlossGenius</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          GlossGenius has a Beauty and Wellness range (Standard $24/$28, Gold $48/$56, Platinum $148/$168) and a separate Medspa and Aesthetics range from $148/month billed annually. Gold adds forms and waivers and an automated waitlist. Deposits and no-show policies are built in, with a 14-day trial.
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> US estheticians who want a polished booking website and in-person card payments.</p>
        <ArticleComparison
          items={[
            { label: 'Pros', pros: ['Custom booking website', 'Built-in deposits', 'Separate plans for medspas'], cons: [] },
            { label: 'Cons', pros: [], cons: ['Forms need Gold', '3.4% + $0.15 online', 'Prices in USD only'] },
          ]}
        />
      </section>

      <section id="mangomint">
        <h2 className="font-serif text-2xl font-bold mb-4">3. Mangomint</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Mangomint is salon and spa software priced by usage: $120/month per location plus $10/month per user. Forms and charting, memberships and packages are listed features. Phone lines ($70/month per line), marketing credits (from $30/month) and payroll are extra. Onboarding and data transfer are listed as free, with no contracts.
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> spas and skin clinics with several providers.</p>
        <ArticleComparison
          items={[
            { label: 'Pros', pros: ['Forms and charting', 'Memberships and packages', 'Free onboarding and data transfer'], cons: [] },
            { label: 'Cons', pros: [], cons: ['$130/month for one location and one user ($120 + $10)', 'Processing rate not on the pricing page', 'More than a solo esthetician needs'] },
          ]}
        />
      </section>

      <section id="square">
        <h2 className="font-serif text-2xl font-bold mb-4">4. Square Appointments</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Square&apos;s Free plan includes an online booking site, reminders and unlimited staff calendars at $0. Plus ($49/month per location) adds cancellation policies and no-show fees. Square lists appointment deposits and prepayments as features without naming the plan. Its appointments pricing page does not list intake forms.
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> estheticians starting out who want a free booking link.</p>
      </section>

      <section id="nelsy">
        <h2 className="font-serif text-2xl font-bold mb-4">5. Nelsy</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Nelsy is a booking page and link-in-bio store. Each treatment can be set to pay on arrival, a deposit or full payment upfront, and you can record cash or card paid at the studio. On the same page you can sell a skincare routine guide, a course, virtual coaching or a membership. $29/month or $25/month billed yearly, 14-day trial, 0% Nelsy commission (standard Stripe fees apply).
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> estheticians who build their client base on Instagram and sell education or digital products.</p>
        <ArticleComparison
          items={[
            { label: 'Pros', pros: ['Payment mode set per treatment', 'Bookings and digital products on one link', '0% Nelsy commission'], cons: [] },
            { label: 'Cons', pros: [], cons: ['No intake forms', 'No treatment packages', 'Not built for multi-room spas'] },
          ]}
        />
      </section>

      <section id="verdict">
        <h2 className="font-serif text-2xl font-bold mb-4">Verdict</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Forms and packages on a budget:</strong> Acuity Standard.</li>
          <li><strong>US studio with card payments:</strong> GlossGenius Gold.</li>
          <li><strong>Spa or team:</strong> Mangomint.</li>
          <li><strong>Free start:</strong> Square Appointments Free.</li>
          <li><strong>Instagram-led business that sells education:</strong> Nelsy, with your intake form handled separately.</li>
        </ul>
        <ArticleTip>If intake forms are a must, test the full first-visit flow in the free trial: book as a client, fill the form, and check you receive it before the appointment.</ArticleTip>
        <p className="text-gray-700 mt-4 leading-relaxed">
          See a Nelsy booking page in the <Link to="/demo" className={ext}>live demo</Link>, or compare plans on the <Link to="/pricing" className={ext}>pricing page</Link>.
        </p>
      </section>
    </div>
  ),
});
export {};
