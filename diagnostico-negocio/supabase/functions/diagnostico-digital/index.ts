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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { action, payload } = await req.json();

    if (action === "generate_analysis") return await generateAnalysis(payload);
    if (action === "send_email") return await sendEmail(payload);

    return jsonResponse({ error: `Acción desconocida: ${action}` }, 400);
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : String(error) }, 500);
  }
});
