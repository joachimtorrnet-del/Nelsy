import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleSteps } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-name-your-nail-business',
  title: 'How to Name Your Nail Business',
  seoTitle: 'How to Name Your Nail Business (Without Overthinking It)',
  excerpt: 'Your nail business name matters — but not as much as the work. Here\'s how to choose a name that works, check it\'s available, and avoid common mistakes.',
  seoDescription: 'How to name your nail business. What makes a good nail business name, how to check availability, and what to avoid — with examples and naming frameworks.',
  category: 'branding-growth',
  tags: ['nail business name', 'nail business branding', 'nail business naming', 'nail tech brand'],
  heroImage: 'linear-gradient(135deg, #FDF4FF 0%, #DDD6FE 100%)',
  heroImageAlt: 'How to name your nail business',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'what-makes-a-good-name', label: 'What makes a good nail business name' },
    { id: 'naming-frameworks', label: 'Naming frameworks' },
    { id: 'checking-availability', label: 'Checking availability' },
    { id: 'mistakes', label: 'Naming mistakes to avoid' },
    { id: 'decision', label: 'Making the final decision' },
  ],
  relatedSlugs: ['100-nail-business-name-ideas', 'how-to-brand-your-nail-business', 'how-to-start-a-nail-business-2026'],
  faq: [
    { q: 'Can I use my own name as a nail business name?', a: 'Yes — many nail techs use their own name or first name ("Maya Nails", "Nails by Jade"). This has the advantage of being unique and building personal brand. The disadvantage: if you ever sell the business or bring in other nail techs, your own name in the brand becomes awkward.' },
    { q: 'Should my nail business name include the word "nails"?', a: 'Including "nails" in your name makes it immediately clear what you do, which is useful. It\'s not required — many successful nail businesses don\'t have "nails" in the name. If your name doesn\'t make the business obvious, make sure your Instagram bio and booking page are explicit about what you offer.' },
    { q: 'How do I check if a nail business name is taken?', a: 'Check: Instagram username availability, Companies House (if you want to register as a company), the Intellectual Property Office for trademarks if you\'re building a brand you might want to protect, and Google search for existing businesses with the same name in your area.' },
  ],
  relatedFeatureSlugs: ['link-in-bio', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-makes-a-good-name">
        <h2 className="font-serif text-2xl font-bold mb-4">What makes a good nail business name</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A good nail business name doesn't need to be clever, witty, or poetic. It needs to work: be memorable, be searchable, be available across the platforms you'll use, and ideally communicate something about what you do or who you are.</p>
        <ArticleTable
          headers={['Quality', 'Why it matters']}
          rows={[
            ['Memorable', 'Clients can find you again and refer you accurately'],
            ['Searchable', 'Google and Instagram searches should find you'],
            ['Pronounceable', 'Word of mouth works — "I can\'t remember exactly how you spell it" breaks referrals'],
            ['Available on Instagram', 'Your Instagram handle should match or be close to your business name'],
            ['Scales with your business', 'A name tied to a specific location or technique limits you if you expand'],
          ]}
        />
      </section>

      <section id="naming-frameworks">
        <h2 className="font-serif text-2xl font-bold mb-4">Naming frameworks</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Four approaches that work well for nail businesses:</p>
        <ol className="list-decimal list-inside space-y-4 text-gray-700">
          <li>
            <strong>Name + Nails:</strong> "[Your Name] Nails" or "Nails by [Your Name]"<br />
            <span className="text-gray-500 text-sm">Examples: Maya Nails, Nails by Jade, Sophia & Co Nails</span>
          </li>
          <li>
            <strong>Aesthetic word + Nails:</strong> A word that reflects your style or vibe<br />
            <span className="text-gray-500 text-sm">Examples: Velvet Nails, Pearl Studio, Blush Nail Co.</span>
          </li>
          <li>
            <strong>Evocative noun:</strong> Something aspirational or beautiful that isn't literally "nails"<br />
            <span className="text-gray-500 text-sm">Examples: Éclat, Lustre Studio, Dusk Nails</span>
          </li>
          <li>
            <strong>Location + Nails:</strong> Ties your brand to a place<br />
            <span className="text-gray-500 text-sm">Examples: East London Nails, Northside Nail Studio</span>
          </li>
        </ol>
        <ArticleTip>Write down 10 names across these frameworks. Sleep on them. Show them to 3 people outside the beauty industry and ask which they remember the next day. The one they remember is usually the right one.</ArticleTip>
        <p className="text-gray-700 mt-4 leading-relaxed">For 100 name ideas to get you started: <Link to="/learn/100-nail-business-name-ideas" className="underline text-[#F52B8C]">100 nail business name ideas</Link>.</p>
      </section>

      <section id="checking-availability">
        <h2 className="font-serif text-2xl font-bold mb-4">Checking availability</h2>
        <ArticleSteps steps={[
          { title: 'Check Instagram', body: 'Search for the exact handle and close variations. Instagram usernames are case-insensitive but exact — @velvet.nails and @velvetnails are different accounts.' },
          { title: 'Google the name', body: 'Search "[name] nails" and "[name] nail tech". If there\'s already an established business with that name, especially locally, reconsider.' },
          { title: 'Check Companies House', body: 'If you plan to register as a limited company, search at find-and-update.company-information.service.gov.uk. Sole traders don\'t need to register a company, but the same name being registered as a company by someone else can cause legal issues if you later want to register.' },
          { title: 'Check domain availability', body: 'Even if you don\'t plan a website immediately, securing the .co.uk domain for your business name (usually £5–15/year) is worthwhile if you might want it later.' },
        ]} />
      </section>

      <section id="mistakes">
        <h2 className="font-serif text-2xl font-bold mb-4">Naming mistakes to avoid</h2>
        <ul className="list-disc list-inside space-y-3 text-gray-700">
          <li><strong>Spelling that's impossible to type correctly:</strong> If clients can't find you on Instagram because they're guessing at an unusual spelling, the name is working against you.</li>
          <li><strong>Names that are identical or near-identical to an existing local nail tech:</strong> This causes confusion and makes word-of-mouth referrals unreliable.</li>
          <li><strong>Trend-specific names that date quickly:</strong> "Gel Goals" or "Press On Queen" might feel relevant now but awkward in three years.</li>
          <li><strong>Names with location in them if you might move:</strong> "East London Nails" becomes a problem if you move across the city.</li>
          <li><strong>Trademarked brand names or obvious derivatives:</strong> Using names similar to established beauty brands creates legal risk.</li>
        </ul>
        <ArticleCallout variant="warning" title="Don't overthink this">
          Many nail techs spend weeks naming their business and delay launching. Your name matters less than your work, your Instagram, and your booking system. Pick something good enough and launch.
        </ArticleCallout>
      </section>

      <section id="decision">
        <h2 className="font-serif text-2xl font-bold mb-4">Making the final decision</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Once you have a shortlist, ask:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Can I see this name on a business card, Instagram bio, and booking page and feel proud of it?</li>
          <li>Is the Instagram handle available or close?</li>
          <li>Does it sound professional when I say "Hi, I'm booking you in at [name]"?</li>
          <li>Will it still make sense in 5 years?</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">If the answer to all four is yes, you have your name. See: <Link to="/learn/how-to-brand-your-nail-business" className="underline text-[#F52B8C]">how to brand your nail business</Link>.</p>
      </section>
    </div>
  ),
});
export {};
