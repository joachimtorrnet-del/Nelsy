import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-build-nail-tech-website',
  title: 'How to Build a Nail Tech Website That Gets Bookings',
  seoTitle: 'How to Build a Nail Tech Website That Actually Gets Bookings',
  excerpt: 'A nail tech website doesn\'t need to be complicated — but it does need to do one job: convert visitors into booked clients. Here\'s what to include and what to leave out.',
  seoDescription: 'How to build a nail tech website that gets bookings. What pages and content you need, what platforms to use, and how to connect online booking to your site.',
  category: 'get-clients',
  tags: ['nail tech website', 'nail business website', 'nail tech booking page', 'nail tech online presence'],
  heroImage: 'linear-gradient(135deg, #F0FDF4 0%, #BBF7D0 100%)',
  heroImageAlt: 'How to build a nail tech website that gets bookings',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'do-you-need-website', label: 'Do you actually need a website?' },
    { id: 'what-to-include', label: 'What to include' },
    { id: 'platforms', label: 'Which platform to use' },
    { id: 'booking-integration', label: 'Connecting booking' },
    { id: 'seo-basics', label: 'Basic SEO for your site' },
    { id: 'website-checklist', label: 'Website launch checklist' },
  ],
  relatedSlugs: ['local-seo-for-nail-techs', 'how-to-get-nail-clients-from-google-business-profile', 'what-should-nail-tech-booking-page-include', 'how-to-make-nail-business-look-professional'],
  faq: [
    { q: 'Do I need a website if I already have Instagram?', a: 'Instagram is great for discovery and brand building, but it\'s not a website. Instagram doesn\'t rank in Google local search, doesn\'t give you a dedicated booking experience, and is controlled by a third party. A website adds local SEO value, gives clients a professional destination to book from, and gives you a URL you control. At minimum, a booking page (from your scheduling software) with your own domain name serves most of the same purposes as a full website.' },
    { q: 'How much should a nail tech website cost?', a: 'A simple DIY website on Squarespace, Wix, or WordPress costs £10–£20/month. If you use a booking platform with a branded booking page (like Nelsy, GlossGenius, or similar), that booking page can serve as your website with no additional cost. A custom-designed website can cost hundreds or thousands — not necessary for most independent nail techs.' },
    { q: 'What\'s the most important thing to put on a nail tech website?', a: 'Your booking link, your services with prices, and your nail portfolio photos. If a potential client can find out what you offer, what it costs, see your work, and book — you\'ve done the job. Everything else is secondary.' },
  ],
  relatedFeatureSlugs: ['link-in-bio', 'bookings', 'audience-capture'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="do-you-need-website">
        <h2 className="font-serif text-2xl font-bold mb-4">Do you actually need a website?</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Many independent nail techs run a full client list with nothing more than an Instagram account and a booking link. A website isn't mandatory — but it does things Instagram can't:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Google local search visibility:</strong> A website with your location and services helps you rank for "nail tech [your city]" on Google</li>
          <li><strong>Professional destination:</strong> A URL you control (not instagram.com/yourpage) builds credibility</li>
          <li><strong>Booking experience control:</strong> You decide what clients see before booking — services, prices, policies, photos</li>
          <li><strong>Email collection:</strong> You can build an email list of clients for direct marketing</li>
        </ul>
        <ArticleTip>If you use a booking platform with a branded booking page, that page often serves the same purpose as a simple website — especially when you connect a custom domain to it.</ArticleTip>
      </section>

      <section id="what-to-include">
        <h2 className="font-serif text-2xl font-bold mb-4">What to include</h2>
        <ArticleTable
          headers={['Page / Section', 'What it should contain']}
          rows={[
            ['Home', 'Your name, location, a clear headline ("Gel & Acrylic Nail Tech in Bristol"), your portfolio hero image, and a book button'],
            ['Services + prices', 'Every service you offer, with name, description, and price — no vague "from" pricing'],
            ['Portfolio', '10–20 of your best nail photos, regularly updated'],
            ['Booking', 'A direct link to or embedded booking calendar — this is the conversion point'],
            ['Policies', 'Deposit, cancellation, and late arrival policies — set expectations before clients arrive'],
            ['About', 'Brief — who you are, your training, where you work, what makes you different'],
            ['Contact', 'Your Instagram link, email, and your service area (not necessarily your home address)'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">What NOT to include: an unnecessary blog, dozens of pages, a complicated navigation, auto-playing music, or a long intro animation. Simple converts better than complicated.</p>
      </section>

      <section id="platforms">
        <h2 className="font-serif text-2xl font-bold mb-4">Which platform to use</h2>
        <ArticleTable
          headers={['Option', 'Best for', 'Cost']}
          rows={[
            ['Booking page as website', 'Nail techs whose booking platform offers a branded page (Nelsy, GlossGenius, etc.)', 'Included in booking platform subscription'],
            ['Squarespace', 'Clean design without coding; templates well-suited to visual creative businesses', '£12–£20/month'],
            ['Wix', 'Flexible drag-and-drop; good for beginners', '£10–£17/month'],
            ['WordPress.com', 'More control; slightly more complex', 'Free to £20/month'],
            ['Custom build', 'Full flexibility; not necessary for most independent nail techs', '£500–£3,000+'],
          ]}
        />
      </section>

      <section id="booking-integration">
        <h2 className="font-serif text-2xl font-bold mb-4">Connecting booking to your site</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The most important thing your website does is convert visitors into booked clients. Every page should make booking easy:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>A "Book Now" button in your navigation and on your home page</li>
          <li>The booking link goes directly to your scheduling system — not to your Instagram, not to a contact form</li>
          <li>On mobile, your booking button should be visible without scrolling</li>
          <li>If your booking platform supports embedding, embed the booking calendar directly on the page rather than sending clients to another tab</li>
        </ul>
        <ArticleCallout variant="info" title="Your booking page IS your website">
          If your booking platform gives you a branded page with your name, services, prices, photos, and booking form, that page can function as your website. Add a custom domain (usually available for a small annual fee) and you have a professional web presence without building a separate site.
        </ArticleCallout>
      </section>

      <section id="seo-basics">
        <h2 className="font-serif text-2xl font-bold mb-4">Basic SEO for your site</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">You don't need to become an SEO expert — but a few basics help Google understand what your site is about:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Page title:</strong> Include your service and location — "Gel Nail Tech in Leeds | Book Online"</li>
          <li><strong>Meta description:</strong> A clear 160-character summary of what you offer and where</li>
          <li><strong>Headings:</strong> Use H1 for your main heading, H2 for section headings — helps Google understand your content structure</li>
          <li><strong>Image alt text:</strong> Describe your nail photos — "almond gel nails with chrome finish" rather than "IMG_4821"</li>
          <li><strong>Location mentioned in body text:</strong> Mention your city/area naturally in your about and services copy</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">For local search visibility: <Link to="/learn/local-seo-for-nail-techs" className="underline text-[#F52B8C]">local SEO for nail techs: complete guide</Link>.</p>
      </section>

      <section id="website-checklist">
        <h2 className="font-serif text-2xl font-bold mb-4">Website launch checklist</h2>
        <ArticleChecklist items={[
          'Domain name purchased and connected',
          'Services listed with names and prices',
          '10+ portfolio photos uploaded',
          'Booking link visible on every page (especially mobile)',
          'Deposit and cancellation policy stated clearly',
          'Page title includes service + location',
          'Meta description written',
          'Google Business Profile links to this site URL',
          'Instagram bio links to this site URL',
          'Site tested on mobile — booking flow works without friction',
        ]} />
      </section>
    </div>
  ),
});
export {};
