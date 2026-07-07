import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function generateAnalysis(payload: { prompt?: string }) {
  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) return jsonResponse({ error: "Falta configurar ANTHROPIC_API_KEY" }, 500);
  if (!payload?.prompt) return jsonResponse({ error: "Falta el prompt" }, 400);

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-opus-4-8",
      max_tokens: 1500,
      messages: [{ role: "user", content: payload.prompt }],
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    return jsonResponse({ error: data.error?.message || "Error llamando a Anthropic" }, response.status);
  }

  return jsonResponse(data);
}

async function sendEmail(payload: { email?: string; subject?: string; html?: string }) {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) return jsonResponse({ error: "Falta configurar RESEND_API_KEY" }, 500);
  if (!payload?.email || !payload?.html) return jsonResponse({ error: "Falta email o html" }, 400);

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: "Proemote <noreply@proemote.es>",
      to: payload.email,
      subject: payload.subject || "Tu Diagnóstico Digital Proemote",
      html: payload.html,
    }),
  });

  const result = await emailResponse.json();
  if (!emailResponse.ok) {
    return jsonResponse({ error: result.message || "Error enviando con Resend" }, emailResponse.status);
  }

  return jsonResponse({ success: true, id: result.id });
}

const BREVO_LIST_ID = 3;

async function addToBrevo(payload: {
  email?: string;
  nombre?: string;
  sector?: string;
  ciudad?: string;
  puntuacion_global?: number;
  plan_recomendado?: string;
  oferta_expira?: string;
  diagnostico_id?: string;
}) {
  const apiKey = Deno.env.get("BREVO_API_KEY");
  if (!apiKey) return jsonResponse({ error: "Falta configurar BREVO_API_KEY" }, 500);
  if (!payload?.email) return jsonResponse({ error: "Falta email" }, 400);

  const attributes: Record<string, unknown> = {};
  if (payload.nombre) attributes.FIRSTNAME = payload.nombre;
  if (payload.sector) attributes.SECTOR = payload.sector;
  if (payload.ciudad) attributes.CIUDAD = payload.ciudad;
  if (payload.puntuacion_global !== undefined) attributes.PUNTUACION_GLOBAL = payload.puntuacion_global;
  if (payload.plan_recomendado) attributes.PLAN_RECOMENDADO = payload.plan_recomendado;
  if (payload.oferta_expira) attributes.OFERTA_EXPIRA = payload.oferta_expira.slice(0, 10);
  if (payload.diagnostico_id) attributes.DIAGNOSTICO_ID = payload.diagnostico_id;

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      email: payload.email,
      attributes,
      listIds: [BREVO_LIST_ID],
      updateEnabled: true,
    }),
  });

  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    return jsonResponse({ error: result.message || "Error añadiendo contacto a Brevo" }, response.status);
  }

  return jsonResponse({ success: true });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { action, payload } = await req.json();

    if (action === "generate_analysis") return await generateAnalysis(payload);
    if (action === "send_email") return await sendEmail(payload);
    if (action === "add_to_brevo") return await addToBrevo(payload);

    return jsonResponse({ error: `Acción desconocida: ${action}` }, 400);
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : String(error) }, 500);
  }
});
