const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const headerIdx = html.indexOf('<header');
const endHeaderIdx = html.indexOf('</header>', headerIdx);
console.log(html.substring(headerIdx, headerIdx + 1500));
