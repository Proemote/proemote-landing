import { useState } from 'react';
import { getEstado, getDimension } from '../utils/scoring.js';
import { generarInformePDF } from '../utils/pdf.js';

const dimensiones = [
  'presencia_digital',
  'redes_sociales',
  'generacion_leads',
  'inversion_marketing',
  'madurez_estrategia'
];

const glass = {
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 24,
};

function DimensionCard({ clave, valor }) {
  const dim = getDimension(clave);
  const estado = getEstado(valor);
  return (
    <div style={{
      ...glass,
      borderRadius: 16,
      borderTop: `2px solid ${estado.color}`,
      padding: '16px 12px',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      minWidth: 0,
    }}>
      <div style={{ fontSize: 18, marginBottom: 8 }}>{dim.icon}</div>
      <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10, lineHeight: 1.3 }}>
        {dim.label}
      </div>
      <div style={{ fontSize: 32, fontWeight: 900, color: estado.color, lineHeight: 1, marginBottom: 10, textShadow: `0 0 20px ${estado.color}70` }}>
        {valor}
        <span style={{ fontSize: 12, fontWeight: 400, color: 'rgba(255,255,255,0.2)', marginLeft: 2 }}>/100</span>
      </div>
      <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${valor}%`,
          background: `linear-gradient(90deg, ${estado.color}60, ${estado.color})`,
          borderRadius: 2,
          boxShadow: `0 0 8px ${estado.color}80`,
          transition: 'width 1s ease',
        }} />
      </div>
      <div style={{ marginTop: 6, fontSize: 9, fontWeight: 700, color: estado.color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        {estado.label}
      </div>
    </div>
  );
}

function RecCard({ rec, index }) {
  const colores = ['#8b5cf6', '#6366f1', '#a78bfa'];
  const color = colores[index % colores.length];
  return (
    <div style={{
      ...glass,
      borderLeft: `3px solid ${color}`,
      padding: '22px 22px',
      marginBottom: 14,
      transition: 'transform 0.2s ease',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: `${color}20`,
            border: `1.5px solid ${color}50`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 800, color,
          }}>
            {index + 1}
          </div>
          <span style={{ fontSize: 11, color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Acción {index + 1}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {rec.impacto === 'alto' && (
            <span style={{ fontSize: 11, background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.25)', color: '#a78bfa', padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>
              ⚡ Impacto alto
            </span>
          )}
          {rec.plazo && (
            <span style={{ fontSize: 11, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.38)', padding: '3px 10px', borderRadius: 20 }}>
              {rec.plazo}
            </span>
          )}
        </div>
      </div>
      <h4 style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.92)', marginBottom: 8 }}>{rec.titulo}</h4>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.42)', lineHeight: 1.7 }}>{rec.descripcion}</p>
    </div>
  );
}

export default function Informe({ puntuaciones, analisis, respuestas, nombre, onSolicitarEmail, desbloqueado }) {
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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #0d0018 0%, #090013 35%, #050010 65%, #030008 100%)',
      paddingBottom: 100,
    }}>

      {/* Hero */}
      <div style={{
        padding: '60px 24px 52px',
        textAlign: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'linear-gradient(180deg, rgba(124,58,237,0.14) 0%, transparent 100%)',
      }}>
        <div style={{
          display: 'inline-block',
          fontSize: 11, color: '#a78bfa', fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.15em',
          background: 'rgba(139,92,246,0.15)',
          border: '1px solid rgba(139,92,246,0.28)',
          backdropFilter: 'blur(12px)',
          padding: '6px 16px', borderRadius: 20, marginBottom: 36,
        }}>
          Diagnóstico Digital Proemote
        </div>

        {/* Puntuación con glow */}
        <div style={{
          fontSize: 108,
          fontWeight: 900,
          color: estadoGlobal.color,
          lineHeight: 1,
          marginBottom: 4,
          letterSpacing: '-5px',
          textShadow: `0 0 80px ${estadoGlobal.color}55, 0 0 200px ${estadoGlobal.color}18`,
        }}>
          {puntuaciones.global}
        </div>
        <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.18)', marginBottom: 22, letterSpacing: '-1px' }}>/100</div>

        <div style={{
          display: 'inline-block',
          padding: '8px 26px', borderRadius: 50,
          background: `${estadoGlobal.color}18`,
          border: `1px solid ${estadoGlobal.color}40`,
          backdropFilter: 'blur(12px)',
          color: estadoGlobal.color, fontSize: 15, fontWeight: 700,
          letterSpacing: '0.02em', marginBottom: 22,
        }}>
          {estadoGlobal.label}
        </div>

        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.02em' }}>
          {respuestas.p1} · {respuestas.p2}
        </p>

        {desbloqueado && (
          <button
            onClick={handleDescargarPDF}
            disabled={generandoPDF}
            style={{
              marginTop: 24,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.85)',
              fontSize: 13,
              fontWeight: 600,
              padding: '10px 22px',
              borderRadius: 50,
              cursor: generandoPDF ? 'default' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              opacity: generandoPDF ? 0.6 : 1,
              transition: 'all 0.2s ease',
            }}
          >
            {generandoPDF ? 'Generando PDF...' : '⬇ Descargar informe en PDF'}
          </button>
        )}
      </div>

      <div style={{ maxWidth: 740, margin: '0 auto', padding: '0 20px' }}>

        <div style={{ position: 'relative' }}>
          <div style={{
            filter: desbloqueado ? 'none' : 'blur(9px)',
            pointerEvents: desbloqueado ? 'auto' : 'none',
            userSelect: desbloqueado ? 'auto' : 'none',
            transition: 'filter 0.4s ease',
          }}>

            {/* Grid dimensiones */}
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

            {/* Análisis general */}
            {(texto || fortaleza || urgencia) && (
              <div style={{ ...glass, marginTop: 28, padding: '28px 24px' }}>
                <p style={{ fontSize: 11, color: '#8b5cf6', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 18 }}>
                  📋 Análisis General
                </p>
                {texto && (
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: fortaleza || urgencia ? 20 : 0 }}>
                    {texto}
                  </p>
                )}
                {fortaleza && (
                  <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.18)', borderRadius: 16, padding: '16px 18px', marginBottom: urgencia ? 12 : 0 }}>
                    <p style={{ fontSize: 11, color: '#10b981', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>✅ Tu punto fuerte</p>
                    <p style={{ fontSize: 13, color: 'rgba(16,185,129,0.78)', lineHeight: 1.65 }}>{fortaleza}</p>
                  </div>
                )}
                {urgencia && (
                  <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)', borderRadius: 16, padding: '16px 18px' }}>
                    <p style={{ fontSize: 11, color: '#ef4444', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>⚡ Urgente</p>
                    <p style={{ fontSize: 13, color: 'rgba(239,68,68,0.78)', lineHeight: 1.65 }}>{urgencia}</p>
                  </div>
                )}
              </div>
            )}

            {/* Recomendaciones */}
            {recomendaciones.length > 0 && (
              <div style={{ marginTop: 28 }}>
                <p style={{ fontSize: 11, color: '#8b5cf6', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>
                  🎯 Tus 3 Acciones Prioritarias
                </p>
                {recomendaciones.map((rec, i) => (
                  <RecCard key={i} rec={rec} index={i} />
                ))}
              </div>
            )}
          </div>

          {/* Overlay de bloqueo */}
          {!desbloqueado && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.22), rgba(99,102,241,0.16))',
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
                border: '1px solid rgba(139,92,246,0.35)',
                borderRadius: 28,
                padding: '40px 32px',
                textAlign: 'center',
                boxShadow: '0 0 80px rgba(124,58,237,0.15), inset 0 1px 0 rgba(255,255,255,0.07)',
                maxWidth: 420,
              }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🔒</div>
                <h3 style={{ fontSize: 21, fontWeight: 700, color: 'rgba(255,255,255,0.97)', marginBottom: 12 }}>
                  Tu diagnóstico completo está listo
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 26 }}>
                  Desbloquea el análisis por dimensión, tus puntos fuertes y las 3 acciones prioritarias dejando tu email. Te lo enviamos gratis y al instante.
                </p>
                <button
                  onClick={onSolicitarEmail}
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 15,
                    padding: '16px 40px',
                    borderRadius: 50,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 0 36px rgba(124,58,237,0.55), 0 8px 24px rgba(0,0,0,0.3)',
                    width: '100%',
                    transition: 'all 0.2s ease',
                    letterSpacing: '0.01em',
                  }}
                >
                  Desbloquear mi informe completo →
                </button>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 16 }}>
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
