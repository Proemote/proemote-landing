import os
import io

root_dir = '/Users/carlosmolinamarquez/Desktop/proemote-landing'

hero_reviews_html = """
          <div class="inline-flex items-center justify-center gap-3 px-4 py-2 mt-8 rounded-full border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-bgSurface/50 backdrop-blur-sm shadow-sm reveal-up delay-200">
            <div class="flex -space-x-2">
                <img class="w-8 h-8 rounded-full border-2 border-white dark:border-[#0A0A0F]" src="/favicon.png" alt="User">
                <div class="w-8 h-8 rounded-full border-2 border-white dark:border-[#0A0A0F] bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">G</div>
            </div>
            <div class="flex flex-col text-left">
                <div class="flex gap-0.5 text-yellow-400 text-[10px]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-3 h-3"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" /></svg>
                </div>
                <span class="text-[11px] font-medium text-gray-700 dark:text-white/80 leading-none mt-0.5">Opiniones reales de clientes en Google</span>
            </div>
          </div>
"""

with io.open(os.path.join(root_dir, 'index.html'), 'r', encoding='utf-8') as f:
    index_content = f.read()

# Add hero reviews to index.html
if "Opiniones reales de clientes en Google" not in index_content:
    cta_marker = 'Iniciar estudio gratuito\n            </a>'
    if cta_marker in index_content:
        index_content = index_content.replace(cta_marker, cta_marker + '\n' + hero_reviews_html, 1)
        with io.open(os.path.join(root_dir, 'index.html'), 'w', encoding='utf-8') as f:
            f.write(index_content)

# Extract Blocks manually
header_start = index_content.find('<!-- BARRA DE ANUNCIO GLOBAL -->')
header_end = index_content.find('</header>', header_start) + len('</header>')
header_str = index_content[header_start:header_end]

mobile_start = index_content.find('<!-- Menú Móvil')
mobile_end = index_content.find('</div>', index_content.find('Cerrar menú</button>')) + 6
# Need the second </div>
mobile_end = index_content.find('</div>', mobile_end) + 6
mobile_menu_str = index_content[mobile_start:mobile_end]

def process_file(filepath):
    if 'index.html' in filepath and filepath.endswith('/proemote-landing/index.html'):
        return
        
    with io.open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    original = content
    
    # 1. Sync Header
    f_header_start = content.find('<!-- BARRA DE ANUNCIO GLOBAL -->')
    f_header_end = content.find('</header>', f_header_start) + len('</header>')
    if f_header_start != -1 and f_header_end != -1:
        content = content[:f_header_start] + header_str + content[f_header_end:]
    
    # 2. Sync Mobile Menu
    f_mobile_start = content.find('<!-- Menú Móvil')
    if f_mobile_start == -1:
        f_mobile_start = content.find('<div id="mobile-menu"')
    
    if f_mobile_start != -1:
        f_mobile_btn_close = content.find('Cerrar menú</button>', f_mobile_start)
        if f_mobile_btn_close != -1:
            f_mobile_end1 = content.find('</div>', f_mobile_btn_close) + 6
            f_mobile_end = content.find('</div>', f_mobile_end1) + 6
            content = content[:f_mobile_start] + mobile_menu_str + content[f_mobile_end:]

    # 3. Forms: Fix inputs in light mode
    import re
    content = re.sub(r'class="([^"]*?)text-white([^"]*?)"', r'class="\1text-gray-900 dark:text-white\2"', content)
    content = re.sub(r'class="([^"]*?)bg-white/5([^"]*?)"', r'class="\1bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10\2"', content)
    content = content.replace('bg-[#05020a]', 'bg-white dark:bg-[#05020a]')
    content = content.replace('border-white/20', 'border-gray-300 dark:border-white/20')

    # 4. Remove `Trustindex` from contact sections
    content = re.sub(r'Trustindex® 12 reseñas\s*<br>\s*Opiniones de nuestros clientes', 'Opiniones de nuestros clientes', content, flags=re.IGNORECASE)
    content = re.sub(r'Trustindex® 12 reseñas', 'Opiniones de nuestros clientes', content, flags=re.IGNORECASE)

    # 5. Fix `.foco-item` gray background conflict by removing transition-all from them
    content = re.sub(r'(class="[^"]*foco-item[^"]*)transition-all duration-\d+([^"]*")', r'\1\2', content)

    if content != original:
        with io.open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

for root, _, files in os.walk(root_dir):
    for file in files:
        if file.endswith('.html'):
            process_file(os.path.join(root, file))

print("Synced via exact string indices")
