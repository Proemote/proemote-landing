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

new_footer_template = footer_match.group(1)
print("Found new footer successfully.")

def update_footer(filepath):
    if os.path.basename(filepath) in ['inicio nuevo.html']:
        return

    # Calculate relative path prefix based on file depth
    dir_path = os.path.dirname(filepath)
    # dir_path will be something like '.' or './eventos' or './portfolio/ana-goros'
    parts = [p for p in dir_path.split(os.sep) if p and p != '.']
    depth = len(parts)
    rel_path = '../' * depth

    # Replace the image src attributes with relative paths
    custom_footer = new_footer_template.replace('src="space bg.png"', f'src="{rel_path}space bg.png"')
    custom_footer = custom_footer.replace('src="proemote-logo-footer.png"', f'src="{rel_path}proemote-logo-footer.png"')

    with open(filepath, 'r', encoding='utf-8') as f:
        file_content = f.read()
    
    # Try to find a footer tag
    if re.search(r'<footer.*?</footer\s*>', file_content, re.DOTALL):
        # We replace the existing footer with the custom footer for this depth
        updated_content = re.sub(r'<footer.*?</footer\s*>', custom_footer, file_content, flags=re.DOTALL)
        if file_content != updated_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            print(f"Updated footer in: {filepath} with prefix '{rel_path}'")
    else:
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
