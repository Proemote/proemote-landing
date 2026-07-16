const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Update Subtitle
html = html.replace(
    '<p class="text-[11px] text-white/50 leading-relaxed min-h-[34px] pr-8">Todo lo de Puesta a Punto™ + tu propia web profesional y autogestionable.</p>',
    '<p class="text-[11px] text-white/50 leading-relaxed min-h-[34px] pr-8">De no existir en internet a una presencia profesional que genera confianza. Lista en 7 días — garantizado.</p>'
);

// 2. Update Bullets
html = html.replace(
    `<ul class="space-y-3 mb-5 text-[11px] text-white/70 font-light flex-grow">
                        <li class="flex items-start gap-2"><i class="ph ph-check text-white/50 mt-0.5"></i> <span>Diseño web profesional y adaptado a móviles</span></li>
                        <li class="flex items-start gap-2"><i class="ph ph-check text-white/50 mt-0.5"></i> <span>Optimización básica para salir en Google</span></li>
                        <li class="flex items-start gap-2"><i class="ph ph-check text-white/50 mt-0.5"></i> <span>Botón directo a tu WhatsApp</span></li>
                        <li class="flex items-start gap-2"><i class="ph ph-check text-white/50 mt-0.5"></i> <span>Textos legales obligatorios incluidos</span></li>
                    </ul>`,
    `<ul class="space-y-3 mb-5 text-[11px] text-white/70 font-light flex-grow">
                        <li class="flex items-start gap-2"><i class="ph ph-check text-white/50 mt-0.5"></i> <span>Web profesional que explica tu negocio en 5 segundos, desde cualquier móvil</span></li>
                        <li class="flex items-start gap-2"><i class="ph ph-check text-white/50 mt-0.5"></i> <span>Optimizada para que Google sepa que existes desde el día 1</span></li>
                        <li class="flex items-start gap-2"><i class="ph ph-check text-white/50 mt-0.5"></i> <span>Camino directo al contacto: WhatsApp, llamada o formulario, sin rodeos</span></li>
                        <li class="flex items-start gap-2"><i class="ph ph-check text-white/50 mt-0.5"></i> <span>Tuya y autogestionable: cambias textos y fotos sin depender de nadie</span></li>
                    </ul>`
);

// 3. Update Desglose
html = html.replace(
    `<details class="mb-4 text-[10px] text-white/50 cursor-pointer group flex-grow mt-auto">
                        <summary class="font-medium outline-none flex items-center gap-1 mb-2">
                            <span class="border-b border-dashed border-white/30 hover:border-white/60 transition-colors group-open:hidden">Ver desglose de valor</span>
                            <span class="border-b border-dashed border-white/30 hover:border-white/60 transition-colors hidden group-open:inline">Ocultar desglose</span>
                        </summary>
                        <div class="space-y-2 pl-2 border-l border-white/10 mt-2">
                            <div class="flex justify-between gap-2"><span>Web profesional</span><span class="text-white/80">699€</span></div>
                            <div class="flex justify-between gap-2"><span>Puesta a Punto™</span><span class="text-white/80">297€</span></div>
                            <div class="flex justify-between gap-2"><span>Kit Conversión™</span><span class="text-white/80">150€</span></div>
                            <div class="flex justify-between gap-2"><span>SEO On-Page</span><span class="text-white/80">149€</span></div>
                            <div class="flex justify-between gap-2"><span>Formación</span><span class="text-white/80">49€</span></div>
                            <div class="pt-2 mt-2 border-t border-white/5">
                                <div class="flex justify-between items-center text-white/30 line-through mb-0.5"><span>Total:</span><span>1.344€</span></div>
                                <div class="flex justify-between items-center font-bold text-marca text-[11px]"><span>Ahorras (48%):</span><span>645€</span></div>
                            </div>
                        </div>
                    </details>`,
    `<details class="mb-4 text-[10px] text-white/50 cursor-pointer group flex-grow mt-auto">
                        <summary class="font-medium outline-none flex items-center gap-1 mb-2">
                            <span class="border-b border-dashed border-white/30 hover:border-white/60 transition-colors group-open:hidden">Ver desglose de valor</span>
                            <span class="border-b border-dashed border-white/30 hover:border-white/60 transition-colors hidden group-open:inline">Ocultar desglose</span>
                        </summary>
                        <div class="space-y-2 pl-2 border-l border-white/10 mt-2">
                            <div class="flex justify-between gap-2"><span>Web profesional Starter</span><span class="text-white/80">699€</span></div>
                            <div class="flex justify-between gap-2"><span>Puesta a Punto Digital™</span><span class="text-white/80">97€</span></div>
                            <div class="flex justify-between gap-2"><span>Kit Conversión Local™</span><span class="text-white/80">150€</span></div>
                            <div class="flex justify-between gap-2"><span>SEO On-Page Basic</span><span class="text-white/80">149€</span></div>
                            <div class="flex justify-between gap-2"><span>Formación en vídeo</span><span class="text-white/80">49€</span></div>
                            <div class="pt-2 mt-2 border-t border-white/5">
                                <div class="flex justify-between items-center text-white/30 line-through mb-0.5"><span>Total por separado:</span><span>1.094€</span></div>
                                <div class="flex justify-between items-center font-bold text-marca text-[11px]"><span>Ahorras (36%):</span><span>395€</span></div>
                            </div>
                            <div class="pt-1 text-[9px] text-white/40 italic">Incluye textos legales obligatorios.</div>
                        </div>
                    </details>`
);

// 4. Add Guarantee
html = html.replace(
    `<div class="mt-auto relative z-10 w-full flex flex-col gap-3">
                        <a href="https://wa.me/34641576286?text=Hola%2C%20quiero%20el%20plan%20PRESENCIA" target="_blank" class="group block w-full py-2.5 px-4 bg-transparent hover:bg-white/5 border border-white/20 rounded-full text-center text-[13px] font-semibold transition-all duration-300 text-white">Empezar ahora`,
    `<div class="mt-auto relative z-10 w-full flex flex-col gap-3">
                        <div class="p-2.5 bg-white/5 rounded-lg border border-white/5 text-[9px] text-white/60 text-left">
                            <span class="font-bold text-white/90">Garantía:</span> tu web lista en 7 días o te descontamos 140€.
                        </div>
                        <a href="https://wa.me/34641576286?text=Hola%2C%20quiero%20el%20plan%20PRESENCIA" target="_blank" class="group block w-full py-2.5 px-4 bg-transparent hover:bg-white/5 border border-white/20 rounded-full text-center text-[13px] font-semibold transition-all duration-300 text-white">Empezar ahora`
);

fs.writeFileSync('index.html', html);
console.log('Pack 2 updated successfully');
