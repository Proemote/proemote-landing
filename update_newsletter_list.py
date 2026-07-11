#!/usr/bin/env python3
"""
Actualiza todos los formularios de newsletter en los HTML para que los leads
vayan a la lista "newsletter" (listId: 2) de Brevo en lugar de "Diagnóstico Inicial" (listId: 3).

Busca el bloque del payload en los formularios de newsletter y añade listId: 2.
"""

import os
import re

BASE_DIR = "/Users/carlosmolinamarquez/Desktop/CLAUDE BRAIN/01-Proemote-Studio/proemote-landing"

# El patrón que buscamos es el payload del newsletter (solo tiene email, sin nombre/sector etc.)
# Hay que añadir listId: 2 dentro del payload
OLD_PATTERN = r'(action:\s*"add_to_brevo",\s*\n\s*payload:\s*\{\s*\n\s*email:\s*email\s*\n\s*\})'
NEW_REPLACEMENT = r'action: "add_to_brevo",\n                                    payload: {\n                                        email: email,\n                                        listId: 2\n                                    }'

updated_files = []
skipped_files = []

for root, dirs, files in os.walk(BASE_DIR):
    # Excluir node_modules, .git, diagnostico (react app), diagnostico-negocio (src)
    dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', '.claude', 'diagnostico', 'diagnostico-negocio']]
    
    for filename in files:
        if not filename.endswith('.html'):
            continue
        
        filepath = os.path.join(root, filename)
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Buscar el patrón de newsletter (payload con solo email)
            if 'add_to_brevo' not in content:
                continue
            
            # Verificar que no tenga ya listId
            if 'listId: 2' in content:
                print(f"  SKIP (ya tiene listId): {filepath.replace(BASE_DIR + '/', '')}")
                skipped_files.append(filepath)
                continue
            
            # Buscar el bloque específico del newsletter (payload con solo email, sin nombre/sector etc.)
            # Usamos un regex más flexible para capturar variaciones de indentación
            pattern = re.compile(
                r'(action:\s*"add_to_brevo",\s*\n(\s*)payload:\s*\{\s*\n\s*email:\s*email\s*\n\s*\})',
                re.MULTILINE
            )
            
            matches = list(pattern.finditer(content))
            
            if not matches:
                print(f"  NO MATCH: {filepath.replace(BASE_DIR + '/', '')}")
                continue
            
            # Reemplazar manteniendo la indentación original
            def replace_match(m):
                indent = m.group(2)
                return (
                    f'action: "add_to_brevo",\n'
                    f'{indent}payload: {{\n'
                    f'{indent}    email: email,\n'
                    f'{indent}    listId: 2\n'
                    f'{indent}}}'
                )
            
            new_content = pattern.sub(replace_match, content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                rel_path = filepath.replace(BASE_DIR + '/', '')
                print(f"  ✅ Actualizado ({len(matches)} ocurrencias): {rel_path}")
                updated_files.append(filepath)
            else:
                print(f"  ? Sin cambios: {filepath.replace(BASE_DIR + '/', '')}")
                
        except Exception as e:
            print(f"  ERROR en {filepath}: {e}")

print(f"\n{'='*60}")
print(f"RESUMEN:")
print(f"  ✅ Archivos actualizados: {len(updated_files)}")
print(f"  ⏭  Archivos ya actualizados: {len(skipped_files)}")
print(f"\nArchivos actualizados:")
for f in updated_files:
    print(f"  - {f.replace(BASE_DIR + '/', '')}")
