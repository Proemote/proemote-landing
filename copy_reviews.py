import re

with open('contacto/index.html', 'r', encoding='utf-8') as f:
    contacto = f.read()

# Extract the entire reviews-carousel div from contacto
# We know it starts with <div id="reviews-carousel" and ends before <div class="mt-8 flex justify-center
match = re.search(r'(<div id="reviews-carousel".*?)(?=\s*<div class="mt-8 flex justify-center)', contacto, re.DOTALL)
if not match:
    print("Carousel not found in contacto/index.html")
    exit(1)

carousel_html = match.group(1)

files_to_update = ['index.html', 'servicios/index.html', 'reviews.html']

for file in files_to_update:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # In index.html, it ends before <div class="mt-8 flex justify-center
    match_target = re.search(r'(<div id="reviews-carousel".*?)(?=\s*<div class="mt-8 flex justify-center)', content, re.DOTALL)
    if match_target:
        new_content = content[:match_target.start()] + carousel_html + content[match_target.end():]
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file}")
    else:
        print(f"Carousel not found in {file}")

