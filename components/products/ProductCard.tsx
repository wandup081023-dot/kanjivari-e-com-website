'use client';
import Link from 'next/link';
import { Product, formatPrice } from '@/lib/data';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  variant?: 'default' | 'compact';
}

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="group cursor-pointer flex flex-col">
      <div className="relative aspect-[4/5] bg-surface-container overflow-hidden mb-6">
        <img 
          alt={product.name} 
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0" 
          src={product.images[0]} 
        />
        {product.images[1] && (
          <img 
            alt={`${product.name} alternate view`} 
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" 
            src={product.images[1]} 
          />
        )}
        
        {product.badge && (
          <div className="absolute top-4 left-4 glass-panel px-3 py-1 gold-border rounded-sm">
            <span className="font-body-md text-[10px] uppercase tracking-widest text-primary">
              {product.badge === 'bestseller' ? 'Bestseller' : product.badge === 'new' ? 'New' : `${product.discount}% OFF`}
            </span>
          </div>
        )}
        {product.discount && !product.badge && (
          <div className="absolute top-4 left-4 glass-panel px-3 py-1 gold-border rounded-sm">
            <span className="font-body-md text-[10px] uppercase tracking-widest text-primary">
              {product.discount}% Off
            </span>
          </div>
        )}
      </div>
      <div className="text-center flex flex-col items-center flex-grow justify-end">
        <h4 className={`font-headline-sm text-primary mb-2 ${variant === 'compact' ? 'text-base' : 'text-lg'}`}>
          {product.name}
        </h4>
        <div className="flex gap-3 items-center">
          <span className="font-price-display text-price-display text-on-surface-variant">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="font-price-display text-sm text-surface-dim line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
