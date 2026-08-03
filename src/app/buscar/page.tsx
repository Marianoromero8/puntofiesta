import { getProducts } from '@/lib/api';
import ProductGrid from '@/components/ProductGrid';

export const dynamic = 'force-dynamic';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? '').trim();
  const products = await getProducts();

  const results = query
    ? products.filter(
        (p) =>
          p.active &&
          (p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description?.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-10">
      <h1 className="text-xl font-black text-black mb-6">
        {query ? `Resultados para "${query}"` : 'Buscar productos'}
      </h1>
      {query && results.length === 0 ? (
        <p className="text-center text-gray-400 py-20">
          No encontramos productos que coincidan con tu búsqueda.
        </p>
      ) : (
        <ProductGrid products={results} />
      )}
    </div>
  );
}
