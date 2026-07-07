import { useState, useEffect, useMemo } from 'react';
import { getEstado, getDimension } from '../utils/scoring.js';
import { generarInformePDF } from '../utils/pdf.js';
import { recomendarPlan, formatEuro } from '../utils/recomendarPlan.js';

const dimensiones = [
  'presencia_digital',
  'redes_sociales',
  'generacion_leads',
  'inversion_marketing',
  'madurez_estrategia'
];

const BG_PAGINA = '#05030a';
const CARD_BG = '#0c0c11';
const CARD_BORDER = '#22222c';
const MUTED = '#8b8b9b';
const MUTED2 = '#6b6b7b';

const card = {
  background: CARD_BG,
  border: `1px solid ${CARD_BORDER}`,
  borderRadius: 24,
};

function CheckIcon({ color = '#8b5cf6' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="12" cy="12" r="12" />
      <path fillRule="evenodd" clipRule="evenodd" d="M17.026 8.232a.75.75 0 0 1 .18 1.044l-6.5 8.5a.75.75 0 0 1-1.15.06l-3.5-4a.75.75 0 1 1 1.128-.992l2.87 3.28 5.928-7.752a.75.75 0 0 1 1.044-.14z" fill={CARD_BG} />
    </svg>
  );
}

function DimensionCard({ clave, valor }) {
  const dim = getDimension(clave);
  const estado = getEstado(valor);
  return (
    <div style={{
      ...card,
      borderTop: `2px solid ${estado.color}`,
      padding: '16px 12px',
      minWidth: 0,
    }}>
      <div style={{ fontSize: 17, marginBottom: 8 }}>{dim.icon}</div>
      <div style={{ fontSize: 9, fontWeight: 600, color: MUTED2, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10, lineHeight: 1.3 }}>
        {dim.label}
      </div>
      <div style={{ fontSize: 28, fontWeight: 600, color: estado.color, lineHeight: 1, marginBottom: 10 }}>
        {valor}
        <span style={{ fontSize: 12, fontWeight: 400, color: MUTED2, marginLeft: 2 }}>/100</span>
      </div>
      <div style={{ height: 3, background: '#1a1a22', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${valor}%`,
          background: estado.color,
          borderRadius: 2,
          transition: 'width 1s ease',
        }} />
      </div>
      <div style={{ marginTop: 6, fontSize: 9, fontWeight: 600, color: estado.color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        {estado.label}
      </div>
    </div>
  );
}

function useCuentaAtras(fechaExpira) {
  const [restante, setRestante] = useState(() => (fechaExpira ? fechaExpira.getTime() - Date.now() : null));

  useEffect(() => {
    if (!fechaExpira) return;
    const interval = setInterval(() => {
      setRestante(fechaExpira.getTime() - Date.now());
    }, 60000);
    return () => clearInterval(interval);
  }, [fechaExpira]);

  if (restante === null || restante <= 0) return null;
  const dias = Math.floor(restante / (1000 * 60 * 60 * 24));
  const horas = Math.floor((restante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return { dias, horas };
}

function PlanRecomendado({ puntuacionGlobal, ofertaExpira }) {
  const plan = useMemo(() => recomendarPlan(puntuacionGlobal), [puntuacionGlobal]);
  const cuenta = useCuentaAtras(ofertaExpira);

  return (
    <div style={{ ...card, padding: '32px' }}>
      <span style={{
        display: 'inline-block',
        padding: '4px 12px',
        fontSize: 10, fontWeight: 600, color: MUTED,
        textTransform: 'uppercase', letterSpacing: '0.12em',
        border: `1px solid ${CARD_BORDER}`, borderRadius: 20,
        marginBottom: 18,
      }}>
        Recomendado para tu negocio
      </span>
      <h3 style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.01em', color: '#fff', marginBottom: 8 }}>{plan.nombre}</h3>
      <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, marginBottom: 22 }}>{plan.porQue}</p>

      <ul style={{ listStyle: 'none', marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {plan.incluye.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#c4c4d4', lineHeight: 1.4 }}>
            <CheckIcon />
            {item}
          </li>
        ))}
      </ul>

      <div style={{ borderTop: `1px solid ${CARD_BORDER}`, paddingTop: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 2 }}>
          <span style={{ fontSize: 15, color: MUTED2, textDecoration: 'line-through' }}>{formatEuro(plan.precioBase)}</span>
          <span style={{ fontSize: 34, fontWeight: 500, color: '#fff' }}>{formatEuro(plan.precioOferta)}</span>
          {plan.cuotaMensual && <span style={{ fontSize: 13, color: MUTED2 }}>+ {formatEuro(plan.cuotaMensual)}/mes</span>}
        </div>
        <p style={{ fontSize: 13, fontWeight: 500, color: '#a78bfa', marginBottom: 20 }}>
          Ahorras {formatEuro(plan.ahorro)} · -{plan.descuentoPct}% · dejando tu email hoy
        </p>

        {cuenta && (
          <div style={{
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: 12,
            padding: '10px 14px',
            fontSize: 12.5,
            color: '#fca5a5',
            fontWeight: 500,
            marginBottom: 20,
          }}>
            Oferta válida {cuenta.dias > 0 ? `${cuenta.dias} día${cuenta.dias === 1 ? '' : 's'}` : `${cuenta.horas}h`} más
          </div>
        )}

        <a
          href={`https://wa.me/34641576286?text=${encodeURIComponent(`Hola, he hecho el diagnóstico digital y me interesa el ${plan.nombre}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
            color: '#fff',
            fontWeight: 600,
            fontSize: 14,
            padding: '14px 26px',
            borderRadius: 50,
            textDecoration: 'none',
          }}
        >
          Quiero este plan →
        </a>
      </div>
    </div>
  );
}

function RecCard({ rec, index }) {
  return (
    <div style={{ ...card, borderLeft: '3px solid #8b5cf6', padding: '22px', marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
        <span style={{ fontSize: 11, color: '#a78bfa', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Acción {index + 1}
        </span>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {rec.impacto === 'alto' && (
            <span style={{ fontSize: 11, border: `1px solid ${CARD_BORDER}`, color: '#a78bfa', padding: '3px 10px', borderRadius: 20, fontWeight: 500 }}>
              Impacto alto
            </span>
          )}
          {rec.plazo && (
            <span style={{ fontSize: 11, border: `1px solid ${CARD_BORDER}`, color: MUTED2, padding: '3px 10px', borderRadius: 20 }}>
              {rec.plazo}
            </span>
          )}
        </div>
      </div>
      <h4 style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 8 }}>{rec.titulo}</h4>
      <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.7 }}>{rec.descripcion}</p>
    </div>
  );
}

export default function Informe({ puntuaciones, analisis, respuestas, nombre, onSolicitarEmail, desbloqueado, ofertaExpira }) {
  const estadoGlobal = getEstado(puntuaciones.global);
  const [generandoPDF, setGenerandoPDF] = useState(false);

  const texto = analisis?.resumen || '';
  const urgencia = analisis?.urgencia || '';
  const fortaleza = analisis?.fortaleza || '';
  const recomendaciones = analisis?.recomendaciones || [];

  const handleDescargarPDF = async () => {
    setGenerandoPDF(true);
    try {
      await generarInformePDF({ puntuaciones, analisis, respuestas, nombre });
    } catch (err) {
      console.error('Error generando PDF:', err);
      alert('No se pudo generar el PDF. Inténtalo de nuevo.');
    } finally {
      setGenerandoPDF(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: BG_PAGINA, paddingBottom: 100 }}>

      {/* Header de marca */}
      <div style={{
        borderBottom: `1px solid ${CARD_BORDER}`,
        padding: '18px 24px',
      }}>
        <div style={{ maxWidth: 740, margin: '0 auto', display: 'flex', alignItems: 'center' }}>
          <img src="/logo-header.png" alt="Proemote" style={{ height: 34, width: 'auto' }} />
        </div>
      </div>

      {/* Hero */}
      <div style={{ padding: '56px 24px 48px', textAlign: 'center', borderBottom: `1px solid ${CARD_BORDER}` }}>
        <div style={{
          display: 'inline-block',
          fontSize: 11, color: MUTED, fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.15em',
          border: `1px solid ${CARD_BORDER}`,
          padding: '6px 16px', borderRadius: 20, marginBottom: 36,
        }}>
          Diagnóstico Digital Proemote
        </div>

        <div style={{
          fontSize: 88,
          fontWeight: 600,
          color: estadoGlobal.color,
          lineHeight: 1,
          marginBottom: 4,
          letterSpacing: '-3px',
        }}>
          {puntuaciones.global}
        </div>
        <div style={{ fontSize: 22, color: MUTED2, marginBottom: 20, letterSpacing: '-0.5px' }}>/100</div>

        <div style={{
          display: 'inline-block',
          padding: '7px 24px', borderRadius: 50,
          background: `${estadoGlobal.color}14`,
          border: `1px solid ${estadoGlobal.color}40`,
          color: estadoGlobal.color, fontSize: 14, fontWeight: 600,
          letterSpacing: '0.02em', marginBottom: 20,
        }}>
          {estadoGlobal.label}
        </div>

        <p style={{ fontSize: 14, color: MUTED2, letterSpacing: '0.02em' }}>
          {respuestas.p1} · {respuestas.p2}
        </p>

        {desbloqueado && (
          <button
            onClick={handleDescargarPDF}
            disabled={generandoPDF}
            style={{
              marginTop: 24,
              background: 'transparent',
              border: `1px solid ${CARD_BORDER}`,
              color: '#e4e4e7',
              fontSize: 13,
              fontWeight: 500,
              padding: '10px 22px',
              borderRadius: 50,
              cursor: generandoPDF ? 'default' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              opacity: generandoPDF ? 0.6 : 1,
              transition: 'background 0.15s ease',
            }}
          >
            {generandoPDF ? 'Generando PDF...' : '⬇ Descargar informe en PDF'}
          </button>
        )}
      </div>

      <div style={{ maxWidth: 740, margin: '0 auto', padding: '0 20px' }}>

        {/* Grid dimensiones — siempre visible */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 10,
          marginTop: 36,
          overflowX: 'auto',
        }}>
          {dimensiones.map(key => (
            <DimensionCard key={key} clave={key} valor={puntuaciones[key]} />
          ))}
        </div>

        <div style={{ position: 'relative', marginTop: 28 }}>
          <div style={{
            filter: desbloqueado ? 'none' : 'blur(9px)',
            pointerEvents: desbloqueado ? 'auto' : 'none',
            userSelect: desbloqueado ? 'auto' : 'none',
            transition: 'filter 0.4s ease',
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
          }}>

            {/* Análisis general */}
            {(texto || fortaleza || urgencia) && (
              <div style={{ ...card, padding: '28px 24px' }}>
                <p style={{ fontSize: 11, color: MUTED, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 18 }}>
                  Análisis general
                </p>
                {texto && (
                  <p style={{ fontSize: 14, color: '#c4c4d4', lineHeight: 1.8, marginBottom: fortaleza || urgencia ? 20 : 0 }}>
                    {texto}
                  </p>
                )}
                {fortaleza && (
                  <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.16)', borderRadius: 16, padding: '16px 18px', marginBottom: urgencia ? 12 : 0 }}>
                    <p style={{ fontSize: 11, color: '#10b981', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Tu punto fuerte</p>
                    <p style={{ fontSize: 13, color: '#6ee7b7', lineHeight: 1.65 }}>{fortaleza}</p>
                  </div>
                )}
                {urgencia && (
                  <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.16)', borderRadius: 16, padding: '16px 18px' }}>
                    <p style={{ fontSize: 11, color: '#ef4444', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Urgente</p>
                    <p style={{ fontSize: 13, color: '#fca5a5', lineHeight: 1.65 }}>{urgencia}</p>
                  </div>
                )}
              </div>
            )}

            {/* Recomendaciones */}
            {recomendaciones.length > 0 && (
              <div>
                <p style={{ fontSize: 11, color: MUTED, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>
                  Tus acciones prioritarias
                </p>
                {recomendaciones.map((rec, i) => (
                  <RecCard key={i} rec={rec} index={i} />
                ))}
              </div>
            )}

            <PlanRecomendado puntuacionGlobal={puntuaciones.global} ofertaExpira={desbloqueado ? ofertaExpira : null} />
          </div>

          {/* Overlay de bloqueo */}
          {!desbloqueado && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingTop: 60,
            }}>
              <div style={{
                ...card,
                padding: '40px 32px',
                textAlign: 'center',
                maxWidth: 420,
              }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🔒</div>
                <h3 style={{ fontSize: 21, fontWeight: 600, color: '#fff', marginBottom: 12 }}>
                  Tu diagnóstico completo está listo
                </h3>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, marginBottom: 26 }}>
                  Desbloquea el análisis por dimensión, tus puntos fuertes y las 3 acciones prioritarias dejando tu email. Te lo enviamos gratis y al instante.
                </p>
                <button
                  onClick={onSolicitarEmail}
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: 15,
                    padding: '16px 40px',
                    borderRadius: 50,
                    border: 'none',
                    cursor: 'pointer',
                    width: '100%',
                    transition: 'opacity 0.2s ease',
                    letterSpacing: '0.01em',
                  }}
                >
                  Desbloquear mi informe completo →
                </button>
                <p style={{ fontSize: 12, color: MUTED2, marginTop: 16 }}>
                  Gratis · Sin spam · Sin tarjeta de crédito
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
