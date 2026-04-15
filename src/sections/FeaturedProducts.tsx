import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { getFeaturedProducts } from '@/data/products';
import type { View } from '@/types';

interface FeaturedProductsProps {
  onViewChange: (view: View) => void;
  onProductSelect: (productId: string) => void;
}

export function FeaturedProducts({ onViewChange, onProductSelect }: FeaturedProductsProps) {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="bg-[#f4f8f4] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-green-700">Destacados</p>
            <h2 className="text-3xl font-bold text-gray-900">Venta e instalación</h2>
            <p className="mt-2 max-w-2xl text-gray-600">
              Productos con mayor consulta para césped, riego y paisajismo. Ideal para pedir propuesta
              personalizada.
            </p>
          </div>
          <Button variant="outline" onClick={() => onViewChange('catalog')}>
            Ver todo el catálogo
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onClick={() => onProductSelect(product.id)} />
          ))}
        </div>
      </div>
    </section>
  );
}
