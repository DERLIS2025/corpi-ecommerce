import { ArrowLeft, Trash2, Minus, Plus, ShoppingBag, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/store/CartContext';
import { formatPrice } from '@/data/products';
import type { View } from '@/types';

interface CartViewProps {
  onViewChange: (view: View) => void;
}

export function CartView({ onViewChange }: CartViewProps) {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    const message = encodeURIComponent(
      `Hola Corpi & Cia, quiero realizar el siguiente pedido:\n\n${items
        .map(
          (item) =>
            `- ${item.name} x${item.quantity} = ${formatPrice(
              item.price * item.quantity
            )}`
        )
        .join('\n')}\n\nTotal: ${formatPrice(totalPrice)}`
    );
    window.open(`https://wa.me/595992588770?text=${message}`, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-8">
            Explora nuestro catálogo y encuentra los mejores productos para tu jardín
          </p>
          <Button
            onClick={() => onViewChange('catalog')}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Ver productos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => onViewChange('catalog')}
            className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Seguir comprando
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Carrito de compras ({totalItems} items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Image */}
                  <div className="w-full sm:w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2 line-clamp-1">
                      {item.description}
                    </p>
                    <p className="text-green-700 font-semibold">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-4">
                    {/* Quantity */}
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 py-2 font-semibold min-w-[40px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm text-gray-600">Subtotal:</span>
                  <span className="font-semibold text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}

            {/* Clear Cart */}
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Vaciar carrito
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Resumen del pedido
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span>A calcular</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-green-700">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg mb-4"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Pedir por WhatsApp
              </Button>

              <p className="text-sm text-gray-500 text-center">
                Al hacer clic, serás redirigido a WhatsApp para completar tu pedido
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
