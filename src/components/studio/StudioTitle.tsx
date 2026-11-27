// The studio name is the page's <h1> on a real studio page. When a studio is shown as a small
// preview inside another page (marketing landings), that page already has its own <h1>:
// wrap the preview in <StudioTitleTag value="p"> so the studio name renders as a <p>.
import { createContext, useContext } from 'react';
import type { CSSProperties, ReactNode } from 'react';

type TitleTag = 'h1' | 'h2' | 'p';

export const StudioTitleTag = createContext<TitleTag>('h1');

export function StudioTitle({ style, className, children }: { style?: CSSProperties; className?: string; children?: ReactNode }) {
  const Tag = useContext(StudioTitleTag);
  return <Tag style={style} className={className}>{children}</Tag>;
}
