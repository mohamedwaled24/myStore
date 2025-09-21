'use client';
import React, { useEffect, useState } from 'react';
import { useCart } from '../../../../context/CartContext';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  createdAt: string;
};

export default function ProductPageClient({ productId }: { productId: string }) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`/api/products/${productId}`);
      if (!res.ok) return setProduct(null);
      const data = await res.json();
      setProduct(data);
      setLoading(false);
    }
    fetchProduct();
  }, [productId]);

  if (loading)
    return (
      <p className="text-center text-gray-500 py-20 text-lg font-medium">Loading product...</p>
    );

  if (!product)
    return (
      <p className="text-center text-red-500 py-20 text-lg font-medium">
        Product not found ❌
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
      {/* Product Image */}
      <div className="rounded-3xl overflow-hidden shadow-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-pink-600 mb-4">
          {product.name}
        </h1>
        <p className="text-gray-700 text-lg md:text-xl mb-6">{product.description}</p>
        <p className="text-3xl md:text-4xl font-bold text-pink-500 mb-6">
          ${product.price.toFixed(2)}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
              })
            }
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition transform hover:-translate-y-1"
          >
            Add to Cart 🛒
          </button>
          <button className="border border-pink-600 text-pink-600 font-semibold px-6 py-3 rounded-xl hover:bg-pink-50 transition transform hover:-translate-y-1">
            Wishlist 💖
          </button>
        </div>

        {/* Category Badge */}
        <span className="inline-block mt-6 bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">
          Category: {product.category}
        </span>
      </div>
    </div>
  );
}
