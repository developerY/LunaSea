import React from 'react';
import { X, User, Sparkles, Shield, Gift, Package, RefreshCw } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDiagnostic: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onOpenDiagnostic
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-surface-container-lowest rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/70 relative p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-surface-container hover:bg-surface-variant flex items-center justify-center text-primary transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-playfair text-xl">
            EA
          </div>
          <div>
            <h3 className="font-playfair text-xl text-primary font-medium">
              Elena Aethelgard
            </h3>
            <span className="font-outfit text-xs px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold uppercase tracking-wider">
              Tidal Circle • Tier II Artisan
            </span>
          </div>
        </div>

        {/* Member Status Card */}
        <div className="bg-gradient-to-br from-surface-container via-surface-container-low to-secondary-fixed/20 p-4 rounded-2xl border border-white/60 mb-6 space-y-3">
          <div className="flex items-center justify-between text-xs font-outfit">
            <span className="text-outline uppercase tracking-wider font-semibold">Vessel Return Credit</span>
            <span className="font-semibold text-primary text-sm">$15.00 Available</span>
          </div>
          <p className="text-[11px] font-outfit text-on-surface-variant font-light leading-relaxed">
            1 Frosted Opal Vessel recycled this season. $15 credit ready for your next fresh harvest order.
          </p>
        </div>

        {/* Skin Prescription Section */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <h4 className="font-outfit text-xs uppercase tracking-wider text-primary font-semibold">
              Current Tidal Prescription
            </h4>
            <button
              onClick={() => {
                onClose();
                onOpenDiagnostic();
              }}
              className="text-xs font-outfit text-secondary underline cursor-pointer"
            >
              Retake Diagnostic
            </button>
          </div>

          <div className="p-4 bg-surface-container-low rounded-xl border border-surface-variant/40 space-y-1">
            <span className="font-outfit text-[10px] text-secondary uppercase font-semibold">Combination & Tidal</span>
            <p className="font-playfair text-base text-primary font-medium">Tidal Infusion Serum + Opal Wave Cream</p>
            <p className="text-[11px] font-outfit text-on-surface-variant font-light leading-relaxed">
              Glass Dew finish tailored for cellular barrier renewal and balanced sebum calibration.
            </p>
          </div>
        </div>

        {/* Allocations & Harvest Reservations */}
        <div className="space-y-3">
          <h4 className="font-outfit text-xs uppercase tracking-wider text-primary font-semibold">
            Seasonal Harvest Allocations
          </h4>
          <div className="p-3.5 bg-surface-container-low rounded-xl border border-surface-variant/40 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-primary">Batch #L-894 Moonlit Nectar</p>
              <p className="text-[10px] text-outline">Dispatched • Spring Solstice Harvest</p>
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-secondary">
              Delivered
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-primary text-white py-3 rounded-full font-outfit text-xs uppercase tracking-wider hover:bg-primary-container transition-colors cursor-pointer"
        >
          Close Sanctuary Profile
        </button>
      </div>
    </div>
  );
};
