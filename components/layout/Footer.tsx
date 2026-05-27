'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface-container-low text-primary font-body-md text-body-md border-t border-secondary/10 w-full py-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-max-width mx-auto flex flex-col gap-gutter">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
        <div className="col-span-1 md:col-span-5 flex flex-col items-start">
          <span className="font-display-lg text-headline-md text-primary mb-6">Kanjivaram</span>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
            Crafting heirlooms of tomorrow with the techniques of yesterday. A celebration of royal Indian aesthetics through modern luxury.
          </p>
        </div>
        <div className="col-span-1 md:col-span-3">
          <h4 className="font-label-caps text-label-caps text-primary uppercase mb-6 tracking-widest">Explore</h4>
          <ul className="flex flex-col gap-4">
            <li><Link href="/about#sustainability" className="text-on-surface-variant hover:text-primary transition-all hover:translate-x-1 duration-200 inline-block">Sustainability</Link></li>
            <li><Link href="/about" className="text-on-surface-variant hover:text-primary transition-all hover:translate-x-1 duration-200 inline-block">Bespoke Services</Link></li>
            <li><Link href="/contact" className="text-on-surface-variant hover:text-primary transition-all hover:translate-x-1 duration-200 inline-block">Store Locator</Link></li>
            <li><Link href="/privacy" className="text-on-surface-variant hover:text-primary transition-all hover:translate-x-1 duration-200 inline-block">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="col-span-1 md:col-span-4">
          <h4 className="font-label-caps text-label-caps text-primary uppercase mb-6 tracking-widest">The Inner Circle</h4>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6">Subscribe to receive exclusive access to limited collections and private events.</p>
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="relative group">
              <input 
                className="w-full bg-transparent border-0 border-b border-[#b18000]/30 py-3 focus:ring-0 focus:border-primary peer font-body-md text-primary placeholder-transparent" 
                id="email" 
                placeholder="Email Address" 
                required 
                type="email"
              />
              <label 
                className="absolute left-0 top-3 font-label-caps text-label-caps text-on-surface-variant transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-primary peer-valid:-top-4 peer-valid:text-[10px]" 
                htmlFor="email"
              >
                Email Address
              </label>
            </div>
            <button 
              className="bg-primary-container text-on-primary font-label-caps text-label-caps uppercase py-4 tracking-[0.1em] hover:bg-primary transition-colors duration-300 w-full md:w-auto mt-2" 
              type="submit"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-secondary/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-body-md text-[14px] text-on-surface-variant">© 2024 Kanjivaram. Artisanal Heritage Jewelry.</span>
        <div className="flex gap-6">
          <a className="text-on-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">camera_alt</span></a>
          <a className="text-on-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">play_circle</span></a>
        </div>
      </div>
    </footer>
  );
}
