"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

type CartItem = {
id: string;
name: string;
price: number;
qty: number;
image?: string;
};


type CartContextType = {
cart: CartItem[];
addToCart: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
removeFromCart: (id: string) => void;
updateQty: (id: string, qty: number) => void;
clearCart: () => void;
total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);


export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
const [cart, setCart] = useState<CartItem[]>([]);


useEffect(() => {
try {
const raw = localStorage.getItem('bd_oura_cart');
if (raw) setCart(JSON.parse(raw));
} catch (e) {
// ignore
}
}, []);

useEffect(() => {
try {
localStorage.setItem('bd_oura_cart', JSON.stringify(cart));
} catch (e) {
// ignore
}
}, [cart]);

const addToCart = (item: Omit<CartItem, 'qty'>, qty = 1) => {
setCart((prev) => {
const found = prev.find((p) => p.id === item.id);
if (found) return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + qty } : p));
return [...prev, { ...item, qty }];
});
};

const removeFromCart = (id: string) => setCart((prev) => prev.filter((p) => p.id !== id));
const updateQty = (id: string, qty: number) =>
setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)));
const clearCart = () => setCart([]);

const total = cart.reduce((s, it) => s + it.price * it.qty, 0);


return (
<CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total }}>
{children}
</CartContext.Provider>
);
};

export function useCart() {
const ctx = useContext(CartContext);
if (!ctx) throw new Error('useCart must be used inside CartProvider');
return ctx;
}