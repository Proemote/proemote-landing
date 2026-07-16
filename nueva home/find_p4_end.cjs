const fs = require('fs');
let html = fs.readFileSync('downloaded2.html', 'utf8');

let p4Start = html.indexOf('<!-- PACK 4: SISTEMA ESCALA -->');
console.log(html.substring(p4Start, p4Start + 6000));
