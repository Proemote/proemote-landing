import { useState } from 'react';

export default function ModalEmail({ onSubmit, onClose, enviando, error }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [privacidad, setPrivacidad] = useState(false);
  const [localError, setLocalError] = useState('');

  const validar = () => {
    if (nombre.trim().length < 2) return 'Por favor escribe tu nombre';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Por favor escribe un email válido';
    if (!privacidad) return 'Debes aceptar la política de privacidad';
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validar();
    if (err) { setLocalError(err); return; }
    setLocalError('');
    onSubmit({ nombre: nombre.trim(), email: email.trim() });
  };

  const isDisabled = enviando || nombre.trim().length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !privacidad;

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: '1.5px solid rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: '14px 16px',
    color: 'rgba(255,255,255,0.9)',
    fontSize: 15,
    outline: 'none',
    marginBottom: 16,
    transition: 'border-color 0.15s',
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <style>{`@keyframes slideUp { from { transform: translateY(100%); opacity:0; } to { transform: translateY(0); opacity:1; } }`}</style>
      <div style={{
        background: '#111118',
        border: '1px solid rgba(255,255,255,0.1)',
        borderBottom: 'none',
        borderRadius: '20px 20px 0 0',
        padding: '28px 24px 40px',
        width: '100%',
        maxWidth: 480,
        position: 'relative',
        animation: 'slideUp 0.35s ease',
      }}>
        <button
          style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: 8, display: 'flex' }}
          onClick={onClose}
          aria-label="Cerrar"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div style={{ width: 36, height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 2, margin: '0 auto 24px' }} />
        <h3 style={{ fontSize: 20, fontWeight: 700, color: 'rgba(255,255,255,0.95)', marginBottom: 6, textAlign: 'center' }}>
          Recibir informe por email
        </h3>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 28, textAlign: 'center', lineHeight: 1.5 }}>
          Te enviamos el diagnóstico completo gratis y al instante
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={e => { setNombre(e.target.value); setLocalError(''); }}
            placeholder="Tu nombre"
            style={inputStyle}
            disabled={enviando}
          />

          <label style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setLocalError(''); }}
            placeholder="tu@email.com"
            style={inputStyle}
            disabled={enviando}
          />

          <div
            style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 24, cursor: 'pointer' }}
            onClick={() => { setPrivacidad(p => !p); setLocalError(''); }}
          >
            <div style={{
              width: 20, height: 20, borderRadius: 5,
              border: `2px solid ${privacidad ? '#8b5cf6' : 'rgba(255,255,255,0.2)'}`,
              background: privacidad ? '#8b5cf6' : 'transparent',
              flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginTop: 1, transition: 'all 0.15s',
            }}>
              {privacidad && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
              Acepto la{' '}
              <a href="https://proemote.es/privacidad" target="_blank" rel="noopener" style={{ color: '#a78bfa', textDecoration: 'underline' }} onClick={e => e.stopPropagation()}>
                política de privacidad
              </a>
              . No enviaremos spam, solo el diagnóstico y contenido útil.
            </span>
          </div>

          {(localError || error) && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#fca5a5', marginBottom: 16 }}>
              {localError || error}
            </div>
          )}

          <button
            type="submit"
            disabled={isDisabled}
            style={{
              width: '100%',
              padding: '16px',
              background: isDisabled ? 'rgba(139,92,246,0.3)' : 'linear-gradient(135deg, #7c3aed, #6366f1)',
              border: 'none',
              borderRadius: 50,
              color: isDisabled ? 'rgba(255,255,255,0.4)' : '#ffffff',
              fontSize: 15,
              fontWeight: 700,
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              boxShadow: isDisabled ? 'none' : '0 0 24px rgba(139,92,246,0.35)',
              transition: 'all 0.15s',
            }}
          >
            {enviando ? 'Enviando...' : 'Enviarme el diagnóstico →'}
          </button>
        </form>
      </div>
    </div>
  );
}
