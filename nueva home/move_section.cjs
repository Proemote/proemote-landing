const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The exact string to find for the Results block
const blockStartStr = '    <!-- BLOQUE 5: PRUEBA SOCIAL Y CREDIBILIDAD -->\n    <section class="py-24 border-t border-gray-200 dark:border-white/5 bg-white dark:bg-[#05020a] transition-colors duration-300">';
const blockEndStr = '    <!-- FIN BLOQUE 5 -->';

const startIndex = html.indexOf(blockStartStr);
const endIndex = html.indexOf(blockEndStr) + blockEndStr.length;

if (startIndex === -1 || endIndex < startIndex) {
    console.error('Could not find the Results block');
    process.exit(1);
}

const resultsBlock = html.slice(startIndex, endIndex);

// Remove the block from its original position
// Also remove the preceding newline to keep it clean if possible
const beforeBlock = html.slice(0, startIndex);
const afterBlock = html.slice(endIndex);
html = beforeBlock.trimEnd() + '\n\n' + afterBlock.trimStart();

// Now insert it between Matemáticas and Calculador
const calcStartStr = '        <!-- Bloque Calculador Interactivo -->';
const insertIndex = html.indexOf(calcStartStr);

if (insertIndex === -1) {
    console.error('Could not find Calculador block');
    process.exit(1);
}

const beforeInsert = html.slice(0, insertIndex);
const afterInsert = html.slice(insertIndex);

// We need to close the previous section, insert the block, and open a new section for the calculator
const newSectionStr = `    </section>\n\n${resultsBlock}\n\n    <section class="py-12 px-6 relative flex flex-col justify-center bg-gray-50 dark:bg-[#05020a] transition-colors duration-300 fade-up items-center border-t border-gray-200 dark:border-white/5">\n`;

html = beforeInsert.trimEnd() + '\n' + newSectionStr + afterInsert;

fs.writeFileSync('index.html', html);
console.log('Section moved successfully');
