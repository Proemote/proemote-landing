import { FadeIn } from './ui/FadeIn';

export function Pillars() {
  const pillars = [
    {
      icon: "🤝",
      title: "Conecta",
      colorClass: "text-aj-orange",
      bgClass: "bg-aj-orange/15",
      borderClass: "border-orange-50",
      subtitle: "Conoce a otros jóvenes con diabetes.",
      text: "Personas que viven experiencias parecidas a las tuyas y con las que quizá puedas compartir mucho más de lo que imaginas. Porque a veces encontrar a alguien que entiende lo que estás contando puede marcar la diferencia."
    },
    {
      icon: "💬",
      title: "Comparte",
      colorClass: "text-aj-brown",
      bgClass: "bg-aj-brown/15",
      borderClass: "border-orange-100",
      subtitle: "Habla, pregunta y comparte experiencias.",
      text: "Cuenta lo que te funciona. Pregunta aquello que siempre has querido preguntar. Comparte una experiencia. Escucha otras historias. O simplemente participa en una conversación.<br/><br/><strong>No tienes que tener todas las respuestas.</strong>"
    },
    {
      icon: "🌱",
      title: "Participa",
      colorClass: "text-aj-orange",
      bgClass: "bg-aj-orange/15",
      borderClass: "border-orange-50",
      subtitle: "Ayuda a construir la comunidad que te gustaría tener.",
      text: "Propón ideas. Participa en actividades. Apúntate a encuentros. Conoce gente. Ayuda a poner en marcha nuevos proyectos.<br/><br/><strong>Queremos construirla contigo.</strong>"
    }
  ];

  return (
    <section className="py-24 bg-aj-light">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-[40px] md:text-[56px] leading-[1.05] font-serif text-aj-dark mb-6">¿Qué puedes encontrar en AJUDEX?</h2>
            <p className="text-xl text-aj-gray font-sans leading-relaxed">Un espacio para ser tú, conectar con otros y participar a tu manera.</p>
          </div>
        </FadeIn>
        
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <FadeIn key={idx} delay={idx * 0.2} className={`bg-white p-8 rounded-3xl shadow-sm border ${pillar.borderClass} flex flex-col gap-5`}>
              <div className="flex items-center gap-4 mb-2">
                <div className={`w-14 h-14 ${pillar.bgClass} rounded-2xl flex items-center justify-center shrink-0`}>
                  <span className="text-2xl">{pillar.icon}</span>
                </div>
                <h3 className={`font-bold ${pillar.colorClass} text-xl uppercase tracking-tight`}>
                  {pillar.title}
                </h3>
              </div>
              <h4 className="text-xl font-serif text-aj-dark">
                {pillar.subtitle}
              </h4>
              <p className="text-aj-gray leading-relaxed font-sans text-sm" dangerouslySetInnerHTML={{ __html: pillar.text }} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
