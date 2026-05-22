import os
import re

for root, dirs, files in os.walk('.'):
    if '.git' in root or '.gemini' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Use regex to find the exact svg tag and replace it with a clean one
            # The SVG starts with %3Csvg xmlns=... and ends with %3C/svg%3E
            
            clean_svg = "data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27150%27 height=%2740%27%3E%3Crect width=%27150%27 height=%2740%27 fill=%27none%27/%3E%3Ctext x=%2710%27 y=%2725%27 fill=%27%23fff%27 font-family=%27Arial%27 font-weight=%27bold%27 font-size=%2720%27%3EPROEMOTE%3C/text%3E%3C/svg%3E"
            
            # We want to replace onerror="this.src='data:image/svg+xml...'" with the clean one
            content = re.sub(
                r'onerror="this\.src=\'data:image/svg\+xml,%3Csvg xmlns=.*?%3C/svg%3E\'"',
                f'onerror="this.src=\'{clean_svg}\'"',
                content
            )

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
                
