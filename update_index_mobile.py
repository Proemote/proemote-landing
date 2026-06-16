import re

filepath = '/Users/carlosmolinamarquez/Desktop/proemote-landing/index.html'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Off-Canvas Menu for Ayudas 2026
# Replace the div containing the Ayudas links with a <details> block
old_ayudas_menu = r'<div class="flex flex-col gap-2 pl-2 border-l border-gray-200 dark:border-white/10 my-1 items-center">\s*<a href="/subvenciones-extremadura"[^>]*>Ayudas 2026.*?</a>\s*<a href="/ayudas-digitalizacion-pymes-extremadura/"[^>]*>Digitalización de Pymes</a>\s*<a href="/ayudas-implementacion-ia-extremadura/"[^>]*>Implementación de IA</a>\s*</div>'

new_ayudas_menu = """            <details class="group w-full max-w-xs text-center mx-auto">
                <summary class="list-none flex items-center justify-center gap-2 text-lg font-light text-gray-600 dark:text-white/60 hover:text-marca dark:hover:text-white cursor-pointer select-none">
                    Ayudas 2026 <span class="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-primary/20 text-primary border border-primary/30">Nuevas</span>
                    <i class="ph ph-caret-down text-sm transition-transform group-open:rotate-180"></i>
                </summary>
                <div class="flex flex-col gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-white/10 items-center bg-gray-50/50 dark:bg-white/[0.02] rounded-2xl p-4">
                    <a href="/subvenciones-extremadura" class="mobile-link text-sm font-medium text-gray-900 dark:text-white hover:text-marca dark:hover:text-white">Ver todas las ayudas</a>
                    <a href="/ayudas-digitalizacion-pymes-extremadura/" class="mobile-link text-sm font-light text-gray-600 dark:text-white/60 hover:text-marca dark:hover:text-white">Digitalización de Pymes</a>
                    <a href="/ayudas-implementacion-ia-extremadura/" class="mobile-link text-sm font-light text-gray-600 dark:text-white/60 hover:text-marca dark:hover:text-white">Implementación de IA</a>
                </div>
            </details>"""

content = re.sub(old_ayudas_menu, new_ayudas_menu, content)

# 2. Remove mobile-theme-toggle from off-canvas menu
content = re.sub(r'<button id="mobile-theme-toggle"[^>]*>.*?</button>', '', content)

# 3. Update Hero spacing and text sizes, and add the review circle.
old_hero = r'<main class="relative pt-44 pb-24 lg:pt-56 lg:pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-6 min-h-\[90vh\]">\s*<div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-\[600px\] h-\[600px\] bg-violet-600/15 rounded-full blur-\[120px\] pointer-events-none -z-10"></div>\s*<div class="max-w-4xl mx-auto flex flex-col items-center z-10 fade-up">\s*<div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-white/\[0.03\] border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none text-\[12px\] font-medium text-gray-600 dark:text-white/70 mb-8 transition-colors duration-300">\s*Agencia de marketing digital · Mérida, Extremadura\s*</div>\s*<h1 class="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 dark:text-white leading-\[1.1\] mb-6">\s*Transformamos negocios locales en sistemas que <span class="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-500 dark:from-marcalight dark:to-indigo-300 font-medium">generan clientes de forma constante.</span>\s*</h1>\s*<p class="text-lg md:text-xl text-gray-600 dark:text-white/60 font-light mb-12 max-w-2xl leading-relaxed mx-auto transition-colors duration-300">\s*En Proemote no trabajamos con piezas sueltas: construimos un sistema completo que une tu marca, tu web y tu captación de clientes bajo el Método FOCO™. Para que tu negocio deje de depender del boca a boca y empiece a atraer oportunidades de forma predecible.\s*</p>'

new_hero = """    <main class="relative pt-32 pb-16 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-4 lg:px-6 min-h-[85vh] lg:min-h-[90vh]">
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/15 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div class="max-w-4xl mx-auto flex flex-col items-center z-10 fade-up">
            
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none text-[11px] md:text-[12px] font-medium text-gray-600 dark:text-white/70 mb-6 md:mb-8 transition-colors duration-300">
                Agencia de marketing digital · Mérida, Extremadura
            </div>
            
            <h1 class="text-[2.5rem] leading-[1.1] md:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 dark:text-white mb-4 md:mb-6">
                Transformamos negocios en sistemas que <span class="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-500 dark:from-marcalight dark:to-indigo-300 font-medium block md:inline">generan clientes de forma constante.</span>
            </h1>
            
            <p class="text-[15px] md:text-xl text-gray-600 dark:text-white/60 font-light mb-8 md:mb-10 max-w-2xl leading-relaxed mx-auto transition-colors duration-300">
                En Proemote construimos un sistema completo que une tu marca, tu web y tu captación de clientes bajo el Método FOCO™. Para que tu negocio empiece a atraer oportunidades de forma predecible.
            </p>

            <!-- Review Circle -->
            <div class="flex items-center gap-3 justify-center mb-8 bg-white/50 dark:bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 dark:border-white/10">
                <div class="flex -space-x-2">
                    <div class="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-800 border-2 border-white dark:border-[#05020a] flex items-center justify-center text-[10px] font-medium text-gray-600 dark:text-white/80">S</div>
                    <div class="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-800 border-2 border-white dark:border-[#05020a] flex items-center justify-center text-[10px] font-medium text-gray-600 dark:text-white/80">J</div>
                    <div class="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-800 border-2 border-white dark:border-[#05020a] flex items-center justify-center text-[10px] font-medium text-gray-600 dark:text-white/80">A</div>
                </div>
                <div class="flex flex-col text-left">
                    <div class="flex gap-0.5 text-yellow-400 text-[10px]">
                        <i class="ph-fill ph-star"></i><i class="ph-fill ph-star"></i><i class="ph-fill ph-star"></i><i class="ph-fill ph-star"></i><i class="ph-fill ph-star"></i>
                    </div>
                    <span class="text-[10px] font-medium text-gray-600 dark:text-white/60">Casos de éxito reales</span>
                </div>
            </div>"""

content = re.sub(old_hero, new_hero, content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated index.html mobile menu and hero.")
