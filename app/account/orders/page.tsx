'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  RefreshCw,
  ChevronRight,
  MapPin,
  ShoppingBag,
  ArrowLeft,
} from 'lucide-react';
import { formatPrice } from '@/lib/data';

interface Order {
  id: string;
  date: string;
  product: string;
  image: string;
  collection: string;
  status: 'Delivered' | 'In Transit' | 'Processing' | 'Confirmed';
  amount: number;
  quantity: number;
  paymentMethod: string;
  address: string;
  estimatedDelivery?: string;
  trackingId?: string;
}

const MOCK_ORDERS: Order[] = [
  {
    id: 'KNJ84720193',
    date: '20 May 2026',
    product: 'Rani Haar Bridal Jhumka',
    image: '/images/product_jhumka_3_1779825651374.png',
    collection: 'Bridal Jhumkas',
    status: 'Delivered',
    amount: 3499,
    quantity: 1,
    paymentMethod: 'UPI',
    address: 'Flat 302, Lotus Heights, Bandra West, Mumbai - 400001',
    trackingId: 'DTDC9847201',
  },
  {
    id: 'KNJ73610482',
    date: '12 May 2026',
    product: 'Padmavati Temple Jhumka',
    image: '/images/product_jhumka_5_1779825815861.png',
    collection: 'Temple Jewelry',
    status: 'In Transit',
    amount: 2799,
    quantity: 1,
    paymentMethod: 'Credit Card',
    address: 'Flat 302, Lotus Heights, Bandra West, Mumbai - 400001',
    estimatedDelivery: '27 May 2026',
    trackingId: 'DTDC7361048',
  },
  {
    id: 'KNJ62501371',
    date: '04 May 2026',
    product: 'Chandni Oxidised Jhumka',
    image: '/images/product_jhumka_2_1779825485651.png',
    collection: 'Oxidised Collection',
    status: 'Processing',
    amount: 1299,
    quantity: 2,
    paymentMethod: 'COD',
    address: 'Flat 302, Lotus Heights, Bandra West, Mumbai - 400001',
    estimatedDelivery: '28 May 2026',
  },
  {
    id: 'KNJ51490260',
    date: '28 Apr 2026',
    product: 'Zara Everyday Pearl Jhumka',
    image: '/images/product_jhumka_4_1779825791740.png',
    collection: 'Everyday Elegance',
    status: 'Delivered',
    amount: 1798,
    quantity: 2,
    paymentMethod: 'Net Banking',
    address: 'Flat 302, Lotus Heights, Bandra West, Mumbai - 400001',
    trackingId: 'DTDC5149026',
  },
];

const STATUS_CONFIG: Record<Order['status'], {
  label: string;
  badgeClass: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  steps: string[];
  activeStep: number;
}> = {
  Delivered: {
    label: 'Delivered',
    badgeClass: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    icon: CheckCircle2,
    steps: ['Order Placed', 'Confirmed', 'Shipped', 'Delivered'],
    activeStep: 4,
  },
  'In Transit': {
    label: 'In Transit',
    badgeClass: 'bg-blue-50 text-blue-700 border border-blue-200',
    icon: Truck,
    steps: ['Order Placed', 'Confirmed', 'Shipped', 'Delivered'],
    activeStep: 3,
  },
  Processing: {
    label: 'Processing',
    badgeClass: 'bg-amber-50 text-amber-700 border border-amber-200',
    icon: Clock,
    steps: ['Order Placed', 'Confirmed', 'Shipped', 'Delivered'],
    activeStep: 1,
  },
  Confirmed: {
    label: 'Confirmed',
    badgeClass: 'bg-violet-50 text-violet-700 border border-violet-200',
    icon: Package,
    steps: ['Order Placed', 'Confirmed', 'Shipped', 'Delivered'],
    activeStep: 2,
  },
};

function TrackingProgress({ status }: { status: Order['status'] }) {
  const config = STATUS_CONFIG[status];
  return (
    <div className="flex items-center gap-0 mt-4">
      {config.steps.map((step, i) => {
        const isCompleted = i < config.activeStep;
        const isCurrent = i === config.activeStep - 1;
        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                isCompleted
                  ? 'bg-maroon text-ivory shadow-sm'
                  : 'bg-beige text-gray-400 border border-beige-dark'
              } ${isCurrent ? 'ring-2 ring-maroon/30 ring-offset-1' : ''}`}>
                {isCompleted ? '✓' : i + 1}
              </div>
              <span className={`text-[9px] mt-1 text-center leading-tight max-w-[48px] ${
                isCompleted ? 'text-maroon font-medium' : 'text-gray-400'
              }`}>
                {step}
              </span>
            </div>
            {i < config.steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 mb-4 rounded-full ${
                i < config.activeStep - 1 ? 'bg-maroon' : 'bg-beige-dark'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

export default function OrdersPage() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-warm-white pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Link
            href="/account"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-maroon mb-4 transition-colors"
          >
            <ArrowLeft size={15} />
            Back to Account
          </Link>
          <p className="section-label mb-2">My Account</p>
          <h1 className="font-serif text-3xl md:text-4xl text-maroon-deep font-semibold flex items-center gap-3">
            <Package className="text-maroon" size={30} />
            Order History
          </h1>
          <p className="text-gray-400 text-sm mt-2">{MOCK_ORDERS.length} orders placed</p>

          <div className="flex items-center gap-3 mt-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-champagne-dark to-transparent" />
            <span className="text-gold text-xs">✦</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-champagne-dark to-transparent" />
          </div>
        </motion.div>

        {/* Orders List */}
        <div className="space-y-5">
          {MOCK_ORDERS.map((order, i) => {
            const config = STATUS_CONFIG[order.status];
            const StatusIcon = config.icon;
            const isExpanded = expandedOrder === order.id;

            return (
              <motion.div
                key={order.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                layout
                className="bg-white rounded-3xl shadow-soft border border-beige/40 overflow-hidden hover:shadow-luxury transition-shadow duration-300"
              >
                {/* Card Header */}
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-ivory-deep flex-shrink-0 shadow-soft">
                      <Image
                        src={order.image}
                        alt={order.product}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Order Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <p className="text-[10px] text-gold-dark uppercase tracking-widest font-medium mb-1">
                            {order.collection}
                          </p>
                          <h3 className="font-serif text-lg font-semibold text-ink leading-snug">
                            {order.product}
                          </h3>
                        </div>
                        <span className={`text-[11px] font-semibold px-3 py-1 rounded-full whitespace-nowrap flex items-center gap-1.5 ${config.badgeClass}`}>
                          <StatusIcon size={11} />
                          {config.label}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-xs text-gray-400 mt-2">
                        <span className="flex items-center gap-1.5">
                          <Clock size={11} />
                          {order.date}
                        </span>
                        <span className="font-mono text-maroon/60">#{order.id}</span>
                        <span>Qty: {order.quantity}</span>
                        <span>{order.paymentMethod}</span>
                      </div>

                      {order.estimatedDelivery && (
                        <p className="text-xs text-blue-600 mt-2 flex items-center gap-1.5">
                          <Truck size={11} />
                          Estimated delivery: <span className="font-semibold">{order.estimatedDelivery}</span>
                        </p>
                      )}

                      {/* Price and Actions */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-beige/40">
                        <span className="font-serif text-xl font-bold text-maroon">
                          {formatPrice(order.amount)}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                            className="text-xs font-medium text-gold-dark hover:text-maroon border border-gold/30 hover:border-maroon/30 px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1.5"
                          >
                            {isExpanded ? 'Hide Details' : 'Track Order'}
                            <ChevronRight
                              size={12}
                              className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                            />
                          </button>
                          <button className="text-xs font-medium text-white bg-maroon hover:bg-maroon-deep px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1.5 shadow-sm">
                            <RefreshCw size={11} />
                            Buy Again
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 border-t border-beige/40">
                        {/* Tracking Timeline */}
                        <div className="mt-5">
                          <h4 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">
                            Order Progress
                          </h4>
                          <TrackingProgress status={order.status} />
                        </div>

                        {/* Order Details Grid */}
                        <div className="grid sm:grid-cols-2 gap-4 mt-6">
                          <div className="bg-beige/30 rounded-2xl p-4">
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-2">
                              Delivery Address
                            </p>
                            <p className="text-sm text-ink flex items-start gap-2">
                              <MapPin size={13} className="text-maroon mt-0.5 flex-shrink-0" />
                              {order.address}
                            </p>
                          </div>
                          {order.trackingId && (
                            <div className="bg-beige/30 rounded-2xl p-4">
                              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-2">
                                Tracking ID
                              </p>
                              <p className="font-mono text-sm text-maroon font-semibold">{order.trackingId}</p>
                              <button className="text-xs text-gold-dark hover:text-maroon mt-2 underline underline-offset-2 transition-colors">
                                Track on courier website →
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Empty state (only shown if no orders) */}
        {MOCK_ORDERS.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center py-24 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-beige flex items-center justify-center mb-6">
              <ShoppingBag size={40} className="text-beige-dark" />
            </div>
            <h2 className="font-serif text-2xl text-maroon-deep font-semibold mb-3">
              No orders yet
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Your beautiful jhumka journey starts here!
            </p>
            <Link href="/collections" className="btn-luxury btn-primary px-8 py-3 rounded-2xl">
              Shop Now
            </Link>
          </motion.div>
        )}

        {/* Bottom CTA */}
        {MOCK_ORDERS.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 text-center"
          >
            <Link
              href="/collections"
              className="btn-luxury btn-outline-gold inline-flex items-center gap-2 px-8 py-3 rounded-2xl"
            >
              <ShoppingBag size={16} />
              Continue Shopping
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
