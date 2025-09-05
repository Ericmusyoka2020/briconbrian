// Contact form specific functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    initializeWhatsAppIntegration();
    initializeMapInteractions();
});

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateContactForm()) {
            submitContactForm();
        }
    });

    // Auto-resize textarea
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        messageTextarea.addEventListener('input', autoResizeTextarea);
    }
}

function validateContactForm() {
    const form = document.getElementById('contactForm');
    let isValid = true;

    // Clear previous errors
    clearAllContactErrors();

    // Required field validation
    const requiredFields = [
        { id: 'name', message: 'Full name is required' },
        { id: 'email', message: 'Email address is required' },
        { id: 'phone', message: 'Phone number is required' },
        { id: 'subject', message: 'Please select a subject' },
        { id: 'message', message: 'Please enter your message' }
    ];

    requiredFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element.value.trim()) {
            showContactFieldError(element, field.message);
            isValid = false;
        }
    });

    // Email validation
    const email = document.getElementById('email');
    if (email.value && !isValidEmail(email.value)) {
        showContactFieldError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Phone validation
    const phone = document.getElementById('phone');
    if (phone.value && !isValidPhone(phone.value)) {
        showContactFieldError(phone, 'Please enter a valid phone number');
        isValid = false;
    }

    // Message length validation
    const message = document.getElementById('message');
    if (message.value.trim().length < 10) {
        showContactFieldError(message, 'Please provide a more detailed message (at least 10 characters)');
        isValid = false;
    }

    return isValid;
}

function submitContactForm() {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('.form-submit');
    const originalText = submitButton.textContent;

    // Show loading state
    submitButton.classList.add('loading');
    submitButton.textContent = 'Sending Message...';
    submitButton.disabled = true;

    // Collect form data
    const formData = new FormData(form);
    const contactData = {};
    for (let [key, value] of formData.entries()) {
        contactData[key] = value;
    }

    // Simulate form submission
    setTimeout(() => {
        console.log('Contact form submitted:', contactData);
        
        // Remove loading state
        submitButton.classList.remove('loading');
        submitButton.textContent = originalText;
        submitButton.disabled = false;

        // Show success message
        showContactSuccessMessage(contactData);
        
        // Reset form
        form.reset();
        
        // Send confirmation (in real implementation)
        sendContactConfirmation(contactData);
    }, 2500);
}

function showContactSuccessMessage(data) {
    const message = document.createElement('div');
    message.className = 'message success';
    message.innerHTML = `
        <strong>Message Sent Successfully!</strong><br>
        Thank you ${data.name} for contacting bricon Building Company. We have received your inquiry about "${data.subject}" and will respond within 24 hours.<br>
        <em>We'll contact you at ${data.email} or ${data.phone}</em>
    `;
    
    const form = document.getElementById('contactForm');
    form.insertBefore(message, form.firstChild);
    
    // Scroll to success message
    message.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto-remove after 8 seconds
    setTimeout(() => {
        message.remove();
    }, 8000);
}

function sendContactConfirmation(contactData) {
    // In a real implementation, this would:
    // 1. Send data to your backend
    // 2. Send confirmation email to client
    // 3. Notify your team of new inquiry
    
    console.log('Contact confirmation would be sent:', {
        clientEmail: contactData.email,
        subject: `Contact Form Submission - ${contactData.subject}`,
        data: contactData,
        timestamp: new Date().toISOString()
    });
}

function initializeWhatsAppIntegration() {
    // WhatsApp contact buttons
    const whatsappButtons = document.querySelectorAll('[data-whatsapp]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const phoneNumber = this.getAttribute('data-whatsapp') || '+254116152971';
            const message = this.getAttribute('data-message') || 
                'Hello, I am interested in your construction services. Could you please provide more information?';
            
            const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    });

    // Add WhatsApp contact method if not already present
    addWhatsAppContactMethod();
}

function addWhatsAppContactMethod() {
    const whatsappMethod = document.querySelector('.contact-method:has([href*="wa.me"])');
    
    if (!whatsappMethod) {
        const contactMethods = document.querySelector('.contact-methods');
        if (contactMethods) {
            const whatsappDiv = document.createElement('div');
            whatsappDiv.className = 'contact-method';
            whatsappDiv.innerHTML = `
                <div class="contact-icon">💬</div>
                <div>
                    <h4>WhatsApp</h4>
                    <p><a href="https://wa.me/254116152971?text=Hello%2C%20I%20am%20interested%20in%20your%20construction%20services" target="_blank">+254 (0) 116 152 971</a></p>
                    <small>Quick responses during business hours</small>
                </div>
            `;
            contactMethods.appendChild(whatsappDiv);
        }
    }
}

function initializeMapInteractions() {
    const mapContainer = document.querySelector('.map-container');
    const mapOverlay = document.querySelector('.map-overlay');
    
    if (mapContainer) {
        // Prevent map interaction until clicked
        mapContainer.addEventListener('click', function() {
            const iframe = this.querySelector('iframe');
            if (iframe) {
                iframe.style.pointerEvents = 'auto';
            }
        });

        mapContainer.addEventListener('mouseleave', function() {
            const iframe = this.querySelector('iframe');
            if (iframe) {
                iframe.style.pointerEvents = 'none';
            }
        });
    }
}

function autoResizeTextarea(event) {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

function showContactFieldError(field, message) {
    clearContactFieldError(field);
    
    field.style.borderColor = 'var(--error-500)';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = 'var(--error-500)';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = 'var(--spacing-1)';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function clearContactFieldError(field) {
    field.style.borderColor = '';
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function clearAllContactErrors() {
    const errorElements = document.querySelectorAll('.field-error');
    errorElements.forEach(error => error.remove());
    
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Supports various phone formats including international
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Contact form auto-save functionality
function initializeContactAutoSave() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const inputs = form.querySelectorAll('input, select, textarea');
    
    // Load saved data
    loadSavedContactData();
    
    // Save data on input with debouncing
    inputs.forEach(input => {
        input.addEventListener('input', debounceContactSave);
    });
}

function saveContactData() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    localStorage.setItem('briconContactForm', JSON.stringify(data));
}

function loadSavedContactData() {
    const savedData = localStorage.getItem('briconContactForm');
    if (!savedData) return;

    try {
        const data = JSON.parse(savedData);
        Object.keys(data).forEach(key => {
            const field = document.getElementById(key);
            if (field && field.type !== 'submit') {
                field.value = data[key];
                
                // Trigger resize for textareas
                if (field.tagName === 'TEXTAREA') {
                    autoResizeTextarea({ target: field });
                }
            }
        });
    } catch (error) {
        console.warn('Error loading saved contact data:', error);
    }
}

function clearSavedContactData() {
    localStorage.removeItem('briconContactForm');
}

const debounceContactSave = debounce(saveContactData, 1000);

// Initialize contact auto-save
initializeContactAutoSave();

// Clear saved data after successful submission
document.addEventListener('contactSubmitted', function() {
    clearSavedContactData();
});

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

// Add click-to-call functionality
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="tel:"]')) {
        // Analytics tracking for phone calls (if needed)
        console.log('Phone call initiated:', e.target.href);
    }
});

// Add mailto functionality tracking
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="mailto:"]')) {
        // Analytics tracking for emails (if needed)
        console.log('Email initiated:', e.target.href);
    }
});