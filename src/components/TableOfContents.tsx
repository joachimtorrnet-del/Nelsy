interface TOCItem {
  id: string;
  label: string;
}

interface Props {
  items: TOCItem[];
}

export default function TableOfContents({ items }: Props) {
  return (
    <nav
      aria-label="Table of contents"
      className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6 my-8"
    >
      <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">
        Contents
      </p>
      <ol className="space-y-2">
        {items.map((item, i) => (
          <li key={item.id} className="flex items-start gap-2.5">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-500 flex items-center justify-center mt-0.5">
              {i + 1}
            </span>
            <a
              href={`#${item.id}`}
              className="text-sm text-gray-600 hover:text-gray-900 leading-snug transition"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
