#!/usr/bin/env python3
"""
inject_cookiebot.py
Añade el script de Cookiebot justo después del tag <head>
en todos los index.html del proyecto (excluyendo node_modules, .git, demos, etc.).
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

COOKIEBOT_TAG = '    <!-- Cookiebot -->\n    <script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="bf436d02-7576-46c5-bcba-9f21f191d406" data-blockingmode="auto" type="text/javascript"></script>'

# Patrón para detectar si ya tiene Cookiebot
ALREADY_HAS = re.compile(r'consent\.cookiebot\.com')

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

    for filename in filenames:
        if filename != 'index.html':
            continue

        filepath = os.path.join(dirpath, filename)
        rel      = os.path.relpath(filepath, ROOT)

        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        # Ya tiene el script → skip
        if ALREADY_HAS.search(content):
            skipped.append(rel + ' (ya tiene Cookiebot)')
            continue

        # Inyectar justo después de <head>
        # Buscamos <head> o <head class="..."> etc.
        match = re.search(r'<head[^>]*>', content)
        if not match:
            skipped.append(rel + ' (sin <head>)')
            continue

        head_tag = match.group(0)
        new_content = content.replace(head_tag, f'{head_tag}\n{COOKIEBOT_TAG}', 1)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

        injected.append(rel)

print(f"\n✅ Cookiebot añadido en {len(injected)} páginas:")
for p in injected:
    print(f"   + {p}")

if skipped:
    print(f"\n⏭  Omitidas ({len(skipped)}):")
    for p in skipped:
        print(f"   · {p}")
