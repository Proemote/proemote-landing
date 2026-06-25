export const calcularPuntuaciones = (respuestas) => {
  const p5_puntos = {
    "Sí, actualizada y funciona bien": 40,
    "Sí, pero está desactualizada": 20,
    "No tengo web": 0
  };

  const p6_puntos = {
    "Sí, bien trabajada": 40,
    "Sí, pero básica": 20,
    "No tengo ficha": 0
  };

  const presencia_digital = (
    (p5_puntos[respuestas.p5] ?? 0) +
    (p6_puntos[respuestas.p6] ?? 0)
  ) / 2;

  const p7_puntos = {
    "Sí, publico regular": 50,
    "Publico sin estrategia": 25,
    "Tengo pero no publico": 10,
    "No tengo redes": 0
  };

  const p8_puntos = {
    "Casi todos los días": 50,
    "Varias veces por semana": 40,
    "Una vez a la semana": 25,
    "Casi nunca": 0
  };

  const redes_sociales = (
    (p7_puntos[respuestas.p7] ?? 0) +
    (p8_puntos[respuestas.p8] ?? 0)
  ) / 2;

  const p9_opciones = Array.isArray(respuestas.p9) ? respuestas.p9 : [];
  const p9_puntos_map = {
    "Google": 25,
    "Redes sociales": 25,
    "Anuncios": 20,
    "Boca a boca": 15,
    "Pasan por el local": 10
  };
  const p9_valores = p9_opciones.map(opt => p9_puntos_map[opt] ?? 0);
  const p9_promedio = p9_valores.length > 0 ? p9_valores.reduce((a, b) => a + b, 0) / p9_valores.length : 0;

  const p10_puntos = {
    "Menos de 5": 20,
    "5 - 15": 50,
    "15 - 30": 75,
    "Más de 30": 100
  };

  const p11_puntos = {
    "Casi siempre compran": 80,
    "Compra la mitad": 50,
    "Muy pocos compran": 20
  };

  const generacion_leads = (
    p9_promedio +
    (p10_puntos[respuestas.p10] ?? 0) +
    (p11_puntos[respuestas.p11] ?? 0)
  ) / 3;

  const p12_puntos = {
    "Sí, funciona": 80,
    "Sin resultados": 20,
    "No sé si funciona": 30,
    "Nunca": 0
  };

  const p17_puntos = {
    "Menos de 200€": 20,
    "200€ - 500€": 50,
    "500€ - 1.000€": 75,
    "Más de 1.000€": 100
  };

  const inversion_marketing = (
    (p12_puntos[respuestas.p12] ?? 0) +
    (p17_puntos[respuestas.p17] ?? 0)
  ) / 2;

  const p4_puntos = {
    "Menos de 1 año": 30,
    "1 a 3 años": 50,
    "3 a 7 años": 75,
    "Más de 7 años": 90
  };

  const p13_puntos = {
    "Sí, inmediatamente": 100,
    "Sí, organizándome": 60,
    "Estoy al límite": 20
  };

  const p16_opciones = Array.isArray(respuestas.p16) ? respuestas.p16 : [];
  const p16_puntos_map = {
    "Más llamadas/reservas": 30,
    "Primero en Google": 30,
    "Redes rentables": 25,
    "Sistema automático": 40
  };
  const p16_valores = p16_opciones.map(opt => p16_puntos_map[opt] ?? 0);
  const p16_promedio = p16_valores.length > 0 ? p16_valores.reduce((a, b) => a + b, 0) / p16_valores.length : 0;

  const madurez_estrategia = (
    (p4_puntos[respuestas.p4] ?? 0) +
    (p13_puntos[respuestas.p13] ?? 0) +
    p16_promedio
  ) / 3;

  const global = (
    presencia_digital +
    redes_sociales +
    generacion_leads +
    inversion_marketing +
    madurez_estrategia
  ) / 5;

  return {
    presencia_digital: Math.round(presencia_digital),
    redes_sociales: Math.round(redes_sociales),
    generacion_leads: Math.round(generacion_leads),
    inversion_marketing: Math.round(inversion_marketing),
    madurez_estrategia: Math.round(madurez_estrategia),
    global: Math.round(global)
  };
};

export const getEstado = (puntuacion) => {
  if (puntuacion <= 20) return { label: "Crítico", color: "#ef4444", bg: "rgba(239,68,68,0.12)" };
  if (puntuacion <= 40) return { label: "Bajo", color: "#f43f5e", bg: "rgba(244,63,94,0.12)" };
  if (puntuacion <= 60) return { label: "Medio", color: "#eab308", bg: "rgba(234,179,8,0.12)" };
  if (puntuacion <= 80) return { label: "Bueno", color: "#10b981", bg: "rgba(16,185,129,0.12)" };
  return { label: "Excelente", color: "#8b5cf6", bg: "rgba(139,92,246,0.12)" };
};

export const getDimension = (key) => {
  const map = {
    presencia_digital: { label: "Presencia Digital", icon: "🌐" },
    redes_sociales: { label: "Redes Sociales", icon: "📱" },
    generacion_leads: { label: "Generación de Leads", icon: "🎯" },
    inversion_marketing: { label: "Inversión Marketing", icon: "💰" },
    madurez_estrategia: { label: "Madurez Estratégica", icon: "🧭" }
  };
  return map[key] || { label: key, icon: "📊" };
};
