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