with open('/Users/carlosmolinamarquez/Desktop/proemote-landing/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the logic for logos and reviews from index.html
js = content.split('<script>')[1] # the first <script> has tailwind config, wait no.
# Let's find "logos-track" or similar in index.html's script.
