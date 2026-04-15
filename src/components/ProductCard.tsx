import { Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { formatPrice } from '@/data/products';
import { createProductInquiryMessage } from '@/utils/whatsapp';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

const inferBadge = (name: string): string | null => {
  if (name.toLowerCase().includes('césped') || name.toLowerCase().includes('m²')) {
    return 'Por m²';
  }

  return null;
};

export function ProductCard({ product, onClick }: ProductCardProps) {
  const supportBadge = inferBadge(product.name);

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <button onClick={onClick} className="block w-full text-left">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {product.badge && <Badge className="absolute left-3 top-3 bg-green-700 text-white">{product.badge}</Badge>}
          {supportBadge && (
            <Badge className="absolute bottom-3 left-3 bg-white/95 text-green-800 hover:bg-white">{supportBadge}</Badge>
          )}
        </div>

        <div className="space-y-3 p-4">
          <h3 className="line-clamp-2 min-h-[3rem] text-base font-semibold text-gray-900 group-hover:text-green-800">
            {product.name}
          </h3>
          <p className="line-clamp-2 text-sm text-gray-600">{product.description}</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-green-800">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </button>

      <div className="grid grid-cols-2 gap-2 p-4 pt-0">
        <Button variant="outline" onClick={onClick}>
          <Eye className="mr-2 h-4 w-4" />
          Ver detalle
        </Button>
        <WhatsAppButton message={createProductInquiryMessage(product.name)} />
      </div>
    </article>
  );
}
