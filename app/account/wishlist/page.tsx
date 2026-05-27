'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useWishlistStore } from '@/store/wishlistStore';
import { PRODUCTS, formatPrice } from '@/lib/data';
import ProductCard from '@/components/products/ProductCard';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

export default function WishlistPage() {
  const { items, clear, toggle } = useWishlistStore();
  const wishlistedProducts = PRODUCTS.filter((p) => items.includes(p.id));

  return (
    <div className="min-h-screen bg-warm-white pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="section-label mb-2">My Account</p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl text-maroon-deep font-semibold flex items-center gap-3">
                <Heart className="text-maroon fill-maroon/20" size={32} />
                Wishlist
                {wishlistedProducts.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="font-sans text-base font-normal text-gray-400 ml-2"
                  >
                    ({wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'item' : 'items'})
                  </motion.span>
                )}
              </h1>
              <p className="text-gray-500 text-sm mt-2">
                Your curated collection of Kanjivaram treasures
              </p>
            </div>
            {wishlistedProducts.length > 0 && (
              <motion.button
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                onClick={clear}
                className="flex items-center gap-2 text-sm text-rose-500 hover:text-rose-700 font-medium px-4 py-2 rounded-xl border border-rose-100 hover:bg-rose-50 transition-all duration-200"
              >
                <Trash2 size={15} />
                Clear Wishlist
              </motion.button>
            )}
          </div>

          {/* Decorative divider */}
          <div className="flex items-center gap-3 mt-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-champagne-dark to-transparent" />
            <span className="text-gold text-xs">✦</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-champagne-dark to-transparent" />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {wishlistedProducts.length === 0 ? (
            /* ──── EMPTY STATE ──── */
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              {/* Decorative heart */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="relative mb-8"
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-rose-50 to-blush flex items-center justify-center shadow-luxury">
                  <Heart size={52} className="text-rose-300" strokeWidth={1.5} />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                  className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-champagne flex items-center justify-center"
                >
                  <Sparkles size={14} className="text-gold" />
                </motion.div>
              </motion.div>

              <h2 className="font-serif text-3xl text-maroon-deep font-semibold mb-3">
                Your Wishlist is Empty
              </h2>
              <p className="text-gray-400 text-base max-w-md mb-8 leading-relaxed">
                Discover handcrafted jhumkas that speak to your soul. Save your favourites here and
                revisit them anytime.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/collections"
                  className="btn-luxury btn-primary flex items-center gap-2 px-8 py-3 rounded-2xl"
                >
                  <ShoppingBag size={16} />
                  Browse Collections
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/"
                  className="btn-luxury btn-outline flex items-center gap-2 px-8 py-3 rounded-2xl border-champagne-dark text-ink-light hover:bg-champagne/30"
                >
                  Back to Home
                </Link>
              </div>

              {/* Suggestion strip */}
              <div className="mt-16 w-full max-w-2xl">
                <p className="text-xs uppercase tracking-widest text-gold-dark font-medium mb-6">
                  You Might Love These
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {PRODUCTS.slice(0, 4).map((product, i) => (
                    <motion.div
                      key={product.id}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={fadeUp}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* ──── PRODUCT GRID ──── */
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Summary bar */}
              <div className="flex items-center justify-between bg-champagne/30 rounded-2xl px-5 py-3 mb-6 border border-champagne-dark/20">
                <p className="text-sm text-ink-light">
                  <span className="font-semibold text-maroon">{wishlistedProducts.length} pieces</span> saved to your wishlist
                </p>
                <p className="text-xs text-gray-400">
                  Total value:{' '}
                  <span className="text-maroon font-semibold font-serif text-sm">
                    {formatPrice(wishlistedProducts.reduce((sum, p) => sum + p.price, 0))}
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                <AnimatePresence>
                  {wishlistedProducts.map((product, i) => (
                    <motion.div
                      key={product.id}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                      variants={fadeUp}
                      layout
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 text-center"
              >
                <p className="text-gray-400 text-sm mb-4">Discover more handcrafted treasures</p>
                <Link
                  href="/collections"
                  className="btn-luxury btn-outline-gold inline-flex items-center gap-2 px-8 py-3 rounded-2xl"
                >
                  <ShoppingBag size={16} />
                  Continue Shopping
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
