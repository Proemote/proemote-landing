const fs = require('fs');
let html = fs.readFileSync('downloaded2.html', 'utf8');

let p4 = html.indexOf('<!-- PACK 4: SISTEMA ESCALA -->');
console.log("Before:", p4);

html = html.replace(/<div class="space-y-2">[\s\S]*?BONUS: 1er mes gestión[\s\S]*?<\/div>/, 'REPLACED');

p4 = html.indexOf('<!-- PACK 4: SISTEMA ESCALA -->');
console.log("After first replace:", p4);
