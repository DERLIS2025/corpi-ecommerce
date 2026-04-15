import { Headphones, MapPinned, ShieldCheck, Wrench } from 'lucide-react';

const benefitItems = [
  {
    icon: MapPinned,
    title: 'Cobertura nacional',
    description: 'Atendemos proyectos residenciales y comerciales en todo Paraguay.',
  },
  {
    icon: Headphones,
    title: 'Asesoramiento personalizado',
    description: 'Te guiamos según tipo de suelo, exposición solar y objetivo del espacio.',
  },
  {
    icon: Wrench,
    title: 'Instalación profesional',
    description: 'Equipo técnico para instalación integral de césped y sistemas de riego.',
  },
  {
    icon: ShieldCheck,
    title: 'Respaldo y confianza',
    description: 'Productos seleccionados, atención directa y seguimiento postventa.',
  },
];

export function Benefits() {
  return (
    <section id="servicios" className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Beneficios de trabajar con Corpicia</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefitItems.map((item) => (
            <article key={item.title} className="rounded-2xl border border-border bg-[#f9fcf9] p-5">
              <item.icon className="mb-4 h-8 w-8 text-green-700" />
              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
