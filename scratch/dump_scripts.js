const fs = require('fs');
const html = fs.readFileSync('/Users/carlosmolinamarquez/Desktop/proemote-landing/web-seo/index.html', 'utf8');

const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let index = 0;

while ((match = scriptRegex.exec(html)) !== null) {
    index++;
    const scriptContent = match[1];
    const scriptTag = match[0];
    
    // Find approximate line number
    const offset = match.index;
    const linesBefore = html.substring(0, offset).split('\n').length;
    
    console.log(`=== Script #${index} (Start line: ${linesBefore}) ===`);
    console.log(scriptContent.trim().substring(0, 300));
    if (scriptContent.trim().length > 300) {
        console.log('...');
    }
    console.log('====================================\n');
}
