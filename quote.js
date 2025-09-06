// Quote form specific functionality

// Simple quote form functionality
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.quote-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            // Let Formspree handle the submission
            const submitButton = form.querySelector('.form-submit');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;
            
            // Re-enable button after a delay (in case of errors)
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 5000);
        });
    }
});