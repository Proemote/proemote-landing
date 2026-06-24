import { useState } from 'react';

const preguntas = [
  {
    id: 'p1',
    pregunta: "¿Cuál es el sector de tu negocio?",
    tipo: "single",
    opciones: ["Hostelería y restauración", "Belleza y bienestar", "Clínica / Salud", "Reformas y construcción", "Comercio local", "Otro"]
  },
  {
    id: 'p2',
    pregunta: "¿En qué ciudad está tu negocio?",
    tipo: "text",
    placeholder: "Ej: Madrid, Mérida, Sevilla..."
  },
  {
    id: 'p3',
    pregunta: "¿Qué vendes principalmente?",
    tipo: "text",
    placeholder: "Ej: Cortes de pelo, reformas de baños, menús del día..."
  },
  {
    id: 'p4',
    pregunta: "¿Cuántos años llevas con tu negocio?",
    tipo: "single",
    opciones: ["Menos de 1 año", "1 a 3 años", "3 a 7 años", "Más de 7 años"]
  },
  {
    id: 'p5',
    pregunta: "¿Tienes web actualmente?",
    tipo: "single",
    opciones: ["Sí, actualizada y funciona bien", "Sí, pero está desactualizada", "No tengo web"]
  },
  {
    id: 'p6',
    pregunta: "¿Tienes ficha en Google Maps?",
    tipo: "single",
    opciones: ["Sí, bien trabajada", "Sí, pero básica", "No tengo ficha"]
  },
  {
    id: 'p7',
    pregunta: "¿Gestionas redes sociales?",
    tipo: "single",
    opciones: ["Sí, publico regular", "Publico sin estrategia", "Tengo pero no publico", "No tengo redes"]
  },
  {
    id: 'p8',
    pregunta: "¿Con qué frecuencia publicas?",
    tipo: "single",
    opciones: ["Casi todos los días", "Varias veces por semana", "Una vez a la semana", "Casi nunca"]
  },
  {
    id: 'p9',
    pregunta: "¿Cómo llegan los clientes nuevos? (puedes marcar varias)",
    tipo: "multiple",
    opciones: ["Boca a boca", "Google", "Redes sociales", "Anuncios", "Pasan por el local"]
  },
  {
    id: 'p10',
    pregunta: "¿Cuántos clientes nuevos consigues al mes?",
    tipo: "single",
    opciones: ["Menos de 5", "5 - 15", "15 - 30", "Más de 30"]
  },
  {
    id: 'p11',
    pregunta: "Cuando alguien te contacta, ¿qué suele pasar?",
    tipo: "single",
    opciones: ["Casi siempre compran", "Compra la mitad", "Muy pocos compran"]
  },
  {
    id: 'p12',
    pregunta: "¿Has invertido en publicidad de pago?",
    tipo: "single",
    opciones: ["Nunca", "Sin resultados", "Sí, funciona", "No sé si funciona"]
  },
  {
    id: 'p13',
    pregunta: "¿Podrías atender a más clientes ahora mismo?",
    tipo: "single",
    opciones: ["Sí, inmediatamente", "Sí, organizándome", "Estoy al límite"]
  },
  {
    id: 'p14',
    pregunta: "¿Qué has probado sin resultado? (puedes marcar varias)",
    tipo: "multiple",
    opciones: ["Renovar web", "Instagram/Facebook", "Anuncios", "SEO", "Nada todavía"]
  },
  {
    id: 'p15',
    pregunta: "¿Cuál es tu mayor freno ahora mismo?",
    tipo: "single",
    opciones: ["No aparezco en Google", "Likes pero no ventas", "No sé por dónde empezar", "Invierto sin retorno", "No tengo tiempo"]
  },
  {
    id: 'p16',
    pregunta: "¿Cuál es tu objetivo en los próximos 3 meses? (puedes marcar varias)",
    tipo: "multiple",
    opciones: ["Más llamadas/reservas", "Primero en Google", "Redes rentables", "Sistema automático"]
  },
  {
    id: 'p17',
    pregunta: "¿Cuánto podrías invertir en marketing al mes?",
    tipo: "single",
    opciones: ["Menos de 200€", "200€ - 500€", "500€ - 1.000€", "Más de 1.000€"]
  }
];

const s = {
  wrapper: {
    minHeight: '100vh',
    background: '#09090b',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    background: 'rgba(9,9,11,0.95)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    padding: '16px 24px',
  },
  headerInner: {
    maxWidth: 640,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  progressText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.3)',
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  },
  progressBarOuter: {
    flex: 1,
    height: 4,
    background: 'rgba(255,255,255,0.06)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarInner: (pct) => ({
    height: '100%',
    borderRadius: 2,
    background: 'linear-gradient(90deg, #7c3aed, #6366f1)',
    width: `${pct}%`,
    transition: 'width 0.4s ease',
    boxShadow: '0 0 8px rgba(139,92,246,0.5)',
  }),
  body: {
    flex: 1,
    overflowY: 'auto',
    padding: '48px 24px 120px',
  },
  inner: {
    maxWidth: 560,
    margin: '0 auto',
  },
  questionNum: {
    fontSize: 11,
    color: '#8b5cf6',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  questionText: {
    fontSize: 22,
    fontWeight: 600,
    color: 'rgba(255,255,255,0.95)',
    lineHeight: 1.35,
    marginBottom: 32,
  },
  optionBtn: (selected) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    width: '100%',
    padding: '16px 20px',
    marginBottom: 10,
    background: selected ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.03)',
    border: `1.5px solid ${selected ? '#8b5cf6' : 'rgba(255,255,255,0.08)'}`,
    borderRadius: 12,
    color: selected ? '#c4b5fd' : 'rgba(255,255,255,0.75)',
    fontSize: 14,
    fontWeight: selected ? 500 : 400,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    textAlign: 'left',
  }),
  checkbox: (selected) => ({
    width: 20,
    height: 20,
    borderRadius: 6,
    border: `2px solid ${selected ? '#8b5cf6' : 'rgba(255,255,255,0.2)'}`,
    background: selected ? '#8b5cf6' : 'transparent',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s ease',
  }),
  radio: (selected) => ({
    width: 20,
    height: 20,
    borderRadius: '50%',
    border: `2px solid ${selected ? '#8b5cf6' : 'rgba(255,255,255,0.2)'}`,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s ease',
  }),
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    background: '#8b5cf6',
  },
  textInput: {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1.5px solid rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: '16px 20px',
    color: 'rgba(255,255,255,0.9)',
    fontSize: 15,
    outline: 'none',
    transition: 'border-color 0.15s',
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '16px 24px',
    background: 'rgba(9,9,11,0.97)',
    backdropFilter: 'blur(12px)',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  },
  footerInner: {
    maxWidth: 560,
    margin: '0 auto',
    display: 'flex',
    gap: 12,
  },
  btnBack: {
    padding: '14px 20px',
    background: 'transparent',
    border: '1.5px solid rgba(255,255,255,0.08)',
    borderRadius: 50,
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  btnNext: (disabled) => ({
    flex: 1,
    padding: '14px 24px',
    background: disabled ? 'rgba(139,92,246,0.3)' : 'linear-gradient(135deg, #7c3aed, #6366f1)',
    border: 'none',
    borderRadius: 50,
    color: disabled ? 'rgba(255,255,255,0.4)' : '#ffffff',
    fontSize: 15,
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.15s',
    boxShadow: disabled ? 'none' : '0 0 20px rgba(139,92,246,0.35)',
  }),
  error: {
    marginTop: 12,
    color: '#f87171',
    fontSize: 13,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  }
};

export default function Formulario({ onSubmit }) {
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [error, setError] = useState('');
  const [textValue, setTextValue] = useState('');

  const pregunta = preguntas[paso];
  const esUltima = paso === preguntas.length - 1;
  const progreso = ((paso + 1) / preguntas.length) * 100;

  const getValor = () => {
    if (pregunta.tipo === 'text') return textValue;
    return respuestas[pregunta.id] ?? (pregunta.tipo === 'multiple' ? [] : null);
  };

  const isValido = () => {
    const v = getValor();
    if (pregunta.tipo === 'text') return v.trim().length >= 2;
    if (pregunta.tipo === 'multiple') return Array.isArray(v) && v.length > 0;
    return v !== null && v !== undefined;
  };

  const handleSingle = (opcion) => {
    const nuevasResp = { ...respuestas, [pregunta.id]: opcion };
    setRespuestas(nuevasResp);
    setError('');
    // Pasa las respuestas actualizadas para evitar closure estancado en avanzar()
    setTimeout(() => avanzar(nuevasResp), 220);
  };

  const handleMultiple = (opcion) => {
    setRespuestas(prev => {
      const actual = Array.isArray(prev[pregunta.id]) ? prev[pregunta.id] : [];
      const nuevo = actual.includes(opcion)
        ? actual.filter(o => o !== opcion)
        : [...actual, opcion];
      return { ...prev, [pregunta.id]: nuevo };
    });
    setError('');
  };

  const handleText = (e) => {
    setTextValue(e.target.value);
    setError('');
  };

  // Valida contra respActuales (no isValido() con closure antiguo)
  const avanzar = (respActuales = respuestas) => {
    if (pregunta.tipo === 'text') {
      if (textValue.trim().length < 2) {
        setError('Por favor escribe una respuesta válida');
        return;
      }
    } else {
      const val = respActuales[pregunta.id];
      const esValido = pregunta.tipo === 'multiple'
        ? Array.isArray(val) && val.length > 0
        : val !== null && val !== undefined;
      if (!esValido) {
        setError('Por favor selecciona al menos una opción');
        return;
      }
    }

    const respFinal = pregunta.tipo === 'text'
      ? { ...respActuales, [pregunta.id]: textValue.trim() }
      : respActuales;

    setRespuestas(respFinal);

    if (esUltima) {
      onSubmit(respFinal);
    } else {
      setPaso(p => p + 1);
      if (preguntas[paso + 1]?.tipo === 'text') {
        setTextValue(respFinal[preguntas[paso + 1].id] || '');
      }
      setError('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const retroceder = () => {
    if (paso === 0) return;
    const prevPregunta = preguntas[paso - 1];
    if (prevPregunta.tipo === 'text') {
      setTextValue(respuestas[prevPregunta.id] || '');
    }
    setPaso(p => p - 1);
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const valor = getValor();

  return (
    <div style={s.wrapper}>
      <div style={s.header}>
        <div style={s.headerInner}>
          <span style={s.progressText}>Paso {paso + 1} de {preguntas.length}</span>
          <div style={s.progressBarOuter}>
            <div style={s.progressBarInner(progreso)} />
          </div>
        </div>
      </div>

      <div style={s.body}>
        <div style={s.inner} className="animate-slide-right" key={paso}>
          <p style={s.questionNum}>Pregunta {paso + 1}</p>
          <h2 style={s.questionText}>{pregunta.pregunta}</h2>

          {pregunta.tipo === 'text' && (
            <input
              type="text"
              value={textValue}
              onChange={handleText}
              onKeyDown={(e) => e.key === 'Enter' && avanzar()}
              placeholder={pregunta.placeholder || ''}
              style={s.textInput}
              autoFocus
            />
          )}

          {pregunta.tipo === 'single' && pregunta.opciones.map(opcion => {
            const sel = valor === opcion;
            return (
              <button
                key={opcion}
                style={s.optionBtn(sel)}
                onClick={() => handleSingle(opcion)}
              >
                <div style={s.radio(sel)}>
                  {sel && <div style={s.radioDot} />}
                </div>
                {opcion}
              </button>
            );
          })}

          {pregunta.tipo === 'multiple' && pregunta.opciones.map(opcion => {
            const sel = Array.isArray(valor) && valor.includes(opcion);
            return (
              <button
                key={opcion}
                style={s.optionBtn(sel)}
                onClick={() => handleMultiple(opcion)}
              >
                <div style={s.checkbox(sel)}>
                  {sel && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                {opcion}
              </button>
            );
          })}

          {error && (
            <p style={s.error}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </p>
          )}
        </div>
      </div>

      <div style={s.footer}>
        <div style={s.footerInner}>
          {paso > 0 && (
            <button style={s.btnBack} onClick={retroceder}>← Atrás</button>
          )}
          {pregunta.tipo !== 'single' && (
            <button
              style={s.btnNext(!isValido())}
              onClick={() => avanzar()}
              disabled={!isValido()}
            >
              {esUltima ? 'Ver mi diagnóstico →' : 'Siguiente →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
