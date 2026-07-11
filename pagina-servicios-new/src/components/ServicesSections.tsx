import { ServiceCarousel, type Service } from './ui/services-card';
import { ProcessSection } from './ui/how-we-do-it-process-overview';
import { Palette, Search, Code, Megaphone, Bot, PartyPopper, Ear, Stethoscope, Ruler, Workflow, TrendingUp } from 'lucide-react';

const processItems = [
  {
    icon: Ear,
    title: '1. Escuchamos',
    description: 'Analizamos tu negocio, objetivos y situación actual.',
  },
  {
    icon: Stethoscope,
    title: '2. Diagnosticamos',
    description: 'Detectamos oportunidades reales de mejora y priorizamos aquello que tendrá mayor impacto. Este análisis inicial es gratuito.',
  },
  {
    icon: Ruler,
    title: '3. Diseñamos el sistema',
    description: 'Construimos una estrategia adaptada a tu negocio, no una plantilla genérica.',
  },
  {
    icon: Workflow,
    title: '4. Implementamos',
    description: 'Ejecutamos cada acción con una visión global para que todas las piezas trabajen juntas.',
  },
  {
    icon: TrendingUp,
    title: '5. Mejoramos',
    description: 'Medimos resultados y optimizamos continuamente para seguir creciendo.',
  },
];

const services: Service[] = [
  {
    number: "001",
    title: "Branding & Estrategia",
    description: "Identidad visual y posicionamiento.",
    icon: Palette,
    gradient: "from-purple-100/80 to-purple-50 dark:from-purple-950/80 dark:to-[#05020a]",
  },
  {
    number: "002",
    title: "Diseño web y SEO",
    description: "Webs de alto rendimiento y SEO.",
    icon: Search,
    gradient: "from-purple-50 to-gray-100 dark:from-[#05020a] dark:to-purple-900/40",
  },
  {
    number: "003",
    title: "Contenido & Redes",
    description: "Social Media y estrategia de vídeo.",
    icon: Code,
    gradient: "from-purple-100/50 to-purple-100 dark:from-purple-900/30 dark:to-[#05020a]",
  },
  {
    number: "004",
    title: "Marketing Digital",
    description: "Campañas publicitarias para escalar tu negocio.",
    icon: Megaphone,
    gradient: "from-gray-100 to-purple-50 dark:from-[#05020a] dark:to-purple-800/30",
  },
  {
    number: "005",
    title: "Automatización y Sistemas",
    description: "Funnels, CRM y flujos que trabajan sin ti.",
    icon: Bot,
    gradient: "from-purple-200/50 to-purple-100 dark:from-purple-950 dark:to-[#05020a]",
  },
  {
    number: "006",
    title: "Eventos & Experiencias",
    description: "Producción, branding y promoción digital de eventos.",
    icon: PartyPopper,
    gradient: "from-purple-50 to-purple-200/50 dark:from-[#05020a] dark:to-purple-900/40",
  }
];

export default function ServicesSections() {
  return (
    <>
      {/* 4. CORE SERVICES SECTION */}
      <section id="servicios" className="py-24 relative z-10 bg-gray-50 dark:bg-bgSurface/20 border-t border-gray-200 dark:border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 reveal-up">
            <h2 className="font-heading text-4xl md:text-5xl font-light mb-6 text-gray-900 dark:text-white">Servicios</h2>
            <p className="text-lg text-gray-600 dark:text-textSecondary max-w-2xl mx-auto leading-relaxed">No contratamos disciplinas sueltas, diseñamos soluciones para tus objetivos.</p>
          </div>

          <ServiceCarousel services={services} />
        </div>
      </section>

      {/* CÓMO TRABAJAMOS SECTION */}
      <section id="como-trabajamos" className="py-24 relative z-10 bg-white dark:bg-[#0A0A0F] border-t border-gray-200 dark:border-white/5 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-6 reveal-up">
          <ProcessSection
            subtitle="Nuestro Método"
            title="Cómo trabajamos"
            description="Hemos diseñado un proceso estructurado para eliminar la improvisación y asegurar que cada acción tenga un impacto real en tu negocio."
            items={processItems}
          />
        </div>
      </section>

      {/* 5. VALUE PROPOSITION STRIP */}
      <section className="py-16 border-y border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-bgSurface/30 relative z-10">
        <div className="max-w-7xl mx-auto px-6 reveal-up">
          <div className="text-center mb-12">
            <h3 className="font-heading text-2xl md:text-3xl font-light text-gray-900 dark:text-white">Por qué confiar en Proemote</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-white/10">
            <div className="pt-8 md:pt-0 md:px-8 first:pt-0">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4"><i className="ph-fill ph-target text-xl"></i></div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Menos improvisación</h4>
              <p className="text-sm text-gray-600 dark:text-textSecondary">Cada acción responde a una estrategia clara.</p>
            </div>
            <div className="pt-8 md:pt-0 md:px-8">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4"><i className="ph-fill ph-hourglass text-xl"></i></div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Más tiempo para tu negocio</h4>
              <p className="text-sm text-gray-600 dark:text-textSecondary">Nos ocupamos de la parte digital mientras tú te centras en hacer crecer la empresa.</p>
            </div>
            <div className="pt-8 md:pt-0 md:px-8">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4"><i className="ph-fill ph-chart-line-up text-xl"></i></div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Decisiones basadas en datos</h4>
              <p className="text-sm text-gray-600 dark:text-textSecondary">No trabajamos por intuición. Analizamos resultados para mejorar continuamente.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
