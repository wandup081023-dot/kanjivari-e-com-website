'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Check, ChevronRight, ChevronLeft, Lock, Smartphone, Mail, Shield } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/wishlistStore';
import { formatPrice } from '@/lib/data';
import CheckoutAddress from '@/components/checkout/CheckoutAddress';
import CheckoutOrderSummary from '@/components/checkout/CheckoutOrderSummary';
import CheckoutPayment from '@/components/checkout/CheckoutPayment';
import CheckoutConfirmation from '@/components/checkout/CheckoutConfirmation';

// ─── STEPPER ──────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: 'Login', short: 'Login' },
  { id: 2, label: 'Address', short: 'Address' },
  { id: 3, label: 'Order Summary', short: 'Summary' },
  { id: 4, label: 'Payment', short: 'Pay' },
];

function CheckoutStepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center mb-8 px-4">
      {STEPS.map((step, i) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              currentStep > step.id ? 'step-done border-gold bg-gold text-maroon-deep' :
              currentStep === step.id ? 'step-active border-maroon bg-maroon text-white' :
              'step-pending border-beige-dark bg-white text-gray-300'
            }`}>
              {currentStep > step.id ? <Check size={14} /> : step.id}
            </div>
            <span className={`text-[10px] hidden sm:block font-medium uppercase tracking-wider transition-colors ${
              currentStep >= step.id ? 'text-maroon' : 'text-gray-300'
            }`}>{step.short}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`h-px w-12 sm:w-20 lg:w-28 mx-1 sm:mx-2 transition-all duration-500 ${
              currentStep > step.id ? 'bg-gold' : 'bg-beige'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── LOGIN STEP ───────────────────────────────────────────────────────
function LoginStep() {
  const { nextStep, setIsGuest, setGuestEmail, setGuestPhone, guestEmail, guestPhone } = useCheckoutStore();
  const [mode, setMode] = useState<'options' | 'otp' | 'guest'>('options');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = () => {
    if (phone.length === 10) setOtpSent(true);
  };

  const handleOTPChange = (val: string, idx: number) => {
    const newOtp = [...otp];
    newOtp[idx] = val.slice(-1);
    setOtp(newOtp);
    if (val && idx < 5) {
      document.getElementById(`otp-${idx + 1}`)?.focus();
    }
  };

  const handleGuestContinue = () => {
    setIsGuest(true);
    setGuestEmail(guestEmail);
    setGuestPhone(guestPhone);
    nextStep();
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl font-light text-ink mb-2">Welcome</h2>
        <p className="text-gray-500 text-sm">Login or continue as guest to complete your order</p>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'options' && (
          <motion.div
            key="options"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Phone Login */}
            <div className="bg-white rounded-2xl p-6 shadow-soft border border-beige">
              <h3 className="font-medium text-ink mb-4 flex items-center gap-2">
                <Smartphone size={18} className="text-maroon" />
                Continue with Mobile
              </h3>
              <div className="flex gap-3">
                <div className="flex items-center gap-2 px-3 py-2.5 border border-beige rounded-lg text-sm text-gray-500 shrink-0">
                  🇮🇳 +91
                </div>
                <input
                  type="tel"
                  placeholder="Enter 10-digit mobile"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="input-luxury flex-1"
                  id="phone-input"
                  maxLength={10}
                />
              </div>
              <button
                onClick={() => { setMode('otp'); handleSendOTP(); }}
                disabled={phone.length !== 10}
                className="btn-luxury btn-primary w-full rounded-xl mt-4 py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send OTP <ChevronRight size={14} />
              </button>
            </div>

            {/* Divider */}
            <div className="gold-divider text-xs text-gray-400">OR</div>

            {/* Guest */}
            <button
              onClick={() => setMode('guest')}
              className="w-full py-4 rounded-2xl border-2 border-dashed border-beige text-sm font-medium text-gray-600 hover:border-gold hover:text-maroon transition-colors"
            >
              Continue as Guest
            </button>

            {/* Email Login */}
            <div className="bg-white rounded-2xl p-5 shadow-soft border border-beige">
              <h3 className="font-medium text-ink mb-3 flex items-center gap-2 text-sm">
                <Mail size={16} className="text-gold" />
                Already have an account?
              </h3>
              <button
                onClick={() => window.location.href = '/account/login'}
                className="text-sm text-maroon font-medium hover:underline"
              >
                Sign In to your Kanjivaram account →
              </button>
            </div>
          </motion.div>
        )}

        {mode === 'otp' && (
          <motion.div
            key="otp"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="bg-white rounded-2xl p-8 shadow-soft border border-beige"
          >
            <button onClick={() => setMode('options')} className="flex items-center gap-1 text-sm text-gray-500 mb-6 hover:text-maroon">
              <ChevronLeft size={16} /> Back
            </button>
            <h3 className="font-serif text-2xl text-ink mb-1">Enter OTP</h3>
            <p className="text-sm text-gray-400 mb-6">
              OTP sent to <span className="font-medium text-ink">+91 {phone}</span>
            </p>
            
            <div className="flex gap-2 justify-center mb-6">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  value={digit}
                  onChange={e => handleOTPChange(e.target.value, i)}
                  className="w-11 h-14 text-center text-xl font-bold border-2 border-beige rounded-xl focus:border-gold focus:outline-none transition-colors"
                  maxLength={1}
                  inputMode="numeric"
                />
              ))}
            </div>
            
            <button
              onClick={() => nextStep()}
              className="btn-luxury btn-primary w-full rounded-xl py-3.5"
            >
              Verify & Continue
            </button>
            <p className="text-xs text-gray-400 text-center mt-4">
              Didn&apos;t receive OTP? <button className="text-maroon font-medium">Resend</button>
            </p>
            <p className="text-xs text-center text-gray-300 mt-2">
              Demo: any 6-digit code will work
            </p>
          </motion.div>
        )}

        {mode === 'guest' && (
          <motion.div
            key="guest"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="bg-white rounded-2xl p-8 shadow-soft border border-beige"
          >
            <button onClick={() => setMode('options')} className="flex items-center gap-1 text-sm text-gray-500 mb-6 hover:text-maroon">
              <ChevronLeft size={16} /> Back
            </button>
            <h3 className="font-serif text-2xl text-ink mb-6">Continue as Guest</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1 block">Email Address</label>
                <input
                  type="email"
                  placeholder="yourname@email.com"
                  value={guestEmail}
                  onChange={e => setGuestEmail(e.target.value)}
                  className="input-luxury"
                  id="guest-email"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-1 block">Mobile Number</label>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 border border-beige rounded-lg text-sm text-gray-500">🇮🇳 +91</div>
                  <input
                    type="tel"
                    placeholder="10-digit mobile"
                    value={guestPhone}
                    onChange={e => setGuestPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="input-luxury flex-1"
                    id="guest-phone"
                    maxLength={10}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleGuestContinue}
              disabled={!guestEmail || guestPhone.length !== 10}
              className="btn-luxury btn-primary w-full rounded-xl py-3.5 mt-6 disabled:opacity-50"
            >
              Continue as Guest
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Security note */}
      <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-400">
        <Shield size={13} className="text-green-500" />
        <span>Your information is encrypted and secure</span>
      </div>
    </div>
  );
}

// ─── CHECKOUT PAGE ────────────────────────────────────────────────────
export default function CheckoutPage() {
  const { step, orderPlaced } = useCheckoutStore();
  const { items, getSubtotal } = useCartStore();
  const router = useRouter();

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="pt-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-serif text-2xl text-ink mb-4">Your cart is empty</p>
          <button onClick={() => router.push('/collections')} className="btn-luxury btn-primary rounded-full px-8 py-3">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-8 pb-12 min-h-screen bg-warm-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        {!orderPlaced && (
          <div className="text-center mb-6">
            <h1 className="font-serif text-3xl lg:text-4xl font-light text-ink">Secure Checkout</h1>
            <div className="flex items-center justify-center gap-2 mt-2 text-xs text-gray-400">
              <Lock size={12} /> <span>256-bit SSL Encrypted</span>
            </div>
          </div>
        )}

        {/* Stepper */}
        {!orderPlaced && <CheckoutStepper currentStep={step} />}

        {/* Cart mini summary bar */}
        {!orderPlaced && (
          <div className="bg-white rounded-2xl p-4 mb-6 shadow-soft flex items-center justify-between text-sm">
            <span className="text-gray-500">{items.length} item{items.length !== 1 ? 's' : ''} in cart</span>
            <span className="font-serif text-lg font-semibold text-maroon">{formatPrice(getSubtotal())}</span>
          </div>
        )}

        {/* Steps */}
        <AnimatePresence mode="wait">
          {orderPlaced ? (
            <motion.div key="confirmation" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <CheckoutConfirmation />
            </motion.div>
          ) : step === 1 ? (
            <motion.div key="login" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <LoginStep />
            </motion.div>
          ) : step === 2 ? (
            <motion.div key="address" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <CheckoutAddress />
            </motion.div>
          ) : step === 3 ? (
            <motion.div key="summary" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <CheckoutOrderSummary />
            </motion.div>
          ) : (
            <motion.div key="payment" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <CheckoutPayment />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
