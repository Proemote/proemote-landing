const WEBHOOK_URL = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;

/**
 * Registra un evento del diagnóstico en la Google Sheet configurada.
 * Se usa "no-cors" porque el Web App de Apps Script no siempre responde
 * con cabeceras CORS legibles; esto es un registro "fire and forget",
 * no bloquea ni depende de la respuesta.
 */
export async function registrarEnGoogleSheets(evento, datos) {
  if (!WEBHOOK_URL) {
    console.warn('VITE_GOOGLE_SHEETS_WEBHOOK_URL no configurada; se omite el registro en Sheets.');
    return;
  }

  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ evento, ...datos, timestamp: new Date().toISOString() }),
    });
  } catch (err) {
    console.error('Error registrando en Google Sheets:', err);
  }
}
