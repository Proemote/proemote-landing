import re
import os

footer_template = """    <!-- Footer Unificado -->
    <footer class="{bg_class} pt-16 pb-8 border-t {border_class} {text_base_class}">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                
                <!-- Proemote Brand Info -->
                <div class="col-span-1 md:col-span-1">
                    <div class="flex items-center gap-3 mb-6">
                        <i class="ph-fill ph-cube-transparent text-3xl {title_class}"></i>
                        <span class="font-extrabold text-2xl tracking-tight {title_class}">Proemote®</span>
                    </div>
                    
                    <div class="mb-6">
                        <h5 class="text-xs font-bold {text_muted_class} uppercase tracking-wider mb-2">Llámanos</h5>
                        <p class="{accent_class} font-bold text-xl mb-1">+34 924 000 000</p>
                        <p class="text-xs {text_muted_class}">Lunes a viernes - 09:00 a 18:00</p>
                    </div>

                    <div>
                        <h5 class="text-xs font-bold {text_muted_class} uppercase tracking-wider mb-2">Ubicación</h5>
                        <p class="text-sm {text_base_class}">
                            C/ San Salvador 11, CP 06800<br>
                            Mérida, Badajoz<br>
                            Extremadura, España
                        </p>
                    </div>
                </div>

                <!-- Navigation Columns -->
                <div>
                    <h4 class="font-bold {title_class} mb-4">Empresa</h4>
                    <ul class="space-y-3 text-sm {text_base_class}">
                        <li><a href="#" class="{hover_class} transition-colors">Sobre Nosotros</a></li>
                        <li><a href="#" class="{hover_class} transition-colors">{product_name}</a></li>
                        <li><a href="#" class="{hover_class} transition-colors">Precios</a></li>
                        <li><a href="#" class="{hover_class} transition-colors">Contacto</a></li>
                        <li><a href="#" class="{hover_class} transition-colors">Blog</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="font-bold {title_class} mb-4">Soporte</h4>
                    <ul class="space-y-3 text-sm {text_base_class}">
                        <li><a href="#" class="{hover_class} transition-colors">Centro de ayuda</a></li>
                        <li><a href="#" class="{hover_class} transition-colors">Tutoriales</a></li>
                        <li><a href="#" class="{hover_class} transition-colors">Estado del sistema</a></li>
                        <li><a href="#" class="{hover_class} transition-colors">Comunidad</a></li>
                    </ul>
                </div>

                <!-- Map / Visual Element -->
                <div class="h-full min-h-[150px] {map_bg} rounded-xl overflow-hidden relative border {map_border}">
                    <div class="absolute inset-0 opacity-50" style="background-image: url('data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'grid\' width=\'20\' height=\'20\' patternUnits=\'userSpaceOnUse\'%3E%3Cpath d=\'M 20 0 L 0 0 0 20\' fill=\'none\' stroke=\'%23a1a1aa\' stroke-width=\'0.5\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23grid)\'/%3E%3C/svg%3E');"></div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <i class="ph-fill ph-map-pin text-4xl {accent_class} drop-shadow-md relative top-[-10px]"></i>
                    </div>
                    <div class="absolute bottom-2 right-2 {map_btn_bg} backdrop-blur px-2 py-1 rounded text-[10px] font-medium {map_btn_text} border {map_btn_border}">
                        Ver en Google Maps
                    </div>
                </div>
            </div>

            <!-- Big Bottom Brand Name -->
            <div class="text-center overflow-hidden w-full select-none pt-8 border-t {border_class}">
                <h1 class="text-[15vw] font-extrabold tracking-tighter text-transparent bg-clip-text {gradient_class} leading-none uppercase">
                    {product_name}
                </h1>
            </div>
            
            <div class="flex flex-col md:flex-row justify-between items-center mt-6 text-xs {text_muted_class} gap-4">
                <div>&copy; 2026 {product_name}. Un producto de Proemote® Ecosystem.</div>
                <div class="flex gap-4">
                    <a href="#" class="{hover_class}">Aviso Legal</a>
                    <a href="#" class="{hover_class}">Política de Privacidad</a>
                    <a href="#" class="{hover_class}">Cookies</a>
                </div>
            </div>
        </div>
    </footer>"""

configs = {
    'affinia': {
        'bg_class': 'bg-gray-50',
        'border_class': 'border-gray-200',
        'text_base_class': 'text-gray-600',
        'text_muted_class': 'text-gray-500',
        'title_class': 'text-gray-900',
        'accent_class': 'text-brand-600',
        'hover_class': 'hover:text-brand-600',
        'map_bg': 'bg-gray-200',
        'map_border': 'border-gray-300',
        'map_btn_bg': 'bg-white/80',
        'map_btn_text': 'text-gray-600',
        'map_btn_border': 'border-gray-200',
        'gradient_class': 'bg-gradient-to-b from-brand-600/20 to-brand-600/5',
        'product_name': 'AffinIA'
    },
    'LEO': {
        'bg_class': 'bg-[#030105]',
        'border_class': 'border-white/5',
        'text_base_class': 'text-gray-400',
        'text_muted_class': 'text-gray-500',
        'title_class': 'text-white',
        'accent_class': 'text-brand-purple',
        'hover_class': 'hover:text-white',
        'map_bg': 'bg-[#08080c]',
        'map_border': 'border-white/10',
        'map_btn_bg': 'bg-[#030105]/80',
        'map_btn_text': 'text-gray-300',
        'map_btn_border': 'border-white/10',
        'gradient_class': 'bg-gradient-to-b from-brand-purple/20 to-brand-purple/5',
        'product_name': 'LEO'
    },
    'leadflow': {
        'bg_class': 'bg-[#050505]',
        'border_class': 'border-white/5',
        'text_base_class': 'text-gray-400',
        'text_muted_class': 'text-gray-500',
        'title_class': 'text-white',
        'accent_class': 'text-primary-500',
        'hover_class': 'hover:text-white',
        'map_bg': 'bg-[#0a0a0a]',
        'map_border': 'border-white/10',
        'map_btn_bg': 'bg-black/80',
        'map_btn_text': 'text-gray-300',
        'map_btn_border': 'border-white/10',
        'gradient_class': 'bg-gradient-to-b from-primary-500/20 to-primary-500/5',
        'product_name': 'LeadFlow'
    }
}

for folder, params in configs.items():
    filepath = os.path.join(folder, 'index.html')
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_footer = footer_template.format(**params)
        
        # We need to replace the existing footer.
        # It usually starts with <footer and ends with </footer>
        # We can use a regex to find the footer block.
        content = re.sub(r'<footer.*?</footer>', new_footer, content, flags=re.DOTALL)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
            
        print(f"Updated footer in {filepath}")
