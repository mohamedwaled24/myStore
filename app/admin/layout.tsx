'use client'
import '../globals.css';
import Link from 'next/link';
import { AdminAuthProvider, useAdminAuth } from '../../context/AdminAuthContext';

function AdminHeader() {
  const { isAdminLoggedIn, logout } = useAdminAuth();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="font-bold text-xl">Admin Dashboard</h1>
        {isAdminLoggedIn && (
          <button
            onClick={logout}
            className="text-pink-500 hover:underline"
            aria-label="Logout"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 font-sans">
        <AdminAuthProvider>
          <AdminHeader />
          <main className="p-6">{children}</main>
        </AdminAuthProvider>
      </body>
    </html>
  );
}