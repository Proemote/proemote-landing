import re

def build():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Get everything up to the end of <style>
    head_start = html.split('</style>')[0]
    
    # User's specific styles
    eval_styles = """
        /* Estilos Evaluacion */
        .bg-grid-pattern { background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%23ffffff' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E"); }
        
        .luxury-glass-card { 
            background: linear-gradient(145deg, rgba(20, 20, 31, 0.6) 0%, rgba(15, 15, 23, 0.4) 100%); 
            backdrop-filter: blur(24px); 
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.08); 
            border-radius: 2.5rem; 
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
            transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        
        .luxury-glass-card:hover {
            box-shadow: 0 40px 80px rgba(0, 0, 0, 0.4), 0 0 40px rgba(123, 97, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.15);
        }
        
        .form-input {
            width: 100%;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 1rem;
            padding: 1rem 1.25rem;
            color: #F5F7FA;
            font-size: 0.875rem;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .form-input:focus {
            outline: none;
            border-color: rgba(123, 97, 255, 0.5);
            background: rgba(123, 97, 255, 0.03);
            box-shadow: 0 0 0 4px rgba(123, 97, 255, 0.1);
        }

        .form-input::placeholder { color: rgba(255, 255, 255, 0.2); }
        select.form-input { appearance: none; cursor: pointer; }

        .ambient-glow {
            position: absolute;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(123,97,255,0.15) 0%, rgba(10,10,15,0) 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
        }

        .feature-glass-card {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 1.5rem;
            padding: 1.5rem;
            position: relative;
            overflow: hidden;
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, background-color 0.4s ease, box-shadow 0.4s ease;
        }
        
        .feature-glass-card:hover {
            border-color: rgba(123, 97, 255, 0.3);
            background: rgba(255, 255, 255, 0.04);
            transform: translateY(-4px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        .feature-glass-card::before {
            content: "";
            position: absolute;
            top: var(--mouse-y, 50%);
            left: var(--mouse-x, 50%);
            width: 250px;
            height: 250px;
            background: radial-gradient(circle, rgba(123, 97, 255, 0.15) 0%, transparent 70%);
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: opacity 0.4s ease;
            pointer-events: none;
            z-index: 0;
        }
        
        .feature-glass-card:hover::before { opacity: 1; }
        .feature-glass-card > * { position: relative; z-index: 1; }
"""
    
    rest_of_head = html.split('</style>')[1].split('</head>')[0]
    
    # We replace <title> and add canonical in the head_start
    head_start = re.sub(r'<title>.*?</title>', '<title>Auditoría Estratégica | Proemote</title>\n    <link rel="canonical" href="https://proemote.es/evaluacion/">', head_start)
    
    # Get the body up to the end of <nav>
    body_to_nav = html.split('</head>')[1].split('</nav>')[0] + '</nav>'
    
    # Get footer and everything after
    footer_onwards = '<!-- FOOTER -->' + html.split('<!-- FOOTER -->')[1]
    
    # Adjust paths in the global nav / footer
    # They should be absolute or relative. The site uses absolute URLs like `https://proemote.es/` or `/servicios`.
    # Let's make sure `/servicios` remains `/servicios`, etc. They are already root-relative.
    
    # The eval specific HTML:
    eval_main = """
    <!-- Ambient Glows -->
    <div class="ambient-glow top-0 left-0 -translate-x-1/2 -translate-y-1/2"></div>
    <div class="ambient-glow bottom-0 right-0 translate-x-1/3 translate-y-1/3" style="background: radial-gradient(circle, rgba(159,122,234,0.1) 0%, rgba(10,10,15,0) 70%);"></div>

    <!-- MAIN CONTENT -->
    <main class="flex-grow flex items-center justify-center pt-32 pb-16 relative z-10">
        <div class="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mt-8">
            
            <!-- COLUMNA IZQUIERDA: Propuesta de Autoridad (Fija al scroll en desktop) -->
            <div class="lg:col-span-5 lg:sticky lg:top-32">
                <div class="reveal-up inline-flex items-center justify-center px-5 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium tracking-widest uppercase mb-8">
                    Auditoría de proyecto
                </div>
                
                <h1 class="reveal-up font-heading text-4xl md:text-5xl font-medium leading-tight mb-6 text-white" style="transition-delay: 100ms;">
                    No creamos contenido.<br>
                    <span class="text-primary">Construimos autoridad que vende.</span>
                </h1>
                
                <p class="reveal-up text-textSecondary font-normal text-lg mb-12 leading-relaxed" style="transition-delay: 200ms;">
                    Diseñamos estrategias probadas y producimos vídeos de alta calidad para convertir tus visitas en clientes reales. Trabajamos con un número limitado de proyectos al mes — y solo con aquellos a los que podemos hacer crecer.
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                    <div class="feature-glass-card reveal-up" style="transition-delay: 300ms;">
                        <div class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] mb-4">
                            <i class="ph ph-magnifying-glass text-lg"></i>
                        </div>
                        <h3 class="font-heading font-medium text-white text-base mb-2">1. Estudio de tu sector</h3>
                        <p class="text-sm font-normal text-textSecondary leading-relaxed">Analizamos qué busca tu cliente ideal y qué hace tu competencia antes de encender la cámara.</p>
                    </div>
                    
                    <div class="feature-glass-card reveal-up" style="transition-delay: 400ms;">
                        <div class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] mb-4">
                            <i class="ph ph-pen-nib text-lg"></i>
                        </div>
                        <h3 class="font-heading font-medium text-white text-base mb-2">2. Guiones de venta</h3>
                        <p class="text-sm font-normal text-textSecondary leading-relaxed">Escribimos cada vídeo con un objetivo claro: captar la atención, generar confianza y conseguir clientes.</p>
                    </div>

                    <div class="feature-glass-card reveal-up" style="transition-delay: 500ms;">
                        <div class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] mb-4">
                            <i class="ph ph-video-camera text-lg"></i>
                        </div>
                        <h3 class="font-heading font-medium text-white text-base mb-2">3. Rodaje optimizado</h3>
                        <p class="text-sm font-normal text-textSecondary leading-relaxed">Grabamos en un solo día todo el contenido que tu marca necesita para publicar durante un mes entero.</p>
                    </div>

                    <div class="feature-glass-card reveal-up" style="transition-delay: 600ms;">
                        <div class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] mb-4">
                            <i class="ph ph-chart-line-up text-lg"></i>
                        </div>
                        <h3 class="font-heading font-medium text-white text-base mb-2">4. Mejora constante</h3>
                        <p class="text-sm font-normal text-textSecondary leading-relaxed">Revisamos los resultados mes a mes para adaptarnos. Tratamos tus redes como una herramienta comercial, no un gasto.</p>
                    </div>
                </div>

                <div class="reveal-up pl-6 border-l-[3px] border-primary/50 bg-gradient-to-r from-primary/5 to-transparent py-5 pr-5 rounded-r-2xl" style="transition-delay: 700ms;">
                    <span class="block text-xs font-medium tracking-widest text-primary uppercase mb-2">Filtro de viabilidad</span>
                    <p class="text-sm font-normal text-textSecondary leading-relaxed">
                        Este formulario no es un simple contacto. Es un análisis. Revisamos tu negocio y tus objetivos antes de agendar una llamada. Si creemos que no hay encaje o que no recuperarás la inversión, te lo diremos sin rodeos.
                    </p>
                </div>
            </div>

            <!-- COLUMNA DERECHA: El Formulario (Fricción Estratégica) -->
            <div class="lg:col-span-7 luxury-glass-card p-8 md:p-12 reveal-up" style="transition-delay: 400ms;">
                <div class="mb-10 border-b border-white/10 pb-8">
                    <h2 class="text-3xl font-heading font-medium text-white mb-3">Solicita acceso al servicio</h2>
                    <p class="text-sm font-normal text-textSecondary leading-relaxed">Rellena los datos con precisión. Cuanto mejor nos expliques tu situación, más útil será nuestra respuesta. Solo respondemos a candidaturas que tomamos en serio.</p>
                </div>

                <form id="eval-form" class="space-y-8">
                    
                    <!-- BLOQUE 1: Datos Base -->
                    <div class="space-y-4">
                        <h3 class="text-xs font-bold tracking-widest text-primary uppercase mb-2">1. Datos Personales</h3>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs text-textSecondary mb-1.5 font-medium">Nombre y apellidos *</label>
                                <input type="text" name="nombre" required class="form-input" placeholder="Ej. Carlos Molina">
                            </div>
                            <div>
                                <label class="block text-xs text-textSecondary mb-1.5 font-medium">Correo electrónico *</label>
                                <input type="email" name="email" required class="form-input" placeholder="hola@tuempresa.com">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs text-textSecondary mb-1.5 font-medium">WhatsApp (con prefijo) *</label>
                                <input type="tel" name="telefono" required class="form-input" placeholder="+34 600 000 000">
                            </div>
                            <div>
                                <label class="block text-xs text-textSecondary mb-1.5 font-medium">País / Ciudad desde donde trabajas *</label>
                                <input type="text" name="ubicacion" required class="form-input" placeholder="Ej. Madrid, España">
                            </div>
                        </div>
                    </div>

                    <!-- BLOQUE 2: Tu Proyecto -->
                    <div class="space-y-4 pt-4 border-t border-white/5">
                        <h3 class="text-xs font-bold tracking-widest text-primary uppercase mb-2">2. Tu Proyecto</h3>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs text-textSecondary mb-1.5 font-medium">Usuario de Instagram / TikTok *</label>
                                <input type="text" name="redes" required class="form-input" placeholder="@tu_cuenta">
                            </div>
                            <div>
                                <label class="block text-xs text-textSecondary mb-1.5 font-medium">Web o enlace de tu marca *</label>
                                <input type="url" name="web" required class="form-input" placeholder="https://...">
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs text-textSecondary mb-1.5 font-medium">¿A qué te dedicas exactamente y qué vendes? *</label>
                            <input type="text" name="dedicacion" required class="form-input" placeholder="Ej. Consultoría estratégica, infoproductos B2B, clínica estética...">
                        </div>
                    </div>

                    <!-- BLOQUE 3: Posicionamiento -->
                    <div class="space-y-4 pt-4 border-t border-white/5">
                        <h3 class="text-xs font-bold tracking-widest text-primary uppercase mb-2">3. Mercado y Objetivos</h3>
                        
                        <div>
                            <label class="block text-xs text-textSecondary mb-1.5 font-medium">¿Qué te hace diferente frente a otros profesionales de tu sector? *</label>
                            <textarea name="diferencia" required rows="2" class="form-input resize-none" placeholder="Tu propuesta de valor única..."></textarea>
                        </div>

                        <div>
                            <label class="block text-xs text-textSecondary mb-1.5 font-medium">Comparte entre 3 y 5 referentes o cuentas que te gusten de tu nicho. *</label>
                            <textarea name="referentes" required rows="2" class="form-input resize-none" placeholder="Ej: @referente1, @referente2..."></textarea>
                        </div>

                        <div>
                            <label class="block text-xs text-textSecondary mb-1.5 font-medium">¿Qué quieres conseguir con tu contenido en los próximos 90 días? *</label>
                            <textarea name="objetivos_90" required rows="2" class="form-input resize-none" placeholder="Tus metas concretas a corto/medio plazo..."></textarea>
                        </div>
                    </div>

                    <!-- BLOQUE 4: Inversión y Tiempos -->
                    <div class="space-y-4 pt-4 border-t border-white/5">
                        <h3 class="text-xs font-bold tracking-widest text-primary uppercase mb-2">4. Inversión y Tiempos</h3>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs text-textSecondary mb-1.5 font-medium">Facturación mensual aprox. *</label>
                                <div class="relative">
                                    <select name="facturacion" required class="form-input">
                                        <option value="" disabled selected>Selecciona un tramo</option>
                                        <option value="Menos de 1.000€">Menos de 1.000 €/mes</option>
                                        <option value="1.000€ - 3.000€">Entre 1.000 € y 3.000 €/mes</option>
                                        <option value="3.000€ - 10.000€">Entre 3.000 € y 10.000 €/mes</option>
                                        <option value="Más de 10.000€">Más de 10.000 €/mes</option>
                                        <option value="Prefiero no decirlo">Prefiero no decirlo</option>
                                    </select>
                                    <i class="ph ph-caret-down absolute right-4 top-1/2 -translate-y-1/2 text-textSecondary pointer-events-none"></i>
                                </div>
                            </div>
                            <div>
                                <label class="block text-xs text-textSecondary mb-1.5 font-medium">Presupuesto mensual para marketing *</label>
                                <div class="relative">
                                    <select name="presupuesto" required class="form-input">
                                        <option value="" disabled selected>Capacidad de inversión</option>
                                        <option value="Menos de 500€">Menos de 500€</option>
                                        <option value="500€ - 1.000€">Entre 500€ y 1.000€</option>
                                        <option value="1.000€ - 2.000€">Entre 1.000€ y 2.000€</option>
                                        <option value="Más de 2.000€">Más de 2.000€</option>
                                    </select>
                                    <i class="ph ph-caret-down absolute right-4 top-1/2 -translate-y-1/2 text-textSecondary pointer-events-none"></i>
                                </div>
                            </div>
                            <div class="md:col-span-2">
                                <label class="block text-xs text-textSecondary mb-1.5 font-medium">¿Cuándo te gustaría empezar? *</label>
                                <div class="relative">
                                    <select name="inicio" required class="form-input">
                                        <option value="" disabled selected>Selecciona una opción</option>
                                        <option value="Lo antes posible">Lo antes posible</option>
                                        <option value="Próximas semanas">En las próximas semanas</option>
                                        <option value="Solo busco información">Solo busco información / precios</option>
                                    </select>
                                    <i class="ph ph-caret-down absolute right-4 top-1/2 -translate-y-1/2 text-textSecondary pointer-events-none"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- BLOQUE 5: Nivel de Compromiso -->
                    <div class="space-y-4 pt-4 border-t border-white/5">
                        <h3 class="text-xs font-bold tracking-widest text-primary uppercase mb-2">5. Compromiso</h3>
                        
                        <div>
                            <label class="block text-xs text-textSecondary mb-1.5 font-medium">¿Estás dispuesto/a a salir en cámara y grabar contenido de forma seria? *</label>
                            <div class="relative">
                                <select name="camara" required class="form-input">
                                    <option value="" disabled selected>Selecciona una opción</option>
                                    <option value="Sí, totalmente">Sí, estoy 100% dispuesto/a a grabar</option>
                                    <option value="Me cuesta pero lo haré">Me cuesta, pero entiendo que es necesario</option>
                                    <option value="No quiero salir">Prefiero no salir en cámara (o lo mínimo posible)</option>
                                </select>
                                <i class="ph ph-caret-down absolute right-4 top-1/2 -translate-y-1/2 text-textSecondary pointer-events-none"></i>
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs text-textSecondary mb-1.5 font-medium">Para obtener buenos resultados, es fundamental tu compromiso en la creación. ¿Puedes tomarte en serio este tema actualmente? *</label>
                            <div class="relative">
                                <select name="compromiso_serio" required class="form-input">
                                    <option value="" disabled selected>Selecciona tu situación actual</option>
                                    <option value="Sí, prioridad absoluta">Sí, es una prioridad absoluta para mí ahora mismo</option>
                                    <option value="Quiero pero no tengo tiempo">Quiero, pero tengo muy poco tiempo libre</option>
                                    <option value="Solo estoy ojeando">Por ahora solo estoy mirando opciones</option>
                                </select>
                                <i class="ph ph-caret-down absolute right-4 top-1/2 -translate-y-1/2 text-textSecondary pointer-events-none"></i>
                            </div>
                        </div>

                        <div class="pt-4">
                            <div class="flex items-start gap-3">
                                <input type="checkbox" id="privacidad" required class="mt-0.5 w-4 h-4 accent-primary cursor-pointer shrink-0">
                                <label for="privacidad" class="text-xs text-textSecondary leading-relaxed cursor-pointer select-none">
                                    He leído y acepto la <a href="https://proemote.es/privacidad" target="_blank" class="text-primary hover:text-accent underline decoration-primary/30 transition-colors">política de privacidad</a> sobre el tratamiento de mis datos.
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="form-msg hidden text-center p-4 rounded-xl font-medium transition-all text-sm mb-4"></div>

                    <button type="submit" class="w-full py-5 mt-4 bg-primary text-white font-medium rounded-2xl hover:bg-accent transition-all duration-300 shadow-[0_0_20px_rgba(123,97,255,0.3)] flex items-center justify-center gap-2 group text-base">
                        Enviar Candidatura de Proyecto 
                        <i class="ph ph-paper-plane-right group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
                    </button>
                </form>
            </div>
        </div>
    </main>
    """
    
    eval_scripts = """
    <script>
        // Tracking del ratón para el brillo de las tarjetas interactivas
        document.addEventListener('mousemove', (e) => {
            document.querySelectorAll('.feature-glass-card').forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });

        // Lógica del Formulario
        document.getElementById('eval-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const form = this;
            const btn = form.querySelector('button[type="submit"]');
            const msg = form.querySelector('.form-msg');
            const originalContent = btn.innerHTML;
            
            btn.innerHTML = '<span class="animate-pulse">Procesando solicitud...</span>';
            btn.disabled = true;
            
            // Simulación de envío de formulario para la demo, reemplazar con el script real si se da
            setTimeout(() => {
                msg.classList.remove('hidden');
                msg.className = 'form-msg block p-4 rounded-xl bg-green-500/10 text-green-400 mt-4 border border-green-500/20 text-sm mb-4';
                msg.innerText = '¡Solicitud recibida correctamente! Nos pondremos en contacto contigo.';
                
                btn.innerHTML = '¡Enviado! <i class="ph-fill ph-check-circle"></i>';
                btn.classList.remove('bg-primary', 'hover:bg-accent', 'shadow-[0_0_20px_rgba(123,97,255,0.3)]');
                btn.classList.add('bg-green-600', 'hover:bg-green-500', 'shadow-[0_0_20px_rgba(22,163,74,0.4)]');
                
                setTimeout(() => {
                    form.reset();
                    btn.innerHTML = originalContent;
                    btn.classList.add('bg-primary', 'hover:bg-accent', 'shadow-[0_0_20px_rgba(123,97,255,0.3)]');
                    btn.classList.remove('bg-green-600', 'hover:bg-green-500', 'shadow-[0_0_20px_rgba(22,163,74,0.4)]');
                    btn.disabled = false;
                    msg.classList.add('hidden');
                }, 3000);
            }, 1500);
        });
    </script>
    """
    
    final_html = head_start + eval_styles + '</style>\n' + rest_of_head + '</head>\n' + body_to_nav + eval_main + footer_onwards
    # Insert eval_scripts before </body>
    final_html = final_html.replace('</body>', eval_scripts + '\n</body>')
    
    # Write to evaluacion/index.html
    with open('evaluacion/index.html', 'w', encoding='utf-8') as f:
        f.write(final_html)

build()
