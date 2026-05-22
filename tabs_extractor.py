import re

with open('index.html', 'r') as f:
    html = f.read()

# find <!-- TABS DE SERVICIOS -->
start_idx = html.find('<!-- TABS DE SERVICIOS -->')
end_idx = html.find('<!-- Fases -->')

if start_idx != -1 and end_idx != -1:
    tabs_html = html[start_idx:end_idx]
    # We want to remove the "Ver todos los servicios" button since we are ON the services page
    # <div class="text-center reveal-up">
    #     <a href="/servicios" class="inline-flex items-center justify-center px-8 py-3 rounded-full border border-white/20 bg-transparent hover:bg-white/5 text-white font-medium transition-all duration-300 gap-2">
    #         Ver todos los servicios <i class="ph ph-arrow-right"></i>
    #     </a>
    # </div>
    # we can remove the last div
    
    # We also want to replace the tabs section in servicios/index.html
    # In servicios/index.html, we replace from <!-- SERVICE 1 --> to the end of the grid.
    with open('tabs_output.html', 'w') as f:
        f.write(tabs_html)
