import os
import re

def fix_body_class(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the body tag
    match = re.search(r'<body[^>]*class="([^"]*)"[^>]*>', content)
    if match:
        classes = match.group(1)
        if 'overflow-y-scroll' not in classes:
            new_classes = classes + ' overflow-y-scroll'
            # Replace the old class string with the new one for the body tag specifically
            # We use a regex that safely targets only the body tag
            new_content = re.sub(
                r'(<body[^>]*class=")([^"]*)("[^>]*>)',
                lambda m: m.group(1) + (m.group(2) + ' overflow-y-scroll' if 'overflow-y-scroll' not in m.group(2) else m.group(2)) + m.group(3),
                content
            )
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Fixed {filepath}")

exclude_dirs = ['.git', '.gemini', 'node_modules', 'nexum-cars']

for root, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if d not in exclude_dirs]
    for file in files:
        if file.endswith('.html'):
            fix_body_class(os.path.join(root, file))
