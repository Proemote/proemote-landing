const fs = require('fs');

const originalHtml = fs.readFileSync('index.html', 'utf8');
const newFaqsHtml = fs.readFileSync('/tmp/new_faqs.html', 'utf8');

const startMarker = '            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-start stagger">';
// We need to replace from startMarker to the end of the faqs grid.
const replaceStart = originalHtml.indexOf(startMarker);
if (replaceStart === -1) {
    console.error("Could not find startMarker");
    process.exit(1);
}

// In the original, the grid closes, then there's a few closing tags:
//             </div>
//         </div>
//     </section>
const gridEndMarker = '            </div>\n        </div>\n    </section>';
const replaceEnd = originalHtml.indexOf(gridEndMarker, replaceStart);

if (replaceEnd === -1) {
    console.error("Could not find gridEndMarker");
    process.exit(1);
}

const before = originalHtml.slice(0, replaceStart);
const after = originalHtml.slice(replaceEnd);

const finalHtml = before + newFaqsHtml + after;
fs.writeFileSync('/tmp/index_updated.html', finalHtml);
console.log('Successfully created updated HTML');
