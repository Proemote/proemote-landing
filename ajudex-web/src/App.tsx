/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Statement } from './components/Statement';
import { Pillars } from './components/Pillars';
import { Team } from './components/Team';
import { Steps } from './components/Steps';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen font-sans bg-aj-light selection:bg-aj-orange selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        
        <Statement 
          title="Hay cosas que solo entiende quien las vive."
          paragraphs={[
            "Explicar lo que significa vivir con diabetes no siempre es fácil.",
            "Las decisiones del día a día. Las dudas que aparecen de repente. Los planes que cambian. Las situaciones que tienes que explicar una y otra vez.",
            "Y aunque tengas personas que te apoyan, a veces simplemente apetece hablar con alguien que <strong>ya sabe de qué estás hablando</strong>.",
            "Alguien que entiende tus experiencias sin necesidad de empezar desde cero.",
            "AJUDEX nace para crear ese espacio. Una comunidad donde jóvenes con diabetes puedan <strong>conocerse, compartir, apoyarse y crear nuevas experiencias juntos</strong>.",
            "Sin importar dónde vivas en Extremadura. Sin necesidad de conocer a nadie antes de entrar. Y sin tener que encontrar las palabras perfectas para empezar."
          ]}
          ctaText="QUIERO FORMAR PARTE →"
          ctaHref="#unete"
          theme="dark"
        />
        
        <Statement 
          title="¿Qué es AJUDEX?"
          paragraphs={[
            "AJUDEX es la Asociación Juvenil de Diabéticos de Extremadura y forma parte de FADEX, la Federación de Asociaciones de Diabéticos de Extremadura.",
            "Durante años, el apoyo entre iguales ha sido una parte importante de nuestra actividad, especialmente a través del voluntariado y de experiencias compartidas como el campamento de verano de FADEX.",
            "Ahora queremos dar un paso más. Queremos construir una <strong>red joven activa, cercana y conectada</strong>, donde las personas con diabetes puedan encontrar un espacio propio para relacionarse, compartir experiencias y participar.",
            "Porque una comunidad no se construye desde una oficina. <strong>Se construye cuando las personas que forman parte de ella se encuentran.</strong>",
            "Y queremos que tú seas parte de ese encuentro."
          ]}
          ctaText="CONOCE AJUDEX →"
          ctaHref="#pilares"
          theme="light"
        />

        <div id="pilares">
          <Pillars />
        </div>

        <Statement 
          title="El punto de encuentro está en WhatsApp."
          paragraphs={[
            "Hemos creado una comunidad de WhatsApp para que conectar con otros jóvenes sea fácil.",
            "Un espacio donde compartir experiencias, conocer a otras personas, enterarte de las actividades y proponer nuevas ideas.",
            "Sin formularios interminables. Sin complicaciones. <strong>Un clic y estás dentro.</strong>"
          ]}
          ctaText="UNIRME A LA COMUNIDAD DE WHATSAPP →"
          ctaHref="#unete"
          theme="orange"
        />

        <Team />

        <Statement 
          title="Quizá todavía no conozcas a nadie de AJUDEX."
          paragraphs={[
            "Puede que hayas llegado hasta aquí porque alguien te ha hablado de AJUDEX. O porque has visto una publicación en Instagram. O porque has conocido la asociación por primera vez.",
            "Sea como sea, queremos decirte algo:",
            "<strong>No necesitas conocer a nadie para entrar.</strong>",
            "No necesitas esperar a que alguien te invite. No necesitas tener experiencia participando en asociaciones.",
            "Porque una comunidad empieza cuando las personas deciden encontrarse."
          ]}
          ctaText="DAR EL PRIMER PASO →"
          ctaHref="#unete"
          theme="dark"
        />

        <Steps />

        <Statement 
          title="¿Quién puede formar parte de AJUDEX?"
          paragraphs={[
            "AJUDEX está pensada para jóvenes con diabetes de Extremadura que quieran conectar con otras personas, compartir experiencias y participar en una comunidad joven.",
            "Además, AJUDEX forma parte de FADEX. Por eso, si ya eres socio o socia de FADEX y estás dentro del rango de edad joven establecido, <strong>formas parte automáticamente de AJUDEX y no necesitas realizar ningún trámite adicional</strong>.",
            "¿Todavía no eres socio o socia de FADEX? <strong>También puedes formar parte de AJUDEX.</strong>"
          ]}
          ctaText="QUIERO FORMAR PARTE →"
          ctaHref="#unete"
          theme="light"
        />
        
        <div className="bg-aj-light py-24 text-center border-t border-orange-50" id="unete">
          <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
            <h2 className="text-[40px] md:text-[56px] leading-[1.05] font-serif text-aj-dark mb-4">¿Quieres saber qué estamos haciendo?</h2>
            <p className="text-xl md:text-2xl text-aj-gray font-sans mb-12">Síguenos también en Instagram.</p>
            <div className="flex flex-col items-center gap-6">
              <a href="#" className="inline-flex items-center justify-center px-10 py-5 text-sm tracking-widest uppercase transition-all duration-300 font-bold rounded-2xl border-2 border-aj-orange text-aj-orange hover:bg-aj-orange hover:text-white shadow-xl shadow-transparent hover:shadow-orange-200">
                SEGUIR A @AJUDEX EN INSTAGRAM →
              </a>
              <p className="text-aj-gray text-sm mt-6 max-w-md mx-auto">
                <strong className="text-aj-dark">Instagram</strong> para estar al día. <strong className="text-aj-dark">WhatsApp</strong> para formar parte.
              </p>
            </div>
          </div>
        </div>

        <FAQ />
        
      </main>
      
      <Footer />
    </div>
  );
}
