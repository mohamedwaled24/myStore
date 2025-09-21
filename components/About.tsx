'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-gradient-to-r from-pink-50 via-pink-100 to-pink-50 py-24 px-6 overflow-hidden"
      aria-label="About the brand"
    >
      {/* Decorative Background Elements */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-200 rounded-full opacity-30 pointer-events-none animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-300 rounded-full opacity-20 pointer-events-none animate-pulse"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
        {/* Text Content */}
        <motion.div
          className="md:w-1/2"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-wide text-pink-600">
            About BD OU RA
          </h2>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">
            BD OU RA is a women’s clothing brand dedicated to empowering women and girls through fashion. Our designs blend modern minimalism with bold statements, crafted with quality fabrics and attention to detail.
          </p>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
            We believe every woman deserves to wear her identity with pride and confidence. Step into your style and let your personality shine!
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          className="md:w-1/2 relative"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=800&q=80"
            alt="Fashion brand about"
            className="rounded-3xl shadow-2xl object-cover w-full h-96 md:h-80 hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
      </div>
    </section>
  );
}
