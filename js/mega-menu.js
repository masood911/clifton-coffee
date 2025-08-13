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