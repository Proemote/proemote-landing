import os
import re

root_dir = '/Users/carlosmolinamarquez/Desktop/proemote-landing'

html_files = []
for root, _, files in os.walk(root_dir):
    if '.gemini' in root or '.git' in root or 'nexum-cars' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            html_files.append(os.path.join(root, file))

markers = [
    r'<!-- 1\. HERO -->',
    r'<!-- 1\. HERO SECTION -->',
    r'<!-- HERO SECTION -->',
    r'<!-- HERO -->',
    r'<!-- 1\. DETALLE CASO -->',
    r'<!-- CONTENIDO -->',
    r'<main',
    r'<!-- SECCIÓN AVISO LEGAL -->',
    r'<!-- AVISO LEGAL -->',
    r'<!-- PRIVACIDAD -->',
    r'<!-- SECCIÓN POLÍTICA PRIVACIDAD -->',
    r'<!-- 1\. CONTENIDO -->',
    r'<!-- 1\. GRACIAS -->'
]

for fp in html_files:
    if any(p in fp for p in ['standard_nav.html', 'new_mega_menu.html', 'tabs_menu.html', 'tabs_output.html', 'reviews.html']):
        continue
        
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()
    
    body_match = re.search(r'<body[^>]*>', content, re.IGNORECASE)
    if not body_match:
        print(f"No body tag found in: {os.path.relpath(fp, root_dir)}")
        continue
    
    found_marker = None
    found_pos = -1
    for marker in markers:
        m = re.search(marker, content, re.IGNORECASE)
        if m:
            if found_pos == -1 or m.start() < found_pos:
                found_pos = m.start()
                found_marker = m.group(0)
                
    if found_pos == -1:
        # Check first section tag
        sect_match = re.search(r'<section', content, re.IGNORECASE)
        if sect_match:
            found_pos = sect_match.start()
            found_marker = "<section>"
            
    rel_path = os.path.relpath(fp, root_dir)
    if found_pos != -1:
        # Show first 100 characters after marker to verify
        snippet = content[found_pos:found_pos+100].replace('\n', ' ')
        print(f"File: {rel_path} -> Marker: {found_marker} -> Snippet: {snippet[:80]}")
    else:
        print(f"File: {rel_path} -> NO MARKER FOUND!")
