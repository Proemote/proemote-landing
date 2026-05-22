import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    
    # 1. Remove footer buttons block
    footer_pattern = r'<div class="flex flex-wrap justify-center md:justify-start gap-3 mb-8">\s*<a href="/"[^>]*>Inicio</a>\s*<a href="/#foco"[^>]*>Sistema</a>\s*<a href="/sobre-nosotros"[^>]*>Sobre nosotros</a>\s*<a href="/contacto"[^>]*>Contacto</a>\s*</div>'
    content = re.sub(footer_pattern, '', content)

    # 2. Insert Sistema in header before Servicios
    if '<a href="/#foco" class="hover:text-textMain transition-colors">Sistema</a>' not in content:
        services_pattern = r'(<a href="/servicios" id="services-menu-btn")'
        replacement = r'<a href="/#foco" class="hover:text-textMain transition-colors">Sistema</a>\n                \1'
        content = re.sub(services_pattern, replacement, content, count=1)
        
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html'):
            process_file(os.path.join(root, file))

