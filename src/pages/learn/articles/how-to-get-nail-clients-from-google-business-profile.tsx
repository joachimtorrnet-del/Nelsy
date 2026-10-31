import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-get-nail-clients-from-google-business-profile',
  title: 'How to Get More Nail Clients Through Google Business Profile',
  seoTitle: 'How to Get More Nail Clients Through Google Business Profile',
  excerpt: 'A well-optimised Google Business Profile puts your nail business in front of local clients actively searching for nail services. Here\'s how to set it up and make it work.',
  seoDescription: 'How to get more nail clients through Google Business Profile. Set up, optimise, and get found in local search — Google Maps, reviews, photos, and local SEO for nail techs.',
  category: 'get-clients',
  tags: ['Google Business Profile nail tech', 'local SEO nail tech', 'Google Maps nail', 'nail business local search'],
  heroImage: 'linear-gradient(135deg, #F0F9FF 0%, #BAE6FD 100%)',
  heroImageAlt: 'How to get nail clients from Google Business Profile',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-gbp', label: 'Why Google Business Profile matters' },
    { id: 'setup', label: 'Setting up your profile' },
    { id: 'optimising', label: 'Optimising for local search' },
    { id: 'photos', label: 'Photos and visual content' },
    { id: 'reviews', label: 'Reviews strategy' },
    { id: 'posts', label: 'Google Posts' },
  ],
  relatedSlugs: ['how-to-ask-nail-clients-for-reviews', 'how-to-get-more-local-nail-clients', 'how-to-build-nail-client-referral-program'],
  faq: [
    { q: 'Do I need a physical address to use Google Business Profile?', a: 'Not necessarily. Home-based nail techs can set a service area instead of displaying a physical address — this keeps your home address private while still appearing in local search results for your area. You can set your service area as your city or a radius around your location.' },
    { q: 'How long does it take for a Google Business Profile to start generating bookings?', a: 'Most nail techs see measurable impact within 4–8 weeks of setting up a fully optimised profile with photos and an active review strategy. Early reviews are the biggest accelerant — even 5–10 genuine reviews significantly improve visibility and conversion.' },
    { q: 'Is Google Business Profile free?', a: 'Yes, the core Google Business Profile is free. Google offers paid advertising (Google Ads, Local Services Ads) separately, but the organic Business Profile — the listing that appears in Google Maps and local search results — costs nothing.' },
  ],
  relatedFeatureSlugs: ['bookings', 'link-in-bio'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-gbp">
        <h2 className="font-serif text-2xl font-bold mb-4">Why Google Business Profile matters for nail techs</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">When someone searches "nail tech near me" or "gel nails [your town]", the results that appear first are Google Business Profiles — the map listings with photos, reviews, and a direct booking or contact option. These searches represent high-intent clients actively looking to book, not casual browsers.</p>
        <p className="text-gray-700 leading-relaxed">Instagram is important for brand building, but it doesn\'t capture search intent. A client searching for a nail tech in your area on Google is actively ready to book — and a strong Google Business Profile puts you directly in front of them.</p>
      </section>

      <section id="setup">
        <h2 className="font-serif text-2xl font-bold mb-4">Setting up your profile</h2>
        <ArticleTable
          headers={['Step', 'What to do']}
          rows={[
            ['Create or claim your listing', 'Search "Google Business Profile" and sign in with a Google account. If your business already exists on Google, claim it rather than creating a duplicate.'],
            ['Choose your business category', 'Select "Nail Salon" as your primary category — this is critical for appearing in nail-related searches in your area'],
            ['Add your address or service area', 'Home-based: use a service area (city/radius) to keep your address private. Salon-based: add the full address.'],
            ['Add phone number and website', 'Include your booking link as your website URL — this gives clients a direct path to book'],
            ['Set your hours', 'Accurate hours matter — clients check before visiting or calling. Update for holidays and breaks.'],
            ['Add a business description', 'Write a clear, keyword-rich description: what services you offer, your location, what makes you different'],
          ]}
        />
        <ArticleTip>Your primary business category ("Nail Salon") is one of the most important signals for local search. Don\'t pick a vague category like "Beauty Salon" — be specific.</ArticleTip>
      </section>

      <section id="optimising">
        <h2 className="font-serif text-2xl font-bold mb-4">Optimising for local search</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Google ranks Business Profiles based on relevance, distance, and prominence. You can influence all three:</p>
        <ArticleTable
          headers={['Factor', 'How to improve it']}
          rows={[
            ['Relevance', 'Use specific service categories and keywords in your business description. Include your services: "gel manicures, nail extensions, nail art, BIAB."'],
            ['Distance', 'Set your service area accurately — clients searching nearby will find you. For home-based techs, a tight service area keeps you appearing for hyper-local searches.'],
            ['Prominence', 'More reviews, higher review ratings, more photos, more engagement on your listing all improve prominence. This is the factor you can most actively improve.'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">Also ensure your business name, address, and phone number (NAP) are consistent across your Google profile, Instagram bio, and booking page. Inconsistency can confuse Google\'s local ranking signals.</p>
      </section>

      <section id="photos">
        <h2 className="font-serif text-2xl font-bold mb-4">Photos and visual content</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Nail is a visual industry — your Google Business Profile photos are often the first impression a potential client has of your work. Profiles with more high-quality photos perform significantly better than those with few or no images.</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Portfolio photos:</strong> Add your best nail work — varied styles, shapes, and finishes to show range</li>
          <li><strong>Workspace photos:</strong> A clean, well-lit workspace builds trust — clients want to feel comfortable before they arrive</li>
          <li><strong>Update regularly:</strong> Adding new photos periodically signals an active business and keeps your profile fresh</li>
          <li><strong>Label photos meaningfully:</strong> Google uses photo alt text to understand content — descriptive filenames help</li>
        </ul>
        <ArticleCallout variant="info" title="Photo volume matters">
          Aim to build to 20+ high-quality photos over time. Profiles with more photos generally receive more views and direction requests than those with only a few — not because volume alone ranks you higher, but because richer profiles convert better when clients are comparing options.
        </ArticleCallout>
      </section>

      <section id="reviews">
        <h2 className="font-serif text-2xl font-bold mb-4">Reviews strategy</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Reviews are the single most impactful signal for both local ranking and client conversion. Profiles with more genuine reviews rank higher and convert at a higher rate when clients are deciding who to book.</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Ask every satisfied client to leave a Google review — directly, with a link</li>
          <li>Respond to every review, positive and negative — this shows you\'re active and professional</li>
          <li>For negative reviews, respond calmly and offer to resolve — a handled negative review often increases trust</li>
          <li>Aim for specific, detailed reviews ("4-week retention, great nail art, easy to book") rather than generic ones — they rank better and convert better</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">For detailed review request scripts: <Link to="/learn/how-to-ask-nail-clients-for-reviews" className="underline text-[#F52B8C]">how to ask nail clients for reviews</Link>.</p>
      </section>

      <section id="posts">
        <h2 className="font-serif text-2xl font-bold mb-4">Google Posts</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Google Posts let you add short updates to your Business Profile — they appear directly in your listing in search results. Use them to:</p>
        <ArticleTable
          headers={['Post type', 'Example use']}
          rows={[
            ['Availability update', '"October bookings open — link below to grab a slot before I fill up"'],
            ['Seasonal nail art', '"Autumn nail designs now available — deep burgundy, burnt orange, chrome finishes"'],
            ['New service', '"Now offering BIAB (Builder In A Bottle) — stronger natural nails with flexible gel"'],
            ['Offers', '"New client welcome: 10% off your first appointment — book via the link below"'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">Posts expire after 7 days by default — add a new one monthly to keep your profile appearing active. This signals to Google (and to potential clients) that your business is currently operating.</p>
      </section>
    </div>
  ),
});
export {};
