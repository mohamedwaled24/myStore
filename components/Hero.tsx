'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center text-center bg-cover bg-center overflow-hidden -mt-16"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

      {/* Animated Content */}
      <motion.div
        className="relative z-10 max-w-3xl px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-white text-4xl md:text-6xl font-extrabold mb-6 tracking-wide leading-tight"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          BD OU RA – Wear Your Identity
        </motion.h1>

        {/* Animated Button */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/products"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-10 py-4 rounded-full shadow-lg hover:shadow-pink-400/50 transition"
          >
            Shop Now 🛍️
          </Link>
        </motion.div>
      </motion.div>

      {/* Floating Sparkles or Accent Circles */}
      <motion.div
        className="absolute w-32 h-32 bg-pink-300 rounded-full opacity-20 top-10 left-10 blur-3xl"
        animate={{ y: [0, 20, 0], x: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: 'loop' }}
      />
      <motion.div
        className="absolute w-24 h-24 bg-pink-400 rounded-full opacity-30 bottom-20 right-20 blur-2xl"
        animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: 'loop' }}
      />
    </section>
  );
}
