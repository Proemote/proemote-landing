const pasos = [
  "Analizando tu presencia digital...",
  "Evaluando tu estrategia en redes...",
  "Calculando capacidad de captación...",
  "Generando recomendaciones personalizadas...",
  "Preparando tu informe..."
];

export default function LoadingAnalysis({ pasoActual = 0 }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#09090b',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
    }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>

      {/* Ícono animado */}
      <div style={{
        width: 72,
        height: 72,
        borderRadius: '50%',
        background: 'rgba(139,92,246,0.15)',
        border: '2px solid rgba(139,92,246,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          inset: -6,
          borderRadius: '50%',
          border: '2px solid transparent',
          borderTopColor: '#8b5cf6',
          animation: 'spin 1s linear infinite',
        }} />
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.357 2.059l.128.053A24.241 24.241 0 0121 14.5M14.25 3.104c.251.023.501.05.75.082M19.5 14.5l-4.5 4.5m0 0l-4.5-4.5" />
        </svg>
      </div>

      <h2 style={{ fontSize: 22, fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: 8, textAlign: 'center' }}>
        Generando tu análisis personalizado
      </h2>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 48, textAlign: 'center' }}>
        Nuestro sistema está procesando tus respuestas con IA
      </p>

      <div style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {pasos.map((texto, i) => {
          const activo = i === pasoActual;
          const hecho = i < pasoActual;
          return (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 16px',
              background: activo ? 'rgba(139,92,246,0.12)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${activo ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.06)'}`,
              borderRadius: 10,
              transition: 'all 0.3s ease',
            }}>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: hecho ? '#8b5cf6' : activo ? 'rgba(139,92,246,0.25)' : 'rgba(255,255,255,0.05)',
                border: `2px solid ${hecho ? '#8b5cf6' : activo ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.1)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                animation: activo ? 'pulse 1.2s ease-in-out infinite' : 'none',
              }}>
                {hecho ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : activo ? (
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#8b5cf6' }} />
                ) : null}
              </div>
              <span style={{
                fontSize: 13,
                color: hecho ? 'rgba(255,255,255,0.9)' : activo ? '#c4b5fd' : 'rgba(255,255,255,0.3)',
                fontWeight: activo ? 500 : 400,
              }}>
                {texto}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
