'use client'
import React, { useState } from 'react';
import { useCart } from '../../../context/CartContext';

export default function Checkout() {
const { cart, total, updateQty, removeFromCart, clearCart } = useCart();
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [address, setAddress] = useState('');
const [submitted, setSubmitted] = useState(false);

const submit = (e: React.FormEvent) => {
e.preventDefault();
// In real app: call your payment / order API
setSubmitted(true);
clearCart();
};

return (
<div>
<main className="pt-20 max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
<section>
<h2 className="text-xl font-bold mb-4">Your Cart</h2>
{cart.length === 0 && <p>Your cart is empty.</p>}
<div className="space-y-4">
{cart.map((it) => (
<div key={it.id} className="flex items-center gap-4 border p-3 rounded">
<img src={it.image} alt={it.name} className="w-20 h-20 object-cover rounded" />
<div className="flex-1">
<div className="font-semibold">{it.name}</div>
<div className="text-sm text-gray-600">${it.price.toFixed(2)}</div>
<div className="mt-2 flex items-center gap-2">
<input type="number" value={it.qty} onChange={(e) => updateQty(it.id, Number(e.target.value) || 1)} className="w-20 p-1 border rounded" />
<button onClick={() => removeFromCart(it.id)} className="text-sm text-red-600">Remove</button>
</div>
</div>
</div>
))}
</div>
<div className="mt-6 font-bold">Total: ${total.toFixed(2)}</div>
</section>


<section>
<h2 className="text-xl font-bold mb-4">Shipping & Payment</h2>
<form onSubmit={submit} className="space-y-4">
<input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full p-2 border rounded" />
<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
<textarea required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Shipping address" className="w-full p-2 border rounded" />
<button type="submit" className="w-full bg-pink-600 text-white font-bold py-3 rounded-md">Place Order</button>
</form>
</section>
</main>
</div>
);
}