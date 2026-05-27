'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, MapPin, Star, ArrowRight, Share2 } from 'lucide-react';
import { useCheckoutStore } from '@/store/wishlistStore';
import confetti from 'canvas-confetti';

export default function CheckoutConfirmation() {
  const { orderId, addresses, selectedAddressId } = useCheckoutStore();
  const [shared, setShared] = useState(false);
  const selectedAddress = addresses.find(a => a.id === selectedAddressId);

  useEffect(() => {
    // Confetti celebration
    const end = Date.now() + 2000;
    const colors = ['#C9A84C', '#6B1C2A', '#F7E7CE', '#E2C87E'];
    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    try { frame(); } catch {}
  }, []);

  const TRACKING_STEPS = [
    { label: 'Order Placed', icon: CheckCircle, done: true, date: 'Today' },
    { label: 'Preparing Your Jewelry', icon: Package, done: false, date: 'Tomorrow' },
    { label: 'Out for Delivery', icon: Truck, done: false, date: 'Jun 1–3' },
    { label: 'Delivered', icon: MapPin, done: false, date: 'Jun 3' },
  ];

  return (
    <div className="max-w-xl mx-auto text-center">
      {/* Success animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15, delay: 0.2 }}
        className="w-24 h-24 rounded-full bg-gradient-to-br from-gold to-champagne-dark mx-auto mb-6 flex items-center justify-center shadow-gold"
      >
        <CheckCircle size={44} className="text-maroon-deep" strokeWidth={2} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <p className="section-label mb-3 justify-center">Order Confirmed ✦</p>
        <h1 className="font-serif text-4xl lg:text-5xl font-light text-ink mb-3">
          Thank You for Your Order!
        </h1>
        <p className="text-gray-500 mb-2">
          Your exquisite jewelry is being carefully prepared by our artisans.
        </p>
        <div className="inline-block bg-champagne rounded-xl px-5 py-2 mb-6">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Order ID</p>
          <p className="font-mono font-bold text-maroon text-lg">{orderId}</p>
        </div>
      </motion.div>

      {/* Delivery info */}
      {selectedAddress && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-5 shadow-soft mb-5 text-left"
        >
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Delivering to</p>
          <p className="font-semibold text-ink">{selectedAddress.name}</p>
          <p className="text-sm text-gray-500 mt-0.5">
            {selectedAddress.houseNo}, {selectedAddress.area}, {selectedAddress.city}, {selectedAddress.state}
          </p>
          <p className="text-sm text-green-600 mt-2 font-medium">🚚 Expected: Jun 1 – Jun 3</p>
        </motion.div>
      )}

      {/* Tracking Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl p-5 shadow-soft mb-5"
      >
        <h3 className="font-medium text-sm text-ink text-left mb-4">Track Your Order</h3>
        <div className="space-y-4">
          {TRACKING_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  step.done ? 'bg-gold text-maroon-deep' : 'bg-beige text-gray-400'
                }`}>
                  <Icon size={15} />
                </div>
                <div className="flex-1 text-left">
                  <p className={`text-sm font-medium ${step.done ? 'text-ink' : 'text-gray-400'}`}>{step.label}</p>
                  <p className="text-xs text-gray-400">{step.date}</p>
                </div>
                {step.done && <div className="w-2 h-2 rounded-full bg-gold" />}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Demo notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 text-left"
      >
        <p className="text-sm font-semibold text-amber-700 mb-1">Demo Checkout Completed ✓</p>
        <p className="text-xs text-amber-600">
          This is a demo checkout. Payment gateway integration (Razorpay/Stripe) is pending. 
          In production, actual payment processing would occur here.
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <Link href="/account/orders" className="btn-luxury btn-outline rounded-xl flex-1 py-3.5 text-sm">
          Track Order
        </Link>
        <Link href="/collections" className="btn-luxury btn-primary rounded-xl flex-1 py-3.5 text-sm flex items-center justify-center gap-2">
          Continue Shopping <ArrowRight size={15} />
        </Link>
      </motion.div>

      {/* Share */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 pt-6 border-t border-beige"
      >
        <p className="text-sm text-gray-500 mb-3">Share your excitement!</p>
        <button
          onClick={() => setShared(true)}
          className="inline-flex items-center gap-2 text-sm font-medium text-maroon hover:underline"
        >
          <Share2 size={15} />
          {shared ? 'Shared! ✓' : 'Share on Instagram'}
        </button>
      </motion.div>
    </div>
  );
}
