import React, { useState } from 'react';

const faqs = [
  { q: '¿Qué servicios de marketing digital necesita una pyme?', a: 'No existe una fórmula única. Depende de tu sector, tu competencia y tus objetivos. Generalmente, una pyme necesita una base sólida (identidad y web optimizada), visibilidad local (SEO) y una estrategia de captación (contenido o publicidad) que atraiga clientes de forma recurrente.' },
  { q: '¿Cómo saber si mi negocio necesita una nueva página web?', a: 'Si tu web actual no carga rápido, no se ve bien en móviles, no genera contactos o no transmite la calidad real de tu servicio, estás perdiendo clientes. Una web no debe ser solo un folleto digital, debe ser tu mejor herramienta de ventas trabajando 24/7.' },
  { q: '¿Qué diferencia hay entre SEO y publicidad online?', a: 'El SEO (posicionamiento orgánico) es una inversión a medio-largo plazo para aparecer en Google sin pagar por cada clic, construyendo autoridad. La publicidad online (Google Ads, Meta Ads) requiere pagar por aparecer inmediatamente. Lo ideal es combinar ambas para obtener resultados hoy mientras construyes rentabilidad para el futuro.' },
  { q: '¿Cuánto tarda en dar resultados una estrategia de posicionamiento web?', a: 'El SEO no es magia, requiere tiempo. Normalmente, se empiezan a ver mejoras significativas a partir del tercer al sexto mes, dependiendo de la competencia de tu sector. Sin embargo, los resultados son duraderos y muy rentables una vez alcanzados.' },
  { q: '¿Trabajáis con empresas de Extremadura y del resto de España?', a: 'Sí. Aunque nuestra agencia nació en Mérida (Extremadura) y ayudamos a muchos negocios locales a digitalizarse, diseñamos estrategias y trabajamos de forma remota con empresas de toda España que buscan crecer con estructura.' },
  { q: '¿Qué incluye el diagnóstico estratégico gratuito?', a: 'Incluye un análisis inicial de tu presencia digital (web, redes, posicionamiento) frente a tus objetivos. Identificamos qué está fallando y te proponemos una hoja de ruta priorizando las acciones que te darán mayor retorno, sin ningún compromiso.' },
  { q: '¿Qué diferencia a Proemote de otras agencias de marketing?', a: 'No vendemos "packs de redes" ni acciones sueltas sin sentido. Aplicamos nuestro Método FOCO™ para crear sistemas integrales. Si necesitas diseño, SEO o redes, nos aseguramos de que todo trabaje de forma unida bajo una misma estrategia de crecimiento.' },
  { q: '¿Puedo contratar un solo servicio o necesito una estrategia completa?', a: 'Puedes contratar el servicio específico que necesites (ej. rediseño web o branding). Sin embargo, siempre lo desarrollaremos entendiendo el contexto global de tu negocio, asegurándonos de que esa pieza sume a tu estrategia general, aunque decidas implementar el resto más adelante.' }
];

const FaqItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="glass-card rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden">
      <button 
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-gray-900 dark:text-white pr-4">{question}</span>
        <i className={`ph ph-caret-down text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      <div className={`faq-content px-6 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0 pb-0'}`}>
        <p className="text-gray-600 dark:text-textSecondary text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function FaqSections() {
  return (
    <>
      {/* CTA ANTES FAQ */}
      <section className="py-24 relative z-10 border-t border-gray-200 dark:border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50 to-white dark:from-[#0f0a1a] dark:to-[#05020a] z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-primary/20 blur-[100px] pointer-events-none z-[0]"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 reveal-up text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-light mb-10 text-gray-900 dark:text-white leading-tight">
            Tal vez no necesites más marketing.<br />
            <span className="font-medium text-gradient-primary">Necesitas saber qué frena tu negocio.</span>
          </h2>
          
          <div className="bg-white/80 dark:bg-[#1f1a2e]/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-gray-200 dark:border-white/10 shadow-2xl mb-10 max-w-4xl mx-auto relative overflow-hidden">
            <p className="text-xl text-gray-800 dark:text-white font-light mb-10 text-center">Por eso empezamos con un diagnóstico estratégico gratuito:</p>
            
            <div className="relative mb-12">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent -translate-y-1/2 hidden md:block"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                <div className="group flex flex-col items-center gap-6 bg-white/50 dark:bg-[#2a243a]/80 p-8 rounded-[1.5rem] border border-gray-100 dark:border-white/5 backdrop-blur-sm shadow-sm transition-all hover:-translate-y-2 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-inner relative bg-purple-100 dark:bg-purple-900/30 transition-transform duration-500 group-hover:scale-110 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50">
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <i className="ph-fill ph-magnifying-glass text-4xl text-primary relative z-10 transition-transform duration-500 group-hover:rotate-12"></i>
                  </div>
                  <p className="text-sm md:text-base text-gray-800 dark:text-white text-center font-medium leading-tight">Analizamos tu<br/>situación actual.</p>
                </div>
                
                <div className="group flex flex-col items-center gap-6 bg-white/50 dark:bg-[#2a243a]/80 p-8 rounded-[1.5rem] border border-gray-100 dark:border-white/5 backdrop-blur-sm shadow-sm transition-all hover:-translate-y-2 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-inner relative bg-purple-100 dark:bg-purple-900/30 transition-transform duration-500 group-hover:scale-110 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50">
                    <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <i className="ph-fill ph-lightbulb text-4xl text-primary relative z-10 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110"></i>
                  </div>
                  <p className="text-sm md:text-base text-gray-800 dark:text-white text-center font-medium leading-tight">Detectamos<br/>oportunidades reales.</p>
                </div>
                
                <div className="group flex flex-col items-center gap-6 bg-white/50 dark:bg-[#2a243a]/80 p-8 rounded-[1.5rem] border border-gray-100 dark:border-white/5 backdrop-blur-sm shadow-sm transition-all hover:-translate-y-2 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-inner relative bg-purple-100 dark:bg-purple-900/30 transition-transform duration-500 group-hover:scale-110 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50">
                    <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <i className="ph-fill ph-map-trifold text-4xl text-primary relative z-10 transition-transform duration-500 group-hover:-rotate-12"></i>
                  </div>
                  <p className="text-sm md:text-base text-gray-800 dark:text-white text-center font-medium leading-tight">Te entregamos<br/>un plan de acción.</p>
                </div>
              </div>
            </div>
            
            <a href="/analisis-personalizado-gratis" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-primary text-gray-900 dark:text-white font-medium rounded-full hover:bg-accent transition-all duration-300 shadow-[0_0_30px_rgba(123,97,255,0.4)] hover:shadow-[0_0_40px_rgba(123,97,255,0.6)] group w-full md:w-auto relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">👉 Solicitar diagnóstico sin compromiso</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full"></div>
            </a>
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="py-24 relative z-10 bg-gray-50 dark:bg-bgSurface/20">
        <div className="max-w-3xl mx-auto px-6 reveal-up">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-light mb-6 text-gray-900 dark:text-white">Preguntas frecuentes</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FaqItem key={index} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
