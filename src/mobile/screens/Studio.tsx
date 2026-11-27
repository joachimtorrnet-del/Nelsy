import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ImageIcon, MoreVertical, Palette, Pencil, Plus, ShoppingBag, SquarePen } from 'lucide-react';
import { useMoney } from '@/lib/currency';
import { STUDIO_TEMPLATES } from '@/lib/templateDemos';
import { useProData } from '../hooks/useProData';
import { Avatar, DemoBanner, ScreenTitle, Sheet, SheetAction } from '../components/ui';
import { PINK, WEB, pageUrl } from '../lib/constants';
import { openExternal } from '../lib/native';
import type { ProService } from '../lib/types';

type Tab = 'services' | 'products' | 'design';

export default function Studio() {
  const { data, setServiceActive } = useProData();
  const money = useMoney();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('services');
  const [menu, setMenu] = useState<ProService | null>(null);

  if (!data) return null;
  const m = data.merchant;
  const template = STUDIO_TEMPLATES.find((t) => t.themeId === m.theme_preset);

  return (
    <div className="pb-28">
      <ScreenTitle>My Studio</ScreenTitle>

      {/* Top tabs */}
      <div className="flex gap-6 border-b border-gray-100 px-4" role="tablist">
        {(
          [
            ['services', 'Services'],
            ['products', 'Products'],
            ['design', 'Edit design'],
          ] as [Tab, string][]
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`relative h-11 text-[15px] font-semibold ${tab === id ? 'text-[#1A1A1A]' : 'text-gray-400'}`}
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

          {/* Services */}
          <div className="mt-5 px-4">
            <h2 className="mb-1 text-[13px] font-bold uppercase tracking-wide text-gray-400">Services ({data.services.length})</h2>
            {data.services.length === 0 && (
              <p className="mt-2 rounded-2xl bg-gray-50 p-5 text-center text-[14px] text-gray-500">Add your first service so clients can book you.</p>
            )}
            <ul className="divide-y divide-gray-100">
              {data.services.map((s) => (
                <li key={s.id} className={`flex min-h-[76px] items-center gap-3 py-2.5 ${s.active ? '' : 'opacity-50'}`}>
                  {s.image_url ? (
                    <img src={s.image_url} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#FFF0F7] text-[#F52B8C]">
                      <ImageIcon size={20} />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-semibold">{s.name}</p>
                    <p className="text-[13px] text-gray-500">
                      {money(s.price)} · {s.duration} min{!s.active && ' · Hidden'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMenu(s)}
                    aria-label={`Options for ${s.name}`}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full active:bg-gray-100"
                  >
                    <MoreVertical size={20} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Floating pill */}
          <button
            type="button"
            onClick={() => openExternal(WEB.newService)}
            className="fixed left-1/2 z-30 flex h-12 -translate-x-1/2 items-center gap-2 rounded-full bg-[#1A1A1A] px-6 text-[15px] font-bold text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] active:scale-[0.98]"
            style={{ bottom: 'calc(60px + env(safe-area-inset-bottom, 0px) + 16px)' }}
          >
            New service <Plus size={18} strokeWidth={2.5} />
          </button>
        </>
      )}

      {tab === 'products' && (
        <div className="mx-4 mt-2 flex flex-col items-center rounded-2xl bg-gray-50 px-6 py-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#F52B8C]">
            <ShoppingBag size={24} />
          </div>
          <p className="mt-3 text-[16px] font-bold">Sell products with the Creator plan</p>
          <p className="mt-1 text-[14px] text-gray-500">Guides, courses and coaching live on the Creator plan. Join the waitlist at hello@getnelsy.com.</p>
        </div>
      )}

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
          <p className="px-2 text-center text-[12.5px] text-gray-400">Templates, colors and fonts can be changed on the website for now.</p>
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
    </div>
  );
}
