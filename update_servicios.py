import re

# 1. Get the correct footer from index.html
with open('/Users/carlosmolinamarquez/Desktop/proemote-landing/index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

footer_start = index_content.find('<footer')
footer_end = index_content.find('</footer>', footer_start) + len('</footer>')
correct_footer = index_content[footer_start:footer_end]

# 2. Read the new HTML provided by the user (I will embed it in the script safely using a separate file or direct block)
