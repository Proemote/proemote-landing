import io

filepath = '/Users/carlosmolinamarquez/Desktop/proemote-landing/automatizaciones-y-sistemas/index.html'

with io.open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the specific block with the extra div
old_block = """            </div>
        </div>
    </div>
    
    <script>
    /* Fix: sync announcement bar (fixed) + nav position */"""

new_block = """            </div>
        </div>
    
    <script>
    /* Fix: sync announcement bar (fixed) + nav position */"""

content = content.replace(old_block, new_block)

with io.open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
