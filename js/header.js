function initializeHeaderScroll() {
    const header = document.querySelector('.header');
    const topBanner = document.querySelector('.top-banner');
    const body = document.body;

    let lastScrollY = 0;
    let ticking = false;

    function updateHeader() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            body.classList.add('scrolled');
            header.classList.add('scrolled');
        } else {
            body.classList.remove('scrolled');
            header.classList.remove('scrolled');
        }

        if (scrollY > 100) {
            if (scrollY > lastScrollY) {
                header.classList.add('hidden');
                if (topBanner) topBanner.classList.add('hidden');
            } else if (scrollY < lastScrollY - 5) {
                header.classList.remove('hidden');
                if (topBanner) topBanner.classList.remove('hidden');
            }
        } else {
            header.classList.remove('hidden');
            if (topBanner) topBanner.classList.remove('hidden');
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
    updateHeader();
}