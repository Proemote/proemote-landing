import { FadeIn } from './ui/FadeIn';
import { Button } from './ui/Button';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden">
      <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-aj-orange opacity-[0.08] rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-150px] left-[-50px] w-[500px] h-[500px] bg-aj-brown opacity-[0.08] rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-12 gap-12 items-center z-10 relative">
        <div className="md:col-span-8">
          <FadeIn>
            <h1 className="text-[64px] leading-[1.05] font-serif text-aj-dark mb-6">
              Una comunidad de <span className="text-aj-orange">jóvenes</span> con diabetes.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="text-xl text-aj-gray mb-10 max-w-[500px] font-sans leading-relaxed">
              <p className="mb-4">Vivir con diabetes es parte de tu vida.</p>
              <p className="mb-4">Encontrar a otras personas que entienden lo que eso significa también puede serlo.</p>
              <p>AJUDEX es la asociación juvenil de personas con diabetes de Extremadura. Un espacio para conectar, compartir experiencias, conocer gente y participar en actividades, encuentros y proyectos.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="flex flex-col gap-4 items-start">
              <Button href="#unete" variant="primary">
                ÚNETE A WHATSAPP
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Button>
              <p className="text-xs text-aj-brown font-medium flex items-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-aj-orange"></span>
                Participación gratuita
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
