import { useState } from 'react';
import { WhatsAppFloatingButton } from '@/components/WhatsAppFloatingButton';
import { Benefits } from '@/sections/Benefits';
import { Categories } from '@/sections/Categories';
import { CTASection } from '@/sections/CTASection';
import { FeaturedProducts } from '@/sections/FeaturedProducts';
import { Footer } from '@/sections/Footer';
import { Header } from '@/sections/Header';
import { Hero } from '@/sections/Hero';
import type { View } from '@/types';
import { CatalogView } from '@/views/CatalogView';
import { ProductView } from '@/views/ProductView';

interface HomePageProps {
  onViewChange: (view: View) => void;
  onProductSelect: (productId: string) => void;
  onCategorySelect: (categoryId: string) => void;
}

function HomePage({ onViewChange, onProductSelect, onCategorySelect }: HomePageProps) {
  return (
    <main>
      <Hero onViewChange={onViewChange} />
      <Categories onViewChange={onViewChange} onCategorySelect={onCategorySelect} />
      <FeaturedProducts onViewChange={onViewChange} onProductSelect={onProductSelect} />
      <Benefits />
      <CTASection />
    </main>
  );
}

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleViewChange = (view: View) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setCurrentView('catalog');
  };

  const handleProductSelect = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        currentView={currentView}
        onViewChange={handleViewChange}
        onCategorySelect={handleCategorySelect}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {currentView === 'home' && (
        <HomePage
          onViewChange={handleViewChange}
          onProductSelect={handleProductSelect}
          onCategorySelect={(categoryId) => handleCategorySelect(categoryId)}
        />
      )}

      {currentView === 'catalog' && (
        <CatalogView
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          onProductSelect={handleProductSelect}
          onCategorySelect={setSelectedCategory}
        />
      )}

      {currentView === 'product' && selectedProductId && (
        <ProductView
          productId={selectedProductId}
          onBack={() => handleViewChange('catalog')}
          onProductSelect={handleProductSelect}
        />
      )}

      <Footer onViewChange={handleViewChange} />
      <WhatsAppFloatingButton />
    </div>
  );
}

export default App;
