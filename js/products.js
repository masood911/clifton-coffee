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