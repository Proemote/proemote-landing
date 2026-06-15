import os
import re

root_dir = '/Users/carlosmolinamarquez/Desktop/proemote-landing'

glass_card_regex = re.compile(r'\.glass-card\s*\{[^\}]+\}')
glass_card_replacement = """.glass-card { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(0, 0, 0, 0.05); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .dark .glass-card { background: linear-gradient(180deg, rgba(20, 20, 31, 0.9) 0%, rgba(20, 20, 31, 0.5) 100%); border: 1px solid rgba(255, 255, 255, 0.05); }"""

for dirpath, dirnames, filenames in os.walk(root_dir):
    for filename in filenames:
        if filename.endswith('.html'):
            filepath = os.path.join(dirpath, filename)
            with open(filepath, 'r') as f:
                content = f.read()

            original_content = content
            
            # 1. Fix glass-card CSS
            content = glass_card_regex.sub(glass_card_replacement, content)

            # 2. Fix filter bar (bg-bgMain/80 -> bg-white/90 dark:bg-bgMain/80)
            # Make sure we don't double replace
            if 'dark:bg-bgMain/80' not in content:
                content = content.replace('bg-bgMain/80', 'bg-white/90 dark:bg-bgMain/80')
            
            # Fix in index.html for bg-base/80
            if 'dark:bg-base/80' not in content:
                content = content.replace('bg-base/80', 'bg-white/90 dark:bg-base/80')

            # 3. Footer/Header colors fix ONLY for subpages
            if filepath != os.path.join(root_dir, 'index.html'):
                content = content.replace('dark:bg-base', 'dark:bg-bgMain')
                content = content.replace('bg-base', 'bg-bgMain')
                content = content.replace('text-marca', 'text-primary')
                content = content.replace('bg-marca', 'bg-primary')
                content = content.replace('border-marca', 'border-primary')
                content = content.replace('text-marcalight', 'text-accent')

            if content != original_content:
                with open(filepath, 'w') as f:
                    f.write(content)
                print(f"Updated {filepath}")

