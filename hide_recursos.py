#!/usr/bin/env python3
import os
import re

def main():
    # Find all HTML files
    html_files = []
    for root, dirs, files in os.walk('.'):
        # Skip directories we don't want to modify
        if any(p in root for p in ['.git', '.gemini', 'node_modules', 'recursos', 'nexum-cars']):
            continue
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))

    for filepath in html_files:
        # Skip templates or support files
        if any(p in filepath for p in ['standard_nav.html', 'new_mega_menu.html', 'tabs_menu.html', 'tabs_output.html', 'reviews.html']):
            continue
            
        print(f"Processing: {filepath}")
        with open(filepath, 'r', encoding='utf-8') as f:
            html = f.read()
            
        modified = False
        
        # 1. Desktop menu
        if "RECURSOS OCULTO TEMPORALMENTE" not in html:
            comment_tag = "<!-- ENLACE RECURSOS (ACTIVO CON MEGA MENÚ) -->"
            start_idx = html.find(comment_tag)
            if start_idx != -1:
                div_start = html.find("<div", start_idx)
                if div_start != -1:
                    # Count div nesting
                    count = 0
                    i = div_start
                    n = len(html)
                    while i < n:
                        if html[i:i+4] == "<div":
                            count += 1
                            i += 4
                        elif html[i:i+6] == "</div>":
                            count -= 1
                            i += 6
                            if count == 0:
                                break
                        else:
                            i += 1
                    if count == 0:
                        block = html[start_idx:i]
                        hidden_block = block.replace("<!-- ENLACE RECURSOS (ACTIVO CON MEGA MENÚ) -->", "<!-- [OCULTO] ENLACE RECURSOS (ACTIVO CON MEGA MENÚ) -->")
                        commented_block = f"<!-- RECURSOS OCULTO TEMPORALMENTE\n{hidden_block}\n-->"
                        html = html[:start_idx] + commented_block + html[i:]
                        modified = True
                        print(f"  [Desktop] Commented resources dropdown in {filepath}")
                    else:
                        print(f"  [Desktop] Warning: Nesting mismatch in {filepath}")
            else:
                print(f"  [Desktop] Comment tag not found in {filepath}")
        else:
            print(f"  [Desktop] Already hidden in {filepath}")
                        
        # 2. Mobile menu
        if "MOBILE RECURSOS OCULTO TEMPORALMENTE" not in html:
            # Match mobile link
            match = re.search(r'(<a\s+href="[^"]*recursos/?"\s+class="[^"]*mobile-link[^"]*"[^>]*>\s*Recursos\s*(?:<span[^>]*>[^<]*</span>)?\s*</a>)', html, re.IGNORECASE)
            if match:
                block = match.group(1)
                commented_block = f"<!-- MOBILE RECURSOS OCULTO TEMPORALMENTE\n{block}\n-->"
                html = html.replace(block, commented_block)
                modified = True
                print(f"  [Mobile] Commented resources link in {filepath}")
            else:
                print(f"  [Mobile] Link not found in {filepath}")
        else:
            print(f"  [Mobile] Already hidden in {filepath}")
                
        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(html)
            print(f"  Saved changes to {filepath}")

if __name__ == '__main__':
    main()
