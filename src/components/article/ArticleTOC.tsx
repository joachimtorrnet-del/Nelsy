import { useEffect, useRef, useState } from 'react';
import type { TocSection } from '@/lib/articles';

const PINK = '#F52B8C';

interface Props {
  sections: TocSection[];
}

export default function ArticleTOC({ sections }: Props) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!sections.length) return;

    const headingEls = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Pick the first entry that is intersecting (topmost visible heading)
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    );

    headingEls.forEach((el) => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, [sections]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileOpen(false);
    }
  }

  const tocLinks = (
    <nav aria-label="Table of contents">
      <ul className="space-y-1">
        {sections.map((s) => {
          const isActive = activeId === s.id;
          return (
            <li key={s.id}>
              <button
                onClick={() => scrollTo(s.id)}
                className="w-full text-left text-sm leading-snug py-1.5 px-3 rounded-lg transition-colors"
                style={
                  isActive
                    ? { color: PINK, fontWeight: 600, background: '#FDF0F7' }
                    : { color: '#555', fontWeight: 400 }
                }
              >
                {s.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      {/* ── Desktop: sticky sidebar ── */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 space-y-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 px-3">
              Contents
            </p>
            {tocLinks}
          </div>

          {/* Share */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 px-3">
              Share
            </p>
            <ShareButtons />
          </div>
        </div>
      </aside>

      {/* ── Mobile: collapsible ── */}
      <div className="lg:hidden mb-8 rounded-2xl border border-[#F4C2C2]/40 overflow-hidden">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-[#1A1A1A] bg-white"
        >
          <span>In this article</span>
          <span
            className="transition-transform"
            style={{ transform: mobileOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            ▾
          </span>
        </button>
        {mobileOpen && (
          <div className="bg-[#FFFBFB] px-4 pb-4 pt-2">
            {tocLinks}
          </div>
        )}
      </div>
    </>
  );
}

function ShareButtons() {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const encodedUrl = encodeURIComponent(url);

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const shares = [
    {
      label: copied ? 'Copied!' : 'Copy link',
      icon: '🔗',
      onClick: copyLink,
      href: undefined,
    },
    {
      label: 'X / Twitter',
      icon: '𝕏',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}`,
    },
    {
      label: 'WhatsApp',
      icon: '💬',
      href: `https://wa.me/?text=${encodedUrl}`,
    },
    {
      label: 'LinkedIn',
      icon: 'in',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  return (
    <div className="flex flex-col gap-1.5 px-1">
      {shares.map((s) =>
        s.href ? (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-[#1A1A1A] py-1 transition-colors"
          >
            <span className="w-5 text-center font-bold">{s.icon}</span>
            {s.label}
          </a>
        ) : (
          <button
            key={s.label}
            onClick={s.onClick}
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-[#1A1A1A] py-1 transition-colors text-left"
          >
            <span className="w-5 text-center font-bold">{s.icon}</span>
            {s.label}
          </button>
        ),
      )}
    </div>
  );
}
