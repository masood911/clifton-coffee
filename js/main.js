// Main Application Initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Clifton Coffee website...');
    
    // Initialize all functionality with error handling
    try {
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
        
        console.log('All functionality initialized successfully');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

// Add CSS for scroll animations and performance optimizations
const additionalStyles = `
    <style>
        /* Performance optimizations */
        * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        /* Smooth section animations */
        section {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
            will-change: opacity, transform;
        }
        
        section.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hero {
            opacity: 1;
            transform: none;
        }
        
        /* Product cards optimization */
        .product-card {
            will-change: transform, box-shadow;
            backface-visibility: hidden;
        }
        
        /* Reduce motion for accessibility */
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
        
        /* Focus styles for accessibility */
        .nav-icon:focus,
        .tab-btn:focus,
        .collection-btn:focus,
        .hero-btn:focus,
        .btn-primary:focus {
            outline: 2px solid #4A90E2;
            outline-offset: 2px;
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
            .collection-overlay {
                background: rgba(0, 0, 0, 0.8);
            }
            
            .hero-overlay {
                background: rgba(0, 0, 0, 0.7);
            }
        }
        
        /* Loading states */
        .loading {
            opacity: 0.6;
            pointer-events: none;
        }
        
        /* Error states */
        .error {
            border-color: #f44336;
            background-color: #ffebee;
        }
        
        /* Success states */
        .success {
            border-color: #4caf50;
            background-color: #e8f5e8;
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Service worker registration for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to register service worker when ready
        // navigator.serviceWorker.register('/sw.js').catch(function(err) {
        //     console.log('ServiceWorker registration failed: ', err);
        // });
    });
}

// Performance monitoring and error tracking
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
                const loadTime = navigation.loadEventEnd - navigation.fetchStart;
                console.log('Page load time:', loadTime, 'ms');
                
                // Log performance warnings
                if (loadTime > 3000) {
                    console.warn('Page load time is slow:', loadTime, 'ms');
                }
            }
        }, 0);
    });
    
    // Monitor JavaScript errors
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
    });
    
    // Monitor unhandled promise rejections
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
    });
}

// Global utility functions
window.CliftonUtils = {
    // Show loading state
    showLoading: function(element) {
        if (element) {
            element.classList.add('loading');
        }
    },
    
    // Hide loading state
    hideLoading: function(element) {
        if (element) {
            element.classList.remove('loading');
        }
    },
    
    // Show error state
    showError: function(element, message) {
        if (element) {
            element.classList.add('error');
            element.setAttribute('title', message);
        }
    },
    
    // Clear error state
    clearError: function(element) {
        if (element) {
            element.classList.remove('error');
            element.removeAttribute('title');
        }
    },
    
    // Debounce function for performance
    debounce: function(func, wait) {
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
};