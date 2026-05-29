'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';

const navItems = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'Shop', href: '/products', icon: 'grid_view' },
  { label: 'Cart', href: '#', icon: 'shopping_bag', isButton: true },
  { label: 'Wishlist', href: '/account/wishlist', icon: 'favorite' },
  { label: 'Account', href: '/account', icon: 'person' },
];

export default function MobileBottomNav() {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const openCart = useCartStore(s => s.openCart);
  const cartCount = useCartStore(s => s.getCount());

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav className="md:hidden bg-surface-bright/95 text-primary font-label-caps text-label-caps fixed bottom-0 left-0 w-full z-50 border-t border-secondary/10 backdrop-blur-xl shadow-[0_-4px_20px_rgba(74,4,4,0.05)] flex justify-around items-center px-4 py-3 pb-safe">
      {navItems.map(({ label, href, icon, isButton }) => {
        const active = pathname === href || (href !== '/' && href !== '#' && pathname.startsWith(href));
        
        const content = (
          <>
            <div className="relative">
              <span 
                className="material-symbols-outlined mb-1" 
                style={{ fontVariationSettings: `'FILL' ${active ? '1' : '0'}` }}
              >
                {icon}
              </span>
              {isMounted && label === 'Cart' && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-primary-container text-on-primary w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold">
                  {cartCount}
                </span>
              )}
            </div>
            {label}
          </>
        );

        const className = `flex flex-col items-center justify-center duration-150 ease-in-out ${
          active 
            ? 'text-primary font-semibold scale-110 active:scale-90' 
            : 'text-on-surface-variant active:scale-90 hover:text-primary'
        }`;

        if (isButton) {
          return (
            <button key={label} onClick={openCart} className={className} aria-label={label}>
              {content}
            </button>
          );
        }

        return (
          <Link key={label} href={href} className={className}>
            {content}
          </Link>
        );
      })}
    </nav>
  );
}
