import re

files_to_check = ['index.html', 'servicios/index.html', 'eventos/index.html']

for filepath in files_to_check:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We are looking for something like:
    # <div class="glass-card ... cursor-pointer" onclick="window.location.href='#'">
    # ...
    # <h3 ...>Branding Visual del Evento</h3>
    # 
    # To replace '#' with '/eventos/branding-visual-del-evento'
    # 
    # It might be easier to just find the div block and replace it.
    
    # Find all 'glass-card' divs that have 'Branding Visual del Evento'
    matches = re.finditer(r'<div class="[^"]*glass-card[^"]*cursor-pointer"[^>]*onclick="window\.location\.href=\'(.*?)\'"[^>]*>(.*?)<h3[^>]*>Branding Visual del Evento</h3>', content, re.DOTALL)
    
    for match in matches:
        old_href = match.group(1)
        if old_href != '/eventos/branding-visual-del-evento':
            new_div = match.group(0).replace(f"window.location.href='{old_href}'", "window.location.href='/eventos/branding-visual-del-evento'")
            content = content.replace(match.group(0), new_div)
            
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Updated {filepath}")

