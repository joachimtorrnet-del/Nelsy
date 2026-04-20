import { Copy } from 'lucide-react';
import { useState } from 'react';

interface Profile {
  full_name?: string;
  username?: string;
  slug?: string;
}

export default function Header({ profile }: { profile: Profile | null }) {
  const slug = profile?.slug || 'username';
  const [copied, setCopied] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(`https://nelsy.app/${slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-40">
      <div className="px-4 h-14 flex items-center justify-between">
        {/* Left: Logo + App name */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#F52B8C] flex items-center justify-center shadow-sm shadow-[#F52B8C]/30">
            <span className="text-white text-sm font-bold">N</span>
          </div>
          <span className="font-bold text-gray-900 text-lg tracking-tight">Nelsy</span>
        </div>

        {/* Right: URL + copy */}
        <div className="flex items-center gap-2">
          <a
            href={`/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F52B8C] text-sm font-medium"
          >
            nelsy.app/{slug}
          </a>
          <button
            onClick={copyUrl}
            className="w-7 h-7 border border-gray-200 rounded-lg flex items-center justify-center transition-colors active:bg-gray-50"
          >
            {copied
              ? <span className="text-[10px] text-green-600 font-bold">✓</span>
              : <Copy className="w-3.5 h-3.5 text-gray-500" />
            }
          </button>
        </div>
      </div>
    </div>
  );
}
