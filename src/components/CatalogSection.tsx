'use client';
import type { PFCategory, PFProduct } from '@/lib/types';
import ProductGrid from './ProductGrid';

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
      <ProductGrid products={products} />
    </div>
  );
}
