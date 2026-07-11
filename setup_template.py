import re

with open("recursos/plantilla pagina post.html", "r", encoding="utf-8") as f:
    html = f.read()

# Replace basic strings
html = html.replace("<title>Guía: Bot de WhatsApp con Claude | Proemote</title>", "<title>{{TITLE}} | Proemote</title>")
html = html.replace('content="Cómo armar un bot de WhatsApp que responde con Claude: contesta consultas al instante, agenda llamadas en Calendly y cualifica leads de forma automática."', 'content="{{DESCRIPTION}}"')

html = html.replace("Agentes IA\n                    </span>", "{{CATEGORY}}\n                    </span>")
html = html.replace('<i class="ph-fill ph-book-open"></i> Guía', '<i class="ph-fill ph-book-open"></i> {{TYPE}}')

title_block = """Bot de WhatsApp con Claude: <br class="hidden md:block">
                    <span class="text-gradient-primary">Atención automática 24/7</span>"""
html = html.replace(title_block, "{{TITLE}}")

desc_block = """Cómo armar un bot de WhatsApp que responde consultas al instante, agenda llamadas en Calendly y cualifica leads de forma automática sin escribir código."""
html = html.replace(desc_block, "{{DESCRIPTION}}")

html = html.replace("10 Jun, 2026", "{{DATE}}")
html = html.replace("6 min de lectura", "{{READ_TIME}} de lectura")
html = html.replace("https://images.unsplash.com/photo-1614064641913-6b7140414f15?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80", "{{IMAGE_URL}}")

# Replace content
start_content = html.find('<div class="flex-grow post-content w-full max-w-3xl">')
if start_content != -1:
    end_content = html.find('<div class="mt-16 relative w-full rounded-[2rem]', start_content)
    if end_content != -1:
        # We need to replace everything between start_content div and end_content
        # Let's find the closing tag of start_content... actually it's easier to just use regex
        pass

# Since the content is large, let's use a regex to replace between the post-content div and the CTA div.
pattern = re.compile(r'(<div class="flex-grow post-content w-full max-w-3xl">).*?(<div class="mt-16 relative w-full rounded-\[2rem\])', re.DOTALL)
html = pattern.sub(r'\1\n{{CONTENT}}\n                    \2', html)

with open("recursos/plantilla_base.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Template created at recursos/plantilla_base.html")
