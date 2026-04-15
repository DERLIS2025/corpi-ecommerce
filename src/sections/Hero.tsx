import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { View } from '@/types';

interface HeroProps {
  onViewChange: (view: View) => void;
}

export function Hero({ onViewChange }: HeroProps) {
  const benefits = [
    'Césped premium de primera calidad',
    'Instalación profesional disponible',
    'Envío a todo Paraguay',
  ];

  return (
    <section className="relative w-full min-h-[600px] flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/hero-jardin.jpg)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Soluciones para tu jardín en todo Paraguay
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Todo lo que tu{' '}
            <span className="text-green-300">jardín</span> necesita, en un solo lugar
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-green-50 mb-8 leading-relaxed">
            Césped natural, riego automático y productos para transformar tu espacio exterior 
            con una solución más práctica y profesional.
          </p>

          {/* Benefits */}
          <div className="space-y-3 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 text-white">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="mb-8">
            <span className="text-green-200 text-sm">Precios desde</span>
            <div className="text-3xl font-bold text-white">Gs. 15.000</div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => onViewChange('catalog')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-xl font-semibold group"
            >
              Ver productos
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl font-semibold"
            >
              Ver servicios
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
