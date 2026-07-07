import os
import re

# Read the new footer from 'inicio nuevo.html'
with open('inicio nuevo.html', 'r', encoding='utf-8') as f:
    content = f.read()

# We look for <footer class="relative z-10 bg-[#05020a] ... </footer>
footer_match = re.search(r'(<footer class="relative z-10 bg-\[#05020a\].*?</footer\s*>)', content, re.DOTALL)
if not footer_match:
    print("Could not find new footer in 'inicio nuevo.html'")
    exit(1)

new_footer = footer_match.group(1)
print("Found new footer successfully.")

def update_footer(filepath):
    # Skip inicio nuevo.html and index nuevo.html (index nuevo might be different or same, but user asked to apply it to services, helps, resources, etc.)
    # Actually, we should apply it to all pages requested by the user.
    if os.path.basename(filepath) in ['inicio nuevo.html']:
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        file_content = f.read()
    
    # Try to find a footer tag
    if re.search(r'<footer.*?</footer\s*>', file_content, re.DOTALL):
        # We replace the existing footer with the new footer
        updated_content = re.sub(r'<footer.*?</footer\s*>', new_footer, file_content, flags=re.DOTALL)
        if file_content != updated_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            print(f"Updated footer in: {filepath}")
    else:
        # If there is no footer, but maybe standard layout, check if we want to print
        pass

# Walk through directories
exclude_dirs = ['.git', '.gemini', 'node_modules', 'nexum-cars']

for root, dirs, files in os.walk('.'):
    # Filter out excluded directories
    dirs[:] = [d for d in dirs if d not in exclude_dirs]
    
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            update_footer(filepath)
