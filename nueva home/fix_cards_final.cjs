const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const sectionStart = html.indexOf('<section id="planes"');
const sectionEnd = html.indexOf('</section>', sectionStart);
let section = html.substring(sectionStart, sectionEnd);

const extractCard = (startString, endString) => {
    let start = section.indexOf(startString);
    let end = endString ? section.indexOf(endString) : section.length;
    return section.substring(start, end);
};

// --- CARD 1 (Puesta a Punto) ---
let c1 = `<!-- PACK 1: SISTEMA FOCO -->
                <div class="pricing-card flex flex-col bg-[#0A0A0A] bg-gradient-to-b from-[#0A0A0A] to-[#160b2a] border border-white/10 rounded-[24px] p-6 relative h-full shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-white/20 group">
                    <div class="mb-4">
                        <div class="w-12 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-white">
                            <i class="ph ph-check text-sm"></i>
                        </div>
                        <h3 class="text-xl font-medium text-white mb-1">Puesta a Punto Digital™</h3>
                        <p class="text-[11px] text-white/50 leading-relaxed min-h-[34px]">En menos de 72 horas sabrás exactamente qué frena la captación de tu negocio — y tendrás tu perfil de Google ya optimizado.</p>
                    </div>

                    <div class="mb-5 flex flex-col items-start gap-0.5">
                        <div class="flex items-end gap-1.5">
                            <span class="text-3xl font-bold text-white leading-none tracking-tight">97€</span>
                            <span class="text-[11px] text-white/40 font-medium mb-1">pago único · sin IVA</span>
                        </div>
                    </div>

                    <div class="flex items-center justify-center mb-5">
                        <div class="h-px bg-white/10 flex-grow"></div>
                        <span class="px-3 text-[9px] uppercase tracking-widest text-white/40 font-medium">INCLUYE</span>
                        <div class="h-px bg-white/10 flex-grow"></div>
                    </div>

                    <ul class="space-y-3 mb-5 text-[11px] text-white/70 font-light flex-grow">
                        <li class="flex items-start gap-2"><i class="ph ph-check text-white/50 mt-0.5"></i> <span>Optimización profesional de tu perfil de Google Business</span></li>
                        <li class="flex items-start gap-2"><i class="ph ph-check text-white/50 mt-0.5"></i> <span>Auditoría de tu presencia digital y de tu competencia local</span></li>
                        <li class="flex items-start gap-2"><i class="ph ph-check text-white/50 mt-0.5"></i> <span>Reunión estratégica online con informe en PDF y vídeo</span></li>
                        <li class="flex items-start gap-2"><i class="ph ph-check text-white/50 mt-0.5"></i> <span>Plan de acción claro para los próximos 30 días</span></li>
                    </ul>

                    <details class="mb-4 text-[10px] text-white/50 cursor-pointer group flex-grow mt-auto">
                        <summary class="font-medium outline-none flex items-center gap-1 mb-2">
                            <span class="border-b border-dashed border-white/30 hover:border-white/60 transition-colors group-open:hidden">Ver desglose de valor</span>
                            <span class="border-b border-dashed border-white/30 hover:border-white/60 transition-colors hidden group-open:inline">Ocultar desglose</span>
                        </summary>
                        <div class="space-y-2 pl-2 border-l border-white/10 mt-2">
                            <div class="flex justify-between gap-2"><span>Optimización Google Business</span><span class="text-white/80">49€</span></div>
                            <div class="flex justify-between gap-2"><span>Auditoría digital y competencia</span><span class="text-white/80">149€</span></div>
                            <div class="flex justify-between gap-2"><span>Reunión, informe y vídeo</span><span class="text-white/80">99€</span></div>
                            <div class="pt-2 mt-2 border-t border-white/5">
                                <div class="flex justify-between items-center text-white/30 line-through mb-0.5"><span>Suma:</span><span>297€</span></div>
                                <div class="flex justify-between items-center font-bold text-marca text-[11px]"><span>Ahorras (67%):</span><span>200€</span></div>
                            </div>
                        </div>
                    </details>
                    
                    <div class="mt-auto relative z-10 w-full flex flex-col gap-3">
                        <div class="p-2.5 bg-white/5 rounded-lg border border-white/5 text-[10px] text-white/60 text-left">
                            <span class="font-bold text-white/90">Garantía:</span> si el informe no te descubre nada que no supieras ya, te devolvemos los 97€.
                        </div>
                        <a href="https://buy.stripe.com/dR67ut8zK6V8gZW5kn" target="_blank" class="group block w-full py-2.5 px-4 bg-transparent hover:bg-white/5 border border-white/20 rounded-full text-center text-[13px] font-semibold transition-all duration-300 text-white">Comprar ahora <i class="ph ph-arrow-right ml-1 inline-block group-hover:translate-x-1 transition-transform"></i></a>
                        <a href="https://wa.me/34641576286?text=Hola%2C%20quiero%20la%20Puesta%20a%20Punto" target="_blank" rel="noopener" class="text-[10px] font-medium text-white/40 hover:text-white transition-colors flex items-center justify-center gap-1"><i class="ph ph-whatsapp-logo"></i> ¿Dudas? Escríbenos</a>
                    </div>
                </div>
                `;

// --- CARD 2 (Sistema Presencia) ---
let c2 = `<!-- PACK 2: SISTEMA PRESENCIA -->
                <div class="pricing-card flex flex-col bg-[#0A0A0A] bg-gradient-to-b from-[#0A0A0A] to-[#160b2a] border border-white/10 rounded-[24px] p-6 relative h-full shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-white/20">
                    <div class="mb-4">
                        <div class="w-12 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-white">
                            <i class="ph ph-buildings text-sm"></i>
                        </div>
                        <h3 class="text-xl font-medium text-white mb-1">Sistema Presencia™</h3>
                        <p class="text-[11px] text-white/50 leading-relaxed min-h-[34px]">De no existir en internet a una presencia profesional que genera confianza. En 7 días o no lo pagas.</p>
                    </div>

                    <div class="mb-5 flex flex-col items-start gap-0.5">
                        <div class="flex items-end gap-1.5">
                            <span class="text-3xl font-bold text-white leading-none tracking-tight">699€</span>
                            <span class="text-[11px] text-white/40 font-medium mb-1">pago único · sin IVA</span>
                        </div>
                    </div>

                    <div class="flex items-center justify-center mb-5">
                        <div class="h-px bg-white/10 flex-grow"></div>
                        <span class="px-3 text-[9px] uppercase tracking-widest text-white/40 font-medium">INCLUYE</span>
                        <div class="h-px bg-white/10 flex-grow"></div>
                    </div>

                    <ul class="space-y-3 mb-5 text-[11px] text-white/70 font-light flex-grow">
                        <li class="flex items-start gap-2"><i class="ph ph-check text-white/50 mt-0.5"></i> <span>Diseño web profesional y adaptado a móviles</span></li>
                        <li class="flex items-start gap-2"><i class="ph ph-check text-white/50 mt-0.5"></i> <span>Optimización básica para salir en Google</span></li>
                        <li class="flex items-start gap-2"><i class="ph ph-check text-white/50 mt-0.5"></i> <span>Botón directo a tu WhatsApp</span></li>
                        <li class="flex items-start gap-2"><i class="ph ph-check text-white/50 mt-0.5"></i> <span>Textos legales obligatorios incluidos</span></li>
                    </ul>

                    <details class="mb-4 text-[10px] text-white/50 cursor-pointer group flex-grow mt-auto">
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
                    </details>
                    
                    <div class="mt-auto relative z-10 w-full flex flex-col gap-3">
                        <a href="https://wa.me/34641576286?text=Hola%2C%20quiero%20el%20plan%20PRESENCIA" target="_blank" class="group block w-full py-2.5 px-4 bg-transparent hover:bg-white/5 border border-white/20 rounded-full text-center text-[13px] font-semibold transition-all duration-300 text-white">Empezar ahora <i class="ph ph-arrow-right ml-1 inline-block group-hover:translate-x-1 transition-transform"></i></a>
                        <a href="https://wa.me/34641576286?text=Hola%2C%20quiero%20el%20plan%20PRESENCIA" target="_blank" rel="noopener" class="text-[10px] font-medium text-white/40 hover:text-white transition-colors flex items-center justify-center gap-1"><i class="ph ph-whatsapp-logo"></i> ¿Dudas? Escríbenos</a>
                    </div>
                </div>
                `;

// --- CARD 3 (Sistema Captación) ---
let c3 = `<!-- PACK 3: SISTEMA CAPTACIÓN -->
                <div class="pricing-card flex flex-col bg-[#0A0A0A] bg-gradient-to-b from-[#0A0A0A] to-[#1d0e3a] border border-violet-500/30 rounded-[24px] p-6 relative h-full shadow-[0_0_40px_rgba(139,92,246,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(139,92,246,0.25)] hover:border-violet-500/50">
                    <div class="absolute top-5 right-5 z-20">
                        <span class="bg-violet-500/10 border border-violet-500/30 text-violet-300 text-[9px] font-medium py-1 px-2.5 rounded-full">Más popular</span>
                    </div>
                    
                    <div class="mb-4">
                        <div class="w-12 h-7 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mb-4 text-violet-400">
                            <i class="ph ph-lightning text-sm"></i>
                        </div>
                        <h3 class="text-xl font-medium text-white mb-1">Sistema Captación™</h3>
                        <p class="text-[11px] text-white/50 leading-relaxed min-h-[34px] pr-16">Un sistema que captura, organiza y responde oportunidades. Operativo en 30 días.</p>
                    </div>

                    <div class="mb-5 flex flex-col items-start gap-0.5">
                        <div class="flex items-end gap-1.5">
                            <span class="text-3xl font-bold text-white leading-none tracking-tight">1.490€</span>
                            <span class="text-[11px] text-white/40 font-medium mb-1">pago único</span>
                        </div>
                        <div class="flex items-center gap-1 mt-0.5">
                            <span class="text-[13px] font-medium text-white/80">+249€</span>
                            <span class="text-[10px] text-white/40 font-medium">/mes · sin IVA</span>
                        </div>
                    </div>

                    <div class="flex items-center justify-center mb-5">
                        <div class="h-px bg-white/10 flex-grow"></div>
                        <span class="px-3 text-[9px] uppercase tracking-widest text-white/40 font-medium">INCLUYE</span>
                        <div class="h-px bg-white/10 flex-grow"></div>
                    </div>

                    <ul class="space-y-3 mb-5 text-[11px] text-white/70 font-light flex-grow">
                        <li class="flex items-start gap-2"><i class="ph ph-check text-violet-400 mt-0.5"></i> <span>Diseño web avanzado de alta conversión</span></li>
                        <li class="flex items-start gap-2"><i class="ph ph-check text-violet-400 mt-0.5"></i> <span>LeadFlow: CRM para gestionar tus clientes</span></li>
                        <li class="flex items-start gap-2"><i class="ph ph-check text-violet-400 mt-0.5"></i> <span>Automatización básica de atención (WhatsApp/Email)</span></li>
                        <li class="flex items-start gap-2"><i class="ph ph-check text-violet-400 mt-0.5"></i> <span>Gestión de Meta Ads O Google Ads</span></li>
                    </ul>

                    <details class="mb-4 text-[10px] text-white/50 cursor-pointer group flex-grow mt-auto">
                        <summary class="font-medium outline-none flex items-center gap-1 mb-2">
                            <span class="border-b border-dashed border-white/30 hover:border-white/60 transition-colors group-open:hidden">Ver desglose de valor</span>
                            <span class="border-b border-dashed border-white/30 hover:border-white/60 transition-colors hidden group-open:inline">Ocultar desglose</span>
                        </summary>
                        <div class="space-y-3 pl-2 border-l border-white/10 mt-2">
                            <div>
                                <p class="font-bold text-white/60 uppercase tracking-widest text-[9px] mb-1.5">Puesta en marcha</p>
                                <div class="space-y-1.5">
                                    <div class="flex justify-between gap-2"><span>Web Advanced</span><span class="text-white/80">899€</span></div>
                                    <div class="flex justify-between gap-2"><span>LeadFlow Base</span><span class="text-white/80">499€</span></div>
                                    <div class="flex justify-between gap-2"><span>Puesta a Punto™</span><span class="text-white/80">297€</span></div>
                                </div>
                                <div class="pt-1.5 mt-1.5 border-t border-white/5">
                                    <div class="flex justify-between items-center text-white/30 line-through mb-0.5"><span>Total:</span><span>2.193€</span></div>
                                    <div class="flex justify-between items-center font-bold text-marca text-[11px]"><span>Ahorras (32%):</span><span>703€</span></div>
                                </div>
                            </div>
                            <div>
                                <p class="font-bold text-white/60 uppercase tracking-widest text-[9px] mb-1.5">Mensual</p>
                                <div class="space-y-1.5">
                                    <div class="flex justify-between gap-2"><span>Ads o Redes (1)</span><span class="text-white/80">199€/m</span></div>
                                    <div class="flex justify-between gap-2"><span>LeadFlow Base</span><span class="text-white/80">45€/m</span></div>
                                </div>
                                <div class="pt-1.5 mt-1.5 border-t border-white/5 flex justify-between font-bold text-marca text-[11px]"><span>Ahorras:</span><span>+30€/mes</span></div>
                            </div>
                        </div>
                    </details>
                    
                    <div class="mt-auto relative z-10 w-full flex flex-col gap-3">
                        <div class="p-2 bg-white/5 rounded-lg border border-white/5 text-[9px] text-white/60 text-left">
                            <span class="font-bold text-white/90">Garantía:</span> Si en 90 días no has recibido más contactos, trabajamos 30 días gratis.
                        </div>
                        <a href="https://cal.com/proemote" target="_blank" class="group block w-full py-2.5 px-4 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-full text-center text-[13px] font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.3)]">Reservar llamada <i class="ph ph-arrow-right ml-1 inline-block group-hover:translate-x-1 transition-transform"></i></a>
                        <a href="https://wa.me/34641576286?text=Hola%2C%20quiero%20el%20plan%20CAPTACION" target="_blank" rel="noopener" class="text-[10px] font-medium text-white/40 hover:text-white transition-colors flex items-center justify-center gap-1"><i class="ph ph-whatsapp-logo"></i> ¿Dudas? Escríbenos</a>
                    </div>
                </div>
                `;

// --- CARD 4 (Sistema Escala) ---
let c4 = `<!-- PACK 4: SISTEMA ESCALA -->
                <div class="pricing-card flex flex-col bg-[#0A0A0A] bg-gradient-to-b from-[#0A0A0A] to-[#160b2a] border border-white/10 rounded-[24px] p-6 relative h-full shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-white/20">
                    <div class="mb-4">
                        <div class="w-12 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-white">
                            <i class="ph ph-rocket text-sm"></i>
                        </div>
                        <h3 class="text-xl font-medium text-white mb-1">Sistema Escala™</h3>
                        <p class="text-[11px] text-white/50 leading-relaxed min-h-[34px]">El ecosistema digital completo para dominar tu mercado local con IA y automatización.</p>
                    </div>

                    <div class="mb-5 flex flex-col items-start gap-0.5">
                        <div class="flex items-end gap-1.5">
                            <span class="text-3xl font-bold text-white leading-none tracking-tight">2.490€</span>
                            <span class="text-[11px] text-white/40 font-medium mb-1">pago único</span>
                        </div>
                        <div class="flex items-center gap-1 mt-0.5">
                            <span class="text-[13px] font-medium text-white/80">+499€</span>
                            <span class="text-[10px] text-white/40 font-medium">/mes · sin IVA</span>
                        </div>
                    </div>

                    <div class="flex items-center justify-center mb-5">
                        <div class="h-px bg-white/10 flex-grow"></div>
                        <span class="px-3 text-[9px] uppercase tracking-widest text-white/40 font-medium">INCLUYE</span>
                        <div class="h-px bg-white/10 flex-grow"></div>
                    </div>

                    <ul class="space-y-3 mb-5 text-[11px] text-white/70 font-light flex-grow">
                        <li class="flex items-start gap-2"><i class="ph ph-check text-white/50 mt-0.5"></i> <span>Automatización de atención y seguimiento de clientes</span></li>
                        <li class="flex items-start gap-2"><i class="ph ph-check text-white/50 mt-0.5"></i> <span>CRM completo y reactivación automática de clientes</span></li>
                        <li class="flex items-start gap-2"><i class="ph ph-check text-white/50 mt-0.5"></i> <span>Campañas de Google Ads y Meta Ads</span></li>
                        <li class="flex items-start gap-2"><i class="ph ph-check text-white/50 mt-0.5"></i> <span>Gestión integral de hasta 3 redes sociales</span></li>
                    </ul>

                    <details class="mb-4 text-[10px] text-white/50 cursor-pointer group flex-grow mt-auto">
                        <summary class="font-medium outline-none flex items-center gap-1 mb-2">
                            <span class="border-b border-dashed border-white/30 hover:border-white/60 transition-colors group-open:hidden">Ver desglose de valor</span>
                            <span class="border-b border-dashed border-white/30 hover:border-white/60 transition-colors hidden group-open:inline">Ocultar desglose</span>
                        </summary>
                        <div class="space-y-3 pl-2 border-l border-white/10 mt-2">
                            <div>
                                <p class="font-bold text-white/60 uppercase tracking-widest text-[9px] mb-1.5">Puesta en marcha</p>
                                <div class="space-y-1.5">
                                    <div class="flex justify-between gap-2"><span>Web Elite</span><span class="text-white/80">1.199€</span></div>
                                    <div class="flex justify-between gap-2"><span>LeadFlow Completo</span><span class="text-white/80">990€</span></div>
                                    <div class="flex justify-between gap-2"><span>SEO, Ads, Marca...</span><span class="text-white/80">1.343€</span></div>
                                </div>
                                <div class="pt-1.5 mt-1.5 border-t border-white/5">
                                    <div class="flex justify-between items-center text-white/30 line-through mb-0.5"><span>Total:</span><span>3.532€</span></div>
                                    <div class="flex justify-between items-center font-bold text-marca text-[11px]"><span>Ahorras (15%):</span><span>542€</span></div>
                                </div>
                            </div>
                            <div>
                                <p class="font-bold text-white/60 uppercase tracking-widest text-[9px] mb-1.5">Mensual</p>
                                <div class="space-y-1.5">
                                    <div class="flex justify-between gap-2"><span>Redes, Ads, LeadFlow</span><span class="text-white/80">673€/m</span></div>
                                </div>
                                <div class="pt-1.5 mt-1.5 border-t border-white/5 flex justify-between font-bold text-marca text-[11px]"><span>Ahorras:</span><span>174€/mes</span></div>
                            </div>
                        </div>
                    </details>

                    <div class="mt-auto relative z-10 w-full flex flex-col gap-3">
                        <div class="p-2 bg-white/5 rounded-lg border border-white/5 text-[9px] text-white/60 text-left">
                            <span class="font-bold text-white/90">Garantía:</span> Si en 90 días no has recibido más contactos, trabajamos 30 días gratis.
                        </div>
                        <a href="https://cal.com/proemote" target="_blank" class="group block w-full py-2.5 px-4 bg-transparent hover:bg-white/5 border border-white/20 rounded-full text-center text-[13px] font-semibold transition-all duration-300 text-white">Solicitar entrevista <i class="ph ph-arrow-right ml-1 inline-block group-hover:translate-x-1 transition-transform"></i></a>
                        <a href="https://wa.me/34641576286?text=Hola%2C%20quiero%20aplicar%20al%20Sistema%20Escala" target="_blank" rel="noopener" class="text-[10px] font-medium text-white/40 hover:text-white transition-colors flex items-center justify-center gap-1"><i class="ph ph-whatsapp-logo"></i> ¿Dudas? Escríbenos</a>
                    </div>
                </div>
                `;

let newSection = section.substring(0, section.indexOf('<!-- PACK 1: SISTEMA FOCO -->')) + c1 + c2 + c3 + c4;
html = html.substring(0, sectionStart) + newSection + html.substring(sectionEnd);
fs.writeFileSync('index.html', html);
console.log('Cards updated with fixed details, guarantee and CTA placements.');
