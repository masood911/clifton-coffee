function initializeSmoothScrolling() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    const animatedSections = document.querySelectorAll('section');
    animatedSections.forEach(section => {
        observer.observe(section);
    });
}

function initializeTouchEvents() {
    let startY = 0;
    let endY = 0;

    const cartPanel = document.getElementById('cart-panel');
    if (cartPanel) {
        cartPanel.addEventListener('touchstart', function (e) {
            startY = e.touches[0].clientY;
        });

        cartPanel.addEventListener('touchend', function (e) {
            endY = e.changedTouches[0].clientY;

            if (startY - endY < -100) {
                cartPanel.classList.remove('active');
                document.getElementById('cart-overlay').classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}