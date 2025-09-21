'use client';

import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sara M.',
    photo: 'https://via.placeholder.com/80',
    review: 'BD OU RA clothes make me feel confident and stylish every day. Love the quality!',
  },
  {
    name: 'Lina K.',
    photo: 'https://via.placeholder.com/80',
    review: 'Amazing designs and perfect fit. The customer service is also very friendly.',
  },
  {
    name: 'Nora A.',
    photo: 'https://via.placeholder.com/80',
    review: 'I get compliments every time I wear BD OU RA. Highly recommend for women who want to stand out.',
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative bg-pink-50 py-20 overflow-hidden"
      aria-label="Customer testimonials"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 tracking-wider text-pink-600">
        What Our Customers Say
      </h2>

      {/* Animated carousel */}
      <motion.div
        className="flex gap-8 md:gap-10 px-6 md:px-12 overflow-x-auto scrollbar-hide"
        initial={{ x: 0 }}
        animate={{ x: [-10, 10, -10] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className="flex-shrink-0 w-80 bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            {/* Card content */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={t.photo}
                alt={`${t.name} photo`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <h3 className="font-semibold text-lg text-pink-600">{t.name}</h3>
            </div>
            <p className="text-gray-700 italic">"{t.review}"</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Optional background decorations */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-pink-200 rounded-full opacity-30 pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-300 rounded-full opacity-20 pointer-events-none"></div>
    </section>
  );
}
