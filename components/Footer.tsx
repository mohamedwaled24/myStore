import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo */}
        <div className="text-2xl font-extrabold tracking-widest text-white">
          BD OU RA
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm">
          <a href="#home" className="hover:text-pink-500 transition font-medium">
            Home
          </a>
          <a href="#about" className="hover:text-pink-500 transition font-medium">
            About
          </a>
          <Link href="/products" className="hover:text-pink-500 transition font-medium">
            Products
          </Link>
          <a href="#contact" className="hover:text-pink-500 transition font-medium">
            Contact
          </a>
        </nav>

        {/* Social link */}
        <div>
          <a
            href="https://www.instagram.com/bd_ou_ra"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition font-medium"
          >
            @bd_ou_ra
          </a>
        </div>
      </div>
    </footer>
  );
}
