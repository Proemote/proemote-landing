import os
import re

with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

match = re.search(r'(<div id="mega-menu".*?)</body>', index_content, re.DOTALL)
if match:
    mega_menu_html = match.group(1)
else:
    print("Mega menu not found in index.html!")
    exit(1)

html_files = []
for root, dirs, files in os.walk('.'):
    if '.git' in root or '.gemini' in root or 'nexum-cars' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            if filepath == './index.html' or filepath == 'index.html':
                continue
            html_files.append(filepath)

for filepath in html_files:
    # Skip template files
    if any(p in filepath for p in ['standard_nav.html', 'new_mega_menu.html', 'tabs_menu.html', 'tabs_output.html', 'reviews.html']):
        continue

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    orig = content
    if '<div id="mega-menu"' in content:
        # replace existing
        content = re.sub(r'<div id="mega-menu".*?</body>', mega_menu_html + '\n</body>', content, flags=re.DOTALL)
    else:
        # Check if </body> exists using regex
        if '</body>' in content:
            # Use plain string replacement to avoid regex backslash issues
            content = content.replace('</body>', mega_menu_html + '\n</body>')
        else:
            print(f"NO </body> TAG IN {filepath}")
    
    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Synced mega menu in {filepath}")
