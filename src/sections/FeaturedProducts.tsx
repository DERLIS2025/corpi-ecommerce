import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { getFeaturedProducts } from '@/data/products';
import type { View } from '@/types';

interface FeaturedProductsProps {
  onViewChange: (view: View) => void;
  onProductSelect: (productId: string) => void;
}

export function FeaturedProducts({ onViewChange, onProductSelect }: FeaturedProductsProps) {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
          <div>
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">
              Venta e Instalación
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              Césped Natural
            </h2>
            <p className="text-gray-600 mt-2 max-w-xl">
              Los productos más populares de nuestra tienda, seleccionados por su calidad y satisfacción del cliente
            </p>
          </div>
          <Button
            onClick={() => onViewChange('catalog')}
            variant="outline"
            className="mt-4 sm:mt-0 border-green-600 text-green-600 hover:bg-green-50"
          >
            Ver todos
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onProductSelect(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
