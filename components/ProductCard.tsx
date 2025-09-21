import Link from 'next/link';
import React from 'react';
import { Product } from '../lib/products';

export default function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd?: (p: Product) => void;
}) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
      {/* Product Image */}
      <Link href={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Product Details */}
      <div className="p-5 text-center">
        <h3 className="font-bold text-lg md:text-xl mb-2 text-gray-800">{product.name}</h3>
        <p className="text-pink-500 font-extrabold text-xl mb-4">${product.price.toFixed(2)}</p>

        {/* Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => onAdd && onAdd(product)}
            className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            Add to Cart 🛒
          </button>

          <Link
            href={`/products/${product.id}`}
            className="border-2 border-pink-500 text-pink-500 font-semibold px-5 py-2 rounded-full hover:bg-pink-50 transition-all"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
