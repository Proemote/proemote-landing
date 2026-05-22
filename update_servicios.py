import re

with open('servicios/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

with open('reviews.html', 'r', encoding='utf-8') as f:
    reviews = f.read()

with open('drag_scroll.js', 'r', encoding='utf-8') as f:
    drag_scroll = f.read()

# Remove the line `// 4. API Soberana (Formularios)` from the end of drag_scroll.js
drag_scroll = drag_scroll.replace('// 4. API Soberana (Formularios)', '').strip()

# Insert reviews section before FAQ
content = content.replace('<!-- 8. FAQ SECTION -->', reviews + '\n\n    <!-- 8. FAQ SECTION -->')

# In servicios/index.html we have:
# <script>
#         
#             // Aplicamos motor físico al slider de logos
#             enableDragScroll('logos-container', true);
# 
#         // Lógica Hover Mega Menú (Solo Desktop)

# We need to replace the enableDragScroll part with our whole drag_scroll logic
search_str = """    <script>
        
            // Aplicamos motor físico al slider de logos
            enableDragScroll('logos-container', true);

        // Lógica Hover Mega Menú (Solo Desktop)"""

replacement_str = f"""    <script>
{drag_scroll}

        // Lógica Hover Mega Menú (Solo Desktop)"""

if search_str in content:
    content = content.replace(search_str, replacement_str)
else:
    print("Warning: Script replacement block not found.")

with open('servicios/index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated servicios/index.html successfully.")
