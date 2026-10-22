import React, { useState } from 'react';
import { Search, X, Plus, Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  formatPrice: (price: number) => string;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onAddToCart,
  formatPrice,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const quickTags = [
    'Kelp Bio-Ferment',
    'Akoya Pearl',
    'SPF 30 Mineral',
    'Lip Oil',
    'Celeste Mask',
    'Multi-Peptide'
  ];

  const searchResults = query.trim() === '' ? [] : products.filter(p => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.keyActives.some(a => a.name.toLowerCase().includes(q) || a.role.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/50 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-surface-container-lowest rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl border border-white/70 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-surface-container flex items-center gap-3">
          <Search className="w-5 h-5 text-secondary shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search oceanic formulas, peptides, minerals..."
            className="w-full bg-transparent font-outfit text-sm text-primary placeholder:text-outline focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-outline hover:text-primary p-1 text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-variant flex items-center justify-center text-primary transition-colors cursor-pointer shrink-0"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Tags */}
        <div className="px-6 py-3 bg-surface-container-low border-b border-surface-container flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="font-outfit text-[10px] text-outline uppercase tracking-wider shrink-0 font-medium">
            Tidal Concepts:
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-surface-container text-[11px] font-outfit text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-colors shrink-0 cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {query.trim() === '' ? (
            <div className="text-center py-10 space-y-2">
              <Sparkles className="w-8 h-8 text-secondary mx-auto" />
              <h3 className="font-playfair text-lg text-primary font-medium">
                Explore Marine Cellular Botany
              </h3>
              <p className="font-outfit text-xs text-outline max-w-sm mx-auto leading-relaxed">
                Type an ingredient, skin goal, or formulation name to locate bio-ferment extracts.
              </p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-10">
              <p className="font-playfair text-lg text-primary font-medium">
                No tidal matches found for "{query}"
              </p>
              <p className="font-outfit text-xs text-outline mt-1">
                Try searching for "kelp", "serum", "dew", "oil", or "jade".
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <span className="font-outfit text-[10px] text-outline uppercase tracking-wider block mb-2 font-medium">
                Found {searchResults.length} Formulations:
              </span>
              {searchResults.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => {
                    onSelectProduct(prod);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-low/60 hover:bg-surface-container border border-surface-variant/40 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-12 h-14 object-cover rounded-xl bg-surface-container"
                    />
                    <div>
                      <h4 className="font-playfair text-sm text-primary font-medium group-hover:text-secondary transition-colors">
                        {prod.name}
                      </h4>
                      <p className="font-outfit text-[11px] text-outline line-clamp-1">
                        {prod.description}
                      </p>
                      <span className="font-outfit text-xs font-semibold text-primary mt-0.5 block">
                        {formatPrice(prod.price)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(prod);
                    }}
                    className="w-8 h-8 rounded-full bg-surface-container-lowest hover:bg-primary hover:text-white flex items-center justify-center text-primary shadow-xs transition-colors shrink-0"
                    aria-label="Add to bag"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
