import { Button } from './ui/Button';

export function Footer() {
  return (
    <footer className="bg-aj-light text-aj-dark pt-24 pb-8 border-t border-orange-100 relative overflow-hidden">
      <div className="absolute bottom-[-150px] right-[-50px] w-[400px] h-[400px] bg-aj-orange opacity-[0.05] rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
        <h2 className="text-[40px] md:text-[56px] leading-[1.05] font-serif mb-8 text-aj-dark">Tu comunidad está aquí.</h2>
        <div className="max-w-2xl mx-auto space-y-4 text-xl text-aj-gray font-sans leading-relaxed mb-12">
          <p>Quizá llevas años viviendo con diabetes. Quizá acabas de empezar una nueva etapa. Quizá has conocido AJUDEX hoy por primera vez.</p>
          <p>Quizá simplemente te apetece conocer a otras personas que entienden algunas cosas sin necesidad de explicarlas.</p>
          <p className="text-aj-orange font-bold mt-8">Solo tienes que dar el primer paso.</p>
        </div>
        
        <div className="mb-24 flex justify-center">
          <Button href="#unete" variant="primary">
            ÚNETE A LA COMUNIDAD DE WHATSAPP
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Button>
        </div>
        
        <div className="border-t border-orange-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[11px] text-aj-brown font-medium uppercase tracking-wider text-center md:text-left">
            © {new Date().getFullYear()} AJUDEX · ASOCIACIÓN JUVENIL DE DIABÉTICOS DE EXTREMADURA
          </div>
          
          <div className="flex gap-6 text-[11px] font-bold text-aj-orange uppercase tracking-wider">
            <a href="#" className="hover:text-aj-brown transition-colors">Privacidad</a>
            <a href="#" className="hover:text-aj-brown transition-colors">Contacto</a>
            <a href="#" className="hover:text-aj-brown transition-colors">@ajudex_oficial</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
