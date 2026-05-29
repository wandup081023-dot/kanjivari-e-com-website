'use client';

import { useRef } from 'react';
import Link from 'next/link';
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
      className="group"
    >
      <Link href={`/collections/${collection.slug}`} className="block">
        {/* Card wrapper */}
        <div className="relative overflow-hidden rounded-2xl shadow-card bg-[#1a1410] aspect-[4/5]">

          {/* Background image — native img, no fill needed */}
          <img
            src={collection.banner}
            alt={collection.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Always-on dark gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

          {/* Deeper overlay on hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Featured badge */}
          {collection.featured && (
            <div className="absolute top-4 left-4 z-10">
              <span className="flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                <Sparkles size={9} className="text-[#c9a84c]" />
                Featured
              </span>
            </div>
          )}

          {/* Product count badge — top right */}
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-[#c9a84c]/90 backdrop-blur-sm text-[#1a1410] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
              {collection.productCount}+ pieces
            </span>
          </div>

          {/* Bottom text content */}
          <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
            {/* Collection name */}
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white mb-1.5 leading-tight drop-shadow-sm">
              {collection.name}
            </h3>

            {/* Description — always visible */}
            <p className="text-white/75 text-xs leading-relaxed line-clamp-2 mb-4">
              {collection.description}
            </p>

            {/* CTA button */}
            <div className="flex items-center gap-2 translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-[#c9a84c] text-[11px] font-bold uppercase tracking-[0.15em]">
                Explore Collection
              </span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="text-[#c9a84c]"
              >
                <ArrowRight size={13} />
              </motion.span>
            </div>

            {/* Bottom divider line that grows on hover */}
            <div className="h-px bg-white/20 mt-3 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
          </div>
        </div>

        {/* Card label below — always visible, not overlaid */}
        <div className="mt-3 px-1 flex items-center justify-between">
          <span className="font-serif text-[#1a1410] font-semibold text-sm group-hover:text-[#6b1c2a] transition-colors duration-200">
            {collection.name}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#a07a2c] font-bold">
            {collection.productCount}+ pcs
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function CollectionsPage() {
  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-[#faf8f5]">

      {/* ── Hero Header ─────────────────────────────────────────────── */}
      <section className="relative pt-10 pb-14 overflow-hidden">
        {/* Warm gradient bg */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7e7ce]/50 via-[#faf8f5]/80 to-[#faf8f5] pointer-events-none" />
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#f7e7ce]/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-[#f2d9d4]/30 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            ref={headerRef}
            variants={headerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow label */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="text-[#c9a84c] text-base">✦</span>
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#a07a2c]">
                Our Curated Collections
              </span>
              <span className="text-[#c9a84c] text-base">✦</span>
            </div>

            {/* Main title */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-[#1a1410] mb-5 leading-tight">
              Discover Our{' '}
              <span className="italic text-[#6b1c2a]">Collections</span>
            </h1>

            {/* Gold divider */}
            <div className="flex items-center justify-center gap-3 my-5">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9a84c]" />
              <span className="text-[#c9a84c] text-lg">✦</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9a84c]" />
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#3d2b1f]/60 max-w-2xl mx-auto leading-relaxed">
              Each collection tells a story of India&apos;s rich jewelry heritage — from sacred temple
              traditions to modern Instagram trends. Find the perfect jhumka for every moment and mood.
            </p>

            {/* Stats row */}
            <div className="flex items-center justify-center gap-10 mt-10">
              {[
                { value: '6', label: 'Collections' },
                { value: '138+', label: 'Unique Pieces' },
                { value: '10K+', label: 'Happy Customers' },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center relative">
                  {i > 0 && (
                    <div className="absolute -left-5 top-1/2 -translate-y-1/2 h-8 w-px bg-[#c9a84c]/30" />
                  )}
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#6b1c2a]">{stat.value}</p>
                  <p className="text-[10px] text-[#3d2b1f]/50 uppercase tracking-widest mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Collection Grid ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-[#e8c99a]/50" />
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#a07a2c]">
            All Collections
          </span>
          <div className="h-px flex-1 bg-[#e8c99a]/50" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
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
            <p className="text-sm text-[#3d2b1f]/50 font-medium">
              Can&apos;t find what you&apos;re looking for?
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-[#6b1c2a] text-[#6b1c2a] font-bold text-sm uppercase tracking-widest hover:bg-[#6b1c2a] hover:text-white transition-all duration-300"
            >
              Browse All Products
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Kanjivaram Promise Banner ──────────────────────────────── */}
      <section className="bg-gradient-to-r from-[#4a1018] to-[#6b1c2a] py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10"
          >
            <h2 className="font-serif text-3xl sm:text-4xl text-[#f7e7ce] mb-3">
              The Kanjivaram Promise
            </h2>
            <p className="text-[#f7e7ce]/60 text-sm max-w-xl mx-auto">
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
                <h4 className="font-serif text-lg text-[#f7e7ce] font-medium">{item.title}</h4>
                <p className="text-[11px] text-[#f7e7ce]/50 uppercase tracking-wider">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
