'use client';
import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import './globals.css';

export default function RootLayout({ children }) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>Fruit Royale — Luxury Exotic Fruits</title>
        <meta name="description" content="Discover the world's finest exotic fruits, hand-picked and delivered fresh to your door. Alphonso mangoes, Dragon fruit, Japanese peaches and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            <Navbar onCartOpen={() => setCartOpen(true)} />
            <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
            <div className="page-wrapper">
              {children}
            </div>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
