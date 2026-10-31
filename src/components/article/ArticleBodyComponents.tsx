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
          — {attribution}
        </footer>
      )}
    </blockquote>
  );
}

// ─── ArticleTable ────────────────────────────────────────────────────────────

export function ArticleTable({
  headers,
  rows,
  caption,
}: {
  headers: string[];
  rows: (string | ReactNode)[][];
  caption?: string;
}) {
  return (
    <div className="my-8 overflow-x-auto rounded-2xl border border-[#F4C2C2]/40">
      <table className="w-full text-sm border-collapse">
        {caption && (
          <caption className="text-xs text-gray-500 pb-2 text-left px-4 pt-3">
            {caption}
          </caption>
        )}
        <thead>
          <tr style={{ background: '#FDF0F7' }}>
            {headers.map((h) => (
              <th
                key={h}
                className="text-left px-4 py-3 font-semibold text-[#1A1A1A] text-xs uppercase tracking-wide border-b border-[#F4C2C2]/40"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#FFFBFB]'}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-gray-700 border-b border-[#F4C2C2]/20 last:border-b-0">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
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

export function ArticleImage({
  src,
  alt,
  caption,
  fullWidth = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  fullWidth?: boolean;
}) {
  return (
    <figure className={`my-8 ${fullWidth ? '-mx-4 sm:-mx-0' : ''}`}>
      <div className="rounded-2xl overflow-hidden bg-[#F7F3F3]">
        <img src={src} alt={alt} className="w-full object-cover" loading="lazy" />
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-gray-500 text-center">
          {caption}
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

// ─── ArticleCTA (end-of-article product block) ───────────────────────────────

export function ArticleCTABlock({
  heading = 'Ready to run your nail business more professionally?',
  body = 'Manage bookings, deposits and payments from one customisable Nelsy booking page.',
  ctaLabel = 'Start free →',
  onCtaClick,
}: {
  heading?: string;
  body?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}) {
  return (
    <div
      className="my-12 rounded-3xl px-8 py-10 flex flex-col sm:flex-row items-center gap-6"
      style={{ background: 'linear-gradient(135deg, #FDF0F7 0%, #FFF5FB 100%)', border: `1.5px solid #F4C2C2` }}
    >
      <img
        src="/hero-mockup.png"
        alt="Nelsy booking page"
        className="w-28 sm:w-36 rounded-xl object-cover flex-shrink-0 shadow-md"
      />
      <div className="flex-1 text-center sm:text-left">
        <h2 className="font-serif text-xl font-bold text-[#1A1A1A] mb-2">{heading}</h2>
        <p className="text-gray-600 text-sm mb-4">{body}</p>
        <Link
          to="/onboarding"
          onClick={onCtaClick}
          className="inline-block px-5 py-2.5 rounded-full text-sm font-bold text-white transition-opacity hover:opacity-90"
          style={{ background: PINK }}
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}
