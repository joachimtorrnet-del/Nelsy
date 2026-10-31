import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-no-show-policy-examples',
  title: 'Nail Tech No-Show Policy Examples',
  seoTitle: 'Nail Tech No-Show Policy Examples (Copy & Adapt)',
  excerpt: 'Ready-to-use no-show and cancellation policy templates for nail techs — plus how to communicate them without feeling awkward.',
  seoDescription: 'Nail tech no-show policy examples you can copy and adapt. Cancellation policy templates, deposit policies, and how to communicate them professionally.',
  category: 'policies-clients',
  tags: ['no-show policy', 'cancellation policy', 'nail tech policies', 'client management'],
  heroImage: 'linear-gradient(135deg, #FFF1F2 0%, #FECDD3 50%, #F9A8D4 100%)',
  heroImageAlt: 'Nail tech no-show policy examples',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'why-you-need-one', label: 'Why you need a policy' },
    { id: 'policy-templates', label: 'Ready-to-use policy templates' },
    { id: 'deposit-policies', label: 'Deposit policies' },
    { id: 'where-to-put-it', label: 'Where to put your policy' },
    { id: 'enforcing', label: 'Enforcing your policy' },
    { id: 'awkward-clients', label: 'Handling difficult clients' },
  ],
  relatedSlugs: ['nail-tech-deposit-policy', 'how-much-deposit-should-nail-tech-charge', 'why-booking-through-dms-costs-nail-techs-clients'],
  faq: [
    { q: 'Can a nail tech keep a deposit if a client cancels?', a: 'Yes — if you have a clearly stated cancellation policy that was visible before booking, and the client cancelled within the notice period you specified, you\'re entitled to keep the deposit. This is why it\'s important to have your policy in writing and visible before clients book.' },
    { q: 'How strict should a nail tech\'s cancellation policy be?', a: 'Strict enough to protect your income, flexible enough to retain good clients. A 48-hour notice requirement with deposit forfeiture for late cancellations/no-shows is the standard. Many nail techs add discretion: a genuine emergency from a long-term client is different from a habitual last-minute canceller.' },
    { q: 'What should I do when a client no-shows without contacting me?', a: 'Wait the appropriate period (usually 15–30 minutes past appointment time), then send a message: "Hi, I had you booked for [time] today. I\'ve had to open the slot for someone else. Please note that no-shows result in your deposit being forfeit. Happy to rebook for a future date." Keep it factual, not emotional.' },
  ],
  relatedFeatureSlugs: ['deposits', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-you-need-one">
        <h2 className="font-serif text-2xl font-bold mb-4">Why you need a no-show policy</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A no-show costs you the appointment fee, the time you held in your diary, and potentially another client you could have booked. Without a policy, there's no financial consequence for the client — so the behaviour continues.</p>
        <p className="text-gray-700 leading-relaxed">A clear policy, communicated before booking, sets expectations and creates accountability. Most clients never test it. The ones who would have no-showed anyway are deterred by the deposit requirement.</p>
      </section>

      <section id="policy-templates">
        <h2 className="font-serif text-2xl font-bold mb-4">Ready-to-use policy templates</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Choose the tone that fits your brand and client base. All can be edited:</p>

        <ArticleCallout variant="info" title="Standard policy (most common)">
          A non-refundable deposit of £[X] is required to secure all appointments. This deposit is deducted from your final balance.{'\n\n'}
          Cancellations made with 48+ hours' notice: deposit transferred to a future appointment.{'\n'}
          Cancellations within 48 hours: deposit is forfeit.{'\n'}
          No-shows: deposit is forfeit and a new deposit will be required to rebook.
        </ArticleCallout>

        <ArticleCallout variant="info" title="Simple version (for Instagram bio / booking page)">
          All appointments require a £[X] deposit. 48 hours' notice required for cancellations or rescheduling. Late cancellations and no-shows result in the deposit being forfeit.
        </ArticleCallout>

        <ArticleCallout variant="info" title="Warm version (for client-focused brands)">
          To secure your appointment, a small deposit of £[X] is required. This comes off your final price — so think of it as paying a little early! If you need to reschedule, just give me 48 hours' notice and we'll move it no problem. Cancellations within 48 hours or no-shows mean the deposit is non-refundable, as I won't be able to fill the slot at short notice. Thank you for understanding — it helps me keep my diary running smoothly for everyone!
        </ArticleCallout>

        <ArticleCallout variant="info" title="Premium / formal version">
          Appointment Policy{'\n'}
          A non-refundable holding deposit is required for all bookings. All clients are asked to give a minimum of 48 hours' notice for cancellations and rescheduling requests. Deposits are carried forward to a rescheduled appointment where 48 hours' notice has been given. Deposits are forfeit for cancellations within 48 hours and no-shows. Clients who no-show without contact will be required to pay in full at the time of future bookings.
        </ArticleCallout>
      </section>

      <section id="deposit-policies">
        <h2 className="font-serif text-2xl font-bold mb-4">Deposit policies</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The most effective no-show policy combines a notice requirement with a deposit. The deposit creates financial accountability at booking time; the notice requirement determines what happens to it.</p>
        <ArticleTable
          headers={['Scenario', 'Client cancels 72h+ ahead', 'Cancels within 48h', 'No-show']}
          rows={[
            ['Standard policy', 'Deposit moved to future appointment', 'Deposit forfeit', 'Deposit forfeit; new deposit required'],
            ['Strict policy', 'Deposit refunded (minus admin fee)', 'Deposit forfeit', 'Full appointment fee due'],
            ['Flexible policy', 'Deposit refunded or moved', 'First time: grace, second time: forfeit', 'Deposit forfeit'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">For deposit amount guidance: <Link to="/learn/how-much-deposit-should-nail-tech-charge" className="underline text-[#F52B8C]">How much deposit should a nail tech charge?</Link></p>
      </section>

      <section id="where-to-put-it">
        <h2 className="font-serif text-2xl font-bold mb-4">Where to put your policy</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Your policy needs to be visible before booking — not tucked away where clients can claim they didn't see it:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Booking page:</strong> A visible policy section before the booking confirmation step</li>
          <li><strong>Booking confirmation message:</strong> "Just a reminder of my cancellation policy: 48 hours' notice required..."</li>
          <li><strong>Reminder message:</strong> Brief mention in the 24-hour reminder</li>
          <li><strong>Instagram highlights:</strong> A "Policies" or "Booking info" highlight</li>
        </ul>
        <ArticleTip>Automatic reminder templates can include your policy reminder built in. See: <Link to="/tools/nail-tech-appointment-reminder-templates" className="underline text-[#F52B8C]">free nail tech appointment reminder templates</Link>.</ArticleTip>
      </section>

      <section id="enforcing">
        <h2 className="font-serif text-2xl font-bold mb-4">Enforcing your policy</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A policy you don't enforce isn't a policy — it's a suggestion. Many nail techs write a clear policy and then feel too awkward to actually keep the deposit when a client cancels late.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">Enforce your policy every time. If you make exceptions for some clients and not others, you create inconsistency that clients notice and take advantage of. The policy exists to protect you — use it.</p>
        <p className="text-gray-700 leading-relaxed">Genuine emergencies (serious illness, bereavement, accident) are different — use your judgement. But "I forgot" and "something came up" are not emergencies.</p>
      </section>

      <section id="awkward-clients">
        <h2 className="font-serif text-2xl font-bold mb-4">Handling difficult clients</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">When a client disputes a forfeit deposit, a calm factual response works best:</p>
        <ArticleCallout variant="tip" title="Response script">
          "I'm sorry you're disappointed. As stated in my booking policy (which was visible before you booked), deposits are non-refundable for cancellations within 48 hours. I wasn't able to fill that slot at short notice. I'd be happy to rebook you for a future date with a new deposit."
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">Don't engage in extended back-and-forth. State the policy once, offer to rebook, and leave the decision with them. Most clients accept this. The ones who escalate are usually not the clients you want to keep.</p>
      </section>
    </div>
  ),
});
export {};
