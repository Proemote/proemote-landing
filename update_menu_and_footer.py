import os
import re

directory = "/Users/carlosmolinamarquez/Desktop/proemote-landing"

# 1. Grab footer from index.html
with open(os.path.join(directory, 'index.html'), 'r', encoding='utf-8') as f:
    index_html = f.read()

# Extract footer
footer_start = index_html.find('<footer class="bg-bgMain')
footer_end = index_html.find('</footer>', footer_start) + len('</footer>')
footer_html = index_html[footer_start:footer_end]

# Update footer "Marketing Digital" link to point to /marketing-digital
footer_html = footer_html.replace('href="/servicios" class="hover:text-white transition-colors">Marketing Digital', 'href="/marketing-digital" class="hover:text-white transition-colors">Marketing Digital')

# Update index.html footer
index_html = index_html[:footer_start] + footer_html + index_html[footer_end:]

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # 1. Mega Menu Updates
    # "Web & Diseño Digital" -> "Diseño web y Posicionamiento SEO"
    content = content.replace('Web & Diseño Digital', 'Diseño web y Posicionamiento SEO')
    content = content.replace('Diseño UX/UI y embudos de conversión.', 'Webs de alto rendimiento y SEO.')
    # "Paid Media & Ads" -> "Marketing Digital" (in mega menu it is "Paid Media & Ads")
    # Actually wait, in the hero of paid media it also says "Paid Media & Ads", we want to rename the title "en todos lados", but let's be careful not to replace the main hero text unless requested? "cambia el titulo en todos lados" probably means <title> and maybe the hero? Let's just do <title> and the menus.
    content = content.replace('>Paid Media & Ads</h4>', '>Marketing Digital</h4>')
    content = content.replace('href="/servicios#ads"', 'href="/marketing-digital"')
    
    # 2. Add Eventos to forms if not present
    if '<option value="Eventos">' not in content and '<option value="Sistema completo">Sistema completo (varios servicios)</option>' in content:
        content = content.replace(
            '<option value="Sistema completo">Sistema completo (varios servicios)</option>',
            '<option value="Sistema completo">Sistema completo (varios servicios)</option>\n                    <option value="Eventos">Eventos (Producción o Alquiler)</option>'
        )

    # 3. Update <title> in marketing-digital
    if 'marketing-digital/index.html' in filepath:
        content = content.replace('<title>Paid Media y Ads | Proemote Studio</title>', '<title>Marketing Digital | Proemote Studio</title>')
        # Also replace "Paid Media & Ads" badge in the hero
        content = content.replace('Paid Media & Ads', 'Marketing Digital')
    
    # 4. Replace footer for diseno-web-SEO and marketing-digital to match the rest of the web
    # Also update the marketing digital link in all footers.
    f_start = content.find('<footer ')
    if f_start == -1:
        f_start = content.find('<footer\n')
    if f_start != -1:
        f_end = content.find('</footer>', f_start) + len('</footer>')
        # If it's the ones to be completely replaced
        if 'diseno-web-SEO' in filepath or 'marketing-digital' in filepath:
            content = content[:f_start] + footer_html + content[f_end:]
        else:
            # Just update the marketing digital link in existing footer
            current_footer = content[f_start:f_end]
            current_footer = current_footer.replace('href="/servicios" class="hover:text-white transition-colors">Marketing Digital', 'href="/marketing-digital" class="hover:text-white transition-colors">Marketing Digital')
            content = content[:f_start] + current_footer + content[f_end:]

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith(".html"):
            update_file(os.path.join(root, file))

