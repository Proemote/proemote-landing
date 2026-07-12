import os
import re

standard_footer = """
    <!-- FOOTER -->
    <footer class="bg-bgMain border-t border-white/5 pt-20 pb-8 relative z-10">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            
            <div class="md:col-span-12 lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
                <div class="mb-8">
                    <img src="https://i.imgur.com/2mXnkGe.png" alt="Proemote Logo" class="h-20 md:h-24 mb-3 opacity-90 mx-auto md:mx-0">
                    <p class="text-white italic text-sm mb-1">Shaping what matters</p>
                    <p class="text-textSecondary text-sm font-medium">Think first.</p>
                </div>
                
                <div class="mb-6">
                    <p class="text-xs text-primary font-bold tracking-widest uppercase mb-1">Estudio creativo y estratégico.</p>
                    <p class="text-xs text-textSecondary font-bold tracking-widest uppercase">Mérida, Extremadura.</p>
                </div>
                
                <div class="flex flex-col items-center md:items-start gap-3 mb-8 w-full">
                    <a href="mailto:info@proemote.es" class="text-white font-medium hover:text-primary transition-colors flex items-center gap-3 text-sm">
                        <i class="ph ph-envelope-simple text-xl"></i> info@proemote.es
                    </a>
                    <a href="tel:+34641576286" class="text-white font-medium hover:text-primary transition-colors flex items-center gap-3 text-sm">
                        <i class="ph ph-phone text-xl"></i> +34 641 57 62 86
                    </a>
                </div>

                <div class="flex justify-center md:justify-start gap-3 w-full">
                    <a href="https://www.linkedin.com/company/proemote/" target="_blank" class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-textSecondary hover:text-white hover:bg-primary transition-all">
                        <i class="ph-fill ph-linkedin-logo"></i>
                    </a>
                    <a href="https://www.instagram.com/proemote/" target="_blank" class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-textSecondary hover:text-white hover:bg-primary transition-all">
                        <i class="ph-fill ph-instagram-logo"></i>
                    </a>
                </div>
            </div>

            <div class="md:col-span-4 lg:col-span-2 lg:col-start-5 mt-8 lg:mt-0">
                <h4 class="text-[10px] font-bold tracking-widest text-textSecondary uppercase mb-6 text-center md:text-left">Servicios</h4>
                <ul class="space-y-4 text-sm text-textSecondary text-center md:text-left">
                    <li><a href="/diseno-web-SEO" class="hover:text-white transition-colors">Diseño Web</a></li>
                    <li><a href="/eventos" class="hover:text-white transition-colors">Eventos 360º</a></li>
                    <li><a href="/marketing-digital" class="hover:text-white transition-colors">Marketing Digital</a></li>
                    <li><a href="/redes-sociales" class="hover:text-white transition-colors">Redes Sociales</a></li>
                    <li><a href="/branding-y-estrategia" class="hover:text-white transition-colors">Branding & Estrategia</a></li>
                    <li><a href="/automatizaciones-y-sistemas" class="hover:text-white transition-colors">Automatización & Sistemas</a></li>
                </ul>
            </div>

            <div class="md:col-span-4 lg:col-span-2 mt-8 lg:mt-0">
                <h4 class="text-[10px] font-bold tracking-widest text-textSecondary uppercase mb-6 text-center md:text-left">Empresa & Legal</h4>
                <ul class="space-y-4 text-sm text-textSecondary text-center md:text-left">
                    <li><a href="/aviso-legal" target="_blank" class="hover:text-white transition-colors">Aviso Legal</a></li>
                    <li><a href="/privacidad" target="_blank" class="hover:text-white transition-colors">Política de Privacidad</a></li>
                    <li><a href="/sobre-nosotros" class="hover:text-white transition-colors">Sobre nosotros</a></li>
                    <li><a href="/contacto" class="hover:text-white transition-colors">Contacto</a></li>
                    <li><a href="/trabaja-con-nosotros" class="hover:text-white transition-colors">Trabaja con nosotros</a></li>
                    <li><a href="/affinia/" class="hover:text-white transition-colors">AffinIA</a></li>
                    <li><a href="/LEO/" class="hover:text-white transition-colors">Leo</a></li>
                    <li><a href="/leadflow/" class="hover:text-white transition-colors">LeadFlow</a></li>
                </ul>
            </div>

            <div class="md:col-span-4 lg:col-span-2 mt-8 lg:mt-0">
                <h4 class="text-[10px] font-bold tracking-widest text-textSecondary uppercase mb-6 text-center md:text-left">Horario</h4>
                <ul class="space-y-2 text-sm text-textSecondary text-center md:text-left">
                    <li class="flex flex-col md:inline-block"><span class="font-medium text-white/80">L-V:</span> <span class="text-white">9H–14H, 16H–20H</span></li>
                    <li class="flex flex-col md:inline-block mt-2"><span class="font-medium text-white/80">Sáb:</span> <span class="text-white">10H–13:30H</span></li>
                    <li class="flex flex-col md:inline-block mt-2"><span class="font-medium text-white/80">Dom:</span> <span class="text-white/50">Cerrado</span></li>
                </ul>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-center md:text-left">
            <p class="text-xs text-textSecondary w-full">© 2026 Proemote Studio. Todos los derechos reservados.</p>
        </div>
    </footer>"""

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if file has a footer
    if '<!-- FOOTER -->' in content and '</footer>' in content:
        # Extract everything before the footer and everything after
        start_idx = content.find('<!-- FOOTER -->')
        end_idx = content.find('</footer>') + len('</footer>')
        
        new_content = content[:start_idx] + standard_footer + content[end_idx:]
        
        if content != new_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated footer in {filepath}")

# Walk through all directories and process html files
for root, dirs, files in os.walk('.'):
    if '.git' in root or '.gemini' in root or 'nexum-cars' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            process_file(os.path.join(root, file))
