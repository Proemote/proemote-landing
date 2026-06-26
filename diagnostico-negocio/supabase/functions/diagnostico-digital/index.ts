import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok");
  }

  try {
    const { email, nombre, puntuaciones, analisis } = await req.json();
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey || !email) {
      return new Response(JSON.stringify({ error: "Missing email or API key" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "noreply@proemote.es",
        to: email,
        subject: `${nombre}, tu diagnóstico: ${puntuaciones.global}/100`,
        html: `<h1>Hola ${nombre}</h1><p>Tu puntuación: ${puntuaciones.global}/100</p>`,
      }),
    });

    const result = await emailResponse.json();

    if (!emailResponse.ok) {
      throw new Error(result.message);
    }

    return new Response(JSON.stringify({ success: true, id: result.id }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
