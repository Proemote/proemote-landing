import re

filepath = '/Users/carlosmolinamarquez/Desktop/proemote-landing/index.html'

with open(filepath, 'r') as f:
    content = f.read()

# Remove automatizaciones-y-sistemas from mega menu
content = re.sub(r'<a href="/automatizaciones-y-sistemas" class="group flex items-start gap-4">.*?</a>', '', content, flags=re.DOTALL)

with open(filepath, 'w') as f:
    f.write(content)
