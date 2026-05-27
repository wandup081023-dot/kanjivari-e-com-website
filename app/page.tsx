import Link from 'next/link';

export default function Home() {
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
          <a className="mt-8 bg-primary-container text-on-primary font-label-caps text-label-caps uppercase px-10 py-4 tracking-[0.1em] hover:bg-primary transition-colors duration-300 rounded-sm" href="#collections">
            Explore the Collection
          </a>
        </div>
      </section>

      <section className="py-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-max-width mx-auto" id="collections">
        <div className="text-center mb-16">
          <h2 className="font-headline-md text-headline-md text-primary mb-4">Curated Edits</h2>
          <div className="w-12 h-px bg-secondary mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter auto-rows-[400px] md:auto-rows-[300px]">
          {/* The Bridal Edit (Large Span) */}
          <Link href="/collections/bridal" className="group relative col-span-1 md:col-span-8 row-span-1 md:row-span-2 overflow-hidden bg-surface-container flex items-end">
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
          <Link href="/collections/everyday" className="group relative col-span-1 md:col-span-4 row-span-1 overflow-hidden bg-surface-container flex items-end">
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
          <Link href="/collections" className="hidden md:inline-flex items-center gap-2 font-label-caps text-label-caps text-primary border-b border-primary pb-1 hover:text-on-secondary-container transition-colors">
            View All <span className="material-symbols-outlined text-sm">east</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-12">
          {/* Product 1 */}
          <Link href="/products/mayuri-jhumkas" className="group cursor-pointer">
            <div className="relative aspect-[4/5] bg-surface-container overflow-hidden mb-6">
              <img 
                alt="Peacock motif Jhumkas" 
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB16nnETawpr3poCs8lNkIxOGM71zveaa5ii5SNhQsk7BLy-scKhnfy6jTZWDwxd9tOFJslF0vOgUOQ4uaxM06EPoKJRTW_PaWxYd1eDqGgU7Jw4urrOoKD5h5PVBxJasYusKm_Mo5kKfaJPt9sLHCtHarlyWkPW9kCEqx-C_-OxwF_ZsikxsH-jzV-Uj4BuNImEq263yjXK0HTEh6g2djCi4JUzSPiCjGK2puXiIkYgrF5zbRxVcZIhTYwOEyljqGWeXACoWY2bPq_"
              />
              <img 
                alt="Model wearing Jhumkas" 
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiXLvl80EM-l_CAfzSC0Dk1VfGk9i6SjSPP7knPU3qtTENbfItFsdc3lZDH77t1k2rlSVo6W8Mb1IIZXl7jAPy3L4kplvo7dob6fX9HmjLiKbwtmy_4S8oQ10lS0QyBuSDHMTD3Ib44h5xC4vZqKL_wkJ3rzxEd6JsLhhkUk5s6qJynIZIwWrOmJbratqpNOv3uCjhLQTjeN-Df53yW-N6itVxHwfx2JCnn6s1YO-a65XqF4Yal-tTTDwCeBwb38QrFLcLrAEu6ypC"
              />
              <div className="absolute top-4 left-4 glass-panel px-3 py-1 gold-border rounded-sm">
                <span className="font-body-md text-[10px] uppercase tracking-widest text-primary">Heritage</span>
              </div>
            </div>
            <div className="text-center flex flex-col items-center">
              <h4 className="font-headline-sm text-lg text-primary mb-2">Mayuri Jhumkas</h4>
              <span className="font-price-display text-price-display text-on-surface-variant">₹499</span>
            </div>
          </Link>
          
          {/* Product 2 */}
          <Link href="/products/nizam-kundan-choker" className="group cursor-pointer">
            <div className="relative aspect-[4/5] bg-surface-container overflow-hidden mb-6">
              <img 
                alt="Kundan Choker" 
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWyJs7Ziuq3lleTQ-p3hGS3wRz2Sm8iC-C1piOKtNzlCWvxexiwBiLsoDQPp1arSa2KOxPvDMpKgzDu0M9bUn5PoUO0hRYbylOnSiTPIfXpEjdR_Gnk-U0YDkhqyuoplG0U_sI_GBMkyDTNwQr5eMcPJ4p7_6yOnGm_t8EVwnewPNOG4uNaro2t_TucOKGJb2gLhrXsMwuTrjbusFUybTUic1I5AHj6V7Lp7SqCp8OZQjL9d48_841Rmwfhm3-WTkW5D1Nkql9bjjV"
              />
              <img 
                alt="Model wearing Kundan Choker" 
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKsqOPKJRYlVXw0nuzCodJQIkheRaDhX9vJAUgmqYdE7wkIGczS-9Gzikr6gwHnTyaz-zGn51HdmZsUSRnxmWN_5J7creI8w-xu72vJvSC7I5Y22k830zIwP3DkhX2hRWDBVZ4l_KZRfeyk9c6Fzus9QxEJutKBTFGASMZSWA6A1-QWxg2BFr3NqRz8Xv3MvFaJzVtjriSCHz0bogdbt-HSvUOif3OvD1q6-bm515GM59Y-EWoQjkf3X5hiy_BYW3IdbKoAsyfZIrh"
              />
            </div>
            <div className="text-center flex flex-col items-center">
              <h4 className="font-headline-sm text-lg text-primary mb-2">Nizam Kundan Choker</h4>
              <span className="font-price-display text-price-display text-on-surface-variant">₹599</span>
            </div>
          </Link>
          
          {/* Product 3 */}
          <Link href="/products/devi-temple-bangles" className="group cursor-pointer">
            <div className="relative aspect-[4/5] bg-surface-container overflow-hidden mb-6">
              <img 
                alt="Gold Bangle" 
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuACQcZzgF58qI4LwfgWtfdrt11MDXVrNXx5oRPdbvf5GysfENlYb9fBOM1jPCyALde4SzDAz827Y1T2h7_zMQv713TObHud85YqnHg81vHGdylcBSxgiS7m_RvnPYbjLSluKjo3ouIzEzxlor96YBd8kH5K058DKFbil304abwILIGbHNSd6ErfCZ0H1MiXYEvhVT8KZ9TV9crbcp3EpnLvOYEaxy6Vp15RHCxZfElJZsjGpmyiHcEDJvUEmDCj1iYjojqqdRB7UAUg"
              />
              <img 
                alt="Model wearing Gold Bangles" 
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr_HaOjlr632RW9gRUhK5OU1S4vmGoWlr3TzC4qPjZLUTqShJ-aclescfm9auMI6W7YPT-OJbNnzADESxAswRyj-ZIqc--X3TZLzz7a2Wx-KM0Y5EpMo0qJBVdDAnnR7wFebwqjhpX3p_l9QF-wJANV-WtGML1jwxFz2iDRmQV_avjNmeJrWn47FE7TrGviwmSy432ennrfKmqH05BGyHNX_m2LqQA7VLYxtD9-nm8Ueluyoo-lbyGhEkoPS-Q5Tz-KpPNbLz0oiMU"
              />
            </div>
            <div className="text-center flex flex-col items-center">
              <h4 className="font-headline-sm text-lg text-primary mb-2">Devi Temple Bangles</h4>
              <span className="font-price-display text-price-display text-on-surface-variant">₹399</span>
            </div>
          </Link>
          
          {/* Product 4 */}
          <Link href="/products/rajputana-polki-ring" className="group cursor-pointer">
            <div className="relative aspect-[4/5] bg-surface-container overflow-hidden mb-6">
              <img 
                alt="Polki Ring" 
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgKyaK0-yTo2P5n1C4W8uTBTSBWurpB-ezswYsI5oyO3oDdGRXXNoiXzdVoSUX4QyxdoVzcDKNlMQykjsjYVaHE8jXV1zSczY7wdS56vNt5iiNjcGRosyCLl40RywToCWUM4yDYenjh9pfntwqad9BbuNTYsZdjJ740U2mRO-NnI8Q32mCAIqc318jPiAFzFq3OsJeFrDxkWfb6psF__4WnjBiNAVD6s0NSL0VKH_NALIyXBgUUa2sIxNYYI_gJwqfRLVqwo_NjBCo"
              />
              <img 
                alt="Model wearing Polki Ring" 
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCUXYOg7cjGFWU4eCZ3SDY1F1Hv3E5O18m1xx5WzLLKCStoIF_a6xIhg6QLnAMq5PWhZ5kjhCwvKwBlrvCPa--1VaT5S6emQWTEUouWUgYDz5wAsOrx54iGvXjAMRUpH1K7GsfT3B9HNPH5B8vId4eLL0juN0uR400i-oCEhsX-dvoOp7SuxBitPOactCZkGSmdAPYqPcbwbrDptKxTTDnIdQvd2-8n7rs9y6b_scXh9q9ppdjSMkHXe3pf3bTtpo44ntXKeOwsREQ"
              />
            </div>
            <div className="text-center flex flex-col items-center">
              <h4 className="font-headline-sm text-lg text-primary mb-2">Rajputana Polki Ring</h4>
              <span className="font-price-display text-price-display text-on-surface-variant">₹299</span>
            </div>
          </Link>
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link href="/collections" className="inline-block border border-primary text-primary font-label-caps text-label-caps px-8 py-3 uppercase">
            View All Masterpieces
          </Link>
        </div>
      </section>
    </>
  );
}
