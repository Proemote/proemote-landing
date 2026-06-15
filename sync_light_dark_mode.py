import os
import re

# Clean new header
new_header_html = """    <div class="fixed top-6 left-0 w-full z-50 flex justify-center px-4">
        <header class="w-full max-w-5xl backdrop-blur-xl bg-white/80 dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-full flex items-center justify-between px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-colors duration-300">
            <a href="https://proemote.es/" class="relative z-10 flex items-center transition-transform hover:scale-105 duration-300">
                <img src="/logo-header.png" alt="Proemote - Agencia de digitalización" class="h-6 md:h-8 w-auto object-contain dark:invert-0 invert">
            </a>

            <div class="hidden md:flex gap-6 text-[13px] font-medium text-gray-600 dark:text-white/60 relative z-10 items-center">
                <a href="https://proemote.es/" class="hover:text-gray-900 dark:hover:text-white transition-colors">Inicio</a>
                <a href="/#foco" class="hover:text-gray-900 dark:hover:text-white transition-colors">Sistema</a>
                <a href="/servicios" id="services-menu-btn" class="hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none">Servicios</a>
                
                <!-- DROPDOWN AYUDAS 2026 -->
                <div class="relative group py-2">
                    <a href="/subvenciones-extremadura/" class="hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1.5 focus:outline-none">
                        Ayudas 2026 
                        <span class="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/20 text-primary border border-primary/30 leading-none">Nuevo</span>
                        <i class="ph ph-caret-down text-xs transition-transform group-hover:rotate-180"></i>
                    </a>
                    <div class="absolute top-full left-0 mt-4 w-64 bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-4 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 flex flex-col gap-2 pointer-events-auto">
                        <a href="/ayudas-digitalizacion-pymes-extremadura/" class="p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex items-start gap-3 group/item">
                            <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors flex-shrink-0">
                                <i class="ph-fill ph-device-mobile"></i>
                            </div>
                            <div>
                                <p class="text-gray-900 dark:text-white font-medium text-xs mb-0.5">Digitalización de Pymes</p>
                                <p class="text-[10px] text-gray-500 dark:text-white/40">Hasta 20.000€ · Web, SEO, Redes</p>
                            </div>
                        </a>
                        <a href="/ayudas-implementacion-ia-extremadura/" class="p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex items-start gap-3 group/item">
                            <div class="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover/item:bg-accent group-hover/item:text-white transition-colors flex-shrink-0">
                                <i class="ph-fill ph-cpu"></i>
                            </div>
                            <div>
                                <p class="text-gray-900 dark:text-white font-medium text-xs mb-0.5">Implementación de IA</p>
                                <p class="text-[10px] text-gray-500 dark:text-white/40">Hasta 100.000€ · Automatización</p>
                            </div>
                        </a>
                    </div>
                </div>

                <a href="/sobre-nosotros" class="hover:text-gray-900 dark:hover:text-white transition-colors">Sobre nosotros</a>
                <a href="https://proemote.es/portfolio" class="hover:text-gray-900 dark:hover:text-white transition-colors">Portfolio</a>
                <a href="/contacto" class="hover:text-gray-900 dark:hover:text-white transition-colors">Contacto</a>
            </div>

            <div class="hidden md:flex items-center gap-4 relative z-10">
                <button id="theme-toggle" class="flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300 bg-gray-200 dark:bg-zinc-950 border border-gray-300 dark:border-zinc-800 relative outline-none" aria-label="Toggle Dark Mode">
                    <div class="flex justify-between items-center w-full h-full relative">
                        <div id="icon-sun" class="absolute left-0 flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300 transform translate-x-0 bg-white shadow-sm dark:bg-transparent dark:translate-x-8 dark:opacity-0">
                            <svg class="w-4 h-4 text-gray-700 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1.5M12 19.5V21M3 12h1.5M19.5 12H21M5.636 5.636l1.06 1.06M17.303 17.303l1.06 1.06M5.636 18.364l1.06-1.06M17.303 6.697l1.06-1.06M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" /></svg>
                        </div>
                        <div id="icon-moon" class="absolute left-0 flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300 transform translate-x-8 bg-transparent opacity-0 dark:bg-zinc-800 dark:translate-x-0 dark:opacity-100">
                            <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>
                        </div>
                    </div>
                </button>
                <a href="https://proemote.es/diagnostico-negocio-gratis" target="_blank" rel="noopener" class="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] py-2 px-5 rounded-full font-semibold text-[13px] transition-all">
                    Iniciar estudio
                </a>
            </div>
            
            <button id="mobile-menu-btn" class="md:hidden text-gray-800 dark:text-white/80 p-1" aria-label="Abrir menú">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
            </button>
        </header>
    </div>

    <!-- MEGA MENU SERVICES -->
    <div id="mega-menu" class="fixed inset-0 z-[40] hidden pointer-events-none">
        <div id="mega-menu-backdrop" class="absolute inset-0 bg-[#05020a]/60 backdrop-blur-sm opacity-0 transition-opacity duration-300"></div>
        
        <div id="mega-menu-panel" class="absolute top-[96px] md:top-[112px] left-1/2 -translate-x-1/2 w-full max-w-5xl px-6 transform -translate-y-4 opacity-0 transition-all duration-300 pointer-events-auto">
            <div class="backdrop-blur-xl bg-white/95 dark:bg-[#09090b]/95 border border-gray-200 dark:border-white/10 rounded-[2rem] p-8 shadow-2xl flex flex-col gap-10">
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <a href="/branding-y-estrategia" class="group flex items-start gap-4">
                        <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                            <i class="ph-fill ph-paint-brush-broad text-xl"></i>
                        </div>
                        <div>
                            <h4 class="text-gray-900 dark:text-white font-light text-sm group-hover:text-primary transition-colors mb-1">Branding & Estrategia</h4>
                            <p class="text-xs text-gray-500 dark:text-white/40 font-light">Identidad visual y posicionamiento.</p>
                        </div>
                    </a>
                    <a href="/web-seo" class="group flex items-start gap-4">
                        <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                            <i class="ph-fill ph-browser text-xl"></i>
                        </div>
                        <div>
                            <h4 class="text-gray-900 dark:text-white font-light text-sm group-hover:text-primary transition-colors mb-1">Diseño web y Posicionamiento SEO</h4>
                            <p class="text-xs text-gray-500 dark:text-white/40 font-light">Webs de alto rendimiento y SEO.</p>
                        </div>
                    </a>
                    <a href="/redes-sociales" class="group flex items-start gap-4">
                        <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                            <i class="ph-fill ph-share-network text-xl"></i>
                        </div>
                        <div>
                            <h4 class="text-gray-900 dark:text-white font-light text-sm group-hover:text-primary transition-colors mb-1">Contenido & Redes</h4>
                            <p class="text-xs text-gray-500 dark:text-white/40 font-light">Social Media y estrategia de video.</p>
                        </div>
                    </a>
                    <a href="/marketing-digital" class="group flex items-start gap-4">
                        <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                            <i class="ph-fill ph-rocket-launch text-xl"></i>
                        </div>
                        <div>
                            <h4 class="text-gray-900 dark:text-white font-light text-sm group-hover:text-primary transition-colors mb-1">Marketing Digital</h4>
                            <p class="text-xs text-gray-500 dark:text-white/40 font-light">Campañas de publicidad digital para escalar tu negocio.</p>
                        </div>
                    </a>
                    <a href="/automatizaciones-y-sistemas" class="group flex items-start gap-4">
                        <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                            <i class="ph-fill ph-robot text-xl"></i>
                        </div>
                        <div>
                            <h4 class="text-gray-900 dark:text-white font-light text-sm group-hover:text-primary transition-colors mb-1">Automatización y Sistemas</h4>
                            <p class="text-xs text-gray-500 dark:text-white/40 font-light">Funnels, CRM y flujos que trabajan sin ti.</p>
                        </div>
                    </a>
                    <a href="/eventos" class="group flex items-start gap-4">
                        <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                            <i class="ph-fill ph-ticket text-xl"></i>
                        </div>
                        <div>
                            <h4 class="text-gray-900 dark:text-white font-light text-sm group-hover:text-primary transition-colors mb-1">Eventos & Experiencias</h4>
                            <p class="text-xs text-gray-500 dark:text-white/40 font-light">Producción, branding y promoción digital de eventos.</p>
                        </div>
                    </a>
                </div>

                <div class="w-full rounded-2xl bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 p-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
                    <div class="flex flex-col md:flex-row items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 flex-shrink-0">
                            <i class="ph-fill ph-circles-three-plus text-xl"></i>
                        </div>
                        <h4 class="text-gray-900 dark:text-white font-sans font-light text-lg">Diseñamos sistemas completos, no piezas aisladas.</h4>
                    </div>
                    <a href="/servicios" class="inline-flex items-center gap-2 text-primary font-medium text-sm hover:text-gray-900 dark:hover:text-white transition-colors mt-4 md:mt-0 group flex-shrink-0">
                        Ver todos los servicios <i class="ph ph-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </a>
                </div>

            </div>
        </div>
    </div>

    <!-- Menú Móvil -->
    <div id="mobile-menu" class="hidden fixed inset-0 z-40 bg-white/95 dark:bg-base/95 backdrop-blur-2xl pt-24 pb-6 px-6 flex flex-col transition-colors duration-300">
        <div class="flex flex-col gap-6 items-center text-center mt-10">
            <a href="https://proemotion.es/" class="mobile-link text-lg font-light text-gray-600 dark:text-white/60 hover:text-marca dark:hover:text-white">Inicio</a>
            <a href="/#foco" class="mobile-link text-lg font-light text-gray-600 dark:text-white/60 hover:text-marca dark:hover:text-white">Sistema</a>
            <a href="/servicios" class="mobile-link text-lg font-light text-gray-600 dark:text-white/60 hover:text-marca dark:hover:text-white">Servicios</a>
            
            <div class="flex flex-col gap-2.5 pl-2 border-l border-gray-200 dark:border-white/10 my-1 items-center">
                <span class="text-xs font-bold tracking-widest text-gray-400 dark:text-white/40 uppercase mb-1">Ayudas 2026 <span class="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-primary/20 text-primary border border-primary/30">Nuevas</span></span>
                <a href="/ayudas-digitalizacion-pymes-extremadura/" class="mobile-link text-sm font-medium text-gray-600 dark:text-white/60 hover:text-marca dark:hover:text-white">Digitalización de Pymes</a>
                <a href="/ayudas-implementacion-ia-extremadura/" class="mobile-link text-sm font-medium text-gray-600 dark:text-white/60 hover:text-marca dark:hover:text-white mt-1">Implementación de IA</a>
            </div>

            <a href="/sobre-nosotros" class="mobile-link text-lg font-light text-gray-600 dark:text-white/60 hover:text-marca dark:hover:text-white">Sobre nosotros</a>
            <a href="https://proemote.es/portfolio" class="mobile-link text-lg font-light text-gray-600 dark:text-white/60 hover:text-marca dark:hover:text-white">Portfolio</a>
            <a href="/contacto" class="mobile-link text-lg font-light text-gray-600 dark:text-white/60 hover:text-marca dark:hover:text-white">Contacto</a>
            
            <a href="https://proemote.es/diagnostico-negocio-gratis" target="_blank" rel="noopener" class="bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3.5 px-8 rounded-full font-semibold text-[14px] transition-all w-full max-w-xs mt-6 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                Iniciar estudio gratuito
            </a>
            <button id="mobile-theme-toggle" class="mt-4 flex items-center gap-2 text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white">Cambiar tema</button>
            <button id="mobile-menu-close" class="mt-8 text-gray-400 dark:text-white/40 hover:text-gray-900 dark:hover:text-white">Cerrar menú</button>
        </div>
    </div>"""

# Clean new footer
new_footer_html = """    <!-- FOOTER -->
    <footer class="bg-white dark:bg-base border-t border-gray-200 dark:border-white/5 pt-20 pb-8 relative z-10 transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            
            <div class="md:col-span-12 lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
                <div class="mb-8">
                    <img src="https://i.imgur.com/2mXnkGe.png" alt="Proemote Logo" class="h-20 md:h-24 mb-3 opacity-90 mx-auto md:mx-0 dark:invert-0 invert">
                    <p class="text-gray-900 dark:text-white italic text-sm mb-1">Shaping what matters</p>
                    <p class="text-gray-500 dark:text-white/40 text-sm font-medium">Think first.</p>
                </div>
                
                <div class="mb-6">
                    <p class="text-xs text-marca font-bold tracking-widest uppercase mb-1">Estudio creativo y estratégico.</p>
                    <p class="text-xs text-gray-500 dark:text-white/40 font-bold tracking-widest uppercase">Mérida, Extremadura.</p>
                </div>
                
                <div class="flex flex-col items-center md:items-start gap-3 mb-8 w-full">
                    <a href="mailto:info@proemote.es" class="text-gray-900 dark:text-white font-medium hover:text-marca transition-colors flex items-center gap-3 text-sm">
                        <i class="ph ph-envelope-simple text-xl text-marca"></i> info@proemote.es
                    </a>
                    <a href="tel:+34641576286" class="text-gray-900 dark:text-white font-medium hover:text-marca transition-colors flex items-center gap-3 text-sm">
                        <i class="ph ph-phone text-xl text-marca"></i> +34 641 57 62 86
                    </a>
                </div>

                <div class="flex justify-center md:justify-start gap-3 w-full">
                    <a href="https://www.linkedin.com/company/proemote/" target="_blank" class="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-white/40 hover:text-white hover:bg-marca transition-all">
                        <i class="ph-fill ph-linkedin-logo"></i>
                    </a>
                    <a href="https://www.instagram.com/proemote/" target="_blank" class="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-white/40 hover:text-white hover:bg-marca transition-all">
                        <i class="ph-fill ph-instagram-logo"></i>
                    </a>
                </div>
            </div>

            <div class="md:col-span-4 lg:col-span-2 lg:col-start-5 mt-8 lg:mt-0">
                <h4 class="text-[10px] font-bold tracking-widest text-gray-500 dark:text-white/40 uppercase mb-6 text-center md:text-left">Servicios</h4>
                <ul class="space-y-4 text-sm text-gray-500 dark:text-white/40 text-center md:text-left">
                    <li><a href="/diseno-web-SEO" class="hover:text-gray-900 dark:hover:text-white transition-colors">Diseño Web</a></li>
                    <li><a href="/eventos" class="hover:text-gray-900 dark:hover:text-white transition-colors">Eventos 360º</a></li>
                    <li><a href="/marketing-digital" class="hover:text-gray-900 dark:hover:text-white transition-colors">Marketing Digital</a></li>
                    <li><a href="/redes-sociales" class="hover:text-gray-900 dark:hover:text-white transition-colors">Redes Sociales</a></li>
                    <li><a href="/branding-y-estrategia" class="hover:text-gray-900 dark:hover:text-white transition-colors">Branding & Estrategia</a></li>
                    <li><a href="/automatizaciones-y-sistemas" class="hover:text-gray-900 dark:hover:text-white transition-colors">Automatización & Sistemas</a></li>
                </ul>
            </div>

            <div class="md:col-span-4 lg:col-span-2 mt-8 lg:mt-0">
                <h4 class="text-[10px] font-bold tracking-widest text-gray-500 dark:text-white/40 uppercase mb-6 text-center md:text-left">Empresa & Legal</h4>
                <ul class="space-y-4 text-sm text-gray-500 dark:text-white/40 text-center md:text-left">
                    <li><a href="/aviso-legal" target="_blank" class="hover:text-gray-900 dark:hover:text-white transition-colors">Aviso Legal</a></li>
                    <li><a href="/privacidad" target="_blank" class="hover:text-gray-900 dark:hover:text-white transition-colors">Política de Privacidad</a></li>
                    <li><a href="/sobre-nosotros" class="hover:text-gray-900 dark:hover:text-white transition-colors">Sobre nosotros</a></li>
                    <li><a href="/contacto" class="hover:text-gray-900 dark:hover:text-white transition-colors">Contacto</a></li>
                    <li><a href="/trabaja-con-nosotros" class="hover:text-gray-900 dark:hover:text-white transition-colors">Trabaja con nosotros</a></li>
                </ul>
            </div>

            <div class="md:col-span-4 lg:col-span-2 mt-8 lg:mt-0">
                <h4 class="text-[10px] font-bold tracking-widest text-gray-500 dark:text-white/40 uppercase mb-6 text-center md:text-left">Horario</h4>
                <ul class="space-y-2 text-sm text-gray-500 dark:text-white/40 text-center md:text-left">
                    <li class="flex flex-col md:inline-block"><span class="font-medium text-gray-900 dark:text-white/80">L-V:</span> <span class="text-gray-900 dark:text-white">9H–14H, 16H–20H</span></li>
                    <li class="flex flex-col md:inline-block mt-2"><span class="font-medium text-gray-900 dark:text-white/80">Sáb:</span> <span class="text-gray-900 dark:text-white">10H–13:30H</span></li>
                    <li class="flex flex-col md:inline-block mt-2"><span class="font-medium text-gray-900 dark:text-white/80">Dom:</span> <span class="text-gray-400 dark:text-white/50">Cerrado</span></li>
                </ul>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-center md:text-left">
            <p class="text-xs text-gray-500 dark:text-white/40 w-full">© 2026 Proemote Studio. Todos los derechos reservados.</p>
        </div>
    </footer>"""

theme_script_js = """
        // --- Theme Toggle Logic ---
        const themeToggles = [document.getElementById('theme-toggle'), document.getElementById('mobile-theme-toggle')];
        const iconSun = document.getElementById('icon-sun');
        const iconMoon = document.getElementById('icon-moon');
        const htmlElement = document.documentElement;

        function updateIconState() {
            if(!iconSun || !iconMoon) return;
            if (htmlElement.classList.contains('dark')) {
                iconSun.classList.add('translate-x-8', 'opacity-0');
                iconSun.classList.remove('translate-x-0', 'opacity-100');
                iconMoon.classList.remove('translate-x-8', 'opacity-0');
                iconMoon.classList.add('translate-x-0', 'opacity-100');
            } else {
                iconSun.classList.remove('translate-x-8', 'opacity-0');
                iconSun.classList.add('translate-x-0', 'opacity-100');
                iconMoon.classList.add('translate-x-8', 'opacity-0');
                iconMoon.classList.remove('translate-x-0', 'opacity-100');
            }
        }

        function toggleTheme() {
            htmlElement.classList.toggle('dark');
            if (htmlElement.classList.contains('dark')) {
                localStorage.theme = 'dark';
            } else {
                localStorage.theme = 'light';
            }
            updateIconState();
        }

        themeToggles.forEach(btn => {
            if(btn) btn.addEventListener('click', toggleTheme);
        });

        updateIconState();

        // --- Menu Toggle ---
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        const closeBtn = document.getElementById('mobile-menu-close');
        const mobileLinks = document.querySelectorAll('.mobile-link');

        function toggleMenu() {
            if (menu) menu.classList.toggle('hidden');
        }

        if(btn) btn.addEventListener('click', toggleMenu);
        if(closeBtn) closeBtn.addEventListener('click', toggleMenu);
        if(mobileLinks) mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

        // Lógica Hover Mega Menú (Solo Desktop)
        const servicesBtn = document.getElementById('services-menu-btn');
        const megaMenu = document.getElementById('mega-menu');
        const megaMenuPanel = document.getElementById('mega-menu-panel');
        const megaMenuBackdrop = document.getElementById('mega-menu-backdrop');
        let hideTimeout;
        let displayTimeout;

        const showMenu = () => {
            clearTimeout(hideTimeout);
            clearTimeout(displayTimeout);
            if(megaMenu) {
                megaMenu.classList.remove('hidden');
                setTimeout(() => {
                    if(megaMenuPanel) megaMenuPanel.classList.remove('-translate-y-4', 'opacity-0');
                    if(megaMenuBackdrop) megaMenuBackdrop.classList.remove('opacity-0');
                }, 10);
            }
        };

        const hideMenu = () => {
            hideTimeout = setTimeout(() => {
                if(megaMenuPanel) megaMenuPanel.classList.add('-translate-y-4', 'opacity-0');
                if(megaMenuBackdrop) megaMenuBackdrop.classList.add('opacity-0');
                displayTimeout = setTimeout(() => {
                    if(megaMenu) megaMenu.classList.add('hidden');
                }, 300);
            }, 150);
        };

        if(window.innerWidth > 768 && servicesBtn && megaMenu) {
            servicesBtn.addEventListener('mouseenter', showMenu);
            servicesBtn.addEventListener('mouseleave', hideMenu);
            if(megaMenuPanel) {
                megaMenuPanel.addEventListener('mouseenter', showMenu);
                megaMenuPanel.addEventListener('mouseleave', hideMenu);
            }
        }
"""

theme_init_head = """    <!-- Theme Initialization Script -->
    <script>
        if (localStorage.theme === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
            document.documentElement.classList.remove('dark')
        } else {
            document.documentElement.classList.add('dark')
            localStorage.theme = 'dark'
        }
    </script>
"""

def process_file(filepath):
    # Skip the root-level index.html specifically, support files and the diagnostic page (which we updated manually)
    if filepath in ['./index.html', 'index.html'] or any(p in filepath for p in ['standard_nav.html', 'new_mega_menu.html', 'tabs_menu.html', 'tabs_output.html', 'reviews.html', 'diagnostico-negocio-gratis/index.html']):
        return
        
    print(f"Syncing theme and navigation in: {filepath}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # 1. Inject Theme Init Script in head
    if 'Theme Initialization Script' not in content:
        head_idx = content.find('</head>')
        if head_idx != -1:
            content = content[:head_idx] + theme_init_head + content[head_idx:]

    # 2. Inject darkMode: 'class' in tailwind.config
    if 'tailwind.config = {' in content and "darkMode: 'class'" not in content and 'darkMode: "class"' not in content:
        content = content.replace("tailwind.config = {", "tailwind.config = {\n            darkMode: 'class',")

    # 3. Replace body background colors to be adaptive if they are dark-only
    # e.g., bg-[#0A0A0F] or bg-[#05020a] or bg-base
    content = content.replace('class="bg-bgMain', 'class="bg-gray-50 dark:bg-bgMain')
    content = content.replace('class="bg-[#05020a]', 'class="bg-gray-50 dark:bg-[#05020a]')
    content = re.sub(r'body class="([^"]*)bg-base([^"]*)"', r'body class="\1bg-gray-50 dark:bg-base\2"', content)
    content = re.sub(r'body class="([^"]*)bg-[#05020a]([^"]*)"', r'body class="\1bg-gray-50 dark:bg-[#05020a]\2"', content)
    
    # 4. Inject transition on body in <style>
    if '<style>' in content:
        style_idx = content.find('<style>') + len('<style>')
        if 'body { transition:' not in content:
            content = content[:style_idx] + "\n        body { transition: background-color 0.3s ease, color 0.3s ease; }\n" + content[style_idx:]

    # 5. Sync header navigation block
    # From <!-- BARRA DE ANUNCIO GLOBAL --> or <div class="fixed top-6 left-0 or first <nav> or first <header> to where it ends
    # We can search for the existing patterns
    patterns = [
        r'<!-- BARRA DE ANUNCIO GLOBAL -->.*?<!-- Menú Móvil -->\s*</div>\s*</div>',
        r'<!-- BARRA DE ANUNCIO GLOBAL -->.*?<!-- Menú Móvil -->\s*</div>',
        r'<div class="fixed top-6 left-0 w-full z-50 flex justify-center px-4">.*?<!-- Menú Móvil -->\s*</div>\s*</div>',
        r'<div class="fixed top-6 left-0 w-full z-50 flex justify-center px-4">.*?<!-- Menú Móvil -->\s*</div>',
        r'<div id="announcement-bar".*?</nav>',
        r'<nav.*?</nav>'
    ]
    
    header_replaced = False
    for pattern in patterns:
        if re.search(pattern, content, re.DOTALL):
            content = re.sub(pattern, new_header_html, content, count=1, flags=re.DOTALL)
            header_replaced = True
            break
            
    if not header_replaced:
        print(f"Warning: Could not find header pattern in {filepath}")

    # 6. Sync footer block
    footer_patterns = [
        r'<!-- FOOTER -->.*?</footer>',
        r'<footer.*?>.*?</footer>'
    ]
    footer_replaced = False
    for pattern in footer_patterns:
        if re.search(pattern, content, re.DOTALL):
            content = re.sub(pattern, new_footer_html, content, count=1, flags=re.DOTALL)
            footer_replaced = True
            break
            
    if not footer_replaced:
        print(f"Warning: Could not find footer pattern in {filepath}")

    # 7. Append theme toggling / hover logic to scripts
    # Find the last </script> in the file and insert the script
    script_close_idx = content.rfind('</script>')
    if script_close_idx != -1:
        # Check if theme toggle logic is already there
        if 'Theme Toggle Logic' not in content:
            content = content[:script_close_idx] + theme_script_js + content[script_close_idx:]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# Walk through all directories
for root, dirs, files in os.walk('.'):
    if '.git' in root or '.gemini' in root or 'nexum-cars' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            process_file(os.path.join(root, file))

print("Sync completed!")
