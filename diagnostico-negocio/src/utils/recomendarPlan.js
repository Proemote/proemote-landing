const DESCUENTO_OFERTA = 0.15;

const PLANES_BASE = [
  {
    max: 25,
    nombre: 'Puesta a Punto FOCO™',
    precioBase: 97,
    cuotaMensual: null,
    porQue: 'Tu presencia digital está en el punto de partida: primero hay que dejar la base (Google Business, ficha, plan de acción) bien montada antes de invertir en captación.',
    incluye: ['Configuración completa de Google Business', 'Auditoría digital a fondo', 'Plan de acción a 30 días'],
  },
  {
    max: 45,
    nombre: 'Sistema Presencia™',
    precioBase: 699,
    cuotaMensual: 249,
    porQue: 'Ya tienes algo de base, pero te falta una web y una presencia que genere confianza y te encuentren en Google.',
    incluye: ['Web profesional', 'Sistema FOCO™ incluido', 'Gestión estratégica de redes sociales'],
  },
  {
    max: 65,
    nombre: 'Sistema Captación™',
    precioBase: 1490,
    cuotaMensual: 249,
    porQue: 'Tu presencia ya funciona: el siguiente paso es un sistema que convierta esas visitas en clientes de forma constante.',
    incluye: ['Web Pro + Agente WhatsApp IA', 'Sistema SEO', 'CRM básico configurado'],
  },
  {
    max: 101,
    nombre: 'Sistema Escala™',
    precioBase: 2990,
    cuotaMensual: 499,
    porQue: 'Tienes una base sólida y capacidad para crecer: toca automatizar y escalar la captación con un sistema completo.',
    incluye: ['Web Elite', 'Automatización de atención', 'Sistema de campañas + recuperación de clientes'],
  },
];

export function formatEuro(n) {
  return `${Math.round(n).toLocaleString('es-ES')}€`;
}

function conOferta(plan) {
  const precioOferta = Math.round(plan.precioBase * (1 - DESCUENTO_OFERTA));
  const ahorro = plan.precioBase - precioOferta;
  return { ...plan, precioOferta, ahorro, descuentoPct: Math.round(DESCUENTO_OFERTA * 100) };
}

export function recomendarPlan(puntuacionGlobal) {
  const plan = PLANES_BASE.find(p => puntuacionGlobal <= p.max) || PLANES_BASE[PLANES_BASE.length - 1];
  return conOferta(plan);
}

export function planPorNombre(nombre) {
  const plan = PLANES_BASE.find(p => p.nombre === nombre) || PLANES_BASE[0];
  return conOferta(plan);
}

export function calcularOfertaExpira(desde = new Date()) {
  const expira = new Date(desde);
  expira.setDate(expira.getDate() + 7);
  return expira;
}
