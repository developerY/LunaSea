import React, { useState } from 'react';
import { NavigationTab, Product, CartItem, Shade, Review } from './types';
import { PRODUCTS, REVIEWS } from './data/products';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HarmoniousCategories } from './components/HarmoniousCategories';
import { BestSellersSection } from './components/BestSellersSection';
import { ScienceMatrixSection } from './components/ScienceMatrixSection';
import { TidalPrescriptionQuiz } from './components/TidalPrescriptionQuiz';
import { PressAndReviewsSection } from './components/PressAndReviewsSection';
import { Footer } from './components/Footer';
import { SkincareScreen } from './screens/SkincareScreen';
import { LunarMakeupScreen } from './screens/LunarMakeupScreen';
import { TidalRitualsScreen } from './screens/TidalRitualsScreen';
import { AlgaeScienceScreen } from './screens/AlgaeScienceScreen';
import { AboutUsScreen } from './screens/AboutUsScreen';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { ProfileModal } from './components/ProfileModal';
import { CheckoutModal } from './components/CheckoutModal';
import { PolicyModal } from './components/PolicyModal';
import { Toast } from './components/Toast';

export default function App() {
  // Navigation
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');

  // Currency
  const [currency, setCurrency] = useState('USD');
  const currencyRates: Record<string, { symbol: string; rate: number }> = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.78 },
    CAD: { symbol: 'C$', rate: 1.36 },
  };

  const formatPrice = (usdPrice: number): string => {
    const config = currencyRates[currency] || currencyRates.USD;
    const converted = Math.round(usdPrice * config.rate);
    return `${config.symbol}${converted}`;
  };

  // Cart State (Initialized with 2 items matching the screenshot badge '2')
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Moonlit Nectar Serum
      quantity: 1,
    },
    {
      product: PRODUCTS[1], // Opal Wave Cream
      quantity: 1,
    }
  ]);

  // Wishlist State
  const [wishlist, setWishlist] = useState<Product[]>([
    PRODUCTS[2], // Pearl Veil Dew Drops
  ]);

  // Customer Reviews
  const [reviews, setReviews] = useState<Review[]>(REVIEWS);

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [policyTitle, setPolicyTitle] = useState<string | null>(null);

  // Toast Notification
  const [toast, setToast] = useState<{ message: string; subMessage?: string } | null>(null);

  const showToast = (message: string, subMessage?: string) => {
    setToast({ message, subMessage });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, shade?: Shade, quantity: number = 1) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedShade?.id === shade?.id
      );

      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      } else {
        return [...prev, { product, quantity, selectedShade: shade }];
      }
    });

    const shadeText = shade ? ` (${shade.name})` : '';
    showToast('Allocated to Bag', `${product.name}${shadeText} • ${formatPrice(product.price * quantity)}`);
  };

  const handleAddDiagnosticDuo = (title: string, price: number, recommendedProducts: Product[]) => {
    recommendedProducts.forEach(prod => {
      handleAddToCart(prod, undefined, 1);
    });
    showToast('Bespoke Ritual Added', `${title} allocated to your bag • ${formatPrice(price)}`);
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number, shadeId?: string) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId, shadeId);
      return;
    }

    setCartItems(prev =>
      prev.map(item => {
        if (item.product.id === productId && item.selectedShade?.id === shadeId) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const handleRemoveCartItem = (productId: string, shadeId?: string) => {
    setCartItems(prev =>
      prev.filter(item => !(item.product.id === productId && item.selectedShade?.id === shadeId))
    );
  };

  // Wishlist Handlers
  const isProductWishlisted = (productId: string) => {
    return wishlist.some(p => p.id === productId);
  };

  const handleToggleWishlist = (product: Product) => {
    const exists = isProductWishlisted(product.id);
    if (exists) {
      setWishlist(prev => prev.filter(p => p.id !== product.id));
      showToast('Removed from Sanctuary', product.name);
    } else {
      setWishlist(prev => [...prev, product]);
      showToast('Saved to Sanctuary', product.name);
    }
  };

  const handleMoveWishlistToCart = (product: Product) => {
    handleAddToCart(product);
    setWishlist(prev => prev.filter(p => p.id !== product.id));
  };

  const handleAddAllWishlistToCart = () => {
    wishlist.forEach(p => {
      handleAddToCart(p);
    });
    setWishlist([]);
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  // Navigation
  const handleSelectTab = (tab: NavigationTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreCollections = () => {
    if (currentTab === 'home') {
      const el = document.getElementById('collections');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    handleSelectTab('skincare');
  };

  const handleDiscoverScience = () => {
    if (currentTab === 'home') {
      const el = document.getElementById('science');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    handleSelectTab('algae-science');
  };

  const handleAddReview = (newRev: Omit<Review, 'id' | 'date' | 'verified'>) => {
    const created: Review = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      verified: true,
    };
    setReviews([created, ...reviews]);
    showToast('Reflection Published', 'Thank you for contributing to the Tidal Circle.');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-surface font-outfit text-on-surface min-h-screen flex flex-col selection:bg-secondary-fixed selection:text-primary">
      {/* Frosted Fixed Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        currency={currency}
        onChangeCurrency={setCurrency}
      />

      {/* Main Content Area */}
      <main className="w-full pt-28 bg-surface flex-1">
        {currentTab === 'home' && (
          <div className="flex flex-col w-full">
            {/* 1. Hero Showcase ("Luminous by the Tide") */}
            <HeroSection
              spotlightProduct={PRODUCTS[0]}
              onAddToCart={handleAddToCart}
              onOpenProductDetail={setSelectedProduct}
              onExploreCollections={handleExploreCollections}
              onDiscoverScience={handleDiscoverScience}
              isWishlisted={isProductWishlisted(PRODUCTS[0].id)}
              onToggleWishlist={handleToggleWishlist}
              formatPrice={formatPrice}
            />

            {/* 2. Curated Product Collections / Pastel Categories */}
            <HarmoniousCategories onNavigateTab={handleSelectTab} />

            {/* 3. Revered Best Sellers */}
            <BestSellersSection
              products={PRODUCTS}
              onAddToCart={handleAddToCart}
              onOpenProductDetail={setSelectedProduct}
              isWishlisted={isProductWishlisted}
              onToggleWishlist={handleToggleWishlist}
              formatPrice={formatPrice}
            />

            {/* 4. Ocean Botanical Science & Transparency Matrix */}
            <ScienceMatrixSection onLearnMore={handleSelectTab} />

            {/* 5. Interactive "Find Your Tidal Prescription" Skin Diagnostic */}
            <TidalPrescriptionQuiz
              products={PRODUCTS}
              onAddDiagnosticDuoToBag={handleAddDiagnosticDuo}
              formatPrice={formatPrice}
            />

            {/* 6. Editorial Press & Customer Accolades */}
            <PressAndReviewsSection
              reviews={reviews}
              onAddReview={handleAddReview}
            />
          </div>
        )}

        {/* Screen 2: Skincare */}
        {currentTab === 'skincare' && (
          <SkincareScreen
            products={PRODUCTS}
            onAddToCart={handleAddToCart}
            onOpenProductDetail={setSelectedProduct}
            isWishlisted={isProductWishlisted}
            onToggleWishlist={handleToggleWishlist}
            formatPrice={formatPrice}
          />
        )}

        {/* Screen 3: Lunar Makeup */}
        {currentTab === 'lunar-makeup' && (
          <LunarMakeupScreen
            products={PRODUCTS}
            onAddToCart={handleAddToCart}
            onOpenProductDetail={setSelectedProduct}
            isWishlisted={isProductWishlisted}
            onToggleWishlist={handleToggleWishlist}
            formatPrice={formatPrice}
          />
        )}

        {/* Screen 4: Tidal Rituals */}
        {currentTab === 'tidal-rituals' && (
          <TidalRitualsScreen
            products={PRODUCTS}
            onAddToCart={handleAddToCart}
            onOpenProductDetail={setSelectedProduct}
            formatPrice={formatPrice}
          />
        )}

        {/* Screen 5: Algae Science */}
        {currentTab === 'algae-science' && (
          <AlgaeScienceScreen />
        )}

        {/* Screen 6: About Us */}
        {currentTab === 'about-us' && (
          <AboutUsScreen />
        )}
      </main>

      {/* Global Luxury Footer */}
      <Footer
        onNavigateTab={handleSelectTab}
        onOpenDiagnostic={() => {
          if (currentTab !== 'home') {
            setCurrentTab('home');
            setTimeout(() => {
              const el = document.getElementById('diagnostic');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          } else {
            const el = document.getElementById('diagnostic');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onOpenPolicy={setPolicyTitle}
      />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProduct ? isProductWishlisted(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        formatPrice={formatPrice}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        formatPrice={formatPrice}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={(id) => setWishlist(prev => prev.filter(p => p.id !== id))}
        onMoveToCart={handleMoveWishlistToCart}
        onAddAllToCart={handleAddAllWishlistToCart}
        formatPrice={formatPrice}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={setSelectedProduct}
        onAddToCart={handleAddToCart}
        formatPrice={formatPrice}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onOpenDiagnostic={() => {
          setCurrentTab('home');
          setTimeout(() => {
            const el = document.getElementById('diagnostic');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderCompleted={() => setCartItems([])}
        formatPrice={formatPrice}
      />

      <PolicyModal
        title={policyTitle}
        onClose={() => setPolicyTitle(null)}
      />

      {/* Bottom Floating Toast */}
      <Toast
        message={toast?.message || null}
        subMessage={toast?.subMessage}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
