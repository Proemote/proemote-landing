import os
import re

with open('eventos/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Hero
old_hero = r'''    <!-- 1\. HERO SECTION -->
    <section class="relative min-h-\[85vh\] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-grid-pattern">
        <!-- Decoración de fondo -->
        <div class="absolute top-\[20%\] left-\[10%\] w-\[40vw\] h-\[40vw\] rounded-full bg-primary/10 blur-\[120px\] pointer-events-none z-\[0\]"></div>
        <div class="absolute bottom-\[10%\] right-\[10%\] w-\[50vw\] h-\[50vw\] rounded-full bg-accent/10 blur-\[150px\] pointer-events-none z-\[0\]"></div>

        <div class="max-w-5xl mx-auto px-6 text-center relative z-10 reveal-up active">
            <h1 class="font-heading text-5xl md:text-7xl font-bold leading-\[1\.1\] tracking-tight mb-6">
                Creamos eventos que se recuerdan\. Y te damos <span class="text-gradient-primary">todo lo que necesitas</span> para hacerlo posible\.
            </h1>
            <p class="text-lg md:text-xl text-textSecondary mb-10 max-w-2xl mx-auto leading-relaxed">
                Producción integral de eventos y alquiler de equipo profesional para empresas, marcas y creadores\.
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/eventos/organizacion-de-eventos" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-accent transition-all duration-300 shadow-\[0_0_20px_rgba\(123,97,255,0\.3\)\]">
                    Organizar un evento
                </a>
                <a href="#alquiler" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300">
                    Alquilar equipo
                </a>
            </div>
        </div>
    </section>'''

new_hero = '''    <!-- 1. HERO SECTION -->
    <section class="pt-48 pb-20 relative z-10 overflow-hidden border-b border-white/5 bg-bgMain bg-grid-pattern-primary with-glow">
        <div class="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-bgMain z-[-1] pointer-events-none"></div>
        <div class="absolute top-[10%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-[0]"></div>
        <div class="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-accent/10 blur-[150px] pointer-events-none z-[0]"></div>

        <div class="max-w-5xl mx-auto px-6 text-center relative z-10 reveal-up active">
            
            <div class="inline-flex items-center justify-center px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold tracking-[0.2em] uppercase mb-8 shadow-[0_0_15px_rgba(123,97,255,0.05)]">
                Eventos & Experiencias
            </div>

            <h1 class="font-heading text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6 text-white">
                Creamos eventos que se recuerdan. Y te damos <span class="text-gradient-primary">todo lo que necesitas</span> para hacerlo posible.
            </h1>
            
            <p class="text-lg md:text-xl text-textSecondary leading-relaxed max-w-2xl mx-auto mb-10">
                Producción integral de eventos y alquiler de equipo profesional para empresas, marcas y creadores. Todo integrado en un solo equipo.
            </p>
            
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <a href="#produccion" class="w-full sm:w-auto px-8 py-4 rounded-full bg-primary hover:bg-accent text-white font-medium transition-all duration-300 shadow-[0_0_20px_rgba(123,97,255,0.4)] flex items-center justify-center gap-2">
                    Organizar un evento
                </a>
                <a href="#alquiler" class="w-full sm:w-auto px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition-all duration-300 flex items-center justify-center gap-2">
                    Alquilar equipo
                </a>
            </div>

            <!-- SOCIAL PROOF -->
            <div class="inline-flex items-center justify-center gap-2 text-sm text-textSecondary font-medium mt-4">
                <div class="flex text-[#F59E0B] text-lg leading-none">
                    <i class="ph-fill ph-star"></i><i class="ph-fill ph-star"></i><i class="ph-fill ph-star"></i><i class="ph-fill ph-star"></i><i class="ph-fill ph-star"></i>
                </div>
                <span class="text-white">Valoración 4,9 en Google</span>
                <span class="hidden md:inline text-white/20 px-2">|</span>
                <span class="hidden md:inline text-white">Más de 20 eventos producidos</span>
            </div>
        </div>
    </section>'''

# Let's replace the hero using re.sub
if not re.search(old_hero, content):
    print("Warning: old hero not found exactly, attempting a generic replace")
    # try replacing everything between <!-- 1. HERO SECTION --> and <!-- 2. VALUE PROPOSITION STRIP -->
    content = re.sub(r'<!-- 1\. HERO SECTION -->.*?<!-- 2\. VALUE PROPOSITION STRIP -->', new_hero + '\n\n    <!-- 2. VALUE PROPOSITION STRIP -->', content, flags=re.DOTALL)
else:
    content = re.sub(old_hero, new_hero, content)

# Now, replace the content of <div class="grid grid-cols-1 md:grid-cols-2 gap-6 reveal-up"> in Section 3
# The easiest way is to find <!-- Card 1 --> to the end of <!-- Card 4 --> div, and replace it.

old_grid = r'''                <!-- Card 1 -->
                <div class="glass-card p-8 md:p-10 rounded-\[2rem\] flex flex-col border border-white/5 group hover:border-primary/30 transition-all duration-300">
                    <h3 class="font-heading text-2xl font-bold text-white mb-3">Eventos corporativos</h3>
                    <p class="text-textSecondary text-sm mb-6 flex-grow">Presentaciones, cenas de empresa, jornadas y activaciones de marca\.</p>
                    <a href="/contacto" class="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-primary transition-colors mt-auto">
                        Ver detalles <i class="ph ph-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                    </a>
                </div>

                <!-- Card 2 -->
                <div class="glass-card p-8 md:p-10 rounded-\[2rem\] flex flex-col border border-white/5 group hover:border-primary/30 transition-all duration-300">
                    <h3 class="font-heading text-2xl font-bold text-white mb-3">Workshops & formaciones</h3>
                    <p class="text-textSecondary text-sm mb-6 flex-grow">Eventos educativos, ponencias y experiencias formativas\.</p>
                    <a href="/contacto" class="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-primary transition-colors mt-auto">
                        Ver detalles <i class="ph ph-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                    </a>
                </div>

                <!-- Card 3 -->
                <div class="glass-card p-8 md:p-10 rounded-\[2rem\] flex flex-col border border-white/5 group hover:border-primary/30 transition-all duration-300">
                    <h3 class="font-heading text-2xl font-bold text-white mb-3">Eventos de marca</h3>
                    <p class="text-textSecondary text-sm mb-6 flex-grow">Experiencias diseñadas para posicionar y conectar directamente con tu audiencia\.</p>
                    <a href="/contacto" class="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-primary transition-colors mt-auto">
                        Ver detalles <i class="ph ph-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                    </a>
                </div>

                <!-- Card 4 -->
                <div class="glass-card p-8 md:p-10 rounded-\[2rem\] flex flex-col border border-white/5 group hover:border-primary/30 transition-all duration-300">
                    <h3 class="font-heading text-2xl font-bold text-white mb-3">Producción integral</h3>
                    <p class="text-textSecondary text-sm mb-6 flex-grow">Coordinación completa antes, durante y después del evento para que no te preocupes de nada\.</p>
                    <a href="/contacto" class="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-primary transition-colors mt-auto">
                        Ver detalles <i class="ph ph-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                    </a>
                </div>'''

new_grid = '''                <div class="glass-card p-8 rounded-3xl border-white/5 hover:border-primary/30 transition-all group cursor-pointer flex flex-col text-left" onclick="window.location.href='/eventos/organizacion-de-eventos'">
                    <i class="ph-fill ph-calendar-check text-3xl text-primary mb-4 block group-hover:scale-110 transition-transform w-fit"></i>
                    <h3 class="text-xl font-heading text-white font-medium mb-2">Organización Integral</h3>
                    <p class="text-sm text-textSecondary mb-6 flex-grow">Planificación y producción completa del evento, desde el concepto hasta la ejecución en el día.</p>
                    <span class="inline-flex items-center text-primary text-sm font-medium hover:text-white transition-colors mt-auto">Saber más <i class="ph ph-arrow-right ml-1"></i></span>
                </div>
                <div class="glass-card p-8 rounded-3xl border-white/5 hover:border-primary/30 transition-all group cursor-pointer flex flex-col text-left" onclick="window.location.href='#'">
                    <i class="ph-fill ph-palette text-3xl text-primary mb-4 block group-hover:scale-110 transition-transform w-fit"></i>
                    <h3 class="text-xl font-heading text-white font-medium mb-2">Branding Visual del Evento</h3>
                    <p class="text-sm text-textSecondary mb-6 flex-grow">Imagen gráfica, cartelería, materiales e identidad visual coherente para que el evento comunique bien.</p>
                    <span class="inline-flex items-center text-primary text-sm font-medium hover:text-white transition-colors mt-auto">Saber más <i class="ph ph-arrow-right ml-1"></i></span>
                </div>
                <div class="glass-card p-8 rounded-3xl border-white/5 hover:border-primary/30 transition-all group cursor-pointer flex flex-col text-left" onclick="window.location.href='#'">
                    <i class="ph-fill ph-megaphone text-3xl text-primary mb-4 block group-hover:scale-110 transition-transform w-fit"></i>
                    <h3 class="text-xl font-heading text-white font-medium mb-2">Promoción Digital</h3>
                    <p class="text-sm text-textSecondary mb-6 flex-grow">Estrategia de contenido y redes sociales para llenar el aforo y generar expectación antes, durante y después.</p>
                    <span class="inline-flex items-center text-primary text-sm font-medium hover:text-white transition-colors mt-auto">Saber más <i class="ph ph-arrow-right ml-1"></i></span>
                </div>
                <div class="glass-card p-8 rounded-3xl border-white/5 hover:border-primary/30 transition-all group cursor-pointer flex flex-col text-left" onclick="window.location.href='#'">
                    <i class="ph-fill ph-target text-3xl text-primary mb-4 block group-hover:scale-110 transition-transform w-fit"></i>
                    <h3 class="text-xl font-heading text-white font-medium mb-2">Campañas Ads para Eventos</h3>
                    <p class="text-sm text-textSecondary mb-6 flex-grow">Publicidad segmentada en Meta y Google para maximizar inscripciones, entradas o asistentes.</p>
                    <span class="inline-flex items-center text-primary text-sm font-medium hover:text-white transition-colors mt-auto">Saber más <i class="ph ph-arrow-right ml-1"></i></span>
                </div>'''

if not re.search(old_grid, content):
    print("Warning: old grid not found exactly, doing generic replace on Section 3")
    content = re.sub(r'<!-- Card 1 -->.*?<!-- Card 4 -->.*?</div>\s*</div>\s*</section>', new_grid + '\n            </div>\n        </div>\n    </section>', content, flags=re.DOTALL)
else:
    content = re.sub(old_grid, new_grid, content)

with open('eventos/index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated eventos/index.html hero and services grid")
