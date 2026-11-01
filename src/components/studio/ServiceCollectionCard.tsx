/**
 * ServiceCollectionCard — shared renderer used by all templates and the editor preview.
 * Template-specific styling is passed via NelsyTheme; no hardcoded dashboard pink.
 */
import { useState, useMemo, useId } from 'react';
import { ChevronRight, ChevronDown, Search, Clock, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import type { ServiceCollection } from '@/types';
import type { NelsyTheme } from '@/lib/themes';

interface Props {
  collection: ServiceCollection;
  theme: NelsyTheme;
  isPreview?: boolean;
  onBook?: (serviceId: string) => void;
  defaultOpen?: boolean;
}

const VISIBLE_INITIAL = 8;

export function ServiceCollectionCard({ collection, theme, isPreview = false, onBook, defaultOpen = false }: Props) {
  const uid = useId();
  const [open, setOpen] = useState(defaultOpen);
  const [activeSub, setActiveSub] = useState<string | null>(null); // null = "All"
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [expandedDesc, setExpandedDesc] = useState<Set<string>>(new Set());

  const accent = theme.defaultAccent;
  const cardBg = theme.cardBg;
  const cardBorder = theme.cardBorder;
  const textPrimary = theme.textPrimary;
  const textSecondary = theme.textSecondary;
  const accentText = theme.accentText;

  // Published count: members whose service is active
  const publishedMembers = useMemo(
    () => collection.members.filter((m) => m.service.active !== false),
    [collection.members]
  );

  // Filtered members for display
  const filteredMembers = useMemo(() => {
    let list = publishedMembers;
    if (activeSub !== null) list = list.filter((m) => m.subcategory_id === activeSub);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((m) => m.service.name.toLowerCase().includes(q) || m.service.description?.toLowerCase().includes(q));
    }
    return list;
  }, [publishedMembers, activeSub, query]);

  const visibleMembers = showAll ? filteredMembers : filteredMembers.slice(0, VISIBLE_INITIAL);
  const hasMore = filteredMembers.length > VISIBLE_INITIAL && !showAll;

  function toggleDesc(id: string) {
    setExpandedDesc((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  // ── Collapsed card ──
  const collectionCard = (
    <button
      aria-label={`${open ? 'Collapse' : 'View'} ${collection.title} services`}
      aria-expanded={open}
      aria-controls={`${uid}-list`}
      onClick={() => setOpen(!open)}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 14,
        padding: '14px 16px', borderRadius: open ? '16px 16px 0 0' : 16,
        background: cardBg, border: `1px solid ${cardBorder}`,
        borderBottom: open ? 'none' : `1px solid ${cardBorder}`,
        cursor: 'pointer', textAlign: 'left',
        transition: 'border-radius 0.15s ease',
      }}
    >
      {/* Image */}
      {collection.image_url ? (
        <img
          src={collection.image_url} alt=""
          style={{ width: 56, height: 56, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }}
        />
      ) : (
        <div style={{
          width: 56, height: 56, borderRadius: 10, flexShrink: 0,
          background: `linear-gradient(135deg, ${accent}22, ${accent}44)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
        }}>
          💅
        </div>
      )}

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: textPrimary, margin: 0, lineHeight: 1.25 }}>
          {collection.title}
        </p>
        {collection.description && (
          <p style={{ fontSize: 13, color: textSecondary, margin: '2px 0 0', lineHeight: 1.4,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {collection.description}
          </p>
        )}
        <p style={{ fontSize: 12, color: textSecondary, margin: '3px 0 0' }}>
          {publishedMembers.length} service{publishedMembers.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Chevron */}
      <div style={{ flexShrink: 0, color: textSecondary, transition: 'transform 0.15s ease', transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}>
        <ChevronRight size={20} />
      </div>
    </button>
  );

  if (!open) return <div style={{ marginBottom: 10 }}>{collectionCard}</div>;

  // ── Expanded panel ──
  return (
    <div style={{ marginBottom: 10 }}>
      {collectionCard}

      <div
        id={`${uid}-list`}
        style={{
          background: cardBg, border: `1px solid ${cardBorder}`,
          borderTop: 'none', borderRadius: '0 0 16px 16px',
          overflow: 'hidden',
        }}
      >
        {/* Subcategory chips + search */}
        {(collection.subcategories.length > 0 || publishedMembers.length > 4) && (
          <div style={{ padding: '12px 14px 0' }}>
            {collection.subcategories.length > 0 && (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                <button
                  onClick={() => setActiveSub(null)}
                  style={{
                    padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer',
                    background: activeSub === null ? accent : `${accent}18`,
                    color: activeSub === null ? accentText : accent,
                    transition: 'background 0.12s, color 0.12s',
                  }}
                >
                  All
                </button>
                {collection.subcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveSub(activeSub === sub.id ? null : sub.id)}
                    style={{
                      padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer',
                      background: activeSub === sub.id ? accent : `${accent}18`,
                      color: activeSub === sub.id ? accentText : accent,
                      transition: 'background 0.12s, color 0.12s',
                    }}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            )}

            {publishedMembers.length > 4 && (
              <div style={{ position: 'relative', marginBottom: 10 }}>
                <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: textSecondary }} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setShowAll(true); }}
                  placeholder="Search services…"
                  style={{
                    width: '100%', paddingLeft: 30, paddingRight: 10, paddingTop: 8, paddingBottom: 8,
                    borderRadius: 10, border: `1px solid ${cardBorder}`, fontSize: 13,
                    background: 'transparent', color: textPrimary, outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* Service rows */}
        {visibleMembers.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '20px 16px', fontSize: 13, color: textSecondary }}>
            {query ? 'No services match your search.' : 'No services available.'}
          </p>
        ) : (
          <div>
            {visibleMembers.map((member, idx) => {
              const svc = member.service;
              const hasDesc = !!svc.description?.trim();
              const descOpen = expandedDesc.has(svc.id);
              return (
                <div
                  key={svc.id}
                  style={{
                    borderTop: idx === 0 && !collection.subcategories.length && publishedMembers.length <= 4 ? 'none' : `1px solid ${cardBorder}`,
                    padding: '12px 14px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: textPrimary }}>{svc.name}</span>
                        {hasDesc && (
                          <button
                            onClick={() => toggleDesc(svc.id)}
                            aria-expanded={descOpen}
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: 2,
                              fontSize: 11, color: accent, background: 'none', border: 'none',
                              cursor: 'pointer', padding: '1px 4px', borderRadius: 4,
                              fontWeight: 600,
                            }}
                          >
                            Details <ChevronDown size={10} style={{ transform: descOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.12s' }} />
                          </button>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: 10, marginTop: 3, flexWrap: 'wrap' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 12, color: textSecondary }}>
                          <Clock size={11} /> {svc.duration} min
                        </span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: textPrimary }}>
                          {formatCurrency(svc.price)}
                        </span>
                        {svc.deposit > 0 && (
                          <span style={{ fontSize: 11, color: textSecondary }}>
                            Deposit {formatCurrency(svc.deposit)}
                          </span>
                        )}
                      </div>
                      {hasDesc && descOpen && (
                        <p style={{ fontSize: 13, color: textSecondary, margin: '6px 0 0', lineHeight: 1.5 }}>
                          {svc.description}
                        </p>
                      )}
                    </div>

                    {/* Book CTA */}
                    <button
                      onClick={isPreview ? undefined : () => onBook?.(svc.id)}
                      disabled={isPreview}
                      aria-label={`Book ${svc.name}`}
                      style={{
                        flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: 5,
                        padding: '8px 14px', borderRadius: 10,
                        background: accent, color: accentText,
                        border: 'none', fontSize: 13, fontWeight: 600,
                        cursor: isPreview ? 'default' : 'pointer', transition: 'opacity 0.1s',
                      }}
                    >
                      Book <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Show more */}
        {hasMore && (
          <div style={{ padding: '10px 14px 12px', textAlign: 'center' }}>
            <button
              onClick={() => setShowAll(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: accent }}
            >
              Show {filteredMembers.length - VISIBLE_INITIAL} more service{filteredMembers.length - VISIBLE_INITIAL !== 1 ? 's' : ''}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
