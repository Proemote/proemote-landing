export const generarAnalisis = async (respuestas, puntuaciones) => {
  const objetivos = Array.isArray(respuestas.p16) ? respuestas.p16.join(', ') : (respuestas.p16 || '');
  const canalClientes = Array.isArray(respuestas.p9) ? respuestas.p9.join(', ') : (respuestas.p9 || '');

  const prompt = `Eres un especialista en marketing digital para negocios locales de España. Tu tono es directo, empático y orientado a resultados concretos.

He recopilado datos de un negocio local:
- Sector: ${respuestas.p1}
- Ciudad: ${respuestas.p2}
- Producto/Servicio: ${respuestas.p3}
- Antigüedad: ${respuestas.p4}

PUNTUACIONES (0-100):
- Presencia Digital (web + Google Maps): ${puntuaciones.presencia_digital}/100
- Redes Sociales: ${puntuaciones.redes_sociales}/100
- Generación de Leads: ${puntuaciones.generacion_leads}/100
- Inversión en Marketing: ${puntuaciones.inversion_marketing}/100
- Madurez Estratégica: ${puntuaciones.madurez_estrategia}/100
- PUNTUACIÓN GLOBAL: ${puntuaciones.global}/100

DATOS ESPECÍFICOS:
- Web: ${respuestas.p5}
- Google Maps: ${respuestas.p6}
- Gestión redes sociales: ${respuestas.p7}
- Frecuencia publicación: ${respuestas.p8}
- Canales de captación actuales: ${canalClientes}
- Clientes nuevos al mes: ${respuestas.p10}
- Tasa de conversión: ${respuestas.p11}
- Experiencia con publicidad: ${respuestas.p12}
- Capacidad para más clientes: ${respuestas.p13}
- Mayor freno actual: ${respuestas.p15}
- Objetivos a 3 meses: ${objetivos}
- Presupuesto disponible: ${respuestas.p17}

Genera un análisis profesional, personalizado y accionable. Habla directamente al dueño del negocio ("tu negocio", "tu web", etc.).

Responde con EXACTAMENTE este formato JSON (sin markdown adicional):
{
  "resumen": "Análisis general del negocio en 2-3 frases. Menciona el sector y ciudad. Identifica el mayor problema y la mayor oportunidad.",
  "fortaleza": "Una fortaleza real que tiene este negocio basada en sus respuestas (1-2 frases).",
  "urgencia": "El problema más urgente a resolver ahora mismo (1-2 frases directas).",
  "recomendaciones": [
    {
      "titulo": "Título corto de la acción",
      "descripcion": "Descripción concreta y medible de qué hacer, cómo y en qué plazo. Máximo 60 palabras.",
      "impacto": "alto|medio",
      "plazo": "Esta semana|Este mes|Este trimestre"
    },
    {
      "titulo": "Título corto de la acción",
      "descripcion": "Descripción concreta y medible de qué hacer, cómo y en qué plazo. Máximo 60 palabras.",
      "impacto": "alto|medio",
      "plazo": "Esta semana|Este mes|Este trimestre"
    },
    {
      "titulo": "Título corto de la acción",
      "descripcion": "Descripción concreta y medible de qué hacer, cómo y en qué plazo. Máximo 60 palabras.",
      "impacto": "alto|medio",
      "plazo": "Esta semana|Este mes|Este trimestre"
    }
  ]
}`;

  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/diagnostico-digital`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify({
      action: "generate_analysis",
      payload: { prompt }
    })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `Error API: ${response.status}`);
  }

  const data = await response.json();
  const texto = data.content[0].text.trim();

  const jsonMatch = texto.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Respuesta inesperada de la IA");

  return JSON.parse(jsonMatch[0]);
};
