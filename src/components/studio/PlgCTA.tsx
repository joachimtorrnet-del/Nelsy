import { useEffect, useRef } from 'react';
import type { NelsyTheme } from '@/lib/themes';
import { trackPlgCtaView, trackPlgCtaClick } from '@/lib/analytics';

interface Props {
  profileId: string;
  theme: NelsyTheme;
}

export function PlgCTA({ profileId, theme }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const viewTracked = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !viewTracked.current) {
        viewTracked.current = true;
        trackPlgCtaView(profileId);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [profileId]);

  const href = `https://getnelsy.com/onboarding?utm_source=studio_plg&ref=${encodeURIComponent(profileId)}`;

  return (
    <div style={{ textAlign: 'center', padding: '20px 0 32px' }}>
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackPlgCtaClick(profileId)}
        style={{
          fontSize: 12,
          color: theme.textSecondary,
          textDecoration: 'none',
          opacity: 0.65,
          transition: 'opacity 0.15s',
          letterSpacing: '0.01em',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.65'; }}
      >
        Made with Nelsy · Create yours →
      </a>
    </div>
  );
}

/**
 * "Powered by Nelsy" footer for studio templates. On live pages it's a tracked link to signup
 * (every studio page is an acquisition channel); in dashboard previews it stays plain text.
 */
export function PoweredByNelsy({ profileId, isPreview, color, brandColor, fontSize = 11 }: {
  profileId: string;
  isPreview?: boolean;
  color: string;
  brandColor: string;
  fontSize?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const viewTracked = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || isPreview) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !viewTracked.current) {
        viewTracked.current = true;
        trackPlgCtaView(profileId);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [profileId, isPreview]);

  const label = <>Powered by <strong style={{ color: brandColor }}>Nelsy</strong></>;
  if (isPreview) return <span style={{ fontSize, color }}>{label}</span>;

  return (
    <a
      ref={ref}
      href={`https://getnelsy.com/?utm_source=studio_plg&utm_medium=powered_by&ref=${encodeURIComponent(profileId)}`}
      target="_blank"
      rel="noopener"
      onClick={() => trackPlgCtaClick(profileId)}
      style={{ fontSize, color, textDecoration: 'none' }}
    >
      {label}
    </a>
  );
}
