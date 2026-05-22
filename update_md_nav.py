with open('marketing-digital/index.html', 'r') as f:
    content = f.read()

with open('standard_nav.html', 'r') as f:
    nav = f.read()

start_index = content.find('<nav class="fixed w-full z-50 glass-nav">')
end_index = content.find('</nav>') + 6

if start_index != -1 and end_index != -1:
    content = content[:start_index] + nav + content[end_index:]
    with open('marketing-digital/index.html', 'w') as f:
        f.write(content)
    print("Nav updated")
else:
    print("Nav not found")
