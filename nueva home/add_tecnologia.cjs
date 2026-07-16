const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const insertPoint = '    <section class="py-24 border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#020104] transition-colors duration-300 relative">\n        <div class="max-w-6xl mx-auto px-6 fade-up">';

const newBlock = `    <section class="py-24 border-t border-gray-200 dark:border-white/5 bg-white dark:bg-[#05020a] transition-colors duration-300 relative">
        <div class="max-w-6xl mx-auto px-6 fade-up">
            <div class="text-center mb-16 max-w-3xl mx-auto">
                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 dark:bg-marca/10 border border-violet-200 dark:border-marca/20 text-[10px] font-bold tracking-widest uppercase text-violet-700 dark:text-marca mb-4 shadow-sm">
                    TECNOLOGÍA PROPIA
                </div>
                <h2 class="text-3xl md:text-4xl font-light tracking-tight text-gray-900 dark:text-white mb-6">
                    No solo usamos tecnología. La construimos.
                </h2>
                <p class="text-lg text-gray-600 dark:text-white/60 font-light leading-relaxed">
                    La mayoría de agencias te alquilan herramientas de terceros: las mismas para un dentista de Bilbao que para ti. Nosotros desarrollamos las nuestras, pensadas para negocios locales — y son las mismas que instalamos en los negocios que gestionamos.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- LeadFlow -->
                <div class="bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-[32px] p-8 md:p-10 relative overflow-hidden flex flex-col items-start hover:-translate-y-1 hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_15px_40px_-15px_rgba(139,92,246,0.1)] transition-all duration-300">
                    <span class="inline-block px-3 py-1 bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-[10px] font-bold tracking-widest uppercase rounded-full mb-6">Disponible</span>
                    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-2">LeadFlow™</h3>
                    <p class="text-violet-600 dark:text-marca font-medium mb-6">Tu comercial en WhatsApp, 24 horas</p>
                    <p class="text-gray-600 dark:text-white/60 font-light leading-relaxed mb-8">
                        Responde al instante, cualifica cada contacto y agenda citas por ti mientras trabajas. Es la pieza de Conversión del Método FOCO™.
                    </p>
                    <a href="/leadflow/" class="mt-auto group inline-flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white hover:text-marca dark:hover:text-marca transition-colors">
                        Descubrir LeadFlow <i class="ph ph-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </a>
                </div>

                <!-- AffinIA -->
                <div class="bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-[32px] p-8 md:p-10 relative overflow-hidden flex flex-col items-start hover:-translate-y-1 hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_15px_40px_-15px_rgba(139,92,246,0.1)] transition-all duration-300">
                    <span class="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[10px] font-bold tracking-widest uppercase rounded-full mb-6">Acceso anticipado</span>
                    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-2">AffinIA™</h3>
                    <p class="text-violet-600 dark:text-marca font-medium mb-6">Que tus clientes vuelvan, sin perseguirlos</p>
                    <p class="text-gray-600 dark:text-white/60 font-light leading-relaxed mb-8">
                        Detecta qué cliente está a punto de no volver y lo recupera antes de perderlo. Es la pieza de Optimización del Método FOCO™. Lo estamos construyendo con negocios locales reales — y quedan plazas.
                    </p>
                    <a href="/affinia/" class="mt-auto group inline-flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white hover:text-marca dark:hover:text-marca transition-colors">
                        Quiero acceso anticipado <i class="ph ph-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>
`;

if (html.includes(insertPoint)) {
    const updatedHtml = html.replace(insertPoint, newBlock + '\\n' + insertPoint);
    fs.writeFileSync('index.html', updatedHtml);
    console.log('Added Tecnologia Propia block');
} else {
    console.log('Insert point not found!');
}
