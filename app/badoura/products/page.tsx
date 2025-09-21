'use client';

import React, { useEffect, useMemo, useState } from "react";
import { useCart } from "../../../context/CartContext";
import ProductsGrid from "../../../components/ProductsGrid";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  createdAt: string;
};

export default function ProductsPage() {
  const { addToCart } = useCart();

  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [category, setCategory] = useState<string>('All');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  // Filters
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [sort, setSort] = useState<'newest' | 'price_asc' | 'price_desc'>('newest');

  // Fetch products from API
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/products?page=${page}&limit=9&category=${category}`
        );
        const data = await res.json();

        if (!data.products || !Array.isArray(data.products)) {
          console.error("API returned invalid products:", data);
          setProducts([]);
          setTotalPages(1);
        } else {
          setProducts(data.products);
          setTotalPages(data.totalPages || 1);

          // Build categories only once (from all products)
          if (categories.length === 1 && data.total > 0) {
            const allCats = ['All', ...Array.from(new Set(data.products.map((p: Product) => p.category)))];
            setCategories(allCats);
          }
        }
      } catch (err) {
        console.error("Fetch products error:", err);
        setProducts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category, page]);

  // Apply client-side filters
  const filtered = useMemo(() => {
    let out = Array.isArray(products) ? [...products] : [];
    if (minPrice !== '') out = out.filter((p) => p.price >= Number(minPrice));
    if (maxPrice !== '') out = out.filter((p) => p.price <= Number(maxPrice));
    if (sort === 'newest') out = out.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    if (sort === 'price_asc') out = out.sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') out = out.sort((a, b) => b.price - a.price);
    return out;
  }, [products, minPrice, maxPrice, sort]);

  return (
    <div className="min-h-screen bg-pink-50">
      <main className="pt-20 max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-pink-600 mb-8 text-center">
          Our Lovely Products 🌸
        </h1>

        {loading ? (
          <p className="text-center text-gray-500 py-20">Loading products...</p>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="md:w-64 p-4 border rounded-lg bg-white shadow-md">
              <h3 className="font-bold text-pink-600 mb-3">Categories</h3>
              <div className="flex flex-col gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setCategory(c); setPage(1); }}
                    className={`text-left px-3 py-1 rounded-full font-semibold transition ${
                      category === c ? 'bg-pink-600 text-white shadow' : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="font-bold text-pink-600 mb-2">Price</h3>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice as any}
                    onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : '')}
                    className="w-1/2 p-2 border rounded-md"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice as any}
                    onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : '')}
                    className="w-1/2 p-2 border rounded-md"
                  />
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-bold text-pink-600 mb-2">Sort By</h3>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as any)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="newest">Newest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {filtered.length === 0 ? (
                <p className="text-center text-gray-500 py-20">No products found 😢</p>
              ) : (
                <ProductsGrid
                  products={filtered}
                  onAdd={(p) => addToCart({ id: p.id, name: p.name, price: p.price, image: p.image })}
                />
              )}

              {/* Pagination */}
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border rounded-full disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2 font-semibold text-pink-600">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border rounded-full disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
