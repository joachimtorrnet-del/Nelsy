import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'bridal-nail-ideas',
  title: '40 Bridal Nail Ideas for Your Wedding Day',
  seoTitle: '40 Bridal Nail Ideas for Your Wedding Day',
  excerpt: 'Wedding nails are one of the most considered nail appointments of a client\'s life. Here are 40 bridal nail ideas — from classic to contemporary — plus what to discuss at the consultation.',
  seoDescription: '40 bridal nail ideas for your wedding day. Classic white, French, nude, and statement bridal sets — with nail tech advice on consultations, timing, and what brides actually need.',
  category: 'nail-inspo',
  tags: ['bridal nail ideas', 'wedding nail ideas', 'bride nails ideas'],
  heroImage: 'linear-gradient(135deg, #FFF9FB 0%, #FCE4F5 100%)',
  heroImageAlt: '40 bridal nail ideas',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'classic-bridal', label: 'Classic bridal nails' },
    { id: 'modern-bridal', label: 'Modern bridal nails' },
    { id: 'statement-bridal', label: 'Statement bridal nails' },
    { id: 'consultation', label: 'The bridal consultation' },
    { id: 'timing', label: 'Timing and prep advice' },
  ],
  relatedSlugs: ['luxury-nail-ideas', 'nail-colors-for-skin-undertone', 'nail-trends-2027', 'bridal-nail-ideas'],
  faq: [
    { q: 'When should a bride book her wedding nail appointment?', a: 'Ideally 4–6 weeks before the wedding for a trial appointment, and 3–5 days before the wedding day for the final appointment. BIAB and gel extensions done too far in advance may grow out; too close to the day and there\'s no time to correct issues. Discuss timing at the first enquiry so the bride has realistic expectations.' },
    { q: 'Should I offer a bridal trial appointment?', a: 'Yes — a trial is strongly recommended for bridal bookings involving nail art or extensions. It lets the bride confirm she loves the design, and gives you time to adjust before the day. Price trials separately — they\'re a full appointment, not a free consultation.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="classic-bridal">
        <h2 className="font-serif text-2xl font-bold mb-4">Classic bridal nails (ideas 1–12)</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>Traditional French manicure — white tip on natural base; timeless and universally requested</li>
          <li>Soft white — a solid opaque soft white rather than a French; cleaner and more modern</li>
          <li>Warm ivory / cream — slightly off-white that works with warm wedding dresses</li>
          <li>Sheer pink nude — barely-there colour with a glazed finish; perfect for understated brides</li>
          <li>Baby French — ultra-thin white tip on a sheer base; minimal and refined</li>
          <li>Blush pink — soft, romantic, and widely flattering</li>
          <li>Peach nude on almond shape — elongating and elegant</li>
          <li>Glazed finish over natural nail — high-shine, healthy, "your skin but better" look</li>
          <li>Classic red for the bold bride — a statement that photographs beautifully</li>
          <li>Square French with a gold line detail along the smile line</li>
          <li>Oval natural-length BIAB in a clean sheer pink — elegant and practical</li>
          <li>Milky white jelly finish — translucent white with depth and glow</li>
        </ol>
      </section>

      <section id="modern-bridal">
        <h2 className="font-serif text-2xl font-bold mb-4">Modern bridal nails (ideas 13–26)</h2>
        <ol start={13} className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>Chrome French tip — soft square with a silver or gold chrome tip instead of white</li>
          <li>Glass finish nails — no colour, just extreme glossy depth over natural or extensions</li>
          <li>Foil French — gold leaf embedded at the tip rather than white polish</li>
          <li>Reverse French — colour at the base moon instead of the tip</li>
          <li>Ombré French — gradient from nude to soft white at the tip; modern and fresh</li>
          <li>White chrome on almond — full mirror chrome in white or silver; striking and editorial</li>
          <li>Negative space French — the tip colour applied with a gap; architectural and modern</li>
          <li>Barely-pink gel with subtle 3D pearl accents on two nails</li>
          <li>Pearlescent finish — iridescent top coat over a nude base that shifts in the light</li>
          <li>Single fine gold foil stripe detail on a nude set</li>
          <li>Clean square, deep white with a sheer matte finish — cool and confident</li>
          <li>Pastel lavender — for the non-traditional bride; soft and romantic</li>
          <li>Soft sage green — unconventional but increasingly popular for nature-inspired weddings</li>
          <li>Dual-tone French — muted base with a barely-there tone-on-tone tip</li>
        </ol>
      </section>

      <section id="statement-bridal">
        <h2 className="font-serif text-2xl font-bold mb-4">Statement bridal nails (ideas 27–40)</h2>
        <ol start={27} className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>3D floral accent — gel-sculpted roses or petals on one or two nails</li>
          <li>Embellished French — rhinestones along the smile line</li>
          <li>Full rhinestone accent nail — one nail covered in crystals against an otherwise plain set</li>
          <li>Lace-inspired linework — delicate linework evoking lace pattern on a sheer base</li>
          <li>White marble with gold veins — classic, editorial, and widely admired</li>
          <li>Gold leaf embedding — actual gold leaf pieces inside the gel structure</li>
          <li>Floral linework on sheer — loose painted flowers on a see-through gel base</li>
          <li>Sweetheart French — French tip with a heart cutout at the apex</li>
          <li>Pearl accent — real or imitation pearl gems set into one accent nail</li>
          <li>Encapsulated pressed flowers — real dried florals sealed inside the gel</li>
          <li>Bridal ombre — white to pink or nude, soft gradient on extensions</li>
          <li>Crystal encrusted stiletto — for the maximalist bride; one nail is all crystal</li>
          <li>Something blue — subtle blue foil or gem on one nail as a nod to the tradition</li>
          <li>Personalised nail art — initials, wedding date, or floral motif matching the bouquet</li>
        </ol>
        <ArticleTip>For personalised bridal nail art, ask the bride to share wedding mood boards, floral choices, and dress details at least 4 weeks before — the more reference you have, the better the result.</ArticleTip>
      </section>

      <section id="consultation">
        <h2 className="font-serif text-2xl font-bold mb-4">The bridal consultation</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Bridal consultations should cover:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Wedding date and appointment timing</li>
          <li>Dress style and colour — nails should complement, not clash</li>
          <li>Bouquet or florals — if she wants them referenced in the design</li>
          <li>Length preference — practical for the day (dancing, travel, photos)</li>
          <li>Her nail history — extensions virgin or experienced?</li>
          <li>Whether bridesmaids or other members of the party are also booking</li>
        </ul>
        <ArticleCallout variant="info" title="Book group party appointments carefully">
          If taking a bridal party group, be clear on how many people you can accommodate and in what timeframe. Don't commit to a group you can't realistically complete on time on the most important day of the client's life.
        </ArticleCallout>
      </section>

      <section id="timing">
        <h2 className="font-serif text-2xl font-bold mb-4">Timing and prep advice</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Trial appointment:</strong> 4–6 weeks before the wedding; test the design, confirm the length, check durability</li>
          <li><strong>Final appointment:</strong> 3–5 days before the wedding day; fresh enough to look perfect in photos</li>
          <li><strong>Too early:</strong> BIAB and gel extensions done 2+ weeks before will show noticeable growth and may need infilling</li>
          <li><strong>Prep nails:</strong> Advise the bride to avoid gel removal or harsh chemicals in the 2 weeks before — protect the nail plate</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">For more inspo: <Link to="/learn/luxury-nail-ideas" className="underline text-[#F52B8C]">luxury nail ideas</Link>.</p>
      </section>
    </div>
  ),
});
export {};
