import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

const DESCUENTO_OFERTA = 0.15;

const PLANES: Record<string, { precioBase: number; cuotaMensual: number | null; porQue: string }> = {
  "Puesta a Punto FOCO™": {
    precioBase: 97,
    cuotaMensual: null,
    porQue: "dejar tu base digital (Google Business, ficha, plan de acción) bien montada.",
  },
  "Sistema Presencia™": {
    precioBase: 699,
    cuotaMensual: 249,
    porQue: "tener una web y una presencia que genere confianza y te encuentren en Google.",
  },
  "Sistema Captación™": {
    precioBase: 1490,
    cuotaMensual: 249,
    porQue: "convertir tus visitas en clientes de forma constante.",
  },
  "Sistema Escala™": {
    precioBase: 2990,
    cuotaMensual: 499,
    porQue: "automatizar y escalar tu captación con un sistema completo.",
  },
};

function formatEuro(n: number) {
  return `${Math.round(n).toLocaleString("es-ES")}€`;
}

// Día (desde la captura del email) en el que toca cada recordatorio.
const UMBRALES_DIAS = [2, 4, 6];

function construirAsunto(nombre: string, numero: number, diasRestantes: number) {
  if (numero === 3) return `${nombre}, tu oferta termina en ${diasRestantes === 1 ? "1 día" : diasRestantes + " días"}`;
  return `${nombre}, no dejes pasar tu plan de acción`;
}

function construirHTML(nombre: string, planNombre: string, diasRestantes: number, numero: number) {
  const plan = PLANES[planNombre] || Object.values(PLANES)[0];
  const precioOferta = Math.round(plan.precioBase * (1 - DESCUENTO_OFERTA));
  const ahorro = plan.precioBase - precioOferta;
  const descuentoPct = Math.round(DESCUENTO_OFERTA * 100);
  const urgencia = numero === 3
    ? `Tu oferta de acompañamiento prioritario termina en ${diasRestantes === 1 ? "1 día" : diasRestantes + " días"}. Después de eso, el plan sigue disponible pero sin el descuento actual.`
    : `Quedan ${diasRestantes} días para aprovechar el ${descuentoPct}% de descuento.`;

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#05020a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:linear-gradient(135deg,#6d28d9 0%,#4f46e5 100%);border-radius:16px;padding:28px;text-align:center;margin-bottom:24px;">
      <h1 style="color:#ffffff;font-size:20px;font-weight:700;margin:0;">Hola ${nombre},</h1>
    </div>
    <div style="background:#0f0f1a;border:1px solid #2a2a4a;border-radius:16px;padding:24px;margin-bottom:24px;">
      <p style="color:#c0c0d0;font-size:14px;line-height:1.7;margin:0 0 16px 0;">Tu diagnóstico digital recomendó el <strong style="color:#fff;">${planNombre}</strong> para ${plan.porQue}</p>
      <div style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.2);border-radius:10px;padding:14px;margin-bottom:16px;">
        <p style="color:#fca5a5;font-size:13px;margin:0;">⏳ ${urgencia}</p>
      </div>
      <div style="text-align:center;">
        <span style="color:#a5a5bd;font-size:14px;text-decoration:line-through;margin-right:8px;">${formatEuro(plan.precioBase)}</span>
        <span style="color:#ffffff;font-size:22px;font-weight:700;">${formatEuro(precioOferta)}${plan.cuotaMensual ? ` + ${formatEuro(plan.cuotaMensual)}/mes` : ""}</span>
        <p style="color:#c4b5fd;font-size:12px;font-weight:600;margin:6px 0 14px 0;">Ahorras ${formatEuro(ahorro)} · -${descuentoPct}%</p>
        <a href="https://wa.me/34641576286?text=${encodeURIComponent(`Hola, quiero contratar el ${planNombre}`)}" style="background:#ffffff;color:#6d28d9;font-weight:700;font-size:14px;padding:12px 28px;border-radius:50px;text-decoration:none;display:inline-block;">Quiero este plan →</a>
      </div>
    </div>
    <div style="text-align:center;padding:16px 0;">
      <p style="color:#404060;font-size:12px;margin:0;">Proemote® · info@proemote.es · +34 641 576 286</p>
    </div>
  </div>
</body>
</html>`;
}

serve(async (_req) => {
  try {
    const ahora = new Date();

    const { data: leads, error } = await supabase
      .from("leads")
      .select("id, email, nombre, plan_recomendado, oferta_expira, recordatorios_enviados, created_at")
      .lt("recordatorios_enviados", UMBRALES_DIAS.length)
      .gt("oferta_expira", ahora.toISOString());

    if (error) throw error;

    let enviados = 0;

    for (const lead of leads ?? []) {
      const creado = new Date(lead.created_at);
      const diasTranscurridos = Math.floor((ahora.getTime() - creado.getTime()) / (1000 * 60 * 60 * 24));
      const umbral = UMBRALES_DIAS[lead.recordatorios_enviados];
      if (umbral === undefined || diasTranscurridos < umbral) continue;

      const expira = new Date(lead.oferta_expira);
      const diasRestantes = Math.max(1, Math.ceil((expira.getTime() - ahora.getTime()) / (1000 * 60 * 60 * 24)));
      const numero = lead.recordatorios_enviados + 1;
      const planNombre = lead.plan_recomendado || Object.keys(PLANES)[0];

      const resp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
        body: JSON.stringify({
          from: "Proemote <noreply@proemote.es>",
          to: lead.email,
          subject: construirAsunto(lead.nombre, numero, diasRestantes),
          html: construirHTML(lead.nombre, planNombre, diasRestantes, numero),
        }),
      });

      if (resp.ok) {
        await supabase.from("leads").update({ recordatorios_enviados: numero }).eq("id", lead.id);
        enviados += 1;
      }
    }

    return new Response(JSON.stringify({ success: true, enviados }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
