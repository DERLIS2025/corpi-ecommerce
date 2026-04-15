import { categories } from '@/data/products';
import type { View } from '@/types';

interface CategoriesProps {
  onViewChange: (view: View) => void;
  onCategorySelect: (categoryId: string) => void;
}

export function Categories({ onViewChange, onCategorySelect }: CategoriesProps) {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-green-700">Categorías</p>
            <h2 className="text-3xl font-bold text-gray-900">Navegá por soluciones</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                onCategorySelect(category.id);
                onViewChange('catalog');
              }}
              className="group overflow-hidden rounded-2xl border border-border bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <img src={category.image} alt={category.name} className="h-28 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 group-hover:text-green-700">{category.name}</h3>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">{category.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
