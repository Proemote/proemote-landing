import os

root_dir = '/Users/carlosmolinamarquez/Desktop/proemote-landing'

for root, _, files in os.walk(root_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original = content
            
            # Remove the background re-declaration in .active .glass-card
            bad_css = ".foco-item.active .glass-card { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(0, 0, 0, 0.05); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }"
            good_css = ".foco-item.active .glass-card { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }"
            
            content = content.replace(bad_css, good_css)
            
            # Also just in case, do it with flexible spacing
            import re
            content = re.sub(
                r'\.foco-item\.active\s*\.glass-card\s*\{[^}]*background:[^}]*\}',
                r'.foco-item.active .glass-card { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }',
                content
            )
            
            # Let's also fix dark mode specificity
            content = content.replace('.dark .glass-card {', '.dark .glass-card, .dark .foco-item .glass-card, .dark .foco-item.active .glass-card {')

            if content != original:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)

print("Fixed CSS bug for foco-item active")
