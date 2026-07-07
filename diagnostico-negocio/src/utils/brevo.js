export async function anadirContactoBrevo({ email, nombre, sector, ciudad, puntuacionGlobal, planRecomendado, ofertaExpira, diagnosticoId }) {
  try {
    await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/diagnostico-digital`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        action: 'add_to_brevo',
        payload: {
          email,
          nombre,
          sector,
          ciudad,
          puntuacion_global: puntuacionGlobal,
          plan_recomendado: planRecomendado,
          oferta_expira: ofertaExpira,
          diagnostico_id: diagnosticoId,
        },
      }),
    });
  } catch (err) {
    console.error('Error añadiendo contacto a Brevo:', err);
  }
}
