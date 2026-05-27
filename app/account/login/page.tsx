'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Mail,
  Phone,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

type Tab = 'login' | 'signup';
type LoginMethod = 'otp' | 'password';

const tabVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 40 : -40,
    opacity: 0,
  }),
};

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<Tab>('login');
  const [direction, setDirection] = useState(1);
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('password');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginOtp, setLoginOtp] = useState('');

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  const switchTab = (tab: Tab) => {
    setDirection(tab === 'signup' ? 1 : -1);
    setActiveTab(tab);
    setSuccessMessage('');
  };

  const handleSendOtp = () => {
    if (loginPhone.length >= 10) {
      setOtpSent(true);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('🎉 Login successful! Welcome back, Priya.');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('✨ Account created! Welcome to Kanjivaram.');
  };

  return (
    <div className="min-h-screen bg-warm-white pt-28 pb-16 flex items-start justify-center">
      <div className="w-full max-w-md px-4">

        {/* Brand Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <Link href="/" className="inline-block mb-4">
            <span className="font-serif text-2xl font-bold text-maroon tracking-wide">
              Kanjivaram
            </span>
          </Link>
          <p className="text-xs uppercase tracking-[0.3em] text-gold-dark font-medium">
            Handcrafted Heritage Jewelry
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-3xl shadow-luxury-lg border border-beige/40 overflow-hidden"
        >
          {/* Tab Switcher */}
          <div className="flex border-b border-beige/60">
            {(['login', 'signup'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => switchTab(tab)}
                className={`flex-1 py-4 text-sm font-semibold capitalize transition-all duration-200 relative ${
                  activeTab === tab
                    ? 'text-maroon'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab === 'login' ? 'Sign In' : 'Create Account'}
                {activeTab === tab && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-gold"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8">
            {/* Success message */}
            <AnimatePresence>
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-5 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 flex items-center gap-3"
                >
                  <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                  <p className="text-sm text-emerald-700 font-medium">{successMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Google Button */}
            <button className="w-full flex items-center justify-center gap-3 border border-beige-dark hover:border-gold/40 rounded-2xl py-3 px-4 text-sm font-medium text-ink hover:bg-beige/20 transition-all duration-200 group mb-6">
              <GoogleIcon />
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-beige-dark" />
              <span className="text-xs text-gray-400 font-medium">or</span>
              <div className="h-px flex-1 bg-beige-dark" />
            </div>

            {/* Animated Tab Content */}
            <AnimatePresence mode="wait" custom={direction}>
              {activeTab === 'login' ? (
                <motion.div
                  key="login"
                  custom={direction}
                  variants={tabVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {/* Login Method Toggle */}
                  <div className="flex bg-beige/40 rounded-xl p-1 mb-5">
                    {(['password', 'otp'] as LoginMethod[]).map((method) => (
                      <button
                        key={method}
                        onClick={() => { setLoginMethod(method); setOtpSent(false); }}
                        className={`flex-1 py-2 text-xs font-semibold rounded-lg capitalize transition-all duration-200 ${
                          loginMethod === method
                            ? 'bg-white text-maroon shadow-soft'
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        {method === 'password' ? '📧 Email & Password' : '📱 Phone OTP'}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                    {loginMethod === 'password' ? (
                      <>
                        <div className="relative">
                          <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            placeholder="Email address"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            className="input-luxury pl-11 w-full"
                            required
                          />
                        </div>
                        <div className="relative">
                          <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            className="input-luxury pl-11 pr-11 w-full"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>
                        </div>
                        <div className="flex justify-end">
                          <button type="button" className="text-xs text-gold-dark hover:text-maroon font-medium transition-colors">
                            Forgot password?
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="relative">
                          <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            placeholder="10-digit mobile number"
                            value={loginPhone}
                            onChange={(e) => setLoginPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            className="input-luxury pl-11 w-full"
                            maxLength={10}
                            required
                          />
                        </div>
                        {!otpSent ? (
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            disabled={loginPhone.length < 10}
                            className="btn-luxury btn-outline-gold w-full py-3 rounded-xl text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            Send OTP
                          </button>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-3"
                          >
                            <p className="text-xs text-emerald-600 flex items-center gap-1.5">
                              <CheckCircle2 size={12} />
                              OTP sent to +91 {loginPhone}
                            </p>
                            <div className="flex gap-2">
                              {[0, 1, 2, 3].map((i) => (
                                <input
                                  key={i}
                                  type="text"
                                  maxLength={1}
                                  value={loginOtp[i] || ''}
                                  onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, '');
                                    const arr = loginOtp.split('');
                                    arr[i] = val;
                                    setLoginOtp(arr.join(''));
                                    if (val && e.target.nextSibling) {
                                      (e.target.nextSibling as HTMLElement).focus();
                                    }
                                  }}
                                  className="flex-1 aspect-square text-center text-lg font-bold text-maroon border-2 border-beige-dark focus:border-maroon rounded-xl outline-none transition-colors bg-warm-white"
                                />
                              ))}
                            </div>
                            <button type="button" className="text-xs text-gold-dark hover:text-maroon transition-colors">
                              Resend OTP in 30s
                            </button>
                          </motion.div>
                        )}
                      </>
                    )}

                    <button
                      type="submit"
                      className="btn-luxury btn-primary w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 mt-2"
                    >
                      <Sparkles size={16} />
                      Sign In to Kanjivaram
                      <ArrowRight size={16} />
                    </button>
                  </form>

                  <p className="text-center text-xs text-gray-400 mt-5">
                    New to Kanjivaram?{' '}
                    <button onClick={() => switchTab('signup')} className="text-maroon font-semibold hover:underline">
                      Create an account
                    </button>
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  custom={direction}
                  variants={tabVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="relative">
                      <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Full name"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        className="input-luxury pl-11 w-full"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="Mobile number"
                        value={signupPhone}
                        onChange={(e) => setSignupPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="input-luxury pl-11 w-full"
                        maxLength={10}
                        required
                      />
                    </div>
                    <div className="relative">
                      <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        placeholder="Email address"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        className="input-luxury pl-11 w-full"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create password"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        className="input-luxury pl-11 pr-11 w-full"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                    <div className="relative">
                      <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm password"
                        value={signupConfirmPassword}
                        onChange={(e) => setSignupConfirmPassword(e.target.value)}
                        className="input-luxury pl-11 pr-11 w-full"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>

                    {/* Password strength hint */}
                    {signupPassword && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="flex items-center gap-2"
                      >
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                              signupPassword.length >= level * 3
                                ? level <= 2 ? 'bg-amber-400' : 'bg-emerald-400'
                                : 'bg-beige-dark'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                          {signupPassword.length < 6 ? 'Weak' : signupPassword.length < 10 ? 'Good' : 'Strong'}
                        </span>
                      </motion.div>
                    )}

                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      By creating an account, you agree to our{' '}
                      <Link href="/terms" className="text-maroon hover:underline">Terms of Service</Link> and{' '}
                      <Link href="/privacy" className="text-maroon hover:underline">Privacy Policy</Link>.
                    </p>

                    <button
                      type="submit"
                      className="btn-luxury btn-primary w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2"
                    >
                      <Sparkles size={16} />
                      Create My Account
                      <ArrowRight size={16} />
                    </button>
                  </form>

                  <p className="text-center text-xs text-gray-400 mt-5">
                    Already have an account?{' '}
                    <button onClick={() => switchTab('login')} className="text-maroon font-semibold hover:underline">
                      Sign in
                    </button>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-400"
        >
          <span className="flex items-center gap-1.5">🔒 SSL Secured</span>
          <span className="text-beige-dark">|</span>
          <span className="flex items-center gap-1.5">🛡️ Safe Checkout</span>
          <span className="text-beige-dark">|</span>
          <span className="flex items-center gap-1.5">✨ 50K+ Happy Customers</span>
        </motion.div>
      </div>
    </div>
  );
}
