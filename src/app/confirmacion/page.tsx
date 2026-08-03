'use client';
import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import type { PFOrderResult } from '@/lib/types';
import { fmtMoney } from '@/lib/format';

export default function ConfirmacionPage() {
  const [order, setOrder] = useState<PFOrderResult | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem('pf-last-order');
    if (raw) {
      try {
        setOrder(JSON.parse(raw));
      } catch {
        // ignore malformed/legacy session data
      }
      sessionStorage.removeItem('pf-last-order');
    }
    setChecked(true);
  }, []);

  if (!checked) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 text-center">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 max-w-md w-full">
        <div className="flex justify-center mb-5">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-black text-black mb-3">¡Pedido recibido!</h1>
        <p className="text-gray-600 text-sm leading-relaxed mb-2">
          En breve te vamos a contactar por <strong>WhatsApp</strong> con los datos para realizar la transferencia.
        </p>
        <p className="text-gray-400 text-xs mb-6">
          Una vez confirmado el pago, tu pedido queda confirmado.
        </p>

        {order && (
          <div className="text-left bg-gray-50 rounded-2xl border border-gray-100 p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500">Pedido</span>
              <span className="text-xs font-mono text-gray-400">
                #{String(order.orderNumber).padStart(4, '0')}
              </span>
            </div>
            <p className="text-xs font-semibold text-black mb-3">
              {order.deliveryMethod === 'PICKUP' ? '🏪 Retiro en el local' : '🚚 Envío a domicilio'}
            </p>
            <div className="flex flex-col gap-1.5">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-gray-600">
                  <span>
                    {item.product?.name ?? 'Producto'} <span className="text-gray-400">x{item.quantity}</span>
                  </span>
                  <span className="font-semibold">
                    {fmtMoney(Number(item.unitPrice) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between font-black text-black text-sm">
              <span>Total</span>
              <span>{fmtMoney(Number(order.total))}</span>
            </div>
          </div>
        )}

        <Link
          href="/"
          className="inline-block bg-[#DC1414] text-white font-black px-6 py-3 rounded-xl hover:bg-[#C81414] transition-colors text-sm"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
