const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Update fade-up
html = html.replace(
    '.fade-up { opacity: 0; transform: translateY(20px); transition: opacity 0.8s ease-out, transform 0.8s ease-out; }',
    '.fade-up { opacity: 0; filter: blur(8px); transform: translateY(20px); transition: opacity 0.8s ease-out, transform 0.8s ease-out, filter 0.8s ease-out; }'
);
html = html.replace(
    '.fade-up.visible { opacity: 1; transform: translateY(0); }',
    '.fade-up.visible { opacity: 1; filter: blur(0); transform: translateY(0); }'
);

// Update reveal-up
html = html.replace(
    '.reveal-up { opacity: 0; transform: translateY(16px); transition: opacity .7s ease-out, transform .7s ease-out; }',
    '.reveal-up { opacity: 0; filter: blur(8px); transform: translateY(16px); transition: opacity .7s ease-out, transform .7s ease-out, filter .7s ease-out; }'
);
html = html.replace(
    '.reveal-up.visible { opacity: 1; transform: translateY(0); }',
    '.reveal-up.visible { opacity: 1; filter: blur(0); transform: translateY(0); }'
);

// Update staggerIn
html = html.replace(
    '@keyframes staggerIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }',
    '@keyframes staggerIn { from { opacity: 0; filter: blur(8px); transform: translateY(14px); } to { opacity: 1; filter: blur(0); transform: translateY(0); } }'
);

fs.writeFileSync('index.html', html);
console.log('CSS updated');
