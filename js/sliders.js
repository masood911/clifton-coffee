function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function initializeSlidersAndNavigations() {
    initializeFavoritesSlider();
    initializeReviewsSlider();
    initializeCollectionsSlider();
    initializeInstagramSlider();
    initializeCapsulesSlider();
}

function initializeFavoritesSlider() {
    const track = document.getElementById('favorites-track');
    const prevBtn = document.getElementById('favorites-prev');
    const nextBtn = document.getElementById('favorites-next');
    const dotsContainer = document.querySelector('.favorites-dots');
    const cards = document.querySelectorAll('.favorite-card');

    if (!track || !prevBtn || !nextBtn || !dotsContainer || cards.length === 0) {
        console.error('Favorites slider elements not found');
        return;
    }

    let currentIndex = 0;
    const cardWidth = 280 + 30;
    let visibleCards = getVisibleCards(track, cardWidth);
    let maxSlides = Math.max(0, Math.ceil(cards.length / visibleCards) - 1);

    function getVisibleCards(container, itemWidth) {
        const containerWidth = container.parentElement.offsetWidth;
        return Math.floor(containerWidth / itemWidth);
    }

    function updateSlider() {
        const translateX = -currentIndex * (cardWidth * visibleCards);
        track.style.transform = `translateX(${translateX}px)`;
        updateButtons();
        console.log(`Favorites slider - Index: ${currentIndex}, MaxSlides: ${maxSlides}`);
    }

    function updateButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxSlides;

        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex >= maxSlides ? '0.5' : '1';
    }

    function updateDots() {

        dotsContainer.innerHTML = '';

        for (let i = 0; i <= maxSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'favorites-dot';
            dot.setAttribute('data-slide', i);
            if (i === currentIndex) {
                dot.classList.add('active');
            }

            dot.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(`Favorites dot ${i} clicked`);
                goToSlide(i);
            });

            dotsContainer.appendChild(dot);
        }

        console.log(`Favorites dots updated - Total: ${maxSlides + 1}, Active: ${currentIndex}`);
    }

    function goToSlide(index) {
        if (index >= 0 && index <= maxSlides) {
            currentIndex = index;
            updateSlider();
            updateDots();
        }
    }

    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
            updateDots();
        }
    });

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentIndex < maxSlides) {
            currentIndex++;
            updateSlider();
            updateDots();
        }
    });

    function setupTouchEvents() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            track.style.transition = 'none';
        }, { passive: true });

        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            currentX = e.touches[0].clientX;
            const diffX = currentX - startX;
            const translateX = -currentIndex * (cardWidth * visibleCards) + diffX;
            track.style.transform = `translateX(${translateX}px)`;
        }, { passive: false });

        track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';

            const diffX = currentX - startX;
            const threshold = 100;

            if (diffX > threshold && currentIndex > 0) {
                currentIndex--;
            } else if (diffX < -threshold && currentIndex < maxSlides) {
                currentIndex++;
            }

            updateSlider();
            updateDots();
        });
    }

    setupTouchEvents();

    window.addEventListener('resize', debounce(() => {
        visibleCards = getVisibleCards(track, cardWidth);
        maxSlides = Math.max(0, Math.ceil(cards.length / visibleCards) - 1);
        currentIndex = Math.min(currentIndex, maxSlides);
        updateSlider();
        updateDots();
    }, 250));

    updateSlider();
    updateDots();

    return {
        goToSlide,
        getCurrentSlide: () => currentIndex,
        getTotalSlides: () => maxSlides + 1
    };
}

function initializeReviewsSlider() {
    const track = document.getElementById('reviews-track');
    const prevBtn = document.getElementById('reviews-prev');
    const nextBtn = document.getElementById('reviews-next');
    const cards = document.querySelectorAll('.review-card');

    if (!track || !prevBtn || !nextBtn || cards.length === 0) return;

    let currentIndex = 0;
    const cardWidth = 350 + 40;
    let visibleCards = getVisibleCards(track, cardWidth);

    function getVisibleCards(container, itemWidth) {
        const containerWidth = container.parentElement.offsetWidth;
        return Math.floor(containerWidth / itemWidth);
    }

    function updateSlider() {
        const translateX = -currentIndex * cardWidth;
        track.style.transform = `translateX(${translateX}px)`;
        updateButtons();
    }

    function updateButtons() {
        const maxIndex = cards.length - visibleCards;

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;

        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextBtn.addEventListener('click', () => {
        const maxIndex = cards.length - visibleCards;
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    });

    window.addEventListener('resize', debounce(() => {
        visibleCards = getVisibleCards(track, cardWidth);
        currentIndex = Math.min(currentIndex, Math.max(0, cards.length - visibleCards));
        updateSlider();
    }, 250));

    updateButtons();
}

function initializeCollectionsSlider() {
    const track = document.getElementById('collections-track');
    const prevBtn = document.getElementById('collections-prev');
    const nextBtn = document.getElementById('collections-next');
    const dotsContainer = document.getElementById('collections-dots');
    const dots = document.querySelectorAll('#collections-dots .dot');
    const cards = document.querySelectorAll('.collection-card');

    if (!track || !prevBtn || !nextBtn || !dotsContainer || cards.length === 0) {
        console.error('Collections slider elements not found');
        return;
    }

    let currentIndex = 0;
    const cardWidth = 370;
    let visibleCards = getVisibleCards();
    let maxSlides = Math.max(0, Math.ceil(cards.length / visibleCards) - 1);

    function getVisibleCards() {
        const containerWidth = track.parentElement.offsetWidth;
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return Math.floor(containerWidth / 295);
        if (window.innerWidth <= 1024) return Math.floor(containerWidth / 320);
        return Math.floor(containerWidth / 370);
    }

    function updateSlider() {

        const translateX = -currentIndex * (cardWidth * visibleCards);
        track.style.transform = `translateX(${translateX}px)`;

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxSlides;

        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex >= maxSlides ? '0.5' : '1';

        console.log(`Collections slider - Index: ${currentIndex}, MaxSlides: ${maxSlides}`);
    }

    function updateDots() {

        dotsContainer.innerHTML = '';

        for (let i = 0; i <= maxSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'dot';
            dot.setAttribute('data-slide', i);
            if (i === currentIndex) {
                dot.classList.add('active');
            }

            dot.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(`Collections dot ${i} clicked`);
                goToSlide(i);
            });

            dotsContainer.appendChild(dot);
        }

        console.log(`Collections dots updated - Total: ${maxSlides + 1}, Active: ${currentIndex}`);
    }

    function goToSlide(index) {
        if (index >= 0 && index <= maxSlides) {
            currentIndex = index;
            updateSlider();
            updateDots();
        }
    }

    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
            updateDots();
        }
    });

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentIndex < maxSlides) {
            currentIndex++;
            updateSlider();
            updateDots();
        }
    });

    function setupTouchEvents() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            track.style.transition = 'none';
        }, { passive: true });

        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            currentX = e.touches[0].clientX;
            const diffX = currentX - startX;
            const translateX = -currentIndex * (cardWidth * visibleCards) + diffX;
            track.style.transform = `translateX(${translateX}px)`;
        }, { passive: false });

        track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';

            const diffX = currentX - startX;
            const threshold = 100;

            if (diffX > threshold && currentIndex > 0) {
                currentIndex--;
            } else if (diffX < -threshold && currentIndex < maxSlides) {
                currentIndex++;
            }

            updateSlider();
            updateDots();
        });
    }

    setupTouchEvents();

    window.addEventListener('resize', debounce(() => {
        visibleCards = getVisibleCards();
        maxSlides = Math.max(0, Math.ceil(cards.length / visibleCards) - 1);
        currentIndex = Math.min(currentIndex, maxSlides);
        updateSlider();
        updateDots();
    }, 250));

    document.querySelectorAll('.collection-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const collectionName = btn.closest('.collection-card').querySelector('.collection-title').textContent;
            showNotification(`Navigating to ${collectionName} collection!`, 'info');
        });
    });

    updateSlider();
    updateDots();

    return {
        goToSlide,
        getCurrentSlide: () => currentIndex,
        getTotalSlides: () => maxSlides + 1
    };
}

function initializeInstagramSlider() {
    const track = document.getElementById('sliderTrack');
    const dots = document.querySelectorAll('#dotsContainer .dot');
    const slides = document.querySelectorAll('#sliderTrack .slide');

    if (!track || !dots.length || !slides.length) {
        console.warn('Instagram slider elements not found');
        return;
    }

    let currentSlide = 0;
    let autoSlideInterval = null;
    let isUserInteracting = false;
    let isVisible = false;

    function updateSlider() {
        const translateX = -currentSlide * 100;
        track.style.transform = `translateX(${translateX}%)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });

        console.log(`Instagram slide updated to: ${currentSlide}`);
    }

    function goToSlide(index) {
        if (index >= 0 && index < slides.length) {
            currentSlide = index;
            updateSlider();
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }

    function startAutoSlide() {
        if (!isUserInteracting && !autoSlideInterval && isVisible) {
            autoSlideInterval = setInterval(() => {
                nextSlide();
            }, 5000);
        }
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }

    function handleUserInteraction() {
        isUserInteracting = true;
        stopAutoSlide();

        setTimeout(() => {
            isUserInteracting = false;
            if (isVisible) {
                startAutoSlide();
            }
        }, 8000);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(`Instagram dot ${index} clicked`);
            goToSlide(index);
            handleUserInteraction();
        });

        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToSlide(index);
                handleUserInteraction();
            }
        });
    });

    let startX = 0;
    let endX = 0;
    let isDragging = false;
    let startTime = 0;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startTime = Date.now();
        isDragging = true;
        stopAutoSlide();
        track.style.transition = 'none';
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;

        const currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        const currentTranslateX = -currentSlide * 100;
        const newTranslateX = currentTranslateX + (diff / track.offsetWidth) * 100;

        track.style.transform = `translateX(${newTranslateX}%)`;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;

        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        const duration = Date.now() - startTime;
        const threshold = 50;
        const velocity = Math.abs(diff) / duration;

        isDragging = false;
        track.style.transition = 'transform 0.7s cubic-bezier(0.25, 0.8, 0.25, 1)';

        if (Math.abs(diff) > threshold || velocity > 0.3) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        } else {

            updateSlider();
        }

        handleUserInteraction();
    });

    const instaSection = document.querySelector('.instagram');
    if (instaSection) {
        instaSection.addEventListener('mouseenter', () => {
            isUserInteracting = true;
            stopAutoSlide();
        });

        instaSection.addEventListener('mouseleave', () => {
            isUserInteracting = false;
            setTimeout(() => {
                if (!isUserInteracting && isVisible) {
                    startAutoSlide();
                }
            }, 1500);
        });
    }

    document.addEventListener('keydown', (e) => {
        if (instaSection && (instaSection.matches(':hover') || document.activeElement.closest('.instagram'))) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
                handleUserInteraction();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
                handleUserInteraction();
            } else if (e.key >= '1' && e.key <= '4') {
                e.preventDefault();
                const slideIndex = parseInt(e.key) - 1;
                if (slideIndex < slides.length) {
                    goToSlide(slideIndex);
                    handleUserInteraction();
                }
            }
        }
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoSlide();
        } else if (!isUserInteracting && isVisible) {
            setTimeout(() => {
                if (!isUserInteracting && isVisible) {
                    startAutoSlide();
                }
            }, 2000);
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isVisible = entry.isIntersecting;

            if (entry.isIntersecting) {
                if (!isUserInteracting) {
                    setTimeout(() => {
                        if (isVisible && !isUserInteracting) {
                            startAutoSlide();
                        }
                    }, 2000);
                }
            } else {
                stopAutoSlide();
            }
        });
    }, { threshold: 0.3 });

    if (instaSection) {
        observer.observe(instaSection);
    }

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateSlider();
        }, 250);
    });

    updateSlider();

    setTimeout(() => {
        isVisible = true;
        if (!isUserInteracting) {
            startAutoSlide();
        }
    }, 3000);

    return {
        goToSlide,
        nextSlide,
        prevSlide,
        getCurrentSlide: () => currentSlide,
        getTotalSlides: () => slides.length,
        startAutoSlide,
        stopAutoSlide
    };
}

function handleImageLoading() {
    const images = document.querySelectorAll('.insta-card img');
    let loadedImages = 0;

    images.forEach((img, index) => {
        const imageLoader = new Image();

        imageLoader.onload = () => {
            loadedImages++;
            img.style.opacity = '1';

            if (loadedImages === images.length) {
                console.log('All images loaded, initializing slider...');
                const instagramSlider = initializeInstagramSlider();
                window.instagramSlider = instagramSlider;
            }
        };

        imageLoader.onerror = () => {
            console.warn(`Failed to load image ${index + 1}`);
            loadedImages++;

            if (loadedImages === images.length) {
                const instagramSlider = initializeInstagramSlider();
                window.instagramSlider = instagramSlider;
            }
        };

        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';

        imageLoader.src = img.src;
    });
}

function setupAccessibility() {

    const cards = document.querySelectorAll('.insta-card');
    cards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `View Instagram post ${index + 1}`);

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();

                console.log(`Instagram card ${index + 1} activated`);
            }
        });
    });

    const slider = document.querySelector('.slider-container');
    if (slider) {
        slider.setAttribute('aria-live', 'polite');
        slider.setAttribute('aria-label', 'Instagram posts carousel');
    }
}

function setupErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('Instagram slider error:', e.error);
    });

    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log(`Page load time: ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
                }
            }, 0);
        });
    }
}

function initializeCapsulesSlider() {
    const imageTrack = document.getElementById('capsules-slider-track');
    const textTrack = document.getElementById('capsules-text-track');
    const dots = document.querySelectorAll('.capsules-dot');
    const imageSlides = document.querySelectorAll('#capsules-slider-track .slide');
    const textSlides = document.querySelectorAll('.capsules-text-slide');

    if (!imageTrack || !textTrack || !dots.length || !imageSlides.length || !textSlides.length) {
        console.warn('Capsules slider elements not found');
        return;
    }

    let currentSlide = 0;
    let autoSlideInterval = null;
    let isUserInteracting = false;
    let isVisible = false;

    function updateSliders() {

        const imageTranslateY = -currentSlide * 100;
        imageTrack.style.transform = `translateY(${imageTranslateY}%)`;

        const nextSlideIndex = (currentSlide + 1) % textSlides.length;

        textSlides.forEach((slide, index) => {

            slide.classList.remove('current', 'next-preview', 'hidden');

            if (index === currentSlide) {

                slide.classList.add('current');
                slide.style.display = 'flex';

                slide.style.filter = 'blur(0px)';
                slide.style.opacity = '1';
                slide.style.transform = 'translateY(0%)';
                slide.style.zIndex = '10';

                const textElements = slide.querySelectorAll('h2, p, .btn-primary');
                textElements.forEach(el => {
                    el.style.filter = 'blur(0px)';
                    el.style.opacity = '1';
                });
            } else if (index === nextSlideIndex) {

                slide.classList.add('next-preview');
                slide.style.display = 'flex';
                slide.style.filter = 'blur(1px)';
                slide.style.opacity = '0.6';
                slide.style.transform = 'translateY(50%)';
                slide.style.zIndex = '5';

                const textElements = slide.querySelectorAll('h2, p, .btn-primary');
                textElements.forEach(el => {
                    el.style.filter = 'blur(1px)';
                    el.style.opacity = '0.7';
                });
            } else {

                slide.classList.add('hidden');
                slide.style.display = 'none';
                slide.style.transform = 'translateY(100%)';
                slide.style.opacity = '0';
                slide.style.zIndex = '1';
            }
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
            dot.setAttribute('aria-pressed', index === currentSlide ? 'true' : 'false');
        });

        console.log(`Capsules slider updated - Current: ${currentSlide} (Sharp), Preview: ${nextSlideIndex} (Blurred)`);
    }

    function goToSlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < imageSlides.length && slideIndex !== currentSlide) {
            currentSlide = slideIndex;
            updateSliders();
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % imageSlides.length;
        updateSliders();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + imageSlides.length) % imageSlides.length;
        updateSliders();
    }

    function startAutoSlide() {
        if (autoSlideInterval || isUserInteracting || !isVisible) return;

        autoSlideInterval = setInterval(() => {
            if (!isUserInteracting && isVisible) {
                nextSlide();
            }
        }, 6000);

        console.log('Capsules auto-slide started');
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
            console.log('Capsules auto-slide stopped');
        }
    }

    function handleUserInteraction() {
        isUserInteracting = true;
        stopAutoSlide();

        setTimeout(() => {
            isUserInteracting = false;
            if (isVisible && !autoSlideInterval) {
                startAutoSlide();
            }
        }, 8000);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(`Capsules dot ${index} clicked`);
            goToSlide(index);
            handleUserInteraction();
        });

        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToSlide(index);
                handleUserInteraction();
            }
        });
    });

    let startY = 0;
    let endY = 0;
    let isDragging = false;

    [imageTrack, textTrack].forEach(track => {
        track.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            isDragging = true;
            stopAutoSlide();
        }, { passive: true });

        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const currentY = e.touches[0].clientY;
            const diff = Math.abs(currentY - startY);

            if (diff > 10) {
                e.preventDefault();
            }
        }, { passive: false });

        track.addEventListener('touchend', (e) => {
            if (!isDragging) return;

            endY = e.changedTouches[0].clientY;
            const diffY = startY - endY;
            const threshold = 50;

            isDragging = false;

            if (Math.abs(diffY) > threshold) {
                if (diffY > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }

            handleUserInteraction();
        });
    });

    const capsulesSection = document.querySelector('.capsules-section');
    if (capsulesSection) {
        capsulesSection.addEventListener('mouseenter', () => {
            isUserInteracting = true;
            stopAutoSlide();
        });

        capsulesSection.addEventListener('mouseleave', () => {
            isUserInteracting = false;
            setTimeout(() => {
                if (!isUserInteracting && isVisible && !autoSlideInterval) {
                    startAutoSlide();
                }
            }, 2000);
        });
    }

    document.addEventListener('keydown', (e) => {
        if (capsulesSection && (capsulesSection.matches(':hover') || document.activeElement.closest('.capsules-section'))) {
            if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
                e.preventDefault();
                prevSlide();
                handleUserInteraction();
            } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
                e.preventDefault();
                nextSlide();
                handleUserInteraction();
            } else if (e.key >= '1' && e.key <= '4') {
                e.preventDefault();
                const slideIndex = parseInt(e.key) - 1;
                if (slideIndex < imageSlides.length) {
                    goToSlide(slideIndex);
                    handleUserInteraction();
                }
            }
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isVisible = entry.isIntersecting;

            if (entry.isIntersecting) {
                if (!isUserInteracting && !autoSlideInterval) {
                    setTimeout(() => {
                        if (isVisible && !isUserInteracting) {
                            startAutoSlide();
                        }
                    }, 1000);
                }
            } else {
                stopAutoSlide();
            }
        });
    }, { threshold: 0.3 });

    if (capsulesSection) {
        observer.observe(capsulesSection);
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoSlide();
        } else if (!isUserInteracting && isVisible) {
            setTimeout(() => {
                if (!isUserInteracting && isVisible && !autoSlideInterval) {
                    startAutoSlide();
                }
            }, 2000);
        }
    });

    window.addEventListener('blur', () => stopAutoSlide());
    window.addEventListener('focus', () => {
        if (!isUserInteracting && isVisible && !autoSlideInterval) {
            setTimeout(() => startAutoSlide(), 1000);
        }
    });

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateSliders();
        }, 250);
    });

    console.log('Initializing Capsules slider with enhanced text preview...');
    updateSliders();

    setTimeout(() => {
        isVisible = true;
        if (!isUserInteracting) {
            startAutoSlide();
        }
    }, 2000);

    return {
        goToSlide,
        nextSlide,
        prevSlide,
        getCurrentSlide: () => currentSlide,
        getTotalSlides: () => imageSlides.length,
        startAutoSlide,
        stopAutoSlide,
        updateSliders
    };
}

function initialize() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('Capsules slider initializing...');
            const slider = initializeCapsulesSlider();
            window.capsulesSlider = slider;
        });
    } else {
        console.log('Capsules slider initializing...');
        const slider = initializeCapsulesSlider();
        window.capsulesSlider = slider;
    }
}

initialize();

window.addEventListener('error', (e) => {
    console.error('Capsules slider error:', e.error);
});

if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log(`Page load time: ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
            }
        }, 0);
    });
}

function showNotification(message, type = 'info') {
    console.log(`${type.toUpperCase()}: ${message}`);

}

document.addEventListener('DOMContentLoaded', function () {
    console.log('Initializing all sliders...');
    initializeSlidersAndNavigations();

    const instagramSlider = initializeInstagramSlider();
    window.instagramSlider = instagramSlider;

    console.log('All sliders initialized successfully');
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSlidersAndNavigations);
} else {
    initializeSlidersAndNavigations();
}

function initializeReviewsSlider() {
    const track = document.getElementById('reviews-track');
    const dotsContainer = document.getElementById('reviews-dots');
    const cards = document.querySelectorAll('.review-card');

    if (!track || !dotsContainer || cards.length === 0) {
        console.error('Reviews slider elements not found');
        return;
    }

    let currentIndex = 0;
    const cardWidth = 350 + 40;
    let visibleCards = getVisibleCards(track, cardWidth);
    let maxSlides = Math.max(0, Math.ceil(cards.length / visibleCards) - 1);

    function getVisibleCards(container, itemWidth) {
        const containerWidth = container.parentElement.offsetWidth;
        return Math.floor(containerWidth / itemWidth);
    }

    function updateSlider() {
        const translateX = -currentIndex * (cardWidth * visibleCards);
        track.style.transform = `translateX(${translateX}px)`;
        updateDots();
        console.log(`Reviews slider - Index: ${currentIndex}, MaxSlides: ${maxSlides}`);
    }

    function updateDots() {

        dotsContainer.innerHTML = '';

        for (let i = 0; i <= maxSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'reviews-dot';
            dot.setAttribute('data-slide', i);
            if (i === currentIndex) {
                dot.classList.add('active');
            }

            dot.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(`Reviews dot ${i} clicked`);
                goToSlide(i);
            });

            dotsContainer.appendChild(dot);
        }

        console.log(`Reviews dots updated - Total: ${maxSlides + 1}, Active: ${currentIndex}`);
    }

    function goToSlide(index) {
        if (index >= 0 && index <= maxSlides) {
            currentIndex = index;
            updateSlider();
        }
    }

    function setupTouchEvents() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            track.style.transition = 'none';
        }, { passive: true });

        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            currentX = e.touches[0].clientX;
            const diffX = currentX - startX;
            const translateX = -currentIndex * (cardWidth * visibleCards) + diffX;
            track.style.transform = `translateX(${translateX}px)`;
        }, { passive: false });

        track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';

            const diffX = currentX - startX;
            const threshold = 100;

            if (diffX > threshold && currentIndex > 0) {
                currentIndex--;
            } else if (diffX < -threshold && currentIndex < maxSlides) {
                currentIndex++;
            }

            updateSlider();
        });
    }

    setupTouchEvents();

    window.addEventListener('resize', debounce(() => {
        visibleCards = getVisibleCards(track, cardWidth);
        maxSlides = Math.max(0, Math.ceil(cards.length / visibleCards) - 1);
        currentIndex = Math.min(currentIndex, maxSlides);
        updateSlider();
    }, 250));

    let autoSlideInterval;

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            if (currentIndex < maxSlides) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateSlider();
        }, 4000);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }

    const reviewsSection = document.querySelector('.reviews');
    if (reviewsSection) {
        reviewsSection.addEventListener('mouseenter', stopAutoSlide);
        reviewsSection.addEventListener('mouseleave', startAutoSlide);
    }

    document.addEventListener('keydown', (e) => {
        if (reviewsSection && reviewsSection.matches(':hover')) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                if (currentIndex > 0) {
                    currentIndex--;
                    updateSlider();
                }
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                if (currentIndex < maxSlides) {
                    currentIndex++;
                    updateSlider();
                }
            }
        }
    });

    updateSlider();
    startAutoSlide();

    return {
        goToSlide,
        getCurrentSlide: () => currentIndex,
        getTotalSlides: () => maxSlides + 1,
        startAutoSlide,
        stopAutoSlide
    };
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('Initializing reviews slider...');
    const reviewsSlider = initializeReviewsSlider();
    window.reviewsSlider = reviewsSlider;
    console.log('Reviews slider initialized successfully');
});