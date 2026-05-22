import os
import re
import glob

# Files to process: all index.html in subdirectories and root, plus any other html
html_files = glob.glob('**/*.html', recursive=True)

# 1. First, fix 'Sobre Nosotros' -> 'Sobre nosotros' in all files
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content.replace('>Sobre Nosotros<', '>Sobre nosotros<')
    
    # 2. Fix the double escaping of \' in the onerror attribute if present
    # It might be \\'
    new_content = new_content.replace("\\'", "\\'") # Wait, the actual text in file is \\' ?
    # Let's just use re.sub for the onerror string to be safe
    new_content = re.sub(r'xmlns=\\\\\'http', r"xmlns=\\'http", new_content)
    
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file}")

# 3. Now copy the standard header from index.html to redes-sociales/index.html
with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

# Match from <nav class="fixed to the first <section
match = re.search(r'(<nav class="fixed.*?)<section', index_content, re.DOTALL)
if match:
    nav_and_menu = match.group(1)
    
    with open('redes-sociales/index.html', 'r', encoding='utf-8') as f:
        redes_content = f.read()
    
    match_redes = re.search(r'(<nav class="fixed.*?)<section', redes_content, re.DOTALL)
    if match_redes:
        new_redes = redes_content[:match_redes.start(1)] + nav_and_menu + redes_content[match_redes.end(1):]
        with open('redes-sociales/index.html', 'w', encoding='utf-8') as f:
            f.write(new_redes)
        print("Restored header in redes-sociales/index.html")

