import { ArrowLeft, CheckCircle2, ShieldCheck, Truck, Wrench } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { formatPrice, getProductById, products } from '@/data/products';
import { createProductInquiryMessage } from '@/utils/whatsapp';

interface ProductViewProps {
  productId: string;
  onBack: () => void;
  onProductSelect: (productId: string) => void;
}

const trustPoints = [
  { icon: Truck, text: 'Cobertura nacional para entrega e instalación' },
  { icon: Wrench, text: 'Instalación profesional disponible' },
  { icon: ShieldCheck, text: 'Asesoramiento antes y después de la compra' },
];

export function ProductView({ productId, onBack, onProductSelect }: ProductViewProps) {
  const product = getProductById(productId);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f7f5]">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-900">Producto no encontrado</p>
          <Button onClick={onBack} className="mt-4">Volver</Button>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#f5f7f5]">
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <button onClick={onBack} className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-green-700">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al catálogo
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-3xl border border-border bg-white p-6 shadow-sm lg:grid-cols-2 lg:p-10">
          <div className="overflow-hidden rounded-2xl bg-gray-50">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>

          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {product.badge && <Badge className="bg-green-700 text-white">{product.badge}</Badge>}
              <Badge variant="secondary">Pedí presupuesto personalizado</Badge>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="mt-3 text-gray-600">{product.description}</p>
            <p className="mt-6 text-4xl font-bold text-green-800">{formatPrice(product.price)}</p>

            <div className="mt-6 space-y-3 rounded-2xl border border-green-100 bg-green-50/70 p-4">
              <p className="text-sm font-semibold text-green-900">Pedí tu presupuesto personalizado</p>
              <p className="text-sm text-green-900/80">
                También podés indicar cantidad en m², instalación y materiales para recibir una propuesta completa.
              </p>
              <WhatsAppButton
                message={createProductInquiryMessage(product.name)}
                label="Consultar por WhatsApp"
                className="w-full bg-green-700 text-white hover:bg-green-800"
              />
            </div>

            {product.features && (
              <ul className="mt-6 space-y-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-green-700" />
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-8 grid gap-4 rounded-2xl border border-border bg-white p-6 sm:grid-cols-3">
          {trustPoints.map((point) => (
            <div key={point.text} className="flex items-center gap-3">
              <point.icon className="h-5 w-5 text-green-700" />
              <p className="text-sm text-gray-700">{point.text}</p>
            </div>
          ))}
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">También te puede interesar</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onClick={() => onProductSelect(relatedProduct.id)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
