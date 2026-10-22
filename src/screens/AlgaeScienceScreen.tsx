import React, { useState } from 'react';
import { TestTubes, Waves, Sparkles, CheckCircle2, ChevronRight, Search, BookOpen, Droplet } from 'lucide-react';

export const AlgaeScienceScreen: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [ingredientSearch, setIngredientSearch] = useState('');

  const extractionStages = [
    {
      stage: 'Phase 01',
      title: 'Tidal Low-Moon Harvesting',
      subtitle: 'Brittany & Hebrides Marine Sanctuaries',
      description: 'Certified scientific divers hand-cut living Laminaria Digitata and Palmaria Palmata during peak lunar spring tides when polyphenol and polysaccharide density reaches its seasonal crest.',
      stats: 'Zero ocean floor scraping • 100% regenerative regrowth'
    },
    {
      stage: 'Phase 02',
      title: 'Sub-Zero Enzymatic Cold Press',
      subtitle: 'Zero Thermal Degradation',
      description: 'Harvested kelp is processed within 4 hours using multi-stage osmotic cryogenic pressure. Unlike boiled industrial extracts, cold enzymatic pressing keeps heat-sensitive amino chains completely intact.',
      stats: '4°C processing threshold • 0% denatured peptides'
    },
    {
      stage: 'Phase 03',
      title: 'Living Bio-Fermentation Matrix',
      subtitle: 'Microbial Symbiosis with Marine Glycogen',
      description: 'Kelp juices ferment alongside deep oceanic phytoplankton cultures for 21 days, breaking down giant molecules into micro-bio-available peptides that effortlessly penetrate past the stratum corneum.',
      stats: '21-day lunar cycle ferment • 99.4% cellular uptake rate'
    },
    {
      stage: 'Phase 04',
      title: 'Waterless Cellular Base Integration',
      subtitle: 'Pure Living Mineral Electrolytes',
      description: 'Instead of filling formulas with inert tap or deionized water, LunaSea bases consist entirely of active living kelp cellular water loaded with natural potassium, magnesium, and bio-pearl peptides.',
      stats: '0% filler water • 100% active functional liquid'
    }
  ];

  const ingredientGlossary = [
    {
      inci: 'Laminaria Digitata (Oarweed Kelp) Bio-Ferment',
      origin: 'Brittany UNESCO Biosphere',
      function: 'Deep epidermal moisture retention, natural glycosaminoglycans',
      products: 'Moonlit Nectar Algae Serum, Opal Wave Cream'
    },
    {
      inci: 'Hydrolyzed Akoya Conchiolin (Sea Pearl Peptides)',
      origin: 'Upcycled Akoya Saltwater Pearls',
      function: 'High-refractive optical radiance, stimulates cellular turnover',
      products: 'Pearl Veil Dew Drops, Lustrous Compact Illuminator'
    },
    {
      inci: 'Salicornia Herbacea (Coastal Glasswort) Wax',
      origin: 'Atlantic Maritime Marshes',
      function: 'Increases aquaporin-8 water channels, prevents transepidermal loss',
      products: 'Tidal Glow Bio-Ferment Lip Oil'
    },
    {
      inci: 'Marine Glycogen & Phytoplankton ATP',
      origin: 'North Atlantic Deep Drift',
      function: 'Recharges fatigued mitochondria, protects against blue-light oxidation',
      products: 'Moonlit Nectar Algae Serum, Celeste Midnight Mask'
    },
    {
      inci: 'Bisabolol & Blue Sea Tansy Extract',
      origin: 'Coastal Maritime Meadows',
      function: 'Calms nocturnal micro-inflammation and soothes capillary redness',
      products: 'Celeste Midnight Overnight Mask'
    },
    {
      inci: 'Non-Nano Zinc Oxide (14.2%) & Sea Fennel',
      origin: 'Natural Coastal Earth Minerals',
      function: 'Reef-safe broad spectrum mineral shield against UVA and UVB rays',
      products: 'Pearl Veil Tinted Dew Drops'
    }
  ];

  const filteredIngredients = ingredientGlossary.filter(item => 
    item.inci.toLowerCase().includes(ingredientSearch.toLowerCase()) ||
    item.function.toLowerCase().includes(ingredientSearch.toLowerCase()) ||
    item.origin.toLowerCase().includes(ingredientSearch.toLowerCase())
  );

  return (
    <div className="w-full pt-4 pb-20 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-b from-secondary-fixed/40 via-surface-container-low to-surface py-12 px-4 md:px-8 lg:px-16 mb-10 border-b border-surface-variant/40">
        <div className="max-w-[1440px] mx-auto text-center max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-secondary mb-4 shadow-xs text-[11px] font-outfit uppercase tracking-wider font-semibold">
            <TestTubes className="w-3.5 h-3.5" />
            Biotechnology Research Archives
          </div>
          <h1 className="font-playfair text-3xl md:text-5xl text-primary font-normal mb-3">
            Oceanic Cellular Biotechnology
          </h1>
          <p className="font-outfit text-sm text-on-surface-variant leading-relaxed font-light">
            Bridging marine chronobiology with cellular skin recovery. Peer-reviewed clinical bio-responses and transparent sustainable extraction protocols.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 space-y-16">
        
        {/* 4-Stage Extraction Visualizer */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="font-outfit text-[11px] text-secondary uppercase tracking-widest font-semibold block mb-1">
              Cold Enzymatic Pipeline
            </span>
            <h2 className="font-playfair text-3xl text-primary font-normal">
              From Ocean Depths to Cutaneous Cellular Matrix
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-surface-container-lowest rounded-3xl p-6 md:p-10 border border-surface-variant/40 shadow-xs">
            {/* Stage Selector Pills */}
            <div className="lg:col-span-5 space-y-3">
              {extractionStages.map((stg, idx) => (
                <button
                  key={stg.stage}
                  onClick={() => setActiveStage(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    activeStage === idx
                      ? 'border-secondary bg-secondary-fixed/30 shadow-xs ring-1 ring-secondary/30'
                      : 'border-surface-variant/50 hover:bg-surface-container'
                  }`}
                >
                  <div>
                    <span className="font-outfit text-[10px] text-secondary uppercase tracking-wider font-semibold block">
                      {stg.stage}
                    </span>
                    <h4 className="font-playfair text-lg text-primary font-medium">
                      {stg.title}
                    </h4>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${activeStage === idx ? 'text-secondary translate-x-1' : 'text-outline'}`} />
                </button>
              ))}
            </div>

            {/* Stage Deep Dive Details */}
            <div className="lg:col-span-7 bg-surface-container-low rounded-2xl p-6 md:p-8 border border-white/60 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-variant/60">
                <span className="font-outfit text-xs uppercase tracking-wider text-secondary font-semibold">
                  {extractionStages[activeStage].stage} • Scientific Protocol
                </span>
                <span className="px-3 py-1 rounded-full bg-white text-[10px] font-outfit text-primary font-medium shadow-xs">
                  {extractionStages[activeStage].subtitle}
                </span>
              </div>

              <h3 className="font-playfair text-2xl text-primary font-medium">
                {extractionStages[activeStage].title}
              </h3>

              <p className="font-outfit text-sm text-on-surface-variant leading-relaxed font-light">
                {extractionStages[activeStage].description}
              </p>

              <div className="mt-4 p-4 rounded-xl bg-surface-container-lowest border border-secondary/20 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                <span className="font-outfit text-xs text-primary font-medium">
                  {extractionStages[activeStage].stats}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Bio-Response Chart Section */}
        <div className="bg-gradient-to-r from-surface-container-high via-surface-container to-secondary-fixed/30 rounded-3xl p-6 md:p-12 border border-white/60">
          <div className="max-w-2xl mb-8">
            <span className="font-outfit text-[11px] text-secondary uppercase tracking-widest font-semibold block mb-1">
              Rigorous Validation
            </span>
            <h2 className="font-playfair text-3xl text-primary font-normal">
              28-Day Clinical Trial Performance
            </h2>
            <p className="font-outfit text-xs md:text-sm text-on-surface-variant mt-2 font-light leading-relaxed">
              Conducted by an independent clinical dermatological laboratory across 120 subjects aged 24–68 with varying degrees of barrier compromise and dehydration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-xs border border-white/80">
              <div className="font-playfair text-4xl text-primary font-light mb-1">96.4%</div>
              <h4 className="font-outfit text-xs uppercase tracking-wider text-secondary font-semibold mb-2">
                Barrier Moisture Retention
              </h4>
              <p className="font-outfit text-xs text-on-surface-variant font-light leading-relaxed">
                Measured via corneometry: significant reduction in transepidermal water loss within 48 hours of initial application.
              </p>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-xs border border-white/80">
              <div className="font-playfair text-4xl text-primary font-light mb-1">88.1%</div>
              <h4 className="font-outfit text-xs uppercase tracking-wider text-secondary font-semibold mb-2">
                Cutaneous Elasticity Plumpness
              </h4>
              <p className="font-outfit text-xs text-on-surface-variant font-light leading-relaxed">
                Assessed via cutometer: enhanced dermal tensile bounce and structural collagen matrix preservation.
              </p>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-xs border border-white/80">
              <div className="font-playfair text-4xl text-primary font-light mb-1">92.7%</div>
              <h4 className="font-outfit text-xs uppercase tracking-wider text-secondary font-semibold mb-2">
                Luminosity & Tone Uniformity
              </h4>
              <p className="font-outfit text-xs text-on-surface-variant font-light leading-relaxed">
                Spectrophotometer analysis: marked increase in skin surface light reflectance and decrease in erythema.
              </p>
            </div>
          </div>
        </div>

        {/* INCI Ingredient Glossary */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="font-outfit text-[11px] text-secondary uppercase tracking-widest font-semibold block mb-1">
                Transparency Standard
              </span>
              <h3 className="font-playfair text-2xl md:text-3xl text-primary font-normal">
                Full Marine Bio-Active Ingredient Index
              </h3>
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-outline absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={ingredientSearch}
                onChange={(e) => setIngredientSearch(e.target.value)}
                placeholder="Search marine botanicals..."
                className="w-full bg-surface-container-low pl-10 pr-4 py-2 rounded-full text-xs font-outfit border border-surface-variant focus:outline-none focus:border-secondary"
              />
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl border border-surface-variant/40 divide-y divide-surface-container overflow-hidden shadow-xs">
            {filteredIngredients.map((item, idx) => (
              <div key={idx} className="p-5 hover:bg-surface-container-low/60 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1.5">
                  <h4 className="font-outfit text-sm font-semibold text-primary">
                    {item.inci}
                  </h4>
                  <span className="font-outfit text-[11px] px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-medium w-fit">
                    {item.origin}
                  </span>
                </div>
                <p className="font-outfit text-xs text-on-surface-variant font-light leading-relaxed">
                  <strong className="font-medium text-primary">Biological Action:</strong> {item.function}
                </p>
                <p className="font-outfit text-[11px] text-outline mt-1 font-light">
                  Found in: {item.products}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
