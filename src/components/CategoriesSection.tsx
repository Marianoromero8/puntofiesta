import Link from "next/link";
import type { PFCategory } from "@/lib/types";

interface Props {
  categories: PFCategory[];
}

export default function CategoriesSection({ categories }: Props) {
  const shown = categories.filter((c) => c.active && c.featuredOnHome).slice(0, 6);
  if (shown.length === 0) return null;

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-xl font-black text-black uppercase tracking-wide">Categorías</h2>
        <div className="flex-1 h-px bg-black/20" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {shown.map((category) => (
          <Link
            key={category.id}
            href={`/${category.slug}`}
            className="group block rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-square bg-black/5 flex items-center justify-center overflow-hidden">
              {category.imageUrl ? (
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#FFC800]/10 px-2">
                  <span className="text-black/70 font-black text-sm text-center uppercase tracking-wide leading-tight">
                    {category.name}
                  </span>
                </div>
              )}
            </div>
            <div className="p-2 text-center">
              <span className="text-xs font-bold text-black uppercase tracking-wide">
                {category.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
