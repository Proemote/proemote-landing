import re

with open('/Users/carlosmolinamarquez/Desktop/proemote-landing/index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

with open('/Users/carlosmolinamarquez/Desktop/proemote-landing/diseno-web-SEO/index.html', 'r', encoding='utf-8') as f:
    seo_content = f.read()

# Extract mega-menu block from index.html
mega_menu_match = re.search(r'(<!-- Mega Menu -->.*?</div>\n    </div>)', index_content, re.DOTALL)
if not mega_menu_match:
    mega_menu_match = re.search(r'(<div id="mega-menu" class="fixed inset-0 z-\[40\].*?<!-- 2\. HERO -->)', index_content, re.DOTALL)
    if mega_menu_match:
        mega_menu = mega_menu_match.group(1).replace('<!-- 2. HERO -->', '').strip() + '\n'
    else:
        # Fallback
        start_idx = index_content.find('<div id="mega-menu" class="fixed inset-0 z-[40]"')
        if start_idx != -1:
            end_idx = index_content.find('<section class="relative min-h-screen', start_idx)
            mega_menu = index_content[start_idx:end_idx].strip() + '\n\n'
        else:
            print("Mega menu not found in index.html")
            exit(1)

# The new header structure but keeping the CTA
new_nav = """    <nav class="fixed w-full z-50 glass-nav">
        <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <a href="/" class="relative z-10 flex items-center transition-transform hover:scale-105 duration-300">
                <img src="https://i.imgur.com/jwddFTY.png" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'150\\' height=\\'40\\'%3E%3Crect width=\\'150\\' height=\\'40\\' fill=\\'none\\'/%3E%3Ctext x=\\'10\\' y=\\'25\\' fill=\\'%23fff\\' font-family=\\'Arial\\' font-weight=\\'bold\\' font-size=\\'20\\'%3EPROEMOTE%3C/text%3E%3C/svg%3E'" alt="Proemote Logo" class="h-8 md:h-10 w-auto object-contain">
            </a>
            
            <div class="hidden lg:flex gap-8 text-sm font-medium text-textSecondary relative z-10 items-center">
                <a href="/" class="hover:text-textMain transition-colors">Inicio</a>
                <a href="/servicios" id="services-menu-btn" class="hover:text-textMain transition-colors focus:outline-none">Servicios</a>
                <a href="/sobre-nosotros" class="hover:text-textMain transition-colors">Sobre Nosotros</a>
                <a href="/portfolio" class="hover:text-textMain transition-colors">Portfolio</a>
                <a href="/contacto" class="hover:text-textMain transition-colors">Contacto</a>
            </div>
            
            <div class="flex items-center gap-4 relative z-10">
                <a href="https://wa.me/34641576286?text=Buenas!%20Estaba%20visitando%20vuestra%20web%20y%20quer%C3%ADa%20solicitar%20m%C3%A1s%20informaci%C3%B3n" target="_blank" rel="noopener noreferrer" class="hidden md:inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-primary rounded-full hover:bg-accent shadow-[0_0_15px_rgba(123,97,255,0.4)] transition-all duration-300 focus:outline-none">
                    <i class="ph-fill ph-whatsapp-logo text-[#25D366]"></i> Info sin compromiso
                </a>
                <button id="mobile-menu-btn" class="lg:hidden text-textSecondary hover:text-white transition-colors focus:outline-none p-2">
                    <i class="ph ph-list text-2xl"></i>
                </button>
            </div>
        </div>

        <!-- Menú Móvil -->
        <div id="mobile-menu" class="hidden lg:hidden absolute top-full left-0 w-full bg-bgSurface/95 backdrop-blur-xl border-b border-white/10 shadow-2xl overflow-hidden transition-all duration-300">
            <div class="flex flex-col py-6 px-6 gap-6">
                <a href="/" class="text-base font-medium text-textSecondary hover:text-white transition-colors mobile-link">Inicio</a>
                <a href="/servicios" id="services-menu-btn-mobile" class="text-left text-base font-medium text-textSecondary hover:text-white transition-colors focus:outline-none">Servicios</a>
                <a href="/sobre-nosotros" class="text-base font-medium text-textSecondary hover:text-white transition-colors mobile-link">Sobre Nosotros</a>
                <a href="/portfolio" class="text-base font-medium text-textSecondary hover:text-white transition-colors mobile-link">Portfolio</a>
                <a href="/contacto" class="text-base font-medium text-textSecondary hover:text-white transition-colors mobile-link">Contacto</a>
                <a href="https://wa.me/34641576286?text=Buenas!%20Estaba%20visitando%20vuestra%20web%20y%20quer%C3%ADa%20solicitar%20m%C3%A1s%20informaci%C3%B3n" target="_blank" rel="noopener noreferrer" class="inline-flex justify-center items-center gap-2 px-6 py-3 mt-2 text-sm font-bold text-white bg-primary rounded-full shadow-[0_0_15px_rgba(123,97,255,0.4)]">
                    <i class="ph-fill ph-whatsapp-logo text-[#25D366]"></i> Info sin compromiso
                </a>
            </div>
        </div>
    </nav>
"""

# Now replace the <nav> block in seo_content
seo_content = re.sub(r'<nav class="fixed w-full z-50 glass-nav">.*?</nav>', new_nav, seo_content, flags=re.DOTALL)

# Now inject mega_menu right after </nav>
seo_content = seo_content.replace('</nav>\n', '</nav>\n\n    ' + mega_menu)

# Now grab the mega menu JS logic
js_match = re.search(r'(// Lógica del Mega Menú.*?)(?=// Lógica para cerrar el menú móvil|// Observer Reveal Up)', index_content, re.DOTALL)
if js_match:
    mega_menu_js = js_match.group(1).strip() + '\n\n            '
    # Inject before // Observer Reveal Up in seo_content
    if '// Observer Reveal Up' in seo_content:
        seo_content = seo_content.replace('// Observer Reveal Up', mega_menu_js + '// Observer Reveal Up')
    else:
        print("Couldn't find // Observer Reveal Up to inject JS")

# Mobile menu toggle logic might need fixing as well since we replaced the ID if it differs, but it's the same.
# We also need the mobile menu mega menu logic if present, but the existing script probably handles it if we copy the mobile mega menu JS. Let's just copy the whole mobile JS if needed, but in index.html, it's just `mobile-menu-btn`.

# Save
with open('/Users/carlosmolinamarquez/Desktop/proemote-landing/diseno-web-SEO/index.html', 'w', encoding='utf-8') as f:
    f.write(seo_content)

print("Done updating diseno-web-SEO/index.html")
