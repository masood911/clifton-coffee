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