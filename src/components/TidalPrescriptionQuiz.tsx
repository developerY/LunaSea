import React, { useState } from 'react';
import { Compass, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface TidalPrescriptionQuizProps {
  products: Product[];
  onAddDiagnosticDuoToBag: (title: string, price: number, products: Product[]) => void;
  formatPrice: (price: number) => string;
}

export const TidalPrescriptionQuiz: React.FC<TidalPrescriptionQuizProps> = ({
  products,
  onAddDiagnosticDuoToBag,
  formatPrice,
}) => {
  const [selectedSkinType, setSelectedSkinType] = useState('Combination & Tidal');
  const [selectedFinish, setSelectedFinish] = useState('Glass Dew (Hydra-Gloss)');

  const skinTypes = [
    'Dry & Dehydrated',
    'Combination & Tidal',
    'Sensitive Barrier',
    'Dull & Fatigued'
  ];

  const finishes = [
    'Glass Dew (Hydra-Gloss)',
    'Satin Pearl (Soft Refraction)',
    'Velvet Mist (Demi-Matte)'
  ];

  const quizMatches: Record<string, {
    title: string;
    desc: string;
    price: number;
    recommendedProductIds: string[];
  }> = {
    'Dry & Dehydrated': {
      title: 'Opal Wave Cream + Moonlit Nectar Serum',
      desc: 'Infuses deep sea kelp lipids to restore cellular matrix and retain weightless water-locking barrier.',
      price: 142,
      recommendedProductIds: ['opal-wave-cream', 'moonlit-nectar-serum']
    },
    'Combination & Tidal': {
      title: 'Tidal Infusion Serum + Opal Wave Cream',
      desc: 'Calibrates natural sebum, locks in multi-weight coastal hydration, and finishes with a glassy sea sheen.',
      price: 134,
      recommendedProductIds: ['moonlit-nectar-serum', 'opal-wave-cream']
    },
    'Sensitive Barrier': {
      title: 'Celeste Midnight Mask + Bio-Pearl Mist',
      desc: 'Calms reactive capillaries with cold-pressed kelp bio-ferments and restorative oceanic minerals.',
      price: 114,
      recommendedProductIds: ['celeste-midnight-mask', 'bio-pearl-infusion-mist']
    },
    'Dull & Fatigued': {
      title: 'Pearl Veil Dew Drops + Moonlit Nectar Serum',
      desc: 'Awakens radiance through micronized mother-of-pearl bio-peptides and active marine glycogen.',
      price: 124,
      recommendedProductIds: ['pearl-veil-dew-drops', 'moonlit-nectar-serum']
    }
  };

  const currentMatch = quizMatches[selectedSkinType] || quizMatches['Combination & Tidal'];

  const handleAddMatch = () => {
    const matchedProducts = currentMatch.recommendedProductIds
      .map(id => products.find(p => p.id === id))
      .filter((p): p is Product => p !== undefined);

    onAddDiagnosticDuoToBag(currentMatch.title, currentMatch.price, matchedProducts);
  };

  return (
    <section className="w-full py-16" id="diagnostic">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="relative bg-gradient-to-r from-surface-container via-surface-container-low to-tertiary-fixed/30 rounded-3xl p-6 sm:p-10 md:p-12 overflow-hidden shadow-xl border border-white/50">
          
          {/* Ambient Decorative Blur Rings */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-secondary-fixed/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-tertiary-fixed/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-container-lowest text-primary mb-5 shadow-xs border border-surface-variant/40">
              <Compass className="w-4 h-4 text-secondary" />
              <span className="font-outfit text-[11px] uppercase tracking-wider font-semibold">
                Bespoke Oceanic Diagnostic
              </span>
            </div>

            <h2 className="font-playfair text-3xl md:text-4xl text-primary mb-2 font-normal">
              Find Your Tidal Prescription
            </h2>

            <p className="font-outfit text-sm text-on-surface-variant mb-8 leading-relaxed font-light">
              Align your cutaneous condition with our ocean-harvested bio-actives for a personalized nocturnal and daylight ritual.
            </p>

            {/* Quiz Interactive Form */}
            <div className="space-y-6">
              {/* Step 1 */}
              <div>
                <label className="block font-outfit text-[11px] uppercase tracking-wider text-primary mb-2.5 font-semibold">
                  Step 1: Your Skin Condition
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {skinTypes.map((type) => {
                    const isSelected = selectedSkinType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedSkinType(type)}
                        className={`px-4 py-2 rounded-full font-outfit text-xs transition-all shadow-xs cursor-pointer ${
                          isSelected
                            ? 'bg-primary text-on-primary ring-2 ring-primary/30 font-medium'
                            : 'bg-surface-container-lowest text-on-surface hover:bg-secondary-fixed hover:text-on-secondary-fixed'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2 */}
              <div>
                <label className="block font-outfit text-[11px] uppercase tracking-wider text-primary mb-2.5 font-semibold">
                  Step 2: Desired Lunar Glow Finish
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {finishes.map((finish) => {
                    const isSelected = selectedFinish === finish;
                    return (
                      <button
                        key={finish}
                        type="button"
                        onClick={() => setSelectedFinish(finish)}
                        className={`px-4 py-2 rounded-full font-outfit text-xs transition-all shadow-xs cursor-pointer ${
                          isSelected
                            ? 'bg-primary text-on-primary ring-2 ring-primary/30 font-medium'
                            : 'bg-surface-container-lowest text-on-surface hover:bg-secondary-fixed hover:text-on-secondary-fixed'
                        }`}
                      >
                        {finish}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quiz Result Preview Box */}
              <div className="p-5 rounded-2xl bg-surface-container-lowest/95 backdrop-blur-md shadow-sm border border-white/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mt-4">
                <div className="space-y-1">
                  <span className="font-outfit text-[10px] text-secondary uppercase tracking-wider font-semibold">
                    Recommended Match
                  </span>
                  <h4 className="font-playfair text-xl text-primary font-medium">
                    {currentMatch.title}
                  </h4>
                  <p className="font-outfit text-xs text-on-surface-variant font-light leading-relaxed">
                    {currentMatch.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddMatch}
                  className="shrink-0 bg-primary hover:bg-primary-container text-on-primary font-outfit text-[11px] uppercase tracking-wider px-6 py-3 rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:scale-[1.02]"
                >
                  <span>Shop Diagnostic Ritual</span>
                  <span className="text-secondary-fixed font-semibold">• {formatPrice(currentMatch.price)}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5 text-primary-fixed" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
