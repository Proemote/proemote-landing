const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix AffinIA Label
html = html.replace(
    '<span class="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[10px] font-bold tracking-widest uppercase rounded-full mb-6">Acceso anticipado</span>',
    '<span class="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[10px] font-bold tracking-widest uppercase rounded-full mb-6">Programa piloto</span>'
);

// 2. Fix AffinIA Subtitle
html = html.replace(
    '<p class="text-violet-600 dark:text-marca font-medium mb-6">Que tus clientes vuelvan, sin perseguirlos</p>',
    '<p class="text-violet-600 dark:text-marca font-medium mb-6">Que tus clientes vuelvan, sin tener que perseguirlos</p>'
);

// 3. Fix AffinIA Description
html = html.replace(
    '<p class="text-gray-600 dark:text-white/60 font-light leading-relaxed mb-8">\n                        Detecta qué cliente está a punto de no volver y lo recupera antes de perderlo. Es la pieza de Optimización del Método FOCO™. Lo estamos construyendo con negocios locales reales — y quedan plazas.\n                    </p>',
    '<p class="text-gray-600 dark:text-white/60 font-light leading-relaxed mb-8">\n                        Fidelización inteligente para negocios locales: puntos, recompensas y datos claros sobre quién compra, quién se aleja y qué hacer al respecto. Estamos construyendo AffinIA junto a negocios reales de Extremadura, solicita tu plaza para el piloto con acceso 100% gratuito.\n                    </p>'
);

// 4. Center 'Dónde trabajamos' better
html = html.replace(
    '<div class="grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-8 text-left max-w-4xl mx-auto">',
    '<div class="grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-8 text-left max-w-2xl mx-auto">'
);

fs.writeFileSync('index.html', html);
console.log('Fixed AffinIA and Grid width');
