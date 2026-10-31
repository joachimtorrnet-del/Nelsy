import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-late-policy',
  title: 'Nail Tech Late Policy Examples',
  seoTitle: 'Nail Tech Late Policy Examples (Templates You Can Copy)',
  excerpt: 'Late clients affect your whole day. Here\'s how to handle lateness professionally — with policy templates, communication scripts, and when to turn clients away.',
  seoDescription: 'Nail tech late policy examples and templates. How to handle late clients professionally, when to turn them away, and how to communicate your policy clearly.',
  category: 'policies-clients',
  tags: ['late clients', 'nail tech late policy', 'client management', 'lateness policy'],
  heroImage: 'linear-gradient(135deg, #FFF7ED 0%, #FED7AA 100%)',
  heroImageAlt: 'Nail tech late policy examples',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'why-lateness-matters', label: 'Why lateness is a real business problem' },
    { id: 'policy-options', label: 'Late policy options' },
    { id: 'templates', label: 'Policy templates' },
    { id: 'communication', label: 'How to communicate it' },
    { id: 'turning-away', label: 'When to turn a client away' },
    { id: 'scripts', label: 'Scripts for difficult conversations' },
  ],
  relatedSlugs: ['how-to-handle-late-nail-clients', 'nail-tech-cancellation-policy', 'nail-tech-no-show-policy-examples'],
  faq: [
    { q: 'Should I charge for late clients?', a: 'Most nail techs don\'t charge a late fee, but do shorten the appointment. A client who arrives 20 minutes late gets a 20-minute shorter service. You can note "if the appointment time runs over into the next booking, I may need to shorten the service." This is easier to communicate and enforce than a late fee.' },
    { q: 'How long should I wait for a late client before marking them as a no-show?', a: 'Most nail techs allow 10–15 minutes. After that, mark as no-show and apply your no-show policy. Some allow up to 20–30 minutes for longer appointments where the client can still receive a meaningful service. State your grace period in your booking policy.' },
    { q: 'What if a client is late and wants the full service anyway?', a: 'You have two options: shorten the service to fit the remaining time and charge accordingly, or turn them away and apply your no-show policy. Both are valid. What you should not do is run the full service and let it push your next client late — that creates a cascade effect through your whole day.' },
  ],
  relatedFeatureSlugs: ['bookings', 'crm'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-lateness-matters">
        <h2 className="font-serif text-2xl font-bold mb-4">Why lateness is a real business problem</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A client who arrives 20 minutes late doesn't just affect their own appointment — they affect every client after them. If you absorb the lateness and run each appointment at full time, you either run late for every subsequent client or work through your break. Both outcomes harm your business.</p>
        <p className="text-gray-700 leading-relaxed">A clear late policy sets expectations upfront and gives you a framework for handling lateness consistently rather than case-by-case.</p>
      </section>

      <section id="policy-options">
        <h2 className="font-serif text-2xl font-bold mb-4">Late policy options</h2>
        <ArticleTable
          headers={['Option', 'How it works', 'Best for']}
          rows={[
            ['Shorten the service', 'Late minutes come off the appointment time; price stays the same', 'Most nail techs — fair and practical'],
            ['Grace period + turn away', '10–15 minute grace, then treat as no-show', 'Back-to-back bookings where any lateness cascades'],
            ['Late fee', 'Charge £X for arrivals over X minutes late', 'Less common; requires upfront communication'],
            ['Case-by-case discretion', 'No formal policy; judge each situation', 'Risky — inconsistent and open to client manipulation'],
          ]}
        />
        <ArticleTip>The "shorten the service" approach is the most practical and the least confrontational. It creates a natural consequence (less time = less done) without requiring you to enforce a penalty.</ArticleTip>
      </section>

      <section id="templates">
        <h2 className="font-serif text-2xl font-bold mb-4">Policy templates</h2>
        <ArticleCallout variant="info" title="Short version (for booking page)">
          Please arrive on time for your appointment. If you arrive late, I\'ll do my best to complete as much as possible within the remaining time. Clients arriving more than 15 minutes late may need to reschedule and will be treated as a no-show.
        </ArticleCallout>

        <ArticleCallout variant="info" title="Warm version (for confirmation message)">
          Just a reminder to arrive on time for your appointment — it helps me give you the full service without rushing! If you\'re running a little late, please message me as soon as you know. If you\'re more than 15 minutes late, I may need to shorten the service or reschedule, as I have clients booked after you.
        </ArticleCallout>
      </section>

      <section id="communication">
        <h2 className="font-serif text-2xl font-bold mb-4">How to communicate your late policy</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Include a brief mention in your booking confirmation: "Please arrive on time — if you\'re running late, message me."</li>
          <li>Mention it in the 24-hour reminder for clients you suspect may be late (or for all, if you've had repeat issues).</li>
          <li>State it on your booking page in your policies section.</li>
        </ol>
        <p className="text-gray-700 mt-4 leading-relaxed">You don't need to make it threatening or prominent — just visible and consistent.</p>
      </section>

      <section id="turning-away">
        <h2 className="font-serif text-2xl font-bold mb-4">When to turn a client away</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Turn a client away when:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>They are more than 15 minutes late and you have back-to-back clients</li>
          <li>The remaining time isn't enough to complete a meaningful service safely</li>
          <li>They've been habitually late across multiple appointments</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">Apply your no-show policy in this case — deposit forfeit. See: <Link to="/learn/nail-tech-no-show-policy-examples" className="underline text-[#F52B8C]">nail tech no-show policy examples</Link>.</p>
      </section>

      <section id="scripts">
        <h2 className="font-serif text-2xl font-bold mb-4">Scripts for difficult conversations</h2>
        <ArticleCallout variant="tip" title="When a client arrives late">
          "Hey, good to see you! We have [X] minutes left of your appointment time — I'll do my best to get as much done as possible. [If necessary: I may not be able to complete the full nail art today, but let's see what we can do.]"
        </ArticleCallout>
        <ArticleCallout variant="tip" title="When you need to turn a client away">
          "I'm really sorry — I've had you booked for [time] and I've got a client straight after. I'm not able to run the full service in the time we have left. I'll apply my late cancellation policy to today's booking, and I'd love to rebook you for another slot when we have the full time."
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">For more on handling difficult client situations: <Link to="/learn/how-to-handle-late-nail-clients" className="underline text-[#F52B8C]">how to handle late nail clients</Link>.</p>
      </section>
    </div>
  ),
});
export {};
