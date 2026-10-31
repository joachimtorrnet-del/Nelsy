import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'local-seo-for-nail-techs',
  title: 'Local SEO for Nail Techs: The Complete Guide',
  seoTitle: 'Local SEO for Nail Techs: Complete Guide to Getting Found Locally',
  excerpt: 'Local SEO is how clients in your area find you on Google without Instagram. This guide covers everything: Google Business Profile, local content, reviews, citations, and NAP consistency.',
  seoDescription: 'Local SEO for nail techs explained. How to rank in local Google search, optimise your Google Business Profile, get reviews, and attract nearby clients searching for nail services.',
  category: 'get-clients',
  tags: ['local SEO nail tech', 'nail tech Google ranking', 'nail business local search', 'nail tech near me'],
  heroImage: 'linear-gradient(135deg, #EFF6FF 0%, #BFDBFE 100%)',
  heroImageAlt: 'Local SEO for nail techs',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'what-local-seo-is', label: 'What local SEO is' },
    { id: 'google-business-profile', label: 'Google Business Profile' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'nap-consistency', label: 'NAP consistency' },
    { id: 'local-content', label: 'Local content on your website' },
    { id: 'citations', label: 'Local citations' },
    { id: 'audit-checklist', label: 'Local SEO audit checklist' },
  ],
  relatedSlugs: ['how-to-get-nail-clients-from-google-business-profile', 'how-to-ask-nail-clients-for-reviews', 'how-to-get-more-local-nail-clients', 'how-to-build-nail-tech-website'],
  faq: [
    { q: 'How long does local SEO take to work?', a: 'Most nail techs start seeing measurable results — more profile views, calls, and new client enquiries — within 6–12 weeks of optimising their Google Business Profile and building reviews. Consistency matters more than intensity: a fully optimised profile with regular reviews will outperform a one-time setup. Local SEO compounds over time; the nail tech who started 6 months ago has an advantage over one starting today.' },
    { q: 'Do I need a website for local SEO?', a: 'A Google Business Profile alone can rank you in local search without a website. But a website adds additional ranking signals, gives you space to describe services in detail, and provides a destination to send clients who click through. For most nail techs, optimising the Google Business Profile first is the higher-leverage starting point.' },
    { q: 'What\'s more important for nail techs — local SEO or Instagram?', a: 'They serve different purposes. Instagram builds a following and gets organic discovery over time. Local SEO captures clients who are already searching for a nail tech in your area right now. The clients from local search tend to have higher purchase intent — they\'re searching specifically to book. Both are worth investing in, but for a new nail tech, local SEO often drives bookings faster than growing an Instagram following from zero.' },
  ],
  relatedFeatureSlugs: ['link-in-bio', 'bookings', 'audience-capture'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-local-seo-is">
        <h2 className="font-serif text-2xl font-bold mb-4">What local SEO is</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Local SEO (search engine optimisation) is the process of making your business appear prominently when people in your area search Google for nail services. When someone types "nail tech near me" or "gel nails [your town]", local SEO determines which businesses appear — and in what order.</p>
        <p className="text-gray-700 leading-relaxed">Unlike Instagram, where you build an audience, local SEO captures active search intent — clients who are already looking for someone to book, right now. Google ranks local businesses based on three factors: <strong>relevance</strong> (does your profile match what they searched?), <strong>distance</strong> (how close are you?), and <strong>prominence</strong> (how established and trusted does your business appear?). You can influence all three.</p>
      </section>

      <section id="google-business-profile">
        <h2 className="font-serif text-2xl font-bold mb-4">Google Business Profile</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Your Google Business Profile is the most important local SEO asset you have. It controls how you appear in Google Maps and the local pack (the 3 businesses that appear at the top of local search results).</p>
        <ArticleTable
          headers={['Profile element', 'What to do']}
          rows={[
            ['Business name', 'Your actual business name — no keyword stuffing ("Maya\'s Nails" not "Maya\'s Nails | Best Gel Nails London")'],
            ['Category', 'Primary: "Nail Salon" — this is the most important signal for nail-related searches'],
            ['Address / service area', 'Home-based: set a service area (city or radius). Salon: full address. Keep it accurate.'],
            ['Phone & website', 'Include your booking link as your website URL — this gets clients to book directly'],
            ['Description', 'Write a clear 250-word description using natural language about your services, location, and approach'],
            ['Services', 'List each service you offer by name — "Gel Manicure", "BIAB", "Nail Extensions", "Nail Art"'],
            ['Photos', '20+ high-quality nail photos; workspace photos; update regularly'],
            ['Hours', 'Accurate hours including holiday closures'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">For a full setup and optimisation walkthrough: <Link to="/learn/how-to-get-nail-clients-from-google-business-profile" className="underline text-[#F52B8C]">how to get more nail clients through Google Business Profile</Link>.</p>
      </section>

      <section id="reviews">
        <h2 className="font-serif text-2xl font-bold mb-4">Reviews</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Reviews are the single most impactful prominence signal. A profile with 40 genuine 5-star reviews outranks a profile with zero reviews almost universally, regardless of other optimisation. Prioritise review collection above almost everything else.</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Ask every satisfied client directly — with a link, at the end of the appointment or in a follow-up message</li>
          <li>Respond to every review, positive and negative — this signals an active business</li>
          <li>Aim for specific, detailed reviews ("4-week retention, perfect French tip") — they carry more weight than one-word reviews</li>
          <li>Never buy or incentivise reviews — this violates Google's terms and risks profile removal</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">Full review strategy: <Link to="/learn/how-to-ask-nail-clients-for-reviews" className="underline text-[#F52B8C]">how to ask nail clients for reviews</Link>.</p>
      </section>

      <section id="nap-consistency">
        <h2 className="font-serif text-2xl font-bold mb-4">NAP consistency</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">NAP stands for Name, Address, Phone number. Google cross-references your business information across the web to verify legitimacy. Inconsistent NAP (different spellings, old addresses, different phone numbers) weakens your local ranking signals.</p>
        <ArticleTip>Check that your business name, address/area, and phone number are identical on Google Business Profile, your website, Instagram bio, Fresha/Booksy listing (if applicable), and any directories. Even small differences — "St." vs "Street" — matter.</ArticleTip>
      </section>

      <section id="local-content">
        <h2 className="font-serif text-2xl font-bold mb-4">Local content on your website</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">If you have a website (or booking page), local content helps Google understand your location and service area:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Include your city/area name naturally in your page title, heading, and description: "Gel Nail Tech in Edinburgh — Online Booking"</li>
          <li>Write a clear "About" section that mentions your location and the areas you serve</li>
          <li>List specific services with names matching what clients search: "BIAB", "Gel-X", "Acrylic Nails"</li>
        </ul>
      </section>

      <section id="citations">
        <h2 className="font-serif text-2xl font-bold mb-4">Local citations</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A citation is any online mention of your business name, address, and phone number. Beyond Google, citations on relevant directories add trust signals. For nail techs, relevant citations include:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Fresha or Treatwell (if you have a listing)</li>
          <li>Yelp (in markets where it's used)</li>
          <li>Facebook Business page</li>
          <li>Local business directories for your town/city</li>
        </ul>
        <ArticleCallout variant="info" title="Focus on quality over quantity">
          A few accurate, complete listings on relevant directories are more valuable than many inaccurate listings. Don't create listings on irrelevant directories just for citation volume.
        </ArticleCallout>
      </section>

      <section id="audit-checklist">
        <h2 className="font-serif text-2xl font-bold mb-4">Local SEO audit checklist</h2>
        <ArticleChecklist items={[
          'Google Business Profile created and verified',
          'Primary category set to "Nail Salon"',
          'Service area or address is accurate',
          'Phone number and booking link added',
          'Business description written (250+ words, natural language)',
          'All services listed by name',
          '20+ high-quality photos uploaded',
          'Hours accurate and up to date',
          '10+ genuine Google reviews',
          'Responding to all reviews',
          'NAP consistent across Google, website, Instagram, and booking platform',
          'Google Posts updated monthly',
        ]} />
        <p className="text-gray-700 mt-4 leading-relaxed">For getting new clients through other channels: <Link to="/learn/how-to-get-more-local-nail-clients" className="underline text-[#F52B8C]">how to get more local nail clients</Link>.</p>
      </section>
    </div>
  ),
});
export {};
