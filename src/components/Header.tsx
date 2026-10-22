import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, ChevronDown, Menu, X, Sparkles, ChevronLeft } from 'lucide-react';
import { NavigationTab } from '../types';
import { LOGO_URL } from '../data/products';

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenProfile: () => void;
  currency: string;
  onChangeCurrency: (curr: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenProfile,
  currency,
  onChangeCurrency
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const navLinks: { id: NavigationTab; label: string }[] = [
    { id: 'skincare', label: 'Skincare' },
    { id: 'lunar-makeup', label: 'Lunar Makeup' },
    { id: 'tidal-rituals', label: 'Tidal Rituals' },
    { id: 'algae-science', label: 'Algae Science' },
    { id: 'about-us', label: 'About Us' },
  ];

  const handleNavClick = (tab: NavigationTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
      {/* Top Banner */}
      <div className="bg-secondary text-surface py-1.5 px-4 md:px-16 text-center overflow-hidden">
        <p className="font-outfit text-[10px] md:text-[11px] uppercase tracking-widest text-surface/90 flex items-center justify-center gap-2">
          <ChevronLeft className="w-3 h-3 text-primary-fixed shrink-0 hidden sm:inline-block" />
          <span>Complimentary Bio-Pearl Elixir with orders over $85 • Complimentary global carbon-neutral shipping</span>
          <ChevronLeft className="w-3 h-3 text-primary-fixed shrink-0 rotate-180 hidden sm:inline-block" />
        </p>
      </div>

      {/* Main Frosted Glass Navbar */}
      <div className="h-20 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(39,72,75,0.05)] border-b border-surface-variant/40">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 h-full flex items-center justify-between gap-6">
          
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => handleNavClick('home')} 
              className="flex items-center gap-2.5 text-left group"
            >
              <img 
                src={LOGO_URL} 
                alt="LunaSea Cosmetics Logo" 
                className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <span className="font-playfair text-2xl tracking-tight text-primary font-normal hidden sm:inline-block">
                LunaSea
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`font-outfit text-[13px] uppercase tracking-wider transition-all py-1.5 cursor-pointer relative ${
                    isActive 
                      ? 'text-primary font-medium border-b-2 border-primary-container' 
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Actions Bar */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Search Input Button */}
            <div 
              onClick={onOpenSearch}
              className="hidden md:flex items-center bg-surface-container-low rounded-full px-3 py-1.5 border border-surface-variant focus-within:border-secondary transition-all cursor-pointer hover:border-secondary/60 group"
            >
              <Search className="w-4 h-4 text-outline group-hover:text-primary transition-colors" />
              <span className="font-outfit text-xs text-outline group-hover:text-on-surface-variant w-28 lg:w-36 ml-2 select-none text-left">
                Search formulas...
              </span>
            </div>

            {/* Mobile search icon button */}
            <button
              onClick={onOpenSearch}
              className="md:hidden text-on-surface-variant hover:text-primary transition-colors p-1.5"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Currency Switcher */}
            <div className="relative hidden sm:block">
              <button 
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                className="flex items-center gap-1 font-outfit text-[11px] text-on-surface-variant uppercase font-medium hover:text-primary transition-colors py-1 px-1.5"
              >
                <span>{currency}</span>
                <ChevronDown className="w-3.5 h-3.5 text-outline" />
              </button>

              {showCurrencyDropdown && (
                <div className="absolute right-0 mt-2 w-24 bg-surface-container-lowest rounded-xl shadow-xl border border-surface-variant py-1.5 z-50">
                  {['USD', 'EUR', 'GBP', 'CAD'].map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        onChangeCurrency(c);
                        setShowCurrencyDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-outfit hover:bg-surface-container ${
                        currency === c ? 'text-primary font-semibold' : 'text-on-surface-variant'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative text-on-surface-variant hover:text-primary transition-colors p-1.5"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-secondary text-white font-outfit text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              className="relative text-on-surface-variant hover:text-primary transition-colors p-1.5"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-on-primary font-outfit text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold leading-none shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile Avatar */}
            <button
              onClick={onOpenProfile}
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary hover:bg-primary-container transition-all shadow-sm"
              aria-label="Account and skin profile"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-primary p-1.5 ml-1"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface/98 backdrop-blur-2xl border-b border-surface-variant px-6 py-6 shadow-2xl transition-all">
          <div className="flex flex-col gap-4">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left font-outfit text-sm uppercase tracking-wider py-2 ${
                currentTab === 'home' ? 'text-primary font-semibold' : 'text-on-surface-variant'
              }`}
            >
              Home Sanctuary
            </button>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left font-outfit text-sm uppercase tracking-wider py-2 border-b border-surface-container ${
                  currentTab === link.id ? 'text-primary font-semibold' : 'text-on-surface-variant'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-4 flex items-center justify-between text-xs text-on-surface-variant font-outfit">
              <span>Currency</span>
              <div className="flex gap-2">
                {['USD', 'EUR', 'GBP', 'CAD'].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => onChangeCurrency(curr)}
                    className={`px-2 py-1 rounded-md ${
                      currency === curr ? 'bg-primary text-white' : 'bg-surface-container'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
