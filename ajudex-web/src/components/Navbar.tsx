import { useState, useEffect } from 'react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-aj-light/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="flex flex-col">
          <span className="font-serif text-3xl text-aj-orange font-bold leading-none tracking-tight lowercase">ajudex</span>
          <span className="text-[10px] uppercase tracking-widest text-aj-brown font-semibold mt-1">Extremadura</span>
        </a>
        <div className="hidden md:flex gap-8 items-center text-sm font-medium text-aj-brown">
          <a href="#" className="hover:text-aj-orange transition-colors">Inicio</a>
          <a href="#pilares" className="hover:text-aj-orange transition-colors">La Comunidad</a>
          <a href="#" className="hover:text-aj-orange transition-colors">Instagram</a>
          <a href="#unete" className="px-5 py-2 border-2 border-aj-orange text-aj-orange rounded-full hover:bg-aj-orange hover:text-white transition-colors cursor-pointer text-center">FADEX</a>
        </div>
      </div>
    </header>
  );
}
