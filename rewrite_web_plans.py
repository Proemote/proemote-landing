import re

with open('diseno-web-SEO/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# ----------------- ONE PAGE -----------------
one_page_content = """
                    <!-- Plan 1: One Page -->
                    <div class="relative p-8 rounded-[2.5rem] border border-primary/20 bg-primary/5 backdrop-blur-xl shadow-[0_0_30px_rgba(123,97,255,0.05)] hover:shadow-[0_0_50px_rgba(123,97,255,0.15)] hover:border-primary/40 transition-all duration-500 flex flex-col h-full overflow-hidden group tilt-effect">
                        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-primary/10 to-transparent blur-[40px] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div class="inline-flex items-center gap-2 text-white font-bold text-sm tracking-wider uppercase mb-4 relative z-10">
                            Más asequible
                        </div>
                        <div class="text-2xl lg:text-3xl font-bold font-heading text-primary mb-2 relative z-10 flex items-center gap-2">One Page 📲</div>
                        <p class="text-sm text-textSecondary mb-8 min-h-[40px] relative z-10">Presencia profesional y rápida para empezar a moverte online.</p>
                        
                        <ul class="space-y-4 mb-8 flex-grow relative z-10">
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Web de una sola página tipo scroll</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Hasta 5 bloques: quién eres, qué ofreces, beneficios, testimonios, contacto</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Diseño responsive completo</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Integración de WhatsApp o formulario simple</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>SEO básico on-page</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Instalación y configuración inicial</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Enlaces a perfiles sociales</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>1 revisión incluida</span></li>
                        </ul>
                        
                        <a href="https://wa.me/34641576286?text=Buenas!%20Estaba%20visitando%20vuestra%20web%20y%20quer%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20plan%20de%20dise%C3%B1o%20web%20One%20Page" target="_blank" rel="noopener noreferrer" class="relative z-10 w-full py-4 rounded-full border border-primary/30 text-center font-bold text-white hover:bg-primary transition-all block mt-auto focus:outline-none">👉🏼 Me interesa</a>
                    </div>
"""

# ----------------- STARTER -----------------
starter_content = """
                    <!-- Plan 2: Starter -->
                    <div class="relative p-8 rounded-[2.5rem] border border-primary/20 bg-primary/5 backdrop-blur-xl shadow-[0_0_30px_rgba(123,97,255,0.05)] hover:shadow-[0_0_50px_rgba(123,97,255,0.15)] hover:border-primary/40 transition-all duration-500 flex flex-col h-full overflow-hidden group tilt-effect">
                        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-primary/10 to-transparent blur-[40px] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div class="inline-flex items-center gap-2 text-white font-bold text-sm tracking-wider uppercase mb-4 relative z-10">
                            Más popular
                        </div>
                        <div class="text-2xl lg:text-3xl font-bold font-heading text-primary mb-2 relative z-10 flex items-center gap-2">Web Starter 🌱</div>
                        <p class="text-sm text-textSecondary mb-8 min-h-[40px] relative z-10">Todo lo básico para que tus clientes te encuentren y te contacten.</p>
                        
                        <ul class="space-y-4 mb-8 flex-grow relative z-10">
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Hasta 3–4 secciones (Inicio, Sobre nosotros, Servicios, Contacto)</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Diseño responsive completo</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Diseño web a medida</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Integración de WhatsApp, email o formulario de contacto</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>SEO básico on-page</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Configuración de Google Search Console</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Geolocalización con mapa</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Autogestionable (WordPress)</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>1 revisión incluida</span></li>
                        </ul>
                        
                        <a href="https://wa.me/34641576286?text=Buenas!%20Estaba%20visitando%20vuestra%20web%20y%20quer%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20plan%20de%20dise%C3%B1o%20web%20Starter" target="_blank" rel="noopener noreferrer" class="relative z-10 w-full py-4 rounded-full border border-primary/30 text-center font-bold text-white hover:bg-primary transition-all block mt-auto focus:outline-none">👉🏼 Me interesa</a>
                    </div>
"""

# ----------------- PRO -----------------
pro_content = """
                    <!-- Plan 3: Pro -->
                    <div class="relative p-8 rounded-[2.5rem] border-2 border-primary/50 bg-primary/10 backdrop-blur-2xl shadow-[0_0_50px_rgba(123,97,255,0.15)] hover:shadow-[0_0_70px_rgba(123,97,255,0.25)] hover:border-primary transition-all duration-500 flex flex-col h-full overflow-hidden group transform lg:scale-105 tilt-effect z-20">
                        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-primary/30 to-transparent blur-[50px] pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div class="absolute -top-px left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white text-[10px] sm:text-xs font-bold px-6 py-2 rounded-b-xl uppercase tracking-widest shadow-[0_0_20px_rgba(123,97,255,0.4)] z-20 border-x border-b border-primary/30 whitespace-nowrap">
                            ⭐ Más solicitado
                        </div>
                        
                        <div class="text-2xl lg:text-3xl font-bold font-heading text-primary mb-2 mt-6 relative z-10 flex items-center gap-2">Web Pro 💼</div>
                        <p class="text-sm text-white/80 mb-8 min-h-[40px] relative z-10">Nuestro plan recomendado. Una web que convierte.</p>
                        
                        <ul class="space-y-4 mb-8 flex-grow relative z-10">
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Hasta 5–7 secciones</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Diseño elaborado con bloques visuales diferenciados</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>SEO básico completo y estructura para conversión (CRO)</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Hasta 2 formularios optimizados</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Integración con redes sociales, WhatsApp y email marketing</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Sección de blog configurada</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Motor de búsqueda interno</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Geolocalización con mapa</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Autogestionable (WordPress)</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>2 revisiones incluidas</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Formación final para gestionar la web</span></li>
                        </ul>
                        
                        <a href="https://wa.me/34641576286?text=Buenas!%20Estaba%20visitando%20vuestra%20web%20y%20quer%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20plan%20de%20dise%C3%B1o%20web%20Pro" target="_blank" rel="noopener noreferrer" class="relative z-10 w-full py-4 rounded-full bg-primary text-center font-bold text-white hover:bg-accent transition-all block mt-auto shadow-[0_0_20px_rgba(123,97,255,0.4)] focus:outline-none">👉🏼 Me interesa</a>
                    </div>
"""

# ----------------- ELITE -----------------
elite_content = """
                    <!-- Plan 4: Elite -->
                    <div class="relative p-8 rounded-[2.5rem] border border-primary/20 bg-primary/5 backdrop-blur-xl shadow-[0_0_30px_rgba(123,97,255,0.05)] hover:shadow-[0_0_50px_rgba(123,97,255,0.15)] hover:border-primary/40 transition-all duration-500 flex flex-col h-full overflow-hidden group tilt-effect">
                        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-primary/10 to-transparent blur-[40px] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div class="inline-flex items-center gap-2 text-white font-bold text-sm tracking-wider uppercase mb-4 relative z-10">
                            Más completa
                        </div>
                        <div class="text-2xl lg:text-3xl font-bold font-heading text-primary mb-2 relative z-10 flex items-center gap-2">Web Elite 👑</div>
                        <p class="text-sm text-textSecondary mb-8 min-h-[40px] relative z-10">Diseño premium, copywriting persuasivo y SEO avanzado.</p>
                        
                        <ul class="space-y-4 mb-8 flex-grow relative z-10">
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Hasta 8–10 secciones</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Animaciones suaves y microinteracciones</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Copywriting completo y persuasivo incluido</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>SEO on-page avanzado (arquitectura H, keywords base, semántica)</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Blog configurado + 1 post de ejemplo</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Integraciones externas (CRM simple, Calendly, email marketing)</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Motor de búsqueda interno</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Geolocalización con mapa</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>Autogestionable (WordPress)</span></li>
                            <li class="flex items-start gap-3 text-sm text-white"><i class="ph-fill ph-check-circle text-primary mt-0.5 text-lg"></i> <span>2 revisiones completas + formación ampliada</span></li>
                        </ul>
                        
                        <a href="https://wa.me/34641576286?text=Buenas!%20Estaba%20visitando%20vuestra%20web%20y%20quer%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20plan%20de%20dise%C3%B1o%20web%20Elite" target="_blank" rel="noopener noreferrer" class="relative z-10 w-full py-4 rounded-full border border-primary/30 text-center font-bold text-white hover:bg-primary transition-all block mt-auto focus:outline-none">👉🏼 Me interesa</a>
                    </div>
"""

# Replace the grid content
pattern = re.compile(r'<!-- Plan 1: One Page -->.*?</div>\s*</div>\s*<!-- Plan 5: A Medida', re.DOTALL)

replacement = f"{one_page_content.strip()}\n\n{starter_content.strip()}\n\n{pro_content.strip()}\n\n{elite_content.strip()}\n\n                </div>\n\n                <!-- Plan 5: A Medida"

new_content = pattern.sub(replacement, content)

with open('diseno-web-SEO/index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated design web plans successfully.")

