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


function initializeCollectionCards() {
    const collectionCards = document.querySelectorAll('.collection-card');

    collectionCards.forEach(card => {
        const img = card.querySelector('.card-img');
        const defaultImg = card.getAttribute('data-default');
        const hoverImg = card.getAttribute('data-hover');

        if (defaultImg && hoverImg && img) {
            card.addEventListener('mouseenter', function () {
                img.src = hoverImg;
            });

            card.addEventListener('mouseleave', function () {
                img.src = defaultImg;
            });
        }
    });
}

function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = this.querySelector('.newsletter-input').value;

            if (isValidEmail(email)) {
                showNotification('Thank you for subscribing!', 'success');
                this.querySelector('.newsletter-input').value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

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

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initializeHeaderScroll();
    initializeSlidersAndNavigations();
    initializeMegaMenu();
    initializeNewProductTabs();
    initializeCollectionCards();
    initializeNewsletterForm();
    initializeNewProductNavigation();
    initializeSmoothScrolling();
    initializeMobileMenu();
    initializeSearchOverlay();
    initializeCartPanel();
    initializeResponsive();
    initializeMobileNavDropdowns();
    initializeCapsulesSlider();
    initializeInstagramSlider();
    initializeScrollAnimations();
    initializeTouchEvents();
    initializePerformanceMonitoring();
});

// Add CSS for scroll animations
const additionalStyles = `
    <style>
        section {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        section.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hero {
            opacity: 1;
            transform: none;
        }
        
        @media (prefers-reduced-motion: reduce) {
            section {
                opacity: 1;
                transform: none;
                transition: none;
            }
            
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
        
        .nav-icon:focus,
        .tab-btn:focus,
        .collection-btn:focus,
        .hero-btn:focus,
        .btn-primary:focus {
            outline: 2px solid #4A90E2;
            outline-offset: 2px;
        }
        
        @media (prefers-contrast: high) {
            .collection-overlay {
                background: rgba(0, 0, 0, 0.8);
            }
            
            .hero-overlay {
                background: rgba(0, 0, 0, 0.7);
            }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Service worker registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to register service worker
        // navigator.serviceWorker.register('/sw.js').catch(function(err) {
        //     console.log('ServiceWorker registration failed: ', err);
        // });
    });
}

function initializeMegaMenu() {
    const megaMenuData = {
        christmas: {
            title: 'Christmas Collection',
            links: ['Christmas Blends', 'Gift Sets', 'Seasonal Specials', 'Holiday Bundles', 'Advent Calendars'],
            featured: [
                {
                    title: 'Christmas Blend',
                    subtitle: 'Limited Edition',
                    image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=400&h=300&fit=crop'
                },
                {
                    title: 'Holiday Gift Set',
                    subtitle: 'Perfect for Gifting',
                    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop'
                }
            ]
        },
        coffee: {
            title: 'Coffee Selection',
            links: ['Single Origin', 'House Blends', 'Decaf Options', 'Cold Brew', 'Espresso'],
            featured: [
                {
                    title: 'Ethiopian Single Origin',
                    subtitle: 'Bright & Floral',
                    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop'
                },
                {
                    title: 'House Blend',
                    subtitle: 'Perfectly Balanced',
                    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop'
                }
            ]
        },
        subscriptions: {
            title: 'Coffee Subscriptions',
            links: ['Weekly Delivery', 'Monthly Box', 'Quarterly Selection', 'Custom Plan'],
            featured: [
                {
                    title: 'Subscription Box',
                    subtitle: 'Never Run Out of Coffee',
                    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop'
                },
                {
                    title: 'Gift Subscription',
                    subtitle: 'Perfect for Coffee Lovers',
                    image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=400&h=300&fit=crop'
                }
            ]
        },
        accessories: {
            title: 'Coffee Accessories',
            links: ['Brewing Equipment', 'Mugs & Cups', 'Coffee Grinders', 'Filters & Papers', 'Storage Solutions'],
            featured: [
                {
                    title: 'Pour Over Set',
                    subtitle: 'Complete Brewing Kit',
                    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop'
                },
                {
                    title: 'Coffee Grinder',
                    subtitle: 'Precision Grinding',
                    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=400&h=300&fit=crop'
                }
            ]
        }
    };

    const navItems = document.querySelectorAll('.nav-item[data-menu]');
    const megaMenu = document.getElementById('mega-menu');
    const megaMenuTitle = megaMenu?.querySelector('.mega-menu-title');
    const megaMenuList = megaMenu?.querySelector('.mega-menu-list');
    const featuredItems = megaMenu?.querySelectorAll('.featured-item');

    let menuTimeout;

    function initDesktopMegaMenu() {
        if (window.innerWidth <= 768) return;

        navItems.forEach(item => {
            item.addEventListener('mouseenter', function () {
                const menuType = this.getAttribute('data-menu');
                if (menuType && megaMenuData[menuType]) {
                    clearTimeout(menuTimeout);
                    showMegaMenu(menuType);
                }
            });

            item.addEventListener('mouseleave', function () {
                menuTimeout = setTimeout(() => {
                    if (!megaMenu?.matches(':hover')) {
                        hideMegaMenu();
                    }
                }, 200);
            });
        });

        if (megaMenu) {
            megaMenu.addEventListener('mouseenter', function () {
                clearTimeout(menuTimeout);
            });

            megaMenu.addEventListener('mouseleave', function () {
                hideMegaMenu();
            });
        }
    }

    function showMegaMenu(menuType) {
        if (window.innerWidth <= 768 || !megaMenu) return;

        const data = megaMenuData[menuType];
        if (!data) return;

        if (megaMenuTitle) {
            megaMenuTitle.textContent = data.title;
        }

        if (megaMenuList) {
            megaMenuList.innerHTML = '';
            data.links.forEach(link => {
                const listItem = document.createElement('li');
                const linkElement = document.createElement('a');
                linkElement.href = '#';
                linkElement.textContent = link;
                listItem.appendChild(linkElement);
                megaMenuList.appendChild(listItem);
            });
        }

        if (featuredItems) {
            featuredItems.forEach((item, index) => {
                if (data.featured[index]) {
                    const featured = data.featured[index];
                    const img = item.querySelector('.featured-image');
                    const title = item.querySelector('.featured-title');
                    const subtitle = item.querySelector('.featured-subtitle');

                    if (img) {
                        img.src = featured.image;
                        img.alt = featured.title;
                    }
                    if (title) title.textContent = featured.title;
                    if (subtitle) subtitle.textContent = featured.subtitle;
                }
            });
        }

        megaMenu.classList.add('active');
    }

    function hideMegaMenu() {
        if (megaMenu) {
            megaMenu.classList.remove('active');
        }
    }

    initDesktopMegaMenu();

    window.addEventListener('resize', debounce(function () {
        hideMegaMenu();
        initDesktopMegaMenu();
    }, 250));
}

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

const newProductsData = {
    coffee: [
        {
            id: 1,
            name: 'Panama Coffee',
            price: '£15.50',
            description: 'Introducing El Vergel Estate, a vibrant new coffee from the Bayer family\'s innovative farm in Fresno, Tolima. This Red and Yellow Caturra variety.',
            image: './images/packet 1.png'
        },
        {
            id: 2,
            name: 'Peru Coffee',
            price: '£13.50',
            description: 'Introducing El Vergel Estate, a vibrant new coffee from the Bayer family\'s innovative farm in Fresno, Tolima. This Red and Yellow Caturra variety.',
            image: './images/packet 1 (1).png'
        },
        {
            id: 3,
            name: 'Colombian Supremo',
            price: '£11.50',
            description: 'Introducing El Vergel Estate, a vibrant new coffee from the Bayer family\'s innovative farm in Fresno, Tolima. This Red and Yellow Caturra variety',
            image: './images/packet 8.png'
        },
        {
            id: 4,
            name: 'Brazil Santos',
            price: '£9.50',
            description: 'Introducing El Vergel Estate, a vibrant new coffee from the Bayer family\'s innovative farm in Fresno, Tolima. This Red and Yellow Caturra variety',
            image: './images/packet 9.png'
        },
        {
            id: 5,
            name: 'Ethiopian Yirgacheffe',
            price: '£17.50',
            description: 'Introducing El Vergel Estate, a vibrant new coffee from the Bayer family\'s innovative farm in Fresno, Tolima. This Red and Yellow Caturra variety',
            image: './images/packet 1 (1).png'
        },
        {
            id: 6,
            name: 'Guatemala Antigua',
            price: '£14.50',
            description: 'Introducing El Vergel Estate, a vibrant new coffee from the Bayer family\'s innovative farm in Fresno, Tolima. This Red and Yellow Caturra variety',
            image: './images/packet 8.png'
        }
    ],
    capsule: [
        {
            id: 7,
            name: 'Espresso Capsules',
            price: '£8.00',
            description: 'Introducing El Vergel Estate, a vibrant new coffee from the Bayer family\'s innovative farm in Fresno, Tolima. This Red and Yellow Caturra variety',
            image: './images/capsule-image 1.png'
        },
        {
            id: 8,
            name: 'Lungo Capsules',
            price: '£8.50',
            description: 'Introducing El Vergel Estate, a vibrant new coffee from the Bayer family\'s innovative farm in Fresno, Tolima. This Red and Yellow Caturra variety',
            image: './images/capsule-image 1.png'
        },
        {
            id: 9,
            name: 'Decaf Capsules',
            price: '£7.50',
            description: 'Introducing El Vergel Estate, a vibrant new coffee from the Bayer family\'s innovative farm in Fresno, Tolima. This Red and Yellow Caturra variety',
            image: './images/AprilSubs1-1024x435.png'
        },
        {
            id: 10,
            name: 'Variety Pack',
            price: '£12.00',
            description: 'Introducing El Vergel Estate, a vibrant new coffee from the Bayer family\'s innovative farm in Fresno, Tolima. This Red and Yellow Caturra variety',
            image: './images/5 (1).png'
        }
    ],
    all: [
        {
            id: 1,
            name: 'Panama Coffee',
            price: '£15.50',
            description: 'Introducing El Vergel Estate, a vibrant new coffee from the Bayer family\'s innovative farm in Fresno, Tolima. This Red and Yellow Caturra variety',
            image: './images/packet 1.png'
        },
        {
            id: 7,
            name: 'Espresso Capsules',
            price: '£8.00',
            description: 'Introducing El Vergel Estate, a vibrant new coffee from the Bayer family\'s innovative farm in Fresno, Tolima. This Red and Yellow Caturra variety',
            image: './images/capsule-image 1.png'
        },
        {
            id: 11,
            name: 'Coffee Grinder',
            price: '£85.00',
            description: 'Introducing El Vergel Estate, a vibrant new coffee from the Bayer family\'s innovative farm in Fresno, Tolima. This Red and Yellow Caturra variety',
            image: './images/6.png'
        },
        {
            id: 3,
            name: 'Colombian Supremo',
            price: '£11.50',
            description: 'Introducing El Vergel Estate, a vibrant new coffee from the Bayer family\'s innovative farm in Fresno, Tolima. This Red and Yellow Caturra variety',
            image: './images/coffee.png'
        }
    ]
};

const cardColors = [
    '#d6dbda',
    '#d3d3cb',
    '#e3f5f6ff',
    '#eaefffff',
    '#d3d3cb',
    '#E0F2F1',
    '#d6dbda',
    'rgba(230, 221, 224, 1)',
    '#E3F2FD',
    '#F1F8E9',
    '#fff5d3ff',
    '#='
];

let newProductsCurrentTab = 'coffee';
let newProductsCurrentPage = 0;
let newProductsItemsPerPage = getNewProductsItemsPerPage();

function getNewProductsItemsPerPage() {
    return window.innerWidth <= 768 ? 1 : 2;
}

function updateNewProductsItemsPerPage() {
    const newItemsPerPage = getNewProductsItemsPerPage();
    if (newItemsPerPage !== newProductsItemsPerPage) {
        newProductsItemsPerPage = newItemsPerPage;
        newProductsCurrentPage = 0;
        displayNewProducts();
        updateNewProductsNavigation();
    }
}

function displayNewProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    const currentProducts = newProductsData[newProductsCurrentTab] || [];
    const startIndex = newProductsCurrentPage * newProductsItemsPerPage;
    const visibleProducts = currentProducts.slice(startIndex, startIndex + newProductsItemsPerPage);

    productsGrid.innerHTML = '';

    visibleProducts.forEach((product, index) => {
        const productCard = createNewProductCard(product, startIndex + index);
        productsGrid.appendChild(productCard);

        setTimeout(() => {
            productCard.style.opacity = '1';
            productCard.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function createNewProductCard(product, displayIndex) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';

    const colorIndex = (product.id - 1) % cardColors.length;
    card.style.backgroundColor = cardColors[colorIndex];
    card.style.borderRadius = '12px';
    card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    card.style.border = '1px solid rgba(0,0,0,0.1)';
    card.style.overflow = 'hidden';

    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" class="product-img">
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">${product.price}</div>
        </div>
    `;

    return card;
}

function updateNewProductsNavigation() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (!prevBtn || !nextBtn) return;

    const currentProducts = newProductsData[newProductsCurrentTab] || [];
    const totalPages = Math.ceil(currentProducts.length / newProductsItemsPerPage);

    prevBtn.disabled = newProductsCurrentPage === 0;
    nextBtn.disabled = newProductsCurrentPage >= totalPages - 1;

    prevBtn.style.opacity = newProductsCurrentPage === 0 ? '0.3' : '1';
    nextBtn.style.opacity = newProductsCurrentPage >= totalPages - 1 ? '0.3' : '1';
}

function handleNewProductsTabChange(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    const activeTab = document.querySelector(`[data-tab="${tab}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }

    newProductsCurrentTab = tab;
    newProductsCurrentPage = 0;

    displayNewProducts();
    updateNewProductsNavigation();
}

function handleNewProductsPrevPage() {
    if (newProductsCurrentPage > 0) {
        newProductsCurrentPage--;
        displayNewProducts();
        updateNewProductsNavigation();
    }
}

function handleNewProductsNextPage() {
    const currentProducts = newProductsData[newProductsCurrentTab] || [];
    const totalPages = Math.ceil(currentProducts.length / newProductsItemsPerPage);

    if (newProductsCurrentPage < totalPages - 1) {
        newProductsCurrentPage++;
        displayNewProducts();
        updateNewProductsNavigation();
    }
}

function initializeNewProductTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const tab = this.getAttribute('data-tab');
            if (tab) {
                handleNewProductsTabChange(tab);
            }
        });
    });

    window.addEventListener('resize', debounce(updateNewProductsItemsPerPage, 250));

    displayNewProducts();
    updateNewProductsNavigation();
}

function initializeNewProductNavigation() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', handleNewProductsPrevPage);
        nextBtn.addEventListener('click', handleNewProductsNextPage);
    }

    let startX = 0;
    let endX = 0;

    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) {
        productsGrid.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
        });

        productsGrid.addEventListener('touchend', function (e) {
            endX = e.changedTouches[0].clientX;
            handleNewProductsSwipe();
        });
    }

    function handleNewProductsSwipe() {
        const threshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                handleNewProductsNextPage();
            } else {
                handleNewProductsPrevPage();
            }
        }
    }

    document.addEventListener('keydown', function (e) {
        if (e.target.closest('.products-section')) {
            if (e.key === 'ArrowLeft') {
                handleNewProductsPrevPage();
            } else if (e.key === 'ArrowRight') {
                handleNewProductsNextPage();
            }
        }
    });
}

function initializeProductSlider() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const productsGrid = document.getElementById('products-grid');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    let currentSlide = 0;
    let currentCategory = 'coffee';
    let currentProducts = [];
    const itemsPerSlide = 2;

    function createProductCard(product) {

        const colorIndex = (product.id - 1) % cardColors.length;
        const backgroundColor = cardColors[colorIndex];

        return `
            <div class="product-card" style="background-color: ${backgroundColor}; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border: 1px solid rgba(0,0,0,0.1); overflow: hidden;">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" class="product-img">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">${product.price}</p>
                </div>
            </div>
        `;
    }

    function updateSlider() {
        const startIndex = currentSlide * itemsPerSlide;
        const endIndex = startIndex + itemsPerSlide;
        const productsToShow = currentProducts.slice(startIndex, endIndex);

        productsGrid.innerHTML = productsToShow.map(product => createProductCard(product)).join('');

        const totalSlides = Math.ceil(currentProducts.length / itemsPerSlide);
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide >= totalSlides - 1;

        console.log(`Current slide: ${currentSlide + 1}/${totalSlides}`);
    }

    function showCategory(category) {
        currentCategory = category;
        currentSlide = 0;

        if (category === 'all') {
            currentProducts = [...newProductsData.coffee, ...newProductsData.capsule];
        } else {
            currentProducts = newProductsData[category] || [];
        }

        updateSlider();
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {

            tabButtons.forEach(btn => btn.classList.remove('active'));

            button.classList.add('active');

            const category = button.getAttribute('data-tab');
            showCategory(category);
        });
    });

    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    });

    nextBtn.addEventListener('click', () => {
        const totalSlides = Math.ceil(currentProducts.length / itemsPerSlide);
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlider();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.target.closest('.products-section')) {
            const totalSlides = Math.ceil(currentProducts.length / itemsPerSlide);

            if (e.key === 'ArrowLeft' && currentSlide > 0) {
                e.preventDefault();
                currentSlide--;
                updateSlider();
            } else if (e.key === 'ArrowRight' && currentSlide < totalSlides - 1) {
                e.preventDefault();
                currentSlide++;
                updateSlider();
            }
        }
    });

    showCategory('coffee');
}

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

document.addEventListener('DOMContentLoaded', function () {
    initializeProductSlider();
    initializeNewProductTabs();
    initializeNewProductNavigation();

    document.addEventListener('mouseenter', function (e) {
        if (e.target.closest('.product-card')) {
            e.target.closest('.product-card').style.transform = 'translateY(-8px)';
            e.target.closest('.product-card').style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
        }
    }, true);

    document.addEventListener('mouseleave', function (e) {
        if (e.target.closest('.product-card')) {
            e.target.closest('.product-card').style.transform = 'translateY(0)';
            e.target.closest('.product-card').style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        }
    }, true);
});

function initializeSearchOverlay() {
    const searchBtn = document.getElementById('search-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');

    if (searchBtn && searchOverlay && searchClose && searchInput) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            searchOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';

            setTimeout(() => {
                searchInput.focus();
            }, 300);
        });

        searchClose.addEventListener('click', function() {
            closeSearchOverlay();
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                closeSearchOverlay();
            }
        });

        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) {
                closeSearchOverlay();
            }
        });

        const searchContainer = document.querySelector('.search-container');
        if (searchContainer) {
            searchContainer.addEventListener('submit', function(e) {
                e.preventDefault();
                const query = searchInput.value.trim();
                if (query) {
                    console.log('Searching for:', query);
                    showNotification('Search functionality coming soon!', 'info');
                    closeSearchOverlay();
                }
            });
        }

        function closeSearchOverlay() {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
            searchInput.value = '';
        }
    }
}

function initializeCartPanel() {
    const cartBtn = document.getElementById('cart-btn');
    const cartPanel = document.getElementById('cart-panel');
    const cartClose = document.getElementById('cart-close');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartContinueBtn = document.querySelector('.cart-continue-btn');

    if (cartBtn && cartPanel && cartClose && cartOverlay) {
        cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            cartPanel.classList.add('active');
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        function closeCartPanel() {
            cartPanel.classList.remove('active');
            cartOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        cartClose.addEventListener('click', closeCartPanel);
        cartOverlay.addEventListener('click', closeCartPanel);

        if (cartContinueBtn) {
            cartContinueBtn.addEventListener('click', closeCartPanel);
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && cartPanel.classList.contains('active')) {
                closeCartPanel();
            }
        });
    }
}
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

// Performance optimization: Debounce function
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

// Enhanced notification system
function showNotification(message, type) {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    const bgColor = type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        background: ${bgColor};
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Responsive functionality
function initializeResponsive() {
    window.addEventListener('resize', debounce(function() {
        // Close mobile menu if window becomes larger
        if (window.innerWidth > 768) {
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const mobileNav = document.getElementById('mobile-nav');
            
            if (mobileMenuBtn && mobileNav) {
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        // Close overlays on resize
        const searchOverlay = document.getElementById('search-overlay');
        const cartPanel = document.getElementById('cart-panel');
        const cartOverlay = document.getElementById('cart-overlay');
        
        if (searchOverlay && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        if (cartPanel && cartPanel.classList.contains('active')) {
            cartPanel.classList.remove('active');
            cartOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 250));
}

// Performance monitoring
function initializePerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
        // Implement web vitals monitoring if needed
    }
    
    // Monitor page load performance
    window.addEventListener('load', function() {
        setTimeout(function() {
            const navigation = performance.getEntriesByType('navigation')[0];
            if (navigation) {
                console.log('Page load time:', navigation.loadEventEnd - navigation.fetchStart, 'ms');
            }
        }, 0);
    });
}