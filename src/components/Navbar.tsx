'use client';
import { ShoppingCart, Search, Tag } from 'lucide-react';
import { useCart } from '@/store/cart';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCategories } from '@/lib/api';
import type { PFCategory } from '@/lib/types';

export default function Navbar() {
  const openCart = useCart((s) => s.openCart);
  const totalItems = useCart((s) => s.totalItems);
  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState<PFCategory[]>([]);
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    useCart.persist.rehydrate();
    setMounted(true);
  }, []);

  useEffect(() => {
    getCategories()
      .then((cats) => setCategories(cats.filter((c) => c.active)))
      .catch(() => setCategories([]));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q) router.push(`/buscar?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-black shadow-md">
      <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <span className="flex items-center gap-2">
            <span className="text-[#FFC800] font-black text-xl tracking-tight">PUNTO</span>
            <span className="text-white font-black text-xl tracking-tight">FIESTA</span>
          </span>
          <span className="hidden lg:inline text-white/50 text-xs font-medium border-l border-white/20 pl-3">
            Combos y productos para tu evento
          </span>
        </Link>

        <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-xs relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full bg-white/10 text-white placeholder-white/50 text-sm rounded-full pl-4 pr-9 py-2 focus:outline-none focus:bg-white/20 transition-colors"
          />
          <button
            type="submit"
            aria-label="Buscar"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#FFC800] transition-colors cursor-pointer"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>

        <button
          onClick={openCart}
          className="relative p-2 text-white hover:text-[#FFC800] transition-colors shrink-0 cursor-pointer"
          aria-label="Ver carrito"
        >
          <ShoppingCart className="h-6 w-6" />
          {mounted && totalItems() > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-[#DC1414] text-white text-xs font-black rounded-full w-5 h-5 flex items-center justify-center leading-none">
              {totalItems()}
            </span>
          )}
        </button>
      </div>

      <form onSubmit={handleSearch} className="sm:hidden px-4 pb-3 relative">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar productos..."
          className="w-full bg-white/10 text-white placeholder-white/50 text-sm rounded-full pl-4 pr-9 py-2 focus:outline-none focus:bg-white/20 transition-colors"
        />
        <button
          type="submit"
          aria-label="Buscar"
          className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#FFC800] transition-colors cursor-pointer"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>

      {categories.length > 0 && (
        <div className="border-t border-white/10 overflow-x-auto">
          <div className="max-w-[1600px] mx-auto px-4 flex items-center gap-6 h-12 whitespace-nowrap">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/${c.slug}`}
                className="flex items-center gap-1.5 text-white/80 hover:text-[#FFC800] text-base font-medium transition-colors"
              >
                <Tag className="h-4 w-4" />
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
