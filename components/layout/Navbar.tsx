'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartCount = useCartStore(s => s.getCount());
  const openCart = useCartStore(s => s.openCart);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* TopNavBar (Desktop) */}
      <header 
        id="main-header"
        className={`hidden md:flex text-primary docked full-width top-0 sticky z-50 backdrop-blur-md border-b border-secondary/20 flex justify-between items-center w-full px-container-padding-desktop max-w-max-width mx-auto h-20 transition-all duration-300 ${
          scrolled ? 'shadow-sm bg-[rgba(253,249,244,0.95)]' : 'bg-[rgba(253,249,244,0.9)]'
        }`}
      >
        <nav className="flex items-center gap-8">
          <Link href="/collections" className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary hover:text-on-secondary-container transition-colors duration-300">Shop</Link>
          <Link href="/collections" className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary hover:text-on-secondary-container transition-colors duration-300">Collections</Link>
          <Link href="/about" className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary hover:text-on-secondary-container transition-colors duration-300">Our Story</Link>
        </nav>
        
        <Link href="/" className="font-display-lg text-headline-md tracking-[0.2em] uppercase text-primary absolute left-1/2 -translate-x-1/2">
          Kanjivaram
        </Link>
        
        <div className="flex items-center gap-6">
          <button aria-label="Search" className="text-on-surface-variant hover:text-primary transition-colors duration-300">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>search</span>
          </button>
          <button 
            aria-label="Shopping Bag" 
            onClick={openCart}
            className="text-on-surface-variant hover:text-primary transition-colors duration-300 relative"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>shopping_bag</span>
            {isMounted && cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary-container text-on-primary w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Header (Minimal) */}
      <header className="md:hidden flex justify-between items-center px-container-padding-mobile py-4 sticky top-0 bg-surface/90 backdrop-blur-md z-40 border-b border-secondary/10">
        <Link href="/" className="font-display-lg-mobile text-headline-md tracking-[0.1em] uppercase text-primary">
          Kanjivaram
        </Link>
        <button className="text-primary relative" onClick={openCart}>
          <span className="material-symbols-outlined">shopping_bag</span>
          {isMounted && cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary-container text-on-primary w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold">
                {cartCount}
              </span>
            )}
        </button>
      </header>
    </>
  );
}
