import re

with open('index.html', 'r') as f:
    index_html = f.read()

modal_match = re.search(r'<div id="contact-modal".*?</div>\s*</div>', index_html, re.DOTALL)
if modal_match:
    modal_html = modal_match.group(0)
else:
    print("modal not found")
    exit(1)

scripts_match = re.search(r'function openModal\(\).*?function closeModal\(\).*?\}', index_html, re.DOTALL)
if scripts_match:
    modal_script = '<script>\n' + scripts_match.group(0) + '\n</script>'
else:
    print("scripts not found")
    exit(1)

with open('marketing-digital/index.html', 'r') as f:
    md_html = f.read()

# insert modal_html after <div id="mouse-glow"></div>
glow_idx = md_html.find('<div id="mouse-glow"></div>')
if glow_idx != -1:
    md_html = md_html[:glow_idx + 27] + '\n\n' + modal_html + md_html[glow_idx + 27:]
else:
    print("glow not found")

# insert script before <div id="mega-menu"
mega_idx = md_html.find('<div id="mega-menu"')
if mega_idx != -1:
    md_html = md_html[:mega_idx] + '\n' + modal_script + '\n' + md_html[mega_idx:]

with open('marketing-digital/index.html', 'w') as f:
    f.write(md_html)
print("fixed md")
