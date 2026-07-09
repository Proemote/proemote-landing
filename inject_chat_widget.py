#!/usr/bin/env python3
"""
inject_chat_widget.py
Añade <script src="/chat-widget.js" defer></script> antes de </body>
en todos los index.html del proyecto (excluye node_modules, .git, demos y casos de éxito).

También limpia el widget embebido directamente en index.html raíz
para que use solo chat-widget.js (evitar duplicados).
"""

import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))

# Carpetas que NO queremos tocar (demos de clientes, etc.)
EXCLUDE_DIRS = {
    'node_modules', '.git', 'scratch',
    'demo-web', 'demo-lessandra', 'demo-yeimy', 'nexum-cars',
    'CASOS EXITO LANDING', 'Caso exito LQL',
}

SCRIPT_TAG = '<script src="/chat-widget.js" defer></script>'

# Patrón para detectar si ya tiene el script
ALREADY_HAS = re.compile(r'chat-widget\.js')

injected = []
skipped  = []

def should_skip_dir(path):
    parts = path.replace(ROOT, '').split(os.sep)
    return any(p in EXCLUDE_DIRS for p in parts)

for dirpath, dirnames, filenames in os.walk(ROOT):
    # Filtrar directorios excluidos
    dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS]

    if should_skip_dir(dirpath):
        continue

    if 'index.html' not in filenames:
        continue

    filepath = os.path.join(dirpath, 'index.html')
    rel      = os.path.relpath(filepath, ROOT)

    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # Ya tiene el script → skip
    if ALREADY_HAS.search(content):
        skipped.append(rel)
        continue

    # Inyectar antes de </body>
    if '</body>' not in content:
        skipped.append(rel + ' (sin </body>)')
        continue

    new_content = content.replace('</body>', f'    {SCRIPT_TAG}\n</body>', 1)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    injected.append(rel)

print(f"\n✅ Widget añadido en {len(injected)} páginas:")
for p in injected:
    print(f"   + {p}")

if skipped:
    print(f"\n⏭  Omitidas ({len(skipped)}):")
    for p in skipped:
        print(f"   · {p}")

print("\nListo. Ahora puedes hacer git add -A && git commit && git push.")
