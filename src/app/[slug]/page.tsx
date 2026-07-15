import { notFound } from 'next/navigation';
import { getCategories, getProducts } from '@/lib/api';
import CatalogSection from '@/components/CatalogSection';

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  const category = categories.find((c) => c.slug === slug && c.active);
  if (!category) notFound();

  const categoryProducts = products.filter((p) => p.active && p.categoryId === category.id);

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-10">
      <CatalogSection category={category} products={categoryProducts} />
    </div>
  );
}
