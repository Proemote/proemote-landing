const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace('">Mérida</a></li>', '">Agencia de Marketing Mérida</a></li>');
html = html.replace('">Badajoz</span></li>', '">Agencia de Marketing Badajoz</span></li>');
html = html.replace('">Zafra</span></li>', '">Agencia de Marketing Zafra</span></li>');
html = html.replace('">Almendralejo</span></li>', '">Agencia de Marketing Almendralejo</span></li>');
html = html.replace('">Don Benito - Villanueva</span></li>', '">Agencia de Marketing Don Benito - Villanueva</span></li>');
html = html.replace('">Cáceres</span></li>', '">Agencia de Marketing Cáceres</span></li>');
html = html.replace('">Plasencia</span></li>', '">Agencia de Marketing Plasencia</span></li>');
html = html.replace('">Trujillo</span></li>', '">Agencia de Marketing Trujillo</span></li>');
html = html.replace('">Coria</span></li>', '">Agencia de Marketing Coria</span></li>');

fs.writeFileSync('index.html', html);
console.log('Fixed cities');
