import { useState } from 'react';
import { CartProvider } from '@/store/CartContext';
import { Header } from '@/sections/Header';
import { Hero } from '@/sections/Hero';
import { Categories } from '@/sections/Categories';
import { FeaturedProducts } from '@/sections/FeaturedProducts';
import { Benefits } from '@/sections/Benefits';
import { Newsletter } from '@/sections/Newsletter';
import { Footer } from '@/sections/Footer';
import { CatalogView } from '@/views/CatalogView';
import { ProductView } from '@/views/ProductView';
import { CartView } from '@/views/CartView';
import type { View } from '@/types';

function HomePage({ 
  onViewChange, 
  onProductSelect 
}: { 
  onViewChange: (view: View) => void;
  onProductSelect: (productId: string) => void;
}) {
  return (
    <main>
      <Hero onViewChange={onViewChange} />
      <Categories onViewChange={onViewChange} onCategorySelect={() => {}} />
      <FeaturedProducts onViewChange={onViewChange} onProductSelect={onProductSelect} />
      <Benefits />
      <Newsletter />
    </main>
  );
}

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleViewChange = (view: View) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductSelect = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromProduct = () => {
    setSelectedProductId(null);
    setCurrentView('catalog');
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Header 
          currentView={currentView} 
          onViewChange={handleViewChange}
          onProductSelect={handleProductSelect}
        />
        
        {currentView === 'home' && (
          <HomePage 
            onViewChange={handleViewChange} 
            onProductSelect={handleProductSelect}
          />
        )}
        
        {currentView === 'catalog' && (
          <CatalogView
            selectedCategory={null}
            onProductSelect={handleProductSelect}
            onViewChange={handleViewChange}
          />
        )}
        
        {currentView === 'product' && selectedProductId && (
          <ProductView
            productId={selectedProductId}
            onBack={handleBackFromProduct}
            onViewChange={handleViewChange}
            onProductSelect={handleProductSelect}
          />
        )}
        
        {currentView === 'cart' && (
          <CartView onViewChange={handleViewChange} />
        )}
        
        {currentView === 'home' && <Footer onViewChange={handleViewChange} />}
        {currentView === 'catalog' && <Footer onViewChange={handleViewChange} />}
        {currentView === 'product' && <Footer onViewChange={handleViewChange} />}
        {currentView === 'cart' && <Footer onViewChange={handleViewChange} />}
      </div>
    </CartProvider>
  );
}

export default App;
