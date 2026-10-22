import React from 'react';
import { Droplets, ArrowRight, Sparkles, ShieldCheck, Waves, Leaf, Heart, ChevronsRight } from 'lucide-react';
import { Product } from '../types';

interface HeroSectionProps {
  spotlightProduct: Product;
  onAddToCart: (product: Product) => void;
  onOpenProductDetail: (product: Product) => void;
  onExploreCollections: () => void;
  onDiscoverScience: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  formatPrice: (price: number) => string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  spotlightProduct,
  onAddToCart,
  onOpenProductDetail,
  onExploreCollections,
  onDiscoverScience,
  isWishlisted,
  onToggleWishlist,
  formatPrice,
}) => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Top Decorative Ambient Aura */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[480px] bg-gradient-to-b from-secondary-fixed/40 via-tertiary-fixed/30 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Hero Showcase */}
      <section className="relative max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-6 lg:pt-10 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary-fixed/60 text-secondary mb-5 shadow-xs border border-secondary/15">
              <Droplets className="w-3.5 h-3.5 text-secondary fill-secondary" />
              <span className="font-outfit text-[11px] uppercase tracking-widest text-on-secondary-fixed-variant font-medium">
                Spring Harvest Bio-Ferments
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-playfair text-[38px] sm:text-[46px] lg:text-[56px] text-primary tracking-tight mb-5 leading-[1.08] font-normal">
              Born from Ocean Depths,<br />
              <span className="italic font-normal text-secondary">
                Illuminated by Lunar Light.
              </span>
            </h1>

            {/* Description */}
            <p className="font-outfit text-base lg:text-[18px] text-on-surface-variant max-w-xl mb-8 font-light leading-relaxed">
              Bio-fermented marine algae, crushed sea pearl peptides, and restorative coastal botanicals crafted for radiant, weightless cellular vitality.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              <button
                onClick={onExploreCollections}
                className="inline-flex items-center gap-2 bg-primary text-on-primary font-outfit text-[12px] uppercase tracking-wider px-7 py-3 rounded-full shadow-md hover:bg-primary-container transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>Explore New Arrivals</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onDiscoverScience}
                className="inline-flex items-center gap-2 bg-surface-container-low text-primary font-outfit text-[12px] uppercase tracking-wider px-7 py-3 rounded-full hover:bg-surface-container-high transition-all border border-surface-variant cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-secondary" />
                <span>Discover the Science</span>
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className="flex flex-wrap items-center gap-4 text-on-surface-variant text-xs font-outfit">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-secondary" />
                <span className="uppercase tracking-wider font-medium text-[11px]">Clinical Efficacy</span>
              </div>
              <div className="h-3 w-px bg-surface-variant hidden sm:block" />
              <div className="flex items-center gap-1.5">
                <Waves className="w-4 h-4 text-secondary" />
                <span className="uppercase tracking-wider font-medium text-[11px]">Cold-Extracted Kelp</span>
              </div>
              <div className="h-3 w-px bg-surface-variant hidden sm:block" />
              <div className="flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-secondary" />
                <span className="uppercase tracking-wider font-medium text-[11px]">Infinitely Recyclable</span>
              </div>
            </div>
          </div>

          {/* Right Spotlight Formulation Card */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative bg-gradient-to-br from-surface-container-lowest via-surface-container-low to-secondary-fixed/20 p-5 lg:p-7 rounded-2xl shadow-xl border border-white/60 overflow-hidden">
              
              {/* Backglow Pills */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-tertiary-fixed/30 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-secondary-fixed/30 rounded-full blur-2xl pointer-events-none" />

              {/* Card Header */}
              <div className="relative flex items-center justify-between mb-3 z-10">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-outfit text-[10px] uppercase tracking-widest font-semibold">
                  <Sparkles className="w-3 h-3 text-secondary fill-secondary" />
                  Spotlight Formulation
                </span>
                <span className="font-outfit text-[10px] text-outline uppercase tracking-widest font-medium">
                  Ritual 01 / AM • PM
                </span>
              </div>

              {/* Product Visual Container */}
              <div 
                onClick={() => onOpenProductDetail(spotlightProduct)}
                className="relative rounded-xl overflow-hidden aspect-[4/3] bg-surface-container-high mb-4 flex items-center justify-center cursor-pointer group shadow-inner"
              >
                <img
                  src={spotlightProduct.image}
                  alt={spotlightProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Status Bar Overlay */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2 bg-surface/90 backdrop-blur-md rounded-lg flex items-center justify-between shadow-xs border border-white/60">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    <span className="font-outfit text-[10px] text-primary uppercase font-semibold tracking-wider">
                      In High Demand
                    </span>
                  </div>
                  <span className="font-outfit text-[10px] text-secondary font-medium tracking-wide">
                    {spotlightProduct.batchInfo || 'Batch #L-894 Fresh Harvest'}
                  </span>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-2 relative z-10">
                <div className="flex items-baseline justify-between">
                  <h3 
                    onClick={() => onOpenProductDetail(spotlightProduct)}
                    className="font-playfair text-xl text-primary font-medium hover:text-secondary transition-colors cursor-pointer"
                  >
                    {spotlightProduct.name}
                  </h3>
                  <span className="font-playfair text-xl text-primary font-light">
                    {formatPrice(spotlightProduct.price)}
                  </span>
                </div>

                <p className="font-outfit text-xs text-on-surface-variant leading-relaxed line-clamp-2">
                  {spotlightProduct.description}
                </p>

                {/* Clinical Benefit Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2.5 py-1 rounded-md bg-secondary-container/60 text-on-secondary-container font-outfit text-[10px] font-medium">
                    +94% Barrier Hydration
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-tertiary-fixed/50 text-on-tertiary-fixed-variant font-outfit text-[10px] font-medium">
                    Deep-Sea Peptides
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-high text-primary font-outfit text-[10px] font-medium">
                    Refillable Opal Glass
                  </span>
                </div>

                {/* Quick Add Action */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onAddToCart(spotlightProduct)}
                    className="flex-1 bg-primary text-on-primary py-2.5 px-4 rounded-full font-outfit text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-primary-container transition-all shadow-sm hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    <ChevronsRight className="w-4 h-4 text-primary-fixed" />
                    <span>Add to Bag • {formatPrice(spotlightProduct.price)}</span>
                  </button>

                  <button
                    onClick={() => onToggleWishlist(spotlightProduct)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                      isWishlisted 
                        ? 'bg-tertiary-fixed text-tertiary' 
                        : 'bg-surface-container text-primary hover:bg-surface-variant'
                    }`}
                    aria-label="Save formulation to favorites"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-tertiary' : ''}`} />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
