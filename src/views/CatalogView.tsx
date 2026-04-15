import { ChevronDown, Filter } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { categories, products } from '@/data/products';

interface CatalogViewProps {
  selectedCategory: string | null;
  searchQuery: string;
  onProductSelect: (productId: string) => void;
  onCategorySelect: (categoryId: string | null) => void;
}

export function CatalogView({
  selectedCategory,
  searchQuery,
  onProductSelect,
  onCategorySelect,
}: CatalogViewProps) {
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'popular'>('popular');

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    let result = selectedCategory
      ? products.filter((product) => product.category === selectedCategory)
      : products;

    if (query) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    if (sortBy === 'price-asc') return [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') return [...result].sort((a, b) => b.price - a.price);

    return [...result].sort((a, b) => b.reviews - a.reviews);
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#f5f7f5]">
      <div className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Catálogo de soluciones</h1>
          <p className="text-gray-600">
            {filteredProducts.length} productos listos para consulta y presupuesto personalizado.
          </p>
          <div>
            <WhatsAppButton
              message="Hola, quiero asesoramiento para elegir productos y servicios para mi jardín."
              label="Solicitar asesoramiento"
              className="bg-green-700 text-white hover:bg-green-800"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[260px,1fr] lg:px-8">
        <aside className="h-fit rounded-2xl border border-border bg-white p-5 shadow-sm lg:sticky lg:top-28">
          <div className="mb-4 flex items-center gap-2">
            <Filter className="h-5 w-5 text-green-700" />
            <h2 className="font-semibold text-gray-900">Categorías</h2>
          </div>
          <div className="space-y-1">
            <button
              onClick={() => onCategorySelect(null)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                selectedCategory === null ? 'bg-green-50 text-green-800' : 'hover:bg-gray-50'
              }`}
            >
              Todas
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                  selectedCategory === category.id
                    ? 'bg-green-50 text-green-800'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </aside>

        <main>
          <div className="mb-5 flex justify-end">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as typeof sortBy)}
                className="appearance-none rounded-xl border border-border bg-white px-4 py-2 pr-10 text-sm outline-none focus:border-green-400"
              >
                <option value="popular">Más consultados</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onClick={() => onProductSelect(product.id)} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-white p-10 text-center text-gray-500">
              No encontramos productos con esos filtros. Probá otra categoría o búsqueda.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
