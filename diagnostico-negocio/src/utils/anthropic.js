export const generarAnalisis = async (respuestas, puntuaciones) => {
  const objetivos = Array.isArray(respuestas.p16) ? respuestas.p16.join(', ') : (respuestas.p16 || '');
  const canalClientes = Array.isArray(respuestas.p9) ? respuestas.p9.join(', ') : (respuestas.p9 || '');

  const dimsOrdenadas = Object.entries({
    presencia_digital: puntuaciones.presencia_digital,
    redes_sociales: puntuaciones.redes_sociales,
    generacion_leads: puntuaciones.generacion_leads,
    inversion_marketing: puntuaciones.inversion_marketing,
    madurez_estrategia: puntuaciones.madurez_estrategia,
  }).sort(([,a],[,b]) => a - b);
  const dimMasDebil = dimsOrdenadas[0][0].replace(/_/g,' ');
  const dimMasFuerte = dimsOrdenadas[4][0].replace(/_/g,' ');

  const prompt = `Eres consultor senior de marketing digital especializado en negocios locales de España. Llevas 10 años ayudando a negocios como peluquerías, restaurantes, clínicas, talleres y comercios a conseguir más clientes.

NEGOCIO ANALIZADO:
- Sector: ${respuestas.p1}
- Ciudad: ${respuestas.p2}
- Producto/Servicio principal: ${respuestas.p3}
- Años en activo: ${respuestas.p4}

DIAGNÓSTICO DIGITAL (0-100):
- Presencia Digital (web + Google Maps): ${puntuaciones.presencia_digital}/100
- Redes Sociales: ${puntuaciones.redes_sociales}/100
- Generación de Leads: ${puntuaciones.generacion_leads}/100
- Inversión en Marketing: ${puntuaciones.inversion_marketing}/100
- Madurez Estratégica: ${puntuaciones.madurez_estrategia}/100
- GLOBAL: ${puntuaciones.global}/100
- Dimensión más débil: ${dimMasDebil}
- Dimensión más fuerte: ${dimMasFuerte}

RESPUESTAS DEL DUEÑO:
- Web actual: ${respuestas.p5}
- Google Maps: ${respuestas.p6}
- Redes sociales: ${respuestas.p7} (frecuencia: ${respuestas.p8})
- Cómo llegan los clientes: ${canalClientes}
- Clientes nuevos al mes: ${respuestas.p10}
- De los que contactan, compran: ${respuestas.p11}
- Publicidad de pago: ${respuestas.p12}
- Capacidad para asumir más clientes: ${respuestas.p13}
- Lo que ha probado sin resultado: ${Array.isArray(respuestas.p14) ? respuestas.p14.join(', ') : (respuestas.p14 || 'nada indicado')}
- Su mayor freno ahora mismo: ${respuestas.p15}
- Objetivos a 3 meses: ${objetivos}
- Presupuesto mensual disponible: ${respuestas.p17}

INSTRUCCIONES ESTRICTAS:
1. Habla directamente al dueño: "tu negocio", "tu ficha de Google", "tus clientes". Nunca en tercera persona.
2. Menciona siempre el sector (${respuestas.p1}) y la ciudad (${respuestas.p2}) en el resumen.
3. El resumen debe diagnosticar el patrón concreto de este negocio, no genéricos. Ejemplo: "Un restaurante con ${puntuaciones.presencia_digital}/100 en presencia digital en ${respuestas.p2} está prácticamente invisible para quien busca en Google..."
4. La fortaleza debe basarse en datos reales de sus respuestas, no en frases vacías como "estás dispuesto a mejorar".
5. La urgencia debe nombrar la dimensión más débil y explicar el coste real de no actuar.
6. Cada recomendación debe ser 100% específica para este sector y ciudad: nombres de plataformas concretas, métricas reales, pasos exactos.
7. Prioriza las recomendaciones según el presupuesto disponible (${respuestas.p17}) y la capacidad (${respuestas.p13}).
8. NO uses frases genéricas como "es importante que...", "considera...", "podría...". Usa imperativos directos.

Responde SOLO con este JSON (sin markdown, sin texto adicional):
{
  "resumen": "3-4 frases. Diagnóstico específico de este negocio mencionando sector, ciudad y las dimensiones más críticas. Qué está pasando realmente y cuál es la oportunidad concreta.",
  "fortaleza": "1-2 frases. Una fortaleza REAL extraída de sus respuestas. Sé específico: qué dato lo indica y por qué es ventaja.",
  "urgencia": "2-3 frases. El problema más urgente con datos concretos. Qué le está costando en clientes perdidos ahora mismo.",
  "recomendaciones": [
    {
      "titulo": "Verbo de acción + resultado esperado (máx 7 palabras)",
      "descripcion": "Pasos exactos, plataformas concretas, métricas y objetivos medibles. Adaptado al sector ${respuestas.p1} en ${respuestas.p2}. Entre 50-80 palabras.",
      "impacto": "alto|medio",
      "plazo": "Esta semana|Este mes|Este trimestre"
    },
    {
      "titulo": "Verbo de acción + resultado esperado (máx 7 palabras)",
      "descripcion": "Pasos exactos, plataformas concretas, métricas y objetivos medibles. Adaptado al sector ${respuestas.p1} en ${respuestas.p2}. Entre 50-80 palabras.",
      "impacto": "alto|medio",
      "plazo": "Esta semana|Este mes|Este trimestre"
    },
    {
      "titulo": "Verbo de acción + resultado esperado (máx 7 palabras)",
      "descripcion": "Pasos exactos, plataformas concretas, métricas y objetivos medibles. Adaptado al sector ${respuestas.p1} en ${respuestas.p2}. Entre 50-80 palabras.",
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
