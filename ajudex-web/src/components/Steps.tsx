import { FadeIn } from './ui/FadeIn';

export function Steps() {
  const steps = [
    { num: "01", title: "ÚNETE", text: "Haz clic en el botón y entra directamente en nuestra comunidad de WhatsApp." },
    { num: "02", title: "CONOCE", text: "Descubre quién forma parte de AJUDEX y empieza a conectar con otras personas." },
    { num: "03", title: "PARTICIPA", text: "Apúntate a actividades, comparte tus ideas y ayuda a construir una comunidad que tenga sentido." }
  ];

  return (
    <section className="py-24 bg-aj-dark text-aj-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <h2 className="text-[40px] md:text-[56px] leading-[1.05] font-serif mb-16 text-center">Entrar es así de fácil.</h2>
        </FadeIn>
        
        <div className="grid md:grid-cols-3 gap-12 relative max-w-5xl mx-auto">
          <div className="absolute top-12 left-0 w-full h-px bg-aj-brown/30 hidden md:block" />
          
          {steps.map((step, idx) => (
            <FadeIn key={idx} delay={idx * 0.2} className="relative z-10 text-center md:text-left">
              <div className="w-24 h-24 bg-aj-dark border-4 border-aj-brown/30 rounded-full flex items-center justify-center text-aj-orange text-3xl font-serif mx-auto md:mx-0 mb-6 font-bold">{step.num}</div>
              <h3 className="text-2xl font-bold tracking-wider mb-4 uppercase text-aj-light">{step.title}</h3>
              <p className="text-aj-light/70 text-lg leading-relaxed font-sans">{step.text}</p>
            </FadeIn>
          ))}
        </div>
        
        <FadeIn delay={0.6} className="mt-20 text-center">
          <p className="text-2xl font-serif text-aj-orange">Empieza simplemente por estar.</p>
        </FadeIn>
      </div>
    </section>
  );
}
