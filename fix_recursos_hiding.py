#!/usr/bin/env python3
import os
import re

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
        
    orig_html = html
    
    # 1. Clean up previous broken comments if present
    # If "RECURSOS OCULTO TEMPORALMENTE" is present, let's restore it first to a clean state
    if "RECURSOS OCULTO TEMPORALMENTE" in html:
        # Pattern: <!-- RECURSOS OCULTO TEMPORALMENTE\n...-->
        # We can find where "<!-- RECURSOS OCULTO TEMPORALMENTE" starts and find the closing --> after line 328
        start_idx = html.find("<!-- RECURSOS OCULTO TEMPORALMENTE")
        if start_idx != -1:
            # Restore the broken comment header
            html = html.replace("<!-- RECURSOS OCULTO TEMPORALMENTE\n<!-- [OCULTO] ENLACE RECURSOS (ACTIVO CON MEGA MENÚ) -->", "<!-- ENLACE RECURSOS (ACTIVO CON MEGA MENÚ) -->")
            # Remove trailing --> right before <a href="/sobre-nosotros"
            html = re.sub(r'-->\s*(<a\s+href="[^"]*sobre-nosotros)', r'\1', html)
            # Remove header comment wrapper if it's there
            html = html.replace("<!-- RECURSOS OCULTO TEMPORALMENTE\n", "")

    # 2. Now process clean desktop menu
    comment_tag = "<!-- ENLACE RECURSOS (ACTIVO CON MEGA MENÚ) -->"
    start_idx = html.find(comment_tag)
    if start_idx != -1:
        div_start = html.find("<div", start_idx)
        if div_start != -1:
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
                raw_block = html[start_idx:i]
                # Sanitize all inner comments so the browser does NOT close the comment early!
                sanitized_block = raw_block.replace("<!--", "{!--").replace("-->", "--}")
                commented_block = f"<!-- RECURSOS OCULTO TEMPORALMENTE\n{sanitized_block}\n-->"
                html = html[:start_idx] + commented_block + html[i:]
                print(f"  [Desktop] Successfully commented out resources dropdown in {filepath}")
            else:
                print(f"  [Desktop] Warning: Nesting mismatch in {filepath}")

    # 3. Process mobile link if not already commented safely
    if "MOBILE RECURSOS OCULTO TEMPORALMENTE" in html:
        # Clean up any broken mobile comment
        html = re.sub(r'<!-- MOBILE RECURSOS OCULTO TEMPORALMENTE\n(.*?)\n-->', r'\1', html, flags=re.DOTALL)
        
    match = re.search(r'(<a\s+href="[^"]*recursos/?"\s+class="[^"]*mobile-link[^"]*"[^>]*>\s*Recursos\s*(?:<span[^>]*>[^<]*</span>)?\s*</a>)', html, re.IGNORECASE)
    if match:
        block = match.group(1)
        sanitized_mobile = block.replace("<!--", "{!--").replace("-->", "--}")
        commented_mobile = f"<!-- MOBILE RECURSOS OCULTO TEMPORALMENTE\n{sanitized_mobile}\n-->"
        html = html.replace(block, commented_mobile)
        print(f"  [Mobile] Successfully commented out resources link in {filepath}")

    if html != orig_html:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"Saved: {filepath}")

def main():
    html_files = []
    for root, dirs, files in os.walk('.'):
        if any(p in root for p in ['.git', '.gemini', 'node_modules', 'recursos', 'nexum-cars']):
            continue
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))

    for filepath in html_files:
        if any(p in filepath for p in ['standard_nav.html', 'new_mega_menu.html', 'tabs_menu.html', 'tabs_output.html', 'reviews.html']):
            continue
        fix_file(filepath)

if __name__ == '__main__':
    main()
