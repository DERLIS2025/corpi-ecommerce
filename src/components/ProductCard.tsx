import { ShoppingCart, Star, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/store/CartContext';
import { formatPrice } from '@/data/products';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badge */}
        {product.badge && (
          <Badge className="absolute top-3 left-3 bg-green-600 hover:bg-green-700 text-white">
            {product.badge}
          </Badge>
        )}

        {/* Quick Add Button */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Agregar
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < product.rating
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-green-700 transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-green-700">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-1 mt-2 text-sm">
          {product.inStock ? (
            <>
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-green-600">En stock</span>
            </>
          ) : (
            <span className="text-red-500">Agotado</span>
          )}
        </div>
      </div>
    </div>
  );
}
