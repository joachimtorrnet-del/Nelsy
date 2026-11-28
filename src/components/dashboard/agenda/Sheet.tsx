import { useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import { X } from 'lucide-react';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Small line above the title (a date, a status). */
  eyebrow?: ReactNode;
  children: ReactNode;
  /** Sticky action bar at the bottom of the sheet. */
  footer?: ReactNode;
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Bottom sheet on a phone, side panel on desktop. Rendered in a portal so the animated
 * dashboard page (a transformed ancestor) cannot trap its fixed positioning.
 * Escape and the backdrop close it, focus stays inside while it is open and goes back to
 * the element that opened it afterwards.
 */
export default function Sheet({ open, onClose, title, eyebrow, children, footer }: SheetProps) {
  const desktop = useMediaQuery('(min-width: 1024px)');
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const panelRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const titleId = useId();
  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const frame = requestAnimationFrame(() => panelRef.current?.focus({ preventScroll: true }));

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const items = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === panelRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', onKey);
      previous?.focus?.({ preventScroll: true });
    };
  }, [open]);

  if (typeof document === 'undefined') return null;

  const hidden = desktop ? { x: '100%' } : { y: '100%' };
  const shown = desktop ? { x: 0 } : { y: 0 };
  const transition = reduceMotion ? { duration: 0 } : { type: 'spring' as const, damping: 34, stiffness: 360, mass: 0.9 };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center lg:items-stretch lg:justify-end">
          <motion.div
            className="absolute inset-0 bg-[#1A1A1A]/40"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            initial={hidden} animate={shown} exit={hidden} transition={transition}
            drag={desktop ? false : 'y'}
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => { if (info.offset.y > 110 || info.velocity.y > 700) onClose(); }}
            className="relative flex w-full flex-col bg-white shadow-2xl outline-none max-h-[92dvh] rounded-t-[28px] lg:h-full lg:max-h-none lg:w-[440px] lg:rounded-none lg:rounded-l-[28px]"
          >
            {/* Handle + title: the grab area that drags the sheet down on a phone */}
            <div
              className="flex-shrink-0 touch-none px-5 pt-2.5 pb-3 lg:px-6 lg:pt-6"
              onPointerDown={(e) => { if (!desktop) dragControls.start(e); }}
            >
              <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-gray-200 lg:hidden" aria-hidden="true" />
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  {eyebrow && <div className="mb-1 text-[13px] font-medium text-gray-500">{eyebrow}</div>}
                  <h2 id={titleId} className="text-[22px] font-bold leading-tight tracking-tight text-[#1A1A1A] break-words">{title}</h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  onPointerDown={(e) => e.stopPropagation()}
                  aria-label="Close"
                  className="-mr-1.5 -mt-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6 lg:px-6">
              {children}
            </div>

            {footer && (
              <div
                className="flex-shrink-0 border-t border-gray-100 bg-white px-5 pt-3 lg:px-6"
                style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)' }}
              >
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
