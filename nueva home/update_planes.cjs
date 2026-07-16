const fs = require('fs');

const originalHtml = fs.readFileSync('index.html', 'utf8');
const updatedPlanes = fs.readFileSync('/tmp/planes_updated.html', 'utf8');

const gridStart = originalHtml.indexOf('<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch stagger">');
if (gridStart === -1) process.exit(1);

const planesStartIndex = originalHtml.lastIndexOf('<section id="planes"', gridStart);
// Actually, I can just find the bounds of what I exported.
// I exported from lines 1096 to 1362. Let's find the exact string.

const startMarker = '<section id="planes" class="py-24 relative z-10 transition-colors duration-300">';
// we know the export was from this marker up to some point.
// Let's replace the substring exactly.
const exportStart = originalHtml.indexOf(startMarker);
const exportEnd = originalHtml.indexOf('</section>', gridStart) + '</section>'.length;

const before = originalHtml.slice(0, exportStart);
const after = originalHtml.slice(exportEnd);

// Wait, the updated_planes might not contain the trailing </section> if it wasn't exported.
// Let's check what was exported.
const exportedContent = fs.readFileSync('/tmp/planes.html', 'utf8');
const actualEnd = originalHtml.indexOf(exportedContent) + exportedContent.length;

if (originalHtml.indexOf(exportedContent) !== -1) {
    const finalHtml = originalHtml.replace(exportedContent, updatedPlanes);
    fs.writeFileSync('index.html', finalHtml);
    console.log('Replaced beautifully');
} else {
    console.log('Could not match exported content exactly');
}
