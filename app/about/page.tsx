import Link from 'next/link';

const CRAFTSMEN = [
  {
    emoji: '👨‍🎨',
    name: 'Ramesh Sonar',
    role: 'Master Kundan Artist',
    experience: '32 years',
    location: 'Jaipur, Rajasthan',
    description: 'Third-generation kundan jeweler whose family has been practicing the art for over 90 years.',
  },
  {
    emoji: '👩‍🏭',
    name: 'Meenakshi Devi',
    role: 'Meenakari Specialist',
    experience: '24 years',
    location: 'Varanasi, UP',
    description: 'Award-winning enamel artist recognized by the Indian government for preserving heritage crafts.',
  },
  {
    emoji: '👨‍🔧',
    name: 'Suresh Pillai',
    role: 'Temple Jewelry Expert',
    experience: '28 years',
    location: 'Thrissur, Kerala',
    description: 'Master of traditional South Indian temple jewelry, trained under the royal jewelers of Travancore.',
  },
  {
    emoji: '👩‍🎨',
    name: 'Kavitha Reddy',
    role: 'Filigree Weaver',
    experience: '18 years',
    location: 'Cuttack, Odisha',
    description: "Champion of Orissa's famous silver filigree craft, a UNESCO-recognized intangible heritage art.",
  },
];

const VALUES = [
  {
    icon: '⚜️',
    title: 'Authenticity',
    description:
      'Every piece carries the authentic DNA of Indian craft traditions. No shortcuts, no compromises — only true handcrafted artistry passed down through generations.',
  },
  {
    icon: '💎',
    title: 'Quality',
    description:
      'We use only the finest materials — 22K gold-plated brass, sterling silver, freshwater pearls, and genuine kundan stones. Each piece is quality-checked by our master artisans.',
  },
  {
    icon: '🏛️',
    title: 'Heritage',
    description:
      "We are custodians of India's jewelry-making heritage. From Rajasthani meenakari to South Indian temple jewelry, we keep ancient traditions alive for generations to come.",
  },
  {
    icon: '🌿',
    title: 'Sustainability',
    description:
      'We partner directly with artisan communities, ensuring fair wages and ethical sourcing. Our packaging is 100% recyclable, and we plant a tree for every order placed.',
  },
];

const STATS = [
  { value: '50,000+', label: 'Happy Customers', icon: '👑' },
  { value: '30+', label: 'Master Artisans', icon: '🎨' },
  { value: '200+', label: 'Unique Designs', icon: '💫' },
  { value: '30 Years', label: 'Of Heritage', icon: '🏛️' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">

      {/* ──── HERO ──── */}
      <section className="relative h-[80vh] min-h-[560px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/brand_story_1779825770359.png"
            alt="Kanjivaram artisan crafting jewelry"
            className="w-full h-full object-cover object-center"
          />
          {/* Rich multi-layer gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        {/* Decorative top-right ornament */}
        <div className="absolute top-8 right-10 hidden sm:flex items-center gap-2 opacity-40">
          <div className="h-px w-12 bg-[#c9a84c]" />
          <span className="text-[#c9a84c] text-lg">✦</span>
          <div className="h-px w-12 bg-[#c9a84c]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-[#c9a84c]" />
              <p className="text-[#c9a84c] text-[11px] uppercase tracking-[0.35em] font-bold">
                Est. 1994, Jaipur
              </p>
            </div>

            {/* Title */}
            <h1 className="font-serif font-semibold text-white leading-[1.05] mb-6 drop-shadow-2xl"
              style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
              Our <br />
              <span className="italic text-[#e2c87e]">Story</span>
            </h1>

            {/* Gold divider */}
            <div className="w-20 h-0.5 bg-gradient-to-r from-[#c9a84c] to-transparent mb-6" />

            {/* Subtitle */}
            <p className="text-white/80 text-lg leading-relaxed max-w-lg">
              Thirty years of weaving India&apos;s most precious craft traditions into wearable works of art.
              This is Kanjivaram.
            </p>

            {/* CTA */}
            <div className="flex items-center gap-4 mt-8">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-[#c9a84c] text-[#1a1410] text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#e2c87e] transition-colors duration-200"
              >
                ✦ Shop Now
              </Link>
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 border border-white/30 text-white text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded-full hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-200"
              >
                View Collections
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom fade into page */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#faf8f5] to-transparent" />
      </section>

      {/* ──── THE BEGINNING ──── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            {/* Section label */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#c9a84c] text-sm">✦</span>
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#a07a2c]">Our Roots</span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl text-[#4a1018] font-semibold leading-tight mb-6">
              The <em className="text-[#c9a84c] not-italic">Beginning</em>
            </h2>

            <div className="space-y-5 text-[#3d2b1f]/70 leading-relaxed">
              <p>
                In 1994, in the bustling jewelers&apos; quarter of Jaipur&apos;s Pink City, a young woman named
                Savitri Agarwal noticed something alarming: the master craftsmen who had given India
                its most exquisite jewelry traditions were aging, and their children were moving to cities
                for corporate jobs. A 500-year-old craft lineage was disappearing.
              </p>
              <p>
                With a single showroom and partnerships with seven artisan families, Savitri founded
                Kanjivaram — not just as a jewelry brand, but as a mission to ensure India&apos;s
                handcrafted jewelry heritage would endure. She named it after the sacred city of
                Kanchipuram, where gold and silk have symbolized devotion and beauty for millennia.
              </p>
              <p>
                Today, three decades later, Kanjivaram works with over 30 master artisans across
                Rajasthan, Kerala, Odisha, and Varanasi — keeping alive traditions that range from
                intricate kundan and meenakari to delicate filigree and grand South Indian temple jewelry.
              </p>
            </div>

            {/* Pull quote */}
            <div className="flex items-start gap-4 mt-8 pl-4 border-l-2 border-[#c9a84c]">
              <div>
                <p className="font-serif italic text-[#6b1c2a] text-base leading-relaxed">
                  &ldquo;Jewelry is not decoration. It is memory, identity, and love — made tangible.&rdquo;
                </p>
                <p className="text-xs text-[#3d2b1f]/40 mt-2 font-semibold uppercase tracking-widest">
                  — Savitri Agarwal, Founder
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-[0_8px_60px_rgba(107,28,42,0.15)]">
              <img
                src="/images/lifestyle_instagram_1_1779825715412.png"
                alt="Kanjivaram artisan at work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4a1018]/30 to-transparent" />
            </div>
            {/* Floating accent card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-[0_4px_40px_rgba(107,28,42,0.12)] p-5 max-w-[200px]">
              <p className="font-serif text-3xl font-bold text-[#6b1c2a]">30+</p>
              <p className="text-xs text-[#3d2b1f]/50 mt-1 leading-snug">Years preserving India&apos;s jewelry heritage</p>
            </div>
            {/* Gold accent blob */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-[#c9a84c]/20 blur-xl" />
          </div>
        </div>
      </section>

      {/* ──── OUR CRAFTSMEN ──── */}
      <section className="py-24 bg-gradient-to-b from-[#f5f0e8]/60 to-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-[#c9a84c] text-sm">✦</span>
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#a07a2c]">The Hands Behind Every Piece</span>
              <span className="text-[#c9a84c] text-sm">✦</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-[#4a1018] font-semibold mb-4">
              Our Craftsmen
            </h2>
            <p className="text-[#3d2b1f]/50 max-w-2xl mx-auto leading-relaxed">
              Meet the master artisans who dedicate their lives to keeping India&apos;s jewelry traditions alive.
              Every jhumka you wear carries their decades of skill.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CRAFTSMEN.map((craftsman) => (
              <div
                key={craftsman.name}
                className="bg-white rounded-3xl p-6 shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-[#f0e4d4]/60 hover:shadow-[0_4px_40px_rgba(107,28,42,0.12)] transition-all duration-300 group"
              >
                {/* Avatar */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f7e7ce] to-[#f5f0e8] flex items-center justify-center text-3xl mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300">
                  {craftsman.emoji}
                </div>

                <p className="text-[10px] uppercase tracking-widest text-[#a07a2c] font-bold mb-1">
                  {craftsman.experience} · {craftsman.location}
                </p>
                <h3 className="font-serif text-lg font-semibold text-[#4a1018] mb-1">
                  {craftsman.name}
                </h3>
                <p className="text-xs text-[#6b1c2a]/60 font-semibold mb-3">{craftsman.role}</p>
                <p className="text-sm text-[#3d2b1f]/60 leading-relaxed">{craftsman.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── OUR VALUES ──── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-[#c9a84c] text-sm">✦</span>
            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#a07a2c]">What We Stand For</span>
            <span className="text-[#c9a84c] text-sm">✦</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#4a1018] font-semibold mb-4">
            Our Values
          </h2>
          <p className="text-[#3d2b1f]/50 max-w-xl mx-auto">
            Four principles that guide every decision we make — from sourcing materials to packaging your order.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((value, i) => (
            <div
              key={value.title}
              className="relative bg-white rounded-3xl p-7 shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-[#f0e4d4]/60 hover:shadow-[0_4px_40px_rgba(107,28,42,0.12)] hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
            >
              {/* Background number */}
              <span className="absolute top-4 right-4 font-serif text-7xl font-bold text-[#f7e7ce]/70 leading-none select-none">
                {i + 1}
              </span>

              <div className="text-4xl mb-4 relative z-10">{value.icon}</div>
              <h3 className="font-serif text-xl font-semibold text-[#4a1018] mb-3 relative z-10">
                {value.title}
              </h3>
              <p className="text-sm text-[#3d2b1f]/60 leading-relaxed relative z-10">{value.description}</p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#c9a84c] via-[#e2c87e] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>
      </section>

      {/* ──── BY THE NUMBERS ──── */}
      <section className="py-24 bg-gradient-to-r from-[#4a1018] to-[#6b1c2a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, #C9A84C 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C9A84C 0%, transparent 50%)' }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10 bg-[#c9a84c]/40" />
              <span className="text-[#c9a84c] text-[11px] uppercase tracking-[0.3em] font-bold">By the Numbers</span>
              <div className="h-px w-10 bg-[#c9a84c]/40" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-[#fffff0] font-semibold">
              Thirty Years of Impact
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <p className="font-serif text-4xl md:text-5xl font-bold text-[#e2c87e] mb-2">
                  {stat.value}
                </p>
                <p className="text-[#f7e7ce]/60 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── PROMISE SECTION ──── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-[0_8px_60px_rgba(107,28,42,0.15)] order-2 lg:order-1">
              <img
                src="/images/lifestyle_instagram_1_1779825715412.png"
                alt="Kanjivaram jewelry lifestyle"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4a1018]/30 to-transparent" />
            </div>

            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#c9a84c] text-sm">✦</span>
                <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#a07a2c]">Our Promise to You</span>
              </div>
              <h2 className="font-serif text-4xl text-[#4a1018] font-semibold mb-6">
                Jewelry That Carries{' '}
                <em className="text-[#c9a84c] not-italic">Meaning</em>
              </h2>
              <div className="space-y-4 text-[#3d2b1f]/65 leading-relaxed">
                <p>
                  When you wear a Kanjivaram jhumka, you&apos;re not just wearing jewelry. You&apos;re wearing
                  the story of an artisan who spent decades mastering their craft. You&apos;re wearing the
                  history of a technique refined over centuries. You&apos;re wearing India.
                </p>
                <p>
                  We believe every woman deserves to feel like royalty. Our designs range from
                  delicate everyday pieces to magnificent bridal masterpieces — all handcrafted
                  with the same devotion to quality and authenticity.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                {['Handcrafted', '100% Authentic', 'Ethically Sourced', 'Artisan Made'].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-bold text-[#6b1c2a] bg-[#f7e7ce]/60 border border-[#e8c99a]/40 px-3 py-1.5 rounded-full"
                  >
                    ✦ {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── CTA ──── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 mb-10">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#f5f0e8] via-[#fffff0] to-[#f7e7ce] rounded-[2rem] border border-[#e8c99a]/40 shadow-[0_8px_60px_rgba(107,28,42,0.1)] p-12 md:p-16 text-center relative overflow-hidden">
          {/* Decorative corners */}
          <div className="absolute top-6 left-6 text-[#c9a84c]/20 text-6xl font-serif select-none">✦</div>
          <div className="absolute bottom-6 right-6 text-[#c9a84c]/20 text-6xl font-serif select-none">✦</div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-[#c9a84c] text-sm">✦</span>
            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#a07a2c]">Begin Your Journey</span>
            <span className="text-[#c9a84c] text-sm">✦</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#4a1018] font-semibold mb-4">
            Find Your Perfect Jhumka
          </h2>
          <p className="text-[#3d2b1f]/50 max-w-lg mx-auto mb-8 leading-relaxed">
            Explore our curated collections of handcrafted Indian jewelry — from delicate everyday
            pieces to grand bridal masterpieces.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-[#6b1c2a] text-white text-sm font-bold uppercase tracking-widest px-10 py-4 rounded-2xl hover:bg-[#4a1018] transition-colors duration-200"
            >
              ✨ Shop All Pieces
            </Link>
            <Link
              href="/collections/bridal-jhumkas"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#c9a84c] text-[#6b1c2a] text-sm font-bold uppercase tracking-widest px-10 py-4 rounded-2xl hover:bg-[#c9a84c] hover:text-white transition-all duration-200"
            >
              👑 View Bridal Edit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
