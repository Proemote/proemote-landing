import os

filepath = '/Users/carlosmolinamarquez/Desktop/proemote-landing/index.html'

with open(filepath, 'r') as f:
    content = f.read()

# Replace the static Ayudas section in the mobile menu with a <details> dropdown!
old_mobile_menu = """                <div class="flex flex-col gap-2.5 pl-2 border-l border-gray-200 dark:border-white/10 my-1">
                    <a href="/subvenciones-extremadura" class="text-xs font-bold tracking-widest text-gray-600 dark:text-white/60 uppercase mb-1 flex items-center gap-2 hover:text-primary transition-colors">Convocatorias 2026 <span class="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-primary/20 text-primary border border-primary/30">Nuevas</span></a>
                    <a href="/ayudas-digitalizacion-pymes-extremadura/" class="text-sm font-medium text-gray-600 dark:text-textSecondary hover:text-white transition-colors flex items-center gap-2">
                        <i class="ph ph-device-mobile text-primary"></i> Digitalización de Pymes
                    </a>
                    <a href="/ayudas-implementacion-ia-extremadura/" class="text-sm font-medium text-gray-600 dark:text-textSecondary hover:text-white transition-colors flex items-center gap-2 mt-1">
                        <i class="ph ph-cpu text-accent"></i> Implementación de IA
                    </a>
                </div>"""

new_mobile_menu = """                <details class="group/details border-b border-gray-200 dark:border-white/10 pb-2">
                    <summary class="flex items-center justify-between cursor-pointer list-none text-base font-medium text-gray-600 dark:text-textSecondary hover:text-primary transition-colors focus:outline-none">
                        <div class="flex items-center gap-2">
                            Ayudas 2026 
                            <span class="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-primary/20 text-primary border border-primary/30">Nuevas</span>
                        </div>
                        <i class="ph ph-caret-down text-sm transition-transform group-open/details:rotate-180"></i>
                    </summary>
                    <div class="flex flex-col gap-3 pt-4 pl-2 border-l border-gray-200 dark:border-white/10 ml-2 mt-2">
                        <a href="/subvenciones-extremadura" class="text-xs font-bold tracking-widest text-gray-600 dark:text-white/60 uppercase hover:text-primary transition-colors">Ver todas las ayudas</a>
                        <a href="/ayudas-digitalizacion-pymes-extremadura/" class="text-sm font-medium text-gray-600 dark:text-textSecondary hover:text-white transition-colors flex items-center gap-2">
                            <i class="ph ph-device-mobile text-primary"></i> Digitalización de Pymes
                        </a>
                        <a href="/ayudas-implementacion-ia-extremadura/" class="text-sm font-medium text-gray-600 dark:text-textSecondary hover:text-white transition-colors flex items-center gap-2">
                            <i class="ph ph-cpu text-accent"></i> Implementación de IA
                        </a>
                    </div>
                </details>"""

content = content.replace(old_mobile_menu, new_mobile_menu)

# Ensure the description is smaller and closer
old_hero_p = '<p class="text-lg md:text-xl text-gray-600 dark:text-textSecondary max-w-2xl mx-auto leading-relaxed mb-10">'
new_hero_p = '<p class="text-base md:text-xl text-gray-600 dark:text-textSecondary max-w-2xl mx-auto leading-relaxed mb-6 md:mb-10">'
content = content.replace(old_hero_p, new_hero_p)

with open(filepath, 'w') as f:
    f.write(content)

print("Updated index mobile menu and hero spacing")
