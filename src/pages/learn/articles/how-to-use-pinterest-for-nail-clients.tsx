import { registerArticle } from '@/lib/articles';
import { ArticleSteps, ArticleTip, ArticleCallout } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-use-pinterest-for-nail-clients',
  title: 'How to Use Pinterest to Get Nail Clients',
  seoTitle: 'How to Use Pinterest to Get Nail Clients',
  excerpt: 'Pinterest is one of the most underused client acquisition tools for nail techs. Unlike Instagram, your content keeps driving traffic for months after you post. Here\'s how to use it.',
  seoDescription: 'How to use Pinterest to get nail clients. Pinterest strategy for nail techs — what to pin, how to optimise boards, and how to convert Pinterest views into bookings.',
  category: 'instagram-content',
  tags: ['pinterest for nail techs', 'nail tech pinterest strategy', 'get nail clients pinterest'],
  heroImage: 'linear-gradient(135deg, #FFF0F6 0%, #FDDDE6 100%)',
  heroImageAlt: 'How to use Pinterest to get nail clients',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-pinterest', label: 'Why Pinterest works for nail techs' },
    { id: 'setting-up', label: 'Setting up your account' },
    { id: 'what-to-pin', label: 'What to pin' },
    { id: 'optimising', label: 'Optimising for search' },
    { id: 'converting', label: 'Converting views to bookings' },
  ],
  relatedSlugs: ['nail-tech-instagram-bio', 'instagram-content-plan-nail-techs', 'nail-tech-reel-hooks', 'how-to-get-more-nail-clients'],
  faq: [
    { q: 'How long does it take to see results from Pinterest?', a: 'Pinterest is a slow-burn platform — results build over months, not days. The first month, traffic is typically minimal. By month 3–6 of consistent pinning, you should see measurable referral traffic. After a year, well-optimised pins can drive consistent inbound traffic with no ongoing effort. The key difference from Instagram is that Pinterest pins can drive traffic years after posting.' },
    { q: 'Do I need to post on Pinterest every day?', a: 'No. Pinterest rewards consistency over frequency — 3–7 pins per week of high-quality content outperforms 30 lower-quality pins per week. Batch your pinning sessions (once or twice a week for 20 minutes) rather than posting sporadically.' },
  ],
  relatedFeatureSlugs: ['link-in-bio', 'audience-capture'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-pinterest">
        <h2 className="font-serif text-2xl font-bold mb-4">Why Pinterest works for nail techs</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Evergreen content:</strong> Unlike Instagram posts that are forgotten within 48 hours, a Pinterest pin can drive traffic for months or years after you post it</li>
          <li><strong>Search intent:</strong> People come to Pinterest to find things to do or buy — "pink almond nail ideas", "spring nail designs 2026" — they are already planning and looking</li>
          <li><strong>Less competition:</strong> Most nail techs focus all their content effort on Instagram; Pinterest is less crowded and your content can stand out more easily</li>
          <li><strong>Drives to your website:</strong> Pinterest pins link back to your booking page or website — it's designed to send traffic, not keep it on the platform</li>
          <li><strong>Discovery by new clients:</strong> Pinterest users frequently discover nail techs they didn't know existed; Instagram is more about following accounts you already know</li>
        </ul>
        <ArticleCallout variant="info" title="Pinterest and Instagram work differently">
          Instagram is a relationship platform — followers follow you. Pinterest is a search platform — strangers find you. Both have a place in your marketing, but they work differently. Pinterest excels at discovery and long-term traffic; Instagram excels at community and conversion.
        </ArticleCallout>
      </section>

      <section id="setting-up">
        <h2 className="font-serif text-2xl font-bold mb-4">Setting up your account</h2>
        <ArticleSteps
          steps={[
            { title: 'Create a business account', body: 'Use a Pinterest Business account (free) — this gives you access to analytics, allows you to link to your website, and displays your location and contact information.' },
            { title: 'Claim your website', body: 'Connect your booking website or link-in-bio page to your Pinterest account. This attribute your pins back to your site and builds credibility in Pinterest\'s algorithm.' },
            { title: 'Set up your profile', body: 'Use your nail business name, a clear profile photo, and a keyword-rich description: "Nail tech in [city] — booking gel, extensions, and nail art. Book at [link]."' },
            { title: 'Create boards', body: 'Set up 5–10 boards for the types of nails you do or want to attract: "Pink Nail Ideas", "Gel Extension Inspo", "Nail Art Designs", "Autumn Nails", etc. Name boards the way clients search, not how you categorise internally.' },
          ]}
        />
      </section>

      <section id="what-to-pin">
        <h2 className="font-serif text-2xl font-bold mb-4">What to pin</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Your own nail photos:</strong> The most important content — your own work, optimised for Pinterest with keyword-rich titles and descriptions</li>
          <li><strong>Inspo from others:</strong> Repin high-quality nail content from other creators; this fills your boards, helps Pinterest understand what your account is about, and builds your following without requiring you to produce all the content</li>
          <li><strong>Seasonal and trend content:</strong> Create pins specifically for what people are searching: "summer nail ideas 2026", "Christmas nail designs", "autumn nail inspo"</li>
          <li><strong>Blog or article content:</strong> If you have articles on your website (or on Nelsy!), pin them with a descriptive image and strong keyword title</li>
        </ul>
        <ArticleTip>Vertical images (2:3 ratio, approximately 1000×1500px) perform best on Pinterest. Nail photos already tend to be vertical — no need to reformat your Instagram content significantly.</ArticleTip>
      </section>

      <section id="optimising">
        <h2 className="font-serif text-2xl font-bold mb-4">Optimising for search</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Pin title:</strong> Use the exact search term clients would type — "Hot Pink Chrome Nail Ideas" not "New set 🌸"</li>
          <li><strong>Pin description:</strong> 2–3 sentences with natural keywords: what the set is, the service type, your location, and a call to action ("Book with [name] in [city]")</li>
          <li><strong>Board names:</strong> Name boards exactly how people search — "Autumn Nail Ideas" not "My autumn work"</li>
          <li><strong>Alt text:</strong> Add alt text to every pin; Pinterest uses this for search</li>
          <li><strong>Keywords in your profile:</strong> Include the city you work in and the services you offer in your profile description</li>
        </ul>
      </section>

      <section id="converting">
        <h2 className="font-serif text-2xl font-bold mb-4">Converting views to bookings</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Every pin should link to a destination that can convert a viewer into a client — your booking page, website, or a link-in-bio tool with a clear booking option</li>
          <li>Include your location in every pin description — "nail tech in [city]" helps local clients identify you as relevant</li>
          <li>Use a clear call to action: "Book via link in bio" or "Booking link in my profile"</li>
          <li>Pinterest users often save pins for future reference — they may come back to book weeks or months after first seeing your work</li>
          <li>Track Pinterest referral traffic in your booking software analytics — if Pinterest is driving bookings, you'll see it in the referral source data</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
