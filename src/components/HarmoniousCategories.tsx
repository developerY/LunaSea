import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { NavigationTab } from '../types';

interface HarmoniousCategoriesProps {
  onNavigateTab: (tab: NavigationTab) => void;
}

export const HarmoniousCategories: React.FC<HarmoniousCategoriesProps> = ({ onNavigateTab }) => {
  const categories = [
    {
      id: 'skincare' as NavigationTab,
      number: 'Collection 01',
      title: 'Lunar Skincare',
      description: 'Bio-ferment serums, cellular tidal essences, and weightless ocean cloud creams.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAh98HyE1NGbUlYqkAIVZRODIpWkpUuREZccpaxwr-WId-ZPRgkT4P_8KUjRDRC9TROkCJTsezCtftsmcjvFqt7ZypZbpl9uNWy_hxXclaG2_w3uvE2XUMZt1W1Z_cjSE41EuzN-v8YnM1XW_w2aj4nCp_z-TwDQt3n6o8awKbYSP7l9cfAXSzdh5cGxLqmbmnQlYt2m9pph6XIiXIBTtbNupjX-8t-OBPPxOPBkW9ZvvZGnofwMFrd',
      count: '14 Formulations',
      cta: 'Explore Essences',
      gradient: 'from-secondary-fixed/40 to-surface-container-lowest',
      tagColor: 'text-secondary'
    },
    {
      id: 'lunar-makeup' as NavigationTab,
      number: 'Collection 02',
      title: 'Lustrous Tidal Makeup',
      description: 'Pearl dew skin tints, ocean-glass lip peptides, and soft iridescent illuminators.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmaq2EhKO7Ejsv6WBMpSx75BUiD_YwlSc_SXrOoyXPeA80JqqQFneJUc1PjdMr_hs6omRyOm22B4ATGdccbZmuTeTB2JHHIcu3efNK2ZvbUVwJ6bXvaZ00IYyQap-lR4fsJLe1cIHZj8OL_R4wbhE-NJf_NfB8HgaeT4BR1w1QX93UOqai8W5lxQmXL5WsqRe2hDkHKyK6idagZd0wS400nKx5QgGORFtPPX2gATFzhHWuTelm07k8',
      count: '8 Formulations',
      cta: 'Explore Tints',
      gradient: 'from-tertiary-fixed/40 to-surface-container-lowest',
      tagColor: 'text-tertiary-container'
    },
    {
      id: 'tidal-rituals' as NavigationTab,
      number: 'Collection 03',
      title: 'Deep Sea Rituals',
      description: 'Magnesium brine soaks, micro-kelp sculpting masks, and carved celadon tidal stones.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHWmr4JP3jBvsGVv_hpMaBqC3sWRtkLh51Z0cWSiLfa35DC1ClsUX6T74pK8mHPkQ76GY0dcWwxTHdAydxT4X5SOPjLq-ggGuoMyw6_jQOgRKimTMhPZ8BplFM74XrvuVUVHKbmOlaMr0jIZ7MHBqAyXo1AxlhFvzUqiBI2AFxRTp9pFZb0cfsi8m7pLzwpMlb5lQWnUjIIWTDfGHz9wvRi-MBD6eZ8H-4IOlOPiwzoihTSF6xW9sn',
      count: '6 Rituals',
      cta: 'Explore Soaks',
      gradient: 'from-primary-fixed/40 to-surface-container-lowest',
      tagColor: 'text-primary'
    }
  ];

  return (
    <section className="w-full bg-surface-container-low py-16" id="collections">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-3">
          <div>
            <span className="font-outfit text-[11px] text-secondary uppercase tracking-widest block mb-2 font-medium">
              Curated Tidal Archives
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl text-primary font-normal">
              Harmonious Categories
            </h2>
          </div>
          <p className="font-outfit text-sm text-on-surface-variant max-w-md leading-relaxed font-light">
            Explore sensory textures engineered between ocean depth pressures and restorative celestial cycles.
          </p>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigateTab(cat.id)}
              className={`group relative rounded-2xl overflow-hidden bg-gradient-to-b ${cat.gradient} p-5 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-500 cursor-pointer border border-white/50`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`font-outfit text-[11px] uppercase tracking-widest font-medium ${cat.tagColor}`}>
                    {cat.number}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/70 backdrop-blur-xs flex items-center justify-center text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-playfair text-2xl text-primary font-medium">
                  {cat.title}
                </h3>
                <p className="font-outfit text-xs text-on-surface-variant font-light leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-5 aspect-[4/3] rounded-xl overflow-hidden bg-surface-container shadow-inner">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="mt-5 pt-1 flex items-center justify-between">
                <span className="font-outfit text-[11px] text-on-surface uppercase tracking-wider font-medium">
                  {cat.count}
                </span>
                <span className="font-outfit text-[11px] text-primary underline underline-offset-4 tracking-wider uppercase font-semibold group-hover:text-secondary transition-colors">
                  {cat.cta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
