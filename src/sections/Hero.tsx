import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import type { View } from '@/types';

interface HeroProps {
  onViewChange: (view: View) => void;
}

export function Hero({ onViewChange }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/hero-jardin.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f3f27]/85 via-[#1f5a3f]/65 to-[#1f5a3f]/25" />

      <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-white">
          <p className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-green-100">
            Catálogo profesional para exteriores
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Jardinería premium con asesoramiento e instalación
          </h1>
          <p className="mt-5 text-base text-green-50 sm:text-lg">
            Explorá césped, riego, plantas y decoración exterior con un flujo simple: descubrís,
            consultás y cerrás tu presupuesto por WhatsApp.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => onViewChange('catalog')}
              className="bg-white px-6 text-green-900 hover:bg-green-50"
            >
              Explorar catálogo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <WhatsAppButton
              message="Hola, quiero pedir un presupuesto personalizado para mi jardín."
              label="Hablar con asesor"
              className="bg-green-600 text-white hover:bg-green-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
