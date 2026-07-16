const fs = require('fs');
let html = fs.readFileSync('downloaded.html', 'utf8');

const checks = [
  "Realizar análisis gratuito",
  "Obtén tu Radiografía Digital gratis",
  "Descubre cuántos clientes estás perdiendo — Radiografía Digital™ gratis",
  "Quiero mi Radiografía Digital gratis",
  "Sabrás exactamente qué frena la captación digital de tu negocio y qué hacer para mejorarla. En 72 horas.",
  "Google Business optimizado, datos del negocio correctos, SEO local básico y texto profesional. En 1 semana eres visible en mapas locales.",
  "Trabajo personalmente cada proyecto, por lo que acepto un número limitado de clientes simultáneos.",
  "Lo recomendiendo 100%, he tenido muy buena experiencia con la sesion de couselling",
  "Muy profesional. ¡Lo recomiendo! :)",
  "Analizamos tu marca, comienza ahora",
  "Empieza a crecer con Proemote",
  "Shaping what matters Think first.",
  "Sin permanencia · Garantía de implementación en 30 días"
];

for (const check of checks) {
  if (html.includes(check)) {
    console.log(`FOUND: ${check.substring(0, 30)}`);
  } else {
    console.log(`NOT FOUND: ${check.substring(0, 30)}`);
  }
}
