import React, { useState } from 'react';
import { Waves, Sparkles, TestTubes, RefreshCw, ChevronRight } from 'lucide-react';
import { NavigationTab } from '../types';

interface ScienceMatrixSectionProps {
  onLearnMore?: (tab: NavigationTab) => void;
}

export const ScienceMatrixSection: React.FC<ScienceMatrixSectionProps> = ({ onLearnMore }) => {
  const [activeMetricTab, setActiveMetricTab] = useState<'28days' | '56days'>('28days');

  const metrics = activeMetricTab === '28days' ? [
    { label: 'Epidermal Moisture Retention', value: 96.4, display: '+96.4%', color: 'bg-secondary' },
    { label: 'Cutaneous Elasticity & Plumpness', value: 88.1, display: '+88.1%', color: 'bg-secondary-fixed-dim' },
    { label: 'Luminosity & Tone Uniformity', value: 92.7, display: '+92.7%', color: 'bg-primary' },
  ] : [
    { label: 'Epidermal Moisture Retention', value: 98.8, display: '+98.8%', color: 'bg-secondary' },
    { label: 'Cutaneous Elasticity & Plumpness', value: 94.2, display: '+94.2%', color: 'bg-secondary-fixed-dim' },
    { label: 'Luminosity & Tone Uniformity', value: 97.1, display: '+97.1%', color: 'bg-primary' },
  ];

  return (
    <section className="w-full bg-surface-container-high py-16" id="science">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Clinical Data Card */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-outfit text-[11px] text-secondary uppercase tracking-widest block mb-2 font-medium">
                Haute Marine Biotechnology
              </span>
              <h2 className="font-playfair text-3xl md:text-4xl text-primary font-normal leading-tight">
                Uncompromising Cellular Rigor
              </h2>
            </div>

            <p className="font-outfit text-sm text-on-surface-variant leading-relaxed font-light">
              We isolate bioactive marine molecules through cold enzymatic extraction—preserving natural polyphenol potencies without synthetic thermal degradation.
            </p>

            {/* Clinical Data Card */}
            <div className="p-5 bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-variant/40">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-surface-container">
                <div>
                  <span className="font-outfit text-xs uppercase tracking-wider text-primary font-semibold block">
                    Clinical Bio-Response
                  </span>
                  <span className="font-outfit text-[10px] text-secondary">
                    Double-Blind Study • N=120 Volunteers
                  </span>
                </div>
                <div className="flex gap-1 bg-surface-container rounded-lg p-0.5 text-[10px] font-outfit">
                  <button 
                    onClick={() => setActiveMetricTab('28days')}
                    className={`px-2 py-1 rounded-md transition-colors ${activeMetricTab === '28days' ? 'bg-white text-primary font-medium shadow-xs' : 'text-outline'}`}
                  >
                    28 Days
                  </button>
                  <button 
                    onClick={() => setActiveMetricTab('56days')}
                    className={`px-2 py-1 rounded-md transition-colors ${activeMetricTab === '56days' ? 'bg-white text-primary font-medium shadow-xs' : 'text-outline'}`}
                  >
                    56 Days
                  </button>
                </div>
              </div>

              {/* Progress metrics */}
              <div className="space-y-4">
                {metrics.map((m) => (
                  <div key={m.label}>
                    <div className="flex justify-between font-outfit text-xs mb-1.5">
                      <span className="text-on-surface font-light">{m.label}</span>
                      <span className="font-semibold text-primary">{m.display}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                      <div 
                        className={`h-full ${m.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${m.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {onLearnMore && (
                <div className="mt-4 pt-3 border-t border-surface-container flex items-center justify-between">
                  <span className="text-[11px] font-outfit text-outline">Third-Party Dermatologist Tested</span>
                  <button 
                    onClick={() => onLearnMore('algae-science')}
                    className="text-xs font-outfit text-primary font-medium flex items-center gap-1 hover:text-secondary transition-colors"
                  >
                    <span>Full Study Archive</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: 4 Pillars of Science */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Pillar 1 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-xs hover:shadow-md transition-shadow border border-surface-variant/30 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-secondary-container/50 text-secondary flex items-center justify-center mb-4">
                  <Waves className="w-5 h-5 text-secondary" />
                </div>
                <span className="font-outfit text-[10px] text-outline uppercase tracking-wider font-semibold">
                  Pillar 01
                </span>
                <h3 className="font-playfair text-xl text-primary mt-1 mb-2 font-medium">
                  Sustainable Hand-Harvested Kelp
                </h3>
                <p className="font-outfit text-xs text-on-surface-variant leading-relaxed font-light">
                  Ethically gathered by certified divers from the pristine deep waters of the Brittany and Hebrides coasts during peak lunar tides.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-xs hover:shadow-md transition-shadow border border-surface-variant/30 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-tertiary-fixed/60 text-tertiary flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5 text-tertiary" />
                </div>
                <span className="font-outfit text-[10px] text-outline uppercase tracking-wider font-semibold">
                  Pillar 02
                </span>
                <h3 className="font-playfair text-xl text-primary mt-1 mb-2 font-medium">
                  Upcycled Sea Pearl Peptides
                </h3>
                <p className="font-outfit text-xs text-on-surface-variant leading-relaxed font-light">
                  Repurposed Akoya mother-of-pearl crystalline conchiolin peptides deliver luminous light-diffusing optical radiance without microplastics.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-xs hover:shadow-md transition-shadow border border-surface-variant/30 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-secondary-fixed/60 text-on-secondary-fixed flex items-center justify-center mb-4">
                  <TestTubes className="w-5 h-5 text-secondary" />
                </div>
                <span className="font-outfit text-[10px] text-outline uppercase tracking-wider font-semibold">
                  Pillar 03
                </span>
                <h3 className="font-playfair text-xl text-primary mt-1 mb-2 font-medium">
                  100% Waterless Cold Press
                </h3>
                <p className="font-outfit text-xs text-on-surface-variant leading-relaxed font-light">
                  Formulas are formulated on a pure marine cellular juice base rather than tap water, supercharging concentration and bioavailability.
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-xs hover:shadow-md transition-shadow border border-surface-variant/30 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-primary-fixed/60 text-primary flex items-center justify-center mb-4">
                  <RefreshCw className="w-5 h-5 text-primary" />
                </div>
                <span className="font-outfit text-[10px] text-outline uppercase tracking-wider font-semibold">
                  Pillar 04
                </span>
                <h3 className="font-playfair text-xl text-primary mt-1 mb-2 font-medium">
                  Infinitely Recyclable Vessels
                </h3>
                <p className="font-outfit text-xs text-on-surface-variant leading-relaxed font-light">
                  Custom frosted opal glass jars and biodegradable ocean-bound plastic lids engineered for lifetime refilling via our return vessel program.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
