'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  X,
  Star,
  ArrowLeft,
  LayoutGrid,
  LayoutList,
  Search,
} from 'lucide-react';

import ProductCard from '@/components/products/ProductCard';
import {
  PRODUCTS,
  getProductsByCollection,
  getCollectionBySlug,
  formatPrice,
  Product,
  Collection,
} from '@/lib/data';

// ─── Types ─────────────────────────────────────────────────────────────────
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

interface FilterState {
  priceMin: number;
  priceMax: number;
  minRating: number;
  sortBy: SortOption;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
];

const PRICE_BOUNDS = { min: 0, max: 1000 };
const RATING_OPTIONS = [4.5, 4, 3.5, 3];

const EASE_LUXURY = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_LUXURY } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.25 } },
};

// ─── Price Slider ──────────────────────────────────────────────────────────
function PriceSlider({ min, max, value, onChange }: {
  min: number; max: number;
  value: [number, number];
  onChange: (v: [number, number]) => void;
}) {
  const leftPct = ((value[0] - min) / (max - min)) * 100;
  const rightPct = ((value[1] - min) / (max - min)) * 100;
  return (
    <div className="space-y-3">
      <div className="relative h-6 flex items-center">
        <div className="absolute w-full h-1 bg-beige rounded-full" />
        <div className="absolute h-1 bg-gold rounded-full" style={{ left: `${leftPct}%`, right: `${100 - rightPct}%` }} />
        <input type="range" min={min} max={max} step={50} value={value[0]}
          onChange={e => { const v = Math.min(Number(e.target.value), value[1] - 100); onChange([v, value[1]]); }}
          className="absolute w-full h-1 appearance-none bg-transparent cursor-pointer" style={{ zIndex: value[0] > max - 100 ? 5 : 3 }} />
        <input type="range" min={min} max={max} step={50} value={value[1]}
          onChange={e => { const v = Math.max(Number(e.target.value), value[0] + 100); onChange([value[0], v]); }}
          className="absolute w-full h-1 appearance-none bg-transparent cursor-pointer" style={{ zIndex: 4 }} />
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-maroon">{formatPrice(value[0])}</span>
        <span className="font-medium text-maroon">{formatPrice(value[1])}</span>
      </div>
    </div>
  );
}

// ─── Filter Panel ──────────────────────────────────────────────────────────
function FilterPanel({ filters, onChange, onReset, productCount }: {
  filters: FilterState;
  onChange: (f: Partial<FilterState>) => void;
  onReset: () => void;
  productCount: number;
}) {
  const [priceOpen, setPriceOpen] = useState(true);
  const [ratingOpen, setRatingOpen] = useState(true);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-xl font-semibold text-ink">Filters</h3>
        <button onClick={onReset} className="text-xs text-maroon font-semibold underline">Reset All</button>
      </div>
      <p className="text-xs text-gray-400">Showing <span className="font-semibold text-maroon">{productCount}</span> results</p>
      <div className="h-px bg-beige" />

      {/* Price */}
      <div>
        <button onClick={() => setPriceOpen(v => !v)} className="w-full flex items-center justify-between text-sm font-semibold text-ink mb-3">
          <span>Price Range</span>
          {priceOpen ? <ChevronUp size={16} className="text-gold" /> : <ChevronDown size={16} className="text-gold" />}
        </button>
        <AnimatePresence initial={false}>
          {priceOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <PriceSlider min={PRICE_BOUNDS.min} max={PRICE_BOUNDS.max} value={[filters.priceMin, filters.priceMax]} onChange={([mn, mx]) => onChange({ priceMin: mn, priceMax: mx })} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="h-px bg-beige" />

      {/* Rating */}
      <div>
        <button onClick={() => setRatingOpen(v => !v)} className="w-full flex items-center justify-between text-sm font-semibold text-ink mb-3">
          <span>Minimum Rating</span>
          {ratingOpen ? <ChevronUp size={16} className="text-gold" /> : <ChevronDown size={16} className="text-gold" />}
        </button>
        <AnimatePresence initial={false}>
          {ratingOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${filters.minRating === 0 ? 'border-maroon bg-maroon' : 'border-beige'}`}>
                  {filters.minRating === 0 && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <span className="text-sm text-ink-light">Any rating</span>
                <input type="radio" className="sr-only" checked={filters.minRating === 0} onChange={() => onChange({ minRating: 0 })} />
              </label>
              {RATING_OPTIONS.map(r => (
                <label key={r} className="flex items-center gap-3 cursor-pointer">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${filters.minRating === r ? 'border-maroon bg-maroon' : 'border-beige'}`}>
                    {filters.minRating === r && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <input type="radio" className="sr-only" checked={filters.minRating === r} onChange={() => onChange({ minRating: r })} />
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(s => <Star key={s} size={11} className={s <= Math.floor(r) ? 'star-filled' : 'star-empty'} />)}
                    <span className="text-xs text-ink-light ml-1">{r}+</span>
                  </div>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="h-px bg-beige" />

      {/* Sort */}
      <div>
        <p className="text-sm font-semibold text-ink mb-3">Sort By</p>
        <div className="space-y-2">
          {SORT_OPTIONS.map(opt => (
            <label key={opt.value} className="flex items-center gap-3 cursor-pointer">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${filters.sortBy === opt.value ? 'border-maroon bg-maroon' : 'border-beige'}`}>
                {filters.sortBy === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <input type="radio" className="sr-only" checked={filters.sortBy === opt.value} onChange={() => onChange({ sortBy: opt.value })} />
              <span className="text-sm text-ink-light">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Hero Banner ───────────────────────────────────────────────────────────
function CollectionHero({ collection }: { collection: Collection }) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: bannerRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  return (
    <section ref={bannerRef} className="relative h-[55vh] sm:h-[65vh] overflow-hidden">
      {/* Parallax image — native img fixes the fill+static-parent bug */}
      <motion.div className="absolute inset-0" style={{ y, scale: 1.15 }}>
        <img
          src={collection.banner}
          alt={collection.name}
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Multi-layer gradient for rich depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

      {/* Subtle vignette */}
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)' }}
      />

      {/* Decorative top-right gold ornament */}
      <div className="absolute top-6 right-8 hidden sm:flex items-center gap-2 opacity-50">
        <div className="h-px w-16 bg-[#c9a84c]" />
        <span className="text-[#c9a84c] text-xl">✦</span>
        <div className="h-px w-16 bg-[#c9a84c]" />
      </div>

      {/* Main content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-12 px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Breadcrumb with pill background for readability */}
          <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <Link href="/" className="text-white/60 text-[11px] uppercase tracking-widest hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-[#c9a84c] text-[10px]">›</span>
            <Link href="/collections" className="text-white/60 text-[11px] uppercase tracking-widest hover:text-white transition-colors">
              Collections
            </Link>
            <span className="text-[#c9a84c] text-[10px]">›</span>
            <span className="text-white text-[11px] uppercase tracking-widest font-semibold">
              {collection.name}
            </span>
          </div>

          {/* Gold eyebrow label */}
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-[#c9a84c]" />
            <p className="text-[#c9a84c] text-[11px] tracking-[0.35em] uppercase font-bold">
              {collection.productCount}+ Handcrafted Pieces
            </p>
          </div>

          {/* Collection name — large, elegant serif */}
          <h1
            className="font-serif font-semibold text-white leading-[1.1] mb-4 drop-shadow-2xl"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            {collection.name}
          </h1>

          {/* Description with left gold border accent */}
          <div className="flex items-start gap-3 max-w-xl">
            <div className="w-0.5 h-full min-h-[2.5rem] bg-[#c9a84c] rounded-full shrink-0 mt-0.5" />
            <p className="text-white/75 text-sm sm:text-base leading-relaxed">
              {collection.description}
            </p>
          </div>

          {/* CTA row */}
          <div className="flex items-center gap-4 mt-7">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 text-white/60 text-xs uppercase tracking-widest hover:text-[#c9a84c] transition-colors duration-200"
            >
              <ArrowLeft size={13} />
              All Collections
            </Link>
            <div className="w-px h-4 bg-white/20" />
            <span className="text-white/40 text-xs uppercase tracking-widest">
              {collection.productCount}+ pieces available
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade into page background */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#faf8f5] to-transparent" />
    </section>
  );
}

// ─── Not Found ─────────────────────────────────────────────────────────────
function CollectionNotFound() {
  return (
    <div className="min-h-screen bg-warm-white flex flex-col items-center justify-center pt-8 px-6 text-center">
      <div className="text-6xl mb-6">💎</div>
      <h1 className="font-serif text-4xl font-light text-ink mb-3">Collection Not Found</h1>
      <p className="text-gray-500 mb-8">This collection doesn&apos;t exist or may have been moved.</p>
      <Link href="/collections" className="btn-luxury btn-primary rounded-full px-8 py-3.5 flex items-center gap-2">
        <ArrowLeft size={16} /> View All Collections
      </Link>
    </div>
  );
}

// ─── Sort Dropdown ─────────────────────────────────────────────────────────
function SortDropdown({ value, onChange }: { value: SortOption; onChange: (v: SortOption) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = SORT_OPTIONS.find(o => o.value === value)!;

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(v => !v)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-beige bg-white text-sm font-medium text-ink hover:border-gold transition-colors min-w-[180px] justify-between">
        <span>{current.label}</span>
        <ChevronDown size={14} className={`text-gold transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute right-0 mt-1.5 w-52 bg-white rounded-xl shadow-luxury-lg border border-beige overflow-hidden z-20"
          >
            {SORT_OPTIONS.map(opt => (
              <button key={opt.value} onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full text-left px-4 py-3 text-sm transition-colors ${opt.value === value ? 'bg-champagne text-maroon font-semibold' : 'text-ink hover:bg-warm-white'}`}>
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── List Product Card ─────────────────────────────────────────────────────
function ListProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="bg-white rounded-2xl p-4 flex gap-5 shadow-soft hover:shadow-card-hover transition-all group">
        <div className="w-28 h-28 rounded-xl overflow-hidden bg-ivory-deep shrink-0">
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="flex-1">
          <p className="text-[10px] text-gold-dark uppercase tracking-widest mb-1">{product.collectionSlug.replace(/-/g, ' ')}</p>
          <h3 className="font-serif text-lg font-medium text-ink group-hover:text-maroon transition-colors">{product.name}</h3>
          <p className="text-xs text-gray-400 mt-1 line-clamp-2">{product.description.slice(0, 100)}...</p>
          <div className="flex items-center justify-between mt-2">
            <span className="font-serif text-xl font-semibold text-maroon">{formatPrice(product.price)}</span>
            <span className="text-xs px-3 py-1.5 bg-maroon text-champagne rounded-full btn-luxury">View Details</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Main Page Component ───────────────────────────────────────────────────
export default function CollectionPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const collection = getCollectionBySlug(slug);
  const rawProducts = getProductsByCollection(slug);
  const allProducts = rawProducts.length > 0 ? rawProducts : PRODUCTS.slice(0, 4);

  const DEFAULT_FILTERS: FilterState = useMemo(() => ({
    priceMin: 0, priceMax: PRICE_BOUNDS.max, minRating: 0, sortBy: 'featured',
  }), []);

  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    document.body.style.overflow = mobileFilterOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileFilterOpen]);

  const updateFilters = useCallback((partial: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...partial }));
  }, []);

  const resetFilters = useCallback(() => setFilters(DEFAULT_FILTERS), [DEFAULT_FILTERS]);

  const filteredProducts = useMemo(() => {
    let list = allProducts.filter(p => {
      if (p.price < filters.priceMin || p.price > filters.priceMax) return false;
      if (filters.minRating > 0 && p.rating < filters.minRating) return false;
      return true;
    });
    switch (filters.sortBy) {
      case 'price-asc': list = [...list].sort((a, b) => a.price - b.price); break;
      case 'price-desc': list = [...list].sort((a, b) => b.price - a.price); break;
      case 'rating': list = [...list].sort((a, b) => b.rating - a.rating); break;
      case 'newest': list = [...list].reverse(); break;
    }
    return list;
  }, [allProducts, filters]);

  const hasActiveFilters = filters.priceMin > 0 || filters.priceMax < PRICE_BOUNDS.max || filters.minRating > 0 || filters.sortBy !== 'featured';

  if (!collection) return <CollectionNotFound />;

  return (
    <div className="min-h-screen bg-warm-white">
      <CollectionHero collection={collection} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <Link href="/collections" className="inline-flex items-center gap-1.5 text-xs text-gold-dark font-semibold uppercase tracking-wider hover:text-maroon transition-colors mb-2">
              <ArrowLeft size={13} /> All Collections
            </Link>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-ink">{collection.name}</h2>
            <p className="text-sm text-gray-400 mt-0.5">
              {filteredProducts.length} products {hasActiveFilters && <span className="text-maroon font-medium">(filtered)</span>}
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <button onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-beige bg-white text-sm font-medium hover:border-gold transition-colors">
              <SlidersHorizontal size={15} className="text-gold-dark" /> Filters
              {hasActiveFilters && <span className="w-4 h-4 rounded-full bg-maroon text-white text-[9px] font-bold flex items-center justify-center">!</span>}
            </button>
            <div className="hidden sm:flex items-center gap-1 border border-beige rounded-xl p-1 bg-white">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-champagne text-maroon' : 'text-gray-400'}`} aria-label="Grid view"><LayoutGrid size={15} /></button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-champagne text-maroon' : 'text-gray-400'}`} aria-label="List view"><LayoutList size={15} /></button>
            </div>
            <SortDropdown value={filters.sortBy} onChange={v => updateFilters({ sortBy: v })} />
          </div>
        </div>

        {/* Active filter chips */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs text-gray-400">Active:</span>
              {(filters.priceMin > 0 || filters.priceMax < PRICE_BOUNDS.max) && (
                <button onClick={() => updateFilters({ priceMin: 0, priceMax: PRICE_BOUNDS.max })}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne text-maroon text-xs font-semibold">
                  {formatPrice(filters.priceMin)} – {formatPrice(filters.priceMax)} <X size={11} />
                </button>
              )}
              {filters.minRating > 0 && (
                <button onClick={() => updateFilters({ minRating: 0 })}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne text-maroon text-xs font-semibold">
                  ★ {filters.minRating}+ <X size={11} />
                </button>
              )}
              {filters.sortBy !== 'featured' && (
                <button onClick={() => updateFilters({ sortBy: 'featured' })}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne text-maroon text-xs font-semibold">
                  {SORT_OPTIONS.find(o => o.value === filters.sortBy)?.label} <X size={11} />
                </button>
              )}
              <button onClick={resetFilters} className="text-xs text-maroon font-semibold underline ml-1">Clear all</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Layout */}
        <div className="flex gap-8 items-start">
          {/* Sidebar */}
          <motion.aside initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            className="hidden lg:block w-64 shrink-0 sticky top-24">
            <div className="bg-white rounded-2xl shadow-soft p-6 border border-beige/60">
              <FilterPanel filters={filters} onChange={updateFilters} onReset={resetFilters} productCount={filteredProducts.length} />
            </div>
          </motion.aside>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
                <Search size={32} className="text-gold-dark mb-4" />
                <h3 className="font-serif text-2xl text-ink mb-2">No Products Found</h3>
                <p className="text-gray-400 mb-6 text-sm">Try adjusting filters</p>
                <button onClick={resetFilters} className="btn-luxury btn-outline rounded-full px-8 py-3">Clear Filters</button>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${filters.priceMin}-${filters.priceMax}-${filters.minRating}-${filters.sortBy}`}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5' : 'flex flex-col gap-4'}
                >
                  {filteredProducts.map(product => (
                    <motion.div key={product.id} variants={cardVariants} layout>
                      {viewMode === 'grid' ? <ProductCard product={product} /> : <ListProductCard product={product} />}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" />
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-[85vw] max-w-sm bg-white z-50 lg:hidden overflow-y-auto shadow-luxury-lg"
            >
              <div className="sticky top-0 bg-white/95 border-b border-beige flex items-center justify-between px-5 py-4">
                <span className="font-serif text-lg font-semibold text-ink">Filters</span>
                <button onClick={() => setMobileFilterOpen(false)} className="w-8 h-8 rounded-full bg-warm-white flex items-center justify-center" aria-label="Close">
                  <X size={16} />
                </button>
              </div>
              <div className="p-5">
                <FilterPanel filters={filters} onChange={updateFilters} onReset={resetFilters} productCount={filteredProducts.length} />
              </div>
              <div className="sticky bottom-0 p-4 border-t border-beige bg-white">
                <button onClick={() => setMobileFilterOpen(false)} className="btn-luxury btn-primary w-full rounded-xl py-3 text-sm">
                  View {filteredProducts.length} Products
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
