import os
import re

target_dir = '/Users/carlosmolinamarquez/Desktop/proemote-landing'
extensions = ('.html', '.xml')

# Count of replacements
total_replacements = 0
files_modified = 0

for root, dirs, files in os.walk(target_dir):
    # skip .git or other ignored folders if needed
    if '.git' in root:
        continue

    for file in files:
        if file.endswith(extensions):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # We need to replace /diseno-web-SEO and /diseno-web-seo with /web-seo
            # We will use regex for case-insensitive exact matches of /diseno-web-seo
            # However, we only want to replace the exact phrase, not mess up anything else.
            
            # Pattern matches /diseno-web-seo (case insensitive)
            pattern = re.compile(r'/diseno-web-seo/?', re.IGNORECASE)
            
            # Count matches
            matches = pattern.findall(content)
            if matches:
                # To preserve trailing slash if any, we use a replacement function
                def replacer(match):
                    m = match.group(0)
                    if m.endswith('/'):
                        return '/web-seo/'
                    return '/web-seo'
                
                new_content = pattern.sub(replacer, content)
                
                if new_content != content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    total_replacements += len(matches)
                    files_modified += 1
                    print(f"Updated {file_path} ({len(matches)} occurrences)")

print(f"Total replacements: {total_replacements}")
print(f"Total files modified: {files_modified}")
