with open('/Users/carlosmolinamarquez/Desktop/proemote-landing/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

start = html.find('<div id="mega-menu-panel"')
end = html.find('</div>\n    </div>\n\n    <!-- 2. HERO -->')
if end == -1:
    end = html.find('</nav>', start)
print(html[start:end])
