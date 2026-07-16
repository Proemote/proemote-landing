const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Change the badge to h1 and update text
html = html.replace(
    '<div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none text-[12px] font-medium text-gray-600 dark:text-white/70 mb-6 transition-colors duration-300">\n                Estrategia digital y crecimiento para negocios\n            </div>',
    '<h1 class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none text-[12px] font-medium text-gray-600 dark:text-white/70 mb-6 transition-colors duration-300">\n                Agencia de marketing digital en Mérida, Extremadura\n            </h1>'
);

// 2. Change old h1 to h2 and update text
html = html.replace(
    '<h1 class="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-5">\n                Agencia de marketing digital en Mérida: <span class="text-marca font-medium">consigue clientes cada semana sin depender del boca a boca</span>\n            </h1>',
    '<h2 class="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-5">\n                Consigue clientes cada semana <span class="text-marca font-medium">sin depender solo del boca a boca.</span>\n            </h2>'
);

fs.writeFileSync('index.html', html);
console.log('Hero fixed');
