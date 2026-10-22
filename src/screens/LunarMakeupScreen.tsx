import React, { useState } from 'react';
import { Sparkles, Star, Plus, Heart, Shield, Check, Eye } from 'lucide-react';
import { Product, Shade } from '../types';

interface LunarMakeupScreenProps {
  products: Product[];
  onAddToCart: (product: Product, shade?: Shade) => void;
  onOpenProductDetail: (product: Product) => void;
  isWishlisted: (id: string) => boolean;
  onToggleWishlist: (product: Product) => void;
  formatPrice: (price: number) => string;
}

export const LunarMakeupScreen: React.FC<LunarMakeupScreenProps> = ({
  products,
  onAddToCart,
  onOpenProductDetail,
  isWishlisted,
  onToggleWishlist,
  formatPrice,
}) => {
  const makeupProducts = products.filter(p => p.category === 'lunar-makeup');
  
  // State for active shades on cards
  const [selectedShades, setSelectedShades] = useState<Record<string, Shade>>({});

  // Interactive Virtual Swatch Previewer State
  const [activeSwatchProduct, setActiveSwatchProduct] = useState<Product>(
    makeupProducts.find(p => p.id === 'pearl-veil-dew-drops') || makeupProducts[0]
  );
  const [activeSwatchShade, setActiveSwatchShade] = useState<Shade>(
    activeSwatchProduct?.shades ? activeSwatchProduct.shades[1] : { id: 'default', name: 'Default', hex: '#f1dbc3' }
  );

  const handleSelectShade = (productId: string, shade: Shade) => {
    setSelectedShades(prev => ({ ...prev, [productId]: shade }));
  };

  return (
    <div className="w-full pt-4 pb-20 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-b from-tertiary-fixed/30 via-surface-container-low to-surface py-12 px-4 md:px-8 lg:px-16 mb-10 border-b border-surface-variant/40">
        <div className="max-w-[1440px] mx-auto text-center max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-tertiary-container mb-4 shadow-xs text-[11px] font-outfit uppercase tracking-wider font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-tertiary" />
            Collection 02 • Optical Radiance
          </div>
          <h1 className="font-playfair text-3xl md:text-5xl text-primary font-normal mb-3">
            Lustrous Lunar Makeup
          </h1>
          <p className="font-outfit text-sm text-on-surface-variant leading-relaxed font-light">
            Breathable, skin-first tinting formulations charged with crushed pearl conchiolin, ocean-marsh salicornia, and non-nano mineral defense.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Interactive Shade Studio Feature */}
        <div className="mb-14 bg-surface-container-lowest rounded-3xl p-6 md:p-10 border border-surface-variant/40 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-surface-container shadow-inner">
                <img
                  src={activeSwatchProduct.image}
                  alt={activeSwatchProduct.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Real-time Swatch Badge Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-surface/90 backdrop-blur-md p-3.5 rounded-xl border border-white/80 shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-6 h-6 rounded-full border border-black/10 shadow-xs"
                        style={{ backgroundColor: activeSwatchShade.hex }}
                      />
                      <div>
                        <p className="font-outfit text-[11px] font-semibold text-primary">
                          {activeSwatchShade.name}
                        </p>
                        <p className="font-outfit text-[10px] text-outline">
                          Optical Light Refraction Index 1.84
                        </p>
                      </div>
                    </div>
                    <span className="font-outfit text-xs font-semibold text-secondary">
                      {formatPrice(activeSwatchProduct.price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Studio Selector Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="font-outfit text-[11px] text-secondary uppercase tracking-widest font-semibold block mb-1">
                  Bespoke Shade Lab
                </span>
                <h3 className="font-playfair text-2xl md:text-3xl text-primary font-medium">
                  {activeSwatchProduct.name}
                </h3>
                <p className="font-outfit text-xs md:text-sm text-on-surface-variant leading-relaxed font-light mt-2">
                  Formulated with micro-conchiolin pearl spheres that adapt to your skin tone's natural undertones, canceling dull gray cast while repelling pollution particles.
                </p>
              </div>

              {/* Product Switcher */}
              <div className="flex gap-2">
                {makeupProducts.map(prod => (
                  <button
                    key={prod.id}
                    onClick={() => {
                      setActiveSwatchProduct(prod);
                      if (prod.shades && prod.shades.length > 0) {
                        setActiveSwatchShade(prod.shades[0]);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-outfit uppercase tracking-wider transition-all cursor-pointer ${
                      activeSwatchProduct.id === prod.id
                        ? 'bg-primary text-white font-medium shadow-xs'
                        : 'bg-surface-container text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    {prod.name.split(' ')[0]} {prod.name.split(' ')[1]}
                  </button>
                ))}
              </div>

              {/* Shade Selector Buttons */}
              {activeSwatchProduct.shades && (
                <div className="space-y-3">
                  <span className="font-outfit text-xs uppercase tracking-wider text-primary font-semibold block">
                    Select Your Mineral Tone
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {activeSwatchProduct.shades.map(s => {
                      const isSelected = activeSwatchShade.id === s.id;
                      return (
                        <button
                          key={s.id}
                          onClick={() => setActiveSwatchShade(s)}
                          className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-primary bg-primary/5 ring-1 ring-primary'
                              : 'border-surface-variant bg-surface hover:border-secondary'
                          }`}
                        >
                          <span
                            className="w-5 h-5 rounded-full shrink-0 shadow-xs border border-black/10"
                            style={{ backgroundColor: s.hex }}
                          />
                          <span className="font-outfit text-[11px] text-primary truncate font-medium">
                            {s.name.split(' (')[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Action */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => onAddToCart(activeSwatchProduct, activeSwatchShade)}
                  className="bg-primary text-on-primary px-8 py-3 rounded-full font-outfit text-xs uppercase tracking-wider hover:bg-primary-container transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-[1.01]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Selected Shade to Bag • {formatPrice(activeSwatchProduct.price)}</span>
                </button>
                <button
                  onClick={() => onOpenProductDetail(activeSwatchProduct)}
                  className="px-5 py-3 rounded-full font-outfit text-xs uppercase tracking-wider text-primary hover:bg-surface-container transition-colors border border-surface-variant"
                >
                  View Full Formula
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Catalog Products */}
        <div className="mb-10">
          <h3 className="font-playfair text-2xl text-primary font-normal mb-6">
            Complete Lunar Tints Collection
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {makeupProducts.map(prod => {
              const chosenShade = selectedShades[prod.id] || (prod.shades ? prod.shades[0] : undefined);
              const wish = isWishlisted(prod.id);

              return (
                <div
                  key={prod.id}
                  className="bg-surface-container-lowest rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 group border border-surface-variant/40"
                >
                  <div>
                    <div
                      onClick={() => onOpenProductDetail(prod)}
                      className="relative aspect-[4/5] rounded-xl overflow-hidden bg-surface-container mb-4 cursor-pointer"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {prod.tag && (
                        <span className="absolute top-2.5 left-2.5 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-full font-outfit text-[10px] text-primary uppercase font-medium tracking-wider shadow-xs">
                          {prod.tag}
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(prod);
                        }}
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-surface/85 backdrop-blur-md text-on-surface-variant hover:text-primary flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                        aria-label="Save to Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${wish ? 'fill-tertiary text-tertiary' : ''}`} />
                      </button>
                    </div>

                    <div className="flex items-center gap-1 mb-1 text-secondary">
                      <div className="flex text-secondary">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-secondary text-secondary" />
                        ))}
                      </div>
                      <span className="font-outfit text-[11px] text-outline ml-1">
                        {prod.rating} ({prod.reviewCount})
                      </span>
                    </div>

                    <h4
                      onClick={() => onOpenProductDetail(prod)}
                      className="font-playfair text-xl text-primary mb-1 hover:text-secondary transition-colors cursor-pointer font-medium"
                    >
                      {prod.name}
                    </h4>
                    <p className="font-outfit text-xs text-on-surface-variant leading-relaxed font-light mb-4">
                      {prod.description}
                    </p>

                    {/* Shades on card */}
                    {prod.shades && (
                      <div className="mb-4">
                        <span className="font-outfit text-[10px] text-outline uppercase tracking-wider block mb-1.5">
                          {prod.shades.length} Available Tones:
                        </span>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {prod.shades.map(s => (
                            <button
                              key={s.id}
                              onClick={() => handleSelectShade(prod.id, s)}
                              title={s.name}
                              style={{ backgroundColor: s.hex }}
                              className={`w-5 h-5 rounded-full border border-black/10 cursor-pointer transition-transform ${
                                chosenShade?.id === s.id ? 'ring-2 ring-primary scale-115' : 'hover:scale-105'
                              }`}
                            />
                          ))}
                        </div>
                        {chosenShade && (
                          <p className="font-outfit text-[11px] text-secondary mt-1 font-medium truncate">
                            {chosenShade.name}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-surface-container">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-outfit text-base font-semibold text-primary">
                        {formatPrice(prod.price)}
                      </span>
                      <span className="font-outfit text-[10px] text-secondary uppercase tracking-wider font-medium">
                        {prod.volume}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onAddToCart(prod, chosenShade)}
                      className="w-full bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-outfit text-[11px] uppercase tracking-wider py-2.5 rounded-full transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-[0.99]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
