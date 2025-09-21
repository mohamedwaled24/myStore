'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
        >
          Add New Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Name</th>
              <th className="border border-gray-300 p-2 text-left">Price</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{product.name}</td>
                <td className="border border-gray-300 p-2">${product.price.toFixed(2)}</td>
                <td className="border border-gray-300 p-2 text-center space-x-2">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={async () => {
                      if (confirm('Are you sure you want to delete this product?')) {
                        await fetch(`/api/admin/products/${product.id}`, {
                          method: 'DELETE',
                        });
                        setProducts(products.filter((p) => p.id !== product.id));
                      }
                    }}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}