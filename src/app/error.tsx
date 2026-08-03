'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
      <AlertTriangle className="h-10 w-10 text-black" />
      <h2 className="text-xl font-bold text-gray-800">Algo salió mal</h2>
      <p className="text-sm text-gray-500 max-w-sm">
        Ocurrió un error inesperado. Podés intentar de nuevo o volver al inicio.
      </p>
      <div className="flex gap-3 mt-2">
        <button
          onClick={() => unstable_retry()}
          className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#262626] transition-colors"
        >
          Reintentar
        </button>
        <Link
          href="/"
          className="border border-gray-300 px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
