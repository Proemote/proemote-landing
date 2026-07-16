const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const insertPoint = '    <!-- FOOTER -->';

const newSection = `
    <section id="donde-trabajamos" class="py-24 bg-gray-50 dark:bg-surface/30 border-t border-gray-200 dark:border-white/5 transition-colors duration-300">
        <div class="max-w-5xl mx-auto px-6 fade-up">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-light tracking-tight text-gray-900 dark:text-white mb-4">Dónde trabajamos</h2>
                <p class="text-lg text-gray-600 dark:text-white/60 font-light">Trabajamos con pymes de Mérida y toda la comarca, así como en toda Extremadura y a nivel nacional.</p>
            </div>
            
            <div class="max-w-3xl mx-auto">
                <div class="flex flex-wrap justify-center gap-3">
                    <a href="/sobre-nosotros/" class="px-5 py-2.5 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white text-sm font-medium hover:border-violet-300 dark:hover:border-violet-500/50 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-all shadow-sm dark:shadow-none">Mérida</a>
                    <span data-satellite-pending="true" class="px-5 py-2.5 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-500 dark:text-white/50 text-sm font-medium shadow-sm dark:shadow-none">Badajoz</span>
                    <span data-satellite-pending="true" class="px-5 py-2.5 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-500 dark:text-white/50 text-sm font-medium shadow-sm dark:shadow-none">Cáceres</span>
                    <span data-satellite-pending="true" class="px-5 py-2.5 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-500 dark:text-white/50 text-sm font-medium shadow-sm dark:shadow-none">Almendralejo</span>
                    <span data-satellite-pending="true" class="px-5 py-2.5 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-500 dark:text-white/50 text-sm font-medium shadow-sm dark:shadow-none">Don Benito - Villanueva</span>
                    <span data-satellite-pending="true" class="px-5 py-2.5 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-500 dark:text-white/50 text-sm font-medium shadow-sm dark:shadow-none">Plasencia</span>
                    <span data-satellite-pending="true" class="px-5 py-2.5 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-500 dark:text-white/50 text-sm font-medium shadow-sm dark:shadow-none">Zafra</span>
                </div>
            </div>
        </div>
    </section>

`;

if (html.includes(insertPoint)) {
    const updatedHtml = html.replace(insertPoint, newSection + insertPoint);
    fs.writeFileSync('index.html', updatedHtml);
    console.log('Successfully added Dónde trabajamos section');
} else {
    console.log('Could not find insert point');
}
