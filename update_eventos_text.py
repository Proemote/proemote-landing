import os

with open('eventos/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Make the hero padding smaller
content = content.replace('pt-48 pb-20', 'pt-32 pb-16')

# Update the h1 tag
old_h1 = '''<h1 class="font-heading text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6 text-white">
                Creamos eventos que se recuerdan. Y te damos <span class="text-gradient-primary">todo lo que necesitas</span> para hacerlo posible.
            </h1>'''

new_h1 = '''<h1 class="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6 text-white">
                Creamos eventos que se recuerdan.<br>
                Y te damos <span class="text-gradient-primary">todo lo que necesitas</span><br>
                para hacerlo posible.
            </h1>'''

content = content.replace(old_h1, new_h1)

with open('eventos/index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated eventos/index.html")
