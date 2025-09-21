'use client';

import React from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">Welcome, Admin! Manage your store from here.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Products Section */}
        <Link
          href="/admin/products"
          className="bg-pink-600 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition flex flex-col items-center justify-center gap-4"
        >
          <span className="text-2xl font-bold">Products</span>
          <span className="text-sm">Add, edit, or remove products</span>
        </Link>

        {/* Contacts Section */}
        <Link
          href="/admin/contacts"
          className="bg-green-600 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition flex flex-col items-center justify-center gap-4"
        >
          <span className="text-2xl font-bold">Contacts</span>
          <span className="text-sm">View customer messages</span>
        </Link>

        {/* Orders Section (future) */}
        <Link
          href="/admin/orders"
          className="bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition flex flex-col items-center justify-center gap-4"
        >
          <span className="text-2xl font-bold">Orders</span>
          <span className="text-sm">Track orders and manage shipments</span>
        </Link>
      </div>
    </div>
  );
}
