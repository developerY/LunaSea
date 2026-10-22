import React, { useState } from 'react';
import { Waves, Droplet, Leaf, Check, Sparkles, Shield, Recycle } from 'lucide-react';
import { LOGO_URL } from '../data/products';
import { NavigationTab } from '../types';

interface FooterProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onOpenDiagnostic: () => void;
  onOpenPolicy: (title: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTab,
  onOpenDiagnostic,
  onOpenPolicy
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 4000);
  };

  return (
    <footer className="w-full bg-surface-container-low mt-16 border-t border-surface-variant/40">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-16 pb-8">
        
        {/* Newsletter Signup Card */}
        <div className="bg-surface/70 backdrop-blur-md rounded-2xl p-6 md:p-10 mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/60 shadow-xs">
          <div className="max-w-xl">
            <h3 className="font-playfair text-2xl md:text-3xl text-primary mb-2 font-normal">
              Join the Tidal Circle
            </h3>
            <p className="font-outfit text-xs md:text-sm text-on-surface-variant font-light leading-relaxed">
              Receive exclusive allocations of seasonal marine harvests, moonlit ritual invitations, and clinical biotechnology discoveries.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-2 flex-1 max-w-md">
            {subscribed ? (
              <div className="bg-secondary-fixed/50 border border-secondary/30 text-primary px-4 py-3 rounded-full flex items-center justify-center gap-2 w-full font-outfit text-xs font-medium">
                <Check className="w-4 h-4 text-secondary" />
                <span>You have been admitted to the Tidal Circle. Welcome.</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your correspondence email..."
                  className="bg-surface font-outfit text-xs text-on-surface placeholder:text-outline px-4 py-3 rounded-full border border-surface-variant focus:outline-none focus:border-secondary flex-1 shadow-inner"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-container text-on-primary font-outfit text-[11px] uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-300 shrink-0 cursor-pointer shadow-xs"
                >
                  Subscribe
                </button>
              </>
            )}
          </form>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src={LOGO_URL}
                alt="LunaSea Cosmetics Logo"
                className="h-7 w-auto object-contain"
              />
              <span className="font-playfair text-2xl text-primary font-normal">
                LunaSea
              </span>
            </div>
            
            <p className="font-outfit text-xs text-on-surface-variant pr-4 leading-relaxed font-light">
              Harnessing pristine deep-ocean bio-ferments and cellular sea pearls to illuminate cutaneous vitality through tranquil nocturnal science.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:bg-surface-variant transition-colors cursor-pointer" title="Oceanic Bio-Ferments">
                <Waves className="w-4 h-4" />
              </span>
              <span className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:bg-surface-variant transition-colors cursor-pointer" title="Cellular Sea Water">
                <Droplet className="w-4 h-4" />
              </span>
              <span className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:bg-surface-variant transition-colors cursor-pointer" title="Clean Ocean Certified">
                <Leaf className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Col 2: Curations */}
          <div>
            <h4 className="font-outfit text-xs uppercase text-primary tracking-widest font-semibold mb-4">
              Curations
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Bio-Pearl Hydration', tab: 'skincare' as NavigationTab },
                { name: 'Nocturnal Micro-Algae Serum', tab: 'skincare' as NavigationTab },
                { name: 'Celestial Glow Crème', tab: 'skincare' as NavigationTab },
                { name: 'Tidal Sculpting Stones', tab: 'tidal-rituals' as NavigationTab },
                { name: 'Lunar Travel Concentrates', tab: 'lunar-makeup' as NavigationTab },
              ].map((item) => (
                <li
                  key={item.name}
                  onClick={() => onNavigateTab(item.tab)}
                  className="font-outfit text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer font-light"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Transparency & Ethics */}
          <div>
            <h4 className="font-outfit text-xs uppercase text-primary tracking-widest font-semibold mb-4">
              Transparency & Ethics
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Full Ingredient Index', action: () => onNavigateTab('algae-science') },
                { name: 'Sustainably Harvested Kelp', action: () => onNavigateTab('algae-science') },
                { name: 'Clinical Bio-Testing', action: () => onNavigateTab('algae-science') },
                { name: 'Ocean Plastic Recovery Program', action: () => onNavigateTab('about-us') },
                { name: 'Glass Refill Architecture', action: () => onNavigateTab('about-us') },
              ].map((item) => (
                <li
                  key={item.name}
                  onClick={item.action}
                  className="font-outfit text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer font-light"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Concierge & Care */}
          <div>
            <h4 className="font-outfit text-xs uppercase text-primary tracking-widest font-semibold mb-4">
              Concierge & Care
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Skin Diagnostics & Consult', action: onOpenDiagnostic },
                { name: 'Complimentary Shipping & Returns', action: () => onOpenPolicy('Complimentary Shipping & Carbon-Neutral Delivery') },
                { name: 'Order Tracking', action: () => onOpenPolicy('Live Order & Batch Tracking') },
                { name: 'Client Concierge Service', action: () => onOpenPolicy('LunaSea Client Concierge') },
                { name: 'Boutique Stockists', action: () => onNavigateTab('about-us') },
              ].map((item) => (
                <li
                  key={item.name}
                  onClick={item.action}
                  className="font-outfit text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer font-light"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Certifications and Legal Row */}
        <div className="py-6 border-t border-surface-container flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-surface rounded-full border border-surface-variant text-[11px] font-outfit text-on-surface-variant">
              <Shield className="w-3.5 h-3.5 text-secondary" />
              <span>Leaping Bunny Cruelty-Free</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-surface rounded-full border border-surface-variant text-[11px] font-outfit text-on-surface-variant">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              <span>Clean Ocean Certified</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-surface rounded-full border border-surface-variant text-[11px] font-outfit text-on-surface-variant">
              <Recycle className="w-3.5 h-3.5 text-secondary" />
              <span>100% Refillable Glass</span>
            </div>
          </div>

          <div className="flex items-center gap-5 text-outline text-xs font-outfit">
            <span 
              onClick={() => onOpenPolicy('Privacy Policy & Cookie Consent')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Privacy Policy
            </span>
            <span 
              onClick={() => onOpenPolicy('Terms of Lunar Ritual & Care')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Terms of Ritual
            </span>
            <span 
              onClick={() => onOpenPolicy('Digital Accessibility Statement')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Accessibility
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 text-center">
          <p className="font-outfit text-[11px] text-outline font-light">
            © 2025 LunaSea Cosmetics Haute Marine Biotechnologies LLC. All rights reserved. Formulated in Brittany, France & Pacific Northwest, USA.
          </p>
        </div>

      </div>
    </footer>
  );
};
