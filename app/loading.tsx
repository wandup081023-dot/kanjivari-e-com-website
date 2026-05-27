'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-warm-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Luxury Spinner */}
        <div className="relative w-16 h-16">
          <motion.div
            className="absolute inset-0 border-2 border-beige rounded-full"
          />
          <motion.div
            className="absolute inset-0 border-2 border-gold rounded-full border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-2 border-2 border-maroon/20 rounded-full border-b-transparent"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        
        {/* Shimmer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-serif text-maroon-deep text-lg tracking-widest uppercase shimmer"
          style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}
        >
          Kanjivaram
        </motion.p>
      </div>
    </div>
  );
}
