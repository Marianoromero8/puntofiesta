'use client';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/store/cart';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const openCart = useCart((s) => s.openCart);
  const totalItems = useCart((s) => s.totalItems);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    useCart.persist.rehydrate();
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#044389] shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="text-[#FCFF4B] font-black text-xl tracking-tight">PUNTO</span>
          <span className="text-white font-black text-xl tracking-tight">FIESTA</span>
        </a>

        <button
          onClick={openCart}
          className="relative p-2 text-white hover:text-[#FCFF4B] transition-colors"
          aria-label="Ver carrito"
        >
          <ShoppingCart className="h-6 w-6" />
          {mounted && totalItems() > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-[#FFAD05] text-[#044389] text-xs font-black rounded-full w-5 h-5 flex items-center justify-center leading-none">
              {totalItems()}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
