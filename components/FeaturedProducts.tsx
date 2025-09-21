'use client';

import React, { useEffect, useState } from 'react';
import ProductsGrid from './ProductsGrid';
import { useCart } from '../context/CartContext';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  createdAt: string;
};

export default function FeaturedProducts() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('/api/products?limit=3'); // fetch 3 featured products
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products);
      } else {
        setProducts([]);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center py-6">Loading featured products...</p>;
  if (!products.length) return <p className="text-center py-6">No featured products found ❌</p>;

  return <ProductsGrid products={products} onAdd={addToCart} />;
}
