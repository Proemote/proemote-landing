import os
import re

def replace_links_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace hardcoded absolute domain links with root-relative paths
    # We replace:
    # "https://proemote.es/" -> "/"
    # "https://proemote.es/portfolio" -> "/portfolio"
    # "https://proemote.es" -> "/"
    
    updated_content = content
    updated_content = re.sub(r'href="https://proemote\.es/portfolio"', 'href="/portfolio"', updated_content)
    updated_content = re.sub(r'href="https://proemote\.es/servicios"', 'href="/servicios"', updated_content)
    updated_content = re.sub(r'href="https://proemote\.es/"', 'href="/"', updated_content)
    updated_content = re.sub(r'href="https://proemote\.es"', 'href="/"', updated_content)

    if updated_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        print(f"Updated links in: {filepath}")

exclude_dirs = ['.git', '.gemini', 'node_modules', 'nexum-cars']

for root, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if d not in exclude_dirs]
    for file in files:
        if file.endswith('.html'):
            replace_links_in_file(os.path.join(root, file))
