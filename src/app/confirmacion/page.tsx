'use client';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ConfirmacionPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 text-center">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-10 max-w-md w-full">
        <div className="flex justify-center mb-5">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-black text-[#044389] mb-3">¡Pedido recibido!</h1>
        <p className="text-gray-600 text-sm leading-relaxed mb-2">
          En breve te vamos a contactar por <strong>WhatsApp</strong> con los datos para realizar la transferencia.
        </p>
        <p className="text-gray-400 text-xs mb-8">
          Una vez confirmado el pago, tu pedido queda confirmado.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#FCFF4B] text-[#044389] font-black px-6 py-3 rounded-xl hover:bg-[#f0f33d] transition-colors text-sm"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
