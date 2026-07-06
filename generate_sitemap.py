import os
import xml.etree.ElementTree as ET
from xml.dom import minidom
from datetime import datetime

DOMAIN = "https://proemote.es"

exclude_dirs = {
    'demo-lessandra', 'demo-web', 'demo-yeimy', 'node_modules', '.claude', '.git', 
    'scratch', 'nexum-cars', 'diagnostico-negocio', 'foco-system' # Some might be excluded
}

def get_urls():
    urls = []
    for root, dirs, files in os.walk('.'):
        # Exclude directories
        dirs[:] = [d for d in dirs if d not in exclude_dirs and not d.startswith('.')]
        
        for file in files:
            if file == 'index.html':
                # Convert path to URL
                path = os.path.relpath(root, '.')
                if path == '.':
                    loc = f"{DOMAIN}/"
                    priority = "1.0"
                    changefreq = "weekly"
                else:
                    loc = f"{DOMAIN}/{path}/"
                    priority = "0.8"
                    changefreq = "monthly"
                    
                # Specific priorities
                if path in ['aviso-legal', 'privacidad']:
                    priority = "0.3"
                    changefreq = "yearly"
                elif path.startswith('portfolio/'):
                    priority = "0.6"
                    
                urls.append({
                    'loc': loc.replace('\\', '/'),
                    'changefreq': changefreq,
                    'priority': priority
                })
    return sorted(urls, key=lambda x: x['loc'])

def create_sitemap(urls):
    urlset = ET.Element('urlset', xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")
    
    for u in urls:
        url_el = ET.SubElement(urlset, 'url')
        loc = ET.SubElement(url_el, 'loc')
        loc.text = u['loc']
        changefreq = ET.SubElement(url_el, 'changefreq')
        changefreq.text = u['changefreq']
        priority = ET.SubElement(url_el, 'priority')
        priority.text = u['priority']
        
    xmlstr = minidom.parseString(ET.tostring(urlset)).toprettyxml(indent="    ")
    # Remove empty lines from minidom output
    xmlstr = '\n'.join([line for line in xmlstr.split('\n') if line.strip()])
    
    # ensure correct XML declaration
    if not xmlstr.startswith("<?xml"):
        xmlstr = '<?xml version="1.0" encoding="UTF-8"?>\n' + xmlstr
        
    return xmlstr

if __name__ == '__main__':
    urls = get_urls()
    sitemap_content = create_sitemap(urls)
    with open('sitemap.xml', 'w', encoding='utf-8') as f:
        f.write(sitemap_content)
    print("Sitemap generated successfully with", len(urls), "URLs.")
