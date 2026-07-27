import { FadeIn } from './ui/FadeIn';

export function Team() {
  const team = [
    { name: "Elena Calderón", role: "Presidenta" },
    { name: "Javier Folgado", role: "Vicepresidente" },
    { name: "Pablo Calderón", role: "Vocal" },
    { name: "Carlos Molina", role: "Tesorero" }
  ];

  return (
    <section className="py-24 bg-aj-light relative overflow-hidden">
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-aj-orange opacity-[0.05] rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <FadeIn>
              <h2 className="text-[40px] md:text-[56px] leading-[1.05] font-serif text-aj-dark mb-6">
                Estamos poniendo AJUDEX en marcha. <br/><span className="text-aj-orange">Y queremos hacerlo contigo.</span>
              </h2>
              <div className="space-y-6 text-xl text-aj-gray max-w-[500px] font-sans leading-relaxed">
                <p>Detrás de esta nueva etapa hay un equipo con ganas de conectar a los jóvenes con diabetes de Extremadura y dar un nuevo impulso a la comunidad.</p>
                <p>La nueva junta directiva de AJUDEX quiere escuchar, conectar y crear espacios donde la juventud pueda tener un papel activo.</p>
              </div>
            </FadeIn>
          </div>
          
          <div className="bg-aj-brown p-10 md:p-12 rounded-[40px] text-white relative overflow-hidden shadow-2xl shadow-orange-900/10">
            <div className="absolute top-0 right-0 p-6 opacity-20 pointer-events-none">
              <svg width="120" height="120" viewBox="0 0 200 200" fill="currentColor"><path d="M100 20C70 20 50 60 50 100C50 140 70 180 100 180C130 180 150 140 150 100C150 60 130 20 100 20Z"/><path d="M100 0C60 0 30 40 30 100C30 160 60 200 100 200C140 200 170 160 170 100C170 40 140 0 100 0Z" opacity="0.2"/></svg>
            </div>
            <h4 className="text-xs uppercase tracking-[0.2em] mb-8 opacity-70">Nueva Junta Directiva 2026</h4>
            <div className="grid sm:grid-cols-2 gap-y-8 gap-x-6 relative z-10">
              {team.map((member, idx) => (
                <FadeIn key={idx} delay={idx * 0.15}>
                  <p className="text-sm opacity-70 uppercase tracking-widest mb-1">{member.role}</p>
                  <p className="text-2xl font-serif">{member.name}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
