import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, CornerDownLeft } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface PaletteItem {
  id: string;
  label: string;
  hint?: string;
  icon: LucideIcon;
  group: 'Pages' | 'Actions';
  keywords?: string;
  run: () => void;
}

/** ⌘K / Ctrl+K quick search over dashboard pages and actions. */
export function CommandPalette({ open, onClose, items }: { open: boolean; onClose: () => void; items: PaletteItem[] }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setActive(0);
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => clearTimeout(t);
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.hint ?? ''} ${i.keywords ?? ''}`.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => { setActive(0); }, [query]);

  const runAt = (idx: number) => {
    const item = results[idx];
    if (!item) return;
    onClose();
    item.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); runAt(active); }
    else if (e.key === 'Escape') { e.preventDefault(); onClose(); }
  };

  const groups = (['Pages', 'Actions'] as const)
    .map((g) => ({ g, list: results.map((r, idx) => ({ r, idx })).filter(({ r }) => r.group === g) }))
    .filter(({ list }) => list.length > 0);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
          role="dialog" aria-modal="true" aria-label="Search"
        >
          <div className="absolute inset-0 bg-[#1A1A1A]/30 backdrop-blur-[2px]" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: -8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            <div className="flex items-center gap-3 px-4 border-b border-gray-100">
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search pages and actions"
                className="flex-1 py-4 text-[15px] outline-none bg-transparent placeholder:text-gray-400"
                aria-label="Search"
              />
              <kbd className="text-[10px] font-semibold text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">ESC</kbd>
            </div>
            <div className="max-h-[50vh] overflow-y-auto py-2">
              {results.length === 0 && <p className="px-4 py-8 text-center text-sm text-gray-400">No results for "{query}"</p>}
              {groups.map(({ g, list }) => (
                <div key={g} className="px-2 pb-1">
                  <p className="px-2 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400">{g}</p>
                  {list.map(({ r, idx }) => (
                    <button
                      key={r.id}
                      onMouseEnter={() => setActive(idx)}
                      onClick={() => runAt(idx)}
                      className={`w-full flex items-center gap-3 px-2 py-2.5 rounded-xl text-left transition-colors ${active === idx ? 'bg-[#fdeef6]' : ''}`}
                    >
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${active === idx ? 'bg-white text-[#F52B8C]' : 'bg-gray-50 text-gray-500'}`}>
                        <r.icon className="w-4 h-4" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-medium text-[#1A1A1A] truncate">{r.label}</span>
                        {r.hint && <span className="block text-xs text-gray-400 truncate">{r.hint}</span>}
                      </span>
                      {active === idx && <CornerDownLeft className="w-3.5 h-3.5 text-gray-400" />}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
