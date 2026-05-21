const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== '.git') processDir(fullPath);
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Desktop Nav
            const desktopRegex = /(<a href="[^"]*\/portfolio" class="(?:hidden md:inline-flex [^"]+|hover:text-textMain transition-colors)">Portfolio<\/a>)/g;
            if (desktopRegex.test(content) && !content.includes('>Sobre Nosotros</a>')) {
                content = content.replace(desktopRegex, '<a href="/sobre-nosotros" class="hover:text-textMain transition-colors">Sobre Nosotros</a>\n                $1');
                modified = true;
            }

            // Mobile Nav
            const mobileRegex = /(<a href="[^"]*\/portfolio" class="text-base font-medium text-textSecondary hover:text-white transition-colors">Portfolio<\/a>)/g;
            if (mobileRegex.test(content)) {
                content = content.replace(mobileRegex, '<a href="/sobre-nosotros" class="text-base font-medium text-textSecondary hover:text-white transition-colors">Sobre Nosotros</a>\n                $1');
                modified = true;
            }

            // Footer Empresa & Legal
            const footerRegex = /(<li><a href="[^"]*\/contacto" class="hover:text-white transition-colors">Contacto<\/a><\/li>)/g;
            if (footerRegex.test(content)) {
                content = content.replace(footerRegex, '<li><a href="/sobre-nosotros" class="hover:text-white transition-colors">Sobre Nosotros</a></li>\n                    $1');
                modified = true;
            }

            // Footer Mini Links
            const miniFooterRegex = /(<a href="[^"]*\/contacto" class="px-5 py-2 rounded-full border border-white\/10 bg-white\/5 hover:bg-primary\/20 text-white text-xs transition-all">Contacto<\/a>)/g;
            if (miniFooterRegex.test(content)) {
                content = content.replace(miniFooterRegex, '<a href="/sobre-nosotros" class="px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-primary/20 text-white text-xs transition-all">Sobre Nosotros</a>\n                    $1');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Updated:', fullPath);
            }
        }
    }
}

processDir('/Users/carlosmolinamarquez/Desktop/proemote-landing');
