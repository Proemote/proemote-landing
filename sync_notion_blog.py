import os
import json
import re
import urllib.request
import urllib.error
from datetime import datetime

# ==========================================
# CONFIGURACIÓN NOTION
# ==========================================
NOTION_TOKEN = os.environ.get("NOTION_TOKEN", "tu_notion_token_aqui")
DATABASE_ID = os.environ.get("NOTION_DATABASE_ID", "tu_database_id_aqui")

HEADERS = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28"
}

def fetch_pages():
    url = f"https://api.notion.com/v1/databases/{DATABASE_ID}/query"
    data = {
        "filter": {
            "property": "Estado",
            "status": {
                "equals": "Publicado"
            }
        }
    }
    
    req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers=HEADERS, method='POST')
    try:
        with urllib.request.urlopen(req) as response:
            res = json.loads(response.read().decode('utf-8'))
            return res.get("results", [])
    except urllib.error.URLError as e:
        print(f"Error conectando a Notion (¿Configuraste el Token y Database ID?): {e}")
        return []

def fetch_blocks(block_id):
    url = f"https://api.notion.com/v1/blocks/{block_id}/children?page_size=100"
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req) as response:
            res = json.loads(response.read().decode('utf-8'))
            return res.get("results", [])
    except urllib.error.URLError as e:
        print(f"Error obteniendo bloques: {e}")
        return []

def extract_text(rich_text_array):
    if not rich_text_array:
        return ""
    
    html = ""
    for text_obj in rich_text_array:
        content = text_obj.get("plain_text", "")
        # Escapar html básico
        content = content.replace("<", "&lt;").replace(">", "&gt;")
        
        annotations = text_obj.get("annotations", {})
        if annotations.get("bold"):
            content = f"<strong>{content}</strong>"
        if annotations.get("italic"):
            content = f"<em>{content}</em>"
        if annotations.get("code"):
            content = f"<code>{content}</code>"
        
        href = text_obj.get("href")
        if href:
            content = f'<a href="{href}">{content}</a>'
            
        html += content
    return html

def parse_blocks_to_html(blocks):
    html = ""
    list_open = False
    list_type = None

    def close_list():
        nonlocal list_open, list_type, html
        if list_open:
            html += f"</{list_type}>\n"
            list_open = False

    for idx, block in enumerate(blocks):
        b_type = block["type"]
        
        # Cerrar listas si el bloque actual no es de lista
        if b_type not in ["bulleted_list_item", "numbered_list_item"]:
            close_list()

        if b_type == "paragraph":
            text = extract_text(block["paragraph"]["rich_text"])
            if text.strip():
                html += f"<p>{text}</p>\n"
            else:
                html += "<br>\n"
        
        elif b_type == "heading_1":
            text = extract_text(block["heading_1"]["rich_text"])
            html += f"<h2>{text}</h2>\n"  # H1 is usually page title, map to H2 in post
            
        elif b_type == "heading_2":
            text = extract_text(block["heading_2"]["rich_text"])
            # Creamos un ID para los anchors
            anchor_id = re.sub(r'[^a-zA-Z0-9]+', '-', text.lower()).strip('-')
            html += f'<h2 id="{anchor_id}" class="group scroll-mt-24">\n'
            html += f'    <button onclick="copyAnchor(event, \'#{anchor_id}\')" class="anchor-btn" title="Copiar enlace">\n'
            html += f'        <i class="ph-bold ph-link text-lg"></i>\n'
            html += f'    </button>\n'
            html += f'    {text}\n'
            html += f'</h2>\n'
            
        elif b_type == "heading_3":
            text = extract_text(block["heading_3"]["rich_text"])
            anchor_id = re.sub(r'[^a-zA-Z0-9]+', '-', text.lower()).strip('-')
            html += f'<h3 id="{anchor_id}" class="group scroll-mt-24">\n'
            html += f'    <button onclick="copyAnchor(event, \'#{anchor_id}\')" class="anchor-btn" title="Copiar enlace">\n'
            html += f'        <i class="ph-bold ph-link text-lg"></i>\n'
            html += f'    </button>\n'
            html += f'    {text}\n'
            html += f'</h3>\n'
            
        elif b_type == "bulleted_list_item":
            if not list_open or list_type != "ul":
                close_list()
                html += "<ul>\n"
                list_open = True
                list_type = "ul"
            text = extract_text(block["bulleted_list_item"]["rich_text"])
            html += f"<li>{text}</li>\n"
            
        elif b_type == "numbered_list_item":
            if not list_open or list_type != "ol":
                close_list()
                html += "<ol>\n"
                list_open = True
                list_type = "ol"
            text = extract_text(block["numbered_list_item"]["rich_text"])
            html += f"<li>{text}</li>\n"
            
        elif b_type == "quote":
            text = extract_text(block["quote"]["rich_text"])
            html += f"<blockquote>{text}</blockquote>\n"
            
        elif b_type == "code":
            text = extract_text(block["code"]["rich_text"])
            lang = block["code"].get("language", "")
            html += f'<div class="prompt-box"><div class="flex justify-between items-center mb-3 pb-3 border-b border-white/10"><span class="text-xs text-primary font-bold uppercase tracking-wider">{lang}</span></div>'
            html += f'<code class="whitespace-pre-wrap">{text}</code></div>\n'
            
        elif b_type == "image":
            img_url = ""
            if block["image"]["type"] == "external":
                img_url = block["image"]["external"]["url"]
            elif block["image"]["type"] == "file":
                img_url = block["image"]["file"]["url"]
            html += f'<img src="{img_url}" alt="Post image" loading="lazy">\n'

    close_list()
    return html

def get_property(page, prop_name, p_type):
    props = page.get("properties", {})
    if prop_name not in props: return ""
    p = props[prop_name]
    
    if p_type == "title" and p.get("title"):
        return p["title"][0]["plain_text"]
    elif p_type == "rich_text" and p.get("rich_text"):
        return p["rich_text"][0]["plain_text"]
    elif p_type == "select" and p.get("select"):
        return p["select"]["name"]
    elif p_type == "date" and p.get("date"):
        return p["date"]["start"]
    elif p_type == "url" and p.get("url"):
        return p["url"]
    return ""

def main():
    print("Sincronizando con Notion...")
    if NOTION_TOKEN == "tu_notion_token_aqui":
        print("ERROR: Por favor configura NOTION_TOKEN y NOTION_DATABASE_ID en el archivo .env o en las variables de entorno.")
        return

    pages = fetch_pages()
    print(f"Se encontraron {len(pages)} posts publicados.")
    
    if not pages:
        return

    # Cargar plantilla base
    with open("recursos/plantilla_base.html", "r", encoding="utf-8") as f:
        template = f.read()

    resources_data_js = []

    for idx, page in enumerate(pages):
        page_id = page["id"]
        
        # Extraer propiedades
        title = get_property(page, "Nombre", "title")
        slug = get_property(page, "Slug", "rich_text")
        if not slug:
            slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')
            
        description = get_property(page, "Descripción", "rich_text")
        category = get_property(page, "Categoría", "select") or "Agentes IA"
        p_type = get_property(page, "Tipo", "select") or "Guía"
        read_time = get_property(page, "Tiempo de lectura", "rich_text") or "5 min"
        date_str = get_property(page, "Fecha", "date")
        if date_str:
            date_obj = datetime.strptime(date_str, "%Y-%m-%d")
            formatted_date = date_obj.strftime("%d de %b de %Y").replace("Jan", "ene").replace("Feb", "feb").replace("Mar", "mar").replace("Apr", "abr").replace("May", "may").replace("Jun", "jun").replace("Jul", "jul").replace("Aug", "ago").replace("Sep", "sep").replace("Oct", "oct").replace("Nov", "nov").replace("Dec", "dic")
            timestamp = int(date_obj.timestamp() * 1000)
        else:
            formatted_date = "Reciente"
            timestamp = int(datetime.now().timestamp() * 1000)
            
        image_url = get_property(page, "Imagen", "url") or "https://images.unsplash.com/photo-1614064641913-6b7140414f15?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        
        print(f"-> Procesando: {title}")
        
        # Obtener bloques
        blocks = fetch_blocks(page_id)
        html_content = parse_blocks_to_html(blocks)
        
        # Reemplazar en plantilla
        post_html = template
        post_html = post_html.replace("{{TITLE}}", title)
        post_html = post_html.replace("{{DESCRIPTION}}", description)
        post_html = post_html.replace("{{CATEGORY}}", category)
        post_html = post_html.replace("{{TYPE}}", p_type)
        post_html = post_html.replace("{{DATE}}", formatted_date)
        post_html = post_html.replace("{{READ_TIME}}", read_time)
        post_html = post_html.replace("{{IMAGE_URL}}", image_url)
        post_html = post_html.replace("{{CONTENT}}", html_content)
        
        # Crear directorio si no existe
        post_dir = f"recursos/{slug}"
        os.makedirs(post_dir, exist_ok=True)
        
        with open(f"{post_dir}/index.html", "w", encoding="utf-8") as f:
            f.write(post_html)
            
        # Añadir al index data
        category_id_map = {
            "Agentes IA": "ia",
            "Automatización": "automatizacion",
            "Contenido": "contenido",
            "Sistemas Core": "sistemas"
        }
        
        resources_data_js.append({
            "id": idx + 100, # Para no colisionar IDs viejos
            "title": title,
            "description": description,
            "categoryId": category_id_map.get(category, "ia"),
            "categoryLabel": category,
            "type": p_type,
            "readTime": read_time,
            "date": formatted_date,
            "timestamp": timestamp,
            "views": 0,
            "image": image_url,
            "slug": f"/recursos/{slug}"
        })
        
    # === ACTUALIZAR recursos/index.html ===
    with open("recursos/index.html", "r", encoding="utf-8") as f:
        index_html = f.read()
        
    # Buscar el array resourcesData y reemplazarlo
    # Primero convertimos nuestra lista a JS string
    js_array = json.dumps(resources_data_js, indent=12, ensure_ascii=False)
    
    # Regex para encontrar: const resourcesData = [...];
    pattern = re.compile(r'(const\s+resourcesData\s*=\s*)\[.*?\];', re.DOTALL)
    
    if pattern.search(index_html):
        new_index = pattern.sub(rf'\1{js_array};', index_html)
        with open("recursos/index.html", "w", encoding="utf-8") as f:
            f.write(new_index)
        print("recursos/index.html actualizado exitosamente.")
    else:
        print("ADVERTENCIA: No se pudo encontrar 'const resourcesData = [...]' en recursos/index.html")
        
    print("¡Sincronización completada!")

if __name__ == "__main__":
    main()
