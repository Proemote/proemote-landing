import os
import re

root_dir = '/Users/carlosmolinamarquez/Desktop/proemote-landing'

new_header_html = """<!-- START GLOBAL HEADER -->
    <!-- BARRA DE ANUNCIO GLOBAL -->
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
    <div class="fixed w-full z-[60] flex justify-center px-4 pointer-events-none transition-all duration-300" id="nav-container">
        <nav class="glass-nav pointer-events-auto w-full max-w-5xl bg-[#09090b]/90 backdrop-blur-xl border border-white/10 rounded-full flex justify-between items-center px-4 md:px-6 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
            <a href="https://proemote.es/" class="relative z-10 flex items-center transition-transform hover:scale-105 duration-300">
                <img src="/logo-header.png" alt="Proemote - Agencia de digitalización" class="h-6 md:h-8 w-auto object-contain">
            </a>
            
            <div class="hidden md:flex gap-6 text-[13px] font-medium text-textSecondary relative z-10 items-center">
                <a href="https://proemote.es/" class="hover:text-white transition-colors">Inicio</a>
                <a href="/#foco" class="hover:text-white transition-colors">Sistema</a>
                <a href="/servicios" id="services-menu-btn" class="hover:text-white transition-colors focus:outline-none">Servicios</a>
                
                <!-- DROPDOWN AYUDAS 2026 -->
                <div class="relative group py-2">
                    <a href="/subvenciones-extremadura/" class="hover:text-white transition-colors flex items-center gap-1.5 focus:outline-none">
                        Ayudas 2026 
                        <span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/20 text-primary border border-primary/30 leading-none">Nuevo</span>
                        <i class="ph ph-caret-down text-xs transition-transform group-hover:rotate-180"></i>
                    </a>
                    <div class="absolute top-full left-0 mt-4 w-64 bg-bgSurface/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 flex flex-col gap-2 pointer-events-auto">
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

                <a href="/sobre-nosotros" class="hover:text-white transition-colors">Sobre nosotros</a>
                <a href="https://proemote.es/portfolio" class="hover:text-white transition-colors">Portfolio</a>
                <a href="/contacto" class="hover:text-white transition-colors">Contacto</a>
            </div>

            <div class="flex items-center gap-3 relative z-10">
                <button id="theme-toggle" aria-label="Toggle dark mode" class="w-10 h-6 bg-[#1a1a1a] border border-white/10 rounded-full flex items-center px-1 text-white/40 hover:text-white transition-colors pointer-events-auto">
                    <i class="ph ph-moon text-[11px]"></i>
                </button>
                <a href="#contacto" class="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-[13px] font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] transition-all duration-300 focus:outline-none pointer-events-auto">
                    Analizar mi caso
                </a>
                <button id="mobile-menu-btn" aria-label="Abrir menú de navegación" class="md:hidden text-white/60 hover:text-white transition-colors focus:outline-none p-1 pointer-events-auto">
                    <i class="ph ph-list text-2xl"></i>
                </button>
            </div>
        </nav>

        <!-- Menú Móvil (Fuera de la píldora para que no quede restringido) -->
        <div id="mobile-menu" class="hidden absolute top-full mt-4 left-4 right-4 bg-bgSurface/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 pointer-events-auto">
            <div class="flex flex-col py-6 px-6 gap-6">
                <a href="https://proemote.es/" class="mobile-link text-base font-medium text-textSecondary hover:text-white transition-colors">Inicio</a>
                <a href="/servicios" class="mobile-link text-left text-base font-medium text-textSecondary hover:text-white transition-colors focus:outline-none">Servicios</a>
                
                <div class="flex flex-col gap-2.5 pl-2 border-l border-white/10 my-1">
                    <span class="text-xs font-bold tracking-widest text-textSecondary uppercase mb-1 flex items-center gap-1.5">Convocatorias 2026 <span class="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-primary/20 text-primary border border-primary/30">Nuevas</span></span>
                    <a href="/ayudas-digitalizacion-pymes-extremadura/" class="mobile-link text-sm font-medium text-textSecondary hover:text-white transition-colors flex items-center gap-2">
                        <i class="ph ph-device-mobile text-primary"></i> Digitalización de Pymes
                    </a>
                    <a href="/ayudas-implementacion-ia-extremadura/" class="mobile-link text-sm font-medium text-textSecondary hover:text-white transition-colors flex items-center gap-2 mt-1">
                        <i class="ph ph-cpu text-accent"></i> Implementación de IA
                    </a>
                </div>

                <a href="/sobre-nosotros" class="mobile-link text-base font-medium text-textSecondary hover:text-white transition-colors">Sobre nosotros</a>
                <a href="https://proemote.es/portfolio" class="mobile-link text-base font-medium text-textSecondary hover:text-white transition-colors">Portfolio</a>
                <a href="/contacto" class="mobile-link text-left text-base font-medium text-textSecondary hover:text-white transition-colors">Contacto</a>
                <a href="#contacto" class="mobile-link inline-flex justify-center items-center px-6 py-3 mt-4 text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.4)] focus:outline-none">
                    Analizar mi caso
                </a>
                <!-- Botón Dark Mode Móvil -->
                <button id="mobile-theme-toggle" class="flex items-center justify-center gap-2 text-textSecondary hover:text-white text-sm font-medium transition-colors pointer-events-auto py-2">
                    <i class="ph ph-sun text-lg"></i> Cambiar tema
                </button>
            </div>
        </div>
    </div>
    
    <script>
    /* Fix: sync announcement bar (fixed) + nav position */
    (function(){
        var bar = document.getElementById('announcement-bar');
        var navContainer = document.getElementById('nav-container');
        if (!bar || !navContainer) return;
        
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
            navContainer.style.top = (h + 16) + 'px'; // 16px gap above the pill
            spacer.style.height = h + 'px';
        }
        syncHeader();
        window.addEventListener('load', syncHeader);
        window.addEventListener('resize', syncHeader);
    })();

    document.addEventListener('DOMContentLoaded', () => {
        // --- Mobile Menu Toggle ---
        const menuBtn = document.getElementById("mobile-menu-btn");
        const menu = document.getElementById("mobile-menu");
        const mobileLinks = document.querySelectorAll("#mobile-menu .mobile-link");
        
        function toggleMenu() {
            if (menu) menu.classList.toggle("hidden");
        }
        
        if (menuBtn) menuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMenu();
        });
        
        if (mobileLinks) {
            mobileLinks.forEach(link => {
                link.addEventListener("click", () => {
                    if (menu) menu.classList.add("hidden");
                });
            });
        }
        
        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (menu && !menu.classList.contains("hidden") && !menu.contains(e.target) && e.target !== menuBtn) {
                menu.classList.add("hidden");
            }
        });

        // --- Theme Toggle Logic ---
        const themeToggle = document.getElementById("theme-toggle");
        const mobileThemeToggle = document.getElementById("mobile-theme-toggle");
        const htmlElement = document.documentElement;
        
        function toggleTheme() {
            htmlElement.classList.toggle("dark");
            if (htmlElement.classList.contains("dark")) {
                localStorage.theme = "dark";
            } else {
                localStorage.theme = "light";
            }
            window.dispatchEvent(new Event('storage'));
        }
        
        if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
        if (mobileThemeToggle) mobileThemeToggle.addEventListener("click", toggleTheme);
    });
    </script>
<!-- END GLOBAL HEADER -->"""

unified_cta_html = """<!-- FINAL CTA (UNIFIED CARD BOX) -->
    <section class="py-24 relative z-10">
        <div class="max-w-5xl mx-auto px-6 text-center reveal-up">
            <div class="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-16 lg:p-20 border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#0B061A]/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] group transition-all duration-300">
                <!-- Brillo de fondo sutil para el efecto de profundidad -->
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full bg-gradient-to-b from-primary/10 to-transparent blur-[80px] pointer-events-none transition-opacity duration-500 opacity-60 group-hover:opacity-100"></div>
                
                <div class="relative z-10 flex flex-col items-center">
                    <h2 class="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">Tu negocio ya tiene potencial.<br> Ahora necesita estructura.</h2>
                    <p class="text-lg md:text-xl text-gray-600 dark:text-white/70 mb-10 max-w-2xl mx-auto font-light">Cuéntanos qué necesitas. Te respondemos en menos de 24h.</p>
                    
                    <!-- Medios de contacto linkados (Image 2 style) -->
                    <div class="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-10 text-gray-700 dark:text-white/80 font-medium text-sm">
                        <a href="mailto:info@proemote.es" class="flex items-center gap-2 hover:text-primary transition-colors">
                            <i class="ph ph-envelope text-lg text-primary"></i>
                            info@proemote.es
                        </a>
                        <div class="flex items-center gap-2">
                            <i class="ph ph-phone text-lg text-primary"></i>
                            <a href="tel:+34641576286" class="hover:text-primary transition-colors">+34 641 57 62 86</a>
                            <span class="text-gray-300 dark:text-white/20">/</span>
                            <a href="tel:+34924315164" class="hover:text-primary transition-colors">924 31 51 64</a>
                        </div>
                        <a href="https://wa.me/34641576286" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 hover:text-primary transition-colors">
                            <i class="ph ph-whatsapp-logo text-lg text-primary"></i>
                            WhatsApp
                        </a>
                    </div>

                    <!-- Botones CTA principal y secundario (Image 3 style) -->
                    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                        <a href="https://wa.me/34641576286" target="_blank" rel="noopener" class="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-accent transition-all duration-300 shadow-[0_0_20px_rgba(123,97,255,0.4)]">
                            Contacta con nosotros
                        </a>
                        <a href="/portfolio" class="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-4 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white font-bold rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300">
                            Ver portfolio
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>"""

html_files = []
for root, dirs, files in os.walk(root_dir):
    if '.gemini' in root or '.git' in root or 'nexum-cars' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            html_files.append(os.path.join(root, file))

for fp in html_files:
    if any(p in fp for p in ['standard_nav.html', 'new_mega_menu.html', 'tabs_menu.html', 'tabs_output.html', 'reviews.html', 'diseno-web-SEO/index.html']):
        continue
        
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # --- STEP 1: Replace/Clean Header block ---
    body_match = re.search(r'<body[^>]*>', content, re.IGNORECASE)
    if body_match:
        # Find start of hero/content section
        hero_markers = [
            r'<!-- 1\. HERO -->',
            r'<!-- 1\. HERO SECTION -->',
            r'<!-- HERO SECTION -->',
            r'<!-- HERO -->',
            r'<!-- 1\. DETALLE CASO -->',
            r'<!-- CONTENIDO -->',
            r'<main',
            r'<!-- SECCIÓN AVISO LEGAL -->',
            r'<!-- AVISO LEGAL -->',
            r'<!-- PRIVACIDAD -->',
            r'<!-- SECCIÓN POLÍTICA PRIVACIDAD -->',
            r'<!-- 1\. CONTENIDO -->',
            r'<!-- 1\. GRACIAS -->'
        ]
        hero_pos = -1
        for marker in hero_markers:
            m = re.search(marker, content, re.IGNORECASE)
            if m:
                if hero_pos == -1 or m.start() < hero_pos:
                    hero_pos = m.start()
                    
        if hero_pos == -1:
            sect_match = re.search(r'<section', content, re.IGNORECASE)
            if sect_match:
                hero_pos = sect_match.start()
                
        if hero_pos != -1:
            body_end = body_match.end()
            clean_header_region = "\n    " + new_header_html + "\n\n    "
            content = content[:body_end] + clean_header_region + content[hero_pos:]
            print(f"Header standardized & cleaned: {os.path.relpath(fp, root_dir)}")

    # Re-read content after header replacement to continue fixes
    # --- STEP 2: Make contact-modal script safe by wrapping in IIFE safely ---
    modal_script_pattern = r'<!-- Scripts de Modal -->\s*<script>.*?</script>'
    safe_modal_script = """<!-- Scripts de Modal -->
    <script>
      (function() {
        const contactModal = document.getElementById("contact-modal");
        if (!contactModal) return;
        const modalInner = contactModal.querySelector("div");
        if (!modalInner) return;

        window.openModal = function(fase = "") {
          contactModal.classList.remove("hidden");
          setTimeout(() => {
            contactModal.classList.remove("opacity-0");
            modalInner.classList.remove("scale-95");
          }, 10);
          document.body.style.overflow = "hidden";

          if (fase) {
            const faseSelects = document.querySelectorAll('select[name="Fase"]');
            faseSelects.forEach((select) => {
              select.value = fase;
            });
          } else {
            const faseSelects = document.querySelectorAll('select[name="Fase"]');
            faseSelects.forEach((select) => {
              select.value = "";
            });
          }
        };

        window.closeModal = function() {
          contactModal.classList.add("opacity-0");
          modalInner.classList.add("scale-95");
          setTimeout(() => {
            contactModal.classList.add("hidden");
            document.body.style.overflow = "";
          }, 300);
        };

        contactModal.addEventListener("click", (e) => {
          if (e.target === contactModal) {
            closeModal();
          }
        });

        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape" && !contactModal.classList.contains("hidden")) {
            closeModal();
          }
        });
      })();
    </script>"""
    
    if re.search(modal_script_pattern, content, re.DOTALL):
        content = re.sub(modal_script_pattern, safe_modal_script, content, flags=re.DOTALL)
        print(f"  Modal script replaced with clean safe IIFE on {os.path.relpath(fp, root_dir)}")
    else:
        # Support other inline script variations of openModal/closeModal
        content = content.replace(
            "function openModal() {",
            "function openModal() {\n            const modal = document.getElementById('contact-modal');\n            if (!modal) return;\n            const inner = modal.querySelector('div');\n            if (!inner) return;"
        )
        content = content.replace(
            "function closeModal() {",
            "function closeModal() {\n            const modal = document.getElementById('contact-modal');\n            if (!modal) return;\n            const inner = modal.querySelector('div');\n            if (!inner) return;"
        )

    # --- STEP 3: Make mouse-glow safe by checking 'if (glow)' inside event listeners and animateGlow ---
    content = content.replace(
        'document.addEventListener("mousemove", (e) => {\n        mouseX = e.clientX;\n        mouseY = e.clientY;\n        glow.style.opacity = "1";\n      });',
        'document.addEventListener("mousemove", (e) => {\n        mouseX = e.clientX;\n        mouseY = e.clientY;\n        if (glow) glow.style.opacity = "1";\n      });'
    )
    content = content.replace(
        'document.addEventListener("mouseleave", () => {\n        glow.style.opacity = "0";\n      });',
        'document.addEventListener("mouseleave", () => {\n        if (glow) glow.style.opacity = "0";\n      });'
    )
    content = content.replace(
        'glow.style.left = `${glowX}px`;\n        glow.style.top = `${glowY}px`;',
        'if (glow) {\n          glow.style.left = `${glowX}px`;\n          glow.style.top = `${glowY}px`;\n        }'
    )

    # --- STEP 4: Clean up legacy theme toggles and mobile menu toggles at the bottom of the files ---
    theme_idx = content.find('// --- Theme Toggle Logic ---')
    if theme_idx != -1:
        end_idx = content.find('// Lógica Hover Mega Menú', theme_idx)
        if end_idx == -1:
            end_idx = content.find('// Lógica Hover Mega', theme_idx)
        if end_idx == -1:
            end_idx = content.find('</script>', theme_idx)
        if end_idx != -1:
            content = content[:theme_idx] + "\n      " + content[end_idx:]
            print(f"  Theme toggle logic stripped from bottom: {os.path.relpath(fp, root_dir)}")

    menu_idx = content.find('// --- Menu Toggle ---')
    if menu_idx != -1:
        end_idx = content.find('// Lógica Hover Mega Menú', menu_idx)
        if end_idx == -1:
            end_idx = content.find('</script>', menu_idx)
        if end_idx != -1:
            content = content[:menu_idx] + "\n      " + content[end_idx:]
            print(f"  Menu toggle logic stripped from bottom: {os.path.relpath(fp, root_dir)}")

    # --- STEP 5: Standardize reviews section classes ---
    content = content.replace('dark:bg-bgSurface', 'dark:bg-[#14141F]')
    content = content.replace('dark:text-textSecondary text-sm font-light leading-relaxed', 'dark:text-white/70 text-sm font-light leading-relaxed')

    # --- STEP 6: Replace Final CTA ---
    cta_markers = [
        r'<!--\s*9\.\s*FINAL CTA\s*-->',
        r'<!--\s*7\.\s*CTA FINAL\s*-->',
        r'<!--\s*7\.\s*FINAL CTA SECTION\s*-->',
        r'<!--\s*FINAL CTA SECTION\s*-->',
        r'<!--\s*FINAL CTA\s*-->',
        r'<!--\s*CTA FINAL\s*-->'
    ]
    cta_pos = -1
    for marker in cta_markers:
        m = re.search(marker, content, re.IGNORECASE)
        if m:
            cta_pos = m.start()
            break
            
    if cta_pos != -1:
        footer_markers = [
            r'<!--\s*FOOTER\s*-->',
            r'<!--\s*\d+\.\s*FOOTER\s*-->',
            r'<footer'
        ]
        footer_pos = -1
        for marker in footer_markers:
            m = re.search(marker, content, re.IGNORECASE)
            if m:
                footer_pos = m.start()
                break
                
        if footer_pos != -1 and footer_pos > cta_pos:
            content = content[:cta_pos] + unified_cta_html + "\n\n    " + content[footer_pos:]
            print(f"  Final CTA unified: {os.path.relpath(fp, root_dir)}")

    with open(fp, 'w', encoding='utf-8') as f:
        f.write(content)

# --- STEP 7: Update index.html Tailwind configuration ---
index_path = os.path.join(root_dir, 'index.html')
if os.path.exists(index_path):
    with open(index_path, 'r', encoding='utf-8') as f:
        index_content = f.read()
        
    if "bgSurface:" not in index_content:
        index_content = index_content.replace(
            "colors: {",
            "colors: {\n                        bgSurface: '#14141F',\n                        textSecondary: '#A1A1B5',"
        )
        with open(index_path, 'w', encoding='utf-8') as f:
            f.write(index_content)
        print("Tailwind colors bgSurface and textSecondary added to index.html config.")

# --- STEP 8: Update sync_navigation.py with the correct pattern ---
sync_path = os.path.join(root_dir, 'sync_navigation.py')
if os.path.exists(sync_path):
    with open(sync_path, 'r', encoding='utf-8') as f:
        sync_content = f.read()
        
    sync_content = sync_content.replace(
        "pattern = r'(?:<!-- BARRA DE ANUNCIO GLOBAL -->\\s*)?<div id=\"announcement-bar\".*?</nav>'",
        "pattern = r'<!-- START GLOBAL HEADER -->.*?<!-- END GLOBAL HEADER -->'"
    )
    sync_content = re.sub(
        r'new_header_html = """.*?"""',
        f'new_header_html = """{new_header_html}"""',
        sync_content,
        flags=re.DOTALL
    )
    with open(sync_path, 'w', encoding='utf-8') as f:
        f.write(sync_content)
    print("sync_navigation.py updated to use marked header blocks.")
