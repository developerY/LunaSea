import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Sparkles, CreditCard, Truck, ArrowRight, PackageCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted: () => void;
  formatPrice: (price: number) => string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCompleted,
  formatPrice,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'success'>('details');
  const [formData, setFormData] = useState({
    firstName: 'Elena',
    lastName: 'Aethelgard',
    email: 'elena.a@hautebiotech.com',
    address: '42 Belgravia Crescent',
    city: 'London',
    postalCode: 'SW1X 8PX',
    country: 'United Kingdom',
    cardNumber: '•••• •••• •••• 4291',
    expiry: '09/28',
    cvv: '•••'
  });

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 85 ? 0 : 8;
  const total = subtotal + shipping;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    onOrderCompleted();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-surface-container-lowest rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/60 relative p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-surface-container hover:bg-surface-variant flex items-center justify-center text-primary transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 'details' ? (
          <div>
            <div className="mb-6">
              <span className="font-outfit text-[11px] text-secondary uppercase tracking-widest font-semibold block">
                Secure Oceanic Dispatch
              </span>
              <h2 className="font-playfair text-2xl md:text-3xl text-primary font-normal">
                LunaSea Order Allocation
              </h2>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-6 font-outfit text-xs">
              
              {/* Shipping Address */}
              <div className="space-y-3">
                <h3 className="font-semibold text-primary uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-secondary" />
                  <span>1. Sanctuary Delivery Destination</span>
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-surface-container-low px-3.5 py-2.5 rounded-xl border border-surface-variant focus:outline-none focus:border-secondary"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-surface-container-low px-3.5 py-2.5 rounded-xl border border-surface-variant focus:outline-none focus:border-secondary"
                  />
                </div>

                <input
                  type="email"
                  required
                  placeholder="Dispatch Confirmation Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-surface-container-low px-3.5 py-2.5 rounded-xl border border-surface-variant focus:outline-none focus:border-secondary"
                />

                <input
                  type="text"
                  required
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-surface-container-low px-3.5 py-2.5 rounded-xl border border-surface-variant focus:outline-none focus:border-secondary"
                />

                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-surface-container-low px-3.5 py-2.5 rounded-xl border border-surface-variant focus:outline-none focus:border-secondary"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-surface-container-low px-3.5 py-2.5 rounded-xl border border-surface-variant focus:outline-none focus:border-secondary"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-surface-container-low px-3.5 py-2.5 rounded-xl border border-surface-variant focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>

              {/* Payment Info */}
              <div className="space-y-3 pt-2">
                <h3 className="font-semibold text-primary uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-secondary" />
                  <span>2. Payment Method</span>
                </h3>

                <div className="p-3 bg-surface-container-low rounded-xl border border-surface-variant/60 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-primary">Prestige Bio-Card / Apple Pay</span>
                    <span className="text-[10px] text-secondary font-semibold">256-Bit SSL Encrypted</span>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full bg-white px-3.5 py-2 rounded-lg border border-surface-variant focus:outline-none focus:border-secondary"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                      className="w-full bg-white px-3.5 py-2 rounded-lg border border-surface-variant focus:outline-none focus:border-secondary"
                    />
                    <input
                      type="text"
                      required
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                      className="w-full bg-white px-3.5 py-2 rounded-lg border border-surface-variant focus:outline-none focus:border-secondary"
                    />
                  </div>
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="p-3.5 bg-surface-container rounded-xl">
                <div className="flex justify-between font-medium text-primary mb-1">
                  <span>Allocated Formulations ({items.length})</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <p className="text-[10px] text-outline">
                  Includes Carbon-Neutral Shipping & Certified Leaping Bunny Formulations.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-container text-white py-3.5 rounded-full uppercase tracking-wider font-semibold shadow-lg transition-all cursor-pointer hover:scale-[1.01]"
              >
                Confirm Allocation • {formatPrice(total)}
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-secondary-fixed/50 text-secondary mx-auto flex items-center justify-center">
              <PackageCheck className="w-8 h-8 text-secondary" />
            </div>

            <span className="font-outfit text-xs text-secondary uppercase tracking-widest font-semibold block">
              Tidal Harvest Allocation Confirmed
            </span>

            <h2 className="font-playfair text-3xl text-primary font-normal">
              Thank You, {formData.firstName}
            </h2>

            <p className="font-outfit text-xs md:text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed font-light">
              Your order <strong className="font-medium text-primary">#LS-92841</strong> has been scheduled with our coastal Brittany clean dispatch facility. A confirmation dispatch docket was sent to <em>{formData.email}</em>.
            </p>

            <div className="bg-surface-container-low p-4 rounded-2xl max-w-sm mx-auto text-left text-xs font-outfit space-y-1.5 border border-surface-variant/40">
              <div className="flex justify-between">
                <span className="text-outline">Estimated Delivery:</span>
                <span className="font-medium text-primary">2–3 Days (Carbon Neutral)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Harvest Batch:</span>
                <span className="font-medium text-primary">Fresh Lunar Reserve</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">Complimentary Gift:</span>
                <span className="text-secondary font-medium">Bio-Pearl Elixir Vial Included</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-4 bg-primary text-white text-xs font-outfit uppercase tracking-wider px-8 py-3 rounded-full hover:bg-primary-container transition-all cursor-pointer shadow-md"
            >
              Return to Sanctuary
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
