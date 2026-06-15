import os

files = [
    '/Users/carlosmolinamarquez/Desktop/proemote-landing/ayudas-digitalizacion-pymes-extremadura/index.html',
    '/Users/carlosmolinamarquez/Desktop/proemote-landing/ayudas-implementacion-ia-extremadura/index.html'
]

observer_script = """
    <script>
        // Reveal Animations
        document.addEventListener('DOMContentLoaded', () => {
            const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.reveal-up, .foco-item').forEach((el) => {
                observer.observe(el);
            });
        });
    </script>
</body>
"""

for file_path in files:
    if os.path.exists(file_path):
        with open(file_path, 'r') as f:
            content = f.read()

        # Fix dark mode background and brand colors from copied header/footer/menu
        content = content.replace('dark:bg-base', 'dark:bg-bgMain')
        content = content.replace('bg-base', 'bg-bgMain')
        content = content.replace('text-marca', 'text-primary')
        content = content.replace('bg-marca', 'bg-primary')

        # Add observer script if it's missing and we see reveal-up in the code
        if "IntersectionObserver" not in content and "reveal-up" in content:
            content = content.replace('</body>', observer_script)

        with open(file_path, 'w') as f:
            f.write(content)
        print(f"Fixed {file_path}")
    else:
        print(f"Not found: {file_path}")
