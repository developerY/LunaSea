import React from 'react';
import { X, Heart, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
  onAddAllToCart: () => void;
  formatPrice: (price: number) => string;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onMoveToCart,
  onAddAllToCart,
  formatPrice,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface-container-lowest shadow-2xl flex flex-col justify-between border-l border-surface-variant animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-surface-container flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-tertiary fill-tertiary" />
              <h2 className="font-playfair text-xl text-primary font-medium">
                Saved Lunar Formulations
              </h2>
              <span className="font-outfit text-xs px-2 py-0.5 rounded-full bg-surface-container text-tertiary font-semibold">
                {wishlist.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-variant flex items-center justify-center text-primary transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-outline">
                  <Heart className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="font-playfair text-xl text-primary font-medium">
                  No Saved Formulations Yet
                </h3>
                <p className="font-outfit text-xs text-on-surface-variant font-light max-w-xs leading-relaxed">
                  Touch the delicate pearl heart on any elixir to curate your private coastal sanctuary.
                </p>
              </div>
            ) : (
              wishlist.map((prod) => (
                <div
                  key={prod.id}
                  className="flex gap-4 p-3.5 rounded-2xl bg-surface-container-low/60 border border-surface-variant/40"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-16 h-20 object-cover rounded-xl bg-surface-container shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-playfair text-sm text-primary font-medium leading-tight">
                          {prod.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(prod.id)}
                          className="text-outline hover:text-red-500 p-1"
                          aria-label="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="font-outfit text-[11px] text-outline mt-0.5">
                        {prod.volume}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-outfit text-xs font-semibold text-primary">
                        {formatPrice(prod.price)}
                      </span>
                      <button
                        onClick={() => onMoveToCart(prod)}
                        className="bg-primary hover:bg-primary-container text-white px-3 py-1.5 rounded-full text-[10px] font-outfit uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-6 border-t border-surface-container bg-surface-container-lowest">
              <button
                onClick={onAddAllToCart}
                className="w-full bg-primary hover:bg-primary-container text-white py-3.5 rounded-full font-outfit text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer hover:scale-[1.01]"
              >
                <span>Move All Formulations to Bag</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
