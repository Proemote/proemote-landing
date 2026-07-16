const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldGridStart = html.indexOf('<div class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-left">');
const oldGridEndStr = '            </div>\n        </div>\n    </section>';
const oldGridEnd = html.indexOf(oldGridEndStr, oldGridStart);

const newGrid = `<div class="grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-8 text-left max-w-4xl mx-auto">
                <!-- Columna Badajoz -->
                <div>
                    <h3 class="text-xs font-bold tracking-widest uppercase text-marca dark:text-marca mb-6">Badajoz (Provincia)</h3>
                    <ul class="space-y-4 flex flex-col">
                        <li><a href="/sobre-nosotros/" class="text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:underline transition-colors font-light text-[15px]">Mérida</a></li>
                        <li><span data-satellite-pending="true" class="text-gray-600 dark:text-white/70 transition-colors font-light text-[15px] cursor-default">Badajoz</span></li>
                        <li><span data-satellite-pending="true" class="text-gray-600 dark:text-white/70 transition-colors font-light text-[15px] cursor-default">Zafra</span></li>
                        <li><span data-satellite-pending="true" class="text-gray-600 dark:text-white/70 transition-colors font-light text-[15px] cursor-default">Almendralejo</span></li>
                        <li><span data-satellite-pending="true" class="text-gray-600 dark:text-white/70 transition-colors font-light text-[15px] cursor-default">Don Benito - Villanueva</span></li>
                    </ul>
                </div>

                <!-- Columna Cáceres -->
                <div>
                    <h3 class="text-xs font-bold tracking-widest uppercase text-marca dark:text-marca mb-6">Cáceres (Provincia)</h3>
                    <ul class="space-y-4 flex flex-col">
                        <li><span data-satellite-pending="true" class="text-gray-600 dark:text-white/70 transition-colors font-light text-[15px] cursor-default">Cáceres</span></li>
                        <li><span data-satellite-pending="true" class="text-gray-600 dark:text-white/70 transition-colors font-light text-[15px] cursor-default">Plasencia</span></li>
                        <li><span data-satellite-pending="true" class="text-gray-600 dark:text-white/70 transition-colors font-light text-[15px] cursor-default">Trujillo</span></li>
                        <li><span data-satellite-pending="true" class="text-gray-600 dark:text-white/70 transition-colors font-light text-[15px] cursor-default">Coria</span></li>
                    </ul>
                </div>`;

const before = html.slice(0, oldGridStart);
const after = html.slice(oldGridEnd);

fs.writeFileSync('index.html', before + newGrid + after);
console.log('Updated to 2 columns');
