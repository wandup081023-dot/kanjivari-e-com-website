'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, Gift, ChevronRight, Heart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { PRODUCTS, formatPrice } from '@/lib/data';
import ProductCard from '@/components/products/ProductCard';

function EmptyCart() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4">
      <div className="w-24 h-24 rounded-full bg-champagne flex items-center justify-center mb-6">
        <ShoppingBag size={40} className="text-maroon" />
      </div>
      <h2 className="font-serif text-3xl font-light text-ink mb-3">Your Cart is Empty</h2>
      <p className="text-gray-500 mb-8 text-center max-w-sm">
        Looks like you haven&apos;t added any beautiful jhumkas yet. Let&apos;s change that!
      </p>
      <Link href="/collections" className="btn-luxury btn-primary rounded-full px-10 py-4">
        Explore Collections <ArrowRight size={16} />
      </Link>
    </div>
  );
}

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getSubtotal, getTotal, discount, appliedCoupon, applyCoupon, removeCoupon } = useCartStore();
  const { toggle, isWishlisted } = useWishlistStore();
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ success: boolean; text: string } | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  const subtotal = getSubtotal();
  const shipping = subtotal > 999 ? 0 : 99;
  const total = getTotal();
  const recommended = PRODUCTS.filter(p => !items.find(i => i.product.id === p.id)).slice(0, 4);

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    setTimeout(() => {
      const result = applyCoupon(couponInput);
      setCouponMsg({ success: result.success, text: result.message });
      setCouponLoading(false);
      if (result.success) setCouponInput('');
    }, 600);
  };

  if (items.length === 0) {
    return (
      <div className="pt-8">
        <EmptyCart />
        {recommended.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <h3 className="font-serif text-3xl font-light text-ink mb-6 text-center">You Might Love These</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {recommended.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="pt-8 pb-12 min-h-screen bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <p className="section-label mb-2">Your Shopping Cart</p>
          <h1 className="font-serif text-4xl font-light text-ink">
            {items.length} Item{items.length !== 1 ? 's' : ''} Selected
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map(item => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-4 sm:p-6 shadow-soft flex gap-4"
                >
                  {/* Image */}
                  <Link href={`/products/${item.product.slug}`}>
                    <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-xl overflow-hidden bg-ivory-deep shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[10px] text-gold-dark uppercase tracking-widest mb-1">
                          {item.product.collectionSlug.replace(/-/g, ' ')}
                        </p>
                        <Link href={`/products/${item.product.slug}`}>
                          <h3 className="font-serif text-lg font-medium text-ink hover:text-maroon transition-colors leading-snug">
                            {item.product.name}
                          </h3>
                        </Link>
                        {item.selectedMetal && (
                          <p className="text-xs text-gray-400 mt-0.5">Metal: {item.selectedMetal}</p>
                        )}
                        {item.selectedSize && (
                          <p className="text-xs text-gray-400">Size: {item.selectedSize}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1.5 text-gray-300 hover:text-maroon transition-colors shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                      {/* Price */}
                      <div>
                        <span className="font-serif text-xl font-semibold text-maroon">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-xs text-gray-400 ml-2">
                            ({formatPrice(item.product.price)} each)
                          </span>
                        )}
                        {item.product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through ml-2">
                            {formatPrice(item.product.originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* Quantity + Actions */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggle(item.product.id)}
                          className="flex items-center gap-1 text-xs text-gray-400 hover:text-maroon transition-colors"
                        >
                          <Heart
                            size={13}
                            className={isWishlisted(item.product.id) ? 'text-maroon fill-maroon' : ''}
                          />
                          <span className="hidden sm:inline">Wishlist</span>
                        </button>
                        
                        <div className="flex items-center gap-2 bg-ivory-deep rounded-full px-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-champagne transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-5 text-center text-sm font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-champagne transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Delivery info */}
                    <p className="text-[11px] text-green-600 mt-2 font-medium">
                      ✓ {item.product.codAvailable ? 'COD Available' : ''} · Delivery in {item.product.deliveryDays}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Recommended */}
            {recommended.length > 0 && (
              <div className="mt-10">
                <h3 className="font-serif text-2xl font-light text-ink mb-4">You Might Also Like</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {recommended.slice(0, 4).map(p => (
                    <ProductCard key={p.id} product={p} variant="compact" />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-28">
              <h2 className="font-serif text-2xl font-light text-ink mb-6">Order Summary</h2>
              
              {/* Coupon */}
              <div className="mb-6">
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wider flex items-center gap-2 mb-2">
                  <Tag size={13} /> Coupon Code
                </label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-3">
                    <div>
                      <p className="text-xs font-bold text-green-700">{appliedCoupon}</p>
                      <p className="text-[10px] text-green-600">Discount applied!</p>
                    </div>
                    <button onClick={removeCoupon} className="text-xs text-red-400 hover:text-red-600">
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={e => { setCouponInput(e.target.value.toUpperCase()); setCouponMsg(null); }}
                      placeholder="KANJIVARAM10"
                      className="input-luxury flex-1 py-2 text-sm"
                      id="coupon-input"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={couponLoading}
                      className="btn-luxury btn-outline-gold rounded-lg px-4 py-2 text-xs"
                    >
                      {couponLoading ? '...' : 'Apply'}
                    </button>
                  </div>
                )}
                {couponMsg && (
                  <p className={`text-xs mt-2 ${couponMsg.success ? 'text-green-600' : 'text-red-500'}`}>
                    {couponMsg.text}
                  </p>
                )}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {['KANJIVARAM10', 'BRIDE20', 'FESTIVE25'].map(code => (
                    <button
                      key={code}
                      onClick={() => { setCouponInput(code); setCouponMsg(null); }}
                      className="text-[10px] px-2 py-0.5 border border-dashed border-gold/50 rounded-full text-gold-dark hover:bg-champagne transition-colors"
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gift */}
              <div className="flex items-center gap-3 p-3 bg-blush/40 rounded-xl mb-6">
                <Gift size={18} className="text-maroon shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-maroon">Gift Wrapping Available</p>
                  <p className="text-[10px] text-gray-500">Add premium gift packaging for ₹99</p>
                </div>
                <button className="ml-auto text-xs text-maroon font-semibold">+ Add</button>
              </div>

              {/* Price breakdown */}
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount</span>
                    <span>- {formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[11px] text-gray-400">
                    Add {formatPrice(999 - subtotal)} more for free shipping
                  </p>
                )}
                <div className="h-px bg-beige" />
                <div className="flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span className="text-maroon font-serif text-xl">{formatPrice(total)}</span>
                </div>
                <p className="text-[10px] text-gray-400">Inclusive of all taxes</p>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => router.push('/checkout')}
                className="btn-luxury btn-primary w-full rounded-xl py-4 text-sm flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ChevronRight size={16} />
              </button>
              
              <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-gray-400">
                <span>🔒 Secure Checkout</span>
                <span>·</span>
                <span>🚚 Fast Delivery</span>
                <span>·</span>
                <span>↩ Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
