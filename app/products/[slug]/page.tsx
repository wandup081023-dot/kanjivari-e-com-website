'use client';
import { use, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts, formatPrice } from '@/lib/data';
import { useCartStore } from '@/store/cartStore';
import ProductCard from '@/components/products/ProductCard';

export default function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const handleAddToCart = () => {
    addItem(product, 1);
    openCart();
  };

  const relatedProducts = getRelatedProducts(product);

  const toggleTab = (tab: string) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  return (
    <div className="flex-grow pt-8 md:pt-16 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-max-width mx-auto w-full">
      {/* Breadcrumbs */}
      <div className="mb-8 font-label-caps text-label-caps text-on-surface-variant flex items-center gap-2">
        <Link className="hover:text-primary transition-colors" href="/">Home</Link>
        <span className="text-surface-dim">|</span>
        <Link className="hover:text-primary transition-colors capitalize" href={`/collections/${product.collectionSlug}`}>
          {product.collectionSlug.replace(/-/g, ' ')}
        </Link>
        <span className="text-surface-dim">|</span>
        <span className="text-primary">{product.name}</span>
      </div>

      {/* Product PDP Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-16 items-start">
        {/* Left: Gallery Section */}
        <div className="col-span-1 lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 h-[600px] lg:h-[800px] lg:sticky lg:top-28">
          {/* Thumbnails Track */}
          <div className="hidden md:flex flex-col gap-4 overflow-y-auto thumb-scroll pr-2 w-24 shrink-0">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImgIdx(idx)}
                className={`aspect-[4/5] w-full relative overflow-hidden bg-surface-container-low transition-all ${
                  activeImgIdx === idx ? 'gold-border opacity-100' : 'border border-surface-variant opacity-60 hover:opacity-100'
                }`}
              >
                <img alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" src={img} />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full h-full relative bg-surface-container-low overflow-hidden group">
            <img 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src={product.images[activeImgIdx]} 
            />
            
            {/* Floating Tags */}
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              <span className="inline-flex items-center px-3 py-1 bg-surface-container-lowest/80 backdrop-blur-md border border-[#c5a059] font-label-caps text-label-caps text-primary shadow-sm">
                Handcrafted
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-surface-container-lowest/80 backdrop-blur-md border border-surface-variant font-label-caps text-label-caps text-on-surface-variant shadow-sm">
                22K Gold
              </span>
            </div>
          </div>
        </div>

        {/* Right: Info & Actions */}
        <div className="col-span-1 lg:col-span-5 flex flex-col pt-4 lg:pt-12">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4 leading-tight">
            {product.name}
          </h1>
          <div className="font-price-display text-price-display gold-text mb-8 flex items-center gap-4">
            {formatPrice(product.price)}
            {product.originalPrice && (
              <span className="text-on-surface-variant line-through text-sm opacity-60">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <div className="mb-10 font-body-lg text-body-lg text-on-surface-variant font-light leading-relaxed">
            {product.description}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-surface-variant mb-10"></div>

          {/* Material Selection */}
          <div className="mb-10">
            <span className="block font-label-caps text-label-caps text-primary mb-4">Material</span>
            <div className="flex gap-4">
              <button aria-label="Antique Gold" className="w-12 h-12 rounded-full border-2 border-[#c5a059] bg-[#dfc699] relative flex items-center justify-center transition-transform hover:scale-105">
                <span className="absolute inset-1 rounded-full border border-white/30"></span>
              </button>
              <button aria-label="Sterling Silver" className="w-12 h-12 rounded-full border border-surface-variant bg-[#e6e8e6] relative flex items-center justify-center transition-transform hover:scale-105 opacity-60">
                <span className="absolute inset-1 rounded-full border border-white/50"></span>
              </button>
            </div>
          </div>

          {/* CTA Button */}
          <button 
            onClick={handleAddToCart}
            className="w-full bg-primary-container text-surface-container-lowest font-label-caps text-label-caps py-5 px-8 uppercase tracking-[0.1em] hover:bg-primary transition-colors duration-300 flex justify-center items-center gap-3 mb-12"
          >
            Add to Heritage Collection
            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
          </button>

          {/* Expandable Details (Accordion) */}
          <div className="border-t border-surface-variant">
            <div onClick={() => toggleTab('craftsmanship')} className="border-b border-surface-variant py-5 flex justify-between items-center cursor-pointer group">
              <span className="font-label-caps text-label-caps text-primary group-hover:text-primary-container transition-colors">Craftsmanship</span>
              <span className={`material-symbols-outlined text-primary font-light transition-transform duration-300 ${activeTab === 'craftsmanship' ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </div>
            {activeTab === 'craftsmanship' && (
              <div className="py-4 font-body-md text-body-md text-on-surface-variant font-light">
                Each piece takes hours to create, utilizing traditional Nakasi techniques passed down through specialized artisan families in Jaipur.
              </div>
            )}

            <div onClick={() => toggleTab('specs')} className="border-b border-surface-variant py-5 flex justify-between items-center cursor-pointer group">
              <span className="font-label-caps text-label-caps text-primary group-hover:text-primary-container transition-colors">Specifications</span>
              <span className="material-symbols-outlined text-primary font-light">
                {activeTab === 'specs' ? 'remove' : 'add'}
              </span>
            </div>
            {activeTab === 'specs' && (
              <div className="py-4 font-body-md text-body-md text-on-surface-variant font-light">
                Dimensions: H: 5cm, W: 2.5cm.<br />
                Weight: 45g.<br />
                Material: 22K Gold plating over brass.
              </div>
            )}

            <div onClick={() => toggleTab('styling')} className="border-b border-surface-variant py-5 flex justify-between items-center cursor-pointer group">
              <span className="font-label-caps text-label-caps text-primary group-hover:text-primary-container transition-colors">Styling Guide</span>
              <span className="material-symbols-outlined text-primary font-light">
                {activeTab === 'styling' ? 'remove' : 'add'}
              </span>
            </div>
            {activeTab === 'styling' && (
              <div className="py-4 font-body-md text-body-md text-on-surface-variant font-light">
                Perfect for festive occasions and weddings. Pair with traditional silk sarees or modern fusion wear for a complete royal look.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="h-section-gap"></div>

      {/* Complete the Look */}
      {relatedProducts.length > 0 && (
        <section className="w-full">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-primary">Complete the Look</h2>
            <Link className="font-label-caps text-label-caps text-primary border-b border-primary pb-1 hover:text-primary-container transition-colors" href={`/collections/${product.collectionSlug}`}>
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {relatedProducts.slice(0, 3).map((related) => (
              <Link key={related.id} href={`/products/${related.slug}`} className="group flex flex-col gap-4">
                <div className="aspect-[4/5] bg-surface-container-low overflow-hidden relative">
                  <img 
                    alt={related.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    src={related.images[0]}
                  />
                </div>
                <div className="flex flex-col items-center text-center">
                  <h3 className="font-headline-sm text-[20px] text-primary mb-1">{related.name}</h3>
                  <span className="font-price-display text-[16px] text-on-surface-variant">{formatPrice(related.price)}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
