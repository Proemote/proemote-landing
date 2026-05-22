import os
import glob

with open('new_mega_menu.html', 'r', encoding='utf-8') as f:
    new_menu = f.read()

# Find all html files
html_files = []
for root, dirs, files in os.walk('.'):
    if '.gemini' in root or '.git' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            html_files.append(os.path.join(root, file))

for file_path in html_files:
    if file_path == './new_mega_menu.html' or file_path == './drag_scroll.js' or file_path == './reviews.html':
        continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # find the mega-menu div
    start_index = content.find('<div id="mega-menu"')
    if start_index == -1:
        continue
    
    # We replace everything from start_index to the end of the file with new_menu
    content = content[:start_index] + new_menu
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Updated {file_path}")

