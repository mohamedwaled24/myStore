'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { cart } = useCart();
  const cartCount = cart.reduce((s, it) => s + it.qty, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const menuLinks = [
    { name: 'Home', href: 'badoura/' },
    { name: 'About', href: 'badoura/#about' },
    { name: 'Products', href: 'badoura/products' },
    { name: 'Testimonials', href: 'badoura/#testimonials' },
    { name: 'Offers', href: 'badoura/#offers' },
    { name: 'Checkout', href: 'badoura/checkout' },
  ];

  const menuItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="badoura/"
            className="text-2xl md:text-3xl font-extrabold tracking-widest text-pink-600 hover:text-pink-500 transition"
          >
            BD OU RA
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-lg font-semibold">
            {menuLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-pink-500 transition rounded px-2 py-1 hover:bg-pink-50"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Cart + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link href="/checkout" className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-pink-600 hover:text-pink-500 transition"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full px-2">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded hover:bg-pink-50 transition"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-pink-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 bg-gradient-to-b from-pink-200 via-pink-400 to-pink-600 flex flex-col items-center justify-center text-white px-6"
          >
            <button
              className="absolute top-8 right-8 text-5xl font-bold hover:text-pink-100 transition"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>

            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ staggerChildren: 0.1, delayChildren: 0.15, ease: 'easeOut' }}
              className="flex flex-col items-center gap-10 text-3xl font-bold w-full max-w-md"
            >
              {menuLinks.map((link) => (
                <motion.div key={link.name} variants={menuItemVariants} className="w-full text-center">
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block w-full hover:text-pink-50 transition py-3 rounded"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}