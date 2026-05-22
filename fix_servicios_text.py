import re

with open('servicios/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Organización Integral
content = content.replace(
    '<p class="text-sm text-textSecondary mb-6">Planificación, producción y gestión completa del evento corporativo o social, desde el concepto y logística hasta la ejecución perfecta en el día.</p>',
    '<p class="text-sm text-textSecondary mb-6">Planificación y producción completa del evento, desde el concepto hasta la ejecución en el día.</p>'
)

# Branding Visual del Evento
content = content.replace(
    '<p class="text-sm text-textSecondary mb-6">Imagen gráfica, cartelería, decoración, materiales e identidad visual coherente para que el evento comunique los valores de tu marca.</p>',
    '<p class="text-sm text-textSecondary mb-6">Imagen gráfica, cartelería, materiales e identidad visual coherente para que el evento comunique bien.</p>'
)

# Promoción Digital
content = content.replace(
    '<p class="text-sm text-textSecondary mb-6">Estrategia de contenido y difusión en redes sociales para llenar el aforo y generar expectación antes, cobertura durante y recuerdo después.</p>',
    '<p class="text-sm text-textSecondary mb-6">Estrategia de contenido y redes sociales para llenar el aforo y generar expectación antes, durante y después.</p>'
)

# Campañas Ads para Eventos
content = content.replace(
    '<p class="text-sm text-textSecondary mb-6">Publicidad segmentada y local en Meta y Google para maximizar inscripciones, venta de entradas o asistentes a tu congreso o feria.</p>',
    '<p class="text-sm text-textSecondary mb-6">Publicidad segmentada en Meta y Google para maximizar inscripciones, entradas o asistentes.</p>'
)

with open('servicios/index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated servicios/index.html texts")
