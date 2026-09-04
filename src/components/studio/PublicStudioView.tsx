import { Link } from 'react-router-dom';
import { StudioHero } from './StudioHero';
import { StudioServiceList } from './StudioServiceList';
import type { Merchant } from '@/types';
import { getTheme } from '@/lib/themes';

// ── Types ─────────────────────────────────────────────────────────────────────

export type StudioMode = 'live' | 'preview';

// ── PLG viral footer ──────────────────────────────────────────────────────────

function PlgFooter({ accent, slug, mode }: { accent: string; slug: string; mode: StudioMode }) {
  const href = `https://getnelsy.com/signup?utm_source=studio_footer&ref=${encodeURIComponent(slug)}`;

  const card = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: '12px 16px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 24, height: 24, borderRadius: 8,
            backgroundColor: accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 10, lineHeight: 1 }}>N</span>
        </div>
        <span style={{ fontWeight: 700, color: '#111827', fontSize: 14 }}>Nelsy</span>
      </div>
      <span
        style={{
          backgroundColor: accent, color: '#FFFFFF',
          borderRadius: 99, padding: '8px 16px',
          fontSize: 13, fontWeight: 700, lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        Try 14 Days Free →
      </span>
    </div>
  );

  if (mode === 'preview') {
    return <div style={{ padding: '8px 16px 16px' }}>{card}</div>;
  }

  // Live mode: exact spec positioning
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        maxWidth: 440,
        zIndex: 30,
        pointerEvents: 'auto',
      }}
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        {card}
      </a>
    </div>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function PreviewSkeleton({ bgColor }: { bgColor: string }) {
  return (
    <div style={{ backgroundColor: bgColor, padding: '40px 20px 20px', minHeight: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: 'rgba(128,128,128,0.15)', marginBottom: 12 }} />
        <div style={{ width: 120, height: 12, borderRadius: 8, backgroundColor: 'rgba(128,128,128,0.12)', marginBottom: 8 }} />
        <div style={{ width: 180, height: 20, borderRadius: 8, backgroundColor: 'rgba(128,128,128,0.12)', marginBottom: 6 }} />
        <div style={{ width: 160, height: 12, borderRadius: 8, backgroundColor: 'rgba(128,128,128,0.10)' }} />
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ height: 72, borderRadius: 16, backgroundColor: 'rgba(128,128,128,0.10)', marginBottom: 12 }} />
      ))}
    </div>
  );
}

// ── Main exported component ───────────────────────────────────────────────────

interface Props {
  merchant: Merchant;
  mode?: StudioMode;
}

export function PublicStudioView({ merchant, mode = 'live' }: Props) {
  const theme = getTheme(merchant.theme_preset, merchant.color_accent);

  return (
    <div
      className={theme.fontClass}
      style={{
        backgroundColor: theme.pageBg,
        minHeight: mode === 'live' ? '100dvh' : '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <StudioHero merchant={merchant} theme={theme} isPreview={mode === 'preview'} />

      <div style={{ padding: '0 16px', flex: 1 }}>
        <StudioServiceList
          services={merchant.services}
          theme={theme}
          isPreview={mode === 'preview'}
        />
      </div>

      {/* Spacer so fixed footer doesn't overlap last card in live mode */}
      {mode === 'live' && <div style={{ height: 96 }} />}

      <PlgFooter accent={theme.defaultAccent} slug={merchant.slug} mode={mode} />

      {/* Nelsy attribution in preview (non-live) mode */}
      {mode === 'preview' && (
        <div style={{ textAlign: 'center', padding: '8px 0 20px' }}>
          <Link
            to="/"
            style={{ fontSize: 11, color: theme.textSecondary, textDecoration: 'none' }}
          >
            Powered by <strong style={{ color: theme.defaultAccent }}>Nelsy</strong>
          </Link>
        </div>
      )}
    </div>
  );
}

// Re-export skeleton for Studio.tsx usage
export { PreviewSkeleton };
