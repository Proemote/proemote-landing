import re

# Read the official footer from redes-sociales/index.html
with open('redes-sociales/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

footer_match = re.search(r'(<footer class="bg-bgMain border-t border-white/5 pt-20 pb-8 relative z-10">.*?</footer\s*>)', content, re.DOTALL)
if not footer_match:
    print("Could not find official footer")
    exit(1)

official_footer = footer_match.group(1)

# Now update eventos/index.html
def update_footer(filepath, official_footer):
    with open(filepath, 'r', encoding='utf-8') as f:
        file_content = f.read()
    
    # Check if there's a footer tag
    if re.search(r'<footer.*?</footer\s*>', file_content, re.DOTALL):
        new_content = re.sub(r'<footer.*?</footer\s*>', official_footer, file_content, flags=re.DOTALL)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated footer in {filepath}")
    else:
        print(f"No footer found in {filepath}")

update_footer('eventos/index.html', official_footer)
update_footer('aviso-legal/index.html', official_footer)
update_footer('privacidad/index.html', official_footer)
