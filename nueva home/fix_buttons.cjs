const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. CTA Brújula Digital - fondo morado en versión blanca
// The original: "group bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-medium px-6 md:px-8 py-4 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] w-full flex items-center justify-center gap-2 text-sm mb-4"
// Change bg-gray-900 to bg-marca and hover:bg-gray-800 to hover:bg-marcalight
html = html.replace(
    'class="group bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-medium px-6 md:px-8 py-4 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] w-full flex items-center justify-center gap-2 text-sm mb-4"',
    'class="group bg-marca hover:bg-marcalight dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-medium px-6 md:px-8 py-4 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] w-full flex items-center justify-center gap-2 text-sm mb-4"'
);

// 2. Rocket background slightly gray
// Original: "w-12 h-12 rounded-xl bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 border border-white/10 flex items-center justify-center mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.05)]"
html = html.replace(
    'class="w-12 h-12 rounded-xl bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 border border-white/10 flex items-center justify-center mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.05)]"',
    'class="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 border border-white/10 flex items-center justify-center mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.05)]"'
);

fs.writeFileSync('index.html', html);
console.log('Fixed CTA and Rocket');
