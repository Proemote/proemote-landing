export const enviarEmailConInforme = async (email, nombre, puntuaciones, analisis, respuestas, plan, ofertaExpira) => {
  const { getEstado, getDimension } = await import('./scoring.js');
  const estado = getEstado(puntuaciones.global);

  const fechaLimite = ofertaExpira
    ? ofertaExpira.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })
    : '';

  const planHTML = plan ? `
    <div style="background: linear-gradient(135deg, rgba(124,58,237,0.18), rgba(99,102,241,0.1)); border: 1px solid rgba(139,92,246,0.35); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
      <p style="color: #a78bfa; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px 0;">Recomendado para tu negocio</p>
      <h3 style="color: #ffffff; font-size: 18px; font-weight: 700; margin: 0 0 8px 0;">${plan.nombre}</h3>
      <p style="color: #c0c0d0; font-size: 13px; line-height: 1.6; margin: 0 0 16px 0;">${plan.porQue}</p>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: ${fechaLimite ? '14px' : '0'};">
        <span style="color: #ffffff; font-size: 20px; font-weight: 700;">${plan.precio}</span>
        <a href="https://wa.me/34641576286?text=${encodeURIComponent(`Hola, he hecho el diagnóstico digital y me interesa el ${plan.nombre}`)}" style="background: linear-gradient(135deg, #7c3aed, #6366f1); color: #fff; font-weight: 700; font-size: 13px; padding: 10px 22px; border-radius: 50px; text-decoration: none;">Quiero este plan →</a>
      </div>
      ${fechaLimite ? `<div style="background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.25); border-radius: 10px; padding: 10px 14px;">
        <p style="color: #fca5a5; font-size: 12px; font-weight: 600; margin: 0;">⏳ Oferta de acompañamiento prioritario válida hasta el ${fechaLimite}</p>
      </div>` : ''}
    </div>` : '';

  const dimensiones = ['presencia_digital', 'redes_sociales', 'generacion_leads', 'inversion_marketing', 'madurez_estrategia'];

  const barrasHTML = dimensiones.map(key => {
    const dim = getDimension(key);
    const val = puntuaciones[key];
    const est = getEstado(val);
    return `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #1a1a2e;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="color: #a0a0b0; font-size: 13px;">${dim.icon} ${dim.label}</span>
            <span style="color: ${est.color}; font-weight: 600; font-size: 14px;">${val}/100</span>
          </div>
          <div style="background: #1a1a2e; border-radius: 4px; height: 6px; overflow: hidden;">
            <div style="background: ${est.color}; height: 100%; width: ${val}%; border-radius: 4px;"></div>
          </div>
        </td>
      </tr>`;
  }).join('');

  const recomendacionesHTML = (analisis.recomendaciones || []).map((rec, i) => `
    <div style="background: #0f0f1a; border: 1px solid #2a2a4a; border-left: 3px solid #8b5cf6; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
        <span style="color: #8b5cf6; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Acción ${i + 1}</span>
        <span style="background: rgba(139,92,246,0.15); color: #a78bfa; font-size: 11px; padding: 2px 8px; border-radius: 20px;">${rec.plazo || 'Este mes'}</span>
      </div>
      <h4 style="color: #ffffff; font-size: 15px; font-weight: 600; margin: 0 0 8px 0;">${rec.titulo}</h4>
      <p style="color: #8080a0; font-size: 13px; line-height: 1.6; margin: 0;">${rec.descripcion}</p>
    </div>`).join('');

  const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tu Diagnóstico Digital - Proemote</title>
</head>
<body style="margin: 0; padding: 0; background: #05020a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #6d28d9 0%, #4f46e5 100%); border-radius: 16px; padding: 32px; text-align: center; margin-bottom: 24px;">
      <p style="color: rgba(255,255,255,0.7); font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px 0;">DIAGNÓSTICO DIGITAL PROEMOTE</p>
      <h1 style="color: #ffffff; font-size: 24px; font-weight: 700; margin: 0 0 4px 0;">Hola ${nombre},</h1>
      <p style="color: rgba(255,255,255,0.8); font-size: 15px; margin: 0;">Tu análisis personalizado está listo</p>
    </div>

    <!-- Score Global -->
    <div style="background: #0f0f1a; border: 1px solid #2a2a4a; border-radius: 16px; padding: 28px; text-align: center; margin-bottom: 24px;">
      <p style="color: #8080a0; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 8px 0;">Puntuación Brújula Digital</p>
      <div style="font-size: 64px; font-weight: 700; color: ${estado.color}; line-height: 1; margin: 0 0 4px 0;">${puntuaciones.global}</div>
      <div style="color: #6060a0; font-size: 20px; margin: 0 0 12px 0;">/100</div>
      <span style="background: ${estado.color}20; color: ${estado.color}; font-size: 14px; font-weight: 600; padding: 6px 16px; border-radius: 20px;">${estado.label}</span>
    </div>

    <!-- Análisis General -->
    ${analisis.resumen ? `
    <div style="background: #0f0f1a; border: 1px solid #2a2a4a; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
      <p style="color: #8b5cf6; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px 0;">📋 Análisis General</p>
      <p style="color: #c0c0d0; font-size: 14px; line-height: 1.7; margin: 0;">${analisis.resumen}</p>
      ${analisis.urgencia ? `<div style="background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2); border-radius: 10px; padding: 14px; margin-top: 14px;">
        <p style="color: #ef4444; font-size: 12px; font-weight: 600; margin: 0 0 4px 0;">⚡ Urgente</p>
        <p style="color: #fca5a5; font-size: 13px; margin: 0;">${analisis.urgencia}</p>
      </div>` : ''}
    </div>` : ''}

    <!-- Dimensiones -->
    <div style="background: #0f0f1a; border: 1px solid #2a2a4a; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
      <p style="color: #8b5cf6; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px 0;">📊 Puntuaciones por Dimensión</p>
      <table style="width: 100%; border-collapse: collapse;">
        ${barrasHTML}
      </table>
    </div>

    <!-- Recomendaciones -->
    <div style="margin-bottom: 24px;">
      <p style="color: #8b5cf6; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px 0;">🎯 Tus 3 Acciones Prioritarias</p>
      ${recomendacionesHTML}
    </div>

    ${planHTML}

    <!-- CTA -->
    <div style="background: linear-gradient(135deg, #6d28d9 0%, #4f46e5 100%); border-radius: 16px; padding: 28px; text-align: center; margin-bottom: 24px;">
      <h3 style="color: #ffffff; font-size: 18px; font-weight: 600; margin: 0 0 8px 0;">¿Quieres que lo implementemos juntos?</h3>
      <p style="color: rgba(255,255,255,0.75); font-size: 14px; margin: 0 0 20px 0;">Agenda una llamada gratuita de 30 minutos y te mostramos cómo aplicar este plan en tu negocio.</p>
      <a href="https://proemote.es/contacto" style="background: #ffffff; color: #6d28d9; font-weight: 700; font-size: 15px; padding: 14px 32px; border-radius: 50px; text-decoration: none; display: inline-block;">Agendar llamada gratuita →</a>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding: 16px 0;">
      <p style="color: #404060; font-size: 12px; margin: 0 0 8px 0;">Proemote® · Marketing Digital para Negocios Locales</p>
      <p style="margin: 0;">
        <a href="https://proemote.es/privacidad" style="color: #606080; font-size: 11px; text-decoration: underline;">Política de privacidad</a>
        <span style="color: #404060; margin: 0 8px;">·</span>
        <a href="https://proemote.es/aviso-legal" style="color: #606080; font-size: 11px; text-decoration: underline;">Aviso legal</a>
      </p>
    </div>

  </div>
</body>
</html>`;

  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/diagnostico-digital`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify({
      action: "send_email",
      payload: {
        email: email,
        subject: `${nombre}, aquí tienes los resultados de tu Análisis Gratuito y tu Plan de acción`,
        html: htmlContent
      }
    })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `Error Resend: ${response.status}`);
  }

  return true;
};
