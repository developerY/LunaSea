import React, { useState } from 'react';
import { Star, StarHalf, Heart, Plus, Sparkles, Filter, SlidersHorizontal, Droplets } from 'lucide-react';
import { Product, Shade } from '../types';

interface SkincareScreenProps {
  products: Product[];
  onAddToCart: (product: Product, shade?: Shade) => void;
  onOpenProductDetail: (product: Product) => void;
  isWishlisted: (id: string) => boolean;
  onToggleWishlist: (product: Product) => void;
  formatPrice: (price: number) => string;
}

export const SkincareScreen: React.FC<SkincareScreenProps> = ({
  products,
  onAddToCart,
  onOpenProductDetail,
  isWishlisted,
  onToggleWishlist,
  formatPrice,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'serums' | 'creams' | 'mists'>('all');
  const [selectedConcern, setSelectedConcern] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Filter skincare products
  const skincareProducts = products.filter(p => {
    if (p.category !== 'skincare' && p.category !== 'tidal-rituals') return false;
    if (activeFilter === 'serums' && !p.name.toLowerCase().includes('serum') && !p.name.toLowerCase().includes('nectar')) return false;
    if (activeFilter === 'creams' && !p.name.toLowerCase().includes('cream') && !p.name.toLowerCase().includes('mask')) return false;
    if (activeFilter === 'mists' && !p.name.toLowerCase().includes('mist')) return false;
    return true;
  });

  const sortedProducts = [...skincareProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="w-full pt-4 pb-20 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-b from-secondary-fixed/40 via-surface-container-low to-surface py-12 px-4 md:px-8 lg:px-16 mb-10 border-b border-surface-variant/40">
        <div className="max-w-[1440px] mx-auto text-center max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-secondary mb-4 shadow-xs text-[11px] font-outfit uppercase tracking-wider font-semibold">
            <Droplets className="w-3.5 h-3.5" />
            Collection 01 • Bio-Ferment Sanctuary
          </div>
          <h1 className="font-playfair text-3xl md:text-5xl text-primary font-normal mb-3">
            Lunar Skincare Archives
          </h1>
          <p className="font-outfit text-sm text-on-surface-variant leading-relaxed font-light">
            Formulated without tap water. Pure cold-distilled marine cellular juices, phytoplankton enzymes, and ocean glycogen engineered to synchronize cellular recovery.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-5 border-b border-surface-container">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Formulations' },
              { id: 'serums', label: 'Cellular Serums' },
              { id: 'creams', label: 'Ocean Creams & Balms' },
              { id: 'mists', label: 'Marine Mists' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-4 py-1.5 rounded-full font-outfit text-xs transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-primary text-on-primary font-medium shadow-xs'
                    : 'bg-surface-container hover:bg-surface-variant text-on-surface'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sort & Stats */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <span className="font-outfit text-xs text-outline">
              Showing {sortedProducts.length} formulations
            </span>
            <div className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1.5 rounded-full border border-surface-variant text-xs font-outfit">
              <SlidersHorizontal className="w-3.5 h-3.5 text-secondary" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-primary text-xs focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Acclaim</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((prod) => {
            const wish = isWishlisted(prod.id);
            return (
              <div
                key={prod.id}
                className="bg-surface-container-lowest rounded-2xl p-4 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 group border border-surface-variant/40"
              >
                <div>
                  <div
                    onClick={() => onOpenProductDetail(prod)}
                    className="relative aspect-[4/5] rounded-xl overflow-hidden bg-surface-container mb-3.5 cursor-pointer"
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

                  <h3
                    onClick={() => onOpenProductDetail(prod)}
                    className="font-playfair text-lg text-primary mb-1 hover:text-secondary transition-colors cursor-pointer leading-snug font-medium line-clamp-1"
                  >
                    {prod.name}
                  </h3>
                  <p className="font-outfit text-xs text-on-surface-variant line-clamp-2 mb-3 leading-relaxed font-light">
                    {prod.description}
                  </p>

                  {/* Micro Benefit Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {prod.benefits.slice(0, 2).map((b, idx) => (
                      <span key={idx} className="bg-surface-container px-2 py-0.5 rounded-md text-[9px] font-outfit text-on-surface-variant">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-surface-container">
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
                    onClick={() => onAddToCart(prod)}
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

        {/* Marine Botanical Guarantee Box */}
        <div className="mt-16 bg-surface-container-low rounded-2xl p-6 md:p-8 border border-secondary/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl text-center sm:text-left">
            <span className="font-outfit text-[10px] text-secondary uppercase tracking-widest font-semibold block">
              Haute Formulation Standard
            </span>
            <h4 className="font-playfair text-xl text-primary font-medium">
              100% Waterless Marine Concentration
            </h4>
            <p className="font-outfit text-xs text-on-surface-variant font-light leading-relaxed">
              Every bottle begins with fresh living kelp cellular juice extracted within 4 hours of coastal harvesting. Zero thermal breakdown, zero synthetic dyes.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="text-left font-outfit">
              <p className="text-xs font-semibold text-primary">Potency Assured</p>
              <p className="text-[11px] text-outline">Tested Batch #L-894</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
