import { useState, useEffect } from 'react';
import './App.css';
import Formulario from './components/Formulario.jsx';
import LoadingAnalysis from './components/LoadingAnalysis.jsx';
import Informe from './components/Informe.jsx';
import ModalEmail from './components/ModalEmail.jsx';
import { calcularPuntuaciones } from './utils/scoring.js';
import { generarAnalisis } from './utils/anthropic.js';
import { guardarDiagnostico, guardarLead, actualizarEstadoDiagnostico } from './utils/supabase.js';
import { enviarEmailConInforme } from './utils/resend.js';
import { registrarEnGoogleSheets } from './utils/googleSheets.js';
import { recomendarPlan, calcularOfertaExpira } from './utils/recomendarPlan.js';

// paso: 'formulario' | 'analizando' | 'informe' | 'emailEnviado'

export default function App() {
  const [paso, setPaso] = useState('formulario');
  const [pasoLoading, setPasoLoading] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [puntuaciones, setPuntuaciones] = useState(null);
  const [analisis, setAnalisis] = useState(null);
  const [diagnosticoId, setDiagnosticoId] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const [nombreLead, setNombreLead] = useState('');
  const [ofertaExpira, setOfertaExpira] = useState(null);

  // Avanzar los pasos de loading visualmente
  useEffect(() => {
    if (paso !== 'analizando') return;
    const maxPaso = 4;
    const interval = setInterval(() => {
      setPasoLoading(p => Math.min(p + 1, maxPaso));
    }, 1200);
    return () => clearInterval(interval);
  }, [paso]);

  const handleFormSubmit = async (respuestasForm) => {
    setRespuestas(respuestasForm);
    setPaso('analizando');
    setPasoLoading(0);

    try {
      const punts = calcularPuntuaciones(respuestasForm);
      setPuntuaciones(punts);
      setPasoLoading(1);

      let analisisResult = null;
      try {
        analisisResult = await generarAnalisis(respuestasForm, punts);
      } catch (err) {
        console.error('Error Claude API:', err);
        analisisResult = {
          resumen: `Hemos analizado tu negocio de ${respuestasForm.p1} en ${respuestasForm.p2}. Tu puntuación global es ${punts.global}/100. Hay oportunidades claras de mejora en las áreas con menor puntuación.`,
          fortaleza: punts.global > 40 ? 'Tu negocio tiene una base sólida en algunas áreas digitales.' : 'El hecho de que hayas completado este diagnóstico muestra que estás dispuesto a mejorar.',
          urgencia: 'Identifica las dimensiones con menor puntuación y actúa sobre ellas esta semana.',
          recomendaciones: [
            { titulo: 'Optimiza tu Google Maps', descripcion: 'Completa tu ficha de Google Maps con horarios, fotos actualizadas, categorías correctas y responde a todas las reseñas. Es la acción de mayor impacto para negocios locales.', impacto: 'alto', plazo: 'Esta semana' },
            { titulo: 'Define tu estrategia de contenido', descripcion: 'Publica 3 veces por semana en Instagram y/o Facebook mostrando resultados de clientes, detrás de cámaras y respondiendo preguntas frecuentes de tu sector.', impacto: 'alto', plazo: 'Este mes' },
            { titulo: 'Activa una campaña de captación', descripcion: 'Lanza una campaña de Google Ads o Meta Ads con presupuesto de 5€/día durante 30 días, segmentada a tu ciudad. Mide los resultados semanalmente.', impacto: 'medio', plazo: 'Este trimestre' }
          ]
        };
      }

      setAnalisis(analisisResult);
      setPasoLoading(3);

      let diagId = null;
      try {
        const diag = await guardarDiagnostico(respuestasForm, punts, analisisResult);
        diagId = diag?.id;
        setDiagnosticoId(diagId);
      } catch (err) {
        console.error('Error Supabase:', err);
      }

      registrarEnGoogleSheets('vista_informe', {
        diagnostico_id: diagId,
        puntuacion_global: punts.global,
        puntuacion_presencia_digital: punts.presencia_digital,
        puntuacion_redes_sociales: punts.redes_sociales,
        puntuacion_generacion_leads: punts.generacion_leads,
        puntuacion_inversion_marketing: punts.inversion_marketing,
        puntuacion_madurez_estrategia: punts.madurez_estrategia,
        sector: respuestasForm.p1,
        ciudad: respuestasForm.p2,
        que_vende: respuestasForm.p3,
        anos_negocio: respuestasForm.p4,
        tiene_web: respuestasForm.p5,
        ficha_google_maps: respuestasForm.p6,
        gestiona_redes: respuestasForm.p7,
        frecuencia_publicacion: respuestasForm.p8,
        canales_clientes: Array.isArray(respuestasForm.p9) ? respuestasForm.p9.join(', ') : respuestasForm.p9,
        clientes_nuevos_mes: respuestasForm.p10,
        tasa_conversion_contacto: respuestasForm.p11,
        ha_invertido_publicidad: respuestasForm.p12,
        capacidad_mas_clientes: respuestasForm.p13,
        probado_sin_resultado: Array.isArray(respuestasForm.p14) ? respuestasForm.p14.join(', ') : respuestasForm.p14,
        mayor_freno: respuestasForm.p15,
        objetivo_3_meses: Array.isArray(respuestasForm.p16) ? respuestasForm.p16.join(', ') : respuestasForm.p16,
        presupuesto_marketing: respuestasForm.p17,
      });

      setPasoLoading(4);
      await new Promise(r => setTimeout(r, 600));
      setPaso('informe');

    } catch (err) {
      console.error('Error general:', err);
      setPaso('formulario');
      alert('Ocurrió un error. Por favor inténtalo de nuevo.');
    }
  };

  const handleEmailSubmit = async ({ nombre, email }) => {
    setEnviando(true);
    setErrorEmail('');

    const plan = recomendarPlan(puntuaciones.global);
    const expira = calcularOfertaExpira();

    try {
      await enviarEmailConInforme(email, nombre, puntuaciones, analisis, respuestas, plan, expira);

      try {
        await guardarLead(email, nombre, diagnosticoId, plan.nombre, expira.toISOString());
        if (diagnosticoId) {
          await actualizarEstadoDiagnostico(diagnosticoId, 'email_enviado');
        }
      } catch (err) {
        console.error('Error guardando lead:', err);
      }

      registrarEnGoogleSheets('email_capturado', {
        diagnostico_id: diagnosticoId,
        nombre,
        email,
        sector: respuestas.p1,
        ciudad: respuestas.p2,
        puntuacion_global: puntuaciones?.global,
        plan_recomendado: plan.nombre,
        oferta_expira: expira.toISOString(),
      });

      setNombreLead(nombre);
      setOfertaExpira(expira);
      setMostrarModal(false);
      setPaso('emailEnviado');
    } catch (err) {
      console.error('Error enviando email:', err);
      setErrorEmail('No se pudo enviar el email. Comprueba la dirección e inténtalo de nuevo.');
    } finally {
      setEnviando(false);
    }
  };

  if (paso === 'formulario') {
    return <Formulario onSubmit={handleFormSubmit} />;
  }

  if (paso === 'analizando') {
    return <LoadingAnalysis pasoActual={pasoLoading} />;
  }

  if (paso === 'informe' || paso === 'emailEnviado') {
    return (
      <>
        <Informe
          puntuaciones={puntuaciones}
          analisis={analisis}
          respuestas={respuestas}
          nombre={nombreLead}
          desbloqueado={paso === 'emailEnviado'}
          ofertaExpira={ofertaExpira}
          onSolicitarEmail={() => {
            if (paso === 'emailEnviado') return;
            setMostrarModal(true);
          }}
        />
        {paso === 'emailEnviado' && <BannerExito />}
        {mostrarModal && (
          <ModalEmail
            onSubmit={handleEmailSubmit}
            onClose={() => setMostrarModal(false)}
            enviando={enviando}
            error={errorEmail}
          />
        )}
      </>
    );
  }

  return null;
}

function BannerExito() {
  return (
    <div className="banner-exito">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="banner-exito-text">
        ¡Diagnóstico enviado! Revisa tu bandeja de entrada (y el spam, por si acaso).
      </span>
    </div>
  );
}
