import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. HEAD changes
    head_addition = """    <title>Proemote® | Agencia de marketing digital en Extremadura</title>
    <meta name="description" content="Agencia de marketing digital en Mérida (Extremadura). Diseño web, SEO local y captación de clientes con el Método FOCO™. Resultados medibles en 30 días.">
    <link rel="canonical" href="https://proemote.es/">
    <meta name="robots" content="index, follow">"""
    content = re.sub(r'    <title>Proemote® \| Agencia de marketing digital en Extremadura</title>', head_addition, content, count=1)

    # 2. H4 and H5 in Navigation and Footer
    # Categories and Últimos Recursos
    content = re.sub(r'<h4([^>]*)>Categorías</h4>', r'<p\1>Categorías</p>', content)
    content = re.sub(r'<h4([^>]*)>Últimos Recursos</h4>', r'<p\1>Últimos Recursos</p>', content)

    # H5 in resources
    # Replace all h5 that have the specific class (Bot de WhatsApp, etc.)
    # The previous grep showed they have: class="text-xs font-heading font-medium text-gray-900 dark:text-white leading-snug group-hover/post:text-primary transition-colors line-clamp-2"
    content = re.sub(r'<h5 class="text-xs font-heading font-medium text-gray-900 dark:text-white leading-snug group-hover/post:text-primary transition-colors line-clamp-2">(.*?)</h5>', r'<p class="text-xs font-heading font-medium text-gray-900 dark:text-white leading-snug group-hover/post:text-primary transition-colors line-clamp-2">\1</p>', content)

    # H4 services in menu
    content = re.sub(r'<h4 class="text-gray-900 dark:text-white font-light text-sm group-hover:text-primary transition-colors mb-1">(.*?)</h4>', r'<p class="text-gray-900 dark:text-white font-light text-sm group-hover:text-primary transition-colors mb-1">\1</p>', content)
    
    # H4 services description
    content = re.sub(r'<h4 class="text-gray-900 dark:text-white font-sans font-light text-lg">(.*?)</h4>', r'<p class="text-gray-900 dark:text-white font-sans font-light text-lg">\1</p>', content)

    # Footer H4s
    content = re.sub(r'<h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-6 text-center md:text-left uppercase tracking-widest">(.*?)</h4>', r'<p class="text-sm font-semibold text-gray-900 dark:text-white mb-6 text-center md:text-left uppercase tracking-widest">\1</p>', content)

    # 3. MÉTODO FOCO
    # We change the F, O, C, O from h3 to span, and the words from span to h3.
    # Replace the h3 for F, O, C, O:
    content = re.sub(
        r'<h3 class="text-5xl md:text-6xl font-bold leading-none mb-2 bg-clip-text text-transparent bg-gradient-to-br from-violet-600 to-indigo-500 dark:from-marcalight dark:to-indigo-300">([FOCO])</h3>',
        r'<span class="text-5xl md:text-6xl font-bold leading-none mb-2 bg-clip-text text-transparent bg-gradient-to-br from-violet-600 to-indigo-500 dark:from-marcalight dark:to-indigo-300 block">\1</span>',
        content
    )
    # Replace the span for Fundamentos, Oportunidad, Conversión, Optimización:
    content = re.sub(
        r'<span class="text-\[10px\] tracking-widest text-gray-500 dark:text-white/60 uppercase font-semibold mb-3 block">(Fundamentos|Oportunidad|Conversión|Optimización)</span>',
        r'<h3 class="text-[10px] tracking-widest text-gray-500 dark:text-white/60 uppercase font-semibold mb-3 block">\1</h3>',
        content
    )
    # Also mobile FOCO stack:
    content = re.sub(
        r'<span class="text-\[10px\] tracking-widest text-gray-500 dark:text-white/60 uppercase font-semibold block">([FOCO] - [A-Za-záó]+)</span>',
        r'<h3 class="text-[10px] tracking-widest text-gray-500 dark:text-white/60 uppercase font-semibold block">\1</h3>',
        content
    )

    # 4. H1 Update and Eyebrow
    old_eyebrow = r'Agencia de marketing digital · Mérida, Extremadura'
    new_eyebrow = r'Estrategia digital y crecimiento para negocios'
    content = content.replace(old_eyebrow, new_eyebrow)

    # Replace H1
    old_h1 = r'<h1 class="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 dark:text-white leading-\[1.1\] mb-5">\s*Consigue clientes cada semana <span class="text-marca font-medium">sin depender solo del boca a boca</span>\s*</h1>'
    new_h1 = r'<h1 class="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-5">\n                Agencia de marketing digital en Mérida: <span class="text-marca font-medium">consigue clientes cada semana sin depender del boca a boca</span>\n            </h1>'
    content = re.sub(old_h1, new_h1, content)

    # 5. Links: trailing slashes
    # We replace href="/folder" with href="/folder/"
    # For a list of known top level routes:
    routes = [
        'servicios', 'recursos', 'sobre-nosotros', 'portfolio', 'contacto', 
        'analisis-personalizado-gratis', 'subvenciones-extremadura', 
        'ayudas-digitalizacion-pymes-extremadura', 'branding-y-estrategia',
        'web-seo', 'redes-sociales', 'marketing-digital', 'automatizaciones-y-sistemas',
        'eventos', 'aviso-legal', 'privacidad', 'cookies', 'recursos-proemote', 'espacio'
    ]
    for route in routes:
        content = re.sub(fr'href="/{route}"(?=[\s>])', f'href="/{route}/"', content)

    # Also fix 'recursos proemote.html' since we renamed it
    content = content.replace('recursos/recursos proemote.html', 'recursos/recursos-proemote.html')
    # Same for 'space bg.png' -> 'space-bg.png'
    content = content.replace('space bg.png', 'space-bg.png')
    content = content.replace('space bg white.png', 'space-bg-white.png')

    # 7. Images alt text
    content = content.replace('Carlos Molina, fundador de Proemotion', 'Carlos Molina, fundador de Proemote')

    # Add alt="" to decorative icons if any
    # Without specific filenames, I can just look for `<img src="icon_32.png">` if it exists.
    # Since I didn't find icon_32.png in my grep, maybe it doesn't exist, but I'll add a regex anyway.
    content = re.sub(r'<img src="icon_32\.png"([^>]*)>', r'<img src="icon_32.png" alt=""\1>', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    process_file('index.html')
