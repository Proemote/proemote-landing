#!/usr/bin/env python3
"""
fix_cookiebot_blocking.py
Añade data-cookieconsent="ignore" a los scripts de Tailwind y Phosphor Icons
para evitar que Cookiebot los bloquee por defecto y rompa el diseño.
"""

import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))

EXCLUDE_DIRS = {
    'node_modules', '.git', 'scratch',
    'demo-web', 'demo-lessandra', 'demo-yeimy', 'nexum-cars',
    'CASOS EXITO LANDING', 'Caso exito LQL',
}

files_modified = []

for dirpath, dirnames, filenames in os.walk(ROOT):
    # Filtrar directorios excluidos
    dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS]

    for filename in filenames:
        if filename != 'index.html':
            continue

        filepath = os.path.join(dirpath, filename)
        
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        original_content = content

        # 1. Ignorar script de Tailwind CSS
        content = content.replace(
            '<script src="https://cdn.tailwindcss.com"></script>',
            '<script src="https://cdn.tailwindcss.com" data-cookieconsent="ignore"></script>'
        )

        # 2. Ignorar script de Phosphor Icons
        content = content.replace(
            '<script src="https://unpkg.com/@phosphor-icons/web"></script>',
            '<script src="https://unpkg.com/@phosphor-icons/web" data-cookieconsent="ignore"></script>'
        )

        # 3. Ignorar script de Tailwind Config (si está presente inline)
        content = re.sub(
            r'<script>\s*(?=tailwind\.config\s*=)',
            '<script data-cookieconsent="ignore">\n        ',
            content
        )

        # 4. Ignorar script de inicialización de tema oscuro/claro (si está presente inline)
        content = re.sub(
            r'<script>\s*(?=if\s*\(\s*localStorage\.theme\s*===)',
            '<script data-cookieconsent="ignore">\n        ',
            content
        )

        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            files_modified.append(os.path.relpath(filepath, ROOT))

print(f"✅ Se ha añadido data-cookieconsent=\"ignore\" a los scripts de diseño en {len(files_modified)} archivos.")
