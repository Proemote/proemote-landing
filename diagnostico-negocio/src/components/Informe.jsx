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

const CARD_BG = '#130f1e';
const CARD_BG_SOFT = '#0e0a18';
const CARD_BORDER = '#2a2140';
const MUTED = '#9d94b8';
const MUTED2 = '#79708f';

const card = {
  background: CARD_BG,
  border: `1px solid ${CARD_BORDER}`,
  borderRadius: 20,
};

const eyebrow = {
  fontSize: 11,
  fontWeight: 700,
  color: MUTED,
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
};

function CheckIcon({ color = '#8b5cf6' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="12" cy="12" r="12" />
      <path fillRule="evenodd" clipRule="evenodd" d="M17.026 8.232a.75.75 0 0 1 .18 1.044l-6.5 8.5a.75.75 0 0 1-1.15.06l-3.5-4a.75.75 0 1 1 1.128-.992l2.87 3.28 5.928-7.752a.75.75 0 0 1 1.044-.14z" fill={CARD_BG} />
    </svg>
  );
}

function GaugeCircular({ valor, color }) {
  const size = 132;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (Math.min(valor, 100) / 100) * circ;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size}>
        <circle stroke="#1a1a22" fill="transparent" strokeWidth={stroke} r={r} cx={size / 2} cy={size / 2} />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circ} ${circ}`}
          style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 1s ease' }}
          r={r} cx={size / 2} cy={size / 2}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: 34, fontWeight: 700, color, lineHeight: 1 }}>{valor}</span>
        <span style={{ fontSize: 11, color: MUTED2 }}>/100</span>
      </div>
    </div>
  );
}

function DimensionRow({ clave, valor }) {
  const dim = getDimension(clave);
  const estado = getEstado(valor);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0' }}>
      <span style={{ fontSize: 16, width: 22, textAlign: 'center', flexShrink: 0 }}>{dim.icon}</span>
      <span style={{ fontSize: 12, fontWeight: 600, color: '#c4c4d4', textTransform: 'uppercase', letterSpacing: '0.05em', width: 150, flexShrink: 0 }}>
        {dim.label}
      </span>
      <div style={{ flex: 1, height: 6, background: '#1a1a22', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${valor}%`, background: estado.color, borderRadius: 3, transition: 'width 1s ease' }} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 700, color: estado.color, width: 52, textAlign: 'right', flexShrink: 0 }}>
        {valor}/100
      </span>
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
    <div style={{ ...card, padding: '36px 28px', textAlign: 'center' }}>
      <p style={{ ...eyebrow, marginBottom: 16 }}>Ruta de mejora recomendada</p>

      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '8px 20px',
        fontSize: 15, fontWeight: 600, color: '#fff',
        background: 'rgba(139,92,246,0.12)',
        border: '1px solid rgba(139,92,246,0.3)',
        borderRadius: 50,
        marginBottom: 24,
      }}>
        {plan.nombre}
      </span>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 26, textAlign: 'left', maxWidth: 380, marginLeft: 'auto', marginRight: 'auto' }}>
        {plan.incluye.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: '#c4c4d4', lineHeight: 1.4 }}>
            <CheckIcon />
            {item}
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 16, color: MUTED2, textDecoration: 'line-through' }}>{formatEuro(plan.precioBase)}</span>
        <span style={{ fontSize: 15, color: MUTED }}>pago único</span>
        <span style={{ fontSize: 40, fontWeight: 700, color: '#fff' }}>{formatEuro(plan.precioOferta)}</span>
        {plan.cuotaMensual && <span style={{ fontSize: 14, color: MUTED2 }}>+ {formatEuro(plan.cuotaMensual)}/mes</span>}
      </div>
      <p style={{ fontSize: 13, fontWeight: 600, color: '#a78bfa', marginBottom: 26 }}>
        Ahorras {formatEuro(plan.ahorro)} · -{plan.descuentoPct}% · dejando tu email hoy
      </p>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: cuenta ? 20 : 0 }}>
        <a
          href={`https://wa.me/34641576286?text=${encodeURIComponent(`Hola, he hecho el diagnóstico digital y me interesa el ${plan.nombre}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
            color: '#fff',
            fontWeight: 600,
            fontSize: 14,
            padding: '14px 28px',
            borderRadius: 50,
            textDecoration: 'none',
          }}
        >
          Quiero este plan →
        </a>
        <a
          href="https://proemote.es/contacto"
          style={{
            background: 'transparent',
            border: `1px solid ${CARD_BORDER}`,
            color: '#e4e4e7',
            fontWeight: 500,
            fontSize: 14,
            padding: '14px 28px',
            borderRadius: 50,
            textDecoration: 'none',
          }}
        >
          Agendar llamada gratuita →
        </a>
      </div>

      {cuenta && (
        <p style={{ fontSize: 12.5, color: '#fca5a5', fontWeight: 500 }}>
          ⏳ Oferta válida {cuenta.dias > 0 ? `${cuenta.dias} día${cuenta.dias === 1 ? '' : 's'}` : `${cuenta.horas}h`} más
        </p>
      )}
    </div>
  );
}

function MisionCard({ rec, index }) {
  const iconos = ['🛡️', '🌐', '🎯'];
  return (
    <div style={{ ...card, padding: '20px 18px' }}>
      <div style={{
        width: 34, height: 34, borderRadius: 10,
        background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 15, marginBottom: 14,
      }}>
        {iconos[index % iconos.length]}
      </div>
      <h4 style={{ fontSize: 13, fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 10, lineHeight: 1.3 }}>
        {rec.titulo}
      </h4>
      {rec.plazo && (
        <p style={{ fontSize: 12, color: '#a78bfa', fontWeight: 600, marginBottom: 10 }}>
          Objetivo: {rec.plazo}
        </p>
      )}
      <p style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.6 }}>{rec.descripcion}</p>
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
    <div style={{ minHeight: '100vh', background: '#000' }}>
      <div style={{
        maxWidth: 860,
        margin: '0 auto',
        background: '#050508',
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: 28,
        overflow: 'hidden',
      }}>

        {/* Header de marca */}
        <div style={{
          background: CARD_BG_SOFT,
          borderBottom: `1px solid ${CARD_BORDER}`,
          padding: '18px 32px',
          display: 'flex',
          alignItems: 'center',
        }}>
          <img src="/logo-header.png" alt="Proemote" style={{ height: 44, width: 'auto' }} />
        </div>

        <div style={{ padding: '48px 32px 40px' }}>

          {/* Hero */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ ...eyebrow, marginBottom: 14 }}>Diagnóstico Digital Proemote</p>
            <h1 style={{ fontSize: 26, fontWeight: 600, color: '#fff', marginBottom: 20, letterSpacing: '-0.01em' }}>
              {nombre ? `Hola ${nombre}, ` : 'Hola, '}tu análisis personalizado está listo
            </h1>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12.5, fontWeight: 500, color: '#c4c4d4', border: `1px solid ${CARD_BORDER}`, padding: '6px 16px', borderRadius: 50 }}>
                {respuestas.p1} · {respuestas.p2}
              </span>
              <span style={{
                fontSize: 12.5, fontWeight: 600, color: estadoGlobal.color,
                background: `${estadoGlobal.color}14`, border: `1px solid ${estadoGlobal.color}40`,
                padding: '6px 16px', borderRadius: 50,
              }}>
                Nivel: {estadoGlobal.label}
              </span>
            </div>
          </div>

          {/* Puntuación global */}
          <div style={{ ...card, padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
            <p style={{ ...eyebrow, marginBottom: 20 }}>Puntuación Brújula Digital</p>
            <GaugeCircular valor={puntuaciones.global} color={estadoGlobal.color} />
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
                  opacity: generandoPDF ? 0.6 : 1,
                }}
              >
                {generandoPDF ? 'Generando PDF...' : '⬇ Descargar informe en PDF'}
              </button>
            )}
          </div>

          {/* Dimensiones — siempre visible */}
          <div style={{ ...card, padding: '24px 24px 12px', marginBottom: 28 }}>
            <p style={{ ...eyebrow, marginBottom: 8 }}>Estadísticas por dimensión</p>
            {dimensiones.map(key => (
              <DimensionRow key={key} clave={key} valor={puntuaciones[key]} />
            ))}
          </div>

          <div style={{ position: 'relative' }}>
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
                <div style={{
                  ...card,
                  padding: '24px',
                  borderColor: urgencia ? `${estadoGlobal.color}40` : CARD_BORDER,
                }}>
                  <p style={{ fontSize: 11, color: estadoGlobal.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
                    ⚠ Situación de tu negocio
                  </p>
                  {texto && (
                    <p style={{ fontSize: 14, color: '#c4c4d4', lineHeight: 1.8, marginBottom: fortaleza || urgencia ? 20 : 0 }}>
                      {texto}
                    </p>
                  )}
                  {fortaleza && (
                    <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.16)', borderRadius: 14, padding: '14px 16px', marginBottom: urgencia ? 12 : 0 }}>
                      <p style={{ fontSize: 11, color: '#10b981', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Tu punto fuerte</p>
                      <p style={{ fontSize: 13, color: '#6ee7b7', lineHeight: 1.6 }}>{fortaleza}</p>
                    </div>
                  )}
                  {urgencia && (
                    <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.16)', borderRadius: 14, padding: '14px 16px' }}>
                      <p style={{ fontSize: 11, color: '#ef4444', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Urgente</p>
                      <p style={{ fontSize: 13, color: '#fca5a5', lineHeight: 1.6 }}>{urgencia}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Misiones prioritarias */}
              {recomendaciones.length > 0 && (
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
                    Misiones prioritarias activas
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                    {recomendaciones.map((rec, i) => (
                      <MisionCard key={i} rec={rec} index={i} />
                    ))}
                  </div>
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
                <div style={{ ...card, padding: '40px 32px', textAlign: 'center', maxWidth: 420 }}>
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

        {/* Footer */}
        <div style={{
          borderTop: `1px solid ${CARD_BORDER}`,
          padding: '20px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 10,
        }}>
          <span style={{ fontSize: 11.5, color: MUTED2 }}>© {new Date().getFullYear()} Proemote · Sistema de Diagnóstico Digital</span>
          <div style={{ display: 'flex', gap: 16 }}>
            <a href="https://proemote.es/privacidad" style={{ fontSize: 11.5, color: MUTED2, textDecoration: 'underline' }}>Política de privacidad</a>
            <a href="https://proemote.es/aviso-legal" style={{ fontSize: 11.5, color: MUTED2, textDecoration: 'underline' }}>Aviso legal</a>
          </div>
        </div>
      </div>
    </div>
  );
}
