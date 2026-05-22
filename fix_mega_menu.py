import re
import os

with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

# Instead of looking for </body>, let's just grab the div based on balanced tags or just everything from id="mega-menu" to the end before </body>
match = re.search(r'(<div id="mega-menu".*?)</body>', index_content, re.DOTALL)
if match:
    mega_menu_html = match.group(1)
else:
    print("Mega menu not found!")
    exit(1)

for page in ['marketing-digital/index.html', 'branding-y-estrategia/index.html']:
    with open(page, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '<div id="mega-menu"' not in content:
        content = content.replace('</body>', mega_menu_html + '\n</body>')
        with open(page, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Injected mega menu into {page}")
    else:
        print(f"Mega menu already in {page}")
