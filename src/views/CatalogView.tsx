import { useState, useMemo } from 'react';
import { Filter, ChevronDown, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { products, categories, formatPrice } from '@/data/products';
import { useCart } from '@/store/CartContext';
import type { View } from '@/types';

interface CatalogViewProps {
  selectedCategory: string | null;
  onProductSelect: (productId: string) => void;
  onViewChange: (view: View) => void;
}

export function CatalogView({ selectedCategory, onProductSelect, onViewChange }: CatalogViewProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(selectedCategory);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'popular'>('popular');
  const { totalItems, totalPrice } = useCart();

  const filteredProducts = useMemo(() => {
    let result = activeCategory
      ? products.filter((p) => p.category === activeCategory)
      : products;

    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result = [...result].sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return result;
  }, [activeCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Catálogo</h1>
              <p className="text-gray-600 mt-1">
                {filteredProducts.length} productos disponibles
              </p>
            </div>
            
            {/* Cart Summary */}
            {totalItems > 0 && (
              <Button
                onClick={() => onViewChange('cart')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {totalItems} items - {formatPrice(totalPrice)}
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <h2 className="font-semibold text-gray-900">Categorías</h2>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                    activeCategory === null
                      ? 'bg-green-100 text-green-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Todas las categorías
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                      activeCategory === category.id
                        ? 'bg-green-100 text-green-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {/* Sort */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Ordenar por:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="popular">Más populares</option>
                    <option value="price-asc">Precio: menor a mayor</option>
                    <option value="price-desc">Precio: mayor a menor</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => onProductSelect(product.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-gray-600">
                  Intenta seleccionar otra categoría
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
