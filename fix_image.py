import io

filepath = '/Users/carlosmolinamarquez/Desktop/proemote-landing/ayudas-digitalizacion-pymes-extremadura/index.html'

with io.open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('src="subvenciones-autonomos-pymes-extremadura-proemote.png"', 'src="/ayudas-digitalizacion-pymes-extremadura/subvenciones-autonomos-pymes-extremadura-proemote.png"')

with io.open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
