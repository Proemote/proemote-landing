import re

with open('servicios/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the grid inside the #servicios section
tabs_html = """            <div class="flex justify-center mb-10 relative z-10 reveal-up">
                <div class="inline-flex flex-wrap justify-center bg-white/5 border border-white/10 p-1.5 rounded-full">
                    <button id="tab-marketing" class="tab-btn px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 bg-primary text-white shadow-[0_0_15px_rgba(123,97,255,0.4)]">
                        Marketing Digital
                    </button>
                    <button id="tab-eventos" class="tab-btn px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 text-textSecondary hover:text-white">
                        Eventos & Experiencias
                    </button>
                </div>
            </div>

            <div id="content-marketing" class="tab-content grid grid-cols-1 md:grid-cols-2 gap-6 reveal-up mb-12 transition-opacity duration-300 opacity-100">
                <div class="glass-card p-8 rounded-3xl border-white/5 hover:border-primary/30 transition-all group cursor-pointer" onclick="window.location.href='/servicios#branding'">
                    <i class="ph-fill ph-paint-brush-broad text-3xl text-primary mb-4 block group-hover:scale-110 transition-transform w-fit"></i>
                    <h3 class="text-xl font-heading text-white font-medium mb-2">Branding & Estrategia</h3>
                    <p class="text-sm text-textSecondary mb-6">Identidad visual, arquitectura de marca y posicionamiento diferencial para destacar de la competencia en tu sector y crear un mensaje memorable.</p>
                    <span class="inline-flex items-center text-primary text-sm font-medium hover:text-white transition-colors">Saber más <i class="ph ph-arrow-right ml-1"></i></span>
                </div>
                <div class="glass-card p-8 rounded-3xl border-white/5 hover:border-primary/30 transition-all group cursor-pointer" onclick="window.location.href='/diseno-web-SEO'">
                    <i class="ph-fill ph-browser text-3xl text-primary mb-4 block group-hover:scale-110 transition-transform w-fit"></i>
                    <h3 class="text-xl font-heading text-white font-medium mb-2">Web & Diseño Digital</h3>
                    <p class="text-sm text-textSecondary mb-6">Webs corporativas y e-commerce enfocadas a conversión, embudos automáticos y plataformas corporativas escalables que te traen clientes las 24 horas.</p>
                    <span class="inline-flex items-center text-primary text-sm font-medium hover:text-white transition-colors">Saber más <i class="ph ph-arrow-right ml-1"></i></span>
                </div>
                <div class="glass-card p-8 rounded-3xl border-white/5 hover:border-primary/30 transition-all group cursor-pointer" onclick="window.location.href='/redes-sociales'">
                    <i class="ph-fill ph-share-network text-3xl text-primary mb-4 block group-hover:scale-110 transition-transform w-fit"></i>
                    <h3 class="text-xl font-heading text-white font-medium mb-2">Contenido & Redes Sociales</h3>
                    <p class="text-sm text-textSecondary mb-6">Estrategia de contenido orgánico y gestión de redes sociales para crear autoridad, educar y retener a tu audiencia creando comunidad.</p>
                    <span class="inline-flex items-center text-primary text-sm font-medium hover:text-white transition-colors">Saber más <i class="ph ph-arrow-right ml-1"></i></span>
                </div>
                <div class="glass-card p-8 rounded-3xl border-white/5 hover:border-primary/30 transition-all group cursor-pointer" onclick="window.location.href='/marketing-digital'">
                    <i class="ph-fill ph-rocket-launch text-3xl text-primary mb-4 block group-hover:scale-110 transition-transform w-fit"></i>
                    <h3 class="text-xl font-heading text-white font-medium mb-2">Marketing Digital</h3>
                    <p class="text-sm text-textSecondary mb-6">Campañas de publicidad digital (Meta Ads, Google Ads y más) para escalar tu negocio de forma medible y predecible mes a mes.</p>
                    <span class="inline-flex items-center text-primary text-sm font-medium hover:text-white transition-colors">Saber más <i class="ph ph-arrow-right ml-1"></i></span>
                </div>
            </div>

            <!-- TAB 2: Eventos & Experiencias -->
            <div id="content-eventos" class="tab-content grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 transition-opacity duration-300 opacity-0 hidden">
                <div class="glass-card p-8 rounded-3xl border-white/5 hover:border-primary/30 transition-all group cursor-pointer" onclick="window.location.href='/eventos'">
                    <i class="ph-fill ph-calendar-check text-3xl text-primary mb-4 block group-hover:scale-110 transition-transform w-fit"></i>
                    <h3 class="text-xl font-heading text-white font-medium mb-2">Organización Integral</h3>
                    <p class="text-sm text-textSecondary mb-6">Planificación, producción y gestión completa del evento corporativo o social, desde el concepto y logística hasta la ejecución perfecta en el día.</p>
                    <span class="inline-flex items-center text-primary text-sm font-medium hover:text-white transition-colors">Saber más <i class="ph ph-arrow-right ml-1"></i></span>
                </div>
                <div class="glass-card p-8 rounded-3xl border-white/5 hover:border-primary/30 transition-all group cursor-pointer" onclick="window.location.href='/eventos'">
                    <i class="ph-fill ph-palette text-3xl text-primary mb-4 block group-hover:scale-110 transition-transform w-fit"></i>
                    <h3 class="text-xl font-heading text-white font-medium mb-2">Branding Visual del Evento</h3>
                    <p class="text-sm text-textSecondary mb-6">Imagen gráfica, cartelería, decoración, materiales e identidad visual coherente para que el evento comunique los valores de tu marca.</p>
                    <span class="inline-flex items-center text-primary text-sm font-medium hover:text-white transition-colors">Saber más <i class="ph ph-arrow-right ml-1"></i></span>
                </div>
                <div class="glass-card p-8 rounded-3xl border-white/5 hover:border-primary/30 transition-all group cursor-pointer" onclick="window.location.href='/eventos'">
                    <i class="ph-fill ph-megaphone text-3xl text-primary mb-4 block group-hover:scale-110 transition-transform w-fit"></i>
                    <h3 class="text-xl font-heading text-white font-medium mb-2">Promoción Digital</h3>
                    <p class="text-sm text-textSecondary mb-6">Estrategia de contenido y difusión en redes sociales para llenar el aforo y generar expectación antes, cobertura durante y recuerdo después.</p>
                    <span class="inline-flex items-center text-primary text-sm font-medium hover:text-white transition-colors">Saber más <i class="ph ph-arrow-right ml-1"></i></span>
                </div>
                <div class="glass-card p-8 rounded-3xl border-white/5 hover:border-primary/30 transition-all group cursor-pointer" onclick="window.location.href='/eventos'">
                    <i class="ph-fill ph-target text-3xl text-primary mb-4 block group-hover:scale-110 transition-transform w-fit"></i>
                    <h3 class="text-xl font-heading text-white font-medium mb-2">Campañas Ads para Eventos</h3>
                    <p class="text-sm text-textSecondary mb-6">Publicidad segmentada y local en Meta y Google para maximizar inscripciones, venta de entradas o asistentes a tu congreso o feria.</p>
                    <span class="inline-flex items-center text-primary text-sm font-medium hover:text-white transition-colors">Saber más <i class="ph ph-arrow-right ml-1"></i></span>
                </div>
            </div>"""

content = re.sub(r'<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-up">.*?</div>\n        </div>\n    </section>', tabs_html + '\n        </div>\n    </section>', content, flags=re.DOTALL)

# Add tabs logic if not present
if "tabMarketing" not in content:
    tabs_js = """
            const tabMarketing = document.getElementById('tab-marketing');
            const tabEventos = document.getElementById('tab-eventos');
            const contentMarketing = document.getElementById('content-marketing');
            const contentEventos = document.getElementById('content-eventos');

            if(tabMarketing && tabEventos && contentMarketing && contentEventos) {
                const switchTab = (activeTab, inactiveTab, activeContent, inactiveContent) => {
                    activeTab.classList.add('bg-primary', 'text-white', 'shadow-[0_0_15px_rgba(123,97,255,0.4)]');
                    activeTab.classList.remove('text-textSecondary', 'hover:text-white');
                    inactiveTab.classList.remove('bg-primary', 'text-white', 'shadow-[0_0_15px_rgba(123,97,255,0.4)]');
                    inactiveTab.classList.add('text-textSecondary', 'hover:text-white');

                    inactiveContent.classList.remove('opacity-100');
                    inactiveContent.classList.add('opacity-0');
                    setTimeout(() => {
                        inactiveContent.classList.add('hidden');
                        activeContent.classList.remove('hidden');
                        setTimeout(() => {
                            activeContent.classList.remove('opacity-0');
                            activeContent.classList.add('opacity-100');
                        }, 20);
                    }, 300);
                };
                tabMarketing.addEventListener('click', () => switchTab(tabMarketing, tabEventos, contentMarketing, contentEventos));
                tabEventos.addEventListener('click', () => switchTab(tabEventos, tabMarketing, contentEventos, contentMarketing));
            }
"""
    content = content.replace("document.addEventListener('DOMContentLoaded', () => {", "document.addEventListener('DOMContentLoaded', () => {" + tabs_js, 1)

with open('drag_scroll.js', 'r', encoding='utf-8') as f:
    drag_scroll = f.read()

# Insert drag_scroll.js inside the <script> block right before // Lógica Hover Mega Menú (Solo Desktop) if it is missing
if "enableDragScroll" not in content:
    content = content.replace('        // Lógica Hover Mega Menú (Solo Desktop)', drag_scroll + '\n        // Lógica Hover Mega Menú (Solo Desktop)')

with open('servicios/index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated servicios/index.html successfully.")
