import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createWhatsAppUrl } from '@/utils/whatsapp';

interface WhatsAppButtonProps {
  message: string;
  label?: string;
  className?: string;
}

export function WhatsAppButton({
  message,
  label = 'Consultar por WhatsApp',
  className,
}: WhatsAppButtonProps) {
  return (
    <Button
      asChild
      className={className ?? 'bg-green-700 text-white hover:bg-green-800'}
    >
      <a
        href={createWhatsAppUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle className="mr-2 h-4 w-4" />
        {label}
      </a>
    </Button>
  );
}
