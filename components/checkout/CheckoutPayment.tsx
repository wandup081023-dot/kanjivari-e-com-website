'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Smartphone, CreditCard, Building, Wallet, Truck, Shield, Lock, Check } from 'lucide-react';
import { useCheckoutStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/data';

const PAYMENT_METHODS = [
  {
    id: 'upi',
    label: 'UPI',
    icon: Smartphone,
    description: 'GPay, PhonePe, Paytm, BHIM',
    popular: true,
  },
  {
    id: 'card',
    label: 'Credit / Debit Card',
    icon: CreditCard,
    description: 'Visa, Mastercard, RuPay',
    popular: false,
  },
  {
    id: 'netbanking',
    label: 'Net Banking',
    icon: Building,
    description: 'All major Indian banks',
    popular: false,
  },
  {
    id: 'wallet',
    label: 'Wallets',
    icon: Wallet,
    description: 'Paytm, Amazon Pay, Mobikwik',
    popular: false,
  },
  {
    id: 'cod',
    label: 'Cash on Delivery',
    icon: Truck,
    description: 'Pay when you receive',
    popular: false,
  },
];

const BANKS = ['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank', 'Bank of Baroda'];
const WALLETS = ['Paytm', 'Amazon Pay', 'Mobikwik', 'FreeCharge'];
const UPI_APPS = [
  { name: 'Google Pay', emoji: '🟢' },
  { name: 'PhonePe', emoji: '🟣' },
  { name: 'Paytm', emoji: '🔵' },
  { name: 'BHIM', emoji: '🔴' },
];

function UPIPanel({ onReady }: { onReady: (ready: boolean) => void }) {
  const [upiId, setUpiId] = useState('');
  const [selectedApp, setSelectedApp] = useState('');

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-2">
        {UPI_APPS.map(app => (
          <button
            key={app.name}
            onClick={() => { setSelectedApp(app.name); onReady(true); }}
            className={`p-3 rounded-xl border-2 text-center transition-all ${
              selectedApp === app.name ? 'border-maroon bg-blush/20' : 'border-beige hover:border-champagne-dark'
            }`}
          >
            <div className="text-2xl mb-1">{app.emoji}</div>
            <p className="text-[10px] font-medium text-ink">{app.name}</p>
          </button>
        ))}
      </div>
      <div className="gold-divider text-xs text-gray-400">OR</div>
      <div>
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Enter UPI ID</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={upiId}
            onChange={e => { setUpiId(e.target.value); onReady(e.target.value.includes('@')); }}
            placeholder="yourname@upi"
            className="input-luxury flex-1"
            id="upi-id"
          />
          <button className="btn-luxury btn-outline-gold rounded-lg px-4 text-xs">Verify</button>
        </div>
      </div>
    </div>
  );
}

function CardPanel({ onReady }: { onReady: (ready: boolean) => void }) {
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });

  const formatCardNumber = (val: string) => {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  const isReady = card.number.replace(/\s/g, '').length === 16 && card.name && card.expiry.length === 5 && card.cvv.length === 3;

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Card Number*</label>
        <input
          type="text"
          value={card.number}
          onChange={e => { const v = formatCardNumber(e.target.value); setCard(c => ({ ...c, number: v })); onReady(v.replace(/\s/g, '').length === 16 && !!card.name && card.expiry.length === 5 && card.cvv.length === 3); }}
          placeholder="1234 5678 9012 3456"
          className="input-luxury"
          id="card-number"
          maxLength={19}
        />
      </div>
      <div>
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Name on Card*</label>
        <input
          type="text"
          value={card.name}
          onChange={e => setCard(c => ({ ...c, name: e.target.value }))}
          placeholder="PRIYA SHARMA"
          className="input-luxury uppercase"
          id="card-name"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Expiry (MM/YY)*</label>
          <input
            type="text"
            value={card.expiry}
            onChange={e => setCard(c => ({ ...c, expiry: formatExpiry(e.target.value) }))}
            placeholder="12/27"
            className="input-luxury"
            id="card-expiry"
            maxLength={5}
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">CVV*</label>
          <input
            type="password"
            value={card.cvv}
            onChange={e => setCard(c => ({ ...c, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) }))}
            placeholder="•••"
            className="input-luxury"
            id="card-cvv"
            maxLength={3}
          />
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Shield size={12} className="text-green-500" />
        <span>Your card info is encrypted with 256-bit SSL</span>
      </div>
    </div>
  );
}

export default function CheckoutPayment() {
  const { setPaymentMethod, paymentMethod, prevStep, placeOrder } = useCheckoutStore();
  const { getTotal, clearCart } = useCartStore();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(paymentMethod);
  const [isReady, setIsReady] = useState(false);
  const [isPlacing, setIsPlacing] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');

  const total = getTotal();

  const handleSelect = (id: string) => {
    setSelectedMethod(id);
    setPaymentMethod(id);
    setIsReady(['cod'].includes(id));
  };

  const handlePlaceOrder = () => {
    setIsPlacing(true);
    setTimeout(() => {
      placeOrder();
      clearCart();
    }, 1800);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="font-serif text-3xl font-light text-ink mb-2">Select Payment Method</h2>
      <p className="text-gray-500 text-sm mb-6">All transactions are secure and encrypted</p>

      <div className="space-y-3 mb-6">
        {PAYMENT_METHODS.map(method => {
          const Icon = method.icon;
          const active = selectedMethod === method.id;

          return (
            <div
              key={method.id}
              className={`bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300 shadow-soft ${
                active ? 'border-maroon' : 'border-beige hover:border-champagne-dark'
              }`}
            >
              <button
                onClick={() => handleSelect(method.id)}
                className="w-full flex items-center gap-4 p-4 text-left"
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  active ? 'border-maroon bg-maroon' : 'border-gray-300'
                }`}>
                  {active && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${active ? 'bg-maroon' : 'bg-champagne'}`}>
                  <Icon size={18} className={active ? 'text-champagne' : 'text-maroon'} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm text-ink">{method.label}</p>
                    {method.popular && <span className="badge badge-new text-[9px]">Popular</span>}
                  </div>
                  <p className="text-xs text-gray-400">{method.description}</p>
                </div>
              </button>

              {/* Expanded panels */}
              <AnimatePresence>
                {active && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-5 pt-1 border-t border-beige">
                      {method.id === 'upi' && (
                        <UPIPanel onReady={setIsReady} />
                      )}
                      {method.id === 'card' && (
                        <CardPanel onReady={setIsReady} />
                      )}
                      {method.id === 'netbanking' && (
                        <div>
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">Select Your Bank</label>
                          <div className="grid grid-cols-2 gap-2">
                            {BANKS.map(bank => (
                              <button
                                key={bank}
                                onClick={() => { setSelectedBank(bank); setIsReady(true); }}
                                className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all ${
                                  selectedBank === bank ? 'border-maroon bg-blush/20 text-maroon' : 'border-beige hover:border-champagne-dark text-gray-600'
                                }`}
                              >
                                🏦 {bank}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      {method.id === 'wallet' && (
                        <div>
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">Select Wallet</label>
                          <div className="flex flex-wrap gap-2">
                            {WALLETS.map(wallet => (
                              <button
                                key={wallet}
                                onClick={() => { setSelectedWallet(wallet); setIsReady(true); }}
                                className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                                  selectedWallet === wallet ? 'border-maroon bg-blush/20 text-maroon' : 'border-beige hover:border-champagne-dark text-gray-600'
                                }`}
                              >
                                👝 {wallet}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      {method.id === 'cod' && (
                        <div className="flex items-start gap-3 bg-amber-50 p-3 rounded-xl border border-amber-100">
                          <Truck size={18} className="text-amber-600 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-amber-800">Cash on Delivery selected</p>
                            <p className="text-xs text-amber-600 mt-0.5">Pay in cash when your order arrives. Additional ₹40 COD charge applies.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Place Order */}
      <div className="bg-white rounded-2xl p-5 shadow-soft mb-5">
        <div className="flex justify-between mb-4">
          <span className="text-gray-500">Total Payable</span>
          <span className="font-serif text-2xl font-semibold text-maroon">{formatPrice(total)}</span>
        </div>
        <button
          onClick={handlePlaceOrder}
          disabled={!selectedMethod || (!isReady && selectedMethod !== null) || isPlacing}
          className="btn-luxury btn-primary w-full rounded-xl py-4 text-sm flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {isPlacing ? (
            <motion.div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-champagne border-t-transparent rounded-full"
              />
              Placing Your Order...
            </motion.div>
          ) : (
            <>
              <Lock size={16} />
              Place Order — {formatPrice(total)}
            </>
          )}
        </button>
        <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-gray-400">
          <Shield size={12} className="text-green-500" />
          <span>100% Secure · Payment gateway integration pending</span>
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={prevStep} className="btn-luxury btn-outline rounded-xl px-6 py-3 text-sm flex items-center gap-2">
          <ChevronLeft size={16} /> Back
        </button>
        <div className="flex-1 flex items-center justify-center text-xs text-gray-400">
          🔒 256-bit SSL Secured Checkout
        </div>
      </div>
    </div>
  );
}
