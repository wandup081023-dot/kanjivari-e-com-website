'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Product, formatPrice } from '@/lib/data';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  variant?: 'default' | 'compact';
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <svg
            key={star}
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill={filled ? '#c5a059' : half ? 'url(#half)' : 'none'}
            stroke="#c5a059"
            strokeWidth="2"
            className="shrink-0"
          >
            {half && (
              <defs>
                <linearGradient id="half">
                  <stop offset="50%" stopColor="#c5a059" />
                  <stop offset="50%" stopColor="transparent" />
                </linearGradient>
              </defs>
            )}
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      })}
    </div>
  );
}

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const [isWished, setIsWished] = useState(product.isWishlisted ?? false);

  const badgeLabel =
    product.badge === 'bestseller'
      ? 'Bestseller'
      : product.badge === 'new'
      ? 'New Arrival'
      : product.badge === 'sale'
      ? `${product.discount}% OFF`
      : product.discount
      ? `${product.discount}% OFF`
      : null;

  const badgeColor =
    product.badge === 'bestseller'
      ? 'bg-amber-100 text-amber-800 border border-amber-200'
      : product.badge === 'new'
      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
      : 'bg-rose-50 text-rose-700 border border-rose-200';

  return (
    <div className="group relative flex flex-col">
      {/* Image container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f0eb] rounded-xl shadow-sm mb-4">
        {/* Primary image */}
        <img
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-0"
          src={product.images[0]}
        />
        {/* Hover image */}
        {product.images[1] && (
          <img
            alt={`${product.name} alternate view`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-100"
            src={product.images[1]}
          />
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-xl" />

        {/* Badge */}
        {badgeLabel && (
          <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm ${badgeColor}`}>
            {badgeLabel}
          </div>
        )}

        {/* Wishlist button */}
        <button
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.preventDefault();
            setIsWished((v) => !v);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-white opacity-0 group-hover:opacity-100"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={isWished ? '#b5113c' : 'none'}
            stroke={isWished ? '#b5113c' : '#555'}
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Hover CTA overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Link
            href={`/products/${product.slug}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-white text-[#7c1c2c] text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-[#7c1c2c] hover:text-white transition-colors duration-200 shadow-lg"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            Shop Now
          </Link>
        </div>
      </div>

      {/* Product info */}
      <Link href={`/products/${product.slug}`} className="flex flex-col items-center text-center px-1 flex-grow">
        {/* Collection label */}
        <span className="text-[9px] uppercase tracking-[0.18em] text-[#c5a059] font-semibold mb-1.5">
          {product.collectionSlug.replace(/-/g, ' ')}
        </span>

        {/* Product name */}
        <h4
          className={`font-serif font-semibold text-[#2d1a0e] mb-2 leading-snug group-hover:text-[#7c1c2c] transition-colors duration-200 ${
            variant === 'compact' ? 'text-sm' : 'text-base'
          }`}
        >
          {product.name}
        </h4>

        {/* Stars + review count */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <StarRating rating={product.rating} />
          <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
        </div>

        {/* Price row */}
        <div className="flex items-baseline gap-2 mt-auto">
          <span className="font-serif text-lg font-bold text-[#7c1c2c]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          {product.discount && (
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* COD / Delivery tag */}
        {product.codAvailable && (
          <span className="mt-2 text-[9px] text-gray-400 uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            COD Available
          </span>
        )}
      </Link>
    </div>
  );
}
