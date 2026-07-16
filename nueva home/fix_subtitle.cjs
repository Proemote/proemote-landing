const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
    '<p class="text-[11px] text-white/50 leading-relaxed min-h-[34px]">De no existir en internet a una presencia profesional que genera confianza. En 7 días o no lo pagas.</p>',
    '<p class="text-[11px] text-white/50 leading-relaxed min-h-[34px] pr-8">De no existir en internet a una presencia profesional que genera confianza. Lista en 7 días — garantizado.</p>'
);
fs.writeFileSync('index.html', html);
