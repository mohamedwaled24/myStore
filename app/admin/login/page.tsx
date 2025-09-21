'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      // Set a cookie to mark admin as logged in (expires in 1 hour)
      document.cookie = 'adminToken=valid-token; path=/; max-age=3600; Secure; SameSite=Strict';

      router.push('/admin/dashboard'); // Redirect to dashboard
    } else {
      const data = await res.json();
      setError(data.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Username</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-pink-500 focus:border-pink-500"
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700 font-semibold">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-pink-500 focus:border-pink-500"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white font-bold py-2 rounded-md hover:bg-pink-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}