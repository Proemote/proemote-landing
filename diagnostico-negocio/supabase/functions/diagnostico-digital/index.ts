import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { respuestas, puntuaciones } = await req.json();

    // Obtener API keys desde variables de entorno de Supabase
    const anthropicApiKey = Deno.env.get("ANTHROPIC_API_KEY");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!anthropicApiKey || !resendApiKey) {
      throw new Error("Missing API keys in Supabase secrets");
    }

    // 1. Llamar a Claude API para generar análisis
    const claudePrompt = `Eres un especialista en marketing digital para negocios locales.

He recopilado datos de un negocio:
- Sector: ${respuestas.p1}
- Ciudad: ${respuestas.p2}
- Producto/Servicio: ${respuestas.p3}
- Antigüedad: ${respuestas.p4}

PUNTUACIONES (0-100):
- Presencia Digital: ${puntuaciones.presencia_digital}
- Redes Sociales: ${puntuaciones.redes_sociales}
- Generación de Leads: ${puntuaciones.generacion_leads}
- Inversión en Marketing: ${puntuaciones.inversion_marketing}
- Madurez Estratégica: ${puntuaciones.madurez_estrategia}

Tu tarea: Proporciona un análisis profesional y personalizado con 3 recomendaciones accionables.

Formato:
**Análisis General (máx 100 palabras):**
[Tu análisis]

**Recomendación 1:**
[Acción específica, máx 50 palabras]

**Recomendación 2:**
[Acción específica, máx 50 palabras]

**Recomendación 3:**
[Acción específica, máx 50 palabras]`;

    const claudeResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": anthropicApiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-opus-4-6",
        max_tokens: 1000,
        messages: [{ role: "user", content: claudePrompt }],
      }),
    });

    const claudeData = await claudeResponse.json();
    const analisis = claudeData.content[0].text;

    // 2. Guardar en Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: diagnostico, error: dbError } = await supabase
      .from("diagnosticos")
      .insert([
        {
          respuestas,
          puntuaciones,
          recomendaciones: analisis,
          estado: "pendiente_email",
        },
      ])
      .select();

    if (dbError) throw dbError;

    return new Response(
      JSON.stringify({
        success: true,
        diagnosticoId: diagnostico[0].id,
        analisis,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
