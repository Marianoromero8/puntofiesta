import { Truck, Wallet, Sparkles } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Truck,
    title: 'Zona de entrega',
    text: 'Coordinamos la entrega dentro de Bahía Blanca y alrededores. Consultá disponibilidad para tu zona al hacer tu pedido.',
  },
  {
    icon: Wallet,
    title: 'Formas de pago',
    text: 'Transferencia bancaria o efectivo en el local al momento de retirar tu pedido.',
  },
  {
    icon: Sparkles,
    title: 'Calidad y variedad',
    text: 'Combos y productos pensados para hacer de tu evento algo inolvidable, con la mejor relación calidad-precio.',
  },
];

export default function InfoHighlights() {
  return (
    <div className="max-w-[1600px] mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {HIGHLIGHTS.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center text-center gap-3"
          >
            <div className="w-14 h-14 rounded-full bg-[#044389]/10 flex items-center justify-center">
              <item.icon className="h-7 w-7 text-[#044389]" />
            </div>
            <h3 className="font-bold text-[#044389] text-base">{item.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
