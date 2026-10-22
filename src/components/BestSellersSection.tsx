import React, { useState } from 'react';
import { Star, StarHalf, ChevronLeft, ChevronRight, Heart, Plus } from 'lucide-react';
import { Product, Shade } from '../types';

interface BestSellersSectionProps {
  products: Product[];
  onAddToCart: (product: Product, shade?: Shade) => void;
  onOpenProductDetail: (product: Product) => void;
  isWishlisted: (id: string) => boolean;
  onToggleWishlist: (product: Product) => void;
  formatPrice: (price: number) => string;
}

export const BestSellersSection: React.FC<BestSellersSectionProps> = ({
  products,
  onAddToCart,
  onOpenProductDetail,
  isWishlisted,
  onToggleWishlist,
  formatPrice,
}) => {
  const [selectedShades, setSelectedShades] = useState<Record<string, Shade>>({});
  const [carouselOffset, setCarouselOffset] = useState(0);

  // We highlight the 4 main bestsellers from screenshot, or allow scrolling
  const bestSellers = products.slice(0, 4);

  const handleSelectShade = (productId: string, shade: Shade, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedShades(prev => ({ ...prev, [productId]: shade }));
  };

  const handleNext = () => {
    setCarouselOffset(prev => (prev + 1) % 2);
  };

  const handlePrev = () => {
    setCarouselOffset(prev => (prev === 0 ? 1 : 0));
  };

  return (
    <section className="w-full py-16" id="bestsellers">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10">
          <div>
            <span className="font-outfit text-[11px] text-secondary uppercase tracking-widest block mb-2 font-medium">
              Master Formulations
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl text-primary font-normal">
              Revered Best Sellers
            </h2>
          </div>

          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <button
              onClick={handlePrev}
              aria-label="Previous item"
              className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-surface-variant transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next item"
              className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-surface-variant transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 4 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((prod) => {
            const chosenShade = selectedShades[prod.id] || (prod.shades ? prod.shades[0] : undefined);
            const wish = isWishlisted(prod.id);

            return (
              <div
                key={prod.id}
                className="bg-surface-container-lowest rounded-2xl p-4 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 group border border-surface-variant/40"
              >
                <div>
                  {/* Image & Badges */}
                  <div
                    onClick={() => onOpenProductDetail(prod)}
                    className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-tr from-surface-container-low to-surface-container mb-3.5 cursor-pointer"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Tag badge */}
                    {prod.tag && (
                      <span className="absolute top-2.5 left-2.5 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-full font-outfit text-[10px] text-primary uppercase font-medium tracking-wider shadow-xs">
                        {prod.tag}
                      </span>
                    )}

                    {/* Wishlist Button */}
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

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-1 text-secondary">
                    <div className="flex text-secondary">
                      <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
                      <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
                      <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
                      <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
                      {prod.rating >= 4.9 ? (
                        <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
                      ) : (
                        <StarHalf className="w-3.5 h-3.5 fill-secondary text-secondary" />
                      )}
                    </div>
                    <span className="font-outfit text-[11px] text-outline ml-1">
                      {prod.rating} ({prod.reviewCount})
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3
                    onClick={() => onOpenProductDetail(prod)}
                    className="font-playfair text-lg text-primary mb-1 hover:text-secondary transition-colors cursor-pointer leading-snug font-medium line-clamp-1"
                  >
                    {prod.name}
                  </h3>
                  <p className="font-outfit text-xs text-on-surface-variant line-clamp-2 mb-3 leading-relaxed font-light">
                    {prod.description}
                  </p>
                </div>

                {/* Footer with Shades, Price & Quick Add */}
                <div className="pt-2">
                  {/* Shade Swatches if available */}
                  {prod.shades && prod.shades.length > 0 && (
                    <div className="mb-3">
                      <div className="flex items-center gap-1.5">
                        {prod.shades.slice(0, 5).map((shade) => (
                          <button
                            key={shade.id}
                            type="button"
                            onClick={(e) => handleSelectShade(prod.id, shade, e)}
                            title={shade.name}
                            style={{ backgroundColor: shade.hex }}
                            className={`w-4 h-4 rounded-full shadow-xs cursor-pointer hover:scale-110 transition-transform ${
                              chosenShade?.id === shade.id ? 'ring-2 ring-primary scale-110' : 'ring-1 ring-black/10'
                            }`}
                          />
                        ))}
                        {prod.shades.length > 5 && (
                          <span className="font-outfit text-[10px] text-outline ml-1 font-medium">
                            +{prod.shades.length - 5}
                          </span>
                        )}
                      </div>
                      {chosenShade && (
                        <span className="text-[10px] text-on-surface-variant font-outfit mt-1 block truncate">
                          {chosenShade.name}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <span className="font-outfit text-sm font-semibold text-primary">
                      {formatPrice(prod.price)}
                    </span>
                    <span className="font-outfit text-[10px] text-secondary uppercase tracking-wider font-medium">
                      {prod.volume}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onAddToCart(prod, chosenShade)}
                    className="w-full bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-outfit text-[11px] uppercase tracking-wider py-2.5 rounded-full transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-[0.99]"
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
    </section>
  );
};
