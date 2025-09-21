'use client'
import React, { useState } from 'react';
import Hero from '../../components/Hero';
import OffersBanner from '../../components/OffersBanner';
import About from '../../components/About';
import Testimonials from '../../components/Testimonials';
import ContactForm from '../../components/ContactForm';
import products from '../../lib/products';
import MobileMenu from '../../components/MobileMenu';
import FeaturedProducts from '@/components/FeaturedProducts';
import SectionDivider from '@/components/SectionDivider';


export default function Home() {
const [menuOpen, setMenuOpen] = useState(false);
return (
<div className="font-sans text-gray-900 bg-white scroll-smooth">
{menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
<main className="pt-16">
<Hero />
<SectionDivider />
<OffersBanner />
<SectionDivider />
<section className="max-w-7xl mx-auto px-6 py-16" aria-label="Products">
  <h2 className="text-3xl font-bold text-center mb-12 tracking-wide">Our Products</h2>
  <FeaturedProducts />
  <div className="text-center mt-10">
    <a
      href="/products"
      className="inline-block bg-pink-600 text-white font-semibold px-8 py-3 rounded-md hover:bg-pink-700 transition"
    >
      View All Products
    </a>
  </div>
</section>

<SectionDivider />
<About />
<SectionDivider />
<Testimonials />
<SectionDivider />
<ContactForm />

</main>
</div>
);
}