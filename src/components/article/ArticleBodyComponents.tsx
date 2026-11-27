import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

const PINK = '#F52B8C';

// ─── ArticleCallout ──────────────────────────────────────────────────────────

type CalloutVariant = 'tip' | 'info' | 'warning' | 'success';

const CALLOUT_STYLES: Record<CalloutVariant, { bg: string; border: string; icon: string; label: string }> = {
  tip:     { bg: '#FDF0F7', border: '#F4C2C2', icon: '💡', label: 'Tip' },
  info:    { bg: '#EFF6FF', border: '#BFDBFE', icon: 'ℹ️',  label: 'Note' },
  warning: { bg: '#FFFBEB', border: '#FDE68A', icon: '⚠️', label: 'Watch out' },
  success: { bg: '#F0FDF4', border: '#BBF7D0', icon: '✓',  label: 'Good to know' },
};

export function ArticleCallout({
  variant = 'tip',
  title,
  children,
}: {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
}) {
  const s = CALLOUT_STYLES[variant];
  return (
    <aside
      className="my-8 rounded-2xl px-5 py-4 text-sm leading-relaxed"
      style={{ background: s.bg, borderLeft: `3px solid ${s.border}` }}
    >
      <p className="font-bold text-[#1A1A1A] mb-1 text-xs uppercase tracking-wide">
        {s.icon} {title ?? s.label}
      </p>
      <div className="text-gray-700">{children}</div>
    </aside>
  );
}

// ─── ArticleTip ──────────────────────────────────────────────────────────────

export function ArticleTip({ children }: { children: ReactNode }) {
  return <ArticleCallout variant="tip">{children}</ArticleCallout>;
}

// ─── ArticleQuote ────────────────────────────────────────────────────────────

export function ArticleQuote({
  children,
  attribution,
}: {
  children: ReactNode;
  attribution?: string;
}) {
  return (
    <blockquote
      className="my-8 px-6 py-5 rounded-2xl italic text-lg leading-relaxed text-[#1A1A1A]"
      style={{ background: '#FDF0F7', borderLeft: `4px solid ${PINK}` }}
    >
      <p>{children}</p>
      {attribution && (
        <footer className="mt-3 text-sm not-italic font-medium text-gray-500">
          {attribution}
        </footer>
      )}
    </blockquote>
  );
}

// ─── ArticleTable ────────────────────────────────────────────────────────────
// Comparison-style table: dark header, sticky first column on small screens,
// and the Nelsy row or column highlighted in brand pink (detected from the
// first cell / header text, so every existing table gets it automatically).

const isNelsy = (v: unknown) => typeof v === 'string' && /^nelsy\b/i.test(v.trim());

export function ArticleTable({
  headers,
  rows,
  caption,
}: {
  headers: string[];
  rows: (string | ReactNode)[][];
  caption?: string;
}) {
  const nelsyCol = headers.findIndex((h, i) => i > 0 && isNelsy(h));
  return (
    <div className="not-prose my-8 overflow-x-auto rounded-2xl border border-[#1A1A1A]/10 bg-white shadow-sm">
      <table className="w-full min-w-[560px] text-sm border-collapse">
        {caption && (
          <caption className="text-xs text-gray-500 pb-2 text-left px-4 pt-3">
            {caption}
          </caption>
        )}
        <thead>
          <tr>
            {headers.map((h, j) => (
              <th
                key={h + j}
                scope="col"
                className={`text-left px-4 py-3.5 font-bold text-[11px] uppercase tracking-wider ${
                  j === nelsyCol ? 'bg-[#F52B8C] text-white' : 'bg-[#1A1A1A] text-white'
                } ${j === 0 ? 'sticky left-0 z-10' : ''}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const nelsyRow = isNelsy(row[0]);
            return (
              <tr key={i} className={nelsyRow ? 'bg-[#FDF0F7]' : i % 2 === 0 ? 'bg-white' : 'bg-[#FFFBFB]'}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-4 py-3 align-top border-b border-[#1A1A1A]/5 ${
                      j === 0
                        ? `sticky left-0 font-semibold text-[#1A1A1A] ${nelsyRow ? 'bg-[#FDF0F7]' : i % 2 === 0 ? 'bg-white' : 'bg-[#FFFBFB]'}`
                        : j === nelsyCol
                          ? 'bg-[#FDF0F7] text-[#1A1A1A] font-medium'
                          : nelsyRow ? 'text-[#1A1A1A] font-medium' : 'text-gray-700'
                    }`}
                  >
                    {j === 0 && nelsyRow ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F52B8C]" aria-hidden />
                        {cell}
                      </span>
                    ) : cell}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── ArticleChecklist ────────────────────────────────────────────────────────

export function ArticleChecklist({
  title,
  items,
}: {
  title?: string;
  items: string[];
}) {
  return (
    <div
      className="my-8 rounded-2xl p-5"
      style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}
    >
      {title && (
        <p className="font-bold text-sm text-[#166534] mb-3 uppercase tracking-wide">
          ✓ {title}
        </p>
      )}
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
            <span className="mt-0.5 text-green-600 flex-shrink-0 font-bold">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── ArticleSteps ────────────────────────────────────────────────────────────

export function ArticleSteps({
  steps,
}: {
  steps: Array<{ title: string; body: ReactNode }>;
}) {
  return (
    <ol className="my-8 space-y-5">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4">
          <div
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white mt-0.5"
            style={{ background: PINK }}
          >
            {i + 1}
          </div>
          <div className="flex-1 pb-5 border-b border-[#F4C2C2]/20 last:border-b-0">
            <p className="font-semibold text-[#1A1A1A] mb-1">{step.title}</p>
            <div className="text-gray-600 text-sm leading-relaxed">{step.body}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

// ─── ArticleImage ────────────────────────────────────────────────────────────

const UNSPLASH = 'https://images.unsplash.com/';

/** Accepts a full URL, a local path, or an Unsplash photo id ("photo-…"), served responsive. */
export function ArticleImage({
  src,
  alt,
  caption,
  fullWidth = false,
  flush = false,
  wide = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  fullWidth?: boolean;
  /** No vertical margin (when the parent already spaces its children). */
  flush?: boolean;
  /** 16:9 crop instead of 4:3 (used for photos the template inserts). */
  wide?: boolean;
}) {
  const isUnsplash = src.startsWith('photo-');
  const ratio = wide ? 9 / 16 : 0.75;
  const url = (w: number) => `${UNSPLASH}${src}?auto=format&fit=crop&w=${w}&h=${Math.round(w * ratio)}&q=75`;
  return (
    <figure className={`${flush ? '' : 'my-8'} ${fullWidth ? '-mx-4 sm:-mx-0' : ''}`}>
      <div className="rounded-2xl overflow-hidden bg-[#F7F3F3]">
        {isUnsplash ? (
          <img
            src={url(960)}
            srcSet={`${url(480)} 480w, ${url(960)} 960w, ${url(1440)} 1440w`}
            sizes="(max-width: 768px) 100vw, 720px"
            width={960}
            height={Math.round(960 * ratio)}
            alt={alt}
            className="w-full h-auto object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <img src={src} alt={alt} className="w-full object-cover" loading="lazy" />
        )}
      </div>
      {(caption || isUnsplash) && (
        <figcaption className="mt-2 text-xs text-gray-500 text-center">
          {caption}
          {isUnsplash && <span className="text-gray-400">{caption ? ' · ' : ''}Photo: Unsplash</span>}
        </figcaption>
      )}
    </figure>
  );
}

// ─── ArticleCTAInline ────────────────────────────────────────────────────────

export function ArticleCTAInline({
  children,
  to,
}: {
  children: ReactNode;
  to: string;
}) {
  const isExternal = to.startsWith('http');
  const cls = 'font-semibold underline underline-offset-2';
  return isExternal ? (
    <a href={to} target="_blank" rel="noopener noreferrer" className={cls} style={{ color: PINK }}>
      {children}
    </a>
  ) : (
    <Link to={to} className={cls} style={{ color: PINK }}>
      {children}
    </Link>
  );
}

// ─── ArticleComparison ───────────────────────────────────────────────────────

export function ArticleComparison({
  items,
}: {
  items: Array<{ label: string; pros: string[]; cons: string[] }>;
}) {
  return (
    <div className={`my-8 grid gap-4 ${items.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}>
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-[#F4C2C2]/40 p-5 bg-white"
        >
          <p className="font-bold text-[#1A1A1A] mb-3 text-sm">{item.label}</p>
          {item.pros.length > 0 && (
            <div className="mb-2">
              {item.pros.map((p, i) => (
                <div key={i} className="flex items-start gap-1.5 text-xs text-gray-600 mb-1">
                  <span className="text-green-600 font-bold flex-shrink-0">+</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          )}
          {item.cons.length > 0 && (
            <div>
              {item.cons.map((c, i) => (
                <div key={i} className="flex items-start gap-1.5 text-xs text-gray-500 mb-1">
                  <span className="text-gray-400 flex-shrink-0">−</span>
                  <span>{c}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Example booking page mockup (no ratings, reviews or other social proof) ──

const EXAMPLE_SERVICES = [
  { name: 'Gel manicure', meta: '60 min', price: '$45' },
  { name: 'Builder gel infill', meta: '75 min', price: '$55' },
  { name: 'Nail art add-on', meta: '15 min', price: '$10' },
];

/** Same booking-page mockup as the landing hero, reused in the article CTAs. */
export function HeroMockupImage({ className = '' }: { className?: string }) {
  return (
    <img
      src="/hero-mockup-540.webp"
      srcSet="/hero-mockup-540.webp 540w, /hero-mockup.webp 900w"
      sizes="260px"
      width={900}
      height={962}
      loading="lazy"
      decoding="async"
      alt="A Nelsy beauty creator page with bookings, a coaching session and a downloadable guide"
      className={`w-full max-w-[220px] sm:max-w-[260px] h-auto ${className}`}
    />
  );
}

export function ExampleBookingMockup({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-[168px] shrink-0 ${className}`} aria-hidden>
      <span className="absolute -top-2 -right-2 z-10 rounded-full bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A] shadow">
        Example
      </span>
      <div className="rounded-[26px] border-[5px] border-[#1A1A1A] bg-white overflow-hidden shadow-xl">
        <div className="h-12 bg-gradient-to-br from-[#F52B8C] to-[#FF8EC7]" />
        <div className="-mt-5 flex flex-col items-center px-3">
          <div className="h-10 w-10 rounded-full border-2 border-white bg-[#FDF0F7]" />
          <p className="mt-1 text-[11px] font-bold text-[#1A1A1A]">Your studio</p>
          <p className="text-[8px] text-gray-400">Nail tech · Your city</p>
        </div>
        <div className="mt-2 space-y-1.5 px-2.5">
          {EXAMPLE_SERVICES.map((sv) => (
            <div key={sv.name} className="flex items-center justify-between rounded-lg border border-[#F4C2C2]/60 px-2 py-1.5">
              <div className="min-w-0">
                <p className="truncate text-[9px] font-semibold text-[#1A1A1A]">{sv.name}</p>
                <p className="text-[8px] text-gray-400">{sv.meta}</p>
              </div>
              <p className="text-[9px] font-bold text-[#1A1A1A]">{sv.price}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 px-2.5 text-[8px] text-gray-500">Deposit taken at booking</p>
        <div className="mx-2.5 mb-3 mt-1.5 rounded-full bg-[#F52B8C] py-1.5 text-center text-[9px] font-bold text-white">Book now</div>
      </div>
    </div>
  );
}

// ─── ArticleCTA (end-of-article product block) ───────────────────────────────

export const TRIAL_PATH = '/onboarding?plan=independent_monthly';

export function ArticleCTABlock({
  heading = 'Run your beauty business from one link',
  body = 'Bookings, deposits, payments and your client list on one Nelsy page. Try it free for 14 days, then $29/month or $25/month billed yearly. 0% Nelsy commission.',
  ctaLabel = 'Start your free trial',
  onCtaClick,
}: {
  heading?: string;
  body?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}) {
  return (
    <section
      aria-label="Try Nelsy"
      className="not-prose my-12 overflow-hidden rounded-3xl bg-[#1A1A1A] text-white grid sm:grid-cols-[1fr_280px] items-center"
    >
      <div className="p-7 sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F52B8C] mb-3">Nelsy</p>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight mb-3">{heading}</h2>
        <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-md">{body}</p>
        <Link
          to={TRIAL_PATH}
          onClick={onCtaClick}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition-opacity hover:opacity-90"
          style={{ background: PINK }}
        >
          {ctaLabel} <span aria-hidden>→</span>
        </Link>
      </div>
      <HeroMockupImage className="block self-center mx-auto mb-8 sm:my-6" />
    </section>
  );
}

// ─── ArticleTLDR ─────────────────────────────────────────────────────────────
// Short answer at the top of an article: readers (and AI assistants) get the
// conclusion first, then the detail.

export function ArticleTLDR({ answer, detail, points }: { answer: string; detail?: string; points?: Array<{ label: string; text: string }> }) {
  return (
    <section aria-label="TL;DR" className="not-prose mb-12 rounded-3xl border-2 border-[#1A1A1A] bg-[#FBF7F8] p-6 sm:p-8">
      <span className="inline-block text-xs font-bold text-white bg-[#F52B8C] rounded-full px-3 py-1 mb-4">TL;DR</span>
      <p className="font-bold text-[#1A1A1A] text-2xl sm:text-3xl leading-tight tracking-tight mb-3">{answer}</p>
      {detail && <p className="text-gray-700 leading-relaxed">{detail}</p>}
      {points?.length ? (
        <dl className="mt-5 border-t-2 border-[#1A1A1A] divide-y divide-gray-200">
          {points.map((p) => (
            <div key={p.label} className="py-3">
              <dt className="font-bold text-[#1A1A1A]">{p.label}</dt>
              <dd className="text-sm text-gray-600 leading-relaxed">{p.text}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </section>
  );
}

// ─── SummarizeWithAI ─────────────────────────────────────────────────────────
// "Summarize with" links: open the reader's AI assistant with a prompt that cites
// the article URL (also a signal for AI search visibility).

const AI_TOOLS: { name: string; url: (q: string) => string }[] = [
  { name: 'ChatGPT', url: (q) => `https://chatgpt.com/?q=${q}` },
  { name: 'Perplexity', url: (q) => `https://www.perplexity.ai/search/new?q=${q}` },
  { name: 'Claude', url: (q) => `https://claude.ai/new?q=${q}` },
];

export function SummarizeWithAI({ url, title, onClick }: { url: string; title: string; onClick?: (tool: string) => void }) {
  const q = encodeURIComponent(`Summarize the key takeaways of "${title}" for a beauty professional, from this article by Nelsy: ${url}`);
  return (
    <div className="mt-5">
      <p className="text-xs text-gray-400 mb-2">Summarize with:</p>
      <div className="flex flex-wrap gap-2">
        {AI_TOOLS.map((t) => (
          <a
            key={t.name}
            href={t.url(q)}
            target="_blank"
            rel="noopener nofollow"
            onClick={() => onClick?.(t.name)}
            className="text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-full px-3 py-1.5 hover:border-gray-400 transition"
          >
            {t.name}
          </a>
        ))}
      </div>
    </div>
  );
}
