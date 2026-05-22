import re

button_html = '''
    <div class="max-w-4xl mx-auto px-6 pb-24 pt-8 text-center border-t border-white/5 relative z-10">
        <a href="/" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-accent transition-all duration-300 shadow-[0_0_20px_rgba(123,97,255,0.4)]">
            <i class="ph ph-arrow-left text-xl"></i> Volver al inicio
        </a>
    </div>

    <footer'''

for filepath in ['aviso-legal/index.html', 'privacidad/index.html']:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'Volver al inicio' not in content:
        content = content.replace('    <footer', button_html)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Added button to {filepath}")
