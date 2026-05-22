            function enableDragScroll(containerId, autoScrollEnabled = true) {
                const container = document.getElementById(containerId);
                if (!container) return;

                let isDown = false;
                let startX;
                let scrollLeftPos;
                let isHovered = false;
                let velocity = 0;
                let momentumID;
                let prevX;
                let prevTime;

                container.addEventListener('mousedown', (e) => {
                    isDown = true;
                    container.classList.add('cursor-grabbing');
                    container.classList.remove('cursor-grab');
                    startX = e.pageX - container.offsetLeft;
                    scrollLeftPos = container.scrollLeft;
                    cancelAnimationFrame(momentumID);
                    prevX = e.pageX;
                    prevTime = Date.now();
                    velocity = 0;
                });

                container.addEventListener('mouseleave', () => {
                    if (isDown) beginMomentum();
                    isDown = false;
                    isHovered = false;
                    container.classList.remove('cursor-grabbing');
                    container.classList.add('cursor-grab');
                });

                container.addEventListener('mouseup', () => {
                    isDown = false;
                    container.classList.remove('cursor-grabbing');
                    container.classList.add('cursor-grab');
                    beginMomentum();
                });

                container.addEventListener('mousemove', (e) => {
                    if (!isDown) return;
                    e.preventDefault();
                    const x = e.pageX - container.offsetLeft;
                    const walk = (x - startX) * 2;
                    container.scrollLeft = scrollLeftPos - walk;
                    
                    const now = Date.now();
                    const dt = now - prevTime;
                    const dx = e.pageX - prevX;
                    if (dt > 0) { velocity = (dx / dt) * 15; }
                    prevX = e.pageX;
                    prevTime = now;
                });

                container.addEventListener('mouseenter', () => { isHovered = true; });

                function beginMomentum() {
                    cancelAnimationFrame(momentumID);
                    momentumLoop();
                }

                function momentumLoop() {
                    if (Math.abs(velocity) > 0.5) {
                        container.scrollLeft -= velocity;
                        velocity *= 0.95;
                        momentumID = requestAnimationFrame(momentumLoop);
                    }
                }

                // Autoscroll
                if(autoScrollEnabled) {
                    function autoScroll() {
                        if (!isHovered && !isDown && Math.abs(velocity) <= 0.5) {
                            // Velocidad reducida en reseñas para evitar estrés visual
                            container.scrollLeft += (containerId === 'logos-container' ? 1.5 : 0.4);
                        }
                        
                        if(containerId === 'logos-container') {
                            const halfWidth = (container.scrollWidth) / 2;
                            if (container.scrollLeft >= halfWidth) {
                                container.scrollLeft -= halfWidth;
                            } else if (container.scrollLeft <= 0 && velocity > 0) {
                                container.scrollLeft += halfWidth;
                            }
                        } else {
                            if (container.scrollLeft >= (container.scrollWidth - container.clientWidth - 1)) {
                                container.scrollLeft = 0;
                            }
                        }
                        requestAnimationFrame(autoScroll);
                    }
                    autoScroll();
                }
            }

            // Aplicamos motor físico al slider de logos
            enableDragScroll('logos-container', true);

            // Carousel de Reseñas 1 a 1 con autoplay y pause on hover
            const reviewsContainer = document.getElementById('reviews-carousel');
            if(reviewsContainer) {
                // Permitimos el arrastre manual pero sin el autoscroll continuo
                enableDragScroll('reviews-carousel', false);

                const prevBtn = document.getElementById('prev-review');
                const nextBtn = document.getElementById('next-review');
                
                // Calculamos el tamaño de la tarjeta + gap dinámicamente
                let scrollAmount = 424; 
                if(reviewsContainer.children.length > 0) {
                    const cardWidth = reviewsContainer.children[0].offsetWidth;
                    // gap-6 en Tailwind es 1.5rem = 24px
                    scrollAmount = cardWidth + 24; 
                }
                
                let autoPlayInterval;

                const startAutoPlay = () => {
                    autoPlayInterval = setInterval(() => {
                        // Si está al final, vuelve al principio
                        if(reviewsContainer.scrollLeft >= (reviewsContainer.scrollWidth - reviewsContainer.clientWidth - 10)) {
                            reviewsContainer.scrollTo({ left: 0, behavior: 'smooth' });
                        } else {
                            reviewsContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                        }
                    }, 4000); // 4 segundos por reseña
                };

                const stopAutoPlay = () => {
                    clearInterval(autoPlayInterval);
                };

                // Iniciar autoplay
                startAutoPlay();

                // Pausar en hover (sobre todo el contenedor incluyendo flechas)
                const carouselWrapper = reviewsContainer.parentElement;
                if(carouselWrapper) {
                    carouselWrapper.addEventListener('mouseenter', stopAutoPlay);
                    carouselWrapper.addEventListener('mouseleave', startAutoPlay);
                }
                
                // Funcionalidad de flechas
                if(prevBtn) {
                    prevBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        reviewsContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                    });
                }
                
                if(nextBtn) {
                    nextBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        if(reviewsContainer.scrollLeft >= (reviewsContainer.scrollWidth - reviewsContainer.clientWidth - 10)) {
                            reviewsContainer.scrollTo({ left: 0, behavior: 'smooth' });
                        } else {
                            reviewsContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                        }
                    });
                }
            }

            // 4. API Soberana (Formularios)
