import os
import re

root_dir = '/Users/carlosmolinamarquez/Desktop/proemote-landing'

mobile_menu_regex = re.compile(r'<button id="mobile-menu-btn" class="md:hidden[^>]+>\s*<svg[^>]+>.*?</svg>\s*</button>', re.DOTALL)
mobile_menu_replacement = """<div class="flex items-center gap-2 md:hidden relative z-10">
                <button id="mobile-theme-toggle-header" class="p-2 text-gray-600 dark:text-white/80 hover:text-primary transition-colors focus:outline-none" aria-label="Toggle Dark Mode">
                    <svg class="w-5 h-5 block dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1.5M12 19.5V21M3 12h1.5M19.5 12H21M5.636 5.636l1.06 1.06M17.303 17.303l1.06 1.06M5.636 18.364l1.06-1.06M17.303 6.697l1.06-1.06M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" /></svg>
                    <svg class="w-5 h-5 hidden dark:block text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>
                </button>
                <button id="mobile-menu-btn" class="text-gray-800 dark:text-white/80 p-1" aria-label="Abrir menú">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
                </button>
            </div>"""

for dirpath, dirnames, filenames in os.walk(root_dir):
    for filename in filenames:
        if filename.endswith('.html'):
            filepath = os.path.join(dirpath, filename)
            with open(filepath, 'r') as f:
                content = f.read()

            original_content = content
            
            # 1. Header mobile replacement
            if 'mobile-theme-toggle-header' not in content:
                content = mobile_menu_regex.sub(mobile_menu_replacement, content)
                
            # Update JS for new toggle
            content = content.replace("document.getElementById('mobile-theme-toggle')]", "document.getElementById('mobile-theme-toggle'), document.getElementById('mobile-theme-toggle-header')]")

            # Update link to Ayudas 2026 in mobile menu (replace span with link)
            # Find: <span class="text-xs font-bold tracking-widest text-gray-400 dark:text-white/40 uppercase mb-1">Ayudas 2026 ... </span>
            ayudas_span_regex = re.compile(r'<span[^>]*>(Ayudas 2026|Convocatorias 2026)[^<]*<span[^>]*>Nuevas</span></span>')
            ayudas_span_replacement = r'<a href="/subvenciones-extremadura" class="text-xs font-bold tracking-widest text-gray-600 dark:text-white/60 uppercase mb-1 flex items-center gap-2 hover:text-primary transition-colors">\1 <span class="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-primary/20 text-primary border border-primary/30">Nuevas</span></a>'
            content = ayudas_span_regex.sub(ayudas_span_replacement, content)
            
            # Subvenciones in some pages have different styling
            ayudas_span_regex2 = re.compile(r'<span[^>]*>(Ayudas 2026|Convocatorias 2026)[^<]*<span[^>]*>Nuevas</span>\s*</span>')
            content = ayudas_span_regex2.sub(ayudas_span_replacement, content)

            if filename == 'index.html' and dirpath == root_dir:
                # 2. Font size hero mobile
                content = content.replace('text-5xl md:text-6xl lg:text-7xl font-light', 'text-4xl md:text-6xl lg:text-7xl font-light')
                
                # 4. Details fix in FOCO
                content = content.replace('class="text-closed border-b border-dashed border-gray-400 dark:border-white/30 hover:border-marca transition-colors"', 'class="text-closed border-b border-dashed border-gray-400 dark:border-white/30 hover:border-marca transition-colors group-open:hidden"')
                content = content.replace('class="text-open border-b border-dashed border-gray-400 dark:border-white/30 hover:border-marca transition-colors"', 'class="text-open border-b border-dashed border-gray-400 dark:border-white/30 hover:border-marca transition-colors hidden group-open:inline"')

            # 5 & 7. Services Pages fixes
            # bg-gradient-to-b from-primary/5 via-transparent to-bgMain
            content = content.replace('to-bgMain z-[-1]', 'to-white dark:to-bgMain z-[-1]')
            content = content.replace('to-bgMain z-[0]', 'to-white dark:to-bgMain z-[0]')
            # remove bold from hero headings (text-5xl md:text-7xl font-bold -> font-light tracking-tight)
            content = re.sub(r'font-heading text-5xl md:text-7xl font-bold leading-\[1.1\] tracking-tight', 'font-heading text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight', content)

            # 6. Automatizaciones missing observer
            if 'automatizaciones' in dirpath and 'IntersectionObserver' not in content:
                observer_script = """
        // --- Intersección Observer para Animaciones ---
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-up, .fade-up').forEach(el => observer.observe(el));
"""
                content = content.replace('// Lógica Hover Mega Menú', observer_script + '\n        // Lógica Hover Mega Menú')

            if content != original_content:
                with open(filepath, 'w') as f:
                    f.write(content)
                print(f"Updated {filepath}")

