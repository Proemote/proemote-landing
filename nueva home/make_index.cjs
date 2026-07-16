const fs = require('fs');
let html = fs.readFileSync('downloaded2.html', 'utf8');

// Pack 3
html = html.replace('lg:grid-cols-3 gap-6 items-stretch stagger', 'lg:grid-cols-4 gap-6 items-stretch stagger');

html = html.replace(
    '<span>Redes Starter (1 red)</span><span class="text-gray-900 dark:text-white/80 font-medium">199€/m</span>',
    '<span>Redes Sociales · Plan Presencia (hasta 2 redes)</span><span class="text-gray-900 dark:text-white/80 font-medium">199€/m</span>'
);

html = html.replace(
    '<a href="https://wa.me/34641576286?text=Hola%2C%20quiero%20el%20Sistema%20Captaci%C3%B3n" target="_blank" class="group block w-full py-3.5 px-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border border-transparent rounded-full text-center text-[14px] font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_0_25px_rgba(123,97,255,0.4)]">Empezar Captación <i class="ph ph-arrow-right ml-1 inline-block group-hover:translate-x-1 transition-transform"></i></a>',
    '<a href="https://cal.com/proemote" target="_blank" class="group block w-full py-3.5 px-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border border-transparent rounded-full text-center text-[14px] font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_0_25px_rgba(123,97,255,0.4)]">Reservar llamada de 20 min <i class="ph ph-arrow-right ml-1 inline-block group-hover:translate-x-1 transition-transform"></i></a>'
);

// Pack 4
let p4Start = html.indexOf('<!-- PACK 4: SISTEMA ESCALA -->');
// Using a smaller window to isolate just Pack 4 to not ruin the rest of the file
let p4End = html.indexOf('</div>\n            </div>', p4Start); 
let p4 = html.substring(p4Start, p4End);

p4 = p4.replace(
    `<div class="space-y-2">
                                    <div class="flex justify-between gap-2"><span>Web Elite</span><span class="text-gray-900 dark:text-white/80 font-medium">1.199€</span></div>
                                    <div class="flex justify-between gap-2"><span>LeadFlow Completo</span><span class="text-gray-900 dark:text-white/80 font-medium">990€</span></div>
                                    <div class="flex justify-between gap-2"><span>SEO On-Page Advanced</span><span class="text-gray-900 dark:text-white/80 font-medium">399€</span></div>
                                    <div class="flex justify-between gap-2"><span>Setup Google Ads</span><span class="text-gray-900 dark:text-white/80 font-medium">199€</span></div>
                                    <div class="flex justify-between gap-2"><span>Auditoría de marca</span><span class="text-gray-900 dark:text-white/80 font-medium">199€</span></div>
                                    <div class="flex justify-between gap-2"><span>FOCO™ completa</span><span class="text-gray-900 dark:text-white/80 font-medium">297€</span></div>
                                    <div class="flex justify-between gap-2"><span>Kit Conversión Local™</span><span class="text-gray-900 dark:text-white/80 font-medium">150€</span></div>
                                    <div class="flex justify-between gap-2"><span>Plan de contenido</span><span class="text-gray-900 dark:text-white/80 font-medium">99€</span></div>
                                    <div class="flex justify-between gap-2 text-marca font-medium"><span>BONUS: 1er mes gestión</span><span class="text-marca">499€</span></div>
                                </div>`,
    `<div class="space-y-2">
                                    <div class="flex justify-between gap-2"><span>Web Elite</span><span class="text-gray-900 dark:text-white/80 font-medium">1.199€</span></div>
                                    <div class="flex justify-between gap-2"><span>LeadFlow Completo</span><span class="text-gray-900 dark:text-white/80 font-medium">990€</span></div>
                                    <div class="flex justify-between gap-2"><span>SEO On-Page Advanced</span><span class="text-gray-900 dark:text-white/80 font-medium">399€</span></div>
                                    <div class="flex justify-between gap-2"><span>Setup Google Ads</span><span class="text-gray-900 dark:text-white/80 font-medium">199€</span></div>
                                    <div class="flex justify-between gap-2"><span>Auditoría de marca</span><span class="text-gray-900 dark:text-white/80 font-medium">199€</span></div>
                                    <div class="flex justify-between gap-2"><span>Puesta a Punto Digital™ completa</span><span class="text-gray-900 dark:text-white/80 font-medium">297€</span></div>
                                    <div class="flex justify-between gap-2"><span>Kit Conversión Local™</span><span class="text-gray-900 dark:text-white/80 font-medium">150€</span></div>
                                    <div class="flex justify-between gap-2"><span>Plan de contenido</span><span class="text-gray-900 dark:text-white/80 font-medium">99€</span></div>
                                </div>`
);

p4 = p4.replace(
    `<div class="flex justify-between items-center text-gray-400 dark:text-white/30 line-through mb-1"><span>Suma:</span><span>4.031€</span></div>
                                    <div class="flex justify-between items-center font-bold text-marca text-[12px]"><span>Ahorras (26%):</span><span>1.041€</span></div>`,
    `<div class="flex justify-between items-center text-gray-400 dark:text-white/30 line-through mb-1"><span>Total por separado:</span><span>3.532€</span></div>
                                    <div class="flex justify-between items-center font-bold text-marca text-[12px]"><span>Ahorras (15%):</span><span>542€</span></div>`
);

p4 = p4.replace(
    `</div>
                                </div>
                            </div>
                            
                            <!-- Servicio Mensual -->`,
    `</div>
                                </div>
                                <p class="text-[11px] font-medium text-marca mt-3 text-center">🎁 Además: primer mes de gestión incluido — valorado en 499€ — sin coste.</p>
                            </div>
                            
                            <!-- Servicio Mensual -->`
);

p4 = p4.replace(
    `<div class="space-y-2">
                                    <div class="flex justify-between gap-2"><span>Gestión de redes Elite (3)</span><span class="text-gray-900 dark:text-white/80 font-medium">399€/m</span></div>
                                    <div class="flex justify-between gap-2"><span>Google Ads Growth</span><span class="text-gray-900 dark:text-white/80 font-medium">299€/m</span></div>
                                    <div class="flex justify-between gap-2"><span>LeadFlow Completo</span><span class="text-gray-900 dark:text-white/80 font-medium">75€/m</span></div>
                                </div>`,
    `<div class="space-y-2">
                                    <div class="flex justify-between gap-2"><span>Redes Sociales · Plan Crecimiento (hasta 3 redes)</span><span class="text-gray-900 dark:text-white/80 font-medium">299€/m</span></div>
                                    <div class="flex justify-between gap-2"><span>Google Ads Growth</span><span class="text-gray-900 dark:text-white/80 font-medium">299€/m</span></div>
                                    <div class="flex justify-between gap-2"><span>LeadFlow Completo</span><span class="text-gray-900 dark:text-white/80 font-medium">75€/m</span></div>
                                </div>`
);

p4 = p4.replace(
    `<div class="flex justify-between items-center text-gray-400 dark:text-white/30 line-through mb-1"><span>Suma:</span><span>773€/m</span></div>
                                    <div class="flex justify-between items-center font-bold text-marca text-[12px]"><span>Ahorras:</span><span>274€/mes</span></div>`,
    `<div class="flex justify-between items-center text-gray-400 dark:text-white/30 line-through mb-1"><span>Suma:</span><span>673€/m</span></div>
                                    <div class="flex justify-between items-center font-bold text-marca text-[12px]"><span>Ahorras:</span><span>174€/mes</span></div>`
);

p4 = p4.replace(
    `</details>
                    <div class="mt-auto pt-6 text-center">`,
    `</details>
                    <div class="mb-6 p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10 relative z-10 text-[11px] text-gray-600 dark:text-white/60">
                        <span class="font-bold text-gray-900 dark:text-white/90">Garantía:</span> Si en 90 días no has recibido más contactos que en los 90 días anteriores — medidos en tu LeadFlow — trabajamos 30 días más sin coste.
                    </div>
                    <div class="mt-auto pt-6 text-center">`
);

p4 = p4.replace(
    `<a href="https://wa.me/34641576286?text=Hola%2C%20quiero%20aplicar%20al%20Sistema%20Escala" target="_blank" class="group block w-full py-3.5 px-4 bg-gray-100 dark:bg-white/5 hover:bg-marca hover:text-white dark:hover:bg-marca dark:hover:text-white border border-transparent dark:border-white/10 rounded-full text-center text-[14px] font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm text-gray-900 dark:text-white">Solicitar entrevista <i class="ph ph-arrow-right ml-1 inline-block group-hover:translate-x-1 transition-transform"></i></a>`,
    `<a href="https://cal.com/proemote" target="_blank" class="group block w-full py-3.5 px-4 bg-gray-100 dark:bg-white/5 hover:bg-marca hover:text-white dark:hover:bg-marca dark:hover:text-white border border-transparent dark:border-white/10 rounded-full text-center text-[14px] font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm text-gray-900 dark:text-white">Solicitar entrevista <i class="ph ph-arrow-right ml-1 inline-block group-hover:translate-x-1 transition-transform"></i></a>\n                        <a href="https://wa.me/34641576286?text=Hola%2C%20quiero%20aplicar%20al%20Sistema%20Escala" target="_blank" rel="noopener" class="text-[11px] font-medium text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center justify-center gap-1 mt-3"><i class="ph ph-whatsapp-logo"></i> ¿Dudas? Escríbenos por WhatsApp</a>`
);

// We need to merge them.
html = html.substring(0, p4Start) + p4 + html.substring(p4End);

fs.writeFileSync('index.html', html);
console.log('Done creating index.html with single copies of packs and exact updates!');
