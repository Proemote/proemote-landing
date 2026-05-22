import os
import re

html_files = []
for root, dirs, files in os.walk('.'):
    if '.gemini' in root or '.git' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            html_files.append(os.path.join(root, file))

search_str = '<p class="text-xs text-textSecondary">Reseña de Google</p>'
replace_str = '<p class="text-xs text-textSecondary flex items-center gap-1"><i class="ph-fill ph-google-logo text-white"></i> Reseña de Google</p>'

# Also handles variations where it might already be modified or has different whitespace
# A simple replace is fine since the HTML was exactly `<p class="text-xs text-textSecondary">Reseña de Google</p>`

count = 0
for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if search_str in content:
        content = content.replace(search_str, replace_str)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file_path}")
        count += 1

print(f"Done updating {count} files.")
