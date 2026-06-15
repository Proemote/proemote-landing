import os
import re

# Definimos el nuevo bloque de cabecera estandarizado (Barra de anuncio + Navegación con Dropdown de Ayudas)
new_header_html = """    <!-- BARRA DE ANUNCIO GLOBAL -->
    <div id="announcement-bar" class="w-full bg-primary text-white py-2 px-10 text-xs md:text-sm font-medium z-[60] relative flex items-center justify-center min-h-[38px] overflow-hidden select-none">
        <!-- Flecha Izquierda -->
        <button onclick="prevAnnouncement()" aria-label="Anterior anuncio" class="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-1 focus:outline-none cursor-pointer">
            <i class="ph-bold ph-caret-left text-sm md:text-base"></i>
        </button>

        <!-- Contenedor del Texto (Solo se anima el texto, no el fondo) -->
        <div class="text-center transition-opacity duration-300 w-full max-w-4xl px-4" id="announcement-content" style="opacity: 1; transition: opacity 0.25s ease;">
            <span id="announcement-text">🔔 Nueva convocatoria: hasta 20.000€ para digitalizar tu negocio en Extremadura ·</span>
            <a id="announcement-link" href="/ayudas-digitalizacion-pymes-extremadura/" class="underline font-bold hover:text-white/80 transition-colors ml-1">Ver ayudas →</a>
        </div>

        <!-- Flecha Derecha -->
        <button onclick="nextAnnouncement()" aria-label="Siguiente anuncio" class="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-1 focus:outline-none cursor-pointer">
            <i class="ph-bold ph-caret-right text-sm md:text-base"></i>
        </button>
    </div>
    
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const announcements = [
                {
                    text: "🔔 Nueva convocatoria: hasta 20.000€ para digitalizar tu negocio en Extremadura ·",
                    linkText: "Ver ayudas →",
                    href: "/ayudas-digitalizacion-pymes-extremadura/"
                },
                {
                    text: "🚀 Subvenciones IA 2026: hasta 100.000€ para implantar Inteligencia Artificial en pymes ·",
                    linkText: "Ver ayudas de IA →",
                    href: "/ayudas-implementacion-ia-extremadura/"
                }
            ];
            
            let currentIndex = 0;
            let timer = null;
            const contentEl = document.getElementById('announcement-content');
            const textEl = document.getElementById('announcement-text');
            const linkEl = document.getElementById('announcement-link');
            
            function showAnnouncement(index) {
                if (!contentEl || !textEl || !linkEl) return;
                contentEl.style.opacity = 0;
                setTimeout(() => {
                    currentIndex = index;
                    textEl.innerText = announcements[currentIndex].text;
                    linkEl.innerText = announcements[currentIndex].linkText;
                    linkEl.href = announcements[currentIndex].href;
                    contentEl.style.opacity = 1;
                }, 250);
            }
            
            window.prevAnnouncement = function() {
                resetTimer();
                let prevIndex = (currentIndex - 1 + announcements.length) % announcements.length;
                showAnnouncement(prevIndex);
            };
            
            window.nextAnnouncement = function() {
                resetTimer();
                let nextIndex = (currentIndex + 1) % announcements.length;
                showAnnouncement(nextIndex);
            };
            
            function startTimer() {
                timer = setInterval(() => {
                    let nextIndex = (currentIndex + 1) % announcements.length;
                    showAnnouncement(nextIndex);
                }, 4500);
            }
            
            function resetTimer() {
                clearInterval(timer);
                startTimer();
            }
            
            startTimer();
        });
    </script>

    <div id="mouse-glow"></div>

    <!-- NAVEGACIÓN -->
    <nav class="fixed w-full z-50 glass-nav">
        <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <a href="https://proemote.es/" class="relative z-10 flex items-center transition-transform hover:scale-105 duration-300">
                <img src="/logo-header.png" alt="Proemote - Agencia de digitalización de pymes y subvención digital empresas Extremadura" class="h-8 md:h-10 w-auto object-contain" width="135" height="56">
            </a>
            <div class="hidden md:flex gap-8 text-sm font-medium text-textSecondary relative z-10 items-center">
                <a href="https://proemote.es/" class="hover:text-textMain transition-colors">Inicio</a>
                <a href="/#foco" class="hover:text-textMain transition-colors">Sistema</a>
                <a href="/servicios" id="services-menu-btn" class="hover:text-textMain transition-colors focus:outline-none">Servicios</a>
                
                <!-- DROPDOWN AYUDAS 2026 -->
                <div class="relative group py-2">
                    <a href="/subvenciones-extremadura/" class="hover:text-textMain transition-colors flex items-center gap-1.5 focus:outline-none">
                        Ayudas 2026 
                        <span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/20 text-primary border border-primary/30 leading-none">Nuevo</span>
                        <i class="ph ph-caret-down text-xs transition-transform group-hover:rotate-180"></i>
                    </a>
                    <div class="absolute top-full left-0 mt-1 w-64 bg-bgSurface/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 flex flex-col gap-2">
                        <a href="/ayudas-digitalizacion-pymes-extremadura/" class="p-2.5 rounded-xl hover:bg-white/5 transition-all flex items-start gap-3 group/item">
                            <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors flex-shrink-0">
                                <i class="ph-fill ph-device-mobile"></i>
                            </div>
                            <div>
                                <p class="text-white font-medium text-xs mb-0.5">Digitalización de Pymes</p>
                                <p class="text-[10px] text-textSecondary">Hasta 20.000€ · Web, SEO, Redes</p>
                            </div>
                        </a>
                        <a href="/ayudas-implementacion-ia-extremadura/" class="p-2.5 rounded-xl hover:bg-white/5 transition-all flex items-start gap-3 group/item">
                            <div class="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover/item:bg-accent group-hover/item:text-white transition-colors flex-shrink-0">
                                <i class="ph-fill ph-cpu"></i>
                            </div>
                            <div>
                                <p class="text-white font-medium text-xs mb-0.5">Implementación de IA</p>
                                <p class="text-[10px] text-textSecondary">Hasta 100.000€ · Automatización</p>
                            </div>
                        </a>
                    </div>
                </div>

                <a href="/sobre-nosotros" class="hover:text-textMain transition-colors">Sobre nosotros</a>
                <a href="https://proemote.es/portfolio" class="hover:text-textMain transition-colors">Portfolio</a>
                <a href="/contacto" class="hover:text-textMain transition-colors">Contacto</a>
            </div>
            <div class="flex items-center gap-4 relative z-10">
                <a href="#contacto" class="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-primary rounded-full hover:bg-accent shadow-[0_0_15px_rgba(123,97,255,0.4)] transition-all duration-300 focus:outline-none">
                    Analizar mi caso
                </a>
                <button id="mobile-menu-btn" aria-label="Abrir menú de navegación" class="md:hidden text-textSecondary hover:text-white transition-colors focus:outline-none p-2">
                    <i class="ph ph-dots-three-vertical text-2xl"></i>
                </button>
            </div>
        </div>

        <!-- Menú Móvil -->
        <div id="mobile-menu" class="hidden md:hidden absolute top-full left-0 w-full bg-bgSurface/95 backdrop-blur-xl border-b border-white/10 shadow-2xl overflow-hidden transition-all duration-300">
            <div class="flex flex-col py-6 px-6 gap-6">
                <a href="https://proemote.es/" class="text-base font-medium text-textSecondary hover:text-white transition-colors">Inicio</a>
                <a href="/servicios" id="services-menu-btn-mobile" class="text-left text-base font-medium text-textSecondary hover:text-white transition-colors focus:outline-none">Servicios</a>
                
                <div class="flex flex-col gap-2.5 pl-2 border-l border-white/10 my-1">
                    <span class="text-xs font-bold tracking-widest text-textSecondary uppercase mb-1 flex items-center gap-1.5">Convocatorias 2026 <span class="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-primary/20 text-primary border border-primary/30">Nuevas</span></span>
                    <a href="/ayudas-digitalizacion-pymes-extremadura/" class="text-sm font-medium text-textSecondary hover:text-white transition-colors flex items-center gap-2">
                        <i class="ph ph-device-mobile text-primary"></i> Digitalización de Pymes
                    </a>
                    <a href="/ayudas-implementacion-ia-extremadura/" class="text-sm font-medium text-textSecondary hover:text-white transition-colors flex items-center gap-2 mt-1">
                        <i class="ph ph-cpu text-accent"></i> Implementación de IA
                    </a>
                </div>

                <a href="/sobre-nosotros" class="text-base font-medium text-textSecondary hover:text-white transition-colors">Sobre nosotros</a>
                <a href="https://proemote.es/portfolio" class="text-base font-medium text-textSecondary hover:text-white transition-colors">Portfolio</a>
                <a href="/contacto" class="text-left text-base font-medium text-textSecondary hover:text-white transition-colors">Contacto</a>
                <a href="#contacto" class="inline-flex justify-center items-center px-6 py-3 mt-4 text-sm font-bold text-white bg-primary rounded-full shadow-[0_0_15px_rgba(123,97,255,0.4)] focus:outline-none">
                    Analizar mi caso
                </a>
            </div>
        </div>
    </nav>
    <script>
    /* Fix: sync announcement bar (fixed) + nav position */
    (function(){
        var bar = document.getElementById('announcement-bar');
        var nav = document.querySelector('.glass-nav');
        if (!bar || !nav) return;
        bar.style.position = 'fixed';
        bar.style.top = '0';
        bar.style.left = '0';
        bar.style.right = '0';
        bar.style.zIndex = '70';
        
        var spacer = document.getElementById('announcement-spacer');
        if (!spacer) {
            spacer = document.createElement('div');
            spacer.id = 'announcement-spacer';
            spacer.setAttribute('aria-hidden', 'true');
            bar.parentNode.insertBefore(spacer, bar.nextSibling);
        }
        function syncHeader() {
            var h = bar.offsetHeight;
            nav.style.top = h + 'px';
            spacer.style.height = h + 'px';
        }
        syncHeader();
        window.addEventListener('load', syncHeader);
        window.addEventListener('resize', syncHeader);
    })();
    </script>"""

# Buscar todos los archivos HTML
html_files = []
for root, dirs, files in os.walk('.'):
    if '.gemini' in root or '.git' in root or 'nexum-cars' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            html_files.append(os.path.join(root, file))

for file_path in html_files:
    # Omitir archivos plantilla o de soporte
    if any(p in file_path for p in ['standard_nav.html', 'new_mega_menu.html', 'tabs_menu.html', 'tabs_output.html', 'reviews.html']):
        continue
        
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Reemplazar la barra de anuncios y la etiqueta nav
    # Buscamos desde <!-- BARRA DE ANUNCIO GLOBAL --> o <div id="announcement-bar" hasta </nav>
    pattern = r'(?:<!-- BARRA DE ANUNCIO GLOBAL -->\s*)?<div id="announcement-bar".*?</nav>'
    if re.search(pattern, content, re.DOTALL):
        new_content = re.sub(pattern, new_header_html, content, flags=re.DOTALL)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated header in {file_path}")
    else:
        # Si no tiene barra de anuncio pero tiene <nav>, reemplazamos solo <nav>
        nav_pattern = r'<nav.*?</nav>'
        if re.search(nav_pattern, content, re.DOTALL):
            # En este caso inyectamos la barra de anuncios justo antes del nav
            full_header = new_header_html
            new_content = re.sub(nav_pattern, full_header, content, flags=re.DOTALL)
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Injected and updated header in {file_path}")
