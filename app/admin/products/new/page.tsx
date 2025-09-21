'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProductPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  // Convert image file to base64 string
  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  let imageBase64 = '';

  if (imageFile) {
    try {
      imageBase64 = await toBase64(imageFile);
    } catch {
      setError('Failed to read image file');
      return;
    }
  }

  const res = await fetch('/api/admin/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      price: parseFloat(price),
      category,
      description,
      imageUrl: imageBase64,
    }),
  });

  if (res.ok) {
    router.push('/admin/products');
  } else {
    // Try to parse JSON safely
    let data;
    try {
      data = await res.json();
    } catch {
      data = { message: 'Unknown error occurred' };
    }
    setError(data.message || 'Failed to add product');
  }
};

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Add New Product</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Product name"
          />
        </div>
        <div>
  <label className="block font-semibold mb-1 text-gray-700">Category</label>
  <input
    type="text"
    required
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
    placeholder="Product category"
  />
</div>

        {/* Price */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Price</label>
          <input
            type="number"
            step="0.01"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="0.00"
            min="0"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            rows={4}
            placeholder="Product description (optional)"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-gray-700"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Image preview"
              className="mt-4 max-h-48 rounded border border-gray-300 object-contain"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-pink-600 text-white font-bold py-3 rounded hover:bg-pink-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}