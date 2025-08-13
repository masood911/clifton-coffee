// Optimized Products Management System
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
            description: 'Introducing El Vergel Estate, a vibrant new coffee from the Bayer family\'s innovative farm in Fresno, Tolima. This Red and Yellow Caturra variety.',
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
    '#f0f0f0'
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
    if (!productsGrid) {
        console.warn('Products grid not found');
        return;
    }

    const currentProducts = newProductsData[newProductsCurrentTab] || [];
    const startIndex = newProductsCurrentPage * newProductsItemsPerPage;
    const visibleProducts = currentProducts.slice(startIndex, startIndex + newProductsItemsPerPage);

    productsGrid.innerHTML = '';

    if (visibleProducts.length === 0) {
        productsGrid.innerHTML = '<div class="no-products">No products available in this category</div>';
        return;
    }

    visibleProducts.forEach((product, index) => {
        const productCard = createNewProductCard(product, startIndex + index);
        productsGrid.appendChild(productCard);

        // Animate cards in sequence
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
            <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
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
    const tabButtons = document.querySelectorAll('.tab-btn');
    if (tabButtons.length === 0) {
        console.warn('Tab buttons not found');
        return;
    }

    tabButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const tab = this.getAttribute('data-tab');
            if (tab) {
                handleNewProductsTabChange(tab);
            }
        });
    });

    // Initialize with first tab active
    if (tabButtons.length > 0) {
        tabButtons[0].classList.add('active');
    }

    window.addEventListener('resize', debounce(updateNewProductsItemsPerPage, 250));

    // Initial display
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

    // Touch/swipe support for mobile
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

    // Keyboard navigation
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

// Enhanced product card interactions
function initializeProductCardInteractions() {
    document.addEventListener('mouseenter', function (e) {
        if (e.target.closest('.product-card')) {
            const card = e.target.closest('.product-card');
            card.style.transform = 'translateY(-8px)';
            card.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
        }
    }, true);

    document.addEventListener('mouseleave', function (e) {
        if (e.target.closest('.product-card')) {
            const card = e.target.closest('.product-card');
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        }
    }, true);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    // Small delay to ensure all elements are properly loaded
    setTimeout(() => {
        initializeNewProductTabs();
        initializeNewProductNavigation();
        initializeProductCardInteractions();
    }, 100);
});

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeNewProductTabs,
        initializeNewProductNavigation,
        displayNewProducts,
        handleNewProductsTabChange
    };
}