'use client';
import type { PFProduct } from '@/lib/types';
import ProductCard from './ProductCard';

interface Props {
  products: PFProduct[];
}

export default function ProductGrid({ products }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
