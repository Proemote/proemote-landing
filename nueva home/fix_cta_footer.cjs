const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(
    'class="group bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium px-8 py-3.5 rounded-full transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm"',
    'class="group bg-marca hover:bg-marcalight dark:bg-white text-white dark:text-gray-900 font-medium px-8 py-3.5 rounded-full transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm"'
);

fs.writeFileSync('index.html', html);
console.log('Fixed CTA button in footer');
