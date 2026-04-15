import { Leaf, Droplets, Flower2, Gem, Waves, ArrowRight } from 'lucide-react';
import { categories } from '@/data/products';
import type { View } from '@/types';

const iconMap: Record<string, React.ElementType> = {
  Leaf,
  Droplets,
  Flower2,
  Gem,
  Waves,
};

interface CategoriesProps {
  onViewChange: (view: View) => void;
  onCategorySelect: (categoryId: string) => void;
}

export function Categories({ onViewChange, onCategorySelect }: CategoriesProps) {
  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect(categoryId);
    onViewChange('catalog');
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Nuestras categorías principales
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encuentra todo lo que necesitas para crear y mantener el jardín de tus sueños
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon];
            
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-green-100 p-6 text-left transition-all hover:shadow-xl hover:scale-105"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
                  style={{
                    backgroundImage: `url(${category.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-700 transition-colors">
                    {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {category.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center text-green-600 text-sm font-medium group-hover:text-green-700">
                    Ver más
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
