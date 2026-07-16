const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldSvg = `<svg class="w-12 h-12 text-marca mb-6 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 8H10a4 4 0 000 8h5M9 10h5M9 14h5" />
                    </svg>`;
const newSvg = `<svg class="w-12 h-12 text-marca mb-6 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>`;

html = html.replace(oldSvg, newSvg);

fs.writeFileSync('index.html', html);
console.log('Fixed Euro Icon');
