'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Tag, Truck, MapPin } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/wishlistStore';
import { formatPrice } from '@/lib/data';

export default function CheckoutOrderSummary() {
  const { items, getSubtotal, discount, appliedCoupon, applyCoupon, removeCoupon } = useCartStore();
  const { addresses, selectedAddressId, nextStep, prevStep } = useCheckoutStore();
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ success: boolean; text: string } | null>(null);

  const subtotal = getSubtotal();
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal - discount + shipping;
  const selectedAddress = addresses.find(a => a.id === selectedAddressId);

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponInput);
    setCouponMsg({ success: result.success, text: result.message });
    if (result.success) setCouponInput('');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="font-serif text-3xl font-light text-ink mb-2">Order Summary</h2>
      <p className="text-gray-500 text-sm mb-6">Review your order before payment</p>

      {/* Delivery Address */}
      {selectedAddress && (
        <div className="bg-white rounded-2xl p-5 mb-5 shadow-soft border border-beige">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-sm text-ink flex items-center gap-2">
              <MapPin size={15} className="text-maroon" /> Delivering to
            </h3>
            <button onClick={prevStep} className="text-xs text-maroon font-medium hover:underline">Change</button>
          </div>
          <p className="font-semibold text-sm text-ink">{selectedAddress.name}</p>
          <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">
            {selectedAddress.houseNo}, {selectedAddress.area}, {selectedAddress.city}, {selectedAddress.state} — {selectedAddress.pincode}
          </p>
          <p className="text-xs text-gray-400 mt-1">+91 {selectedAddress.phone}</p>
        </div>
      )}

      {/* Products */}
      <div className="bg-white rounded-2xl shadow-soft overflow-hidden mb-5">
        <div className="p-4 border-b border-beige">
          <h3 className="font-medium text-sm text-ink">{items.length} Item{items.length !== 1 ? 's' : ''} in your order</h3>
        </div>
        <div className="divide-y divide-beige/50">
          {items.map(item => (
            <div key={item.product.id} className="flex gap-4 p-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-ivory-deep shrink-0">
                <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm text-ink leading-snug">{item.product.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {item.selectedMetal && `Metal: ${item.selectedMetal}`}
                  {item.selectedSize && ` · Size: ${item.selectedSize}`}
                </p>
                <div className="flex items-center justify-between mt-1.5">
                  <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                  <p className="font-serif font-semibold text-maroon">{formatPrice(item.product.price * item.quantity)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery estimate */}
      <div className="bg-green-50 rounded-2xl p-4 mb-5 flex items-center gap-3 border border-green-100">
        <Truck size={18} className="text-green-600 shrink-0" />
        <div>
          <p className="text-sm font-medium text-green-700">Estimated Delivery: Jun 1 — Jun 3</p>
          <p className="text-xs text-green-600">{shipping === 0 ? 'Free shipping applied!' : `Shipping: ${formatPrice(shipping)}`}</p>
        </div>
      </div>

      {/* Coupon */}
      <div className="bg-white rounded-2xl p-5 mb-5 shadow-soft">
        <h3 className="font-medium text-sm text-ink mb-3 flex items-center gap-2">
          <Tag size={15} className="text-gold" /> Coupon / Promo Code
        </h3>
        {appliedCoupon ? (
          <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-3">
            <div>
              <p className="text-sm font-bold text-green-700">{appliedCoupon}</p>
              <p className="text-xs text-green-600">You saved {formatPrice(discount)}!</p>
            </div>
            <button onClick={removeCoupon} className="text-xs text-red-400 hover:text-red-600 font-medium">Remove</button>
          </div>
        ) : (
          <div className="flex gap-3">
            <input
              type="text"
              value={couponInput}
              onChange={e => { setCouponInput(e.target.value.toUpperCase()); setCouponMsg(null); }}
              placeholder="Enter coupon code"
              className="input-luxury flex-1 text-sm"
              id="order-coupon"
            />
            <button onClick={handleApplyCoupon} className="btn-luxury btn-outline-gold rounded-xl px-5 py-2.5 text-xs">Apply</button>
          </div>
        )}
        {couponMsg && (
          <p className={`text-xs mt-2 ${couponMsg.success ? 'text-green-600' : 'text-red-500'}`}>{couponMsg.text}</p>
        )}
      </div>

      {/* Price breakdown */}
      <div className="bg-white rounded-2xl p-5 shadow-soft mb-6">
        <h3 className="font-medium text-sm text-ink mb-4">Price Details</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Price ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>- {formatPrice(discount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-500">Delivery Charges</span>
            <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
          </div>
          <div className="h-px bg-beige" />
          <div className="flex justify-between font-bold text-base">
            <span>Total Amount</span>
            <span className="font-serif text-xl text-maroon">{formatPrice(total)}</span>
          </div>
          {discount > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-600 text-xs font-medium text-right"
            >
              🎉 You&apos;re saving {formatPrice(discount)} on this order!
            </motion.p>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <button onClick={prevStep} className="btn-luxury btn-outline rounded-xl px-6 py-3.5 text-sm flex items-center gap-2">
          <ChevronLeft size={16} /> Back
        </button>
        <button onClick={nextStep} className="btn-luxury btn-primary rounded-xl flex-1 py-3.5 text-sm flex items-center justify-center gap-2">
          Proceed to Payment <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
