const PLANES = [
  {
    max: 25,
    nombre: 'Puesta a Punto FOCO™',
    precio: '97€ pago único',
    porQue: 'Tu presencia digital está en el punto de partida: primero hay que dejar la base (Google Business, ficha, plan de acción) bien montada antes de invertir en captación.',
    incluye: ['Configuración completa de Google Business', 'Auditoría digital a fondo', 'Plan de acción a 30 días'],
  },
  {
    max: 45,
    nombre: 'Sistema Presencia™',
    precio: '699€ pago único + 249€/mes',
    porQue: 'Ya tienes algo de base, pero te falta una web y una presencia que genere confianza y te encuentren en Google.',
    incluye: ['Web profesional', 'Sistema FOCO™ incluido', 'Gestión estratégica de redes sociales'],
  },
  {
    max: 65,
    nombre: 'Sistema Captación™',
    precio: '1.490€ pago único + 249€/mes',
    porQue: 'Tu presencia ya funciona: el siguiente paso es un sistema que convierta esas visitas en clientes de forma constante.',
    incluye: ['Web Pro + Agente WhatsApp IA', 'Sistema SEO', 'CRM básico configurado'],
  },
  {
    max: 101,
    nombre: 'Sistema Escala™',
    precio: '2.990€ pago único + 499€/mes',
    porQue: 'Tienes una base sólida y capacidad para crecer: toca automatizar y escalar la captación con un sistema completo.',
    incluye: ['Web Elite', 'Automatización de atención', 'Sistema de campañas + recuperación de clientes'],
  },
];

export function recomendarPlan(puntuacionGlobal) {
  return PLANES.find(p => puntuacionGlobal <= p.max) || PLANES[PLANES.length - 1];
}

export function calcularOfertaExpira(desde = new Date()) {
  const expira = new Date(desde);
  expira.setDate(expira.getDate() + 7);
  return expira;
}
