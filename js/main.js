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