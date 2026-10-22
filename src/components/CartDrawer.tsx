import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, shadeId?: string) => void;
  onRemoveItem: (productId: string, shadeId?: string) => void;
  onProceedToCheckout: () => void;
  formatPrice: (price: number) => string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  formatPrice,
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [ecoPackaging, setEcoPackaging] = useState(true);

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 85;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountRemaining = Math.max(0, freeShippingThreshold - subtotal);

  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingFee = subtotal === 0 || isFreeShipping ? 0 : 8;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'LUNAR15' || code === 'LUNAR') {
      setDiscountPercent(15);
      setPromoMessage('15% Tidal Welcome savings applied');
    } else if (code === 'OCEAN10') {
      setDiscountPercent(10);
      setPromoMessage('10% Clean Ocean savings applied');
    } else {
      setPromoMessage('Invalid invitation code. Try "LUNAR15"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface-container-lowest shadow-2xl flex flex-col justify-between border-l border-surface-variant animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-surface-container">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-playfair text-xl text-primary font-medium">
                  Your Tidal Bag
                </h2>
                <span className="font-outfit text-xs px-2 py-0.5 rounded-full bg-surface-container text-secondary font-semibold">
                  {items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-variant flex items-center justify-center text-primary transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Threshold progress */}
            <div className="bg-surface-container-low p-3.5 rounded-2xl border border-surface-variant/40">
              <div className="flex items-center justify-between text-[11px] font-outfit mb-1.5">
                <span className="text-primary font-medium flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-secondary" />
                  {isFreeShipping ? 'Bio-Pearl Elixir & Free Shipping Unlocked!' : `Add ${formatPrice(amountRemaining)} for Complimentary Elixir`}
                </span>
                <span className="text-secondary font-semibold">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                <div 
                  className="h-full bg-secondary transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-outline">
                  <ShoppingBag className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="font-playfair text-xl text-primary font-medium">
                  Your Bag is Calm as Low Tide
                </h3>
                <p className="font-outfit text-xs text-on-surface-variant font-light max-w-xs leading-relaxed">
                  Explore our cold-extracted sea kelp serums, tinting dew drops, and night repair balms.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 bg-primary text-white text-xs font-outfit uppercase tracking-wider px-6 py-2.5 rounded-full hover:bg-primary-container transition-colors cursor-pointer"
                >
                  Explore Formulations
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedShade?.id || 'default'}`}
                  className="flex gap-4 p-3.5 rounded-2xl bg-surface-container-low/60 border border-surface-variant/40"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-20 object-cover rounded-xl bg-surface-container shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-playfair text-sm text-primary font-medium leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedShade?.id)}
                          className="text-outline hover:text-red-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedShade && (
                        <p className="font-outfit text-[10px] text-secondary mt-0.5 flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block"
                            style={{ backgroundColor: item.selectedShade.hex }}
                          />
                          <span>{item.selectedShade.name}</span>
                        </p>
                      )}

                      <p className="font-outfit text-[11px] text-outline mt-0.5">
                        {item.product.volume}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-surface-container rounded-full px-2 py-0.5 border border-surface-variant text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1, item.selectedShade?.id)}
                          className="p-1 hover:text-primary"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-outfit font-semibold px-2 min-w-[16px] text-center text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.selectedShade?.id)}
                          className="p-1 hover:text-primary"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-outfit text-xs font-semibold text-primary">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Actions */}
          {items.length > 0 && (
            <div className="p-6 border-t border-surface-container bg-surface-container-lowest space-y-4">
              
              {/* Promo input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-outline absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Invitation Code (e.g. LUNAR15)"
                    className="w-full bg-surface-container-low pl-9 pr-3 py-2 rounded-xl text-xs font-outfit border border-surface-variant focus:outline-none focus:border-secondary uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-surface-container text-primary hover:bg-surface-variant px-4 py-2 rounded-xl text-xs font-outfit uppercase tracking-wider font-semibold cursor-pointer"
                >
                  Apply
                </button>
              </form>
              
              {promoMessage && (
                <p className={`text-[11px] font-outfit ${discountPercent > 0 ? 'text-secondary font-medium' : 'text-red-600'}`}>
                  {promoMessage}
                </p>
              )}

              {/* Eco-packaging toggle */}
              <label className="flex items-center gap-2 cursor-pointer text-xs font-outfit text-on-surface-variant select-none">
                <input
                  type="checkbox"
                  checked={ecoPackaging}
                  onChange={(e) => setEcoPackaging(e.target.checked)}
                  className="rounded text-primary focus:ring-secondary accent-primary"
                />
                <span>Zero-waste compostable sea-algae packing envelope</span>
              </label>

              {/* Summary Breakdown */}
              <div className="space-y-1.5 text-xs font-outfit border-t border-surface-container pt-3">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-secondary font-medium">
                    <span>Tidal Invitation Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-on-surface-variant">
                  <span>Global Carbon-Neutral Delivery</span>
                  <span>{shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-primary pt-2 border-t border-surface-container">
                  <span>Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full bg-primary hover:bg-primary-container text-white py-3.5 px-6 rounded-full font-outfit text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer hover:scale-[1.01]"
              >
                <span>Proceed to Ocean Checkout</span>
                <ArrowRight className="w-4 h-4 text-primary-fixed" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-outline font-outfit">
                <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                <span>Encrypted 256-bit checkout • 30-day tidal satisfaction guarantee</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
