import React, { useState } from 'react';
import { X, Star, Heart, Plus, Minus, ShieldCheck, Sparkles, Droplets, RefreshCw } from 'lucide-react';
import { Product, Shade } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, shade?: Shade, quantity?: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  formatPrice: (price: number) => string;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  formatPrice,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedShade, setSelectedShade] = useState<Shade | undefined>(
    product.shades ? product.shades[0] : undefined
  );
  const [activeTab, setActiveTab] = useState<'benefits' | 'actives' | 'ritual'>('benefits');

  const handleAdd = () => {
    onAddToCart(product, selectedShade, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-surface-container-lowest rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/60 relative flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-surface/80 backdrop-blur-md text-on-surface-variant hover:text-primary flex items-center justify-center transition-colors shadow-xs"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Product Image */}
        <div className="md:w-1/2 p-6 md:p-8 bg-surface-container-low flex flex-col justify-between">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface-container shadow-inner">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.tag && (
              <span className="absolute top-3 left-3 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full font-outfit text-[10px] text-primary uppercase font-semibold tracking-wider shadow-xs">
                {product.tag}
              </span>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-surface-variant/40 flex items-center justify-between text-xs font-outfit text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-secondary" />
              <span>100% Refillable Vessel</span>
            </span>
            <span className="text-secondary font-medium">
              {product.batchInfo || 'Spring Harvest Release'}
            </span>
          </div>
        </div>

        {/* Right Column: Information & Actions */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div>
            {/* Reviews */}
            <div className="flex items-center gap-2 mb-2 text-secondary">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>
              <span className="font-outfit text-xs text-outline">
                {product.rating} ({product.reviewCount} verified reviews)
              </span>
            </div>

            {/* Title & Price */}
            <h2 className="font-playfair text-2xl md:text-3xl text-primary font-normal leading-snug">
              {product.name}
            </h2>
            <p className="font-outfit text-xs text-secondary uppercase tracking-wider font-medium mt-1">
              {product.subtitle}
            </p>

            <div className="flex items-baseline gap-3 my-3">
              <span className="font-outfit text-2xl font-semibold text-primary">
                {formatPrice(product.price)}
              </span>
              <span className="font-outfit text-xs text-outline uppercase tracking-wider">
                {product.volume}
              </span>
            </div>

            <p className="font-outfit text-xs text-on-surface-variant leading-relaxed font-light mb-4">
              {product.extendedDescription || product.description}
            </p>

            {/* Shades if applicable */}
            {product.shades && product.shades.length > 0 && (
              <div className="mb-4 p-3 bg-surface-container-low rounded-xl border border-surface-variant/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-outfit text-[11px] text-primary uppercase font-semibold">
                    Shade Tone:
                  </span>
                  <span className="font-outfit text-xs text-secondary font-medium">
                    {selectedShade?.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {product.shades.map((shade) => (
                    <button
                      key={shade.id}
                      onClick={() => setSelectedShade(shade)}
                      title={shade.name}
                      style={{ backgroundColor: shade.hex }}
                      className={`w-6 h-6 rounded-full border border-black/10 transition-transform cursor-pointer ${
                        selectedShade?.id === shade.id ? 'ring-2 ring-primary scale-110 shadow-xs' : 'hover:scale-105'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Tabs for details */}
            <div className="border-b border-surface-container flex gap-4 text-xs font-outfit uppercase tracking-wider mb-3">
              <button
                onClick={() => setActiveTab('benefits')}
                className={`pb-2 transition-colors cursor-pointer ${
                  activeTab === 'benefits' ? 'text-primary font-semibold border-b-2 border-primary' : 'text-outline hover:text-primary'
                }`}
              >
                Key Benefits
              </button>
              <button
                onClick={() => setActiveTab('actives')}
                className={`pb-2 transition-colors cursor-pointer ${
                  activeTab === 'actives' ? 'text-primary font-semibold border-b-2 border-primary' : 'text-outline hover:text-primary'
                }`}
              >
                Bio-Actives
              </button>
              <button
                onClick={() => setActiveTab('ritual')}
                className={`pb-2 transition-colors cursor-pointer ${
                  activeTab === 'ritual' ? 'text-primary font-semibold border-b-2 border-primary' : 'text-outline hover:text-primary'
                }`}
              >
                Usage Ritual
              </button>
            </div>

            {/* Tab contents */}
            <div className="min-h-[110px] text-xs font-outfit text-on-surface-variant leading-relaxed">
              {activeTab === 'benefits' && (
                <ul className="space-y-1.5">
                  {product.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'actives' && (
                <div className="space-y-2">
                  {product.keyActives.map((act, idx) => (
                    <div key={idx} className="bg-surface-container-low p-2 rounded-lg">
                      <div className="flex justify-between font-medium text-primary text-[11px]">
                        <span>{act.name}</span>
                        <span className="text-secondary">{act.origin}</span>
                      </div>
                      <p className="text-[10px] text-on-surface-variant mt-0.5">{act.role}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'ritual' && (
                <p className="font-light italic bg-surface-container-low p-3 rounded-xl border border-surface-variant/40">
                  “{product.usage}”
                </p>
              )}
            </div>
          </div>

          {/* Quantity and Add to Bag */}
          <div className="pt-4 border-t border-surface-container space-y-3">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center bg-surface-container rounded-full px-3 py-1.5 border border-surface-variant">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-on-surface hover:text-primary p-1 cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-outfit text-xs font-semibold px-3 min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-on-surface hover:text-primary p-1 cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAdd}
                className="flex-1 bg-primary hover:bg-primary-container text-white py-3 px-6 rounded-full font-outfit text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer hover:scale-[1.01]"
              >
                <span>Add to Bag • {formatPrice(product.price * quantity)}</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => onToggleWishlist(product)}
                className={`w-11 h-11 rounded-full flex items-center justify-center border transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'bg-tertiary-fixed border-tertiary-fixed text-tertiary'
                    : 'bg-surface-container-low border-surface-variant text-primary hover:bg-surface-variant'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-tertiary' : ''}`} />
              </button>
            </div>

            <p className="text-[10px] font-outfit text-center text-outline">
              Complimentary global carbon-neutral delivery included on orders over $85.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
