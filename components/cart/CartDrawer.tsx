'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, ShoppingBag, Plus, Minus, ArrowRight, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/data';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getSubtotal } = useCartStore();
  const router = useRouter();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);


  const handleCheckout = () => {
    closeCart();
    router.push('/checkout');
  };

  const handleViewCart = () => {
    closeCart();
    router.push('/cart');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-ink/60 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 z-[80] w-full max-w-md bg-warm-white shadow-luxury-lg flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-beige bg-white">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-maroon" />
                <h2 className="font-serif text-2xl text-ink">Your Cart</h2>
                <span className="bg-champagne text-maroon text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-black/5 rounded-full transition-colors text-gray-500 hover:text-ink"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-70">
                  <ShoppingBag size={48} className="text-gray-300" />
                  <p className="font-serif text-xl text-ink">Your cart is empty</p>
                  <p className="text-sm text-gray-500 pb-4">Add some beautiful jhumkas to your collection.</p>
                  <button
                    onClick={() => {
                      closeCart();
                      router.push('/collections');
                    }}
                    className="btn-luxury btn-outline rounded-full px-8 py-3 text-sm"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      className="flex gap-4 bg-white p-3 rounded-2xl shadow-soft"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-ivory-deep shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-serif text-sm font-medium text-ink truncate pr-2">
                              {item.product.name}
                            </h3>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="text-gray-300 hover:text-maroon transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          {(item.selectedMetal || item.selectedSize) && (
                            <p className="text-[10px] text-gray-400 mt-0.5">
                              {item.selectedMetal} {item.selectedSize ? `| ${item.selectedSize}` : ''}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-semibold text-maroon text-sm">
                            {formatPrice(item.product.price)}
                          </span>
                          <div className="flex items-center gap-2 bg-ivory-deep rounded-full px-1 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-champagne transition-colors"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="w-4 text-center text-xs font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-champagne transition-colors"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-beige">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>{formatPrice(getSubtotal())}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Shipping</span>
                    <span className="text-green-600">Calculated at checkout</span>
                  </div>
                  <div className="h-px bg-beige" />
                  <div className="flex justify-between font-serif text-xl font-semibold text-ink">
                    <span>Total</span>
                    <span className="text-maroon">{formatPrice(getSubtotal())}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="btn-luxury btn-primary w-full rounded-xl py-4 flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={handleViewCart}
                    className="btn-luxury btn-outline-gold w-full rounded-xl py-3.5 text-sm"
                  >
                    View Shopping Cart
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
