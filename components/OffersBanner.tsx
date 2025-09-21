// FILE: components/OffersBanner.tsx
import React from 'react';
export default function OffersBanner() {
return (
<section id="offers" className="bg-pink-600 text-white text-center py-6 px-4 flex flex-col md:flex-row items-center justify-center gap-6">
<p className="text-xl md:text-2xl font-semibold flex items-center gap-2">
<span role="img" aria-label="fire">🔥</span> 20% Off on New Arrivals – Limited Time Offer!
</p>
<a href="/products" className="bg-white text-pink-600 font-bold px-6 py-2 rounded-md hover:bg-pink-50 transition">Shop New Arrivals</a>
</section>
);
}
