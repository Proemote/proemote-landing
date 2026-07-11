import React, { useState } from 'react';

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [privacy, setPrivacy] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacy) {
      alert('Debes aceptar la política de privacidad para suscribirte.');
      return;
    }
    setStatus('loading');
    
    try {
      // 1. Send to Google Sheets (Backup)
      const sheetsUrl = "https://script.google.com/macros/s/AKfycbyXaurIMmVdoqzdLt6OrJB_wHiNiMY-Xcp0DRQ4nvioUU3akuri0DYrCpFhFCGRhh9pqQ/exec";
      fetch(sheetsUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({
              evento: "newsletter_signup",
              email: email,
              timestamp: new Date().toISOString()
          })
      }).catch(err => console.error("Error Sheets:", err));

      // 2. Send to Brevo via Supabase → lista "Newsletter" (ID 2)
      const supabaseUrl = "https://dbsxvwvyjotncbfuownj.supabase.co/functions/v1/diagnostico-digital";
      await fetch(supabaseUrl, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRic3h2d3Z5am90bmNiZnVvd25qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMjc1MDksImV4cCI6MjA5NzgwMzUwOX0.uQ3OzTLJqzxxblTq38ACKuxtwKmF8wyHTiN6QCb3zNc"
          },
          body: JSON.stringify({
              action: "add_to_brevo",
              payload: {
                  email: email,
                  listId: 2
              }
          })
      });

      setStatus('success');
    } catch (error) {
      console.error('Error submitting newsletter:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return <div className="text-sm text-green-600 dark:text-green-400 font-medium py-2">¡Gracias por suscribirte! Revisa tu email.</div>;
  }

  return (
    <form id="newsletter-form" className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div className="flex items-center relative">
        <input 
          type="email" 
          required 
          placeholder="Introduce tu email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-full pl-5 pr-12 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:border-marca transition-colors backdrop-blur-md" 
        />
        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="absolute right-1 top-1 bottom-1 bg-marca hover:bg-marca/90 text-gray-900 dark:text-white w-9 h-9 rounded-full flex items-center justify-center transition-colors"
        >
          {status === 'loading' ? <i className="ph ph-spinner animate-spin"></i> : <i className="ph ph-arrow-right"></i>}
        </button>
      </div>
      <label className="flex items-start gap-2 cursor-pointer select-none text-left">
        <input 
          type="checkbox" 
          required 
          checked={privacy}
          onChange={(e) => setPrivacy(e.target.checked)}
          className="mt-1 rounded border-gray-300 dark:border-white/10 text-marca focus:ring-marca" 
        />
        <span className="text-xs text-gray-600 dark:text-white/40">
          Acepto la <a href="/privacidad/" className="underline hover:text-marca transition-colors">política de privacidad</a>
        </span>
      </label>
    </form>
  );
}

export default function FooterSections() {
  return (
    <>
      {/* 9. TRANSICION EMOCIONAL */}
      <section className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center reveal-up">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light mb-8 text-gray-900 dark:text-white tracking-tight leading-tight">
            Tu negocio ya ha demostrado que puede funcionar.<br /> 
            <span className="font-medium text-gradient-primary">Ahora toca construir una marca capaz de crecer de forma predecible.</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-textSecondary max-w-2xl mx-auto font-light leading-relaxed">
            Cada día que sigues improvisando es una oportunidad que aprovecha tu competencia. Has llegado hasta aquí con esfuerzo y dedicación, es el momento de que tu imagen, tu estrategia y tu comunicación estén a la misma altura que la calidad de tu trabajo.
          </p>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section id="contacto" className="py-24 px-6 relative flex justify-center border-t border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-[#05020a] transition-colors duration-300">
        <div className="w-full max-w-4xl bg-white dark:bg-[#0a0515] border border-gray-200 dark:border-marca/30 rounded-[40px] p-10 md:p-14 text-center relative overflow-hidden shadow-2xl dark:shadow-[0_0_40px_rgba(139,92,246,0.15)] transition-colors duration-300 reveal-up">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-200/50 dark:bg-marca/20 rounded-full blur-[80px] pointer-events-none transition-colors duration-300"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-200/40 dark:bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none transition-colors duration-300"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/20 text-[10px] font-medium tracking-widest uppercase text-violet-700 dark:text-violet-300 mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-marca"></span>
              Siguiente paso
            </div>

            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
              Analizamos tu marca, <br />
              <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-marcalight dark:to-indigo-300">comienza ahora.</span>
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-white/60 font-light mb-10 max-w-2xl leading-relaxed mx-auto">
              Responde unas breves preguntas para generar un informe actual de tu negocio y recibir un plan de acción personalizado. Tú decides si lo aplicas tú mismo o si te ayudamos nosotros.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="https://proemote.es/analisis-personalizado-gratis" target="_blank" rel="noopener noreferrer" className="bg-violet-600 hover:bg-violet-500 dark:bg-marca dark:hover:bg-marcalight text-gray-900 dark:text-white font-medium px-10 py-4 rounded-full transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] flex items-center gap-2 text-base w-full sm:w-auto justify-center">
                Comenzar diagnóstico gratis ahora
              </a>
              
              <a href="https://wa.me/34641576286?text=Hola%2C%20tengo%20una%20duda%20antes%20de%20empezar" target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 font-medium px-8 py-3.5 rounded-full transition-all flex items-center gap-2 text-sm w-full sm:w-auto justify-center">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                ¿Prefieres preguntar primero?
              </a>
            </div>

            <div className="text-sm text-gray-500 dark:text-white/40 font-medium dark:font-light flex flex-col md:flex-row gap-4 md:gap-8 items-center mt-6">
              <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-violet-600 dark:text-marca" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg> Interactivo</span>
              <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-violet-600 dark:text-marca" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg> Personalizado</span>
              <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-violet-600 dark:text-marca" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg> Sin compromiso</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 bg-white dark:bg-[#05020a] text-gray-900 dark:text-white overflow-hidden">
        {/* Background Images - space bg */}
        <div className="absolute -top-80 bottom-0 left-0 right-0 z-0 pointer-events-none" style={{ height: 'calc(100% + 20rem)' }}>
          <img src="/space bg white.png" alt="Space Background Light" className="block dark:hidden w-full h-full object-cover object-center opacity-60" />
          <img src="/space bg.png" alt="Space Background Dark" className="hidden dark:block w-full h-full object-cover object-center opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/30 to-white dark:from-[#05020a] dark:via-[#05020a]/50 dark:to-[#05020a]"></div>
        </div>

        {/* CTA Section */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-24 text-center flex flex-col items-center reveal-up">
          <div className="w-12 h-12 rounded-xl bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 flex items-center justify-center mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <i className="ph-fill ph-rocket-launch text-2xl text-gray-900 dark:text-white"></i>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-light tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
            Empieza a crecer <br className="hidden md:block" />
            con Proemote
          </h2>
          
          <p className="text-lg text-gray-900 dark:text-white/60 font-light mb-10 max-w-2xl leading-relaxed">
            Los negocios de Extremadura por fin pueden ver resultados predecibles gracias al sistema que une identidad visual, posicionamiento web y captación de clientes.
          </p>
          
          <a href="#planes" className="group bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium px-8 py-3.5 rounded-full transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm">
            Empezar ahora <i className="ph ph-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>

        {/* Divider */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/15 to-transparent"></div>
        </div>

        {/* Footer Links Section */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-12 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Col 1: Logo & Info */}
          <div className="md:col-span-12 lg:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mb-8 flex flex-col items-center md:items-start">
              <div className="flex flex-col items-center md:items-start mt-0">
                <span className="text-gray-900 dark:text-white italic text-base md:text-lg tracking-wide font-light mb-1">Shaping what matters</span>
                <span className="text-gray-500 font-medium text-base md:text-lg tracking-wide">Think first.</span>
              </div>
            </div>
            
            <div className="flex flex-col items-center md:items-start gap-4 mb-8 w-full text-sm text-gray-900 dark:text-white/60">
              <a href="mailto:info@proemote.es" className="hover:text-marca dark:hover:text-marca transition-colors flex items-center gap-3">
                <i className="ph ph-envelope-simple text-xl text-gray-900 dark:text-white"></i> info@proemote.es
              </a>
              <a href="tel:+34641576286" className="hover:text-marca dark:hover:text-marca transition-colors flex items-center gap-3">
                <i className="ph ph-phone text-xl text-gray-900 dark:text-white"></i> +34 641 57 62 86
              </a>
              <div className="flex items-start gap-3">
                <i className="ph ph-clock text-xl text-gray-900 dark:text-white mt-0.5"></i> 
                <div className="flex flex-col text-left">
                  <span>L-V: 9H–14H, 16H–20H</span>
                  <span className="mt-1">Sáb: 10H–13:30H | Dom: Cerrado</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center md:justify-start gap-3 w-full">
              <a href="https://www.linkedin.com/company/proemote/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 flex items-center justify-center text-gray-900 dark:text-white/60 hover:text-white hover:bg-marca transition-all">
                <i className="ph-fill ph-linkedin-logo text-lg"></i>
              </a>
              <a href="https://www.instagram.com/proemote/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 flex items-center justify-center text-gray-900 dark:text-white/60 hover:text-white hover:bg-marca transition-all">
                <i className="ph-fill ph-instagram-logo text-lg"></i>
              </a>
              <a href="https://www.facebook.com/proemote/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 flex items-center justify-center text-gray-900 dark:text-white/60 hover:text-white hover:bg-marca transition-all">
                <i className="ph-fill ph-facebook-logo text-lg"></i>
              </a>
            </div>
          </div>

          {/* Col 2: Servicios */}
          <div className="md:col-span-4 lg:col-span-3 mt-4 lg:mt-0">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-6 text-center md:text-left uppercase tracking-widest">Servicios</h4>
            <ul className="space-y-4 text-sm text-gray-900 dark:text-white/60 text-center md:text-left">
              <li><a href="/diseno-web-SEO" className="hover:text-marca transition-colors">Diseño Web</a></li>
              <li><a href="/eventos" className="hover:text-marca transition-colors">Eventos 360º</a></li>
              <li><a href="/marketing-digital" className="hover:text-marca transition-colors">Marketing Digital</a></li>
              <li><a href="/redes-sociales" className="hover:text-marca transition-colors">Redes Sociales</a></li>
              <li><a href="/branding-y-estrategia" className="hover:text-marca transition-colors">Branding & Estrategia</a></li>
              <li><a href="/automatizaciones-y-sistemas" className="hover:text-marca transition-colors">Automatización & Sistemas</a></li>
            </ul>
          </div>

          {/* Col 3: Empresa & Legal */}
          <div className="md:col-span-4 lg:col-span-3 mt-4 lg:mt-0">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-6 text-center md:text-left uppercase tracking-widest">Empresa & Legal</h4>
            <ul className="space-y-4 text-sm text-gray-900 dark:text-white/60 text-center md:text-left">
              <li><a href="/aviso-legal" className="hover:text-marca transition-colors">Aviso Legal</a></li>
              <li><a href="/privacidad" className="hover:text-marca transition-colors">Política de Privacidad</a></li>
              <li><a href="/sobre-nosotros" className="hover:text-marca transition-colors">Sobre nosotros</a></li>
              <li><a href="/contacto" className="hover:text-marca transition-colors">Contacto</a></li>
              <li><a href="/trabaja-con-nosotros" className="hover:text-marca transition-colors">Trabaja con nosotros</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="md:col-span-4 lg:col-span-3 mt-4 lg:mt-0">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-6 text-center md:text-left uppercase tracking-widest">Únete a la Newsletter</h4>
            <p className="text-sm text-gray-900 dark:text-white/60 font-light leading-relaxed mb-6 text-center md:text-left">
              Suscríbete a nuestra newsletter para recibir las mejores estrategias y actualizaciones futuras.
            </p>
            <NewsletterForm />
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-8 pb-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs text-gray-900 dark:text-white/40">Copyright © 2026 Proemote. Todos los derechos reservados.</p>
          <div className="flex items-center justify-center md:justify-end gap-4 text-xs text-gray-900 dark:text-white/40 w-full md:w-auto">
            <p>Usamos cookies para mejorar el servicio.</p>
            <button className="text-marca font-medium hover:text-marca transition-colors">Aceptar</button>
          </div>
        </div>
      </footer>
    </>
  );
}
