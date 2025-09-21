// app/layout.tsx
import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { CartProvider } from '../../context/CartContext'; // ✅ import your provider

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BD OU RA',
  description: 'BD OU RA – Wear Your Identity',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          {/* Navbar always on top */}
          <Navbar />

          {/* Page content */}
          <main className="pt-20">{children}</main>

          {/* Footer */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
