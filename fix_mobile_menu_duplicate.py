import os
import re

root_dir = '/Users/carlosmolinamarquez/Desktop/proemote-landing'

bad_script_pattern = re.compile(
    r'\s*// Mobile Menu Toggle\s*const mobileMenuBtn = document\.getElementById\(\'mobile-menu-btn\'\);\s*const mobileMenu = document\.getElementById\(\'mobile-menu\'\);\s*if \(mobileMenuBtn && mobileMenu\) \{\s*mobileMenuBtn\.addEventListener\(\'click\', \(\) => \{\s*mobileMenu\.classList\.toggle\(\'hidden\'\);\s*const icon = mobileMenuBtn\.querySelector\(\'i\'\);\s*icon\.classList\.toggle\(\'ph-dots-three-vertical\'\); icon\.classList\.toggle\(\'ph-x\'\);\s*\}\);\s*\}',
    re.MULTILINE
)

# And another variant where icon is checked if exists just in case
bad_script_pattern_2 = re.compile(
    r'\s*// Mobile Menu Toggle\s*const mobileMenuBtn = document\.getElementById\(\'mobile-menu-btn\'\);\s*const mobileMenu = document\.getElementById\(\'mobile-menu\'\);\s*if \(mobileMenuBtn && mobileMenu\) \{\s*mobileMenuBtn\.addEventListener\(\'click\', \(\) => \{\s*mobileMenu\.classList\.toggle\(\'hidden\'\);\s*(?:const )?icon = mobileMenuBtn\.querySelector\(\'i\'\);\s*if ?\(icon\).*?\}',
    re.DOTALL
)

for root, _, files in os.walk(root_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                
            new_content = bad_script_pattern.sub('', content)
            
            # just in case it looks slightly different, let's also remove any snippet that matches:
            # const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            # if it's inside a DOMContentLoaded block and has querySelector('i')
            if new_content == content and 'const mobileMenuBtn = document.getElementById(\'mobile-menu-btn\');' in content:
                # We'll use a broader regex if the exact one didn't match
                broader_pattern = re.compile(
                    r'\s*//\s*Mobile Menu Toggle\s*const mobileMenuBtn = document\.getElementById\(\'mobile-menu-btn\'\);.*?(?:icon\.classList\.toggle\(\'ph-x\'\);|\})\s*\}\);\s*\}',
                    re.DOTALL
                )
                new_content = broader_pattern.sub('', content)
                
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Fixed double menu toggle in: {filepath}")

print("Done fixing double mobile menu toggles.")
