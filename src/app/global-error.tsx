'use client';

import { useEffect } from 'react';

export default function GlobalError({
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
    <html lang="es">
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
          <h2 className="text-xl font-bold text-gray-800">Algo salió mal</h2>
          <p className="text-sm text-gray-500 max-w-sm">
            Ocurrió un error inesperado cargando el sitio.
          </p>
          <button
            onClick={() => unstable_retry()}
            className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#262626] transition-colors"
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  );
}
