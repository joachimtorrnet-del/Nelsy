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

  const href = `https://getnelsy.com/signup?utm_source=studio_plg&ref=${encodeURIComponent(profileId)}`;

  return (
    <div style={{ textAlign: 'center', padding: '28px 0 40px' }}>
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
          opacity: 0.75,
          transition: 'opacity 0.15s',
          letterSpacing: '0.01em',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.75'; }}
      >
        Créez votre Nelsy →
      </a>
    </div>
  );
}
