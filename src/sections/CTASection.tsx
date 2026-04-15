import { WhatsAppButton } from '@/components/WhatsAppButton';

export function CTASection() {
  return (
    <section className="bg-[#153f2a] py-14 text-white">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">¿Listo para transformar tu jardín?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-green-100">
          Contanos tu proyecto: metros cuadrados, tipo de instalación o necesidad de riego. Te enviamos
          un presupuesto personalizado por WhatsApp.
        </p>
        <div className="mt-6">
          <WhatsAppButton
            message="Hola, quiero pedir un presupuesto personalizado para césped/riego e instalación."
            label="Solicitar presupuesto por WhatsApp"
            className="bg-white text-green-900 hover:bg-green-50"
          />
        </div>
      </div>
    </section>
  );
}
