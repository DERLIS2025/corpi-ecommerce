import { MessageCircle } from 'lucide-react';
import { createWhatsAppUrl } from '@/utils/whatsapp';

export function WhatsAppFloatingButton() {
  return (
    <a
      href={createWhatsAppUrl('Hola, quiero solicitar un presupuesto para mi jardín. ¿Me pueden ayudar?')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-green-900/20 transition hover:bg-green-700"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
