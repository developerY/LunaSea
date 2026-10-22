import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  subMessage?: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, subMessage, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
      <div className="bg-primary text-on-primary px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3.5 border border-secondary/30 backdrop-blur-md">
        <div className="w-8 h-8 rounded-full bg-secondary-fixed/30 flex items-center justify-center shrink-0 text-secondary-fixed">
          <CheckCircle2 className="w-5 h-5 text-secondary-fixed" />
        </div>
        <div className="pr-2">
          <p className="font-outfit text-xs font-semibold tracking-wider uppercase text-surface">
            {message}
          </p>
          {subMessage && (
            <p className="font-outfit text-xs text-on-primary-container mt-0.5">
              {subMessage}
            </p>
          )}
        </div>
        <button 
          onClick={onClose}
          className="text-on-primary-container hover:text-white transition-colors p-1"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
