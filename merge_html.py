import re

def extract_tag(content, tag_name):
    """Extracts a tag with all its content assuming it doesn't contain nested tags of the same name. 
    If it does (like nav inside nav), regex fails. Let's use string finding for safety."""
    
    start_tag = f"<{tag_name}"
    end_tag = f"</{tag_name}>"
    
    start_idx = content.find(start_tag)
    if start_idx == -1:
        return None, -1, -1
        
    # Find the matching closing tag.
    # Simple counting for nested tags:
    current_idx = start_idx
    depth = 0
    
    while current_idx < len(content):
        # find next start or end
        next_start = content.find(start_tag, current_idx)
        next_end = content.find(end_tag, current_idx)
        
        if next_end == -1:
            return None, -1, -1 # Malformed
            
        if next_start != -1 and next_start < next_end:
            depth += 1
            current_idx = next_start + len(start_tag)
        else:
            depth -= 1
            current_idx = next_end + len(end_tag)
            if depth == 0:
                end_idx = current_idx
                return content[start_idx:end_idx], start_idx, end_idx

    return None, -1, -1

with open('/Users/carlosmolinamarquez/Desktop/proemote-landing/index.html', 'r', encoding='utf-8') as f:
    master_html = f.read()

with open('/Users/carlosmolinamarquez/Desktop/proemote-landing/proemote_studio.html', 'r', encoding='utf-8') as f:
    user_html = f.read()

# 1. Extract true Nav
true_nav, _, _ = extract_tag(master_html, 'nav')

# 2. Extract true Footer
true_footer, _, _ = extract_tag(master_html, 'footer')

# 3. We also should extract the true Modal (#contact-modal) if we want to preserve form logic.
# But wait, the user might have customized the modal in redes-sociales (e.g. selected option). 
# Let's check the user's modal first before replacing it.

if true_nav and true_footer:
    user_nav, u_nav_s, u_nav_e = extract_tag(user_html, 'nav')
    if user_nav:
        user_html = user_html[:u_nav_s] + true_nav + user_html[u_nav_e:]
    
    user_footer, u_foot_s, u_foot_e = extract_tag(user_html, 'footer')
    if user_footer:
        user_html = user_html[:u_foot_s] + true_footer + user_html[u_foot_e:]
    elif "</body>" in user_html:
        # If no footer, insert before scripts or body end
        user_html = user_html.replace("</body>", true_footer + "\n</body>")
        
    with open('/Users/carlosmolinamarquez/Desktop/proemote-landing/redes-sociales/index.html', 'w', encoding='utf-8') as f:
        f.write(user_html)
    print("Successfully merged and wrote to redes-sociales/index.html")
else:
    print("Could not find nav or footer in master HTML")
