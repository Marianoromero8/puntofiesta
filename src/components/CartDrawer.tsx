'use client';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/store/cart';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fmtMoney } from '@/lib/format';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 cursor-pointer"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 bg-black text-white">
          <h2 className="font-bold text-lg">Tu carrito</h2>
          <button onClick={closeCart} className="p-1 hover:text-[#FFC800] transition-colors cursor-pointer">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
              <ShoppingBag className="h-12 w-12 opacity-30" />
              <p className="text-sm">Tu carrito está vacío</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.productId} className="flex gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100">
                {item.imageUrl
                  ? <img src={item.imageUrl} alt={item.name} className="w-14 h-14 object-contain rounded-lg shrink-0 bg-white border border-gray-100" />
                  : <div className="w-14 h-14 rounded-lg bg-black/10 shrink-0 flex items-center justify-center text-black font-black text-xs">PF</div>
                }
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{item.name}</p>
                  <p className="text-black font-bold text-sm">{fmtMoney(Number(item.price))}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer touch-manipulation">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer touch-manipulation disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeItem(item.productId)}
                    className="p-1 text-gray-300 hover:text-red-400 transition-colors cursor-pointer">
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <p className="text-sm font-bold text-gray-700">{fmtMoney(item.price * item.quantity)}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-4 py-4 border-t border-gray-200 bg-white">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600 font-medium">Total</span>
              <span className="text-xl font-black text-black">{fmtMoney(totalPrice())}</span>
            </div>
            <button
              onClick={() => { closeCart(); router.push('/checkout'); }}
              className="w-full bg-[#DC1414] text-white font-black py-3 rounded-xl hover:bg-[#C81414] transition-colors text-sm cursor-pointer"
            >
              Hacer pedido
            </button>
          </div>
        )}
      </div>
    </>
  );
}
