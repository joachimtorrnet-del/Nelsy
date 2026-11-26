import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

const link = 'underline text-[#F52B8C]';

registerArticle({
  slug: 'how-to-handle-nail-client-no-shows',
  title: 'How to Handle Nail Client No-Shows Professionally',
  seoTitle: 'How to Handle Nail Client No-Shows Professionally (Scripts + Policy)',
  excerpt: 'No-shows are one of the most frustrating parts of running a nail business. Here\'s how to respond professionally, enforce your policy fairly, and reduce no-shows in the first place.',
  seoDescription: 'How to handle nail client no-shows professionally. How to respond, enforce your cancellation policy, message scripts, and systems to reduce no-shows going forward.',
  category: 'policies-clients',
  tags: ['nail client no-show', 'nail no-show policy', 'nail cancellation', 'nail tech no-show'],
  heroImage: 'linear-gradient(135deg, #FFF7ED 0%, #FDDBB5 100%)',
  heroImageAlt: 'How to handle nail client no-shows professionally',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  updatedAt: '2026-11-26',
  tldr: {
    answer: 'When a nail client doesn\'t show, message them after 10 minutes, release the slot after 15, keep the deposit as your policy says, and send a calm rebooking message the same day.',
    detail: 'Then escalate by pattern, not by mood: first no-show keeps the deposit, second requires full payment upfront, third means you can decline future bookings. Prevent the next one with deposits and a 24-hour reminder.',
    points: [
      { label: 'In the moment', text: 'Check-in message at 10 minutes, slot released at 15.' },
      { label: 'Same day', text: 'Neutral follow-up: policy applied, booking link included.' },
      { label: 'Next time', text: 'Deposit on every booking, reminders at 48 and 24 hours.' },
    ],
  },
  toc: [
    { id: 'in-the-moment', label: 'What to do when a client doesn\'t show' },
    { id: 'follow-up', label: 'The follow-up message' },
    { id: 'enforcing-policy', label: 'Enforcing your policy' },
    { id: 'repeat-no-shows', label: 'Repeat no-show clients' },
    { id: 'prevention', label: 'Preventing no-shows' },
  ],
  relatedSlugs: ['nail-tech-no-show-policy-examples', 'nail-tech-cancellation-policy', 'nail-tech-deposit-policy', 'how-to-set-boundaries-with-nail-clients'],
  faq: [
    { q: 'Should I charge a no-show fee?', a: 'Yes, if it is in a policy the client saw before booking. The simplest version is a deposit taken at booking that is kept on a no-show: nothing to chase and no awkward invoice. Example: a £20 deposit on a £50 set means a no-show costs you £30 instead of £50.' },
    { q: 'What if a client had a genuine emergency?', a: 'Use discretion, and decide your rule in advance. A first no-show caused by a real emergency (hospital, family crisis) can be treated as goodwill: move the deposit to a new date and note it on the client record. Don\'t make waiving the default, or the policy stops working.' },
    { q: 'Can I refuse to rebook a client who no-showed?', a: 'Yes. As an independent business you choose who you book. A fair sequence is: first no-show keeps the deposit, second no-show means full payment upfront for future bookings, third no-show means you politely decline. Tell the client the rule at the second step so the third is not a surprise.' },
    { q: 'How long should I wait before treating it as a no-show?', a: 'Message at about 10 minutes and release the slot at 15 minutes if there is no reply, unless your late policy says otherwise. State the number in your booking policy, for example "arrivals more than 15 minutes late may need to be rescheduled".' },
  ],
  relatedFeatureSlugs: ['deposits', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="in-the-moment">
        <h2 className="font-serif text-2xl font-bold mb-4">What to do when a client doesn&apos;t show</h2>
        <ArticleTable
          headers={['Time', 'Action']}
          rows={[
            ['0–5 min after appointment time', 'Wait: some clients run a few minutes late. Check if they\'ve messaged.'],
            ['10 min', 'Send a brief, neutral check-in: "Hi [name], just checking in, your appointment was at [time]. Hope everything is OK?"'],
            ['15 min', 'No reply: treat it as a no-show and use the time for yourself.'],
            ['30–60 min later', 'Send your no-show follow-up message (below).'],
          ]}
        />
        <ArticleTip>Don&apos;t sit and wait. If there is no message after 15 minutes, the appointment is gone. Use the time: tidy your station, batch some content, take a real break, or post a &quot;last-minute slot&quot; Story in case someone nearby can come in.</ArticleTip>
      </section>

      <section id="follow-up">
        <h2 className="font-serif text-2xl font-bold mb-4">The follow-up message</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Send it 30 to 60 minutes after the missed time. Keep the tone neutral: you don&apos;t know yet whether there was an emergency.</p>
        <ArticleCallout variant="tip" title="First no-show follow-up (with deposit)">
          &quot;Hi [name], I noticed you weren&apos;t able to make your appointment at [time] today. I hope everything is OK. As per my booking policy, the deposit for this appointment is kept. I&apos;d love to see you another time: here&apos;s my link when you&apos;re ready: [link]&quot;
        </ArticleCallout>
        <ArticleCallout variant="tip" title="First no-show follow-up (no deposit taken)">
          &quot;Hi [name], I missed you today. I had your [time] slot held and waited in case you were running late. I can&apos;t hold slots without notice, so future appointments will need a [£X] deposit to secure them. Here&apos;s my booking link: [link]&quot;
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">Firm and professional, not punitive. A short, calm message keeps the door open for a client who simply forgot, and it is easy to point back to if the pattern repeats.</p>
      </section>

      <section id="enforcing-policy">
        <h2 className="font-serif text-2xl font-bold mb-4">Enforcing your policy</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">You can only fairly apply a fee the client agreed to at booking. If the policy was never shown, apologise for not being clear, waive it this once, and add it everywhere before the next booking.</p>
        <ArticleChecklist
          title="Make your policy enforceable"
          items={[
            'No-show rule shown on the booking page before payment',
            'Client accepts the policy as part of booking',
            'Policy repeated in the confirmation message',
            'One line about it in the 24-hour reminder',
            'Deposit collected at booking, so a no-show needs no chasing',
          ]}
        />
        <p className="text-gray-700 leading-relaxed">Policy templates: <Link to="/blog/nail-tech-no-show-policy-examples" className={link}>nail tech no-show policy examples</Link>, or generate one with the <Link to="/tools/nail-tech-cancellation-policy-generator" className={link}>cancellation policy generator</Link>.</p>
      </section>

      <section id="repeat-no-shows">
        <h2 className="font-serif text-2xl font-bold mb-4">Repeat no-show clients</h2>
        <ArticleTable
          headers={['No-show count', 'What happens', 'How you book them next']}
          rows={[
            ['1st', 'Deposit kept (or goodwill once for a real emergency)', 'Normal booking with a deposit'],
            ['2nd', 'Deposit kept, rule explained in writing', 'Full payment upfront only'],
            ['3rd', 'Deposit or payment kept', 'Politely decline future bookings'],
          ]}
        />
        <ArticleCallout variant="tip" title="Second no-show message">
          &quot;Hi [name], this is the second appointment missed without notice. I understand life gets busy, but I can&apos;t hold slots without knowing they&apos;ll be used. From now on, I&apos;ll need full payment upfront to secure any booking with me. If that works for you, here&apos;s my link: [link]. No hard feelings either way, I just need to protect my time.&quot;
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">Note every no-show in the client record with the date, so your decisions are based on facts rather than memory.</p>
      </section>

      <section id="prevention">
        <h2 className="font-serif text-2xl font-bold mb-4">Preventing no-shows</h2>
        <ArticleCallout variant="info" title="Example: what no-shows cost in a year">
          Example: 2 no-shows a month on £50 appointments = 2 × £50 × 12 = <strong>£1,200 a year</strong> of booked income lost. With a £20 deposit kept each time, you recover 2 × £20 × 12 = £480, and clients who have paid are less likely to skip in the first place.
        </ArticleCallout>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Deposits:</strong> a financial commitment gives clients a reason to show up or cancel properly. For long slots, take full payment upfront.</li>
          <li><strong>Automatic reminders:</strong> a 48-hour reminder lets clients cancel while you can still refill the slot; a 24-hour reminder catches the forgetful.</li>
          <li><strong>Text reminders:</strong> usually seen faster than email, which matters for next-day appointments.</li>
          <li><strong>Easy rescheduling:</strong> a reschedule link in every reminder turns some no-shows into moved appointments.</li>
        </ul>
        <ArticleCallout variant="info" title="Copy this 48-hour reminder">
          &quot;Hi [name]! Just a reminder of your [service] on [day] at [time]. Can&apos;t make it? Move it here before [time, day]: [link]. After that, the deposit is kept as per my policy. See you soon 💅&quot;
        </ArticleCallout>
        <p className="text-gray-700 leading-relaxed">Deposit amounts and wording: <Link to="/nail-tech-deposits" className={link}>how to take deposits as a nail tech</Link> and the <Link to="/blog/nail-tech-deposit-policy" className={link}>nail tech deposit policy guide</Link>.</p>
      </section>
    </div>
  ),
});
export {};
