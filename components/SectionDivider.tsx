'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function SectionDivider() {
  return (
    <motion.div
      className="w-full overflow-hidden"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <svg
        viewBox="0 0 1440 100"
        className="w-full h-24"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbcfe8" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
        </defs>
        <path
          fill="url(#grad)"
          d="M0,30 C360,80 1080,0 1440,50 L1440,100 L0,100 Z"
        />
      </svg>
    </motion.div>
  );
}
