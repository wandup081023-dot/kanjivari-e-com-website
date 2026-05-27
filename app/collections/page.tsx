'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { COLLECTIONS, Collection } from '@/lib/data';

// ─── Animation Variants ────────────────────────────────────────────────────
const EASE_LUXURY = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.65,
      ease: EASE_LUXURY,
    },
  }),
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_LUXURY },
  },
};

// ─── Collection Card ───────────────────────────────────────────────────────
function CollectionCard({ collection, index }: { collection: Collection; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={fadeUpVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <Link href={`/collections/${collection.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-sm shadow-[0_4px_30px_rgba(74,4,4,0.05)] bg-surface-container">
          {/* Image container with overlay */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.07 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Image
                src={collection.banner}
                alt={collection.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="object-cover"
                priority={index < 3}
              />
            </motion.div>

            {/* Gradient overlay — always present, deepens on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Featured badge */}
            {collection.featured && (
              <div className="absolute top-4 left-4">
                <span className="glass-panel px-3 py-1 gold-border rounded-sm flex items-center gap-1 font-body-md text-[10px] uppercase tracking-widest text-primary">
                  <Sparkles size={9} />
                  Featured
                </span>
              </div>
            )}

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              {/* Product count pill */}
              <span className="font-label-caps text-label-caps text-surface-variant/80 uppercase tracking-widest block mb-2">
                {collection.productCount}+ pieces
              </span>

              <h3 className="font-headline-sm text-headline-sm text-surface-container-lowest mb-1">
                {collection.name}
              </h3>

              <p className="font-body-md text-body-md text-surface-container-lowest/80 line-clamp-2 leading-relaxed mb-4">
                {collection.description}
              </p>

              {/* CTA */}
              <div className="flex items-center gap-2 text-[#c5a059] font-label-caps text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <span>Explore Collection</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                >
                  <ArrowRight size={13} />
                </motion.span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Decorative Ornament ──────────────────────────────────────────────────
function GoldOrnament() {
  return (
    <div className="gold-divider my-0 w-32 mx-auto">
      <span className="text-gold text-lg shrink-0">✦</span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function CollectionsPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-warm-white">
      {/* ── Hero Header ─────────────────────────────────────────────── */}
      <section className="relative pt-8 pb-16 overflow-hidden luxury-pattern">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-champagne/40 via-warm-white/80 to-warm-white pointer-events-none" />

        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-champagne/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-blush/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            ref={headerRef}
            variants={headerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Section label */}
            <div className="section-label justify-center mb-4">
              <span className="text-gold">✦</span>
              <span>Our Curated Collections</span>
              <span className="text-gold">✦</span>
            </div>

            {/* Main title */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-ink mb-5 leading-tight">
              Discover Our{' '}
              <span className="italic text-maroon">Collections</span>
            </h1>

            <GoldOrnament />

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg text-ink-light/70 max-w-2xl mx-auto leading-relaxed">
              Each collection tells a story of India's rich jewelry heritage — from sacred temple 
              traditions to modern Instagram trends. Find the perfect jhumka for every moment 
              and mood.
            </p>

            {/* Stats row */}
            <div className="flex items-center justify-center gap-8 mt-10">
              {[
                { value: '6', label: 'Collections' },
                { value: '138+', label: 'Unique Pieces' },
                { value: '10K+', label: 'Happy Customers' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif text-2xl sm:text-3xl font-semibold text-maroon">{stat.value}</p>
                  <p className="text-xs text-ink-light/60 uppercase tracking-widest mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Collection Grid ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
        >
          {COLLECTIONS.map((collection, index) => (
            <CollectionCard key={collection.id} collection={collection} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col items-center gap-4">
            <p className="text-sm text-ink-light/60 font-medium">
              Can't find what you're looking for?
            </p>
            <Link
              href="/products"
              className="btn-luxury btn-outline px-8 py-3.5 rounded-full"
            >
              Browse All Products
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Why Kanjivaram Banner ─────────────────────────────────────── */}
      <section className="bg-gradient-maroon py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10"
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-ivory mb-3">
              The Kanjivaram Promise
            </h2>
            <p className="text-champagne/70 text-sm max-w-xl mx-auto">
              Every piece crafted with devotion, every delivery wrapped with care.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: '🏺', title: 'Handcrafted', desc: 'By master artisans' },
              { icon: '✨', title: 'Hallmarked', desc: 'Certified quality' },
              { icon: '📦', title: 'Free Shipping', desc: 'On orders ₹999+' },
              { icon: '💛', title: 'Easy Returns', desc: '7-day hassle-free' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-3xl mb-1">{item.icon}</span>
                <h4 className="font-serif text-lg text-champagne font-medium">{item.title}</h4>
                <p className="text-[11px] text-champagne/60 uppercase tracking-wider">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
