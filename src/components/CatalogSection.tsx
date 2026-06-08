'use client';
import type { PFCategory, PFProduct } from '@/lib/types';
import ProductCard from './ProductCard';

interface Props {
  category: PFCategory;
  products: PFProduct[];
}

export default function CatalogSection({ category, products }: Props) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-xl font-black text-[#044389] uppercase tracking-wide">{category.name}</h2>
        <div className="flex-1 h-px bg-[#044389]/20" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
