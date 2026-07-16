const fs = require('fs');

let html = fs.readFileSync('/tmp/index_updated.html', 'utf8');

const schemaHtml = `    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Qué diferencia a una agencia de marketing digital en Extremadura de una de fuera?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Conocemos el mercado extremeño desde dentro: los patrones de búsqueda locales, los sectores de la región y las ayudas de la Junta de Extremadura para digitalización de pymes. Una agencia de Madrid aplica la misma plantilla para todos sus clientes. Nosotros no."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cómo sé qué necesita realmente mi negocio antes de contratar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Depende de dónde estás perdiendo clientes: visibilidad (nadie te encuentra en Google), conversión (te encuentran pero no contactan) o retención (contactan pero no repiten). Lo identificamos gratis en 30 minutos antes de recomendarte nada."
          }
        },
        {
          "@type": "Question",
          "name": "¿Se puede crecer online sin invertir en publicidad de pago?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sí, pero requiere más tiempo. El SEO local y Google Business Profile son los canales con mejor retorno a medio plazo sin coste por clic. La publicidad de pago amplifica lo que ya funciona, no sustituye la base."
          }
        },
        {
          "@type": "Question",
          "name": "¿Necesito una página web si ya tengo Instagram o Facebook?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Instagram es terreno alquilado: pueden cambiar el algoritmo o suspenderte la cuenta mañana. Una web propia es el único activo digital que controlas completamente, y el único canal que te permite aparecer en Google cuando alguien busca lo que ofreces en tu ciudad."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cuánto tiempo tarda el marketing digital en dar resultados reales?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Google Ads: resultados en días. SEO local: entre 3 y 6 meses para resultados sólidos. Google Maps bien optimizado: mejoras visibles en 4-8 semanas. Para una pyme que empieza desde cero, lo habitual es impacto medible entre el mes 2 y el mes 4."
          }
        },
        {
          "@type": "Question",
          "name": "¿Qué es el Método FOCO™ y cómo se aplica a mi negocio?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Es nuestro sistema de trabajo propio: Fundamentos (base digital sólida), Oportunidad (canales con mayor potencial para tu negocio concreto), Conversión (que las visitas se conviertan en clientes) y Optimización (mejorar continuamente con datos reales, no suposiciones)."
          }
        },
        {
          "@type": "Question",
          "name": "¿Trabajáis con negocios de toda Extremadura o solo en Mérida?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nuestra sede está en Mérida pero trabajamos con pymes y autónomos de toda Extremadura: Badajoz, Cáceres, Don Benito, Plasencia, Almendralejo y el resto de la región, en formato presencial o remoto según el proyecto."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cómo es el proceso para empezar a trabajar con Proemote?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Tres pasos: análisis gratuito de 30 minutos para entender tu negocio, propuesta personalizada en 48 horas y arranque con un responsable directo desde el primer día. Sin permanencia forzada, sin intermediarios, sin letra pequeña."
          }
        }
      ]
    }
    </script>
`;

html = html.replace('</body>', schemaHtml + '</body>');
fs.writeFileSync('index.html', html);
console.log('Successfully added schema and saved to index.html');
