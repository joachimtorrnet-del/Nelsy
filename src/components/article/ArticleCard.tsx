import { Link } from 'react-router-dom';
import type { ArticleMeta } from '@/lib/articles';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/articles';
import { coverPhotoFor } from '@/lib/blogLinks';

const unsplash = (id: string, w: number, ratio: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${Math.round(w * ratio)}&q=70`;

/** Topic photo used as the article cover on cards and in the article hero. */
export function CoverPhoto({
  slug,
  category,
  className,
  sizes = '(max-width: 640px) 100vw, 400px',
  eager = false,
  ratio = 630 / 1200,
}: {
  slug: string;
  category: ArticleMeta['category'];
  className?: string;
  sizes?: string;
  eager?: boolean;
  ratio?: number;
}) {
  const photo = coverPhotoFor(slug, category);
  return (
    <img
      src={unsplash(photo.id, 800, ratio)}
      srcSet={`${unsplash(photo.id, 400, ratio)} 400w, ${unsplash(photo.id, 800, ratio)} 800w, ${unsplash(photo.id, 1200, ratio)} 1200w`}
      sizes={sizes}
      width={1200}
      height={Math.round(1200 * ratio)}
      alt={photo.alt}
      className={`${className ?? ''} object-cover`}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}

interface Props {
  article: ArticleMeta;
  size?: 'featured' | 'spotlight' | 'grid';
  /** Read time shown on grid cards when known. */
  minutes?: number;
}

function CategoryPill({ category }: { category: string }) {
  const c = CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS];
  const label = CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] ?? category;
  return (
    <span
      className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
      style={{ background: c?.bg ?? '#F7F3F3', color: c?.text ?? '#555' }}
    >
      {label}
    </span>
  );
}

const shortDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { timeZone: 'UTC', day: 'numeric', month: 'short', year: 'numeric' });

export default function ArticleCard({ article, size = 'grid', minutes }: Props) {
  const isFeatured = size === 'featured';
  const cat = CATEGORY_COLORS[article.category];
  const date = shortDate(article.updatedAt ?? article.publishedAt);

  // Real editorial photo takes priority; otherwise a topic photo
  const zoom = 'w-full h-full transition-transform duration-500 group-hover:scale-[1.03]';
  const imageEl = article.heroImage.startsWith('/') ? (
    <img src={article.heroImage} alt={article.heroImageAlt} className={`${zoom} object-cover`} loading="lazy" />
  ) : (
    <CoverPhoto
      slug={article.slug}
      category={article.category}
      className={zoom}
      sizes={isFeatured ? '(max-width: 768px) 100vw, 560px' : '(max-width: 640px) 100vw, 400px'}
      eager={isFeatured}
    />
  );

  if (isFeatured) {
    return (
      <Link
        to={`/blog/${article.slug}`}
        className="group grid md:grid-cols-2 rounded-3xl overflow-hidden bg-[#FDF0F7] border border-[#F4C2C2]/50 hover:shadow-xl hover:shadow-[#F52B8C]/10 transition-shadow"
      >
        <div className="aspect-[1200/630] md:aspect-auto md:min-h-[340px] overflow-hidden bg-white">
          {imageEl}
        </div>
        <div className="p-6 sm:p-10 flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <CategoryPill category={article.category} />
            <span className="text-[11px] font-medium text-gray-500 bg-white rounded-full px-2.5 py-1">{date}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#F52B8C] transition-colors leading-tight">
            {article.title}
          </h2>
          <p className="text-gray-600 text-[15px] leading-relaxed mb-6 line-clamp-3">
            {article.tldr?.answer ?? article.excerpt}
          </p>
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#F52B8C] px-5 py-2.5 text-sm font-bold text-white">
            Read article <span aria-hidden>→</span>
          </span>
        </div>
      </Link>
    );
  }

  // Grid / spotlight card
  return (
    <Link
      to={`/blog/${article.slug}`}
      className="group flex flex-col h-full rounded-2xl overflow-hidden bg-white border border-[#1A1A1A]/10 hover:border-[#F52B8C]/40 hover:shadow-lg hover:shadow-[#F52B8C]/5 transition"
    >
      <div className="aspect-[1200/630] overflow-hidden bg-[#F7F3F3]">{imageEl}</div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: cat?.text ?? '#555' }}>
          {CATEGORY_LABELS[article.category]}
          <span className="font-medium normal-case tracking-normal text-gray-400"> · {date}</span>
        </p>
        <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mb-2 group-hover:text-[#F52B8C] transition-colors leading-snug line-clamp-2">
          {article.title}
        </h3>
        {size === 'spotlight' && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-3">{article.excerpt}</p>
        )}
        <span className="mt-auto pt-2 flex items-center justify-between text-xs">
          <span className="font-semibold text-[#1A1A1A] group-hover:text-[#F52B8C] transition-colors">Read more <span aria-hidden>→</span></span>
          {minutes ? <span className="text-gray-400">{minutes} min read</span> : null}
        </span>
      </div>
    </Link>
  );
}
