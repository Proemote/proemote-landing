const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The goal is to update the styling of the 4 cards.
// Since we have 4 cards, we'll do this carefully.

// Let's first extract the pricing section
const sectionStart = html.indexOf('<section id="planes"');
const sectionEnd = html.indexOf('</section>', sectionStart);
let section = html.substring(sectionStart, sectionEnd);

// 1. Update the outer card classes
// Old normal: class="pricing-card flex flex-col bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-2xl p-8 relative h-full shadow-sm dark:shadow-none transition-colors duration-300 backdrop-blur-xl"
// New normal: class="pricing-card flex flex-col bg-white dark:bg-[#110e1b] border border-gray-200 dark:border-white/5 rounded-3xl p-8 relative h-full shadow-sm dark:shadow-none transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:hover:border-white/20"
section = section.replaceAll(
    'class="pricing-card flex flex-col bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-2xl p-8 relative h-full shadow-sm dark:shadow-none transition-colors duration-300 backdrop-blur-xl"',
    'class="pricing-card flex flex-col bg-white dark:bg-[#110e1b] border border-gray-200 dark:border-white/5 rounded-3xl p-8 relative h-full shadow-sm dark:shadow-none transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] dark:hover:border-white/10"'
);

// 2. Update the highlighted card (Pack 3)
// Old highlighted: class="pricing-card flex flex-col bg-white dark:bg-white/[0.02] border-2 border-marca/30 dark:border-marca/50 rounded-2xl p-8 relative h-full shadow-xl dark:shadow-[0_0_30px_rgba(123,97,255,0.1)] transition-colors duration-300 transform md:-translate-y-4 backdrop-blur-xl overflow-hidden"
// New highlighted: class="pricing-card flex flex-col bg-white dark:bg-[#161224] border border-marca/30 dark:border-violet-500/30 rounded-3xl p-8 relative h-full shadow-xl dark:shadow-[0_0_30px_rgba(123,97,255,0.15)] transition-all duration-500 transform md:-translate-y-4 hover:-translate-y-6 hover:shadow-2xl hover:shadow-marca/20 overflow-hidden"
section = section.replaceAll(
    'class="pricing-card flex flex-col bg-white dark:bg-white/[0.02] border-2 border-marca/30 dark:border-marca/50 rounded-2xl p-8 relative h-full shadow-xl dark:shadow-[0_0_30px_rgba(123,97,255,0.1)] transition-colors duration-300 transform lg:-translate-y-4 backdrop-blur-xl overflow-hidden"',
    'class="pricing-card flex flex-col bg-white dark:bg-[#161224] border border-marca/30 dark:border-violet-500/30 rounded-3xl p-8 relative h-full shadow-xl dark:shadow-[0_0_30px_rgba(123,97,255,0.15)] transition-all duration-500 transform lg:-translate-y-4 hover:lg:-translate-y-6 hover:-translate-y-2 hover:shadow-2xl dark:hover:shadow-[0_10px_40px_rgba(139,92,246,0.2)] overflow-hidden"'
);
section = section.replaceAll(
    'class="pricing-card flex flex-col bg-white dark:bg-white/[0.02] border-2 border-marca/30 dark:border-marca/50 rounded-2xl p-8 relative h-full shadow-xl dark:shadow-[0_0_30px_rgba(123,97,255,0.1)] transition-colors duration-300 transform md:-translate-y-4 backdrop-blur-xl overflow-hidden"',
    'class="pricing-card flex flex-col bg-white dark:bg-[#161224] border border-marca/30 dark:border-violet-500/30 rounded-3xl p-8 relative h-full shadow-xl dark:shadow-[0_0_30px_rgba(123,97,255,0.15)] transition-all duration-500 transform md:-translate-y-4 hover:md:-translate-y-6 hover:-translate-y-2 hover:shadow-2xl dark:hover:shadow-[0_10px_40px_rgba(139,92,246,0.2)] overflow-hidden"'
);

// 3. Add the icons to the top of each card and update typography
// Let's add them before the uppercase title.
// Pack 1: FOCO
section = section.replace(
    '<span class="text-[11px] font-bold tracking-widest text-gray-400 dark:text-white/40 uppercase">PUESTA A PUNTO</span>',
    `<div class="w-10 h-6 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center mb-4 text-gray-600 dark:text-white/60">
                            <i class="ph ph-check text-sm"></i>
                        </div>
                        <span class="text-[11px] font-bold tracking-widest text-gray-400 dark:text-white/40 uppercase">PUESTA A PUNTO</span>`
);

// Pack 2: PRESENCIA
section = section.replace(
    '<span class="text-[11px] font-bold tracking-widest text-gray-400 dark:text-white/40 uppercase">PRESENCIA PROFESIONAL</span>',
    `<div class="w-10 h-6 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center mb-4 text-gray-600 dark:text-white/60">
                            <i class="ph ph-buildings text-sm"></i>
                        </div>
                        <span class="text-[11px] font-bold tracking-widest text-gray-400 dark:text-white/40 uppercase">PRESENCIA PROFESIONAL</span>`
);

// Pack 3: CAPTACION
section = section.replace(
    '<span class="text-[11px] font-bold tracking-widest text-marca dark:text-marca uppercase">ACELERADOR DE VENTAS</span>',
    `<div class="w-10 h-6 rounded-full bg-violet-500/10 dark:bg-violet-500/20 border border-violet-500/20 dark:border-violet-500/30 flex items-center justify-center mb-4 text-violet-600 dark:text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                            <i class="ph ph-lightning text-sm"></i>
                        </div>
                        <span class="text-[11px] font-bold tracking-widest text-marca dark:text-marca uppercase">ACELERADOR DE VENTAS</span>`
);

// Pack 4: ESCALA
section = section.replace(
    '<span class="text-[11px] font-bold tracking-widest text-gray-400 dark:text-white/40 uppercase">SISTEMA COMPLETO</span>',
    `<div class="w-10 h-6 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center mb-4 text-gray-600 dark:text-white/60">
                            <i class="ph ph-rocket text-sm"></i>
                        </div>
                        <span class="text-[11px] font-bold tracking-widest text-gray-400 dark:text-white/40 uppercase">SISTEMA COMPLETO</span>`
);

// 4. Update the "INCLUYE" section for all cards
// Currently they have: <!-- Static Features -->
const incluyeDivider = `
                    <div class="flex items-center justify-center my-6">
                        <div class="h-px bg-gray-200 dark:bg-white/5 flex-grow"></div>
                        <span class="px-3 text-[10px] uppercase tracking-widest text-gray-400 dark:text-white/30 font-semibold">INCLUYE +</span>
                        <div class="h-px bg-gray-200 dark:bg-white/5 flex-grow"></div>
                    </div>
`;
section = section.replaceAll('<!-- Static Features -->', incluyeDivider);

// 5. Update CTA buttons
// Normal CTAs
section = section.replaceAll(
    'class="group block w-full py-3.5 px-4 bg-gray-100 dark:bg-white/5 hover:bg-marca hover:text-white dark:hover:bg-marca dark:hover:text-white border border-transparent dark:border-white/10 rounded-full text-center text-[14px] font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm text-gray-900 dark:text-white"',
    'class="group block w-full py-3 px-4 bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 border border-gray-300 dark:border-white/10 rounded-3xl text-center text-[14px] font-semibold transition-all duration-300 text-gray-900 dark:text-white"'
);
// Fix the second one in Pack 4 if it's there
section = section.replaceAll(
    'class="group block w-full py-3.5 px-4 bg-gray-100 dark:bg-white/5 hover:bg-marca hover:text-white dark:hover:bg-marca dark:hover:text-white border border-transparent dark:border-white/10 rounded-full text-center text-[14px] font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm text-gray-900 dark:text-white">Solicitar entrevista',
    'class="group block w-full py-3 px-4 bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 border border-gray-300 dark:border-white/10 rounded-3xl text-center text-[14px] font-semibold transition-all duration-300 text-gray-900 dark:text-white">Solicitar entrevista'
);


// Highlighted CTA
section = section.replaceAll(
    'class="group block w-full py-3.5 px-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white border border-transparent rounded-full text-center text-[14px] font-semibold transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_0_25px_rgba(123,97,255,0.4)]"',
    'class="group block w-full py-3 px-4 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-3xl text-center text-[14px] font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.4)]"'
);

// Adjust checklist item colors in normal cards to look a bit softer
section = section.replaceAll(
    '<ul class="space-y-3 mb-6 text-xs text-gray-600 dark:text-white/70 font-light">',
    '<ul class="space-y-4 mb-6 text-[13px] text-gray-600 dark:text-white/60 font-light">'
);
section = section.replaceAll(
    '<ul class="space-y-3 mb-6 text-xs text-gray-900 dark:text-white/90 font-medium">',
    '<ul class="space-y-4 mb-6 text-[13px] text-gray-900 dark:text-white/80 font-medium">'
);

// We need to change the checkmarks from text-marca (purple) to soft white/gray in normal cards?
// The image shows very minimal thin checkmarks. We can keep them as is.

// Let's also adjust the "Más popular" tag on Pack 3 to match the image's pill shape
section = section.replace(
    '<div class="absolute top-0 right-6 transform -translate-y-1/2">',
    '<div class="absolute top-6 right-6">' // Moved inside
);
section = section.replace(
    '<span class="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-full shadow-lg">Más popular</span>',
    '<span class="bg-transparent border border-white/20 text-gray-400 dark:text-white/60 text-[10px] font-medium py-1 px-3 rounded-full">Más popular</span>'
);

html = html.substring(0, sectionStart) + section + html.substring(sectionEnd);

fs.writeFileSync('index.html', html);
console.log("Updated pricing cards successfully.");
