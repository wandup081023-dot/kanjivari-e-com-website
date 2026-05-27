export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  category: string;
  collectionSlug: string;
  images: string[];
  badge?: 'new' | 'bestseller' | 'sale';
  description: string;
  material: string;
  occasion: string[];
  weight: string;
  dimensions: string;
  isWishlisted?: boolean;
  inStock: boolean;
  stockCount: number;
  deliveryDays: string;
  codAvailable: boolean;
  tags: string[];
  variants: {
    metal?: string[];
    size?: string[];
  };
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  banner: string;
  productCount: number;
  featured: boolean;
}

export interface Review {
  id: string;
  productId: string;
  name: string;
  avatar: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
  images?: string[];
}

export const COLLECTIONS: Collection[] = [
  {
    id: 'c1',
    name: 'Bridal Jhumkas',
    slug: 'bridal-jhumkas',
    description: 'Exquisite handcrafted jhumkas for your most special day. Each piece is a masterpiece of Indian craftsmanship.',
    banner: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcWKxoI-Zd8fXAB2SYRlbdxlZ7Ihx8aw2OO3Sigr9kkbrkzE8hGjdYo027UUzBinM8gsKXThUCS4OE4uddW5bWipxzaGq3m2EL5PRz3PgeG2yCJUJLkp0_fiPqvr0bqpvimLFpikp1EnyN8Ee6e3vVqVQ5UHub3yPYTYJ076tn8bCW-zcDSFm_jD5Xs_guGnDeERtCvOGS68WU_B45NRQp0XXsvGZsn1UnKlaeaSuJWIvNeeoRBFXC3IBcW_bFcrG_bfUrTUd4FjtY',
    productCount: 24,
    featured: true,
  },
  {
    id: 'c2',
    name: 'Everyday Elegance',
    slug: 'everyday-elegance',
    description: 'Delicate, wearable pieces that elevate your everyday look with understated luxury.',
    banner: '/images/product_jhumka_4_1779825791740.png',
    productCount: 36,
    featured: true,
  },
  {
    id: 'c3',
    name: 'Festive Collection',
    slug: 'festive-collection',
    description: 'Celebrate every festival with the brilliance of handcrafted Indian jewelry.',
    banner: '/images/collection_festive_1779825700320.png',
    productCount: 28,
    featured: true,
  },
  {
    id: 'c4',
    name: 'Temple Jewelry',
    slug: 'temple-jewelry',
    description: 'Sacred motifs, antique gold finishes — timeless South Indian temple jewelry traditions.',
    banner: '/images/product_jhumka_5_1779825815861.png',
    productCount: 18,
    featured: true,
  },
  {
    id: 'c5',
    name: 'Oxidised Collection',
    slug: 'oxidised-collection',
    description: 'Bold, tribal-inspired oxidised silver jhumkas for the free-spirited modern woman.',
    banner: '/images/product_jhumka_6_1779825928262.png',
    productCount: 22,
    featured: false,
  },
  {
    id: 'c6',
    name: 'Trending on Instagram',
    slug: 'trending',
    description: 'The most loved styles curated from thousands of real looks. As seen on Instagram.',
    banner: '/images/lifestyle_instagram_1_1779825715412.png',
    productCount: 30,
    featured: true,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Rani Haar Bridal Jhumka',
    slug: 'rani-haar-bridal-jhumka',
    price: 499,
    originalPrice: 599,
    discount: 42,
    rating: 4.8,
    reviewCount: 234,
    category: 'Bridal',
    collectionSlug: 'bridal-jhumkas',
    images: [
      '/images/product_jhumka_3_1779825651374.png',
      '/images/product_jhumka_1_1779825471575.png',
      '/images/product_jhumka_2_1779825485651.png',
    ],
    badge: 'bestseller',
    description: 'The Rani Haar Bridal Jhumka is a masterpiece of traditional Indian jewelry making. Each pair is handcrafted by master artisans using the finest kundan and meenakari techniques, featuring precious rubies, emeralds, and freshwater pearls set in pure 22k gold-plated brass. Perfect for brides who want to make a royal statement on their most special day.',
    material: '22K Gold Plated Brass, Kundan, Meenakari',
    occasion: ['Bridal', 'Wedding', 'Sangeet', 'Reception'],
    weight: '45g per pair',
    dimensions: '8cm drop length',
    inStock: true,
    stockCount: 8,
    deliveryDays: '3-5 business days',
    codAvailable: true,
    tags: ['bridal', 'kundan', 'meenakari', 'gold', 'wedding'],
    variants: {
      metal: ['Gold', 'Rose Gold'],
    },
  },
  {
    id: 'p2',
    name: 'Chandni Oxidised Jhumka',
    slug: 'chandni-oxidised-jhumka',
    price: 299,
    originalPrice: 399,
    discount: 35,
    rating: 4.7,
    reviewCount: 189,
    category: 'Oxidised',
    collectionSlug: 'oxidised-collection',
    images: [
      '/images/product_jhumka_2_1779825485651.png',
      '/images/product_jhumka_6_1779825928262.png',
      '/images/product_jhumka_1_1779825471575.png',
    ],
    badge: 'new',
    description: 'The Chandni Oxidised Jhumka draws inspiration from tribal art forms of Rajasthan. Crafted from sterling silver with an oxidised finish, these statement earrings feature intricate filigree work and hanging turquoise drops. A perfect blend of contemporary aesthetics and traditional craftsmanship.',
    material: 'Sterling Silver, Oxidised Finish, Turquoise',
    occasion: ['Casual', 'Festive', 'College', 'Dinner'],
    weight: '28g per pair',
    dimensions: '6cm drop length',
    inStock: true,
    stockCount: 23,
    deliveryDays: '2-4 business days',
    codAvailable: true,
    tags: ['oxidised', 'silver', 'tribal', 'bohemian'],
    variants: {
      size: ['Small', 'Medium', 'Large'],
    },
  },
  {
    id: 'p3',
    name: 'Padmavati Temple Jhumka',
    slug: 'padmavati-temple-jhumka',
    price: 399,
    originalPrice: 499,
    discount: 30,
    rating: 4.9,
    reviewCount: 312,
    category: 'Temple',
    collectionSlug: 'temple-jewelry',
    images: [
      '/images/product_jhumka_5_1779825815861.png',
      '/images/product_jhumka_1_1779825471575.png',
      '/images/product_jhumka_3_1779825651374.png',
    ],
    badge: 'bestseller',
    description: 'Inspired by the divine beauty of South Indian temple traditions, the Padmavati Temple Jhumka features the sacred lotus motif surrounded by Goddess Lakshmi imagery. Made with antique gold-plated brass and adorned with traditional South Indian ruby-red and emerald-green stones. Each pair comes with a velvet pouch and a certificate of authenticity.',
    material: 'Antique Gold Plated Brass, Traditional Stones',
    occasion: ['Temple', 'Festivals', 'Puja', 'Traditional Events'],
    weight: '38g per pair',
    dimensions: '7cm drop length',
    inStock: true,
    stockCount: 5,
    deliveryDays: '3-5 business days',
    codAvailable: true,
    tags: ['temple', 'south-indian', 'lakshmi', 'antique-gold'],
    variants: {
      metal: ['Antique Gold', 'Matte Gold'],
    },
  },
  {
    id: 'p4',
    name: 'Zara Everyday Pearl Jhumka',
    slug: 'zara-everyday-pearl-jhumka',
    price: 199,
    originalPrice: 299,
    discount: 40,
    rating: 4.6,
    reviewCount: 428,
    category: 'Everyday',
    collectionSlug: 'everyday-elegance',
    images: [
      '/images/product_jhumka_4_1779825791740.png',
      '/images/product_jhumka_1_1779825471575.png',
      '/images/product_jhumka_2_1779825485651.png',
    ],
    badge: 'bestseller',
    description: 'The Zara Everyday Pearl Jhumka is designed for the modern Indian woman who loves effortless elegance. Lightweight gold-plated jhumkas with freshwater pearl drops that pair beautifully with both ethnic and fusion outfits. Perfect for office, college, or casual dining.',
    material: 'Gold Plated Brass, Freshwater Pearls',
    occasion: ['Daily Wear', 'Office', 'College', 'Casual'],
    weight: '12g per pair',
    dimensions: '3.5cm drop length',
    inStock: true,
    stockCount: 45,
    deliveryDays: '2-4 business days',
    codAvailable: true,
    tags: ['everyday', 'pearl', 'lightweight', 'minimalist'],
    variants: {
      metal: ['Gold', 'Silver', 'Rose Gold'],
      size: ['Small', 'Medium'],
    },
  },
  {
    id: 'p5',
    name: 'Roshni Kundan Festive Jhumka',
    slug: 'roshni-kundan-festive-jhumka',
    price: 349,
    originalPrice: 449,
    discount: 37,
    rating: 4.8,
    reviewCount: 156,
    category: 'Festive',
    collectionSlug: 'festive-collection',
    images: [
      '/images/product_jhumka_1_1779825471575.png',
      '/images/product_jhumka_3_1779825651374.png',
      '/images/product_jhumka_5_1779825815861.png',
    ],
    badge: 'new',
    description: 'Usher in celebrations with the Roshni Kundan Festive Jhumka. These stunning earrings feature traditional kundan setting with multi-colored precious stones, making them perfect for Diwali, Navratri, and all festive occasions. The jingling bells add a beautiful musical touch.',
    material: '22K Gold Plated Brass, Kundan, Multi-Color Stones',
    occasion: ['Diwali', 'Navratri', 'Festivals', 'Parties'],
    weight: '35g per pair',
    dimensions: '6.5cm drop length',
    inStock: true,
    stockCount: 15,
    deliveryDays: '2-4 business days',
    codAvailable: true,
    tags: ['festive', 'kundan', 'colorful', 'celebration'],
    variants: {
      metal: ['Gold'],
    },
  },
  {
    id: 'p6',
    name: 'Aara Filigree Jhumka',
    slug: 'aara-filigree-jhumka',
    price: 249,
    originalPrice: 349,
    discount: 28,
    rating: 4.7,
    reviewCount: 203,
    category: 'Trending',
    collectionSlug: 'trending',
    images: [
      '/images/product_jhumka_6_1779825928262.png',
      '/images/product_jhumka_2_1779825485651.png',
      '/images/product_jhumka_4_1779825791740.png',
    ],
    badge: 'new',
    description: 'The Aara Filigree Jhumka is all over Instagram right now — and for good reason. These intricate filigree-work earrings take over 8 hours to handcraft, featuring delicate silver wire weaving in traditional Orissa patterns. Perfect for the fashion-forward woman who appreciates heritage craftsmanship.',
    material: 'Sterling Silver, Filigree Work',
    occasion: ['Party', 'Date Night', 'Festive', 'Wedding Guest'],
    weight: '22g per pair',
    dimensions: '5cm drop length',
    inStock: true,
    stockCount: 11,
    deliveryDays: '3-5 business days',
    codAvailable: true,
    tags: ['filigree', 'trending', 'instagram', 'silver', 'orissa'],
    variants: {
      metal: ['Silver', 'Oxidised Silver'],
      size: ['Medium', 'Large'],
    },
  },
  {
    id: 'p7',
    name: 'Suhana Meenakari Jhumka',
    slug: 'suhana-meenakari-jhumka',
    price: 299,
    originalPrice: 399,
    discount: 33,
    rating: 4.9,
    reviewCount: 289,
    category: 'Festive',
    collectionSlug: 'festive-collection',
    images: [
      '/images/product_jhumka_3_1779825651374.png',
      '/images/product_jhumka_5_1779825815861.png',
      '/images/product_jhumka_6_1779825928262.png',
    ],
    badge: 'bestseller',
    description: 'The Suhana Meenakari Jhumka is a vibrant celebration of Rajasthani craft heritage. Hand-painted by master meenakari artists, each pair features intricate floral motifs in crimson, emerald, and cobalt blue enamel set in gold-plated brass. A wearable work of art.',
    material: '22K Gold Plated Brass, Meenakari Enamel, Pearls',
    occasion: ['Festive', 'Bridal', 'Wedding Guest', 'Cultural Events'],
    weight: '32g per pair',
    dimensions: '5.5cm drop length',
    inStock: true,
    stockCount: 18,
    deliveryDays: '2-4 business days',
    codAvailable: true,
    tags: ['meenakari', 'rajasthani', 'colorful', 'enamel'],
    variants: {
      metal: ['Gold'],
    },
  },
  {
    id: 'p8',
    name: 'Ishaan Long Chain Jhumka',
    slug: 'ishaan-long-chain-jhumka',
    price: 299,
    originalPrice: 399,
    discount: 30,
    rating: 4.6,
    reviewCount: 167,
    category: 'Trending',
    collectionSlug: 'trending',
    images: [
      '/images/product_jhumka_2_1779825485651.png',
      '/images/product_jhumka_4_1779825791740.png',
      '/images/product_jhumka_1_1779825471575.png',
    ],
    badge: 'new',
    description: 'Make a statement with the Ishaan Long Chain Jhumka — featuring a delicate chain that frames your face as it sweeps from ear to hair. This trending style has taken social media by storm, combining traditional jhumka craftsmanship with a modern long-chain element.',
    material: 'Gold Plated Brass, Crystal Beads',
    occasion: ['Party', 'Festive', 'Wedding Guest', 'Concerts'],
    weight: '25g per pair',
    dimensions: '10cm total length with chain',
    inStock: true,
    stockCount: 32,
    deliveryDays: '2-4 business days',
    codAvailable: true,
    tags: ['chain', 'long', 'trending', 'statement'],
    variants: {
      metal: ['Gold', 'Rose Gold'],
    },
  },
  {
    id: 'p9',
    name: 'Mayuri Jhumkas',
    slug: 'mayuri-jhumkas',
    price: 499,
    originalPrice: 599,
    discount: 16,
    rating: 4.8,
    reviewCount: 124,
    category: 'Bridal',
    collectionSlug: 'bridal-jhumkas',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB16nnETawpr3poCs8lNkIxOGM71zveaa5ii5SNhQsk7BLy-scKhnfy6jTZWDwxd9tOFJslF0vOgUOQ4uaxM06EPoKJRTW_PaWxYd1eDqGgU7Jw4urrOoKD5h5PVBxJasYusKm_Mo5kKfaJPt9sLHCtHarlyWkPW9kCEqx-C_-OxwF_ZsikxsH-jzV-Uj4BuNImEq263yjXK0HTEh6g2djCi4JUzSPiCjGK2puXiIkYgrF5zbRxVcZIhTYwOEyljqGWeXACoWY2bPq_',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAiXLvl80EM-l_CAfzSC0Dk1VfGk9i6SjSPP7knPU3qtTENbfItFsdc3lZDH77t1k2rlSVo6W8Mb1IIZXl7jAPy3L4kplvo7dob6fX9HmjLiKbwtmy_4S8oQ10lS0QyBuSDHMTD3Ib44h5xC4vZqKL_wkJ3rzxEd6JsLhhkUk5s6qJynIZIwWrOmJbratqpNOv3uCjhLQTjeN-Df53yW-N6itVxHwfx2JCnn6s1YO-a65XqF4Yal-tTTDwCeBwb38QrFLcLrAEu6ypC',
    ],
    badge: 'bestseller',
    description: 'The Mayuri Jhumkas celebrate the peacock motif with intricate craftsmanship.',
    material: '22K Gold Plated Brass',
    occasion: ['Bridal', 'Wedding', 'Festive'],
    weight: '30g per pair',
    dimensions: '6cm drop length',
    inStock: true,
    stockCount: 12,
    deliveryDays: '3-5 business days',
    codAvailable: true,
    tags: ['bridal', 'peacock', 'gold'],
    variants: {
      metal: ['Gold'],
    },
  },
  {
    id: 'p10',
    name: 'Nizam Kundan Choker',
    slug: 'nizam-kundan-choker',
    price: 599,
    originalPrice: 899,
    discount: 33,
    rating: 4.9,
    reviewCount: 345,
    category: 'Bridal',
    collectionSlug: 'bridal-jhumkas',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBWyJs7Ziuq3lleTQ-p3hGS3wRz2Sm8iC-C1piOKtNzlCWvxexiwBiLsoDQPp1arSa2KOxPvDMpKgzDu0M9bUn5PoUO0hRYbylOnSiTPIfXpEjdR_Gnk-U0YDkhqyuoplG0U_sI_GBMkyDTNwQr5eMcPJ4p7_6yOnGm_t8EVwnewPNOG4uNaro2t_TucOKGJb2gLhrXsMwuTrjbusFUybTUic1I5AHj6V7Lp7SqCp8OZQjL9d48_841Rmwfhm3-WTkW5D1Nkql9bjjV',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKsqOPKJRYlVXw0nuzCodJQIkheRaDhX9vJAUgmqYdE7wkIGczS-9Gzikr6gwHnTyaz-zGn51HdmZsUSRnxmWN_5J7creI8w-xu72vJvSC7I5Y22k830zIwP3DkhX2hRWDBVZ4l_KZRfeyk9c6Fzus9QxEJutKBTFGASMZSWA6A1-QWxg2BFr3NqRz8Xv3MvFaJzVtjriSCHz0bogdbt-HSvUOif3OvD1q6-bm515GM59Y-EWoQjkf3X5hiy_BYW3IdbKoAsyfZIrh',
    ],
    badge: 'bestseller',
    description: 'A royal Kundan choker inspired by the Nizam jewelry collection.',
    material: 'Kundan, Pearls, Brass',
    occasion: ['Bridal', 'Wedding'],
    weight: '120g',
    dimensions: 'Adjustable length',
    inStock: true,
    stockCount: 5,
    deliveryDays: '3-5 business days',
    codAvailable: true,
    tags: ['kundan', 'choker', 'bridal'],
    variants: {
      metal: ['Gold'],
    },
  },
  {
    id: 'p11',
    name: 'Devi Temple Bangles',
    slug: 'devi-temple-bangles',
    price: 399,
    originalPrice: 499,
    discount: 20,
    rating: 4.7,
    reviewCount: 98,
    category: 'Temple',
    collectionSlug: 'temple-jewelry',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuACQcZzgF58qI4LwfgWtfdrt11MDXVrNXx5oRPdbvf5GysfENlYb9fBOM1jPCyALde4SzDAz827Y1T2h7_zMQv713TObHud85YqnHg81vHGdylcBSxgiS7m_RvnPYbjLSluKjo3ouIzEzxlor96YBd8kH5K058DKFbil304abwILIGbHNSd6ErfCZ0H1MiXYEvhVT8KZ9TV9crbcp3EpnLvOYEaxy6Vp15RHCxZfElJZsjGpmyiHcEDJvUEmDCj1iYjojqqdRB7UAUg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBr_HaOjlr632RW9gRUhK5OU1S4vmGoWlr3TzC4qPjZLUTqShJ-aclescfm9auMI6W7YPT-OJbNnzADESxAswRyj-ZIqc--X3TZLzz7a2Wx-KM0Y5EpMo0qJBVdDAnnR7wFebwqjhpX3p_l9QF-wJANV-WtGML1jwxFz2iDRmQV_avjNmeJrWn47FE7TrGviwmSy432ennrfKmqH05BGyHNX_m2LqQA7VLYxtD9-nm8Ueluyoo-lbyGhEkoPS-Q5Tz-KpPNbLz0oiMU',
    ],
    badge: 'new',
    description: 'Intricately carved temple bangles featuring Goddess Lakshmi.',
    material: 'Antique Gold Plated Brass',
    occasion: ['Festive', 'Temple', 'Wedding'],
    weight: '80g per pair',
    dimensions: '2.4, 2.6, 2.8',
    inStock: true,
    stockCount: 15,
    deliveryDays: '3-5 business days',
    codAvailable: true,
    tags: ['temple', 'bangles', 'antique'],
    variants: {
      size: ['2.4', '2.6', '2.8'],
    },
  },
  {
    id: 'p12',
    name: 'Rajputana Polki Ring',
    slug: 'rajputana-polki-ring',
    price: 299,
    originalPrice: 399,
    discount: 25,
    rating: 4.8,
    reviewCount: 145,
    category: 'Trending',
    collectionSlug: 'trending',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBgKyaK0-yTo2P5n1C4W8uTBTSBWurpB-ezswYsI5oyO3oDdGRXXNoiXzdVoSUX4QyxdoVzcDKNlMQykjsjYVaHE8jXV1zSczY7wdS56vNt5iiNjcGRosyCLl40RywToCWUM4yDYenjh9pfntwqad9BbuNTYsZdjJ740U2mRO-NnI8Q32mCAIqc318jPiAFzFq3OsJeFrDxkWfb6psF__4WnjBiNAVD6s0NSL0VKH_NALIyXBgUUa2sIxNYYI_gJwqfRLVqwo_NjBCo',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDCUXYOg7cjGFWU4eCZ3SDY1F1Hv3E5O18m1xx5WzLLKCStoIF_a6xIhg6QLnAMq5PWhZ5kjhCwvKwBlrvCPa--1VaT5S6emQWTEUouWUgYDz5wAsOrx54iGvXjAMRUpH1K7GsfT3B9HNPH5B8vId4eLL0juN0uR400i-oCEhsX-dvoOp7SuxBitPOactCZkGSmdAPYqPcbwbrDptKxTTDnIdQvd2-8n7rs9y6b_scXh9q9ppdjSMkHXe3pf3bTtpo44ntXKeOwsREQ',
    ],
    badge: 'new',
    description: 'A statement polki ring with intricate meenakari work on the edges.',
    material: 'Gold Plated Brass, Polki',
    occasion: ['Party', 'Festive', 'Wedding Guest'],
    weight: '15g',
    dimensions: 'Adjustable',
    inStock: true,
    stockCount: 20,
    deliveryDays: '3-5 business days',
    codAvailable: true,
    tags: ['polki', 'ring', 'statement'],
    variants: {
      metal: ['Gold'],
    },
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    productId: 'p1',
    name: 'Priya Sharma',
    avatar: '👩‍🦱',
    rating: 5,
    title: 'Absolutely stunning for my wedding!',
    body: 'I wore these jhumkas for my wedding and received so many compliments. The craftsmanship is impeccable — every tiny detail is perfect. The photos don\'t do justice to how beautiful these look in person. Truly a luxury product at a very fair price!',
    date: '2024-03-15',
    verified: true,
  },
  {
    id: 'r2',
    productId: 'p1',
    name: 'Ananya Menon',
    avatar: '👩',
    rating: 5,
    title: 'Better than expected',
    body: 'Was skeptical about buying jewelry online but Kanjivaram completely changed my mind. The packaging was gorgeous and the earrings looked even more beautiful than the photos. Fast delivery too!',
    date: '2024-02-28',
    verified: true,
  },
  {
    id: 'r3',
    productId: 'p2',
    name: 'Divya Krishnan',
    avatar: '👩‍🦰',
    rating: 4,
    title: 'Beautiful craftsmanship',
    body: 'Love the oxidised finish and the weight feels just right — substantial enough to feel premium but not too heavy for all-day wear. Paired it with a kurti for my friend\'s mehendi and got so many compliments!',
    date: '2024-03-05',
    verified: true,
  },
  {
    id: 'r4',
    productId: 'p4',
    name: 'Kavya Reddy',
    avatar: '👩‍🦳',
    rating: 5,
    title: 'My everyday go-to!',
    body: 'These have become my daily wear earrings. Lightweight, beautiful, and goes with everything. The pearl quality is surprisingly good for the price. Will definitely be ordering more from Kanjivaram!',
    date: '2024-03-10',
    verified: true,
  },
  {
    id: 'r5',
    productId: 'p3',
    name: 'Sunita Patel',
    avatar: '👩',
    rating: 5,
    title: 'Temple jewelry done right',
    body: 'The Padmavati jhumka has such incredible detail. You can see the craftsmanship in every inch of it. The antique gold finish is exactly as shown and the weight distribution means they\'re comfortable to wear for hours.',
    date: '2024-01-22',
    verified: true,
  },
  {
    id: 'r6',
    productId: 'p6',
    name: 'Ritu Agarwal',
    avatar: '👩‍🦱',
    rating: 5,
    title: 'Saw these on Instagram and had to buy!',
    body: 'The filigree work is just mind-blowing. I can\'t believe these are made by hand. Wore them to a party and everyone was asking where I got them from. 100% recommend Kanjivaram!',
    date: '2024-03-18',
    verified: true,
  },
];

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Shreya Agrawal',
    location: 'Mumbai',
    avatar: '👩‍🦱',
    rating: 5,
    text: 'Kanjivaram has become my go-to for all ethnic jewelry. The quality is unmatched and every piece feels truly handcrafted. I\'ve gifted their jhumkas to three of my friends and everyone absolutely loves them!',
    purchases: 12,
  },
  {
    id: 't2',
    name: 'Lakshmi Rao',
    location: 'Bangalore',
    avatar: '👩',
    rating: 5,
    text: 'As someone who grew up watching my grandmother wear traditional jewelry, I\'m incredibly picky. Kanjivaram genuinely nails the authentic craftsmanship. The temple jhumkas look like they\'ve come straight from a royal treasury.',
    purchases: 8,
  },
  {
    id: 't3',
    name: 'Preet Kaur',
    location: 'Delhi',
    avatar: '👩‍🦰',
    rating: 5,
    text: 'Ordered bridal jhumkas for my sister\'s wedding and they were the highlight of her look! The packaging was so luxurious and the delivery was ahead of schedule. Absolutely recommend Kanjivaram for bridal jewelry!',
    purchases: 4,
  },
];

export function getProductsByCollection(slug: string): Product[] {
  return PRODUCTS.filter(p => p.collectionSlug === slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return COLLECTIONS.find(c => c.slug === slug);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return PRODUCTS
    .filter(p => p.id !== product.id && p.collectionSlug === product.collectionSlug)
    .slice(0, count);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}
