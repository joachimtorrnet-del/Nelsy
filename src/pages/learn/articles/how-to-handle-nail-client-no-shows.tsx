import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

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
  toc: [
    { id: 'in-the-moment', label: 'What to do when a client doesn\'t show' },
    { id: 'follow-up', label: 'The follow-up message' },
    { id: 'enforcing-policy', label: 'Enforcing your policy' },
    { id: 'repeat-no-shows', label: 'Repeat no-show clients' },
    { id: 'prevention', label: 'Preventing no-shows' },
  ],
  relatedSlugs: ['nail-tech-no-show-policy-examples', 'nail-tech-cancellation-policy', 'nail-tech-deposit-policy', 'how-to-set-boundaries-with-nail-clients'],
  faq: [
    { q: 'Should I charge a no-show fee?', a: 'Yes — for most nail techs, a no-show fee (or deposit forfeiture) is appropriate and professional. Your time has value; a client who doesn\'t show and faces no consequence is unlikely to take your time seriously in future. The fee should be stated clearly in your booking policy so it\'s never a surprise. A deposit system achieves the same result automatically — if the client doesn\'t show, the deposit is forfeit.' },
    { q: 'What if a client had a genuine emergency?', a: 'Exercise discretion. A client who didn\'t show for the first time with a genuine emergency (hospitalisation, family crisis) is different from a repeat no-show. Most experienced nail techs waive the fee once for a documented genuine emergency and note it on the client\'s record. Don\'t waive it as a default — but use your judgement for clearly exceptional circumstances.' },
    { q: 'Can I refuse to rebook a client who no-showed?', a: 'Yes. As an independent business owner, you can choose not to rebook a client who has repeatedly failed to show up. Most nail techs give one warning: "I\'ll rebook you this time, but future no-shows will require full prepayment to secure a slot." After a second no-show, declining to rebook is a reasonable business decision.' },
  ],
  relatedFeatureSlugs: ['deposits', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="in-the-moment">
        <h2 className="font-serif text-2xl font-bold mb-4">What to do when a client doesn't show</h2>
        <ArticleTable
          headers={['Time', 'Action']}
          rows={[
            ['0–5 min after appointment time', 'Wait — some clients run a few minutes late. Check if they\'ve messaged.'],
            ['5–10 min', 'Send a brief, neutral check-in message: "Hi [name] — just checking in, your appointment was at [time]. Hope everything is okay?"'],
            ['15 min', 'If no response, the appointment is effectively a no-show. You can move on with your time.'],
            ['30–60 min later', 'Send your no-show follow-up message (see below)'],
          ]}
        />
        <ArticleTip>Don\'t sit and wait — if a client hasn\'t messaged after 10–15 minutes, the appointment is gone. Use the time productively: tidy your station, catch up on admin, take your break, or post on Instagram.</ArticleTip>
      </section>

      <section id="follow-up">
        <h2 className="font-serif text-2xl font-bold mb-4">The follow-up message</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Send a follow-up 30–60 minutes after the missed appointment. Keep the tone neutral — you don't know yet whether there was a genuine emergency:</p>
        <ArticleCallout variant="tip" title="First no-show follow-up (neutral)">
          "Hi [name], I noticed you weren't able to make your appointment at [time] today. I hope everything is okay. As per my cancellation policy, I'll need to retain your deposit for this appointment. I'd love to rebook you — here's my link when you're ready: [link]"
        </ArticleCallout>
        <ArticleCallout variant="tip" title="No deposit policy (first no-show)">
          "Hi [name], I missed you today — I had your appointment held at [time] and waited in case you were running late. Unfortunately I can't hold slots without notice. I'd love to rebook you — future appointments will require a deposit to secure the slot. Here's my booking link: [link]"
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">The goal is firm and professional, not punitive. Most clients who no-show feel bad about it and appreciate a straightforward message over silence or anger.</p>
      </section>

      <section id="enforcing-policy">
        <h2 className="font-serif text-2xl font-bold mb-4">Enforcing your policy</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Enforcement is only possible when clients agreed to your policy at booking. If your policy was never communicated, you don't have grounds to charge a fee. This is why a clear policy, accepted at booking, is the foundation:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>State your no-show fee in your booking form or confirmation message</li>
          <li>Require clients to accept the policy before their booking is confirmed</li>
          <li>A deposit system enforces itself — no-show = deposit forfeit, no awkward conversation required</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">For policy templates: <Link to="/learn/nail-tech-no-show-policy-examples" className="underline text-[#F52B8C]">nail tech no-show policy examples</Link>.</p>
      </section>

      <section id="repeat-no-shows">
        <h2 className="font-serif text-2xl font-bold mb-4">Repeat no-show clients</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A second no-show from the same client calls for a direct conversation or a change to how you accept their bookings:</p>
        <ArticleCallout variant="tip" title="Second no-show message">
          "Hi [name], this is the second appointment you've missed without notice. I completely understand life gets busy, but I can't hold slots without being confident they'll be used. Going forward, I'll need full prepayment to secure any future bookings with me. If that works for you, here's my link: [link]. No hard feelings either way — I just have to protect my time."
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">After a third no-show: it's reasonable not to rebook this client. Your time is worth protecting.</p>
      </section>

      <section id="prevention">
        <h2 className="font-serif text-2xl font-bold mb-4">Preventing no-shows</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The most effective no-show prevention strategies:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Deposits:</strong> Even a small deposit dramatically reduces no-shows. Clients with skin in the game don't ghost.</li>
          <li><strong>Automated reminders:</strong> A 48-hour reminder significantly reduces no-shows. Clients who need to cancel do so earlier when reminded — giving you time to fill the slot.</li>
          <li><strong>SMS reminders:</strong> More likely to be seen immediately than email — especially for same-day or next-day appointments</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">Deposit strategy: <Link to="/learn/nail-tech-deposit-policy" className="underline text-[#F52B8C]">nail tech deposit policy guide</Link>.</p>
      </section>
    </div>
  ),
});
export {};
