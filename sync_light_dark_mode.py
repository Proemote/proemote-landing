import os
import re

def process_classes(class_str):
    classes = class_str.split()
    new_classes = []
    
    # Check if the element has explicit dark mode handling already
    # or if it's a primary/brand button that should stay white text
    has_dark = any(c.startswith('dark:') for c in classes)
    is_violet_bg = any('bg-brand-violet' in c or 'bg-violet-' in c or 'bg-primary' in c for c in classes)
    is_gradient = any('from-violet' in c or 'from-primary' in c for c in classes)
    
    for c in classes:
        # If it's already handled, or it's a specific button style, we might skip replacing it
        if has_dark and ('dark:' in c):
            new_classes.append(c)
            continue
            
        new_c = c
        
        # Backgrounds
        if c == 'bg-[#05020a]':
            new_c = 'bg-white dark:bg-[#05020a]'
        elif c == 'bg-white/5' or c == 'bg-white/[0.05]':
            new_c = 'bg-gray-100 dark:' + c
        elif c == 'bg-white/10' or c == 'bg-white/[0.1]':
            new_c = 'bg-gray-200 dark:' + c
        elif c == 'bg-[#09090b]':
            new_c = 'bg-white dark:bg-[#09090b]'
        elif c == 'bg-bgMain':
            new_c = 'bg-white dark:bg-bgMain'
        elif c.startswith('bg-bgSurface'):
            parts = c.split('/')
            if len(parts) == 2:
                opacity = parts[1]
                if opacity in ['50', '40']:
                    new_c = f'bg-white dark:{c}'
                else:
                    new_c = f'bg-gray-50 dark:{c}'
            else:
                new_c = 'bg-white dark:bg-bgSurface'
            
        # Text
        elif c == 'text-textMain':
            new_c = 'text-gray-900 dark:text-textMain'
        elif c == 'text-textSecondary':
            new_c = 'text-gray-600 dark:text-textSecondary'
        elif c.startswith('text-white'):
            # Only change text-white if it's NOT on a violet background
            if not is_violet_bg and not is_gradient:
                if c == 'text-white':
                    new_c = 'text-gray-900 dark:text-white'
                elif c == 'text-white/90':
                    new_c = 'text-gray-800 dark:text-white/90'
                elif c == 'text-white/80' or c == 'text-white/70':
                    new_c = 'text-gray-700 dark:' + c
                elif c == 'text-white/60' or c == 'text-white/50':
                    new_c = 'text-gray-600 dark:' + c
                elif c == 'text-white/40' or c == 'text-white/30':
                    new_c = 'text-gray-500 dark:' + c
                elif c == 'text-white/20' or c == 'text-white/10':
                    new_c = 'text-gray-400 dark:' + c
                    
        # Borders
        elif c.startswith('border-white'):
            if c == 'border-white/5' or c == 'border-white/10':
                new_c = 'border-gray-200 dark:' + c
            elif c == 'border-white/20' or c == 'border-white/30':
                new_c = 'border-gray-300 dark:' + c
            elif c == 'border-white':
                new_c = 'border-gray-200 dark:border-white'
                
        # Hover backgrounds
        elif c.startswith('hover:bg-white'):
            if c == 'hover:bg-white/5' or c == 'hover:bg-white/[0.04]':
                new_c = 'hover:bg-gray-100 dark:' + c
            elif c == 'hover:bg-white/10':
                new_c = 'hover:bg-gray-200 dark:' + c

        # Gradients
        elif c.startswith('from-[#05020a]'):
            new_c = 'from-white dark:from-[#05020a]'
        elif c.startswith('to-[#05020a]'):
            new_c = 'to-white dark:to-[#05020a]'
            
        new_classes.append(new_c)
        
    return " ".join(new_classes)

def apply_light_mode(html_content):
    # Regex to find class="..."
    def replacer(match):
        full_attr = match.group(0)
        class_content = match.group(1)
        new_class_content = process_classes(class_content)
        return f'class="{new_class_content}"'
    
    return re.sub(r'class="([^"]*)"', replacer, html_content)

def main():
    root_dir = '/Users/carlosmolinamarquez/Desktop/proemote-landing'
    # Exclude index.html because user already made changes there
    exclude_files = [
        os.path.join(root_dir, 'index.html'),
        os.path.join(root_dir, 'landing_precios_proemote_redise_o.html')
    ]
    
    for subdir, _, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(subdir, file)
                
                # skip excluded files
                if filepath in exclude_files:
                    continue
                    
                print(f"Processing: {filepath}")
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                new_content = apply_light_mode(content)
                
                # Special cases for body background if it wasn't caught
                if '<body' in new_content and 'dark:bg-[#05020a]' not in new_content:
                    new_content = new_content.replace('<body class="antialiased font-sans flex flex-col min-h-screen bg-[#05020a]', '<body class="antialiased font-sans flex flex-col min-h-screen bg-gray-50 dark:bg-[#05020a]')
                
                if content != new_content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"  -> Updated {filepath}")

if __name__ == '__main__':
    main()
