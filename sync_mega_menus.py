import os
import re

with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

# Extract mega menu and scripts from index.html
match = re.search(r'(<div id="mega-menu".*?)</body>', index_content, re.DOTALL)
if match:
    mega_menu_html = match.group(1)
else:
    print("Mega menu not found in index.html!")
    exit(1)

for root, dirs, files in os.walk('.'):
    if '.git' in root or '.gemini' in root or 'nexum-cars' in root:
        continue
    for file in files:
        if file.endswith('.html') and file != 'index.html':
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            orig = content
            if '<div id="mega-menu"' in content:
                content = re.sub(r'<div id="mega-menu".*?</body>', mega_menu_html + '\n</body>', content, flags=re.DOTALL)
            else:
                # Append it before </body> if not present
                content = content.replace('</body>', mega_menu_html + '\n</body>')
            
            if content != orig:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Synced mega menu in {filepath}")

