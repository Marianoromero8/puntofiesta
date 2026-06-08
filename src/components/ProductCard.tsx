'use client';
import type { PFProduct } from '@/lib/types';
import { useCart } from '@/store/cart';
import { ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';

interface Props {
  product: PFProduct;
}

export default function ProductCard({ product }: Props) {
  const addItem = useCart((s) => s.addItem);
  const items = useCart((s) => s.items);
  const [added, setAdded] = useState(false);

  const inCart = items.find((i) => i.productId === product.id);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="aspect-square bg-[#044389]/5 flex items-center justify-center overflow-hidden">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-1 text-[#044389]/30">
            <span className="font-black text-3xl">PF</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="font-bold text-gray-800 text-sm leading-snug">{product.name}</h3>
        {product.description && (
          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{product.description}</p>
        )}
        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          <span className="text-lg font-black text-[#044389]">
            ${Number(product.price).toLocaleString('es-AR')}
          </span>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              added
                ? 'bg-green-500 text-white'
                : inCart
                ? 'bg-[#044389]/10 text-[#044389] hover:bg-[#044389]/20'
                : 'bg-[#FCFF4B] text-[#044389] hover:bg-[#f0f33d]'
            }`}
          >
            {added ? <Check className="h-3.5 w-3.5" /> : <ShoppingCart className="h-3.5 w-3.5" />}
            {added ? 'Agregado' : inCart ? `x${inCart.quantity}` : 'Agregar'}
          </button>
        </div>
      </div>
    </div>
  );
}
