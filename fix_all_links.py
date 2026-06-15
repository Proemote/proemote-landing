import os
import re

for root, dirs, files in os.walk('.'):
    if '.git' in root or '.gemini' in root or 'nexum-cars' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            orig = content
            content = content.replace('/eventos/organizacion-integral', '/eventos/organizacion-de-eventos')
            # Fix if the user said "organización-de-eventos" in the URL? "organización" with accent is bad for URLs, I'll use organizacion-de-eventos
            content = content.replace('/eventos/organización-de-eventos', '/eventos/organizacion-de-eventos')

            # Let's ensure Branding y Estrategia in the mega menu links properly.
            # In mega menu, it might be: <a href="..." class="group flex items-start gap-4"> ... <h4>Branding y Estrategia</h4>
            # We can use regex to fix all Branding y Estrategia and Organizacion de eventos links in the mega menu
            
            if content != orig:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated links in {filepath}")

