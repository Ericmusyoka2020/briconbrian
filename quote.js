// Quote form specific functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeQuoteForm();
    initializeBudgetCalculator();
});

function initializeQuoteForm() {
    const quoteForm = document.getElementById('quoteForm');
    
    if (!quoteForm) return;

    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateQuoteForm()) {
            submitQuoteForm();
        }
    });

    // Dynamic form updates
    const projectTypeSelect = document.getElementById('projectType');
    if (projectTypeSelect) {
        projectTypeSelect.addEventListener('change', updateFormBasedOnProjectType);
    }
}

function validateQuoteForm() {
    const form = document.getElementById('quoteForm');
    let isValid = true;

    // Clear previous errors
    clearAllErrors();

    // Required field validation
    const requiredFields = [
        { id: 'firstName', message: 'First name is required' },
        { id: 'lastName', message: 'Last name is required' },
        { id: 'email', message: 'Email address is required' },
        { id: 'phone', message: 'Phone number is required' },
        { id: 'projectType', message: 'Please select a project type' },
        { id: 'projectLocation', message: 'Project location is required' },
        { id: 'projectDescription', message: 'Project description is required' }
    ];

    requiredFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element.value.trim()) {
            showFieldError(element, field.message);
            isValid = false;
        }
    });

    // Email validation
    const email = document.getElementById('email');
    if (email.value && !isValidEmail(email.value)) {
        showFieldError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Phone validation
    const phone = document.getElementById('phone');
    if (phone.value && !isValidPhone(phone.value)) {
        showFieldError(phone, 'Please enter a valid phone number');
        isValid = false;
    }

    // Terms acceptance
    const terms = document.getElementById('terms');
    if (!terms.checked) {
        showFieldError(terms, 'You must agree to the terms and conditions');
        isValid = false;
    }

    return isValid;
}

function updateFormBasedOnProjectType() {
    const projectType = document.getElementById('projectType').value;
    const budgetSelect = document.getElementById('budget');
    
    // Update budget ranges based on project type
    const budgetRanges = {
        'residential-new': [
            { value: 'under-50k', text: 'Under $50,000' },
            { value: '50k-100k', text: '$50,000 - $100,000' },
            { value: '100k-250k', text: '$100,000 - $250,000' },
            { value: '250k-500k', text: '$250,000 - $500,000' },
            { value: 'over-500k', text: 'Over $500,000' }
        ],
        'commercial-new': [
            { value: 'under-100k', text: 'Under $100,000' },
            { value: '100k-500k', text: '$100,000 - $500,000' },
            { value: '500k-1m', text: '$500,000 - $1,000,000' },
            { value: '1m-5m', text: '$1,000,000 - $5,000,000' },
            { value: 'over-5m', text: 'Over $5,000,000' }
        ],
        'architectural': [
            { value: 'under-5k', text: 'Under $5,000' },
            { value: '5k-15k', text: '$5,000 - $15,000' },
            { value: '15k-30k', text: '$15,000 - $30,000' },
            { value: '30k-50k', text: '$30,000 - $50,000' },
            { value: 'over-50k', text: 'Over $50,000' }
        ]
    };

    const defaultRanges = [
        { value: 'under-25k', text: 'Under $25,000' },
        { value: '25k-50k', text: '$25,000 - $50,000' },
        { value: '50k-100k', text: '$50,000 - $100,000' },
        { value: '100k-250k', text: '$100,000 - $250,000' },
        { value: '250k-500k', text: '$250,000 - $500,000' },
        { value: 'over-500k', text: 'Over $500,000' }
    ];

    const ranges = budgetRanges[projectType] || defaultRanges;
    
    // Clear current options (keep the first default option)
    while (budgetSelect.children.length > 1) {
        budgetSelect.removeChild(budgetSelect.lastChild);
    }

    // Add new options
    ranges.forEach(range => {
        const option = document.createElement('option');
        option.value = range.value;
        option.textContent = range.text;
        budgetSelect.appendChild(option);
    });
}

function initializeBudgetCalculator() {
    // Simple budget estimation based on project type and size
    const projectType = document.getElementById('projectType');
    const budgetDisplay = document.getElementById('estimatedBudget');
    
    if (projectType && budgetDisplay) {
        projectType.addEventListener('change', calculateEstimate);
        
        // Add size input for calculation
        const sizeInput = document.createElement('input');
        sizeInput.type = 'number';
        sizeInput.placeholder = 'Project size (sq ft)';
        sizeInput.id = 'projectSize';
        sizeInput.addEventListener('input', calculateEstimate);
    }
}

function calculateEstimate() {
    const projectType = document.getElementById('projectType')?.value;
    const projectSize = document.getElementById('projectSize')?.value;
    
    if (!projectType || !projectSize) return;

    const costPerSqFt = {
        'residential-new': 100,
        'commercial-new': 150,
        'industrial': 120,
        'renovation': 80,
        'architectural': 10
    };

    const cost = costPerSqFt[projectType] || 100;
    const estimate = parseInt(projectSize) * cost;
    
    const budgetDisplay = document.getElementById('estimatedBudget');
    if (budgetDisplay) {
        budgetDisplay.textContent = `Estimated: $${estimate.toLocaleString()}`;
    }
}

function submitQuoteForm() {
    const form = document.getElementById('quoteForm');
    const submitButton = form.querySelector('.form-submit');
    const originalText = submitButton.textContent;

    // Show loading state
    submitButton.classList.add('loading');
    submitButton.textContent = 'Submitting Quote Request...';
    submitButton.disabled = true;

    // Collect form data
    const formData = new FormData(form);
    const quoteData = {};
    for (let [key, value] of formData.entries()) {
        quoteData[key] = value;
    }

    // Simulate form submission with more realistic timing
    setTimeout(() => {
        console.log('Quote request submitted:', quoteData);
        
        // Remove loading state
        submitButton.classList.remove('loading');
        submitButton.textContent = originalText;
        submitButton.disabled = false;

        // Show success message
        showQuoteSuccessMessage();
        
        // Reset form
        form.reset();
        
        // Send email notification (in real implementation)
        sendQuoteNotification(quoteData);
    }, 3000);
}

function showQuoteSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'message success';
    message.innerHTML = `
        <strong>Quote Request Submitted Successfully!</strong><br>
        Thank you for choosing bricon Building Company. Our team will review your requirements and send you a detailed quote within 24-48 hours.<br>
        <em>Reference Number: QT-${Date.now()}</em>
    `;
    
    const form = document.getElementById('quoteForm');
    form.insertBefore(message, form.firstChild);
    
    // Scroll to success message
    message.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        message.remove();
    }, 10000);
}

function sendQuoteNotification(quoteData) {
    // In a real implementation, this would send data to your backend
    // For now, we'll just log it and show what would be sent
    
    console.log('Email notification would be sent with:', {
        to: 'mwinzibrian6@gmail.com',
        subject: `New Quote Request - ${quoteData.projectType}`,
        data: quoteData,
        timestamp: new Date().toISOString()
    });

    // You would integrate with services like:
    // - EmailJS for client-side email sending
    // - Formspree for form handling
    // - Your own backend API
    // - Third-party form services
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.field-error');
    errorElements.forEach(error => error.remove());
    
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

function isValidPhone(phone) {
    // Basic phone validation - adjust regex based on your target countries
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Auto-save form data to localStorage
function initializeFormAutoSave() {
    const form = document.getElementById('quoteForm');
    if (!form) return;

    const inputs = form.querySelectorAll('input, select, textarea');
    
    // Load saved data
    loadSavedFormData();
    
    // Save data on input
    inputs.forEach(input => {
        input.addEventListener('input', debounceFormSave);
    });
}

function saveFormData() {
    const form = document.getElementById('quoteForm');
    if (!form) return;

    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    localStorage.setItem('briconQuoteForm', JSON.stringify(data));
}

function loadSavedFormData() {
    const savedData = localStorage.getItem('briconQuoteForm');
    if (!savedData) return;

    try {
        const data = JSON.parse(savedData);
        Object.keys(data).forEach(key => {
            const field = document.getElementById(key);
            if (field) {
                field.value = data[key];
            }
        });
    } catch (error) {
        console.warn('Error loading saved form data:', error);
    }
}

function clearSavedFormData() {
    localStorage.removeItem('briconQuoteForm');
}

// Debounced form save to avoid excessive localStorage writes
const debounceFormSave = debounce(saveFormData, 1000);

// Initialize auto-save
initializeFormAutoSave();

// Clear saved data after successful submission
document.addEventListener('quoteSubmitted', function() {
    clearSavedFormData();
});

// Project type helper text
const projectTypeHelp = {
    'residential-new': 'New construction of houses, apartments, or residential complexes',
    'residential-renovation': 'Updating, remodeling, or expanding existing residential properties',
    'commercial-new': 'New construction of offices, retail spaces, or commercial buildings',
    'commercial-renovation': 'Renovating existing commercial spaces for improved functionality',
    'industrial': 'Warehouses, factories, or specialized industrial facilities',
    'architectural': 'Design services, blueprints, and architectural consultation',
    'materials': 'Supply of construction materials for your project'
};

// Show helper text when project type changes
document.getElementById('projectType')?.addEventListener('change', function() {
    const helpText = projectTypeHelp[this.value];
    let helpElement = document.getElementById('projectTypeHelp');
    
    if (helpText) {
        if (!helpElement) {
            helpElement = document.createElement('small');
            helpElement.id = 'projectTypeHelp';
            helpElement.style.color = 'var(--gray-500)';
            helpElement.style.marginTop = 'var(--spacing-1)';
            this.parentNode.appendChild(helpElement);
        }
        helpElement.textContent = helpText;
    } else if (helpElement) {
        helpElement.remove();
    }
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