const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
    '<div class="grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-8 text-left max-w-2xl mx-auto">',
    '<div class="grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-8 text-center max-w-2xl mx-auto">'
);

html = html.replace(
    /<ul class="space-y-4 flex flex-col">/g,
    '<ul class="space-y-4 flex flex-col items-center">'
);

fs.writeFileSync('index.html', html);
console.log('Centered lists');
