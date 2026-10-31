import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-drill-bits-explained',
  title: 'Nail Drill Bits Explained: Which Bit Does What',
  seoTitle: 'Nail Drill Bits Explained: A Complete Guide for Nail Techs',
  excerpt: 'A complete guide to nail drill bits — what each type does, when to use it, and how to choose the right bit for prep, removal, and finishing.',
  seoDescription: 'Nail drill bits explained. A complete guide to e-file drill bit types — carbide, diamond, ceramic — what each does, when to use them, and grit guide for nail techs.',
  category: 'nail-education',
  tags: ['nail drill bits', 'e-file bits', 'nail drill guide', 'nail tech tools'],
  heroImage: 'linear-gradient(135deg, #F8FAFC 0%, #CBD5E1 100%)',
  heroImageAlt: 'Nail drill bits guide for nail techs',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'bit-materials', label: 'Drill bit materials' },
    { id: 'bit-shapes', label: 'Bit shapes and what they do' },
    { id: 'grit-guide', label: 'Grit levels explained' },
    { id: 'which-bit-when', label: 'Which bit to use when' },
    { id: 'maintenance', label: 'Caring for your bits' },
  ],
  relatedSlugs: ['nail-prep-guide', 'nail-file-grit-guide', 'how-to-prevent-nail-lifting'],
  faq: [
    { q: 'Do I need an e-file as a nail tech?', a: 'It\'s not strictly necessary for gel polish services, but it significantly speeds up removal, prep, and finishing for gel extensions, acrylics, and structured manicures. Most professional nail techs who do gel or acrylic work use an e-file. It\'s worth investing in once you\'re doing regular extension clients.' },
    { q: 'What e-file drill bit should a beginner start with?', a: 'A medium-grit carbide barrel bit for backfill and refinement, and a medium-fine diamond or carbide cuticle bit for around the sidewalls and cuticle area. These two bits handle most professional tasks. Practise on practice hands before using on clients.' },
    { q: 'Can I use nail drill bits on natural nails?', a: 'Some bits are designed for use near natural nails (cuticle bits, fine-grit finishing bits). High-grit carbide barrel bits for hard gel or acrylic should not be used on the natural nail plate — they remove material too aggressively. Always use the appropriate grit for the task.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="bit-materials">
        <h2 className="font-serif text-2xl font-bold mb-4">Drill bit materials</h2>
        <ArticleTable
          headers={['Material', 'Best for', 'Notes']}
          rows={[
            ['Carbide', 'Removing hard gel, acrylic, product backfill', 'Aggressive cutting. Fast removal. Not for natural nail. Must be used correctly.'],
            ['Diamond', 'Natural nail area, cuticle work, fine finishing', 'More controlled. Safe closer to natural nail. Longer lasting than carbide.'],
            ['Ceramic', 'General prep, buffing, finishing', 'Runs cooler than carbide. Good for sensitive clients. Less aggressive.'],
            ['Mandrel + sanding bands', 'Shaping, removing gel polish, prep on natural nail', 'Disposable bands for hygiene. Replace between clients.'],
          ]}
        />
        <ArticleTip>For any work near the natural nail plate or cuticle area — use diamond or ceramic, not carbide. Carbide bits are designed for product, not natural nail. Using a carbide bit too close to the natural nail can cause heat, damage, and thinning.</ArticleTip>
      </section>

      <section id="bit-shapes">
        <h2 className="font-serif text-2xl font-bold mb-4">Bit shapes and what they do</h2>
        <ArticleTable
          headers={['Shape', 'Description', 'Primary use']}
          rows={[
            ['Barrel / cylinder', 'Cylindrical, flat ends', 'Backfill removal, refining extension product, surface prep'],
            ['Tapered barrel', 'Cylindrical with angled/tapered end', 'Getting into the sidewall area while maintaining product on the nail plate'],
            ['Flame / pointed', 'Narrow, pointed tip', 'Sidewalls, cuticle area, between the cuticle and product'],
            ['Ball', 'Round ball shape', 'Cuticle area, gentle prep around cuticle — low risk to surrounding skin'],
            ['Cone', 'Cone-shaped', 'Cuticle work, interior of the nail sidewall'],
            ['Bullet / teardrop', 'Elongated round tip', 'Surface refinement, product removal near cuticle area'],
            ['Straight / flat top', 'Cylinder with flat top face', 'Product removal from the surface, especially hard gel'],
            ['Mandrel', 'Stem that holds sanding bands', 'Accepts disposable sanding bands for gel polish prep/removal'],
          ]}
        />
      </section>

      <section id="grit-guide">
        <h2 className="font-serif text-2xl font-bold mb-4">Grit levels explained</h2>
        <ArticleTable
          headers={['Grit', 'Also called', 'Used for']}
          rows={[
            ['Extra coarse', 'Very coarse, 30–60 grit', 'Heavy product removal (rarely used in salon settings)'],
            ['Coarse', '60–100 grit', 'Removing hard gel extensions, acrylic'],
            ['Medium', '150–180 grit', 'Backfill, surface prep, product refinement'],
            ['Fine', '240 grit', 'Finishing product surface before top coat; near natural nail area'],
            ['Extra fine', '280–400+ grit', 'Polishing natural nail, very fine finishing'],
          ]}
        />
        <ArticleCallout variant="info" title="Grit colour coding">
          Most manufacturers use a colour ring on the bit shank to indicate grit: black/blue = coarse, red = medium, yellow/green = fine, white/no ring = extra fine. Check your manufacturer's specific coding — it varies by brand.
        </ArticleCallout>
      </section>

      <section id="which-bit-when">
        <h2 className="font-serif text-2xl font-bold mb-4">Which bit to use when</h2>
        <ArticleTable
          headers={['Task', 'Bit to use']}
          rows={[
            ['Remove hard gel extension', 'Coarse/medium carbide barrel'],
            ['Remove acrylic', 'Coarse/medium carbide barrel; slow speed'],
            ['Remove gel polish', 'Medium mandrel with sanding band'],
            ['Backfill (infill zone)', 'Medium carbide barrel'],
            ['Refine product surface', 'Medium/fine carbide or diamond barrel'],
            ['Cuticle area prep', 'Fine diamond flame or ball'],
            ['Sidewall cleanup', 'Fine diamond tapered barrel or flame'],
            ['Finishing before top coat', 'Fine/extra fine ceramic or diamond barrel'],
            ['Natural nail buff', 'Fine sanding band or fine ceramic'],
          ]}
        />
      </section>

      <section id="maintenance">
        <h2 className="font-serif text-2xl font-bold mb-4">Caring for your bits</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Drill bits need proper cleaning and disinfection between clients, and periodic deep cleaning to remain effective:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Between clients:</strong> Use a metal bit-cleaning brush to remove product dust from the flutes. Then immerse in disinfectant solution for the manufacturer-recommended time.</li>
          <li><strong>Weekly deep clean:</strong> Ultrasonic cleaner or soak in acetone for a few minutes, then brush, rinse, and autoclave if appropriate for your practice.</li>
          <li><strong>Mandrel sanding bands:</strong> Single-use per client — replace between every client without exception. They cannot be adequately sterilised.</li>
          <li><strong>When to replace:</strong> A carbide bit that pulls rather than cuts smoothly is overdue for replacement. Diamond bits last longer but lose effectiveness over time. If a bit is scratching or dragging uncomfortably, replace it.</li>
        </ul>
        <ArticleCallout variant="tip" title="Storage">
          Store drill bits in a holder or roll that keeps them separate. Loose bits in a drawer chip each other's flutes and lose effectiveness faster. Label new bits with their purchase date so you can track usage.
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">For a guide to nail files — the manual equivalent: <Link to="/learn/nail-file-grit-guide" className="underline text-[#F52B8C]">nail file grit guide for beginners</Link>.</p>
      </section>
    </div>
  ),
});
export {};
