function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    let isMenuOpen = false;

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function () {
            isMenuOpen = !isMenuOpen;

            if (isMenuOpen) {
                mobileMenuBtn.classList.add('active');
                mobileNav.classList.add('active');
                if (mobileNavOverlay) mobileNavOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                if (mobileNavOverlay) mobileNavOverlay.classList.remove('active');
                document.body.style.overflow = '';

                const mobileTriggers = document.querySelectorAll('.mobile-nav-trigger');
                const mobileDropdowns = document.querySelectorAll('.mobile-nav-dropdown');

                mobileTriggers.forEach(trigger => trigger.classList.remove('active'));
                mobileDropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            }
        });

        if (mobileNavOverlay) {
            mobileNavOverlay.addEventListener('click', function () {
                isMenuOpen = false;
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        window.addEventListener('resize', function () {
            if (window.innerWidth > 768 && isMenuOpen) {
                isMenuOpen = false;
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                if (mobileNavOverlay) mobileNavOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

function initializeMobileNavDropdowns() {
    const mobileTriggers = document.querySelectorAll('.mobile-nav-trigger');

    mobileTriggers.forEach(trigger => {
        trigger.addEventListener('click', function () {
            const dropdown = this.parentElement.querySelector('.mobile-nav-dropdown');
            const arrow = this.querySelector('.mobile-arrow');

            if (dropdown) {
                const isActive = this.classList.contains('active');

                mobileTriggers.forEach(otherTrigger => {
                    if (otherTrigger !== this) {
                        otherTrigger.classList.remove('active');
                        const otherDropdown = otherTrigger.parentElement.querySelector('.mobile-nav-dropdown');
                        if (otherDropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    }
                });

                if (isActive) {
                    this.classList.remove('active');
                    dropdown.classList.remove('active');
                } else {
                    this.classList.add('active');
                    dropdown.classList.add('active');
                }
            }
        });
    });
}