import re

# Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()
content = re.sub(
    r'(<div class="glass-card[^>]*?onclick="window.location.href=\')([^\']*)(\'">\s*<i[^>]*?></i>\s*<h3[^>]*?>Organización Integral</h3>)',
    r'\g<1>/eventos/organizacion-integral\3',
    content
)
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

# Update servicios/index.html
with open('servicios/index.html', 'r', encoding='utf-8') as f:
    content = f.read()
content = re.sub(
    r'(<div class="glass-card[^>]*?onclick="window.location.href=\')([^\']*)(\'">\s*<i[^>]*?></i>\s*<h3[^>]*?>Organización Integral</h3>)',
    r'\g<1>/eventos/organizacion-integral\3',
    content
)
with open('servicios/index.html', 'w', encoding='utf-8') as f:
    f.write(content)

# Update eventos/index.html
with open('eventos/index.html', 'r', encoding='utf-8') as f:
    content = f.read()
# change <a href="#produccion" ... >Organizar un evento</a>
# to <a href="/eventos/organizacion-integral" ...>Organizar un evento</a>
content = re.sub(
    r'<a href="(#produccion|/contacto|#)"([^>]*?>\s*Organizar(?: un)? evento\s*</a>)',
    r'<a href="/eventos/organizacion-integral"\2',
    content
)
with open('eventos/index.html', 'w', encoding='utf-8') as f:
    f.write(content)

