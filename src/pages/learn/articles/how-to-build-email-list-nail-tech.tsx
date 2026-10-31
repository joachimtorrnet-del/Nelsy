import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-build-email-list-nail-tech',
  title: 'How to Build an Email List as a Nail Tech',
  seoTitle: 'How to Build an Email List as a Nail Tech (And Why It Matters)',
  excerpt: 'An email list is the only marketing channel you fully own. Unlike Instagram, you\'re not at the mercy of an algorithm — when you want to fill your calendar, you email your list.',
  seoDescription: 'How to build an email list as a nail tech. Why email marketing matters for nail businesses, how to collect emails, what to send, and how to use it to fill your calendar.',
  category: 'get-clients',
  tags: ['email marketing nail tech', 'nail tech email list', 'nail business marketing', 'nail tech client list'],
  heroImage: 'linear-gradient(135deg, #FFFBEB 0%, #FDE68A 100%)',
  heroImageAlt: 'How to build an email list as a nail tech',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-email', label: 'Why email still matters' },
    { id: 'collecting-emails', label: 'How to collect emails' },
    { id: 'what-to-send', label: 'What to send' },
    { id: 'tools', label: 'Tools to use' },
    { id: 'getting-started', label: 'Starting simple' },
  ],
  relatedSlugs: ['how-to-get-more-nail-clients', 'how-to-get-nail-clients-without-instagram', 'how-to-bring-back-old-nail-clients', 'nail-client-rebooking-message-templates'],
  faq: [
    { q: 'Do nail clients actually read marketing emails?', a: 'They do when the emails are relevant and feel personal. A mass promotional blast to every client ("20% off this week!") gets tuned out. A targeted message to clients who haven\'t booked in 6 weeks ("Haven\'t seen you in a while — I\'d love to have you back") gets read. The more personal and relevant the email, the higher the open rate.' },
    { q: 'Is email marketing legal / do I need consent?', a: 'In the UK and EU, you need a lawful basis to email clients for marketing purposes under GDPR. Existing clients who you\'ve actively provided services to can generally be contacted about similar services (the "soft opt-in" exemption applies under PECR in the UK). For new contacts or anyone who hasn\'t booked, you need explicit consent. Always include an unsubscribe option in every marketing email. If you\'re unsure, consult official guidance from the ICO (UK) or your local data protection authority.' },
    { q: 'How many emails should I send?', a: 'Once or twice a month is a reasonable frequency for nail tech clients. More than weekly feels like spam; less than monthly and you lose the benefit of staying top of mind. Quality matters more than frequency — one genuinely useful or relevant email a month is more valuable than weekly filler.' },
  ],
  relatedFeatureSlugs: ['email-newsletters', 'audience-capture', 'crm'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-email">
        <h2 className="font-serif text-2xl font-bold mb-4">Why email still matters for nail techs</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Instagram reach is determined by an algorithm you don't control. An Instagram following of 2,000 might deliver 200 views on any given post. Your email list delivers to every inbox directly — no algorithm, no pay-to-play.</p>
        <p className="text-gray-700 leading-relaxed">For nail techs specifically, email is most valuable for two things: filling slow periods by reaching clients who haven't booked recently, and announcing new services or seasonal availability before those slots fill. It's a direct line to people who already know and like your work.</p>
      </section>

      <section id="collecting-emails">
        <h2 className="font-serif text-2xl font-bold mb-4">How to collect emails</h2>
        <ArticleTable
          headers={['Method', 'How it works']}
          rows={[
            ['Booking form', 'Include an email field in your booking form — most scheduling platforms collect email by default for confirmation emails. Ask permission to add them to marketing communications.'],
            ['Instagram bio', 'A link to a simple sign-up page: "Get early access to new appointment slots — subscribe below"'],
            ['In-person at appointment', '"Can I add you to my email list? I send occasional updates about availability and new services."'],
            ['Welcome email opt-in', 'After a new client\'s first appointment, send a follow-up that includes an invitation to join your list for priority booking access'],
          ]}
        />
        <ArticleTip>Don\'t add clients to a marketing list without permission. Use a simple opt-in question at booking or in person — something like "Would you like to receive occasional emails about availability and new services?" Most happy clients say yes.</ArticleTip>
      </section>

      <section id="what-to-send">
        <h2 className="font-serif text-2xl font-bold mb-4">What to send</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>New availability announcement:</strong> "I've just opened bookings for [month] — popular slots go fast" + direct booking link</li>
          <li><strong>Seasonal nail inspo:</strong> "Autumn nails I'm loving right now + how to book" — soft content with a booking CTA</li>
          <li><strong>Win-back email:</strong> "It's been a while — I'd love to see you back" for clients who haven't booked in 6+ weeks</li>
          <li><strong>New service announcement:</strong> "I'm now offering BIAB — here's what it is and who it's perfect for"</li>
          <li><strong>Price increase notice:</strong> "Heads up — my prices are changing from [date]. Book before then to lock in current pricing."</li>
        </ul>
        <ArticleCallout variant="info" title="Keep it personal">
          The most effective nail tech emails read like a message from a person, not a newsletter from a brand. Write in your voice, use the client's first name, and be specific about what you're offering. "Hey! October slots are now open — I have some gorgeous seasonal designs ready. Book here 💅" converts better than a designed newsletter template.
        </ArticleCallout>
      </section>

      <section id="tools">
        <h2 className="font-serif text-2xl font-bold mb-4">Tools to use</h2>
        <ArticleTable
          headers={['Tool', 'Best for', 'Cost']}
          rows={[
            ['Mailchimp', 'Free tier up to 500 contacts / 1,000 emails/month; easy to start', 'Free for small lists'],
            ['Flodesk', 'Beautiful, easy design; flat monthly fee regardless of list size', 'Paid (check current pricing)'],
            ['ConvertKit / Kit', 'More advanced automations; good for segmenting by last booking date', 'Paid; free tier available'],
            ['Your booking platform', 'Some platforms (including Nelsy) send automated follow-up messages to clients — check if this covers your needs before adding a separate tool', 'Included in platform'],
          ]}
        />
      </section>

      <section id="getting-started">
        <h2 className="font-serif text-2xl font-bold mb-4">Starting simple</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">You don't need a sophisticated email setup. The simplest version that works:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>Export your client email list from your booking platform</li>
          <li>Create a free Mailchimp account and import your list (with clients' consent)</li>
          <li>Send a simple "opening bookings for next month" email to all of them with a direct booking link</li>
        </ol>
        <p className="text-gray-700 leading-relaxed">That's it. An email list doesn't need to be complicated to be effective — it needs to be consistent. Even one targeted email per month to your existing client list will fill gaps in your calendar faster than most other strategies.</p>
        <p className="text-gray-700 mt-4 leading-relaxed">For reaching clients who've stopped booking: <Link to="/learn/how-to-bring-back-old-nail-clients" className="underline text-[#F52B8C]">how to bring back old nail clients</Link>.</p>
      </section>
    </div>
  ),
});
export {};
