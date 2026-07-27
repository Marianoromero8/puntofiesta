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
  const outOfStock = product.stock === 0;
  const atStockLimit = !!inCart && inCart.quantity >= product.stock;
  const lowStock = product.stock > 0 && product.stock <= 3;

  const handleAdd = () => {
    if (outOfStock || atStockLimit) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative aspect-square bg-[#044389]/5 flex items-center justify-center overflow-hidden">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-1 text-[#044389]/30">
            <span className="font-black text-3xl">PF</span>
          </div>
        )}
        {outOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full">
              Sin stock por el momento
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="font-bold text-gray-800 text-sm leading-snug">{product.name}</h3>
        {product.description && (
          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{product.description}</p>
        )}
        {lowStock && (
          <p className="text-xs font-black text-[#FFAD05] tracking-wide">
            ⚡ ¡Quedan {product.stock}!
          </p>
        )}
        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          <span className={`text-lg font-black ${outOfStock ? 'text-gray-400' : 'text-[#044389]'}`}>
            ${Number(product.price).toLocaleString('es-AR')}
          </span>
          <button
            onClick={handleAdd}
            disabled={outOfStock || atStockLimit}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all touch-manipulation ${
              outOfStock || atStockLimit
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : added
                ? 'bg-green-500 text-white cursor-pointer'
                : inCart
                ? 'bg-[#044389]/10 text-[#044389] hover:bg-[#044389]/20 cursor-pointer'
                : 'bg-[#FCFF4B] text-[#044389] hover:bg-[#f0f33d] cursor-pointer'
            }`}
          >
            {outOfStock ? (
              'Sin stock'
            ) : atStockLimit ? (
              <><ShoppingCart className="h-3.5 w-3.5" /> x{inCart!.quantity} (máx.)</>
            ) : added ? (
              <><Check className="h-3.5 w-3.5" /> Agregado</>
            ) : inCart ? (
              <><ShoppingCart className="h-3.5 w-3.5" /> x{inCart.quantity}</>
            ) : (
              <><ShoppingCart className="h-3.5 w-3.5" /> Agregar</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
