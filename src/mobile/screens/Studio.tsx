import { useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Download, Eye, EyeOff, FileText, Gift, ImageIcon, MoreVertical, Palette, Pencil, Plus, ShoppingBag, SquarePen, Tag } from 'lucide-react';
import { useMoney } from '@/lib/currency';
import { hasFeature } from '@/lib/plans';
import { formatProductPrice, isFreeResource } from '@/lib/products';
import { kitLinkHost } from '@/lib/kit';
import type { Product } from '@/lib/products';
import type { KitItem } from '@/lib/kit';
import { STUDIO_TEMPLATES } from '@/lib/templateDemos';
import { useProData } from '../hooks/useProData';
import { Avatar, DemoBanner, EmptyState, ScreenTitle, Sheet, SheetAction, VideoBadge } from '../components/ui';
import { PlanGate } from '../components/PlanGate';
import { PINK, WEB, pageUrl } from '../lib/constants';
import { openExternal } from '../lib/native';
import type { ProService } from '../lib/types';

type Tab = 'services' | 'products' | 'kit' | 'design';
const TABS: [Tab, string][] = [
  ['services', 'Services'],
  ['products', 'Products'],
  ['kit', 'Shop my kit'],
  ['design', 'Edit design'],
];

function FloatingPill({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed left-1/2 z-30 flex h-12 -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-[#1A1A1A] px-6 text-[15px] font-bold text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] active:scale-[0.98]"
      style={{ bottom: 'calc(60px + env(safe-area-inset-bottom, 0px) + 16px)' }}
    >
      {label} <Plus size={18} strokeWidth={2.5} />
    </button>
  );
}

function Thumb({ src, icon }: { src?: string | null; icon: ReactNode }) {
  return src ? (
    <img src={src} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
  ) : (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#FFF0F7] text-[#F52B8C]">{icon}</div>
  );
}

function MenuButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full active:bg-gray-100">
      <MoreVertical size={20} />
    </button>
  );
}

export default function Studio() {
  const { data, setServiceActive } = useProData();
  const money = useMoney();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const tab = (TABS.find(([id]) => id === params.get('tab'))?.[0] ?? 'services') as Tab;
  const setTab = (t: Tab) => setParams(t === 'services' ? {} : { tab: t }, { replace: true });
  const [menu, setMenu] = useState<ProService | null>(null);
  const [productMenu, setProductMenu] = useState<Product | null>(null);
  const [kitMenu, setKitMenu] = useState<KitItem | null>(null);

  if (!data) return null;
  const m = data.merchant;
  const template = STUDIO_TEMPLATES.find((t) => t.themeId === m.theme_preset);
  const productsOn = hasFeature(data.plan, 'digital_products');
  const kitOn = hasFeature(data.plan, 'affiliates');
  const paid = data.products.filter((p) => !isFreeResource(p));
  const free = data.products.filter(isFreeResource);

  const productRow = (p: Product) => (
    <li key={p.id} className={`flex min-h-[76px] items-center gap-3 py-2.5 ${p.is_active ? '' : 'opacity-50'}`}>
      <Thumb src={p.cover_url} icon={isFreeResource(p) ? <Gift size={20} /> : <FileText size={20} />} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold">{p.title}</p>
        <p className="text-[13px] text-gray-500">
          {isFreeResource(p) ? 'Free download' : formatProductPrice(p.price_cents, p.currency)}
          {p.file_name && ` · ${p.file_name.split('.').pop()?.toUpperCase()}`}
          {!p.is_active && ' · Hidden'}
        </p>
      </div>
      <MenuButton label={`Options for ${p.title}`} onClick={() => setProductMenu(p)} />
    </li>
  );

  return (
    <div className="pb-28">
      <ScreenTitle>My Studio</ScreenTitle>

      {/* Top tabs (scroll sideways on narrow phones) */}
      <div className="no-scrollbar flex gap-6 overflow-x-auto border-b border-gray-100 px-4" role="tablist">
        {TABS.map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`relative h-11 shrink-0 whitespace-nowrap text-[15px] font-semibold ${tab === id ? 'text-[#1A1A1A]' : 'text-gray-400'}`}
          >
            {label}
            {tab === id && <span className="absolute inset-x-0 -bottom-px h-[3px] rounded-full" style={{ backgroundColor: PINK }} />}
          </button>
        ))}
      </div>

      <div className="pt-4">{data.mode === 'demo' && <DemoBanner />}</div>

      {tab === 'services' && (
        <>
          {/* Profile card */}
          <div className="mx-4 flex items-center gap-3 rounded-2xl border border-gray-100 p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
            <Avatar src={m.logo_url} name={m.salon_name} size={52} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[16px] font-bold">{m.salon_name}</p>
              <p className="truncate text-[13px] text-gray-500">{m.specialty || pageUrl(m.slug)}</p>
              {m.bio && <p className="mt-0.5 line-clamp-1 text-[12.5px] text-gray-400">{m.bio}</p>}
            </div>
            <button
              type="button"
              onClick={() => openExternal(WEB.settings)}
              aria-label="Edit profile"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100"
            >
              <Pencil size={17} />
            </button>
          </div>

          <div className="mt-5 px-4">
            <h2 className="mb-1 text-[13px] font-bold uppercase tracking-wide text-gray-400">Services ({data.services.length})</h2>
            {data.services.length === 0 && (
              <p className="mt-2 rounded-2xl bg-gray-50 p-5 text-center text-[14px] text-gray-500">Add your first service so clients can book you.</p>
            )}
            <ul className="divide-y divide-gray-100">
              {data.services.map((s) => (
                <li key={s.id} className={`flex min-h-[76px] items-center gap-3 py-2.5 ${s.active ? '' : 'opacity-50'}`}>
                  <Thumb src={s.image_url} icon={<ImageIcon size={20} />} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-semibold">{s.name}</p>
                    <p className="text-[13px] text-gray-500">
                      {money(s.price)} · {s.duration} min{!s.active && ' · Hidden'}
                    </p>
                    {s.online && (
                      <span className="mt-1 block">
                        <VideoBadge />
                      </span>
                    )}
                  </div>
                  <MenuButton label={`Options for ${s.name}`} onClick={() => setMenu(s)} />
                </li>
              ))}
            </ul>
          </div>
          <FloatingPill label="New service" onClick={() => openExternal(WEB.newService)} />
        </>
      )}

      {tab === 'products' &&
        (!productsOn ? (
          <PlanGate
            icon={<ShoppingBag size={22} />}
            feature="Products"
            what="Sell guides and templates, and give away free resources in exchange for an email, right from your page."
          />
        ) : data.products.length === 0 ? (
          <>
            <EmptyState icon={<ShoppingBag size={24} />} title="No products yet" sub="Add a guide, a template or a free resource on getnelsy.com." />
            <FloatingPill label="New product" onClick={() => openExternal(WEB.products)} />
          </>
        ) : (
          <>
            {paid.length > 0 && (
              <div className="px-4">
                <h2 className="mb-1 text-[13px] font-bold uppercase tracking-wide text-gray-400">Digital products ({paid.length})</h2>
                <ul className="divide-y divide-gray-100">{paid.map(productRow)}</ul>
              </div>
            )}
            {free.length > 0 && (
              <div className="mt-4 px-4">
                <h2 className="mb-1 text-[13px] font-bold uppercase tracking-wide text-gray-400">Free resources ({free.length})</h2>
                <ul className="divide-y divide-gray-100">{free.map(productRow)}</ul>
              </div>
            )}
            <FloatingPill label="New product" onClick={() => openExternal(WEB.products)} />
          </>
        ))}

      {tab === 'kit' &&
        (!kitOn ? (
          <PlanGate
            icon={<Tag size={22} />}
            feature="Shop my kit"
            what="Show the products you use on your page, with your own affiliate links and promo codes."
          />
        ) : data.kit.length === 0 ? (
          <>
            <EmptyState icon={<Tag size={24} />} title="Your kit is empty" sub="Add the products you use with your affiliate links on getnelsy.com." />
            <FloatingPill label="Add item" onClick={() => openExternal(WEB.kit)} />
          </>
        ) : (
          <>
            <div className="px-4">
              <h2 className="mb-1 text-[13px] font-bold uppercase tracking-wide text-gray-400">Kit items ({data.kit.length})</h2>
              <ul className="divide-y divide-gray-100">
                {data.kit.map((k) => (
                  <li key={k.id} className={`flex min-h-[76px] items-center gap-3 py-2.5 ${k.is_active ? '' : 'opacity-50'}`}>
                    <Thumb src={k.image_url} icon={<Tag size={20} />} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] font-semibold">{k.title}</p>
                      <p className="truncate text-[13px] text-gray-500">
                        {[k.brand, k.category].filter(Boolean).join(' · ') || kitLinkHost(k.url)}
                      </p>
                      {k.promo_code && (
                        <span className="mt-1 inline-flex rounded-full bg-[#FFF0F7] px-2 py-[3px] text-[11px] font-bold leading-none text-[#B0125E]">
                          Code {k.promo_code}
                        </span>
                      )}
                    </div>
                    <MenuButton label={`Options for ${k.title}`} onClick={() => setKitMenu(k)} />
                  </li>
                ))}
              </ul>
            </div>
            <FloatingPill label="Add item" onClick={() => openExternal(WEB.kit)} />
          </>
        ))}

      {tab === 'design' && (
        <div className="mx-4 mt-2 space-y-3">
          <div className="flex items-center gap-3 rounded-2xl border border-gray-100 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: m.color_accent ?? PINK }}>
              <Palette size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-[13px] text-gray-500">Current template</p>
              <p className="text-[16px] font-bold">{template?.name ?? 'Custom'}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/preview')}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-[#1A1A1A] text-[15px] font-bold"
          >
            <Eye size={18} /> Preview my page
          </button>
          <button
            type="button"
            onClick={() => openExternal(WEB.design)}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full text-[15px] font-bold text-white"
            style={{ backgroundColor: PINK }}
          >
            <SquarePen size={18} /> Edit design on getnelsy.com
          </button>
          <p className="px-2 text-center text-[12.5px] text-gray-400">Templates, colors and fonts are edited on the website.</p>
        </div>
      )}

      <Sheet open={!!menu} onClose={() => setMenu(null)} title={menu?.name}>
        {menu && (
          <>
            <SheetAction
              icon={<SquarePen size={19} />}
              label="Edit service"
              onClick={() => {
                openExternal(WEB.editService(menu.id));
                setMenu(null);
              }}
            />
            <SheetAction
              icon={menu.active ? <EyeOff size={19} /> : <Eye size={19} />}
              label={menu.active ? 'Hide from my page' : 'Show on my page'}
              onClick={() => {
                void setServiceActive(menu.id, !menu.active);
                setMenu(null);
              }}
            />
            <SheetAction
              icon={<Eye size={19} />}
              label="Preview my page"
              onClick={() => {
                setMenu(null);
                navigate('/preview');
              }}
            />
          </>
        )}
      </Sheet>

      <Sheet open={!!productMenu} onClose={() => setProductMenu(null)} title={productMenu?.title}>
        {productMenu && (
          <>
            <SheetAction
              icon={<SquarePen size={19} />}
              label={isFreeResource(productMenu) ? 'Edit free resource' : 'Edit product'}
              onClick={() => {
                openExternal(WEB.products);
                setProductMenu(null);
              }}
            />
            <SheetAction
              icon={<Download size={19} />}
              label={isFreeResource(productMenu) ? 'See who downloaded it' : 'See orders'}
              onClick={() => {
                setProductMenu(null);
                if (isFreeResource(productMenu)) navigate('/audience', { state: { from: '/studio?tab=products', fromLabel: 'Studio' } });
                else openExternal(WEB.products);
              }}
            />
            <SheetAction
              icon={<Eye size={19} />}
              label="Preview my page"
              onClick={() => {
                setProductMenu(null);
                navigate('/preview');
              }}
            />
          </>
        )}
      </Sheet>

      <Sheet open={!!kitMenu} onClose={() => setKitMenu(null)} title={kitMenu?.title}>
        {kitMenu && (
          <>
            <SheetAction
              icon={<SquarePen size={19} />}
              label="Edit item"
              onClick={() => {
                openExternal(WEB.kit);
                setKitMenu(null);
              }}
            />
            <SheetAction
              icon={<Eye size={19} />}
              label={`Open ${kitLinkHost(kitMenu.url)}`}
              onClick={() => {
                openExternal(kitMenu.url);
                setKitMenu(null);
              }}
            />
          </>
        )}
      </Sheet>
    </div>
  );
}
