// Collection Cards Hover Effects
function initializeCollectionCards() {
    const collectionCards = document.querySelectorAll('.collection-card');
    
    collectionCards.forEach(card => {
        const img = card.querySelector('.card-img');
        const defaultImg = card.getAttribute('data-default');
        const hoverImg = card.getAttribute('data-hover');
        
        if (defaultImg && hoverImg && img) {
            card.addEventListener('mouseenter', function() {
                img.src = hoverImg;
            });
            
            card.addEventListener('mouseleave', function() {
                img.src = defaultImg;
            });
        }
    });
}