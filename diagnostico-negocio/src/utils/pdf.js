import { jsPDF } from 'jspdf';
import { getEstado, getDimension } from './scoring.js';

const MARCA = '#7c3aed';
const TEXTO = '#111827';
const TEXTO_SUAVE = '#6b7280';
const LOGO_URL = 'https://proemote.es/logo-header.png';

const dimensiones = [
  'presencia_digital',
  'redes_sociales',
  'generacion_leads',
  'inversion_marketing',
  'madurez_estrategia',
];

function hexToRgb(hex) {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

async function cargarLogoBase64() {
  try {
    const res = await fetch(LOGO_URL);
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

const MARGEN = 18;
const ANCHO_PAGINA = 210;
const ALTO_PAGINA = 297;
const ANCHO_UTIL = ANCHO_PAGINA - MARGEN * 2;
const PIE_ALTURA = 18;

function dibujarPie(doc, pagina) {
  const y = ALTO_PAGINA - PIE_ALTURA;
  doc.setDrawColor(230, 230, 230);
  doc.line(MARGEN, y, ANCHO_PAGINA - MARGEN, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...hexToRgb(TEXTO_SUAVE));
  doc.text('Proemote · info@proemote.es · +34 641 576 286', MARGEN, y + 8);
  doc.text(`Página ${pagina}`, ANCHO_PAGINA - MARGEN, y + 8, { align: 'right' });
}

function nuevaPagina(doc, estado) {
  doc.addPage();
  estado.pagina += 1;
  dibujarPie(doc, estado.pagina);
  estado.y = MARGEN;
}

function asegurarEspacio(doc, estado, alturaNecesaria) {
  if (estado.y + alturaNecesaria > ALTO_PAGINA - PIE_ALTURA - 4) {
    nuevaPagina(doc, estado);
  }
}

function textoConSalto(doc, texto, x, anchoMax, tamano, color, interlineado = 5.6) {
  doc.setFontSize(tamano);
  doc.setTextColor(...hexToRgb(color));
  return doc.splitTextToSize(texto, anchoMax);
}

export async function generarInformePDF({ puntuaciones, analisis, respuestas, nombre }) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const estado = { y: MARGEN, pagina: 1 };
  const logo = await cargarLogoBase64();

  // Header
  if (logo) {
    try {
      doc.addImage(logo, 'PNG', MARGEN, estado.y, 32, 10);
    } catch {
      // si el logo no carga, seguimos sin él
    }
  }
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...hexToRgb(MARCA));
  doc.text('DIAGNÓSTICO DIGITAL', ANCHO_PAGINA - MARGEN, estado.y + 6, { align: 'right' });
  estado.y += 20;

  doc.setDrawColor(...hexToRgb(MARCA));
  doc.setLineWidth(0.8);
  doc.line(MARGEN, estado.y, ANCHO_PAGINA - MARGEN, estado.y);
  estado.y += 10;

  // Título + puntuación global
  const estadoGlobal = getEstado(puntuaciones.global);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...hexToRgb(TEXTO));
  doc.text(`Hola${nombre ? ' ' + nombre : ''}, aquí tienes tu diagnóstico`, MARGEN, estado.y);
  estado.y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(...hexToRgb(TEXTO_SUAVE));
  doc.text(`${respuestas?.p1 || ''} · ${respuestas?.p2 || ''}`, MARGEN, estado.y);
  estado.y += 12;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(36);
  doc.setTextColor(...hexToRgb(estadoGlobal.color));
  doc.text(`${puntuaciones.global}/100`, MARGEN, estado.y + 10);
  doc.setFontSize(12);
  doc.text(estadoGlobal.label, MARGEN + 55, estado.y + 10);
  estado.y += 22;

  // Dimensiones
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...hexToRgb(TEXTO));
  doc.text('Puntuación por dimensión', MARGEN, estado.y);
  estado.y += 8;

  for (const key of dimensiones) {
    asegurarEspacio(doc, estado, 12);
    const dim = getDimension(key);
    const val = puntuaciones[key];
    const est = getEstado(val);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(...hexToRgb(TEXTO));
    doc.text(dim.label, MARGEN, estado.y + 4);

    doc.setTextColor(...hexToRgb(est.color));
    doc.setFont('helvetica', 'bold');
    doc.text(`${val}/100`, ANCHO_PAGINA - MARGEN, estado.y + 4, { align: 'right' });

    const barraX = MARGEN;
    const barraAncho = ANCHO_UTIL;
    doc.setFillColor(235, 235, 235);
    doc.roundedRect(barraX, estado.y + 6, barraAncho, 2.4, 1, 1, 'F');
    doc.setFillColor(...hexToRgb(est.color));
    doc.roundedRect(barraX, estado.y + 6, (barraAncho * val) / 100, 2.4, 1, 1, 'F');

    estado.y += 12;
  }

  estado.y += 4;

  // Análisis general
  if (analisis?.resumen || analisis?.fortaleza || analisis?.urgencia) {
    asegurarEspacio(doc, estado, 20);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...hexToRgb(MARCA));
    doc.text('Análisis General', MARGEN, estado.y);
    estado.y += 7;

    if (analisis.resumen) {
      const lineas = textoConSalto(doc, analisis.resumen, MARGEN, ANCHO_UTIL, 10.5, TEXTO);
      asegurarEspacio(doc, estado, lineas.length * 5.2 + 4);
      doc.setFont('helvetica', 'normal');
      doc.text(lineas, MARGEN, estado.y);
      estado.y += lineas.length * 5.2 + 6;
    }

    if (analisis.fortaleza) {
      const lineas = textoConSalto(doc, analisis.fortaleza, MARGEN + 4, ANCHO_UTIL - 8, 10, '#059669');
      asegurarEspacio(doc, estado, lineas.length * 5 + 10);
      doc.setFillColor(236, 253, 245);
      doc.roundedRect(MARGEN, estado.y - 4, ANCHO_UTIL, lineas.length * 5 + 8, 2, 2, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(...hexToRgb('#059669'));
      doc.text('TU PUNTO FUERTE', MARGEN + 4, estado.y + 1);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(lineas, MARGEN + 4, estado.y + 6);
      estado.y += lineas.length * 5 + 12;
    }

    if (analisis.urgencia) {
      const lineas = textoConSalto(doc, analisis.urgencia, MARGEN + 4, ANCHO_UTIL - 8, 10, '#dc2626');
      asegurarEspacio(doc, estado, lineas.length * 5 + 10);
      doc.setFillColor(254, 242, 242);
      doc.roundedRect(MARGEN, estado.y - 4, ANCHO_UTIL, lineas.length * 5 + 8, 2, 2, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(...hexToRgb('#dc2626'));
      doc.text('URGENTE', MARGEN + 4, estado.y + 1);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(lineas, MARGEN + 4, estado.y + 6);
      estado.y += lineas.length * 5 + 12;
    }
  }

  // Recomendaciones
  const recomendaciones = analisis?.recomendaciones || [];
  if (recomendaciones.length > 0) {
    asegurarEspacio(doc, estado, 14);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...hexToRgb(MARCA));
    doc.text('Tus Acciones Prioritarias', MARGEN, estado.y);
    estado.y += 8;

    recomendaciones.forEach((rec, i) => {
      const lineasDesc = textoConSalto(doc, rec.descripcion || '', MARGEN + 6, ANCHO_UTIL - 6, 9.5, TEXTO_SUAVE);
      const altoCard = 12 + lineasDesc.length * 4.6;
      asegurarEspacio(doc, estado, altoCard + 6);

      doc.setFillColor(250, 250, 251);
      doc.setDrawColor(...hexToRgb(MARCA));
      doc.setLineWidth(0.3);
      doc.roundedRect(MARGEN, estado.y - 4, ANCHO_UTIL, altoCard, 2, 2, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(...hexToRgb(TEXTO));
      doc.text(`${i + 1}. ${rec.titulo || ''}`, MARGEN + 4, estado.y + 2);

      if (rec.impacto === 'alto') {
        doc.setFontSize(8);
        doc.setTextColor(...hexToRgb(MARCA));
        doc.text('IMPACTO ALTO', ANCHO_PAGINA - MARGEN - 4, estado.y + 2, { align: 'right' });
      }

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(...hexToRgb(TEXTO_SUAVE));
      doc.text(lineasDesc, MARGEN + 4, estado.y + 7);

      estado.y += altoCard + 6;
    });
  }

  dibujarPie(doc, estado.pagina);

  const nombreArchivo = `diagnostico-digital-proemote${nombre ? '-' + nombre.toLowerCase().replace(/\s+/g, '-') : ''}.pdf`;
  doc.save(nombreArchivo);
}
