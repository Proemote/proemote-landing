import json
import re

transcript_path = '/Users/carlosmolinamarquez/.gemini/antigravity-ide/brain/443a5b8e-3b5a-4767-812d-ee0a36b12431/.system_generated/logs/transcript.jsonl'
target_file = '/Users/carlosmolinamarquez/Desktop/proemote-landing/redes-sociales/index.html'

last_user_input = ""
with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            entry = json.loads(line)
            if entry.get('type') == 'USER_INPUT':
                last_user_input = entry.get('content', '')
        except:
            pass

# Extract the HTML part
html_start = last_user_input.find('<!DOCTYPE html>')
if html_start != -1:
    html_content = last_user_input[html_start:]
    # Remove any trailing tags like </USER_REQUEST> if present
    html_content = html_content.split('</USER_REQUEST>')[0].strip()
    
    with open(target_file, 'w', encoding='utf-8') as f:
        f.write(html_content)
    print("Successfully wrote the new HTML to", target_file)
else:
    print("Could not find <!DOCTYPE html> in the last user input.")
