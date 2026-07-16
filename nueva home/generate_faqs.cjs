const fs = require('fs');

const faqs = [
  {
    q: "¿Qué diferencia a una agencia de marketing digital en Extremadura de una de fuera?",
    a: 'Conocemos el mercado extremeño desde dentro: los patrones de búsqueda locales, los sectores de la región y las ayudas de la Junta de Extremadura para digitalización de pymes. Una agencia de Madrid aplica la misma plantilla para todos sus clientes. Nosotros no. <br><br>→ <a href="/sobre-nosotros/" class="text-violet-600 dark:text-marca hover:underline">Conoce cómo trabajamos</a>'
  },
  {
    q: "¿Cómo sé qué necesita realmente mi negocio antes de contratar?",
    a: 'Depende de dónde estás perdiendo clientes: visibilidad (nadie te encuentra en Google), conversión (te encuentran pero no contactan) o retención (contactan pero no repiten). Lo identificamos gratis en 30 minutos antes de recomendarte nada. <br><br>→ <a href="/analisis-personalizado-gratis/" class="text-violet-600 dark:text-marca hover:underline">Solicita tu análisis gratuito</a>'
  },
  {
    q: "¿Se puede crecer online sin invertir en publicidad de pago?",
    a: 'Sí, pero requiere más tiempo. El SEO local y Google Business Profile son los canales con mejor retorno a medio plazo sin coste por clic. La publicidad de pago amplifica lo que ya funciona, no sustituye la base. <br><br>→ <a href="/web-seo/" class="text-violet-600 dark:text-marca hover:underline">Descubre el SEO local</a>'
  },
  {
    q: "¿Necesito una página web si ya tengo Instagram o Facebook?",
    a: 'Instagram es terreno alquilado: pueden cambiar el algoritmo o suspenderte la cuenta mañana. Una web propia es el único activo digital que controlas completamente, y el único canal que te permite aparecer en Google cuando alguien busca lo que ofreces en tu ciudad. <br><br>→ <a href="/web-seo/" class="text-violet-600 dark:text-marca hover:underline">Cómo aparecer en Google</a>'
  },
  {
    q: "¿Cuánto tiempo tarda el marketing digital en dar resultados reales?",
    a: 'Google Ads: resultados en días. SEO local: entre 3 y 6 meses para resultados sólidos. Google Maps bien optimizado: mejoras visibles en 4-8 semanas. Para una pyme que empieza desde cero, lo habitual es impacto medible entre el mes 2 y el mes 4. <br><br>→ <a href="/lo-quiero-limpio-caso-de-exito/" class="text-violet-600 dark:text-marca hover:underline">Ver casos reales</a>'
  },
  {
    q: "¿Qué es el Método FOCO™ y cómo se aplica a mi negocio?",
    a: 'Es nuestro sistema de trabajo propio: Fundamentos (base digital sólida), Oportunidad (canales con mayor potencial para tu negocio concreto), Conversión (que las visitas se conviertan en clientes) y Optimización (mejorar continuamente con datos reales, no suposiciones). <br><br>→ <a href="/servicios/" class="text-violet-600 dark:text-marca hover:underline">Ver todos los servicios</a>'
  },
  {
    q: "¿Trabajáis con negocios de toda Extremadura o solo en Mérida?",
    a: 'Nuestra sede está en Mérida pero trabajamos con pymes y autónomos de toda Extremadura: Badajoz, Cáceres, Don Benito, Plasencia, Almendralejo y el resto de la región, en formato presencial o remoto según el proyecto. <br><br>→ <a href="/contacto/" class="text-violet-600 dark:text-marca hover:underline">Contáctanos</a>'
  },
  {
    q: "¿Cómo es el proceso para empezar a trabajar con Proemote?",
    a: 'Tres pasos: análisis gratuito de 30 minutos para entender tu negocio, propuesta personalizada en 48 horas y arranque con un responsable directo desde el primer día. Sin permanencia forzada, sin intermediarios, sin letra pequeña. <br><br>→ <a href="/analisis-personalizado-gratis/" class="text-violet-600 dark:text-marca hover:underline">Solicita tu análisis gratuito</a>'
  }
];

let html = `            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-start stagger">
`;

faqs.forEach((faq, index) => {
  html += `                <!-- FAQ ${index + 1} -->
                <div class="glass-card rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden faq-item">
                    <button class="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none faq-toggle">
                        <span class="font-semibold text-gray-900 dark:text-white pr-4 text-base md:text-[17px]">${faq.q}</span>
                        <i class="ph ph-caret-down text-violet-600 dark:text-marca transition-transform duration-300 faq-icon text-lg flex-shrink-0"></i>
                    </button>
                    <div class="faq-content px-6 pb-0 max-h-0 overflow-hidden transition-all duration-300 ease-in-out opacity-0">
                        <p class="text-gray-600 dark:text-white/60 text-sm pb-5 leading-relaxed font-light">${faq.a}</p>
                    </div>
                </div>
`;
});

html += `            </div>
            <div class="max-w-3xl mx-auto mt-12 text-center fade-up">
                <p class="text-sm text-gray-600 dark:text-white/60 font-light">¿Tienes más preguntas? Consulta nuestra <a href="/preguntas-frecuentes/" class="text-violet-600 dark:text-marca hover:underline">guía completa de preguntas frecuentes</a> o <a href="/contacto/" class="text-violet-600 dark:text-marca hover:underline">contáctanos directamente</a>.</p>
            </div>
`;

fs.writeFileSync('/tmp/new_faqs.html', html);
console.log('Done generating /tmp/new_faqs.html');
