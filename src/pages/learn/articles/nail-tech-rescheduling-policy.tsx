import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-rescheduling-policy',
  title: 'Nail Tech Rescheduling Policy Examples',
  seoTitle: 'Nail Tech Rescheduling Policy Examples (Templates)',
  excerpt: 'Rescheduling is different from cancelling — but without a clear policy, clients treat them the same way. Templates and guidance for nail techs.',
  seoDescription: 'Nail tech rescheduling policy examples and templates. How to handle reschedule requests, protect your diary, and what to do with deposits when clients reschedule.',
  category: 'policies-clients',
  tags: ['rescheduling policy', 'nail tech policy', 'reschedule', 'client management'],
  heroImage: 'linear-gradient(135deg, #EFF6FF 0%, #BAE6FD 100%)',
  heroImageAlt: 'Nail tech rescheduling policy examples',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'reschedule-vs-cancel', label: 'Rescheduling vs cancelling' },
    { id: 'policy-options', label: 'Policy options' },
    { id: 'templates', label: 'Policy templates' },
    { id: 'deposit-handling', label: 'What to do with deposits' },
    { id: 'repeat-reschedulers', label: 'Handling repeat reschedulers' },
  ],
  relatedSlugs: ['nail-tech-cancellation-policy', 'nail-tech-booking-policy-template', 'how-much-deposit-should-nail-tech-charge'],
  faq: [
    { q: 'Should I charge a rescheduling fee?', a: 'Most nail techs don\'t charge a rescheduling fee if adequate notice is given — they simply transfer the deposit to the new appointment. A rescheduling fee makes more sense for clients who reschedule repeatedly with short notice. It\'s also harder to enforce and can feel punitive. Focus on a clear notice requirement and deposit transfer policy instead.' },
    { q: 'How many times should I let a client reschedule?', a: 'There\'s no universal rule, but 2–3 reschedules for the same appointment with short notice each time is a pattern worth addressing. After the second last-minute reschedule, consider requiring full payment upfront or declining to rebook.' },
    { q: 'What do I do if a client wants to reschedule last minute?', a: 'Apply your cancellation policy. A last-minute reschedule (within your notice period) is functionally the same as a last-minute cancellation — you\'re losing the slot with insufficient time to fill it. Deposit forfeits; they can rebook with a new deposit.' },
  ],
  relatedFeatureSlugs: ['bookings', 'deposits'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="reschedule-vs-cancel">
        <h2 className="font-serif text-2xl font-bold mb-4">Rescheduling vs cancelling — why the distinction matters</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Clients often treat rescheduling as a softer version of cancelling — as if giving you a new date makes it okay to give short notice. From a business perspective, a last-minute reschedule has the same impact as a last-minute cancellation: you've lost the slot with no time to fill it.</p>
        <p className="text-gray-700 leading-relaxed">A clear rescheduling policy separates the two cases: rescheduling with adequate notice (deposit transfers), and rescheduling without notice (deposit forfeits, new deposit required to rebook).</p>
      </section>

      <section id="policy-options">
        <h2 className="font-serif text-2xl font-bold mb-4">Policy options</h2>
        <ArticleTable
          headers={['Policy approach', 'How it works']}
          rows={[
            ['Notice-based transfer', 'With 48h+ notice, deposit transfers to new date. Under 48h, deposit forfeits.'],
            ['Limited reschedules', 'Allow one free reschedule with notice; second reschedule requires new deposit regardless of notice.'],
            ['Same-week rule', 'Rescheduling to another slot in the same week is fine; rescheduling to a date more than 7 days away requires a new deposit.'],
          ]}
        />
        <ArticleTip>The simplest policy: treat rescheduling the same as cancelling for notice period purposes. With adequate notice, deposit transfers. Without adequate notice, deposit forfeits. One policy covers both situations.</ArticleTip>
      </section>

      <section id="templates">
        <h2 className="font-serif text-2xl font-bold mb-4">Policy templates</h2>
        <ArticleCallout variant="info" title="Simple version">
          To reschedule, please give me at least 48 hours\' notice. With 48+ hours\' notice, your deposit will be carried over to your new appointment. Rescheduling requests with less than 48 hours\' notice will result in the deposit being forfeit, and a new deposit will be required to book another slot.
        </ArticleCallout>

        <ArticleCallout variant="info" title="Detailed version">
          Rescheduling Policy{'\n\n'}
          I understand that plans change. If you need to reschedule your appointment:{'\n\n'}
          48+ hours\' notice: Your deposit will be transferred to your new appointment date.{'\n\n'}
          Less than 48 hours\' notice: As I\'m unlikely to fill the slot at short notice, the deposit will not be transferred. A new deposit will be required to book a future appointment.{'\n\n'}
          Please note: I can only accommodate one reschedule per booking. If the rescheduled appointment needs to change again, a new deposit will be required.
        </ArticleCallout>
      </section>

      <section id="deposit-handling">
        <h2 className="font-serif text-2xl font-bold mb-4">What to do with deposits when clients reschedule</h2>
        <ArticleTable
          headers={['Scenario', 'Deposit handling']}
          rows={[
            ['Rescheduled with 48h+ notice', 'Transfer to new appointment date'],
            ['Rescheduled with less than 48h notice', 'Forfeit; new deposit required for next booking'],
            ['Second reschedule of same booking', 'New deposit required regardless of notice'],
            ['Reschedule to a date more than 1 month away', 'Your choice — some nail techs expire deposits after 30 days'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">Note: if your booking platform handles deposits automatically, check how it manages rescheduled appointments — some automatically transfer deposits, others forfeit them. Know your platform's behavior so your policy matches what actually happens.</p>
      </section>

      <section id="repeat-reschedulers">
        <h2 className="font-serif text-2xl font-bold mb-4">Handling repeat reschedulers</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Some clients habitually reschedule — always with a valid-sounding reason, always at the last minute, never actually arriving. These clients occupy diary slots that could be filled by reliable clients. Options:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Apply the deposit forfeit policy consistently — after two forfeited deposits, the pattern often stops</li>
          <li>Require full payment upfront for a client's third booking (after two rescheduled appointments)</li>
          <li>Stop accepting bookings from the client — you're allowed to decline bookings</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">See: <Link to="/learn/how-to-set-boundaries-with-nail-clients" className="underline text-[#F52B8C]">how to set boundaries with nail clients</Link>.</p>
      </section>
    </div>
  ),
});
export {};
