import { getCategories, getProducts } from '@/lib/api';
import CatalogSection from '@/components/CatalogSection';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  const activeCategories = categories.filter((c) => c.active);
  const activeProducts = products.filter((p) => p.active && p.stock > 0);

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#044389] text-white py-14 px-4 text-center">
        <h1 className="text-3xl font-black mb-2">
          <span className="text-[#FCFF4B]">PUNTO</span> FIESTA
        </h1>
        <p className="text-white/80 text-base max-w-md mx-auto">
          Combos y productos para tu evento. Hacé tu pedido, transferí y listo.
        </p>
      </section>

      {/* Catalog */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        {activeCategories.length === 0 ? (
          <p className="text-center text-gray-400 py-20">Próximamente...</p>
        ) : (
          activeCategories.map((category) => {
            const categoryProducts = activeProducts.filter((p) => p.categoryId === category.id);
            if (categoryProducts.length === 0) return null;
            return (
              <CatalogSection key={category.id} category={category} products={categoryProducts} />
            );
          })
        )}
      </section>
    </div>
  );
}
