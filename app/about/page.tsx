import Image from 'next/image';
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
    description: 'Award-winning enamel artist who has been recognized by the Indian government for preserving heritage crafts.',
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
    description: 'Champion of Orissa\'s famous silver filigree craft, a UNESCO-recognized intangible heritage art.',
  },
];

const VALUES = [
  {
    icon: '⚜️',
    title: 'Authenticity',
    description:
      'Every piece we create carries the authentic DNA of Indian craft traditions. No shortcuts, no compromises — only true handcrafted artistry that has been passed down through generations.',
  },
  {
    icon: '💎',
    title: 'Quality',
    description:
      'We use only the finest materials — 22K gold-plated brass, sterling silver, freshwater pearls, and genuine kundan stones. Each piece is quality-checked by our master artisans before it reaches you.',
  },
  {
    icon: '🏛️',
    title: 'Heritage',
    description:
      'We are custodians of India\'s jewelry-making heritage. From Rajasthani meenakari to South Indian temple jewelry, we keep ancient traditions alive for generations to come.',
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
    <div className="min-h-screen bg-warm-white">

      {/* ──── HERO ──── */}
      <section className="relative h-[75vh] min-h-[520px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/brand_story_1779825770359.png"
            alt="Kanjivaram Brand Story"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-maroon-deep/85 via-maroon-deep/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/40 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-gold text-xs uppercase tracking-[0.35em] font-medium mb-4">
              ✦ &nbsp; Est. 1994, Jaipur &nbsp; ✦
            </p>
            <h1 className="font-serif text-5xl md:text-7xl text-ivory font-semibold leading-tight mb-6">
              Our <br />
              <span className="text-gold-light italic">Story</span>
            </h1>
            <div className="w-20 h-0.5 bg-gradient-to-r from-gold to-transparent mb-6" />
            <p className="text-champagne/80 text-lg leading-relaxed max-w-lg">
              Thirty years of weaving India&apos;s most precious craft traditions into wearable works of art.
              This is Kanjivaram.
            </p>
          </div>
        </div>

        {/* Bottom curve */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-warm-white" style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }} />
      </section>

      {/* ──── THE BEGINNING ──── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label mb-4">Our Roots</p>
            <h2 className="font-serif text-4xl md:text-5xl text-maroon-deep font-semibold leading-tight mb-6">
              The <em className="text-gold not-italic">Beginning</em>
            </h2>
            <div className="space-y-5 text-gray-600 leading-relaxed">
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

            <div className="flex items-center gap-3 mt-8">
              <div className="h-px flex-1 bg-champagne-dark max-w-[80px]" />
              <p className="font-serif italic text-maroon text-sm">
                &quot;Jewelry is not decoration. It is memory, identity, and love — made tangible.&quot;
              </p>
            </div>
            <p className="text-xs text-gray-400 mt-2 ml-2">— Savitri Agarwal, Founder</p>
          </div>

          <div className="relative">
            <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-luxury-lg">
              <Image
                src="/images/lifestyle_instagram_1_1779825715412.png"
                alt="Kanjivaram artisan at work"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating accent card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-luxury p-5 max-w-[200px]">
              <p className="font-serif text-3xl font-bold text-maroon">30+</p>
              <p className="text-xs text-gray-400 mt-1">Years of preserving India&apos;s jewelry heritage</p>
            </div>
            {/* Gold accent */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-gold opacity-20 blur-xl" />
          </div>
        </div>
      </section>

      {/* ──── OUR CRAFTSMEN ──── */}
      <section className="py-20 bg-gradient-to-b from-ivory-deep/60 to-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label mb-4">The Hands Behind Every Piece</p>
            <h2 className="font-serif text-4xl md:text-5xl text-maroon-deep font-semibold">
              Our Craftsmen
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
              Meet the master artisans who dedicate their lives to keeping India&apos;s jewelry traditions alive.
              Every jhumka you wear carries their decades of skill.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CRAFTSMEN.map((craftsman) => (
              <div
                key={craftsman.name}
                className="bg-white rounded-3xl p-6 shadow-soft border border-beige/40 hover:shadow-luxury transition-all duration-300 group"
              >
                {/* Avatar */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-champagne to-ivory-deep flex items-center justify-center text-3xl mb-4 shadow-soft group-hover:scale-105 transition-transform duration-300">
                  {craftsman.emoji}
                </div>

                <p className="text-[10px] uppercase tracking-widest text-gold-dark font-semibold mb-1">
                  {craftsman.experience} · {craftsman.location}
                </p>
                <h3 className="font-serif text-lg font-semibold text-maroon-deep mb-1">
                  {craftsman.name}
                </h3>
                <p className="text-xs text-maroon/60 font-medium mb-3">{craftsman.role}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{craftsman.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── OUR VALUES ──── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="section-label mb-4">What We Stand For</p>
          <h2 className="font-serif text-4xl md:text-5xl text-maroon-deep font-semibold">
            Our Values
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Four principles that guide every decision we make — from sourcing materials to packaging your order.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((value, i) => (
            <div
              key={value.title}
              className="relative bg-white rounded-3xl p-7 shadow-soft border border-beige/40 hover:shadow-luxury hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
            >
              {/* Background number */}
              <span className="absolute top-4 right-4 font-serif text-7xl font-bold text-champagne/40 leading-none select-none">
                {i + 1}
              </span>

              <div className="text-4xl mb-4 relative z-10">{value.icon}</div>
              <h3 className="font-serif text-xl font-semibold text-maroon-deep mb-3 relative z-10">
                {value.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed relative z-10">{value.description}</p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold via-gold-light to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>
      </section>

      {/* ──── BY THE NUMBERS ──── */}
      <section className="py-20 bg-gradient-maroon relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, #C9A84C 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C9A84C 0%, transparent 50%)' }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <p className="text-gold text-xs uppercase tracking-[0.3em] font-medium mb-4">
              ✦ &nbsp; By the Numbers &nbsp; ✦
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-ivory font-semibold">
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
                <p className="font-serif text-4xl md:text-5xl font-bold text-gold-light mb-2">
                  {stat.value}
                </p>
                <p className="text-champagne/60 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── IMAGE LIFESTYLE SECTION ──── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-luxury-lg order-2 lg:order-1">
              <Image
                src="/images/lifestyle_instagram_1_1779825715412.png"
                alt="Kanjivaram jewelry lifestyle"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/30 to-transparent" />
            </div>

            <div className="order-1 lg:order-2">
              <p className="section-label mb-4">Our Promise to You</p>
              <h2 className="font-serif text-4xl text-maroon-deep font-semibold mb-6">
                Jewelry That Carries{' '}
                <em className="text-gold not-italic">Meaning</em>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
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
                    className="text-xs font-semibold text-maroon bg-champagne/50 border border-champagne-dark/30 px-3 py-1.5 rounded-full"
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
      <section className="py-20 mx-4 sm:mx-6 lg:mx-8 mb-10">
        <div className="max-w-4xl mx-auto bg-gradient-luxury rounded-4xl border border-champagne-dark/30 shadow-luxury-lg p-12 md:p-16 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-6 left-6 text-gold/20 text-6xl font-serif select-none">✦</div>
          <div className="absolute bottom-6 right-6 text-gold/20 text-6xl font-serif select-none">✦</div>

          <p className="section-label mb-4">Begin Your Journey</p>
          <h2 className="font-serif text-4xl md:text-5xl text-maroon-deep font-semibold mb-4">
            Find Your Perfect Jhumka
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto mb-8 leading-relaxed">
            Explore our curated collections of handcrafted Indian jewelry — from delicate everyday
            pieces to grand bridal masterpieces.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/collections"
              className="btn-luxury btn-primary px-10 py-4 rounded-2xl text-base font-semibold inline-flex items-center justify-center gap-2"
            >
              ✨ Shop Collections
            </Link>
            <Link
              href="/collections/bridal-jhumkas"
              className="btn-luxury btn-outline-gold px-10 py-4 rounded-2xl text-base font-semibold inline-flex items-center justify-center gap-2"
            >
              👑 View Bridal Edit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
