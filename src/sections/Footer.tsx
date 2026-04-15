import { Instagram, MapPin, MessageCircle, Phone } from 'lucide-react';
import { createWhatsAppUrl } from '@/utils/whatsapp';
import type { View } from '@/types';

interface FooterProps {
  onViewChange: (view: View) => void;
}

export function Footer({ onViewChange }: FooterProps) {
  return (
    <footer id="contacto" className="border-t border-border bg-[#f7faf7]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="text-2xl font-black text-green-800">Corpicia</p>
          <p className="mt-2 text-sm text-gray-600">
            Catálogo profesional de jardinería y paisajismo orientado a presupuestos personalizados.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">Navegación</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li><button onClick={() => onViewChange('home')}>Inicio</button></li>
            <li><button onClick={() => onViewChange('catalog')}>Catálogo</button></li>
            <li><a href={createWhatsAppUrl('Hola, quiero solicitar asesoramiento comercial.')}>Asesor comercial</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">Servicios</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li>Venta e instalación de césped</li>
            <li>Riego automático</li>
            <li>Decoración exterior</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">Contacto</h3>
          <ul className="mt-3 space-y-3 text-sm text-gray-600">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-green-700" /> +595 992 588 770</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-green-700" /> Asunción, Paraguay</li>
            <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-green-700" />
              <a href={createWhatsAppUrl('Hola, quiero solicitar un presupuesto.')}>WhatsApp directo</a>
            </li>
            <li className="flex items-center gap-2"><Instagram className="h-4 w-4 text-green-700" /> @corpi_y_ciaa</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
