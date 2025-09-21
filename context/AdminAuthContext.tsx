// context/AdminAuthContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AdminAuthContextType {
  isAdminLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

function getCookie(name: string) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  return null;
}

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if adminToken cookie exists
    const token = getCookie('adminToken');
    setIsAdminLoggedIn(!!token);
  }, []);

  const login = () => {
    // This function can be used if you want to login client-side
    document.cookie = 'adminToken=valid-token; path=/; max-age=3600; Secure; SameSite=Strict';
    setIsAdminLoggedIn(true);
    router.push('/admin/dashboard');
  };

  const logout = () => {
    // Remove cookie by setting expiry in past
    document.cookie = 'adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setIsAdminLoggedIn(false);
    router.push('/admin/login');
  };

  return (
    <AdminAuthContext.Provider value={{ isAdminLoggedIn, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}