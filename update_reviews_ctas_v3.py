import os
import re

root_dir = '/Users/carlosmolinamarquez/Desktop/proemote-landing'

marquee_html = """    <!-- NEW DOUBLE MARQUEE REVIEWS -->
    <style>
        .pause-on-hover:hover .animate-marquee {
            animation-play-state: paused;
        }
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-50% - 1rem)); }
        }
        .animate-marquee {
            animation: marquee var(--duration, 40s) linear infinite;
        }
    </style>
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
            <div class="flex overflow-hidden w-full py-2 cursor-grab">
                <div class="flex gap-4 sm:gap-6 min-w-max animate-marquee" style="--duration: 45s;">
                    <!-- Clone 1 -->
                    <script>
                        const reviewsRow1 = [
                            { n: "Sandra Cerrada Sánchez", r: "CEO Fintegra", s: 5, t: "Excelente trabajo de Proemote. Sus diseños web son modernos y muy cuidados, y el servicio de gestión de redes sociales es profesional y eficaz. Un equipo creativo y comprometido que realmente aporta valor." },
                            { n: "JoveNEXT", r: "Asociaciones y ONGs", s: 5, t: "Estamos muy satisfechos con la web que nos diseñaron desde Proemote. Son un equipo atento, creativo y profesional. Nos diseñaron la web y nos ha gustado mucho." },
                            { n: "Ana Gorostegui", r: "Coaching", s: 4, t: "Carlos captó muy bien desde el principio la idea y el estilo que quería para mi web, y trabajó con rapidez y eficiencia. El resultado final es muy bueno." },
                            { n: "Asociación Meridia", r: "Asociaciones y ONGs", s: 5, t: "Contratamos a Proemote para el diseño de la página web y quedamos muy satisfechos con el resultado. El servicio fue ágil, profesional y nos atendieron maravillosamente." },
                            { n: "Gabriel Romero Pérez", r: "Profesor de Formación Vial", s: 5, t: "Una experiencia de usuario impecable. La estructura es clara, el contenido es de gran valor y, sin duda, la web se posiciona como un referente inmediato en el sector." },
                            { n: "Limpiezas Lusitania", r: "Servicios de limpieza", s: 5, t: "Somos una empresa de limpieza que lleva más de 25 años en el sector, pero necesitábamos modernizarnos un poco. Por ello, contactamos con Proemote para la creación de nuestra web." }
                        ];
                        const reviewsRow2 = [
                            { n: "Alexandro Navarro", r: "Fotógrafo", s: 5, t: "Trabajar con Proemote ha sido todo un acierto. Lo recomiendo a todo tipo de negocios que buscan dar un salto de calidad en su imagen profesional; si buscan un cambio, es su mejor opción." },
                            { n: "Juany", r: "CEO Centro de Belleza Juany", s: 5, t: "Muy satisfecha con su trabajo. Me diseñaron la web y me gestionan las redes sociales, y en todo momento la atención es muy profesional. Totalmente recomendable." },
                            { n: "Ana Jacinto", r: "CEO Lo Quiero Limpio", s: 5, t: "Espero tener un largo recorrido con Proemote y conseguir mucho éxito. Muy contenta con sus servicios. ¡Seguimos trabajando juntos!" },
                            { n: "Lara Santiago López", r: "Cliente counseling", s: 5, t: "Lo recomiendo 100%, he tenido muy buena experiencia con la sesión de counselling." },
                            { n: "Alba Mulero", r: "Cliente orientación", s: 5, t: "Muy profesional. ¡Lo recomiendo! :)" },
                            { n: "Noemí Sánchez Menaya", r: "CEO Tierras con Alma", s: 5, t: "Profesional y cercano." }
                        ];
                        
                        function createReviewCardHTML(rev) {
                            const init = rev.n.charAt(0).toUpperCase();
                            const stars = Array(rev.s).fill('<svg class="w-3.5 h-3.5 text-[#FABB05]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>').join('');
                            return `
                                <div class="w-[320px] md:w-[380px] p-5 md:p-6 rounded-2xl border border-gray-200 dark:border-white/5 bg-white dark:bg-bgMain/50 flex flex-col gap-4 flex-shrink-0 shadow-sm hover:border-primary/30 transition-colors select-none">
                                    <div class="flex items-center gap-3 pointer-events-none">
                                        <div class="relative">
                                            <div class="w-10 h-10 rounded-full border border-gray-100 dark:border-white/10 flex items-center justify-center text-gray-700 dark:text-white/80 font-semibold bg-gray-50 dark:bg-bgSurface text-lg shadow-sm">
                                                ${init}
                                            </div>
                                            <div class="absolute -bottom-1 -right-1 bg-white dark:bg-bgMain rounded-full p-[2px] shadow-sm">
                                                <svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="flex flex-col">
                                            <span class="font-medium text-gray-900 dark:text-white text-sm leading-tight">${rev.n}</span>
                                            <span class="text-xs text-gray-500 dark:text-white/50 mt-0.5 font-light">${rev.r}</span>
                                            <div class="flex gap-0.5 mt-1">${stars}</div>
                                        </div>
                                    </div>
                                    <p class="text-gray-600 dark:text-textSecondary text-sm font-light leading-relaxed pointer-events-none">${rev.t}</p>
                                </div>
                            `;
                        }

                        const longRow1 = [...reviewsRow1, ...reviewsRow1, ...reviewsRow1, ...reviewsRow1];
                        document.write(longRow1.map(createReviewCardHTML).join(''));
                    </script>
                </div>
            </div>

            <!-- ROW 2 (Right to Left) -->
            <div class="flex overflow-hidden w-full py-2 cursor-grab" dir="rtl">
                <div class="flex gap-4 sm:gap-6 min-w-max animate-marquee" style="--duration: 50s;" dir="ltr">
                    <script>
                        const longRow2 = [...reviewsRow2, ...reviewsRow2, ...reviewsRow2, ...reviewsRow2];
                        document.write(longRow2.map(createReviewCardHTML).join(''));
                    </script>
                </div>
            </div>
            
        </div>
    </section>
    <!-- END NEW DOUBLE MARQUEE REVIEWS -->"""

def build_new_cta(title, paragraph, btn_href, btn_text):
    return f"""    <!-- UNIFIED BOTTOM CTA -->
    <section class="py-24 relative bg-gray-50 dark:bg-bgMain border-t border-gray-200 dark:border-white/5 overflow-hidden transition-colors duration-300">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none z-[0]"></div>
        
        <div class="max-w-4xl mx-auto px-6 relative z-10 reveal-up">
            <div class="bg-white/80 dark:bg-bgSurface/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-10 md:p-16 text-center shadow-2xl dark:shadow-[0_0_50px_rgba(139,92,246,0.05)] flex flex-col items-center transition-colors duration-300">
                
                <h2 class="font-heading text-3xl md:text-5xl font-medium text-gray-900 dark:text-white mb-6 tracking-tight">
                    {title.strip()}
                </h2>
                <p class="text-gray-600 dark:text-textSecondary text-lg font-light leading-relaxed max-w-2xl mx-auto mb-10">
                    {paragraph.strip()}
                </p>

                <!-- Inline Contacts -->
                <div class="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-10">
                    <a href="mailto:info@proemote.es" class="flex items-center gap-2 text-gray-700 dark:text-white/80 hover:text-primary transition-colors">
                        <i class="ph-fill ph-envelope-simple text-xl text-primary"></i>
                        <span class="font-medium text-sm">info@proemote.es</span>
                    </a>
                    <a href="tel:+34641576286" class="flex items-center gap-2 text-gray-700 dark:text-white/80 hover:text-primary transition-colors">
                        <i class="ph-fill ph-phone text-xl text-primary"></i>
                        <span class="font-medium text-sm">+34 641 57 62 86 / 924 31 51 64</span>
                    </a>
                    <a href="https://wa.me/34641576286" target="_blank" rel="noopener" class="flex items-center gap-2 text-gray-700 dark:text-white/80 hover:text-primary transition-colors">
                        <i class="ph-fill ph-whatsapp-logo text-xl text-primary"></i>
                        <span class="font-medium text-sm">WhatsApp</span>
                    </a>
                </div>

                <a href="{btn_href}" class="bg-primary hover:bg-accent text-white font-medium px-10 py-4 rounded-full transition-all shadow-[0_0_20px_rgba(123,97,255,0.3)] hover:shadow-[0_0_30px_rgba(123,97,255,0.5)] flex items-center gap-2 mb-4 group">
                    {btn_text.strip()} <i class="ph ph-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </a>
            </div>
        </div>
    </section>
    <!-- END UNIFIED BOTTOM CTA -->"""

# Improved regexes that do not cross boundary of `</section>` or `</div>` for div blocks
review_section_regex = re.compile(
    r'<section[^>]*>(?:(?!</section>)[\s\S])*?(?:Opiniones de nuestros clientes|Estas son algunas reseñas reales|Sandra Cerrada)(?:(?!</section>)[\s\S])*?</section>',
    re.IGNORECASE
)

# For CTAs that are `<section class="py-24...`
cta_section_regex = re.compile(
    r'<section[^>]*py-24[^>]*>(?:(?!</section>)[\s\S])*?<h2[^>]*>(.*?)</h2>(?:(?!</section>)[\s\S])*?<p[^>]*>(.*?)</p>(?:(?!</section>)[\s\S])*?<a\s+href="([^"]+)"[^>]*>(.*?)</a>(?:(?!</section>)[\s\S])*?</section>',
    re.IGNORECASE
)

# In precios.html the reviews are inside a <div> that has <!-- Sección de Reseñas / Testimonios --> above it.
# We will just replace everything from <!-- Sección de Reseñas / Testimonios --> to the next <!--
precios_reviews_regex = re.compile(
    r'<!-- Sección de Reseñas / Testimonios -->[\s\S]*?<!-- CTA Final -->',
    re.IGNORECASE
)

# In precios.html the CTA is inside a <div> that starts with <!-- CTA Final --> up to <!-- Footer
precios_cta_regex = re.compile(
    r'<!-- CTA Final -->[\s\S]*?<!-- Footer',
    re.IGNORECASE
)


def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # REVIEWS
    # 1. Standard sections
    content = review_section_regex.sub(marquee_html, content)
    # 2. For precios
    if 'precios' in filepath:
        content = precios_reviews_regex.sub(marquee_html + '\n    <!-- CTA Final -->', content)
        
        def p_cta_replacer(match):
            block = match.group(0)
            t_match = re.search(r'<h2[^>]*>(.*?)</h2>', block)
            p_match = re.search(r'<p[^>]*>(.*?)</p>', block)
            b_match = re.search(r'<button[^>]*>(.*?)</button>', block)
            
            if t_match and p_match and b_match:
                title = re.sub(r'<[^>]+>', '', t_match.group(1))
                para = re.sub(r'<[^>]+>', '', p_match.group(1))
                btn = re.sub(r'<[^>]+>', '', b_match.group(1))
                return build_new_cta(title, para, "#planes", btn) + "\n    <!-- Footer"
            return block
            
        content = precios_cta_regex.sub(p_cta_replacer, content)

    # CTA Standard sections
    def cta_replacer(match):
        title = match.group(1)
        paragraph = match.group(2)
        btn_href = match.group(3)
        btn_text = match.group(4)
        if any(x in title.lower() for x in ['proyecto', 'resultados', 'hablamos', 'digital', 'empieza', 'sistema']):
            title_clean = re.sub(r'<[^>]+>', '', title)
            paragraph_clean = re.sub(r'<[^>]+>', '', paragraph)
            btn_text_clean = re.sub(r'<[^>]+>', '', btn_text).strip()
            return build_new_cta(title_clean, paragraph_clean, btn_href, btn_text_clean)
        return match.group(0)
        
    content = cta_section_regex.sub(cta_replacer, content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {filepath}")

for root, _, files in os.walk(root_dir):
    for file in files:
        if file.endswith('.html'):
            process_file(os.path.join(root, file))

print("Done with safe regex replace.")
