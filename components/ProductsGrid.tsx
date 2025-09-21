import React from 'react';
import { Product } from '../lib/products';
import ProductCard from './ProductCard';

export default function ProductsGrid({
  products,
  onAdd,
}: {
  products: Product[];
  onAdd?: (p: Product) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
      ))}
    </div>
  );
}
