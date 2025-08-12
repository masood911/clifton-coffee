// Enhanced debounce function
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

// Sliders and Navigation - Main Function
function initializeSlidersAndNavigations() {
    initializeFavoritesSlider();
    initializeReviewsSlider();
    initializeCollectionsSlider();
    initializeInstagramSlider();
    initializeCapsulesSlider();
}

// Favorites Slider
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
    const cardWidth = 280 + 30; // card width + gap
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
        // Remove all existing dots
        dotsContainer.innerHTML = '';
        
        // Create new dots based on maxSlides
        for (let i = 0; i <= maxSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'favorites-dot';
            dot.setAttribute('data-slide', i);
            if (i === currentIndex) {
                dot.classList.add('active');
            }
            
            // Add click event listener
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
    
    // Navigation button events
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
    
    // Touch/Swipe functionality
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
    
    // Resize handler
    window.addEventListener('resize', debounce(() => {
        visibleCards = getVisibleCards(track, cardWidth);
        maxSlides = Math.max(0, Math.ceil(cards.length / visibleCards) - 1);
        currentIndex = Math.min(currentIndex, maxSlides);
        updateSlider();
        updateDots();
    }, 250));
    
    // Initialize
    updateSlider();
    updateDots();
    
    // Return control object
    return {
        goToSlide,
        getCurrentSlide: () => currentIndex,
        getTotalSlides: () => maxSlides + 1
    };
}


// Reviews Slider
function initializeReviewsSlider() {
    const track = document.getElementById('reviews-track');
    const prevBtn = document.getElementById('reviews-prev');
    const nextBtn = document.getElementById('reviews-next');
    const cards = document.querySelectorAll('.review-card');
    
    if (!track || !prevBtn || !nextBtn || cards.length === 0) return;
    
    let currentIndex = 0;
    const cardWidth = 350 + 40; // card width + gap
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

// Collections Slider
function initializeCollectionsSlider() {
    const track = document.getElementById('collections-track');
    const prevBtn = document.getElementById('collections-prev');
    const nextBtn = document.getElementById('collections-next');
    const dotsContainer = document.getElementById('collections-dots');
    const dots = document.querySelectorAll('#collections-dots .dot'); // Fixed selector
    const cards = document.querySelectorAll('.collection-card');
    
    if (!track || !prevBtn || !nextBtn || !dotsContainer || cards.length === 0) {
        console.error('Collections slider elements not found');
        return;
    }
    
    let currentIndex = 0;
    const cardWidth = 370; // Fixed card width
    let visibleCards = getVisibleCards();
    let maxSlides = Math.max(0, Math.ceil(cards.length / visibleCards) - 1); // Fixed calculation
    
    function getVisibleCards() {
        const containerWidth = track.parentElement.offsetWidth;
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return Math.floor(containerWidth / 295);
        if (window.innerWidth <= 1024) return Math.floor(containerWidth / 320);
        return Math.floor(containerWidth / 370);
    }
    
    function updateSlider() {
        // Calculate proper translation based on visible cards
        const translateX = -currentIndex * (cardWidth * visibleCards);
        track.style.transform = `translateX(${translateX}px)`;
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxSlides;
        
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex >= maxSlides ? '0.5' : '1';
        
        console.log(`Collections slider - Index: ${currentIndex}, MaxSlides: ${maxSlides}`);
    }
    
    function updateDots() {
        // Remove all existing dots
        dotsContainer.innerHTML = '';
        
        // Create new dots based on maxSlides
        for (let i = 0; i <= maxSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'dot';
            dot.setAttribute('data-slide', i);
            if (i === currentIndex) {
                dot.classList.add('active');
            }
            
            // Add click event listener
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
    
    // Navigation button events
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
    
    // Touch/Swipe functionality
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
    
    // Resize handler
    window.addEventListener('resize', debounce(() => {
        visibleCards = getVisibleCards();
        maxSlides = Math.max(0, Math.ceil(cards.length / visibleCards) - 1);
        currentIndex = Math.min(currentIndex, maxSlides);
        updateSlider();
        updateDots();
    }, 250));
    
    // Collection button click handlers
    document.querySelectorAll('.collection-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const collectionName = btn.closest('.collection-card').querySelector('.collection-title').textContent;
            showNotification(`Navigating to ${collectionName} collection!`, 'info');
        });
    });
    
    // Initialize
    updateSlider();
    updateDots();
    
    // Return control object
    return {
        goToSlide,
        getCurrentSlide: () => currentIndex,
        getTotalSlides: () => maxSlides + 1
    };
}

// Instagram Slider - Fixed with Proper Dots Navigation
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
    
    // Update slider position and dots
    function updateSlider() {
        const translateX = -currentSlide * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update dots active state
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        console.log(`Instagram slide updated to: ${currentSlide}`);
    }
    
    // Go to specific slide
    function goToSlide(index) {
        if (index >= 0 && index < slides.length) {
            currentSlide = index;
            updateSlider();
        }
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }
    
    // Auto slide functionality
    function startAutoSlide() {
        if (!isUserInteracting && !autoSlideInterval) {
            autoSlideInterval = setInterval(() => {
                nextSlide();
            }, 4000);
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
        
        // Resume auto slide after 6 seconds of no interaction
        setTimeout(() => {
            isUserInteracting = false;
            startAutoSlide();
        }, 6000);
    }
    
    // Dots click event listeners - MAIN FIX
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(`Instagram dot ${index} clicked`);
            goToSlide(index);
            handleUserInteraction();
        });
        
        // Add data attribute for easier debugging
        dot.setAttribute('data-slide', index);
    });
    
    // Touch/Swipe functionality
    let startX = 0;
    let endX = 0;
    let isDragging = false;
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        stopAutoSlide();
    }, { passive: true });
    
    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    }, { passive: false });
    
    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        const threshold = 50;
        
        isDragging = false;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        handleUserInteraction();
    });
    
    // Mouse events for hover pause
    const instaSection = document.querySelector('.instagram');
    if (instaSection) {
        instaSection.addEventListener('mouseenter', () => {
            isUserInteracting = true;
            stopAutoSlide();
        });
        
        instaSection.addEventListener('mouseleave', () => {
            isUserInteracting = false;
            setTimeout(() => {
                if (!isUserInteracting) {
                    startAutoSlide();
                }
            }, 1000);
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const instaSection = document.querySelector('.instagram');
        if (instaSection && (instaSection.matches(':hover') || document.activeElement.closest('.instagram'))) {
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
                e.preventDefault();
                prevSlide();
                handleUserInteraction();
            } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
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
    
    // Visibility change handling
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoSlide();
        } else if (!isUserInteracting) {
            setTimeout(() => {
                startAutoSlide();
            }, 1000);
        }
    });
    
    // Intersection Observer for performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!isUserInteracting) {
                    startAutoSlide();
                }
            } else {
                stopAutoSlide();
            }
        });
    }, { threshold: 0.5 });
    
    if (instaSection) {
        observer.observe(instaSection);
    }
    
    // Initialize
    updateSlider();
    
    // Start auto slide after a brief delay
    setTimeout(() => {
        if (!isUserInteracting) {
            startAutoSlide();
        }
    }, 2000);
    
    // Return control object for external access
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

// Capsules Vertical Slider
function initializeCapsulesSlider() {
    const imageTrack = document.getElementById('capsules-slider-track');
    const textTrack = document.getElementById('capsules-text-track');
    const dots = document.querySelectorAll('.capsules-dot');
    const imageSlides = document.querySelectorAll('#capsules-slider-track .slide');
    const textSlides = document.querySelectorAll('.capsules-text-slide');
    
    if (!imageTrack || !textTrack || !dots.length || !imageSlides.length || !textSlides.length) return;
    
    let currentSlide = 0;
    let autoSlideInterval;
    
    function updateSliders() {
        const translateY = -currentSlide * 100;
        
        imageTrack.style.transform = `translateY(${translateY}%)`;
        textTrack.style.transform = `translateY(${translateY}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        textSlides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
    }
    
    function goToSlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < imageSlides.length) {
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
        autoSlideInterval = setInterval(nextSlide, 8000);
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopAutoSlide();
            setTimeout(startAutoSlide, 8000);
        });
    });
    
    const capsulesSection = document.querySelector('.capsules-section');
    if (capsulesSection) {
        capsulesSection.addEventListener('mouseenter', stopAutoSlide);
        capsulesSection.addEventListener('mouseleave', startAutoSlide);
    }
    
    let startY = 0;
    let endY = 0;
    
    [imageTrack, textTrack].forEach(track => {
        track.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            stopAutoSlide();
        }, { passive: true });
        
        track.addEventListener('touchend', (e) => {
            endY = e.changedTouches[0].clientY;
            const diffY = startY - endY;
            const threshold = 50;
            
            if (Math.abs(diffY) > threshold) {
                if (diffY > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            
            setTimeout(startAutoSlide, 5000);
        });
    });
    
    document.addEventListener('keydown', (e) => {
        if (document.querySelector('.capsules-section:hover')) {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                prevSlide();
                stopAutoSlide();
                setTimeout(startAutoSlide, 8000);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                nextSlide();
                stopAutoSlide();
                setTimeout(startAutoSlide, 8000);
            }
        }
    });
    
    updateSliders();
    startAutoSlide();
    
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }   
    });
}

// Notification function (if not already defined elsewhere)
function showNotification(message, type = 'info') {
    console.log(`${type.toUpperCase()}: ${message}`);
    // Add your notification implementation here
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing all sliders...');
    initializeSlidersAndNavigations();
    
    // Store Instagram slider reference globally for debugging
    const instagramSlider = initializeInstagramSlider();
    window.instagramSlider = instagramSlider;
    
    console.log('All sliders initialized successfully');
});

// Alternative initialization if DOMContentLoaded already fired
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
            const cardWidth = 350 + 40; // card width + gap
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
                // Remove all existing dots
                dotsContainer.innerHTML = '';
                
                // Create new dots based on maxSlides
                for (let i = 0; i <= maxSlides; i++) {
                    const dot = document.createElement('button');
                    dot.className = 'reviews-dot';
                    dot.setAttribute('data-slide', i);
                    if (i === currentIndex) {
                        dot.classList.add('active');
                    }
                    
                    // Add click event listener
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
            
            // Touch/Swipe functionality
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
            
            // Resize handler
            window.addEventListener('resize', debounce(() => {
                visibleCards = getVisibleCards(track, cardWidth);
                maxSlides = Math.max(0, Math.ceil(cards.length / visibleCards) - 1);
                currentIndex = Math.min(currentIndex, maxSlides);
                updateSlider();
            }, 250));
            
            // Auto-slide functionality
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
            
            // Mouse hover events
            const reviewsSection = document.querySelector('.reviews');
            if (reviewsSection) {
                reviewsSection.addEventListener('mouseenter', stopAutoSlide);
                reviewsSection.addEventListener('mouseleave', startAutoSlide);
            }
            
            // Keyboard navigation
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
            
            // Initialize
            updateSlider();
            startAutoSlide();
            
            // Return control object
            return {
                goToSlide,
                getCurrentSlide: () => currentIndex,
                getTotalSlides: () => maxSlides + 1,
                startAutoSlide,
                stopAutoSlide
            };
        }

        // Initialize when DOM is ready
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Initializing reviews slider...');
            const reviewsSlider = initializeReviewsSlider();
            window.reviewsSlider = reviewsSlider;
            console.log('Reviews slider initialized successfully');
        });