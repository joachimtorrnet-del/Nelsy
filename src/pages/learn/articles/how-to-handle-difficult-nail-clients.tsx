import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-handle-difficult-nail-clients',
  title: 'How to Handle Difficult Nail Clients Professionally',
  seoTitle: 'How to Handle Difficult Nail Clients Professionally (Scripts + Approach)',
  excerpt: 'Difficult clients come in different forms — rude, indecisive, scope-creeping, or constantly unhappy. Here\'s how to handle each type professionally without losing your cool.',
  seoDescription: 'How to handle difficult nail clients professionally. Scripts and strategies for rude clients, indecisive clients, scope creep, chronic complainers, and when to end the relationship.',
  category: 'policies-clients',
  tags: ['difficult nail clients', 'nail client problems', 'nail tech client management', 'nail client scripts'],
  heroImage: 'linear-gradient(135deg, #FFF5F5 0%, #FED7D7 100%)',
  heroImageAlt: 'How to handle difficult nail clients professionally',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'types', label: 'Types of difficult clients' },
    { id: 'rude', label: 'Rude or dismissive clients' },
    { id: 'indecisive', label: 'Chronically indecisive clients' },
    { id: 'scope-creep', label: 'Scope-creeping clients' },
    { id: 'chronic-complainers', label: 'Chronic complainers' },
    { id: 'ending-the-relationship', label: 'When to end the relationship' },
  ],
  relatedSlugs: ['how-to-set-boundaries-with-nail-clients', 'what-to-do-when-nail-client-complains', 'nail-tech-booking-policy-template', 'how-to-handle-late-nail-clients'],
  faq: [
    { q: 'Should I always try to fix a difficult client situation before walking away?', a: 'Yes, for a first incident. Most difficult client moments are misunderstandings or one-off stress responses — the client might be having a terrible week, not genuinely disrespecting you. Address the issue professionally and give the relationship a chance to reset. Walking away after one difficult moment often discards a client who would have become a loyal regular.' },
    { q: 'How do I handle a client who always wants more than they booked for?', a: 'Scope creep (clients who ask for additional work mid-appointment without being willing to pay for extra time/services) is best handled at the start of the appointment rather than mid-service. Confirm the service at the start: "Today we\'ve got a gel manicure — shall we get started?" When they ask for extras, be direct: "I can add that — it\'ll be an extra [£X] and [Y minutes]. Want me to add it?"' },
    { q: 'What if a difficult client leaves a bad review?', a: 'Respond publicly with professionalism: acknowledge their experience without agreeing to inaccurate claims, and invite them to discuss privately. Don\'t get defensive or argue. A well-handled negative review often increases trust with other potential clients — it shows you\'re responsive and professional under pressure.' },
  ],
  relatedFeatureSlugs: ['crm', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="types">
        <h2 className="font-serif text-2xl font-bold mb-4">Types of difficult clients</h2>
        <ArticleTable
          headers={['Type', 'What it looks like']}
          rows={[
            ['Rude / dismissive', 'Short, impatient, condescending tone; treats you as a service operative rather than a professional'],
            ['Indecisive', 'Can\'t decide on a design; changes their mind mid-service; needs excessive time to choose'],
            ['Scope-creeping', 'Books a gel manicure; asks for nail art, gel removal, cuticle work — all without discussing extra cost'],
            ['Chronic complainer', 'Always finds something wrong with the finished result or the previous set'],
            ['Late habitually', 'Consistently arrives 10–20 minutes late; expects full service regardless'],
            ['Policy pushback', 'Disputes deposit, cancellation fee, or late policy; tries to negotiate your terms'],
          ]}
        />
        <ArticleTip>Most "difficult" client moments happen at the beginning of a client relationship, before expectations are established. A clear consultation, clear policy, and warm but professional tone at the first appointment prevents most problems from developing.</ArticleTip>
      </section>

      <section id="rude">
        <h2 className="font-serif text-2xl font-bold mb-4">Rude or dismissive clients</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">If a client is rude once, address it clearly but calmly at the time — not after the appointment:</p>
        <ArticleCallout variant="tip" title="In-the-moment response">
          "Just to mention — I'd appreciate it if we could keep the conversation respectful. I want this to be a positive experience for both of us."
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">Said firmly but without heat, this resets the tone for most clients. Many people don't realise they're being rude — they're stressed or in a bad day. A calm, clear boundary response often resets the appointment entirely.</p>
        <p className="text-gray-700 leading-relaxed">If rudeness continues after you've addressed it: finish the service professionally, then don't rebook. You are not obligated to continue serving clients who treat you poorly.</p>
      </section>

      <section id="indecisive">
        <h2 className="font-serif text-2xl font-bold mb-4">Chronically indecisive clients</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Indecisive clients are rarely being difficult deliberately — they're overwhelmed or anxious about making the wrong choice. Help them decide rather than presenting infinite options:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Narrow the choice: "Based on what you've described, I'd suggest either X or Y — which feels more like you?"</li>
          <li>Make a recommendation: "I think this colour would look incredible on your skin tone — shall we try it?"</li>
          <li>Use your client card: "Last time you loved the terracotta — want to try something similar or go completely different?"</li>
          <li>Set a time limit: "We'll need to decide in the next couple of minutes to stay on time — which are you feeling?"</li>
        </ul>
      </section>

      <section id="scope-creep">
        <h2 className="font-serif text-2xl font-bold mb-4">Scope-creeping clients</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Confirm the service at the start of every appointment:</p>
        <ArticleCallout variant="tip" title="Scope confirmation at start">
          "Today we've got [service] — shall we get started?"
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">When a client asks for extras mid-appointment:</p>
        <ArticleCallout variant="tip" title="Adding extras professionally">
          "I can definitely add that — it'll be an extra £[X] and about [Y] minutes. Want to go ahead?"
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">Don't apologise for charging for your time and materials. Adding this to your service menu clearly (so clients can see prices before they arrive) reduces the frequency of mid-appointment scope creep.</p>
      </section>

      <section id="chronic-complainers">
        <h2 className="font-serif text-2xl font-bold mb-4">Chronic complainers</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A client who consistently finds something wrong is expensive — in time, stress, and remedial work. Strategies:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Before the appointment:</strong> Document the agreed design/finish explicitly — if possible, show them a reference photo and confirm "this is what we're working towards"</li>
          <li><strong>During the service:</strong> Show progress and ask for sign-off at key stages: "Are you happy with the shape before I move on?"</li>
          <li><strong>After the service:</strong> Ask directly before they leave: "Are you completely happy with the result?"</li>
          <li><strong>For persistent issues:</strong> Address the pattern directly: "I've noticed you've had a couple of concerns after appointments — I want to make sure we're aligned on what you're looking for. Can we talk through it before we start today?"</li>
        </ul>
      </section>

      <section id="ending-the-relationship">
        <h2 className="font-serif text-2xl font-bold mb-4">When to end the relationship</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Some clients are simply not worth having. When a client consistently causes stress, disrespects your time or boundaries, or makes your job worse rather than better, ending the relationship is a legitimate business decision:</p>
        <ArticleCallout variant="tip" title="Professional ending message">
          "Hi [name], I've given this thought and I think we might not be the best fit going forward. I wish you all the best finding a nail tech who's better suited to what you're looking for."
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">You don't owe an extensive explanation. A brief, professional message is sufficient. For setting firm boundaries with clients more broadly: <Link to="/learn/how-to-set-boundaries-with-nail-clients" className="underline text-[#F52B8C]">how to set boundaries with nail clients</Link>.</p>
      </section>
    </div>
  ),
});
export {};
