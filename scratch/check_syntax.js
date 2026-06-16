const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const rootDir = '/Users/carlosmolinamarquez/Desktop/proemote-landing';

function getHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== '.gemini' && file !== 'scratch') {
                results = results.concat(getHtmlFiles(filePath));
            }
        } else if (file.endsWith('.html')) {
            results.push(filePath);
        }
    });
    return results;
}

const htmlFiles = getHtmlFiles(rootDir);

htmlFiles.forEach(filePath => {
    const relativePath = path.relative(rootDir, filePath);
    const html = fs.readFileSync(filePath, 'utf8');
    
    // Extract scripts
    const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
    let match;
    let index = 0;
    
    while ((match = scriptRegex.exec(html)) !== null) {
        index++;
        const scriptContent = match[1];
        if (!scriptContent.trim()) continue;
        
        try {
            // Test compilation
            new Function(scriptContent);
        } catch (e) {
            console.log(`[SYNTAX ERROR] ${relativePath} | Script #${index}: ${e.message}`);
            // Let's print the script snippet to help locate it
            const lines = scriptContent.split('\n');
            console.log('Snippet around error:');
            lines.slice(0, 15).forEach((line, i) => {
                console.log(`  ${i + 1}: ${line}`);
            });
            if (lines.length > 15) {
                console.log('  ...');
                lines.slice(-5).forEach((line, i) => {
                    console.log(`  ${lines.length - 4 + i}: ${line}`);
                });
            }
            console.log('--------------------------------------------------');
        }
    }
});
