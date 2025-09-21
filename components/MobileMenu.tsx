import React from 'react';
import Link from 'next/link';


export default function MobileMenu({ onClose }: { onClose: () => void }) {
return (
<div className="md:hidden bg-white shadow-md fixed top-16 left-0 right-0 z-40">
<a href="#home" className="block px-6 py-3 border-b border-gray-200 hover:bg-pink-50" onClick={onClose}>Home</a>
<a href="#about" className="block px-6 py-3 border-b border-gray-200 hover:bg-pink-50" onClick={onClose}>About</a>
<Link href="/products"><a className="block px-6 py-3 border-b border-gray-200 hover:bg-pink-50" onClick={onClose}>Products</a></Link>
<a href="#testimonials" className="block px-6 py-3 border-b border-gray-200 hover:bg-pink-50" onClick={onClose}>Testimonials</a>
<a href="#offers" className="block px-6 py-3 border-b border-gray-200 hover:bg-pink-50" onClick={onClose}>Offers</a>
<a href="#contact" className="block px-6 py-3 hover:bg-pink-50" onClick={onClose}>Contact</a>
</div>
);
}