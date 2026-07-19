#!/usr/bin/env python3
"""
Fix all 4 issues across all subpages:
1. Hover dark mode bug: duplicate dark: classes (e.g. "dark:text-gray-900 dark:text-white") 
   → keep only the second/correct dark: class
2. Home reviews carousel: fix the marquee CSS/animation for proper two-row display
3. Subpages carousel: ensure both rows are rendered (document.write is inline-only safe)
4. Mobile menu: ensure it works on all pages
"""

import os
import re
import glob

BASE = os.path.dirname(os.path.abspath(__file__))

# ─── Helper: remove duplicate dark: classes ──────────────────────────────────
# Pattern: dark:TEXT-CLASS1 dark:TEXT-CLASS2 where CLASS1 conflicts with CLASS2
# We clean these known bad patterns:

BAD_DARK_PAIRS = [
    # (bad_pattern, replacement)
    # text color duplicates
    (r'dark:text-gray-900\s+dark:text-white', 'dark:text-white'),
    (r'dark:text-gray-900\s+dark:text-white/80', 'dark:text-white/80'),
    (r'dark:text-gray-900\s+dark:text-white/60', 'dark:text-white/60'),
    (r'dark:text-gray-900\s+dark:text-white/50', 'dark:text-white/50'),
    (r'dark:text-gray-900\s+dark:text-white/40', 'dark:text-white/40'),
    # bg duplicates
    (r'dark:bg-white\s+dark:bg-\[#05020a\]/95', 'dark:bg-[#05020a]/95'),
    (r'dark:bg-white\s+dark:bg-white/5', 'dark:bg-white/5'),
    (r'dark:bg-white\s+dark:bg-bgSurface/50', 'dark:bg-bgSurface/50'),
    # hover text duplicates
    (r'dark:hover:text-gray-900\s+dark:text-white', 'dark:hover:text-white'),
    # border duplicates
    (r'border-gray-300\s+dark:border-white/100', 'dark:border-white/10'),
    (r'border border-gray-300\s+dark:border-white/100', 'border dark:border-white/10'),
]

def fix_dark_duplicates(html):
    for pattern, replacement in BAD_DARK_PAIRS:
        html = re.sub(pattern, replacement, html)
    return html

# ─── The correct reviews marquee CSS ─────────────────────────────────────────
MARQUEE_CSS = '''    <style>
        .pause-on-hover:hover .animate-marquee,
        .pause-on-hover:hover .animate-marquee-reverse {
            animation-play-state: paused;
        }
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
            0% { transform: translateX(0); }
            100% { transform: translateX(50%); }
        }
        .animate-marquee {
            animation: marquee var(--duration, 40s) linear infinite;
            will-change: transform;
        }
        .animate-marquee-reverse {
            animation: marquee-reverse var(--duration, 40s) linear infinite;
            will-change: transform;
        }
    </style>'''

# ─── The correct reviews HTML (static, no document.write) ─────────────────────
REVIEWS_DATA = [
    # Row 1
    {"n": "Sandra Cerrada Sánchez", "r": "CEO Fintegra", "s": 5, "t": "Excelente trabajo de Proemote. Sus diseños web son modernos y muy cuidados, y el servicio de gestión de redes sociales es profesional y eficaz. Un equipo creativo y comprometido que realmente aporta valor."},
    {"n": "JoveNEXT", "r": "Asociaciones y ONGs", "s": 5, "t": "Estamos muy satisfechos con la web que nos diseñaron desde Proemote. Son un equipo atento, creativo y profesional. Nos diseñaron la web y nos ha gustado mucho."},
    {"n": "Ana Gorostegui", "r": "Coaching", "s": 4, "t": "Carlos captó muy bien desde el principio la idea y el estilo que quería para mi web, y trabajó con rapidez y eficiencia. El resultado final es muy bueno."},
    {"n": "Asociación Meridia", "r": "Asociaciones y ONGs", "s": 5, "t": "Contratamos a Proemote para el diseño de la página web y quedamos muy satisfechos con el resultado. El servicio fue ágil, profesional y nos atendieron maravillosamente."},
    {"n": "Gabriel Romero Pérez", "r": "Profesor de Formación Vial", "s": 5, "t": "Una experiencia de usuario impecable. La estructura es clara, el contenido es de gran valor y, sin duda, la web se posiciona como un referente inmediato en el sector."},
    {"n": "Limpiezas Lusitania", "r": "Servicios de limpieza", "s": 5, "t": "Somos una empresa de limpieza que lleva más de 25 años en el sector, pero necesitábamos modernizarnos un poco. Por ello, contactamos con Proemote para la creación de nuestra web."},
]
REVIEWS_DATA_ROW2 = [
    {"n": "Alexandro Navarro", "r": "Fotógrafo", "s": 5, "t": "Trabajar con Proemote ha sido todo un acierto. Lo recomiendo a todo tipo de negocios que buscan dar un salto de calidad en su imagen profesional; si buscan un cambio, es su mejor opción."},
    {"n": "Juany", "r": "CEO Centro de Belleza Juany", "s": 5, "t": "Muy satisfecha con su trabajo. Me diseñaron la web y me gestionan las redes sociales, y en todo momento la atención es muy profesional. Totalmente recomendable."},
    {"n": "Ana Jacinto", "r": "CEO Lo Quiero Limpio", "s": 5, "t": "Espero tener un largo recorrido con Proemote y conseguir mucho éxito. Muy contenta con sus servicios. ¡Seguimos trabajando juntos!"},
    {"n": "Lara Santiago López", "r": "Cliente counseling", "s": 5, "t": "Lo recomiendo 100%, he tenido muy buena experiencia con la sesión de counselling."},
    {"n": "Alba Mulero", "r": "Cliente orientación", "s": 5, "t": "Muy profesional. ¡Lo recomiendo! :)"},
    {"n": "Noemí Sánchez Menaya", "r": "CEO Tierras con Alma", "s": 5, "t": "Profesional y cercano."},
]

GOOGLE_ICON_SVG = '''<svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                                </svg>'''

STAR_SVG = '<svg class="w-3.5 h-3.5 text-[#FABB05]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>'

def make_card(rev):
    init = rev['n'][0].upper()
    stars = STAR_SVG * rev['s']
    return f'''<div class="w-[320px] md:w-[380px] p-5 md:p-6 rounded-2xl border border-gray-200 dark:border-white/5 bg-white dark:bg-white/[0.03] flex flex-col gap-4 flex-shrink-0 shadow-sm hover:border-primary/30 transition-colors select-none">
                                    <div class="flex items-center gap-3 pointer-events-none">
                                        <div class="relative">
                                            <div class="w-10 h-10 rounded-full border border-gray-100 dark:border-white/10 flex items-center justify-center text-gray-700 dark:text-white/80 font-semibold bg-gray-50 dark:bg-white/10 text-lg shadow-sm">
                                                {init}
                                            </div>
                                            <div class="absolute -bottom-1 -right-1 bg-white dark:bg-zinc-950 rounded-full p-[2px] shadow-sm">
                                                {GOOGLE_ICON_SVG}
                                            </div>
                                        </div>
                                        <div class="flex flex-col">
                                            <span class="font-medium text-gray-900 dark:text-white text-sm leading-tight">{rev['n']}</span>
                                            <span class="text-xs text-gray-500 dark:text-white/50 mt-0.5 font-light">{rev['r']}</span>
                                            <div class="flex gap-0.5 mt-1">{stars}</div>
                                        </div>
                                    </div>
                                    <p class="text-gray-600 dark:text-textSecondary text-sm font-light leading-relaxed pointer-events-none">{rev['t']}</p>
                                </div>'''

def build_marquee_section():
    """Build the complete static marquee HTML (no document.write, works everywhere)"""
    # Build 4x repeated rows for seamless loop
    row1_cards = ''.join(make_card(r) for r in REVIEWS_DATA * 4)
    row2_cards = ''.join(make_card(r) for r in REVIEWS_DATA_ROW2 * 4)

    return f'''    <!-- NEW DOUBLE MARQUEE REVIEWS -->
{MARQUEE_CSS}
    <section class="py-16 md:py-24 relative overflow-hidden flex flex-col items-center border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-bgSurface transition-colors duration-300">
        
        <div class="text-center max-w-2xl px-4 mb-12 relative z-10 reveal-up">
            <h2 class="text-3xl md:text-4xl font-heading font-medium text-gray-900 dark:text-white tracking-tight mb-4">
                Lo que dicen nuestros clientes
            </h2>
            <p class="text-gray-600 dark:text-textSecondary text-lg font-light">
                Descubre cómo hemos ayudado a empresas y asociaciones a dar el salto digital con resultados reales.
            </p>
        </div>

        <div class="relative w-full max-w-[100vw] overflow-hidden flex flex-col gap-4 sm:gap-6 z-10 pause-on-hover">
            
            <div class="pointer-events-none absolute left-0 top-0 h-full w-16 md:w-32 z-20 bg-gradient-to-r from-gray-50 dark:from-bgSurface to-transparent"></div>
            <div class="pointer-events-none absolute right-0 top-0 h-full w-16 md:w-32 z-20 bg-gradient-to-l from-gray-50 dark:from-bgSurface to-transparent"></div>

            <!-- ROW 1 (Left to Right) -->
            <div class="flex overflow-hidden w-full py-2">
                <div class="flex gap-4 sm:gap-6 animate-marquee" style="--duration: 45s;">
                    {row1_cards}
                </div>
            </div>

            <!-- ROW 2 (Right to Left) -->
            <div class="flex overflow-hidden w-full py-2">
                <div class="flex gap-4 sm:gap-6 animate-marquee-reverse" style="--duration: 50s;">
                    {row2_cards}
                </div>
            </div>
            
        </div>
    </section>
    <!-- END NEW DOUBLE MARQUEE REVIEWS -->'''


# ─── Pattern to find and replace the reviews section ─────────────────────────
REVIEWS_SECTION_PATTERN = re.compile(
    r'[ \t]*<!-- NEW DOUBLE MARQUEE REVIEWS -->.*?<!-- END NEW DOUBLE MARQUEE REVIEWS -->',
    re.DOTALL
)

# ─── Fix mobile menu duplicate dark class on the button ──────────────────────
def fix_mobile_btn_dark(html):
    # Fix the hamburger button: dark:text-gray-900 dark:text-white/80 → dark:text-white/80
    html = re.sub(
        r'(id="mobile-menu-btn"[^>]*?)dark:text-gray-900\s+dark:text-white/80',
        r'\1dark:text-white/80',
        html
    )
    return html

# ─── Fix mobile menu dark overlay: dark:bg-white dark:bg-[#05020a]/95 ────────
def fix_mobile_menu_bg(html):
    html = re.sub(
        r'(id="mobile-menu"[^>]*?)dark:bg-white\s+dark:bg-\[#05020a\]/95',
        r'\1dark:bg-[#05020a]/95',
        html
    )
    return html

# ─── Main processing ──────────────────────────────────────────────────────────
def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    
    original = html
    
    # 1. Fix duplicate dark: classes (hover/text/bg)
    html = fix_dark_duplicates(html)
    
    # 2. Fix mobile button dark class
    html = fix_mobile_btn_dark(html)
    
    # 3. Fix mobile menu overlay background
    html = fix_mobile_menu_bg(html)
    
    # 4. Replace reviews marquee section (if it exists)
    if '<!-- NEW DOUBLE MARQUEE REVIEWS -->' in html and '<!-- END NEW DOUBLE MARQUEE REVIEWS -->' in html:
        new_section = build_marquee_section()
        html = REVIEWS_SECTION_PATTERN.sub(new_section, html)
        print(f"  ✓ Reviews carousel replaced")
    
    if html != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        return True
    return False

def main():
    files = glob.glob(os.path.join(BASE, '**', 'index.html'), recursive=True)
    files = [f for f in files if 'node_modules' not in f]
    
    changed = 0
    for filepath in sorted(files):
        rel = filepath.replace(BASE + '/', '')
        print(f"Processing: {rel}")
        if process_file(filepath):
            changed += 1
            print(f"  → CHANGED")
        else:
            print(f"  → no changes")
    
    print(f"\nDone! Changed {changed} / {len(files)} files.")

if __name__ == '__main__':
    main()
