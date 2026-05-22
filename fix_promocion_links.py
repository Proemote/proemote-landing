import re

files_to_check = ['index.html', 'servicios/index.html', 'eventos/index.html']

for filepath in files_to_check:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all 'glass-card' divs that have 'Promoción Digital'
    matches = re.finditer(r'<div class="[^"]*glass-card[^"]*cursor-pointer"[^>]*onclick="window\.location\.href=\'(.*?)\'"[^>]*>(.*?)<h3[^>]*>Promoción Digital</h3>', content, re.DOTALL)
    
    for match in matches:
        old_href = match.group(1)
        if old_href != '/eventos/promocion-digital-eventos':
            new_div = match.group(0).replace(f"window.location.href='{old_href}'", "window.location.href='/eventos/promocion-digital-eventos'")
            content = content.replace(match.group(0), new_div)
            
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Updated {filepath}")

