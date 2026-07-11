import React from 'react';

const reviews = [
  { initial: 'J', name: 'Juany', role: 'CEO Centro de Belleza Juany', text: 'Muy satisfecha con su trabajo, me diseñaron la web y me gestiona las redes sociales y en todo momento la atención es muy profesional. Totalmente recomendable.' },
  { initial: 'A', name: 'Alexandro Navarro', role: 'Fotógrafo', text: 'Trabajar con Proemote ha sido todo un acierto. Son un equipo atento, creativo y profesional, lo recomiendo a todo tipo de negocios que buscan dar un salto de calidad en su imagen profesional.' },
  { initial: 'A', name: 'Ana Jacinto Moruno', role: 'CEO Lo Quiero Limpio', text: 'Espero tener un largo recorrido con Proemote y conseguir mucho éxito, muy contenta de sus servicios. ¡Seguimos trabajando juntos!' },
  { initial: 'L', name: 'Lara Santiago López', role: 'Cliente Counseling', text: 'Lo recomiendo 100%, he tenido muy buena experiencia con la sesión de counselling.' },
  { initial: 'A', name: 'Alba Mulero', role: 'Cliente Orientación Profesional', text: 'Muy profesional. ¡Lo recomiendo! :)' },
  { initial: 'N', name: 'Noemí Sánchez Menaya', role: 'CEO Tierras con Alma', text: 'Profesional y cercano.' }
];

export default function SocialSections() {
  return (
    <>
      {/* 7. SOCIAL PROOF (Logos) */}
      <section className="py-16 bg-white dark:bg-[#0A0A0F] relative z-10 border-y border-gray-200 dark:border-white/5 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 mb-10 reveal-up text-center">
          <h3 className="font-heading text-2xl md:text-4xl font-light mb-4 text-gray-900 dark:text-white">Las marcas que crecen suelen tener algo en común.</h3>
          <p className="text-lg text-primary font-medium mb-4">Han dejado de hacer marketing por impulsos y han empezado a trabajar con un sistema.</p>
          <p className="text-gray-600 dark:text-textSecondary">Desde comercios locales hasta asociaciones, empresas de servicios y proyectos digitales, ayudamos a organizaciones a profesionalizar su presencia, mejorar su posicionamiento y construir una marca preparada para crecer.</p>
        </div>
        
        <div id="logos-container" className="relative w-full flex items-center overflow-x-auto hide-scrollbar cursor-grab [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <div id="logos-track" className="flex w-max items-center gap-16 md:gap-24 px-8 py-4">
            <div className="flex items-center gap-16 md:gap-24 animate-marquee" style={{ '--duration': '40s' } as React.CSSProperties}>
              {['loquierolimpio', 'baobab', 'jamonexclusive', 'xtrm', 'jovenext', 'meridia', 'juany', 'gabrielromero', 'lusitania', 'anagoros', 'opn', 'tierrasconalma'].map(logo => (
                <img key={logo} src={`../logos/logo-${logo}.png`} alt={`Logo ${logo}`} className="h-16 md:h-28 w-auto max-w-none object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex-shrink-0" />
              ))}
            </div>
            <div className="flex items-center gap-16 md:gap-24 animate-marquee" style={{ '--duration': '40s' } as React.CSSProperties}>
              {['loquierolimpio', 'baobab', 'jamonexclusive', 'xtrm', 'jovenext', 'meridia', 'juany', 'gabrielromero', 'lusitania', 'anagoros', 'opn', 'tierrasconalma'].map(logo => (
                <img key={logo + '-dup'} src={`../logos/logo-${logo}.png`} alt={`Logo ${logo}`} className="h-16 md:h-28 w-auto max-w-none object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex-shrink-0" />
              ))}
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-gray-600 dark:text-textSecondary mt-8 reveal-up">Más de 20 marcas en Extremadura y toda España.</p>
      </section>

      {/* NEW DOUBLE MARQUEE REVIEWS */}
      <section className="py-16 md:py-24 relative overflow-hidden flex flex-col items-center border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#05020a] transition-colors duration-300">
        <div className="text-center max-w-2xl px-4 mb-12 relative z-10 reveal-up">
          <h2 className="text-3xl md:text-4xl font-heading font-light text-gray-900 dark:text-white tracking-tight mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-gray-600 dark:text-textSecondary text-lg font-light">
            Descubre cómo hemos ayudado a empresas y asociaciones a dar el salto digital con resultados reales.
          </p>
        </div>

        <div className="relative w-full max-w-[100vw] overflow-hidden flex flex-col gap-4 sm:gap-6 z-10">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 md:w-32 z-20 bg-gradient-to-r from-gray-50 dark:from-[#05020a] to-transparent"></div>
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 md:w-32 z-20 bg-gradient-to-l from-gray-50 dark:from-[#05020a] to-transparent"></div>

          <div className="flex overflow-hidden w-full py-2">
            <div className="flex gap-4 sm:gap-6 animate-marquee w-max" style={{ '--duration': '45s' } as React.CSSProperties}>
              {[...reviews, ...reviews].map((review, i) => (
                <div key={i} className="w-[320px] md:w-[380px] p-5 md:p-6 rounded-2xl border border-gray-200 dark:border-white/5 bg-white dark:bg-white/[0.03] flex flex-col gap-4 flex-shrink-0 shadow-sm hover:border-primary/30 transition-colors select-none">
                  <div className="flex items-center gap-3 pointer-events-none">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full border border-gray-100 dark:border-white/10 flex items-center justify-center text-gray-700 dark:text-white/80 font-semibold bg-gray-50 dark:bg-white/10 text-lg shadow-sm">
                        {review.initial}
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-white dark:bg-zinc-950 rounded-full p-[2px] shadow-sm">
                        <svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 dark:text-white text-sm leading-tight">{review.name}</span>
                      <span className="text-xs text-gray-500 dark:text-white/50 mt-0.5 font-light">{review.role}</span>
                      <div className="flex gap-0.5 mt-1">
                        {[1,2,3,4,5].map(star => (
                          <svg key={star} className="w-3.5 h-3.5 text-[#FABB05]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-textSecondary text-sm font-light leading-relaxed pointer-events-none">{review.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex overflow-hidden w-full py-2">
            <div className="flex gap-4 sm:gap-6 animate-marquee-reverse w-max" style={{ '--duration': '50s' } as React.CSSProperties}>
              {[...reviews, ...reviews].reverse().map((review, i) => (
                <div key={i} className="w-[320px] md:w-[380px] p-5 md:p-6 rounded-2xl border border-gray-200 dark:border-white/5 bg-white dark:bg-white/[0.03] flex flex-col gap-4 flex-shrink-0 shadow-sm hover:border-primary/30 transition-colors select-none">
                  <div className="flex items-center gap-3 pointer-events-none">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full border border-gray-100 dark:border-white/10 flex items-center justify-center text-gray-700 dark:text-white/80 font-semibold bg-gray-50 dark:bg-white/10 text-lg shadow-sm">
                        {review.initial}
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-white dark:bg-zinc-950 rounded-full p-[2px] shadow-sm">
                        <svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 dark:text-white text-sm leading-tight">{review.name}</span>
                      <span className="text-xs text-gray-500 dark:text-white/50 mt-0.5 font-light">{review.role}</span>
                      <div className="flex gap-0.5 mt-1">
                        {[1,2,3,4,5].map(star => (
                          <svg key={star} className="w-3.5 h-3.5 text-[#FABB05]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-textSecondary text-sm font-light leading-relaxed pointer-events-none">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
