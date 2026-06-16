import os

filepath = '/Users/carlosmolinamarquez/Desktop/proemote-landing/index.html'

with open(filepath, 'r') as f:
    content = f.read()

# 1. Remove the theme toggle from mobile menu
content = content.replace('<button id="mobile-theme-toggle" class="mt-4 flex items-center gap-2 text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white">Cambiar tema</button>', '')

# 2. Add it to the mobile header (next to the hamburger menu)
old_mobile_header = """            <div class="md:hidden flex items-center gap-4 relative z-10">
                <button id="mobile-menu-btn" class="text-gray-800 dark:text-white/80 p-1" aria-label="Abrir menú">"""

new_mobile_header = """            <div class="md:hidden flex items-center gap-4 relative z-10">
                <button id="mobile-theme-toggle" class="text-gray-800 dark:text-white/80 p-1" aria-label="Cambiar tema">
                    <i class="ph ph-moon dark:hidden text-xl"></i>
                    <i class="ph ph-sun hidden dark:block text-xl"></i>
                </button>
                <button id="mobile-menu-btn" class="text-gray-800 dark:text-white/80 p-1" aria-label="Abrir menú">"""

content = content.replace(old_mobile_header, new_mobile_header)

with open(filepath, 'w') as f:
    f.write(content)
