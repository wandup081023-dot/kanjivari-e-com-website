'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Heart,
  MapPin,
  User,
  LogOut,
  ChevronRight,
  ShoppingBag,
  Clock,
  Star,
} from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import ProductCard from '@/components/products/ProductCard';
import { PRODUCTS, formatPrice } from '@/lib/data';

const NAV_LINKS = [
  { href: '/account/orders', label: 'My Orders', icon: Package, count: 3 },
  { href: '/account/wishlist', label: 'Wishlist', icon: Heart, count: 2 },
  { href: '/account/addresses', label: 'Saved Addresses', icon: MapPin, count: 2 },
  { href: '/account', label: 'My Profile', icon: User },
];

const MOCK_ORDERS = [
  {
    id: 'KNJ84720193',
    date: '20 May 2026',
    product: 'Rani Haar Bridal Jhumka',
    status: 'Delivered',
    amount: 3499,
  },
  {
    id: 'KNJ73610482',
    date: '12 May 2026',
    product: 'Padmavati Temple Jhumka',
    status: 'In Transit',
    amount: 2799,
  },
  {
    id: 'KNJ62501371',
    date: '04 May 2026',
    product: 'Chandni Oxidised Jhumka',
    status: 'Processing',
    amount: 1299,
  },
];

const STATUS_STYLES: Record<string, string> = {
  Delivered: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  'In Transit': 'bg-blue-100 text-blue-700 border border-blue-200',
  Processing: 'bg-amber-100 text-amber-700 border border-amber-200',
};

const STATS = [
  { label: 'Total Orders', value: '3', icon: Package, color: 'text-maroon' },
  { label: 'Wishlist Items', value: '2', icon: Heart, color: 'text-rose-500' },
  { label: 'Saved Addresses', value: '2', icon: MapPin, color: 'text-gold-dark' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

export default function AccountPage() {
  const [mobileTab, setMobileTab] = useState<'overview' | 'orders' | 'wishlist' | 'profile'>('overview');
  const recentlyViewedIds = useWishlistStore((s) => s.recentlyViewed);
  const recentlyViewedProducts = recentlyViewedIds.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean) as typeof PRODUCTS;

  return (
    <div className="min-h-screen bg-warm-white pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="section-label mb-2">My Account</p>
          <h1 className="font-serif text-3xl md:text-4xl text-maroon-deep font-semibold">
            Welcome back, Priya ✨
          </h1>
        </motion.div>

        {/* Mobile Tab Bar */}
        <div className="flex lg:hidden gap-1 mb-6 bg-champagne/40 rounded-2xl p-1">
          {(['overview', 'orders', 'wishlist', 'profile'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setMobileTab(tab)}
              className={`flex-1 py-2 px-2 text-xs font-medium rounded-xl capitalize transition-all duration-200 ${
                mobileTab === tab
                  ? 'bg-maroon text-ivory shadow-luxury'
                  : 'text-ink-light hover:bg-champagne'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex gap-8">
          {/* ──── SIDEBAR ──── */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-luxury overflow-hidden sticky top-28"
            >
              {/* Avatar & Info */}
              <div className="bg-gradient-maroon px-6 py-8 text-center">
                <div className="w-20 h-20 rounded-full bg-champagne/20 border-2 border-gold/40 flex items-center justify-center text-4xl mx-auto mb-4 shadow-gold">
                  👩‍🦱
                </div>
                <h2 className="font-serif text-xl text-ivory font-semibold">Priya Sharma</h2>
                <p className="text-champagne/70 text-sm mt-1">priya.sharma@email.com</p>
                <div className="mt-3 inline-flex items-center gap-1.5 bg-gold/20 rounded-full px-3 py-1">
                  <Star size={11} className="text-gold fill-gold" />
                  <span className="text-gold text-xs font-medium">Gold Member</span>
                </div>
              </div>

              {/* Nav Links */}
              <nav className="p-4 space-y-1">
                {NAV_LINKS.map(({ href, label, icon: Icon, count }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-ink-light hover:bg-champagne/50 hover:text-maroon group transition-all duration-200"
                  >
                    <Icon size={18} className="text-gold-dark group-hover:text-maroon transition-colors" />
                    <span className="flex-1 font-medium text-sm">{label}</span>
                    {count !== undefined && (
                      <span className="bg-champagne text-maroon text-xs font-semibold px-2 py-0.5 rounded-full">
                        {count}
                      </span>
                    )}
                    <ChevronRight size={14} className="text-gray-300 group-hover:text-maroon/40 transition-colors" />
                  </Link>
                ))}
              </nav>

              <div className="px-4 pb-4">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-50 transition-all duration-200 group">
                  <LogOut size={18} />
                  <span className="font-medium text-sm">Sign Out</span>
                </button>
              </div>
            </motion.div>
          </aside>

          {/* ──── MAIN CONTENT ──── */}
          <main className="flex-1 min-w-0 space-y-8">

            {/* Welcome Banner */}
            <AnimatePresence mode="wait">
              {(mobileTab === 'overview' || typeof window === 'undefined') && (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                  className="relative overflow-hidden rounded-3xl bg-gradient-maroon p-8 shadow-luxury-lg"
                >
                  <div className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 80% 50%, #C9A84C 0%, transparent 60%)',
                    }}
                  />
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <p className="text-champagne/60 text-sm font-medium mb-1">Good day,</p>
                      <h2 className="font-serif text-3xl text-ivory font-semibold mb-2">
                        Priya Sharma 🌸
                      </h2>
                      <p className="text-champagne/70 text-sm max-w-sm">
                        You have <span className="text-gold font-semibold">1 order</span> in transit and{' '}
                        <span className="text-gold font-semibold">2 items</span> waiting in your wishlist.
                      </p>
                    </div>
                    <div className="hidden md:block text-8xl opacity-30 select-none">👩‍🦱</div>
                  </div>
                  <div className="relative z-10 flex gap-3 mt-6">
                    <Link href="/account/orders" className="btn-luxury btn-gold text-sm px-4 py-2 rounded-xl">
                      View Orders
                    </Link>
                    <Link href="/collections" className="btn-luxury btn-outline text-sm px-4 py-2 rounded-xl border-champagne/30 text-champagne hover:bg-white/10">
                      Shop Now
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  className="bg-white rounded-2xl p-5 shadow-soft border border-beige/50 text-center hover:shadow-luxury transition-shadow duration-300"
                >
                  <stat.icon size={22} className={`${stat.color} mx-auto mb-2`} />
                  <p className="font-serif text-3xl font-bold text-maroon-deep">{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="bg-white rounded-3xl shadow-soft border border-beige/40 overflow-hidden"
            >
              <div className="px-6 py-5 border-b border-beige/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package size={18} className="text-maroon" />
                  <h3 className="font-serif text-xl font-semibold text-maroon-deep">Recent Orders</h3>
                </div>
                <Link
                  href="/account/orders"
                  className="text-xs text-gold-dark hover:text-maroon font-medium flex items-center gap-1 transition-colors"
                >
                  View all <ChevronRight size={13} />
                </Link>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-beige/30 text-left">
                      <th className="px-6 py-3 text-[11px] uppercase tracking-widest text-gray-400 font-semibold">Order ID</th>
                      <th className="px-4 py-3 text-[11px] uppercase tracking-widest text-gray-400 font-semibold">Date</th>
                      <th className="px-4 py-3 text-[11px] uppercase tracking-widest text-gray-400 font-semibold">Product</th>
                      <th className="px-4 py-3 text-[11px] uppercase tracking-widest text-gray-400 font-semibold">Status</th>
                      <th className="px-6 py-3 text-[11px] uppercase tracking-widest text-gray-400 font-semibold text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-beige/40">
                    {MOCK_ORDERS.map((order, i) => (
                      <motion.tr
                        key={order.id}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="hover:bg-warm-white/60 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <span className="font-mono text-xs text-maroon font-semibold">{order.id}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-gray-500 flex items-center gap-1.5">
                            <Clock size={12} className="text-gray-300" />
                            {order.date}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-ink font-medium">{order.product}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[order.status]}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="font-serif text-base font-semibold text-maroon">
                            {formatPrice(order.amount)}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Recently Viewed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} className="text-maroon" />
                  <h3 className="font-serif text-xl font-semibold text-maroon-deep">Recently Viewed</h3>
                </div>
                <Link
                  href="/collections"
                  className="text-xs text-gold-dark hover:text-maroon font-medium flex items-center gap-1 transition-colors"
                >
                  Browse All <ChevronRight size={13} />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recentlyViewedProducts.length > 0 ? (
                  recentlyViewedProducts.map((product, i) => (
                    <motion.div
                      key={product.id}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={fadeUp}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8 text-gray-500 text-sm">
                    You haven't viewed any products recently.
                  </div>
                )}
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
