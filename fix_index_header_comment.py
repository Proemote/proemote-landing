import io

filepath = '/Users/carlosmolinamarquez/Desktop/proemote-landing/index.html'

with io.open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add the comment before the fixed header div
content = content.replace('<div class="fixed top-6 left-0 w-full z-50 flex justify-center px-4">', '<!-- BARRA DE ANUNCIO GLOBAL -->\n    <div class="fixed top-6 left-0 w-full z-50 flex justify-center px-4">')

with io.open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
