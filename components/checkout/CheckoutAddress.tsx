'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Home, Briefcase, ChevronRight, ChevronLeft, Check, MapPin } from 'lucide-react';
import { useCheckoutStore, Address } from '@/store/wishlistStore';

function AddressCard({ address, selected, onSelect }: { address: Address; selected: boolean; onSelect: () => void }) {
  return (
    <div
      onClick={onSelect}
      className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
        selected ? 'border-maroon bg-blush/20' : 'border-beige bg-white hover:border-champagne-dark'
      }`}
    >
      {selected && (
        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-maroon flex items-center justify-center">
          <Check size={13} className="text-white" />
        </div>
      )}
      <div className="flex items-start gap-3">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${selected ? 'bg-maroon text-white' : 'bg-champagne text-maroon'}`}>
          {address.type === 'Home' ? <Home size={16} /> : <Briefcase size={16} />}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-ink text-sm">{address.name}</p>
            <span className={`text-[9px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider ${
              address.type === 'Home' ? 'bg-champagne text-maroon' : 'bg-blush text-maroon'
            }`}>
              {address.type}
            </span>
            {address.isDefault && (
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 uppercase font-bold tracking-wider">Default</span>
            )}
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {address.houseNo}, {address.area}
            {address.landmark && `, Near ${address.landmark}`},<br />
            {address.city}, {address.state} — {address.pincode}
          </p>
          <p className="text-sm text-gray-500 mt-1">📞 +91 {address.phone}</p>
        </div>
      </div>
      {selected && (
        <div className="mt-3 pt-3 border-t border-blush">
          <p className="text-xs text-green-600 font-medium flex items-center gap-1">
            <MapPin size={11} /> Delivering to this address
          </p>
        </div>
      )}
    </div>
  );
}

function AddAddressForm({ onClose }: { onClose: () => void }) {
  const { addAddress } = useCheckoutStore();
  const [form, setForm] = useState({
    name: '', phone: '', pincode: '', state: '', city: '',
    houseNo: '', area: '', landmark: '', type: 'Home' as 'Home' | 'Work',
  });

  const STATES = ['Andhra Pradesh', 'Delhi', 'Gujarat', 'Karnataka', 'Kerala', 'Maharashtra', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'West Bengal', 'Uttar Pradesh'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress({ ...form, isDefault: false });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border-2 border-gold/30 shadow-luxury"
    >
      <h3 className="font-serif text-xl text-ink mb-5">Add New Address</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Full Name*</label>
            <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Priya Sharma" className="input-luxury" id="addr-name" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Mobile*</label>
            <input required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))} placeholder="9876543210" className="input-luxury" id="addr-phone" maxLength={10} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">PIN Code*</label>
            <input required value={form.pincode} onChange={e => setForm(f => ({ ...f, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) }))} placeholder="400001" className="input-luxury" id="addr-pincode" maxLength={6} />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">City*</label>
            <input required value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="Mumbai" className="input-luxury" id="addr-city" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">State*</label>
            <select required value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} className="input-luxury" id="addr-state">
              <option value="">Select</option>
              {STATES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">House/Flat/Floor No.*</label>
          <input required value={form.houseNo} onChange={e => setForm(f => ({ ...f, houseNo: e.target.value }))} placeholder="Flat 302, Lotus Heights" className="input-luxury" id="addr-house" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Area/Colony/Street*</label>
          <input required value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value }))} placeholder="Bandra West" className="input-luxury" id="addr-area" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-1">Landmark (Optional)</label>
          <input value={form.landmark} onChange={e => setForm(f => ({ ...f, landmark: e.target.value }))} placeholder="Near Hill Road" className="input-luxury" id="addr-landmark" />
        </div>
        
        {/* Address Type */}
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">Address Type</label>
          <div className="flex gap-3">
            {(['Home', 'Work'] as const).map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setForm(f => ({ ...f, type }))}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                  form.type === type ? 'border-maroon bg-blush/30 text-maroon' : 'border-beige text-gray-500 hover:border-champagne-dark'
                }`}
              >
                {type === 'Home' ? <Home size={15} /> : <Briefcase size={15} />}
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose} className="btn-luxury btn-outline rounded-xl flex-1 py-3 text-sm">
            Cancel
          </button>
          <button type="submit" className="btn-luxury btn-primary rounded-xl flex-1 py-3 text-sm">
            Save Address
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default function CheckoutAddress() {
  const { addresses, selectedAddressId, selectAddress, nextStep, prevStep } = useCheckoutStore();
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="font-serif text-3xl font-light text-ink mb-2">Select Delivery Address</h2>
      <p className="text-gray-500 text-sm mb-6">Choose where you&apos;d like your jewelry delivered</p>

      <div className="space-y-3 mb-5">
        <AnimatePresence>
          {addresses.map(address => (
            <motion.div key={address.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <AddressCard
                address={address}
                selected={selectedAddressId === address.id}
                onSelect={() => selectAddress(address.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Address */}
      <AnimatePresence mode="wait">
        {showAddForm ? (
          <AddAddressForm onClose={() => setShowAddForm(false)} />
        ) : (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowAddForm(true)}
            className="w-full py-4 rounded-2xl border-2 border-dashed border-gold/40 text-sm font-medium text-maroon hover:bg-champagne/20 hover:border-gold transition-all flex items-center justify-center gap-2"
          >
            <Plus size={16} /> Add New Address
          </motion.button>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-4 mt-8">
        <button onClick={prevStep} className="btn-luxury btn-outline rounded-xl px-6 py-3.5 text-sm flex items-center gap-2">
          <ChevronLeft size={16} /> Back
        </button>
        <button
          onClick={nextStep}
          disabled={!selectedAddressId}
          className="btn-luxury btn-primary rounded-xl flex-1 py-3.5 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
        >
          Deliver Here <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
