import { useState } from 'react';
import { ArrowLeft, ShoppingCart, Check, Star, Minus, Plus, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getProductById, formatPrice, products } from '@/data/products';
import { useCart } from '@/store/CartContext';
import { ProductCard } from '@/components/ProductCard';
import type { View } from '@/types';

interface ProductViewProps {
  productId: string;
  onBack: () => void;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onViewChange: (view: View) => void;
  onProductSelect: (productId: string) => void;
}

export function ProductView({ productId, onBack, onProductSelect }: ProductViewProps) {
  const product = getProductById(productId);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Producto no encontrado</h2>
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al catálogo
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10">
            {/* Image */}
            <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-green-600 text-white text-sm px-3 py-1">
                  {product.badge}
                </Badge>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < product.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews} reseñas)</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Description */}
              <p className="text-gray-600 text-lg mb-6">
                {product.description}
              </p>

              {/* Features */}
              {product.features && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Características:</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600">
                        <Check className="w-4 h-4 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-green-700">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2 mb-6">
                {product.inStock ? (
                  <>
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-green-600 font-medium">En stock</span>
                  </>
                ) : (
                  <span className="text-red-500 font-medium">Agotado</span>
                )}
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-4 py-3 font-semibold min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Agregar al carrito
                </Button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">Envío a todo Paraguay</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">Garantía incluida</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Productos relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onClick={() => onProductSelect(p.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
