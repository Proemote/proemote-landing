import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FadeIn } from './ui/FadeIn';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "¿Quién puede formar parte de AJUDEX?",
    a: "AJUDEX está dirigida a jóvenes con diabetes de Extremadura que quieran formar parte de una comunidad donde conectar, compartir experiencias y participar."
  },
  {
    q: "¿Tengo que ser socio o socia de FADEX para formar parte de AJUDEX?",
    a: "No. Puedes formar parte de AJUDEX aunque no seas socio o socia de FADEX. Si ya eres socio o socia de FADEX y estás dentro del rango de edad joven, formas parte automáticamente de AJUDEX y no necesitas realizar ningún trámite adicional."
  },
  {
    q: "¿Cuánto cuesta formar parte de la comunidad?",
    a: "La participación en la comunidad de WhatsApp es gratuita. Si quieres conocer más información sobre cómo hacerte socio o socia de AJUDEX y participar en sus actividades, puedes ponerte en contacto con nosotros."
  },
  {
    q: "¿Tengo que vivir en una ciudad concreta?",
    a: "No. AJUDEX está pensada para jóvenes con diabetes de toda Extremadura. Queremos conectar a personas independientemente de dónde vivan y crear oportunidades para que puedan conocerse y compartir."
  },
  {
    q: "¿Tengo que participar activamente?",
    a: "No. Puedes participar todo lo que quieras y a tu ritmo. Puedes entrar para conocer gente, leer, compartir experiencias, proponer ideas o simplemente ver qué está pasando. <strong>Tú decides cómo formar parte.</strong>"
  },
  {
    q: "¿AJUDEX ofrece consejo médico?",
    a: "No. AJUDEX es un espacio de conexión, acompañamiento y apoyo entre iguales. Para cuestiones relacionadas con tu tratamiento, medicación o salud, debes consultar siempre con tu equipo sanitario."
  },
  {
    q: "¿Qué tipo de actividades habrá?",
    a: "Queremos que la propia comunidad ayude a decidirlo. Encuentros, quedadas, actividades, iniciativas y proyectos para jóvenes. Cuantas más personas participemos, más posibilidades tendremos de crear experiencias que realmente nos interesen."
  }
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 bg-aj-light">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <FadeIn>
          <h2 className="text-[40px] md:text-[56px] leading-[1.05] font-serif text-aj-dark mb-12 text-center">
            Antes de unirte, quizá te estés preguntando…
          </h2>
        </FadeIn>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="border border-orange-100 rounded-3xl overflow-hidden bg-white shadow-sm">
                <button
                  className="w-full text-left px-6 py-6 flex justify-between items-center focus:outline-none cursor-pointer hover:bg-orange-50/50 transition-colors"
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                >
                  <span className="font-serif text-xl text-aj-dark pr-8">{faq.q}</span>
                  <ChevronDown className={`w-6 h-6 text-aj-orange transition-transform duration-300 flex-shrink-0 ${openIdx === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openIdx === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-aj-gray font-sans text-lg leading-relaxed pt-2" dangerouslySetInnerHTML={{ __html: faq.a }} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
