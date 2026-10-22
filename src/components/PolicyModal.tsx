import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface PolicyModalProps {
  title: string | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ title, onClose }) => {
  if (!title) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-surface-container-lowest rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-white/70 relative p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-surface-container hover:bg-surface-variant flex items-center justify-center text-primary transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-secondary" />
          <h3 className="font-playfair text-xl text-primary font-medium">
            {title}
          </h3>
        </div>

        <div className="space-y-4 font-outfit text-xs text-on-surface-variant leading-relaxed font-light">
          <p>
            At LunaSea Cosmetics, our covenants are rooted in total marine transparency, zero-thermal bio-extraction, and circular ecological stewardship.
          </p>

          <h4 className="font-semibold text-primary uppercase tracking-wider text-[11px] pt-1">
            Global Carbon-Neutral Transit
          </h4>
          <p>
            All domestic and international parcels are dispatched in 100% compostable seaweed cellulose sleeves. Carbon generated during marine transit is balanced 200% via verified seagrass meadow reforestation projects in the Mediterranean and Brittany archipelagos.
          </p>

          <h4 className="font-semibold text-primary uppercase tracking-wider text-[11px] pt-1">
            Lifetime Opal Vessel Refill Loop
          </h4>
          <p>
            Empty jars can be returned using prepaid labels included with all orders over $85. Returned opal vessels undergo steam-sterilization in our Brittany facility and receive a fresh micro-filtered bio-batch.
          </p>

          <h4 className="font-semibold text-primary uppercase tracking-wider text-[11px] pt-1">
            30-Day Tidal Satisfaction Promise
          </h4>
          <p>
            If your cutaneous condition does not demonstrate marked clinical bounce and luminous clarity within 30 days of daily morning and evening practice, our client concierge will arrange an effortless exchange or full refund.
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-primary text-white py-3 rounded-full font-outfit text-xs uppercase tracking-wider hover:bg-primary-container transition-colors cursor-pointer"
        >
          Understood &amp; Agreed
        </button>
      </div>
    </div>
  );
};
