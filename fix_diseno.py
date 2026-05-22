import re

with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

# Extract from <nav class="fixed to the first <section
match = re.search(r'(<nav class="fixed.*?)<section', index_content, re.DOTALL)
nav_and_menu = match.group(1)

with open('diseno-web-SEO/index.html', 'r', encoding='utf-8') as f:
    diseno_content = f.read()

match_diseno = re.search(r'(<nav class="fixed.*?)<section', diseno_content, re.DOTALL)
if match_diseno:
    diseno_content = diseno_content[:match_diseno.start(1)] + nav_and_menu + diseno_content[match_diseno.end(1):]

with open('diseno-web-SEO/index.html', 'w', encoding='utf-8') as f:
    f.write(diseno_content)

print("Restored header in diseno-web-SEO")
