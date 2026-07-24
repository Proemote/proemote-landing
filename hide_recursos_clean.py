#!/usr/bin/env python3
"""
hide_recursos_clean.py
Elimina del HTML (en lugar de comentar) los bloques de Recursos en header desktop y menú móvil.
El código original queda guardado en git para restaurar cuando sea necesario.
"""
import os
import re

SKIP_DIRS = {'.git', '.gemini', 'node_modules', 'recursos', 'nexum-cars'}
SKIP_FILES = {'standard_nav.html', 'new_mega_menu.html', 'tabs_menu.html',
              'tabs_output.html', 'reviews.html', 'hide_recursos.py',
              'fix_recursos_hiding.py', 'hide_recursos_clean.py'}

def remove_desktop_block(html):
    """
    Elimina todo el bloque del mega menú de Recursos (desktop).
    Detecta el marcador <!-- ENLACE RECURSOS ... --> o la variante con {!-- ... --}
    y elimina el <div class="group/menu..."> que le sigue, incluyendo todos sus hijos.
    También elimina cualquier wrapper <!-- RECURSOS OCULTO TEMPORALMENTE ... --> previo.
    """

    # 1. Primero limpiar el wrapper de comentario viejo si existe
    #    Patrón: <!-- RECURSOS OCULTO TEMPORALMENTE\n...-->\n
    html = re.sub(
        r'<!-- RECURSOS OCULTO TEMPORALMENTE\n(.*?)-->\n?',
        lambda m: restore_inner(m.group(1)),
        html,
        flags=re.DOTALL
    )

    # 2. Ahora buscar el marcador y eliminar el bloque
    marker = '<!-- ENLACE RECURSOS (ACTIVO CON MEGA MENÚ) -->'
    idx = html.find(marker)
    if idx == -1:
        return html, False  # ya eliminado o no existe

    # Encontrar el <div class="group/menu que sigue
    div_start = html.find('<div', idx)
    if div_start == -1:
        return html, False

    # Contar divs para encontrar el cierre
    count = 0
    i = div_start
    n = len(html)
    while i < n:
        if html[i:i+4] == '<div':
            count += 1
            i += 4
        elif html[i:i+6] == '</div>':
            count -= 1
            i += 6
            if count == 0:
                break
        else:
            i += 1

    if count != 0:
        print(f"  [Desktop] WARN: nesting mismatch, skipping")
        return html, False

    # Eliminar desde el marker hasta el final del div
    html = html[:idx] + html[i:]
    return html, True


def restore_inner(inner):
    """Convierte {!-- --} de vuelta a <!-- --> para restaurar el HTML limpio antes de reprocessar."""
    inner = inner.replace('{!--', '<!--').replace('--}', '-->')
    # Eliminar marcador interno
    inner = inner.replace('<!-- [OCULTO] ENLACE RECURSOS (ACTIVO CON MEGA MENÚ) -->', '<!-- ENLACE RECURSOS (ACTIVO CON MEGA MENÚ) -->')
    return inner


def remove_mobile_link(html):
    """
    Elimina el enlace móvil a /recursos/ del menú móvil.
    Soporta variantes con o sin el wrapper de comentario previo.
    """
    # 1. Limpiar wrapper de comentario viejo si existe
    html = re.sub(
        r'<!-- MOBILE RECURSOS OCULTO TEMPORALMENTE\n(.*?)-->\n?',
        '', html, flags=re.DOTALL
    )

    # 2. Eliminar el enlace directo
    pattern = re.compile(
        r'\s*<a\s+href="[^"]*recursos/?"\s+class="[^"]*mobile-link[^"]*"[^>]*>\s*Recursos\s*(?:<span[^>]*>[^<]*</span>)?\s*</a>',
        re.IGNORECASE | re.DOTALL
    )
    new_html, n_subs = pattern.subn('', html)
    return new_html, n_subs > 0


def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()

    orig = html
    changed = False

    html, ok1 = remove_desktop_block(html)
    if ok1:
        print(f"  [Desktop] Removed recursos block")
        changed = True

    html, ok2 = remove_mobile_link(html)
    if ok2:
        print(f"  [Mobile]  Removed recursos link")
        changed = True

    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"  ✓ Saved {filepath}")
    else:
        print(f"  - No changes needed in {filepath}")


def main():
    html_files = []
    for root, dirs, files in os.walk('.'):
        # Evitar directorios excluidos
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for file in files:
            if file.endswith('.html') and file not in SKIP_FILES:
                html_files.append(os.path.join(root, file))

    for filepath in sorted(html_files):
        print(f"\nProcessing: {filepath}")
        process_file(filepath)

    print("\n✅ Terminado.")


if __name__ == '__main__':
    main()
