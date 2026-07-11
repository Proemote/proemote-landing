export default function HeroSections() {
  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative pt-48 pb-16 overflow-hidden bg-grid-pattern border-b border-gray-200 dark:border-white/5">
        <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-[0]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-accent/10 blur-[150px] pointer-events-none z-[0]"></div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 reveal-up active">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/20 text-violet-700 dark:text-violet-300 text-xs font-semibold tracking-widest uppercase mb-8">
            Nuestros Servicios
          </div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight text-gray-900 dark:text-white mb-6 text-balance">
            Tu negocio ya tiene potencial. <br className="hidden md:block" /> Ahora necesita <span className="text-gradient-primary">un sistema para crecer.</span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-textSecondary leading-relaxed max-w-3xl mx-auto mb-8">
            La mayoría de negocios no fracasa por ofrecer un mal producto o servicio, sino porque su presencia digital no transmite el valor que realmente tiene. En Proemote diseñamos sistemas de crecimiento que unen estrategia, identidad, posicionamiento y captación para convertir negocios convencionales en marcas que generan confianza y atraen clientes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/analisis-personalizado-gratis" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-gray-900 dark:text-white font-medium rounded-full hover:bg-accent transition-all duration-300 shadow-[0_0_20px_rgba(123,97,255,0.4)] hover:shadow-[0_0_30px_rgba(123,97,255,0.6)] group">
              👉 Solicitar diagnóstico gratuito
            </a>
            <a href="#como-trabajamos" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white font-medium rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300">
              Ver cómo trabajamos
            </a>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM SECTION */}
      <section className="py-24 relative z-10 border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-bgSurface/20">
        <div className="max-w-4xl mx-auto px-6 text-center reveal-up">
          <h2 className="font-heading text-3xl md:text-5xl font-light mb-8 text-gray-900 dark:text-white">El problema no es que hagas marketing. <br /><span className="text-gradient-primary">Es que cada acción va por un lado.</span></h2>
          
          <div className="flex flex-wrap justify-center gap-4 text-left max-w-5xl mx-auto mb-10">
            <div className="w-full md:w-[calc(33.333%-1rem)] flex items-start gap-3 p-5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-purple-500/30 transition-all hover:-translate-y-1">
              <i className="ph-fill ph-x-circle text-purple-500 mt-1 text-xl shrink-0"></i>
              <p className="text-gray-600 dark:text-textSecondary text-sm">Publicas en redes cuando tienes tiempo libre.</p>
            </div>
            <div className="w-full md:w-[calc(33.333%-1rem)] flex items-start gap-3 p-5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-purple-500/30 transition-all hover:-translate-y-1">
              <i className="ph-fill ph-x-circle text-purple-500 mt-1 text-xl shrink-0"></i>
              <p className="text-gray-600 dark:text-textSecondary text-sm">Tu web parece anticuada y no convierte como debería.</p>
            </div>
            <div className="w-full md:w-[calc(33.333%-1rem)] flex items-start gap-3 p-5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-purple-500/30 transition-all hover:-translate-y-1">
              <i className="ph-fill ph-x-circle text-purple-500 mt-1 text-xl shrink-0"></i>
              <p className="text-gray-600 dark:text-textSecondary text-sm">Apareces poco en Google cuando te buscan.</p>
            </div>
            <div className="w-full md:w-[calc(50%-1rem)] flex items-start gap-3 p-5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-purple-500/30 transition-all hover:-translate-y-1">
              <i className="ph-fill ph-x-circle text-purple-500 mt-1 text-xl shrink-0"></i>
              <p className="text-gray-600 dark:text-textSecondary text-sm">Tus anuncios dependen más de la suerte que de una estrategia clara.</p>
            </div>
            <div className="w-full md:w-[calc(50%-1rem)] flex items-start gap-3 p-5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-purple-500/30 transition-all hover:-translate-y-1">
              <i className="ph-fill ph-x-circle text-purple-500 mt-1 text-xl shrink-0"></i>
              <p className="text-gray-600 dark:text-textSecondary text-sm">Tu imagen cambia constantemente y transmite improvisación.</p>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-gray-900 dark:text-white leading-relaxed max-w-3xl mx-auto font-medium">
            El problema no suele ser la falta de esfuerzo. <br />
            Es la falta de un sistema que conecte todas las piezas. <br />
            <span className="text-primary mt-4 block">Eso es precisamente lo que construimos.</span>
          </p>
        </div>
      </section>

      {/* 3. MARCA SÓLIDA & FOCO */}
      <section className="py-24 relative z-10 bg-white dark:bg-[#0A0A0F] border-t border-gray-200 dark:border-white/5">
        <div className="max-w-5xl mx-auto px-6 reveal-up text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-light mb-6 text-gray-900 dark:text-white">Una marca sólida no se construye con acciones aisladas.</h2>
          <p className="text-lg text-gray-600 dark:text-textSecondary max-w-3xl mx-auto">Se construye cuando cada punto de contacto transmite la misma confianza.</p>
        </div>

        <div className="max-w-4xl mx-auto px-6 reveal-up mb-24">
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row md:items-center gap-4 border border-gray-200 dark:border-white/10">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0"><i className="ph-fill ph-google-logo text-xl"></i></div>
              <div>
                <p className="text-sm text-gray-500 dark:text-textSecondary mb-1">Cuando alguien te descubre en Google...</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">Encuentra una web profesional.</p>
              </div>
            </div>
            <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row md:items-center gap-4 border border-gray-200 dark:border-white/10">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0"><i className="ph-fill ph-cursor-click text-xl"></i></div>
              <div>
                <p className="text-sm text-gray-500 dark:text-textSecondary mb-1">Cuando entra en tu web...</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">Entiende inmediatamente qué haces y por qué elegirte.</p>
              </div>
            </div>
            <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row md:items-center gap-4 border border-gray-200 dark:border-white/10">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0"><i className="ph-fill ph-instagram-logo text-xl"></i></div>
              <div>
                <p className="text-sm text-gray-500 dark:text-textSecondary mb-1">Cuando visita tus redes...</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">Percibe coherencia.</p>
              </div>
            </div>
            <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row md:items-center gap-4 border border-gray-200 dark:border-white/10">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0"><i className="ph-fill ph-shopping-cart text-xl"></i></div>
              <div>
                <p className="text-sm text-gray-500 dark:text-textSecondary mb-1">Cuando necesita comprar...</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">Ya confía en ti.</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <p className="text-2xl font-medium text-gray-900 dark:text-white mb-2">Ese es el verdadero marketing.</p>
            <p className="text-lg text-gray-600 dark:text-textSecondary">No publicar más. Sino crear un sistema que trabaje para tu negocio cada día.</p>
          </div>
        </div>

        {/* Sistema FOCO */}
        <div className="max-w-7xl mx-auto px-6 reveal-up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-4">El gran diferenciador</div>
            <h2 className="font-heading text-4xl md:text-5xl font-light mb-6 text-gray-900 dark:text-white">El Sistema FOCO™</h2>
            <p className="text-lg text-gray-600 dark:text-textSecondary max-w-2xl mx-auto">No hacemos marketing por hacer marketing. Trabajamos con un sistema que conecta cada acción para que tenga sentido dentro del crecimiento de tu negocio.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-8 rounded-3xl border-gray-200 dark:border-white/5 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 text-9xl font-heading font-bold text-gray-100 dark:text-white/5 group-hover:text-primary/10 transition-colors z-0">F</div>
              <div className="relative z-10">
                <h3 className="text-2xl font-heading text-gray-900 dark:text-white font-medium mb-4">Fundación</h3>
                <p className="text-sm text-gray-600 dark:text-textSecondary">Definimos la base de tu presencia digital: identidad, posicionamiento, propuesta de valor y objetivos.</p>
              </div>
            </div>
            <div className="glass-card p-8 rounded-3xl border-gray-200 dark:border-white/5 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 text-9xl font-heading font-bold text-gray-100 dark:text-white/5 group-hover:text-primary/10 transition-colors z-0">O</div>
              <div className="relative z-10">
                <h3 className="text-2xl font-heading text-gray-900 dark:text-white font-medium mb-4">Optimización</h3>
                <p className="text-sm text-gray-600 dark:text-textSecondary">Mejoramos tu web, SEO, Google Business Profile y activos digitales para que trabajen a tu favor.</p>
              </div>
            </div>
            <div className="glass-card p-8 rounded-3xl border-gray-200 dark:border-white/5 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 text-9xl font-heading font-bold text-gray-100 dark:text-white/5 group-hover:text-primary/10 transition-colors z-0">C</div>
              <div className="relative z-10">
                <h3 className="text-2xl font-heading text-gray-900 dark:text-white font-medium mb-4">Contenido y Conversión</h3>
                <p className="text-sm text-gray-600 dark:text-textSecondary">Creamos contenido, campañas y experiencias que generan confianza, atraen clientes y aumentan las oportunidades de venta.</p>
              </div>
            </div>
            <div className="glass-card p-8 rounded-3xl border-gray-200 dark:border-white/5 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 text-9xl font-heading font-bold text-gray-100 dark:text-white/5 group-hover:text-primary/10 transition-colors z-0">O</div>
              <div className="relative z-10">
                <h3 className="text-2xl font-heading text-gray-900 dark:text-white font-medium mb-4">Optimización Continua</h3>
                <p className="text-sm text-gray-600 dark:text-textSecondary">Medimos, analizamos y mejoramos constantemente para que tu marketing evolucione junto a tu negocio.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
