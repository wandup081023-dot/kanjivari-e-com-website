import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';
import { PRODUCTS } from '@/lib/data';

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <>
      <section className="relative w-full h-[870px] md:h-[921px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            alt="Cinematic high-end Indian bridal model wearing ornate gold jhumkas." 
            className="w-full h-full object-cover object-center" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2-WJgTaxwej83wBnQe7s8d-PmJ_DBK7W4le4QUw-IJM7cObZCNeSU9kNJEFUXEiG891TBJ-PLgtUCv5kdt_c2MyP02Ih2NBBxvoWG20MvAeqyuoAGiUbpA3UN3ehjhdqEHTDEt0Z_8hi7fp95X3QtpwzIxHNQxAAVKnoP2XxqbuVNsPzKi7MC3IK4-8_3JNNgN7S60BcezSg3d1ytQF6L6tThu8CVvdtmk3QwkupBdF1fkA4wIeau4_e5_EAXhyyxmVZnHxlnadNn"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-primary/10"></div>
        </div>
        <div className="relative z-10 text-center text-surface-container-lowest px-4 max-w-3xl mx-auto flex flex-col items-center gap-6">
          <span className="font-label-caps text-label-caps tracking-[0.2em] uppercase text-surface-variant/80 border-b border-surface-variant/30 pb-2">Artisanal Heritage</span>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-surface-container-lowest drop-shadow-lg">The Heritage of Elegance</h1>
          <p className="font-body-md text-body-md text-surface-variant/90 max-w-lg mx-auto mt-2">Discover masterpieces forged in tradition, designed for the modern royal.</p>
          <Link className="mt-8 bg-primary-container text-on-primary font-label-caps text-label-caps uppercase px-10 py-4 tracking-[0.1em] hover:bg-primary transition-colors duration-300 rounded-sm" href="/products">
            Explore the Collection
          </Link>
        </div>
      </section>

      <section className="py-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-max-width mx-auto" id="collections">
        <div className="text-center mb-16">
          <h2 className="font-headline-md text-headline-md text-primary mb-4">Curated Edits</h2>
          <div className="w-12 h-px bg-secondary mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter auto-rows-[400px] md:auto-rows-[300px]">
          {/* The Bridal Edit (Large Span) */}
          <Link href="/collections/bridal-jhumkas" className="group relative col-span-1 md:col-span-8 row-span-1 md:row-span-2 overflow-hidden bg-surface-container flex items-end">
            <img 
              alt="Elaborate bridal necklace set." 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcWKxoI-Zd8fXAB2SYRlbdxlZ7Ihx8aw2OO3Sigr9kkbrkzE8hGjdYo027UUzBinM8gsKXThUCS4OE4uddW5bWipxzaGq3m2EL5PRz3PgeG2yCJUJLkp0_fiPqvr0bqpvimLFpikp1EnyN8Ee6e3vVqVQ5UHub3yPYTYJ076tn8bCW-zcDSFm_jD5Xs_guGnDeERtCvOGS68WU_B45NRQp0XXsvGZsn1UnKlaeaSuJWIvNeeoRBFXC3IBcW_bFcrG_bfUrTUd4FjtY"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-80"></div>
            <div className="relative z-10 p-8 w-full flex justify-between items-end">
              <div>
                <span className="font-label-caps text-label-caps text-surface-variant uppercase tracking-widest block mb-2">Collection</span>
                <h3 className="font-headline-sm text-headline-sm text-surface-container-lowest">The Bridal Edit</h3>
              </div>
              <div className="w-10 h-10 rounded-full border border-surface-variant/50 flex items-center justify-center text-surface-container-lowest backdrop-blur-sm group-hover:bg-surface-container-lowest group-hover:text-primary transition-all">
                <span className="material-symbols-outlined font-light">arrow_forward</span>
              </div>
            </div>
          </Link>
          {/* Temple Jewelry */}
          <Link href="/collections/temple-jewelry" className="group relative col-span-1 md:col-span-4 row-span-1 overflow-hidden bg-surface-container flex items-end">
            <img 
              alt="Traditional temple jewelry detail." 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHlmErvIKdvvSiioqronOuR3Hit6OXUq891VQ3-iffncM0rYnGfEhdc0nS_Q-ydvbgVsiFs1OMUNkgkGStDqoczsJcJRryf6iVD8OsqNhzz9tSXyPxRCe3QrInn53rghVW7mF_cTREyEm30Kz2J9KtzwpggO3oJiPr3D5B9uPbigBXhYrEQamK9BFh_dPIhSHmqoAxWmr5s46-N_j6-B5rRVLyaSvQO-0FWvekCgORWH0kBKhQj54I_hoxEM__wNEcjmy7ido_rbrw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-80"></div>
            <div className="relative z-10 p-6 w-full">
              <h3 className="font-headline-sm text-headline-sm text-surface-container-lowest mb-1">Temple Jewelry</h3>
              <span className="font-label-caps text-label-caps text-surface-variant/80 uppercase">Sacred Motifs</span>
            </div>
          </Link>
          {/* Everyday Luxury */}
          <Link href="/collections/everyday-elegance" className="group relative col-span-1 md:col-span-4 row-span-1 overflow-hidden bg-surface-container flex items-end">
            <img 
              alt="Minimalist gold rings and bracelets." 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-LLzF9z841J-7qHe4HmfffxiJxP8VAJVS0FMc1bRwLCq6kcJQJyrwLWybppfG0p34JMJOHH3dZZxipaH3FvtrdFdI1_IURsk6Qcw3rm85U1ppzCpIpawB2dd7aGKs59_jUqt_bS2XgglEtXKBpu5wLB-uXVk2YqIozuV5uF1O5FiCBTKIv81yfBMHgApa2t66iPOZch06DRQH-sCpfmpLh1QuEx_n-9yLN-kENR9b_c-NGEnAprxSckHMWmH47JXVSrZtp9KSdrie"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-80"></div>
            <div className="relative z-10 p-6 w-full">
              <h3 className="font-headline-sm text-headline-sm text-surface-container-lowest mb-1">Everyday Luxury</h3>
              <span className="font-label-caps text-label-caps text-surface-variant/80 uppercase">Modern Classics</span>
            </div>
          </Link>
        </div>
      </section>

      <section className="py-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-max-width mx-auto bg-surface-container-low/50">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary">Masterpieces</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">Exquisite pieces defining our legacy.</p>
          </div>
          <Link href="/products" className="hidden md:inline-flex items-center gap-2 font-label-caps text-label-caps text-primary border-b border-primary pb-1 hover:text-on-secondary-container transition-colors">
            View All <span className="material-symbols-outlined text-sm">east</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link href="/products" className="inline-block border border-primary text-primary font-label-caps text-label-caps px-8 py-3 uppercase">
            View All Masterpieces
          </Link>
        </div>
      </section>
    </>
  );
}
