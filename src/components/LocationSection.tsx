interface Props {
  address: string;
}

export default function LocationSection({ address }: Props) {
  if (!address) return null;

  // Bahía Blanca se agrega siempre para que el mapa resuelva un pin único
  // aunque la dirección cargada en el admin no incluya la ciudad.
  const fullAddress = `${address}, Bahía Blanca, Buenos Aires, Argentina`;
  const encoded = encodeURIComponent(fullAddress);

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-xl font-black text-black uppercase tracking-wide">
          Retirá tu pedido
        </h2>
        <div className="flex-1 h-px bg-black/20" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-[32rem]">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col justify-center gap-4">
          <p className="text-black font-bold text-lg">Retirá tu pedido en nuestra sucursal</p>
          <p className="text-gray-700 text-sm leading-relaxed">{fullAddress}</p>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encoded}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-[#DC1414] text-white hover:bg-[#C81414] transition-colors cursor-pointer"
          >
            Cómo llegar
          </a>
        </div>
        <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <iframe
            title="Ubicación de retiro"
            src={`https://www.google.com/maps?q=${encoded}&output=embed`}
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
