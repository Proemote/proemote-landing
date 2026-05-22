import os
import re

directory = "/Users/carlosmolinamarquez/Desktop/proemote-landing"

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    
    # 1. Add "Eventos" to all forms
    if '<option value="Sistema completo">Sistema completo (varios servicios)</option>' in content:
        # Regex to avoid adding it multiple times
        if '<option value="Eventos">' not in content:
            content = content.replace(
                '<option value="Sistema completo">Sistema completo (varios servicios)</option>',
                '<option value="Sistema completo">Sistema completo (varios servicios)</option>\n                    <option value="Eventos">Eventos (Producción o Alquiler)</option>'
            )

    # 2. Mega Menu changes:
    # Change "Diseño Web" to "Diseño web y Posicionamiento SEO"
    # The existing mega menu has:
    # <h4 class="text-white font-medium text-sm group-hover:text-primary transition-colors mb-1">Diseño Web</h4>
    # <p class="text-xs text-textSecondary">Webs de alto rendimiento y SEO.</p>
    content = re.sub(
        r'<h4 class="([^"]*)">Diseño Web</h4>\s*<p class="([^"]*)">Webs de alto rendimiento y SEO.</p>',
        r'<h4 class="\1">Diseño web y Posicionamiento SEO</h4>\n                                <p class="\2">Webs de alto rendimiento y posicionamiento en buscadores.</p>',
        content
    )
    # Actually wait, maybe the description is "Webs de alto rendimiento y SEO." ? Let me replace flexibly
    content = re.sub(
        r'<h4([^>]*)>Diseño Web</h4>',
        r'<h4\1>Diseño web y Posicionamiento SEO</h4>',
        content
    )
    content = re.sub(
        r'<p([^>]*)>Webs de alto rendimiento y SEO.</p>',
        r'<p\1>Webs de alto rendimiento y posicionamiento en buscadores.</p>',
        content
    )

    # Change "Paid Media & Growth" to "Marketing Digital" in mega menu? Wait, what is currently there?
    content = re.sub(
        r'<h4([^>]*)>Paid Media & Growth</h4>',
        r'<h4\1>Marketing Digital</h4>',
        content
    )
    # Replace any link to /paid-media with /marketing-digital
    content = content.replace('/paid-media', '/marketing-digital')
    content = content.replace('/paid-media/', '/marketing-digital/')
    
    # Let's replace "Marketing Digital" in footer if it exists.
    # Actually, the user says "Enlaza en el footer marketing digital con la nueva pagina de paid media y cambia el titulo en todos lados y el slug por /marketing-digital. Enlazalo también en el menú de servicios y en el menu flotante en hover de servicios de la cabecera"
    # Wait, the footer might just have "Marketing Digital" without a link, or with a wrong link.
    # Wait, is there a "Marketing Digital" in the footer? 

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith(".html"):
            process_file(os.path.join(root, file))

print("Done forms and mega menu text replacements.")
