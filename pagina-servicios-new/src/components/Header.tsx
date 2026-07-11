import { useState, useEffect, useRef } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Refs for mega menu (same pattern as index.html)
  const servicesBtnRef = useRef<HTMLAnchorElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const megaMenuPanelRef = useRef<HTMLDivElement>(null);
  const megaMenuBackdropRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const displayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  useEffect(() => {
    const servicesBtn = servicesBtnRef.current;
    const megaMenu = megaMenuRef.current;
    const megaMenuPanel = megaMenuPanelRef.current;
    const megaMenuBackdrop = megaMenuBackdropRef.current;

    const showMenu = () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      if (displayTimeoutRef.current) clearTimeout(displayTimeoutRef.current);
      if (megaMenu) {
        megaMenu.classList.remove('hidden');
        setTimeout(() => {
          if (megaMenuPanel) megaMenuPanel.classList.remove('-translate-y-4', 'opacity-0');
          if (megaMenuBackdrop) megaMenuBackdrop.classList.remove('opacity-0');
        }, 10);
      }
    };

    const hideMenu = () => {
      hideTimeoutRef.current = setTimeout(() => {
        if (megaMenuPanel) megaMenuPanel.classList.add('-translate-y-4', 'opacity-0');
        if (megaMenuBackdrop) megaMenuBackdrop.classList.add('opacity-0');
        displayTimeoutRef.current = setTimeout(() => {
          if (megaMenu) megaMenu.classList.add('hidden');
        }, 300);
      }, 150);
    };

    if (window.innerWidth > 768) {
      servicesBtn?.addEventListener('mouseenter', showMenu);
      servicesBtn?.addEventListener('mouseleave', hideMenu);
      megaMenuPanel?.addEventListener('mouseenter', showMenu);
      megaMenuPanel?.addEventListener('mouseleave', hideMenu);
    }

    return () => {
      servicesBtn?.removeEventListener('mouseenter', showMenu);
      servicesBtn?.removeEventListener('mouseleave', hideMenu);
      megaMenuPanel?.removeEventListener('mouseenter', showMenu);
      megaMenuPanel?.removeEventListener('mouseleave', hideMenu);
    };
  }, []);

  const toggleTheme = () => {
    const dark = document.documentElement.classList.contains('dark');
    if (dark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <>
      <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-4" id="announcement-bar">
        <header className="relative w-full max-w-5xl backdrop-blur-xl bg-white/80 dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-full flex items-center justify-between px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-colors duration-300">
          <a href="/" className="relative z-10 flex items-center transition-transform hover:scale-105 duration-300">
            <img src="/logo-header.png" alt="Proemote" className="h-6 md:h-8 w-auto object-contain dark:invert-0 invert" />
          </a>

          <div className="hidden md:flex gap-6 text-[13px] font-medium text-gray-600 dark:text-white/60 z-10 items-center">
            <a href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">Inicio</a>
            
            {/* Servicios — identical pattern to index.html */}
            <a
              href="/servicios"
              ref={servicesBtnRef}
              className="hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none"
            >
              Servicios
            </a>
            
            {/* AYUDAS DROPDOWN */}
            <div className="relative group py-2">
              <a href="/subvenciones-extremadura/" className="hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1.5 focus:outline-none">
                Ayudas
                <i className="ph ph-caret-down text-xs transition-transform group-hover:rotate-180"></i>
              </a>
              <div className="absolute top-full left-0 mt-4 before:absolute before:-top-4 before:left-0 before:w-full before:h-4 w-64 bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-4 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 flex flex-col gap-2 pointer-events-auto">
                <a href="/ayudas-digitalizacion-pymes-extremadura/" className="p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex items-start gap-3 group/item">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors flex-shrink-0">
                    <i className="ph-fill ph-device-mobile"></i>
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium text-xs mb-0.5">Digitalización de Pymes</p>
                    <p className="text-[10px] text-gray-500 dark:text-white/40">Hasta 20.000€ · Web, SEO, Redes</p>
                  </div>
                </a>
              </div>
            </div>

            {/* RECURSOS MEGA MENU */}
            <div className="group/menu py-2">
              <a href="/recursos" className="hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1.5 focus:outline-none">
                Recursos
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-primary/20 text-primary border border-primary/30 leading-none">Hub</span>
                <i className="ph ph-caret-down text-[10px] transition-transform duration-300 group-hover/menu:rotate-180"></i>
              </a>
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[800px] opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-300 transform group-hover/menu:translate-y-0 translate-y-3 z-50 cursor-auto pointer-events-auto">
                <div className="bg-white/95 dark:bg-[#14141F]/95 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] p-2 flex overflow-hidden">
                  <div className="w-[240px] bg-gray-50/80 dark:bg-white/[0.02] rounded-[1.5rem] p-5 flex-shrink-0 flex flex-col gap-4 border border-transparent dark:border-white/5">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-white/40 px-1">Categorías</h4>
                    <div className="flex flex-col gap-1">
                      <a href="/recursos" className="flex items-center justify-between px-3 py-2 rounded-xl bg-white dark:bg-white/10 shadow-sm text-sm font-medium text-gray-900 dark:text-white transition-colors">
                        Todas <span className="text-xs text-gray-400 dark:text-gray-300">6</span>
                      </a>
                    </div>
                  </div>
                  <div className="flex-grow p-5 flex flex-col">
                    <div className="flex items-center justify-between mb-5 px-1">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-white/40">Últimos Recursos</h4>
                      <a href="/recursos" className="text-[11px] font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1 group/link">
                        Ver todos <i className="ph-bold ph-arrow-up-right transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <a href="/sobre-nosotros" className="hover:text-gray-900 dark:hover:text-white transition-colors">Sobre nosotros</a>
            <a href="/portfolio" className="hover:text-gray-900 dark:hover:text-white transition-colors">Portfolio</a>
            <a href="/contacto" className="hover:text-gray-900 dark:hover:text-white transition-colors">Contacto</a>
          </div>

          <div className="hidden md:flex items-center gap-4 relative z-10">
            <button onClick={toggleTheme} className="p-2 text-gray-600 dark:text-white/80 hover:text-marca transition-colors focus:outline-none" aria-label="Toggle Dark Mode">
              <svg className="w-5 h-5 block dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1.5M12 19.5V21M3 12h1.5M19.5 12H21M5.636 5.636l1.06 1.06M17.303 17.303l1.06 1.06M5.636 18.364l1.06-1.06M17.303 6.697l1.06-1.06M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" /></svg>
              <svg className="w-5 h-5 hidden dark:block text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>
            </button>
            <a href="/analisis-personalizado-gratis" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] py-2 px-5 rounded-full font-semibold text-[13px] transition-all">
              Realizar análisis gratuito
            </a>
          </div>
          
          <div className="flex items-center gap-2 md:hidden relative z-10">
            <button onClick={toggleTheme} className="p-2 text-gray-600 dark:text-white/80 hover:text-primary transition-colors focus:outline-none" aria-label="Toggle Dark Mode">
              <svg className="w-5 h-5 block dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1.5M12 19.5V21M3 12h1.5M19.5 12H21M5.636 5.636l1.06 1.06M17.303 17.303l1.06 1.06M5.636 18.364l1.06-1.06M17.303 6.697l1.06-1.06M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" /></svg>
              <svg className="w-5 h-5 hidden dark:block text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-800 dark:text-white/80 p-1" aria-label="Abrir menú">
              {isMobileMenuOpen ? (
                <i className="ph ph-x text-2xl"></i>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
              )}
            </button>
          </div>
        </header>
      </div>

      {/* MEGA MENU SERVICES — mismo patrón que index.html */}
      <div ref={megaMenuRef} id="mega-menu" className="fixed inset-0 z-[40] hidden pointer-events-none">
        <div ref={megaMenuBackdropRef} id="mega-menu-backdrop" className="absolute inset-0 bg-[#05020a]/60 backdrop-blur-sm opacity-0 transition-opacity duration-300"></div>
        
        <div ref={megaMenuPanelRef} id="mega-menu-panel" className="absolute top-[96px] md:top-[112px] left-1/2 -translate-x-1/2 w-full max-w-5xl px-6 transform -translate-y-4 opacity-0 transition-all duration-300 pointer-events-auto">
          <div className="backdrop-blur-xl bg-white/95 dark:bg-[#09090b]/95 border border-gray-200 dark:border-white/10 rounded-[2rem] p-8 shadow-2xl flex flex-col gap-10">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <a href="/branding-y-estrategia" className="group flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                  <i className="ph-fill ph-paint-brush-broad text-xl"></i>
                </div>
                <div>
                  <h4 className="text-gray-900 dark:text-white font-light text-sm group-hover:text-primary transition-colors mb-1">Branding & Estrategia</h4>
                  <p className="text-xs text-gray-500 dark:text-white/40 font-light">Identidad visual y posicionamiento.</p>
                </div>
              </a>
              <a href="/web-seo" className="group flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                  <i className="ph-fill ph-browser text-xl"></i>
                </div>
                <div>
                  <h4 className="text-gray-900 dark:text-white font-light text-sm group-hover:text-primary transition-colors mb-1">Diseño web y Posicionamiento SEO</h4>
                  <p className="text-xs text-gray-500 dark:text-white/40 font-light">Webs de alto rendimiento y SEO.</p>
                </div>
              </a>
              <a href="/redes-sociales" className="group flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                  <i className="ph-fill ph-share-network text-xl"></i>
                </div>
                <div>
                  <h4 className="text-gray-900 dark:text-white font-light text-sm group-hover:text-primary transition-colors mb-1">Contenido & Redes</h4>
                  <p className="text-xs text-gray-500 dark:text-white/40 font-light">Social Media y estrategia de video.</p>
                </div>
              </a>
              <a href="/marketing-digital" className="group flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                  <i className="ph-fill ph-rocket-launch text-xl"></i>
                </div>
                <div>
                  <h4 className="text-gray-900 dark:text-white font-light text-sm group-hover:text-primary transition-colors mb-1">Marketing Digital</h4>
                  <p className="text-xs text-gray-500 dark:text-white/40 font-light">Campañas de publicidad digital para escalar tu negocio.</p>
                </div>
              </a>
              <a href="/automatizaciones-y-sistemas" className="group flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                  <i className="ph-fill ph-robot text-xl"></i>
                </div>
                <div>
                  <h4 className="text-gray-900 dark:text-white font-light text-sm group-hover:text-primary transition-colors mb-1">Automatización y Sistemas</h4>
                  <p className="text-xs text-gray-500 dark:text-white/40 font-light">Funnels, CRM y flujos que trabajan sin ti.</p>
                </div>
              </a>
              <a href="/eventos" className="group flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                  <i className="ph-fill ph-ticket text-xl"></i>
                </div>
                <div>
                  <h4 className="text-gray-900 dark:text-white font-light text-sm group-hover:text-primary transition-colors mb-1">Eventos & Experiencias</h4>
                  <p className="text-xs text-gray-500 dark:text-white/40 font-light">Producción, branding y promoción digital de eventos.</p>
                </div>
              </a>
            </div>

            <div className="w-full rounded-2xl bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 p-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 flex-shrink-0">
                  <i className="ph-fill ph-circles-three-plus text-xl"></i>
                </div>
                <h4 className="text-gray-900 dark:text-white font-sans font-light text-lg">Diseñamos sistemas completos, no piezas aisladas.</h4>
              </div>
              <a href="/servicios" className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:text-gray-900 dark:hover:text-white transition-colors mt-4 md:mt-0 group flex-shrink-0">
                Ver todos los servicios <i className="ph ph-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-white/95 dark:bg-[#05020a]/95 backdrop-blur-2xl pt-24 pb-6 px-6 flex flex-col transition-colors duration-300 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col gap-6 items-center text-center mt-10">
          <a href="/" className="text-lg font-light text-gray-600 dark:text-white/60 hover:text-marca dark:hover:text-white">Inicio</a>
          <a href="/servicios" className="text-lg font-light text-gray-600 dark:text-white/60 hover:text-marca dark:hover:text-white">Servicios</a>
          
          <details className="w-full text-center group">
            <summary className="list-none cursor-pointer text-lg font-light text-gray-600 dark:text-white/60 hover:text-marca dark:hover:text-white flex items-center justify-center gap-2">
              Ayudas
              <svg className="w-4 h-4 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </summary>
            <div className="flex flex-col gap-3 mt-4 mb-2">
              <a href="/subvenciones-extremadura" className="text-sm font-medium text-gray-500 dark:text-white/50 hover:text-marca dark:hover:text-white">Ver todas las ayudas</a>
            </div>
          </details>
          <a href="/recursos" className="text-lg font-light text-gray-600 dark:text-white/60 hover:text-marca dark:hover:text-white flex items-center justify-center gap-2">
            Recursos <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-primary/20 text-primary border border-primary/30">Nuevo</span>
          </a>
          
          <a href="/analisis-personalizado-gratis" className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3.5 px-6 rounded-full font-semibold text-xs transition-all w-full max-w-xs mt-6 shadow-[0_0_20px_rgba(139,92,246,0.3)] text-center">
            Obtén tu Radiografía Digital gratis
          </a>
          <button onClick={toggleTheme} className="mt-4 flex items-center gap-2 text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white">Cambiar tema</button>
          <button onClick={() => setIsMobileMenuOpen(false)} className="mt-8 text-gray-400 dark:text-white/40 hover:text-gray-900 dark:hover:text-white">Cerrar menú</button>
        </div>
      </div>
    </>
  );
}
