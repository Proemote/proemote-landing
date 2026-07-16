const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace "agencia de marketing digital en Mérida" with "una agencia" in the paragraph
html = html.replace(
    'Como <span class="font-medium text-gray-900 dark:text-white/80">agencia de marketing digital en Mérida</span>, vemos',
    'Como <span class="font-medium text-gray-900 dark:text-white/80">una agencia</span>, vemos'
);

// 2. Replace the sentence with "posicionamiento SEO en Extremadura"
html = html.replace(
    'Tu web aparece en Google con posicionamiento SEO en Extremadura y trabaja para ti 24/7, trayéndote clientes sin pagar por cada clic.',
    'Tu web está optimizada para aparecer en Google y trabaja para ti 24/7, trayéndote clientes sin pagar por cada clic.'
);

fs.writeFileSync('index.html', html);
console.log('Texts fixed');
