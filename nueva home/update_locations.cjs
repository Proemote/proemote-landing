const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const oldSectionStart = html.indexOf('<section id="donde-trabajamos"');
const oldSectionEnd = html.indexOf('</section>', oldSectionStart) + '</section>'.length;

const newSection = `<section id="donde-trabajamos" class="py-24 bg-gray-50 dark:bg-surface/30 border-t border-gray-200 dark:border-white/5 transition-colors duration-300">
        <div class="max-w-6xl mx-auto px-6 fade-up">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-light tracking-tight text-gray-900 dark:text-white mb-4">Dónde trabajamos</h2>
                <p class="text-lg text-gray-600 dark:text-white/60 font-light">Trabajamos con pymes de Mérida y toda la comarca, así como en toda Extremadura y a nivel nacional.</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-left">
                <!-- Columna Badajoz -->
                <div>
                    <h3 class="text-xs font-bold tracking-widest uppercase text-marca dark:text-marca mb-6">Badajoz (Provincia)</h3>
                    <ul class="space-y-4 flex flex-col">
                        <li><span data-satellite-pending="true" class="text-gray-600 dark:text-white/70 hover:text-marca dark:hover:text-marca transition-colors font-light text-[15px] cursor-default">Agencia Marketing Badajoz</span></li>
                        <li><a href="/sobre-nosotros/" class="text-marca dark:text-marca hover:underline transition-colors font-medium text-[15px]">Agencia Marketing Mérida</a></li>
                        <li><span data-satellite-pending="true" class="text-gray-600 dark:text-white/70 hover:text-marca dark:hover:text-marca transition-colors font-light text-[15px] cursor-default">Agencia Marketing Zafra</span></li>
                        <li><span data-satellite-pending="true" class="text-gray-600 dark:text-white/70 hover:text-marca dark:hover:text-marca transition-colors font-light text-[15px] cursor-default">Agencia Marketing Almendralejo</span></li>
                        <li><span data-satellite-pending="true" class="text-gray-600 dark:text-white/70 hover:text-marca dark:hover:text-marca transition-colors font-light text-[15px] cursor-default">Agencia Marketing Don Benito</span></li>
                        <li><span data-satellite-pending="true" class="text-gray-600 dark:text-white/70 hover:text-marca dark:hover:text-marca transition-colors font-light text-[15px] cursor-default">Agencia Marketing Villanueva de la Serena</span></li>
                        <li><span data-satellite-pending="true" class="text-gray-600 dark:text-white/70 hover:text-marca dark:hover:text-marca transition-colors font-light text-[15px] cursor-default">Agencia Marketing Villafranca de los Barros</span></li>
                        <li><span data-satellite-pending="true" class="text-gray-600 dark:text-white/70 hover:text-marca dark:hover:text-marca transition-colors font-light text-[15px] cursor-default">Agencia Marketing Montijo</span></li>
                        <li><span data-satellite-pending="true" class="text-gray-600 dark:text-white/70 hover:text-marca dark:hover:text-marca transition-colors font-light text-[15px] cursor-default">Agencia Marketing Olivenza</span></li>
                        <li><span data-satellite-pending="true" class="text-gray-600 dark:text-white/70 hover:text-marca dark:hover:text-marca transition-colors font-light text-[15px] cursor-default">Agencia Marketing Jerez de los Caballeros</span></li>
                        <li><span data-satellite-pending="true" class="text-gray-600 dark:text-white/70 hover:text-marca dark:hover:text-marca transition-colors font-light text-[15px] cursor-default">Agencia Marketing Los Santos de Maimona</span></li>
                    </ul>
                </div>

                <!-- Columna Cáceres -->
                <div>
                    <h3 class="text-xs font-bold tracking-widest uppercase text-marca dark:text-marca mb-6">Cáceres (Provincia)</h3>
                    <ul class="space-y-4 flex flex-col">
                        <li><span data-satellite-pending="true" class="text-gray-600 dark:text-white/70 hover:text-marca dark:hover:text-marca transition-colors font-light text-[15px] cursor-default">Agencia Marketing Cáceres</span></li>
                        <li><span data-satellite-pending="true" class="text-gray-600 dark:text-white/70 hover:text-marca dark:hover:text-marca transition-colors font-light text-[15px] cursor-default">Agencia Marketing Plasencia</span></li>
                        <li><span data-satellite-pending="true" class="text-gray-600 dark:text-white/70 hover:text-marca dark:hover:text-marca transition-colors font-light text-[15px] cursor-default">Agencia Marketing Trujillo</span></li>
                        <li><span data-satellite-pending="true" class="text-gray-600 dark:text-white/70 hover:text-marca dark:hover:text-marca transition-colors font-light text-[15px] cursor-default">Agencia Marketing Coria</span></li>
                    </ul>
                </div>

                <!-- Columna Nacional -->
                <div>
                    <h3 class="text-xs font-bold tracking-widest uppercase text-marca dark:text-marca mb-6">Nacional y Regional</h3>
                    <ul class="space-y-4 flex flex-col">
                        <li><span data-satellite-pending="true" class="text-gray-600 dark:text-white/70 hover:text-marca dark:hover:text-marca transition-colors font-light text-[15px] cursor-default">Agencia Marketing Extremadura</span></li>
                        <li><span data-satellite-pending="true" class="text-gray-600 dark:text-white/70 hover:text-marca dark:hover:text-marca transition-colors font-light text-[15px] cursor-default">Agencia Marketing Madrid</span></li>
                        <li><span data-satellite-pending="true" class="text-gray-600 dark:text-white/70 hover:text-marca dark:hover:text-marca transition-colors font-light text-[15px] cursor-default">Agencia Marketing Sevilla</span></li>
                        <li><span data-satellite-pending="true" class="text-gray-600 dark:text-white/70 hover:text-marca dark:hover:text-marca transition-colors font-light text-[15px] cursor-default">Agencia Marketing Salamanca</span></li>
                    </ul>
                </div>
            </div>
        </div>
    </section>`;

const before = html.slice(0, oldSectionStart);
const after = html.slice(oldSectionEnd);

fs.writeFileSync('index.html', before + newSection + after);
console.log('Updated Donde Trabajamos section.');
