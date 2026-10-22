import React, { useState } from 'react';
import { Leaf, Waves, Shield, Recycle, Droplets, MapPin, Sparkles, Check } from 'lucide-react';

export const AboutUsScreen: React.FC = () => {
  const [refillCode, setRefillCode] = useState('');
  const [refillStatus, setRefillStatus] = useState<string | null>(null);

  const handleRefillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refillCode) return;
    setRefillStatus('Refill request logged. Your return compostable mailer is on its way.');
  };

  return (
    <div className="w-full pt-4 pb-20 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-b from-secondary-fixed/30 via-surface-container-low to-surface py-12 px-4 md:px-8 lg:px-16 mb-10 border-b border-surface-variant/40">
        <div className="max-w-[1440px] mx-auto text-center max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-secondary mb-4 shadow-xs text-[11px] font-outfit uppercase tracking-wider font-semibold">
            <Leaf className="w-3.5 h-3.5" />
            Haute Marine Biotechnology & Conscience
          </div>
          <h1 className="font-playfair text-3xl md:text-5xl text-primary font-normal mb-3">
            Born from Ocean Tides
          </h1>
          <p className="font-outfit text-sm text-on-surface-variant leading-relaxed font-light">
            Founded on the rugged shores of the Brittany coastline, LunaSea bridges ancient tidal kelp harvesting traditions with advanced cellular bio-fermentation.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 space-y-16">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="font-outfit text-[11px] text-secondary uppercase tracking-widest font-semibold block">
              The Origin Narrative
            </span>
            <h2 className="font-playfair text-3xl text-primary font-normal leading-tight">
              A Reverence for the Intertidal Zone
            </h2>
            <p className="font-outfit text-sm text-on-surface-variant leading-relaxed font-light">
              Marine algae endure extreme osmotic pressure swings, harsh UV exposure during low tide, and freezing sub-zero saltwater currents. To survive, they synthesize protective polyphenols, polysaccharides, and cellular osmoprotectants found nowhere else on earth.
            </p>
            <p className="font-outfit text-sm text-on-surface-variant leading-relaxed font-light">
              LunaSea harnesses these biological defense mechanisms through cold enzymatic isolation. By respecting natural lunar harvest cycles, we extract bio-actives at the moment of peak botanical potency—delivering weightless cellular vitality to the human cutaneous matrix.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-surface-container shadow-xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHWmr4JP3jBvsGVv_hpMaBqC3sWRtkLh51Z0cWSiLfa35DC1ClsUX6T74pK8mHPkQ76GY0dcWwxTHdAydxT4X5SOPjLq-ggGuoMyw6_jQOgRKimTMhPZ8BplFM74XrvuVUVHKbmOlaMr0jIZ7MHBqAyXo1AxlhFvzUqiBI2AFxRTp9pFZb0cfsi8m7pLzwpMlb5lQWnUjIIWTDfGHz9wvRi-MBD6eZ8H-4IOlOPiwzoihTSF6xW9sn"
                alt="LunaSea Coastal Sanctuary"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-surface/90 backdrop-blur-md p-3.5 rounded-xl border border-white/70">
                <p className="font-outfit text-xs font-semibold text-primary">
                  Iroise Marine Nature Park • UNESCO Biosphere Reserve
                </p>
                <p className="font-outfit text-[10px] text-outline">
                  Harvest sanctuary protected under French maritime biodiversity preservation acts.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Numbers */}
        <div className="bg-surface-container-lowest rounded-3xl p-8 md:p-12 border border-surface-variant/40 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="font-outfit text-[11px] text-secondary uppercase tracking-widest font-semibold block mb-1">
              Ecological Stewardship
            </span>
            <h3 className="font-playfair text-3xl text-primary font-normal">
              Our Ecological Balance Sheet
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-4 border-r-0 sm:border-r border-surface-container">
              <div className="font-playfair text-4xl text-primary font-light mb-1">48,290+</div>
              <p className="font-outfit text-xs text-secondary font-semibold uppercase tracking-wider mb-1">
                Lbs Ocean Plastic Removed
              </p>
              <p className="font-outfit text-[11px] text-outline font-light">
                Verified with Clean Seas Coalition
              </p>
            </div>

            <div className="p-4 border-r-0 lg:border-r border-surface-container">
              <div className="font-playfair text-4xl text-primary font-light mb-1">100%</div>
              <p className="font-outfit text-xs text-secondary font-semibold uppercase tracking-wider mb-1">
                Waterless Bases
              </p>
              <p className="font-outfit text-[11px] text-outline font-light">
                Zero tap water used across all formulas
              </p>
            </div>

            <div className="p-4 border-r-0 sm:border-r border-surface-container">
              <div className="font-playfair text-4xl text-primary font-light mb-1">82%</div>
              <p className="font-outfit text-xs text-secondary font-semibold uppercase tracking-wider mb-1">
                Vessel Return Rate
              </p>
              <p className="font-outfit text-[11px] text-outline font-light">
                Patrons participate in lifetime refill loops
              </p>
            </div>

            <div className="p-4">
              <div className="font-playfair text-4xl text-primary font-light mb-1">0%</div>
              <p className="font-outfit text-xs text-secondary font-semibold uppercase tracking-wider mb-1">
                Synthetic Microplastics
              </p>
              <p className="font-outfit text-[11px] text-outline font-light">
                All luster comes from Akoya sea pearls
              </p>
            </div>
          </div>
        </div>

        {/* Vessel Return Architecture Program */}
        <div className="bg-gradient-to-r from-surface-container via-surface-container-low to-secondary-fixed/20 rounded-3xl p-6 md:p-10 border border-white/60">
          <div className="max-w-2xl space-y-3 mb-6">
            <span className="font-outfit text-[11px] text-secondary uppercase tracking-widest font-semibold block">
              Circular Refill Architecture
            </span>
            <h3 className="font-playfair text-2xl md:text-3xl text-primary font-normal">
              Return Your Frosted Opal Vessel
            </h3>
            <p className="font-outfit text-xs md:text-sm text-on-surface-variant font-light leading-relaxed">
              Every LunaSea jar is composed of infinitely recyclable heavyweight opal glass. When empty, request a complimentary prepaid carbon-neutral return envelope to receive $15 toward your next fresh harvest batch.
            </p>
          </div>

          <form onSubmit={handleRefillSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md">
            <input
              type="text"
              required
              value={refillCode}
              onChange={(e) => setRefillCode(e.target.value)}
              placeholder="Enter vessel batch code (e.g. #L-894)..."
              className="bg-white font-outfit text-xs px-4 py-3 rounded-full border border-surface-variant focus:outline-none focus:border-secondary flex-1 shadow-xs"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary-container text-white font-outfit text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all shrink-0 cursor-pointer shadow-xs"
            >
              Request Mailer
            </button>
          </form>

          {refillStatus && (
            <div className="mt-3 text-xs font-outfit text-secondary flex items-center gap-1.5">
              <Check className="w-4 h-4 text-secondary" />
              <span>{refillStatus}</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
